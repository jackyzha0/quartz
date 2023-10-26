#Software-Engineering 

---
## # Thread

A **Thread** is an autonomous unit _within_ a process that can execute tasks.

Conceptually, threads allow a concurrent execution of computational steps within one process.

---
## # Process vs. Thread

![[Pasted image 20230927122601.png]]

---
## # Process vs. Thread (2)

|Process|Thread|
|---|---|
|Processes are heavyweight operations.|Threads are lighter weight operations.|
|Each process has its own memory space.|Threads use the memory of the process they belong to.|
|Inter-process communication is slow as processes have different memory addresses.|Inter-thread communication can be faster than inter-process communication because threads of the same process share memory with the process they belong to.|
|Context switching between processes is more expensive.|Context switching between threads of the same process is less expensive.|
|Processes don’t share memory with other processes.|Threads share memory with other threads of the same process.|

---
## # Resource Sharing

Threads share resources within one process.

![[Pasted image 20230927122717.png]]
Heap: saves in RAM
Stack: call of small operations

---
## # Programming Threads in C#

We use objects of type **Thread** to do concurrent programming within a process.

The number of threads a process can handle is limited (yet quite high).

---
## # A first program

```csharp
class Threads
{
	static void Main(string[] args) 
	{
		var thread = new Thread(Worker);
		thread.Start();

		Console.WriteLine("Program started");
	}

	static void Worker()
	{
		while (true) 
		{
			Thread.Sleep(1000); // wait for one second
			Console.WriteLine("hello from worker");
		}
	}
}
```

```text
Output:
Program started
hello from worker
hello from worker
...
```

---
## # Concurrent execution

When starting a thread using `Thread.Start()`, the thread will start using the specified method.

The program flow in the main thread will continue though.

This is why in the previous example we first see the output `"Program started"` before the other thread outputs its first message.

---
## # Concurrent? I thought you said parallel?

Why are we saying that threads are executed concurrently when what we really want to do is executing them in parallel?

CLR `Common Language Runtime`
manages the execution of threads. It will try to use the available CPU cores optimally to split up your work.

So with threads we are guaranteed a concurrent execution at least (multiple threads on one CPU core), but if possible, the threads will be split up upon the available cores for a parallel execution.

---
## # Thread synchronisation

Threads are often used to split up computational work to be executed on multiple CPU cores.

After all the individual computations have finished, we often need to synchronise the Threads again. For example to aggregate the individual results.

```csharp
// create threads
var t1 = new Thread(() => DoWork(batch1));
var t2 = new Thread(() => DoWork(batch2));

// start computation
t1.Start();
t2.Start();

// wait for t1 and t2 to finish
t1.Join();
t2.Join();
```

---
## # Accessing shared resources

```csharp
private static int Counter = 0;

public static void Main()
{
	List<Thread> threads = new();
	Enumerable.Range(0, 10)
		.ToList()
		.ForEach(i =>
		{
			var t = new Thread(() =>
			{
				var currentCount = Counter;
				Thread.Sleep(1);
				Counter = currentCount + 1;
			});
			threads.Add(t);
			t.Start();
		});
	
	threads.ForEach(t => t.Join());
	Console.WriteLine(Counter);
}
```

The result might be anything between 1 and 10. This is called race condition.

---
## # Race condition

