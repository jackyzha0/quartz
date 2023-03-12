---
title: "05-filesystems"
tags: 
- lecture
- cosc301
- 
---

access control models

backups

devices for filesystems
- device naming conventions under dev explanation
- 

UNIX file system
- tree ![](https://i.imgur.com/9iDILn6.png)
- descriptions
- implementation

struture of directory

soft vs hard links
- hard link must always poin to data - to delete a file with hard links you must also delete all the hard links
- soft links can point to a non-existing file 

advanced file attrs

special files

journaling
 - logs changes to journal before writing
 - impact on performance requires data be written twice
 - **question** why not just write a description of the change

creating FS demo