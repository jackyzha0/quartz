---
title: "10-scheduled-tasks-and-logs"
tags: 
- lecture
- cosc301
---

Daemon 
- A process that runs in the background and is independent of control from all terminals 
- Reasons for daemons’ independence of terminals 
	- Prevent daemons’ error message from appearing on a user’s terminal 
	- Signals generated from terminal keys must not affect any daemons that were started from that terminal earlier 
- Typical daemons 
	- crond, syslogd

Daemonization
```
if( (pid = fork()) != 0) exit(0); //parent terminates 
setsid(); // become session leader 
signal(SIGHUP, SIG_IGN); if( (pid = fork()) != 0) exit(0); //new child continues 
//now it becomes daemon
```

The purpose is to make the process independent of the control from any terminals.

> [!INFO] when you are independent from 

Scheduled tasks 
- Automating tasks 
	- crond and crontab 
	- crond is a very important daemon for automatically executing tasks 
	- Tasks can be configured to repeat hourly, daily, weekly,…, or even per minute. 
- Possible uses 
	- Clean file systems 
	- Log rotate 
	- Check log files 
	- Monitor system status and resources