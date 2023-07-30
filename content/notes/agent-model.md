---
title: "agent-model"
aliases: agent, agents
tags: AI
---

> [[AI]] is the study and creation of machines that perform tasks normally associated with intelligence.

## Agents
We choose to model machines like this as an **agent** that operates within an **[[agent-environments|environment]]** using **sensors/percepts** and **actuators/actions**

The **[[agent-function]]** determines how an agent uses its sensors and actuators to act. The **agent program** is a concrete implementation of the agent function.

The agent function is evaluated using a **performance measure**

- **Perception**: processes that are used to interpret the environment of an agent. These are processes that turn stimulation into meaningful features. 
- **Action**: any process that changes the environment. (Including the position of the agent in the environment!) 

### Types of agents
**[[reflex-agent]]** simply map from sensors to actuators

**[[model-based-agent]]** keep an internal state which in addition to sensors informs their actions

**[[goal-based-agent]]** also keep an internal state, but instead of simply mapping a function of the state and the sensor, are able to evaluate a number of possible decisions, and choose the one that helps to achieve a goal or maximise **Utility**

**[[learning-agent]]** in addition to **performance element** (reflex, model-based or goal-based) have a **learning element** which uses some form of feedback (from a **critic**) or rewards/penalties to **improve**

## Environments
[[agent-environments]] vary along several different dimensions: 
- Fully observable vs partially observable 
- Deterministic vs stochastic 
- Episodic vs sequential 
- Offline vs online 
- Discrete vs continuous 
- Single-agent vs multi-agent

## Example: Vacuum-cleaner world 

Here’s a simple example: a formal definition of a robot vacuum cleaner, operating in a two-room environment. 
- Its sensors tell it which room it’s in, and whether it’s clean or dirty. 
- It can do four actions: move left, move right, suck, do-nothing.

To define the agent function, we need a syntax for percepts and actions. 
- Assume percepts have the form $[location, state]$: e.g. $[A, Dirty]$. 
- Assume the following four actions: Left, Right, Suck, NoOp. We also need a way of specifying the function itself. 
- Assume a simple lookup table, which lists percept histories in the first column, and actions in the second column

![example table|300](https://i.imgur.com/K7MPfvD.png)

> [!INFO] if it was this simple for all cases we wouldn't need [[AI]]. we could just use a data base. When it is more complicated we need an [[AI]] to _learn_ the tables