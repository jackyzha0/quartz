---
number headings: auto, first-level 1, max 6, 1.1
title: "Assignment 02"
subtitle: "Jet Hughes, 9474308"
aliases: 
tags: 
- cosc201
- assignment
header:
- \documentclass{article}
- \usepackage{multirow}
---

# 1 Introduction
## 1.1 Setup
This report will discuss various strategies for managing a *warehouse* . A warehouse will be simulated as follows:
- A warehouse is made up of a grid of *cells*. 
- Each cell has a collection of *packets*
- Each packet has a *destination* cell. 
- Each cell also has a *robot* 
- In each step of the simulation a robot can deliver one packet to a robot in an adjacent cell.
- The simulation ends when each cell has arrived at its destination.


## 1.2 Managers
The goal is to deliver all the packets to their desired destination as efficiently as possible. 

Efficiency is defined as the minimum number of steps required to deliver all the packets divided by the actual number of steps taken.

The efficiency of the warehouse depends on the delivery scheme used by the robots. There are four managers I will be considering. These are:

**Basic**
- Packets are stored in a FIFO queue
- Vertical movements are made before horizontal movements
- Received packets are always added to the queue

**Load Aware**
- Packets are stored in a FIFO queue
- If its destination is in a straight line from the current location, it just sends it one step in the appropriate direction.
- Otherwise, moves to cells with fewer packets are preferred.
- In case of an equality, revert to the basic rule
- Only packets that need to keep moving are added to the queue

**Priority**
- Packets are stored in a Priority queue
- Packets with further distance to their destination have higher priority
- If two packets have the same priority, revert to the load aware rule
- Only packets that need to keep moving are added to the queue

**Min Load** [^1]
- Same as normal priority, but the priority is changed
- A Packet has two (logical) possible cells it could move to next. Its priority is found by checking the load at each of these two cells, and taking the lesser of the two. 
- If two packets have the same priority, revert to the load aware rule.
- Only packets that need to keep moving are added to the queue

## 1.3 Scenarios
There are a number of other factors that affect the efficiency of the warehouse. These are:

- The total number of packets in the warehouse
- The initial distribution of the packets
- The distribution of the destination of the packets

The plan is to analyze the efficiencies of the delivery schemes in a few different scenarios, with a few different map sizes. These scenarios are:

- **1000 Random:** 1000 packets are added in random locations with random destinations
- **One Per Cell:** The number of packets and cells is the same. Each cell contains one packet to begin with, and has a random destination (different packets might have the same destination).
- **Chance Per Cell:** As the previous case, but each cell has only a 25% chance of containing a packet.
- **Upper Left:** The number of packets and cells is the same. All the packets start in the upper left corner, and each packet has a different destination.
- **Center:** The number of packets and cells is the same. All the packets start in center, and each packet has a different destination.

# 2 Analysis
Each result is the average efficiency of 25 runs in that configuration

## 2.1 N Random
$$
\begin{tabular}{|c|c|c|c|c|c|c|c|}
\hline
Scenario&\multicolumn{6}{|c|}{Map Sizes} \\
\hline
&5&10&20&40&80&100\\
\hline
Basic&4.0\%&14.6\%&43.7\%&84.6\%&98.2\%&98.9\%\\
Load Aware&4.9\%&17.5\%&47.0\%&84.3\%&98.0\%&98.6\%\\
Priority&4.9\%&17.7\%&55.6\%&100.0\%&100.0\%&100.0\%\\
Min Load&4.8\%&17.0\%&49.2\%&90.2\%&98.1\%&98.9\%\\
\hline
\end{tabular}
$$

In this scenario. The efficiency of the mangers clearly increased proportionally to the size of the map. This is because the number of packets remained constant, so as the map size increased, the load on the managers decreased and Packets were able to move through the warehouse more quickly.

At a map size of 100 all managers achieved close to 100% efficiency. However, the Priority manager was the only one able to achieve exactly 100%. In addition, it was about 5% better than the others in a 50x50 map.

It is also worth noting the basic manager was significantly worse than the others in the very small maps. This is likely due to the high load on each of the managers, amplifying the need to keep them in balance. A since all the other managers have some form of load balancing, the Basic Manager is most affected. I could be interesting to try to create a manger that performs better here than the Basic manager without, using any load balancing. Possibly considering only priority based on distance to destination.

The Min Load manager was very slightly better than the Load Aware Manager in the mid-sized maps. This implies that prioritizing nodes that can be easily balanced is better than, simply, sending nodes to the least loaded cell.

The managers tend to perform similarly at the extreme ends of the map size spectrum, and differ most in the middle. 

## 2.2 One Per Cell
$$
\begin{tabular}{|c|c|c|c|c|c|c|c|}
\hline
Scenario&\multicolumn{6}{|c|}{Map Sizes} \\
\hline
&5&10&20&40&80&100\\
\hline
Basic&73.8\%&76.2\%&72.9\%&73.7\%&74.4\%&73.3\%\\
Load Aware&81.0\%&76.2\%&73.7\%&74.0\%&74.3\%&73.4\%\\
Priority&88.5\%&97.7\%&99.5\%&100.0\%&100.0\%&100.0\%\\
Min Load&85.0\%&81.0\%&83.1\%&82.7\%&81.8\%&83.0\%\\
\hline
\end{tabular}
$$

