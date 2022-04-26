package extension

import (
	"regexp"
	"testing"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/renderer/html"
	"github.com/yuin/goldmark/testutil"
)

func TestLinkify(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			Linkify,
		),
	)
	testutil.DoTestCaseFile(markdown, "_test/linkify.txt", t, testutil.ParseCliCaseArg()...)
}

func TestLinkifyWithAllowedProtocols(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithXHTML(),
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewLinkify(
				WithLinkifyAllowedProtocols([][]byte{
					[]byte("ssh:"),
				}),
				WithLinkifyURLRegexp(
					regexp.MustCompile(`\w+://[^\s]+`),
				),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:       1,
			Markdown: `hoge ssh://user@hoge.com. http://example.com/`,
			Expected: `<p>hoge <a href="ssh://user@hoge.com">ssh://user@hoge.com</a>. http://example.com/</p>`,
		},
		t,
	)
}

func TestLinkifyWithWWWRegexp(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithXHTML(),
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewLinkify(
				WithLinkifyWWWRegexp(
					regexp.MustCompile(`www\.example\.com`),
				),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:       1,
			Markdown: `www.google.com www.example.com`,
			Expected: `<p>www.google.com <a href="http://www.example.com">www.example.com</a></p>`,
		},
		t,
	)
}

func TestLinkifyWithEmailRegexp(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithXHTML(),
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewLinkify(
				WithLinkifyEmailRegexp(
					regexp.MustCompile(`user@example\.com`),
				),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:       1,
			Markdown: `hoge@example.com user@example.com`,
			Expected: `<p>hoge@example.com <a href="mailto:user@example.com">user@example.com</a></p>`,
		},
		t,
	)
}
