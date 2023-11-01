---
title: Bash Scripting
draft: false
tags:
  - notes
---

# bash-scripting

## Basic commands
Provides the current working directory  
```
pwd
```   

Printing something on the command line
```
echo Hello World!
```  


Listing all the files in the current directory  
```
ls
```  



The text editor we will use is Vim. Vim is a Unix text editor that's included in Linux.  

To create a new file
```
vim textfile.txt
```  

To write something in vim, press the i button - you will enter the INSERT mode  


Press escape button to escape the insert mode. You will go back to command mode.  

In command mode write ':w' to write the file. this will make sure that the changes we made to the file are actually saved.  
```
:w
```  

The command line will look something like this once the file is written.  


Press q to exit the file (quit vim)
```
:q
```  

To make life simple, use :wq to automatically write the file and then quit vim
```
:wq
```  

To ignore/not make any changes us :q! - this will quit vim without making any changes  
```
:q!
```  

To print  the contents of the file  
```
cat textfile.txt
```  

Writing your first bash script  

Create a file named shelltest.sh  
```
vim shelltest.sh
```  

Press a to enter append mode  

In insert mode you write the character before the cursor.  
In append mode you write the character after the cursor.  
