---
title: "23-wireless-mobile"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2022-10-23
sr-interval: 3
sr-ease: 250
---

More wireless phones that wired phones.
More mobile broadband than fixed broadband

two different challenges
- communication over wireless link
- mobility: handling the mobile user to changes point of attachment

elements
- wireless hosts
	- does not always mean mobile
- base station
	- connected to wired network
	- relay: sendig packets between wired network and wireless hosts in its "area"
		- e.g., cell towers
- wireless link
	- used to connect mobile to base station, also used as backbone link
	- various transmission rates, distances, frequency bands

architecture
- infrastructure mode
	- base station connect mobiles to wired network
	- handoff: mobile changes base station
- ad hoc mode
	- no base stations
	- can only transmit to  other nodes within link coverage
- nodes organize themselves into a network: route among themselves

wireless link
- deccreased signal strength: radio signal attentuates as it travels
- interference from other sources: frequency shared by other technologies
- multipath propagation: signal reflects of objects arriving at sightly different times

SNR BER tradeoffs
- SNR - signal to noise ratio
	- larger SNR is easire to extract signal
- BER - bit error rate
- larger SNR => smaller BER
- many parameters at physical level which alter SNR

hidden terminal problem
- multiple wireless sender, recievers qcreate additional problems (beyond multiple access):
- ![](https://i.imgur.com/SK9pcMz.png)
- ![](https://i.imgur.com/12vOuH1.png)

# WLAN and wireless link
Standards created and maintaned by IEEE
- covers data link layer and physical layer
![standards table](https://i.imgur.com/werOMuI.png)
- all use CSMA/CA for multiple access, and have base station and ad-hoc versions

WLAN architecture
- wireless hosts communicates with base station (Access point AP)
- Basic service set (BSS): set of devices that share the same service identifier
	- wireless hosts
	- AP
- in ad hoc mode: hosts only, no AP

channels and association
- spectrum divided into channels at different frequencies
	- admin chooses frequency for AP
	- interference possible: channel can be the same as a neighboring AP
- a new host must assiciate with the AP (connect)
	- listens for *beacon frames*
		- contain AP name (SSID) and MAC	
	- may perform authentication
	- run DHCP to get IP in AP's subnet

# CSMA/CA
- avoid collisions
- CSMA sense before transmitting
- wifi: no collision detection
	- hard due to: hidden terminal, fading, 
	- instead: CA collision avoidance

DCF (distributed coordination function)
- CSMA/CA with binary exponential backoff algorithm

sender
- if sense channel idle for DIFS (DCF interframe space) then send data (no CD)
- if sense channel busy: 
	- start random backoff time
	- timer counts down while channel idle
	- transmit when timer expires
	- if no ACK, increase random back of interval, repeat 2

reciever
- if frame recieved ok
	- return ACK after SIFS (short interframe space)
	- ACK needed due to hidden terminal problems
	
collision avoidance
- handshake to "reserve" channel use for data frames using request-to-send (RTS) and clear-to-send (CTS) packets
- ![](https://i.imgur.com/awsot1V.png)

# Cellular networks
solution for wide-area mobile internet
![generations](https://i.imgur.com/AyQEeMF.png)

basic concepts
- base stations: a.k.a., cell tower
- cell: geographical area covered by a BS
- frequency reuse principle
	- set of freqs is limited
	- neighboring cells cannot use the same set of freqs
- a freq reuse pattern is a configuration of N cells where N is the reuse factor

![reuse factor](https://i.imgur.com/QKOhTQ5.png)

handoff
- transfer ongoing call or data connection from one BS to another
- methods
	- hard handoff
		- break before make
	- soft handoff
		- make before break
- roaming
	- users can use cell services when traveling outside the coverage area of home network by using a visited network
	- roaming agreement bettween home at visited network
	
# 4G LTE
similarity to wired
- ![](https://i.imgur.com/IHSbxZv.png)

difference:
- ![](https://i.imgur.com/pjJQaGX.png)

Long-Term Evolution (LTE), 4G standard
- traffic recieved by wirless network is routed using the internet

mobile device
- 64-bit international mobile subscriber id (IMSI) stored on SIM (subscriber identity module) card
- UE (user equipment) - any that has a sim card and connects to a cell tower

base station
- at "edge" of carrier network
- ![](https://i.imgur.com/QxXmpp6.png)

Mobility management entity
- ![](https://i.imgur.com/P1EKv6y.png)

data plane protocol stack
- ![](https://i.imgur.com/wSf0IJl.png)

associating with a BS
- ![](https://i.imgur.com/PYoQtqL.png)

# 5G
increase data date by 10x, 10x latency decrease, 100x increase in traffic capacity

5g NR
- two freq bands
- not back compatible
- massive MIMO

millimeter wave freq
- higher rates
- over shorter distances
- dense deployment of new base stations

