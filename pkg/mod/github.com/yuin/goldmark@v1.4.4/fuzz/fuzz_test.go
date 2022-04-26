package fuzz

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"testing"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
	"github.com/yuin/goldmark/util"
)

var _ = fmt.Printf

func TestFuzz(t *testing.T) {
	crasher := "6dff3d03167cb144d4e2891edac76ee740a77bc7"
	data, err := ioutil.ReadFile("crashers/" + crasher)
	if err != nil {
		return
	}
	fmt.Printf("%s\n", util.VisualizeSpaces(data))
	fmt.Println("||||||||||||||||||||||")
	markdown := goldmark.New(
		goldmark.WithParserOptions(
			parser.WithAutoHeadingID(),
			parser.WithAttribute(),
		),
		goldmark.WithRendererOptions(
			html.WithUnsafe(),
			html.WithXHTML(),
		),
		goldmark.WithExtensions(
			extension.DefinitionList,
			extension.Footnote,
			extension.GFM,
			extension.Typographer,
			extension.Linkify,
			extension.Table,
			extension.TaskList,
		),
	)
	var b bytes.Buffer
	if err := markdown.Convert(data, &b); err != nil {
		panic(err)
	}
	fmt.Println(b.String())
}
