#Software-Engineering 

---
## # Async/Await - Why?

While the **TPL** can be used to do parallel programming, its main use-case is to do <mark style="background: #D2B3FFA6;">asynchronous programming.</mark>

Asynchronous programming is concerned about doing operations that take up a certain amount of time to complete.

We <mark style="background: #D2B3FFA6;">don’t want to do blocking operations</mark> that would freeze a UI or would hinder a service serving other requests.

---
## # Asynchronous use-cases

Common scenarios for asynchronous programming include:

- I/O-bound needs
    - Requesting data from a network
    - Accessing a database
    - Reading/writing to a filesystem
- CPU-bound needs
    - Performing an expensive calculation

---
## # Asynchronous CSharp

C# has a language-level asynchronous programming model, meaning that asynchronous programming is supported by language constructs.

This allows us to easily write asynchronous code without having to manage callbacks or conform to a library and its methods.

---
## # Task

A `Task` or `Task<T>` is used to represent an operation that takes a certain amount of time and is not completed immediately.

When executing a task on a background thread we want to start the operation, wait for completion, but while waiting being able to perform other operations.

The caller should not be blocked from doing other work.

---
## # Keywords

In C# we can use the keywords **async** and **await** to deal with **Tasks**.

- For I/O-bound code, you await an operation that returns a `Task` or `Task<T>` inside of an `async` method.
- For CPU-bound code, you await an operation that is started on a background thread with the `Task.Run` method.

---
## # Await

The `await` keyword is where the magic happens. It yields control to the caller of the method that performed `await`, and it ultimately allows a UI to be responsive or a service to be elastic.

When you write code with `await` - then the Compiler creates a new class

---
## # Example

```csharp
public static async Task Main(string[] args)  
{  
	var httpClient = new HttpClient();  
	// await - the UI keeps running - doesn't block
	var result = await httpClient
		.GetFromJsonAsync<JsonElement>(
			"https://api.chucknorris.io/jokes/random"); 
			 
	var joke = result.GetProperty("value").GetString();
	Console.WriteLine(joke);  
}
```

Methods that handle asynchronous code have to be marked with the keyword **async**.  
When calling asynchronous methods that return a `Task` or `Task<T>`, we use the **await** keyword.  
Asynchronous methods should be named with the postfix **Async** (e.g. `GetFromJsonAsync`)

---
## # Sample Usage in a UI application

```csharp
private readonly HttpClient _httpClient = new HttpClient();

downloadButton.Clicked += async (o, e) =>
{
	// This line will yield control to the UI as the request
	// from the web service is happening.
	//
	// The UI thread is now free to perform other work.
	var stringData = await _httpClient.GetStringAsync(URL);
	DoSomethingWithData(stringData);
};
```

---
## # Sample Usage - Expensive Calculation

```csharp
private DamageResult CalculateDamageDone()
{
	// Code omitted:
	//
	// Does an expensive calculation and returns
	// the result of that calculation.
}

calculateButton.Clicked += async (o, e) =>
{
	// This line will yield control to the UI while CalculateDamageDone()
	// performs its work. The UI thread is free to perform other work.
	var damageResult = await Task.Run(() => CalculateDamageDone());
	DisplayDamage(damageResult);
};
```

---
## # What happens under the covers

On the C# side of things, the compiler transforms your code into a state machine that keeps track of things like yielding execution when an `await` is reached and resuming execution when a background job has finished.

---
## # Compiler Magic

```csharp
public async Task PrintAndWait(TimeSpan delay, int arg2)
{
    Console.WriteLine("Before first delay");
    // Task.Delay(x) - wie Thread.Sleep(x)
    await Task.Delay(delay);
    Console.WriteLine("Between delays");
    await Task.Delay(delay);
    Console.WriteLine("After second delay");    
}
```

will be transformed to

