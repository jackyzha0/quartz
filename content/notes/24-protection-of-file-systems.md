---
title: "24-protection-of-file-systems"
aliases: 
tags: 
- cosc204
- lectures
---

# protection model
file system shared by many users
- users should be able to keep them private

need to define
- mechanisms
- policies

types of file access users can have
- read
	- includes list
- write
	- includes delete	
- execute
	- if a directory is not executable you cannot get into it (run it) 

# Access control bits
three classes for each file
- owner: user who created the file
- group : set of users who are sharing the file: a group is defined by the systems
- others: all other in the system

when a file is create it has an owner id and a group id to identify the users of the file 

3 permission bits for each class
- r: readable
- w: writeable
- x: executble

advanced file attributes
- setuid bit: if set for executable file, regardless of who runs the program, it should be run with the priviledge of the owner of the file
- setgid bit: same as setuid but run with priviledge of group
- sticky bit: a directory with this bit set restricts the deletionof files within it
# access control models