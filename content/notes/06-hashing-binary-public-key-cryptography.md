---
title: "06-hashing-binary-public-key-cryptography"
aliases: 
tags: 
- lecture
- comp210
sr-due: 2022-12-27
sr-interval: 43
sr-ease: 230
---

- ![terminology](https://i.imgur.com/p3b7Z0i.png)

# news
- pegasus project
- cutting internet cables

# Hash function
- yields a small, districtive value (hash or digest) from an arbitrarily sized input.
- one way function
	- non-invertable
- uniform size (each ouput eqaully likely)
- deterministic (same input maps to same output)
- possibility of collisions (b-day paradox, potential attacks)

message => hash() => hash

also
- can be used for data structures
	- [hash-map](notes/hash-map.md)
	- lots of theory
	- often use modular arithmetic
	- usually have more complicated algorithms than mod

## in crypto
- needs to be
	- impossible to reverse
	- difficult to find collision
	- uniform length output (tunable)
	- must account for every bit of information in a message
	- must be sensitive to changes input (avalancge effect)
	- ouput should no contain apparent iinformation (appears random)
	- easily computed (usually)
		- for passowords should be slow
		- makes brute force attacks take time
		- key strechting (repeated application of hash)
		- use complex memory access patterns to defeat esp

effectively a digital fingerprint;

## collision probability

$v = a^l$

- ![theory slide|400](https://i.imgur.com/EqydQtI.png)
- ![example slide|400](https://i.imgur.com/xEKxhIT.png)
- ![reverse example slide|400](https://i.imgur.com/eWjhqjv.png)

can also be used to compare complexity of passwords
- ![passwords slide](https://i.imgur.com/GdaMF4r.png)
- should have about 80 bits of entropy


- ![collision probability slide|400](https://i.imgur.com/auwVphr.png)

## uses of hashing
- ![hashing security appplications slide|400](https://i.imgur.com/v5T9yTB.png)
- ![2|400](https://i.imgur.com/B9fgkGv.png)

## good algorithms
- ![safe|400](https://i.imgur.com/BlvhRJw.png)
- ![not-safe|400](https://i.imgur.com/6ssAVGK.png)


# One-time-pads
- basic idea
	- generate single-use truly-random key they is at least as long as the plaintext
	- combine the key with the plaintext using XOR one bit at a time
	- resulting ciphertext looks like random noise
	- decryption must use same key (symmetric)

## limitations
impossible to crack, if properly implemented.
- but key must be shared
- key distribution problem
- need long, truly random, one time keys
	- must be used only once

# assymetric cryptography
uses different but mathematically related keys for encrption and decryption

![asymmetric enryptio process|400](https://i.imgur.com/6fLEB5Z.png)

![symmetric diagram|400](https://i.imgur.com/hGaHUWO.png)

![asymmetric enryption diagram|400](https://i.imgur.com/0gp24Re.png)



# digital signatures
encryption + signing. signing verfies authenticity of sender

![signing|400](https://i.imgur.com/kSqMnNC.png)
![signin diagram|400](https://i.imgur.com/f9LSnIA.png)

stream ciphers vs block ciphers

one bit at a time vs chunks

reciprocal cipher
![slide|400](https://i.imgur.com/fzxBWM9.png)
