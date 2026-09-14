

# Reward-based training of recurrent neural networks for cognitive and value-based tasks
Read:: 
Print::  ❌
Zotero Link:: NA
PDF:: NA
Files:: [Song et al. - 2017 - Reward-based training of recurrent neural networks.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/LDX4XI5M/Song%20et%20al.%20-%202017%20-%20Reward-based%20training%20of%20recurrent%20neural%20networks.pdf)
Reading Note:: [[H Francis Song, Guangyu R Yang, Xiao-Jing Wang 2017]]
Web Rip:: 

# Abstract
Trained neural network models, which exhibit features of neural activity recorded from behaving animals, may provide insights into the circuit mechanisms of cognitive functions through systematic analysis of network activity and connectivity. However, in contrast to the graded error signals commonly used to train networks through supervised learning, animals learn from reward feedback on definite actions through reinforcement learning. Reward maximization is particularly relevant when optimal behavior depends on an animal’s internal judgment of confidence or subjective preferences. Here, we implement reward-based training of recurrent neural networks in which a value network guides learning by using the activity of the decision network to predict future reward. We show that such models capture behavioral and electrophysiological findings from well-known experimental paradigms. Our work provides a unified framework for investigating diverse cognitive and value-based computations, and predicts a role for value representation that is essential for learning, but not executing, a task.
          , 
            A major goal in neuroscience is to understand the relationship between an animal’s behavior and how this is encoded in the brain. Therefore, a typical experiment involves training an animal to perform a task and recording the activity of its neurons – brain cells – while the animal carries out the task. To complement these experimental results, researchers “train” artificial neural networks – simplified mathematical models of the brain that consist of simple neuron-like units – to simulate the same tasks on a computer. Unlike real brains, artificial neural networks provide complete access to the “neural circuits” responsible for a behavior, offering a way to study and manipulate the behavior in the circuit.
            One open issue about this approach has been the way in which the artificial networks are trained. In a process known as reinforcement learning, animals learn from rewards (such as juice) that they receive when they choose actions that lead to the successful completion of a task. By contrast, the artificial networks are explicitly told the correct action. In addition to differing from how animals learn, this limits the types of behavior that can be studied using artificial neural networks.
            Recent advances in the field of machine learning that combine reinforcement learning with artificial neural networks have now allowed Song et al. to train artificial networks to perform tasks in a way that mimics the way that animals learn. The networks consisted of two parts: a “decision network” that uses sensory information to select actions that lead to the greatest reward, and a “value network” that predicts how rewarding an action will be. Song et al. found that the resulting artificial “brain activity” closely resembled the activity found in the brains of animals, confirming that this method of training artificial neural networks may be a useful tool for neuroscientists who study the relationship between brains and behavior.
            The training method explored by Song et al. represents only one step forward in developing artificial neural networks that resemble the real brain. In particular, neural networks modify connections between units in a vastly different way to the methods used by biological brains to alter the connections between neurons. Future work will be needed to bridge this gap.

# Quick Reference


# Top Comments


# Topics


# Tasks


--
# Extracted Annotations and Comments