---
title: "11-DNS"
tags: 
- lecture
- cosc301
---

> [!INFO] 
> hosts are named by ip addresses: e.g., 192.168.1.2
> we want to map an ip address to a readable name so it is memorable
> in the past it was easy to store all the name of possible address in a folder `/etc/hosts`. 
> it uses a NIC networking inforamtion system. 
> but this is only for LAN
> impossible to store all IP addresses in the internet this way


> [!INFO] 
> DNS resolves a name to an IP address. can also do reverse mapping (this is useful for detecting spam emails).

> [!INFO] distributed dns
> now dns is distributed. it is a BIND (berkely internet name domain) service. 
> to do something distributedly. each LAN has their own DNS

Problem  
- How to get the IP address with an IP name?  
	- Mapping between IP addresses and IP names  
- Simple solution  
	- Central database, like /etc/hosts or Sun  
Microsystems’ NIS (Network Information  
Service) or Windows’ WINS for LAN.  
	- E.g. tkm.govt.nz 13.77.63.24  
- However, keeping billions of such records  
in a central database used by billions of  
users is almost impossible.

Domain Name Service (DNS)  
- A distributed solution  
- Each organisation, called domain, maintains  
its own database and answers queries about  
its domain.  
- E.g.  
	- oucs1120.otago.ac.nz 139.80.22.10  
	- oucs1234.otago.ac.nz 139.80.34.67  
	- chasm.otago.ac.nz 139.80.45.90  
	- hextreme.otago.ac.nz 139.80.63.88