package wikilink

import (
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/util"
)

// Extender extends a goldmark Markdown object with support for parsing and
// rendering Wikilinks.
type Extender struct {
	// Resoler specifies how to resolve destinations for linked pages.
	//
	// Uses DefaultResolver if unspecified.
	Resolver Resolver
}

// Extend extends the provided Markdown object with support for wikilinks.
func (e *Extender) Extend(md goldmark.Markdown) {
	// The link parser is at priority 200 in goldmark so we need to be
	// lower than that to ensure that the "[" trigger fires.
	md.Parser().AddOptions(
		parser.WithInlineParsers(
			util.Prioritized(&Parser{}, 199),
		),
	)

	// The renderer priority matters less. Use the same just so that
	// there's a reasonable expected value.
	md.Renderer().AddOptions(
		renderer.WithNodeRenderers(
			util.Prioritized(&Renderer{
				Resolver: e.Resolver,
			}, 199),
		),
	)
}
