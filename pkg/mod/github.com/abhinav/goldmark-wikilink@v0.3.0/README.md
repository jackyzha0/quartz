[![Go Reference](https://pkg.go.dev/badge/github.com/abhinav/goldmark-wikilink.svg)](https://pkg.go.dev/github.com/abhinav/goldmark-wikilink)
[![Go](https://github.com/abhinav/goldmark-wikilink/actions/workflows/go.yml/badge.svg)](https://github.com/abhinav/goldmark-wikilink/actions/workflows/go.yml)
[![codecov](https://codecov.io/gh/abhinav/goldmark-wikilink/branch/main/graph/badge.svg?token=W98KYF8SPE)](https://codecov.io/gh/abhinav/goldmark-wikilink)

goldmark-wikilink is an extension for the [goldmark] Markdown parser that
supports parsing `[[...]]`-style wiki links.

  [goldmark]: http://github.com/yuin/goldmark

# Usage

To use goldmark-wikilink, import the `wikilink` package.

```go
import wikilink "github.com/abhinav/goldmark-wikilink"
```

Then include the `wiklink.Extender` in the list of extensions you build your
[`goldmark.Markdown`] with.

  [`goldmark.Markdown`]: https://pkg.go.dev/github.com/yuin/goldmark#Markdown

```go
goldmark.New(
  &wiklink.Extender{}
  // ...
)
```

goldmark-wikilink provides control over destinations of wikilinks with the
`Resolver` type. Specify a custom `Resolver` to the `Extender` when installing
it.

```go
goldmark.New(
  &wiklink.Extender{
    Resolver: myresolver,
  }
  // ...
)
```

