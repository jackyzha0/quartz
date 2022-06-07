# Econ 378 Lecture Notes 

# Joseph McMurray 

## L0 Introduction 

1. Opening Prayer 

2. About me 

 a. Raised in Salt Lake City, mission in Seoul Korea, Economics major at BYU, met my wife at 

 BYU, PhD at University of Rochester, research in political economics (also teach Econ 

 477), 4 kids, sincerely believe in the Gospel of Jesus Christ and the mission of BYU. 

 b. I enjoy teaching Econ 378 because the material is so useful for students, which is 

 rewarding. It is also hard, so making it interesting and easy is a fun challenge. 

3. Data analysis in Economics 

 a. Scientific method: observe patterns, theorize, test theories, policy implications, policy 

 calibration 

 b. Theory: Econ 110, 380-382, 400+ 

 c. Evidence: Econ 378, 388, 400+, Research, internships, jobs (big data industrial transition) 

 d. Economics is both (recommend Econ 210 for exploring careers in Economics, also MATH 

 213/215 linear algebra) 

4. Probability and statistics 

 a. Often care about population but observe only sample. 

 Can’t know what’s true, but can know what’s probably true 

 b. Probability is the language of uncertainty 

 c. Probability theory also useful in theoretical models of risk/uncertainty (e.g. insurance, 

 investments, search, asymmetric information) 

5. Syllabus 

 a. Materials, participation, homework, exams, project 

 b. How to choose a research topic 

 c. Finish part 1 (data collection) on time! After the midterm, homework will include data 

 analysis from your own projects. 

---

## L1 Math Preview 

1. Spiritual thought: like Joseph in Egypt, your time at BYU is 7 years of plenty (spiritual abundance). Likely less so when you go to graduate school or workforce. Store up all you can now (e.g. devotionals, religion classes, student ward, ministering), like wise virgins with oil lamps, to sustain you as you “go forth to serve” 
 2. In a similar (but temporal) way, this lecture and HW 1 seek to fill your “math lamps” in 
 preparation for the rest of the semester.  
3. Factorials 
 a. 5!= 5 ⋅ 4 ⋅ 3 ⋅ 2 ⋅ 1  
 b. 0!= 1  
4. Exponents 
 a. 𝑒𝑒≈2. 7 denotes growth 
	 i. $1 invested at 100% interest, compound annually, equals $2 a year later 
	 ii. $1 invested at 100% interest, compound continuously, equals $2.72 a year later 

Expression | Simplified / Rewritten 
---|---
$x^-1$|$1/x$ 
$x^1/2$|$\sqrt{x}$
$x^0$|$1$
$x^2x^3$|$x^5$
$(x^2)^3$|$x^6$
$e^xe^y$|$e^{x+y}$
$e^x/e^y$|$e^{x-y}$
$e^{x+y}$|$e^xe^y$
$e^{x-y}$|$e^x/e^y$

