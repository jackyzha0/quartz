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


# IPSec

# firewall

# IDS