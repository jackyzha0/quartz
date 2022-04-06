---
sr-due: 2022-04-10
sr-interval: 27
sr-ease: 270
---

tags: #review

---

# Consoles vs Terminals vs Shells
- consoles vs terminals/command line shells
	- console -> io device which is part of a computer (physical terminal)
		- console is the device: -> terminal is program inside that device
	- terminal -> text input output environment (can be remote)
		- windows terminal
	- [[shell]] -> program which the terminal/console sends input to which sends command to the OS
		- [[unix shell]]
		- powershell
		- cmd
		- bash, fish, zsh, ksh, sh, tsch

#### BREIF HISTORY
1. At first only main console
2. Then multiple terminals which allowed mulitple people to use one computer
3. Graphics support
4. Console + terminal merged
5. Virtual terminals ->  no need for direct hardware control -> replaced by OS

```mermaid
	graph LR
	MainConsole --> MultipleTerminals --> GraphicsSupport --> MergeConsole&Terminal --> VirtualTerminals	
```

---
resources:
[whats the differnce between a console a terminal and a shell](https://www.hanselman.com/blog/whats-the-difference-between-a-console-a-terminal-and-a-shell)

---