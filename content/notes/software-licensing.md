---
title: "software-licensing"
aliases: 
tags: 
- cosc202
---

What does it mean for people to use your software. What responsitilities do you have

common perception: open source versus commercial

- cost of aquiring source code
- avalability of softrwares source code
- restrictions on use of software source code

commercial software is often closed source
- nothing stops paid for software having visible source 

# Why add them
- to choose how you code can be used
	- deny open permission for other to reuse you code
	- ensure that those using your code credit you
	- controlling commercial use
- protect yourself from legal risks
	- licensing will make your intentions specific
- code with no license: author's copyright holds!
	- recall this default discussed in academic integrity policy

# Free
- Free as in freedom
	- reffered to as 'free as in speech'
	- often less ambiguous term 'libre' is used
- Free as in no cost
	- also referred to as 'free as in beer'
	- less ambiguous term 'gratis'
- "Free software" potentially means either or both

# copyleft
copyleft licences add their requirements to derivatives

first was GNU general public license (GPL)
- four freedoms: run, study, share, and modify software
- using of GPL software requires your softwarw to be GPLed too
- FYI linux and the GNU Compiler Collection are GPLed

lesser GPL: can be used in closed source
- but modified LGPL components must be released LGPL

# Creative commons
allow selection of facets
- all CC licences include attribution of author -**BY**
- athors can choose to disallow commercial use -**NC**
- derivative works allowed unless marked no-derivatives-**ND**
- derivatives allows? can require (viral) share alike-**SA**

Also CC0 "no rights reserved" release to public domain

CC-licenced content you may have used recently
- code of track exchange sites licenced by CC BY-SA
- cosc202 lecture notes are released by CC BY-NC-SA

# use unambiguous open source teminology
avoid  just saying 'free open source software'. potentially unclear what notion of 'free' is in use

- FLOSS - free libre open source software
	- clear in covering both types of 'free'

viral licencing - may not be interpreted 'libre' free. The licences impose restrictions on use. even if those restrictions are net beneficial

# software dist. without source code
- freeware - software is free
- adware - software is supported by advertising
- shareware - software requires eventual payment
- retail software - software required up-front payment

if selling software apply a licence
- need to think about consumer protection laws
- likely can get 'cookie-cutter' lcences that you can customise
- seek legal advice

# dual licensing
free, libre, open source can be multiply licenced
- e.g., FLOSS for non-commercial use
- but commercially licenced otherwise

open source approaches have benefits:
- potentially many eyes on code checking for security flaws
- avoid lock-in to opaque commercial implementations

can licence different software components differently
- e.g., closed source MacOS runs over open source Darwin

# How to add licences into code
project should include complete lcence text: add file LICENSE in top-level project directory

safest to also add short licence comments to every file
- better survives files being copied to othe projects
- e.g., should the license file get lost accidentally

Git Hub and simiar bring licencing into the main UI. THey assist lifting licence informatio as searchable metadata. search engines like google iamges can scan for licences

# Incompatibility
consider developiing software that combines two FLOSS code based that have differnce code licences. It may be impossible to satisfy both licences simultaneously. In these cases the licences are said to be incompatible.

# software patents
generally 'no'. these create headaches. NZ does not permit them
