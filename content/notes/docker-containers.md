---
title: "docker-containers"
aliases: Docker Containers
tags: 
- video
- networks
---

link:https://www.youtube.com/watch?v=eGz9DS-aIeY

where virtual machines virtualise hardware, docker virtualises OSs. Each of the containers uses the same underlying kernel. This is why its so fast. It is also why you cant run a windows OS and a Linux OS at the same time - because they use different kernels.

Crontrol groups control how much OS resources each container can use.

VM:
- hardware
	- hypervisor
		- windows
		- ubuntu
		- debian
		- etc

Docker
- hardware
	- ubuntu
		- docker
			- debian
			- ubuntu
			- windows
			- etc
