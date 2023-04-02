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
> to do something distributedly. each LAN has their own NIS. each LAN manages their own domain names and IP addresses.
> LANs can talk between each other. 
> we use a tree structure for domain names
> at the start we have a root domain ⇒ `.`
> then we have domains ⇒ `.com`, `.nz`, `.org`
> then sub domains ⇒ `google.com`, `ocss.nz`
> and sub sub ⇒ `otago.ac.nz`
> the advatage of tree structure is that the parent only need to know the domain name of the sub domains and the name server

> [!INFO] google.com -> otago.ac.nz
> first find nameserver for `.nz` if they already know the address for `.nz` then can go directly
> otherwise they need to go through the root name server `.`
>  you should configure this root Domain name server on a new installation
>  the root name server send the address of the `.nz` name server which sends the address of the `.ac.nz` name server, and so on until you get the final address

> [!INFO] nameserver storage
> some nameservers such as `.nz` are held by IANA

> [!DEFINITION] NIS
> network information system

> [!DEFINITION] DNS
> domain name service

> [!INFO] DNS vs NIS
> dns is centralised, NIS is local

> [!INFO] Queries
> iterative query - doesn't give you the final answer only gives the name of the next server
> recursive query - only send the recurive query to final server. this must return the data requested for tell you that it doesn't exist. 
> a LAN with an NIS will return recursive queries for all subdomain with that LAN

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