```csharp
[AsyncStateMachine(typeof(PrintAndWaitStateMachine))]
[DebuggerStepThrough]
public Task PrintAndWait(TimeSpan delay, int arg2)
{
    PrintAndWaitStateMachine stateMachine = new PrintAndWaitStateMachine()
    {
        Delay = delay,
        Arg2 = arg2,
        Builder = AsyncTaskMethodBuilder.Create(),
        State = -1
    };
    stateMachine.Builder.Start(ref stateMachine);
    return stateMachine.Builder.Task;
}
```

---
## # State Machine Class

Handles the execution.

For every **async** method, the compiler will automatically generate a new class - the state machine, that handles the execution. Local variables will be stored inside the class.

Notice that the **async** and **await** keywords are gone after the transformation. They are just syntactic sugar (compiler reformats code) that are unknown to the runtime.

---
## # The generated state machine

```csharp
[CompilerGenerated]
class PrintAndWaitStateMachine : IAsyncStateMachine
{
    public int State;
    public AsyncTaskMethodBuilder Builder;
    public TimeSpan delay;
    public int arg2;

    private TaskAwaiter _awaiter;

	// .MoveNext() - says what happens
    void IAsyncStateMachine.MoveNext()
    {
        int num = State;
        try
        {
            TaskAwaiter awaiter;
            TaskAwaiter awaiter2;
            if (num != 0)
            {
                if (num == 1)
                {
                    awaiter = _awaiter;
                    _awaiter = default(TaskAwaiter);
                    num = (State = -1);
                    goto IL_00ef;
                }
                // You come there only in first execution 
                Console.WriteLine("Before first delay");
                // .GetAwaiter() - object that waits for sth
                awaiter2 = Task.Delay(delay).GetAwaiter();
                // asks if the Task has already finished (!)
                if (!awaiter2.IsCompleted)
                {
                    num = (State = 0);
                    _awaiter = awaiter2;
                    PrintAndWaitStateMachine stateMachine = this;
                    // while we wait for the result - we already return - so the UI won't be                         blocked
                    Builder.AwaitUnsafeOnCompleted(ref awaiter2, ref stateMachine);
                    return;
                }
            }
            else
            {
                awaiter2 = _awaiter;
                _awaiter = default(TaskAwaiter);
                num = (State = -1);
            }
            awaiter2.GetResult();
            Console.WriteLine("Between delays");
            awaiter = Task.Delay(delay).GetAwaiter();
            if (!awaiter.IsCompleted)
            {
                num = (State = 1);
                _awaiter = awaiter;
                PrintAndWaitStateMachine stateMachine = this;
                Builder.AwaitUnsafeOnCompleted(ref awaiter, ref stateMachine);
                return;
            }
            goto IL_00ef;
            IL_00ef:
            awaiter.GetResult();
            Console.WriteLine("After second delay");
        }
        catch (Exception exception)
        {
            State = -2;
            Builder.SetException(exception);
            return;
        }
        State = -2;
        Builder.SetResult();
    }

    void IAsyncStateMachine.SetStateMachine(IAsyncStateMachine stateMachine)
    {
        this.Builder.SetStateMachine(stateMachine);
    }
}
```

---
## # Generated state machine

The `delay` and `arg2` parameters are now fields on the state machine class and the logic that was in the original `PrintAndWait()` method is now inside the `MoveNext()` method of the state machine.

The generated state machine works by storing the current context (State) of the method so that it can be resumed after finishing it’s long running await tasks. Inside the `PrintAndWaitStateMachine.MoveNext()` method we can see several checks for the current State (`num`) value and calls to the method `Builder.AwaitUnsafeOnCompleted()`

---
## # States

- **-2:** The result of the method is computed, or it has thrown; we can really return now, and never come back
- **-1:** Start of “await Task.Delay(delay)”
    - If it completed instantly, or if it done, keep going.
    - If it hasn’t completed, wait till it ends, and return.
- **0 … N:** These are generated based on the number of `await` keywords used in the original method.
    - In the code above only 2 awaits are used so states 1 & 2 are present in the StateMachine

