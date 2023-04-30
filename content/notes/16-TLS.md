---
title: "16-TLS"
tags: 
- lecture
- cosc301
---

How to secure web applications? 
- Digital Certificate 
- Transport Layer Security (TLS) or SSL 
- HTTPS

> [!INFO] HTTPS alone is not enough to secure web traffic. we need to use TLS to secure it. 

HTTP Basic Authentication (1) 
- The simplest method for enforcing access control to web resources using a username and password. 
- Uses static standard HTTP headers with no handshake 
- Server side: uses a WWW-authenticate HTTP header 
	- WWW-Authenticate: Basic realm=”Wally World” 
- Client side: uses an Authorization header 
	- Authorization: base64(username + “:” + password)

> [!INFO] base64 is not secure. It is very easy to reverse. only slightly better than cleartext

HTTP Basic Authentication (2)
- challenge-response paradigm
- The basic mechanism does not provide enough confidentiality protection for the transmitted credentials.
- ![|300](https://i.imgur.com/0uI2myY.png)

Message Digest 
- Verifies that a message has not be altered 
- Uses a hash function 
	- MD5 
	- SHA-1
![sending a digitally signed message|300](https://i.imgur.com/lJCTjPP.png)

> [!INFO] message converted to hashed message digest, encrypted/signed using private key

HTTP Digest Authentication (1) 
- Avoids the most serious flaws of basic authentication, but not intents to be a complete solution to web security. 
	- Sever challenges using a nonce value 
	- Client responses with a digest (by default, the MD5 checksum) of the username, password, nonce value, HTTP method, and the requested URI
	- ![digest|200](https://i.imgur.com/Mg6smkw.png)
- Vulnerable to a man-in-the-middle (MITM) attack No server authentication

> [!INFO] Encryption algorithm for digest is not reversible. 

SSL and TLS 
- SSL – Secure Sockets Layer protocol 
- TLS – Transport Layer Security protocol
![TCP/IP layers with ssl and tls|200](https://i.imgur.com/OuRiq1Q.png)


