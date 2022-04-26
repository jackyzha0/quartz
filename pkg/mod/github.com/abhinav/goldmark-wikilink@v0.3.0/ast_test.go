package wikilink

import (
	"io/ioutil"
	"os"
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/yuin/goldmark/ast"
	"github.com/yuin/goldmark/text"
)

func TestNodeDump(t *testing.T) {
	src := []byte("[[My page]]")
	n := &Node{Target: src[2 : len(src)-2]}
	n.AppendChild(n, ast.NewTextSegment(text.NewSegment(2, len(src)-2)))

	// Node.Dump writes to stdout and provides now ay of overriding that
	// so we'll have to temporarily hijack os.Stdout.
	out, err := ioutil.TempFile(t.TempDir(), "stdout")
	require.NoError(t, err, "create temporary file")
	defer func(out *os.File) { os.Stdout = out }(os.Stdout)
	os.Stdout = out

	n.Dump(src, 0)

	require.NoError(t, out.Close(), "close stdout")

	got, err := ioutil.ReadFile(out.Name())
	require.NoError(t, err, "read stdout from %q", out.Name())

	want := strings.Join([]string{
		"WikiLink {",
		"    Target: My page",
		`    Text: "My page"`,
		"}",
		"",
	}, "\n")
	require.Equal(t, want, string(got), "dump output mismatch")
}
