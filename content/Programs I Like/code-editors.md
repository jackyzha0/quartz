---
title: Code Editors
tags:
  - productivity
  - programming
  - seedling
date: 2023-09-07
---
Below are my two favorite ways to write code. Let's start with the big one:
## Visual Studio Code
This little gem of a text editor ended up taking the world by storm because it delivered open-source compartmentalization and configuration in an enterprise package. 

[VSCode](https://code.visualstudio.com/) arose out of a common hatred for the Visual Studio IDE, which follows the Windows design philosophy and, as a result, is a bloated and unusable mess.

Instead of the "workload", where Visual Studio installs everything needed to develop a certain kind of application, VSCode offers the "extension": all the IDE features and syntax highlighting needed to develop in a language, but leaves language servers and compilers to the rest of your system. As such, it's extremely lightweight, not to mention cross-platform thanks to its use of the Electron framework. 

Another of the features that I like is cosmetic customization. VSCode has a massive library of theme, icon, and layout extensions that make your setup as beautiful as it is performant. 

One downside I've run into is the fact that VSCode is an Electron application. Electron is notorious for being a resource hog across all platforms, leading to decreased battery life. 
- More linux-specific, Electron can't handle fractional scaling without specific command line hacks that aren't easily configurable by the Linux newcomer. Not specifically a VSCode problem, but this is one of the two programs that "blurry with fractional scaling" has the most hits for.

Picture of my install:
![[Attachments/vscode.png]]

Of course, it's not a perfect solution. I've found another text editor much more attractive recently:
## Neovim
Sometimes, the [[Misc/keys|most efficient solution]] only arises because it was technically necessary, yet when advancements make it no longer necessary, the initial route proves subpar. you just want to bang out a few lines of code, hit save, and go back to whatever you were doing before. This is [Neovim](https://neovim.io/).

Based on the older `vim` text editor (which was in turn based on `vi`, the [[linux-isms#BSD|BSD]] Unix program), Neovim is designed to be as minimally intrusive as possible while remaining responsive to the needs of a developer. 

This does come with a high learning curve, as Neovim is a *modal text editor*. `vi` was created in the days that a computer was simply a circuit board, a keyboard, and a CRT monitor; no fancy peripherals like a "mouse" or a "touch screen". As such, it needed to be usable in such a non-user-friendly environment. 

Neovim has three commonly used modes (among others):
- *Normal mode*: for navigating throughout the file and using any of the MANY power-user keyboard shortcuts to rapidly modify the file. This mode is the reason that modal text editors are so powerful, as well as so arcane.
- *Insert mode*: This one is most familiar to those that use Notepad on Windows, or any of the similar Linux/Mac programs. It's just a normal text editor, type letters/numbers/punctuation and navigate with the arrow keys.
- *Visual mode*: For selecting blocks of text and doing things with a selected block like cutting it to paste somewhere else.

In Normal mode, you can tell Neovim what to do by giving it commands. By default, you start a command with the colon. I shouldn't tell you this, but typing `:q` from Normal mode and pressing Enter will exit the program, because `q` is the Quit command. [[Misc/linux-isms#On Acronyms|Unix loves their acronyms]].

I'm a believer in the principle that your computer should adapt to you, so I often find myself writing tiny little files around [[Projects/my-computer|my computer]] that I don't want to open VSCode to edit. I just open a terminal (if I'm not already working in one), pull up the path, type the file name, make my changes, and done. It's quick, it's easy, and (my favorite) it's free.
- To speed the process of opening a terminal, I recommend a dropdown terminal (also called a "quake-style" terminal). The aim is that when you press a keyboard shortcut (Alt+backtick for me), it opens a terminal. I've used both [Guake](http://guake-project.org/) and a docked [tabby-terminal](https://tabby.sh/) for the same end. Still on the fence over which I like more.

Just like VSCode, there's rampant possibility for customization here. Unlike VSCode however, it's all in an arcane configuration language that can be difficult to use from scratch. This leads to the popularity of the *distro*: a configuration scheme that serves as a starting point for your program, just like a linux distro does for your computer.

My distro of choice is [AstroNvim](https://github.com/AstroNvim/AstroNvim). It's lightweight, looks great, and has all the bleeding edge ecosystem tools that you might need.
- Pros
	- Super lightweight thanks to lazy loading. It takes my customized install 27ms to open from a terminal.
	- Comprehensive. Once you learn the keybinds, it basically just has all the features of VSCode.
		- Did I mention that if you set the paths correctly, you can also use any code snippets that came with your VSCode extensions inside AstroNvim thanks to the Luasnip plugin?
- Cons
	- #difficulty-advanced. The configuration syntax is very different to how it normally works in tutorials around the internet. Be prepared to spend a lot of time puzzling over the examples on AstroNvim's website. 
		- You can look at my user file [on GitHub](https://github.com/bfahrenfort/nvim-config) for an example of how to configure things (place in `~/.config/nvim/lua/user/`). Compare my user file with how each plugin I configure actually tells you to configure it, and don't forget to look in the `polish()` function. 
		- I might make an AstroNvim for Dummies page sometime explaining common pitfalls sometime.

Picture of my install:
![[Attachments/nvim.png]]

Neovim can be installed on all platforms. If you'd like to get started, open it with `nvim` and use the command `:Tutor`. For purists who will only use normal Vim, `vimtutor` is usually installed with Vim, or use the `:VimTutor` command from inside the application.