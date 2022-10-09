---
title: "19-deepfakes"
aliases: 
tags: 
- comp210
- lecture
sr-due: 2022-10-13
sr-interval: 3
sr-ease: 250
---

# what, origins, how
- issue with trust politics etc

- essentially better face swapping
- replaces traditional studio artist with ML
- open source
	- easy to do
	- point and click
	- more widely available
- in early stages so quality varies
- 

# related concepts
- voice faking c.f., impersonation
- lip syncing (replaces mouth no whole face)
	- take actual footage of e.g., politician and change words
	- can be done using only text
	- natural language processing

- uncanny valley
	- ![](https://i.imgur.com/Jd8Vpv1.png)
	- "something not quite right"
	- some people dont realise

# how
- auto encoders
	- take image an reduce to a base representation
	- e.g., of the face
- decorder
	- takes base and produces image
- deepfake
	- takes base of two differnet people and combines them
	- two decoders
		- one for each person
			- a pathway and b pathway
		- both decode from the same combined base representation

- to swap
	-  ![swap process](https://i.imgur.com/Z0oWuOk.png)

- deep face lab
	- ml workflow

other requiremtns
- need a lot of data
	- video - extract individual frames
- similar facial structures
- source content cleanup
	- remove images with two or more faces
	- crop images
	- resample/distort/skew image to create new instances
- post processing tools to touch up afterwards

# concerns and solutions
- genuine concern about video being distict
	- we expect images and text to be fake
	- do not expect videos to be fake
		- more damaging

- politically weaponised
	- e.g., deep fakes of biden declare war on russia

plausible deniability
- porn
	- swap actors onto porn scenes
	- hard to deny
	- how to prove its a deepfake
	- revenge porn
- lack of trust
	- only from the existense of deepfakes
	- true things become more suspicious


should "you" be concerned
- for your personal integrity no
- likely not enough data for you to be faked
	- "one shot deepfakes"
- as a citizen yes

## responses
- crytpographic siging to authenticate origin
	- will this work about leaked content

ml to analyse deepfakes (e.g., blinking)

another arms race

# summary
![](https://i.imgur.com/H9wv8Bv.png)
