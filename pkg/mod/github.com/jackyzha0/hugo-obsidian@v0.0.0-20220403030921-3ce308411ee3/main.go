package main

import (
	"flag"
	"github.com/BurntSushi/toml"
	wikilink "github.com/abhinav/goldmark-wikilink"
	"github.com/yuin/goldmark"
	"io/ioutil"
	"path/filepath"
	"time"
)

var md goldmark.Markdown

func init() {
	md = goldmark.New(
		goldmark.WithExtensions(&wikilink.Extender{}),
	)
}

type Link struct {
	Source string `json:"source"`
	Target string `json:"target"`
	Text   string `json:"text"`
}

type LinkTable = map[string][]Link
type Index struct {
	Links     LinkTable `json:"links"`
	Backlinks LinkTable `json:"backlinks"`
}

type Content struct {
	Title        string    `json:"title"`
	Content      string    `json:"content"`
	LastModified time.Time `json:"lastmodified"`
	Tags         []string  `json:"tags"`
}

type ContentIndex = map[string]Content

type ConfigTOML struct {
	IgnoredFiles []string `toml:"ignoreFiles"`
}

func getIgnoredFiles(base string) (res map[string]struct{}) {
	res = make(map[string]struct{})

	source, err := ioutil.ReadFile(filepath.FromSlash(base + "/config.toml"))
	if err != nil {
		return res
	}

	var config ConfigTOML
	if _, err := toml.Decode(string(source), &config); err != nil {
		return res
	}

	for _, glb := range config.IgnoredFiles {
		matches, _ := filepath.Glob(base + glb)
		for _, match := range matches {
			res[match] = struct{}{}
		}
	}

	return res
}

func main() {
	in := flag.String("input", ".", "Input Directory")
	out := flag.String("output", ".", "Output Directory")
	root := flag.String("root", "..", "Root Directory (for config parsing)")
	index := flag.Bool("index", false, "Whether to index the content")
	flag.Parse()

	ignoreBlobs := getIgnoredFiles(*root)
	l, i := walk(*in, ".md", *index, ignoreBlobs)
	f := filter(l)
	err := write(f, i, *index, *out)
	if err != nil {
		panic(err)
	}
}
