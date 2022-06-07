# L? Research Design

Research questions

1.  There are two important ingredients to a good research study: a good question, and a good methodology for finding an answer

2.  Question selection

    -  What ideas do you already have for data analysis projects?

    -  What (topic) are you excited / passionate about?

    -  If you had a crystal ball, what would you ask?

    -  What if you had a crystal ball that could answer anything but that? What would you need to ask so that you can figure out your own answer to the main question?

    -  Continue until so narrow you can collect your own data (the more specific, the better)

    -  Given (time and money) budget constraints, your project may need to settle for similar data
		1.  Similar variables
		2. A few observations
		3. "Pilot study": this is often what is done in real world
		4. Proof of concept (consulting sales pitch): can even use fake data

3.  Data mining

    -  Given data (e.g. from a private business, a consulting client, etc.), ask, "what can we learn?" and "who is interested?"

    -  Example: private business data

    -  Typically needs to be paired with research question process above

    -  Example: what would CEO want to know?

Correlation may not mean causation!

1.  Three possibilities

2.  Causation: $X\Rightarrow Y$
 Theory: cell phones $\Rightarrow$ distraction $\Rightarrow$ accidents Policy implication: banning cell phones will reduce car accidents

3.  Reverse causation: $X\Leftarrow Y$
 Not likely in this case (car accidents cause cell phone use?)

4.  Lurking variable: $X\Leftarrow Z\Rightarrow Y$
 Example: careless (teenage?) drivers are prone independently both to use cell phones and (regardless of cell phone use) to get in accidents Policy implication: banning cell phones will not reduce car accidents

5.  Historic instances of conflating correlation with causation

    -  The "Phillips curve" documented a negative correlation between inflation and unemployment, suggesting to policy makers that monetary policy could only avoid one problem by embracing the other. They printed more money in the 1970s, hoping to lower unemployment, but discovered "stagflation": the coincidence of high unemployment and high inflation.

    -  Documenting a positive correlation between on-the-job computer use and income, Krueger (QJE 1993) concluded that computers increase productivity, and recommended policies to increase computer use. Using similar data, however, DiNardo and Pischke (QJE 1997) showed that income is also correlated with pencil use on the job and argued (tongue-in-cheek) that subsidizing pencils would be a much more cost-effective intervention.
    -  Can also conflate lack of correlation with lack of causation: in yesterday's covid example, we derived that $P(\text{vax}) = 5.3*10^{- 5}$ and $P(\text{novax}) =\frac{214}{1,302,912} = 16.4*10^{- 5}$, so vaccine is 68% effective. Correlation of $\text{cv}$ and $\text{vax}$ is negative, but weak. If further condition on age (\<50 vs.\>50):
			1.  $P(vax < 50) =\frac{11}{3,501,118} = .3*10^{- 5}$
 $P(novax < 50) =\frac{43}{1,116,834} = 3.9*10^{- 5}$ Vaccine 92% effective for this group.

ii. $P(vax > 50) =\frac{290}{2,133,516} = 13.6*10^{- 5}$
 $P(novax > 50) =\frac{171}{186,078} = 91.9*10^{- 5}$ Vaccine 85% effective for this group.

iii. If condition further, vaccine efficacy by age:

| Age   | Vaccine efficacy | Age   | Vaccine efficacy |
|-------|------------------|-------|------------------|
| 12-15 | 100%             | 50-59 | 93%              |
| 16-19 | 100%             | 60-69 | 89%              |
| 20-29 | 100%             | 70-79 | 90%              |
| 30-39 | 97%              | 80-89 | 81%              |
| 40-49 | 94%              | 90+   | 92%              |

iv. Biggest determinant of covid is age (overall, 90+ over 1000 times more likely than 12-15 to be hospitalized with covid), not vaccine. Since people of all ages got vaccinated, corr(vax,cv) gets weaker when not conditioning in age than when conditioning on age. But even for oldest groups (where most "breakthrough" cases are occurring), vaccinated do way better than unvaccinated.


-  These examples underscore importance of careful data work, understanding statistics! Good intentions can easily be led astray by statistical subtleties.

Establishing causation (this is most of the work in economics)

1.  Random experiment


-  Best method

-  Example: force group A to drive with cell phone, group B to not

-  Often impractical, ethically and/or logistically (e.g. only one national economy; no control group) or even impossible (e.g. race/gender)

-  Natural experiment: wait for nature to run experiments
	1.  These are rare, might wait a long time
	2. Government policy randomly allocates permits for some drivers to use cell phones.
	3. Angrist and Evans (1998): Does having more children affect mother's income? Lurking variables and reverse causation both likely. But parents whose second child was (randomly) same gender as first child were more likely to have third child, (temporarily) reduced (poor) mother's income
	4. Angrist (1990): What impact (positive or negative) did military service have on men with (randomly) high Vietnam draft numbers had 15% lower incomes years later.
	5.  Clever researchers keep eyes open for natural randomness, ask "what can we learn?"
	6. Sources of randomness: lottery numbers (e.g. gambling, school choice, scarce social program), random executive decisions (e.g. dorm rooms, judge assignment, advertising), weather, earthquakes, accidents, terrorist attacks


