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

> [!INFO] cons extra overhead on traffic, compatibility (many standards), lots of configuration for security 
> pros less infrastrcutre

How VPN works? 
- Operates at layer 2 or layer 3 of OSI model 
	- Layer 2 frame 
	- Bridged VPN, virtual devices called TAP 
	- Layer 3 packet 
	- Routed VPN, virtual devices called TUN 
- Tunneling 
	- Encapsulate data in IP packets that encrypt their payload 
	- Two VPN routers/switches exchange such IP packets directly but encode/decode before sending or after receiving the IP packets.

> [!INFO] with authenication you know who sent the traffic. 

![Encrypted packet](https://i.imgur.com/H8JHhoC.png)

![Tunneling](https://i.imgur.com/umrSZlA.png)

> [!INFO] tunneling
> send to ISP/telephone company
> the ISP "Box" is a POP
> connect to their VPN, tunnel to destination VPN, 
> this diagram is only one part - moving through private network. 

Layer 3 VPN Protocols - IPSec 
- IPSec 
	- A widely used protocol for securing traffic on IP networks. It can encrypt data between various devices, including router to router, firewall to router, desktop to router, and desktop to server. 
	- It has two sub-protocols: 
		- Encapsulated Security Payload (ESP) encrypts the payload with a symmetric key 
		- Authentication Header (AH) ensures data integrity by using a hash function and a shared secret key.

> [!INFO] ipsec
> ESP mainly for encryption: uses **symmetric** key. same as ssh/tls (cant see)
> AH for integrity. (cant tamper/change)

IP sec two modes:
- transport (simple)
- tunnel (more layers)

![Transport mode](https://i.imgur.com/OhDec9W.png)
> [!INFO] more restricted than tunnel mode
![Tunnel mode](https://i.imgur.com/uehDnMw.png)
> [!INFO] can use any transport protocol: TCP etc


- Authentication Header in two modes
![original header](https://i.imgur.com/eMEsV0m.png)
![transport mode](https://i.imgur.com/oDiGfQN.png)
![tunnel mode](https://i.imgur.com/nsm5bMl.png)

- ESP header in two modes
![original header](https://i.imgur.com/bApUC0V.png)
![transport mode](https://i.imgur.com/BWVQf1i.png)
![tunnel mode](https://i.imgur.com/oAKeikJ.png)

Layer 3 VPN Protocols - GRE 
- GRE (Generic Routing Encapsulation) 
	- a non-secure site-to-site VPN tunneling protocol developed by Cisco. 
	- defined as an IETF standard (RFC 2784)
- A tunnel interface supports a header for each of the following: 
	- An encapsulated protocol or passenger protocol such as IPv4, IPv6. 
	- An encapsulation protocol or carrier protocol, such as GRE. 
	- A transport delivery protocol, such as IP.
![](https://i.imgur.com/8i28t6S.png)

> [!INFO] similar to ipsec. no encryption. uses GRE header

![Layer 3 VPN Protocols - GRE](https://i.imgur.com/RI1lqow.png)
- In the outer IP header, 47 is used in the protocol field. 
- GRE encapsulation uses a protocol type field in the GRE header to support the encapsulation of any OSI Layer 3 protocol. 
- GRE does not include any strong security mechanisms. 
- GRE header, together with the tunneling IP header, creates at least 24 bytes of additional overhead for tunneled packets.

Layer 2 VPN Protocols 
- In remote access VPN, tunneling relies on Pointto-Point Protocol (PPP), on which the following three protocols are based. 
- L2F (Layer 2 Forwarding)
	- Developed by Cisco; uses any authentication scheme supported by PPP 
- PPTP (Point-to-Point Tunneling Protocol)
	- Supports 40-bit and 128-bit encryption and any authentication scheme supported by PPP. 
- L2TP (Layer 2 Tunneling Protocol)
	- Combines features of PPTP and L2F and fully supports IPSec

> [!INFO] L2TP similar to ipsec. dont need to worry  unless youll work for cisco

VPN vs SSH 
- VPN 
	- the network/data link layer 
	- encrypt data packets/frames 
	- require routers and software to run which makes it a more costly solution 
- SSH with port forwarding 
	- the application layer 
	- encrypt the application data 
	- require each service to be configured and maintained separately, a lot of effort to set up and maintain.

> [!INFO] vpn vs ssh differnet layers