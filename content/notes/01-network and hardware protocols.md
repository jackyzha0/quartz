---
title: "01-network and hardware protocols"
tags: 
- cosc301
- lecture
---


# OSI model
- physical, data link, network, transport, session, presentation, application
- encapsulation
	- ![](https://i.imgur.com/jOSWdJ4.png)
- Five layers in Internet: physical, data link, network, transport, application (including presentation and session layers of OSI model),

TCP/IP sits in kernel of operating system. packet is passed from RAM to the network card, then through the ethernet cable.

There is a specific bus for tcp/ip between ram and NIC

^ Data link and physical layer.

NIC rejects ehternet packets which aren't adresse to them. you can modify them to add a promoscuous mode which accepts all packets.

you can configure the swtich to send the packets to only the correct address

Network Layer ≡ IP layer

Port number distinguishes addresses at the transport/application layer. 

ARP - to find destination MAC address given IP address
- send broadcast message to everyone - who had this IP address? What is your MAC address
- the store the results of the MAC:IP pairing
- 