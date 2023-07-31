---
title: "color"
aliases: color
tags: cosc342, CV
sr-due: 2023-09-29
sr-interval: 66
sr-ease: 250
---


# RGB
- An Additive Colour space
- Used by Computer monitors
![|200](https://i.imgur.com/dr6YfED.png)

# CMYK
- Inverse of RGB
- Subtractive
- Used by printers	
![|200](https://i.imgur.com/DwXJK04.png)

# HSV
- Hue
- Saturation
- Value

# YUV CIE

# Transparency
- Adds a fourth colour channel
- 0 is transparent, 1 is fully opaque
- RGBA

- Combining transparency
	- $a_{o} = a{f} + (1-a_{f})a_{b}$
	- $r_{o} = (a_{f}r_{f} + (1-a_{f})a_{b}r_{b})/a_{o}$
	- etc
	- order does not matter
	- 

# Combining Colors

Objects in real life are combinations of cmyk colours. 
Light is combination of RGB colours.

Objects refect light that matches the colours that make up its own colour

## Computing Combined RGB Colours
- RGB is additive
- Start with base colour black
- 

## Examples
Red Object + Yellow light
- yellow light = green + red
- red ball = yellow + magenta
- green light absorbed by magenta
- red light not absorbed
- no blue light
- we see a red ball

green object + red light
- red light = red
- green object = cyan + yellow pigment
- cyan absobs red
- object is dark

yellow object + cyan light
- cyan light = green + blue
- yellow object = yellow pigment
- blue absorbed
- green less absorbed
- no red light
- object green

