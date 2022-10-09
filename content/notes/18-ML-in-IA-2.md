---
title: "18-ML-in-IA-2"
aliases: 
tags: 
- lecture
- comp210
---

# nefarious uses of ml
## password guessing
- normally based on heuristics that are designed by humans
	- biased may not match true distributions of passwords
- leaked data can be used to "learn" what to guess
- gain insight into what users use as passwords

## alternative - PassGan
- use statistical distribution of passwords then use this to generate guesses

![passGAN](https://i.imgur.com/439hrXq.png)
![passGAN sample data](https://i.imgur.com/Y7A4ygP.png)
- can generate passwords that are likely to be used
- also based off previous passwords
- passwords can be guessed in less attempts
	- need to update our rules - e.g., how many guesses makes an attempt likely to be suspicious
	- 

- new password generate, which also provides real world indicator of password strength
- faster password guessing
	- hackers will get in faster
	- need to be a step ahead of this
- insight into strong but unused passwords
- passwords get close and closer to those typically used

## password "guessing"
- gets faster as machines get faster (Moore's law)
- machine learning reduces number of trials further by learning distributions of passwords

- useful for us
	- even if we didn't do this research the hackers would
	- use passgan to detect guesses which may have come from passgan 
	- can analyse the source of guesses for suspicous stuff e.g., ip, location etc
	- can analyse data from antivirus programs

- useful for hackers
	- hackers can conquer our strategies

## steganography
- hiding secret messages in a medium that is not meant to be secret (e.g., image, audio, video)
- used to hide content and reduce suspicion e.g., in forensic investigation
- hidden message usually encryted but not in the sense of cryptography
- goal is to decieve

![](https://i.imgur.com/JWOIBw1.png)
- embed noise into images

### signal to noise
- most signals contain noise e.g., static
- noise carries info as the least significant bits in value
- hiding data in an image in the least significant bits will be visually percieved as noise

### e.g., derek uphams JSteg
![slide](https://i.imgur.com/nGEGhPA.png)

### stegnalysis
- detecting hidden content
- usually visually undetectable

how
- analyse DCT distributions
- ![example DCT distribution](https://i.imgur.com/iki90fH.png)

F5 steganographic algorithm
- developed to fool analysis of dct distributions
- 


# bigger issues

# where to from here
