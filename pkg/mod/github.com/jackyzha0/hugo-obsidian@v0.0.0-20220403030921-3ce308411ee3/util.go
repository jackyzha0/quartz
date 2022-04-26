package main

import (
	"fmt"
	"net/url"
	"path/filepath"
	"strings"
	"unicode"
)

func trim(source, prefix, suffix string) string {
	return strings.TrimPrefix(strings.TrimSuffix(source, suffix), prefix)
}

func hugoPathTrim(source string) string {
	return strings.TrimSuffix(strings.TrimSuffix(source, "/index"), "_index")
}

func processTarget(source string) string {
	if !isInternal(source) {
		return source
	}
	if strings.HasPrefix(source, "/") {
		return strings.TrimSuffix(source, ".md")
	}
	res := "/" + strings.TrimSuffix(strings.TrimSuffix(source, ".html"), ".md")
	res, _ = url.PathUnescape(res)
	res = strings.Split(res, "#")[0]
	res = strings.TrimSpace(res)
	res = UnicodeSanitize(res)
	return strings.ReplaceAll(url.PathEscape(res), "%2F", "/")
}

func processSource(source string) string {
	res := filepath.ToSlash(hugoPathTrim(source))
	res = UnicodeSanitize(res)
	return strings.ReplaceAll(url.PathEscape(res), "%2F", "/")
}

func isInternal(link string) bool {
	return !strings.HasPrefix(link, "http")
}

// From https://golang.org/src/net/url/url.go
func ishex(c rune) bool {
	switch {
	case '0' <= c && c <= '9':
		return true
	case 'a' <= c && c <= 'f':
		return true
	case 'A' <= c && c <= 'F':
		return true
	}
	return false
}

// UnicodeSanitize sanitizes string to be used in Hugo URL's
// from https://github.com/gohugoio/hugo/blob/93aad3c543828efca2adeb7f96cf50ae29878593/helpers/path.go#L94
func UnicodeSanitize(s string) string {
	source := []rune(s)
	target := make([]rune, 0, len(source))
	var prependHyphen bool

	for i, r := range source {
		isAllowed := r == '.' || r == '/' || r == '\\' || r == '_' || r == '#' || r == '+' || r == '~'
		isAllowed = isAllowed || unicode.IsLetter(r) || unicode.IsDigit(r) || unicode.IsMark(r)
		isAllowed = isAllowed || (r == '%' && i+2 < len(source) && ishex(source[i+1]) && ishex(source[i+2]))

		if isAllowed {
			if prependHyphen {
				target = append(target, '-')
				prependHyphen = false
			}
			target = append(target, r)
		} else if len(target) > 0 && (r == '-' || unicode.IsSpace(r)) {
			prependHyphen = true
		}
	}

	return string(target)
}

// filter out certain links (e.g. to media)
func filter(links []Link) (res []Link) {
	for _, l := range links {
		// filter external and non-md
		isMarkdown := filepath.Ext(l.Target) == "" || filepath.Ext(l.Target) == ".md"
		if isInternal(l.Target) && isMarkdown {
			res = append(res, l)
		}
	}
	fmt.Printf("Removed %d external and non-markdown links\n", len(links)-len(res))
	return res
}
