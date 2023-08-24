---
title: Code Editors
tags: ["productivity", "programming"]
---
Below are my two favorite ways to write code. Let's start with the big one:
## Visual Studio Code
WIP
## [Neovim](https://neovim.io/)
Sometimes, you just want to bang out a few lines of code, hit save, and go back to whatever you were doing before. This is [Neovim](https://neovim.io/).

Based on the older `vim` text editor (which was in turn based on `vi`, the [[linux-isms#BSD|BSD]] Unix program), Neovim is designed to be as minimally intrusive as possible while remaining responsive to the needs of a developer. 

This does come with a high learning curve, as Neovim is a *modal text editor*. `vi` was created in the days that a computer was simply a circuit board, a keyboard, and a CRT monitor; no fancy peripherals like a "mouse" or a "touch screen". As such, it needed to be usable in such a non-user-friendly environment. 

Neovim has three commonly used modes (among others):
- *Normal mode*: for navigating throughout the file and using any of the MANY power-user keyboard shortcuts to rapidly modify the file. This mode is the reason that modal text editors are so powerful, as well as so arcane.
- *Insert mode*: This one is most familiar to those that use Notepad on Windows, or any of the similar Linux/Mac programs. It's just a normal text editor, type letters/numbers/punctuation and navigate with the arrow keys.
- *Visual mode*: For selecting blocks of text and doing things with a selected block like cutting it to paste somewhere else.

In Normal mode, you can tell Neovim what to do by giving it commands. By default, you start a command with the colon. I shouldn't tell you this, but typing `:q` from Normal mode and pressing Enter will exit the program, because `q` is the Quit command. [[Misc/linux-isms#On Acronyms|Unix loves their acronyms]].

I'm a believer in the principle that your computer should adapt to you, so I often find myself writing tiny little files around [[Projects/my-computer|my computer]] that I don't want to open VSCode to edit. I just open a terminal (if I'm not already working in one), pull up the path, type the file name, make my changes, and done. It's quick, it's easy, and (my favorite) it's free.
- To speed the process of opening a terminal, I recommend a dropdown terminal (also called a "quake-style" terminal). The aim is that when you press a keyboard shortcut (Alt+backtick for me), it opens a terminal. I've used both [Guake](http://guake-project.org/) and a docked [tabby-terminal](https://tabby.sh/) for the same end. Still on the fence over which I like more.

Neovim can be installed on all platforms. If you'd like to get started, open it with `nvim` and use the command `:Tutor`.