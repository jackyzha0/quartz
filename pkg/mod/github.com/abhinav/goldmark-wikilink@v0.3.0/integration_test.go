package wikilink_test

import (
	"bytes"
	"testing"

	wikilink "github.com/abhinav/goldmark-wikilink"
	"github.com/yuin/goldmark"
	goldtestutil "github.com/yuin/goldmark/testutil"
)

func TestIntegration(t *testing.T) {
	t.Parallel()

	goldtestutil.DoTestCaseFile(
		goldmark.New(goldmark.WithExtensions(&wikilink.Extender{
			Resolver: _resolver,
		})),
		"testdata/tests.txt",
		t,
	)
}

var (
	_resolver = resolver{}

	// Links with this target will return a nil destination.
	_doesNotExistTarget = []byte("Does Not Exist")
)

type resolver struct{}

func (resolver) ResolveWikilink(n *wikilink.Node) ([]byte, error) {
	if bytes.Equal(n.Target, _doesNotExistTarget) {
		return nil, nil
	}

	return wikilink.DefaultResolver.ResolveWikilink(n)
}
