---
compartir: true
title: CLI Commands and Cheat Sheet
---
# CLI Commands and Cheat Sheet

- Linux Command Line Interface Cheat Sheet. [Main source](https://stationx.net/linux-command-line-cheat-sheet/).
- [Source](https://stationx.net/curl-cheat-sheet/) for Curl command.

## Basic

```sh
* # wildcard
? # represents

cd # go to home directory
cd .. # go up one level
cd /etc # go to /etc

ls # list files and subfolders
ls -l # with details
ls -a # display hidden files/folders
ls X # list the files

cmp A B # compare two files A and B, no output if identical
diff A B # compare two files A and B, outputs difference
pwd # display current path working directory
mkdir Y # create new Y folder
mv A B # move file in location A to location B

cp A B # move file in location A to location B
cp -r Y Z # recursively copy directory Y and its contents to directory Z

rm X # delete X permanently
rm -r Y # recursively remove directory Y
rm -f X # forcibly remove file X
rm -rf Y # forcibly remove directory Y
rmdir Y # remove directory, only if empty

open X # open X in default app
open -e-X # open X in default text editor
touch X # create empty file X

cat X # view contents of X
cat -b X # also display line numbers
wc X # display word count of X

head X # display the first 10 lines of X
head -n 4 X # show the first 4 lines of X
ls *.c | head -n 5 # display first 5 items of a list of *.c files

tail X # display last 10 lines of X
tail -n +1 X # display entire contents of X, with headers and file names
tail -f X # display the last 10 lines of X
less # read a file with foward and backwards navigation
cat file.txt | less # pipe file.txt and read it with fwd and bwd navigation

ln -s A S # create symbolic path A to link name S
```

## Input/Output Redirection

```sh
echo TEXT # display line of TEXT or contents of a variable
echo -e TEXT # also interprets escape characters in TEXT (e.g. \n new line, \b backlash, \t tab)
cmd1 | cmd2 # | is the pipe character, feeds output of cmd1 to cmd2 (e.g. ps aux | grep python3)
cmd > file # redirect output of cmd to file
cmd >& file # redirect output of cmd to file, overwrites pre-existing content
cmd > /dev/ null # suppress the output of cmd
cmd >> file # append output of cmd into file
cmd < file # read input cmd from file
cmd <<< string # input text string to cmd
cmd 2> foo # redirect error messages of cmd to foo
cmd 2>> foo # append error messages of cmd to foo
cmd &> file # redirect output and errors messages of cmd to file
```

## Search and Filter

```sh
grep patt /path/to/src # search for a text pattern patt in X (e.g. ps aux | grep python3)
grep -r patt /path/to/src # search recursively for text pattern patt
grep -v patt X # return lines in X not matching specified patt
grep -l patt X # write to standard output the names of files containing patt
grep -i patt X # perform case-sensitive matching on X, ignore case of patt

find # find files
find /path/to/src -name "*.sh" # ind all files in /path/to/src matching patter "*.sh" in filename
find /home -size +100M # find all files in the /home directory larger than 100MB

locate name # find files and directories by name
sort X # arrange lines of text in X alphabetically or numerically
```

## Archives

```sh
tar # manipulate archives with .tar extension
tar -v # get verbose output (e.g. tar -tvf)
tar -cf archive.tar Y # create tar file name archive.tar containing Y
tar -xf archive.tar # extract archive.tar
tar -tf archive.tar # list contents of archive.tar
tar -czf archive.tar.gz Y # create gzip-compressed tar named archive.tag.gz containing Y
tar -xzf archive.tar.gz # extract gzip-compressed tar named archive.tar.gz
tar -cjf archive.tar.bz2 Y # extract bzip2-compressed tar named archive.tar.bz2 containing Y
tar -xjf archive.tar.bz2 # extract bzip2-compressed tar naned archive.tar.bz2

gzip # manipulate archives with .gz extension
gzip Y # create gzip archive named T.gz containing Y
gzip -l Y.gz # list contents of gzip archive Y.gz

bzip2 # manipulate archives with .bz2 extension
bzip2 Y # create bzip2 archive named Y.bz2 containing Y

zip -r Z.zip Y # zip Y to the archive Z.zip
unzip Z.zip # unzip Z.zip to current directory
unzip -l Z.zip # list contents of Z.zip
```

## File Transfer

```sh
ssh user@access # connect to access as user
ssh access # connect to access as local username
ssh -p port user@access # connect access as user using port

scp [user1@]host1:[path1] [user2@]host2:[path2] # login to hostN as userN for N=1,2
# (e.g. scp alice@pi:/home/source bob@arduino:/destination)
scp -P port [user1@]host1:[path1] [user2@]host2:[path2] # connect hostN as userN using port for N=1,2
scp -r [user1@]host1:[path1] [user2@]host2:[path2] # recursively cp all files/folders path1 to path2

sftp [user@]access # loging to access as user via SSH, no user means use local user
sftp access # connect access as your local username
sftp -P port user@access # connect to access as user using port

rsync -a [path1] [path2] # synchronize [path1] to [path2], preserves symbolic links, attr, etc.
rsync -avz host1:[path1] [path2] # synchronize [path1] on remote host1, to local [path2]
```

## File Permissions

```sh
chmod permission file # change file/folder permissions (can be [u/g/o/a][+/-/=][r/w/x])
chown user2 file # change owner of file to user2
chgrp group2 file # change group of file to group2

chmod +x testfile # allow all users to execute the file
chmod u-w testfile # forbid current user from writing/changing file
chmod u+wx,g-x,o=rx testfile # simultaneously add write and execute permissions to user
# remove execute permission from gourp, and set permissions of other uses to only read and write
```

| Octal | Permission(s)             | Equivalent |
| ----- | ------------------------- | ---------- |
| 0     | No permissions            | -rwx       |
| 1     | Execute only              | =x         |
| 2     | Write only                | =w         |
| 3     | Write and Execute (2+1=3) | =wx        |
| 4     | Read only                 | =r         |
| 5     | Read and Execute (4+1=5)  | =rx        |
| 6     | Read and Write (4+2=6)    | =rw        |
| 7     | All permissions (4+2+1=7) | =rwx       |

```sh
chmod 777 testfile # all all users to execute file
chmod 177 testfile # execute-only to user (u); group (g) and others (o), read and executy only.
chmod 365 testfile # user (u) write+execute-only; group (g) read+write-only; others (o) r+exe only
```

## Curl Commands

```sh
# Wttr.in
curl https://wttr.in/MSP?format=%l+%C+%h+%w+%t+feels+like+%f
```

```bash
# IP Cow
curl ip.wtf/moo
```

```bash
# Find and Listen
# Find everyone on the network, then start spoofing each MAC until you find a valid one.
nmap -sn 192.168.0.1-255
```

## System Information

```sh
uname # show system info
uname -a # detailed system info
uname -r # kernel release info (version too)
uptime # how long the system is running
sudo # superuser
cal # show calendar with today highlighted
date # show current date and time of machine
halt # stop system immediately
shutdown # shut down the system
reboot # restart the system
last reboot # show reboot history
man <command> # show manual for given <command>
hostname # show system host name
hostname -I # display IP address of hort
cat /etc/*-release # current version of distro installer
```

## Disk Usage

```sh
df # display free disk space
du # show file/folder sizes on disk
du -ah # disk usage in human readable format (e.g. KB, MB, etc)
du -sh # total disk usage of current directory
du -h # free and used space on mounted filesystems
du -i # free and used inodes on mounted filesystems
fdisk -l # list disk partitions, sizes, and types
free -h # display free and used memory in human readable units
free -m # display free and used memory in MB
free -g # display free and used memory in GB
```

## Process Management and Performance Monitoring

```sh
& # add this character to run command/process in the background

ps # show process status (e.g. ps aux | grep python3)(all user, show user column, show unattached)
ps -e # print all running processes
ps -ef # print detailed overview
ps -U root -u root # display all processes running under root
ps -eo pid,user,command # display only columns pid, user, command in ps output

top # display sorted info about processes
htop # display sort info abotu processes with visual highlights
atop # display the detialed info about processes and hardware

kill PID # kill process with process ID PID
killall proc1 # kills all processes containing proc1 in their names

lsof # list all open files
lsof -u root # list all files opened by root (e.g. lsof -u root | less)

mpstat 2 # processor statistics updated every 2 seconds
vmstat 1 # virtual memory statistics updated 1 second
iostat 3 # system input/output statistics updated every 3 seconds

tail -n 100 /var/log/messages # display last 100 lines in system logs

tcpdump -i eth0 # capture and display all packets on interface eth0
tcpdump -i eth0 port 80 # monitor all traffic on interface eth0 port 80

watch df -h # execute df -h and show periodic updates (Ctrl + C to exit)
```

## User Management

```sh
who # who is logged in
w # display what users are online and what doing
users # list current users
whoami # display what user you are logged in as
id # display the use ID and group ID for current user
last # display the last users who have logged onto the system
groupadd gp1 # create group name gp1
useradd -c "Alice Bob" -m ab1 # create account ab1 with comment "Alice Bob" and create new /home
userdel ab1 # delete account name ab1
usermod -aG gp1 ab1 # add the account ab1 to the group gp1
```

## Networking

```sh
ifconfig # display network interfaces with IP addresses
ifconfig -a # display all network interfaces, eve if down, with IP addresses
ifconfig eth0 # display IP address abd details of the eth0 interface
ip a # another way to display all network interfaces with IP addresses
ethtools eth0 # query or control network driver and hardware settings on interface eth0

netstat # print open sockets, routing tables, inteace statistics, masq connections
netstat -a # show both listening and non-listening sockets (e.g. netstat -a | less)
netstat -l # show only listening sockets
netstat -nulp # show listening TCP and UDP ports and corresponding programs

ping host # ping host, may be symbolic name, domain name or IP address
whois domain # display whois info for domain
dig domain # display DNS info for domain
dig -x addr # rever lookup on IP addrress addr
host domain # display DNS IP address for domain
wget LINK # download from location LINK
curl LINK # display HTML source of LINK
```
