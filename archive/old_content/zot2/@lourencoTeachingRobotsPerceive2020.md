
# Teaching Robots to Perceive Time: A Twofold Learning Approach
Read:: - [x] Lourenco et al. (2020) - Teaching Robots to Perceive Time: A Twofold Learning Approach 🛫2023-11-28 !!2 #rd #citation #todoist
Print::  ✔
Zotero Link:: [Zotero](zotero://select/library/items/CXLNAPL6) 
PDF:: [[Lourenco et al. - 2020 - Teaching Robots to Perceive Time A Twofold Learni.pdf]]
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/JXPZ4SRK/Lourenco%20et%20al.%20-%202020%20-%20Teaching%20Robots%20to%20Perceive%20Time%20A%20Twofold%20Learni.pdf>)
Reading Note::
Web Rip::
url:: https://ieeexplore.ieee.org/document/9278033/

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "lourencoTeachingRobotsPerceive2020" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> The concept of time perception is used to describe the phenomenological experience of time. There is strong evidence that dopaminergic neurons are involved in the timing mechanisms responsible for time perception. The phasic activity of these neurons resembles the behavior of the reward prediction error in temporal-difference learning models. Therefore, these models are used to replicate the neuronal behaviour of the dopamine system and corresponding timing mechanisms. However, time perception has also been shown to be shaped by time estimation mechanisms from external stimuli. In this paper we propose a framework that combines these two principles, in order to provide temporal cognition abilities to intelligent systems such as robots. A time estimator based on observed environmental stimuli is combined with a reinforcement learning approach, using a feature representation called Microstimuli to replicate dopaminergic behaviour. The elapsed time perceived by the robot is estimated by modeling sensor measurements as Gaussian processes to capture the second-order statistics of the natural environment. The proposed framework is evaluated on a simulated robot that performs a temporal discrimination task originally performed by mice. The ability of the robot to replicate the timing mechanisms of the mice is demonstrated by the fact that both exhibit the same ability to classify the duration of intervals.
# Quick Reference

# Top Notes
- Did a quick read of the paper
- Relies on Bayesian understanding
	- Some parts get abstract
- Using input from environment to detect time intervals (how exactly?)
	- Like it observes a stochastic input and figures it from there
- Tries to emulate RPE for TD learning
- 
# Tasks






# Further Reading

> - [ ] [3] S. Soares, B. Atallah, and J. Paton, “Midbrain dopamine neurons control judgment of time,” Science, vol. 354, no. 6317, pp. 1273–1277, 2016  #rd #p5 🛫2023-11-28
> ^DGTNSRX3aJXPZ4SRKp7

> - [ ] [12] M. B. Ahrens and M. Sahani, “Observers exploit stochastic models of sensory change to help judge the passage of time,” Current Biology, vol. 21, no. 3, pp. 200–206, 2011.  #rd #p5 🛫2023-11-28
> ^IC26ADHFaJXPZ4SRKp7

> - [ ] [18] G. E. Uhlenbeck and L. S. Ornstein, “On the theory of the Brownian motion,” Physical Review, vol. 36, no. 5, p. 823, 1930.  #rd #p5 🛫2023-11-28
> ^YHCVJXPKaJXPZ4SRKp7

> - [ ] [19] C. B. Do, “Gaussian processes,” Stanford University, Stanford, CA, vol. 5, p. 2017, 2007.  #rd #p5 🛫2023-11-28
> ^6XAWTRHUaJXPZ4SRKp7

> - [ ] [20] L. Ljung, System Identification: Theory for the User. Prentrice-Hall, New Jersey, 1987.  #rd #p5 🛫2023-11-28
> ^H3PIDNWCaJXPZ4SRKp7

> - [ ] 25] E. A. Ludvig, R. S. Sutton, and E. J. Kehoe, “Stimulus representation and the timing of reward-prediction errors in models of the dopamine system,” Neural computation, vol. 20, no. 12, pp. 3034–3054, 2008.  #rd #p5 🛫2023-11-28
> ^TMC9ZQUVaJXPZ4SRKp7




# Extracted Annotations and Comments

> [!Highlight] Page 6
> 	The observations yt(i) are considered to be the values of the ith angle of the simulated robot’s LIDAR at time t, collected while the robot does the “Wait” action between tones
>     
> ---
> 	If the observations are the value of an angle that is tied to a timed cyclic motion, isn't that just a clock?
> ^8LKNVYHPaJXPZ4SRKp6






# Figures (blue)

> [!Figure 1] 
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/SJE5CE54.png]]
> **Page 2**
> ^SJE5CE54aJXPZ4SRKp2

> Fig. 1. Framework used to replicate the biological estimation of time as a combination of external environmental stimuli and internal neuronal mechanisms as follows. ET) The agent computes an estimate of the elapsed time ˆ τ from environmental observations yt. IT) This estimate is employed in a temporal-difference learning algorithm that replicates internal timing mechanisms: based on the elapsed time estimate ˆ τ and the state st of the environment, the agent computes the Q-values (1) of each state-action pair, performs a corresponding action at (2), and receives a reward rt.
> **Page 2**
> ^KWIHVTQVaJXPZ4SRKp2

> [!]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/KX9LXXPZ.png]]
> **Page 5**
> ^KX9LXXPZaJXPZ4SRKp5

> Fig. 2. Desired state transition, obtained when the optimal action (on the top row) is chosen. After pressing the Start button, the state of the environment changes to Tone and the number of Interval states between the next Tone state is uniformly sampled from the maximum interval length, which is a design variable for each experiment. The agent estimates the number of time steps spent in the Interval state, ˆ τ , and, after the second Tone state, chooses the action Short or Long that corresponds to its estimate. If the correct action is chosen, a positive reward is given to the agent.
> **Page 5**
> ^D7F9R7XXaJXPZ4SRKp5

> [!]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/AWY3PLWJ.png]]
> **Page 5**
> ^AWY3PLWJaJXPZ4SRKp5

> [!]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/DJJNH5JJ.png]]
> **Page 5**
> ^DJJNH5JJaJXPZ4SRKp5

> Fig. 3. Estimated ˆ τ for each interval duration. The mean of the estimated interval almost perfectly matches the ground truth (blue dots), while the standard deviation (faded blue) increases linearly with the interval length. Its linear regression is shown in black. This illustrates the scalar property, a trend also exhibited by humans and animals.
> **Page 5**
> ^T7XIGXA6aJXPZ4SRKp5

> [!]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/8BLUZG6S.png]]
> **Page 6**
> ^8BLUZG6SaJXPZ4SRKp6

> Fig. 4. Analysis of the TD error in different phases of learning. In the three episodes chosen, τ = 2 time steps. As learning occurs, the agent starts expecting a reward after its correct classification of the interval (t = 4). Therefore, the TD error at the end of the episode decreases.
> **Page 6**
> ^NNR9WEB8aJXPZ4SRKp6

> [!]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/53ISLUKT.png]]
> **Page 6**
> ^53ISLUKTaJXPZ4SRKp6

> Fig. 5. Evolution of the Q-values with the interval duration, after training. The time step values correspond to the state numbers from Figure 2, and each line to the Q-value of each action from the same figure. In the top figure, τ = 1 (short interval), and in the bottom one, τ = 8 time steps (long interval).
> **Page 6**
> ^TIQGKZQFaJXPZ4SRKp6






