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

Combining
- grouping: `p, li`
- adjacent: `p + li`
- descendant: `p li`
- direct descendant: `div > h1`
- general sibling: `div ~ h1`
- chaining: `.class1.class2`
- attribute: `div[lang]`

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

## Inheritance
Some properties like color are inherited by some children elements. width, margin, padding, border are not inherited

Controls
- inherit: sets property to the same as parent element
- inital: sets property value to inital/default value of that property
- unset: sets property to natural value (inherit or dont inherit)

## Cascade
Three rules - higher ones overrule lower ones
- Importance
- Specificity
- Source Order (only matters if specificity is the same)

## Specificity
Rules at a higher level of specificity will override a rule at a lower level

ID > class > element.

- ID: 100
- Class (also, attr selector or pseudo class): 10
- Element (also pseudo element): 1

# Box Model
![box model diagram|400](https://i.imgur.com/G7oIlKC.png)
![border-box box model|400](https://i.imgur.com/iY8O3hd.png)

Margin Collapse: If two vertically adjcent elements have touching margins, the smaller of the two will collapse

# Layout
## Flexbox
## Grid
## Trad

# Positioning




