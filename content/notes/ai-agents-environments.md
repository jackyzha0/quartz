---
title: "agent-model"
tags: 
---

> AI is the study and creation of machines that perform tasks normally associated with intelligence.

## Agents
We choose to model machines like this as an **agent** that operates within an **environment** using **sensors** and **actuators**

The **agent function** determines how an agent uses its sensors and actuators to act. The **agent program** is a concrete implementation of the agent function.

The agent function is evaluated using a **performance measure**

### Types of agents
**Reflex agents** simply map from sensors to actuators

**Model-based agents** keep an internal state which in addition to sensors informs their actions

**Goal-based agents** also keep an internal state, but instead of simply mapping a function of the state and the sensor, are able to evaluate a number of possible decisions, and choose the one that helps to achieve a goal or maximise **Utility**

**Learning agents** in addition to **performance element** (reflex, model-based or goal-based) have a **learning element** which uses some form of feedback (from a **critic**) or rewards/penalties to **improve**

## Environments
Environments vary along several different dimensions: 
- Fully observable vs partially observable 
- Deterministic vs stochastic 
- Episodic vs sequential 
- Offline vs online 
- Discrete vs continuous 
- Single-agent vs multi-agent