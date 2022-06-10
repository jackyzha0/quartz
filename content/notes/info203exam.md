# 1

**Lead User:** A user who needs a specific solution that does not already exist. They will often make up their own solution. **For example:** A business who needs a custom app for a new novel idea they have

**Extreme User:** A user who uses an existing solution for its intended purpose, but an extreme degree. **For example:** A person using Microsoft Paint to create a whole animated series (the big lez show)

**Typical User:** A use who uses an existing solution for its intended purpose. To a normal degree. **For example:** Someone using microsoft paint to crop an image and circle an area of the image.

---
# 2

## A
**Independent Variables:**
- Which Webpage is being used
- The peripherals (keyboard and mouse)

**Dependent Variables:**
- Error rate
- Speed
- Usability

## B
**Confounding Variables:**
- Colorblindness
- Typing speed
- Computer familiarity
- Individual mouse accuracy/experience
- Partial Blindness

---
# 3
*A business client has approached you with an application development request involving ==significant user interface work==. Discuss how a ==user-centred iterative design process== would be applied to this job and ==involve all parties (designers, developers, clients, users).== In your discussion you should ==refer to the concepts discussed throughout INFO203.==*

First, brainstorming should be, many various rough ideas should be considered, and existing solutions should be analysed. The personas and scenario of the app should be considered. Then rough low-fidelity prototypes should be created and evaluated until a preferred design is found, and then a high fidelity prototype should be created and evaluated by the users and experts. This should then be redesigned, reimplemented, and re-evaluated iteratively as many times as necessary until a satisfactory result is achieved, and the users, the client are satisfied. 

---
# 4

*What does the term Mental Models describe in the context of human-computer interaction? Illustrate your answer with an example not discussed in the lecture.*

**Description:** Mental models describe how the user thinks the interface works, they are created by experience, metaphors, and analogical reasoning, and are further developed through interaction with the system. Designers often wrongly expect the user's mental model to match theirs. 

**Example:** a User using MS Paint might think that text would be editable after it is saved, when it is actually embedded into the image as pixels. 

---
# 5

*Identify four factors used to select an evaluation method. Explain for each factor how it helps in the selection
*
**Stage In cycle:** (design vs implementation) In the design stage qualitative measures are preferred as only a concept of the design exists which is tested mostly by experts. In the Implementation stage, more quantitative measures are preferred as there is something concrete to be tested, mostly by the users.

**Immediacy of response:**  (real time vs recollection of events) When the response is  a recollection of events, we should use methods  such as interviews, questionnaires etc. When response is real time, we are able to use methods such as participant observations, and usability studies

**Resources required:** This will dictate which type of evaluation you can do. for example, a large scale field study will not be possible with a small budget.

**Type of measurement:** (qual vs quan). This helps by limiting the possible methods. for example, formal models or simulations cannot be used if we need qualitative data, and interviews are more suitable if we need qualitative data.

---
# 6

*==Why== do we apply the ==concept of personas and scenarios== in human-computing interaction? Your answer should include ==what personas and scenarios are== and the possible ==consequences when the concept is not applied== as part of an iterative design process.*

**Personas:** They are a methodology to identify and think about our users and how they will use the software. They help us to avoid not thinking about the users, and with making sure that the members of development don't have different ideas of the users. 

**Scenarios:** They are a concise narrative description of one or more personas using a product to achieve one or more specific goals. They help us to define what the product will do before we design how the product will do it

**Consequences:** Not using the concept of personas and scenarios can lead to the design team not considering the user's needs, and can lead to them designing a product that does not fit the needs of the user, either by including unnecessary bloat functionality or by not including the functionality that the user needs, or both.

---

# 7

*Explain two techniques that allow a designer to get insight into sporadic uses of technology*

**Diaries:** participants are given a diary (journal, video, voice) to complete, and record their experience when they use the interface. It is good to remind the user to complete the diary

**Experience sampling:** Text, calls, calendars, and notification are used to extract feedback from participants at various intervals.

---

# 8

*Explain Fitt's Law and its practical consequences for designing user interfaces.*

**What it is:** Fitt's law says that the time to point to something depends on its size and distance

**Formula:** $MT = C1 + C2\ log_2(2A/W)$ Where C1 and C2 are constants that depend on the device. A is the distance that users have to move and W is the target size.

**Practical Consequences:** From this law we know that:
- buttons and other controls should be of a reasonable size
	- things done more often should a assigned a larger button
	- or closer to the average position of the users' cursor
- edges and corners are easier to reach because they have "infinite" width
- Pie menus are the faster and have a lower error rate than linear menus

---

# 9

*You are in an ==early stage== of developing a new human-computer interface and have ==finished your first prototype==. You would like to ==collect feedback on its usability== despite it ==not being fully functional==. What ==options for running an evaluation do you have? Justify your answer.*==

Since you are in the early stage of development, qualitative measures are preferred and the study should involve more experts and less users. Some good options would be:
- dogfooding: A minimal option that allows to glaring issues to be resolved quickly
- peer critique: A slightly less minimal option that can find other big issues that you may not have considered
- heuristic evaluation: A more detailed option that can go more in depth, and provide more details about what can be improved.

These options are all ideal, as they: dont require a fully functional product, are able to be done quickly, and dont require a large sample of users.

---

# 10

*Name and explain two types of sequencing effects. How can they be mitigated?*

**Ordering effect:** When the order of condition causes an improvement or a decline in the participants ability to perform. For example after the first condition is review, the participant becomes fatigued, or the interface is learned, both affecting the outcome of the second condition
**Carryover Effect:** When each condition somehow interacts and affects the other.

These effects can be mitigated using counterbalancing, or stand down periods. Or the parameters of the experiment can be adjusted to directly address issues such as learning or fatigue by the making the experiments shorter, giving them time to warm up, making the task less intense etc.

---

# 11 

*As our hypothesis let us assume that ==heavy exercising for 30 minutes helps us to remember numbers better than 30 minutes of meditation==. We want to test this hypothesis with a study where people do one of these two activities and then have 5 minutes to memorise as many digits as possible of the number Pi (π = 3.14159265359……).*

## A 
Each user performs each different condition. With this design fewer subjects are required, however sequencing effects are problematic

## B
The subjects are split into equal groups, each which reviews one of the alternatives. With this design more people are required, and it is important to pay attention to fair assignment to groups, as it is possible for one group to be better due to past experience or other biases.

## C
Since it is very likely that some of the participants will have a naturally better memory, or may have memorising pi in the past, there is likely to be bias within the groups. This means it is better to use a within subjects design so that the effect of individual bias can be reduced

---

# 12

*Explain three factors affecting the internal validity and three factors affecting the external validity of a user study. Provide examples to support your answer.*

**Internal:**
- Confounding factors: some participants are better at memorsing things at this affects the comparison between two conditions
- Sample size: the number of participants in the memorisation experiment is too small and it is unclear whether one condition is better or worse than the other
- selection bias:  the participants selected for the experiment 

**External:**
- sampling bias: particpants for the memorisation experiment are all member of a club that practices memorisation
- experimenter effect: the person running the study is loud and intrusive and affects the performance of the participants
- hawthorne effect: the fact the the participants are in a study affects their ability to memorise digits of pi
