---
title: "22-exam-info"
tags: 
- lecture
- info305
---



# Topics: 
## Ubiquitous Computing: 
		- Concept & Visions 
		- Examples for Ubiquitous Computing 
		- Common characteristics 
		- Ubiquitous Computing vs. Pervasive Computing vs. Mobile Computing vs. Traditional Computing 
		- Challenges		
> [!INFO] what we need to undetstand
> what is ubiquiitous computing? general concept, vision, etc. computers become smaller/cheaper - become almost everywhere
> graphics -> ubiquiteous vs pervasive vs mobile vs traditional. 2 axis scale, mobility and embeddedness. UBI:mobile and embedded. PERVAS:embedded not mobile. MOBILE: mobile not embedded. TC: neither. 
> for an example about ubiquitous need to explain why it is embedded
> even if an example is not needed: use an example to explain. 


## Snap Spectacles and Snaps Lens Studio development and project 
> [!INFO] just general knowledge


## Sensors: 
> [!INFO] 1 vs 2 vs three degrees of freedom
> trilateration/angulation: explain and give example for each. most computer vision things use triangulation
> proximity example: wifi (but can be extended to location)

> [!IMPORTANT] Come up with examples for a lot of things

- Accuracy vs. Precision 
- Degrees of Freedom 
- Trilateration (GPS) and Triangulation 
- Location 
	- Geographic 
	- Topological 
	- Cell-based 
	- Proximity

> [!INFO] RUn through each of these things for different sensors: e.g., accelerometer

- Cell-based sensors (GSM/3G/4G, Wifi, ..) 
- Fingerprinting 
- Proximity-based sensors (Infrared, NFC/RFID, Bluetooth) 
- GPS 
	- Functionality, Messages exchanged, Constraints, … 
	- Differences with and between AGPS, DGPS, RTK GPS
	
> [!INFO] be able to explain how GPS works. how do we know position. general funcitonality, constraints etc. 
> different types of GPS: what and how.
	
- Orientation Sensors: 
	- Accelerometers 
	- Compass 
	- Gyroscope (Drift!) 
- Sensor Fusion 
	- Filter-based sensor fusion 
	- Dead Reckoning 
	- Kalman

> [!INFO] what is gyro drift. 
> general idea of dead reckoning
> high level kalman filter

- Vision-based Sensors 
	- Marker-based Tracking 
	- Natural Feature-based Tracking & SIFT & SLAM 
	- Main stages of SIFT 
	- Invariances of SIFT (why? how?) 
	- Model-based Tracking
- Using a camera as sensor, advantages and challenges

> [!INFO] how does marker based tracking work: roughly
> SIFT, SLAM high level. variance, invariance
> how is sift invariant to X (e.g., scale, lighting, ) 
> lighting -> greyscale (dont, care about color of light, only care about gradient -> gradient is still the same regarless of light intensity. still local light changes -> we have enought points that we can ignore local light changes)
> scale -> blur and change resolution -> difference of gaussian. recreates effect of seeing from a long distance

> [!INFO] camera -> advatages, cheap, lots of information, . disatvantage, light, privacy, 


## Context 
- Definition, Context-Sources, Context Controllers, Context Targets 
- Context-Awareness 
- Challenges of Context-Awareness 
- Natural User Interfaces 
	- Why Natural User Interfaces 
	- Tangible User Interfaces 
	- Proxemic Interacions 
	- Context-Aware Interfaces 
	- Haptics

> [!INFO] pick example of context awareness in phone. -> 
> calendar event (source:time/calendar/location, controller, target:notification)
> have a few examples ready.
> context awareness examples: privacy, sensors are not always accurate, lack of control -need to find balalnce between user control and context awareness.

> [!INFO] NAT
> lots of examples 
> proxemic interactions: proximity and orientation
	 
- Augmented Reality 
	- What is AR? 
	- Classes of AR interfaces 
	- Spatial AR vs. Video see-through AR vs. Optical see-through AR 
	- Context-aware AR and Input for AR


# Example Questions: 

> [!INFO] defend your position, justify, convince him. 

- Provide and discuss an example for Ubiqitious Computing and for Mobile Computing. 
- How does SIFT achieve invariance to lighting? 
- Describe the main steps of SIFT when describing a feature point. Assume that the feature point is already found. 
- Describe the main steps of SIFT for detecting a feature point. 
- Explain the general concept of Fingerprinting and how it is used by Google to improve GPS localisation
- Contrast Bluetooth LE and NFC technology for sensing your location. 
	- bluetooth needs power source, also more
- Explain how cell phone towers can be used for estimating your position (cell-based localisation). Explain also different techniques that can be utilised to refine the position estimate 
- Explain Realtime Kinematics (RTK) GPS. How does it achieve improvements of traditional GPS? 
- Describe the sensors you would use for a fitness tracker application on your mobile phone. How would you refine or transform raw sensor readings to be of use? 
- What is Tangible Computing and how can it help to realise the concept for Ubiqitious Computing? 
- Contrast different classes of Augmented Reality interfaces. 
- Name and describe challenges when developing an optical see-through Augmented Reality interface compared to video-see through Augmented Reality interface? 
- Explain the concept of proxemic interaction within the context of Ubiqitious Computing. 
- Identify three different context-sources and their correspondig contexttargets in common mobile phones. 
- Discuss the degrees of freedom and expected accuracy and precision for a compass magnetometer (Compass). Why would you recommend its usage despite given limitations? 
- Why is sensing crucial for the concept of Ubiqitious Computing? 
- Identify 5 challenges for the concept of Ubiqitious Computing. Provide possible directions for overcoming the identified challenges. 
- Outline the communication beween satellites and receivers for GPSbased localisation. Explain the three components of the satellites and how they are used by the receiver.

> [!INFO] long secario questions: no right or wrong, make your case. descript pros and cons. otline and describe. defend and really explain yours. 

Scenario A - The university wants to track position of people on the campus (e.g. for emergency reasons) 
- You are the contractor or want to get the contract. 
- Please brainstorm and discuss solutions (approach, advantages, disadvantages). 
- Give a final recommendation
![|300](https://i.imgur.com/V8O0url.png)

Scenario B - The university wants to extend the system from Scenario A to also be able to understand what the people are doing (context) 
- You are the contractor or want to get the contract. 
- Please brainstorm and discuss solutions (approach, advantages, disadvantages). 
- Give a final recommendation
![|300](https://i.imgur.com/AXYNHVT.png)

Scenario C - The university wants to extend the system from Scenario A or B to also offer navigation on the campus (indoor and outdoor). 
- You are the contractor or want to get the contract. 
- Please brainstorm and discuss solutions (approach, advantages, disadvantages). 
- Give a final recommendation
![|300](https://i.imgur.com/tbw0nES.png)