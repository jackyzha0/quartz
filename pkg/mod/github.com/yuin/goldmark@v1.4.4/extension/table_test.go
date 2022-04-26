package extension

import (
	"testing"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/ast"
	east "github.com/yuin/goldmark/extension/ast"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
	"github.com/yuin/goldmark/testutil"
	"github.com/yuin/goldmark/text"
	"github.com/yuin/goldmark/util"
)

func TestTable(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithUnsafe(),
			html.WithXHTML(),
		),
		goldmark.WithExtensions(
			Table,
		),
	)
	testutil.DoTestCaseFile(markdown, "_test/table.txt", t, testutil.ParseCliCaseArg()...)
}

func TestTableWithAlignDefault(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithXHTML(),
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewTable(
				WithTableCellAlignMethod(TableCellAlignDefault),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:          1,
			Description: "Cell with TableCellAlignDefault and XHTML should be rendered as an align attribute",
			Markdown: `
| abc | defghi |
:-: | -----------:
bar | baz
`,
			Expected: `<table>
<thead>
<tr>
<th align="center">abc</th>
<th align="right">defghi</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">bar</td>
<td align="right">baz</td>
</tr>
</tbody>
</table>`,
		},
		t,
	)

	markdown = goldmark.New(
		goldmark.WithRendererOptions(
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewTable(
				WithTableCellAlignMethod(TableCellAlignDefault),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:          2,
			Description: "Cell with TableCellAlignDefault and HTML5 should be rendered as a style attribute",
			Markdown: `
| abc | defghi |
:-: | -----------:
bar | baz
`,
			Expected: `<table>
<thead>
<tr>
<th style="text-align:center">abc</th>
<th style="text-align:right">defghi</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">bar</td>
<td style="text-align:right">baz</td>
</tr>
</tbody>
</table>`,
		},
		t,
	)
}

func TestTableWithAlignAttribute(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithXHTML(),
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewTable(
				WithTableCellAlignMethod(TableCellAlignAttribute),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:          1,
			Description: "Cell with TableCellAlignAttribute and XHTML should be rendered as an align attribute",
			Markdown: `
| abc | defghi |
:-: | -----------:
bar | baz
`,
			Expected: `<table>
<thead>
<tr>
<th align="center">abc</th>
<th align="right">defghi</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">bar</td>
<td align="right">baz</td>
</tr>
</tbody>
</table>`,
		},
		t,
	)

	markdown = goldmark.New(
		goldmark.WithRendererOptions(
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewTable(
				WithTableCellAlignMethod(TableCellAlignAttribute),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:          2,
			Description: "Cell with TableCellAlignAttribute and HTML5 should be rendered as an align attribute",
			Markdown: `
| abc | defghi |
:-: | -----------:
bar | baz
`,
			Expected: `<table>
<thead>
<tr>
<th align="center">abc</th>
<th align="right">defghi</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">bar</td>
<td align="right">baz</td>
</tr>
</tbody>
</table>`,
		},
		t,
	)
}

type tableStyleTransformer struct {
}

func (a *tableStyleTransformer) Transform(node *ast.Document, reader text.Reader, pc parser.Context) {
	cell := node.FirstChild().FirstChild().FirstChild().(*east.TableCell)
	cell.SetAttributeString("style", []byte("font-size:1em"))
}

func TestTableWithAlignStyle(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithXHTML(),
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewTable(
				WithTableCellAlignMethod(TableCellAlignStyle),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:          1,
			Description: "Cell with TableCellAlignStyle and XHTML should be rendered as a style attribute",
			Markdown: `
| abc | defghi |
:-: | -----------:
bar | baz
`,
			Expected: `<table>
<thead>
<tr>
<th style="text-align:center">abc</th>
<th style="text-align:right">defghi</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">bar</td>
<td style="text-align:right">baz</td>
</tr>
</tbody>
</table>`,
		},
		t,
	)

	markdown = goldmark.New(
		goldmark.WithRendererOptions(
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewTable(
				WithTableCellAlignMethod(TableCellAlignStyle),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:          2,
			Description: "Cell with TableCellAlignStyle and HTML5 should be rendered as a style attribute",
			Markdown: `
| abc | defghi |
:-: | -----------:
bar | baz
`,
			Expected: `<table>
<thead>
<tr>
<th style="text-align:center">abc</th>
<th style="text-align:right">defghi</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">bar</td>
<td style="text-align:right">baz</td>
</tr>
</tbody>
</table>`,
		},
		t,
	)

	markdown = goldmark.New(
		goldmark.WithParserOptions(
			parser.WithASTTransformers(
				util.Prioritized(&tableStyleTransformer{}, 0),
			),
		),
		goldmark.WithRendererOptions(
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewTable(
				WithTableCellAlignMethod(TableCellAlignStyle),
			),
		),
	)

	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:          3,
			Description: "Styled cell should not be broken the style by the alignments",
			Markdown: `
| abc | defghi |
:-: | -----------:
bar | baz
`,
			Expected: `<table>
<thead>
<tr>
<th style="font-size:1em;text-align:center">abc</th>
<th style="text-align:right">defghi</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">bar</td>
<td style="text-align:right">baz</td>
</tr>
</tbody>
</table>`,
		},
		t,
	)
}

func TestTableWithAlignNone(t *testing.T) {
	markdown := goldmark.New(
		goldmark.WithRendererOptions(
			html.WithXHTML(),
			html.WithUnsafe(),
		),
		goldmark.WithExtensions(
			NewTable(
				WithTableCellAlignMethod(TableCellAlignNone),
			),
		),
	)
	testutil.DoTestCase(
		markdown,
		testutil.MarkdownTestCase{
			No:          1,
			Description: "Cell with TableCellAlignStyle and XHTML should not be rendered",
			Markdown: `
| abc | defghi |
:-: | -----------:
bar | baz
`,
			Expected: `<table>
<thead>
<tr>
<th>abc</th>
<th>defghi</th>
</tr>
</thead>
<tbody>
<tr>
<td>bar</td>
<td>baz</td>
</tr>
</tbody>
</table>`,
		},
		t,
	)
}
