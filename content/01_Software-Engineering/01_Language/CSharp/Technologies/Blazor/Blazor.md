#Programming 
[[CSharp_Clean-Architecture]]

----


### Sampleprojects
[[Blazor-Projects]]


#### Mit Style verbunden
[[MudBlazor]]

### Theorie
- Visual Studio>ASP.NET and web development>Blazor WebAssembly App

- UI Framwork, HTML, CSS und C# (anstatt JS)
- erlaubt .NET-Framework (läuft auf jeder Plattform)
- besteht aus .razor Komponenten


### Built-in components
```c#
<Router AppAssembly="@typeof(App).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
    <NotFound>
        <PageTitle>Not found</PageTitle>
        <LayoutView Layout="@typeof(MainLayout)">
            <p role="alert">Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>

```

### neue Seite erstellen
```js
// url: https://example.com/counter
@page "/counter"

<PageTitle>Counter</PageTitle>
<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>
<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

// C# Code für die Logik
@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```
### Style definieren (CSS)
- .css-file hinzufügen (in Pages)
```CSS
p {
    color: red;
}
```

