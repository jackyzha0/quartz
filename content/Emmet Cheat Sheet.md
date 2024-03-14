---
title: Emmet Cheat Sheet
compartir: true
---

- [Documentation](https://docs.emmet.io/)
- [Documentation](https://code.visualstudio.com/docs/editor/emmet) for Emmet in VS Code

## Notes on Abbreviation Formatting

When you get familiar with Emmet's abbreviations syntax, you may want to use some formatting to make your abbreviations more readable. But it won't work, because space is a *stop symbol,* where Emmet stops abbreviation parsing. Many users mistakenly think that each abbreviation should be written in a new line, but they are wrong: you can type and expand the abbreviation anywhere in the text.

This is why Emmet needs some indicators (like spaces) where it should stop parsing to not expand anything that you don't need. If you're still thinking that such formatting is required for complex abbreviations to make them more readable:

- Abbreviations are not a template language, they don't have to be "readable", they have to be "quickly expandable and removable".
- You don't really need to write complex abbreviations. Stop thinking that "typing" is the slowest process in web-development. You'll quickly find out that constructing a single complex abbreviation is much slower and error-prone than constructing and typing a few short ones.

## HTML + CSS Emmet Short Guide

Emmet abbreviation and snippet expansions are enabled by default in `html`, `haml`, `pug`, `slim`, `jsx`, `xml`, `xsl`, `[[CSS]]`, `scss`, `sass`, `less` and `stylus` files, as well as any language that inherits from any of the above like `handlebars` and `php`.

## Children

```css
div>ul>li
```

```html
<div>
  <ul>
    <li></li>
  </ul>
</div>
```

## Siblings

```css
div + p + bq
```

```html
<div></div>
<p></p>
<blockquote></blockquote>
```

## Climb-up

```css
div+div>p>span+em
```

```html<div></div>
<div>
    <p><span></span><em></em></p>
</div>
```

```css
div+div>p>span+em^bq
```

```html<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```

```css
div+div>p>span+em^^^bq
```

```html
<div></div>
<div>
  <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

## Multiplication

```css
ul>li*5
```

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

## Grouping

```css
div>(header>ul>li*2>a)+footer>p
```

```html
<div>
  <header>
    <ul>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
    </ul>
  </header>
  <footer>
    <p></p>
  </footer>
</div>
```

```css
(div>dl>(dt+dd)*3)+footer>p
```

```html
<div>
  <dl>
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
  </dl>
</div>
<footer>
  <p></p>
</footer>
```

## ID and Classes

```css
div#header+div.page+div#footer.class1.class2.class3
```

```html
<div id="header"></div>
<div class="page"></div>
<div
  id="footer"
  class="class1 class2 class3"
></div>
```

## Custom Attributes

```css
td[title="Hello world!" colspan=3]
```

```html
<td
  title="Hello world!"
  colspan="3"
></td>
```

## Item Numbering

```css
ul>li.item$*5
```

```html
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
```

```css
ul>li.item$$$*5
```

```html
<ul>
  <li class="item001"></li>
  <li class="item002"></li>
  <li class="item003"></li>
  <li class="item004"></li>
  <li class="item005"></li>
</ul>
```

## Changing Numbering Base and Direction

```css
ul>li.item$@-*5
```

```html<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

```css
ul>li.item$@3*5
```

```html<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```

```css
ul>li.item$@-3*5
```

```html
<ul>
  <li class="item7"></li>
  <li class="item6"></li>
  <li class="item5"></li>
  <li class="item4"></li>
  <li class="item3"></li>
</ul>
```

## Text

```css
a{Click me}
```

```html
<a href="">Click me</a>
```

```css
a{click}+b{here}
```

```html
<a href="">click</a><b>here</b>
```

```css
a>{click}+b{here}
```

```html
<a href="">click<b>here</b></a>
```

```css
p>{Click }+a{here}+{ to continue}
```

```html
<p>Click <a href="">here</a> to continue</p>
```

```css
p{Click }+a{here}+{ to continue}
```

```html
<p>Click</p>
<a href="">here</a> to continue
```
