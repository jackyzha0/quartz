---
title: Markdown Showcase
description: "This is intended as a quick reference and showcase of Markdown's synthax."
tags: [markdown, reference]
compartir: true
date: 2022-12-31
updated: 2023-10-11
---

This is intended as a quick reference and showcase of Markdown's synthax.

<!-- more -->

# Heading Level 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum neque eget nunc mattis eu sollicitudin enim tincidunt. Vestibulum lacus tortor, ultricies id dignissim ac, bibendum in velit.

## Heading Level 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum neque eget nunc mattis eu sollicitudin enim tincidunt. Vestibulum lacus tortor, ultricies id dignissim ac, bibendum in velit.

### Heading Level 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum neque eget nunc mattis eu sollicitudin enim tincidunt. Vestibulum lacus tortor, ultricies id dignissim ac, bibendum in velit.

#### Heading Level 4

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum neque eget nunc mattis eu sollicitudin enim tincidunt.

##### Heading Level 5

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum neque eget nunc mattis eu sollicitudin enim tincidunt.

###### Heading Level 6

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Text Formatting

Text can be **bold**, _italic_, or ~~strikethrough~~.  
**Bold**, _Italic_, _**Both**_.  
**Bold**, _Italic_, ~~Strikethrough~~, ~~_**ALL OF THEM**_~~.

## Links

You can [link](https://example.dom/) to external pages. and other internal [[./Markdown|links]].

## Blockquotes

### Simple Example

> This is a blockquote  
> with several lines

### Formatted Example

> **Blockquote Embedded List**
> 1. This is the first list item.
> 2. This is the second list item.
> 
> Here's some example code:
> `Markdown.generate();`

## Lists

### Ordered List

In arcu magna, aliquet vel pretium et, molestie et arcu. Mauris lobortis nulla et felis ullamcorper bibendum. Phasellus et hendrerit mauris.

1. First item
2. Second item
3. Third item

### Unordered List

In arcu magna, aliquet vel pretium et, molestie et arcu. Mauris lobortis nulla et felis ullamcorper bibendum. Phasellus et hendrerit mauris.

* List item
* Another item
* And another item

### Nested List

In arcu magna, aliquet vel pretium et, molestie et arcu. Mauris lobortis nulla et felis ullamcorper bibendum. Phasellus et hendrerit mauris.

* Item
	1. First Sub-item
	2. Second Sub-item
1. Numbered Item
2. Another one
	1. Sub-item
	* Unordered again

## Code

### Inline Code

Let us use some `inline code` and check out how it `looks`. Here's some `more`.

### Code Blocks

```html
<html>
  <head>
		<div style="background-color: #333;">
			<a href="https://example.com/">Example</a>
		</div>
	</head>
</html>
```

```css
.niceClass {
	color: blue;
	background-color: #fff;
}
```

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

## Tables

In arcu magna, aliquet vel pretium et, molestie et arcu. Mauris lobortis nulla et felis ullamcorper bibendum. Phasellus et hendrerit mauris.

|head one|head two|head three|
|---|:---:|---:|
|ok|good swedish fish|nice|
|out of stock|good and plenty|nice|
|ok|good `oreos`|hmm|
|ok|good `zoute` drop|yumm|

### Simple Example

Title 1               | Title 2               | Title 3               | Title 4
--------------------- | --------------------- | --------------------- | ---------------------
lorem                 | lorem ipsum           | lorem ipsum dolor     | lorem ipsum dolor sit
lorem ipsum dolor sit | lorem ipsum dolor sit | lorem ipsum dolor sit | lorem ipsum dolor sit
lorem ipsum dolor sit | lorem ipsum dolor sit | lorem ipsum dolor sit | lorem ipsum dolor sit
lorem ipsum dolor sit | lorem ipsum dolor sit | lorem ipsum dolor sit | lorem ipsum dolor sit

### Longer Example

Title 1 | Title 2 | Title 3 | Title 4
--- | --- | --- | ---
lorem | lorem ipsum | lorem ipsum dolor | lorem ipsum dolor sit
lorem ipsum dolor sit amet | lorem ipsum dolor sit amet consectetur | lorem ipsum dolor sit amet | lorem ipsum dolor sit
lorem ipsum dolor | lorem ipsum | lorem | lorem ipsum
lorem ipsum dolor | lorem ipsum dolor sit | lorem ipsum dolor sit amet | lorem ipsum dolor sit amet consectetur

### Inline Markdown Within Tables

| Inline&nbsp;&nbsp;&nbsp;     | Markdown&nbsp;&nbsp;&nbsp;  | In&nbsp;&nbsp;&nbsp;                | Table      |
| ---------- | --------- | ----------------- | ---------- |
| _italics_  | **bold**  | ~~strikethrough~~&nbsp;&nbsp;&nbsp; | `code`     |

## Horizontal Rule

---

## Tasks and Custom Todos

- [ ] Pending Task
- [x] Completed Task
* [-] Won't Do Task
* [/] In Progress Task
* [*] You are a star.
* [!] Exclamation Mark!
* [?] Question Mark?
* [<] Scheduled Task
* [>] Forwarded Task

## Images

![image](https://just-the-docs.com/assets/images/small-image.jpg)

## Other Elements — Abbr, Sub, Sup, Kbd, Mark

### Description

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

### Subscript

H<sub>2</sub>O

### Superscript

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

### Keys Representation

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.

### Highlighting

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.

## Callouts

> [!EXAMPLE] Examples
> 
> Aliases: example

> [!note] Notes
> 
> Aliases: note

> [!abstract] Summaries
> 
> Aliases: abstract, summary, tldr

> [!info] Info
> 
> Aliases: info, todo

> [!tip] Hint
> 
> Aliases: tip, hint, important

> [!success] Success
> 
> Aliases: success, check, done

> [!question] Question
> 
> Aliases: question, help, faq

> [!warning] Warning
> 
> Aliases: warning, caution, attention

> [!failure] Failure
> 
> Aliases: failure, fail, missing

> [!danger] Error
> 
> Aliases: danger, error

> [!bug] Bug
> 
> Aliases: bug

> [!quote] Quote
> 
> Aliases: quote, cite
