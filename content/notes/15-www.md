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

> [!INFO] can have cookies for each page. 
> URLs can have variables - params, and queries

HTTP (1) 
- HyperText Transfer Protocol 
	- Communication between HTTP clients and server 
	- Server uses port 80; Client uses a temporary port number 
	- Use the service of TCP (connected-orient & reliable)
![TCP, three way handshake etc|300](https://i.imgur.com/icLECn1.png)

HTTP (2) Request methods 
	- GET: retrieve a file (95% of requests) 
	- HEAD: just get meta-data (e.g., mod time) 
	- POST: submitting a form to a server 
	- PUT: store enclosed document as URI 
	- PATCH: make partial modifications to a document 
	- DELETE: removed named resource 
	- TRACE: http “echo” for debugging (added in 1.1) 
	- CONNECT: used by proxies for tunneling (1.1) 
	- OPTIONS: request for server/proxy options (1.1)
![example web page|300](https://i.imgur.com/aYpLgTe.png)

Nonpersistent Connection 
	- 1 HTTP request/TCP connection 
	- A file containing links to N different objects in different files (in the same sever) needs N+1 TCP connections. 
	- Used in HTTP prior to version 1.1
	
> [!INFO] **non persistent connections impose high overhead on the server**
![non persistent connection diagram|200](https://i.imgur.com/FzX80uC.png)

Persistent Connection 
- Multiple HTTP requests/TCP connection 
- Default in HTTP version 1.1 and later
![persistent connection diagram|200](https://i.imgur.com/u3RqHQ0.png)
> [!INFO] much more efficient

Cookies (1) 
- HTTP is a stateless protocol 
	- Client requests a page, and server sends it 
	- Client later requests a 2nd page; it is sent 
- HTTP doesn’t give a way for the server to know it’ s from the same user 
	- Being stateless is simpler for HTTP 
	- But limiting to applications
> [!INFO] originally from fortune cookie, with a message inside it. 

> [!INFO] need to have a lot of requests at the same/diferent time. we need to know which customer is which. this makes the site stateful. 

Cookies (2) 
- What is HTTP Cookie? 
	- A small piece of text made by the server and eaten by the server. 
- Upon receiving a Cookie, the browser: 
	- (1) Stores the cookie in memory
	- (2) Sends the cookie back to the server every time it requests a new web page. 
- How does a Cookie look like? 
	- A cookie is a name-value pair: 
		- cookie name = cookie value 
	- Example: languagePreference = EN.

Cookies (3) The Web NEEDs state information for clients 
- Authentication 
	- User-id, password stored on client 
	- Sent on next visit. No login required! 
- Personalization 
	- Remember user preference for fonts, colors, skin, site-options, etc. 
- Shopping carts 
	- Tracking clients 
- Tracking 
	- How is our site used? 
	- Multi-site tracking by companies looking for usage profiles, etc.

![A scenario of an online shopping|300](https://i.imgur.com/CMyemmh.png)

Cookies (4) 
- Security 
	- Users can change cookies before continuing to browse. 
	- Users could swap / steal cookies. 
	- Session Hijacking 
- Privacy 
	- Servers can remember your previous actions 
	- If you give out personal information, servers can link that information to your previous actions 
	- Servers can share cookie information through use of a cooperating third party 
	- Poorly designed sites store sensitive information like credit card numbers directly in cookie

> [!INFO] some websites that aren't secure can expose your credit card through cookies. you need to be careful and check if a website is secure and credible

Cross-site scripting attack (XSS) 
- Attacker injects a malicious script into the webpage viewed by a victim user 
- Two main types of XSS 
	- Non-persistent (or reflected) XSS 
		- Attacker gets the victim user to click on specially-crafted URL with scripts in it, e.g., delivered via email 
	- Persistent (or stored) XSS 
		- Attacker injects the malicious script into the victim’s server to be loaded together with the normal pages, e.g., through forum, blog, and feedback form.

![non persistent reflected XSS](https://i.imgur.com/FNUcVXn.png)
![persistent stored XSS](https://i.imgur.com/fWg2XOT.png)

Preventing XSS
- Input validation: check that inputs are of expected 
	- HTML sanitization to remove tags such as
	- `<script>, <object> and <link>`
- Output escaping: escape dynamic data before inserting it into HTML
	- `<script>alert(document.cookie)</script>`
- Cookie security 
- Disable scripts

![character escape sequences|300](https://i.imgur.com/Jlr373B.png)

> [!INFO] root cause of most security issues is not checking user input properly

SQL Injection Attack 
- The placement of malicious code in SQL statements via web page input
	- `txtUserId = getRequestString("UserId"); txtSQL = "SELECT * FROM Users WHERE UserId = " + txtUserId;`
	- `Attacker input 1050 OR 1=1`
	- `SELECT * FROM Users WHERE UserID = 1050 or 1=1;`
- Use SQL parameters for protection
- `$stmt = $dbh->prepare(“SELECT * FROM Users WHERE UserID = :uid"); `
- `$stmt->setString(':uid', $userID);`
- `$stmt->execute();`

HTTP Weakness 
- HTTP Authentication Security Risks 
	- Username and password are encoded, not encrypted. 
- Base 64 encoding and decoding tools are freely available. 
	- Authentication information does not change between different requests. 
- Sniffer can replay! 
	- Requesting unnecessary authentication leads to password sharing. 
	- Basic authentication only authenticates the browser (user), not the server. 
- Impersonating websites could harvest passwords

