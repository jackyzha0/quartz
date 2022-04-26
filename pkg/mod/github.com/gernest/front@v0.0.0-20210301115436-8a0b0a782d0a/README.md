# front [![Build Status](https://travis-ci.org/gernest/front.svg)](https://travis-ci.org/gernest/front) [![GoDoc](https://godoc.org/github.com/gernest/front?status.svg)](https://godoc.org/github.com/gernest/front)[![Coverage Status](https://coveralls.io/repos/gernest/front/badge.svg?branch=master&service=github)](https://coveralls.io/github/gernest/front?branch=master)

extracts frontmatter from text files with ease.

## Features
* Custom delimiters. You are free to register any delimiter of your choice. Provided its a three character string. e.g `+++`,  `$$$`,  `---`,  `%%%`
* Custom Handlers. Anything that implements `HandlerFunc` can be used to decode the values from the frontmatter text, you can see the `JSONHandler` for how to implement one.
* Support YAML frontmatter
* Support JSON frontmatter.

## Installation

	go get github.com/gernest/front

## How to use

```go
package main

import (
	"fmt"
	"strings"

	"github.com/gernest/front"
)

var txt = `+++
{
    "title":"front"
}
+++

# Body
Over my dead body
`

func main() {
	m := front.NewMatter()
	m.Handle("+++", front.JSONHandler)
	f, body, err := m.Parse(strings.NewReader(txt))
	if err != nil {
		panic(err)
	}

	fmt.Printf("The front matter is:\n%#v\n", f)
	fmt.Printf("The body is:\n%q\n", body)
}
```

Please see the tests formore details

## Licence

This project is under the MIT Licence. See the [LICENCE](LICENCE) file for the full license text.

