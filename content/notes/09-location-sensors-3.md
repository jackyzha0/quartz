---
title: "09-location-sensors-3"
tags: 
- lecture
- info305
---

# Location Sensors - GPS (cont.)

GPS - Receiver 
- Uses messages received from satellites (n≥4) to determine the satellite positions and time sent 
- Gives roughly distance to satellite 
- Applies Trilateration for computing location 
- The receiver has four unknowns, the three components of GPS receiver position and the clock bias [x, y, z, b] 
- Using four (or more) satellites, we can set up 4 linear equations to solve for x, y, z, b 
- In some cases we know z or b we need less satellites! Urban Canyon 
- Urban environment similar to a natural canyon 
- Can impact radio reception of GPS receivers 
- Buildings reflect and occlude satellite signals 
- Reducing precision of positioning in urban environments 
- Makes positioning impossible 
> [!INFO] Add a fourth satellite so we can find the clock bias
> there are timer networks where you can get time from an atomic clock (still not accurate but better)

Urban Canyon 
- Urban environment similar to a natural canyon 
- Can impact radio reception of GPS receivers 
- Buildings reflect and occlude satellite signals 
- Reducing precision of positioning in urban environments 
- Makes positioning impossible www.hci.otago.ac.nz The end!
![Urban canyon](https://i.imgur.com/WgWREXs.png)
![Urban canyon](https://i.imgur.com/1aKMSLg.png)
> [!INFO] buildings block some satellites
> reflected signals take more time to arrive and disrupt accuracy
> also happens with lower building that are closer together
> happens also with trees


GPS - Problems 
- Urban environment similar to a natural canyon 
	- Can impact radio reception of GPS receivers 
- GPS will not work indoors 
- GPS quickly kills your battery 
- Accuracy strongly depends on antenna design and device form factor 
	- “Position tests by the mobile phone revealed a median error between 5.0 and 8.5m” 
	- “Increase by a factor of 2 to 3 compared to standalone GPS sensors.” 
	- “Very large errors are uncommon and rarely exceed 30m”
- Long startup time ( 30s - 12.5min needed for sending almanac) 
- Several proposed improvements: AGPS, DGPS, RTKGPS
> [!INFO] ^Depends on many parameters 
> bad weather also affects travel time hence accuracy
> long start up time. almanac (satellite position and future positions) is a large amount of data that each device needs to recieve 
> with data/wifi can download almanac from phone provider

# Location Sensors - AGPS, DGPS, RTK GPS

A(ssisted) GPS 
- Introduced by Qualcomm in 2004, used extensively in mobile phones 
- Idea: 
	- Traditional GPS only uses radio signals from satellites 
	- Assisted GPS (A-GPS) uses network information (transmission of almanac) 
	- Increase position accuracy by also incorporating Wi-Fi Positioning System and cell-site multilateration 
- Advantages: 
	- Faster location acquisition 
	- Higher precision (with WiFi Positioning & cell-site multilateration) 
- Disadvantages: 
	- Requires Internet connection
![A(ssisted) GPS](https://i.imgur.com/u7iLeWG.png)
> [!INFO] most relevant to us. used in mobile phones. trad gps uses only satellite. AGPS used that and network information 
> also incorporates wifi and cell location

D(ifferential) GPS
- Enhancement to GPS to increase location accuracy and integrity 
- DGPS correct errors using a stationary receiver station with a known location 
	- Stationary receiver knows own location and can calculate and Delta between known position and GPS position 
	- Stationary receiver broadcasts signal correction information (Delta) 
- Standalone GPS provides ~15m accuracy 
- DGPS can provide ~3-5m (and max. 10-15cm) accuracy
![D(ifferential) GPS](https://i.imgur.com/WCH4dJk.png)

- Various DGPS networks implemented worldwide 
- iBase VRS (New Zealand) (see also Trimble) 
- DGPS & RTK GPS within NZ 
- http://www.geosystems.co.nz/solutions/ ibase-vrs/
![nz iBASE VRS](https://i.imgur.com/0yv7rWC.png)


