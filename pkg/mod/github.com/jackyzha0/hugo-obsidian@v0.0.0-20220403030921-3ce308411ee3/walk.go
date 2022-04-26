package main

import (
	"fmt"
	"github.com/gernest/front"
	"io/fs"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// recursively walk directory and return all files with given extension
func walk(root, ext string, index bool, ignorePaths map[string]struct{}) (res []Link, i ContentIndex) {
	fmt.Printf("Scraping %s\n", root)
	i = make(ContentIndex)

	m := front.NewMatter()
	m.Handle("---", front.YAMLHandler)
	nPrivate := 0

	start := time.Now()

	err := filepath.WalkDir(root, func(fp string, d fs.DirEntry, e error) error {
		if e != nil {
			return e
		}

		// path normalize fp
		s := filepath.ToSlash(fp)
		if _, ignored := ignorePaths[s]; ignored {
			fmt.Printf("[Ignored] %s\n", d.Name())
			nPrivate++
		} else if filepath.Ext(d.Name()) == ext {
			res = append(res, parse(s, root)...)
			if index {
				text := getText(s)

				frontmatter, body, err := m.Parse(strings.NewReader(text))
				if err != nil {
					frontmatter = map[string]interface{}{}
					body = text
				}

				var title string
				if parsedTitle, ok := frontmatter["title"]; ok {
					title = parsedTitle.(string)
				} else {
					title = "Untitled Page"
				}

				// check if page is private
				if parsedPrivate, ok := frontmatter["draft"]; !ok || !parsedPrivate.(bool) {
					info, _ := os.Stat(s)
					source := processSource(trim(s, root, ".md"))

					// adjustedPath := UnicodeSanitize(strings.Replace(hugoPathTrim(trim(s, root, ".md")), " ", "-", -1))
					i[source] = Content{
						LastModified: info.ModTime(),
						Title:        title,
						Content:      body,
					}
				} else {
					fmt.Printf("[Ignored] %s\n", d.Name())
					nPrivate++
				}
			}
		}
		return nil
	})
	if err != nil {
		panic(err)
	}

	end := time.Now()

	fmt.Printf("[DONE] in %s\n", end.Sub(start).Round(time.Millisecond))
	fmt.Printf("Ignored %d private files \n", nPrivate)
	fmt.Printf("Parsed %d total links \n", len(res))
	return res, i
}

func getText(dir string) string {
	// read file
	fileBytes, err := ioutil.ReadFile(dir)
	if err != nil {
		panic(err)
	}

	return string(fileBytes)
}
