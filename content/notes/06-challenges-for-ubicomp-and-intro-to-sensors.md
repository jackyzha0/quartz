---
title: "06-challenges-for-ubicomp-and-intro-to-sensors"
tags: 
- lecture
- info305
sr-due: 2023-08-03
sr-interval: 3
sr-ease: 250
---

Challenges
- What’s difficult about Ubiquitous Computing? 
	- Requires understanding of sensors and new sensing technologies 
		- Noisy inputs 
		- Sensor fusion 
- Wireless communication channels 
- Power consumption 
- Context is only a proxy for human intent 
	- Unpredictable ussage context in particular for mobile devices 
- Require novel user interfaces, limited/different I/O capabilities 
	- Lack of standardization in interface patterns 
- Privacy & Security

Wireless Communication Channels
- ![https://www.ntia.doc.gov/files/ntia/publications/january_2016_spectrum_wall_chart.pdf](https://i.imgur.com/54UbAHD.png)
- Unpredictable availability and throughout 
- Many physical issues: 
- Refraction 
- Absorption 
- Antenna Geometry 
- Power Limits 
- Wireless spectrum is highly contested 
- Many sources of interference 
- Limited bandwith available 
- Often complext SW/HW stacks

Power Consumption
- Biggest energy consumers 
	- Display (backlight) 
	- Wireless modules 
	- GPS receiver, cameras 
	- Sensors (touch, accelerometer, IMU) 
- Limited power supply 
	- Tradeoff: capacity vs. size/weight/portability 
	- Energy consumption becomes important 
- Two solutions: 
	- Increase energy in relation to size/weight 
		- Requires chemistry & physics knowledge 
	- Decrease energy consumption 
		- Requires CS/IS/EE knowledge
- ![graph](https://i.imgur.com/VDhdsF2.png)

Privacy and Security
- Context awareness requires huge amounts of private & personal data (see current generation mobile devices) 
	- Emails, contacts 
	- Sensor data, movement profiles 
	- PIN/TAN codes 
	- Photos 
- Many people want to access data 
	- Google, Facebook, Microsoft (> ads) 
	- NSA, GCHQ, BND, Five Eyes (> crime prevention) 
	- Hackers (> extorsion, stealing your money) 
- Problem 1: No pervasive encryption 
- Problem 2: Voluntary use of cloud services, interconnected services

# Sensors
need to capture context information to build context aware systems

smartphone sensors
- Smartphones house highly integrated sensors for sensing the environment: 
- Proximity Sensors (e.g. NFC, Cameras) 
- Location sensors (e.g. Cell,. AGPS, WiFi, GSM, Cameras) 
- Orientation Sensors (e.g. Magnetometer, Accelerometer, Gyroscope, Camera) 
- 3D sensors (LiDAR, Cameras) 
- Microphone 
- Lux-meter 
- Future smartphones likely to add more: 
- Kinect (e.g., Primesense Capri, Motorola Tango) 
- RTK GPS 
- Health sensors (glucose sensor, heart rate monitor,..)

head mounted displays
- Head-mounted displays (e.g. Hololens, Snap Spectacles) house highly integrated sensors for sensing the environment: 
- Location sensors (e.g. 2 x cameras and depth camera) 
- Orientation Sensors (e.g. Magnetometer, Accelerometer, Gyroscope, Camera) 
- Microphone 
- Lux-meter 
- Eye tracking cameras


## Location
