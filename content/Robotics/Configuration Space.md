---
title: "Configuration Space"
tag: robotics
date: 
alias:
---

A robot is composed of a set of ***links***, connected to each other using ***joints***.
**Actuators** (motors) deliver forces/torques that cause links to move.
***End-effector***s (hand, gripper, etc) is attached to a specific link. Most robots have links that can be modeled as rigid bodies.

Then, how do we answer the question of “where is the robot?”. The answer is given by the robot’s ***configuration***, a specification of the positions of all points of the robot. Because links are rigid and have known shapes, configuration is easy to represent.

Thus, we have this formal definition of configuration:

>[!defn] Configuration
> The configuration of a robot is a complete specification of the position of every point of the robot. 
> - The minimum number *n* of real-valued needed to represent the configuration is the number of [[Degrees of Freedom]]
> - The *n*-dimensional space containing all possible configurations is the configuration space (C-space)
> - The configuration of a robot is represented by a point in its C-space

