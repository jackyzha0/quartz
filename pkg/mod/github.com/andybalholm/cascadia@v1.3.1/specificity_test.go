package cascadia

import (
	"fmt"
	"strings"
	"testing"

	"golang.org/x/net/html"
)

type testSpec struct {
	// html, css selector
	HTML, selector string
	// correct specificity
	spec Specificity
}

var testsSpecificity = []testSpec{
	{
		HTML:     `<html><body><div><div><a href="http://www.foo.com"></a></div></div></body></html>`,
		selector: ":not(em, strong#foo)",
		spec:     Specificity{1, 0, 1},
	},
	{
		HTML:     `<html><body><div><div><a href="http://www.foo.com"></a></div></div></body></html>`,
		selector: "*",
		spec:     Specificity{0, 0, 0},
	},
	{
		HTML:     `<html><body><div><div><ul></ul></div></div></body></html>`,
		selector: "ul",
		spec:     Specificity{0, 0, 1},
	},
	{
		HTML:     `<html><body><div><ul><li></li></ul></div></body></html>`,
		selector: "ul li",
		spec:     Specificity{0, 0, 2},
	},
	{
		HTML:     `<html><body><div><ul><ol></ol><li></li></ul></div></body></html>`,
		selector: "ul ol+li",
		spec:     Specificity{0, 0, 3},
	},
	{
		HTML:     `<html><body><div><ul><h1></h1><li rel="up"></li></ul></div></body></html>`,
		selector: "H1 + *[REL=up] ",
		spec:     Specificity{0, 1, 1},
	},
	{
		HTML:     `<html><body><ul><ol><li class="red"></li></ol></ul></body></html>`,
		selector: "UL OL LI.red",
		spec:     Specificity{0, 1, 3},
	},
	{
		HTML:     `<html><body><ul><ol><li class="red level"></li></ol></ul></body></html>`,
		selector: "LI.red.level",
		spec:     Specificity{0, 2, 1},
	},
	{
		HTML:     `<html><body><ul><ol><li id="x34y"></li></ol></ul></body></html>`,
		selector: "#x34y",
		spec:     Specificity{1, 0, 0},
	},
	{
		HTML:     `<html><body><ul><ol><li id="s12"></li></ol></ul></body></html>`,
		selector: "#s12:not(FOO)",
		spec:     Specificity{1, 0, 1},
	},
	{
		HTML:     `<html><body><ul><ol><li id="s12"></li></ol></ul></body></html>`,
		selector: "#s12:not(FOO)",
		spec:     Specificity{1, 0, 1},
	},
	{
		HTML:     `<html><body><ul><ol><li id="s12"></li></ol></ul></body></html>`,
		selector: "#s12:empty",
		spec:     Specificity{1, 1, 0},
	},
	{
		HTML:     `<html><body><ul><ol><li id="s12"></li></ol></ul></body></html>`,
		selector: "#s12:only-child",
		spec:     Specificity{1, 1, 0},
	},
}

func setupSel(selector, HTML string) (Sel, *html.Node, error) {
	s, err := Parse(selector)
	if err != nil {
		return nil, nil, fmt.Errorf("error compiling %q: %s", selector, err)
	}

	doc, err := html.Parse(strings.NewReader(HTML))
	if err != nil {
		return nil, nil, fmt.Errorf("error parsing %q: %s", HTML, err)
	}
	return s, doc, nil
}

func TestSpecificity(t *testing.T) {
	for _, test := range testsSpecificity {
		s, doc, err := setupSel(test.selector, test.HTML)
		if err != nil {
			t.Fatal(err)
		}
		body := doc.FirstChild.LastChild
		testNode := body.FirstChild.FirstChild.LastChild
		if !s.Match(testNode) {
			t.Errorf("%s didn't match (html tree : \n %s) \n", test.selector, nodeString(doc))
			continue
		}
		gotSpec := s.Specificity()
		if gotSpec != test.spec {
			t.Errorf("wrong specificity : expected %v, got %v", test.spec, gotSpec)
		}
	}
}

func TestCompareSpecificity(t *testing.T) {
	s1, s2 := Specificity{1, 1, 0}, Specificity{1, 0, 0}
	if s1.Less(s2) {
		t.Fatal()
	}

	if s1.Less(s1) {
		t.Fatal()
	}
}
