---
title: "18-transport-layer"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2022-11-01
sr-interval: 10
sr-ease: 250
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
- is passed an app layer message
- determines segment header fields values
- creates segment
- passes segement to IP layer

## actions at reciever
- recieves segment from IP layer
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
	- one ack message confirms multiple segments
- connection-oriented
	- handshaking (exchange of control messages) initializes sender, reciever state before data exchange
- flow controlled
	- sender will not overwhelm reciever
- congestion controlled
	- dynamically adjust congestion window size

Structure
- sequence number - numbe assigned to the first byte of data in this segment
- ACK # - the seq # of the next expected byte; flagged as a single bit
- internet checksum - used to check for corruption
-  TCP options (variable length)
-  length (of TCP header)
-  application data
-  RST, SYN, FIN - connection management
	-  syn - initiate a connection
	-  fin - close a connection
-  recieve window - flow control # of bytes reciever willing to accept
	-  protect against buffer overflow
-  C, E: congestion notification 

![](https://i.imgur.com/M4nQCr3.png)

seq number
- byte stream
- "number" of first byte in segments data
- sliding window ![](https://i.imgur.com/qY5kmsN.png)
 
 ack
 - seq # of next bytes expected from other side
 - cumulative ACK

![](https://i.imgur.com/jxhCPpa.png)

lost and duplicated segments
- lost
	- host does not recieve data, ack is not send, 
	- timeout + retransmission
	- ![](https://i.imgur.com/wtHhht4.png)	
	- sender sets the retransmittion timer when sending a segment
	- sender retransmits the segment iin ACK is not recieved when timer fires
- duplicated
	- host recieved data, ack is send and lost
	- data is resent, and a duplication is detected (same sequence number)

## connections setup
three way handshake to set up virtual connection
- each knowing the other willing to communnicate
- agree on connection parameters (e.g., starting seq # s)

![diagram|400](https://i.imgur.com/XPfKER3.png)

## connection termination
half-close
- ![](https://i.imgur.com/Ldi03j9.png)

2-way handshake
- combine ack and and server fin message
- ![](https://i.imgur.com/osXuN2h.png)

![](https://i.imgur.com/d1Tt0eL.png)

## TCP flow control
- happens at reciever side
- we have applications, and in the kernel we have receive buffer
- incoming data is stored in recieve buffer
- applications fetch data from this buffer
- reciever advertises free buffer space in recieve window field in TCP header
- sender limits amount of in-flight data to guarantee recieve buffer will not oveflow

![diagram](https://i.imgur.com/wsm9MA5.png)

### congestion control
"too many sources sending too much data too fast for network to handle"

consequences:
- long delay (queueing)
- packet loss (buffer overflow)

different from flow control (one sender too fast for one reciever)

![causes](https://i.imgur.com/Ae5xOa3.png)

AIMD 
- senders can increase sending rate until packet loss occurs, then decrese rate on loss event
- additive increase: increase sending rate by 1 maximum segment size every RTT until loss detected
- multiplicative decrease: at each loss event, cut sending rate: in half (TCP Reno), to 1 MSS (TCP Tahoe)
- ![diagram](https://i.imgur.com/AeOEapp.png)
- creates sawtooth behavioiur: probing for bandwidth

![](https://i.imgur.com/Citauiv.png)
- tcp sender limits transmission: LastByteSent- LastByteAcked < cwnd
- cwnd is dynamically adjusted in response to observed network congestion (implementing TCP congestion control)

TCP sending behavior: roughly: 
- send cwnd bytes, 
- wait RTT for ACKS, 
- then send more bytes

TCP rate = cwnd/RTT * bytes/sec

TCP slow start
- when connectin begins, increase rate exponentially until first loss event
	- intially, cwnd = 1 MSS
	- double cwnd every RTT
	- increment cwnd for every ack recieved
- initally slow but ramps up fast
- ![](https://i.imgur.com/khbzr79.png)

ssthresh variable: determines when to switch between exponential and linear

# UDP
- connectionless:
	- no handshaking between UDP sender, reciever
	- each UDP segment handled independently of others
- beset effort service, UDP segments may be lost or delivered out of order
- no flow and congestion control
- applications
	- streaming
	- dns SNMP
- less overhead