---
title: Paths in Quartz
---

Paths are pretty complex to reason about because, especially for a static site generator, they can come from so many places.

The current browser URL? Technically a path. A full file path to a piece of content? Also a path. What about a slug for a piece of content? Yet another path.

It would be silly to type these all as `string` and call it a day as it's pretty common to accidentally mistake one type of path for another. Unfortunately, TypeScript does not have [nominal types](https://en.wikipedia.org/wiki/Nominal_type_system) for type aliases meaning even if you made custom types of a server-side slug or a client-slug slug, you can still accidentally assign one to another and TypeScript wouldn't catch it.

Luckily, we can mimic nominal typing using [brands](https://www.typescriptlang.org/play#example/nominal-typing).

```typescript
// instead of
type ClientSlug = string

// we do
type ClientSlug = string & { __brand: "client" }

// that way, the following will fail typechecking
const slug: ClientSlug = "some random slug"
```

While this prevents most typing mistakes _within_ our nominal typing system (e.g. mistaking a server slug for a client slug), it doesn't prevent us from _accidentally_ mistaking a string for a client slug when we forcibly cast it.

Thus, we still need to be careful when casting from a string to one of these nominal types in the 'entrypoints', illustrated with hexagon shapes in the diagram below.

The following diagram draws the relationships between all the path sources, nominal path types, and what functions in `quartz/path.ts` convert between them.

```mermaid
graph LR
    Browser{{Browser}} --> Window{{Window}} & LinkElement{{Link Element}}
    Window --"getCanonicalSlug()"--> Canonical[Canonical Slug]
    Window --"getClientSlug()"--> Client[Client Slug]
    LinkElement --".href"--> Relative[Relative URL]
    Client --"canonicalizeClient()"--> Canonical
    Canonical --"pathToRoot()"--> Relative
    Canonical --"resolveRelative()" --> Relative
    MD{{Markdown File}} --> FilePath{{File Path}} & Links[Markdown links]
    Links --"transformLink()"--> Relative
    FilePath --"slugifyFilePath()"--> Server[Server Slug]
    Server --> HTML["HTML File"]
    Server --"canonicalizeServer()"--> Canonical
    style Canonical stroke-width:4px
```
