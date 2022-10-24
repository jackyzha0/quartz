---
title: "css"
aliases: 
tags: 
- cosc203
---

# Structure
```css
h1(selector) {
	color(property): red(value/function); \
	font-size: 5em;						  / - declarations
}
```


# Selectors
Types
- Universal: `*`
- Type: `main`
- Class: `.myclass`
- Id: `#myID`

adjacent: `p + li {...}`
descendant: `p li {...}`

```css
/* selects any <span> that is inside a <p>, which is inside an
<article> */
article p span { }

/* selects any <p> that comes directly after a <ul>, which
comes directly after an <h1> */
h1 + ul + p { }
```

Pseudo Classes: 
- `a:link {...}`
- `a:visited {...}`
- `a:hover {...}`
- etc

Pseudo Elements
- `p::first-line {...}`

## Specificity
Rules at a higher level of specificity will override a rule at a lower level

Types
- Universal: 1
- Type: 10
- Class: 100
- Id: 1000

# Tables