In this scenario, overall efficiency was relatively high with the Basic, and Load Aware managers achieving about 70%, Min load achieving about 80%, and Priority manager about 100%. Since the number of packets is proportional to the size of the map, changing the size had little effect on the efficiency of the managers, except for the Priority manager, and to a lesser extent the Load Aware manager.

The Priority manager significantly outperforms the other managers here. However, it was significantly less efficient (but still better than the other managers) in smaller map sizes. It decreased from 100% in 100x100 to 88.5% in 5x5. The Load Aware manager, on the other hand, *increased* from 73.4% in 100x100 to 81% in 5x5. Since I only have a small sample size of 25, this could be due to random chance.

The Min Load Manager was consistently better than the Basic and Load Aware managers, but never better than the Priority manager. 

## 2.3 Chance Per Cell
Chance = 25%
$$
\begin{tabular}{|c|c|c|c|c|c|c|c|}
\hline
Scenario&\multicolumn{6}{|c|}{Map Sizes} \\
\hline
&5&10&20&40&80&100\\
\hline
Basic&94.5\%&94.5\%&94.6\%&95.7\%&96.5\%&97.4\%\\
Load Aware&95.8\%&94.2\%&94.1\%&95.6\%&96.2\%&96.1\%\\
Priority&98.7\%&99.7\%&100.0\%&100.0\%&100.0\%&100.0\%\\
Min Load&97.4\%&96.3\%&96.0\%&96.5\%&98.2\%&98.0\%\\
\hline
\end{tabular}
$$

In this configuration, the efficiency was very high due to the low number of packets, low load-factor and subsequent fast movement of Packets. Hence, the variation in efficiencies was very small, as the need for balanced managers was diminished.

Here, the Priority manager still performed the best, achieving 100% efficiency, although by a lesser margin than in the previous two scenarios. Once again, the Min Load manager was better than the Basic and Load Aware managers, but not the Priority manager. 

## 2.4 Upper Left
$$
\begin{tabular}{|c|c|c|c|c|c|c|c|}
\hline
Scenario&\multicolumn{6}{|c|}{Map Sizes} \\
\hline
&5&10&20&40&80&100\\
\hline
Basic&26.3\%&15.8\%&8.9\%&4.7\%&2.4\%&1.9\%\\
Load Aware&25.8\%&15.7\%&8.8\%&4.7\%&2.4\%&1.9\%\\
Priority&30.7\%&17.5\%&9.4\%&4.8\%&2.5\%&2.0\%\\
Min Load&26.6\%&16.0\%&8.8\%&4.7\%&2.4\%&1.9\%\\
\hline
\end{tabular}
$$

This scenario had by far the lowest efficiency. This is because a single manger initially holds every node. Since most of the load at any given time is being handled by one manager, and most of the packets will wait a long time before getting offloaded to an adjacent cell, they will take longer to reach their destination. As the map size increases, the efficiency decreases rapidly, as the number of packets starting on the top left cell increased exponentially. 

There is little variation in the efficiency of the different managers, except for the Priority manager, which is slightly more efficient than the others. I think this is because by prioritizing packets that need to travel further, the concentration of packets in the corner is reduces faster. 

It would be interesting to know whether placing all the packets in the center of the map would be more efficient. I think it would be, as there are more directions for the packets to spread out, and the packets are on average would be closer to their destination (since destinations are uniformly distributed).

## 2.5 Center
I decided to investigate the idea of starting all the packets in the center. These were the results. 

$$
\begin{tabular}{|c|c|c|c|c|c|c|c|}
\hline
Scenario&\multicolumn{6}{|c|}{Map Sizes} \\
\hline
&5&10&20&40&80&100\\
\hline
Basic&14.8\%&9.0\%&4.8\%&2.4\%&1.2\%&1.0\%\\
Load Aware&15.0\%&9.0\%&4.7\%&2.4\%&1.2\%&1.0\%\\
Priority&16.0\%&9.7\%&4.9\%&2.5\%&1.2\%&1.0\%\\
Min Load&14.9\%&9.3\%&4.8\%&2.4\%&1.2\%&1.0\%\\
\hline
\end{tabular}
$$

Surprisingly, this was about half as efficient as starting is the corner. This is the opposite of what I expected. It's interesting that it reached exactly 1% efficiency in a 100x100 map. 

Aha! It's because the max distance a packet must travel is shorter (about half), so even with a similar number of steps, the efficiency will be twice as bad. This means that Center does not necessarily result in slower delivery, only higher consequences for slow deliveries.

# 3 Summary
Priority managers was clearly the most efficient of the four managers, with the Min Load following. Configurations with extremely large or small amounts of packets per cell made the managers perform more similarly, and scenarios with medium amounts of packets per cell amplified the difference. 

I think the main reason Priority manager was consistently better than the other was because It spreads the load among more managers faster, and ensures that Packets with further destinations arrive about the same time as shorter ones. It effectively removes the advantage that packets closer to their destination have.

I think Min Load performed better than Load Aware for one reason: It did a better job of distributing load. I think I could have made an even better manager by prioritizing based on a function of both load, and distance.

[^1]: I couldn't think of a better name
