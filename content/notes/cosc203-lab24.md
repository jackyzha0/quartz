---
title: "cosc203-lab24"
aliases: 
tags: 
- cosc203
- lab
---

1. 20 bytes in header - 1480 bytes in payload
![](https://i.imgur.com/uLIwOAV.png)

2. The more fragments flag is set. the size of the packet is 1500 bytes. Its the first because the id ends with a zero
![](https://i.imgur.com/FiH4nmn.png)

3. The id field indicates that it is the second fragment. There are more because the more fragments flag is set
[printout](file:///C:/Users/Jet%20Hughes/Documents/Personal/courses/cosc-203/labs/lab24/2ndfragment.pdf)

4. the time to live and the id have changed
![second fragment](https://i.imgur.com/O9XIgOq.png)
![first fragment](https://i.imgur.com/nZSjk98.png)

5. the pattern is tll = 255, 252, 1, 2, 3, 4, 252. first sends a probe with tll=255 (max) maybe to check if it exists? then 4 probes with increasing tll to trace the route. I dont know about the 252 ones
![](https://i.imgur.com/qgizPRZ.png)

get - packet 76
res - 78

6. bc:54:2f:5e:83:d7
![](https://i.imgur.com/vdfqIRO.png)

7. (00:00:0c:9f:f0:04) - the router i'm connected to
![](https://i.imgur.com/20ZlLfr.png)

8. 0800 - ipv4 
![](https://i.imgur.com/V4YB7Y0.png)

9. the G is the 41st byte. Before this is the TCP information
![](https://i.imgur.com/Pbq8QaV.png)

10. Source: Cisco_65:34:42 (00:2a:6a:65:34:42). the address of the router
![](https://i.imgur.com/VEulBZs.png)

11. bc:54:2f:5e:83:d7 - yes this is my computer
![](https://i.imgur.com/WrhwhBb.png)

12. 10.66.8.42
![](https://i.imgur.com/L7pPydW.png)

13. its different not sure why
![](https://i.imgur.com/QiyHc6L.png)

14. Destination: Broadcast (ff:ff:ff:ff:ff:ff) this is the default gateway
![](https://i.imgur.com/KfqWJti.png)
![](https://i.imgur.com/o8936Ye.png)

15. Opcode: request (1)
![](https://i.imgur.com/G5lyukY.png)

16. yes - needed so that people can reply without also having to send an ARP
![](https://i.imgur.com/QQ5CX6r.png)

17. 