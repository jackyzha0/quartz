---
title: "25-network-security-2"
aliases: 
tags: 
- cosc203
- lecture
---


# TLS
- security protocol above transport layer.
	- supported by most browsers
	- prvides, confidentaility, integrity, authentication
- replaced SSL

- provides API that any application can use
- ![http view of TLS](https://i.imgur.com/c68ksNH.png)
- QUIC and http3: moves transpor tlayer functions to app layer, on top of UDP

how
- handshake: use certificates, private keys to authenticate each other, exchange or create shared secret
- key derivation: use shared secret to derive set of keys
- data transfer: as a series of records, not just one time transactions
- connection closure: special message to close message


protocols
- handshake protocol
- changechipherspec protocol
	- choose encryption algerithms
- alert Protocol
	- terminate
	- error reporting
- record protocol
	- divide data to segments
	- encrypt and authenticate and send

handshake
- ![](https://i.imgur.com/ROiKXo9.png)

cryptographic keys
- bad to use the same key for more than one crytographic algorithm (encryption and authentication)
- uses master secret
- ![](https://i.imgur.com/ZBiTZsk.png)

record protocol
- encrypt and athenticate data
- ![diagram](https://i.imgur.com/xbM5vm7.png) 
- divide in to small segements, encrypt each one, MAC (message authentication code)

changeCipherSpec and alert


https and ssh
- https = http over tls
- ssh
	- replacement for telnet
	- similar to tls
		- data encryption
		- authentication

# IPSec
- IP layer security
- datagram level encryption, authentication, integrity
	- both user traffic and control traffic
- two modes
	- transport mode
		- only payload not header encrypted, and authenticated
	- tunnel mode
		- entire datagram is encrypted
		- encrypted datagram encapsulated in new datagram with new IP header, tunneled to destination (new IP different from first e.g., next router)

Authentication header (AH) protocol
- provides source authenticatio and data inegrity not confidentiality

encapsulation security protocol (ESP)
- provides source authentication, data integrity, and confidentiality
- used more than AH
- ![example packet](https://i.imgur.com/yCRWmZH.png)
- ESP trailer: padding for block ciphers
- ESP header: SPI so recieving entity knows what to do
- sequence number, to thwart replay attacks
- MAC in ESP auth field created with shared secret key
- path
	- at R1: appends ESP trailer, encrypts result using algorithm and key
	- appends header to front
	- created authentication MAC
	- appends MAC forming payload
	- creates new IP header, new IP header fields, addresses to tunnel endpoint

# firewall
- isolates orgs internal network from larger internet, allowiing some packets to pass, blocking others

three types
- stateless packet fiiltering
	- filters packet by packet, decision to forward/drop based on
		- source, dest IP
		- TCP/UDP source, dest port
		- ICMP type
		- TCP SYN, ACK bits
	- e.g., block incoming and outgoing datagrams with IP protocol field = 17 and with either source or dest port = 23
	- ACL access control list:
	- ![example](https://i.imgur.com/40mYTDp.png)
- stafeful
	- track status of every TCP connection
		- using SYN, FIN segments => determine if packets "make sense"
	- timeout inactinve connections at firewall: no longer admit packets
	- ![](https://i.imgur.com/iytmCh7.png)
	- more powerful, more computation
- application gateways
	- filters on application data as well as header fields
	- e.g., allow seletc internal users to telnet outside
		- require all telnet users to go through gateway
		- for auth'd users, gateway sets up telnet connection to dest host
			- gateway relays data between
		- router filter blocks all telnet connections not from gateway

limitaitons
- IP spoofing
- if multiple apps need special treatment, each has own app. gateway
- client software must know how to contact gateway
	- e.g., must set IP of proxy in browser
- filters oftenuser all or nothing policy for UDP
- tradeoff: access with security

# IDS
- instrusion detection system
- deep packet inspection
	- look at contents (e.g., check strings in packet against DB of known virus, attack strings)
- examine correlation among packets
	- port scanning
	- network mapping
	- DoS attack

multiple IDSs: different types of checking at different locations