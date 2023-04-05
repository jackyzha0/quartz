---
title: "12-advanced-sensing-vision-sensors"
tags: 
- lecture
- info305
---


Sensor Fusion - Fusion with vision sensors
- Combine integrated sensors with vision sensors (will be covered later in more details) 
- Orientation tracking 
	- Absolute measurements from integrated sensors (Compass) 
	- Relative measurements from vision sensors (camera) using a panorama 
- Rotations between world reference system N, device reference system D and panorama reference system P (vision).
![|300](https://i.imgur.com/ZM6XOlt.png)
![|300](https://i.imgur.com/dhIAyjf.png)
![|300](https://i.imgur.com/ENhtEDq.png)
> [!INFO] can you camera help you know where you are without GPS. 
> could build snensor fusion system using GPS and the camera to improve accuracy. can use 3d maps to compare you camera view with generate views of 3d maps

Vision-based Localisation and Tracking
- Reprise from our earlier lecture on localisation and tracking using hardware sensors: 
	- GPS: not working indoors, not very accurate, but (nearly) everywhere available 
	- Gyro: fast, but a!ected by drift 
	- Magnetometer: Absolute measurement, error prone 
- Can we use the camera instead of these sensors or complement some of these sensors?

Computer Vision
- Computer Vision extracts information from images that are relevant to a particular set of services. 
- Services that machine vision can provide to HCI include 
- Detection 
	- Determines the presence or the absence of an entity of a given type 
- Identification 
	- Recognizing what entity of the class is present in the scene 
- Tracking 
	- Determining the location of an entity over time. 
- Entities include: 
	- Real-world objects used as instruments, or tools 
	- Human body including face, fingers, hands and feet, or the whole body 
	- Activities such as typing, standing up, walking, entering a doorway or shaking hands

• Reprise: • Degrees of Freedom (DoF): Number of parameters of the system that may vary independently. • E.g. a Compass has 1DoF, Accelerometers 3DoF, • 6DoF: posX, posY, posZ, rotX, rotY, rotZ • Localisation: Computing ones pose assuming no prior knowledge (usually in 6DoF, and often not in real-time) • Tracking: Computing ones pose using prior knowledge (usually in 6DoF, and often not in real-time) V