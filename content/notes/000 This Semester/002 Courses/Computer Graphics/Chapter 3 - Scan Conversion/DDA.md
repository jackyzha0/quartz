---
aliases: Digital Differentiate Analyzer
---
# DDA
## 1. How does DDA algorithm work?
----
1. First find $\delta x$ and $\delta y$.
2. Determine which one is greater( $\delta x$ or $\delta y$)
3. if ($\delta x$ is greater) set steps = $\delta x$ 
	1. x will be increament 1 in every step
	2. y will be increament by m$\delta x$ + b
4. else set steps = $\delta y$ 
	1. y will be increament 1 in every step
	2. x will be increament by $\delta y$/m – b
<iframe src="https://www.youtube.com/embed/W5P8GlaEOSI?start=453&amp;feature=oembed" height="113" width="200" style="aspect-ratio: 1.76991 / 1; width: 100%; height: 100%;"></iframe>
- It is an increamental scan conversion methods [^1]

[^1]: Such a method approach is charactered by performing calculations at each step using the result of the preceding step.
