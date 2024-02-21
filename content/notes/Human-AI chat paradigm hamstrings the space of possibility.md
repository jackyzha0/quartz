The human-AI chat paradigm assumes only two participants in a given interaction. While this is sufficient for conversations directly with un-augmented foundation models, it creates many obstacles when designing more sophisticated cognitive architectures. When you train/fine-tune a language model, you begin to reinforce token distributions that are appropriate to come in between the special tokens denoting human vs AI messages.  

Here's a limited list of things *besides* a direct response we routinely want to generate:

- A 'thought' about how to respond to the user
- A [[Loose theory of mind imputations are superior to verbatim response predictions|theory of mind prediction]] about the user's internal mental state
- A list of ways to improve prediction
- A list of items to search over storage
- A 'plan' for how to approach a problem
- A mock user response
- A [[LLM Metacognition is inference about inference|metacognitive step]] to consider the product of prior inference

In contrast, the current state of inference is akin to immediately blurting out the first thing that comes into your mind--something that humans with practiced aptitude in social cognition rarely do. But this is very hard given the fact that those types of responses don't ever come after the special AI message token. Not very flexible.

We're already anecdotally seeing well-trained completion models follow instructions impressively likely because of incorporation into pretraining. Is chat the next thing to be subsumed by general completion models? Because if so, flexibility in the types of inferences you can make would be very beneficial. 

Metacognition then becomes something you can do at any step in a conversation. Same with instruction following & chat. Maybe this helps push LLMs in a much more general direction.