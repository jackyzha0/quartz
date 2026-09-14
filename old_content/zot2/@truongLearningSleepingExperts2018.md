
# Learning From Sleeping Experts: Rewarding Informative, Available, and Accurate Experts
Read:: - [ ] Truong et al. (2018) - Learning From Sleeping Experts: Rewarding Informative, Available, and Accurate Experts 🛫2023-10-19 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/R6D4JGEB) 
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage_new/ACM%20Transactions%20on%20Design%20Automation%20of%20Electronic%20Systems_2018/Truong%20et%20al_2018_Learning%20From%20Sleeping%20Experts.pdf>)
Reading Note::
Web Rip::
url:: https://dl.acm.org/doi/10.1145/3236617

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "truongLearningSleepingExperts2018" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> We consider a generalized model of learning from expert advice in which experts could abstain from participating at some rounds. Our proposed online algorithm falls into the class of weighted average predictors and uses a time-varying multiplicative weight update rule. This update rule changes the weight of an expert based on his or her relative performance compared to the average performance of available experts at the current round. This makes the algorithm suitable for recommendation systems in the presence of an adversary with many potential applications in the new emerging area of the Internet of Things. We prove the convergence of our algorithm to the best expert, defined in terms of both availability and accuracy, in the stochastic setting. In particular, we show the applicability of our definition of best expert through convergence analysis of another well-known algorithm in this setting. Finally, through simulation results on synthetic and real datasets, we justify the out-performance of our proposed algorithms compared to the existing ones in the literature.

# Quick Reference

# Top Notes
So I was trying to find work descended from [[old_content/zot2/@littlestoneWeightedMajorityAlgorithm1994]] but I’m really not certain if any of it is related to my SBFA project.

This one seemed to have some sort of temporal element to it

# Extracts
> However, in the stochastic setting, Kleinberg et al. (2008) proposed a “Follow the Awake Leader” strategy in which the algorithm chooses at one round the best expert among available ones to follow. At each round, the best expert is defined by the one obtaining the best average performance over his or her votes until that round. They obtained a nearly optimal bound up to a logarithmic factor. Compared to our algorithm, theirs does not directly address the adversarial settings mentioned above. Truong et al. proved that the algorithm in Freund et al. (1997) asymptotically converges to the best expert (if there exists only one such expert) defined by product of his or her accuracy and availability (Truong et al. 2011).

> In this article, we devise a learning algorithm that penalizes the informative experts who have a sparse voting pattern. The rationale behind this is to eliminate adversarial scenarios where experts intentionally vote in a safe way to earn enough credit from the system and then sabotage the system subsequently. In other words, voting only for the easy items (say, a movie everyone agrees is great) and avoiding to vote for the difficult ones should not qualify one as the best expert. In fact, the effect of such adversarial predictions in practical applications such as the Internet of Things is even more pronounced as it is described in the following examples: • Movies recommendation: People have been recently living in smart homes where they are recommended to a set of good movies whenever their televisions are turned on. A movie is recommended if it obtains high ratings from those users (experts) who are trustworthy in the recommendation system. Consider the case when an adversary attempts to drive local residents in a specific area to watch some specific movie to increase audience attention, sell more ads, or for a certain political incentive. This adversary can indirectly influence the recommendations of the experts through social media such as Twitter (Asur and Huberman 2010), text review of movie critics (Joshi et al. 2010), or news analysis (Zhang and Skiena 2009). The adversary’s goal is to manipulate the expert’s voting in such a way that they can get high trust from the system on a few objects and then mispredict on the target movies. • Commute routes recommendation: With the fast development of smart vehicles, drivers get updated route information for their commute using GPS or other application devices (see, e.g., Liu et al. (2014) for a real-time route recommendation system). Consider an adversary who attempts to cause traffic at a specific area. By manipulating the received signals of a set of designated GPS applications (experts in our setting), the adversary can deceitfully recommend that the drivers should commute on the same road at a certain time of the day. Such attack was foreseen from Arnott et al. (1991) where the authors used the term “imperfect information.” • Byzantine attack on wireless sensor network: Nowadays, smart buildings (or tree houses) have been equipped with a set of sensors (experts) to collect the temperature of the surrounding environment to intelligently adjust it to comfort their residents. Those sensors send the information back to a centralized system that, after calculating the average temperature, makes a decision on how the temperature must change. Now if an adversary attempts to intrude those sensors, it can significantly change the temperature of the building, hence affecting people (trees) inside the smart building (tree house). One example of this kind of attack is a Byzantine attack, whose effects have been investigated by Agrawal et al. (2011), Vempaty et al. (2013), and Vempaty et al. (2012)

^adqmqt
# Tasks
























