---
title: Solving The Campfire Problem with Honcho
date: 04.14.24
tags:
  - demos
  - philosophy
  - "#ml"
  - blog
---
![[agent_campfire.webp]]
## TL;DR

Today we're releasing the first demo utilizing Honcho's dialectic API.[^1] Your LLM app/agent can now converse freely with [Honcho](https://honcho.dev)(-as-agent) about a user in natural language: agent-to-agent chat over user context.

The demo is a "curation buddy" that can chat over links you share. It uses Honcho to [[Memories for All|derive and store personal context]] about you over time, then leverages that to be the best reading companion it can be.

Our fractured media landscape is a far cry from narrative meaning making around the tribal campfire. Despite the connective power of the web, many of us subsist in lonely intellectual silos, more diverse but less fulfilling than social discourse.

We call this *The Campfire Problem* and expect to see lots of apps working to solve parts of it using generative AI, Honcho, and other emerging technologies. Hopefully today's demo affords a glimpse of what's becoming possible.

## A *Curation Buddy* Demo

It's a constant problem, you're dying to talk to someone about this mind-blowing thing you read, but no one else you know is into your weird shit, plus--like you--they're all drowning in infinite read-it-later hell.

Enter *Curation Buddy*.

### Overview

Curation Buddy is an LLM application. It's a Discord bot you can chat with. Share links to any text based media and have substantive conversation.

It uses Honcho to personalize the UX. As you converse, Honcho learns about you. It reasons about the links and conversation to uncover insight into your knowledge, interests, beliefs, desires, [[User State is State of the Art|state]], etc. 

This account of user state can then be leveraged by Curation Buddy to behave like a trusted, close intellectual companion.  

![[curation_buddy_overview.png]]

### What the App Does

Curation buddy will have a discussion with you about the content in links you drop into chat. It does this by generating a "thought" about your (the user's) needs and lists out any additional data it could use to better address them. 

We parse out that list and loop over it making requests to Honcho's dialectic endpoint. Honcho returns responses to those questions, they get aggregated into a list and injected as context to hydrate the prompt that curation buddy uses to generate the response to the user.

![[curation_agent.png]]

### What Honcho Does

Concurrently, Honcho is listening for writes to its database. Once it detects a write, it fires off a callback function to derive facts about the user's message.

These facts get embedded and stored in the user's personal vector database. Then when Curation Buddy generates its list of additional info it wants to know, it sends each of those requests to Honcho and Honcho runs RAG over that personal data store. It uses the returned facts to generate a response for Curation Buddy.

![[honcho_agent.png]]

### Feature Ideas

We'd love to see someone run with and extend this demo. Here are some further Honcho-powered feature ideas beyond today's scope:  

- Personal context informed storage for web content from links  
	- Additionally, based on what you know about the user, what web content can be autonomously harvested and stored proactively for the user?  
	  
- Construct and maintain full fledged user knowledge graphs  
	- Automatic bespoke summaries of links informed by graph  
	  
- Use Honcho to create training examples for [[User State is State of the Art|user-specific curation models]]  
  
- Autonomously generated user newsletters to supplement conversations async  
  
- Social features/intellectual matchmaking  

Further, there's lots of comparable of potential for any reading, media, learning or companionship application. 

If you're interested in building something adjacent to any of this, [hop in our Discord](https://discord.gg/plasticlabs), we'd love to support you.

## The Campfire Problem

We wanted to highlight Honcho's utility in this vertical because it's one where  simultaneously we hear a lot of excitement and a lot of pain points. Clearly many are hungry for more social, better media consumption and digestion solutions, and optimists seem to share the intuition that AI has a role to play here.

We think Honcho and the personal context solutions it provides are the key.

### The Campfire

For most of human history, groups, tribes, nations drank from the same informational tap. In fact, when we see changes in how information flows, we see dramatic corresponding historical effects. Alterations in distribution--writing, printing, browsing, disaster--have altered the balance of power, the minds of billions, the course of civilization.

But the further step of processing that information and the shaping of it into *shared* narratives have played an equally enormous role. Narrative and meaning making are fundamentally social tasks. We still have to decide what to do with information, what it *means*, and we've generally done that with our neighbors.

![[agora_processing.webp]]

Consider the campfires of hunter-gatherers, agoras of classical city-states, churches of medieval Europe, American town squares, national newspapers, mid-century network TV, office park water-coolers, internet forums, blogging sites, social media, *generative* media. 

A majority of these social exercises deal in limited information and distribution. One or a few sources of truth to chew on with your family, friends, and colleagues. Agreed upon reality, collective processing--social instincts satisfied. You can talk to people about the world, it feels good.

But at the end of that list, distribution becomes so radically democratized, that this model of collective processing start to change dramatically.

### The Problem

In the last few decades, this unraveling has been in the acceleration phase of the graph. Sources of information are increasingly atomized, so are the communities that process it. 

As with prior changes to the modes of information distribution and narrative making, the result has been some remarkably positive--if wacky--outcomes. Equalizing individual access and voice is probably not something we want to turn the clock back on.

But we're left with a problem--many of us have gotten so siloed that we genuinely lack any satisfying social outlet for our interests. While wonderful to pursue without bound the full breadth of my specific curiosity...it's kinda lonely. Everyone I might talk to about it is either uninterested, far down their own rabbit hole of bespoke media, or erratically oscillating with miasma of the internet.

![[DALL·E 1950s Living Room (1).webp]]

This isn't a new phenomenon per se, but its scale is novel and undeniable. Having just three network TV stations in the 50s might've lacked the rich diversity of today's informational landscape, but no doubt the collective campfire was burning bright, and you could talk to just about anyone to help you process the world.

But now we must all build our own campfires.

### The Solution 

Generative AI poses more cause for concern. Zero-marginal cost info *generation*  along with current zero barrier distro may be as disruptive as prior revolutions on this axis (perhaps far more). Lots of that proposition is *incredibly* exciting. But we should also expect this to exacerbate The Campfire Problem.

![[Media-Filled Cityscape Scene.webp]]

There's a solution hidden in the latest irritant. It's not just media I can generate on demand, but soon *agents*.  Agents that can get to know me, agents that can curate for me, agents that can be my intellectual companion. 

Now your sense-making silo can be populated with good synthetic neighbors able to help you understand the world, build narratives, make meaning. 

A critical component is a secure and reliable mechanism for this community of agents to get to know you. To reach the high quality UX of human companions sitting across the campfire.

*Enter Honcho.*


[^1]: More on this & our private beta next week (!)