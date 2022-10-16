---
title: "16-networks"
aliases: 
tags: 
- cosc203
- lecture
---

# Types of devices
- everything is connected
- ![](https://i.imgur.com/ECsSgfo.png)

- hosts - the end systems which run network apps

packet swtiches - forward packets (chunks of data)
communcation links - fiber, copper, radio, satellite
	- transmission rate: bandwidthc
networks -  collection of devices routers
- links managed by organisation


## internet structure
network edge
- hosts: clients and servers
	- servers (often in data centres)

access networkds, physical media
- wired inks
- wireless communcation links

network core
- "backbone"
- interconnected routers
- network of routers

internet is a network of networks

## edge devices
- sending function
	- takes app message
	- break into packers
	- transmit them
- recieving function
	- recieve packets
	- reasseble to create app message

# communication Medias
## physical media
- wired links
- twisted pair cable (TP)
		- twist to the distance between the noisy source is roughly uniform 
	- ![](https://i.imgur.com/NiL0cO7.png)
	- two insludate copper wires twisted together
	- one carries signal and the other is used as ground reference
	- reciever uses the different between the two
	- shielded vs unshielded
		- sheld can resits internal and external interference
		- more expensive but faster data rate
	- abt 10MBPS to 1- Gbps
	- max distance about 100 meters
	- telephone, DSL, ethernet LAN

Coaxial cable
- central inner conductor
- outer conductor as a shield
- special insulation
- long distance at high speed
- cable TV, ethernet LAN
- no grouding wire because the shield protects it and the signal is more stable
- ![](https://i.imgur.com/UI6vx1i.png)

Fibre-optic cable
- glass fibre carrying light pulses
- high speed 10 -100 GBps
- low error rate
- ![](https://i.imgur.com/fDMjJgs.png)

## wireless media
- wireless radio
	- signal carried in electro magnetic spectrum
	- broadcast, half-duplex
	- propagation environment effecs
		- reflection and obstruction
		- interference/noise
- radio link types
	- wireless LAN (WiFi)
	- wide area (e.g., 4g cellular)
	- 10's Mbps over ~10km
	- bluetooth  - short distance, limited rates
	- satellite - up to 45 Mbps per channel

# Packet and circuit switching
- network core
	- many routers connect to subnets
	
	Router
	- two functions
	- forwarding
		- aka switching
		- local action: move arriving packets from routers input link to appropriate output link
		- looks at fowarding table and sends to appropriate output link depending on the header
		- ![](https://i.imgur.com/4a6bTyz.png)
	- routing
		- global action: determine the source-destination paths taken by packets
		- routing algorithms
		- creates fowarding tables

packet switching
- host break application layer messages into packets
- network fowards packets from one router to the next, across links on path from source to destination

store and fowards: entire packet must arrive at trouter before it can be transmitted on next link
packet queueing: occurs when work arrives faster than it can be serviced


# network protocol

# network performance metrics