---
## # Further information

- Overview of the state machine (main source of the last couple of slides):
    - [CSharp Async State Machine](https://www.jteer.dev/posts/csharpasyncstatemachine/)
- Deep Dive Explanation of what is going on:
    - [How Async Await Really Works](https://devblogs.microsoft.com/dotnet/how-async-await-really-works/)

---
---
---
# TESTSTOFF
---
---
---
## # Dos and don’ts

We will have a look at a few things to avoid aswell as patterns that should be applied.

For more detailed information have a look at [Async Guidance](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md) by [David Fowler](https://github.com/davidfowl)

---
### # Asynchrony is viral

It’s very hard to avoid asynchronous methods as their usage has spread rapidly in the .NET Framework and Third Party Packages.

Once you go async, all of your callers should be async too. If only part of your call stack is async, the gains are close to zero.

Even worse partial asynchrony can be worse than being all synchronous.

---
#### # Bad

This example uses the `Task.Result` and as a result blocks the current thread to wait for the result. This is an example of **sync over async**.

```csharp
public int DoSomethingAsync()
{
    var result = CallDependencyAsync().Result;
    return result + 1;
}
```

[

#### # Good

](https://deep-thought.norwin.at/tech-kb/parallel/Parallel-Programming-TPL-Async-Await/#good)

This example uses the async and await keywords instead.

```csharp
public async Task<int> DoSomethingAsync()
{
    var result = await CallDependencyAsync();
    return result + 1;
}
```

---

[

### # Never do async void

](https://deep-thought.norwin.at/tech-kb/parallel/Parallel-Programming-TPL-Async-Await/#never-do-async-void)

Use of async void methods is always bad.

Async void methods will crash the process if an exception is thrown.

Typically what you want to do when using async void is to do a fire and forget operation. Await an async method or just use `Task.Run`. Every async method should return a `Task` or `Task<T>` object.

---

[

#### # Bad

](https://deep-thought.norwin.at/tech-kb/parallel/Parallel-Programming-TPL-Async-Await/#bad-1)

```csharp
public class MyController : Controller
{
    [HttpPost("/start")]
    public IActionResult Post()
    {
        BackgroundOperationAsync();
        return Accepted();
    }
    
    public async void BackgroundOperationAsync()
    {
        var result = await CallDependencyAsync();
        DoSomething(result);
    }
}
```

[

#### # Good

](https://deep-thought.norwin.at/tech-kb/parallel/Parallel-Programming-TPL-Async-Await/#good-1)

```csharp
public class MyController : Controller
{
    [HttpPost("/start")]
    public IActionResult Post()
    {
        Task.Run(BackgroundOperationAsync);
        return Accepted();
    }
    
    public async Task BackgroundOperationAsync()
    {
        var result = await CallDependencyAsync();
        DoSomething(result);
    }
}
```

---

[

### # Use Task.FromResult for trivially computed values

](https://deep-thought.norwin.at/tech-kb/parallel/Parallel-Programming-TPL-Async-Await/#use-taskfromresult-for-trivially-computed-values)

If we know the result right away, or the result can be easily computed, there is no need to schedule a Task on the thread pool.

---

[

#### # Bad

](https://deep-thought.norwin.at/tech-kb/parallel/Parallel-Programming-TPL-Async-Await/#bad-2)

```csharp
public Task<int> AddAsync(int a, int b)
{
	 return Task.Run(() => a + b);
}
```

[

#### # Good

](https://deep-thought.norwin.at/tech-kb/parallel/Parallel-Programming-TPL-Async-Await/#good-2)

```csharp
public Task<int> AddAsync(int a, int b)
{
	 return Task.FromResult(a + b);
}
```

[

#### # Even Better

](https://deep-thought.norwin.at/tech-kb/parallel/Parallel-Programming-TPL-Async-Await/#even-better)

```csharp
public ValueTask<int> AddAsync(int a, int b)
{
	 return new ValueTask<int>(a + b);
}
```