2.  Second best: quasi-experiment


-  Example: cell phones legal in one state, illegal in another

-  Problem: other reasons for differential accidents (e.g. speed limits, enforcement, roads, recklessness?)

-  Refinement: large number of states; before/after cell phone law change

-  Pope (1989, BYU): Geneva Steel closed then reopened six months later, concomitant decrease then increase in local hospitalizations for pneumonia, pleurisy, bronchitis, asthma. (Landmark study in air pollution.)

-  Sargeant et al. (2004): Restaurant smoking ban in Montana, repealed after six months. Heart attacks dropped 40%, then went back up.

-  Lee et al. (2004): How does politician (Democrat/Republican) affect policy outcomes? Random election? No. But in close elections (e.g. 48-52% votes), winning or losing was plausibly random.

-  Possible sources of quasi-randomness: cutoffs (e.g. grades, income thresholds, performance thresholds, birth date), bureaucratic decisions that are not literally random but seem arbitrary (e.g. regulatory decisions, tax levels, regularly/tax hike timing, pre-/post-construction project, mission assignment)


3.  Controls


-  Compare sub-populations to "control" for lurking variables

-  Most common method (since others infeasible)

-  Example: compare cell phone use and accidents among teenagers/adults
	1.  Other proxies for recklessness: grades? debt? Often imperfect

-  Econ 378: restrict sample (Econ 388: regressions)

Prediction

1.  If correlation does not reflect causation, $X$ cannot be used to control $Y$, but still can be used to predict $Y$

    -  Example: reduced car insurance premiums for good grades, females, good driving history, yellow cars

    -  Ethics of "statistical discrimination" (e.g. traffic stops for blacks, airport scrutiny for Arabs)

    -  Role of theory is to posit reasons for correlation; essential if anything changes (e.g. cell phones get cheaper).

Research Design for Causal Inference

1.  Many of the topics we're interested in seek to establish cause/effect relationships.

    -  What examples did you come up with? (e.g. Do masks reduce covid spread?)

    -  Were there any topics you came up with that do not involve cause/effect relationships? (Probably not.)

2.  What is a cause/effect relationship you would like to discover?

3.  Which variables might have a simple correlation that suggests the relationship above?

4.  Are there any competing forces that might produce the opposite correlation? If the correlation turns out to be consistent with a hypothesized cause/effect relationship, the hypothesized relationship might outweigh any competing forces.

5.  But are there other mechanisms that could produce the same correlation? If so, finding a correlation where you expected it does not guarantee that the hypothesized cause/effect relationship is valid.

6.  This raises a new question: where could we look for evidence of the hypothesized cause/effect relationship that would not pick up correlations for these other reasons?

7.  This is the key question of research design. Note that you can (and should!) think through and plan out your response to these issues before you ever look at the data.

Research design in the quest for spiritual truth

1.  A friend, skeptical of spiritual things, recommended the following experiment: go to a hospital, pray for people in every other room. See if they recover more quickly/fully than the others. (His prediction: no.) Is this a valid statistical test of the validity of prayer? Why or why not?

2.  Research design is important in answering spiritual questions, too:

    -  What do the scriptures say about experiments to uncover spiritual truth?

    -  "If any of you lack wisdom, let him ask of God, who giveth to all men liberally, and upbraideth not; and it shall be given him. *But let him ask in faith*, nothing wavering." (James 1:5-6, emphasis added)

    -  "And when ye shall receive these things, I would exhort you that ye would ask God, the Eternal Father, in the name of Christ, if these things are not true; and *if ye shall ask with a sincere heart, with real intent, having faith in Christ*, he will manifest the truth of it unto you, by the power of the Holy Ghost." (Moroni 10:4, emphasis added)

    -  "Now, we will compare the word unto a seed. Now, *if ye give place, that a seed may be planted in your heart*, behold, if it be a true seed, or a good seed, *if ye do not cast it out by your unbelief, that ye will resist the Spirit of the Lord*, behold, it will begin to swell within your breasts; and when you feel these swelling motions, ye will begin to say within yourselves---It must needs be that this is a good seed, or that the word is good, for it beginneth to enlarge my soul; yea, it beginneth to enlighten my understanding, yea, it beginneth to be delicious to me." (Alma 32:28, emphasis added)

    -  To me, asking in faith means an honest willingness to follow the promptings received. If I don't honestly intend to follow impressions that are given, the experiment is void.

    -  "If any man will *do his will*, he shall know of the doctrine, whether it be of God, or whether I speak of myself." (John 7:17, emphasis added)

    -  Mission friend: finally prayed about the Book of Mormon but "nothing happened". Zone leader: real intent might mean praying more than once. After continued prayer, he received confirming witness.