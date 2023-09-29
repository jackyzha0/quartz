---
title: On Linux
tags:
  - linux
  - cloud
  - advanced
  - seedling
  - essay
date: 9-08-23
---
> [!hint]  This page documents my many adventures with Linux and why I enjoy it.
> If you're looking to get involved with Linux, feel free to browse the [[Resources/learning-linux|resources for that purpose]] that I've compiled.

## Virtualization
Virtualization is a great way to get acquainted with Linux. If you're a student, check if your university has VMware (also see [[for-students|Resources for Students]] in general). 

I started messing with Linux in a virtual machine, and testing to see if I'd be able to daily drive it. My experiments with Ubuntu went pretty well, but it didn't feel good to use in a normal-computer sense. I tried again with Linux Mint, and ended up liking it a lot more. However, the Cinnamon DE was a bit too unstable for my liking. More on that in [[#Bare Metal|-> Bare Metal]].
## Single-Purpose Computing
At the time of my experiments with Linux, I was part of a professional organization with its own club room at my undergraduate institution. In this club room was a big plywood monstrosity with a TV up top and a tower PC underneath, shaped like an arcade cabinet. Complete with buttons and joysticks, this cab was the ultimate 4-player emulation machine. 

The problem: Everything was broken, and nobody could fix it. It ran Ubuntu 16 and had mountains of emulators and games, but none of the emulators would load. I asked around and apparently it had been sitting like that since before some of the seniors had started undergrad. 

As such, I took it upon myself to troubleshoot and fix the cab so that everyone could enjoy it. A few driver updates and fixed file paths later, it could run games again!

It did need some special setup to run RetroArch, so I created a script and left a text file tutorial on the desktop to make sure that people could run it in future. Also had a signature in it, so I got some happy random messages on Discord a few times in the future.

The response I got was amazing! Everyone in the organization was extremely grateful, and I'm so happy I undertook that project.

Unfortunately, the cabinet was scrapped earlier this year due to space requirements and a shifting purpose for the room, but it did end up being used actively for a few years, so I don't regret the project at all.
## Bare Metal
This has been my favorite part of my journey. Unrestrained, Linux is...surprisingly good, actually. 

First, I decided that I wanted a low-distractions notetaker and coding machine for my last year of undergrad. Linux Mint worked great for that task! Due to my issues with Cinnamon before, I decided to go with XFCE.
- Sidebar: Dear lord, that was an awful choice. It was low-overhead, but it looked horrible even when themed and its scaling was nightmarish. I'm on a Framework; 1x was unbearable and 2x was gigantic. I would not go anywhere near it for something different than a 1080p or 4K screen now. Even then, why? 
To my surprise, I started using it as much more than a notetaker, and almost all of my projects and computing time were spent on this Mint install!

Unfortunately, I had to abandon this, as the kernel and drivers weren't in a state that they could support my eGPU with yet. I still really like the wallpaper I made for it:

![[Attachments/MCM.png]]

I tried my best to make do with the WSL for my actual Linux needs after that. Any productivity tasks were relegated to PowerShell, which is...lacking, to say the least.
- This was broken up by a few attempts to get my eGPU working in external-drive installs of Fedora and Endeavour. Eventually, one worked.

Having to deal with subpar systems after my taste of how convenient Linux made things resulted in a growing distaste for Windows. Once I'd made enough progress on my dealbreaker issues to have a working system that I could replicate, I shrank my Windows partition as small as I could comfortably take it and installed Fedora! I've been happily driving it ever since. 

$\downarrow$ **Here's how that's going**: { WIP }
### Kernel
For the love of god, don't ever use the default kernel when daily driving. A custom kernel will squeeze every ounce of performance out of your hardware the way Windows would. I recommend the [CachyOS Kernel](https://github.com/CachyOS/linux-cachyos).
- Fedora has a copr, and it's available on basically every Arch distro. Sorry debian/ubuntu users.