---
title: "19-network-layer-data-plane"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2022-11-20
sr-interval: 19
sr-ease: 250
---

- transport layer messages are divided into segments
- passed to network layer
	- sender: encapsulates segments into IP packets, passes to link layer
	- reciever: deliver segments to tranport layer protocol
	- sender and reciever are connected by multple routers
- routers
	- examine header fields in all IP packets passing through it
	- moves IP packers from input ports to output ports to transfer packets along end-end path
- network layer protocols
	- IP
	- internet control message protocol (ICMP)
		- use for troubleshooting type things

![packet diagram](https://i.imgur.com/Y9ue6gE.png)

# Forwarding
forwarding
- move packets from a routers input link to appropriate output link
- local, per-router function
- function in data plane

routing
- determine route taken by packets from source to destination
	- network-wide logic
	- function in control plane
	- chooses shortest path through routers

# network layer service model
best effort
- try its best to deliver packet
- does not guarantee successful delivery
- transport layer provides reliability
- no big deal if packet is lost
- does not guarantee timing or order of delivery
	- each packet sent individually, possibly through different paths
- does not guarantee bandwidth available
	- network layer uses packet switching which unlike socket switching does not reserve resources

# Routers
![architecture overview](https://i.imgur.com/fNTeZnZ.png)

destination-based forwarding: foward based only on destination IP address

input port queueing: if datagrams arrive faster than fowarding rate into switch fabric

# IP addressing
- unreliable host-to-host communication protocol
	- datagram formatting, IP addressing, packet switching

![IP packet headers](https://i.imgur.com/2ehI0Kq.png)
- ver: IP protocol versin number
- head len: header length in bytes
- type of service: diffserv(0:5) or ECN (6:7)
- length: total datagram length (bytes)
- time to live: remaining max hops (decremented at each router)
- upper layer: which protocol use at transport layer
- 16-bit id, flgs, fragment offset: fragmentation/reassembly
- header checksum
- source IP
- destination IP
- options: e.g., timestamp, record route taken

overhead:
- 20 bytes TCP
- 20 bytes IP
- = 40 bytes + app layer overhead for TCP+IP


interface: connection between host/router and physical link
- router have multiple interfaces
- host has one or two interfaces :e.g., ethernet and wireless

IPv4 address: 32-bit id associated with each host or router interface
![dotted decimal IP address notation](https://i.imgur.com/N0hB8u8.png)
- two main components
	- network ID
		- addresses in the same network have the same network ID
	- host ID
- 5 classes
	- ![](https://i.imgur.com/9dOLoyr.png)

## subnetting
- partitioning an IP network into multiple smaller network segments
	- designate some high-order bits from host part as subnet ID
	- ![](https://i.imgur.com/wGjPOJb.png)
- netmask
	- a 32-bit number with all 1s for network part and all 0s for host part

![example](https://i.imgur.com/7COPiAh.png)
- use bitwise and to find network part from address and mask


## fragmentation
- network links have an MTU (maximum transmission unit)
	- different linktypes have different MTUs
- large UP datagrams are fragmented at routers
	- one datagram become several
	- reassemble only at destination
	- IP header bits are used to identify fragments


header
- identifier
	- same for all fragments
- flag: 3 bits
	- 1st not used
	- 2nd - do fragment
	- 3rd - more fragment (0 for the last fragment)
- offset
	- offset of the fragment in the packets data field (units of 8 bytes)

![frag example](https://i.imgur.com/eENmMTd.png)

what needs to change in the header of fragment
- flag
- offset
- length
- ttl
- checksum

## special IPv4 Adresses and NAT
special addresses
- 127.0.0.1 localhost/loopback
- 10.0.0.0/8 private use
- 192.168.0.0/16 private use

NAT (network address translation): all devices in local network share just one IPv4 address
- allow multiple devices to share the same adresses
- help preserve the limited amount of IP address
- translate from private IP to public IP
- ![NAT diagram](https://i.imgur.com/fU7hTbO.png)

# IPv6
- inital motivation: IPv4 mostly used up
- additional motivation
	- speed prcessing/forwarding: 40 byte fixed length header
	- enable different network-layer treatment of "flows"
	- better support for host mobility
	- better support for security

datagram format![](https://i.imgur.com/6O7jPQg.png)

adressses
- 128 bits
- hexadecimal colon notation
	- 12AB:0000:0000:CD30:0000:0000:0000:0000
- adress compression
	- consecutive sections of seros are replaced with ::
	- can be used only once per address
	- e.g., 12AB:0000:0000:CD30::

CIDR
- classless interdomain routing
- method for allocating IP addresses and IP routing
- notation
	- based of variable length subnet mask (VLSM)
	- address format: IP address/x, where x is number of bits from left to right as network part
	- ![](https://i.imgur.com/n681AV1.png)

extension headers: ![](https://i.imgur.com/8rM3clb.png)
differencees: ![](https://i.imgur.com/cWKDpEY.png)

# transition from v4 to v6
- cant change all router at once
- will need mixed v4 and v6 routers

tunneling
- v6 datagram is carried as the payload in v4 datagram among v4 routers ("packet with a packet")
- used alot with 4G/5G
- ![example](https://i.imgur.com/h4awnaL.png)
