---
title: "15-www"
tags: 
- cosc301
- lecture
---

How does World Wide Web (WWW) work? 
- HTTP protocol 
- web server 
- web security/privacy

Overview
![|300](https://i.imgur.com/gE8flTz.png)
- A repository of interlinked documents accessed via Internet. 
- A distributed client-server service 
	- Web Client 
	- Web Sever 
	- Website 
- HyperText Transfer Protocol (HTTP)

Web Browser 
> [!INFO] main function
>  Interpret html language. also other language like css, javascript, php etc
> also caching: remember content so it doesn't need to be reloaded each time it is accessed
> stateless. use cookies to "join" sessions
- Basic functions 
	- Interact with the user 
	- Communicate with server 
	- Render HTML documents 
	- Interpret web resources, e.g. images, videos, etc. 
	- Run JavaScript programs 
	- Apply CSS rules 
- Other functions 
	- Caching: keep local copies of documents 
	- Authentication: validate the credentials of the users 
	- State maintenance: keep “cookies”
![200](https://i.imgur.com/D2o35NR.png)


Web server
- primary function
	- To store, process and deliver web pages to web clients.
![](https://i.imgur.com/fDluDnf.png)

> [!INFO] mostly get requests
> define a root of the content `/` this is different from the root of the server machine
> in theory we have a route dungeon. you cant access other files in the machine where the server resides. 
> normally under /var/www. this hosts pages acceible by the web server
> symbolic link can break this rule, and this route dungeon

> [!INFO] you should already know the host name when you request a site. because you accessed the site using IP. 
> virtual hosting - on the same machine there can be multiple hosts with different web domain names, multiple website on the same server, by the same server

Uniform Resource Locator (URL) 
- Need a unique identifier for each webpage. Four identifiers are required to define a webpage 
	- Protocol: HTTP, HTTPS, FTP, … 
	- Host: IP address or IP name 
	- Port: explicitly given if not use a well-known port 
	- Path: the location and name of the file
- URL alias 
	- Create a user friendly alias for the website path

URLs can be quite comprehensive. `http://user:password@host:port/path#anchor?p1=x&p2=y`