// Package front is a frontmatter extraction library.
package front

import (
	"bufio"
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"strings"

	"gopkg.in/yaml.v2"
)

var (
	//ErrIsEmpty is an error indicating no front matter was found
	ErrIsEmpty = errors.New("front: an empty file")

	//ErrUnknownDelim is returned when the delimiters are not known by the
	//FrontMatter implementation.
	ErrUnknownDelim = errors.New("front: unknown delim")
)

type (
	//HandlerFunc is an interface for a function that process front matter text.
	HandlerFunc func(string) (map[string]interface{}, error)
)

//Matter is all what matters here.
type Matter struct {
	handlers map[string]HandlerFunc
}

//NewMatter creates a new Matter instance
func NewMatter() *Matter {
	return &Matter{handlers: make(map[string]HandlerFunc)}
}

//Handle registers a handler for the given frontmatter delimiter
func (m *Matter) Handle(delim string, fn HandlerFunc) {
	m.handlers[delim] = fn
}

// Parse parses the input and extract the frontmatter
func (m *Matter) Parse(input io.Reader) (front map[string]interface{}, body string, err error) {
	return m.parse(input)
}
func (m *Matter) parse(input io.Reader) (front map[string]interface{}, body string, err error) {
	var getFront = func(f string) string {
		return strings.TrimSpace(f[3:])
	}
	f, body, err := m.splitFront(input)
	if err != nil {
		return nil, "", err
	} else if len(f) < 3 {
		return map[string]interface{}{}, body, nil
	}
	h := m.handlers[f[:3]]
	front, err = h(getFront(f))
	if err != nil {
		return nil, "", err
	}
	return front, body, nil

}
func sniffDelim(input []byte) (string, error) {
	if len(input) < 4 {
		return "", ErrIsEmpty
	}
	return string(input[:3]), nil
}

func (m *Matter) splitFront(input io.Reader) (front, body string, err error) {
	bufsize := 1024 * 1024
	buf := make([]byte, bufsize)

	s := bufio.NewScanner(input)
	// Necessary so we can handle larger than default 4096b buffer
	s.Buffer(buf, bufsize)

	rst := make([]string, 2)
	s.Split(m.split)
	n := 0
	for s.Scan() {
		if n == 0 {
			rst[0] = s.Text()
		} else if n == 1 {
			rst[1] = s.Text()
		}
		n++
	}
	if err = s.Err(); err != nil {
		return
	}
	return rst[0], rst[1], nil
}

//split implements bufio.SplitFunc for spliting front matter from the body text.
func (m *Matter) split(data []byte, atEOF bool) (advance int, token []byte, err error) {
	if atEOF && len(data) == 0 {
		return 0, nil, nil
	}
	delim, err := sniffDelim(data)
	if err != nil {
		return 0, nil, err
	}
	if _, ok := m.handlers[delim]; !ok {
		return 0, nil, ErrUnknownDelim
	}
	if x := bytes.Index(data, []byte(delim)); x >= 0 {
		// check the next delim index
		if next := bytes.Index(data[x+len(delim):], []byte(delim)); next > 0 {
			return next + len(delim), dropSpace(data[:next+len(delim)]), nil
		}
		return len(data), dropSpace(data[x+len(delim):]), nil
	}
	if atEOF {
		return len(data), data, nil
	}
	return 0, nil, nil
}

func dropSpace(d []byte) []byte {
	return bytes.TrimSpace(d)
}

//JSONHandler implements HandlerFunc interface. It extracts front matter data from the given
// string argument by interpreting it as a json string.
func JSONHandler(front string) (map[string]interface{}, error) {
	var rst interface{}
	err := json.Unmarshal([]byte(front), &rst)
	if err != nil {
		return nil, err
	}
	return rst.(map[string]interface{}), nil
}

//YAMLHandler decodes ymal string into a go map[string]interface{}
func YAMLHandler(front string) (map[string]interface{}, error) {
	out := make(map[string]interface{})
	err := yaml.Unmarshal([]byte(front), out)
	if err != nil {
		return nil, err
	}
	return out, nil
}
