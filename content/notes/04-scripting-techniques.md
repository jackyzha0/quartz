---
title: "04-scripting-techniques"
tags: 
- lectures
- cosc301
---


**Least privilege**
- sys admins should follow this principle
- users/proceses should not be given more privileges than they need
- **processes always belong to users** 
- e.g.,
	- setuid: only when neccesary
	- web servers starts as root to open port 80, then switches to a less privileged user
	- temporary files shouldn't be in /tmp ⇒ everyone can access tmp, not secure

scripting
- history
- origin
- examples
- shbang
- good tips

bash

I/O and pipe

Env variables and files

interpolation

conditions
- if else
- case

loops

arithmetic

sed and awk

shell script vs c/c++

further reading
