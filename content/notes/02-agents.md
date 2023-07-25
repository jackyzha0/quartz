---
title: "02-agents"
tags: 
- cosc343
---

## Agents

- The term ‘agent’ is very general: it covers humans, robots, softbots, thermostats, etc.
- An agent has a set of sensors, a set of actuators, and operates in an environment.

The agent function If we want, we can define an agent and its environment formally. 
- We can define a set of actions A which the agent can perform. 
- We can define a set of percepts P which the agent can receive. 
A simple agent function could simply map from percepts to actions: 

f : P → A 
 
- The agent program runs on the physical architecture to produce f

## Example: Vacuum-cleaner world 

Here’s a simple example: a formal definition of a robot vacuum cleaner, operating in a two-room environment. 
- Its sensors tell it which room it’s in, and whether it’s clean or dirty. 
- It can do four actions: move left, move right, suck, do-nothing.

To define the agent function, we need a syntax for percepts and actions. 
- Assume percepts have the form [location, state]: e.g. [A, Dirty]. 
- Assume the following four actions: Lef t, Right, Suck, NoOp. We also need a way of specifying the function itself. 
- Assume a simple lookup table, which lists percept histories in the first column, and actions in the second column

![example table|300](https://i.imgur.com/K7MPfvD.png)

> [!INFO] if it was this simple for all cases we wouldn't need AI. we could just use a data base. When it is more complicated we need an AI to _learn_ the tables

## Evaluating the agent function
It is useful to evaluate the agent function, to see how well it performs. To do this, we need to specify a performance measure, which is defined as a function of the agent’s environment over time. 

Some example performance measures: 
- one point per square cleaned up in time T? 
- one point per clean square per time step, minus one per move? 
- penalize for > k dirty squares?

## Formalising the agent’s environment 
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

> [!INFO] lech wont always specify the domain. we need to check ourselves

## Types of AI agents

## Reflex agent
- has a direct mapping from sensors to actuators
- e.g., reflexs in humans. no processing, just happens straight away

### Example: Braitenberg vehicle 
One very simple simulated organism is a Braitenberg vehicle. 

The discs on the front are light sensors. 
- Lots of light → strong signal. 
- Less light → weaker signal. The sensors are connected to motors driving the wheels.

Two initial configurations:
![configs|300](https://i.imgur.com/wbSs3Qm.png)

A : Same side connections → goes away from the light
B : Cross connection → goes toward the light

> [!INFO] something very simple like this can produce already interesting behaviours

> [!INFO] thinking fast and slow: system 1 vs system 2. reflex's are related to system 1
> dragonflys have 90% success when hunting. we think most of it is reflexive

### Example: Image classification
![diagram|300](https://i.imgur.com/UqoQFqh.png)

> [!INFO] straight circuit. image goes in → computation → cat or no cat
> if there is no adaptive feedback i.e., one way circuit. it is a reflex agent even if there is a complex neural network


## Reflex agents: perception to action 

These simple agents blur the lines between perception and action. 

- **Perception**: processes that are used to interpret the environment of an agent. These are processes that turn stimulation into meaningful features. 
- **Action**: any process that changes the environment. (Including the position of the agent in the environment!) 

Actually, the lines are blurred in human agents too.

## Model-based agents
maintain internal **state** that can reference (and update) **internal context**

![diagram|300](https://i.imgur.com/6G5OiIw.png)

### Example: Text prediction
![](https://i.imgur.com/EcQlXoe.png)

> [!INFO] critical is the sequence. the box is the same agent at ddifferen times doing difference mappings. the sequence of previous words defines the new prediction
> same input can produce difference output depending on the state

### Chat-GPT
> [!INFO] it is a reflex agent. given the same input-> always gives the same output. 
> input is up to 4000 word tokens. then predicts a word in a reflex way.
> then adds the prediction into the input with the original input
> picks one out of top 5 predicted words so there is some randomness

> [!INFO] model agents maintain state but they are quite simple

## Goal Based Agents
Can search for a way of achieving a desired situation.

![](https://i.imgur.com/VgXvlrQ.png)

- Goal-based agents often involve some kind of **search** and/or **planning** over a sequence of possible actions. 
- **Utility-based** agents internalise performance measure through a **utility function** with the goal to maximise the utility of its actions.

> [!INFO] more explicit about planning out a sequence of steps, and finding a solution.
> measure utility. agent wants to maximise utility

### Example: Route finding agent
E.g., google maps directions

> [!INFO] search for a solution. how to find optimal path

> [!INFO]

### Example: Chess-playing agent
> [!INFO] has all the information. predicts what can happen going forward.

## Learning agents
Use some form of feedback (from a **critic**) or **rewards**/**penalties** to improve

![diagram|300](https://i.imgur.com/O1MGHQL.png)

> [!INFO] takes some parameters that are adjustable, and this it can learn
> similar to a brain where you learn

### Example: Image classification
![](https://i.imgur.com/4vvrhXy.png)


# Embodied AI: starting at the beginning 
How hard is it to build something like us? One way of measuring the difficulty of a task is to look at how long evolution took to discover a solution.

![table|300](https://i.imgur.com/Hdo6Xvs.png)

- Most of evolutionary time was spent designing robust systems for physical survival. 
- In this light, what’s ‘distinctively human’ seems relatively unimportant!

> [!INFO] playing chess etc, is the last thing that should come. we should solve all the easier problems that more simple organisms did first.
> focus on devloping AI in a evolutionary sense.
> e.g., we don't have AI insects (like mars rover) ∴ we shouldn't work on chess ai yet

## An evolutionary approach to AI 
Proponents of embodied AI believe that in order to reproduce human intelligence, we need to retrace an evolutionary process: 

- We should begin by building robust systems that perform very simple tasks—but in the real world. 
- When we’ve solved this problem, we can progressively add new functionality to our systems, to allow them to perform more complex tasks. 
- At every stage, we need to have a robust, working real-world system. 

Maybe systems of this kind will provide a good framework on which to implement distinctively human capabilities. 
This line of thought is associated with a researcher called Rodney Brooks

## The importance of practical work 
Roboticists stress the importance of working in the physical world. 
- It’s very hard to simulate all the relevant aspects of a robot’s physical environment. 
- The physical world is far harder to work with than we might think—there are always unexpected problems. 
 
So (though very briefly) we’re going to do some practical work with LEGO bots in Lab 1

# Lab 1: Robot navigation 
Experience working with embodied AI – in groups of 4 (due to limited number of robots) you will write a program for a Lego bot to navigate a simple obstacle course. 

Objectives: 
- To get a bit of a taste of real-world AI 
- To take a peek at the Python environment and the PyCharm IDE 
- To have a bit of fun playing with the Lego bot 
- Getting to know people in the class

# Study guide 
- Understand the mathematical formalisation of an agent function and how it can translate into a program implementing a behaviour within environment. 
- Terms and definitions: agent, sensors/percepts, actuators/actions, agent function, agent program, performance measure, environment. 
- Distinguish between different types of environments. 
- Distinguish between different types of agents.