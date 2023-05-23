---
title: "running-web-experiments"
aliases: 
tags: 
- info203
- scott-video
- lecture
sr-due: 2024-12-17
sr-interval: 574
sr-ease: 270
---

randomly split traffic to website between two versions.

then collection metrics about each version

web makes it easier to try out something new, and test if it is effective.


small changes can have a significant effect. 
![example changes](https://i.imgur.com/fhmWtbh.png)

application for more than just websites.

our expectations are often wrong.
small chagnes (e.g., wording on a button) can have large impacts

# Effective principles
- run experiments 50 50
	- novice experimenters run 1% eperiments
	- to detect an effect you need to expose a certain number of users to the treatment (baed on power calculations)
	- fastest to run 50 50
- ramp up and auto abort
	- start at 0%
	- design may be disastrous
		- bugs, other issues
	- slowly increase until 50%
- pick a meaningful yardstick
	- avoid measures things because they are easy to measure
- run it for long enough
	- sometimes first use is not the same as what people are familiar with
- rules for random assignment
	- consistent - same person should see same interface
	- durable - truly and compelely random
	- independent 
- challenges and opportunities
	- larger theories are still hard
		- i.e., interpretation
	- using multiple methods together helps
		- whole is greater than sum of parts
		- combine iwth eg. in person studies
- role on designer in online age
	- creating alternatives
	- people are often to sure of themselves
	- rapid experimentation means the first release is (sometimes)  less important
	- fail fast