---
title: My Computer
tags:
  - productivity
  - linux
  - difficulty-moderate
date: 9-08-23
---
## Hardware
First off, I don’t believe in having more than one personal computer, as I think it’s wasteful, especially when your profession will provide you with an e-waste work laptop whether you like it or not. As such, I’m an eGPU apologist! My setup consists of a laptop connected to a Thunderbolt dock on one tb4 controller and an NVIDIA eGPU on the other. Speaking of…
### Laptop
- Framework Laptop, Batch 6
    - Repairable, upgradeable, and wholly yours. This thing is amazing. 
    - I got in just early enough to be an "early adopter", but late enough that I was past the teething problems. 
    - CPU: i5-1135g7
    - RAM: 2x16gb of Taiwan’s finest 3200MHz
    - SSD: 2tb gen3
    - Expansion Cards:
        - 1x 3D printed and custom magnetic charger adapter
        - 3x usb-c, to be swapped with any of usb-a, hdmi, microSD, or storage as needed
So yeah, it’s pretty cool. Here are my peripherals:
### Dock
- Razer Thunderbolt 4 Dock (non-Chroma)
    - A buncha ports in one place. Really solid DAC for the headphones too, better than the onboard. 
### eGPU
- ADT-Link R43SG-TB3
    - It was smaller than a core x chroma
- Dell DA-2 x2
    - eBay’s finest
    - Had to buy a second one to power the 3060ti. There's a paperclip jammed between two pins and the other ones are connected to the 8pin power slot directly.
- GTX3060Ti
    - Rated max power is 220W, but one DA-2 isn't enough because they're too old
## OS/Configuration
I run Fedora Linux with the GNOME desktop environment. I was a longtime Windows 10 user, and dabbled in Linux a bit, but eventually got fed up enough with Windows that I swapped for good.

Previously, I’ve also daily driven Linux Mint. You can read more about my history with Linux on [[Essays/on-linux|its dedicated page]].
### On User Interface
I’ve daily driven XFCE, Budgie, Unity, and KDE before. No DE really caught my eye in a way that feels both intuitive and productive until GNOME. The overview is such a neat concept that’s performant, useful for rapid task switching, and pretty. I recommend the Blur My Shell extension for best results, as well as an extension that gives you trackpad gestures for your windowing system. 
- Little tip for productivity: if you use gestures, throw each new window on a different workspace and swipe instead of alt-tabbing. 
### Config!
I use a [bare git repository](https://www.atlassian.com/git/tutorials/dotfiles) to backup all my small configuration files that are scattered throughout my computer. 
- Sidebar: I deviated from the tutorial and called my alias `dots` instead of `config`. It just felt better and there was no chance of confusion with Fedora's `configure` system utility.
#### Config Hell
- There are a lot of little tweaks I do to software to make it fully useful to me, which is the one argument I’ve ever raised *against* compartmentalizing through Flatpak, Snap, etc. 
    - I have a bunch of Flatpak programs with absolutely no settings sync or remotely near the capability to sync, so what do I do when I want to migrate?
- Hey kids wanna see a dead husk of a man? Come find me three hours after I update my Neovim install. Dear lord, that thing breaks OFTEN. 
### Future?
Upgrades are inevitable with any piece of hardware. Now that my GPU is up to a 3060ti from a 1650s, I'm looking to upgrade my cpu. I'll follow through on that when linux figures out thread scheduling on newer cpu die layouts (p-core e-core is still rough at the moment).
## Software
Any software that's actually of note can be found in [[Programs I Like/home|Programs I Like]]. Here, I'll just go over some tenets I've noticed when dealing with my computer as a tool for my work, my projects, and my personal life.

I value low-[[Misc/resistance|resistance]], low-[[Misc/friction|friction]] software. It's what led me to pursue linux, Obsidian, and this website in general. If something is fast to use, I'll use it more often.
#### Immutable Distros
Something that's gaining popularity is the immutable operating system, where the underlying filesystem is intentionally resistant to change. I don't see this as overly resistant in my sense, mainly because providers like VanillaOS and Fedora Silverblue recognize that this resistance is present and provide alternative routes to install software. It's more of a compromise.

### Software future
I'll probably hop to Arch next since Fedora is going to drop X11 soon. Tiling wms like River and Hyprland look interesting, and I've played around with them on my 1tb Arch expansion card to mixed results. If I get frustrated with tiling, there's always arch gnome...