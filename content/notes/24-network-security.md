---
title: "24-network-security"
aliases: 
tags: 
- cosc203
- lecture
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
- pricate key known ony to reciever

- use public key to encrypt
- use private key to decrypt

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
	- $c = m^e\mod n$ 


# Authentication of devices

# digital signature
