---
title: "18-transport-layer"
aliases: 
tags: 
- cosc203
- lecture
---
chapter 3
# service provided by transport layer
services
- process to process communication
	- logical communication between application processes
- multi and demulti plexing
	- communication for multiple applications of the same host
- flow control
	- ensure production reate <= consuption rate
- congestion control
	- too many sender, sending too fast

protocols
- TCP transmission control protocol
- UDP user datagram protocol

## actions and sender
- is passed an app layer lessage
- determines segment header fields values
- creates segment
- passes segement to IP

## actions at reciever
- recieves segment from IP
- checks header values
- extract app layer message
- de multiplexes message up to application via socket

# multiplexing and demultiplexing
sender: handle data from multiple sockets, add transport header
reciever: user header info to deliver segments to correct socket

![](https://i.imgur.com/f2NqsKE.png)

## how it works
port number
- 16 bit integer (0, 66635)
- segment has a source and a port number
- host uses IP and port to direct segment to appropriate socket

IANA (internet assign number authority) has divded port number into three ranges
- 0-1023 well known
- 1024-49151 registered
- 49152-65535 dynamic

## principle of reliable data transfer
![](https://i.imgur.com/ORzC8jm.png)

- compexity of reliable data transfer protocol depends on character istics of unreliable channel
- sender and reciever do not know the 'state' of each other. they need to communicate via a message - ACKknowledgement

# TCP
- point to point communicate
	- one sender, one reciever
- reliable, in-order byte stream
	- no message boundaries
	- each byte has a position in the stream
- full duplex data
	- bi directional data flow in the same connection
	- MSS: maximum segment size
- cumulative ACKs
- connection-oriented
	- handshaking (exchange of control messages) initializes se

# UDP