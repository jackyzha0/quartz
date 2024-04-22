---
title: Cascading Style Sheets
aliases:
  - CSS
compartir: true
---
CSS (Cascading Style Sheets) is a language used to describe the visual appearance and formatting of HTML documents. It defines how elements are presented on web pages, including layout, color, typography, and more. It enhances the aesthetics and overall user experience of websites.

## CSS Frameworks

CSS frameworks are pre-prepared collections of CSS stylesheets that help developers create visually appealing and responsive websites. These frameworks provide a set of standardized and reusable CSS components, layout systems, and pre-designed templates, making it easier to build attractive and consistent web pages.

One popular CSS framework that deserves special mention is [[Bulma|Bulma]]. Why does it deserve especial attention? Because I like it. 😅

Known for its simplicity and flexibility, [[Bulma|Bulma]] has gained significant traction among web developers. Here's a closer look at why it has become a go-to choice for many.

## Common Breakpoints

Based on Bootstrap: 320px, 576px, 768px, 992px, 1200px, 1400px, 1600px.

You can pick any breakpoint you want, it largely depends on what content your dealing with. Sometimes I swap 576px for 600px, just be consistent.

## Mixins

All _mobile-first-designs_ media queries and 1 _desktop-first-design_ media query per given CSS class.

### Anything Above a Certain Screen Width (_mobile-first-design_)

```scss
@mixin screen-min($min) {
  @media (min-width: $min) {
    @content;
  }
}
```

### Anything Below a Certain Screen Width (_desktop-first-design_)

```scss
@mixin screen-max($max) {
  @media (max-width: $max - 1) {
    @content;
  }
}
```

### Anything In-between Two Values (_hybrid_)

```scss
@mixin screen-minmax($min, $max) {
  @media (min-width: $min) and (max-width: $max - 1) {
    @content;
  }
}
```

```scss
------------------------------------------------------------------
// USING THE MIXINS
// Example - Writing a custom bootstrap-like container from scratch
------------------------------------------------------------------

.container {
  margin: 0 auto;
  width: 100%;
  @include screen-min(768px) {
    max-width: 750px;
  }
  @include screen-min(992px) {
    max-width: 970px;
  }
  @include screen-min(1200px) {
    max-width: 1170px;
  }
  @include screen-min(1400px) {
    max-width: 1370px;
  }
  @include screen-min(1600px) {
    max-width: 1570px;
  }
}
```
