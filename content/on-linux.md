---
title: On Linux
tags:
  - linux
  - cloud
  - advanced
  - seedling
date: 9-08-23
---
This page documents my many adventures with Linux and why I enjoy it.

## Virtualization
Virtualization is a great way to get acquainted with Linux. If you're a student, check if your university has VMware (also see [[for-students|Resources for Students]] in general). 

I started messing with Linux in a virtual machine, and testing to see if I'd be able to daily drive it. My experiments with Ubuntu went pretty well, but it didn't feel good to use in a normal-computer sense. I tried again with Linux Mint, and ended up liking it a lot more. However, the Cinnamon DE was a bit too unstable for my liking. More on that in [[#Bare Metal|-> Bare Metal]].
## Single-Purpose Computing
At the time of my experiments with Linux, I was part of a professional organization with its own club room at my undergraduate institution. In this club room was a big plywood monstrosity with a TV up top and a tower PC underneath, shaped like an arcade cabinet. Complete with buttons and joysticks, this cab was the ultimate 4-player emulation machine. 

The problem: Everything was broken, and nobody could fix it. It ran Ubuntu 16 and had mountains of emulators and games, but none of the emulators would load. I asked around and apparently it had been sitting like that since before some of the seniors had started undergrad. 

As such, I took it upon myself to troubleshoot and fix the cab so that everyone could enjoy it. A few driver updates and fixed file paths later, it could run games again!

It did need some special setup to run RetroArch, so I created a script and left a text file tutorial on the desktop to make sure that people could run it in future.

The response I got was amazing! Everyone in the organization was extremely grateful, and I'm so happy I undertook that project.

Unfortunately, the cabinet was scrapped earlier this year due to space requirements and a shifting purpose for the room, but it did end up being used actively for a few years, so I don't regret the project at all.
## Bare Metal

### Kernel
For the love of god, don't ever use the default kernel when daily driving. A custom kernel will squeeze every ounce of performance out of your hardware the way Windows would. I recommend the [CachyOS Kernel](https://github.com/CachyOS/linux-cachyos).