![RaceCondition.excalidraw.svg](https://deep-thought.norwin.at/tech-kb/parallel/assets/RaceCondition.excalidraw.svg)

---
## # Race condition (2)

![racecondition.webp](https://deep-thought.norwin.at/tech-kb/parallel/assets/racecondition.webp)

---
## # Dealing with race conditions

```csharp
private static int Counter = 0;
private static object lockObj = new();

public static void Main()
{
	List<Thread> threads = new();
	Enumerable.Range(0, 10).ToList().ForEach(i =>
	{
		var t = new Thread(() =>
		{
			// only 1 thread can access `lock`-statement
			lock (lockObj)
			{
				var currentCount = Counter;
				Thread.Sleep(1);
				Counter = currentCount + 1;
			}
		});
		threads.Add(t);
		t.Start();
	});
	
	threads.ForEach(t => t.Join());
	Console.WriteLine(Counter);
}
```

---
## # Dealing with race conditions (2)

```csharp
private static int Counter = 0;
    
public static void Main()
{
	List<Thread> threads = new();
	Enumerable.Range(0, 10)
		.ToList()
		.ForEach(i =>
		{
			var t = new Thread(() =>
			{
				// all operations - only 1 Thread can access
				Interlocked.Increment(ref Counter);
			});
			threads.Add(t);
			t.Start();
		});
	
	threads.ForEach(t => t.Join());
	Console.WriteLine(Counter);
}
```

---
## # Signaling between threads

We can use signals to synchronize threads. These signals don’t carry any data, so we don’t send data between threads. We only send a signal so that another thread might know when to wait and when to continue.

These signals are called **Semaphores**.

---
## # Semaphore

A semaphore is a data structure that allows the synchronisation of threads.
One Thread sends a signal to another Thread (when to Start and when to Wait)

- A semaphore manages a number of permits.
- When accessing a semaphore, we reduce the amount of permits.
- If no permits are left, the thread has to wait until permits are available again.

C#: SemaphoreSlim Class

---
## # Semaphore example

```csharp
// creating a semaphore
var sem = new SemaphoreSlim(initialCount: 0);

// Wait() - number of permits = -1
// If no permits are left - the thread execution is blocked.
sem.Wait();

// Release() - number of permits = +1
// we give back one permit to the Semaphore
sem.Release();
```

---
## # Semaphore example (2)

```csharp
public class Crane {
	public static readonly SemaphoreSlim CraneGuard = 
		new SemaphoreSlim(0);
	public static void Run() {
		while(true) {
			Move("Storage", "MachineA");
			MachineA.MachineAGuard.Release();
			CraneGuard.Wait();
			Move("MachineA", "MachineB");
			MachineB.MachineBGuard.Release();
			CraneGuard.Wait();
			Move("MachineB", "Storage");
		}
	}
}
```

---
## # Semaphore example (3)

```csharp
public class MachineA {
	public static readonly SemaphoreSlim MachineAGuard = 
		new SemaphoreSlim(0);
	public static void Run() {
		while(true) {
			MachineAGuard.Wait();
			Process();
			Crane.CraneGuard.Release();
		}
	}
}
```

---
## # Semaphore example (4)

```csharp
public class MachineB {
	public static readonly SemaphoreSlim MachineBGuard = 
		new SemaphoreSlim(0);
	public static void Run() {
		while(true) {
			MachineBGuard.Wait();
			Process();
			Crane.CraneGuard.Release();
		}
	}
}
```

---
## # Nachrichtenaustausch zwischen Threads

Semaphore sind reine Signalgeber. Es werden Signale zwischen Threads ausgetauscht. Diese haben jedoch keinerlei weitere Informationen. Ein Semaphor-Signal kann zusätzlich keine Daten weitergeben.

---
## # Nachrichtenaustausch (2)

Eine Möglichkeit trotzdem einen <mark style="background: #D2B3FFA6;">Datenaustausch</mark> zu ermöglichen ist die Verwenden von <mark style="background: #D2B3FFA6;">Shared Memory</mark>. Das ist ein Speicher den mehrere Threads nutzen.

Semaphore können weiterhin zur Signalisierung verwendet werden, die Daten werden aber in einem anderen Objekt verwaltet. Beim Zugriff auf dieses Objekt ist dann besonders darauf zu achten, dass dieser Thread-Safe (vor Race-Conditions schützen) ist, also beispielsweise durch `lock` Statements abgesichert ist.

---
## # Nachrichtenaustausch (3)
- "Thread" 2 instead of "Thread 1"

![ThreadMessages.excalidraw.svg](https://deep-thought.norwin.at/tech-kb/parallel/assets/ThreadMessages.excalidraw.svg)

---

```csharp
private static SemaphoreSlim sem = new(0);  
private static object lockObj = new();  
private static string message = string.Empty;  
  
public static void Main()  
{  
    new Thread(WorkerA).Start();  
    new Thread(WorkerB).Start();  
}  
  
static void WorkerA()  
{  
    while (true)  
    {  
        lock (lockObj)  
        {  
            message = "hello";  
        }  
  
        sem.Release();  
        Thread.Sleep(1000);  
    }  
}   
  
static void WorkerB()  
{  
    while (true)  
    {  
        sem.Wait();  
        lock (lockObj)  
        {  
            Console.WriteLine(message);  
        }  
    }  
}
```

---
## # Nachrichtenaustausch - Collections

Zum Nachrichtenaustausch zwischen Threads bietet .NET auch einige Klassen an, die eigens dafür konzipiert wurden.

- Nach dem Implementieren einer Collection ist kein lock-Statement mehr nötig

- `BlockingCollection<T>`
- `ConcurrentDictionary<TKey, TValue>`
- `ConcurrentQueue<T>`
- `ConcurrentStack<T>`
- `ConcurrentBag<T>`

---
## # Nachrichtenaustausch - Blocking Collection

Eine Blocking Collection kann als Puffer wirken. Es werden nachrichten in die Collection hinzugefügt, die später von anderen Threads verarbeitet werden. Die Nachrichten können sich in der Collection ansammeln und später wieder verringern.

---
## # Producer-Consumer Pattern

#### # Blocking Collection

	Thread 1-3 (PRODUCER) --> write into Puffer
	Thread 4-6 (CONSUMER) --> read from Puffer

![ProducerConsumer.excalidraw.svg](https://deep-thought.norwin.at/tech-kb/parallel/assets/ProducerConsumer.excalidraw.svg)

---
#### Beispiel einer Blocking Collection

Stellt man sich vor man hat eine Gruppe von Menschen, die Geschenke herstellen (Producer).
Und man hat eine Gruppe von Menschen, die diese verpacken (Consumer).
Blocking Collection - hilft, dass sich Producer & Consumer nicht in die Quere kommen

Die Geschenke werden auf einem Tisch abgelegt.
Nun verwendet man `BlockingCollection`

- Tisch ist wie Blocking Collection (max. 10 Geschenke können gleichzeitig darauf liegen)
- Wenn ein Producer (Produzierer) ein Geschenk herstellt - legt er es auf den Tisch (auf Blocking Collection)
- Wenn der Tisch voll ist, kann kein Geschenk mehr abgelegt werden - bis jemand eins nimmt

- Die Consumer (Verpacker) nehmen Geschenke vom Tisch, verpacken sie & machen Platz für neue Geschenke auf dem Tisch (Blocking Collection)
- Wenn der Tisch leer ist und kein Geschenk mehr darauf liegt - Consumer sagen: "Der Tisch ist leer, es gibt keine Geschenke zum Verpacken, bis jemand eins hinstellt"

---
#### Beispiel - Crane-MachineA-MachineB

```csharp
public class Crane {
	public static BlockingCollection<int> StorageQueue =
		new BlockingCollection<int>(100);

	public void Run() {
		while (true) {
			// item als Zwischenspeicher (mit .Take() konsumiert und gelöscht)
			var item = StorageQueue.Take();
			Console.WriteLine($"storage queue take: {item}");
			// MachineA BlockColl. bekommt Signal und item übergeben
			MachineA.MachineAQueue.Add(item);
		}
	}
}
```

```csharp
public class MachineA {
	public readonly static BlockingCollection<int>
		MachineAQueue = new BlockingCollection<int>(100);

	public void Run() {
		while (true) {
			var item = MachineAQueue.Take();
			Console.WriteLine($"Machine A processed: {item}");
			MachineB.MachineBQueue.Add(item);
		}
	}
}
```

```csharp
public class MachineB {
	public readonly static BlockingCollection<int>
		MachineBQueue = new BlockingCollection<int>(100);

	public void Run() {
		while (true) {
			var item = MachineBQueue.Take();
			Console.WriteLine($"Machine B processed: {item}");
		}
	}
}
```