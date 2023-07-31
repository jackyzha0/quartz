---
title: "06-network-system-administration"
tags: 
- lecture
- cosc301
sr-due: 2023-08-03
sr-interval: 3
sr-ease: 250
---

> [!DANGER] need to study this and watch lecture



security awareness
- physical and network attacks
- [[security]]

Computer/Internet hazards 
- SPAM/UCE (Unsolicited Commercial Email) 
- Phishing 
- Disk crashes/data loss 
- Loss of services due to outage 
- TCP/IP spoofing and sniffing (privacy) 
- Pornography 
- Ignorant users 
- Grumpy (former) employees 
- Administrators of the untrained kind

broken symlink
- broken symlilnk/softlink can be a risk
- If it is pointing to a location that is accessible by an attacker, it ends up retrieving a file belong to the attacker. 
- If it is a web server, you end up retrieve and present the attacker’s information. 
- Solution: NO_FOLLOW flag to stop following the symlink.

Roles in network community
- Important roles include users, hosts, network components e.g. routers and operating systems. 
	- Users - should be trained to be aware of the community. Human beings are usually the weakest link. 
	- Host machines - should be allocated different tasks on different server machines 
	- Routers/gateways 
	- affect network security and performance 
	- OS - have different pros and cons 
	- UNIX/Linux, Windows, MAC OS, Netware


Host Management 
- Shutting down a host 
	- Turn off the power? 
	- Should use command shutdown 
	- shutdown -h time halt the system. time can be now. 
	- shutdown -r time reboot the system 
- Log files and audits: health barometer of a host 
	- syslogd: a daemon for logging messages. Its configuration file is /etc/syslog.conf 
	- dmesg: check kernel messages 
	- lastlog: check the last login time of every user 
	- syslog under /var/log: the log file of the system 
	- They should be rotated regularly

User Management 
- User account 
	- Includes all the files, resources, and info belonging to one user. For commercial systems, it may include billing info. 
- Create a new account 
	- adduser 
	- Account info: username, password, user id, group id, full name of user, home directory, login shell 
	- In the /etc/passwd file, 
		- Amber:x:1000:100:Amber Dawn:/home/amber:/bin/bash 
	- Check after adding
- Involved files 
	- /etc/passwd, /etc/group, /etc/shadow 
	- In /etc/shadow, 
	- Chloe:$2a$05$wa7xVOqOH4lVOrh.qa9ivSX0G0QUCFqbk11YV6:14743:0:99999:7::: 
	- Username:encrypted password:last password change:minimum:expiration:warning:disabled:diabled date:reserved 
- User login environment 
	- .bash_profile, .bashrc, /etc/profile 
	- Place global files such as profile under /etc 
- Other scripts can be referred in it 
	- Use env/set to check/set your environment 
- Paths and prompts 
	- Keep a copy of your shell scripts (initial setups) in order to survive them from upgrade of OS/software 
- For more detailed info, man bash

- Password 
	- Very important for security 
	- Should not be names of persons, books, places, your computer, nor your phone number, birthday, car registration plate, login name, words in dictionaries, keyboard sequence 
	- Should be composed of letters (lower and upper cases), digits, and special characters like $,@ 
	- Refer to http://en.wikipedia.org/wiki/Password_strength 
	- passwd imposes similar rules to make passwords secure. 
	- Change frequently 
- User id and group id 
	- Users should be divided into groups for security reasons, e.g. students, staff, admin 
	- Special users/groups: nobody, mail, ftp 
- addgroup 
	- In /etc/group, 
	- video:x:33:hzy,paul,kai 
	- Group name:password:group id;list of members

- Remove a user: deluser 
	- The relevant lines from /etc/passwd, /etc/group, and /etc/shadow will be removed. 
	- It is a good idea to first disable the account before you start removing stuff 
- Disable a user temporarily 
	- A better way when you are not sure if a user will come back 
	- Way 1: Put an * in the password field of /etc/shadow 
	- Way 2: use passwd -{l|u} username 
	- Way 3: Change the login shell to a script file


User Account
- How to manage user accounts on different computers?
	- Share home directory using NFS
	- Share passwords using NIS (Network Information System) or LDAP (lightweight directory access protocol)
	- Allocate an Email server
	- Directory services like LDAP
- How to remember different passwords for different accounts on different computers?
- 

- Control user resources 
	- Disk space 
		- Separate disk partition for problem users 
	- Use df command to monitor space 
	- Quotas and limits 
		- Better not to put them on users until necessary 
		- Check limits.conf under /etc/security 
	- Killing old processes: kill 
		- Don’t do it unless you are absolutely sure 
- Account policy 
	- Who shouldn’t have a user code? 
	- How to deal with weak passwords?

User Support 
- User support services 
	- cshelp 
- User training and well-being 
- How to treat the users? 
	- Your adversaries? 
	- Your friends? 
	- Your co-operators?

friendly attitude