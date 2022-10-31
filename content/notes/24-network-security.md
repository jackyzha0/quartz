---
title: "24-network-security"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2022-11-20
sr-interval: 19
sr-ease: 250
---

# what is it?
- confidentiality
	- only sender and reciver should understand message contents
	- encryption
- authentication
	- sender and reciever want to confirm identity of each other
- message integrity
	- sender and reciever want to ensure message not altered (in transit, or afterwards) without detection
- access and availablility
	- services must be accessible and availble to users

sender and recieves:
- any king of onnline communication

what can trudy to
- eavesdrop
- insert messages into connection
- impersonation: fake (spoof) source address (or any field)
- hijacjking "take over" ongoing connection by removing sender or ereciever, inserting himself in place
- denial of service: prevent others from using a service (e.g., by overloading it)

terminology
- m: plaintext message
- $K_{A}(m)$: ciphertext, encrypted with key $K_{A}$
- m = $K_{B}(K_{A}(m))$
- ![](https://i.imgur.com/6veueus.png)
- key: secret data used to encrypt and decrypt messages

# Symmetric key crypto
bob and alice share the same key K
- e.g., key is knowing a substitution pattern in mono alphabetic substitution cipher
- substiution cipher
	- map each letter to a different letter
	- key is a mapping from a set of 26 letters to another set of 26 letters
	- not secure: easy to decrypt using patterns etc

DES: data encryption standard
- data is split into blocks of 64 bits
- each block encrypted using 56-bit key
- blocks are chained together
	- encryption of current block is based on the previous block
- 56-bit symmetric key, 64 kit plaintext input
- not very secure: short key- only 56 bits - less than a day to brute force
	- no known good analytic attack
	- 3DES: encrypt 3 times with 3 different keys: more secure

AES: advanced encryption standard
- larger key 128, 192 or 256
- 128-bit blocks
- brute force taking 1 sec on DES takes 149 trillion years for AES

# Public key crypto
symmetric requires sharing of key

process
- sender and reciever do not share secret key
- public key known to all
- private key known ony to reciever

- sender uses their public key to encrypt
- reciever uses their private key to decrypt

public key reqs
- ![](https://i.imgur.com/DrH8hmU.png)

RSA
- popular public key encruption algorithm
- how to generate keys
	- choose two large prime numbers (1024 bits each)
	- compute $n=pq, z=(p-1)(q-1)$
	- choose e (with e<n) that has no common factors with z (e, z, are "relatively prime")
	- choose d such that ed-1 is exactly divisible by z. (i.e., ed mod z = 1)
	- public key is (n, e) private key in (n, d)
- encrypt message m (<n)
	- $c = m^e\mod n$
- decrypt recieved c
	- $m = c^d\mod n$ 
- magic
	- $m = (m^e \mod n)^d \mod n$ 
	- where $c = m^e\mod n$

![example ](https://i.imgur.com/eGFJ4OX.png)

# Authentication of devices
 - AP2.0 athenticate based on IP: bad because can spoof IP
 - AP3.0 put secret password into each packet: bad because trudy can get a message and see the password
	- replay attack
	- can find password without decrypting
- AP4.0 avoid replay attack: 
	- nonce: number R used only once-in-a-lifetime
	- prove alice "live", Bob sends alice nonce, R
		- alice must return R, encrypted with shared key
	- ![](https://i.imgur.com/wLHR8y2.png)
	- problems
		- must choose a key in a secure way before they communicate
- AP5.0: use nonce but with public key techniques
	- problem: man in the middle attack: trudy poses as alice to bob, and as bob to alice
	- ![](https://i.imgur.com/SFdYjdZ.png)
	- need a better way to get public key

# digital signature
- Digital signatures
	- analogous to hand-signatures
	- sender digitally signs a document
	- verifiable, nonforgeable
	- simple digital signature
		- bob signs with his private key: creating signed message
		- alice uses publc key to verify 
	- issue
		- lots of computation on long messages
- hash function
	- apply hash function to get fixed size message digest, H(m)
	- then sign on the digest not the full message

![diagram](https://i.imgur.com/sSRoWGU.png)

# certification authorities
- binds public key to particular entity, E
- entity registers its public key with CE provides proof of identity to CA
	- CA creates cert binding id E to E's public key
	- cert containing E's public key digitally signed by CA
- when alice wants bobs public key
	- get bobs cert
	- apply CAs public key to bobs certificate, get bobs public key 

![](https://i.imgur.com/zccc9XF.png)


