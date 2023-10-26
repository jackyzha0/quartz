	#Programming 

### Theorie
-   MudBlazor: Open-Source-Bibliothek für Webanwendungen mit Blazor und .NET
-   WASM: Abkürzung für "WebAssembly"
-   WASM ist eine virtuelle Maschine, die als Teil des Webstandards entwickelt wurde
-   WASM ermöglicht schnellere und effizientere Ausführung von Webanwendungen im Browser
-   Code in WASM wird direkt im Browser in einem binären Format ausgeführt
-   Im Gegensatz zu JavaScript, das interpretiert wird, kann WASM-Code direkt ausgeführt werden
- Wenn WASM als Rendering-Engine in MudBlazor verwendet wird, bedeutet dies eine bessere Leistung und Skalierbarkeit

### Installation (cmd)
```cmd
dotnet new install MudBlazor.Templates
```
nun sollte in VS 2022 ein "MudBlazor Templates (MudBlazor Team)" auffindbar sein

### Add to existing Project
```JS
1. NuGet Paket-Manager: Download MudBlazor
2. Add imports to: _Imports.razor
	@using MudBlazor
3. Add font and style references (in `index.html` or `_Layout.cshtml`/`_Host.cshtml`)
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
<link href="_content/MudBlazor/MudBlazor.min.css" rel="stylesheet" />
4. Add script reference
	<script src="_content/MudBlazor/MudBlazor.min.js"></script>
5. Removing other CSS references
6. Add the following in Programm.cs
	using MudBlazor.Services;

	builder.Services.AddMudServices();
7. Add the following in MainLayout.razor:
	<MudThemeProvider/>
	<MudDialogProvider/>
	<MudSnackbarProvider/>
```

### Fehler IIS-Express - keine Verbindung
Projekteigenschaften>Debuggen>Allgemein>IIS Express>App-URL: http://localhost:xxxx
- Pfad ändern

### voller Zugriff auf MudBlazor-Content
```JS
// Verwaltung der Themes
<MudThemeProvider />
// Verwaltung der Dialoge
<MudDialogProvider />
<MudSnackbarProvider />
```

### MudNavMenu.razor
erstellt nav-links (http://example.com/counter, ...)

```js
<MudNavMenu>
    <MudNavLink Href="" Match="NavLinkMatch.All" Icon="@Icons.Material.Filled.Home">Home</MudNavLink>
    <MudNavLink Href="counter" Match="NavLinkMatch.Prefix" Icon="@Icons.Material.Filled.Add">Counter</MudNavLink>
    <MudNavLink Href="fetchdata" Match="NavLinkMatch.Prefix" Icon="@Icons.Material.Filled.List">Fetch data</MudNavLink>
</MudNavMenu>
```

## MainLayout.razor
Auswahl an Layouts: https://www.mudblazor.com/getting-started/layouts#basic-layout

```JS
<MudLayout>
    <MudAppBar Elevation="0">
        <MudIconButton Icon="@Icons.Material.Filled.Menu" Color="Color.Inherit" Edge="Edge.Start" OnClick="@((e) => DrawerToggle())" />
        <MudSpacer />
        <MudIconButton Icon="@Icons.Custom.Brands.MudBlazor" Color="Color.Inherit" Link="https://mudblazor.com/" Target="_blank" />
        <MudIconButton Icon="@Icons.Custom.Brands.GitHub" Color="Color.Inherit" Link="https://github.com/MudBlazor/MudBlazor/" Target="_blank" />
    </MudAppBar>
    <MudDrawer @bind-Open="_drawerOpen" Elevation="1">
        <MudDrawerHeader>
            <MudText Typo="Typo.h6">Test_MudBlazor_Application</MudText>
        </MudDrawerHeader>
        <NavMenu />
    </MudDrawer>
    <MudMainContent>
        <MudContainer MaxWidth="MaxWidth.Large" Class="my-16 pt-16">
            @Body
        </MudContainer>
    </MudMainContent>
</MudLayout>
```
