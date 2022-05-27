---
title: "containers"
aliases: Containers
tags: 
- cosc202
---

# What are (software) containers?

- Containers encapsulate a computing environment 
- Facilitates portable and reproducible use of software 
- Can wrap up application code and data, and much of OS 
- Containers are lightweight virtual machines 
- You need to boot them up, as for any OS 
- . . . but containers start up very quickly

# What containers do and don’t include 
- Containers are generally Linux (virtual) machines 
	- Even when hosted on Windows, containers are usually Linux 
	- Microsoft Windows containers do exist though 
- Containers include the OS user space 
	- e.g., distributions: Ubuntu, Debian, Arch. . . 
- Containers do not include Linux kernel 
	- ... because all containers share one instance of the Linux kernel 
- Containers can’t themselves include hardware device drivers

# Using containers
- We won’t explore how containers are hosted 
- COSC349 explores how the lightweight virtualisation works 
- We focus on using others’ containers 
- Making containers usable involves: 
- Management tools to control containers 
- Means for interacting with the containerised software 
- Somewhere from which to get their starter material. . .

# Container registries
- Containers’ start up from an image 
- Think of images as a hard disk template 
- Images efficiently overlay layers of files and folders 
- Container registries store and share images: e.g., 
- Docker Hub is a popular container registry 
- GitHub Container Registry (public; launched 2020) 
- GitLab Container Registry (private) 
- All major cloud providers provide registries 
- You can run on-site, private registry too

# Example container interacting with files 
- Let’s build the containers lab website
- Input: Markdown files
- Output: HTML website 
- Can use this container within [CI](notes/continuous-integration.md) pipelines
- Active container can rebuild ‘live’:
- source files are watched for changes
- changes trigger rebuilding target files
- can reload browser to see changes rapidly
- Note: this example is an optional part of containers lab 
	- `docker run −−rm −−mount \ type=bind, source=${PWD}, target=/srv/jekyll\jekyll/jekyll:pages jekyllbuild`

# Example container interacting over network 
- Lesson builder can host an internal web server
- Point browser running on host computer to network URL
- Thus test built website, not just opening HTML files within it
- Container framework can share container’s network
- Typically expose key network ports of container on host
- Connections routed through to container
- Usually connections limited to interactions with the host OS
- . . . but containers can support internet-facing servers 
	- `docker run −−rm − i t −−mount \ type=bind , source=$ {PWD} , target=/srv/jekyll\ −p127.0.0.1:4000:4000\jekyll/jekyll:3jekyllserve`

# Inter-container interactions 
 - Can build apps by composing multiple containers
	 - Either or both of file/network-based sharing commonly used
 - Need to consider how to orchestrate containers
	 - Container orchestration is a COSC349 topic
	 - e.g., coordinating multi-container start up
 - Kubernetes is the de facto container orchestrator
	 - Creates reliable, scalable services from containers
	 - Supported on all major cloud providers 

 # FYI: example multi-container application 
 - Example: say you need to chart time-series data
 - InfluxDB is a dedicated time-series database
 - Grafana is a dedicated web-based charting system
 - Both are large, complex software products
 - Containers allow using them together
 - . . . without needing to figure out how to install them
 - e.g., use Docker Compose tool; there are examples on GitHub
 - Managing more than a few containers?
 - Switch over to a container orchestration tool! 

 # Managing containerised applications 
 - Containers can (do!) suffer security vulnerabilities
 - Thus, need management just like any other OS
 - Many services can notify you about security flaws
 - e.g., your dependencies may have been patched
 - Can easily upgrade containers to include security fixes
 - Upgrading live containers may break applications
 - Common: whole container-based app is rebuilt & relaunched
 - Container frameworks themselves also get hacked
