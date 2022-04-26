package wikilink

import (
	"fmt"
	"sync"

	"github.com/yuin/goldmark/ast"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/util"
)

// Renderer renders wikilinks as HTML.
//
// Install it on your goldmark Markdown object with Extender, or directly on a
// goldmark Renderer by using the WithNodeRenderers option.
//
//   wikilinkRenderer := util.Prioritized(&wikilink.Renderer{...}, 199)
//   goldmarkRenderer.AddOptions(renderer.WithNodeRenderers(wikilinkRenderer))
type Renderer struct {
	// Resolver determines destinations for wikilink pages.
	//
	// If a Resolver returns an empty destination, the Renderer will skip
	// the link and render just its contents. That is, instead of,
	//
	//   <a href="foo">bar</a>
	//
	// The renderer will render just the following.
	//
	//   bar
	//
	// Defaults to DefaultResolver if unspecified.
	Resolver Resolver

	once sync.Once // guards init

	// hasDest records whether a node had a destination when we resolved
	// it. This is needed to decide whether a closing </a> must be added
	// when exiting a Node render.
	hasDest map[*Node]struct{}
}

func (r *Renderer) init() {
	r.once.Do(func() {
		r.hasDest = make(map[*Node]struct{})
		if r.Resolver == nil {
			r.Resolver = DefaultResolver
		}
	})
}

// RegisterFuncs registers wikilink rendering functions with the provided
// goldmark registerer. This teaches goldmark to call us when it encounters a
// wikilink in the AST.
func (r *Renderer) RegisterFuncs(reg renderer.NodeRendererFuncRegisterer) {
	reg.Register(Kind, r.Render)
}

// Render renders the provided Node. It must be a Wikilink node.
//
// goldmark will call this method if this renderer was registered with it
// using the WithNodeRenderers option.
func (r *Renderer) Render(w util.BufWriter, _ []byte, node ast.Node, entering bool) (ast.WalkStatus, error) {
	r.init()

	n, ok := node.(*Node)
	if !ok {
		return ast.WalkStop, fmt.Errorf("unexpected node %T, expected *goldmarkwikilink.Node", node)
	}

	if entering {
		if err := r.enter(w, n); err != nil {
			return ast.WalkStop, err
		}
	} else {
		r.exit(w, n)
	}

	return ast.WalkContinue, nil
}

func (r *Renderer) enter(w util.BufWriter, n *Node) error {
	dest, err := r.Resolver.ResolveWikilink(n)
	if err != nil {
		return fmt.Errorf("resolve %q: %w", n.Target, err)
	}
	if len(dest) == 0 {
		return nil
	}

	r.hasDest[n] = struct{}{}
	w.WriteString(`<a href="`)
	w.Write(util.URLEscape(dest, true /* resolve references */))
	w.WriteString(`">`)
	return nil
}

func (r *Renderer) exit(w util.BufWriter, n *Node) {
	_, ok := r.hasDest[n]
	if !ok {
		return
	}

	w.WriteString("</a>")
	// Avoid memory leaks by cleaning up after exiting the node.
	delete(r.hasDest, n)
}
