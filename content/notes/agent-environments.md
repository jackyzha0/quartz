---
title: "agent-environments"
aliases: environment
tags: AI
---

As well as a formal description of the agent, we can give a formal description of its environment. 

Environments vary along several different dimensions: 
- Fully observable vs partially observable 
	- agent knows everything about the state (i.e., chess)
	- or agent doesn't know everything (i.e. how we percieve the world). we make inferences about things. some things fool the brain (i.e., movies iilusion of motion)
- Deterministic vs stochastic 
	- everything happens the same everytime
	- or something about the environment we don't know about so there is some randomness. some things we don't have information about
	- difficult to deal with stochastic as we need to consider probabilities
- Episodic vs sequential 
	- history doesn't matter (i.e. chess, previous states of the board don't matter)
	- or sequence in meaningful (i.e., text prediction) only the most recent word doesn't help
- Offline vs online
	- offline you have the data to train
	- online the agent has to deal with things on the fly, cannot plan 
- Discrete vs continuous 
	- mathematical
	- finite choices
	- or infinite choices (mathematically)
- Single-agent vs multi-agent 
	- more simple with one agent vs static environment

The environment type largely determines the agent design
