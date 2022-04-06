---
title: Lecture 11 Continuous Integration 2
sr-due: 2022-04-07
sr-interval: 3
sr-ease: 250
---
#review 

---
\
1. apprecitae that gitlab is a xomplex software
2. Understand where CI jobs scripts get run
3. explain why reposityory servers can host websites
4. Understandhow gitblab dternmimines awhen a CI script failed
5. Describe a way in which CI scrupts scan handle secrets
6. OUtline uses of local git hook scripts

# Lecture 11 Continuous Integration 2

Ci runs pipellines defined in .gitlab-ci.yaml asynchronously

ci usually tets abd buiolds your prokects

runs on a repo server
- usuially persistent, internet accessible

## 1 Gitlab overall architecture
![](https://i.imgur.com/whU7QoF.png) : not in exam
- many different services used

## 2 Gitlab runners
run CI scripts
- gitlab.com is a cloud computing service
- allows elf hosting which is what CS does
	- altitude is a gitlab instance at CS
		- servers to host runners that run CI scripts
		- servers that host websites, e.g., cspages.otago.nz
- Gitlab can invoke runners that you host
	- e.g., to use a particular GPU, or other hardware you have
	- GItlab runner itself is a small program written in Go

### 2.1 Runner architecture

- runs jobs
	- on isolated infrastructure
	- ... to maintain secrity
- that is set up on demand
	- ... handle load variation
- suits cloud computing

RHS shows GitLab.com's CI hosting
	uses google cloud

![](https://i.imgur.com/02eqv7A.png)

![](https://i.imgur.com/RaeYc1I.png) : not in exam

## 3 How CI chagned website hosting

- need to share stifacts produced by CI jobs
	- using the web to share artefacts is ideal
	- so now most repo servers also  host websites
	- these are static websites: all content is fixed
- CI can run static website generators (SSGs)
	- git repo contains source code of website
	- CI pipelines transforms souce code into HTML fiels
	- HTML files then hosted as a website by repo sever

e.g., https://cosc202.cspages.otago.ac.nz


## 4 Debugging CI scripts

- first ensure config files YAML is valid
	- vuilt in gitlab editor checks YAML as you type
- commands runfrom shell that fail return an exit code
	- most unix shells sotre exit code of previous commands in $
	- So if variable $? (return code of prevous command) is non-zero, the previous command failed
- Git lab considers CI job as failed if any command fails
	- your shell scripting can choose to hide this exit code
		- e.g., `if command supposed to fail; then true; else true; fi`
	- Complex scripting? Beste to put script in a file and run it from CI

## 5 Secrets used by CI scripts
![](https://i.imgur.com/XtCap0P.png)
![](https://i.imgur.com/W2xBi4d.png)
