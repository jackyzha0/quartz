---
draft: false
title: God Rays
tags:
  - graphics
created: 2024-06-12
date: 2024-06-13
aliases:
  - God Rays
description: In this post we go over what are god rays and a couple different high-level approaches to them followed by my personal implementation.
---

While thinking about graphical improvements to [[01.far-reaches|The Far Reaches]], I landed on the decision to invest some time into environmental weather effects like rain, snow, clouds, etc. I was deeply inspired by [t3ssel8r's video](https://www.youtube.com/watch?v=fSNdZ82I-eQ) on god rays (and much of his other stuff) and decided to take a crack at it myself. Before we begin let's break this down to understand what we're talking about here starting with *god rays*. 

## God Rays

You've seen these before likely both in real life and in video games.

> [!caption|center] 
> ![[crepuscular_rays_real.png]]
"God Rays"

The scientific term for this phenomenon is called **crepuscular rays**. *Crepuscular* meaning "of or related to twilight" referring to the fact that this effect usually occurs during twilight. In the graphics world the term is **volumetric light scattering**, referring to how the light "scatters" in the atmosphere. 

These effects are caused by clouds or other objects and give the impression of "shafts" of light emitting from the sun. Essentially the shadows from the clouds create shadowed and un-shadowed regions of the atmosphere where light is being scattered and the contrast between these regions gives the effect of "shafts" of light emerging from the sun.

## Implementation
