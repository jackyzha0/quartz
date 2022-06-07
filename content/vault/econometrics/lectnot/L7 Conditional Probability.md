# L7 Conditional Probability (WMS 2.7-10)

1.  If possible, be prepared next lecture with idea for research project

2.  Typically, don't count to determine $P(E)$; estimate from sample

Conditional probability

1.  Definition: $P(B)=\frac{P(A\cap B)}{P(B)}$

2.  This is how online stores (e.g. Ebay, Amazon, Google) figure out what to advertise: given that you purchased a textbook, how likely are you to want a Lego set or motorcycle helmet?

3.  Story problem keywords: "given", "conditional on", "among", or "out of"

4.  Example 1: Among set $S$ of workers in particular industry, unemployment rate $P(U) = .10$, women $P(W) = .25$, intersection $P(U\cap W) = .05$

    -  Rectangular Venn diagram

    -  Unemployment rate among women $P(W) =\frac{.05}{.25} = .20$

    -  Fraction of unemployed who are women $P(U) =\frac{.05}{.10} = .50$

    -  Practice:
		1.  Unemployment rate among men $P(\bar W) =\frac{.05}{.75} =\frac{1}{15}\approx .07$
		2. Fraction of unemployed who are men $P(U) =\frac{.05}{.10} = .50 = 1 - P(W|U)$

Independence

1.  Definition: $P(A|B) = P(A)$, $P(B|A) = P(B)$ (equivalent to $P(A\cap B) = P(A)P(B)$)

2.  What is the probability of a person being unemployed? $P(A) = .10$; what if it's raining outside? Then the probability of being unemployed is $P(A|B) = .10$.

3.  Surgeon joke (failing to account for independence): the bad news is that this type of surgery is successful only 25% of the time. The good news is that the last three patients all died.

Event decomposition:

1.  If $E_{1},\ldots,E_{k}$ are mutually exclusive and collectively exhaustive then $P(A) = \sum_{k=1}^n P(A\cap E_{k})$

2.  Example 1: 30% of web traffic comes from a Google add ($G$), 30% from online newspaper ($N$), and 40% from a product reviewer's blog ($R$). 40% of Google traffic, 20% of newspaper traffic, and 30% of reviewer traffic end in a sale ($S$). What fraction of overall traffic ends in a purchase?

    -  Step 1: draw event tree (first web source, then purchase decision)

    -  Step 2: translate question into notation. $P(G) = .3$, $P(N) = .3$, $P(T) = .4$, $P(G) = .4$, $P(N) = .2$, $P(R) = .3$, wish to find $P(S)$

    -  $P(S) = P(S\cap G) + P(S\cap N) + P(S\cap R)$
 $= P(G)P(S|G) + P(N)P(S|N) + P(R)P(S|R)$
 $= .3\times .4 + .3\times .2 + .4\times .3 = .12 + .06 + .12 = .3$

-  $S$ and $R$ are independent, since $P(S|R) = P(S) = .3$. Is $S$ independent of $G$? Of $N$?


3.  Bayes' Rule
    -  $$P(A\cap B) = \begin{cases}P(A|B)P(B)\\ P(B|A)P(A)\end{cases}$$
    -  Therefore, can derive $P(A|B)$ from $P(B|A)$, or vice versa.
    -  $P(B) =\frac{P(B|A)P(A)}{P(B)} =\frac{P(B|A)P(A)}{P(B|A)P(A) + P(B|\bar A)P(\bar A)}$
    -  Practice: find and interpret $P(G|S)$, $P(R|S)$, $P(N|S) =\frac{P(N\cap S)}{P(S)} =\frac{.06}{.3} = .2$ (mere coincidence that $P(N|S) = P(S|N)$)

4.  Warning: think carefully about difference between $P(A|B)$, $P(A)$, and $P(B|A)$. Be sure you know which you really want.

5.  Note: It's possible for composite probabilities and conditional probabilities to tell rather opposite stories

    -  Charig et al. (1986): Kidney stone treatment B looked more effective, but A was more actually effective more effective both with small stones and large stones (but stone size matters, and treatments A and B had been used disproportionately on large and small stones, respectively)

| Kidney stone size | Treatment A     | Treatment B     |
|-------------------|-----------------|-----------------|
| Small             | 81/87=**93%**   | 234/270=87%     |
| Large             | 192/263=**73%** | 55/80=69%       |
| Both              | 273/350=78%     | 289/350=**83%** |

-  MLB batting averages: David Justice was better in 1995 and 1996 but Derek Jeter was better in 1995-96. Who is better batter?

| Batter        | 1995             | 1996            | 1995-96          |
|---------------|------------------|-----------------|------------------|
| Derek Jeter   | 12/48=.250       | 183/582=.314    | 195/630=**.310** |
| David Justice | 104/411=**.253** | 45/140=**.321** | 149/551=.270     |
 Either could be. Likely depends on which is more predictive of 1997 (depends on other assumptions)

-  Israel covid data: August 2021 (https://www.covid-datascience.com/post/israeli-data-how-can-efficacy-vs-severe-disease-be-strong-when-60-of-hospitalized-are-vaccinated)
	1.  When covid Delta variant hit, Israeli hospitals filled up with covid cases: 214 that were unvaccinated and 301 that were vaccinated. Since 60% were vaccinated, superficial conclusion is that vaccines make covid worse, not better!
	2. But 60%=P(vax\|cv). We really want to know P(cv\|vax) (actually, want to compare P(cv\|vax) and P(cv\|no vax))
	3. $P(cv|vax) = 301/5,634,634 = 5.3*10^{- 5}$
 $P(\text{novax}) =\frac{214}{1,302,912} = 16.4*10^{- 5}$ Vaccinated only catch covid $\frac{5.3}{16.4} = 32\%$ as often (i.e. vaccine 68% effective)

iv. Nearly 80% of Israelis over age 12 were vaccinated against covid, so if it were unrelated random draw, 80% of covid patients should have been vaccinated; lower rate than 80% supports hypothesis that treatment helped.

v.  Put differently, so many Israelis were vaccinated that even though those vaccinated only got covid 68% as often, there were more vaccinated covid cases than unvaccinated covid cases.