---
author: [[Amelia Bertozzi-Villa]]
title: "Mapping Travel Times With malariaAtlas and Friction Surfaces"
tags: 
- articles
- literature-note
---
# Mapping Travel Times With malariaAtlas and Friction Surfaces

![rw-book-cover](https://miro.medium.com/v2/resize:fit:1200/1*cUO1wGk-QSIHcbA8fkvsPw.png)

## Metadata
- Author: [[Amelia Bertozzi-Villa]]
- Full Title: Mapping Travel Times With malariaAtlas and Friction Surfaces
- Category: #articles
- URL: https://medium.com/@abertozz/mapping-travel-times-with-malariaatlas-and-friction-surfaces-f4960f584f08

## Highlights
- The map of travel times to cities is based on a versatile dataset called a **friction surface**. This is also a map of every 1km-square grid cell of the globe, but what it represents is a relative measure of how “hard” it is to cross that grid cell, based on whether the cell contains good roads, worse roads, railroads, rivers, various water bodies, or terrain with some slope. After generating this surface, the paper authors use it to generate a map of travel times to cities, but you could use it to generate travel times **to anywhere you want, from anywhere you want**. ([View Highlight](https://read.readwise.io/read/01h4314jdzvd9gnph04ydbqwvf))
- We’re trying to run an algorithm that finds the fastest path from one spot on this map to another, but in order to do that it needs to understand how different points are connected. Specifically, it needs a spreadsheet that states, for every pixel in our area of interest, how easy it is to jump to **any other pixel** in a single step. There are about 405,000 pixels in our area, so this spreadsheet (aka the transition matrix) has dimensions 405,000 x 405,000. Since we’re only allowing travel to a pixel’s eight neighbors in any one “step”, one row of the matrix will only have eight nonzero values. After we generate this matrix, we have to adjust the values a bit to account for the fact that our area of interest is stretched on a 3D sphere (the globe) so it’s not an evenly-spaced grid: ([View Highlight](https://read.readwise.io/read/01h431697gfa725j89zaf6swks))
- To generate the “travel times” map, you need a list of coordinates for the places you’re trying to travel to. ([View Highlight](https://read.readwise.io/read/01h43150fjgv6q4cay2c0vx1rv))
- **Be aware that these calculations take a very long time to run for large areas** — the [original script](https://map.ox.ac.uk/wp-content/uploads/accessibility/R_generic_accessibilty_mapping_script.r) gives some tips for speedup. ([View Highlight](https://read.readwise.io/read/01h43188xse81aj280c54s0nqc))