5. Logarithms 
	1.  $Log_{10}100 = 2$(How many powers of 10 give you 100 ?)
		1. $log(. 01)=− 2$  
	2.  $ln(100)≈4.6$(How many powers of 𝑒𝑒≈2. 7 give you 100 ?) 
		1. $ln(. 01)=−4. 6$
	 3. Logs makes huge numbers smaller, miniscule numbers (e.g. probabilities) bigger 
	 4. Inverse of exponents 
		1. $ln(e^5)=5$ (How many powers of 𝑒𝑒 does it take to reach $e^5?$ 
		2. $e^{ln(5)}=5$ (It takes ln(5) powers of 𝑒 to make 5; what if we take 𝑒 to that many powers?) 
		
Expression | Simplified / Rewritten 
---|---
$ln(xy)$|$ln(x)+ln(y)$
$ln(\frac{x}{y})$|$ln(x)-ln(y)$
6. Summation 

 a. ∑ 𝑘𝑘 

 5 2 

 𝑘𝑘=1 

#### = 1 

 2 

#### + 2 

 2 

#### + 3 

 2 

#### + 4 

 2 

#### + 5 

 2 

#### = 55 

 b. Column of 𝑛𝑛= 500 observations can be denoted by 𝑥𝑥 

 𝑖𝑖 

 , with 𝑖𝑖=1,...,𝑛𝑛 

 c. 

 1 

 𝑛𝑛 

#### ∑ 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 denotes the average 

 d. ∑ 3 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 3 ∑ 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 e. 

#### ∑ 

#### (𝑥𝑥 

 𝑖𝑖 

#### +𝑥𝑥 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

#### ∑ 

#### 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### + 

#### ∑ 

#### 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 f. 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### + 3 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

#### ∑ 

#### 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### + 

#### ∑ 

#### 3 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

#### ∑ 

#### 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### + 3 𝑛𝑛 

 g. Does ∑ (𝑥𝑥 

 𝑖𝑖 

#### 𝑥𝑥 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### =∑ 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### ∑ 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 ? No! 

 i. e.g. 2 ⋅3 + 5 ⋅ 4 ≠(2 +5)(3 +4) 

7. Derivatives 

---

 a. Intuition: limit of slope 

 b. Finding maximum/minimum 

 i. First-order condition: 𝑓𝑓 

 ′ 

#### ( 

#### 𝑥𝑥 

#### ) 

#### = 0 

 ii. Second-order condition: 𝑓𝑓 

 ′′ 

 (𝑥𝑥) negative for max (slope is decreasing, function 

 makes a frown), positive for min (slope is increasing, function makes a smile) 

 c. Simple derivatives 

### 𝑓𝑓 

### ( 

### 𝑥𝑥 

### ) 

### 𝑓𝑓 

 ′ 

### ( 

### 𝑥𝑥 

### ) 

### 𝑥𝑥 

 3 

#### 3 𝑥𝑥 

 2 

### 4 𝑥𝑥 

#### 4 

### 4 

#### 0 

### 1 

### 𝑥𝑥 

#### − 

#### 1 

#### 𝑥𝑥 

 2 

### √𝑥𝑥 

#### 1 

#### 2 

#### 𝑥𝑥 

 − 

 1 

 2 = 

#### 1 

#### 2 

#### √ 

#### 𝑥𝑥 

### 𝑒𝑒 

 𝑥𝑥 

#### 𝑒𝑒 

 𝑥𝑥 

### ln (𝑥𝑥) 

#### 1 

#### 𝑥𝑥 

 d. Product rule: 

 𝑑𝑑 

 𝑑𝑑𝑥𝑥 

#### [ 

#### 𝑓𝑓(𝑥𝑥)𝑔𝑔(𝑥𝑥) 

#### ] 

#### =𝑓𝑓 

 ′ 

#### (𝑥𝑥)𝑔𝑔(𝑥𝑥)+𝑓𝑓(𝑥𝑥)𝑔𝑔′(𝑥𝑥) 

 i. 

 𝑑𝑑 

 𝑑𝑑𝑥𝑥 

#### 𝑥𝑥 

 2 

 ln(𝑥𝑥)= 2 𝑥𝑥ln(𝑥𝑥)+𝑥𝑥 

 2 

#### � 

 1 

 𝑥𝑥 

#### � 

 ii. Same pattern for products of 100 terms 

 e. Chain rule: 

 𝑑𝑑 

 𝑑𝑑𝑥𝑥 

#### 𝑓𝑓�𝑔𝑔(𝑥𝑥)�=𝑓𝑓 

 ′ 

#### �𝑔𝑔(𝑥𝑥)�𝑔𝑔 

 ′ 

#### (𝑥𝑥)= 

 𝑑𝑑𝑑𝑑 

 𝑑𝑑𝑑𝑑 

 𝑑𝑑𝑑𝑑 

 𝑑𝑑𝑥𝑥 

 i. Example: 

 𝑑𝑑 

 𝑑𝑑𝑥𝑥 

 ln(𝑥𝑥 

 2 

#### − 3 𝑥𝑥+ 1 )= 

 1 

 𝑥𝑥 

 2 

 −3𝑥𝑥+1 

#### ⋅(2𝑥𝑥 −3) 

 ii. Example: 

 𝑑𝑑 

 𝑑𝑑𝑥𝑥 

#### 𝑒𝑒 

 −3𝑥𝑥 

 2 

#### =𝑒𝑒 

 −3𝑥𝑥 

 2 

#### (− 6 𝑥𝑥) 

 iii. Same pattern for longer chains 

 f. [The Quotient rule is useful as well, but I won’t require it here.] 

8. Integrals 

---

g. Intuition 

 i. “sum”/area under 𝑓𝑓 (negative if 𝑓𝑓< 0 ) 

 ii. Anti-derivative: add up ∫ 

#### 𝑓𝑓′(𝑥𝑥)𝑑𝑑𝑥𝑥 

 𝑏𝑏 

 𝑎𝑎 

 to get 𝑓𝑓(𝑏𝑏)−𝑓𝑓(𝑎𝑎) 

 𝑓𝑓(𝑥𝑥) Anti-derivative of 𝑓𝑓(𝑥𝑥) 

#### 𝑥𝑥 

 2 

 1 

#### 3 

#### 𝑥𝑥 

 3 

#### 4 4 𝑥𝑥 

#### 1 

#### 𝑥𝑥 

 2 

#### − 

#### 1 

#### 𝑥𝑥 

#### √ 

#### 𝑥𝑥 

#### 2 

#### 3 

#### 𝑥𝑥 

 3 

 2 

#### 𝑒𝑒 

 𝑥𝑥 

#### 𝑒𝑒 

 𝑥𝑥 

#### 𝑥𝑥(𝑥𝑥− 1 ) 

#### 1 

#### 3 

#### 𝑥𝑥 

 3 

#### − 

#### 1 

#### 2 

#### 𝑥𝑥 

 2 

h. Definite integral ∫ 𝑥𝑥 

 2 

#### 𝑑𝑑𝑥𝑥 

 7 

 4 

#### =� 

 1 

 3 

#### 𝑥𝑥 

 3 

#### � 

 𝑥𝑥=4 

 7 

#### = 

 1 

 3 

#### ( 7 ) 

 3 

#### − 

 1 

 3 

#### ( 4 ) 

 3 

#### = 

 343 

 3 

#### − 

 64 

 3 

#### = 93 

 i. ∫ 

#### 𝑥𝑥 

 2 

#### 𝑑𝑑𝑥𝑥 

 4 

 7 

#### = 

 64 

 3 

#### − 

 343 

 3 

#### =− 93 

i. Useful techniques that I won’t cover (or expect you to know) 

 i. 𝑢𝑢-substitution (chain rule in reverse) 

 ii. Integration by Parts (product rule in reverse) 

j. Double Integrals 

 i. Simple: inside integral then outside integral 

#### � � 𝑥𝑥 

 2 

#### 𝑥𝑥𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### 𝑑𝑑𝑥𝑥 

 3 

 𝑦𝑦=1 

#### =� � 

#### 𝑥𝑥 

#### 3 

#### 𝑥𝑥 

 3 

#### � 

 𝑥𝑥=0 

 𝑥𝑥=2 

#### 𝑑𝑑𝑥𝑥 

 3 

 𝑦𝑦=1 

#### =� 

#### 8 

#### 3 

#### 𝑥𝑥𝑑𝑑𝑥𝑥 

 3 

 𝑦𝑦=1 

#### =⋯= 

#### 32 

#### 3 

 ii. Note: for rectangular bounds (i.e. bounds of 𝑥𝑥 don’t depend on 𝑥𝑥, and vice 

 versa), can integrate in reverse order 

#### � � 𝑥𝑥 

 2 

#### 𝑥𝑥𝑑𝑑𝑥𝑥 

 3 

 𝑦𝑦=1 

 2 

 𝑥𝑥=0 

#### 𝑑𝑑𝑥𝑥=� � 

#### 1 

#### 2 

#### 𝑥𝑥 

 2 

#### 𝑥𝑥 

 2 

#### � 

 𝑦𝑦=1 

 𝑦𝑦=3 2 

 𝑥𝑥=0 

#### 𝑑𝑑𝑥𝑥=� 4 𝑥𝑥 

 2 

 2 

 𝑥𝑥=0 

#### 𝑑𝑑𝑥𝑥=⋯= 

#### 32 

#### 3 

 iii. Practice ∫ ∫ 

 𝑥𝑥 

 𝑦𝑦 

 2 

 𝑥𝑥=0 

#### 𝑑𝑑𝑥𝑥𝑑𝑑𝑥𝑥 

 3 

 𝑦𝑦=1 

---

## L2 Statistics preview, Excel 

Introduction 

1. We recently revised the Econ 378 curriculum. Formerly, we started with basic theory and the 

 basic tools based on it, introduced complex theory with complex tools, then more complex 

 theory and more complex tools. This seemed reasonable, but I realized: “Still to this day, I’ve 

 never learned to build a car, but even without knowing how to build one, I managed to learn to 

 drive one.” 

2. Now: learn basic, complex, and more complex tools upfront. Then go learn the underlying 

 theory. 

Spreadsheets 

1. Unit of observation 

2. Quantitative variables 

3. Binary variables 

 a. Categorical variables as binary (or “dummy”) variables 

Excel basics 

1. Calculations 

 a. Arithmetic 

 b. Average, etc. 

2. Formulas 

 a. Example: convert GDP to per capita GDP 

 b. Example: convert per capita GDP to per capita GDP change 

 c. Example: convert per capita GDP change to per capita GDP % change 

3. Help files 

4. Transpose 

5. Sort 

6. Filter 

7. Boolean 

Data Visualization 

1. Single variables 

 a. Binary variables: Pie charts 

 b. Quantitative variables: Histograms 

2. Interactions 

 a. Two binary variables: Double pie charts 

 b. Binary and quantitative: bar chart 

 c. Two quantitative: scatter chart 

 i. Quantitative & time: line graph 

---

 d. Three variables 

 i. Two binary & quantitative: clustered bar chart 

 ii. Two quantitative & binary: color-coded scatter chart 

 iii. Three quantitative: bubble chart 

Summary statistics 

1. Proportions 

2. Mean 

 a. From histogram, eyeball center of gravity 

3. Median/percentiles 

4. Mode 

5. Standard deviation 

 a. Rule of thumb: two standard deviations 

 b. Chebyshev’s inequality: % of population outside 𝑘𝑘 standard deviations can’t exceed 

 1 

 𝑘𝑘 

 2 

6. Correlation coefficient 

7. Regressions 

 a. Slope & intercept 

 i. Predict 𝑥𝑥 for any 𝑥𝑥 

 ii. Predict future! 

 iii. Counterfactual “experiments” (way less costly than real experiments) 

 b. 𝑅𝑅 

 2 

 (coefficient of determination) 

 c. Error terms / detrended data 

 d. Multiple regression 

Estimation 

1. Population / samples 

 a. Importance of representative sample 

2. Point estimates, interval estimates / margin of error 

3. Hypothesis test 

Learning Statistics 

1. We just finished semester (overview). You can now do everything by computer. Rest of 

 semester, we’ll go back and do them by hand. 

2. Why work by hand? Important to know what computer is doing. (GIGO) 

 a. Pushing a button works great unless a situation arises when the standard button is the 

 wrong one to use. We need to know the limitations of the standard techniques and 

 how to modify them appropriately. 

 b. Car analogy: why insist on building cars when we could just drive them? Analogy 

 incomplete: I can objectively verify that I’ve correctly driven a car; I can’t objectively 

 verify that I’ve correctly used statistics. In the real world of research projects, 

---

 internships, and jobs, there is no answer key! We only know our answers are correct if 

 we know we’ve done them correctly, and that’s only possible if we understand deeply 

 what theoretical basis underlies the tools we’re using. 

3. Simple things (e.g. margin of error) mask extremely complex background. Understanding entire 

 background is essential for confidence that we’re using statistical formulas appropriately. 

 (Sometimes, tweaks are necessary.) 

4. Spiritual analogy: the “why” of the gospel. If atheist friend is kind and righteous already, why 

 need doctrine? Even more happiness. Example: doctrine of eternal marriage informs decisions 

 to resolve conflicts, versus divorce. 

## L3 Research Design 

Research questions 

1. There are two important ingredients to a good research study: a good question, and a good 

 methodology for finding an answer 

2. Question selection 

 a. What ideas do you already have for data analysis projects? 

 b. What (topic) are you excited / passionate about? 

 c. If you had a crystal ball, what would you ask? 

 d. What if you had a crystal ball that could answer anything but that? What would you 

 need to ask so that you can figure out your own answer to the main question? 

 e. Continue until so narrow you can collect your own data (the more specific, the better) 

 f. Given (time and money) budget constraints, your project may need to settle for similar 

 data 

 i. Similar variables 

 ii. A few observations 

 iii. “Pilot study”: this is often what is done in real world 

 iv. Proof of concept (consulting sales pitch): can even use fake data 

3. Data mining 

 a. Given data (e.g. from a private business, a consulting client, etc.), ask, “what can we 

 learn?” and “who is interested?” 

 b. Example: private business data 

 c. Typically needs to be paired with research question process above 

 d. Example: what would CEO want to know? 

---

Correlation may not mean causation! 

1. Three possibilities 

2. Causation: 𝑋𝑋 ⇒𝑌𝑌 

 Theory: cell phones ⇒ distraction ⇒ accidents 

 Policy implication: banning cell phones will reduce car accidents 

3. Reverse causation: 𝑋𝑋⇐𝑌𝑌 

 Not likely in this case (car accidents cause cell phone use?) 

4. Lurking variable: 𝑋𝑋⇐𝑍𝑍⇒𝑌𝑌 

 Example: careless (teenage?) drivers are prone independently both to use cell phones and 

 (regardless of cell phone use) to get in accidents 

 Policy implication: banning cell phones will not reduce car accidents 

5. Historic instances of conflating correlation with causation 

 a. The “Phillips curve” documented a negative correlation between inflation and 

 unemployment, suggesting to policy makers that monetary policy could only avoid one 

 problem by embracing the other. They printed more money in the 1970s, hoping to 

 lower unemployment, but discovered “stagflation”: the coincidence of high 

 unemployment and high inflation. 

 b. Documenting a positive correlation between on-the-job computer use and income, 

 Krueger (QJE 1993) concluded that computers increase productivity, and recommended 

 policies to increase computer use. Using similar data, however, DiNardo and Pischke 

 (QJE 1997) showed that income is also correlated with pencil use on the job and argued 

 (tongue-in-cheek) that subsidizing pencils would be a much more cost-effective 

 intervention. 

 c. Can also conflate lack of correlation with lack of causation: in yesterday’s covid example, 

 we derived that 𝑃𝑃 

#### ( 

#### 𝑐𝑐𝑐𝑐 

#### | 

#### 𝑐𝑐𝑎𝑎𝑥𝑥 

#### ) 

#### =5. 3∗ 10 

 −5 

 and 𝑃𝑃 

#### ( 

#### 𝑐𝑐𝑐𝑐 

#### | 

#### 𝑛𝑛𝑛𝑛 𝑐𝑐𝑎𝑎𝑥𝑥 

#### ) 

#### = 

 214 

 1 , 302 , 912 

#### = 16 .4∗ 10 

 −5 

#### , 

 so vaccine is 68% effective. Correlation of 𝑐𝑐𝑐𝑐 and 𝑐𝑐𝑎𝑎𝑥𝑥 is negative, but weak. If further 

 condition on age (<50 vs. >50): 

 i. 𝑃𝑃(𝑐𝑐𝑐𝑐|𝑐𝑐𝑎𝑎𝑥𝑥< 50 )= 

 11 

 3 , 501 , 118 

#### =.3∗ 10 

 −5 

#### 𝑃𝑃(𝑐𝑐𝑐𝑐|𝑛𝑛𝑛𝑛 𝑐𝑐𝑎𝑎𝑥𝑥< 50 )= 

 43 

 1 , 116 , 834 

#### =3. 9∗ 10 

 −5 

 Vaccine 92% effective for this group. 

---

 ii. 𝑃𝑃(𝑐𝑐𝑐𝑐|𝑐𝑐𝑎𝑎𝑥𝑥> 50 )= 

 290 

 2 , 133 , 516 

#### = 13 .6∗ 10 

 −5 

#### 𝑃𝑃(𝑐𝑐𝑐𝑐|𝑛𝑛𝑛𝑛 𝑐𝑐𝑎𝑎𝑥𝑥> 50 )= 

 171 

 186 , 078 

#### = 91 .9∗ 10 

 −5 

 Vaccine 85% effective for this group. 

 iii. If condition further, vaccine efficacy by age: 

 Age Vaccine efficacy Age Vaccine efficacy 

#### 12 15 100% 50 59 93% 

#### 16 19 100% 60 69 89% 

#### 20 29 100% 70 79 90% 

#### 30 39 97% 80 89 81% 

#### 40 49 94% 90+ 92% 

 iv. Biggest determinant of covid is age (overall, 90+ over 1000 times more likely 

 than 12-15 to be hospitalized with covid), not vaccine. Since people of all ages 

 got vaccinated, corr(vax,cv) gets weaker when not conditioning in age than 

 when conditioning on age. But even for oldest groups (where most 

 “breakthrough” cases are occurring), vaccinated do way better than 

 unvaccinated. 

 d. These examples underscore importance of careful data work, understanding statistics! 

 Good intentions can easily be led astray by statistical subtleties. 

Establishing causation (this is most of the work in economics) 

1. Random experiment 

 a. Best method 

 b. Example: force group A to drive with cell phone, group B to not 

 c. Often impractical, ethically and/or logistically (e.g. only one national economy; no 

 control group) or even impossible (e.g. race/gender) 

 d. Natural experiment: wait for nature to run experiments 

 i. These are rare, might wait a long time 

 ii. Government policy randomly allocates permits for some drivers to use cell 

 phones. 

 iii. Angrist and Evans (1998): Does having more children affect mother’s income? 

 Lurking variables and reverse causation both likely. But parents whose second 

---

 child was (randomly) same gender as first child were more likely to have third 

 child, (temporarily) reduced (poor) mother’s income 

 iv. Angrist (1990): What impact (positive or negative) did military service have on 

 men with (randomly) high Vietnam draft numbers had 15% lower incomes years 

 later. 

 v. Clever researchers keep eyes open for natural randomness, ask “what can we 

 learn?” 

 vi. Sources of randomness: lottery numbers (e.g. gambling, school choice, scarce 

 social program), random executive decisions (e.g. dorm rooms, judge 

 assignment, advertising), weather, earthquakes, accidents, terrorist attacks 

2. Second best: quasi-experiment 

 a. Example: cell phones legal in one state, illegal in another 

 b. Problem: other reasons for differential accidents (e.g. speed limits, enforcement, roads, 

 recklessness?) 

 c. Refinement: large number of states; before/after cell phone law change 

 d. Pope (1989, BYU): Geneva Steel closed then reopened six months later, concomitant 

 decrease then increase in local hospitalizations for pneumonia, pleurisy, bronchitis, 

 asthma. (Landmark study in air pollution.) 

 e. Sargeant et al. (2004): Restaurant smoking ban in Montana, repealed after six months. 

 Heart attacks dropped 40%, then went back up. 

 f. Lee et al. (2004): How does politician (Democrat/Republican) affect policy outcomes? 

 Random election? No. But in close elections (e.g. 48-52% votes), winning or losing was 

 plausibly random. 

 g. Possible sources of quasi-randomness: cutoffs (e.g. grades, income thresholds, 

 performance thresholds, birth date), bureaucratic decisions that are not literally random 

 but seem arbitrary (e.g. regulatory decisions, tax levels, regularly/tax hike timing, pre

 /post-construction project, mission assignment) 

3. Controls 

 a. Compare sub-populations to “control” for lurking variables 

 b. Most common method (since others infeasible) 

 c. Example: compare cell phone use and accidents among teenagers/adults 

 vii. Other proxies for recklessness: grades? debt? Often imperfect 

---

 d. Econ 378: restrict sample (Econ 388: regressions) 

Prediction 

1. If correlation does not reflect causation, 𝑋𝑋 cannot be used to control 𝑌𝑌, but still can be used to 

 predict 𝑌𝑌 

 a. Example: reduced car insurance premiums for good grades, females, good driving 

 history, yellow cars 

 b. Ethics of “statistical discrimination” (e.g. traffic stops for blacks, airport scrutiny for 

 Arabs) 

 c. Role of theory is to posit reasons for correlation; essential if anything changes (e.g. cell 

 phones get cheaper). 

Research Design for Causal Inference 

1. Many of the topics we’re interested in seek to establish cause/effect relationships. 

 a. What examples did you come up with? (e.g. Do masks reduce covid spread?) 

 b. Were there any topics you came up with that do not involve cause/effect relationships? 

 (Probably not.) 

2. What is a cause/effect relationship you would like to discover? 

3. Which variables might have a simple correlation that suggests the relationship above? 

4. Are there any competing forces that might produce the opposite correlation? If the correlation 

 turns out to be consistent with a hypothesized cause/effect relationship, the hypothesized 

 relationship might outweigh any competing forces. 

5. But are there other mechanisms that could produce the same correlation? If so, finding a 

 correlation where you expected it does not guarantee that the hypothesized cause/effect 

 relationship is valid. 

6. This raises a new question: where could we look for evidence of the hypothesized cause/effect 

 relationship that would not pick up correlations for these other reasons? 

7. This is the key question of research design. Note that you can (and should!) think through and 

 plan out your response to these issues before you ever look at the data. 

Research design in the quest for spiritual truth 

---

1. A friend, skeptical of spiritual things, recommended the following experiment: go to a hospital, 

 pray for people in every other room. See if they recover more quickly/fully than the others. (His 

 prediction: no.) Is this a valid statistical test of the validity of prayer? Why or why not? 

2. Research design is important in answering spiritual questions, too: 

 a. What do the scriptures say about experiments to uncover spiritual truth? 

 b. “If any of you lack wisdom, let him ask of God, who giveth to all men liberally, and 

 upbraideth not; and it shall be given him. But let him ask in faith , nothing wavering.” 

 (James 1:5-6, emphasis added) 

 c. “And when ye shall receive these things, I would exhort you that ye would ask God, the 

 Eternal Father, in the name of Christ, if these things are not true; and if ye shall ask with 

 a sincere heart, with real intent, having faith in Christ , he will manifest the truth of it 

 unto you, by the power of the Holy Ghost.” (Moroni 10:4, emphasis added) 

 d. “Now, we will compare the word unto a seed. Now, if ye give place, that a seed may be 

 planted in your heart , behold, if it be a true seed, or a good seed, if ye do not cast it out 

 by your unbelief, that ye will resist the Spirit of the Lord , behold, it will begin to swell 

 within your breasts; and when you feel these swelling motions, ye will begin to say 

 within yourselves—It must needs be that this is a good seed, or that the word is good, 

 for it beginneth to enlarge my soul; yea, it beginneth to enlighten my understanding, 

 yea, it beginneth to be delicious to me.” (Alma 32:28, emphasis added) 

 e. To me, asking in faith means an honest willingness to follow the promptings received. If 

 I don’t honestly intend to follow impressions that are given, the experiment is void. 

 f. “If any man will do his will , he shall know of the doctrine, whether it be of God, or 

 whether I speak of myself.” (John 7:17, emphasis added) 

 g. Mission friend: finally prayed about the Book of Mormon but “nothing happened”. 

 Zone leader: real intent might mean praying more than once. After continued prayer, 

 he received confirming witness. 

## L4 Stata: Basics 

Stata 

1. Introduction 

---

 a. Stata especially well-suited to economics (regression analysis). 

 b. But expensive. 

 c. Other stats packages are available (e.g. R, SAS, SPSS), can program in Python, C, Matlab, 

 Java). But learning new stats package or programming language is like using a Casio 

 calculator when you’re familiar with TI—all the buttons do all the same things, they’re 

 just located in different places. So learning one language helps you pick up others 

 quickly, as needed. (Stata has specific value for Economics research assistants, future 

 PhDs.) 

2. Basic user interface 

 a. Open Stata. Very different GUI (graphical user interface) than Excel, but same idea. 

 Feels more like computer programming software, for good reason. 

 b. Click on Data Editor (Edit), enter data by hand: numbers 1-10 in column 1, make up ten 

 values in column 2. 

 i. Row entries are called observations (numbered automatically on left side) 

 ii. Column entries are called variables, default named “var1” and “var2” 

 c. Close data editor. Notice in main screen, a running list of individual commands (and 

 their results), based on what we just did manually. 

 i. With our first action, we actually implemented three commands: set “obs” from 

 0 to 1, generate variable “var1”, and set the value of var1 for observation 1. 

 ii. As we added more data, we set “obs” to 2, 3, ..., 10, replaced var1 for 

 observations 2, 3, ..., 10, and then generated a second variable, “var2”, and 

 replaced its values for observations 1-10. (Note, we no longer needed to 

 expand “obs” at that point.) 

 d. Command line 

 i. We can add additional commands using the command line. Type: generate 

 newvar 

 ii. Note: in Stata commands, shortcuts are indicated by underlining the minimal 

 number of letters to convey the same meaning: “gen” or “gene” or “gener” or 

 “genera” or “generat” or “generate” are all equivalent, but “ge” is ambiguous, 

 and will therefore not work. 

 iii. Error: when we generate a new variable, we need to define its values. Let’s try 

 again: generate varthree=3 

---

 iv. Now open Data Editor again to see the result. We have defined a new variable 

 “varthree” to equal 3, not just for a particular observation, but for every 

 observation. This is the power of the programming approach to data: you can 

 do lots of things at once! (In Excel, there are shortcuts to copy and fill, but 

 nothing this quick.) Most of the time, we won’t interact with the spreadsheet 

 directly; we’ll just be programming. 

 v. To see this again, close Data Editor and type: replace varthree=2*var2 if var1>7. 

 We see that three real changes were made, and if we open the Data Editor 

 again, we can see what that looks like. 

 vi. What if we meant to type varthree=2*var2 if var1>5? We could type over again, 

 or we can push “PgUp” to repeat the previous command (and edit it before 

 hitting return). Pushing this multiple times allows us to repeat earlier 

 commands. 

 vii. We can also use the command line as a calculator: type display sqrt(8*2) 

 e. Left and right panels 

 i. On top right-hand side is a list of the variables we have so far: var1, var2, and 

 newvar. 

 ii. The bottom right-hand side summarizes our data: we have three variables and 

 10 observations. 

 iii. (If you ever need to, you can resize these panels by dragging their borders.) 

 iv. Notice on left-hand side is list of commands we’ve used so far (red for the ones 

 that returned error codes). Let’s highlight the first 26 lines (click on the first, 

 then shift-click on line 26) and push Ctrl+C to copy these. (This creates var1 and 

 var2 and replaces all 10 values of var1 but only the first 5 values of var2.) 

3. Do Files 

 a. Click on “New Do File Editor” at the top of the screen (looks like a Word document, with 

 a pencil). This opens a new window, with a text editor. 

 b. Type Ctrl+V to paste the command lines that we copied earlier. This becomes a short 

 computer program that, once we execute, will create two variables and replace their 

 values. (In computer programming, a “command” tells the computer to do something. 

 A “script” is a list of commands, to be executed in order. Scripts in Stata are called Do 

 files.) 

---

 c. Note: some programming languages require a semicolon or other punctuation to 

 denote the end of one command and the beginning of the next. “Return” plays that role 

 in Stata, so writing on separate commands on separate lines is sufficient. 

 d. Always use a script, not the command line! 

 i. Often, after many steps of manipulating data, you realize that you should have 

 done step 3 differently. In Excel, you might be able to hit “undo” repeatedly (if 

 you haven’t saved and closed the program yet), but once you correct step 3, 

 you’ll then have to redo all subsequent steps. With a script, you can edit step 3 

 and recompile in moments. 

 ii. A script is also useful for collaborators and replicators, as well as yourself when 

 you come back to a project after a long pause. I learned this the hard way: I 

 downloaded data, manipulated it repeatedly using the command line, found 

 results that were really interesting, and copied and pasted them into my 

 research paper. A more urgent project came up, so it was months before I came 

 back to this. When I came back, I did (what I thought were) the same 

 manipulations but got totally different results. I couldn’t figure out how to 

 reproduce the results that I had recorded earlier. Maybe I had been making a 

 mistake? Maybe I’m making a mistake now, but was previously correct? If I had 

 a paper trail of all my data manipulations at the time, I could compare my work 

 now and then to see how they differ, and which is more reliable. ...But I don’t, 

 and may never publish that paper. 

 iii. For your data project, you will need to submit your Do file, not just your results. 

 iv. Related programming tip: Never overwrite your original data set. Use a script to 

 open your original data set, make whatever edits need to made, and then save 

 the revised data as a new data set with a different file name. That way, every 

 time you run your script, it pulls the same original data. 

4. .dta files 

 a. Computer programs are designed to recognize and interpret information, but only in 

 specific formats, specified by file type (e.g. .pdf, .docx, .mp3). 

 b. For example, Spreadsheets often saved as .csv (“comma separated values”) 

 i. year,growth;2021,2%;2020,1%;2019,1.5% can be understood to be a 3x2 table 

 c. Excel recognizes .csv or .xlsx, which adds formatting information. 

---

 d. Stata stores data using .dta and stores scripts using .do 

Topics: 

- Help 

- Lookfor 

- Resize 

- Break 

- Pwd/cd 

- Display 

- Ctl+Shft+Right click -> “copy as path” 

File types 

Variable types 

Scripts 

Saving data 

## L5 Stata: Summarizing Data 

Topics: 

Script tips 

Describe 

Tabulate (+twoway) 

Summarize 

Destring/Tostring 

Comments 

Generate 

Replace 

If 

---

## L6 Stata: Data Visualization 

Bysort 

Histogram 

Help 

Scatter 

Geodist 

Keep/Drop 

Collapse 

Line 

Import 

Net 

Twoway line 

Graph options 

Regress 

Predict 

## L7 Probability, Combinatorics (WMS 2.1-6) 

1. How many have already collected data? How many know what data to collect? 

2. Spiritual thought: many of our greatest priorities are not time sensitive, so it’s easy to 

 procrastinate till “later”, but often this postpones blessings. Let your daily activities match your 

 eternal priorities! (e.g. Don’t delay repentance, marriage/children, promptings, family history, 

 making life plans, for movies/hobbies or even school/work) 

3. Probability 

 a. Language of uncertainty 

 b. Economic applications: risk/insurance, investments, shopping/learning 

 c. Data analysis (huge): infer population characteristics from sample 

 d. Fundamentally, probability is merely ratio 

 e. Sample space / Universe 𝑆𝑆={1, 2, 3, 4, 5, 6} 

---

 f. Subset / Event 

 i. 𝐵𝐵= 

#### { 

#### 4, 5, 6 

#### } 

 ii. 𝐸𝐸={2, 4, 6} 

 g. Probability function 𝑃𝑃(𝐸𝐸)= 

 𝑛𝑛 𝐸𝐸 

 𝑛𝑛 𝑆𝑆 

#### = 

 3 

 6 

 i. A function is like a machine; in this case, output is number but input is set 

 ii. 𝑃𝑃 

#### ( 

#### 𝑆𝑆 

#### ) 

#### = 1 

 h. Categorical descriptions: 50/500 unemployed = 10% unemployment rate / probability 

4. Set Notation 

 a. Element 

 i. 5 ∈𝐵𝐵, 5 ∉𝐸𝐸 

 b. Subset 

 i. 𝐵𝐵 ⊆𝑆𝑆 

 c. Empty set ∅ 

 d. Complement 

 i. 𝐵𝐵 

#### � 

#### = 

#### { 

#### 1, 2, 3 

#### } 

 ii. 𝐸𝐸 

#### � 

#### ={1, 3, 5} 

 iii. 𝑃𝑃 

#### ( 

#### 𝐸𝐸 

#### � 

#### ) 

#### = 1 −𝑃𝑃 

#### ( 

#### 𝐸𝐸 

#### � 

#### ) 

 iv. Note: this is a simple but useful tool. Sometimes it’s easier to derive 𝑃𝑃(𝐸𝐸 

#### � 

 ) than 

 to derive 𝑃𝑃(𝐸𝐸). For example: the probability that two or more students in Econ 

 378 share birthdays is very difficult to find directly, but the complementary 

 event (i.e. that no two students share a birthday) is not as bad. 

 e. Intersection (“and”) 

 i. 𝐵𝐵∩𝐸𝐸={4, 6} 

 ii. 𝐵𝐵 

#### � 

#### ∩𝐸𝐸 

#### � 

#### = 

#### { 

#### 1, 3 

#### } 

 f. Union (“or”, “at least one”) 

 i. 𝐵𝐵∪𝐸𝐸={2, 4, 5,6} 

 ii. 𝐵𝐵 

#### � 

#### ∪𝐸𝐸 

#### � 

#### = 

#### { 

#### 1, 2, 3,5 

#### } 

 g. Mutually exclusive 

 i. 𝐴𝐴∩𝐵𝐵=∅ 

 ii. 𝑃𝑃 

#### ( 

#### 𝐴𝐴∩𝐵𝐵 

#### ) 

#### = 0 

 h. Collectively exhaustive 

 i. 𝐴𝐴∪𝐵𝐵=𝑆𝑆 

---

 ii. 𝑃𝑃(𝐴𝐴∪𝐵𝐵)= 1 

5. Total probability: 𝑃𝑃 

#### ( 

#### 𝐴𝐴∪𝐵𝐵 

#### ) 

#### =𝑃𝑃 

#### ( 

#### 𝐴𝐴 

#### ) 

#### +𝑃𝑃 

#### ( 

#### 𝐵𝐵 

#### ) 

#### −𝑃𝑃(𝐴𝐴∩𝐵𝐵) 

 a. Including both 𝑃𝑃(𝐴𝐴) and 𝑃𝑃(𝐵𝐵) “double counts” 𝑃𝑃(𝐴𝐴∩𝐵𝐵) 

 b. Example: among set 𝑆𝑆 of workers in particular industry, unemployment rate 𝑃𝑃(𝑈𝑈)= 

 .10, women 𝑃𝑃(𝑊𝑊)=.25, intersection 𝑃𝑃(𝑈𝑈∩𝑊𝑊)=.05; 𝑃𝑃(𝑈𝑈∪𝑊𝑊)=.1 +.25−.05= 

#### .3 

6. Independence: 𝑃𝑃 

#### ( 

#### 𝐴𝐴∩𝐵𝐵 

#### ) 

#### =𝑃𝑃 

#### ( 

#### 𝐴𝐴 

#### ) 

#### 𝑃𝑃(𝐵𝐵) 

 a. Example: 𝑃𝑃(𝑈𝑈)𝑃𝑃(𝑊𝑊)=(. 10)(. 25)=.025≠.05=𝑃𝑃(𝑈𝑈∩𝑊𝑊) 

 b. Not the same as mutually exclusive! (Mutually exclusive events are highly negatively 

 correlated) 

7. Combinatorics 

 a. “𝑚𝑚𝑛𝑛 rule” 

 i. 6 pants (2 brown), 10 shirts (3 green); probability that random outfit consists of 

 brown pants and green shirt is 𝑃𝑃(𝐵𝐵∩𝐺𝐺)= 

 # 

 { 𝐵𝐵∩𝐺𝐺 𝑜𝑜𝑜𝑜𝑜𝑜𝑑𝑑𝑖𝑖 𝑜𝑜𝑜𝑜 

 } 

 # 

 { 𝑜𝑜𝑜𝑜𝑜𝑜 𝑑𝑑𝑖𝑖 𝑜𝑜𝑜𝑜 

 } 

#### = 

 2⋅3 

 6⋅10 

#### =.1 

 ii. Equivalently, since independent, 𝑃𝑃(𝐵𝐵∩𝐺𝐺)=𝑃𝑃(𝐵𝐵)𝑃𝑃(𝐺𝐺)= 

 2 

 6 

#### ⋅ 

 3 

 10 

#### =.1 

 b. Number of ways to permute (i.e. order) 10 students: 10 !≈3. 6 𝑚𝑚𝑖𝑖 𝑙𝑙𝑙𝑙𝑖𝑖𝑛𝑛𝑛𝑛 

 c. Number of ways to choose 3 out of 10 students: 𝐶𝐶 

 3 

 10 

#### =� 

#### 10 

#### 3 

#### �= 

 10! 

 3! 7! 

#### = 120 

 i. Numerator: there are 10! ways to order the 10 students 

 ii. Denominator: but this double-counts (3!7! times) orderings which shuffle the 

 first three and last seven, but don’t change the identity of the chosen three 

 d. Number of ways to assign 10 students into bins of 3, 5, 2: 

 10! 

 3! 5! 2! 

#### =2, 520 

8. Applications: discrimination lawsuit after 9 workers (3 immigrants, 6 natives) assigned to 4 

 dangerous jobs + 5 safe jobs 

 a. All 3 immigrants assigned to dangerous jobs 

 i. 𝑃𝑃(𝐸𝐸)= 

 𝑛𝑛 𝐸𝐸 

 𝑛𝑛 𝑆𝑆 

#### = 

 𝐶𝐶 

 3 

 3 

 ×𝐶𝐶 

 1 

 6 

 𝐶𝐶 

 4 

 9 

#### = 

 � 

 3! 

 3! 0! 

 �� 

 6! 

 1! 5! 

 � 

 9! 

 4! 5! 

#### = 

 6 

 � 

 9⋅8⋅7⋅6 

 4⋅3⋅2⋅1 

 � 

#### = 

 1 

 21 

#### ≈0. 05 

 ii. Alternatively, can think sequentially: 

 4 

 9 

#### ⋅ 

 3 

 8 

#### ⋅ 

 2 

 7 

#### = 

 1 

 21 

 iii. Alternatively, can assign workers to safe jobs: 𝑃𝑃(𝐸𝐸)= 

 𝑛𝑛 

 𝐸𝐸 

 𝑛𝑛 

 𝑆𝑆 

#### = 

 𝐶𝐶 

 0 

 3 

 ×𝐶𝐶 

 5 

 6 

 𝐶𝐶 

 5 

 9 

#### ≈0. 05 

 iv. Alternatively, can assign jobs to workers: 𝑃𝑃(𝐸𝐸)= 

 𝐶𝐶 

 3 

 4 

 𝐶𝐶 

 0 

 5 

 𝐶𝐶 

 3 

 9 

#### ≈0. 05 

 b. 2 out of 3 immigrants assigned to dangerous jobs 

---

 i. 𝑃𝑃( 2 )= 

 𝑛𝑛 𝐸𝐸 

 𝑛𝑛 𝑆𝑆 

#### = 

 � 

 𝐶𝐶 

 2 

 3 

 ×𝐶𝐶 

 2 

 6 

 � 

 𝐶𝐶 

 4 

 9 

#### = 

 � 

 3! 

 2! 1! 

 �� 

 6! 

 2! 4! 

 � 

 9! 

 4! 5! 

#### = 

 3� 

 6⋅5 

 2⋅1 

 � 

 � 

 9⋅8⋅7⋅6 

 4⋅3⋅2⋅1 

 � 

#### = 

 5 

 14 

#### ≈0. 36 

 ii. 𝑃𝑃(𝐸𝐸)=𝑃𝑃( 2 )+𝑃𝑃( 3 )≈0. 36+0. 05=0. 41 

 c. 24 workers assigned to 10 safe and 14 dangerous jobs, lawsuit because 6 immigrants all 

 assigned dangerous job 

 i. 𝑃𝑃(𝐸𝐸 

 1 

#### )= 

 𝑛𝑛 

 𝐸𝐸 

 𝑛𝑛 

 𝑆𝑆 

#### = 

 𝐶𝐶 

 8 

 18 

 𝐶𝐶 

 6 

 6 

 𝐶𝐶 

 14 

 24 

#### = 

 18! 

 8! 10! 

 6! 

 6! 0! 

 24! 

 14! 10! 

#### = 

 18! 14! 

 8! 24! 

#### ≈.022 

 ii. 

 𝐶𝐶 

 6 

 14 

 𝐶𝐶 

 0 

 10 

 𝐶𝐶 

 6 

 24 

#### = 

 14! 

 6! 8! 

 10! 

 0! 10! 

 24! 

 6! 18! 

#### = 

 14! 18! 

 8! 24! 

#### ≈.022 

 iii. If 5 out of 6 assigned dangerous job: 𝑃𝑃(𝐸𝐸 

 2 

#### )= 

 𝐶𝐶 

 9 

 18 

 𝐶𝐶 

 5 

 6 

 𝐶𝐶 

 14 

 24 

#### = 

 18! 

 9! 9! 

 6! 

 5! 1! 

 24! 

 14! 10! 

#### = 

 18! 14 !10 ∙6 

 24! 9! 

#### ≈.149, 

#### 𝑃𝑃 

#### ( 

#### 𝐸𝐸 

#### ) 

#### ≈.022+.149=.171 

## L8 Conditional Probability (WMS 2.7-10) 

1. If possible, be prepared next lecture with idea for research project 

2. Typically, don’t count to determine Pr 

#### ( 

#### 𝐸𝐸 

#### ) 

 ; estimate from sample 

Conditional probability 

1. Definition: Pr(𝐴𝐴|𝐵𝐵)= 

 Pr(𝐴𝐴∩𝐵𝐵) 

 Pr(𝐵𝐵) 

2. This is how online stores (e.g. Ebay, Amazon, Google) figure out what to advertise: given that 

 you purchased a textbook, how likely are you to want a Lego set or motorcycle helmet? 

3. Story problem keywords: “given”, “conditional on”, “among”, or “out of” 

4. Example 1: Among set 𝑆𝑆 of workers in particular industry, unemployment rate 𝑃𝑃(𝑈𝑈)=.10, 

 women 𝑃𝑃(𝑊𝑊)=.25, intersection 𝑃𝑃(𝑈𝑈∩𝑊𝑊)=.05 

 d. Rectangular Venn diagram 

 e. Unemployment rate among women 𝑃𝑃(𝑈𝑈|𝑊𝑊)= 

. 05 

. 25 

#### =.20 

 f. Fraction of unemployed who are women 𝑃𝑃(𝑊𝑊 

#### | 

#### 𝑈𝑈)= 

. 05 

. 10 

#### =.50 

 g. Practice: 

 i. Unemployment rate among men 𝑃𝑃 

#### ( 

#### 𝑈𝑈 

#### | 

#### 𝑊𝑊 

#### � 

#### ) 

#### = 

. 05 

. 75 

#### = 

 1 

 15 

#### ≈.07 

 ii. Fraction of unemployed who are men 𝑃𝑃(𝑊𝑊 

#### � 

#### |𝑈𝑈)= 

. 05 

. 10 

#### =.50= 1 −𝑃𝑃(𝑊𝑊|𝑈𝑈) 

---

Independence 

1. Definition: 𝑃𝑃 

#### ( 

#### 𝐴𝐴 

#### | 

#### 𝐵𝐵 

#### ) 

#### =𝑃𝑃(𝐴𝐴), 𝑃𝑃 

#### ( 

#### 𝐵𝐵 

#### | 

#### 𝐴𝐴 

#### ) 

 =𝑃𝑃(𝐵𝐵) (equivalent to 𝑃𝑃 

#### ( 

#### 𝐴𝐴∩𝐵𝐵 

#### ) 

#### =𝑃𝑃 

#### ( 

#### 𝐴𝐴 

#### ) 

#### 𝑃𝑃 

#### ( 

#### 𝐵𝐵 

#### ) 

#### ) 

2. What is the probability of a person being unemployed? 𝑃𝑃 

#### ( 

#### 𝐴𝐴 

#### ) 

 =.10; what if it’s raining outside? 

 Then the probability of being unemployed is 𝑃𝑃(𝐴𝐴 

#### | 

#### 𝐵𝐵)=.10. 

3. Surgeon joke (failing to account for independence): the bad news is that this type of surgery is 

 successful only 25% of the time. The good news is that the last three patients all died. 

Event decomposition: 

1. If 𝐸𝐸 

 1 

#### , ...,𝐸𝐸 

 𝑘𝑘 

 are mutually exclusive and collectively exhaustive then 𝑃𝑃(𝐴𝐴)=∑ 𝑃𝑃(𝐴𝐴∩𝐸𝐸 

 𝑘𝑘 

#### ) 

 𝑛𝑛 

 𝑘𝑘=1 

2. Example 1: 30% of web traffic comes from a Google add (𝐺𝐺), 30% from online newspaper (𝑁𝑁), 

 and 40% from a product reviewer’s blog (𝑅𝑅). 40% of Google traffic, 20% of newspaper traffic, 

 and 30% of reviewer traffic end in a sale (𝑆𝑆). What fraction of overall traffic ends in a purchase? 

 a. Step 1: draw event tree (first web source, then purchase decision) 

 b. Step 2: translate question into notation. 𝑃𝑃(𝐺𝐺)=.3, 𝑃𝑃(𝑁𝑁)=.3, 𝑃𝑃(𝑇𝑇)=.4, 𝑃𝑃(𝑆𝑆|𝐺𝐺)= 

 .4, 𝑃𝑃(𝑆𝑆|𝑁𝑁)=.2, 𝑃𝑃(𝑆𝑆|𝑅𝑅)=.3, wish to find 𝑃𝑃(𝑆𝑆) 

 c. 𝑃𝑃(𝑆𝑆)=𝑃𝑃(𝑆𝑆∩𝐺𝐺)+𝑃𝑃(𝑆𝑆∩𝑁𝑁)+𝑃𝑃(𝑆𝑆∩𝑅𝑅) 

#### =𝑃𝑃 

#### ( 

#### 𝐺𝐺 

#### ) 

#### 𝑃𝑃 

#### ( 

#### 𝑆𝑆 

#### | 

#### 𝐺𝐺 

#### ) 

#### +𝑃𝑃 

#### ( 

#### 𝑁𝑁 

#### ) 

#### 𝑃𝑃 

#### ( 

#### 𝑆𝑆 

#### | 

#### 𝑁𝑁 

#### ) 

#### +𝑃𝑃 

#### ( 

#### 𝑅𝑅 

#### ) 

#### 𝑃𝑃 

#### ( 

#### 𝑆𝑆 

#### | 

#### 𝑅𝑅 

#### ) 

#### =.3 ×.4 +.3 ×.2 +.4 ×.3 =.12+ 

#### .06+.12=.3 

 d. 𝑆𝑆 and 𝑅𝑅 are independent, since 𝑃𝑃 

#### ( 

#### 𝑆𝑆 

#### | 

#### 𝑅𝑅 

#### ) 

#### =𝑃𝑃 

#### ( 

#### 𝑆𝑆 

#### ) 

 =.3. Is 𝑆𝑆 independent of 𝐺𝐺? Of 𝑁𝑁? 

3. Bayes’ Rule 

 a. 𝑃𝑃(𝐴𝐴∩𝐵𝐵)=� 

#### 𝑃𝑃(𝐴𝐴|𝐵𝐵)𝑃𝑃(𝐵𝐵) 

#### 𝑃𝑃 

#### ( 

#### 𝐵𝐵 

#### | 

#### 𝐴𝐴 

#### ) 

#### 𝑃𝑃 

#### ( 

#### 𝐴𝐴 

#### ) 

 b. Therefore, can derive 𝑃𝑃 

#### ( 

#### 𝐴𝐴 

#### | 

#### 𝐵𝐵 

#### ) 

 from 𝑃𝑃 

#### ( 

#### 𝐵𝐵 

#### | 

#### 𝐴𝐴 

#### ) 

 , or vice versa. 

 c. 𝑃𝑃(𝐴𝐴|𝐵𝐵)= 

 𝑃𝑃 � 

#### 𝐵𝐵 

 � 

#### 𝐴𝐴 

 � 

 𝑃𝑃(𝐴𝐴) 

 𝑃𝑃 

 ( 𝐵𝐵 

 ) 

#### = 

 𝑃𝑃 � 

#### 𝐵𝐵 

 � 

#### 𝐴𝐴 

 � 

 𝑃𝑃(𝐴𝐴) 

#### 𝑃𝑃�𝐵𝐵�𝐴𝐴�𝑃𝑃(𝐴𝐴)+𝑃𝑃�𝐵𝐵�𝐴𝐴 

#### ̅ 

 �𝑃𝑃(𝐴𝐴 

 ̅ ) 

 d. Practice: find and interpret 𝑃𝑃(𝐺𝐺|𝑆𝑆), 𝑃𝑃(𝑅𝑅|𝑆𝑆), 𝑃𝑃(𝑁𝑁|𝑆𝑆) = 

 𝑃𝑃 

 ( 𝑁𝑁∩𝑆𝑆 

 ) 

 𝑃𝑃 

 ( 𝑆𝑆 

 ) 

#### = 

. 06 

. 3 

 =.2 (mere 

 coincidence that 𝑃𝑃(𝑁𝑁|𝑆𝑆)=𝑃𝑃(𝑆𝑆|𝑁𝑁)) 

4. Warning: think carefully about difference between 𝑃𝑃(𝐴𝐴|𝐵𝐵), 𝑃𝑃(𝐴𝐴), and 𝑃𝑃(𝐵𝐵|𝐴𝐴). Be sure you 

 know which you really want. 

5. Note: It’s possible for composite probabilities and conditional probabilities to tell rather 

 opposite stories 

---

a. Charig et al. (1986): Kidney stone treatment B looked more effective, but A was more 

 actually effective more effective both with small stones and large stones (but stone size 

 matters, and treatments A and B had been used disproportionately on large and small 

 stones, respectively) 

 Kidney stone size Treatment A Treatment B 

 Small 81/87= 93% 234/270=87% 

 Large 192/263= 73% 55/80=69% 

 Both 273/350=78% 289/350= 83% 

b. MLB batting averages: David Justice was better in 1995 and 1996 but Derek Jeter was 

 better in 1995-96. Who is better batter? 

 Batter 1995 1996 1995 96 

 Derek Jeter 12/48=.250 183/582=.314 195/630= .310 

 David Justice 104/411= .253 45/140= .321 149/551=.270 

 Either could be. Likely depends on which is more predictive of 1997 (depends on other 

 assumptions) 

c. Israel covid data: August 2021 (https://www.covid-datascience.com/post/israeli-data

 how-can-efficacy-vs -severe-disease-be-strong-when-60-of -hospitalized-are-vaccinated) 

 i. When covid Delta variant hit, Israeli hospitals filled up with covid cases: 214 that 

 were unvaccinated and 301 that were vaccinated. Since 60% were vaccinated, 

 superficial conclusion is that vaccines make covid worse, not better! 

 ii. But 60%=P(vax|cv). We really want to know P(cv|vax) (actually, want to 

 compare P(cv|vax) and P(cv|no vax)) 

 iii. 𝑃𝑃(𝑐𝑐𝑐𝑐|𝑐𝑐𝑎𝑎𝑥𝑥) = 301 /5, 634,634=5. 3∗ 10 

 −5 

#### 𝑃𝑃 

#### ( 

#### 𝑐𝑐𝑐𝑐 

#### | 

#### 𝑛𝑛𝑛𝑛 𝑐𝑐𝑎𝑎𝑥𝑥 

#### ) 

#### = 

 214 

 1 , 302 , 912 

#### = 16 .4∗ 10 

 −5 

 Vaccinated only catch covid 

 5. 3 

 16. 4 

 =32% as often (i.e. vaccine 68% effective) 

 iv. Nearly 80% of Israelis over age 12 were vaccinated against covid, so if it were 

 unrelated random draw, 80% of covid patients should have been vaccinated; 

 lower rate than 80% supports hypothesis that treatment helped. 

---

 v. Put differently, so many Israelis were vaccinated that even though those 

 vaccinated only got covid 68% as often, there were more vaccinated covid cases 

 than unvaccinated covid cases. 

## L9 Probability Distributions (WMS 3.1-3) 

1. Events are useful for describing binary/categorical information. Next, we’ll consider random 

 variables, which are useful for describing quantitative information. 

2. Random variables 

 a. Distribution Function: Number of cars 𝑋𝑋 owned by a family 𝑃𝑃(𝑥𝑥)=𝑃𝑃(𝑋𝑋=𝑥𝑥)= 

#### ⎩ 

#### ⎪ 

#### ⎨ 

#### ⎪ 

#### ⎧ 

#### . 10 𝑖𝑖𝑓𝑓 𝑥𝑥= 0 

#### . 30 𝑖𝑖𝑓𝑓 𝑥𝑥= 1 

#### . 40 𝑖𝑖𝑓𝑓 𝑥𝑥= 2 

#### . 20 𝑖𝑖𝑓𝑓 𝑥𝑥= 3 

#### 0 𝑒𝑒𝑙𝑙𝑒𝑒𝑒𝑒 

 b. Mean (i.e. average) “mu” 𝜇𝜇 

 i. We don’t know total population size. If we knew there were 100 families, 𝜇𝜇= 

 1 

 100 

 ( 0 ⋅ 10 + 1 ⋅ 30 + 2 ⋅ 40 + 3 ⋅ 20 )=1. 7. If population size 𝑛𝑛 is unknown 

 then 𝜇𝜇= 

 1 

 𝑛𝑛 

#### [ 

#### 0 

#### ( 

#### . 10𝑛𝑛 

#### ) 

#### + 1 

#### ( 

#### . 30𝑛𝑛 

#### ) 

#### + 2 

#### ( 

#### . 40𝑛𝑛 

#### ) 

#### + 3 

#### ( 

#### . 20𝑛𝑛 

#### )] 

 but this reduces to ... 

 ii. Expected value (or “expectation”) 𝜇𝜇=𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### ) 

#### = 

#### ∑ 

#### 𝑥𝑥𝑃𝑃(𝑥𝑥) 

 𝑥𝑥 

#### = 0 

#### ( 

#### . 10 

#### ) 

#### + 1 

#### ( 

#### . 30 

#### ) 

#### + 

#### 2 

#### ( 

#### . 40 

#### ) 

#### + 3 

#### ( 

#### . 20 

#### ) 

#### =1. 7 

1. Note: if all realizations of 𝑋𝑋 are equally likely then 𝑃𝑃 

#### ( 

#### 𝑥𝑥 

#### ) 

#### = 

 1 

 𝑛𝑛 

 for all 𝑥𝑥 so 

#### 𝐸𝐸(𝑋𝑋)=∑ 𝑥𝑥 

 1 

 𝑛𝑛 

 𝑥𝑥 

#### = 

 1 

 𝑛𝑛 

#### ∑ 𝑥𝑥 

 𝑥𝑥 

 reduces to familiar formula 

 c. Expected value of functions of 𝑋𝑋 

 i. Example: expected utility 𝐸𝐸 

#### [ 

#### 𝑢𝑢 

#### ( 

#### 𝑋𝑋 

#### )] 

#### =𝐸𝐸�√𝑋𝑋�) 

 ii. Formula: 𝐸𝐸[𝑓𝑓(𝑥𝑥)]=∑ 𝑓𝑓(𝑥𝑥)𝑃𝑃(𝑥𝑥) 

 𝑥𝑥 

 iii. Example: 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

 2 

#### ) 

#### = 0 

 2 

#### ( 

#### . 1 

#### ) 

#### + 1 

 2 

#### ( 

#### . 3 

#### ) 

#### + 2 

 2 

#### ( 

#### . 4 

#### ) 

#### + 3 

 2 

#### ( 

#### . 2 

#### ) 

#### =3. 7 

 iv. Algebra shortcuts 

1. Linear functions, e.g. car maintenance cost 𝐶𝐶= 200 + 100 𝑋𝑋; average 

 maintenance cost 𝐸𝐸(𝐶𝐶)= 200 (. 1)+ 300 (. 3)+ 400 (. 4)+ 500 (. 2)= 

#### 370 

2. Shortcuts: 𝐸𝐸 

#### ( 

#### 200 + 100 𝑋𝑋 

#### ) 

#### =𝐸𝐸 

#### ( 

#### 200 

#### ) 

#### +𝐸𝐸 

#### ( 

#### 100 𝑋𝑋 

#### ) 

---

#### = 200 + 100 𝐸𝐸(𝑋𝑋)= 200 + 100 (1. 7)= 370 

 a. Summations: 𝐸𝐸 

#### (∑ 

#### 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### ) 

#### = 

#### ∑ 

#### 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

 b. Pull out coefficients 

 c. For constant 𝑐𝑐, 𝐸𝐸(𝑐𝑐)=𝑐𝑐 

 d. Variance, standard deviation 

 i. Variance 𝜎𝜎 

 2 

#### =𝑉𝑉 

#### ( 

#### 𝑋𝑋 

#### ) 

#### =𝐸𝐸 

#### [( 

#### 𝑋𝑋−𝜇𝜇 

#### ) 

 2 

#### ] 

#### = 

#### [( 

#### 0 −1. 7 

#### ) 

 2 

#### ]( 

#### . 1 

#### ) 

#### + 

#### [( 

#### 1 −1. 7 

#### ) 

 2 

#### ]( 

#### . 3 

#### ) 

#### + 

#### [ 

#### ( 2 −1. 7) 

 2 

#### ] 

#### (. 4)+ 

#### [ 

#### ( 3 −1. 7) 

 2 

#### ] 

#### (. 2)=.81 

 ii. Standard deviation 𝜎𝜎=√𝜎𝜎 

 2 

#### = 

#### √ 

#### . 81=.9 

1. Interpretation: by rule of thumb, “most” families own between -.1 and 

 3.5 cars 

2. Note: variance, by itself, is difficult to interpret (e.g. units is “cars 

 squared”), but is easier to work with algebraically, because it’s 

 technically and average of something, whereas standard deviation is the 

 square root of an average of something. 

 iii. Simpler formula: 𝑉𝑉(𝑋𝑋) =𝐸𝐸 

#### ( 

#### 𝑋𝑋 

 2 

#### ) 

#### −𝜇𝜇 

 2 

#### =3. 7− 

#### ( 

#### 1. 7 

#### ) 

 2 

#### =.81 

1. Show equivalent, as homework problem 

2. Remember this formula, as we’ll use it repeatedly 

 iv. Algebra shortcuts 

#### 1. 𝐸𝐸(𝐶𝐶 

 2 

#### )= 200 

 2 

#### (. 1)+ 300 

 2 

#### (. 3)+ 400 

 2 

#### (. 4)+ 500 

 2 

#### (. 2)= 145 ,000 

 doesn’t have any easy algebra shortcut; 𝑉𝑉(𝐶𝐶)=𝐸𝐸(𝐶𝐶 

 2 

#### )− 370 

 2 

#### =8, 100 

2. Shortcut: 𝑉𝑉(𝐶𝐶)=𝑉𝑉( 200 + 100 𝑋𝑋)=𝑉𝑉( 100 𝑋𝑋)= 100 

 2 

#### 𝑉𝑉(𝑋𝑋)=8, 100 

 a. 200 gets added and subtracted: 𝑉𝑉(𝐶𝐶)=𝐸𝐸{[( 200 + 100 𝑋𝑋)− 

#### 𝐸𝐸 

#### ( 

#### 200 + 100 𝑋𝑋 

#### )] 

 2 

#### } 

 b. For constant 𝑐𝑐, 𝑉𝑉(𝑐𝑐)= 0 

 c. Pull out coefficients, ... but square them! (because Variance is a 

 quadratic function of a random variable) 

3. Practice example: number 𝑌𝑌 of car accidents 𝑃𝑃(𝑌𝑌=𝑥𝑥)=� 

#### . 7 𝑖𝑖𝑓𝑓 𝑥𝑥= 0 

#### . 2 𝑖𝑖𝑓𝑓 𝑥𝑥= 1 

#### . 1 𝑖𝑖𝑓𝑓 𝑥𝑥= 2 

#### 0 𝑒𝑒𝑙𝑙𝑒𝑒𝑒𝑒 

 a. 𝜇𝜇= 0 (. 7)+ 1 (. 2)+ 2 (. 1)=.4 

 b. 𝐸𝐸(𝑌𝑌 

 2 

#### )= 0 

 2 

#### (. 7)+ 1 

 2 

#### (. 2)+ 2 

 2 

#### (. 1)=.6 

 c. 𝑉𝑉 

#### ( 

#### 𝑌𝑌 

#### ) 

#### =𝐸𝐸 

#### ( 

#### 𝑌𝑌 

 2 

#### ) 

#### −𝜇𝜇 

 2 

#### =.6− 

#### ( 

#### . 4 

#### ) 

 2 

#### =.44 

---

 d. 𝜎𝜎=√. 44≈.663 

 e. Insurance profit Π=$1200−$2000⋅𝑌𝑌 

 i. E(Π)=E( 1200 − 2000 ⋅Y)= 1200 − 2000 𝐸𝐸(𝑌𝑌)= 1200 − 2000 (. 4)= 

#### $400 

 ii. 𝑉𝑉(Π)=V( 1200 −2000Y)=0 +(− 2000 ) 

 2 

#### 𝑉𝑉(𝑌𝑌)=4, 000,000(. 44)= 

#### 1, 760,000 

 iii. 𝜎𝜎 

 Π 

#### = 

#### √ 

#### 1, 760,000=$1,326 

 f. Review this one more time before attempting your homework! 

## L10 Correlation (WMS 3.1-8) 

 [Long lecture; use time efficiently] 

1. Correlation coefficient 𝜌𝜌∈[−1, 1] 

 a. Positive correlation means variables 𝑋𝑋 and 𝑌𝑌 tend to move in same direction (e.g. 

 temperature 𝑋𝑋 and ice cream sales 𝑌𝑌) 

 b. Negative correlation means variables 𝑋𝑋 and 𝑌𝑌 tend to move in opposite direction (e.g. 

 frequency of exercise 𝑋𝑋 and body mass index 𝑌𝑌) 

 c. Magnitude indicates strength of relationship 

 d. Independence implies 𝜌𝜌= 0 

2. Joint distribution function 

 a. Employee hours per week 𝑋𝑋 and hourly wage 𝑌𝑌 

#### 𝑌𝑌= 10 𝑌𝑌= 15 

#### 𝑋𝑋= 20 .2 .1 

#### 𝑋𝑋= 30 .1 .2 

#### 𝑋𝑋= 40 .1 .3 

 Illustrate: 𝑃𝑃(𝑥𝑥,𝑥𝑥)=𝑃𝑃(𝑋𝑋=𝑥𝑥∩𝑌𝑌=𝑥𝑥)= 

#### ⎩ 

#### ⎪ 

#### ⎪ 

#### ⎨ 

#### ⎪ 

#### ⎪ 

#### ⎧ 

#### . 2 𝑖𝑖𝑓𝑓 (𝑥𝑥,𝑥𝑥)=( 20 ,10) 

#### . 1 𝑖𝑖𝑓𝑓 (𝑥𝑥,𝑥𝑥)=( 20 ,15) 

#### . 1 𝑖𝑖𝑓𝑓 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### = 

#### ( 

#### 30 ,10 

#### ) 

#### . 2 𝑖𝑖𝑓𝑓 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### = 

#### ( 

#### 30 ,15 

#### ) 

#### . 1 𝑖𝑖𝑓𝑓 (𝑥𝑥,𝑥𝑥)=( 40 ,10) 

#### . 3 𝑖𝑖𝑓𝑓 (𝑥𝑥,𝑥𝑥)=( 40 ,15) 

3. Marginal distributions 

---

 a. Sum rows or columns: 𝑃𝑃(𝑥𝑥)=� 

#### . 3 𝑖𝑖𝑓𝑓 𝑥𝑥= 20 

#### . 3 𝑖𝑖𝑓𝑓 𝑥𝑥= 30 

#### . 4 𝑖𝑖𝑓𝑓 𝑥𝑥= 40 

 and 𝑃𝑃(𝑥𝑥)=� 

#### . 4 𝑖𝑖𝑓𝑓 𝑥𝑥= 10 

#### . 6 𝑖𝑖𝑓𝑓 𝑥𝑥= 15 

 b. Summary statistics (quick recap) 

 i. 𝜇𝜇 

 𝑥𝑥 

#### = 20 (. 3)+ 30 (. 3)+ 40 (. 4)= 31 

 ii. 𝜎𝜎 

 𝑥𝑥 

#### ≈8. 3 

#### 1. 𝐸𝐸(𝑋𝑋 

 2 

#### )= 20 

 2 

#### (. 3)+ 30 

 2 

#### (. 3)+ 40 

 2 

#### (. 4)=1, 030 

#### 2. 𝜎𝜎 

 𝑥𝑥 

 2 

#### =1, 030− 31 

 2 

#### = 69 

#### 3. 𝜎𝜎 

 𝑥𝑥 

#### =√ 69 ≈8. 3 

 iii. 𝜇𝜇 

 𝑦𝑦 

#### = 10 (. 4)+ 15 (. 6)= 13 

 iv. 𝜎𝜎 

 𝑦𝑦 

#### ≈2. 4 

#### 1. 𝐸𝐸 

#### ( 

#### 𝑌𝑌 

 2 

#### ) 

#### = 10 

 2 

#### ( 

#### . 4 

#### ) 

#### + 15 

 2 

#### ( 

#### . 6 

#### ) 

#### = 175 

#### 2. 𝜎𝜎 

 𝑦𝑦 

 2 

#### = 175 − 13 

 2 

#### = 6 

#### 3. 𝜎𝜎 

 𝑦𝑦 

#### =√ 6 ≈2. 4 

 c. Independence 

 i. Definition: 𝑃𝑃 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### =𝑃𝑃 

 𝑥𝑥 

#### ( 

#### 𝑥𝑥 

#### ) 

#### 𝑃𝑃 

 𝑦𝑦 

 (𝑥𝑥) for every 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

 pair 

 ii. Not independent here, since 𝑃𝑃 

#### ( 

#### 20 ,10 

#### ) 

#### =.20≠𝑃𝑃 

#### ( 

#### 20 

#### ) 

#### 𝑃𝑃 

#### ( 

#### 10 

#### ) 

#### =.3 ×.4 =.12 

4. Expectations of functions of 𝑋𝑋 and 𝑌𝑌 

 a. Average weekly payment 𝐸𝐸 

#### ( 

#### 𝑋𝑋𝑌𝑌 

#### ) 

#### = 

#### ( 

#### 20 ⋅ 10 

#### )( 

#### . 20 

#### ) 

#### + 

#### ( 

#### 20 ⋅ 15 

#### )( 

#### . 10 

#### ) 

#### + 

#### ( 30 ⋅ 10 )(. 10)+( 30 ⋅ 15 )(. 20)+( 40 ⋅ 10 )(. 10)+( 40 ⋅ 15 )(. 30)= 40 + 30 + 30 + 

#### 90 + 40 + 180 = 410 

 b. Can do any function 𝐸𝐸 

#### [ 

#### 𝑓𝑓 

#### ( 

#### 𝑋𝑋,𝑌𝑌 

#### )] 

#### = 

#### ∑ 

#### 𝑓𝑓 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### 𝑃𝑃(𝑥𝑥,𝑥𝑥) 

 (𝑥𝑥,𝑦𝑦) 

5. Correlation 

 a. Covariance 

#### 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

#### =𝐸𝐸�(𝑋𝑋−𝜇𝜇 

 𝑥𝑥 

#### )�𝑌𝑌−𝜇𝜇 

 𝑦𝑦 

#### �� 

#### = 

#### [( 

#### 20 − 31 

#### )( 

#### 10 − 13 

#### )]( 

#### . 20 

#### ) 

#### +[( 20 − 31 )( 15 − 13 )](. 10) 

#### +[( 30 − 31 )( 10 − 13 )](. 10) 

#### + 

#### [( 

#### 30 − 31 

#### )( 

#### 10 − 15 

#### )]( 

#### . 20 

#### ) 

#### +[( 40 − 31 )( 10 − 13 )](. 10) 

#### +[( 40 − 31 )( 15 − 13 )](. 30)= 7 

 b. Simpler formula: 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

#### =𝐸𝐸 

#### ( 

#### 𝑋𝑋𝑌𝑌 

#### ) 

#### −𝜇𝜇 

 𝑥𝑥 

#### 𝜇𝜇 

 𝑦𝑦 

#### = 410 − 

#### ( 

#### 31 

#### )( 

#### 13 

#### ) 

#### = 7 

---

 c. Correlation 𝜌𝜌= 

 𝜎𝜎 

 𝑥𝑥𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

#### = 

 7 

 ( 8. 3 

 )( 2. 4 

 ) 

#### ≈0. 35 

 i. Positive, but fairly weak (again, not independent) 

 ii. Later: 𝜌𝜌 

 2 

 ≈0. 12 measures % of variation in 𝑌𝑌 that covaries with 𝑋𝑋 

6. Algebra shortcuts 

 a. Covariance of a sum 

#### 𝐶𝐶𝑛𝑛𝑐𝑐 

#### ( 

#### 𝑋𝑋, 1200− 2000 𝑌𝑌 

#### ) 

#### =𝐶𝐶𝑛𝑛𝑐𝑐 

#### ( 

#### 𝑋𝑋, 1200 

#### ) 

#### +𝐶𝐶𝑛𝑛𝑐𝑐 

#### ( 

#### 𝑋𝑋,− 2000 𝑌𝑌 

#### ) 

#### =0 + 

#### ( 

#### − 2000 

#### ) 

#### 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

 b. Correlation of a sum 

#### 𝐶𝐶𝑛𝑛𝐶𝐶𝐶𝐶(𝑋𝑋, 1200− 2000 𝑌𝑌)=−𝜌𝜌 

 c. Variance of a sum 

#### 𝑉𝑉 

#### ( 

#### 𝑋𝑋+𝑌𝑌 

#### ) 

#### =𝑉𝑉 

#### ( 

#### 𝑋𝑋 

#### ) 

#### +𝑉𝑉 

#### ( 

#### 𝑌𝑌 

#### ) 

#### + 2 𝐶𝐶 𝑛𝑛𝑐𝑐(𝑋𝑋,𝑌𝑌) 

 d. Variance of a larger sum 

#### 𝑉𝑉(𝑋𝑋+𝑌𝑌+𝑍𝑍)=𝑉𝑉(𝑋𝑋)+𝑉𝑉(𝑌𝑌)+𝑉𝑉(𝑍𝑍)+ 2 𝐶𝐶 𝑛𝑛𝑐𝑐(𝑋𝑋,𝑌𝑌)+ 2 𝐶𝐶 𝑛𝑛𝑐𝑐(𝑋𝑋,𝑍𝑍)+ 2 𝐶𝐶 𝑛𝑛𝑐𝑐(𝑌𝑌,𝑍𝑍) 

 (with 100 variables, 𝐶𝐶 

 2 

 100 

 ≈ 5000 𝐶𝐶𝑛𝑛𝑐𝑐 terms) 

 i. Importance of independent samples 

7. Application: financial diversification 

 a. Assume two stocks have same average return 𝜇𝜇 

 𝑥𝑥 

#### =𝜇𝜇 

 𝑦𝑦 

 =𝜇𝜇 and same standard 

 deviation 𝜎𝜎 

 𝑥𝑥 

#### =𝜎𝜎 

 𝑦𝑦 

#### =𝜎𝜎. 

 b. You could buy two shares of 𝑋𝑋, or one share of 𝑋𝑋 and one share of 𝑌𝑌. Since you are 

 indifferent between 𝑋𝑋 and 𝑌𝑌, it might seem that you should be indifferent between 

 these two stock portfolios. 

 c. However, on your homework, you will prove that 𝐸𝐸( 2 𝑋𝑋)=𝐸𝐸(𝑋𝑋+𝑌𝑌) but 𝑉𝑉( 2 𝑋𝑋)< 

 𝑉𝑉(𝑋𝑋+𝑌𝑌), as long as 𝑋𝑋 and 𝑌𝑌 are not perfectly correlated (i.e. 𝜌𝜌< 1 ). In fact, if they are 

 perfectly negatively correlated then 𝑉𝑉(𝑋𝑋+𝑌𝑌)= 0! 

 d. Thus, the common financial advice to “Diversify your portfolio”. 

8. Practice [if time]: Cell phone use 𝑋𝑋 and number 𝑌𝑌 of car accidents 

#### 𝑌𝑌= 0 𝑌𝑌= 1 𝑌𝑌= 2 

#### 𝑋𝑋= 0 .60 .08 .02 

#### 𝑋𝑋= 1 .10 .12 .08 

 a. Note: numerical values can be assigned to binary categorical variables, so that notion of 

 correlation is still meaningful. 

---

 b. Marginal distribution 𝑃𝑃 

#### ( 

#### 𝑋𝑋=𝑥𝑥 

#### ) 

#### =� 

#### . 70 𝑖𝑖𝑓𝑓 𝑥𝑥= 0 

#### . 30 𝑖𝑖𝑓𝑓 𝑥𝑥= 1 

 , mean 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### ) 

 =.3, variance 𝜎𝜎 

 𝑥𝑥 

 2 

#### = 

#### 𝐸𝐸(𝑋𝑋 

 2 

#### )−𝜇𝜇 

 𝑥𝑥 

 2 

#### =.3−. 3 

 2 

 =.21, standard deviation 𝜎𝜎 

 𝑥𝑥 

#### = 

#### √ 

#### . 21≈0. 458 

 c. Marginal distribution 𝑃𝑃 

#### ( 

#### 𝑌𝑌=𝑥𝑥 

#### ) 

#### =� 

#### . 70 𝑖𝑖𝑓𝑓 𝑥𝑥= 0 

#### . 20 𝑖𝑖𝑓𝑓 𝑥𝑥= 1 

#### . 10 𝑖𝑖𝑓𝑓 𝑥𝑥= 2 

 , mean 𝐸𝐸 

#### ( 

#### 𝑌𝑌 

#### ) 

 =.4, variance 𝜎𝜎 

 𝑦𝑦 

 2 

#### =.44, 

 standard deviation 𝜎𝜎 

 𝑦𝑦 

#### =√. 44≈0. 663 

 d. Not independent since 𝑃𝑃 

#### ( 

#### 0, 0 

#### ) 

#### =.6≠𝑃𝑃 

 𝑥𝑥 

#### ( 

#### 0 

#### ) 

#### 𝑃𝑃 

 𝑦𝑦 

#### ( 

#### 0 

#### ) 

#### = 

#### ( 

#### . 7 

#### )( 

#### . 7 

#### ) 

#### =.49 

 e. 𝐸𝐸 

#### ( 

#### 𝑋𝑋𝑌𝑌 

#### ) 

#### = 

#### ( 

#### 0 

#### )( 

#### 0 

#### )( 

#### . 60 

#### ) 

#### + 

#### ( 

#### 0 

#### )( 

#### 1 

#### )( 

#### . 08 

#### ) 

#### + 

#### ( 

#### 0 

#### )( 

#### 2 

#### )( 

#### . 02 

#### ) 

#### + 

#### ( 

#### 1 

#### )( 

#### 0 

#### )( 

#### . 10 

#### ) 

#### + 

#### ( 

#### 1 

#### )( 

#### 1 

#### )( 

#### . 12 

#### ) 

#### + 

#### ( 1 )( 2 )(. 08)=.28 

 f. Covariance 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

#### =𝐸𝐸(𝑋𝑋𝑌𝑌)−𝜇𝜇 

 𝑥𝑥 

#### 𝜇𝜇 

 𝑦𝑦 

#### =.28−(. 3)(. 4)=.16 

 g. Correlation 𝜌𝜌= 

 𝜎𝜎 𝑥𝑥𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

#### = 

. 16 

 (. 458 )(. 663 ) 

 ≈0. 527 positive and moderately strong 

## L11 Continuous Distributions (WMS 4.1-3) 

1. Continuous random variables 

 a. Infinite domain, e.g. sleep hours 𝑥𝑥 ∈[6, 9] 

 b. Philosophical view: continuous functions conveniently approximate discrete world, or 

 world is truly infinite but measurement is imprecise 

2. Probability density function (pdf) 𝑓𝑓(𝑥𝑥) 

 a. Measures relative likelihood of individual 𝑥𝑥 values 

 b. Individual 𝑥𝑥 values occur with zero probability (and 𝑓𝑓(𝑥𝑥)> 1 is possible); to find 

 probabilities, must take definite integral 𝑃𝑃(7 <𝑋𝑋< 8 )= ∫ 

#### 𝑓𝑓(𝑥𝑥)𝑑𝑑𝑥𝑥 

 8 

 7 

 c. Density must be non-negative and integrate to one over domain (just like probabilities 

 sum to one) 

 d. Example 𝑓𝑓(𝑥𝑥)=𝑘𝑘(−𝑥𝑥 

 2 

#### + 16 𝑥𝑥− 60 ); 6 ≤𝑥𝑥 ≤ 9 

 i. Not directly from (finite) data; maybe from calibrated theory 

 ii. Find 𝑘𝑘 

#### 1. 1 =∫ 𝑓𝑓 

#### ( 

#### 𝑥𝑥 

#### ) 

#### 𝑑𝑑𝑥𝑥 

 9 

 6 

#### =𝑘𝑘�− 

 1 

 3 

#### 𝑥𝑥 

 3 

#### + 8 𝑥𝑥 

 2 

#### − 60 𝑥𝑥� 

 6 

 9 

#### =𝑘𝑘 

#### [ 

#### (− 243 + 648 − 

#### 540 )− 

#### ( 

#### − 72 + 288 − 360 

#### )] 

 = 9 𝑘𝑘 requires that 𝑘𝑘= 

 1 

 9 

2. That is, 𝑓𝑓(𝑥𝑥)=− 

 1 

 9 

#### 𝑥𝑥 

 2 

#### + 

 16 

 9 

#### 𝑥𝑥− 

 60 

 9 

#### ; 6 ≤𝑥𝑥 ≤ 9 

---

 iii. Mode solves 𝑓𝑓 

 ′ 

#### (𝑥𝑥)=− 

 2 

 9 

#### 𝑘𝑘𝑥𝑥+ 

 16 

 9 

 𝑘𝑘= 0 ; solution at 𝑥𝑥= 8 

1. Note: if 𝑓𝑓 

 ′ 

 (𝑥𝑥) everywhere positive/negative then maximum is at 

 highest/lowest 𝑥𝑥 in range 

2. Note: second-order condition 𝑓𝑓 

 ′′ 

#### ( 

#### 𝑥𝑥 

#### ) 

#### =− 

 2 

 9 

 𝑘𝑘 ≤ 0 satisfied as long as 

#### 𝑘𝑘 ≥ 0 

 iv. Probabilities: 𝑃𝑃 

#### ( 

#### 7 ≤𝑥𝑥 ≤ 8 

#### ) 

#### =∫ 

 1 

 9 

#### (−𝑥𝑥 

 2 

#### + 16 𝑥𝑥− 60 )𝑑𝑑𝑥𝑥 

 8 

 7 

#### =⋯= 

 11 

 27 

#### ≈0. 4 

3. Cumulative distribution function (cdf) 𝐹𝐹(𝑥𝑥) 

 a. 𝐹𝐹(𝑥𝑥)=𝑃𝑃(𝑋𝑋 ≤𝑥𝑥)= ∫ 

 1 

 9 

#### (−𝑥𝑥� 

 2 

#### + 16 𝑥𝑥�− 60 )𝑑𝑑𝑥𝑥� 

 𝑥𝑥 

 6 

#### =�− 

 1 

 27 

#### 𝑥𝑥� 

 3 

#### + 

 8 

 9 

#### 𝑥𝑥� 

 2 

#### − 

 20 

 3 

#### 𝑥𝑥�� 

 𝑥𝑥�=6 

 𝑥𝑥�=𝑥𝑥 

#### =− 

 1 

 27 

#### 𝑥𝑥 

 3 

#### + 

 8 

 9 

#### 𝑥𝑥 

 2 

#### − 

 20 

 3 

#### 𝑥𝑥+ 16 

 (This assumes 6 ≤𝑥𝑥 ≤ 9 ; if 𝑥𝑥< 6 then 𝐹𝐹 

#### ( 

#### 𝑥𝑥 

#### ) 

 = 0 and if 𝑥𝑥> 9 then 𝐹𝐹 

#### ( 

#### 𝑥𝑥 

#### ) 

#### = 1 ) 

 b. Percentiles 

 Median 𝐹𝐹 

#### ( 

#### 𝑥𝑥 

#### ) 

#### =− 

 1 

 27 

#### 𝑥𝑥 

 3 

#### + 

 8 

 9 

#### 𝑥𝑥 

 2 

#### − 

 20 

 3 

#### 𝑥𝑥+ 16 = 

 1 

 2 

 ; solving by computer, 𝑥𝑥 ≈7. 8 

#### 75 

 th 

 percentile 𝐹𝐹(𝑥𝑥)=− 

 1 

 27 

#### 𝑥𝑥 

 3 

#### + 

 8 

 9 

#### 𝑥𝑥 

 2 

#### − 

 20 

 3 

#### 𝑥𝑥+ 16 =.75⇒𝑥𝑥 ≈8. 4 

#### 90 

 th 

 percentile 𝐹𝐹 

#### ( 

#### 𝑥𝑥 

#### ) 

#### =− 

 1 

 27 

#### 𝑥𝑥 

 3 

#### + 

 8 

 9 

#### 𝑥𝑥 

 2 

#### − 

 20 

 3 

#### 𝑥𝑥+ 16 =.90⇒𝑥𝑥 ≈8. 7 

 c. Easier probabilities 𝑃𝑃( 7 ≤𝑋𝑋 ≤ 8 )=𝐹𝐹( 8 )−𝐹𝐹( 7 ) 

#### =�− 

 1 

 27 

#### 8 

 3 

#### + 

 8 

 9 

#### 8 

 2 

#### − 

 20 

 3 

#### 8 + 16 �−�− 

 1 

 27 

#### 7 

 3 

#### + 

 8 

 9 

#### 7 

 2 

#### − 

 20 

 3 

#### 7 + 16 �= 

 11 

 27 

#### ≈0. 4 

 d. From cdf, get pdf 𝑓𝑓(𝑥𝑥)=𝐹𝐹 

 ′ 

#### (𝑥𝑥)=− 

 1 

 9 

#### 𝑥𝑥 

 2 

#### + 

 16 

 9 

#### 𝑥𝑥− 

 60 

 9 

 ; 6 ≤𝑥𝑥 ≤ 9 , else 𝑓𝑓(𝑥𝑥)= 0 

4. Moments 

 a. Mean 

#### 𝜇𝜇=𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### ) 

#### =∫𝑥𝑥𝑓𝑓 

#### ( 

#### 𝑥𝑥 

#### ) 

 𝑑𝑑𝑥𝑥 (just like 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### ) 

#### =∑𝑥𝑥𝑃𝑃 

#### ( 

#### 𝑥𝑥 

#### ) 

#### ) 

#### =∫ 𝑥𝑥 

 1 

 9 

#### ( 

#### −𝑥𝑥 

 2 

#### + 16 𝑥𝑥− 60 

#### ) 

#### 𝑑𝑑𝑥𝑥 

 9 

 6 

#### = 

#### ∫ 

 1 

 9 

#### (−𝑥𝑥 

 3 

#### + 16 𝑥𝑥 

 2 

#### − 60 𝑥𝑥)𝑑𝑑𝑥𝑥 

 9 

 6 

#### =⋯= 

 31 

 4 

#### ≈7. 75 

 b. Standard deviation 

 i. 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

 2 

#### ) 

#### =∫ 𝑥𝑥 

 2 

#### 𝑓𝑓 

#### ( 

#### 𝑥𝑥 

#### ) 

#### 𝑑𝑑𝑥𝑥 

 9 

 6 

#### =∫ 𝑥𝑥 

 2 

 1 

 9 

#### (−𝑥𝑥 

 2 

#### + 16 𝑥𝑥− 60 )𝑑𝑑𝑥𝑥 

 9 

 6 

#### =∫ 

 1 

 9 

#### (−𝑥𝑥 

 4 

#### + 16 𝑥𝑥 

 3 

#### − 60 𝑥𝑥 

 2 

#### )𝑑𝑑𝑥𝑥 

 9 

 6 

#### =⋯= 

 303 

 5 

 ii. 𝑉𝑉(𝑋𝑋)=𝐸𝐸(𝑋𝑋 

 2 

#### )−𝜇𝜇 

 2 

#### = 

 303 

 5 

#### −� 

 31 

 4 

#### � 

 2 

#### = 

 43 

 80 

 iii. 𝜎𝜎 

 𝑋𝑋 

#### =� 

 43 

 80 

#### ≈0. 73 

---

 c. Note: algebra tricks still work (e.g. lost wages while sleeping) 

 i. 𝐸𝐸 

#### ( 

#### $20𝑋𝑋 

#### ) 

#### =$20𝐸𝐸(𝑋𝑋) =$20⋅7. 75=$155 

 ii. 𝑉𝑉( 20 𝑋𝑋)= 20 

 2 

#### 𝑉𝑉(𝑋𝑋) 

5. Practice describing steps to classmate: Warehouse stock (as fraction of capacity) 𝑓𝑓(𝑥𝑥)= 

#### − 2 𝑥𝑥 

 2 

#### +𝑘𝑘𝑥𝑥+ 

 1 

 6 

#### ; 0≤𝑥𝑥 ≤ 1 

 a. Find 𝑘𝑘= 3 

 b. mode = 

 3 

 4 

 c. Draw and interpret pdf (upside-down parabola; warehouse full more often than empty) 

 d. Find cdf 𝐹𝐹(𝑥𝑥)=− 

 2 

 3 

#### 𝑥𝑥 

 3 

#### + 

 3 

 2 

#### 𝑥𝑥 

 2 

#### + 

 1 

 6 

#### 𝑥𝑥; 0≤𝑥𝑥 ≤ 1 

 e. Find 𝑓𝑓(𝑥𝑥) from 𝐹𝐹(𝑥𝑥) 

 f. 𝑃𝑃� 

 1 

 2 

#### ≤𝑋𝑋 ≤ 

 3 

 4 

#### �= 

 5 

 16 

 g. median ≈.6, 7 5 

 th 

 percentile ≈.8 

 h. mean 𝜇𝜇≈0. 58 

 i. standard deviation 𝜎𝜎≈0. 26 

 j. Insurance payout 𝜋𝜋=$1,000,000𝑋𝑋+$100,000 

 i. 𝐸𝐸(𝜋𝜋)=$1,000,000𝜇𝜇+$100,000=$680,000 𝜎𝜎 

 𝜋𝜋 

#### = 

#### �𝑉𝑉 

#### ( 

#### $1,000,000𝑋𝑋+$100,000 

#### ) 

#### =$1,000,000𝜎𝜎 

 𝑥𝑥 

#### =$260,000 

## L12 Continuous Joint Distributions (WMS 5.1-8) 

1. Joint Density 

 a. Compare discrete/continuous pdf and joint pdf 

 b. Warehouse stocks up to two pallets of cereal 𝑋𝑋 and one pallet of cereal 𝑌𝑌, with density 

#### 𝑓𝑓 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### =𝑐𝑐 

#### ( 

#### 𝑥𝑥+ 2 𝑥𝑥 

#### ) 

#### ;𝑥𝑥 ∈ 

#### [ 

#### 0, 2 

#### ] 

#### ,𝑥𝑥∈[0, 1]. 

 c. Height of joint pdf represents likelihood of particular (𝑥𝑥,𝑥𝑥) pairs. Must integrate to one 

 (double integral). 

 i. 1 = ∫ ∫ 

#### 𝑐𝑐(𝑥𝑥+ 2 𝑥𝑥)𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### 𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### = 

#### ∫ 

#### (𝑐𝑐𝑥𝑥+𝑐𝑐)𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

 = 4 𝑐𝑐 requires 𝑐𝑐= 

 1 

 4 

#### , 

 or 𝑓𝑓 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### = 

 1 

 4 

#### 𝑥𝑥+ 

 1 

 2 

#### 𝑥𝑥;𝑥𝑥 ∈ 

#### [ 

#### 0, 2 

#### ] 

#### ,𝑥𝑥∈[0, 1]. 

 d. Mode: since upward sloping in both dimensions, mode at 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### =(2, 1) 

2. Marginal densities 

---

 a. Analogous to margins of table in discrete joint distribution: total probability of particular 

 realization of 𝑥𝑥 is the sum of all joint probabilities of (𝑥𝑥,𝑥𝑥) pairs, with that particular 𝑥𝑥 

 value, but any 𝑥𝑥 value in domain. 

 b. 𝑓𝑓 

 𝑥𝑥 

#### ( 

#### 𝑥𝑥 

#### ) 

#### =∫ 

 1 

 4 

#### ( 

#### 𝑥𝑥+ 2 𝑥𝑥 

#### ) 

#### 𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### = 

 1 

 4 

#### 𝑥𝑥+ 

 1 

 4 

#### ;𝑥𝑥 ∈[0, 2] 

 c. 𝑓𝑓 

 𝑦𝑦 

#### (𝑥𝑥)= 

#### ∫ 

 1 

 4 

#### (𝑥𝑥+ 2 𝑥𝑥)𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### = 

 1 

 2 

#### +𝑥𝑥;𝑥𝑥∈[0, 1] 

 d. Subscript simply distinguishes 𝑓𝑓 

 𝑥𝑥 

 (.5) from 𝑓𝑓 

 𝑦𝑦 

#### (.5) 

 e. Moments: means, standard deviations 

 i. 𝜇𝜇 

 𝑥𝑥 

#### =𝐸𝐸(𝑋𝑋)= 

#### ∫ 

#### 𝑥𝑥𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥)𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### =∫ 𝑥𝑥� 

 1 

 4 

#### 𝑥𝑥+ 

 1 

 4 

#### �𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### = 

 2 

 3 

#### + 

 1 

 2 

#### = 

 7 

 6 

 ii. 𝐸𝐸(𝑋𝑋 

 2 

#### )= 

#### ∫ 

#### 𝑥𝑥 

 2 

#### 𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥)𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### = 

#### ∫ 

#### 𝑥𝑥 

 2 

#### � 

 1 

 4 

#### 𝑥𝑥+ 

 1 

 4 

#### �𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### =1 + 

 2 

 3 

#### = 

 5 

 3 

 iii. 𝑉𝑉(𝑋𝑋)=𝐸𝐸(𝑋𝑋 

 2 

#### )−𝜇𝜇 

 𝑥𝑥 

 2 

#### = 

 5 

 3 

#### −� 

 7 

 6 

#### � 

 2 

#### = 

 11 

 36 

 iv. 𝜎𝜎 

 𝑥𝑥 

#### =�𝑉𝑉(𝑋𝑋)=� 

 11 

 36 

#### ≈.55 

 v. 𝜇𝜇 

 𝑦𝑦 

#### =𝐸𝐸(𝑌𝑌)= 

#### ∫ 

#### 𝑥𝑥𝑓𝑓 

 𝑦𝑦 

#### (𝑥𝑥)𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### = 

#### ∫ 

#### 𝑥𝑥� 

 1 

 2 

#### +𝑥𝑥�𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### = 

 1 

 4 

#### + 

 1 

 3 

#### = 

 7 

 12 

 vi. 𝐸𝐸(𝑌𝑌 

 2 

#### )= 

#### ∫ 

#### 𝑥𝑥 

 2 

#### 𝑓𝑓 

 𝑦𝑦 

#### (𝑥𝑥)𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### =∫ 𝑥𝑥 

 2 

#### � 

 1 

 2 

#### +𝑥𝑥�𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### = 

 1 

 6 

#### + 

 1 

 4 

#### = 

 5 

 12 

 vii. 𝑉𝑉 

#### ( 

#### 𝑌𝑌 

#### ) 

#### =𝐸𝐸 

#### ( 

#### 𝑌𝑌 

 2 

#### ) 

#### −𝜇𝜇 

 𝑦𝑦 

 2 

#### = 

 5 

 12 

#### −� 

 7 

 12 

#### � 

 2 

#### = 

 11 

 144 

 viii. 𝜎𝜎 

 𝑦𝑦 

#### = 

#### � 

#### 𝑉𝑉(𝑌𝑌)=� 

 11 

 144 

#### ≈0. 28 

 ix. Could also derive mode, median, cdf, percentiles of 𝑋𝑋 or 𝑌𝑌 

 f. Independence requires 𝑓𝑓 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### =𝑓𝑓 

 𝑥𝑥 

#### ( 

#### 𝑥𝑥 

#### ) 

#### 𝑓𝑓 

 𝑦𝑦 

#### ( 

#### 𝑥𝑥 

#### ) 

 for all (𝑥𝑥,𝑥𝑥) pairs. 

 i. 𝑋𝑋 and 𝑌𝑌 not independent here, since 𝑓𝑓(𝑥𝑥,𝑥𝑥)= 

 1 

 4 

#### (𝑥𝑥+ 2 𝑥𝑥)≠� 

 1 

 4 

#### 𝑥𝑥+ 

 1 

 4 

#### �� 

 1 

 2 

#### +𝑥𝑥� 

 (e.g. when (𝑥𝑥,𝑥𝑥)=(0, 0)) 

3. Correlation 

 a. 𝐸𝐸(𝑋𝑋𝑌𝑌)= ∫ ∫ 

#### 𝑥𝑥𝑥𝑥 𝑓𝑓(𝑥𝑥,𝑥𝑥)𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### 𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### =∫ ∫ 𝑥𝑥𝑥𝑥� 

 1 

 4 

#### ( 

#### 𝑥𝑥+ 2 𝑥𝑥 

#### ) 

#### �𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### 𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### =∫ � 

 1 

 8 

#### 𝑥𝑥 

 2 

#### + 

 1 

 6 

#### 𝑥𝑥�𝑑𝑑𝑥𝑥 

 2 

 𝑥𝑥=0 

#### = 

 1 

 3 

#### + 

 1 

 3 

#### = 

 2 

 3 

---

 b. 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

#### =𝐶𝐶𝑛𝑛𝑐𝑐(𝑋𝑋,𝑌𝑌)=𝐸𝐸(𝑋𝑋𝑌𝑌)−𝜇𝜇 

 𝑥𝑥 

#### 𝜇𝜇 

 𝑦𝑦 

#### = 

 2 

 3 

#### −� 

 7 

 6 

#### �� 

 7 

 12 

#### �=− 

 1 

 72 

 c. 𝜌𝜌= 

 𝜎𝜎 

 𝑥𝑥𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

#### = 

 − 

 1 

 72 

 (. 55 )(. 28 ) 

#### ≈−.09 

4. Practice example: 𝑓𝑓 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

 =𝑐𝑐(1−𝑥𝑥𝑥𝑥) for 𝑥𝑥,𝑥𝑥∈ 

#### [ 

#### 0, 1 

#### ] 

 a. Find 𝑐𝑐: ∫ ∫ 𝑐𝑐 

#### ( 

#### 1 −𝑥𝑥𝑥𝑥 

#### ) 

#### 𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### 𝑑𝑑𝑥𝑥 

 1 

 𝑥𝑥=0 

#### = 

 3 

 4 

 𝑐𝑐 implies 𝑐𝑐= 

 4 

 3 

 b. Find marginal densities 𝑓𝑓 

 𝑥𝑥 

#### , 𝑓𝑓 

 𝑦𝑦 

#### : 𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥)= 

#### ∫ 

 4 

 3 

#### ( 1 −𝑥𝑥𝑥𝑥)𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### =⋯= 

 4 

 3 

#### − 

 2 

 3 

 𝑥𝑥 for 𝑥𝑥 ∈ 

#### [ 

#### 0, 1 

#### ] 

#### ; 

 symmetrically, 𝑓𝑓 

 𝑦𝑦 

#### ( 

#### 𝑥𝑥 

#### ) 

#### = 

 4 

 3 

#### − 

 2 

 3 

 𝑥𝑥 for 𝑥𝑥∈ 

#### [ 

#### 0, 1 

#### ] 

 c. Find means 𝜇𝜇 

 𝑥𝑥 

 and 𝜇𝜇 

 𝑦𝑦 

 and standard deviations 𝜎𝜎 

 𝑥𝑥 

 and 𝜎𝜎 

 𝑦𝑦 

#### : 

#### 𝜇𝜇 

 𝑥𝑥 

#### =𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### ) 

#### =∫ 𝑥𝑥� 

 4 

 3 

#### − 

 2 

 3 

#### 𝑥𝑥�𝑑𝑑𝑥𝑥 

 1 

 𝑥𝑥=0 

#### =⋯= 

 4 

 9 

#### 𝐸𝐸(𝑋𝑋 

 2 

#### )= 

#### ∫ 

#### 𝑥𝑥 

 2 

#### � 

 4 

 3 

#### − 

 2 

 3 

#### 𝑥𝑥�𝑑𝑑𝑥𝑥 

 1 

 𝑥𝑥=0 

#### =⋯= 

 5 

 18 

#### 𝜎𝜎 

 𝑥𝑥 

 2 

#### = 

 5 

 18 

#### −� 

 4 

 9 

#### � 

 2 

#### = 

 13 

 162 

#### 𝜎𝜎 

 𝑥𝑥 

#### =� 

 13 

 162 

#### ≈.283 

 Symmetrically, 𝜇𝜇 

 𝑦𝑦 

#### = 

 4 

 9 

#### , 𝜎𝜎 

 𝑦𝑦 

#### ≈.283 

 d. Correlation 𝜌𝜌: 

#### 𝐸𝐸(𝑋𝑋𝑌𝑌)= 

#### ∫ ∫ 

#### 𝑥𝑥𝑥𝑥 

 4 

 3 

#### ( 1 −𝑥𝑥𝑥𝑥)𝑑𝑑𝑥𝑥 

 1 

 𝑦𝑦=0 

#### 𝑑𝑑𝑥𝑥 

 1 

 𝑥𝑥=0 

#### = 

 5 

 27 

#### 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

#### =𝐸𝐸(𝑋𝑋𝑌𝑌)−𝜇𝜇 

 𝑥𝑥 

#### 𝜇𝜇 

 𝑦𝑦 

#### ≈ 

 5 

 27 

#### −� 

 4 

 9 

#### � 

 2 

#### =− 

 1 

 81 

#### ≈−.012 

#### 𝜌𝜌= 

 𝜎𝜎 

 𝑥𝑥𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

#### = 

 − 

 1 

 81 

 � 

 13 

 162 

 � 

 13 

 162 

#### =− 

 2 

 13 

#### ≈−0. 154 

## L13 Conditional Distributions (WMS 5.3, 11) 

1. Recall distribution of cell phone use and car accidents: 

#### 𝑌𝑌= 0 𝑌𝑌= 1 𝑌𝑌= 2 

#### 𝑋𝑋= 0 .60 .08 .02 

#### 𝑋𝑋= 1 .10 .12 .08 

 a. Recall 𝜇𝜇 

 𝑥𝑥 

#### =.3,𝜎𝜎 

 𝑥𝑥 

#### ≈.458,𝜇𝜇 

 𝑦𝑦 

#### =.4,𝜎𝜎 

 𝑦𝑦 

#### ≈.663,𝜌𝜌≈.527 

2. Conditional probability 

---

 a. Cell phone use among those with two accidents 𝑃𝑃(𝑋𝑋= 1 |𝑌𝑌= 2 )= 

. 08 

. 10 

 =.80 versus 

 those with no accidents 𝑃𝑃 

#### ( 

#### 𝑋𝑋= 1 

#### | 

#### 𝑌𝑌= 0 

#### ) 

#### = 

. 10 

. 70 

#### ≈0. 14 

 b. Practice: find 𝑃𝑃 

 𝑦𝑦 

#### ( 0 |𝑋𝑋= 0 )= 

. 60 

. 7 

#### ≈.86, 𝑃𝑃 

 𝑦𝑦 

#### ( 1 |𝑋𝑋= 0 )= 

. 08 

. 7 

#### =.11, 𝑃𝑃 

 𝑦𝑦 

#### ( 2 |𝑋𝑋= 0 )= 

. 02 

. 7 

#### ≈ 

#### .03, 𝑃𝑃 

 𝑦𝑦 

#### ( 0 |𝑋𝑋= 1 )= 

. 10 

. 3 

#### ≈.33, 𝑃𝑃 

 𝑦𝑦 

#### ( 1 |𝑋𝑋= 1 )= 

. 12 

. 3 

#### =.40, 𝑃𝑃 

 𝑦𝑦 

#### ( 2 |𝑋𝑋= 1 )= 

. 08 

. 3 

#### ≈.27 

3. Conditional distribution 

 a. 𝑃𝑃(𝑥𝑥|𝑋𝑋=0) and 𝑃𝑃(𝑥𝑥|𝑋𝑋=1) are legitimate distribution functions (numerators sum to 

 denominator) 

 b. Plot, and compare with 𝑃𝑃(𝑥𝑥) 

 c. Conditional mean 

 i. 𝐸𝐸(𝑌𝑌 

#### | 

#### 𝑋𝑋= 1 )= 

#### ∑ 

#### 𝑥𝑥𝑃𝑃(𝑌𝑌=𝑥𝑥 

#### | 

#### 𝑋𝑋= 1 ) ≈ 0 (. 33)+ 1 (. 40)+ 2 (. 27)=.94 

 ii. Practice 𝐸𝐸(𝑌𝑌|𝑋𝑋= 0 )≈ 0 (. 86)+ 1 (. 11)+ 2 (. 03)=.17 

 d. Average number of car accidents is higher for cell phone users than for non-users. This 

 still doesn’t imply causation! 

 e. Conditional standard deviation 

 i. Just like 𝑉𝑉(𝑌𝑌)=𝐸𝐸(𝑌𝑌 

 2 

#### )− 

#### [ 

#### 𝐸𝐸(𝑌𝑌) 

#### ] 

 2 

#### , 

#### 𝑉𝑉(𝑌𝑌|𝑋𝑋=𝑥𝑥)=𝐸𝐸(𝑌𝑌 

 2 

#### |𝑋𝑋=𝑥𝑥)−[𝐸𝐸(𝑌𝑌|𝑋𝑋=𝑥𝑥)] 

 2 

 ii. (If time) Example : 𝐸𝐸(𝑌𝑌 

 2 

#### | 

#### 𝑋𝑋= 1 ) ≈ 0 

 2 

#### (. 33)+ 1 

 2 

#### (. 40)+ 2 

 2 

 (. 27)=1. 21, so 

 In this case, 𝑉𝑉 

#### ( 

#### 𝑌𝑌 

#### | 

#### 𝑋𝑋= 1 

#### ) 

#### ≈1. 21−. 94 

 2 

 ≈0. 326, and 𝜎𝜎 

 𝑦𝑦|𝑋𝑋=1 

#### ≈√. 326≈0. 57 

 By a similar derivation, 𝜎𝜎 

 𝑦𝑦|𝑋𝑋=0 

 ≈0. 41; cell phone use increases variance. 

4. In an effort to establish causation, could find 𝑃𝑃(𝑥𝑥,𝑥𝑥|𝑍𝑍=𝑧𝑧)= 

 𝑃𝑃(𝑥𝑥,𝑦𝑦,𝑧𝑧) 

 𝑃𝑃 

 𝑧𝑧 

 (𝑧𝑧) 

 or 𝑓𝑓(𝑥𝑥,𝑥𝑥|𝑍𝑍=𝑧𝑧)= 

 𝑑𝑑 

 ( 𝑥𝑥,𝑦𝑦,𝑧𝑧 

 ) 

 𝑑𝑑 

 𝑧𝑧 

 ( 𝑧𝑧 

 ) 

 , and then 𝜌𝜌 

 𝑥𝑥𝑦𝑦|𝑧𝑧 

 =𝐶𝐶𝑛𝑛𝐶𝐶𝐶𝐶(𝑋𝑋,𝑌𝑌|𝑍𝑍=𝑧𝑧). For example, find correlation between cell phone 

 use and car accidents among teenagers. 

5. Continuous densities 

 a. Recall joint density of cereal inventory, 𝑓𝑓 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### = 

 1 

 4 

#### 𝑥𝑥+ 

 1 

 2 

#### 𝑥𝑥;𝑥𝑥 ∈ 

#### [ 

#### 0, 2 

#### ] 

#### ,𝑥𝑥∈ 

#### [ 

#### 0, 1 

#### ] 

 b. Recall marginal densities 𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥)= 

 1 

 4 

#### 𝑥𝑥+ 

 1 

 4 

 ;𝑥𝑥 ∈[0, 2] and 𝑓𝑓 

 𝑦𝑦 

#### (𝑥𝑥)= 

 1 

 2 

#### +𝑥𝑥;𝑥𝑥∈[0, 1], 

 means 𝜇𝜇 

 𝑥𝑥 

#### = 

 7 

 6 

#### , 𝜇𝜇 

 𝑦𝑦 

#### = 

 7 

 12 

 , standard deviations 𝜎𝜎 

 𝑥𝑥 

#### ≈.55, 𝜎𝜎 

 𝑦𝑦 

#### ≈0. 28 

 c. Conditional density 𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥|𝑌𝑌=𝑥𝑥)= 

 𝑑𝑑 

 ( 𝑥𝑥,𝑦𝑦 

 ) 

 𝑑𝑑 𝑥𝑥 

 ( 𝑦𝑦 

 ) 

#### = 

 1 

 4 

 𝑥𝑥+ 

 1 

 2 

 𝑦𝑦 

 1 

 2 

 +𝑦𝑦 

#### = 

 𝑥𝑥+2𝑦𝑦 

 2+4𝑦𝑦 

 ;𝑥𝑥 ∈[0, 2]. For example, 

#### 𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥|𝑌𝑌= 0 )= 

 𝑥𝑥 

 2 

#### ;𝑥𝑥 ∈[0, 2] 

---

 d. Conditional mean and standard deviation 

#### 𝐸𝐸(𝑋𝑋|𝑌𝑌= 0 )= 

#### ∫ 

#### 𝑥𝑥� 

 𝑥𝑥 

 2 

#### �𝑑𝑑𝑥𝑥 

 2 

 0 

#### = 

#### � 

 1 

 6 

#### 𝑥𝑥 

 3 

#### � 

 0 

 2 

#### = 

 8 

 6 

#### = 

 4 

 3 

#### 𝐸𝐸(𝑋𝑋 

 2 

#### | 

#### 𝑌𝑌= 0 )= 

#### ∫ 

#### 𝑥𝑥 

 2 

#### 𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥 

#### | 

#### 0 )𝑑𝑑𝑥𝑥= 

#### ∫ 

#### 𝑥𝑥 

 2 

#### � 

 𝑥𝑥 

 2 

#### �𝑑𝑑𝑥𝑥 

 2 

 0 

#### =� 

 1 

 8 

#### 𝑥𝑥 

 4 

#### � 

 0 

 2 

#### = 2 

#### 𝑉𝑉 

#### ( 

#### 𝑋𝑋 

#### | 

#### 𝑌𝑌= 0 

#### ) 

#### =𝐸𝐸 

#### ( 

#### 𝑋𝑋 

 2 

#### | 

#### 𝑌𝑌= 0 

#### ) 

#### − 

#### [ 

#### 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### | 

#### 𝑌𝑌= 0 

#### )] 

 2 

#### = 2 −� 

 4 

 3 

#### � 

 2 

#### = 

 2 

 9 

#### . 

#### 𝜎𝜎 

 𝑥𝑥|𝑌𝑌=0 

#### =� 

 2 

 9 

 Thus, when 𝑌𝑌= 0 : density of 𝑋𝑋 is steeper, mean of 𝑋𝑋 is higher, variance is lower. 

 e. More generically, for arbitrary 𝑥𝑥 value, 

#### 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### | 

#### 𝑌𝑌=𝑥𝑥 

#### ) 

#### =∫𝑥𝑥𝑓𝑓 

 𝑥𝑥 

#### ( 

#### 𝑥𝑥 

#### | 

#### 𝑥𝑥 

#### ) 

#### 𝑑𝑑𝑥𝑥=∫ 𝑥𝑥� 

 𝑥𝑥+2𝑦𝑦 

 2+4𝑦𝑦 

#### �𝑑𝑑𝑥𝑥 

 2 

 0 

#### = 

 1 

 2+4𝑦𝑦 

#### ∫ 

#### (𝑥𝑥 

 2 

#### + 2 𝑥𝑥𝑥𝑥)𝑑𝑑𝑥𝑥 

 2 

 0 

#### = 

 1 

 2+4𝑦𝑦 

#### � 

 1 

 3 

#### 𝑥𝑥 

 3 

#### +𝑥𝑥 

 2 

#### 𝑥𝑥 

#### � 

 0 

 2 

#### = 

 1 

 2+4𝑦𝑦 

#### � 

 8 

 3 

#### + 4 𝑥𝑥 �= 

 4+6𝑦𝑦 

 3+6𝑦𝑦 

 For example, 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### | 

#### 𝑥𝑥= 0 

#### ) 

#### = 

 4 

 3 

 as before 

 Practice: 𝐸𝐸(𝑋𝑋|𝑥𝑥= 1 )= 

 10 

 9 

#### 𝐸𝐸(𝑋𝑋 

 2 

#### |𝑌𝑌=𝑥𝑥)= 

#### ∫ 

#### 𝑥𝑥 

 2 

#### 𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥|𝑥𝑥)𝑑𝑑𝑥𝑥 

#### = 

#### ∫ 

#### 𝑥𝑥 

 2 

#### � 

 𝑥𝑥+2𝑦𝑦 

 2+4𝑦𝑦 

#### �𝑑𝑑𝑥𝑥 

 2 

 0 

#### =⋯= 

 6+8𝑦𝑦 

 3+6𝑦𝑦 

#### 𝑉𝑉(𝑋𝑋|𝑌𝑌=𝑥𝑥)=𝐸𝐸(𝑋𝑋 

 2 

#### |𝑌𝑌=𝑥𝑥)−[𝐸𝐸(𝑋𝑋|𝑌𝑌=𝑥𝑥)] 

 2 

#### =� 

 6+8𝑦𝑦 

 3+6𝑦𝑦 

#### �−� 

 4+6𝑦𝑦 

 3+6𝑦𝑦 

#### � 

 2 

#### 𝜎𝜎 

 𝑥𝑥|𝑌𝑌=𝑦𝑦 

#### = 

#### � 

#### � 

 6+8𝑦𝑦 

 3+6𝑦𝑦 

#### �−� 

 4+6𝑦𝑦 

 3+3𝑦𝑦 

#### � 

 2 

. For example, 𝜎𝜎 

 𝑥𝑥|𝑌𝑌=0 

#### = 

#### � 

 6 

 3 

#### −� 

 4 

 3 

#### � 

 2 

#### =� 

 2 

 9 

 as before, 

#### 𝜎𝜎 

 𝑥𝑥|𝑌𝑌=1 

#### = 

#### � 

#### � 

 14 

 9 

#### �−� 

 10 

 9 

#### � 

 2 

#### =� 

 26 

 81 

#### ≈ 

 5 

 9 

 Thus, when 𝑌𝑌= 1 , density of 𝑋𝑋 is less steep, mean is lower, variance is higher. 

6. With three variables, can derive joint distribution of 𝑋𝑋 and 𝑌𝑌 conditional on 𝑍𝑍 

 a. Israel covid data 

 i. When covid Delta variant hit, Israeli hospitals filled up with covid patients. 60% 

 of these patients had already been vaccinated. 

 ii. Natural (but erroneous) conclusion: vaccines make things worse, not better! 

---

 iii. Nearly 80% of Israelis over age 12 were vaccinated against covid, so if “random 

 draw,” 80% of hospital patients should have been vaccinated; lower rate means 

 treatment helped. 

 iv. 

#### 7. 

## L14 Regressions (WMS 5.3, 11) 

1. Regressions 

 a. Sir Francis Galton 1886 (cousin of Darwin) 

 b. Use data to determine (average) linear relationship 𝑌𝑌=𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

 𝑋𝑋. Once relationship is 

 known, we can predict 𝑌𝑌 for any 𝑋𝑋 value (even out of sample), as if through a crystal 

 ball! 

 c. Examples: 

 i. Income 𝑌𝑌 as function of education 𝑋𝑋 

 ii. Unemployment 𝑌𝑌 next year as function of (e.g. fiscal or monetary) policy 𝑋𝑋 

 iii. Stock price tomorrow 𝑌𝑌 as function of today’s earnings/price 𝑋𝑋 

 iv. Consultant’s “secret formula” predicting sales, etc. 

 d. Puts units on correlation (“education and income are strongly correlated” vs. “each year 

 of education is associated with an additional $4k of income”) 

 e. Working example: education 𝜇𝜇 

 𝑥𝑥 

 = 15 years; 𝜎𝜎 

 𝑥𝑥 

 = 3 years; income 𝜇𝜇 

 𝑦𝑦 

#### =$70,000; 𝜎𝜎 

 𝑦𝑦 

#### = 

 $20,000; correlation 𝜌𝜌=.6 

 f. Any 𝛽𝛽 

 0 

 and 𝛽𝛽 

 1 

 determine line 𝑌𝑌=𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

 𝑋𝑋, implying an error term 𝜀𝜀=𝑌𝑌−𝛽𝛽 

 0 

#### −𝛽𝛽 

 1 

#### 𝑋𝑋 

 such that the data satisfies 𝑌𝑌=𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

 𝑋𝑋+𝜀𝜀. We can choose 𝛽𝛽 

 0 

 and 𝛽𝛽 

 1 

 so that the 

 resulting line is as useful as possible. 

 g. “Least squares” regression: choose 𝛽𝛽 

 0 

 and 𝛽𝛽 

 1 

 to minimize 𝐸𝐸(𝜀𝜀 

 2 

#### ) 

 i. Equivalently, choose 𝛽𝛽 

 0 

 so that 𝐸𝐸(𝜀𝜀)= 0 and 𝛽𝛽 

 1 

 to minimize 𝑉𝑉(𝜀𝜀) 

 ii. Can use other criteria (e.g. least absolute deviation 𝐸𝐸(|𝜀𝜀|)), but less common 

2. Intercept 

 a. If 𝛽𝛽 

 0 

 is high, most 𝜀𝜀 

 𝑖𝑖 

 will be negative; if 𝛽𝛽 

 0 

 is low, most 𝜀𝜀 

 𝑖𝑖 

 will be positive 

 b. 𝐸𝐸(𝜀𝜀)=𝜇𝜇 

 𝑦𝑦 

#### −𝛽𝛽 

 0 

#### −𝛽𝛽 

 1 

#### 𝜇𝜇 

 𝑥𝑥 

 = 0 implies that 𝛽𝛽 

 0 

#### =𝜇𝜇 

 𝑦𝑦 

#### −𝛽𝛽 

 1 

#### 𝜇𝜇 

 𝑥𝑥 

#### . 

 Easier: 𝜇𝜇 

 𝑦𝑦 

#### =𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝜇𝜇 

 𝑥𝑥 

 , so regression line passes through �𝜇𝜇 

 𝑥𝑥 

#### ,𝜇𝜇 

 𝑦𝑦 

#### � 

---

 c. Example: 𝛽𝛽 

 0 

#### =$70,000−$4,000⋅ 15 =$10,000 

3. Slope 

 a. 𝑉𝑉(𝜀𝜀)=𝑉𝑉(𝑌𝑌)+𝑉𝑉(−𝛽𝛽 

 1 

#### 𝑋𝑋)+ 2 𝐶𝐶 𝑛𝑛𝑐𝑐(𝑌𝑌,−𝛽𝛽 

 1 

#### 𝑋𝑋)=𝜎𝜎 

 𝑦𝑦 

 2 

#### +𝛽𝛽 

 1 

 2 

#### 𝜎𝜎 

 𝑥𝑥 

 2 

#### − 2 𝛽𝛽 

 1 

#### 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

 b. To minimize, 0 = 

 𝑑𝑑𝑑𝑑(𝜀𝜀) 

 𝑑𝑑𝛽𝛽 

 1 

#### = 2 𝛽𝛽 

 1 

#### 𝜎𝜎 

 𝑥𝑥 

 2 

#### − 2 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

 c. Solution 𝛽𝛽 

 1 

#### = 

 𝜎𝜎 

 𝑥𝑥𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 2 

#### = 

 𝜎𝜎 

 𝑥𝑥𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

#### =𝜌𝜌 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 d. Slope is simply (normalized) correlation coefficient 

 e. Example: 𝛽𝛽 

 1 

#### =.6 

 $20, 000 

 3𝑦𝑦𝑦𝑦. 

 =$4,000/yr. (e.g. four-year degree provides extra $16,000/yr) 

 f. Equivalently, can derive same value by choosing 𝛽𝛽 

 1 

 such that 𝐶𝐶𝑛𝑛𝑐𝑐 

#### ( 

#### 𝑋𝑋,𝜀𝜀 

#### ) 

#### = 0 (HW) 

4. Predictions 

 a. High school grad (𝑋𝑋 

 ∗ 

 = 12 ) expects 𝑌𝑌 

 ∗ 

#### =$10𝑘𝑘+$4𝑘𝑘(12) =$58𝑘𝑘 

 b. College grad (𝑋𝑋 

 ∗ 

 = 16 ) expects 𝑌𝑌 

 ∗ 

#### =$10𝑘𝑘+$4𝑘𝑘(16) =$74𝑘𝑘 

 c. Three PhDs (𝑋𝑋 

 ∗ 

 = 31 ) expects 𝑌𝑌 

 ∗ 

#### =$10𝑘𝑘+$4𝑘𝑘(31) =$134𝑘𝑘 

 i. This assumes linear trend holds up, constant returns to scale (which may not be 

 reasonable); in econometrics (Econ 388), learn nonlinear regressions 

 d. Standardized 

 i. 

 𝑌𝑌 

 ∗ 

 −𝜇𝜇 

 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

#### =𝜌𝜌 

 𝑋𝑋 

 ∗ 

 −𝜇𝜇 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 (since 𝛽𝛽 

 1 

#### =𝜌𝜌 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

#### , 𝜇𝜇 

 𝑦𝑦 

#### =𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝜇𝜇 

 𝑥𝑥 

 , and 𝑌𝑌 

 ∗ 

#### =𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑋𝑋 

 ∗ 

#### ). 

 ii. If 𝑋𝑋 

 ∗ 

 is 1 or 2 or 𝑘𝑘 standard deviation above 𝜇𝜇 

 𝑥𝑥 

 then 𝑌𝑌 

 ∗ 

 is 𝜌𝜌 or 2 𝜌𝜌 or 𝑘𝑘𝜌𝜌 

 standard deviations above 𝜇𝜇 

 𝑦𝑦 

 e. Stay in school to get rich? 

 i. Maybe. Correlation might reflect causation; if so, staying in school boosts 

 income. 

 ii. Regressions still just express correlation, not causation (now in meaningful 

 units) 

 iii. Maybe not. Maybe spurious (rich kids enjoy school, but would be rich either 

 way) or maybe helps those who already attend (e.g. engineers) but those who 

 choose not to attend (e.g. mechanics, artists) wouldn’t benefit. 

 iv. Either way, predict higher incomes for those who do stay in school 

 v. But maybe not for those who choose not, but compelled/advised to go to school 

 f. Reverse predictions 

 i. What if worker makes $100k income and asks for you to guess education? 

---

 ii. Could read regression backward, but it was designed to minimize errors in 

 income not errors in education 

 iii. Better to start over, with income as 𝑋𝑋 and education as 𝑌𝑌 

5. Errors 

 a. 𝜀𝜀 

 𝑖𝑖 

#### =𝑥𝑥 

 𝑖𝑖 

#### −(𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### ) 

 b. De-trend data (e.g. “skill” or “luck”, above and beyond education) 

 c. Example: who is more genius (or luckier): 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

 =(12, $80𝑘𝑘) or 

#### ( 

#### 𝑥𝑥,𝑥𝑥 

#### ) 

#### = 

#### ( 

#### 16 , $100𝑘𝑘 

#### ) 

#### ? 

 i. $80𝑘𝑘− 

#### ( 

#### 10 + 4 ⋅ 12 

#### ) 

#### =$22𝑘𝑘 

 ii. $100𝑘𝑘−( 10 + 4 ⋅ 16 )=$26𝑘𝑘 

 d. Variance 𝜎𝜎 

 𝜀𝜀 

 2 

 of error distribution tells us how far people are off the regression line 

#### 𝜎𝜎 

 𝜀𝜀 

 2 

#### =𝑉𝑉(𝑌𝑌−𝛽𝛽 

 0 

#### −𝛽𝛽 

 1 

#### 𝑋𝑋)=𝜎𝜎 

 𝑦𝑦 

 2 

#### +𝛽𝛽 

 1 

 2 

#### 𝜎𝜎 

 𝑥𝑥 

 2 

#### − 2 𝛽𝛽 

 1 

#### 𝑐𝑐𝑛𝑛𝑐𝑐(𝑋𝑋,𝑌𝑌) 

#### = 20 𝑘𝑘 

 2 

#### + 4 𝑘𝑘 

 2 

#### 3 

 2 

#### − 2 ( 4 𝑘𝑘)(. 6 × 20 𝑘𝑘× 3 )=($16𝑘𝑘) 

 2 

6. Explanatory power 

 a. Partition 𝑉𝑉(𝑌𝑌)=𝛽𝛽 

 1 

 2 

#### 𝑉𝑉(𝑋𝑋)+𝑉𝑉(𝜀𝜀)= 144 + 256 

 i. Note: 2 𝛽𝛽 

 1 

 𝐶𝐶𝑛𝑛𝑐𝑐(𝑋𝑋,𝜀𝜀)= 0 (see homework) because optimal slope extracts all 

 correlation 

 ii. This decomposes 𝑉𝑉(𝑌𝑌) into “explained” and “unexplained” (e.g. talent, luck, or 

 some other mystery). More accurately, variation that is “related to education” 

 and variation that is “unrelated to education” 

 b. “Explained” portion is 𝜌𝜌 

 2 

 fraction of 𝑉𝑉(𝑌𝑌) 

 i. 𝛽𝛽 

 1 

 2 

#### 𝜎𝜎 

 𝑥𝑥 

 2 

#### =� 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

#### 𝜌𝜌� 

 2 

#### 𝜎𝜎 

 𝑥𝑥 

 2 

#### =𝜌𝜌 

 2 

#### 𝜎𝜎 

 𝑦𝑦 

 2 

 ii. In this case,. 6 

 2 

 =36% (“coefficient of determination”) 

 c. “Unexplained” portion is 1 −𝜌𝜌 

 2 

 i. In this case, 1 −. 6 

 2 

#### =64% 

 ii. Shortcut 𝜎𝜎 

 𝜀𝜀 

 2 

#### =.64 

#### ( 

#### 400 

#### ) 

#### = 256 = 

#### ( 

#### $16𝑘𝑘 

#### ) 

 2 

 d. Implicit linearity of 𝜌𝜌 

 i. Fundamentally, what does 𝜌𝜌 measure? 

 ii. 𝑋𝑋 

 2 

 is perfectly predictable from 𝑋𝑋, but linear regression produces 𝜌𝜌 

 2 

#### < 1 

 iii. Thus, 𝑐𝑐𝑛𝑛𝐶𝐶𝐶𝐶 

#### ( 

#### 𝑋𝑋,𝑋𝑋 

 2 

#### ) 

#### ≠ 1 

 iv. 𝜌𝜌 fundamentally measures linear relationship (see homework) 

---

## Exam 1 Review 

1. Spiritual thought: prayer through life’s trials, faith without works is dead, obedience gives 

 confidence 

2. Exam info 

 a. Any calculator 

 b. No time limit, predict 2-3 hours 

 c. Handout provided 

 d. Hard: typically C average 

3. Study tips 

 a. Take it seriously: equal weight with final exam 

 b. Start with study guide 

 c. Practice exams (first without solutions, then with) 

 d. Extra homework problems (or repeat homework problems) 

 e. Time saver: talk through steps, don’t work out algebra 

4. Exam strategies 

 a. Don’t forget to pray! 

 b. Extend familiar material to unfamiliar settings (good practice for real world) 

 c. Difficulty is similar to homework, but no TAs or books, so fewer A’s than homework 

 d. Average score is typically C, which averaged with Ahomework gives Boverall. 

 e. Show work and list what you know for partial credit (e.g. 𝜌𝜌= 

 𝜎𝜎 𝑥𝑥𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 , even if you can’t 

 figure out 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

#### ) 

5. Key formulas 

 a. Binary events 

 i. 𝑃𝑃 

#### ( 

#### 𝐸𝐸 

#### ) 

#### = 

 #𝐸𝐸 

 #𝑆𝑆 

 ii. 𝐶𝐶 

 𝑘𝑘 

 𝑛𝑛 

#### = 

 𝑛𝑛! 

 𝑘𝑘! 

 ( 𝑛𝑛−𝑘𝑘 

 ) ! 

 iii. 𝑃𝑃(𝐴𝐴∪𝐵𝐵)=𝑃𝑃(𝐴𝐴)+𝑃𝑃(𝐵𝐵)−𝑃𝑃(𝐴𝐴∩𝐵𝐵) 

 iv. Independent events: 𝑃𝑃(𝐴𝐴∩𝐵𝐵)=𝑃𝑃(𝐴𝐴)𝑃𝑃(𝐵𝐵) (or 𝑃𝑃(𝐴𝐴|𝐵𝐵)=𝑃𝑃(𝐴𝐴)) 

 v. 𝑃𝑃(𝐴𝐴|𝐵𝐵)= 

 𝑃𝑃 

 ( 𝐴𝐴∩𝐵𝐵 

 ) 

 𝑃𝑃 

 ( 𝐵𝐵 

 ) 

 vi. 𝑃𝑃(𝐴𝐴∩𝐵𝐵)=𝑃𝑃(𝐵𝐵|𝐴𝐴)𝑃𝑃(𝐴𝐴) 

 b. Random variables 

---

 i. Legitimate distribution? ∑𝑃𝑃(𝑥𝑥)=∫𝑓𝑓(𝑥𝑥)𝑑𝑑𝑥𝑥= 1 

 ii. Mode maximizes 𝑃𝑃(𝑥𝑥) or 𝑓𝑓(𝑥𝑥) (i.e. 𝑓𝑓 

 ′ 

 (𝑥𝑥)= 0 and 𝑓𝑓 

 ′′ 

#### (𝑥𝑥)< 0 ) 

 iii. 𝜇𝜇=𝐸𝐸(𝑋𝑋)=∑𝑥𝑥𝑃𝑃(𝑥𝑥)=∫𝑥𝑥𝑓𝑓(𝑥𝑥)𝑑𝑑𝑥𝑥 

 iv. 𝐸𝐸(𝑋𝑋 

 3 

#### )=∑𝑥𝑥 

 3 

#### 𝑃𝑃(𝑥𝑥)=∫𝑥𝑥 

 3 

#### 𝑓𝑓(𝑥𝑥)𝑑𝑑𝑥𝑥 

 v. 𝜎𝜎 

 2 

#### =𝑉𝑉(𝑋𝑋)=𝐸𝐸[(𝑋𝑋−𝜇𝜇) 

 2 

#### ]=𝐸𝐸(𝑋𝑋 

 2 

#### )−𝜇𝜇 

 2 

#### ; 𝜎𝜎=�𝑉𝑉(𝑋𝑋) 

 vi. 𝐹𝐹(𝑥𝑥)= ∫ 

#### 𝑓𝑓(𝑥𝑥�)𝑑𝑑𝑥𝑥� 

 𝑥𝑥 

 −∞ 

#### , 𝑓𝑓(𝑥𝑥)=𝐹𝐹′(𝑥𝑥) 

 vii. 𝑃𝑃(𝑎𝑎<𝑋𝑋<𝑏𝑏)=𝐹𝐹(𝑏𝑏)−𝐹𝐹(𝑎𝑎) 

 viii. Percentile: solve 𝐹𝐹(𝜙𝜙 

. 5 

#### )=.5 

 ix. 𝑓𝑓(𝑥𝑥)=𝐹𝐹′(𝑥𝑥) 

c. Joint distributions 

 i. Legitimate joint distribution? ∑ ∑𝑃𝑃(𝑥𝑥,𝑥𝑥)= ∫∫ 

#### 𝑓𝑓(𝑥𝑥,𝑥𝑥)𝑑𝑑𝑥𝑥𝑑𝑑𝑥𝑥= 1 

 ii. Marginal distribution 

#### 𝑃𝑃 

 𝑥𝑥 

#### ( 

#### 𝑥𝑥 

#### ) 

#### = 

#### ∑ 

#### 𝑃𝑃(𝑥𝑥,𝑥𝑥) 

 𝑦𝑦 

#### 𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥)=∫𝑓𝑓(𝑥𝑥,𝑥𝑥)𝑑𝑑𝑥𝑥 

 iii. Independent variables 

#### 𝑃𝑃(𝑥𝑥,𝑥𝑥)=𝑃𝑃 

 𝑥𝑥 

#### (𝑥𝑥)𝑃𝑃 

 𝑦𝑦 

#### (𝑥𝑥) 

#### 𝑓𝑓(𝑥𝑥,𝑥𝑥)=𝑓𝑓 

 𝑥𝑥 

#### (𝑥𝑥)𝑓𝑓 

 𝑦𝑦 

#### (𝑥𝑥) 

 iv. 𝐸𝐸� 

 𝑋𝑋 

 𝑌𝑌 

#### �=∑ ∑� 

 𝑥𝑥 

 𝑦𝑦 

#### �𝑃𝑃(𝑥𝑥,𝑥𝑥)= 

#### ∫∫ 

#### � 

 𝑥𝑥 

 𝑦𝑦 

#### �𝑓𝑓(𝑥𝑥,𝑥𝑥)𝑑𝑑𝑥𝑥𝑑𝑑𝑥𝑥 

 v. 𝐶𝐶𝑛𝑛𝑐𝑐(𝑋𝑋,𝑌𝑌)=𝐸𝐸�(𝑋𝑋−𝜇𝜇 

 𝑥𝑥 

#### )�𝑌𝑌−𝜇𝜇 

 𝑦𝑦 

#### ��=𝐸𝐸(𝑋𝑋𝑌𝑌)−𝜇𝜇 

 𝑥𝑥 

#### 𝜇𝜇 

 𝑦𝑦 

 vi. 𝜌𝜌= 

 𝐶𝐶𝑜𝑜𝐶𝐶(𝑋𝑋,𝑌𝑌) 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 vii. Conditional distribution 

#### 𝑃𝑃 

#### ( 

#### 𝑋𝑋=𝑥𝑥 

#### | 

#### 𝑌𝑌= 3 

#### ) 

#### = 

 𝑃𝑃(𝑥𝑥, 3 ) 

 𝑃𝑃 

 𝑥𝑥 

 ( 3 ) 

#### 𝑓𝑓 

 𝑥𝑥 

#### ( 

#### 𝑥𝑥 

#### | 

#### 𝑌𝑌= 3 

#### ) 

#### = 

 𝑑𝑑(𝑥𝑥, 3 ) 

 𝑑𝑑 

 𝑥𝑥 

 ( 3 ) 

 viii. 𝐸𝐸(𝑋𝑋 

#### | 

#### 𝑌𝑌= 3 )=∑𝑥𝑥𝑃𝑃(𝑥𝑥|𝑌𝑌= 3 )=∫𝑥𝑥𝑓𝑓(𝑥𝑥|𝑌𝑌= 3 )𝑑𝑑𝑥𝑥 

 ix. 𝑉𝑉(𝑋𝑋|𝑌𝑌= 3 )=𝐸𝐸(𝑋𝑋 

 2 

#### |𝑌𝑌= 3 )−[𝐸𝐸(𝑋𝑋|𝑌𝑌= 3 )] 

 2 

d. Regressions 

 i. 𝛽𝛽 

 1 

#### = 

 𝜎𝜎 

 𝑥𝑥𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 2 

#### =𝜌𝜌 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 ii. 𝛽𝛽 

 0 

#### =𝜇𝜇 

 𝑦𝑦 

#### −𝑏𝑏𝜇𝜇 

 𝑥𝑥 

 iii. 

 𝑑𝑑(𝑎𝑎+𝑏𝑏𝑋𝑋) 

 𝑑𝑑(𝑌𝑌) 

#### =𝜌𝜌 

 2 

---

 iv. 𝜀𝜀 

 𝑖𝑖 

#### =𝑌𝑌 

 𝑖𝑖 

#### −(𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑋𝑋 

 𝑖𝑖 

#### ) 

6. Algebra tricks 

 a. 𝐸𝐸($100−$5𝑋𝑋)=$100−$5𝐸𝐸(𝑋𝑋) 

 b. 𝑉𝑉($100−$5𝑋𝑋+$3𝑌𝑌)=𝑉𝑉($100)+𝑉𝑉(−$5𝑋𝑋)+𝑉𝑉($3𝑌𝑌)+ 2 𝐶𝐶 𝑛𝑛𝑐𝑐(−$5𝑋𝑋, $3𝑌𝑌)=0 + 

#### ($5) 

 2 

#### 𝑉𝑉(𝑋𝑋)+($3) 

 2 

#### 𝑉𝑉(𝑌𝑌)−$30𝐶𝐶𝑛𝑛𝑐𝑐(𝑋𝑋,𝑌𝑌) 

 c. 𝐶𝐶𝑛𝑛𝑐𝑐($100−$5𝑋𝑋,𝑌𝑌)=𝐶𝐶𝑛𝑛𝑐𝑐($100,𝑌𝑌)+𝐶𝐶𝑛𝑛𝑐𝑐(−$5,𝑌𝑌)= 0 −$5𝐶𝐶𝑛𝑛𝑐𝑐(𝑋𝑋,𝑌𝑌) 

 d. 𝐶𝐶𝑛𝑛𝐶𝐶 𝐶𝐶 

#### ( 

#### $100−$5𝑋𝑋,𝑌𝑌 

#### ) 

#### =𝐶𝐶𝑛𝑛𝐶𝐶𝐶𝐶 

#### ( 

#### −𝑋𝑋,𝑌𝑌 

#### ) 

#### =−𝐶𝐶𝑛𝑛𝐶𝐶𝐶𝐶 

#### ( 

#### 𝑋𝑋,𝑌𝑌 

#### ) 

7. Distributional relationships 

 a. If 𝑋𝑋 ∼𝑁𝑁 then 3 𝑋𝑋 ∼𝑁𝑁 and 𝑋𝑋+ 7 ∼𝑁𝑁 

 b. If 𝑋𝑋 

 1 

#### ,𝑋𝑋 

 2 

 ∼𝑁𝑁 then 𝑋𝑋 

 1 

#### +𝑋𝑋 

 2 

#### ∼𝑁𝑁 

 c. If 𝑍𝑍∼𝑁𝑁 

#### ( 

#### 0, 1 

#### ) 

 then 𝑍𝑍 

 2 

#### ∼𝜒𝜒 

 2 

#### ( 

#### 1 

#### ) 

 d. If 𝑊𝑊 

 1 

#### ∼𝜒𝜒 

 2 

#### (3),𝑊𝑊 

 2 

#### ∼𝜒𝜒 

 2 

 (5) independent then 𝑊𝑊 

 1 

#### +𝑊𝑊 

 2 

#### ∼𝜒𝜒 

 2 

 (8) and 

 𝑊𝑊 1 

 / 3 

 𝑊𝑊2/ 5 

#### ∼𝐹𝐹(3, 5) 

 e. If 𝑍𝑍∼𝑁𝑁(0, 1) and 𝑊𝑊 ∼𝜒𝜒 

 2 

 (𝜈𝜈) independent then 

 𝑍𝑍 

 � 

 𝑊𝑊 

 𝜈𝜈 

#### ∼𝑡𝑡(𝜈𝜈) 

8. Rejoice in how much we’ve learned! 

## L15 Bernoulli, Uniform, Standard Normal (WMS 4.4-4.5) 

Spiritual thought 

1. Dealing with disappointment 

 a. In grad school, we took two years of courses, then two qualifying exams. If pass, four 

 years of research; if fail, retake or exit with Masters degree. I prepped hard, but on day 

 of exam, got hung up on one really hard question, lost track of time, didn’t finish, and 

 failed! 

 b. I benefitted from a friend’s experience, who had previously been preparing for 

 graduation (robes, parents in town, etc.), when checked grades: E! Couldn’t graduate. 

 i. First reaction: denial. Must be a mistake! 

 ii. Second reaction: blame. Grading is unfair! 

 iii. Third reaction: dejection. I’m a failure. 

 iv. Fourth reaction: hope. I’m not a failure, I just failed at this thing. I can move 

 forward productively to the next step. Retook class, found a summer internship 

 that turned out to be career altering. 

---

 c. Scriptures 

 i. Joseph Smith in Liberty jail: “My son, peace be unto they soul; thine adversity 

 and thine afflictions shall be but a small moment; and then, if thou endure it 

 well, God shall exalt thee on high; thou shalt triumph over all thy foes” (D&C 

#### 121:7-8). 

 ii. “Search diligently, pray always, and be believing, and all things shall work 

 together for your good, if ye walk uprightly and remember the covenant 

 wherewith ye have covenanted one with another” (D&C 90:24). 

 iii. “...All things work together for good for them that love God...” (Romans 8:28). 

 d. Midterm exam: If you performed less well than you hoped, press forward with a perfect 

 brightness of hope! Help the Lord make it work toward your good. 

 i. Learn what went wrong (like spelling bee mistakes, may always remember). 

 Final exam not cumulative per se, but does repeat concepts. 

 ii. Reassess study habits (e.g. understand every step of every question; don’t just 

 trust TA or study group). 

2. 𝑋𝑋 ∼ Bernoulli(𝑝𝑝) (after Swiss mathematician Jacob Bernoulli, 1713) 

 a. Recall cell phone use 𝑃𝑃(𝑋𝑋=𝑥𝑥)=� 

#### . 7 𝑖𝑖𝑓𝑓 𝑥𝑥= 0 

#### . 3 𝑖𝑖𝑓𝑓 𝑥𝑥= 1 

 b. Mean 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### ) 

#### = 0 

#### ( 

#### . 7 

#### ) 

#### + 1 

#### ( 

#### . 3 

#### ) 

#### =.3 

 c. Variance 𝑉𝑉(𝑋𝑋)=𝐸𝐸(𝑋𝑋 

 2 

#### )−𝜇𝜇 

 2 

#### =[ 0 

 2 

#### (. 7)+ 1 

 2 

#### (. 3)]−. 3 

 2 

#### =.21=(. 3)(.7) 

 d. Pattern: 𝐸𝐸(𝑋𝑋)=𝑝𝑝, 𝑉𝑉(𝑋𝑋)=𝑝𝑝(1−𝑝𝑝) for “success” parameter 𝑝𝑝 

3. 𝑋𝑋 ∼ Uniform(𝑎𝑎,𝑏𝑏) 

 a. 𝑓𝑓 

#### ( 

#### 𝑥𝑥 

#### ) 

#### =𝑘𝑘;𝑎𝑎 ≤𝑥𝑥 ≤𝑏𝑏 

 b. 𝐹𝐹 

#### ( 

#### 𝑥𝑥 

#### ) 

#### =∫ 𝑘𝑘𝑑𝑑𝑥𝑥� 

 𝑥𝑥 

 𝑎𝑎 

#### =⋯= 

 𝑥𝑥−𝑎𝑎 

 𝑏𝑏−𝑎𝑎 

#### ;𝑎𝑎≤𝑥𝑥 ≤𝑏𝑏 

 c. 𝜇𝜇= ∫ 

#### 𝑥𝑥𝑓𝑓(𝑥𝑥)𝑑𝑑𝑥𝑥 

 𝑏𝑏 

 𝑎𝑎 

#### =⋯= 

 𝑎𝑎+𝑏𝑏 

 2 

 d. 𝜎𝜎 

 2 

#### = 

#### ∫ 

#### 𝑥𝑥 

 2 

#### 𝑓𝑓(𝑥𝑥)𝑑𝑑𝑥𝑥 

 𝑏𝑏 

 𝑎𝑎 

#### −𝜇𝜇 

 2 

#### =⋯= 

 ( 𝑏𝑏−𝑎𝑎 

 ) 

 2 

 12 

 e. Example: 90 second stop light 

 i. Average wait time 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

#### ) 

#### = 45 

 ii. Standard deviation 𝜎𝜎=� 

 ( 90 ) 

 2 

 12 

#### ≈ 26 

 iii. Wait less than 30 seconds with probability 𝐹𝐹( 30 )= 

 30 −0 

 90−0 

#### = 

 1 

 3 

1. Standard normal 𝑁𝑁(0, 1) 

---

 a. 𝑓𝑓(𝑧𝑧)= 

 1 

 √ 

 2𝜋𝜋 

#### 𝑒𝑒 

 − 

 1 

 2 

 𝑧𝑧 

 2 

 (integrate using polar coordinates or trig substitutions) 

 b. 𝐸𝐸(𝑍𝑍)= ∫ 

#### 𝑧𝑧 

 1 

 √ 2 𝜋𝜋 

#### 𝑒𝑒 

 − 

 1 

 2 

 𝑧𝑧 

 2 

#### 𝑑𝑑𝑧𝑧 

 ∞ 

 −∞ 

 =⋯= 0 (u substitution) 

 c. 𝑉𝑉 

#### ( 

#### 𝑍𝑍 

#### ) 

#### =∫ 𝑧𝑧 

 2 

 1 

 √ 

 2 𝜋𝜋 

#### 𝑒𝑒 

 − 

 1 

 2 

 𝑧𝑧 

 2 

#### 𝑑𝑑𝑧𝑧 

 ∞ 

 −∞ 

#### − 0 

 2 

 =⋯= 1 (integration by parts) 

 d. Practice reading Table A 

 i. Excel: NORM.S.DIST(x, cdf?) or NORM.S.INV(percentile) 

 ii. 𝑃𝑃(−1 <𝑋𝑋< 1 )≈.68 

 iii. 𝑃𝑃(−2 <𝑋𝑋< 2 )≈.95 

 iv. 𝑃𝑃(−3 <𝑋𝑋< 3 )≈.997 

 e. Symmetric: 𝑃𝑃 

#### ( 

#### 𝑋𝑋<− 3 

#### ) 

#### =𝑃𝑃(𝑋𝑋>3) 

## L16 Normal, Chi Square, t Distributions (WMS 4.5-4. 6) 

1. Standardization (for later reference) 

 a. If 𝐸𝐸(𝑋𝑋)=𝜇𝜇 and 𝑉𝑉(𝑋𝑋)=𝜎𝜎 

 2 

 then you can always change units to create a new random 

 variable 𝑍𝑍= 

 𝑋𝑋−𝜇𝜇 

 𝜎𝜎 

 such that 𝐸𝐸 

#### ( 

#### 𝑍𝑍 

#### ) 

 = 0 and 𝑉𝑉 

#### ( 

#### 𝑍𝑍 

#### ) 

#### = 1 

 i. 𝐸𝐸(𝑍𝑍)=𝐸𝐸� 

 1 

 𝜎𝜎 

#### (𝑋𝑋−𝜇𝜇)�= 

 1 

 𝜎𝜎 

#### [ 

#### 𝐸𝐸(𝑋𝑋)−𝜇𝜇 

#### ] 

#### = 0 

 ii. 𝑉𝑉(𝑍𝑍)=𝑉𝑉� 

 1 

 𝜎𝜎 

#### 𝑋𝑋− 

 1 

 𝜎𝜎 

#### 𝜇𝜇�=𝑉𝑉� 

 1 

 𝜎𝜎 

#### 𝑋𝑋�= 

 1 

 𝜎𝜎 

 2 

#### 𝑉𝑉(𝑋𝑋)= 1 

2. Normal (or Gaussian, after German mathematician Carl Friedrich Gauss, 1809) 𝑁𝑁(𝜇𝜇,𝜎𝜎 

 2 

#### ) 

 a. 𝑓𝑓(𝑥𝑥)= 

 1 

 𝜎𝜎√2𝜋𝜋 

#### 𝑒𝑒 

 − 

 1 

 2 

 � 

 𝑥𝑥−𝜇𝜇 

 𝜎𝜎 

 � 

 2 

 (integrate using polar coordinates or trig substitutions) 

 b. 𝐸𝐸(𝑋𝑋)= ∫ 

#### 𝑥𝑥 

 1 

 𝜎𝜎 √ 

 2 𝜋𝜋 

#### 𝑒𝑒 

 − 

 1 

 2 

 � 

 𝑥𝑥−𝜇𝜇 

 𝜎𝜎 

 � 

 2 

#### 𝑑𝑑𝑥𝑥 

 ∞ 

 −∞ 

 =⋯=𝜇𝜇 (u substitution) 

 c. 𝑉𝑉 

#### ( 

#### 𝑋𝑋 

#### ) 

#### =∫ 𝑥𝑥 

 2 

 1 

 𝜎𝜎 √ 

 2𝜋𝜋 

#### 𝑒𝑒 

 − 

 1 

 2 

 � 

 𝑥𝑥−𝜇𝜇 

 𝜎𝜎 

 � 

 2 

#### 𝑑𝑑𝑥𝑥 

 ∞ 

 −∞ 

#### −𝜇𝜇 

 2 

#### =⋯=𝜎𝜎 

 2 

 (integration by parts) 

 d. No analytical cdf; instead, approximate numerically 

 i. Excel: NORM.DIST(x, mu, sd, cdf?) 

 ii. Percentiles: NORM.INV(percentile, mu, sd) 

 e. Special Properties 

 i. 𝑁𝑁+ 7 ∼𝑁𝑁 

 In other words, adding a constant changes the precise distribution of 𝑋𝑋 but 

 keeps it in the normal family 

---

1. Note: this is true of some other families of random variables (e.g. 

 uniform) but not all (e.g. Bernoulli, binomial, exponential) 

 ii. 3 𝑁𝑁 ∼𝑁𝑁 

 In other words, multiplying by a constant keeps 𝑋𝑋 in the normal family 

1. Note: this is true of some other families of random variables (e.g. 

 uniform, exponential) but not all (e.g. Bernoulli, binomial) 

 iii. 𝑁𝑁+𝑁𝑁∼𝑁𝑁 

 That is, if 𝑋𝑋 ∼𝑁𝑁 

#### ( 

#### 𝜇𝜇 

 𝑥𝑥 

#### ,𝜎𝜎 

 𝑥𝑥 

 2 

#### ) 

 and 𝑌𝑌∼𝑁𝑁�𝜇𝜇 

 𝑦𝑦 

#### ,𝜎𝜎 

 𝑦𝑦 

 2 

#### � 

 then 𝑋𝑋+𝑌𝑌∼𝑁𝑁�𝜇𝜇 

 𝑥𝑥 

#### +𝜇𝜇 

 𝑦𝑦 

#### ,𝜎𝜎 

 𝑥𝑥 

 2 

#### +𝜎𝜎 

 𝑦𝑦 

 2 

#### + 2 𝜎𝜎 

 𝑥𝑥𝑦𝑦 

#### � 

 In other words, the sum of two normally distributed random variables is a 

 normally distributed random variable 

1. Note: this is true of some other families of random variables (e.g. 

 independent binomials), but not all (e.g. Bernoulli, correlated binomials, 

 uniform, exponential) 

3. Standard normal 𝑁𝑁(0, 1) 

 a. Practice reading Table A 

 i. Excel: NORM.S.DIST(x, cdf?) or NORM.S.INV(percentile) 

 ii. 𝑃𝑃 

#### ( 

#### −1 <𝑋𝑋< 1 

#### ) 

#### ≈.68 

 iii. 𝑃𝑃(−2 <𝑋𝑋< 2 )≈.95 

 iv. 𝑃𝑃(−3 <𝑋𝑋< 3 )≈.997 

 b. Symmetric: 𝑃𝑃(𝑋𝑋<− 3 )=𝑃𝑃(𝑋𝑋>3) 

 c. Standardized normal 𝑍𝑍= 

 𝑋𝑋−𝜇𝜇 

 𝜎𝜎 

 is standard normal ∼𝑁𝑁 

#### ( 

#### 0, 1 

#### ) 

 (because of special 

 properties of normal 𝑋𝑋) 

 d. Example 1: 𝑋𝑋 ∼𝑁𝑁( 75 ,25) to find 𝑃𝑃(𝑋𝑋> 80 )=𝑃𝑃�𝑍𝑍> 

 80 −75 

 √ 25 

#### � 

#### =𝑃𝑃(𝑍𝑍> 1 )= 1 −𝑃𝑃(𝑍𝑍≤ 1 ) 

#### ≈ 1 −.8413=.1587 

 e. Example 2: costs 𝐶𝐶 ∼𝑁𝑁(120,100) 

 i. Budget 𝑏𝑏 so that 𝑃𝑃(𝐶𝐶<𝑏𝑏)=.9 

 ii.. 90=𝑃𝑃(𝐶𝐶<𝑏𝑏)=𝑃𝑃�𝑍𝑍< 

 𝑏𝑏−120 

 10 

 �≈𝑃𝑃(𝑍𝑍<1. 28) (from Table A) 

 iii. If 

 𝑏𝑏−120 

 10 

 ≈1. 28 then 𝑏𝑏≈ 132 .8 

---

 f. Example 3: costs 𝐶𝐶 ∼𝑁𝑁(120,100)) and revenue 𝑅𝑅∼𝑁𝑁(150,400) are independent; 

 how often are profits 𝑌𝑌=𝑅𝑅−𝐶𝐶 positive? 

 i. Y∼𝑁𝑁 

 ii. E(Y)=E(R)−E(C)= 150 − 120 = 30 

 iii. 𝑉𝑉 

#### ( 

#### Y 

#### ) 

#### =𝑉𝑉 

#### ( 

#### 𝑅𝑅−𝐶𝐶 

#### ) 

#### =𝑉𝑉 

#### ( 

#### 𝑅𝑅 

#### ) 

#### + 

#### ( 

#### − 1 

#### ) 

 2 

#### 𝑉𝑉 

#### ( 

#### 𝐶𝐶 

#### ) 

#### + 2 𝐶𝐶 𝑛𝑛𝑐𝑐 

#### ( 

#### 𝑅𝑅,𝐶𝐶 

#### ) 

#### = 400 + 100 = 500 

 iv. So 𝑌𝑌∼𝑁𝑁( 30 ,500) 

 v. 𝑃𝑃 

#### ( 

#### Y > 0 

#### ) 

#### =𝑃𝑃�𝑍𝑍> 

 0−30 

 √ 

 500 

#### �≈𝑃𝑃 

#### ( 

#### 𝑍𝑍>−1. 34 

#### ) 

#### =𝑃𝑃 

#### ( 

#### 𝑍𝑍<1. 34 

#### ) 

#### ≈.9099 

#### 4. 𝑊𝑊 ∼𝜒𝜒 

 2 

 (𝜈𝜈) (German statistican Friedrich Robert Helmert, 1875) 

 a. Domain is [0,∞), roughly bell-shaped (but asymmetric, unlike Normal distribution) 

 b. 𝜈𝜈 is often called “degrees of freedom”, because in the most common application, it 

 corresponds to how many 

 c. 𝐸𝐸 

#### ( 

#### 𝑊𝑊 

#### ) 

 =𝜈𝜈 and 𝑉𝑉 

#### ( 

#### 𝑊𝑊 

#### ) 

#### = 2 𝜈𝜈 

 d. 𝑓𝑓 

#### ( 

#### 𝑤𝑤 

#### ) 

 =𝑢𝑢𝑔𝑔𝑙𝑙𝑥𝑥 (I won’t expect you to know or use) 

 e. CDF 𝐹𝐹 

#### ( 

#### 𝑤𝑤 

#### ) 

 approximated on Table 6 

 i. 𝜒𝜒 

 𝛼𝛼 

 2 

 represents a realization of the random variable, where 𝛼𝛼 is the probability to 

 the right of that value (i.e., 1 −𝐹𝐹(𝑤𝑤)) 

 ii. Example: suppose sales follow Chi-square distribution, with average of 30 units 

1. Degrees of freedom 𝜈𝜈= 30 

#### 2. 10 

 th 

 percentile is 𝜒𝜒 

. 90 

 2 

#### ≈ 20 .6, 90 

 th 

 percentile is 𝜒𝜒 

. 10 

 2 

#### ≈ 40 .3 

3. Putting these together, 𝑃𝑃( 20 .6 <𝑊𝑊< 40 .3)≈.8 

 iii. Note: Table 6 only gives 10 points on the cdf. With a computer, you can get the 

 rest. Excel: CHISQ.DIST(x,df, cdf?), CHISQ.INV(percentile, df) 

 f. Facts 

 i. If 𝑍𝑍∼𝑁𝑁(0, 1) then 𝑍𝑍 

 2 

#### ∼𝜒𝜒 

 2 

#### (1) 

 ii. If 𝑊𝑊 

 1 

#### ∼𝜒𝜒 

 2 

 (4) and 𝑊𝑊 

 2 

#### ∼𝜒𝜒 

 2 

 ( 7 ) independent then 𝑊𝑊 

 1 

#### +𝑊𝑊 

 2 

#### ∼𝜒𝜒 

 2 

#### (11) 

 iii. Variance is a quadratic function of a random variable, so when we estimate the 

 variance of a random variable that has a normal distribution (in lecture L19), our 

 estimates will follow a 𝜒𝜒 

 2 

 distribution. 

5. 𝑡𝑡 distribution (Friedrich Robert Helmert 1876, Karl Pearson 1900) 

 a. 𝑇𝑇∼𝑡𝑡(𝜈𝜈); as in Chi-square distribution, 𝜈𝜈 is called “degrees of freedom” 

 b. Similar to standard normal, but with higher variance (i.e. thicker tails) 

 c. Approaches 𝑁𝑁(0, 1) as 𝜈𝜈→∞ 

---

 d. 𝑓𝑓(𝑡𝑡)=𝑢𝑢𝑔𝑔𝑙𝑙𝑥𝑥 (I won’t expect you to know or use) 

 e. 𝐸𝐸(𝑇𝑇)= 0 , 𝑉𝑉(𝑇𝑇)= 

 𝜈𝜈 

 𝜈𝜈−2 

#### → 1 

 f. CDF 𝐹𝐹(𝑡𝑡) approximated on Table C 

 i. Table is oriented so that probability 𝐶𝐶 lies between −𝑡𝑡 

 ∗ 

 and 𝑡𝑡 

 ∗ 

#### . 

 ii. Example: if 𝑇𝑇∼𝑡𝑡( 20 ) find 90 

 th 

 percentile 

1. Following 𝐶𝐶=80% (fifth column) for 𝑑𝑑𝑓𝑓= 20 leads to 𝑡𝑡 

 ∗ 

#### =1. 325. 

2. In other words, 10% of the distribution is left of −1. 325, 80% is 

 between −1. 325 and 1. 325, and 10% is above 1. 325. 

3. Since 10%+80%=90% of the distribution is below 1. 325 and 10% 

 is above, 1. 325 is the 90 

 th 

 percentile of the distribution. 

4. Alternatively, can come up from a one-sided p-value of. 10 or a two- 

 sided p-value of. 20 (bottom of the table) to reach the same conclusion. 

 iii. For degrees of freedom greater than 1000 , can read 𝑧𝑧 

 ∗ 

 row of the table, which 

 corresponds to a standard normal distribution (i.e., ∞ degrees of freedom). 

 iv. Note: Table C only gives 12 points on CDF. With a computer, you can get the 

 rest. Excel: T.DIST(x, df, cdf?) and T.INV(percentile, df) 

 g. Fact 

 i. If 𝑍𝑍∼𝑁𝑁(0, 1) and 𝑊𝑊 ∼𝜒𝜒 

 2 

 (𝜈𝜈) independent then 

 𝑍𝑍 

 � 

 𝑊𝑊 

 𝜈𝜈 

#### ∼𝑡𝑡(𝜈𝜈) 

 ii. If we knew the population variance, then estimates of the mean would follow a 

 normal distribution. Since we have to estimate the population variance, and 

 estimates follow a 𝜒𝜒 

 2 

 distribution, our estimates of the mean follow a 𝑡𝑡 

 distribution 

6. Other distributions 

 a. The distributions we’ve gone over are some of the most common; there are many 

 others, with various shapes, properties, and uses. 

 b. Illustrated: https://www.itl.nist.gov/div898/handbook/eda/section3/eda366.htm 

 c. Discrete 

 i. Uniform 

 ii. Binomial 

 iii. Geometric 

 iv. Poisson 

---

 v. Hypergeometric 

 d. Continuous 

 i. Exponential 

 ii. F 

 iii. Beta 

 iv. Gamma 

 v. Log-normal 

 vi. Pareto 

 vii. Weibull 

## L17 Confidence Intervals (WMS 7.2-3,8.5-9) 

Project note 

1. If you didn’t turn the project in on time, get it in ASAP! Items from part 2 of the project will 

 show up on homework; if you do them with your homework, your project will be finished by the 

 end of the semester. 

2. From now on, must start on project as part of homework 

3. Keep results, to submit as project 

4. Note: If you have a population instead of a sample from a population (e.g. all 50 states), just 

 pretend this is a sample from a larger population (i.e. 50 draws from a population of thousands 

 of U.S. states). 

Samples 

1. Population vs. sample 

 a. So far, our discussion of distributions has presumed an entire population. Often, 

 information is only available from a sample. 

 i. Surveys are costly, populations are often huge 

 ii. Some of you might have whole populations (e.g. all 50 states, all teams, every 

 week of a company’s sales data); for projects, pretend sample even if you 

 actually have population. But be careful: 

1. Sometimes population of interest includes future generations (e.g. NBA 

 rookies, stock returns). 

---

2. Similarly, population of things that actually happened can in some cases 

 be viewed as a sample from the larger set of things that potentially 

 could have occurred instead. 

 b. Unless entire population is observed, can’t know what is true, only what is probably true 

2. Random sample 

 a. i.i.d. (Independently and Identically Distributed): survey answers are independent from 

 each other, and identical to population of interest 

 b. Convenience survey (e.g. urban survey of wages): expand sample or limit scope of 

 inference 

 c. Selection bias (e.g. survey participation, program participation): administrative records, 

 measurements before participation decided, interpret results narrowly (e.g. benefit of 

 college for those who chose to attend) 

 d. Time trends (e.g. daily/weekly sales) – rare “spot check” observations, econometric 

 corrections 

3. Estimation 

 a. Example: Suppose we wish to estimate the average family size 𝜇𝜇 of BYU students, along 

 with the standard deviation 𝜎𝜎 and the correlation 𝜌𝜌 between family size and GPA. What 

 pieces of data should be used, and how should they be combined? 

 b. Population parameter 𝜃𝜃 (i.e. generic proxy for 𝜇𝜇,𝜎𝜎,𝑎𝑎,𝑏𝑏,𝜌𝜌,𝛽𝛽,𝑝𝑝, etc.), seek “estimator” 

 function 𝜃𝜃 

#### � 

#### (𝑥𝑥 

 1 

#### ,𝑥𝑥 

 2 

#### , ...,𝑥𝑥 

 𝑛𝑛 

 ) (commonly denoted by “hat” variable) 

 i. Evaluating this “estimator” function with our data provides point estimates ; 

 next two lectures we’ll talk about interval estimates, or margin of error 

 c. An estimator is a tool for producing estimates. We’ll spend most of the semester talking 

 about a variety of such tools (i.e. estimators for different parameters) but first we need 

 some tool-building tools (i.e. techniques for developing estimators in new settings of 

 interest). 

Estimators vs. estimates 

1. Example: suppose distribution of income among last year’s 8, 500 BYU graduates has mean 

#### 𝐸𝐸 

#### ( 

#### 𝑋𝑋 

 𝑖𝑖 

#### ) 

 =𝜇𝜇=$48𝑘𝑘 and standard deviation �𝑉𝑉 

#### ( 

#### 𝑋𝑋 

 𝑖𝑖 

#### ) 

#### =𝜎𝜎=$13𝑘𝑘 

---

 But we can’t observe this, so we survey 𝑛𝑛= 25 graduates and estimate 𝜇𝜇̂= 

 1 

 𝑛𝑛 

#### ∑ 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 =𝑥𝑥̅ and 

#### 𝜎𝜎 

#### � 2 

#### = 

 1 

 𝑛𝑛 

#### ∫ 

#### ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

2. Sampling distribution 

 a. Every survey of 25 students yields different estimates �𝜇𝜇̂,𝜎𝜎 

 2 � 

 �. Sampling with 

 replacement, there are 8, 500 

 25 

#### ≈ 10 

 98 

 such samples. 

 (Sampling without replacement is more common in practice, and violates i.i.d. but only 

 slightly, as long as population size is large.) 

 b. Before we conduct interviews, survey responses 𝑋𝑋 

 1 

#### ,𝑋𝑋 

 2 

#### , ...,𝑋𝑋 

 𝑛𝑛 

 can be viewed as random 

 variables, each drawn from the population of BYU grads 

3. Estimates and estimators 

 a. Once we conduct survey, 𝜃𝜃 

#### � 

#### ( 

#### 𝑥𝑥 

 1 

#### ,𝑥𝑥 

 2 

#### , ...,𝑥𝑥 

 𝑛𝑛 

#### ) 

 provides estimate of parameter 𝜃𝜃. Before we 

 conduct survey, estimator 𝜃𝜃 

#### � 

#### ( 

#### 𝑋𝑋 

 1 

#### ,𝑋𝑋 

 2 

#### , ...,𝑋𝑋 

 𝑛𝑛 

#### ) 

 is random. 

 b. To evaluate estimation procedure, we must think about entire distribution of estimates 

 (in other words, evaluate estimator), not individual estimate. 

 c. Therefore, 𝜇𝜇̂= 

 1 

 𝑛𝑛 

#### ∑ 

#### 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### =𝑋𝑋 

#### � 

 is random variable with mean 𝜇𝜇 

 𝜇𝜇� 

 and variance 𝜎𝜎 

 𝜇𝜇� 

 2 

 d. Similarly, 𝜎𝜎 

#### � 2 

#### = 

 1 

 𝑛𝑛 

#### ∫ 

#### (𝑋𝑋 

 𝑖𝑖 

#### −𝑋𝑋 

#### � 

#### ) 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

 is random variable with mean 𝜇𝜇 

 𝜎𝜎 

 � 2 

 and variance 𝜎𝜎 

 𝜎𝜎 

 � 2 

 2 

Margin of error 

1. Recall that 

#### 𝜇𝜇 

 𝑋𝑋 

 � 

#### =𝐸𝐸� 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### �=⋯=𝜇𝜇 

#### 𝜎𝜎 

 𝑋𝑋 

 � 

 2 

#### =𝑉𝑉� 

 1 

 𝑛𝑛 

#### ∑ 

#### 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### �=⋯= 

 𝜎𝜎 

 2 

 𝑛𝑛 

2. Previous estimates are _point_ estimates; _margin of error_ (e.g. ±$20𝑘𝑘) measures precision, gives 

 interval estimate 

3. Example 

 a. Income 𝑋𝑋 

 𝑖𝑖 

 of 8,500 BYU graduates has unknown mean 𝜇𝜇 and known standard deviation 

#### 𝜎𝜎=$13𝑘𝑘. 

 b. If 𝑛𝑛= 25 then 𝑋𝑋 

#### � 

 has same mean 𝜇𝜇, and standard error 𝜎𝜎 

 𝑋𝑋 

 � 

#### = 

#### � 

 ($13 𝑘𝑘) 

 2 

 25 

#### =$2.6𝑘𝑘 

 c. Rule of thumb: 𝑋𝑋 

 𝑖𝑖 

 typically within 𝜇𝜇± 2 𝜎𝜎, 𝑋𝑋 

#### � 

 typically within 𝜇𝜇± 2 𝜎𝜎 

 𝑋𝑋 

 � 

 =𝜇𝜇±$5.2𝑘𝑘; thus, 

 $5.2𝑘𝑘 is “margin of error” 

---

 d. Dog and leash principle: 3 ft. leash keeps dog within 3 ft. of owner; symmetrically keeps 

 owner within 3 ft. of dog 

 e. Observe 𝑥𝑥̅=$47.1𝑘𝑘 

 Maybe 𝜇𝜇 as low as $41.9𝑘𝑘 and we overestimated 

 Maybe 𝜇𝜇 as high as $52.3𝑘𝑘 and we underestimated. 

4. If 𝜎𝜎 unknown, can estimate margin of error using 

#### � 

 𝑜𝑜 

 2 

 100 

Confidence Intervals 

1. How often is 𝑋𝑋 

#### � 

 in interval 𝜇𝜇± 2 𝜎𝜎? To compute probability, we need the cdf of 𝑋𝑋 

#### � 

#### . 

2. Normality of 𝑋𝑋 

#### � 

 a. If population distribution of 𝑋𝑋 

 𝑖𝑖 

 is normal then 𝑋𝑋 

#### � 

#### = 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 is normal too. Specifically, 

#### 𝑋𝑋 

#### � 

#### ∼𝑁𝑁�𝜇𝜇, 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### �. 

 b. Standardizing, 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### ∼𝑁𝑁(0, 1). 

Confidence interval for 𝜇𝜇 

1. Construction 

 a. We want Pr 

#### ( 

#### #<𝜇𝜇<# 

#### ) 

 =.90 and from Table A we know 𝑋𝑋 

#### � 

#### ∼𝑁𝑁�𝜇𝜇, 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### �= 

#### 𝑁𝑁(𝜇𝜇, $2.6𝑘𝑘 

 2 

 ) (still assuming 𝜎𝜎=$13𝑘𝑘 and 𝑛𝑛= 25 ) 

#### . 90=𝑃𝑃�−1. 64< 

 𝑋𝑋 

 � 

 −𝜇𝜇 

 $2.6𝑘𝑘 

#### <1. 64� 

#### =𝑃𝑃(−1. 64⋅$2.6𝑘𝑘<𝑋𝑋 

#### � 

#### −𝜇𝜇<1. 64⋅$2.6𝑘𝑘) 

#### ≈𝑃𝑃(−𝑋𝑋 

#### � 

#### −$4.3𝑘𝑘<−𝜇𝜇<−𝑋𝑋 

#### � 

#### +$4.3𝑘𝑘) 

#### =𝑃𝑃 

#### ( 

#### 𝑋𝑋 

#### � 

#### +$4.3𝑘𝑘>𝜇𝜇>𝑋𝑋 

#### � 

#### −$4.3𝑘𝑘 

#### ) 

 b. (Can also construct one-sided confidence intervals) 

 c. Example: 𝑥𝑥̅=$47.1𝑘𝑘 (still assume 𝜎𝜎=$13𝑘𝑘; later we’ll estimate) 

 i. 90% confidence interval 𝑥𝑥̅±1. 64𝜎𝜎 

 𝑥𝑥̅ 

#### =$47.1𝑘𝑘±$4.3𝑘𝑘 

 ii. 95% confidence interval 𝑥𝑥̅±1. 96𝜎𝜎 

 𝑥𝑥̅ 

#### =$47.1𝑘𝑘±$5.1𝑘𝑘 

 iii. 99% confidence interval 𝑥𝑥̅±2. 58𝜎𝜎 

 𝑥𝑥̅ 

#### =$47.1𝑘𝑘±$6.7𝑘𝑘 

2. Distribution of 𝑆𝑆 

 2 

 a. If 𝑋𝑋 

 𝑖𝑖 

#### ∼𝑁𝑁 

#### ( 

#### 𝜇𝜇,𝜎𝜎 

 2 

#### ) 

 and 𝑋𝑋 

#### � 

#### ∼𝑁𝑁�𝜇𝜇, 

 𝜎𝜎 

 2 

 𝑛𝑛 

 � then 

#### ( 

#### 𝑛𝑛− 1 

#### ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### ∼𝜒𝜒 

 2 

#### ( 

#### 𝑛𝑛− 1 

#### ) 

#### . 

---

 b. Intuitively, expectation of 𝜒𝜒 

 2 

 (𝑛𝑛− 1 ) is 𝑛𝑛− 1 , expectation of 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

 is 1. 

3. Confidence interval for 𝜇𝜇 when 𝜎𝜎 unknown 

 a. If we replace 𝜎𝜎 

 2 

 with 𝑒𝑒 

 2 

 then 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝑆𝑆 

 2 

 𝑛𝑛 

#### ∼𝑡𝑡(𝑛𝑛−1). 

 i. This is because 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝑆𝑆 

 2 

 𝑛𝑛 

#### = 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### ⋅ 

 1 

 � 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

 , which is 𝑁𝑁 

#### ( 

#### 0, 1 

#### ) 

 divided by 

 𝜒𝜒 

 2 

 (𝑛𝑛−1) 

 𝑛𝑛−1 

 ii. Note: i f 𝑛𝑛 large then 𝑡𝑡(𝑛𝑛− 1 )≈𝑁𝑁(0, 1). 

 b. Example: average weekly income 𝑛𝑛= 25 , 𝑥𝑥̅=$47.1𝑘𝑘, 𝑒𝑒=$13𝑘𝑘, 𝜎𝜎� 

 𝑋𝑋 

 � 

#### = 

#### � 

 𝑜𝑜 

 2 

 𝑛𝑛 

#### =$2.6𝑘𝑘 

 i. 90% confidence interval 𝑥𝑥̅±1. 726𝜎𝜎� 

 𝑋𝑋 

 � 

#### =$47.1𝑘𝑘±$4.5𝑘𝑘 

 ii. 95% confidence interval 𝑥𝑥̅±2. 093𝜎𝜎� 

 𝑋𝑋 

 � 

#### =$47.1𝑘𝑘±$5.4𝑘𝑘 

 iii. 99% confidence interval 𝑥𝑥̅±2. 861𝜎𝜎� 

 𝑋𝑋 

 � 

#### =$47.1𝑘𝑘±$7.4𝑘𝑘 

Central Limit Theorem (de Moivre 1733, Laplace 1812, Lyapunov 1901) 

#### 4. 

#### ∑ 

#### 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 →𝑁𝑁 (and therefore 𝑋𝑋 

#### � 

 →𝑁𝑁) no matter what the distribution of 𝑋𝑋 

 𝑖𝑖 

5. Dice example 

 a. Distribution of 𝑋𝑋 

 1 

#### +𝑋𝑋 

 2 

 is bell-shaped, even though 𝑋𝑋 

 𝑖𝑖 

 is (discrete) uniform 

 b. Intuition: centrist values frequent (e.g. moderate 𝑋𝑋 

 1 

 and 𝑋𝑋 

 2 

 , or 𝑋𝑋 

 1 

 low 𝑋𝑋 

 2 

 high, or vice 

 versa), but extreme values rare (e.g. 𝑋𝑋 

 1 

 and 𝑋𝑋 

 2 

 both low) 

 c. 𝑃𝑃(𝑋𝑋 

#### � 

 100 

#### = 1 )=� 

 1 

 6 

#### � 

 100 

#### ≈ 10 

 −78 

 ; tails become exponentially less likely (key feature of 

 normal distribution) as 𝑛𝑛 increases 

6. Skewed example 

 a. Bernoulli unemployment 𝑃𝑃 

#### ( 

#### 0, 1 

#### ) 

#### = 

#### ( 

#### . 7,.3 

#### ) 

 b. Average of two: 𝑃𝑃 

#### ( 

#### 0,.5, 1 

#### ) 

#### ≈ 

#### ( 

#### . 5,.4,.1 

#### ) 

 c. Average of four: 𝑃𝑃(0,.25, .5,.75,1)≈(.25,. 4,.25, .1, 0) 

7. CLT explains why normal distribution is so prevalent in nature: one attribute is sum total of 

 many, smaller, independent attributes 

## L18 Hypothesis Tests (WMS 10.2-8) 

1. Hypothesis test: old profit 𝑋𝑋 ∼𝑁𝑁($400, $100 

 2 

 ), new management; keep or fire? 

 a. Null hypothesis (benefit of doubt) 𝐻𝐻 

 0 

#### :𝜇𝜇= 400 

---

 b. Alternative hypothesis (burden of proof) 𝐻𝐻 

 𝑎𝑎 

#### :𝜇𝜇< 400 

 c. Level 𝛼𝛼=Pr 

#### ( 

#### 𝐶𝐶𝑒𝑒𝑟𝑟 𝑒𝑒𝑐𝑐𝑡𝑡 𝐻𝐻 

 0 

#### | 

#### 𝐻𝐻 

 0 

#### 𝑡𝑡𝐶𝐶𝑢𝑢𝑒𝑒 

#### ) 

#### =.10 

 d. Test statistic 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### ∼𝑁𝑁(0, 1) 

 e. Critical value −1. 28, rejection region to left 

 f. Data: 𝑥𝑥̅=$350 over 8 weeks 

 g. If 𝐻𝐻 

 0 

 true, 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### = 

 350 −400 

 �100 

 2 

 / 8 

 ≈−1. 41∈𝑅𝑅𝑅𝑅; reject 𝐻𝐻 

 0 

 h. “Significantly less than 400” (statistical vs. practical significance) 

 i. Type 1 error: convict innocent (probability 𝛼𝛼) 

 j. Type 2 error: acquit guilty (probability 𝛽𝛽) 

 k. Repeat for 𝛼𝛼=.01; critical value −2. 33, fail to reject 

 l. P-value = smallest 𝛼𝛼 such that (for this data) reject 𝐻𝐻 

 0 

 ; 0. 0793 in this case 

 m. Practice: Reject if 𝛼𝛼=.05? 

2. Variations 

 a. 𝐻𝐻 

 𝑎𝑎 

 :𝜇𝜇< 380 (expect and tolerate adjustment cost $20 for new); test statistic increases 

 to −.85, p-value increases to 0. 20. (At 𝛼𝛼=.10 level, $350 is significantly less than 

 $400, but not significantly less than $380) 

 b. 𝐻𝐻 

 𝑎𝑎 

 :𝜇𝜇> 450 ; if still 𝛼𝛼=.10 then critical value +1. 28; test statistic negative, so (really) 

 fail to reject 

 c. What if 𝜎𝜎 

 2 

 unknown, and 𝑒𝑒 

 2 

#### = 100 

 2 

 instead? Use t-distribution with 7 degrees of 

 freedom; critical value if 𝛼𝛼=.10 is 1. 415; reject null hypothesis. (p-value not on chart, 

 but by computer is 0. 1007) 

 d. 𝐻𝐻 

 𝑎𝑎 

 :𝜇𝜇≠ 400 ; critical values at ±1. 645, now fail to reject; p-value 2 (. 079)=0. 158 

3. Relationship to confidence intervals 

 a. In two-sided 𝛼𝛼=.05 level hypothesis test, reject if � 

 𝑋𝑋 

 � −400 

 𝜎𝜎 

 𝑥𝑥 

 � 

#### � 

 >1. 645. In other words, if 

#### 𝑋𝑋 

#### � 

 more than 1. 645 𝜎𝜎 

 𝑥𝑥̅ 

 units from 400. 

 b. Two-sided 95% confidence interval consists of 𝑋𝑋 

#### � 

#### ±1. 645𝜎𝜎 

 𝑥𝑥̅ 

 c. In other words,. 05 level hypothesis test merely asks whether 400 lies inside the 95% 

 confidence interval. 

---

## L19 Bias and Consistency (WMS 7.2-7.4, 9.1-9.3) 

[What if you used median to estimate mean, say in income distribution? Biased.] 

Properties of estimators 

1. Evaluating 𝜃𝜃 

#### � 

 amounts to evaluating distribution of 𝜃𝜃 

#### � 

#### (𝑋𝑋 

 1 

#### ,𝑋𝑋 

 2 

#### , ...,𝑋𝑋 

 𝑛𝑛 

 ) relative to true unknown 

 value 𝜃𝜃 

2. Though 𝜃𝜃 is unknown, we know how 𝜃𝜃 

#### � 

 relates to 𝑋𝑋 

 𝑖𝑖 

 and how 𝑋𝑋 

 𝑖𝑖 

 relates to 𝜃𝜃, so can know 

 (probabilistically) how 𝜃𝜃 

#### � 

 relates to 𝜃𝜃 

3. We’ll use this to evaluate estimator goodness and to define _margin of error_ / _interval estimates_ , 

 and do hypothesis test 

4. Moments of 𝜇𝜇̂=𝑋𝑋 

#### � 

 a. 𝜇𝜇 

 𝜇𝜇� 

#### =𝐸𝐸(𝜇𝜇̂)=𝐸𝐸(𝑋𝑋 

#### � 

#### )=𝐸𝐸� 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### �= 

 1 

 𝑛𝑛 

#### ∑ 𝐸𝐸(𝑋𝑋 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

 1 

 𝑛𝑛 

#### 𝑛𝑛𝐸𝐸(𝑋𝑋 

 𝑖𝑖 

#### )=𝐸𝐸(𝑋𝑋 

 𝑖𝑖 

#### )=𝜇𝜇 

 Thus, thought we don’t know what 𝜇𝜇 is, we know that average realization of 𝑋𝑋 

#### � 

 and 

 average realization of 𝑋𝑋 

 𝑖𝑖 

 are same 

 b. 𝜎𝜎 

 𝜇𝜇� 

 2 

#### =𝑉𝑉(𝜇𝜇̂)=𝑉𝑉(𝑋𝑋 

#### � 

#### )=𝑉𝑉� 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### �= 

 1 

 𝑛𝑛 

 2 

#### ∑ 𝑉𝑉(𝑋𝑋 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

 1 

 𝑛𝑛 

 2 

#### 𝑛𝑛𝑉𝑉(𝑋𝑋 

 𝑖𝑖 

#### )= 

 𝜎𝜎 

 2 

 𝑛𝑛 

 Variance of 𝑋𝑋 

#### � 

 is much smaller than variance of 𝑋𝑋 

 𝑖𝑖 

 c. Standard error (i.e. standard deviation of estimator) 𝜎𝜎 

 𝑋𝑋 

 � 

#### = 

#### � 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### = 

 𝜎𝜎 

 √ 

 𝑛𝑛 

 i. In population (𝑛𝑛= 1 ), incomes typically between $48𝑘𝑘±$26𝑘𝑘 [$22𝑘𝑘, $74𝑘𝑘] 

 ii. For 𝑛𝑛= 25 , sample average 𝑋𝑋 

#### � 

 typically between $48𝑘𝑘±$5.2𝑘𝑘 [$43𝑘𝑘, $53𝑘𝑘] 

 iii. For 𝑛𝑛= 100 , sample average 𝑋𝑋 

#### � 

 typically between $48𝑘𝑘±$2.6𝑘𝑘 [$44𝑘𝑘, $51𝑘𝑘] 

 iv. For 𝑛𝑛= 10 ,000, 𝑋𝑋 

#### � 

 typically between $48𝑘𝑘±$0.26𝑘𝑘 [$47.7,$48.3𝑘𝑘] 

Consistency 

1. Best imaginable case: 𝜃𝜃 

#### � 

 degenerate with 𝐸𝐸 � 

#### 𝜃𝜃 

#### � 

#### � 

 =𝜃𝜃 and 𝑉𝑉 � 

#### 𝜃𝜃 

#### � 

#### �= 0 

2. As 𝑛𝑛→∞, 𝜃𝜃 

#### � 

 approaches ideal distribution 

 a. That is, 𝐸𝐸�𝜃𝜃 

#### � 

 �→𝜃𝜃 and 𝑉𝑉�𝜃𝜃 

#### � 

#### �→ 0 

 Put differently, 𝜃𝜃 

#### � 

 𝑛𝑛 

 →𝜃𝜃 (“in probability”) 

3. Example: 𝜇𝜇̂=𝑋𝑋 

#### � 

 is consistent estimator of 𝜇𝜇 

 a. 𝐸𝐸(𝜇𝜇̂)=𝜇𝜇 for all 𝑛𝑛 

 b. 𝑉𝑉 

#### ( 

#### 𝜇𝜇̂ 

#### ) 

#### = 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### → 0 

---

4. Law of large numbers (Jacob Bernoulli, 1713) 

 a. Sample means converge to population means 

 b. Higher order moments 

 i. 𝐸𝐸� 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 3 

 𝑖𝑖=1 

#### �=𝐸𝐸�𝑋𝑋 

 𝑖𝑖 

 3 

#### � 

 ii. 𝑉𝑉� 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 3 

 𝑖𝑖=1 

#### �= 

 𝑑𝑑�𝑋𝑋 

 𝑖𝑖 

 3 

 � 

 𝑛𝑛 

#### → 0 

 iii. Sample moments converge to population moments (justification for MOM) 

5. Fact: continuous functions of consistent estimators are consistent 

6. Fact: MLE are always consistent 

Bias 

1. Bias 𝐵𝐵�𝜃𝜃 

#### � 

#### �=𝐸𝐸�𝜃𝜃 

#### � 

#### −𝜃𝜃�=𝐸𝐸�𝜃𝜃 

#### � 

#### �−𝜃𝜃 

2. On average, does 𝜃𝜃 

#### � 

 produces estimates that are higher or lower than 𝜃𝜃? 

3. Unbiased estimator: 𝐸𝐸�𝜃𝜃 

#### � 

#### �=𝜃𝜃 

#### 4. 𝑋𝑋 

#### � 

 is unbiased estimator of 𝜇𝜇 because 𝐸𝐸(𝑋𝑋 

#### � 

#### )=𝜇𝜇 

5. Example of biased estimation procedure: sample max from uniform distribution 

6. When bias can be measured, can sometimes correct (target analogy) 

(Relative) Efficiency 

5. Given two estimators, the one with lower variance is more efficient. 

6. An estimator cannot be efficient, per se, but only more efficient than another estimator. In 

 some cases in Econ 388, however, it is possible to prove categorically that a particular unbiased 

 estimator is more efficient than any other unbiased estimator. 

7. Example: consider throwing out one observation, computing sample average of 𝑛𝑛− 1 

 observations 

 a. 𝐸𝐸 

#### ( 

#### 𝜇𝜇� 

#### ) 

 =𝜇𝜇 still 

 b. 𝑉𝑉(𝜇𝜇�)=⋯= 

 𝜎𝜎 

 2 

 𝑛𝑛−1 

 c. Still unbiased, still consistent, but less efficient than using all available data 

Sample Variance 

#### 1. 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

 is biased 

 a. 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### = 

 1 

 𝑛𝑛 

#### ∑ (𝑋𝑋 

 𝑖𝑖 

#### −𝑋𝑋 

#### � 

#### ) 

 𝑛𝑛 2 

 𝑖𝑖=1 

#### =⋯= 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 2 

 𝑖𝑖=1 

#### −𝑋𝑋 

#### � 

 2 

---

 b. 𝐸𝐸(𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### )= 

 1 

 𝑛𝑛 

#### ∑ 𝐸𝐸�𝑋𝑋 

 𝑖𝑖 

 2 

#### � 

 𝑛𝑛 

 𝑖𝑖=1 

#### −𝐸𝐸(𝑋𝑋 

#### � 

 2 

#### ) 

#### = 

 1 

 𝑛𝑛 

#### ∑ 

#### (𝜇𝜇 

 2 

#### +𝜎𝜎 

 2 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### −�𝜇𝜇 

 2 

#### + 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### � 

 (since 𝜎𝜎 

 2 

#### =𝑉𝑉(𝑋𝑋 

 𝑖𝑖 

#### )=𝐸𝐸�𝑋𝑋 

 𝑖𝑖 

 2 

#### �−𝜇𝜇 

 2 

 and 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### =𝑉𝑉(𝑋𝑋 

#### � 

#### )=𝐸𝐸(𝑋𝑋 

#### � 

 2 

#### )−𝜇𝜇 

 2 

#### ) 

#### =𝜇𝜇 

 2 

#### +𝜎𝜎 

 2 

#### −𝜇𝜇 

 2 

#### − 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### =𝜎𝜎 

 2 

#### − 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### = 

 𝑛𝑛−1 

 𝑛𝑛 

#### 𝜎𝜎 

 2 

 c. 𝐵𝐵 

#### ( 

#### 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### ) 

#### = 

 𝑛𝑛−1 

 𝑛𝑛 

#### 𝜎𝜎 

 2 

#### −𝜎𝜎 

 2 

#### =− 

 1 

 𝑛𝑛 

#### 𝜎𝜎 

 2 

 d. Still consistent: 𝐵𝐵 

#### ( 

#### 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### ) 

 → 0 (and can show that 𝑉𝑉 

#### ( 

#### 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### ) 

#### → 0 ) 

2. “Sample variance” 𝑆𝑆 

 2 

#### = 

 1 

 𝑛𝑛−1 

#### ∑ (𝑋𝑋 

 𝑖𝑖 

#### −𝑋𝑋 

#### � 

#### ) 

 𝑛𝑛 2 

 𝑖𝑖=1 

 a. To eliminates bias: 𝐸𝐸� 

 𝑛𝑛 

 𝑛𝑛−1 

#### 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### �= 

 𝑛𝑛 

 𝑛𝑛−1 

#### 𝐸𝐸 

#### ( 

#### 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### ) 

#### = 

 𝑛𝑛 

 𝑛𝑛−1 

 𝑛𝑛−1 

 𝑛𝑛 

#### 𝜎𝜎 

 2 

#### =𝜎𝜎 

 2 

 b. So if 𝑆𝑆 

 2 

#### = 

 𝑛𝑛 

 𝑛𝑛−1 

#### 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### = 

 1 

 𝑛𝑛−1 

#### ∑ (𝑋𝑋 

 𝑖𝑖 

#### −𝑋𝑋 

#### � 

#### ) 

 𝑛𝑛 2 

 𝑖𝑖=1 

 then 𝐵𝐵(𝑆𝑆 

 2 

#### )= 0 

 i. Example: sample of 𝑛𝑛= 4 student wages, 𝑥𝑥 

 𝑖𝑖 

#### =$11, $10, $14, $15, 𝑥𝑥̅=$13.50, 

#### 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

#### =� 

 1 

 4 

#### (1. 5 

 2 

#### +2. 5 

 2 

#### +3. 5 

 2 

#### +. 5 

 2 

#### )=� 

 21 

 4 

#### ≈$2.29 

#### 𝑒𝑒=� 

 1 

 3 

#### (1. 5 

 2 

#### +2. 5 

 2 

#### +3. 5 

 2 

#### +. 5 

 2 

#### )=� 

 21 

 3 

#### ≈$2.65 

 ii. Excel: use VAR.S or STDEV.S, not =VAR.P or =STDEV.P 

 c. Correcting bias actually sacrifices some efficiency 

## L18 Difference in Means, Proportions (WMS 8.3-8,10.3) 

1. [Long lecture; use time efficiently.] 

2. Difference in means 

 a. Relating quantitative and binary variables: conditional distributions, conditional means 

#### 𝐸𝐸(𝑌𝑌|𝑋𝑋= 0 ), 𝐸𝐸(𝑌𝑌|𝑋𝑋= 1 ) 

 b. Wages gap between men and women: 

#### 𝑛𝑛 

 𝑤𝑤 

#### = 40 , 𝑥𝑥̅ 

 𝑤𝑤 

#### =$32,𝜎𝜎 

 𝑤𝑤 

#### =$13,𝑛𝑛 

 𝑚𝑚 

#### = 45 , 𝑥𝑥̅ 

 𝑚𝑚 

#### =$35, 𝜎𝜎 

 𝑚𝑚 

#### =$15. 

 c. 95% confidence intervals for men 

#### [ 

#### $30.62, $39.38 

#### ] 

 and women 

#### [ 

#### $27.97, $36.03 

#### ] 

 overlap, making it difficult to tell true size of wage gap (if any) 

 d. Trick (used a lot in more advanced settings): combine into single parameter 

#### 𝜃𝜃= 

#### ( 

#### 𝜇𝜇 

 𝑚𝑚 

#### −𝜇𝜇 

 𝑤𝑤 

#### ) 

 ; MOM estimator 𝜃𝜃 

#### � 

#### = 

#### ( 

#### 𝑋𝑋 

#### � 

 𝑚𝑚 

#### −𝑋𝑋 

#### � 

 𝑤𝑤 

#### ) 

 i. 𝐸𝐸�𝜃𝜃 

#### � 

#### �=𝐸𝐸(𝑋𝑋 

#### � 

 𝑚𝑚 

#### −𝑋𝑋 

#### � 

 𝑤𝑤 

#### )=𝐸𝐸(𝑋𝑋 

#### � 

 𝑚𝑚 

#### )−𝐸𝐸(𝑋𝑋 

#### � 

 𝑤𝑤 

#### )=𝜇𝜇 

 𝑚𝑚 

#### −𝜇𝜇 

 𝑤𝑤 

 =𝜃𝜃; unbiased! 

---

 ii. 𝑉𝑉�𝜃𝜃 

#### � 

#### �=𝑉𝑉(𝑋𝑋 

#### � 

 𝑚𝑚 

#### −𝑋𝑋 

#### � 

 𝑤𝑤 

#### )= 

 𝜎𝜎 𝑚𝑚 

 2 

 𝑛𝑛 𝑚𝑚 

#### +(− 1 ) 

 2 

 𝜎𝜎 𝑤𝑤 

 2 

 𝑛𝑛 𝑤𝑤 

 → 0 ; consistent (as long as both sample 

 sizes grow large)! 

 iii. 𝑋𝑋 

#### � 

 𝑚𝑚 

#### ∼𝑁𝑁�𝜇𝜇 

 𝑚𝑚 

#### , 

 𝜎𝜎 

 𝑚𝑚 

 2 

 𝑛𝑛 

 𝑚𝑚 

 � and 𝑋𝑋 

#### � 

 𝑤𝑤 

#### ∼𝑁𝑁�𝜇𝜇 

 𝑤𝑤 

#### , 

 𝜎𝜎 

 𝑤𝑤 

 2 

 𝑛𝑛 

 𝑤𝑤 

 �, so... 

 iv. 𝑋𝑋 

#### � 

 𝑚𝑚 

#### −𝑋𝑋 

#### � 

 𝑤𝑤 

#### ∼𝑁𝑁�𝜇𝜇 

 𝑚𝑚 

#### −𝜇𝜇 

 𝑤𝑤 

#### , 

 𝜎𝜎 

 𝑚𝑚 

 2 

 𝑛𝑛 

 𝑚𝑚 

#### + 

 𝜎𝜎 

 𝑤𝑤 

 2 

 𝑛𝑛 

 𝑤𝑤 

#### � 

 Standardizing, 

 𝜃𝜃 

 � 

 −𝜇𝜇 

 𝜃𝜃 

 � 

 𝜎𝜎 

 𝜃𝜃 

 � 

#### = 

 (𝑋𝑋 

 � 

 𝑚𝑚 

 −𝑋𝑋 

 � 

 𝑤𝑤 

 )−(𝜇𝜇 

 𝑚𝑚 

 −𝜇𝜇 

 𝑤𝑤 

 ) 

 � 

 𝜎𝜎 

 𝑚𝑚 

 2 

 𝑛𝑛 𝑚𝑚 

 + 

 𝜎𝜎 

 𝑤𝑤 

 2 

 𝑛𝑛 𝑤𝑤 

#### ∼𝑁𝑁(0, 1) 

 v. Note: if estimate 𝑒𝑒 

 𝐴𝐴 

 2 

 and 𝑒𝑒 

 𝐵𝐵 

 2 

 then 

 (𝑋𝑋 

 � 

 𝑚𝑚 

 −𝑋𝑋 

 � 

 𝑤𝑤 

 )−(𝜇𝜇 

 𝑚𝑚 

 −𝜇𝜇 

 𝑤𝑤 

 ) 

 � 

 𝑆𝑆 

 𝑚𝑚 

 2 

 𝑛𝑛 𝑚𝑚 

 + 

 𝑆𝑆 

 𝑤𝑤 

 2 

 𝑛𝑛 𝑤𝑤 

#### ∼𝑡𝑡 

#### ⎝ 

#### ⎜ 

#### ⎛ 

#### 𝑑𝑑𝑓𝑓= 

 � 

 𝑠𝑠 

 𝑚𝑚 

 2 

 𝑛𝑛 𝑚𝑚 

 + 

 𝑠𝑠 

 𝑤𝑤 

 2 

 𝑛𝑛 𝑤𝑤 

 � 

 2 

 � 

 𝑠𝑠 

 𝑚𝑚 

 2 

 𝑛𝑛 

 𝑚𝑚 

 � 

 2 

 𝑛𝑛 𝑚𝑚 

 −1 

 + 

 � 

 𝑠𝑠 𝑤𝑤 

 2 

 𝑛𝑛 

 𝑤𝑤 

 � 

 2 

 𝑛𝑛 𝑤𝑤 

 −1 

 ⎠ 

#### ⎟ 

#### ⎞ 

1. (e.g. If 𝑒𝑒 

 𝑚𝑚 

 =$12 and 𝑒𝑒 

 𝑤𝑤 

 =$10 then 𝑑𝑑𝑓𝑓 ≈ 83 ) 

2. For this class, just use 𝑡𝑡(𝑑𝑑𝑓𝑓)≈𝑁𝑁(0, 1), which is appropriate when 𝑛𝑛 

 𝑚𝑚 

 and 𝑛𝑛 

 𝑤𝑤 

 are both large 

3. (df between minimum and sum of 

#### ( 

#### 𝑛𝑛 

 𝑚𝑚 

#### − 1 

#### ) 

 and 

#### ( 

#### 𝑛𝑛 

 𝑤𝑤 

#### − 1 

#### ) 

#### ) 

 e. Margin of error: ± 2� 

 𝜎𝜎 

 𝑚𝑚 

 2 

 𝑛𝑛 

 𝑚𝑚 

#### + 

 𝜎𝜎 

 𝑤𝑤 

 2 

 𝑛𝑛 

 𝑤𝑤 

#### = 2 

#### ( 

#### $1.98 

#### ) 

#### =$3.96 

 f. 95% confidence interval for (𝜇𝜇 

 𝑚𝑚 

#### −𝜇𝜇 

 𝑤𝑤 

#### ): (𝑋𝑋 

#### � 

 𝑚𝑚 

#### −𝑋𝑋 

#### � 

 𝑤𝑤 

#### )±1. 96� 

 𝜎𝜎 

 𝑚𝑚 

 2 

 𝑛𝑛 

 𝑚𝑚 

#### + 

 𝜎𝜎 

 𝑤𝑤 

 2 

 𝑛𝑛 

 𝑤𝑤 

#### =[$0.11, $7.89] 

 g. Test 𝜇𝜇 

 𝑚𝑚 

#### −𝜇𝜇 

 𝑤𝑤 

 > 0 : test statistic 

 (𝑋𝑋 

 � 

 𝑚𝑚 

 −𝑋𝑋 

 � 

 𝑤𝑤 

 )−(𝜇𝜇 

 𝑚𝑚 

 −𝜇𝜇 

 𝑤𝑤 

 ) 

 � 

 𝑆𝑆 

 𝑚𝑚 

 2 

 𝑛𝑛 

 𝑚𝑚 

 + 

 𝑆𝑆 

 𝑤𝑤 

 2 

 𝑛𝑛 

 𝑤𝑤 

#### = 

 4−0 

 � 

 144 

 100 

 + 

 100 

 40 

 =2. 02; p-value 0.0 217 

 h. Test 𝜇𝜇 

 𝑚𝑚 

#### −𝜇𝜇 

 𝑤𝑤 

 ≠ 0 : p-value 2 ⋅0. 0217=0. 0434 

 i. Test 𝜇𝜇 

 𝑚𝑚 

#### −𝜇𝜇 

 𝑤𝑤 

 >$2: test statistic 

 ( 𝑋𝑋 

 � 

 𝑚𝑚 

 −𝑋𝑋 

 � 

 𝑤𝑤 

 ) − 

 ( 𝜇𝜇 𝑚𝑚 

 −𝜇𝜇 𝑤𝑤 

 ) 

 � 

 𝑆𝑆 

 𝑚𝑚 

 2 

 𝑛𝑛 𝑚𝑚 

 + 

 𝑆𝑆 

 𝑤𝑤 

 2 

 𝑛𝑛 𝑤𝑤 

#### = 

 4−2 

 � 

 144 

 100 

 + 

 100 

 40 

 =1. 01; p-value 0. 1562 

 j. Note: if we estimated 𝜇𝜇 

 𝑤𝑤 

#### −𝜇𝜇 

 𝑚𝑚 

 instead of 𝜇𝜇 

 𝑚𝑚 

#### −𝜇𝜇 

 𝑤𝑤 

 , rejection region would be on left 

 instead of right, and test statistics would be negative instead of positive, but produce 

 same p-values 

3. Binary data (i.e. Bernoulli(𝑝𝑝)) 

 a. Intuitive estimator: proportion 𝑝𝑝̂= 

 𝑌𝑌 

 𝑛𝑛 

 , where 𝑌𝑌 = # of 1’s in data 

 i. Example: election survey, 𝑛𝑛= 100 , 𝑝𝑝̂= 

 52 

 100 

#### =.52 

---

 b. MOM estimator: 𝑝𝑝̂ 

 𝑀𝑀𝑀𝑀𝑀𝑀 

#### =𝑋𝑋 

#### � 

 ; actually same, since 𝑌𝑌= 

#### ∑ 

#### 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 (for zeros and ones, 

 adding is the same as counting) 

 c. Since 𝑌𝑌∼𝐵𝐵𝑖𝑖𝑛𝑛(𝑛𝑛,𝑝𝑝), 

#### 𝐸𝐸 

#### ( 

#### 𝑝𝑝̂ 

#### ) 

#### =𝐸𝐸� 

 𝑌𝑌 

 𝑛𝑛 

#### �= 

 1 

 𝑛𝑛 

#### 𝐸𝐸 

#### ( 

#### 𝑌𝑌 

#### ) 

#### = 

 𝑛𝑛𝑛𝑛 

 𝑛𝑛 

 =𝑝𝑝; unbiased! 

#### 𝑉𝑉(𝑝𝑝̂)= 

 1 

 𝑛𝑛 

 2 

#### 𝑉𝑉(𝑌𝑌)= 

 𝑛𝑛𝑛𝑛 

 ( 1−𝑛𝑛 

 ) 

 𝑛𝑛 

 2 

#### = 

 𝑛𝑛 

 ( 1−𝑛𝑛 

 ) 

 𝑛𝑛 

 → 0 ; consistent! 

 d. By Central Limit Theorem, 𝑝𝑝̂=𝑥𝑥̅ →𝑁𝑁�𝑝𝑝, 

 𝑛𝑛(1−𝑛𝑛) 

 𝑛𝑛 

#### �⇒ 

 𝑛𝑛�−𝑛𝑛 

 � 

 𝑝𝑝 

 ( 1−𝑝𝑝 

 ) 

 𝑛𝑛 

#### →𝑁𝑁 

#### ( 

#### 0, 1 

#### ) 

 Note: this is not actually different from 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

 ; just special case with 𝑥𝑥̅=𝑝𝑝̂, 𝜇𝜇=𝑝𝑝, and 

#### 𝜎𝜎 

 2 

#### =𝑝𝑝(1−𝑝𝑝) 

 Note: does not follow 𝑡𝑡 distribution for small 𝑛𝑛, because 𝑋𝑋 

 𝑖𝑖 

 not normal 

 e. Example: election survey, 𝑛𝑛= 100 , 𝑝𝑝̂= 

 52 

 100 

#### =.52 

 i. Margin of error: 2 

#### � 

 𝑛𝑛 

 ( 1−𝑛𝑛 

 ) 

 𝑛𝑛 

#### ≈ 2 

#### � 

 𝑛𝑛 

 �( 1−𝑛𝑛 

 �) 

 𝑛𝑛 

#### = 2 � 

 .52 ⋅. 48 

 100 

#### ≈ 2 (. 05)=0. 1 

 ii. 95% Confidence interval ≈𝑝𝑝̂±1. 96 

#### � 

 𝑛𝑛 

 �( 1−𝑛𝑛 

 �) 

 𝑛𝑛 

#### =.52±1. 96(. 05)=[.422, .618] 

 iii. Test 𝐻𝐻 

 0 

 :𝑝𝑝= 5 against 𝐻𝐻 

 𝑎𝑎 

 :𝑝𝑝> 5 : test statistic 

 𝑛𝑛�−𝑛𝑛 

 � 

 𝑝𝑝 

 ( 1−𝑝𝑝 

 ) 

 𝑛𝑛 

#### = 

 .52 −. 5 

 � 

 .5⋅. 5 

 100 

 =0. 40; p-value 

#### 0.3446 

4. Difference in proportions: unemployment in U.S. and France (2% difference?) 

 a. 𝑛𝑛 

 𝐹𝐹 

#### = 1000 , 𝑝𝑝̂= 

 109 

 1000 

#### =.109; 𝑛𝑛 

 𝑈𝑈𝑆𝑆 

#### = 500 , 𝑝𝑝̂ 

 𝑈𝑈𝑆𝑆 

#### = 

 38 

 500 

#### =.076 

 b. 95% confidence intervals 

#### [ 

#### . 090, .128 

#### ] 

#### [.053, .099] 

 c. Estimate (𝑝𝑝 

 𝐹𝐹 

#### −𝑝𝑝 

 𝑈𝑈𝑆𝑆 

 ) with MOM estimator (𝑝𝑝̂ 

 𝐹𝐹 

#### −𝑝𝑝̂ 

 𝑈𝑈𝑆𝑆 

#### ) 

 i. 𝐸𝐸(𝑝𝑝̂ 

 𝐹𝐹 

#### −𝑝𝑝̂ 

 𝑈𝑈𝑆𝑆 

#### )=𝐸𝐸(𝑝𝑝̂ 

 𝐹𝐹 

#### )−𝐸𝐸(𝑝𝑝̂ 

 𝑈𝑈𝑆𝑆 

#### )=𝑝𝑝 

 𝐹𝐹 

#### −𝑝𝑝 

 𝑈𝑈𝑆𝑆 

 ; unbiased! 

 ii. 𝑉𝑉(𝑝𝑝̂ 

 𝐹𝐹 

#### −𝑝𝑝̂ 

 𝑈𝑈𝑆𝑆 

#### )=𝑉𝑉(𝑝𝑝̂ 

 𝐹𝐹 

#### )+𝑉𝑉(𝑝𝑝̂ 

 𝑈𝑈𝑆𝑆 

#### )= 

 𝑛𝑛 

 𝐹𝐹 

 (1−𝑛𝑛 

 𝐹𝐹 

 ) 

 𝑛𝑛 

 𝐹𝐹 

#### + 

 𝑛𝑛 

 𝑈𝑈𝑆𝑆 

 (1−𝑛𝑛 

 𝑈𝑈𝑆𝑆 

 ) 

 𝑛𝑛 

 𝑈𝑈𝑆𝑆 

 → 0 ; consistent! 

 iii. 

 (𝑛𝑛� 

 𝐹𝐹 

 −𝑛𝑛� 

 𝑈𝑈𝑆𝑆 

 )−(𝑛𝑛 

 𝐹𝐹 

 −𝑛𝑛 

 𝑈𝑈𝑆𝑆 

 ) 

 � 

 𝑝𝑝 

 𝐹𝐹 

 �1−𝑝𝑝 

 𝐹𝐹 

 � 

 𝑛𝑛 

 𝐹𝐹 

 + 

 𝑝𝑝 

 𝑈𝑈𝑆𝑆 

 �1−𝑝𝑝 

 𝑈𝑈𝑆𝑆 

 � 

 𝑛𝑛 

 𝑈𝑈𝑆𝑆 

#### ∼𝑁𝑁(0, 1) 

 d. 95% Confidence interval (𝑝𝑝̂ 

 𝐹𝐹 

#### −𝑝𝑝̂ 

 𝑈𝑈𝑆𝑆 

#### )±1. 96 

#### � 

#### � 

 𝑛𝑛� 

 𝐹𝐹 

 (1−𝑛𝑛� 

 𝐹𝐹 

 ) 

 𝑛𝑛 

 𝐹𝐹 

#### + 

 𝑛𝑛� 

 𝑈𝑈𝑆𝑆 

 (1−𝑛𝑛� 

 𝑈𝑈𝑆𝑆 

 ) 

 𝑛𝑛 

 𝑈𝑈𝑆𝑆 

#### �=[.003, .063] 

 e. Test (𝑝𝑝 

 𝐹𝐹 

#### −𝑝𝑝 

 𝑈𝑈𝑆𝑆 

 )> 0 , test statistic 

 ( 𝑛𝑛 

 � 

 𝐹𝐹 

 −𝑛𝑛 

 � 

 𝑈𝑈𝑆𝑆 

 ) −0 

 �� 

 𝑝𝑝� 

 𝐹𝐹 

 �1−𝑝𝑝� 

 𝐹𝐹 

 � 

 𝑛𝑛 

 𝐹𝐹 

 + 

 𝑝𝑝� 

 𝑈𝑈𝑆𝑆 

 �1−𝑝𝑝� 

 𝑈𝑈𝑆𝑆 

 � 

 𝑛𝑛 

 𝑈𝑈𝑆𝑆 

 � 

 ≈2. 14; p-value .0162 

---

 f. Test (𝑝𝑝 

 𝐹𝐹 

#### −𝑝𝑝 

 𝑈𝑈𝑆𝑆 

 )>.02, test statistic 

 ( 𝑛𝑛� 𝐹𝐹 

 −𝑛𝑛� 𝑈𝑈𝑆𝑆 

 ) −. 02 

 �� 

 𝑝𝑝� 

 𝐹𝐹 

 �1−𝑝𝑝� 

 𝐹𝐹 

 � 

 𝑛𝑛 

 𝐹𝐹 

 + 

 𝑝𝑝� 

 𝑈𝑈𝑆𝑆 

 �1−𝑝𝑝� 

 𝑈𝑈𝑆𝑆 

 � 

 𝑛𝑛 

 𝑈𝑈𝑆𝑆 

 � 

 ≈0. 84; p-value .2005 

## L19 Variance Estimation (WMS 8.9,10.9) 

Review 

#### 1. 𝜎𝜎� 

 𝑀𝑀𝑀𝑀𝑀𝑀 

 2 

#### = 

 1 

 𝑛𝑛 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

#### 2. 𝑆𝑆 

 2 

#### = 

 1 

 𝑛𝑛−1 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

Variance estimation 

1. Applications: inequality/heterogeneity, quality control, estimation error 

#### 2. (𝑛𝑛− 1 ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### ∼𝜒𝜒 

 2 

#### (𝑛𝑛− 1 ) 

3. Sample variance: (𝑛𝑛−1) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### ∼𝜒𝜒 

 2 

#### (𝑛𝑛−1) 

 a. Intuition 1: 𝑋𝑋 

 𝑖𝑖 

#### ∼𝑁𝑁(𝜇𝜇,𝜎𝜎 

 2 

 ), so � 

 𝑋𝑋 

 𝑖𝑖 

 −𝜇𝜇 

 𝜎𝜎 

#### � 

 2 

#### ∼𝜒𝜒 

 2 

#### (1); 

#### ∑ 

#### � 

 𝑋𝑋 

 𝑖𝑖 

 −𝜇𝜇 

 𝜎𝜎 

#### � 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

#### ∼𝜒𝜒 

 2 

 (𝑛𝑛); we lose one 

 degree of freedom because we’re measuring deviations from 𝑋𝑋 

#### � 

 rather than deviations 

 from 𝜇𝜇 

 b. Intuition 2: a single observation conveys information about 𝜇𝜇 but not 𝜎𝜎 

 2 

 , so if 𝑛𝑛= 100 

 then we have 100 pieces of information about 𝜇𝜇 but only 99 pieces of information about 

#### 𝜎𝜎 

 2 

 c. Intuition 3: 𝐸𝐸(𝑆𝑆 

 2 

#### )=𝜎𝜎 

 2 

 , so 𝐸𝐸�(𝑛𝑛− 1 ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### �=𝑛𝑛− 1 

 d. [Skip] Formal derivation: 

#### ∑ 

#### � 

 𝑋𝑋 

 𝑖𝑖 

 −𝜇𝜇 

 𝜎𝜎 

#### � 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

#### ∑ 

#### � 

 (𝑋𝑋 

 𝑖𝑖 

 −𝑋𝑋 

 � )+(𝑋𝑋 

 � −𝜇𝜇) 

 𝜎𝜎 

#### � 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

#### =∑ � 

 𝑋𝑋 𝑖𝑖 

 −𝑋𝑋 

 � 

 𝜎𝜎 

#### � 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

#### +∑ � 

 𝑋𝑋 

 � −𝜇𝜇 

 𝜎𝜎 

#### � 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

#### + 2 ∑ 

 ( 𝑋𝑋 𝑖𝑖 

 −𝑋𝑋 

 �)( 𝑋𝑋 

 � −𝜇𝜇 

 ) 

 𝜎𝜎 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

#### =(𝑛𝑛− 1 ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### + 

 𝑛𝑛(𝑋𝑋 

 � −𝜇𝜇) 

 2 

 𝜎𝜎 

 2 

#### + 2 

 (𝑋𝑋 

 � −𝜇𝜇) 

 𝜎𝜎 

 2 

#### ∑ (𝑋𝑋 

 𝑖𝑖 

#### −𝑋𝑋 

#### � 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### =(𝑛𝑛− 1 ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### + 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### + 2 

 (𝑋𝑋 

 � −𝜇𝜇) 

 𝜎𝜎 

 2 

#### (𝑛𝑛𝑋𝑋 

#### � 

#### −𝑛𝑛𝑋𝑋 

#### � 

#### ) 

#### ∼𝜒𝜒 

 2 

#### (𝑛𝑛− 1 )+𝜒𝜒 

 2 

#### ( 1 )+ 0 

---

 e. Recall that, in estimating 𝜇𝜇, using 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝑠𝑠 

 2 

 𝑛𝑛 

 instead of 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

 required the use of a t distribution 

 instead of a normal. This is because it can be shown that 𝑍𝑍= 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### ∼𝑁𝑁 

#### ( 

#### 0, 1 

#### ) 

 and 𝑊𝑊= 

#### ( 

#### 𝑛𝑛− 1 

#### ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### ∼𝜒𝜒 

 2 

#### ( 

#### 𝑛𝑛− 1 

#### ) 

 are independent, implying that 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝑆𝑆 

 2 

 𝑛𝑛 

#### = 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

 1 

 � 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### = 

 𝑍𝑍 

 � 

 𝑊𝑊 

 𝑛𝑛−1 

#### ∼ 

#### 𝑡𝑡(𝑛𝑛− 1 ). 

4. Example: variance among 𝑛𝑛= 71 sales representatives is 𝑒𝑒 

 2 

#### =5. 3 

 2 

 a. Confidence interval 

 i. Seek. 95=Pr (#<𝜎𝜎<#) and know (𝑛𝑛− 1 ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### ∼𝜒𝜒 

 2 

 ( 70 ), so from Table 6, 

 ii. Pr� 48 .76< 

#### ( 

#### 𝑛𝑛− 1 

#### ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

 < 95 .02�=Pr� 

 1 

 48. 76 

#### > 

 𝜎𝜎 

 2 

 (𝑛𝑛−1)𝑜𝑜 

 2 

#### > 

 1 

 95. 02 

#### � 

 =Pr� 

 (𝑛𝑛−1)𝑜𝑜 

 2 

 48. 76 

#### >𝜎𝜎 

 2 

#### > 

 (𝑛𝑛−1)𝑜𝑜 

 2 

 95. 02 

 �=Pr� 

#### � 

 ( 70 ) 5. 3 

 2 

 48. 76 

#### >𝜎𝜎> 

#### � 

 ( 70 ) 5. 3 

 2 

 95. 02 

#### � 

 =Pr 

#### ( 

#### 6. 35>𝜎𝜎>4. 55 

#### ) 

 b. Hypothesis test 

 i. 𝐻𝐻 

 𝑎𝑎 

#### :𝜎𝜎 

 2 

#### > 4 

 2 

#### , 𝛼𝛼=.05 

 ii. Critical value 90 .53 

 iii. Test statistic (n− 1 ) 

 S 

 2 

 σ 

 2 

#### = 70 � 

 5. 3 

 2 

 4 

 2 

 �= 122 .9, reject 𝐻𝐻 

 0 

 (from Excel, p-value is 

#### 10 

 −5 

#### ) 

## L20 Regression Estimation (WMS 11.1-3) 

1. Recall from Lecture 9 

 a. Relationship between 𝑋𝑋 and 𝑌𝑌 can be represented by 𝜌𝜌=𝑐𝑐𝑛𝑛𝐶𝐶𝐶𝐶(𝑋𝑋,𝑌𝑌) or by regression 

 line 𝑌𝑌=𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑋𝑋+𝜀𝜀 

 b. 𝐸𝐸 

#### ( 

#### 𝜀𝜀 

#### ) 

 = 0 can be guaranteed by choosing intercept to solve 𝜇𝜇 

 𝑦𝑦 

#### =𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝜇𝜇 

 𝑥𝑥 

 c. Crystal ball: can predict 𝑌𝑌 

 ∗ 

#### =𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 ∗ 

 for any 𝑥𝑥 

 ∗ 

 value (even out of sample) 

 d. 𝜎𝜎 

 𝜀𝜀 

 2 

 can be minimized by choosing slope coefficient 𝛽𝛽 

 1 

#### = 

 𝜎𝜎 

 𝑥𝑥𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 2 

#### =𝜌𝜌 

 𝜎𝜎 

 𝑥𝑥 

 𝜎𝜎 𝑥𝑥 

 e. Fraction of variation in 𝑌𝑌 associated with 𝑋𝑋 is 

 𝑑𝑑(𝛽𝛽 

 0 

 +𝛽𝛽 

 1 

 𝑋𝑋) 

 𝑑𝑑(𝑌𝑌) 

#### = 

 𝛽𝛽 

 1 

 2 

 𝜎𝜎 

 𝑥𝑥 

 2 

 𝜎𝜎 

 𝑥𝑥 

 2 

#### = 

 �𝜌𝜌 

 2 

 𝜎𝜎 𝑥𝑥 

 2 

 𝜎𝜎 

 𝑥𝑥 

 2 

 �𝜎𝜎 𝑥𝑥 

 2 

 𝜎𝜎 

 𝑥𝑥 

 2 

#### =𝜌𝜌 

 2 

2. Estimation 

---

 a. 𝑒𝑒 

 𝑥𝑥 

 2 

#### = 

 1 

 𝑛𝑛−1 

#### ∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 𝑛𝑛 2 

 𝑖𝑖=1 

 b. 𝑒𝑒 

 𝑥𝑥𝑦𝑦 

#### = 

 1 

 𝑛𝑛−1 

#### ∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)(𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥�) 

 𝑛𝑛 

 𝑖𝑖=1 

 c. 𝐶𝐶= 

 𝑜𝑜 

 𝑥𝑥𝑥𝑥 

 𝑜𝑜 𝑥𝑥 

 𝑜𝑜 𝑥𝑥 

 d. 𝜌𝜌 

#### � 2 

#### =𝐶𝐶 

 2 

 e. 𝛽𝛽 

#### ̂ 

 1 

#### = 

 𝑜𝑜 

 𝑥𝑥𝑥𝑥 

 𝑜𝑜 

 𝑥𝑥 

 2 

#### =𝐶𝐶 

 𝑜𝑜 

 𝑥𝑥 

 𝑜𝑜 𝑥𝑥 

#### = 

 ∑ ( 𝑥𝑥 𝑖𝑖 

 −𝑥𝑥̅ 

 )( 𝑦𝑦 𝑖𝑖 

 −𝑦𝑦� 

 ) 

 𝑛𝑛 

 𝑖𝑖=1 

 ∑ 

 ( 𝑥𝑥 𝑖𝑖 

 −𝑥𝑥̅ 

 ) 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

 f. 𝛽𝛽 

#### ̂ 

 0 

#### =𝑥𝑥�−𝑏𝑏 

 1 

#### 𝑥𝑥̅ 

 g. Income predictions 𝑥𝑥� 

 𝑖𝑖 

#### =𝛽𝛽 

#### ̂ 

 0 

#### +𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

 h. Individual errors 𝜀𝜀̂ 

 𝑖𝑖 

#### =𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥� 

 𝑖𝑖 

 i. 𝑒𝑒 

 𝜀𝜀 

 2 

#### = 

 1 

 𝑛𝑛−2 

#### ∑ 

#### 𝜀𝜀̂ 

 𝑖𝑖 

 𝑛𝑛 2 

 𝑖𝑖=1 

3. Can also use “sums of squares”, rather than variance (i.e. “total” not “average” deviations) 

 a. Let 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### =∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 𝑛𝑛 2 

 𝑖𝑖=1 

 b. Let 𝑆𝑆 

 𝑥𝑥𝑦𝑦 

#### = 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### )( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥� 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

 c. With this notation, 𝛽𝛽 

#### ̂ 

 1 

#### = 

 𝑜𝑜 

 𝑥𝑥𝑥𝑥 

 𝑜𝑜 

 𝑥𝑥 

 2 

#### = 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

 d. Let S 

 εε 

#### =∑ 𝜀𝜀̂ 

 𝑖𝑖 

 𝑛𝑛 2 

 𝑖𝑖=1 

4. Example : Regress Income 𝑥𝑥 (in $ thousands) on Education 𝑥𝑥 (in years) 

#### 𝑥𝑥 

 𝑖𝑖 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 𝑥𝑥 

 𝑖𝑖 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥� (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)(𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥�) 

#### 𝛽𝛽 

#### ̂ 

 0 

#### +𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### 𝜀𝜀̂ 

 𝑖𝑖 

#### 11 − 4 40 − 30 120 37.2 2.8 

#### 16 1 80 10 10 78.2 1.8 

#### 16 1 70 0 0 78.2 8.2 

#### 14 − 1 60 − 10 10 61.8 1.8 

#### 18 3 100 30 90 94.6 5.4 

#### 𝑥𝑥̅= 15 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### = 28 𝑥𝑥�= 70 𝑆𝑆 

 𝑦𝑦𝑦𝑦 

#### = 2000 𝑆𝑆 

 𝑥𝑥𝑦𝑦 

#### = 230 

#### 𝜀𝜀̂ 

 𝚤𝚤 

#### � 

#### = 0 

#### 𝑒𝑒 

 𝑥𝑥 

 2 

#### = 7 𝑒𝑒 

 𝑦𝑦 

 2 

#### = 500 𝑒𝑒 

 𝑥𝑥𝑦𝑦 

#### = 57. 5 S 

 εε 

#### = 111 

#### 𝑒𝑒 

 𝑥𝑥 

#### ≈ 2. 6 𝑒𝑒 

 𝑦𝑦 

#### ≈ 22. 4 𝐶𝐶≈ 0. 97 𝑒𝑒 

 𝜀𝜀 

 2 

#### = 37 

#### 𝐶𝐶 

 2 

#### ≈ 0. 94 𝑒𝑒 

 𝜀𝜀 

#### = 6. 1 

#### 𝛽𝛽 

#### ̂ 

 1 

#### ≈ 8. 2 

#### 𝛽𝛽 

#### ̂ 

 0 

#### ≈− 53 

---

 a. We’ll use this example again in subsequent lecture 

 b. Predictions 

 i. High school graduate 𝑥𝑥� 

 𝑥𝑥 

 ∗ 

 =12 

 ∗ 

#### =− 53 +8. 2 

#### ( 

#### 12 

#### ) 

#### = 45 .4 

 ii. College graduate 𝑥𝑥� 

 𝑥𝑥 

 ∗ 

 =16 

 ∗ 

#### =− 53 +8. 2( 16 )= 78 .2 

 iii. PhD graduate 𝑥𝑥� 

 𝑥𝑥 

 ∗ 

 =20 

 ∗ 

#### =− 53 +8. 2( 20 )= 111 

 c. Estimated errors 

 i. Predict income 𝑥𝑥� 

 𝑖𝑖 

 for each individual in sample 

 ii. 𝜀𝜀̂ 

 𝑖𝑖 

#### =𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥� 

 𝑖𝑖 

1. Individual 

 iii. S 

 εε 

#### = 

#### ∑ 

#### 𝜀𝜀̂ 

 𝑖𝑖 

 𝑛𝑛 2 

 𝑖𝑖=1 

#### = 111 

1. Alternatively, 𝜎𝜎 

 𝜀𝜀 

 2 

#### = 

#### ( 

#### 1 −𝜌𝜌 

 2 

#### ) 

#### 𝜎𝜎 

 𝑦𝑦 

 2 

 , so 𝑆𝑆𝑆𝑆 𝐸𝐸= 

#### ( 

#### 1 −𝐶𝐶 

 2 

#### ) 

#### 𝑆𝑆 

 𝑦𝑦𝑦𝑦 

#### ≈ 

#### ( 

#### 1 −.9446 

#### )( 

#### 2000 

#### ) 

 = 111 (useful if only know summary statistics for 𝑋𝑋 

 and 𝑌𝑌). 

 iv. 𝑒𝑒 

 𝜀𝜀 

 2 

#### = 

 1 

 𝑛𝑛−2 

#### 𝑆𝑆𝑆𝑆 𝐸𝐸= 37 , 𝑒𝑒 

 𝜀𝜀 

#### =√ 37 ≈6. 1 

 d. Illustrate with Excel: Data>Data Analysis>Regression, using education & income data 

 above 

5. Preliminaries 

 a. Algebra trick 1: It can be shown that 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 0 

#### = 

#### ∑ 

#### 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### − 

#### ∑ 

#### 𝑥𝑥̅ 

 𝑛𝑛 

 𝑖𝑖=1 

#### =𝑛𝑛𝑥𝑥̅−𝑛𝑛𝑥𝑥̅= 0 

 Similarly, 

#### ∑ ( 

#### 𝑌𝑌 

 𝑖𝑖 

#### −𝑌𝑌 

#### � 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 0 

 b. Algebra trick 2: It can be shown that 

#### 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### =∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 𝑛𝑛 2 

 𝑖𝑖=1 

#### =∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)(𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 𝑛𝑛 

 𝑖𝑖=1 

#### =∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### =∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 𝑛𝑛 

 𝑖𝑖=1 

#### 𝑥𝑥 

 𝑖𝑖 

#### −∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 𝑛𝑛 

 𝑖𝑖=1 

#### 𝑥𝑥̅ 

#### = 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

#### 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### −𝑥𝑥̅ 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### =∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 Similarly, 𝑆𝑆 

 𝑥𝑥𝑦𝑦 

#### = 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

#### 𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 and 𝛽𝛽 

#### ̂ 

 1 

#### = 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### = 

 1 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

#### 𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 c. Deterministic 𝑥𝑥 

 𝑖𝑖 

 i. You can think of 𝑋𝑋 

 𝑖𝑖 

 and 𝑌𝑌 

 𝑖𝑖 

 as being random (i.e. they depend on who you 

 interview), and this is what we did when we derived the population regression 

 parameters. But for simplicity, assume in the estimation that 𝑋𝑋 

 𝑖𝑖 

#### =𝑥𝑥 

 𝑖𝑖 

 are 

---

 known. That is, we are only considering various samples of 𝑛𝑛 individuals who 

 have the same education levels as the people we sampled today (and incomes 

 that potentially differ from the people we interviewed). 

 ii. If an estimator is unbiased conditional on these 𝑥𝑥 

 𝑖𝑖 

 ’s, it is also unbiased 

 unconditionally. For example, if 𝐸𝐸�𝛽𝛽 

#### ̂ 

 1 

#### �𝑋𝑋 

 1 

#### =𝑥𝑥 

 1 

#### ,𝑋𝑋 

 2 

#### =𝑥𝑥 

 2 

#### , ...,𝑋𝑋 

 𝑛𝑛 

#### =𝑥𝑥 

 𝑛𝑛 

#### �=𝛽𝛽 

 1 

 for 

 every sample of 𝑥𝑥’s then, averaging across all such samples, 𝐸𝐸�𝛽𝛽 

#### ̂ 

 1 

#### �=𝛽𝛽 

 1 

 as well. 

 iii. 𝑌𝑌 

 𝑖𝑖 

 is still random because 𝑌𝑌 

 𝑖𝑖 

#### =𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### +𝜀𝜀 

 𝑖𝑖 

 and 𝜀𝜀 

 𝑖𝑖 

 is random. 

## L21 Regression Inference (WMS 11.4-9) 

Introduction 

1. Long lecture (use time efficiently) 

2. We’ve derived estimators 𝛽𝛽 

#### ̂ 

 1 

#### , 𝛽𝛽 

#### ̂ 

 0 

#### , 𝑌𝑌 

#### � 

 ∗ 

 , but so far all we have are point estimates. Are these good 

 estimators (i.e. unbiased and consistent)? What are the margins of errors? To get confidence 

 intervals or do hypothesis tests, we need to know their distributions. 

3. Estimator distributions: if 𝜀𝜀 

 𝑖𝑖 

#### ∼𝑁𝑁(0,𝜎𝜎 

 𝜀𝜀 

 2 

 ) (which is plausible, by Central Limit Theorem, if each 

 error term is viewed as the sum total of a lot of smaller, independent factors) then 

 a. 𝑌𝑌 

 𝑖𝑖 

#### =𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### +𝜀𝜀 

 𝑖𝑖 

#### ∼𝑁𝑁 

 b. 𝑌𝑌 

#### � 

#### = 

 1 

 𝑛𝑛 

#### ∑ 𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### ∼𝑁𝑁 

 c. 𝛽𝛽 

#### ̂ 

 1 

#### = 

 1 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### ∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### ∼𝑁𝑁 

 d. 𝛽𝛽 

#### ̂ 

 0 

#### =𝑌𝑌 

#### � 

#### −𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥̅ ∼𝑁𝑁 

 e. 𝑌𝑌 

#### � 

 ∗ 

#### =𝛽𝛽 

#### ̂ 

 0 

#### +𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥 

 ∗ 

#### ∼𝑁𝑁 

 f. 𝑌𝑌−𝑌𝑌 

#### � 

 ∗ 

#### ∼𝑁𝑁 

 g. Estimation error 𝜀𝜀̂ 

 𝑖𝑖 

#### =𝑌𝑌 

 𝑖𝑖 

#### −𝑌𝑌 

#### � 

 𝑖𝑖 

#### ∼𝑁𝑁 

 h. 

 (𝑛𝑛−2)𝑜𝑜 

 𝜀𝜀 

 2 

 𝜎𝜎 

 𝜀𝜀 

 2 

#### ∼𝜒𝜒 

 2 

#### ( 

#### 𝑛𝑛− 2 

#### ) 

 (essentially because estimating 𝜀𝜀̂ 

 𝑖𝑖 

 requires estimating two 

 parameters 𝛽𝛽 

#### ̂ 

 0 

 and 𝛽𝛽 

#### ̂ 

 1 

 , leaving only 𝑛𝑛− 2 pieces of information) 

 i. Could compare 𝑒𝑒 

 𝜀𝜀 

 2 

 from two regressions to see which better explains 𝑌𝑌, using 𝐹𝐹 

 distribution 

Slope estimator 

1. It can be shown that 𝐸𝐸�𝛽𝛽 

#### ̂ 

 1 

#### �=𝛽𝛽 

 1 

 ; unbiased ! 

---

#### 𝐸𝐸�𝛽𝛽 

#### ̂ 

 1 

#### �=𝐸𝐸� 

 1 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

#### 𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### �= 

 1 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### )[ 

#### 𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### +𝐸𝐸 

#### ( 

#### 𝜀𝜀 

 𝑖𝑖 

#### )] 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

 1 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### [ 

#### 0 𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

#### 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### ] 

#### = 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### 𝛽𝛽 

 1 

#### =𝛽𝛽 

 1 

#### 2. 𝑉𝑉�𝛽𝛽 

#### ̂ 

 1 

#### �=𝑉𝑉� 

 1 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

#### ∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### �= 

 𝜎𝜎 𝜀𝜀 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

#### = 

 𝜎𝜎 𝜀𝜀 

 2 

 ( 𝑛𝑛−1 

 ) 𝑜𝑜 

 𝑥𝑥 

 2 

 → 0 ; consistent ! 

#### = 

 1 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 2 

#### 𝑉𝑉[∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### ]= 

 1 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 2 

#### [∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 2 

#### 𝑉𝑉(𝑌𝑌 

 𝑖𝑖 

#### )+ 0 

 𝑛𝑛 

 𝑖𝑖=1 

#### ] 

#### = 

 1 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

 2 

#### ∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 2 

#### (0 +0 +𝜎𝜎 

 𝜀𝜀 

 2 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

 𝜎𝜎 𝜀𝜀 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

#### = 

 𝜎𝜎 𝜀𝜀 

 2 

 ( 𝑛𝑛−1 

 ) 𝑜𝑜 𝑥𝑥 

 2 

 Note: most noisy when incomes more varied (conditional on education); least noisy when 

 education more varied (𝑒𝑒 

 𝑥𝑥 

 2 

 in denominator) 

#### 3. 

 𝛽𝛽 

 � 

 1 

 −𝛽𝛽 

 1 

 � 

 𝜎𝜎 

 𝜀𝜀 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 ∼𝑁𝑁(0, 1); therefore, 

 𝛽𝛽 

 � 

 1 

 −𝛽𝛽 

 1 

 � 

 𝑠𝑠 

 𝜀𝜀 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### ∼𝑡𝑡(𝑛𝑛− 2 ) 

4. Example 

 a. From previous lecture, 𝑛𝑛= 5 , 𝑒𝑒 

 𝜀𝜀 

 2 

#### = 37 , 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### = 28 

 b. 95% Confidence interval: $8.2𝑘𝑘±3. 182� 

 37 

 28 

#### =[$4.5𝑘𝑘, $11.9𝑘𝑘] 

 c. Hypothesis Test 𝐻𝐻 

 𝑎𝑎 

#### :𝛽𝛽 

 1 

 >$5𝑘𝑘 at 𝛼𝛼=.05 level 

 i. Critical value 2.353 

 ii. Test statistic 

 8 .2−5 

 � 

 37 

 28 

 ≈2. 78; reject 𝐻𝐻 

 0 

Intercept estimator 

1. It can be shown that 𝐸𝐸�𝛽𝛽 

#### ̂ 

 0 

#### �=⋯=𝛽𝛽 

 0 

 ; unbiased ! 

 It can be shown that 𝑉𝑉�𝛽𝛽 

#### ̂ 

 0 

#### �=𝜎𝜎 

 𝜀𝜀 

 2 

#### � 

 1 

 𝑛𝑛 

#### + 

 𝑥𝑥 

 ̅ 

 2 

 ( 𝑛𝑛−1 

 ) 𝑜𝑜 

 𝑥𝑥 

 2 

 �→ 0 ; consistent ! 

 a. [For those curious, 

#### 𝐸𝐸�𝛽𝛽 

#### ̂ 

 0 

#### �=𝐸𝐸� 

 1 

 𝑛𝑛 

#### ∑ 𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### −𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥̅�= 

 1 

 𝑛𝑛 

#### ∑ [𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### +𝐸𝐸(𝜀𝜀 

 𝑖𝑖 

#### )] 

 𝑛𝑛 

 𝑖𝑖=1 

#### −𝑥𝑥̅𝐸𝐸�𝛽𝛽 

#### ̂ 

 1 

#### � 

#### = 

 𝑛𝑛𝛽𝛽 

 0 

 𝑛𝑛 

#### +𝛽𝛽 

 1 

 1 

 𝑛𝑛 

#### ∑ 𝑥𝑥 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### −𝑥𝑥̅𝛽𝛽 

 1 

#### =𝛽𝛽 

 0 

#### 𝑉𝑉�𝛽𝛽 

#### ̂ 

 0 

#### �=𝑉𝑉�𝑌𝑌 

#### � 

#### −𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥̅� 

#### =𝑉𝑉(𝑌𝑌 

#### � 

#### )+𝑥𝑥̅ 

 2 

#### 𝑉𝑉 

#### � 

#### 𝛽𝛽 

#### ̂ 

 1 

#### � 

#### − 2 𝑥𝑥 ̅𝐶𝐶𝑛𝑛𝑐𝑐 

#### � 

#### 𝑌𝑌 

#### � 

#### ,𝛽𝛽 

#### ̂ 

 1 

#### � 

#### = 

 𝜎𝜎 𝜀𝜀 

 2 

 𝑛𝑛 

#### +𝑥𝑥̅ 

 2 

 𝜎𝜎 𝜀𝜀 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

#### −0 =𝜎𝜎 

 𝜀𝜀 

 2 

#### � 

 1 

 𝑛𝑛 

#### + 

 𝑥𝑥̅ 

 2 

 ( 𝑛𝑛−1 

 ) 𝑜𝑜 

 𝑥𝑥 

 2 

#### �→ 0 

 Note: 𝐶𝐶�𝑌𝑌 

#### � 

#### ,𝛽𝛽 

#### ̂ 

 1 

 �= 0 because... 

---

#### 𝐶𝐶� 

 1 

 𝑛𝑛 

#### ∑ 

#### 𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### , 

 1 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

#### 𝑌𝑌 

 𝑗𝑗 

 𝑛𝑛 

 𝑗𝑗=1 

#### �= 

 1 

 𝑛𝑛𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### 𝐶𝐶� 

#### ∑ 

#### 𝑌𝑌 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### , 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

#### 𝑌𝑌 

 𝑗𝑗 

 𝑛𝑛 

 𝑗𝑗=1 

#### � 

#### = 

 1 

 𝑛𝑛𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### � 

#### ∑ ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### ) 

#### 𝐶𝐶 

#### ( 

#### 𝑌𝑌 

 𝑖𝑖 

#### ,𝑌𝑌 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### + 

#### ( 

#### 𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅ 

#### )∑ 

#### 𝐶𝐶�𝑌𝑌 

 𝑖𝑖 

#### ,𝑌𝑌 

 𝑗𝑗 

#### � 

 𝑖𝑖≠𝑗𝑗 

#### � 

#### = 

 1 

 𝑛𝑛𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### �∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)𝑉𝑉(𝑌𝑌 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### +(𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅)∑ 0 

 𝑖𝑖≠𝑗𝑗 

#### � 

#### = 

 1 

 𝑛𝑛𝑆𝑆 𝑥𝑥𝑥𝑥 

#### �𝜎𝜎 

 𝑦𝑦 

 2 

#### ∑ (𝑥𝑥 

 𝑖𝑖 

#### −𝑥𝑥̅) 

 𝑛𝑛 

 𝑖𝑖=1 

#### � 

#### = 

 𝜎𝜎 

 𝑥𝑥 

 2 

 𝑛𝑛𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### [ 0 ] ] 

2. Note two pieces: small error in identifying �𝜇𝜇 

 𝑥𝑥 

#### ,𝜇𝜇 

 𝑦𝑦 

 � and larger error in identifying slope (which 

 matters more when 𝑥𝑥̅ 

 2 

 high). 

#### 3. 

 𝛽𝛽 

 � 

 0 

 −𝛽𝛽 0 

 � 𝜎𝜎 𝜀𝜀 

 2 

 � 

 1 

 𝑛𝑛 

 + 

 𝑥𝑥� 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

 � 

 ∼𝑁𝑁(0, 1); therefore, 

 𝛽𝛽 

 � 

 0 

 −𝛽𝛽 0 

 � 𝑜𝑜 𝜀𝜀 

 2 

 � 

 1 

 𝑛𝑛 

 + 

 𝑥𝑥� 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

 � 

#### ∼𝑡𝑡(𝑛𝑛− 2 ) 

Prediction estimator 

#### 1. (𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝚤𝚤 

#### ) 

#### � 

#### =𝛽𝛽 

#### ̂ 

 0 

#### +𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### 2. 𝐸𝐸�𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝚤𝚤 

#### � 

#### �=𝐸𝐸�𝛽𝛽 

#### ̂ 

 0 

#### +𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### �=𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

 ; unbiased ! 

#### 3. 𝑉𝑉�𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝚤𝚤 

#### � 

#### �=⋯=𝜎𝜎 

 𝜀𝜀 

 2 

#### � 

 1 

 𝑛𝑛 

#### + 

 (𝑥𝑥 

 𝑖𝑖 

 −𝑥𝑥̅) 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 �→ 0 ; consistent ! 

#### [𝑉𝑉�𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 𝚤𝚤 

#### � 

#### �=𝑉𝑉�𝛽𝛽 

#### ̂ 

 0 

#### �+𝑥𝑥 

 𝑖𝑖 

 2 

#### 𝑉𝑉�𝛽𝛽 

#### ̂ 

 1 

#### �+ 2 𝐶𝐶 𝑛𝑛𝑐𝑐�𝛽𝛽 

#### ̂ 

 0 

#### ,𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥 

 𝑖𝑖 

#### � 

#### =𝜎𝜎 

 𝜀𝜀 

 2 

#### � 

 1 

 𝑛𝑛 

#### + 

 𝑥𝑥̅ 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### �+(𝑥𝑥 

 𝑖𝑖 

#### ) 

 2 

 𝜎𝜎 

 𝜀𝜀 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### − 2 𝑥𝑥 

 𝑖𝑖 

#### 𝑥𝑥̅ 

 𝜎𝜎 

 𝜀𝜀 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 (since 𝐶𝐶𝑛𝑛𝑐𝑐�𝛽𝛽 

#### ̂ 

 0 

#### ,𝛽𝛽 

#### ̂ 

 1 

#### �=𝐶𝐶𝑛𝑛𝑐𝑐�𝑌𝑌 

#### � 

#### −𝛽𝛽 

#### ̂ 

 1 

#### 𝑥𝑥̅,𝛽𝛽 

#### ̂ 

 1 

#### �= 0 −𝑥𝑥̅ 

 𝜎𝜎 

 𝜀𝜀 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### ) = 

#### 𝜎𝜎 

 𝜀𝜀 

 2 

#### � 

 1 

 𝑛𝑛 

#### + 

 ( 𝑥𝑥 𝑖𝑖 

 −𝑥𝑥̅ 

 ) 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

#### �=𝜎𝜎 

 𝜀𝜀 

 2 

#### � 

 1 

 𝑛𝑛 

#### + 

 ( 𝑥𝑥 𝑖𝑖 

 −𝑥𝑥̅ 

 ) 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

#### �] 

 Note: most precise close to 𝑥𝑥̅; can still make predictions far away from 𝑥𝑥̅, but more noisy 

#### 4. 

 (𝛽𝛽 

 0 

 +𝛽𝛽 

 1 

 𝑥𝑥 

 𝚤𝚤 

 ) 

 � 

 −(𝛽𝛽 

 0 

 +𝛽𝛽 

 1 

 𝑥𝑥 

 𝑖𝑖 

 ) 

 � 𝜎𝜎 

 𝜀𝜀 

 2 

 � 

 1 

 𝑛𝑛 

 + 

 �𝑥𝑥 

 𝑖𝑖 

 −𝑥𝑥 

 � � 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

 � 

#### ∼𝑁𝑁(0, 1) 

 ( 𝛽𝛽 0 

 +𝛽𝛽 1 

 𝑥𝑥 𝚤𝚤 

 ) 

 � 

 − 

 ( 𝛽𝛽 0 

 +𝛽𝛽 1 

 𝑥𝑥 𝑖𝑖 

 ) 

 �𝑜𝑜 

 𝜀𝜀 

 2 

 � 

 1 

 𝑛𝑛 

 + 

 �𝑥𝑥 

 𝑖𝑖 

 −𝑥𝑥�� 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 � 

#### ∼𝑡𝑡(𝑛𝑛−2) 

Error variance 

#### 1. 

 ( 4 )𝑜𝑜 

 𝜀𝜀 

 2 

 𝜎𝜎 

 𝜀𝜀 

 2 

#### ∼𝜒𝜒 

 2 

#### ( 

#### 4 

#### ) 

#### , 𝑒𝑒 

 𝜀𝜀 

#### =6. 1 

2. 95% confidence interval for 𝜎𝜎 

 𝜀𝜀 

 a.. 95=𝑃𝑃�. 48< 

 ( 4 )𝑜𝑜 

 𝜀𝜀 

 2 

 𝜎𝜎 

 𝜀𝜀 

 2 

#### < 11 .14�=𝑃𝑃�� 

 4⋅37 

. 48 

#### >𝜎𝜎 

 𝜀𝜀 

#### >� 

 4⋅37 

. 48 

#### �=𝑃𝑃 

#### ( 

#### 17 .6 >𝜎𝜎 

 𝜀𝜀 

#### >3. 6 

#### ) 

---

3. Test 𝐻𝐻 

 𝑎𝑎 

#### :𝜎𝜎 

 𝜀𝜀 

 2 

#### > 4 

 2 

 at 𝛼𝛼=.05 level 

 a. Critical value 9.49 (from Table 6) 

 b. Test statistic 

 4⋅37 

 4 

 2 

 =9. 25; not significant 

4. If you had two regressions and wanted to know which has better predictive power (i.e. lower 

 residual error variance) you could compare 𝜎𝜎 

 𝜀𝜀𝐴𝐴 

 2 

 and 𝜎𝜎 

 𝜀𝜀𝐵𝐵 

 2 

 using F distribution 

## Review 

1. Thanks for a great semester! 

2. Thanks TAs! 

3. Recommend Econ 388: regression with multiple variables 

 a. We’re on the brink of knowledge explosion 

 b. Also Econ 210 for exploring careers in Economics 

 c. For advanced statistics/econometrics, recommend linear algebra (Math 213) 

4. Student project findings 

 a. Wide variety of projects 

 b. Value of statistics for consumers, not just producers 

5. Key concepts 

 a. We’ve seen several trees, now let’s notice the forest 

 b. Pre-midterm, we discussed population distributions (discrete or continuous), including 

 moments such as mean, variance, and covariance. 

 c. From sample, we seek to estimate population parameter: 𝜇𝜇, 𝜎𝜎, 𝑝𝑝, 𝜌𝜌, 𝜇𝜇 

 1 

#### −𝜇𝜇 

 2 

#### , 𝑝𝑝 

 1 

#### −𝑝𝑝 

 2 

#### , 

 𝜎𝜎 

 1 

 2 

 𝜎𝜎 

 2 

 2 

#### , 𝛽𝛽 

 0 

#### , 𝛽𝛽 

 1 

#### , 𝑥𝑥 

 ∗ 

#### =𝛽𝛽 

 0 

#### +𝛽𝛽 

 1 

#### 𝑥𝑥 

 ∗ 

 , or 𝜃𝜃 from another distribution function (e.g. 𝑎𝑎, 𝑏𝑏 from 

 uniform, 𝜃𝜃 from exponential), including distributions we haven’t encountered yet (e.g. 𝑝𝑝 

 from geometric, 𝜆𝜆 from Poisson, 𝛽𝛽 

 2 

 from quadratic regression) 

 d. Deriving estimators: MOM and ML 

 e. Properties of estimators: bias, efficiency, consistency 

 f. Margin of error, confidence intervals, hypothesis tests 

 g. Matrix algebra 

---

 i. This class has focused on the correlation 𝜌𝜌 between two variables, which also 

 underlies linear regression line: slope coefficient 𝜌𝜌 

 𝜎𝜎 𝑥𝑥 

 𝜎𝜎 

 𝑥𝑥 

 and coefficient of 

 determination 𝜌𝜌 

 2 

### ii. Matrix algebra allows us to generalize everything to multiple variables (e.g. 𝜷𝜷= 

### ( 

### 𝑿𝑿 

 ′ 

### 𝑿𝑿 

### ) 

 −𝟏𝟏 

### 𝑿𝑿 

 ′ 

### 𝒚𝒚 instead of 𝛽𝛽= 

 ∑ 𝑥𝑥 

 𝑖𝑖 

 𝑦𝑦 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

 ∑ 𝑥𝑥 

 𝑖𝑖 

 2 

 𝑛𝑛 

 𝑖𝑖=1 

### iii. Individual slope coefficient 𝛽𝛽 

 1 

### then reflects partial correlation between 

### education and income, holding experience, age, race, gender, etc. fixed. 

### iv. Controlling for more variable makes stronger case for correlation as 

### causation 

6. Deriving estimator distributions 

 a. Estimators depend on 𝑋𝑋 

 1 

#### ,𝑋𝑋 

 2 

#### , ...,𝑋𝑋 

 𝑛𝑛 

 , and so are random variables with distributions 

 b. 𝐸𝐸(𝑋𝑋 

#### � 

#### )=𝐸𝐸� 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### �= 

 1 

 𝑛𝑛 

#### ∑ 𝐸𝐸(𝑋𝑋 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

 1 

 𝑛𝑛 

#### (𝑛𝑛𝜇𝜇)=𝜇𝜇 

 c. 𝑉𝑉(𝑋𝑋 

#### � 

#### )=𝑉𝑉� 

 1 

 𝑛𝑛 

#### ∑ 𝑋𝑋 

 𝑖𝑖 

 𝑛𝑛 

 𝑖𝑖=1 

#### �= 

 1 

 𝑛𝑛 

 2 

#### ∑ 𝑉𝑉(𝑋𝑋 

 𝑖𝑖 

#### ) 

 𝑛𝑛 

 𝑖𝑖=1 

#### = 

 1 

 𝑛𝑛 

#### (𝑛𝑛𝜎𝜎 

 2 

#### )= 

 𝜎𝜎 

 2 

 𝑛𝑛 

 d. Distribution 𝑋𝑋 

#### � 

#### ∼𝑁𝑁�𝜇𝜇, 

 𝜎𝜎 

 2 

 𝑛𝑛 

 � or 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝜎𝜎 

 2 

 𝑛𝑛 

#### ∼𝑁𝑁 

#### ( 

#### 0, 1 

#### ) 

 (by normality of 𝑋𝑋 

 𝑖𝑖 

 or Central Limit 

 Theorem) 

 e. CLT also implies that 

 𝑛𝑛�−𝑛𝑛 

 � 

 𝑝𝑝 

 ( 1−𝑝𝑝 

 ) 

 𝑛𝑛 

#### ∼𝑁𝑁(0, 1) 

 f. Difference estimators 

 ( 𝑋𝑋 

 � 

 1 

 −𝑋𝑋 

 � 

 2 

 ) −(𝜇𝜇 1 

 −𝜇𝜇 2 

 ) 

 � 

 𝜎𝜎 

 1 

 2 

 𝑛𝑛 1 

 + 

 𝜎𝜎 

 2 

 2 

 𝑛𝑛 2 

 ∼𝑁𝑁(0, 1) and 

 𝑛𝑛 

 � −𝑛𝑛 

 � 

 𝑝𝑝(1−𝑝𝑝) 

 𝑛𝑛 

#### ≈𝑁𝑁(0, 1) 

 g. 𝑋𝑋 

 𝑖𝑖 

 normal implies (𝑛𝑛− 1 ) 

 𝑆𝑆 

 2 

 𝜎𝜎 

 2 

#### ∼𝜒𝜒 

 2 

#### (𝑛𝑛−1) 

 and therefore 

 𝑜𝑜 

 𝐴𝐴 

 2 

 /𝜎𝜎 

 𝐴𝐴 

 2 

 𝑜𝑜 

 𝐵𝐵 

 2 

 /𝜎𝜎 

 𝐵𝐵 

 2 

#### ∼𝐹𝐹(𝑛𝑛 

 𝐴𝐴 

#### −1,𝑛𝑛 

 𝐵𝐵 

 −1) and 

 𝑋𝑋 

 � −𝜇𝜇 

 � 

 𝑆𝑆 

 2 

 𝑛𝑛 

#### ∼𝑡𝑡(𝑛𝑛−1) 

 h. Similarly, 𝐸𝐸�𝛽𝛽 

#### ̂ 

 1 

#### �=⋯=𝛽𝛽 

 1 

#### , 𝑉𝑉�𝛽𝛽 

#### ̂ 

 1 

#### �=⋯= 

 𝜎𝜎 

 𝜀𝜀 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 and 𝜀𝜀 

 𝑖𝑖 

 normal implies that 𝛽𝛽 

#### ̂ 

 1 

#### ∼𝑁𝑁�𝛽𝛽 

 1 

#### , 

 𝜎𝜎 

 𝜀𝜀 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

 � or 

 𝛽𝛽 

 � 

 1 

 −𝛽𝛽 

 1 

 � 

 𝜎𝜎 

 𝜀𝜀 

 2 

 𝑆𝑆 

 𝑥𝑥𝑥𝑥 

#### ∼𝑁𝑁 

#### ( 

#### 0, 1 

#### ) 

 i. (𝑛𝑛− 2 ) 

 𝑆𝑆 𝜀𝜀 

 2 

 𝜎𝜎 

 𝜀𝜀 

 2 

 ∼𝜒𝜒(𝑛𝑛− 2 ), implying that 

 𝛽𝛽 

 � 

 1 

 −𝛽𝛽 1 

 � 

 𝑆𝑆 𝜀𝜀 

 2 

 𝑆𝑆 𝑥𝑥𝑥𝑥 

#### ∼𝑡𝑡(𝑛𝑛−2) 

7. Matrix algebra True/False question tip 

---

 a. Check simple cases (e.g. 1 × 1 , 2 × 2 ), but not special cases 

 b. Example: “All symmetric matrices are idempotent” 

 i. Try simple example: not special matrix like identity matrix or � 

#### 1 1 

#### 1 1 

 �, but 

 something with no special properties other than symmetry, such as � 

#### 1 3 

#### 3 2 

 � (and 

 show that � 

#### 1 3 

#### 3 2 

#### �� 

#### 1 3 

#### 3 2 

#### �=� 

#### 10 9 

#### 9 13 

#### �≠� 

#### 1 3 

#### 3 2 

#### �) 

 ii. Can also try really simple examples, such as scalar matrices: 

#### ( 

#### 5 

#### )( 

#### 5 

#### ) 

#### ≠ 

#### ( 

#### 5 

#### ) 

#### . 

 c. T/F questions are not “trick” questions, but be careful. In real world, much of statistics 

 is simply a matter of careful attention to details, and knowing exactly which inferences 

 are legitimate under exactly which circumstances. 

8. Example problems 

 a. Confidence interval for 𝑌𝑌 

#### � 

 ∗ 

 b. Hypothesis test for 𝑝𝑝̂ 

 1 

#### −𝑝𝑝̂ 

 2 

