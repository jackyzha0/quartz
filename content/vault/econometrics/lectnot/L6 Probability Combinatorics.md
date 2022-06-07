# L6 Probability, Combinatorics (WMS 2.1-6)

1.  How many have already collected data? How many know what data to collect?

2.  Spiritual thought: many of our greatest priorities are not time sensitive, so it's easy to procrastinate till "later", but often this postpones blessings. Let your daily activities match your eternal priorities! (e.g. Don't delay repentance, marriage/children, promptings, family history, making life plans, for movies/hobbies or even school/work)

3.  Probability

    -  Language of uncertainty

    -  Economic applications: risk/insurance, investments, shopping/learning

    -  Data analysis (huge): infer population characteristics from sample

    -  Fundamentally, probability is merely ratio

    -  Sample space / Universe $S =\{ 1,2,3,4,5,6\}$

    -  Subset / Event
		1.  $B =\{ 4,5,6\}$
		2. $E =\{ 2,4,6\}$

    -  Probability function $P(E) =\frac{n_{E}}{n_{S}} =\frac{3}{6}$
		1.  A function is like a machine; in this case, output is number but input is set
		2. $P(S) = 1$

    -  Categorical descriptions: 50/500 unemployed = 10% unemployment rate / probability

4.  Set Notation

    -  Element
		1.  $5\in B$, $5\notin E$

    -  Subset
		1.  $B\subseteq S$

    -  Empty set $\varnothing$

    -  Complement
		1.  $\bar B=\{ 1,2,3\}$
		2. $\bar E=\{ 1,3,5\}$
		3. $P(\bar{E}) = 1 - P(\bar{E})$
		4. Note: this is a simple but useful tool. Sometimes it's easier to derive $P(\bar{E})$ than to derive $P(E)$. For example: the probability that two or more students in Econ 378 share birthdays is very difficult to find directly, but the complementary event (i.e. that no two students share a birthday) is not as bad.

    -  Intersection ("and")
		1.  $B\cap E=\{4,6\}$
		2. $\bar B \cap \bar E=\{1,3\}$

    -  Union ("or", "at least one")
		1.  $B\cup E =\{ 2,4,5,6\}$
		2. $\bar B\cup \bar E=\{ 1,2,3,5\}$

    -  Mutually exclusive
		1.  $A\cap B =\varnothing$
		2. $P(A\cap B) = 0$

    -  Collectively exhaustive
		1.  $A\cup B = S$
		2. $P(A\cup B) = 1$

5.  Total probability: $P(A\cup B) = P(A) + P(B) - P(A\cap B)$

    -  Including both $P(A)$ and $P(B)$ "double counts" $P(A\cap B)$

    -  Example: among set $S$ of workers in particular industry, unemployment rate $P(U) = .10$, women $P(W) = .25$, intersection $P(U\cap W) = .05$; $P(U\cup W) = .1 + .25 - .05 = .3$

6.  Independence: $P(A\cap B) = P(A)P(B)$

    -  Example: $P(U)P(W) =(.10)(.25) = .025\neq .05 = P(U\cap W)$

    -  Not the same as mutually exclusive! (Mutually exclusive events are highly negatively correlated)

7.  Combinatorics

    -  "$\text{mn}$ rule"
		1.  6 pants (2 brown), 10 shirts (3 green); probability that random outfit consists of brown pants and green shirt is $P(B\cap G) =\frac{\#\{ B\cap Goutfits\}}{\#\{\text{outfits}\}} =\frac{2\cdot 3}{6\cdot 10} = .1$
		2. Equivalently, since independent, $P(B\cap G) = P(B)P(G) =\frac{2}{6}\cdot\frac{3}{10} = .1$

    -  Number of ways to permute (i.e. order) 10 students: $10!\approx 3.6\ million$

    -  Number of ways to choose 3 out of 10 students: $C_{3}^{10} =(103) =\frac{10!}{3!7!} = 120$
		1.  Numerator: there are $10!$ ways to order the 10 students
		2. Denominator: but this double-counts ($3!7!$ times) orderings which shuffle the first three and last seven, but don't change the identity of the chosen three

    -  Number of ways to assign 10 students into bins of 3, 5, 2: $\frac{10!}{3!5!2!} = 2,520$

8.  Applications: discrimination lawsuit after 9 workers (3 immigrants, 6 natives) assigned to 4 dangerous jobs + 5 safe jobs

    -  All 3 immigrants assigned to dangerous jobs
		1.  $P(E) =\frac{n_{E}}{n_{S}} =\frac{C_{3}^{3}\times C_{1}^{6}}{C_{4}^{9}} =\frac{(\frac{3!}{3!0!})(\frac{6!}{1!5!})}{\frac{9!}{4!5!}} =\frac{6}{(\frac{9\cdot 8\cdot 7\cdot 6}{4\cdot 3\cdot 2\cdot 1})} =\frac{1}{21}\approx 0.05$
		2. Alternatively, can think sequentially: $\frac{4}{9}\cdot\frac{3}{8}\cdot\frac{2}{7} =\frac{1}{21}$
		3. Alternatively, can assign workers to safe jobs: $P(E) =\frac{n_{E}}{n_{S}} =\frac{C_{0}^{3}\times C_{5}^{6}}{C_{5}^{9}}\approx 0.05$
		4. Alternatively, can assign jobs to workers: $P(E) =\frac{C_{3}^{4}C_{0}^{5}}{C_{3}^{9}}\approx 0.05$

    -  2 out of 3 immigrants assigned to dangerous jobs
		1.  $P(2) =\frac{n_{E}}{n_{S}} =\frac{(C_{2}^{3}\times C_{2}^{6})}{C_{4}^{9}} =\frac{(\frac{3!}{2!1!})(\frac{6!}{2!4!})}{\frac{9!}{4!5!}} =\frac{3(\frac{6\cdot 5}{2\cdot 1})}{(\frac{9\cdot 8\cdot 7\cdot 6}{4\cdot 3\cdot 2\cdot 1})} =\frac{5}{14}\approx 0.36$
		2. $P(E) = P(2) + P(3)\approx 0.36 + 0.05 = 0.41$

    -  24 workers assigned to 10 safe and 14 dangerous jobs, lawsuit because 6 immigrants all assigned dangerous job
		1.  $P(E_{1}) =\frac{n_{E}}{n_{S}} =\frac{C_{8}^{18}C_{6}^{6}}{C_{14}^{24}} =\frac{\frac{18!}{8!10!}\frac{6!}{6!0!}}{\frac{24!}{14!10!}} =\frac{18!14!}{8!24!}\approx .022$
		2. $\frac{C_{6}^{14}C_{0}^{10}}{C_{6}^{24}} =\frac{\frac{14!}{6!8!}\frac{10!}{0!10!}}{\frac{24!}{6!18!}} =\frac{14!18!}{8!24!}\approx .022$
		3. If 5 out of 6 assigned dangerous job: $P(E_{2}) =\frac{C_{9}^{18}C_{5}^{6}}{C_{14}^{24}} =\frac{\frac{18!}{9!9!}\frac{6!}{5!1!}}{\frac{24!}{14!10!}} =\frac{18!14!10\bullet 6}{24!9!}\approx .149$, $P(E)\approx .022 + .149 = .171$