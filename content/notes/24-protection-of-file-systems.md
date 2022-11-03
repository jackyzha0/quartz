---
title: "24-protection-of-file-systems"
aliases: 
tags: 
- cosc204
- lecture
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

## soft vs hard link
![diagram|400](https://i.imgur.com/DEvbJRN.png)

# access control models
Discretionary access control (DAC)
- a means of restricting access to objects based on the identity of subjects and/or groups to which they belong. The controls are discretionary in the sense that a subject with a certain access permission is capable of passing that permission (perhaps indirectly) on to any other subject (unless restrained by mandatory access control).
- subject centered

Mandatory access control
- a means of restricting access to objects based on the sensitivity (as represented by a label) of the information contained in the objects and the formal authorization (i.e., clearance) of subjects to access information of such sensitivity
- object centred  
- more overhead

Access control list
- list of permission attahed to an object (file)
- speifies who or what is allowed to access the objdct and what operation a re allowed to be performed on the object
- consists of entries like [user, operations] where the operation can be r, w, x, d etc
- more secure and convenient that discretionary access control
- can implement DAC and MAC

Role based
- similar to ACL except RBAC aggregates a grou of users with the same priviledges as roles
- can implement DAC and MAC
- policy neutral and defined around roles and priviledges