---
title: Redundancy and Anomalies
---
# 1 Redundancy and Anomalies
### 0.1 Redundancy
when values are stored repetitively in database relations
- usually in poorly designed relations
- - potential for anomalous data to be stored
e.g., ![](https://i.imgur.com/8RdSNZt.png)

#### 0.1.1 How it arises
- ad hoc database
	- flat file
	- spreadsheet (no contraints)
- Poor database design
	- poor analysis
	- poorly designed ERDs (not thinkiing properly about the relationships)
- modifications to existing systems
	- "bolting on" new attributes
	- schema evolution over time

### 0.2 Anomalies
#### 0.2.1 Update anomaly
An anomaly that occurs follows an UPDATE operation
e.g., 
![](https://i.imgur.com/fBMd8W3.png)

#### 0.2.2 Delete anomaly
An anomly that occurs following a DELETE operation
e.g., 
![](https://i.imgur.com/fUGVR98.png)
![](https://i.imgur.com/yp6KdYg.png)

#### 0.2.3 Insert anomaly
An anomly that occurs following a INSERT operation
e.g., 
![](https://i.imgur.com/hM1VlGs.png)
![](https://i.imgur.com/SkdKTLP.png)
Causes the process of putting johnson in system is delayed