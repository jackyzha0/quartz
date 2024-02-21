When we [[Theory of Mind Is All You Need|first started experimenting]] with user context, we naturally wanted to test whether our LLM apps were learning useful things about users. And also naturally, we did so by making predictions about them.

Since we were operating in a conversational chat paradigm, our first instinct was to try and predict what the user would say next. Two things were immediately apparent: (1) this was really hard, & (2) response predictions weren't very useful. 

We saw some remarkable exceptions, but *reliable* verbatim prediction requires a level of context about the user that simply isn't available right now. We're not sure if it will require context gathering wearables, BMIs, or the network of context sharing apps we're building with [[Honcho; User Context Management for LLM Apps|Honcho]], but we're not there yet. 

Being good at what any person in general might plausibly say is literally what LLMs do. But being perfect at what one individual will say in a singular specific setting is a whole different story. Even lifelong human partners might only experience this a few times a week.

Plus, even when you get it right, what exactly are you supposed to do with it? The fact that's such a narrow reasoning product limits the utility you're able to get out of a single inference. 

So what are models good at predicting that's useful with limited context and local to a single turn of conversation? Well, it turns out they're really good at [imputing internal mental states](https://arxiv.org/abs/2302.02083). That is, they're good at theory of mind predictions--thinking about what you're thinking. A distinctly *[[LLM Metacognition is inference about inference|metacognitive]]* task.

(Why are they good at this? [[LLMs excel at theory of mind because they read|We're glad you asked]].)

Besides just being better at it, letting the model leverage what it knows to make open-ended theory of mind imputation has several distinct advantages over verbatim response prediction:

1. Fault tolerance
	- Theory of mind predictions are often replete with assessments of emotion, desire, belief, value, aesthetic, preference, knowledge, etc. That means they seek to capture a range within a distribution. A slice of user identity.
	- This is much richer than trying (& likely failing) to generate a single point estimate (like in verbatim prediction) and includes more variance. Therefore there's a higher probability you identify something useful by trusting the model to flex its emergent strengths.  

2. Learning
	- That high variance means there's more to be wrong (& right) about. More content = more claims, which means more opportunity to learn. 
	- Being wrong here is a a feature, not a bug; comparing those prediction errors with reality are how you know what you need to understand about the user in the future to get to ground truth.  

3. Interpretability 
	- Knowing what you're right and wrong about exposes more surface area against which to test and understand the efficacy of the model--i.e. how well it knows the user.
	- As we're grounded in the user and theory of mind, we're better able to assess this than if we're simply asking for likely human responses in massive space of language encountered in training.  

4. Actionability
	- The richness of theory of mind predictions give us more to work with *right now*. We can funnel these insights into further inference steps to create UX in better alignment and coherence with user state.
	- Humans make thousands of tiny, subconscious interventions responsive to as many sensory cues & theory of mind predictions all to optimize single social interactions. It pays to know about the internal state of others.
	- Though our lifelong partners from above can't perfectly predict each other's sentences, they can impute each other's state with extremely high-fidelity. The rich context they have on one another translates to as desire to spend most of their time together (good UX).  



