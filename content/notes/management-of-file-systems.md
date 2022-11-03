---
title: "management-of-file-systems"
aliases: 
tags: 

---

A file is a collection of related data. They can be thought of as artifacts of the dialogue between the user and the OS

The attributes of a file are stored in an index node (inode) which held in a directory. These attributes include: name, owner, type, location, size, permissions, more.

There are two main systems calls for file interaction: write and read