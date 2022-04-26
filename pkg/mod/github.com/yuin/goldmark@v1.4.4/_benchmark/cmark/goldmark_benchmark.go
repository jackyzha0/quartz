package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"time"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/renderer/html"
)

func main() {
	n := 50
	file := "_data.md"
	if len(os.Args) > 1 {
		n, _ = strconv.Atoi(os.Args[1])
	}
	if len(os.Args) > 2 {
		file = os.Args[2]
	}
	source, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	markdown := goldmark.New(goldmark.WithRendererOptions(html.WithXHTML(), html.WithUnsafe()))
	var out bytes.Buffer
	markdown.Convert([]byte(""), &out)

	sum := time.Duration(0)
	for i := 0; i < n; i++ {
		start := time.Now()
		out.Reset()
		if err := markdown.Convert(source, &out); err != nil {
			panic(err)
		}
		sum += time.Since(start)
	}
	fmt.Printf("------- goldmark -------\n")
	fmt.Printf("file: %s\n", file)
	fmt.Printf("iteration: %d\n", n)
	fmt.Printf("average: %.10f sec\n", float64((int64(sum)/int64(n)))/1000000000.0)
}
