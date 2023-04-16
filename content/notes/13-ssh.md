---
title: "13-ssh"
tags: 
- lecture
- cosc301
---

What is a terminal?
- An electronic device used for entering data into, and displaying data from a computer 
	- Dumb terminal (thin client): no local processing ability 
	- Smart terminal (fat client): has local processing ability
![300](https://i.imgur.com/HSo19Rt.png)

> [!INFO] from programmer POV, terminal is the interface associated with a device/program

- Hard-copy terminals 
	- TeleTYpewriter (TTY) 
	- DEC VT-100 terminal

- Terminal emulator 
	- a program that does what a dumb terminal used to do 
	- Terminal window

![100](https://i.imgur.com/k6YQ2aG.png)

> [!INFO] there are two entities → terminal master/client and terminal client/slave/server. 
> similar to client server
> a process can access the pseudo terminal


> [!INFO] terminal modes
> raw mode sends every keystroke
> canonical mode sends processed input. with tab completion etc

TTY Remote History 
- Berkeley ‘r’-commands 
	- rsh remote shell commands 
	- rlogin remote terminal 
	- rcp remote copy 
	- Bad security
		- Weak host-based authentication Privileged ports
		- .rhosts
		- no password
- Telnet 
	- Remote terminal, similar to rlogin 
	- User-based authentication

Past Problems & Solutions 
	- Everything sent in clear-text, no encryption 
	- **solution** encrypt all traffic
- Weak Host-based authentication 
	- Exploitable trust relationships 
	- Privileged ports offer little protection 
	- **solution** Port forwarding
- Server is not authenticated 
	- Potential Man-in-the-middle (MITM) attack Encrypt all traffic 
	- **solution** Authenticate both user and server

> [!INFO] port forwarding
> in old days when you has an open for for mail/internet, anyone could connect
> now only allow certain points to be accessed