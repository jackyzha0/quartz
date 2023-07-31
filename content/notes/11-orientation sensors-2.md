---
title: "11-orientation sensors-2"
tags: 
- lecture
- info305
sr-due: 2023-08-03
sr-interval: 3
sr-ease: 250
---

> [!INFO] we need sensors to that computing can be ubiquitous. from this we can think of completey new interfaces

> [!INFO] gyroscope
> say a phone is rotating by 5 degree per seconds. usualy want to know absolute angle.  this is the integral over time, we know what the angular rate is and the time. 
> problem: cannot take perfectly continuous integral. they do more than 100 measurements per second. gryoscope data changes faster than samplling frequency. this is called drift/bias, as the error accumulates. 
> when the sensor is stationary, it still measures a small value, which is inherent in accuracy. so the sensor thinks it is moving when it is not. the bell curve of inaccurate measurements is not centred. 

Advanced sensing
- Current situation: 
	- Many different sensors with different characteristics 
		- Precise but slow, noisy but fast, drift biased,… 
		- We cannot measure everything… 
- Can we combine sensors for model more complex states? 
- Can we filter sensor measurements to improve the data quality?

> [!INFO] this is what is happening, there is a lot of processing on top of the raw data. we combine sensors to get better results

Sensor Fusion
- The idea: 
	- Combine (fuse) sensor to achieve better results 
	- Better Location (When signal ist lost, not enough satellites, ..) 
	- Better Orientation (Less drift (gyroscope), less error prone (compass), ..)

> [!INFO] e.g., fuse wifi signal with GPS to make AGPS. 

Sensor Fusion
- Example for Orientation 
	- Combine strength of several integrated sensors 
	- Avoids gyro drift and noisy orientation 
		- http://www.thousand-thoughts.com/2012/03/android-sensor-fusion-tutorial/ 
	- Gyroscope output is applied only for orientation changes in short time intervals (high-pass filtering) 
	- Accelerometer/Magnetometer is used as support information over long periods of time for absolute orientation (low pass filtering)
![sensor fusion](https://i.imgur.com/vO3rjBd.png)
![sensor fusion signal filters](https://i.imgur.com/oYSFNvi.png)

> [!INFO] when phone is still, use the magnetometer, when moving faster use the gyro
> low pass filter, lets the low frequencies through
> high pass filter, lets high frequencies through

> [!INFO] you can create more sophisicated algorithms, but these usually introduce latency

Dead Reckoning
- Dead Reckoning 
	- Estimates current position using 
		- Previously known position 
		- Speed 
		- Orientation/direction 
		- Elapsed time 	
- Used in all kinds of navigation (Marine, Aerial, Car, Robot, Pedestrian, .. )

> [!INFO] guessing where you are based on you previous movements
> prediciton of current locationi based of previous state

- Starting with a reference point (known position) 
- Detect relative movements 
- Smartphone sensors can be used 
	- Accelerometer – step detection (distance) 
	- Magnetometer and gyroscope (orientation) 
	- Barometer (level changes) 

> [!INFO] GPS in cars sometimes just put you on the nearest road
> robots use a lot of dead reckoning


- Issues: 
- Even small errors lead to incorrect positions 
- Subsequent errors increase incorrectness 
- Orientation is biggest issues 
- Periodic recalibration with new reference point required
![](https://i.imgur.com/ZKd8Z4t.png)

![](https://i.imgur.com/7h9nO5Z.png)
![](https://i.imgur.com/xNrcbm7.png)

> [!INFO] detect when you take a lift as a calibration point