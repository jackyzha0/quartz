---
title: "cryptography"
aliases: 
tags: 
- comp210
---

Crytography arises from the need for confidentiality. Some people say 

>"if you have nothing to fear you have  nothing to hide". 

Edward snowden said

>"arguing that you don't care about privacy because you have nothing to hide is no different than saying you dont care about free speech because you have nothing to say."

# History
One of the earliest known ciphers was the simple subsitution cipher used by julius caesar named the caesar cipher. 

Although it a very bad cipher, it still uses the same general process of encryption and decryption. 

# General Process
- encrypt
	- plaintext + key => ciphertext
	- key is a secret
- decrypt
	- ciphertext + key => plaintext

mathmatically
- c = e(p, k)
- p = d(c, k)

# Randomness
[randomness](notes/randomness.md) is the basis for the theory of cryptography. The aim of encryption is to alter a message (or binary sequence) so that it is maximally random i.e., has the highest entropy, and to remove any sort of pattern. 

# Terminology/Conventions
- alice, bob, charlie, etc
- mallory -> malicious
- etc
- public vs private domains
	- assume communication is public
	- assume information is prepared and consumed in private domain
- copy from lecture 5 slides
- 