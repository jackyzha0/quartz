---
title: "17-app-layer"
aliases: 
tags: 
- cosc203
- lecture
---

# Client-server vs peer to peer
- social network
- email
- multi player games
- video streaming
- P2P file sharing
- voice over IP e.g., skype
- remote ogin

Principles
- run of different end systems
- communicate over network
- no need to run application specific software on netwrk-core devices


## client-server
sercer
- provide services to clients
- always on
- often in data centers, for scaling
- needs to powerful
	- multiple client requesting info at the same time
	- have specialzed software

client
- request services by contacting and communicating with server
- may be intermittently connected
- do not communicate directly with each other

## peer 2 peer
- no alwasy on server
- decentralize resource on a network
- end systems are both client and servers
- end systems communcatae directly
- take advantage of distrivuted shared resources (bandwidth, CPU storage)
- operate in dynamic environment with frequent join and leave
- e.g., bitTorrent, blockchain


## communication
- process: network application running with a host
	- client proces and server process
	- processes in different hosts communicate by exhanging messages
- process must have identifiers
	- ip address to differentiate processes in different hosts
		- IPv4: 10.96.35.21 • IPv6: fe80::44b:184c:7ebb:6524
	- port number to differentiate processes in same host
		- HTTP server (80), mail server (25)

# functions of application protocols
protocols define:
- types of messages
	- e.e.g, request, response
- message syntax
	- what fields in messages and how field are delineated
- semantics
	- meaning on information in fields
- communcation rules
	- when and how proceses send and response to messages


## WEB http
- client server model
	- browser requests, recieves and displays web objects
	- server sends objects in response to requests
- HTTP
	- communcation betwen browsers and servers
- https
	- extensioin of http that uses transport layer security for security

methods
- get, head, post, put (request to store a webpage), delete, link (connect two existing resources), unlink

### exampl
## Email
## DNS

# Socket programming
