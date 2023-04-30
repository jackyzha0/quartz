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
> including the digestURI in the HA2 makes dictionary attack more difficult by increasing the complexity

SSL and TLS 
- SSL - Secure Sockets Layer protocol 
- TLS - Transport Layer Security protocol
![TCP/IP layers with ssl and tls|200](https://i.imgur.com/OuRiq1Q.png)

> [!INFO] TLS more generic. SSL more focused on terminal applications
- TLS better than SSH
- VPN is also similar (secure channel). also similar to SSH
- SSL predates TLS, they are the same thing

SSL and TLS 
SSL/TSL provides three essential services: 
- Encryption: ensure only authorized access 
- Authentication: verify the provided identification 
- Data Integrity: detect message tampering and forging 
	- Message digest

How to get the public key? 
- Through certificate issued by Certificate Authority

Digital Certificate (1) 
- What is digital certificate? 
	- Used to guarantee one is talking to the partner with whom one want to talk. 
	- Generated, signed, and managed by the certificate authorities (CA)

Digital Certificate (2) 
- Certificate Authority (CA) 
	- Generate a certificate for Bob with its private key 
	- Step 2 is usually not necessary as the public key of the CA is stored locally by the browser as trusted CA
![Digital Certificate diagram|300](https://i.imgur.com/a6mmgMP.png)

Digital Certificate (3) 
- Can you trust a certificate? 
	- Check if the web address matches the address on the certificate 
	- Check if the certificate is signed by a trusted certificate authority, and the date is valid 
	- Check the key length, the extensions, the encryption algorithms

> [!INFO] brower automatically uses certificate authority public key to verify websites

SSL & TLS History 
- SSL v2.0 by Netscape (disable this!) 
- SSL v3.0 more scrutiny, fixes attack vectors 
- TLS v1.0 (= SSL v3.1) by IETF 
	- Few changes, but incompatible with v3.0 
- TLS v1.1 clarifies, adds recommendations 
- TLS v1.2 cipher updates, extensions 
- TLS v1.3 released in 2018

SSL/TLS Protocols
- Application Layer
	- handshake protocol, changecipherspec protocol, alert protocol
- record protocol
- transport layer
![SSL/TLS Protocols|300](https://i.imgur.com/DufvW2C.png)

The Handshake Protocol 
- Uses messages to 
	- Negotiate the cipher suite 
	- Authenticate sever and/or client 
	- Exchange information for building cryptographic secrets
![exchange process|300](https://i.imgur.com/DVuemNf.png)
