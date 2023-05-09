---
title: "18-context"
tags: 
- info305
- lecture
---

Context
- Defining Context: 
- Context-aware computing (Schilit and Theimer, 1994) Software that “adapts according to its location of use, the collection of nearby people and objects, as well as changes to those objects over time” 
- Context (Dey, 2001) “Context is any information that can be used to characterize the situation of an entity. An entity is a person, place or object that is considered relevant to the interaction between a user and an application, including the user and applications themselves, and by extension, the environment the user and applications are embedded in.”


Context
- Active Artifacts / Context-aware artifacts 
	- Determine activity where it occurs 
	- Add “self perception” to everyday things 
	- Communicate their own state 
	- The artifact digitally “supports” its own applications 
- Example: MediaCup 
	- http://mediacup.teco.edu 
- Assume MediaCup should be able to discriminate 
	- Informal meeting 
	- Presentation Coffee break 
	- Working alone 
- What sensors? How to represent the situation?

> [!INFO] giving self-perception to objects.

Context
- Context 
	- Where you are, who you are with, what resources are nearby 
	- Information about the user, the user’s environment, the device’s context of use 
- User’s context changes rapidly when mobile 
	- User interacts with many devices, people, objects, and places 
- Context-aware applications 
	- Capture and retrieve context information 
	- Adapt to the user’s context 
	- Reduce need for explicit user input 
	- Are better integrated with user’s environment and activity

![Context|300](https://i.imgur.com/0hJZQGU.png)

> [!INFO] resources example: availablility of wifi (auto switch to use wifi not cell). food in fridge. 
> [!INFO] problem: user context changes a lot very quickly. 

- Context Sources: 
	- Factors to which a system can adapt 
	- Context sources address the question “Adapt the system based on what”? 
- Context Controllers: 
	- Context controller targets the question “How to adapt?” 
	- Identifies how the adaptation is implemented: 
	- Implicitly through the system (adaptivity) 
	- Explicitly through user input (adaptability). 
- Context Targets: 
	- Include the context factors to which a system can adapt. 
	- Context targets address the question “What is adapted”?

> [!INFO] sources: what is the cause of the change
> controller: how do we make the change
> target: what do we change

> [!INFO] .e.g, rotate phone; based on accelerometer, using the code, change the orientation of the display
> e.g., connect to uni wifii: detect wifi and detect access, using wifi protocols, connect to the closest/best wifi
> e.g., activity tracker - track cycling: using gps and accel, detect the acitivity of the user using code, put information on the activity app

- Context Sources: 
	- Current location 
	- Location history 
	- Orientation 
	- Speed 
	- Time of day 
	- Day of week 
	- llumination 
	- Noise level 
	- Temperature Context 
	- Network availability 
	- Network bandwidth 
	- Remaining battery life 
	- Device movements 
	- Dialogue history 
	- User’s activity & schedule 
	- User’s mood 
	- Group constellation 
	- Number of people around

![Example (in the context of Augmented Reality systems):|300](https://i.imgur.com/gMlKoVl.png)
![Example|300](https://i.imgur.com/hyPLVii.png)


- Example: 
	- Context Profiles: 
		- Hand. When the user holds the phone in her/his hand, the audio alarm is not needed. The phone rings by vibrating. 
		- Table. Here we assume a meeting situation. The phone is almost silent. Incoming call is indicated by a very gentle sound. 
		- Silent (pager). Phone is silent. Here we assume that the phone is put a way in a box or suitcase, and must be silent. The phone still receives calls, so that the callers' numbers can be recalled later. 
		- Outside. Here the ring volume goes as high as possible and vibra-alarm is on. All possible ways to get the users attention are used. 
		- General. General mode is used when none of the above apply.

![|300](https://i.imgur.com/2kQUKwH.png)
![|300](https://i.imgur.com/m8qN7t5.png)


- Techniques in Context-Aware Computing: 
	- Proximate selection 
		- E.g., list nearest printer first 
	- Automatic contextual reconfiguration 
		- E.g., share nearby electronic whiteboard automatically 
	- Contextual information and commands 
		- Commands with different meanings in different contexts 
		- Command only in certain contexts 
	- Context-triggered actions 
		- Condition-action rules

![Proxemic Interaction: Designing for a Proximity and Orientation-Aware Environment|300](https://i.imgur.com/xrPgIXg.png)
![Proxemic Interaction: Designing for a Proximity and Orientation-Aware Environment|300](https://i.imgur.com/kEILi6u.png)
![Proxemic Interaction: Designing for a Proximity and Orientation-Aware Environment|300](https://i.imgur.com/Bs6aS1u.png)

Context Challenges
	- Usability Risks for Mobile Context-Aware Applications 
	- Uncertainty in context recognition 
	- Information overflow 
	- Lack of user control 
	- Application complexity 
	- Privacy violations 
	- Subjective understanding of context attributes 
	- Lack of common agreed ontologies 
	- Imbalance between automatic and user-initiated actions 
	- Poor interoperability

- Design Guidelines for Mobile Context-Aware Applications 
	- Select appropriate level of automation depending on level of uncertainty 
	- Ensure user control 
	- Avoid unnecessary interruptions 
	- Intrusive, distract, but can have high value 
	- Avoid information overflow 
	- Appropriate visibility level of system status 
	- Personalization for individual needs 
	- Secure user’s privacy 
	- Take into account the impact of social context