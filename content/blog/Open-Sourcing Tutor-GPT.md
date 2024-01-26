---
title: "Open-Sourcing Tutor-GPT"
date: "Jun 2, 2023"
---
![[assets/human_machine_learning.jpeg]]

## TL;DR

Today we’re [open-sourcing](https://github.com/plastic-labs/tutor-gpt) Bloom, our digital [Aristotelian](https://erikhoel.substack.com/p/why-we-stopped-making-einsteins) learning companion.

What makes [Bloom](https://bloombot.ai/) compelling is its ability to _reason pedagogically_ about the learner. That is, it uses dialogue to posit the most educationally-optimal tutoring behavior. Eliciting this from the [capability overhang](https://jack-clark.net/2023/03/21/import-ai-321-open-source-gpt3-giving-away-democracy-to-agi-companies-gpt-4-is-a-political-artifact/) involves multiple chains of [metaprompting](https://arxiv.org/pdf/2102.07350.pdf,) enabling Bloom to construct a nascent, academic [theory of mind](https://arxiv.org/pdf/2304.11490.pdf) for each student.

We’re not seeing this in the explosion of ‘chat-over-content’ tools, most of which fail to capitalize on the enormous latent abilities of LLMs. Even the impressive out-of-the-box capabilities of contemporary models don’t achieve the necessary user intimacy. Infrastructure for that doesn’t exist yet 👀.

Our mission is to facilitate personal, [agentic](https://arxiv.org/pdf/2304.03442.pdf) AI for all. So to that end, we’re (1) releasing Bloom’s architecture into the wild and (2) embarking on a journey to supercharge the kind of empowering generative agents we want to see in the world.

## Neo-Aristotelian Tutoring

Right now, Bloom is a reading comprehension and writing workshop tutor. You can chat with it in [Discord](https://discord.gg/bloombotai). After supplying it a passage, Bloom can coach you toward understanding or revising a piece of text. It does this by treating the user as an equal, prompting and challenging socratically.

We started with reading and writing in natural language because (1) native language acumen is the symbolic system through which all other fluencies are learned, (2) critical dialogue is the ideal vehicle by which to do this, and (3) that's what LLMs are best at right now.

The problem is, most students today don't have the luxury of "talking it out" with an expert interlocutor. But we know that's what works. (Perhaps too) heavily referenced in tech and academia, [Bloom’s 2 sigma problem](https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem) suggests that students tutored 1:1 can perform two standard deviations better than classroom taught peers.

Current compute suggests we can do high-grade 1:1 for two orders of magnitude cheaper marginal cost than your average human tutor. It may well be that industrial education ends up a blip in the history of learning—necessary for scaling edu, but eventually supplanted by a reinvention of Aristotelian models.

![[assets/2 orders magnitude reduced cost.png]]

It's clear generative AI stands a good chance of democratizing this kind of access and attention, but what's less clear are the specifics. It's tough to be an effective teacher that students actually want to learn from. Harder still to let the student guide the experience, yet maintain an elevated discourse.

So how do we create successful learning agents that students will eagerly use without coercion? We think this ability lies latent in foundation models, but the key is eliciting it.

## Eliciting Pedagogical Reasoning

The machine learning community has long sought to uncover the full range of tasks that large language models can be prompted to accomplish on general pre-training alone (the capability overhang). We believe we have discovered one such task: pedagogical reasoning.

Bloom was built and prompted to elicit this specific type of teaching behavior. (The kind laborious for new teachers, but that adept ones learn to do unconsciously.) After each input it revises a user’s real-time academic needs, considers all the information at its disposal, and suggests to itself a framework for constructing the ideal response. ^285105

![[assets/bloombot langchain diagram.png]]

It consists of two “chain” objects from [LangChain](https://python.langchain.com/en/latest/index.html) —a _thought_ and _response_ chain. The _thought_ chain exists to prompt the model to generate a pedagogical thought about the student’s input—e.g. a student’s mental state, learning goals, preferences for the conversation, quality of reasoning, knowledge of the text, etc. The *response* chain takes that _thought_ and generates a response. ^1e01f2

Each chain has a `ConversationSummaryBufferMemory` object summarizing the respective “conversations.” The _thought_ chain summarizes the thoughts into a rank-ordered academic needs list that gains specificity and gets reprioritized with each student input. The _response_ chain summarizes the dialogue in an attempt to avoid circular conversations and record learning progress. ^b1794d

We’re eliciting this behavior from [prompting alone](https://arxiv.org/pdf/2102.07350.pdf). Two of Plastic’s co-founders have extensive experience in education, both in private tutoring and the classroom. They crafted strong example dialogues that sufficiently [demonstrated](https://github.com/plastic-labs/tutor-gpt/tree/main/data) how to respond across a range of situations.

Take for example a situation where the student asks directly for an answer. Here is Bloom’s response compared to [Khanmigo’s](https://www.khanacademy.org/khan-labs):

![[assets/khan.png]]

![[assets/bloom_v_khan.png]]
![[assets/thought.png]]

Khanmigo chides, deflects, and restates the question. Bloom levels with the student as an equal—it’s empathetic, explains _**why**_ this is a worthwhile task, then offers support starting from a different angle…much like a compassionate, effective tutor. And note the thought that also informed its response — an accurate imputation of the student’s mental state.

And Bloom is dynamic, even when given no excerpted context and asked about non-textual material, it’s able to converse naturally about student interest:

![[assets/bloom_courtland.png]]

And its accompanying thoughts:

![[assets/bloom_courtland_thoughts.png]]

Notice how Bloom reasons it should indulge the topic, validate the student, and point toward (but not supply) possible answers. Then the resultant responses do this and more, gently guiding toward a fuller comprehension and higher-fidelity understanding of the music.

Aside from these edgier cases, Bloom shines helping students understand difficult passages (from syntactic to conceptual levels) and giving writing feedback (especially competent at thesis construction). [Take it for a spin](https://discord.gg/udtxycbh).

Ultimately, we hope [open-sourcing Bloom](https://github.com/plastic-labs/tutor-gpt#readme) will allow anyone to run with these elicitations and prompt to expand utility and support multiple domains. We’ll be doing work here too.

## Bloom & Agentic AI

This constitutes the beginning of an approach far superior to just slapping a chatbot UI over a content library that's probably already in the foundation model's pre-training.

After all, if it were just about content delivery, MOOCs would've solved education. We need more than that to reliably grow rare minds. And we're already seeing Bloom excel at promoting synthesis and creative interpretation within its narrow utility.

But to truly give students superpowers and liberate them from the drudgery that much of formal education has become, Bloom needs to go further. Specifically, it needs to both proactively anticipate the needs of the user and execute autonomously against that reasoning.

It needs to excel at theory of mind, the kind of deep psychological modeling that makes for good teachers. In fact, we think that lots of AI tools are running up against this problem too. So what we're building next is infrastructure for multi-agent trustless data exchange. We think this will unlock a host of game-changing additional overhung capabilities across the landscape of artificial intelligence.

If we’re to realize a world where open-source, personalized, and local models are competitive with hegemonic incumbents, one where autonomous agents represent continuous branches of truly extended minds, we need a framework for securely and privately handling the intimate data required to earn this level of trust and agency.
