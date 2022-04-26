package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
)

const outPath = "../util/unicode_case_folding.go"

type caseFolding struct {
	Class byte
	From  rune
	To    []rune
}

func main() {
	url := "http://www.unicode.org/Public/12.1.0/ucd/CaseFolding.txt"

	resp, err := http.Get(url)
	if err != nil {
		fmt.Printf("Failed to get CaseFolding.txt: %v\n", err)
		os.Exit(1)
	}
	defer resp.Body.Close()

	bs, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to get CaseFolding.txt: %v\n", err)
		os.Exit(1)
	}

	buf := bytes.NewBuffer(bs)
	scanner := bufio.NewScanner(buf)
	f, err := os.Create(outPath)
	if err != nil {
		fmt.Printf("Failed to open %s: %v\n", outPath, err)
		os.Exit(1)
	}
	defer f.Close()
	_, _ = f.WriteString("package util\n\n")
	_, _ = f.WriteString("var unicodeCaseFoldings = map[rune][]rune {\n")

	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "#") || len(strings.TrimSpace(line)) == 0 {
			continue
		}
		line = strings.Split(line, "#")[0]
		parts := strings.Split(line, ";")
		for i, p := range parts {
			parts[i] = strings.TrimSpace(p)
		}
		cf := caseFolding{}
		v, _ := strconv.ParseInt(parts[0], 16, 32)
		cf.From = rune(int32(v))
		cf.Class = parts[1][0]
		for _, v := range strings.Split(parts[2], " ") {
			c, _ := strconv.ParseInt(v, 16, 32)
			cf.To = append(cf.To, rune(int32(c)))
		}
		if cf.Class != 'C' && cf.Class != 'F' {
			continue
		}
		fmt.Fprintf(f, "  %#x : %#v,\n", cf.From, cf.To)
	}
	fmt.Fprintf(f, "}\n")
}
