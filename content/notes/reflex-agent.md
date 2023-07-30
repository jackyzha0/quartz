---
title: "reflex-agent"
aliases: reflex agent
tags: AI, agent
---

A type of [[artificial-intelligence|AI]] [[agent-model|agent]] that simply map sensors directly to actuators

- e.g., reflexes in humans. no processing, just happens straight away

These simple agents blur the lines between perception and action. 

Actually, the lines are blurred in human agents too.

## Examples
### Braitenberg vehicle 
One very simple simulated organism is a Braitenberg vehicle. 

The discs on the front are light sensors. 
- Lots of light → strong signal. 
- Less light → weaker signal. The sensors are connected to motors driving the wheels.

Two initial configurations:
![configs|300](https://i.imgur.com/wbSs3Qm.png)

A : Same side connections → goes away from the light
B : Cross connection → goes toward the light

> [!INFO] something very simple like this can produce already interesting behaviours

> [!INFO] thinking fast and slow: system 1 vs system 2. reflex's are related to system 1
> dragonflies have 90% success when hunting. we think most of it is reflexive

### Image classification
![diagram|300](https://i.imgur.com/UqoQFqh.png)

> [!INFO] straight circuit. image goes in → computation → cat or no cat
> if there is no adaptive feedback i.e., one way circuit. it is a reflex agent even if there is a complex neural network