---
title: "20-VPN"
tags: 
- cosc301
- lecture
---


Types of VPN 
- Remote access VPN 
	- Allows individual users to set up secure connections with a remote network through a VPN router (network access server) 
- Intranet VPN 
	- Allows offices of the same company in different locations to set up secure connections with public networks like the Internet. 
- Extranet VPN 
	- Allows offices of different companies in different locations to set up secure connections with public networks like the Internet.

> [!INFO] types of vpn
> Remote acces: e.g., university VPN access. can access server directly. need to go through vpn
> Intranet: allows connection between two or more networks of the same company
> extranet: allows connection between two different companies
> all similar technology. only different usage

> [!INFO] why not connect direct to server (not through vpn)
> 1. authentication. only want authorised access. (blocks access to infrastructure. mail servers etc are already protected) (border getaway) blocks denial of service attack. request that are not authenticated through vpn can simply be dropped

Concepts
- Point Of Presence (POP) 
	- An artificial demarcation point or interface between networking entities 
- Network Access Server (NAS) 
	- A computer server that enables an Internet service provider (ISP) to provide customers with internet access. NAS provides interface between telecommunication network and the Internet backbone.

> [!INFO] different Acronyms
> initally two camps: compsci->internet, and bell labs etc->telecommunication
> makes sense to collaborate, and share infrastructure

> [!INFO] dial up -> modem -> operator -> NAS -> ISP