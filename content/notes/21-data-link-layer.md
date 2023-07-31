---
title: "21-data-link-layer"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2024-08-18
sr-interval: 384
sr-ease: 250
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

![interface communication diagram](https://i.imgur.com/No4evP9.png)

## flow control
- dont send to much data otherwise it will overflow

different from transport layer flow controls
- single link not end to end
- frame oriented not byte oriented
- als use sliding window scheme
	- go back N and selective repeat

# Error detection
- add bit(s) to detect and correct bit errors (i.e., redundancy)
- bits are added before frame is send over link
- when recieved if some bits are corrupted frame is dropped

## parity checking
single bit
- even parity: add parity bit and set so there is an even number of 1s
- can detect single bit errors
- cannot detect two bit errors

two dimensional bit parity
- detect and correct single bit errors
- detect two bit errors

## CRC
- more powerful error-checking coding
- D: data bits
- G: bit pattern (generator), of r+1 bits (given)

![slide](https://i.imgur.com/UdmWtad.png)
- widely used 

# multiple access links and protocols
- single shared broadcast linl/channel
	- shared wire or medium
- interference between two or more simultaneous tranmissions
	- collision may occur if node recieves two or more signals at the same time

## MAC protocols
- coordinates nodes sharing a channel
- communication about channel sharing must use channel itself
	- no out-of-band channel for coordination

classes
- channel partitinioning
	- divide channel into smaller pieces: (time slots, frequency)
	- allocate piece to node for exclusive use
	- e.g., TDMA, FDMA
- random access: contention-based
	- channel not divided, allows for collisions
	- "recover" from collisions
	- e.g., ALOHA, CSMA
- "taking turns"
	- node takes turns, but nodes with more to send can take longer turns
	- e.g., token-passing

### TDMA time division mulitple access
- acces to channel in "rounds"
- each station gets a fixed length slot (length = packet transmission time) in each round
- unused slots go idle

### FDMA freqency division multiple access
- channel spectrum divided into frequency bands
- each station assigned fixed freqency band
- unused bands go idle
- ![](https://i.imgur.com/JOWIr1V.png)
- can communicate in parrallel

### slotted ALOHA
assumptions
- all frames same size
- tiem divided into equal-size slots (time to transmit one frame)
- start to transmit only slot beginning
- nodes are synchronized
- if two or more nodes transmit in a slot, all nodes detect collision

operation
- when node obtains fresh frame, transmits in next slot
	- if no collision: node can send new frame in next slot
	- if collision: node retransmits frame in each subsequent slot with probability p until success

- simple
- decentralized
- single node transmit at full rate
- wasting slots: collisions idle slots
- requires synchronisation

![](https://i.imgur.com/Mi269KZ.png)

### pure ALOHA
- unslotted aloha, no sync
	- when first frame arrives, transmit immediately
- collision probability increases with no sync
- less efficient that slotted aloha 
- 
![](https://i.imgur.com/Rxvx0eJ.png)

### CMSA carrier sense multiple access
simple CSMA: listen before transmit:
- idle: transmit entire frame
- busy: defer transmission

CSMA/CD: CSMA with collision detection
- collisions detected within short time
- colliding transmissions aborted, reducing channel wastage

collisions can still occur with carrier sensing
- propagation delay means two nodes may not hear each others just-started transmissions
- on a collision the entire packet transmission time is wasted
	- distance and propagation delay play role in determining collision probability

### Ethernet CSMA/CD
1. nic recieves datagram and created frame
2. nic senses channel: 
	1. if idle, start transmission
	2. else wait wait until idle
3. if nic transmits entire frame without collision, nic is done
4. if nic detect another transmission while sending, abort, send jam signal
5. after aborting, nic enters binary (exponential) backoff:
	1. after mth collision, nic chooses K at random from {0, 1, 2, ..., 2^(m)-1}, nic waits K x 512 bit times, returns to step 2
	2. more collisions: longer backoff interval


### taking turns
polling:
- master node invites other nodes to transmit in turn
- typically used with "dumb" devices
- concerns:
	- polling overhead
	- latency
	- single point of failure: master

token passing:
- control token passed from one node to next sequentially
- a node can send data when it has the token 	
- token message
- concerns:
	- token overhead
	- latency
	- signle point of failure: token