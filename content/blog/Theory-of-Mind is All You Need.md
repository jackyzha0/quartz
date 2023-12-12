
---
title: "Theory-of-Mind Is All You Need"
enableToc: false
---

## TL;DR

Today we’re releasing a major upgrade to [Bloom](https://discord.gg/bloombot.ai) (& the open-source codebase, [Tutor-GPT](https://github.com/plastic-labs/tutor-gpt)).

We gave our tutor even more autonomy to reason about the psychology of the user, and—using GPT-4 to dynamically _rewrite its own_ system prompts—we’re able to dramatically expand the scope of what Bloom can do _and_ massively reduce our prompting architecture.

We leaned into theory of mind experiments and Bloom is now more than just a literacy tutor, it’s an expansive learning companion.

## Satisfying Objective Discovery

Bloom is already excellent at helping you draft and understand language. But we want it do whatever you need.

To expand functionality though, we faced a difficult technical problem: figuring out what the learner wants to do.

Sounds simple (just ask), yet any teacher will tell you, students are often the last to understand what they ought to be doing. Are you learning for its own sake, or working on an assignment? What are the expectations and parameters? What preferences do you have about how this gets done?

Explaining all this to a tutor (synthetic or biological) upfront, is laborious and tiresome. We could just add some buttons, but that’s a deterministic cop-out.

![[assets/ToM meme.jpeg]]

What a expert educators will do is gather more information throughout the completion of the task, resolving on a more precise objective along the way; keeping the flow natural, and leaving the door open to compelling tangents and pivots.

The key here is they don’t have all the information—they _don’t know_ what the objective is precisely—but being good at tutoring means turning that into an advantage, figuring it out along the way is _optimal_. The effective human tutor dynamically iterates on a set of internal models about student psychology and session objectives. So how do we recreate this in Bloom?

Well we know that (1) foundation models are [shockingly good](https://arxiv.org/abs/2304.11490) at [theory of mind](https://en.wikipedia.org/wiki/Theory_of_mind), (2) Bloom already excels at [pedagogical reasoning](https://twitter.com/courtlandleer/status/1664673210007449605?s=20), and (3) [autonomous agents](https://twitter.com/yoheinakajima/status/1642881722495954945?s=20) are [having early success](https://twitter.com/Auto_GPT/status/1649370049688354816?s=20), so what if we stopped trying to deterministically prescribe an indeterminant intelligence?

What if we treated Bloom with some intellectual respect?

## Autonomous Prompting

The solution here is scary simple. The results are scary good.

[Here’s a description](https://plasticlabs.ai/blog/Open-Sourcing-Tutor-GPT/) of the previous version’s architecture:

> Bloom was built and prompted to elicit \[pedagogical reasoning\]…After each input it revises a user’s real-time academic needs, considers all the information at its disposal, and suggests to itself a framework for constructing the ideal response.
> 
> It consists of two “chain” objects from [LangChain](https://python.langchain.com/en/latest/index.html) —a _thought_ and _response_ chain. The _thought_ chain exists to prompt the model to generate a pedagogical thought about the student’s input—e.g. a student’s mental state, learning goals, preferences for the conversation, quality of reasoning, knowledge of the text, etc. The _response_ chain takes that _thought_ and generates a response.
> 
> Each chain has a `ConversationSummaryBufferMemory` object summarizing the respective “conversations.” The _thought_ chain summarizes the thoughts into a rank-ordered academic needs list that gains specificity and gets reprioritized with each student input. The _response_ chain summarizes the dialogue in an attempt to avoid circular conversations and record learning progress.

Instead, we’ve now repurposed the ***thought*** chain to do two things:

-   Predict the user’s unobserved mental state
-   List the information needed to enhance that prediction

![[assets/ToM Flow.png]]

Then we inject that generation into the body of the response chain’s system prompt. We do this with every user input. Instead of just reasoning about the learner’s intellectual/academic needs, Bloom now proactively rewrites itself to be as in-tune as possible to the learner at every step of the journey.

## Emergent Effects

We’re seeing substantial positive behavior changes as a result of giving Bloom this kind of autonomy.

![[assets/ToM Discord 1.png]]

Bloom is more pleasant to converse with. It’s still Socratic and will still push you to learn, but it’s not nearly as restrictive. Mainly, we posit this is a result of the tutor cohering to the user. Bloom becomes more like its interlocutor, it’s in many ways a mirror. This has a positive psychological effect—think of your favorite teacher from high school or college.

![[assets/ToM Discord 2.png]]

And Bloom is game. It’ll go down a rabbit hole with you, help you strategize around an assignment, or just chat. Bloom displays impressive discernment between acting on theory of mind recommendations to gather more information from you and asking topically-related questions to keep up the momentum of the conversation. It’s no longer obsessed with conforming to the popular stereotype of a tutor or teacher.

![[assets/ToM Discord 3.png]]

While reducing the prompt material, we took to opportunity to remove basically all references to “tutor,” “student,” etc. We found that since Bloom is no longer contaminated by pointing at [certain averaged narratives in its pre-training](https://www.lesswrong.com/posts/D7PumeYTDPfBTp3i7/the-waluigi-effect-mega-post)—e.g. the (bankrupt) contemporary conception of what a tutor is ‘supposed’ to be—it is, ironically, a better one.

Instead of simulating a tutor, it simulates _you_.

## Coming Soon...

All this begs the question: what could Bloom do with even better theory of mind? And how can we facilitate that?

What could other AI applications do with a framework like this?

Stay tuned.