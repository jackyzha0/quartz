package main

import (
	"bytes"
	"io/ioutil"
	"testing"

	gomarkdown "github.com/gomarkdown/markdown"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/renderer/html"
	"github.com/yuin/goldmark/util"
	"gitlab.com/golang-commonmark/markdown"

	"github.com/russross/blackfriday/v2"

	"github.com/88250/lute"
)

func BenchmarkMarkdown(b *testing.B) {
	b.Run("Blackfriday-v2", func(b *testing.B) {
		r := func(src []byte) ([]byte, error) {
			out := blackfriday.Run(src)
			return out, nil
		}
		doBenchmark(b, r)
	})

	b.Run("GoldMark", func(b *testing.B) {
		markdown := goldmark.New(
			goldmark.WithRendererOptions(html.WithXHTML(), html.WithUnsafe()),
		)
		r := func(src []byte) ([]byte, error) {
			var out bytes.Buffer
			err := markdown.Convert(src, &out)
			return out.Bytes(), err
		}
		doBenchmark(b, r)
	})

	b.Run("CommonMark", func(b *testing.B) {
		md := markdown.New(markdown.XHTMLOutput(true))
		r := func(src []byte) ([]byte, error) {
			var out bytes.Buffer
			err := md.Render(&out, src)
			return out.Bytes(), err
		}
		doBenchmark(b, r)
	})

	b.Run("Lute", func(b *testing.B) {
		luteEngine := lute.New()
		luteEngine.SetGFMAutoLink(false)
		luteEngine.SetGFMStrikethrough(false)
		luteEngine.SetGFMTable(false)
		luteEngine.SetGFMTaskListItem(false)
		luteEngine.SetCodeSyntaxHighlight(false)
		luteEngine.SetSoftBreak2HardBreak(false)
		luteEngine.SetAutoSpace(false)
		luteEngine.SetFixTermTypo(false)
		r := func(src []byte) ([]byte, error) {
			out, err := luteEngine.MarkdownStr("Benchmark", util.BytesToReadOnlyString(src))
			return util.StringToReadOnlyBytes(out), err
		}
		doBenchmark(b, r)
	})

	b.Run("GoMarkdown", func(b *testing.B) {
		r := func(src []byte) ([]byte, error) {
			out := gomarkdown.ToHTML(src, nil, nil)
			return out, nil
		}
		doBenchmark(b, r)
	})

}

// The different frameworks have different APIs. Create an adapter that
// should behave the same in the memory department.
func doBenchmark(b *testing.B, render func(src []byte) ([]byte, error)) {
	b.StopTimer()
	source, err := ioutil.ReadFile("_data.md")
	if err != nil {
		b.Fatal(err)
	}
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		out, err := render(source)
		if err != nil {
			b.Fatal(err)
		}
		if len(out) < 100 {
			b.Fatal("No result")
		}
	}
}
