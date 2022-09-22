---
title: "cosc203-lab20"
aliases: 
tags: 
- lab
- cosc203
---

![](https://i.imgur.com/EnNd94C.png)

1. header
	1. 4 fields
		1. source port
		2. dest port
		3. length
		4. checksum
	2. each field is 2 bytes
![100](https://i.imgur.com/dzMuJWY.png)

2. payload is 980 bytes
	1. max is 65536-8 = 65528

3. 17 ![50](https://i.imgur.com/uKGY8WP.png)

![](https://i.imgur.com/In1iX3w.png)
4. the source port of the first message is the destination port of the second and the destination port of the first is the destination port of the second



![](https://i.imgur.com/V4GKJA5.png)

5. source port 61958, ip 10.112.120.171, 
6. cosc ip is 10.66.8.42, using port 80


7. syn 
	1. seq number: 0   ![](https://i.imgur.com/8yF20dZ.png)

	2. idetified by the syn flag ![](https://i.imgur.com/rkw0BMu.png)

8. syn ack
	1. seq num: 0 ![](https://i.imgur.com/5sdwweq.png)

	2. value of ack field: 1 ![](https://i.imgur.com/mrvWNks.png)
	3. how did cosc get this value? not sure
	4. identified by flag field ![](https://i.imgur.com/WJmm8Ra.png)

9. get [](https://i.imgur.com/LZOuVK9.png)
	1. seq num: 1

10. ack segments
	1. rtt average 4ms
	2. numbers
		1. 