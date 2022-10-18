---
title: "21-data-link-layer-LAN"
aliases: 
tags: 
- cosc203
- lecture
---

# data link layer services
- transfer datgram from one node to **physically adjacent** node over a link
- terminology
	- hosts and routers: node
	- communication channels between adjacent nodes: links
		- wired
		- wireless
		- LANs
	- layer-2 packet: frame, encapsulates datagram
		- ![](https://i.imgur.com/9RcK8WD.png)


services
- framing, link access:
	- encapsulate datgram into frame, add head, trailer
	- do not use IP address
		- use MAC address in frame headers
- reliable delivery of data between adjacent nodes
	- flow control: pacing between adjacent sending and recieving nodes
	- error detection and correction
		- errors from: signal attenuation, noise
		- receiver detects errors and signals retransmission, or drops frame
		- reciever identifies and correct bit error(s) without retransmission

implemented in network interface card: (NIC) or on a chip
- ethernet, WiFi card or chip
- implements link and physical layer

each NIC has a unique ID - MAC (medium access control)
- 48 bits: six groups of two hex digits
- also called physical address, ethernet hardware address
- manufacturer buys portion of MAC adress space (to assure uniqueness)

# parity checking and CRC

# MAC protocols