
---
title:  "Langchain Agents in Production Webinar"
Date: 2023-05-17
tags: 
- literature-note 
- webinar
---
***

**Source**: [Langchain agents in production](https://www.crowdcast.io/c/yvg1edg8fkgc)
***

Three participants besides Harrison Chase (langchain):
- [Samantha Whitmore](https://twitter.com/sjwhitmore) 
- [Divyansh Garg](https://twitter.com/DivGarg9)
- [Devin Stein](https://github.com/devstein)


## Samantha Whitmore


![](literature-notes/Podcasts/attachments/Pasted%20image%2020230510222806.png)

On how to avoid rabbit holes: 

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230510222835.png)

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230511095726.png)

In autogpt they have a different UX where at each step they ask the users if they want to continue. Samantha responds that it is kind of frustrating for the user to interact like that with the agent and that their implementation makes it smoother. 

Second problem she shares is that the router agent easily runs out of space in the prompt, reducing performance and agents getting confused. They constrained agents to templates with associated tools

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230511100455.png)

Template for Agents with prompts, inputs and toolset. 
![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517124620.png)

The ConversationalAgent is the interface and it goes telling you that he has started a background task which allows the user to keep on talking to the agent. 

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517124726.png)


## Divyansh Garg

Multi-on, an AI copilot as a [ChatGPT plugin](https://twitter.com/DivGarg9/status/1648394059483054081?s=20). AI agent that acts on your behalf. 

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517125112.png)

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517125303.png)

Compressed DOM representations using a pretty standard scraper that works for almos any website, you can see it here:
![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517130118.png)

How to make it reliable, evaluation and monitoring of the Neural Network computer.

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517133107.png)

Harrison asks him about what are the differences with [Adept: Useful General Intelligence](https://www.adept.ai/)

==The model are important but these are systems, model is just a part. ==

## Devin Stein

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517133500.png)

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517133652.png)

Important for agents, if you can't do a task don't do it. Otherwise you create more harm/confusion than good

Challenges in production:

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517140318.png)

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517140354.png)

Plan and execute agents. The plan can be fixed or you can revisit it. For the baseline they keep the plan fixed in order to avoid falling into a loop but in the long term they are considering revisiting the initial plan. 

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517140437.png)

Navigating the documents, resources the Where is very important and helpful to getting better.

What the user request is not a prompt, nor a query. You have to map it to your closed domain problem. You can ask the LLM to reformat the user request to a customer support query or whatever you need. 

![](literature-notes/Podcasts/attachments/Pasted%20image%2020230517140858.png)


## Audience Questions

**I am still struggling to distinguish between "single-agent, multi-tool" architecture vs multi-agent architecture. Are there any resources you all would recommend for me to better understand this? Particularly for "multi-agent" chains that aren't hardcoding in the agent order.**



**one biggest obstacle to get my agent into production is the speed. Agents are powerful, but they'll inevitably slow down the response time. Waht would be some good approaches to accomendate this? some ideas I can think of 1. running agents in parallel, 2. streaming output the intemediate results so users can have a better ux**

Answer: loading similar results from cache and streaming intermediate output, parallelization, it really depends on the baseline/benchmark for your specific case. 

They are using 3.5 (few shot) for intermediate steps, and GPT4 (zero shot) for planning and for synthetising the final response.

Sam says that she is using zero shot, with specific prompts. 

**Would love to hear your testing strategies as the outputs are non-deterministic and cant use traditional unit testing**

A lot of manual testing with a high cost associated.


**How do you implement routing? Like Router agent has secondary agents as tools? (Q for Sam)**
She asks the model which program to follow, ant it has the templates and the product flows as tools. The tool execution flow is kicking another agent in the background. 

Divyansh  uses ChatGPT plugin for routing


