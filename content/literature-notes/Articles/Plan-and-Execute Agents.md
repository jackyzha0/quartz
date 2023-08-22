---
author: [[LangChain]]
title: "Plan-and-Execute Agents"
tags: 
- articles
- literature-note
---
# Plan-and-Execute Agents

![rw-book-cover](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHBsYW58ZW58MHx8fHwxNjgzNjkxMTQ2&ixlib=rb-4.0.3&q=80&w=2000)

## Metadata
- Author: [[LangChain]]
- Full Title: Plan-and-Execute Agents
- Category: #articles
- URL: https://blog.langchain.dev/plan-and-execute-agents/

## Highlights
- all agents in LangChain followed the framework pioneered by the ReAct paper. Let’s call these “Action Agents”. The algorithm for these can roughly be expressed in the following pseudo-code:
  • Some user input is received
  • The agent decides which tool - if any - to use, and what the input to that tool should be
  • That tool is then called with that tool input, and an observation is recorded (this is just the output of calling that tool with that tool input)
  • That history of tool, tool input, and observation is passed back into the agent, and it decides what step to take next
  • This is repeated until the agent decides it no longer needs to use a tool, and then it responds directly to the user. ([View Highlight](https://read.readwise.io/read/01h03gemjgwef54dzkqr7e4dgr))
- • As objectives are more complex, more and more past history is being included to keep the agent focused on the final objective while also allowing it to remember and reason about previous steps
  • As developers try to increase reliability they are including more instructions around how to use tools ([View Highlight](https://read.readwise.io/read/01h03gezctfk52a1btgsed320f))
- agent frameworks attempt to separate higher level planning from shorter term execution. Specifically, they first plan steps to take, and then iteratively execute on those steps. There are of course a few interesting variants on this core algorithm (which we can talk about later). The pseudo-code for these agents, which we’re calling “Plan-and-Execute” agents, looks like:
  • Plan steps to take
  • For step in steps: determine the proper tools or other best course of action to accomplish that step ([View Highlight](https://read.readwise.io/read/01h03gfsvrcvc6z4k9v40xcmva))
- This agent framework relies on two things: a planner and an executor. ([View Highlight](https://read.readwise.io/read/01h03gg3ajx49seraqztvnyscz))
- the planner first. This almost always should be a language model. This will utilize the language model’s reasoning ability to plan out what to do and deal with ambiguity/edge cases. We can add on an output parser at the end to parse the raw LLM output into a list of strings (each string being a step). ([View Highlight](https://read.readwise.io/read/01h03ggjttpjy77cym4qzca06t))
- Now let’s talk about the executor. In our initial implementation we’ve made this an Action Agent. This allows for the executor agent to take in a high level objective (a single step) and figure out which tools to use to accomplish that (could be done in one step or two). ([View Highlight](https://read.readwise.io/read/01h03ggz49a9xbqw4614bbpw3e))
- This approach has several benefits. It separates out planning from execution - this allows one LLM to focus exclusively on planning, and another to focus on execution. This allows for more reliability on both fronts. This also makes it easier in the future to swap out these components for smaller fine tuned models. The major downside of this approach is that it takes a lot more calls. However, due to the separation of concerns we’re hopeful that these calls can be to smaller (and therefore faster and cheaper) models. ([View Highlight](https://read.readwise.io/read/01h03gj2fbnnz5tkmtvw3dpzng))
- We were really excited to see this new agent paradigm pop up in BabyAGI (we highlighted this as one of the big differentiators in our post a few weeks ago). We were equally excited to see the Plan-and-Solve paper emerge as a rigorous evaluation of similar idea ([View Highlight](https://read.readwise.io/read/01h03hg88jczrzkahhagyh4wjj))
