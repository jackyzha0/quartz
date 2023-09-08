---
title: My Computer
tags: ["productivity", "linux", "difficulty-moderate"]
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
- Dell DA-2
    - eBay’s finest
- GTX1650
    - Upgrade Soon(tm), it’s really not good. I’ll probably go to the power limit of the DA-2, so like a 3060ti or so
## OS/Configuration
I run Fedora Linux with the GNOME desktop environment. I was a longtime Windows 10 user, and dabbled in Linux a bit, but eventually got fed up enough with Windows that I swapped for good.

Previously, I’ve also daily driven Linux Mint. You can read more about my history with Linux on [[on-linux|its dedicated page]].
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
## Software
Any software that's actually of note can be found in [[Programs I Like/home|Programs I Like]]. Here, I'll just go over some tenets I've noticed when dealing with my computer as a tool for my work, my projects, and my personal life.
### Resistance
To me, "resistance" is the subjective difficulty involved with installing new tools. In simpler terms, it's how much of a fight your computer puts up. I believe that your computer should adapt to you, rather than the other way around, which is a major part of the reason why I use linux.

For example, Windows is very high-resistance in general: finding an executable for the tool (hopefully portable, otherwise it's an installer which is even more resistance), putting it in the correct place, and potentially dealing with UAC to authorize where you put it or to allow it to run properly.

It goes without saying that package managers alleviate resistance significantly. A single source for no-nonsense installs of almost everything you need!
#### Immutable Distros
Something that's gaining popularity is the immutable operating system, where the underlying filesystem is intentionally resistant to change. I don't see this as overly resistant in my sense, mainly because providers like VanillaOS and Fedora Silverblue recognize that this resistance is present and provide alternative routes to install software. It's more of a compromise.
### Friction
I define "friction" in a computer as the subjective mental or physical effort required to access a tool that you already have. This is less tied to OS than resistance, and can vary by tool or environment.

If something is low-friction, it gets used, and used often. As a matter of fact, the reason I've swapped around so much for my notes solution is because I've been trying to find something low-friction. [[Projects/Obsidian/digital-garden|Quartz]] appealed to me for this website simply because it was low friction and I could author content right out of my notetaker. 
- For example, [[Programs I Like/obsidian|Obsidian]] is more feature rich than the alternatives while being more accessible.