package cascadia

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"reflect"
	"testing"

	"golang.org/x/net/html"
)

func TestInvalidSelectors(t *testing.T) {
	c, err := ioutil.ReadFile("test_resources/invalid_selectors.json")
	if err != nil {
		t.Fatal(err)
	}
	var tests []invalidSelector
	if err = json.Unmarshal(c, &tests); err != nil {
		t.Fatal(err)
	}
	for _, test := range tests {
		_, err := ParseGroupWithPseudoElements(test.Selector)
		if err == nil {
			t.Fatalf("%s -> expected error on invalid selector : %s", test.Name, test.Selector)
		}
	}
}

func parseReference(filename string) *html.Node {
	f, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	node, err := html.Parse(f)
	if err != nil {
		log.Fatal(err)
	}
	return node
}

func getId(n *html.Node) string {
	for _, attr := range n.Attr {
		if attr.Key == "id" {
			return attr.Val
		}
	}
	return ""
}

func isEqual(m map[string]int, l []string) bool {
	expected := map[string]int{}
	for _, s := range l {
		expected[s]++
	}
	return reflect.DeepEqual(m, expected)
}

func loadValidSelectors(t *testing.T) []validSelector {
	c, err := ioutil.ReadFile("test_resources/valid_selectors.json")
	if err != nil {
		t.Fatal(err)
	}
	var tests []validSelector
	if err = json.Unmarshal(c, &tests); err != nil {
		t.Fatal(err)
	}
	return tests
}

func TestValidSelectors(t *testing.T) {
	tests := loadValidSelectors(t)
	doc := parseReference("test_resources/content.xhtml")
	for i, test := range tests {
		if test.Xfail {
			t.Logf("skiped test %s", test.Name)
			continue
		}
		sels, err := ParseGroupWithPseudoElements(test.Selector)
		if err != nil {
			t.Fatalf("%s -> unable to parse valid selector : %s : %s", test.Name, test.Selector, err)
		}
		matchingNodes := map[*html.Node]bool{}
		for _, sel := range sels {
			if sel.PseudoElement() != "" {
				continue // pseudo element doesn't count as a match in this test since they are not part of the document
			}
			for _, node := range Selector(sel.Match).MatchAll(doc) {
				matchingNodes[node] = true
			}
		}
		matchingIds := map[string]int{}
		for node := range matchingNodes {
			matchingIds[getId(node)]++
		}
		if !isEqual(matchingIds, test.Expect) {
			t.Fatalf("test %d %s : expected %v got %v", i, test.Name, test.Expect, matchingIds)
		}

	}
}
