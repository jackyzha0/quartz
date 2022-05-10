---
number headings: first-level 1, max 6, 1.1
title: "redundancy-and-anomalies"
aliases: redundancy and anomalies
tags: 
- info201
---

# Redundancy
when values are stored repetitively in database relations
- usually in poorly designed relations
- - potential for anomalous data to be stored
e.g., ![](https://i.imgur.com/8RdSNZt.png)

## How it arises
- ad hoc database
	- flat file
	- spreadsheet (no contraints)
- Poor database design
	- poor analysis
	- poorly designed ERDs (not thinkiing properly about the relationships)
- modifications to existing systems
	- "bolting on" new attributes
	- schema evolution over time

# Anomalies
## Update anomaly
An anomaly that occurs follows an UPDATE operation
e.g., 
![](https://i.imgur.com/fBMd8W3.png)

## Delete anomaly
An anomly that occurs following a DELETE operation
e.g., 
![](https://i.imgur.com/fUGVR98.png)
![](https://i.imgur.com/yp6KdYg.png)

## Insert anomaly
An anomly that occurs following a INSERT operation
e.g., 
![](https://i.imgur.com/hM1VlGs.png)
![](https://i.imgur.com/SkdKTLP.png)
Causes the process of putting johnson in system is delayed
