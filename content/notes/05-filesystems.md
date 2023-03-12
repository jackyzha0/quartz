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
	- inode ⇒ data structure documenting data about a file
structure of directory
- current working DIR is always in memory

soft vs hard links
- hard link must always point to data - to delete a file with hard links you must also delete all the hard links
	- link to _actual inode_
- soft links can point to a non-existing file 
	- link to file _name_
	- can link incompatible file systems e.g., windows, xerox. i.e. fs's that dont use inodes

advanced file attrs

special files

journaling
 - logs changes to journal before writing
 - impact on performance requires data be written twice
 - **question** why not just write a description of the change
 - all or nothing operations: ensure consistency
 - 

creating FS demo
- `# dd if=/dev/zero of=loopbackfile.img bs=100M count=10 `
- `# du -sh loopbackfile.img `
- `# losetup -fP loopbackfile.img `
- `# losetup –a `
- `# mkfs.ext4 /root/loopbackfile.img `
- `# mkdir /loopfs `
- `# df -hP /loopfs/ `
- `# mount -o loop /dev/loop0 /loop`
- `# mount | grep loop`

