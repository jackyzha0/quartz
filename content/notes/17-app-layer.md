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

web cache
- store data to be used later
- makes loading faster
- browser sends all request to cache
	- if object is not in cache, the cache requests from the server
	- files are stored as representation (a snapshot) 
	- files expire after their time to live is finished
- we need to check if cache is up to date
	- conditional get: If-modified-since:
	- if up to date then: HTTP/1.0 304 Not Modified

## Email
three components
- user agents
	- software to compose, read, reply etc email
	- handle local mailboxes
	- e.g., outlook, thunderbird
- mail servers
	- mailbox contains emails for user
	- each box has a unique address
	- localpart@domain
	- message queue of outgoing to send messages
- protocols
	- ![](https://i.imgur.com/2GxXXLu.png)
	- SMTP to send (simple mail transfer protocol)
		- send from user agent to mail server and between mail servers
		- simple ascii protocol
	- POP (post office protocol)
		- fetch email from mail server
		- simple but limited
		- delete and keep mode (delete from server of keep)
	- IMAP (internet mail access protocol)
		- more functions
		- e.g., check email header before downloading, partially download email
		- allow users to organize mails on server
	- MIME (multi prpose internet mail extensions)
		- supplementary protocol to allow non-ASCII dat to be send through emails
		- WAN connect LANS together
- email format
	- ![](https://i.imgur.com/pwvTvnL.png)
	- envelope
		- contains address of sender and reciever
		- used by smtp to transport email
	- message
		- header
			- defines sender, reciever, subject etc
		- body
			- contains actial information
	- email spoofing can make the addresses in header and in envelope different

## DNS
- ip adresses are hard to remember
- need to map betwen host name and ip address
- 


# Socket programming
