## TL;DR
LLM apps can embrace the complexity and plasticity of human identity to deliver unparalleled personalization.

We're introducing a framework for modeling your users automatically and dynamically.

All of us adopt different personas in different contexts--with [Honcho](https://honcho.dev) you can learn these `user_states` so your app can better meet user need in every moment.

## Fleet of Theseus

A key feature of our minds is the feeling of a persistent, unitary identity. Entire religions and philosophical movements have been spawned just to jailbreak this experience.

As they all point out, identity is *way* more complicated than you think.

While we perceive psychological continuity across contexts and time, closer inspection reveals a network of branching and diachronic identities. We adopt varied personas and play different characters in diverse settings, and we refine, optimize, and evolve that quiver of selves throughout our lives.

In short, it's messy. Or, rather, elegant emergent complexity. 

Each human self isn't just one mythical [Ship of Theseus](https://en.wikipedia.org/wiki/Ship_of_Theseus)--planks being replaced one by one over slow years--but a fleet of them, all with full, manual and autonomous CRUD operations.

## Digital Twins Are Naïve

So what does this mean for the problem of good UX (and alignment) in AI? If each individual is vastly complex and the industry hopes to scale to billions of users, we have a daunting task.

The knee jerk reaction to this level of understanding is to assume the problem intractable. How can we possibly represent, much less simulate something so enormous? Better to focus on [[Machine learning is fixated on task performance|optimizing general tasks]] like in traditional software paradigms, then serve that homogenized experience to every user (never mind missing the [[LLMs excel at theory of mind because they read|non-skeuomorphic opportunities]], we'll get to them...at some point...if they're not mirages).

Besides, surely mapping the full breadth of user identity requires much more compute and storage even than the massive AI hardware buildouts now getting underway. We're drifting into absurd [Borges-like territory](https://en.wikipedia.org/wiki/On_Exactitude_in_Science) imagining maps the size of the land they seek to represent. And didn't [Laplace (eventually) show us](https://en.wikipedia.org/wiki/Laplace%27s_demon) that demons like this are hopelessly naive?

![[escher_honcho.png]]
([*Escher](https://en.wikipedia.org/wiki/Hand_with_Reflecting_Sphere) gets it*...)
## Matryoshka Representation

So is representing user identity for LLM apps a problem of [computational irreducibility](https://en.wikipedia.org/wiki/Computational_irreducibility)--no shortcuts, full simulation required?

We think not.

### Social Simulacra

Consider the social cognition and theory of mind involved in getting to know someone. At first, you have no idea who tf they are or how they'll behave. You're on high alert. You (basally or consciously) notice and interpret tons of data points, you'll likely have vivid memories of these early interactions.

What's happening is your brain is constructing a model of the other person--a compressed representation. Early on, this model is pretty much the same as your model for people *like* them--a/s/l, how they look, how they dress: stereotypes. But the more data your brain gets, the more this model starts to diverge, a representational meiosis.

Pretty soon you've got a full fledged simulacra of that human living rent free in your brain (you can even talk to it!). You cease to store and recall so much of each interaction as this model gets asymptotically higher-fidelity. It's better at predicting behavior, which throws less errors, and so requires less updating of weights.

In a chicken and egg situation, you're now spending more time with this person. You start to notice divergence in your monolithic model. It further divides to capture and predict how they are when they're angry, sad, excited, drunk; at work, with family, with high school or college friends. In some of these *states*, they're a completely different person.

Your mind is now host to a compression of the fleet of Theseus that constitutes the elements of their identity you've had first, second, third, -hand access to.

### Meta-methods

> The second general point to be learned from [the bitter lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) is that the actual contents of minds are tremendously, irredeemably complex; we should stop trying to find simple ways to think about the contents of minds, such as simple ways to think about space, objects, multiple agents, or symmetries. All these are part of the arbitrary, intrinsically-complex, outside world. They are not what should be built in, as their complexity is endless; instead we should build in only the meta-methods that can find and capture this arbitrary complexity. Essential to these methods is that they can find good approximations, but the search for them should be by our methods, not by us. We want AI agents that can discover like we can, not which contain what we have discovered. Building in our discoveries only makes it harder to see how the discovering process can be done.[^1]

Now let's consider the nested representation needed to construct LLMs, and its relationship to social cognition.

Reality is apparently [very weird](https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad/). Our senses only capture a pitiful sliver of it. A slice of the sliver is compressed to create a set of world models that give you the predictive ability to function in your environment.

Among other things, humans have taken to using those models to create *generative* output--our art, literature, science, media. And in the few thousand years we've been busy with this, we've also trained new (local wetware) models on that synthetic data and generated still more output.

Then we threw a slice of that corpus up onto a collective brain, just to ratchet things up real good. And from there we harvested a sliver of that collective representation and used it to train large language models, which themselves produce libraries of generative output for more training.

Do you notice the similarity? Is the language model a fundamentally different *kind of thing* than the many-headed simulacra of your friend? One runs on a wetware substrate and one on a GPU, but both are compressions of slivers of reality that produce predictions of remarkably high-fidelity. Why shouldn't LLMs be able to embrace the complexity of modeling users? Is the LLM a fundamentally different kind of thing than the predictive and modeling capacities of your brain?

Leaving aside the physics and biology, at this *computational and philosophical* level, again, we think not. At least not in a way that would limit the project of capturing the complexity of human identity with an LLM. In fact, the similarities mean precisely that it is possible. [Sora](https://openai.com/research/video-generation-models-as-world-simulators) doesn't need a physics engine, [NeRF](https://en.wikipedia.org/wiki/Neural_radiance_field) doesn't need a Borgean map. Much of the LLM training corpus [[LLMs excel at theory of mind because they read|includes narration]] about human identity, we're a social species, after all...our synthetic progeny can be social too.

Because LLMs are [simulators](https://generative.ink/posts/simulators/), they can wear many masks. They have something like [world models](https://arxiv.org/abs/2310.02207) *and* [theory of mind](https://arxiv.org/abs/2302.02083). Hell, they're perfectly suited to the task of modeling and predicting the intricacies of human identity.

We can (and should) even allow them the agency to decide what elements of our identities and typical states to model and how to auto-optimize around them. We don't need full brain scans here, we just need to give them the right meta-methods.

![[honcho_shoggoth.png]]
(*We don't want one [shoggoth](https://x.com/TetraspaceWest/status/1625264347122466819?s=20) mask per app, or one per user, but as many as each human's identity is complex*)

## A DSPy Demo for Honcho

OK but what sorts of `user_states` are we talking about?



## 

why

mirror neurons
use cases
improved UX


---
[^1]: Sutton. ["The Bitter Lesson."](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) 2019.