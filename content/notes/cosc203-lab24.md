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

8. 
