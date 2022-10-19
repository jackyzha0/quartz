---
title: "23-wireless-mobile"
aliases: 
tags: 
- cosc203
- lecture
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
- multiple wireless sender, recievers create additional problems (beyond multiple access):
- ![](https://i.imgur.com/SK9pcMz.png)
- ![](https://i.imgur.com/12vOuH1.png)

# WLAN and wireless link
Standards created and maintaned by IEEE
- covers data link layer and physical layer
![standards table](https://i.imgur.com/werOMuI.png)
- all use CSMA/CA for multiple access, and have base station and ad-hoc versions

WLAN architecture
- wireless hosts communicates with base station (A)

# CSMA/CA

# Hidden terminal problem

# Cellular networks

# 4G LTE
