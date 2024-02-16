## TL;DR

Personalization is the next frontier. OpenAI gets it:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We’re testing ChatGPT&#39;s ability to remember things you discuss to make future chats more helpful. <br><br>This feature is being rolled out to a small portion of Free and Plus users, and it&#39;s easy to turn on or off. <a href="https://t.co/1Tv355oa7V">https://t.co/1Tv355oa7V</a> <a href="https://t.co/BsFinBSTbs">pic.twitter.com/BsFinBSTbs</a></p>&mdash; OpenAI (@OpenAI) <a href="https://twitter.com/OpenAI/status/1757469997742666052?ref_src=twsrc%5Etfw">February 13, 2024</a></blockquote>

Super exciting.

But what about the rest of us?

Welp, we built an open source reimplementation of OpenAI's 'memory' features using [Honcho](https://honcho.dev) to effortlessly organize sessions on a per-user basis 

You can derive facts about users, store them, and retrieve for later use. And we're shipping a demo of this implemented with the useful abstractions LangChain provides.

The user context rabbithole goes deep, this is still just the start.

If you're building with or adjacent to Honcho, [join our Discord](https://discord.gg/plasticlabs), we'd love to help 🫡.

## OpenAI Memories

This week [OpenAI announced](https://openai.com/blog/memory-and-new-controls-for-chatgpt) they're testing memory in ChatGPT. Specifically this means learning about individual users in order to improve their experiences.

It's a limited initial rollout, closed under the hood, and rudimentary, but appears to include functionality for deriving facts about users from conversation history and storing those to augment later generation.

There are features for users to view derived facts (memories), prune them, or turn off the features altogether. User memories are apparently also coming to GPTs.

They're betting, we believe correctly, that the real potential here is a wealth of agents whose behavior is in *high-fidelity with user identity*.

We're pumped to see experiments like this taking place. But what if you're a developer that doesn't want to subscribe to this kind of platform dependency and all its attendant externalities? What if you're a user who wants independent or open source apps with a more mature version of these UX benefits?

## Context is Critical

At [Plastic Labs](https://plasticlabs.ai) our mission is to enable rich user memory in and across every application. Only then will we really understand just how augmentative and transformative these agents can be. We've been laser focused on this problem.

![[laser_eyes_user_soapbox.png]]

Right now, the vast majority of software UX is a 1-to-many experience. What you get as a user is, for the most part, the same as everyone else. Mass production unlocked the remarkable ability to produce the exact same goods for every consumer, then software went further allowing a good to be produced once and consumed with consistent experience millions or billions of times.

AI apps can deal *generatively* with each user on an individual basis, that is, an experience can be produced ad hoc for every user upon every interaction. From 1:many to 1:1 without prohibitive sacrifices in efficiency. But we're still underestimating the full scope of possibility here.

As it stands today the space is mostly focused on the (albeit generative) [[The machine learning industry is too focused on general task performance|1:many tasks LLMs can perform]]. The apps remain more or less stateless with regard to the user. To reach 1:1 nirvana, we need more [[Honcho; User Context Management for LLM Apps|user-centric agent design]]. We need frameworks, mechanisms, services, models dedicated to deep coherence with user identity.

Every agent interaction can be generated just in time for every person, informed by relevant personal context more substantive than human-to-human sessions. User context will enable disposable agents on the fly across verticals for lower marginal cost than 1:many software paradigms.

<iframe width="560" height="315" src="https://www.youtube.com/embed/tTE3xiHw4Js?si=uzUzcSHFfZdjFduX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>  

(*Here's our co-founder [Vince](https://twitter.com/vintrotweets) talking more about some of those possibilities*)

## "Open vs Closed"

We subscribe heavily to the spirt of arguments Harrison Chase made in ["OpenAI's Bet on Cognitive Architecture"](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/) just a few months ago: 

> There’s a great quote from Jeff Bezos that says to [only do what makes your beer taste better](https://blog.weaverse.io/make-your-beer-taste-better?ref=blog.langchain.dev). This refers to early industrial revolution, when breweries were also making their own electricity. A breweries ability to make good beer doesn’t really depend on how differentiated their electricity was - so those that outsourced electricity generation and focused more on brewing jumped to an advantage.
> 
> Is the same true of cognitive architectures? Does having control over your cognitive architecture really make your beer taste better? At the moment, I would argue strongly the answer is yes, for two reasons. First: it’s very difficult to make complex agents actually function. If your application relies on agents working, and getting agents to work is challenging, then almost by definition if you can do that well you’ll have an advantage over your competition. The second reason is that we often see the value of GenAI applications being really closely tied to the performance of the cognitive architecture. A lot of current companies are selling agents for coding, agents for customer support. In those cases, the cognitive architecture IS the product.
> 
> That last reason is also the reason that I find it hard to believe that companies would be willing to lock into a cognitive architecture controlled by a single company. I think this is different form of lock-in than cloud or even LLMs. In those cases, you are using cloud resources and LLMs in order to build or power a particular application. But if a cognitive architecture moves closer and closer to being a full application by itself - you’re unlikely to want to have that locked in.

The same applies to social cognition in LLMs and the key to this is leaning about the user and leveraging that knowledge. If proprietary, vertical-specific cognitive architectures make your beer taste better, then personalizing all that tailors the beer to each and every user. If developers will want to control how their app completes a task, then they'll want control over how it completes a task for each user. And users will want this quality of experience.

We've been saying for while now that major walled gardens and their franchises--e.g. OAI's GPTs, Assistants API, and ChatGPT (+Microsoft?); Meta's social apps; Google's workspace suite; etc--will have myriad ecosystem-native agents all with shared access to your user profile. 

The problem here is twofold: (1) independent apps are left out in the cold wrt user context and personalization capabilities, and (2) users are left with a privacy situation little better than under web2 business models (or potentially [way worse](https://arxiv.org/abs/2310.07298)).

Those profiles are gated and proprietary to each climate controlled garden. Step outside and UX plummets. If the independent and open product communities want to compete, they need individual taste bud-mapping superpowers for their beer production.

And users fare little better, presented with yet another set of pre-packaged pseudo-choices about privacy to manage, none of which give them any real control. More paternalism is not the path to individually aligned agents.

Shouldn't we be able to experiment with all this without platform lock-in, allowing projects to collectively leverage user data for positive sum experiences? Shouldn't users own their AI modeled profiles and be able to carry them between independent agents who respect their policies?

Developers will want control over personalization for their application without all the redundant overhead. Users will want a say in how they're being reasoned about and why.

This is our vision for Honcho.

## Intellectual Respect

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">llms are remarkable empaths<br><br>if you’d read that much fiction, you would be too</p>&mdash; Courtland Leer (@courtlandleer) <a href="https://twitter.com/courtlandleer/status/1753480140850626759?ref_src=twsrc%5Etfw">February 2, 2024</a></blockquote>

Today we're releasing a naive adaptation of [research we published late last year](https://arxiv.org/abs/2310.06983).

There's a ton we plan to unpack and implement there, but the key insight we're highlighting today is affording LLMs the freedom and autonomy to decide what's important.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PbuzqCdY0hg?si=9Ylj3XfY5TF_Jrr3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>  

(*If you want to go deeper into the research, [this webinar we did with LangChain](https://www.youtube.com/watch?v=PbuzqCdY0hg&list=PLuFHBYNxPuzrkVP88FxYH1k7ZL5s7WTC8) is a great place to start, as is [the "Violation of Expectations" chain they implemented](https://js.langchain.com/docs/use_cases/agent_simulations/violation_of_expectations_chain)*)


This release allows you to experiment with several ideas. We feed messages into an inference asking the model to derive facts about the user, we store those insights for later use, then we ask the model to retrieve this context to augment some later generation.

Check out our [LangChain implementation](https://docs.honcho.dev/how-to/personal-memory/simple-user-memory) and [Discord bot demo](https://discord.gg/plasticlabs).

Where things get powerful is in the aggregate. What resolves is a highly insightful picture of who your users are and what they need--a key context reservoir to improve the qualitative and quantitative experience. 

N.b. you can certainly direct the model with as much verbosity as you like, but we've found during extensive experimentation that [[Theory of Mind Is All You Need|the more you trust the model]] the better and more useful the results.

This isn't surprising when you consider how much content about what people are thinking is contained in a model's pretraining. It's led to some really exciting [emergent abilities](https://arxiv.org/abs/2302.02083).

Give the model some trust and respect, and you'll be rewarded.

## Let's Build

If you're experimenting with personalization, building with [Honcho](https://github.com/plastic-labs/honcho), or just interested in these ideas, [join our Discord](https://discord.gg/plasticlabs), and let's jam on what we can build together.

A healthy open ecosystem will include lots of projects trying lots of new ways to synthesize and leverage user context.  We're here to support them all 🥽.

