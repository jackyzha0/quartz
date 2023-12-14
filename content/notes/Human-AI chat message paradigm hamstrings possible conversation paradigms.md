TL;DR: they aren't very flexible for intermediate metacognition steps

It's interesting that the machine learning community has decided to converge on this training paradigm because it assumes only two participants in a conversation. Just thinking intuitively about what happens when you train/fine-tune a language model, you being to reinforce token distributions that are appropriate to come in between the special tokens denoting human vs AI messages. 

The issue we see here is that oftentimes there are a lot of intermediate reasoning steps you want to take in order to serve a more socially-aware answer. It's almost like the current state of inference is the equivalent of saying the first thing that comes to mind --  the quickness of one's wit can vary, but usually we think for a second before responding. We saw the advantages of doing this with Bloom (see [[Theory-of-Mind Is All You Need]]) and continue to be interested in exploring how much better this can get. 

In order to assess its efficacy in this regard, I usually want to prompt it to generate as if it were the user -- which is usually very hard given the fact that those types of responses don't ever come after the special AI message token.

We're already anecdotally seeing very well-trained completion models follow instructions well likely because of its incorporation in their pre-training. Is chat the next thing to be subsumed by general completion models? Because if so, flexibility in the types of inferences you can make would be very beneficial. Metacognition becomes something you can do at any step in a conversation. Same with instruction following and chat. Maybe this is what starts to move language models in a much more general direction.
