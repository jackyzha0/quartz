---
title: Embedding Mathematica Notebooks
tags:
- Mathematica
- embed
- PhD research
- Neon clusters
---

## Introduction
I recently re-bought a subscription to Wolfram Mathematica so that I can use it as a tool for [Writing to think](../posts/writing-to-think.md). 

As an exploratory tool for complex topics, it can't be beat. What it does lack is shareability when compared to something like Jupyter Notebooks and Python. It is a proprietary tool and as such, limits other's ability to view and use the notebooks I create. 

Recently, they've added quite a bit to the cloud platform and associatead sharing of notebooks through it. To that end, I'm using this note to explore some of that and experiment with the UX of sharing Mathematica notebooks via my Quartz website. 

This is defined basically via the following:
- Create notebook locally or through the web interface (depending on what subscription you have).
- Publish that notebook to the cloud and allow everyone to access it
- embed parts of that notebook (or the whole thing) into a site via an `iframe`. 

## What I'm doing here
I've done this with an old research notebook from my PhD that explored the Potential Energy Surface of a Neon Pentamer (5 Neon atoms combined as a molecule). The notebook is self contained in that it defines the entire interaction surface of the Neon pentamer and then explores it, ending with a minimum energy path of coming together (a dimer joining a trimer) and a neat 3D plot showing how the molecules rearrange themselves as they form. 

My goal here is to see how well I can publish that plot and make it interactive on my personal website. 

## The raw notebook
The link to the notebook is [here](https://www.wolframcloud.com/obj/bd404ea6-321e-4877-9837-c2f9eeb81c11). Unfortunately, you can't execute the required parts of the notebook to see the interactive plot. You can also embed the notebook in an `iframe` for easier viewing. When you publish, Mathematica Cloud conveniently gives you the embed code to do it, which Quartz takes natively in the markdown file. This is what that looks like:

<iframe src="https://www.wolframcloud.com/obj/corey0/Published/DimerTrimerMinimizationNew.nb?_embed=iframe" width="600" height="800"></iframe>

Note that there is a ton of stuff there that is hard to follow (this was research, not a publication when I made it over a decade ago). Much of the notebook needs to be executed to build up the data in memory to generate the interactive plot. So if we're talking about just finding a way to share a neat graphic, we'll have to try something else. 

## Exporting the 3D plot by itself
One of the new things you can do is just publish an object once it's created into Mathematica Cloud, so let's try that. I've gotten everything locally executed and plotted on my laptop, and published the 3D plot object. Once again, Mathematica gives you a convenient embed code for Quartz (or your site). 

<iframe width='700' height='700' src='https://www.wolframcloud.com/obj/305ab1cc-ebe1-4350-a572-d36c77e33142' frameborder='0'></iframe>

So what you're seeing here is a plot of the minimum energy path that a (constrained) Neon dimer and Trimer molecules would take to combinen to form the pentamer, and next to it is the 3D plot of the molecules showing they reorienty themselves when coming closer to each other. There's a LOT more to the story here, but it serves as a good example of limitations of showing complex work with Mathematica. 

One of the obvious issues is how slow it reacts to moving the bar. Locally, it is a smooth transition from one state tot he next which allows for a cool visualization of molecular dynamics, which helps provide some intuition that isn't available when you have to do it slowly frame by frame. I'd expect you'd have to make a notebook specific for this purpose, which outputs a rendered graphic of the plot, and maybe something I'll play with later. 

Also, there seems to be an open source project that may help with the smoothness of the cloud upload, but would have to look into it and see how it works and what problem it's exactly solving. I'll put it here for another day:

https://mathematica.stackexchange.com/questions/172905/clouddeploy-manipulate-plot

## Thoughts
An alternative to this would be using something like [Observable](https://observablehq.com) as then (JS) notebook platform and embed that, or work on optimizations of the notebook to output a smooth graphic that can be walked through. 