---
title: "412-lectures"
aliases: 
tags: 

---


# Lecture 7
copmuter security
- physical
- software (authenticity correctness)
- information (CIA/ IAS octave)
- network

cryptography can be bad because
- you are still giving access to data in some form
- how long will the cipher remain secure
- managing keys can be challenging

crypto in CIA
- c - hide information
- i - check for changes, checksums, MACs, Digital signatures
- a - not directly, but indirectly, validate authentity of network link usage

fallible machines
- ram corruption, fade or malfunction of storage media, software issues (fs bugs, compression bugs, etc)
- solution
	- estimate probability of failures, determine how many trials to achieve a certain level of confidence
	- 