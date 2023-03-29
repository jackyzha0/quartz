---
title: "10-orientation-sensors"
tags: 
- lecture
- info305
---

> [!INFO] Location sensors dont know

Accelerometers 
- Measures proper acceleration (acceleration it experiences relative to freefall. gravity), felt by people or objects 
- Units: m/s2 or g 
- Most smartphone accelerometers trade large value range for high precision 
	- iPhone range: ±2g, precision 0.018g
![g forces|300](https://i.imgur.com/l4DnMSN.png)

Accelerometers 
- Acceleration is measured on 3 axes 
- Orientation of sensor (and coordinate system) varies among different device
![|100](https://i.imgur.com/4SwveO3.png)

Accelerometers 
- Miniaturisation using a MEMS (Microelectromechanical systems)
- Measuring flowing current over an differential capacitor indicates the acceleration
![|300](https://i.imgur.com/UIS4zDV.png)

Accelerometers 
- Advantage: 
	- Fast update rate 
	- Relatively accurate 
- Disadvantage: 
	- Can’t easily identify certain kind of acceleration (small value range)
	
	
	
![two phones|300](https://i.imgur.com/s45a4TF.png)
Compass / Magnetometer 
- Measures the strength of earth’s magnetic field 
- Strength is expressed in tesla [T] 
- iPhone 4 magnetometer range: ±2mT 
- Pro tip: prolonged exposure to a fridge magnet decalibrates your phones’ magnetometer for at least a week ;-)
![field strength examples|300](https://i.imgur.com/00VV74x.png)

![Error around metal/magnetic objects](https://i.imgur.com/YIJAcGS.png)

Compass / Magnetometer 
- Advantage: 
	- Absolute orientation measurement 
- Disadvantage: 
	- Usually slow update 
	- Sensitive to errors 
		- Local discontinuities in magnetic field 
		- Ferromagnetic materials 
		- Power sources

![gryroscope|300](https://i.imgur.com/VnL5seY.png)
Gyroscope 
- Detects the current orientation of the device, or changes in the orientation 
- Precisely: orientation can be computed from the angular rate that is detected by the gyroscope, expressed in rad/s [deg/s] on 3 axis. 
- Traditional gyroscopes use the e!ect of angular momentum
![gyro deg of freedom|300](https://i.imgur.com/q1LjfPD.png)
![gyro electronic|300](https://i.imgur.com/5Ti80sO.png)

- MEMS (microelectromechanical system) gyro 
- Used in most smartphones or mobile/embedded devices 
- Use the displacement of vibrating proof mass to compute orientation (Coriolis effect)
![MEMS gyro|100](https://i.imgur.com/dzTVCpE.png)
![gyro chip](https://i.imgur.com/zVoQ3wM.png)

Problem: 
- The gyroscope gives us angular rate with a unit of rad/s [deg/s] 
- We can find the angular position at any given moment t with the following equation (assuming t=0 theta=0) 
![eq1|100](https://i.imgur.com/CZKk1M7.png)
- We cannot take a perfectly continuous integral -> take the sum of a finite number of samples taken at a constant interval Ts 
![eq2|100](https://i.imgur.com/vL0gRbV.png)
- Gyroscope data changes faster than the sampling frequency 
	- We will not detect it, and the integral approximation will be incorrect 
	- This error is called drift/bias as it increases in time, no return to 0o



Recap
- Several improvements to traditional GPS 
- AGPS for improved startup time and improved localisation using WIFI 
- DGPS for improved localisation using reference stations with known error 
- RTK GPS for improve localisation using DGPS and phase analysis 

- Accelerometers for measuring gravity along multiple axis (typically 3) 
- Usually implemented with MEMS 
- Typically limited in value range (in mobile devices)