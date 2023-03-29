---
title: "10-orientation-sensors"
tags: 
- lecture
- info305
---


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
	
	
	
Compass / Magnetometer 
- Measures the strength of earth’s magnetic field 
- Strength is expressed in tesla [T] 
- iPhone 4 magnetometer range: ±2mT 
- Pro tip: prolonged exposure to a fridge magnet decalibrates your phones’ magnetometer for at least a week ;-)
![field strength examples|300](https://i.imgur.com/00VV74x.png)

![Error around metal/magnetic objects](https://i.imgur.com/YIJAcGS.png)


	
	
	
	
Recap
- Several improvements to traditional GPS 
- AGPS for improved startup time and improved localisation using WIFI 
- DGPS for improved localisation using reference stations with known error 
- RTK GPS for improve localisation using DGPS and phase analysis 

- Accelerometers for measuring gravity along multiple axis (typically 3) 
- Usually implemented with MEMS 
- Typically limited in value range (in mobile devices)