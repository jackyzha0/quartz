---
title: "05-filesystems"
tags: 
- lecture
- cosc301
- 
---

access control models
- DAC - subject centered
- MAC - object centered
- RBAC
- ACL
	- list of who can do what things to which files
	- 

backups

devices for file systems
- device naming conventions under /dev explanation
- full
	- easy, costly
- incremental
	- updates only files that have changed
	- level 0, 1, 2, 3, 4, 5 ... 9

UNIX file system
- tree ![](https://i.imgur.com/9iDILn6.png)
- descriptions
- implementation

structure of directory

soft vs hard links
- hard link must always point to data - to delete a file with hard links you must also delete all the hard links
- soft links can point to a non-existing file 

advanced file attrs

special files

journaling
 - logs changes to journal before writing
 - impact on performance requires data be written twice
 - **question** why not just write a description of the change

creating FS demo