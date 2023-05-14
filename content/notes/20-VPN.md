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

> [!INFO] POP 
> is infrastructure: could be routers, switches, NAS
> bridge between local and wide area network
> a place to integrate different networks together
> not needed for Intranet VPN

![Remote Access VPN](https://i.imgur.com/Mh9PczP.png)
telecom company provides a NAS for you. 

![Intranet VPN](https://i.imgur.com/Hbb0H4C.png)

![Extranet VPN](https://i.imgur.com/r3EAtoW.png)

> [!INFO] vpn tunnel based on IPSec
> PSTN: public switched telecom network
> in extranet, POP is somewhere between client and the NAS

Pros and Cons of VPN 
- Pros 
	- Easy to install 
	- Reduced cost compared with dedicated private network 
	- Flexibility, scalability and mobility 
	- Security 
- Cons 
	- Overhead and loss of bandwidth 
	- Unpredictable Internet traffic 
	- Compatibility issues due to various standards and vendors 
	- Understanding of security is harder due to complex protocol 
	- If not configured and managed correctly, serious security issues can arise

How VPN works? 
- Operates at layer 2 or layer 3 of OSI model 
	- Layer 2 frame 
	- Bridged VPN, virtual devices called TAP 
	- Layer 3 packet 
	- Routed VPN, virtual devices called TUN 
- Tunneling 
	- Encapsulate data in IP packets that encrypt their payload 
	- Two VPN routers/switches exchange such IP packets directly but encode/decode before sending or after receiving the IP packets.

![How VPN works?|300](https://i.imgur.com/H8JHhoC.png)

![Tunneling|300](https://i.imgur.com/umrSZlA.png)

Layer 3 VPN Protocols - IPSec 
- IPSec 
	- A widely used protocol for securing traffic on IP networks. It can encrypt data between various devices, including router to router, firewall to router, desktop to router, and desktop to server. 
	- It has two sub-protocols: 
		- Encapsulated Security Payload (ESP) encrypts the payload with a symmetric key 
		- Authentication Header (AH) ensures data integrity by using a hash function and a shared secret key.

