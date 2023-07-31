---
title: "02-network and hardware protocols"
tags: 
- cosc301
- lecture
sr-due: 2024-02-10
sr-interval: 194
sr-ease: 250
---


# OSI model
- physical, data link, network, transport, session, presentation, application
- encapsulation
	- ![](https://i.imgur.com/jOSWdJ4.png)
- Five layers in Internet: physical, data link, network, transport, application (including presentation and session layers of OSI model),

TCP/IP sits in kernel of operating system. packet is passed from RAM to the network card, then through the ethernet cable.

There is a specific bus for tcp/ip between ram and NIC ![](https://i.imgur.com/LanUiYW.png)


^ Data link and physical layer.

NIC rejects ehternet packets which aren't adresse to them. you can modify them to add a promoscuous mode which accepts all packets.

you can configure the swtich to send the packets to only the correct address

Network Layer ≡ IP layer

Port number distinguishes addresses at the transport/application layer. 

ARP - to find destination MAC address given IP address
- send broadcast message to everyone - who had this IP address? What is your MAC address
- the store the results of the MAC:IP pairing
- `sudo arp -a` list arp pairings

Journey of IP packet. ![](https://i.imgur.com/TKw5s1Y.png)

routing table created - manual or dynamic. DNS, etc

TCP IP moves the data - there are more protocols within the TCP IP layer that help it to work better.

Questions
- what is a gateway
	- connected to the same LAN
	- when ip is created it will check this table
	- LAN can have more that one gateway
	- 