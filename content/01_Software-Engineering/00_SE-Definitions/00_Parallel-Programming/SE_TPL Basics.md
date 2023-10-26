^#Software-Engineering 

---
## # TPL - Task Parallel Library

Zur Ausführung nebenläufiger **Aufgaben (Tasks)** in einem Prozess werden _Threads_ verwendet.

Die Zahl von Threads, die ein Prozess verwalten kann, ist begrenzt.

Threads sind Betriebssystemressourcen deren Verwaltung kostspielig ist.

---
## # TPL (2)

.NET bietet mit der **TPL** - Task Parallel Library - eine Library zur einfachen und effektiven Programmierung nebenläufiger Abläufe.

Die Klasse _Task_ ist dabe der grundlegende Baustein der TPL.

---
## # Task

`viel leichtgewichter als Threads`

Ein _Task_ abstrahiert eine **Aufgabe**. Im Gegensatz zu Threads können in einem Programm eine beliebige Zahl von Tasks gestartet werden.

Irgendwann wird auch hierfür der Arbeitsspeicher ausgehen, aber es können viel mehr Tasks verwaltet werden als Threads.

---
## # Task Ausführung

Die **TPL** führt _Tasks_ in _Threads_ aus. Dazu verwaltet die TPL einen **Threadpool**.

Der **Threadpool** ist eine Collection von Threads, die für die Ausführung von Tasks zur Verfügung stehen.

Sobald ein Task ausgeführt wurde, wird der Thread zur späteren Verwendung in den Threadpool zurückgelegt.

---
## # Thread Pool

Im Bild: `Background-Threads` --> Main-Thread wartet nicht auf die Beendigung des Threads

![Threadpool.excalidraw.svg](https://deep-thought.norwin.at/tech-kb/parallel/assets/Threadpool.excalidraw.svg)

---
## # Tasks in CSharp

```csharp
public static void Main(String[] args){
	// Der Task Constructor erwartet als Parameter
	// ein Delegate    
	var task = new Task(
		() => Console.WriteLine("salut .. "));
	
	// Ausfuehren des Task in einem Thread
	task.Start();
}
```

---
## # Create and run a Task

```csharp
public static void Main(String[] args){
// Anlegen und Ausfuehren einer Task    
	var task = Task.Run(
		() => Console.WriteLine("salut .. "));
}
```

---
## # Backgroundthreads

_Tasks_ werden von der TPL in **Backgroundthreads** ausgeführt. Der Main Thread der Anwendung wartet damit nicht auf das Ergebnis einer Task.

```csharp
// You can easily create background threads yourself.
var thread = new Thread(DoWork);
thread.IsBackground = true;

thread.Start();
```

---

```csharp
public static void Main(String[] args){
	// Anlegen und Ausfuehren einer Task    
	var task = Task.Run(
		 () => Console.WriteLine("salut .. "));
	
	// Erst durch den Aufruf der Wait Methode
	// wird salut .. in der Konsole ausgegeben.    
	task.Wait();
}
```

---
## # Task Result

Das Property `Result` eines Task blockiert (so wie `Wait()`) den umgebenden Thread, bis ein Task das geforderte Ergebnis berechnet hat.

```csharp
public static void Main()
{
	var t = Task.Run(() => 42);
	Console.WriteLine(t.Result);
}
```

---
## # Task Zustände

können mit dem Property `Status` abgefragt werden.

```csharp
public static void Main(String[] args){
	var task = new Task (
		() => Console.WriteLine("alora .. "));
	
	Console.WriteLine(task.Status); // Created
	task.Start();
	Console.WriteLine(task.Status); // Running
	Task.Wait();
	Console.WriteLine(task.Status); // RanToCompletion
}
```

---
## # Task Statemachine

![[Pasted image 20231004125459.png]]

---
## # Task API

Es gibt eine API (= Ansammlung von Methoden und Properties) mit denen die Ausführung von Tasks gesteuert werden kann.

zB kann durch die Verwendung von `ContinueWith` festgelegt werden, dass Tasks in einer bestimmten Reihenfolge ausgeführt werden.

---

```csharp
public static void Chain(){
	Task<int> starter = new Task<int>(() => 42);

	// mach diesen Task - aber nur wenn er erfolgreich abgelaufen ist
	var success = starter.ContinueWith(
		t => {
			Console.WriteLine(t.Result);
			Console.WriteLine(t.Status);
		},
		TaskContinuationOptions.OnlyOnRanToCompletion
	);

	// mach diesen Task - aber nur wenn er fehlgeschlagen ist
  var failure = starter.ContinueWith(
		t => {
			Console.WriteLine(t.Result);
			Console.WriteLine(t.Status);
		},
		TaskContinuationOptions.OnlyOnFaulted
	);

	starter.Start();
	try{
		starter.Wait();
	}catch(SystemException e){
		// ...
	}
}
```

---
## # Usage

Almost in all cases, the low-level method calls, like `.Result`, `.Wait()`, `.ContinueWith()` should not be called directly.

Instead use the **async** / **await** programming model.

