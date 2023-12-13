---
title: Notes on CSS
compartir: true
updated: 2023-12-12
---

## Breakpoints

Based on Bootstrap: 320px, 576px, 768px, 992px, 1200px, 1400px, 1600px.

You can pick any breakpoint you want, it largely depends on what content your dealing with. Sometimes I swap 576px for 600px, just be consistent.

## Mixins

All _mobile-first-designs_ media queries and 1 _desktop-first-design_ media query per given CSS class.

### Anything Above a Certain Screen Width (_mobile-first-design_)

```scss
@mixin screen-min($min) {
  @media (min-width: $min) {
    @content
  }
};
```

### Anything Below a Certain Screen Width (_desktop-first-design_)

```scss
@mixin screen-max($max) {
  @media (max-width: $max - 1) {
    @content
  }
};
```

### Anything In-between Two Values (_hybrid_)

```scss
@mixin screen-minmax($min, $max){
  @media (min-width: $min) and (max-width: $max - 1){
    @content
  }
};
```

```scss
------------------------------------------------------------------
// USING THE MIXINS
// Example - Writing a custom bootstrap-like container from scratch
------------------------------------------------------------------

.container {
  margin: 0 auto;
  width: 100%;
  @include screen-min(768px){max-width: 750px;}
  @include screen-min(992px){max-width: 970px;}
  @include screen-min(1200px){max-width: 1170px;}
  @include screen-min(1400px){max-width: 1370px;}
  @include screen-min(1600px){max-width: 1570px;}
}
```
