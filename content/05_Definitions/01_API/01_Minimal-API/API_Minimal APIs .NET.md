#Definitions 
[[API_Exercise Minimal APIs - Star Wars]]

---
## # What?

Minimal APIs is one of the available programming models offered by Microsoft to create RESTful APIs in .NET.

The other mainly used programming model is using controllers.

---
## # Comparison

| |Controllers|Minimal APIs|
|---|---|---|
|Structure|Classes (controllers) and class methods (actions)|Functions (any lambda or method)|
|Configuration|Basic setup in startup. Main configuration through attributes (declarative)|Method calls, slight use of attributes|
|Focus|Clear structure. Widely understood.|Flexible, little code needed|

---
## # Quick reference

more details:
[https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-8.0](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-8.0)

---
## # A first look

Rider>new Solution> ASP.NET Core Web...>Type: Empty>

```powershell
dotnet new web -o MyMinimalApi
```

will give you a minimalistic dotnet solution, with one project containing one Program.cs that looks like this:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
// this will give back a string: "Hello World!"
```

You can run the project by using an IDE like Visual Studio, VS Code or Rider, or by using the command line:

```powershell
dotnet run
```

---
## # Specifying routes

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// this example is not RESTful
app.MapGet("/", () => "This is a GET");
app.MapPost("/", () => "This is a POST");
app.MapPut("/", () => "This is a PUT");
app.MapDelete("/", () => "This is a DELETE");

app.Run();
```

---
## # Route handlers

A route handler (=>) is what is being called, whenever a route matches the incoming request.

Route handlers can be a lambda expression, a local function, an instance method or a static method.

Route handlers can be synchronous or asynchronous.

---
## # Route handlers (2)

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/inline", () => "This is an inline lambda");

var handler = () => "This is a lambda variable";
app.MapGet("/lambdaVariable", handler);

string LocalFunction() => "This is local function";
app.MapGet("/localFunction", LocalFunction);

var handler = new HelloHandler();
app.MapGet("/instanceMethod", handler.Hello);

app.MapGet("/staticMethod", HelloHandler.HelloStatic);

app.Run();

class HelloHandler
{
	public string Hello()
	{
		return "Hello Instance method";
	}

	public static string HelloStatic()
	{
		return "Hello static method";
	}
}
```

---

[

## # Structuring Minimal API projects

When Minimal API projects get larger it might be wise to structure them. They don’t have to be defined in `Program.cs`.

---
## # Structuring Example

```csharp
using MinAPISeparateFile;
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

TodoEndpoints.Map(app);

app.Run();
```

```csharp
namespace MinAPISeparateFile;

public static class TodoEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("/", () 
	        => "get all todo items");
        app.MapGet("/{id}", (int id)
	        => $"get todo item {id}");
    }
}
```

---
## # Route parameters

You can use a route pattern to specify parameters that are passed in as part of the URL

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet(
	"/users/{userId}/books/{bookId}", 
	(int userId, int bookId) => 
		$"The user id is {userId} and book id is {bookId}");

app.Run();
```

---
## # Route constraints

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet(
	"/todos/{id:int}", 
	(int id) => db.Todos.Find(id));
app.MapGet(
	"/todos/{text}", 
	(string text) => 
		db.Todos.Where(t => t.Text.Contains(text));
app.MapGet(
	"/posts/{slug:regex(^[a-z0-9_-]+$)}", 
	(string slug) => $"Post {slug}");

app.Run();
```

---

## # Parameter binding

Parameter binding is the process of converting request data into strongly typed parameters that are expressed by route handlers.

- Supported binding sources:
    - Route values
    - Query string [?key = value]
    - Header
    - Body (as JSON)
    - Form values
    - Services provided by dependency injection

---
## # Parameter binding example

```csharp
var builder = WebApplication.CreateBuilder(args);

// Added as service
builder.Services.AddSingleton<Service>();

var app = builder.Build();

app.MapGet("/{id}", (int id, // route
                     int page, // query param
                     [FromHeader(Name = "X-CUSTOM-HEADER")] 
                     string customHeader, // header
                     Service service) => { }); // service

class Service { }
```

---
## # Explicit parameter binding

```csharp
using Microsoft.AspNetCore.Mvc;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<Service>();
var app = builder.Build();

app.MapGet("/{id}", ([FromRoute] int id,
                     [FromQuery(Name = "p")] int page,
                     [FromServices] Service service,
                     [FromHeader(Name = "Content-Type")] 
                     string contentType) 
                     => {});

class Service { }
record Person(string Name, int Age);
```

---
## # Responses

Route handlers support the following types of return values:

|Result Type|Behavior|
|---|---|
|`IResult` based|Framework calls `IResult.ExecuteAsync`|
|`string`|Framework writes string directly to response|
|`T` (Any other type)|Framework JSON-serializes the response|

---

