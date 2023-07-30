---
title: "agent-function"
aliases: agent function
tags: AI
---

The agent function If we want, we can define an [[agent-model|agent]] and its [[agent-environments|environment]] formally. 
- We can define a set of actions A which the agent can perform. 
- We can define a set of percepts P which the agent can receive. 
A simple agent function could simply map from percepts to actions: 

f : P → A 
 
- The [[agent-program]] runs on the physical architecture to produce $f$

## Evaluating the agent function

It is useful to evaluate the agent function, to see how well it performs. To do this, we need to specify a performance measure, which is defined as a function of the agent’s environment over time. 

Some example performance measures: 
- one point per square cleaned up in time T? 
- one point per clean square per time step, minus one per move? 
- penalize for > k dirty squares?