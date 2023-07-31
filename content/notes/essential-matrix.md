---
title: "stereo-vision"
aliases: stereo vision
tags: CV, image_processing, math
---
- Simplified fundamental matrix
- factor out K1, and K2 
- $E=[t]_{\times}R$
- $E= K'^{T}FK$
- we get E from the above equation. to extract R and t from E:
	- find SVD
	- solve $R=UWV^T$
	- choose solution where x is in front of both cameras