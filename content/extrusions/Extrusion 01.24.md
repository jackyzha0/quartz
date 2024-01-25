Welcome to the inaugural edition of Plastic Labs' "Extrusions," a monthly prose-form synthesis of what we've been chewing on. 

This first one will be a standard new year recap/roadmap to get everyone up to speed, but after that, we'll try to eschew traditional formats. 

No one needs another newsletter, so we'll work to make these worthwhile. Expect them to be densely linked glimpses into the thought-space of our organization. And if you like, [you can engage with the ideas directly](https://github.com/plastic-labs/blog) on GitHub.

## 2023 Recap

Last year was wild. We started as an edtech company and ended as anything but. There's a deep dive on some of the conceptual lore in last week's "[[Honcho; User Context Management for LLM Apps|Honcho: User Context Management for LLM Apps]]":

>[Plastic Labs](https://plasticlabs.ai) was conceived as a research group exploring the intersection of education and emerging technology...with the advent of ChatGPT...we shifted our focus to large language models...we set out to build a non-skeuomorphic, AI-native tutor that put users first...our [[Open-Sourcing Tutor-GPT|experimental tutor]], Bloom, [[Theory-of-Mind Is All You Need|was remarkably effective]]--for thousands of users during the 9 months we hosted it for free...

Building a production-grade, user-centric AI application, then giving it nascent [theory of mind](https://arxiv.org/pdf/2304.11490.pdf) and [[Metacognition in LLMs is inference about inference|metacognition]], made it glaringly obvious to us that social cognition in LLMs was both under-explored and under-leveraged.

We pivoted to address this hole in the stack and build the user context management solution agent developers need to truly give their users superpowers. Plastic applied and was accepted to [Betaworks](https://www.betaworks.com/)' [AI Camp: Augment](https://techcrunch.com/2023/08/30/betaworks-goes-all-in-on-augmentative-ai-in-latest-camp-cohort-were-rabidly-interested/?guccounter=1):

<iframe src="https://player.vimeo.com/video/868985592?h=deff771ffe&color=F6F5F2&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

We spent camp in a research cycle, then [published pre-print](https://arxiv.org/abs/2310.06983) showing it's possible to enhance LLM theory of mind ability with [predictive coding-inspired](https://js.langchain.com/docs/use_cases/agent_simulations/violation_of_expectations_chain) [metaprompting](https://arxiv.org/abs/2102.07350).

<iframe width="560" height="315" src="https://www.youtube.com/embed/PbuzqCdY0hg?si=OSujtqg44AK3y_W-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Then it was back to building.

## 2024 Roadmap

2024 will be the year of Honcho.

![[honcho logo and text.png]]

Last week [[Honcho; User Context Management for LLM Apps|we released]] the...

 >...first iteration of [[Honcho name lore|Honcho]], our project to re-define LLM application development through user context management. At this nascent stage, you can think of it as an open-source version of the OpenAI Assistants API.  Honcho is a REST API that defines a storage schema to seamlessly manage your application's data on a per-user basis. It ships with a Python SDK which [you can read more about how to use here](https://github.com/plastic-labs/honcho/blob/main/README.md).

And coming up, you can expect a lot more:

- Next we'll drop a fresh paradigm for constructing agent cognitive architectures with users at the center, replete with cookbooks, integrations, and examples  

- After that, we've got some dev viz tooling in the works to allow quick grokking of all the inferences and context at play in a conversation, and visualization and manipulation of entire agent architectures--as well as swap and compare the performance of custom cognition across the landscape of models  

- Finally, we'll bundle the most useful of all this into an opinionated offering of managed, hosted services  

## Keep in Touch

Thanks for reading.

You can find is on [X/Twitter](https://twitter.com/plastic_labs), but we'd really like to see you in our [Discord](https://discord.gg/plasticlabs) 🫡.