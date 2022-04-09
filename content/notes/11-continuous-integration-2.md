---
title: "11-continuous-integration-2"
sr-due: 2022-04-07
sr-interval: 3
sr-ease: 250
tags: 
- cosc202 
- lecture
---

1. Apprecitae that GitLab is a complex software
2. Understand where CI jobs scripts get run
3. explain why repository servers can host websites
4. Understand how gitblab dternmimines awhen a CI script failed
5. Describe a way in which CI scripts scan handle secrets
6. Outline uses of local git hook scripts

CI runs pipelines defined in .gitlab-ci.yaml asynchronously

CI usually tests and builds your projects

Runs on a repo server. Usually persistent, internet accessible

# 1 GitLab overall architecture
![](https://i.imgur.com/whU7QoF.png) : not in exam
- many services used

# 2 GitLab runners
run CI scripts

- gitlab.com is a cloud computing service
- allows elf hosting which is what CS does
	- altitude is a GitLab instance at CS
		- servers to host runners that run CI scripts
		- servers that host websites, e.g., cspages.otago.nz
- GitLab can invoke runners that you host
	- e.g., to use a particular GPU, or other hardware you have
	- GitLab runner itself is a small program written in Go

## 2.1 Runner architecture

- runs jobs
	- on isolated infrastructure
	- ... to maintain security
- that is set up on demand
	- ... handle load variation
- suits cloud computing

RHS shows GitLab.com's CI hosting: uses google cloud

![](https://i.imgur.com/02eqv7A.png)

![](https://i.imgur.com/RaeYc1I.png) : not in exam

# 3 How CI changed website hosting

- need to share artifacts produced by CI jobs
	- using the web to share artifacts is ideal
	- so now most repo servers also  host websites
	- these are static websites: all content is fixed
- CI can run static website generators (SSGs)
	- git repo contains source code of website
	- CI pipelines transforms source code into HTML files
	- HTML files then hosted as a website by repo sever

e.g., https://cosc202.cspages.otago.ac.nz

# 4 Debugging CI scripts

- First ensure config files YAML is valid
	- built in GitLab editor checks YAML as you type
- commands run from shell that fail return an exit code
	- most Unix shells store exit code of previous commands in $
	- So if variable $? (return code of previous command) is non-zero, the previous command failed
- Git lab considers CI job as failed if any command fails
	- your shell scripting can choose to hide this exit code
		- e.g., `if command supposed to fail; then true; else true; fi`
	- Complex scripting? Best to put script in a file and run it from CI

# 5 Secrets used by CI scripts

![](https://i.imgur.com/XtCap0P.png)
![](https://i.imgur.com/W2xBi4d.png)
