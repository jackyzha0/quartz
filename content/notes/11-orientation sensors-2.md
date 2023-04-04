---
title: "11-orientation sensors-2"
tags: 
- lecture
- info305
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

Sensor Fusion
- The idea: 
	- Combine (fuse) sensor to achieve better results 
	- Better Location (When signal ist lost, not enough satellites, ..) 
	- Better Orientation (Less drift (gyroscope), less error prone (compass), ..)

Sensor Fusion
- Example for Orientation 
	- Combine strength of several integrated sensors 
	- Avoids gyro drift and noisy orientation 
		- http://www.thousand-thoughts.com/2012/03/android-sensor-fusion-tutorial/ 
	- Gyroscope output is applied only for orientation changes in short time intervals (high-pass filtering) 
	- Accelerometer/Magnetometer is used as support information over long periods of time for absolute orientation (low pass filtering)
![sensor fusion](https://i.imgur.com/vO3rjBd.png)

![sensor fusion signal filters](https://i.imgur.com/oYSFNvi.png)

Dead Reckoning
- 