---
title: "regularised-cost"
tags: 
---
- used for [[block-matching]] in stereo vision
- aims to fix problem of inconsistency between pixel rows
- Cost $C$ becomes 
	- SSD (difference betwen two patches)
	- plus $R$ (difference between disparity at this pixel and the surrounding pixels)

problems
- NP hard : neighbor affect neighbors recursively
- fix by doing only in 1D (along a line)
- [[semi-global-matching]] used many 1D lines to estimate global matching