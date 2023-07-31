---
title: "05-cryptography"
aliases: 
tags: 
- lecture
- comp210
sr-due: 2024-12-06
sr-interval: 494
sr-ease: 250
---

# news
- zodiac killer code cracked
- twitter leak

# Brief history
- study of secret messages
- confidentiality of [cia-triad](notes/cia-triad.md)
- also small role in integrity (authentication of message, and sender)
- history of cyprtopgraphy is interwined with information technology

Language use for communication seems to be part of human nature: perhaps the use of covert lanuage is too

## need for confidentiality
"nothing to hide: nothing to fear" look at edward snowdens corrolary

We all have legit needs for privacy. Cryptography provides technical measure for ensuring this privacy.

## history
- caesar cipher
	- simple substitution scheme (rotation)
	- vulnerable to cryptanalysis
	- key is a single integer
	- symmetrical (same key for encrypt and decrypt)
	- so ciphertext has the same patterns as the plaintext e.g., letter frequencies
	- this leads to cryptanalysis: systematic ways of determining the encryption scheme
	- modern ciphers aim to make the cipher text resemble *noise* (random data)

# General process
- encrypt
	- plaintext + key => ciphertext
	- key is a secret
- decrypt
	- ciphertext + key => plaintext

mathmatically
- c = e(p, k)
- p = d(c, k)

# Terminology
- copy later

# Plaintext
refers to unencypted message. In the digital age the messages are often not plain text (ascii, unicode, etc).

digital crypto schemes normally work on the binary data (images, .docs, .txt, mp4 etc.)

# Conventions
- alice, bob, charlie, etc
- mallory -> malicious
- etc
- public vs private domains
	- assume communication is public
	- assume information is prepared and consumed in private domain

# Randomness
- a lack of predicability
- no patterns
- stochastic (can be analysed but not predcted) vs deterministic

used for
- one time pad
- generating key-pairs
- generating salts for password hashing
- seeding pesudo random number generators

humans are not good at randomness
- e.g., see patterns when there are none
- e.g., random dot pattern
- shuffle algorithm
- gambers fallacy

computers have the same problem: they are deterministic
- cannot really produce true random numbers
- CSPRNGS crypto secure pseudo random number generators
- hardware entropy generator

entropy pool
- modern OSs implement an entropy pool that processes can draw on when the need random data
	- some systems provide blocking and non-blocking random source devices
		- blocking: will stop when entropy is exhausted

how to prove randomness
- cannot prove
- but can check for uniformity, bias, distribution etc. 
- difficult with small samples
- can identify data that is unlikely to be random
	- (rngtext, diehard, dieharder etc)

# Future
- arms race
- parallell co-ordination
- quantum copmuting/cryptography could radically change the field
	- already being developed and investigated
- security practitioners are are already developing things for quantum computing. 