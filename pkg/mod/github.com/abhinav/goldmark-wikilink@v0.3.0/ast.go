package wikilink

import (
	"github.com/yuin/goldmark/ast"
)

// Kind is the kind of the wikilink AST node.
var Kind = ast.NewNodeKind("WikiLink")

// Node is a Wikilink AST node. Wikilinks have two components: the target and
// the label.
//
// The target is the page to which this link points, and the label is the text
// that displays for this link.
//
// For links in the following form, the label and the target are the same.
//
//   [[Foo bar]]
//
// For links in the following form, the target is the portion of the link to
// the left of the "|", and the label is the portion to the right.
//
//   [[Foo bar|baz qux]]
type Node struct {
	ast.BaseInline

	// Page to which this wikilink points.
	//
	// This may be blank for links to headers within the same document
	// like [[#Foo]].
	Target []byte

	// Fragment portion of the link, if any.
	//
	// For links in the form, [[Foo bar#Baz qux]], this is the portion
	// after the "#".
	Fragment []byte
}

var _ ast.Node = (*Node)(nil)

// Kind reports the kind of this node.
func (n *Node) Kind() ast.NodeKind {
	return Kind
}

// Dump dumps the Node to stdout.
func (n *Node) Dump(src []byte, level int) {
	ast.DumpHelper(n, src, level, map[string]string{
		"Target": string(n.Target),
	}, nil)
}
