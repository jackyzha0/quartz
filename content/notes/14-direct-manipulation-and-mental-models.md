---
title: "14-direct-manipulation-and-mental-models"
aliases: 
tags: 
- info203
- lecture
sr-due: 2022-09-08
sr-interval: 97
sr-ease: 270
---


Command line vs UI
[table](https://i.imgur.com/DW8jnGz.png)

# Object action models

object action model: user selects an object then selects the action to perform on the objct

action object model: user first selects an action to be perdormed and then selects the objects on which this action will be performed

object action model maps to real life environment

the designer needs to create mapping from the real world unicers ofb objects and intentios to the intrefac world universe of metaphors and plans

# fitts law
time to point to something depends on its size and distance:
$$
MT = C1 + C2\ log_2(2A/W)
$$ 

where C1 and C2 are contstants that depend on the device. A is the distance that users have to move and W is the target size.

- buttons and othe controls should be of reasonable size
	- things done more often should a assigned a larger button
	- or closer to the average position of the users cursor
- edges and coreners are easier to reach as the pointer is "caught" (infinite width)
- popup menus can usually be open faster than pull-down menus, since the user avoids movement
- pie menu items are typically selected faster and have a lower error rate than linear meny items as they scale with distance


# Combining inputs
often multiple ways of doing one thing
