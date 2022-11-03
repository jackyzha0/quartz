---
title: "management-of-file-systems"
aliases: 
tags: 

---

A file is a collection of related data. They can be thought of as artifacts of the dialogue between the user and the OS

# Attributes
The attributes of a file are stored in an index node (inode) which held in a directory. These attributes include: name, owner, type, location, size, permissions, more.

# System Calls
There are two main systems calls for file interaction: write and read.

# File Access patterns
There are two main types of access: **Sequential** and **Direct** access. 

In sequential access, a file pointer specifies a record within the file. The pointer can then be moved forward (read or write) or backwards (rewind).

In direct access, a file is viewed as a numbered sequence of records. Operations can be done on any record in any order.

# Directory structure


# Disk allocation methods