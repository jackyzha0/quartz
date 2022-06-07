---
title: |
  Econ 378 Lecture Notes\
  Joseph McMurray
---

# L0 Introduction

1.  Opening Prayer

2.  About me

    -  Raised in Salt Lake City, mission in Seoul Korea, Economics major at BYU, met my wife at BYU, PhD at University of Rochester, research in political economics (also teach Econ 477), 4 kids, sincerely believe in the Gospel of Jesus Christ and the mission of BYU.

    -  I enjoy teaching Econ 378 because the material is so useful for students, which is rewarding. It is also hard, so making it interesting and easy is a fun challenge.

3.  Data analysis in Economics

    -  Scientific method: observe patterns, theorize, test theories, policy implications, policy calibration

    -  Theory: Econ 110, 380-382, 400+

    -  Evidence: Econ 378, 388, 400+, Research, internships, jobs (big data industrial transition)

    -  Economics is *both* (recommend Econ 210 for exploring careers in Economics, also MATH 213/215 linear algebra)

4.  Probability and statistics

    -  Often care about population but observe only sample.
 Can't know what's true, but can know what's *probably* true

-  Probability is the language of uncertainty

-  Probability theory also useful in theoretical models of risk/uncertainty (e.g. insurance, investments, search, asymmetric information)


5.  Syllabus

    -  Materials, participation, homework, exams, project

    -  How to choose a research topic

    -  Finish part 1 (data collection) on time! After the midterm, homework will include data analysis from your own projects.

# L1 Math Preview

1.  Spiritual thought: like Joseph in Egypt, your time at BYU is 7 years of plenty (spiritual abundance). Likely less so when you go to graduate school or workforce. Store up all you can now (e.g. devotionals, religion classes, student ward, ministering), like wise virgins with oil lamps, to sustain you as you "go forth to serve"

2.  In a similar (but temporal) way, this lecture and HW 1 seek to fill your "math lamps" in preparation for the rest of the semester.

3.  Factorials

    -  $5! = 5\cdot 4\cdot 3\cdot 2\cdot 1$

    -  $0! = 1$

4.  Exponents

    -  $e\approx 2.7$ denotes growth
		1.\$1 invested at 100% interest, compound annually, equals\$2 a year later
		2.\$1 invested at 100% interest, compound continuously, equals\$2.72 a year later

| Expression                 | Simplified / Rewritten |
|----------------------------|------------------------|
| $x^{- 1}$                  | $1/x$                  |
| $x^{1/2}$                  | $\sqrt(x)$                     |
| $x^{0}$                    | $1$                    |
| $x^{2}x^{3}$               | $x^{5}$                |
| $(x^{2})^{3}$ | $x^{6}$                |
| $e^{x}e^{y}$               | $e^{x + y}$            |
| $e^{x}/e^{y}$              | $e^{x - y}$            |
| $e^{x + y}$                | $e^{x}e^{y}$           |
| $e^{x - y}$                | $e^{x}/e^{y}$          |

5.  Logarithms

    -  $100 = 2$ (How many powers of\$10$ give you\$100?)
		1.  $\log(.01)= - 2$

    -  $\ln(100)\approx 4.6$ (How many powers of $e\approx 2.7$ give you $100$?)
		1.  $\ln(.01)= - 4.6$

    -  Logs makes huge numbers smaller, miniscule numbers (e.g. probabilities) bigger

    -  Inverse of exponents
		1.  $\ln(e^{5})= 5$ (How many powers of $e$ does it take to reach $e^{5}$?)
		2. $e^{\ln(5)} = 5$ (It takes $\ln(5)$ powers of $e$ to make $5$; what if we take $e$ to that many powers?)

| Expression                                                | Simplified / Rewritten                                                                                                                             |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| $\ln(\text{xy})$                           | $\ln(x)+\ln(y)$                                                                                          |
| $\ln(\frac{x}{y})$                    | $\ln(x)-\ln(y)$                                                                                          |
| $\ln(2x)$                                    | $\neq 2\ln(x)$;$\neq\ln(2)\ln(x)$;$=\ln(2)+\ln(x)$ |
| $\ln(x^{2})$                          | $2ln(x)$                                                                                                                                           |
| $\ln(x + y)$                                               | Can't simplify                                                                                                                                     |
| $\ln(x)+\ln(y)$ | $\ln(\text{xy})$                                                                                                               |
| $\ln(x)-\ln(y)$ | $\ln(\frac{x}{y})$                                                                                                             |
| $2ln(x)$                                                  | $\ln(x^{2})$                                                                                                                   |

6.  Summation

    -  $\sum_{k=1}^5k^{2} = 1^{2} + 2^{2} + 3^{2} + 4^{2} + 5^{2} = 55$

    -  Column of $n = 500$ observations can be denoted by $x_{i}$, with $i = 1,\ldots,n$

    -  $\frac{1}{n}\sum_{i=1}^nx_{i}$ denotes the average

    -  $\sum_{i=1}^n3x_{i} = 3\sum_{i=1}^nx_{i}$

    -  $\sum_{i=1}^n(x_{i} + y_{i}) = \sum_{i=1}^nx_{i} + \sum_{i=1}^ny_{i}$

    -  $\sum_{i=1}^n(x_{i} + 3) = \sum_{i=1}^nx_{i} + \sum_{i=1}^n3 = \sum_{i=1}^nx_{i} + 3n$

    -  Does $\sum_{i=1}^n(x_{i}y_{i}) = \sum_{i=1}^nx_{i}\sum_{i=1}^ny_{i}$? No!
		1.  e.g. $2\cdot 3 + 5\cdot 4\neq (2 + 5)(3 + 4)$

7.  Derivatives

    -  Intuition: limit of slope

    -  Finding maximum/minimum
		1.  First-order condition: $f^{'}(x) = 0$
		2. Second-order condition: $f^{''}(x)$ negative for max (slope is decreasing, function makes a frown), positive for min (slope is increasing, function makes a smile)

    -  Simple derivatives

| $f(x)$ | $f^{'}(x)$                      |
|---------------------|----------------------------------------------|
| $x^{3}$             | $3x^{2}$                                     |
| $4x$                | $4$                                          |
| $4$                 | $0$                                          |
| $\frac{1}{x}$       | $-\frac{1}{x^{2}}$                          |
| $\sqrt{x}$          | $\frac{1}{2}x^{-\frac{1}{2}} =\frac{1}{2\sqrt{x}}$ |
| $e^{x}$             | $e^{x}$                                      |
| $ln(x)$             | $\frac{1}{x}$                                |

-  Product rule: $\frac{d}{\text{dx}}\lbrack f(x)g(x)\rbrack = f^{'}(x)g(x) + f(x)g'(x)$
	1.  $\frac{d}{\text{dx}}x^{2}\ln(x)= 2x\ln(x)+ x^{2}(\frac{1}{x})$
	2. Same pattern for products of 100 terms

-  Chain rule: $\frac{d}{\text{dx}}f(g(x)) = f^{'}(g(x))g^{'}(x) =\frac{\text{df}}{\text{dg}}\frac{\text{dg}}{\text{dx}}$
	1.  Example: $\frac{d}{\text{dx}}\ln(x^{2} - 3x + 1)=\frac{1}{x^{2} - 3x + 1}\cdot (2x - 3)$
	2. Example: $\frac{d}{\text{dx}}e^{- 3x^{2}} = e^{- 3x^{2}}(- 6x)$
	3. Same pattern for longer chains

-\[The Quotient rule is useful as well, but I won't require it here.\]


8.  Integrals

    -  Intuition
		1.  "sum"/area under $f$ (negative if $f < 0$)
		2. Anti-derivative: add up $\int_a^b f'(x)dx$ to get $f(b) - f(a)$

| $f(x)$            | Anti-derivative of $f(x)$ |
|-------------------|----------------------------------------|
| $x^{2}$           | $\frac{1}{3}x^{3}$                     |
| $4$               | $4x$                                   |
| $\frac{1}{x^{2}}$ | $-\frac{1}{x}$                        |
| $\sqrt{x}$                | $\frac{2}{3}x^{\frac{3}{2}}$           |
| $e^{x}$           | $e^{x}$                                |
| $x(x - 1)$        | $\frac{1}{3}x^{3} -\frac{1}{2}x^{2}$  |

-  Definite integral $\int_4^7 x^{2}dx =\lbrack\frac{1}{3}x^{3}\rbrack_{x = 4}^{7}$
 $=\frac{1}{3}(7)^{3} -\frac{1}{3}(4)^{3} =\frac{343}{3} -\frac{64}{3} = 93$
	1.  $\int_7^4 x^{2}dx =\frac{64}{3} -\frac{343}{3} = - 93$


-  Useful techniques that I won't cover (or expect you to know)
	1.  $u$-substitution (chain rule in reverse)
	2. Integration by Parts (product rule in reverse)

-  Double Integrals
	1.  Simple: inside integral then outside integral

$\int_{y=1}^3\int_{x=0}^2x^{2}ydxdy =\int_{y=1}^3\lbrack\frac{y}{3}x^{3}\rbrack_{x = 0}^{x = 2}dy =\int_{y=1}^3\frac{8}{3}ydy =\ldots =\frac{32}{3}$

ii. Note: for rectangular bounds (i.e. bounds of $x$ don't depend on $y$, and vice versa), can integrate in reverse order

$\int_{y=1}^2\int_{x=0}^3x^{2}ydydx =\int_{y=1}^3\lbrack\frac{1}{2}x^{2}y^{2}\rbrack_{y = 1}^{y = 3}dx =\int_{x=0}^2 4x^{2}dx =\ldots =\frac{32}{3}$

iii. Practice $\int_{y=1}^3\int_{x=0}^2e\frac{x}{y}\text{dxdy}$

# L2 Statistics preview

Introduction

1.  We recently revised the Econ 378 curriculum. Formerly, we started with basic theory and the basic tools based on it, introduced complex theory with complex tools, then more complex theory and more complex tools. This seemed reasonable, but I realized: "Still to this day, I've never learned to build a car, but even without knowing how to build one, I managed to learn to drive one."

2.  Now: learn basic, complex, and more complex tools upfront. Then go learn the underlying theory.

Spreadsheets

1.  Unit of observation

2.  Quantitative variables

3.  Binary variables

    -  Categorical variables as binary (or "dummy") variables

Data Visualization

1.  Single variables

    -  Binary variables: Pie charts

    -  Quantitative variables: Histograms

2.  Interactions

    -  Two binary variables: Double pie charts

    -  Binary and quantitative: bar chart

    -  Two quantitative: scatter chart
		1.  Quantitative & time: line graph

    -  Three variables
		1.  Two binary & quantitative: clustered bar chart
		2. Two quantitative & binary: color-coded scatter chart
		3. Three quantitative: bubble chart

Summary statistics

1.  Proportions

2.  Mean

    -  From histogram, eyeball center of gravity

3.  Median/percentiles

4.  Mode

5.  Standard deviation

    -  Rule of thumb: two standard deviations

    -  Chebyshev's inequality: % of population outside $k$ standard deviations can't exceed $\frac{1}{k^{2}}$

6.  Correlation coefficient

    -  $\rho\in\lbrack - 1,1\rbrack$

    -  $\rho^{2}$ gives fraction of variance in $Y$ that coincides with variation in $X$

7.  Regressions

    -  Slope & intercept
		1.  Predict $y$ for any $x$
		2. Predict future!
		3. Counterfactual "experiments" (way less costly than real experiments)

    -  $R^{2}$ (coefficient of determination)

    -  Error terms / detrended data

    -  Multiple regression

Estimation

1.  Population / samples

    -  Importance of representative sample

2.  Point estimates, interval estimates / margin of error

3.  Hypothesis test

# L3 Excel

Excel basics

1.  Intro FRED website: maintained by Federal Reserve Bank of St. Louis, 800,000+ macroeconomic variable series over time; virtually everything collected by federal agencies, and many variables collected by foreign governments and central banks.

2.  Downloading variables

    -  Choose variable 1: real GPD

    -  Edit chart\> Add variable\> population (quarterly, not monthly)

    -  Adjust years (1960 onward)

    -  Download .xlsx (explain .csv, etc.)

3.  Spreadsheet management

    -  Basic calculator (e.g. $2 + sqrt(9)$ displays $5$)

    -  Navigation shortcuts: Ctrl+arrows, Ctrl+Shift+arrows, Ctrl+Home

    -  Adjust column widths, center cells, format color code

    -  Freeze pains

    -  Hide labels
		1.  Show how to uhide

    -  Cut, paste, copy, slide cells, reverse cells

    -  Sort

4.  Construct variables

    -  Real GDP per capita = real GDP/pop, copy formula
		1.  Always label variables!

    -  Real GDP per cap (absolute) growth = real GDP per cap minus previous

    -  Percentage real GDP per cap growth = real GDP per cap growth / previous
		1.  Suppress digits / format percentage

    -  Pos growth (binary / Boolean / dummy variable) = 1\*(growth\> 0)

    -  Percentage population growth = (pop-previous)/previous

5.  Summary statistics

    -  Histogram of % GDP per cap growth, % pop growth
		1.  File\> Options\> Add-ins\> Analysis ToolPak + Go\> Analysis Toolpak + OK
		2. Data Analysis Toolbar\> Histogram
		3. GDP Bins from -10% to +10% by 1% increments (excludes one outlier)
             1.  Reduce typing by extrapolating ("plus" cursor in bottom right-hand corner of cell)
		4. Pop bins from 0% to .75% by .05%

    -  Min, max, mean, median, standard deviation
		1.  Eyeball first
		2. Compute for % real GDP per cap growth
		3. Copy formulas for % pop growth

    -  Correlation % pop growth, % real GDP per cap growth
		1.  Reasons to expect positive/negative?
		2. Compute

    -  Line graph: % pop growth, % real GDP per cap growth

    -  Conditional mean
		1.  Sort by pos growth
		2. Compute mean % real pop growth (does pop growth accelerate/slow down in recessions?)

6.  Regressions

    -  Scatter % real GDP per cap growth over time

    -  Scatter real GDP per cap (not growth) and time

    -  Regress real GDP per cap (not growth) on time
		1.  First create time index variable?

    -  Create predicted real GDP
			1.  Use \$ sign to pin formula

    -  Detrend to create business cycle variable: actual real GDP minus predicted real GDP

7.  Task: test whether pop growth is higher or lower on average in booms than busts

    -  Create boom dummy: residual\> 0

    -  Sort boom, average % pop growth

8.  Filter

    -  Decompose date

    -  Filter by quarters

    -  Create dummy for first half of year (Q1-2)

    -  Is % real GDP per cap growth higher in first half or second half of year, on average?

Learning Statistics

1.  We just finished semester (overview). You can now do everything by computer. Rest of semester, we'll go back and do them by hand.

2.  Why work by hand? Important to know what computer is doing. (GIGO)

    -  Pushing a button works great unless a situation arises when the standard button is the wrong one to use. We need to know the limitations of the standard techniques and how to modify them appropriately.

    -  Car analogy: why insist on building cars when we could just drive them? Analogy incomplete: I can objectively verify that I've correctly driven a car; I can't objectively verify that I've correctly used statistics. In the real world of research projects, internships, and jobs, there is no answer key! We only know our answers are correct if we know we've done them correctly, and that's only possible if we understand deeply what theoretical basis underlies the tools we're using.

3.  Simple things (e.g. margin of error) mask extremely complex background. Understanding entire background is essential for confidence that we're using statistical formulas appropriately. (Sometimes, tweaks are necessary.)

4.  Spiritual analogy: the "why" of the gospel. If atheist friend is kind and righteous already, why need doctrine? Even more happiness. Example: doctrine of eternal marriage informs decisions to resolve conflicts, versus divorce.

# L4 Stata: Basics

Stata

1.  Statistical programming

    -  Data sets get too big for spreadsheet software

    -  Many operations, nice to save work and save steps
		1.  Helps with collaboration
		2. Helps with finding and correcting errors (without redoing work)
		3. Commands efficiently operate on large sections of data simultaneously

2.  Introduction

    -  Stata especially well-suited to economics (regression analysis).

    -  But expensive.

    -  Other stats packages are available (e.g. R, SAS, SPSS), can program in Python, C, Matlab, Java). But learning new stats package or programming language is like using a Casio calculator when you're familiar with TI---all the buttons do all the same things, they're just located in different places. So learning one language helps you pick up others quickly, as needed. (Stata has specific value for Economics research assistants, future PhDs.)

3.  Basic user interface

    -  Open Stata. Very different GUI (graphical user interface) than Excel, but same idea. Feels more like computer programming software, for good reason.

    -  Click on Data Editor (Edit), enter data by hand: numbers 1-10 in column 1, make up ten values in column 2.
		1.  Row entries are called observations (numbered automatically on left side)
		2. Column entries are called variables, default named "var1" and "var2"

    -  Close data editor. Notice in main screen, a running list of individual commands (and their results), based on what we just did manually.
		1.  With our first action, we actually implemented three commands: set "obs" from 0 to 1, generate variable "var1", and set the value of var1 for observation 1.
		2. As we added more data, we set "obs" to 2, 3, ..., 10, replaced var1 for observations 2, 3, ..., 10, and then generated a second variable, "var2", and replaced its values for observations 1-10. (Note, we no longer needed to expand "obs" at that point.)

    -  Command line
		1.  We can use the command line as a calculator: type [di]{.ul}splay sqrt(8\*2)
		2. We can add additional commands using the command line. Type: **gen**erate varthree
            1.  Note: in Stata commands, shortcuts are indicated by underlining the minimal number of letters to convey the same meaning: "gen" or "gene" or "gener" or "genera" or "generat" or "generate" are all equivalent, but "ge" is ambiguous, and will therefore not work.
		3. Error: when we generate a new variable, we need to define its values. Let's try again: generate varthree=3
		4. Now open Data Editor again to see the result. We have defined a new variable "varthree" to equal 3, not just for a particular observation, but for every observation. This is the power of the programming approach to data: you can do lots of things at once! (In Excel, there are shortcuts to copy and fill, but nothing this quick.) Most of the time, we won't interact with the spreadsheet directly; we'll just be programming.
		5.  To see this again, close Data Editor and type: replace varthree=2\*var2 if var1\>7. We see that three real changes were made, and if we open the Data Editor again, we can see what that looks like.
		6. What if we meant to type varthree=2\*var2 if var1\>5? We could type over again, or we can push "PgUp" to repeat the previous command (and edit it before hitting return). Pushing this multiple times allows us to repeat earlier commands.

    -  Left and right panels
		1.  On top right-hand side is a list of the variables we have so far: var1, var2, and newvar.
		2. The bottom right-hand side summarizes our data: we have three variables and 10 observations.
		3. (If you ever need to, you can resize these panels by dragging their borders.)
		4. Notice on left-hand side is list of commands we've used so far (red for the ones that returned error codes). Let's highlight the first 26 lines (click on the first, then shift-click on line 26) and push Ctrl+C to copy these. (This creates var1 and var2 and replaces all 10 values of var1 but only the first 5 values of var2.)
		5.  Break. If you send the computer on an impossible task, it may think for a really long time. To get it to stop so you can revise its instructions, click on "Break" (red X button).

4.  Do Files

    -  Click on "New Do File Editor" at the top of the screen (looks like a Word document, with a pencil). This opens a new window, with a text editor.

    -  Type Ctrl+V to paste the command lines that we copied earlier. This becomes a short computer program that, once we execute, will create two variables and replace their values. (In computer programming, a "command" tells the computer to do something. A "script" is a list of commands, to be executed in order. Scripts in Stata are called Do files.)

    -  Note: some programming languages require a semicolon or other punctuation to denote the end of one command and the beginning of the next. "Return" plays that role in Stata, so writing on separate commands on separate lines is sufficient.

    -  Always use a script, not the command line!
		1.  Often, after many steps of manipulating data, you realize that you should have done step 3 differently. In Excel, you might be able to hit "undo" repeatedly (if you haven't saved and closed the program yet), but once you correct step 3, you'll then have to redo all subsequent steps. With a script, you can edit step 3 and recompile in moments.
		2. A script is also useful for collaborators and replicators, as well as yourself when you come back to a project after a long pause. I learned this the hard way: I downloaded data, manipulated it repeatedly using the command line, found results that were really interesting, and copied and pasted them into my research paper. A more urgent project came up, so it was months before I came back to this. When I came back, I did (what I thought were) the same manipulations but got totally different results. I couldn't figure out how to reproduce the results that I had recorded earlier. Maybe I had been making a mistake? Maybe I'm making a mistake now, but was previously correct? If I had a paper trail of all my data manipulations at the time, I could compare my work now and then to see how they differ, and which is more reliable. ...But I don't, and may never publish that paper.
		3. For your data project, you will need to submit your Do file, not just your results.
		4. Related programming tip: Never overwrite your original data set. Use a script to open your original data set, make whatever edits need to made, and then save the revised data as a new data set with a different file name. That way, every time you run your script, it pulls the same original data.

    -  Use comments to keep things neat, organized
		1.\*Comments begin with an asterisk.
		2. /\* Or they can be enclosed (even mid-line) in asterisks and slashes\*/

    -  Save .do file using Save icon.

Data files

5.  Clear

6.  Computer programs are designed to recognize and interpret information, but only in specific formats, specified by file type (e.g. .pdf, .docx, .mp3).

7.  For example, Spreadsheets often saved as .csv ("comma separated values")

    -  year,growth;2021,2%;2020,1%;2019,1.5% can be understood to be a 3x2 table

8.  Excel recognizes .csv or .xlsx, which adds formatting information.

9.  Stata stores data using .dta and stores scripts using .do

10. Example: search Google for "Our World in Data Covid github", download xslx of covid data. Save as FileName (maybe FileName_raw). (If you save in OneDrive, you should be able to access it from other computers.) Good idea to save in its own folder, so that additional files all stay together.

11. Directories

    -  Open file location and Shift-right click to "Copy as path". In Stata .do file, type import delimited "FilePath", clear (with quotation marks around FilePath).
		1.  The "delimited" command lets Stata know it's a .csv file.
		2. Note: "clear" option replaces data in Stata memory, if any (can only hold one dataset at a time).

    -  We'll often be creating multiple files: the original .xlsx or .csv, the converted original .dta, a .do, a final .dta, and possibly intermediate .dta or other files. To keep things organized, it's a good idea to make a directory for each project.

    -  Stata is set to work within a "working directory". From any working directory, you can call a file that has a complete file path name. But you can also set the working directory to be the file you want to work in, and not have to write out the complete file path each time.

    -  To see what directory is the current working directory, type pwd in the command line (for print working directory).

    -  cd command: can change working directory. Then can rewrite earlier import command with shorter file name instead of complete file path.

12. Resave as .dta

    -  export excel Filename_raw.xlsx, replace firstline
		1.  firstline option recognizes first line of data set as labeling variable names.

    -  save Filename_raw.dta

    -  use Filename_raw(.dta), clear

13. Save edited.dta at end of .do file

    -  save FileName_edited.dta, replace

    -  Note: replace option only important when re-running code.

Exploring data

1.  Browse

2.  Describe

3.  Lookfor

4.  Sort

5.  Order

6.  Summarize

    -  Summarize icu_patients_per_million hosp_patients_per_million

    -  Summarize tot\*\[where\* is a place holder for any letter or combination of letters\]

    -  Summarize\*

    -  Doesn't work with strings; notice location isn't summarized.

    -  Summarize, detail gives medians and percentiles

7.  Generate

    -  Generate rich = gdp_per_capita\> 11840.85

8.  Tabulate

    -  tabulate rich

    -  tab continent

9.  Histogram

10. Correlate

11. Scatter

# L5 Stata: Advanced

Covid data:

Histogram

Hist total_deaths_per_million if date=="2021-09-08"

Scatter

Scatter total_deaths_per_million gdp

Regress

regress new_deaths_per_million people_vaccinated_per_hundred if
date==\"2021-09-08\"

Predict

predict predictable_new_deaths if date==\"2021-09-08\"

predict excess_new_deaths if date==\"2021-09-08\", resid

Twoway graphs

graph twoway (scatter new_deaths_per_million
people_vaccinated_per_hundred) (line predictable_new_deaths
people_vaccinated_per_hundred) if date=="2021-09-08"

twoway scatter new_deaths_per_million people_vaccinated_per_hundred\|\|
line predictable_new_deaths people_vaccinated_per_hundred

Collapse

gen US=1 if location=="United States"

gen US_newdeaths_percap = us\*new_deaths_per_million

collapse (mean) new_cases_per_million new_deaths_per_million
new_vaccinations_smoothed_per_mi\[fweight=population\], by(date)

Variable types

help datatypes

destring date, gen(date2)

generate int numdate = date(date,\"YMD\",2021)

Graphs

twoway line us_new_deaths_percap numdate\|\| line
new_deaths_per_million numdate

twoway line new_deaths_per_million numdate\|\| line
new_cases_per_million numdate

graph save filename.gph, replace

Time Series

tsset numdate

gen rising = new_deaths_per_million\> new_deaths_per_million

Log files

log using filename.og, replace

log close

Review stata commands

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

1.  Definition: $P(B) = P(A)$, $P(A) = P(B)$ (equivalent to $P(A\cap B) = P(A)P(B)$)

2.  What is the probability of a person being unemployed? $P(A) = .10$; what if it's raining outside? Then the probability of being unemployed is $P(B) = .10$.

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

# L9 Probability Distributions (WMS 3.1-3)

1.  Events are useful for describing binary/categorical information. Next, we'll consider random variables, which are useful for describing quantitative information.

2.  Random variables

    -  Distribution Function: Number of cars $X$ owned by a family $P(x) = P(X = x) =\begin{cases}.10\ \ if\ x = 0\\.30\ \ if\ x = 1\\.40\ \ if\ x = 2\\.20\ \ if\ x = 3\\0\ \ \text{else}\end{cases}$

    -  Mean (i.e. average) "mu" $\mu$
	 1.  We don't know total population size. If we knew there were $100$ families, $\mu =\frac{1}{100}(0\cdot 10 + 1\cdot 30 + 2\cdot 40 + 3\cdot 20) = 1.7$. If population size $n$ is unknown then $\mu =\frac{1}{n}\lbrack 0(.10n) + 1(.30n) + 2(.40n) + 3(.20n)\rbrack$ but this reduces to ...
	 2. Expected value (or "expectation") $\mu = E(X) = xP(x) = 0(.10) + 1(.30) + 2(.40) + 3(.20) = 1.7$
            1.  Note: if all realizations of $X$ are equally likely then $P(x) =\frac{1}{n}$ for all $x$ so $E(X) = x\frac{1}{n} =\frac{1}{n}x$ reduces to familiar formula\begin{cases}P(A|B)P(B)\\ P(B|A)P(A)\end{cases}

    -  Expected value of functions of $X$
	  1.  Example: expected utility $E\lbrack u(X)\rbrack = E()$)
	  2. Formula: $E\lbrack f(x)\rbrack = f(x)P(x)$
	  3. Example: $E(X^{2}) = 0^{2}(.1) + 1^{2}(.3) + 2^{2}(.4) + 3^{2}(.2) = 3.7$
	  4. Algebra shortcuts
     	  1.  Linear functions, e.g. car maintenance cost $C = 200 + 100X$; average maintenance cost $E(C) = 200(.1) + 300(.3) + 400(.4) + 500(.2) = 370$
     	  
     	  3.    Shortcuts: $E(200 + 100X) = E(200) + E(100X)$
 				$= 200 + 100E(X) = 200 + 100(1.7) = 370$
		     -  Summations: $E(X_{i}) = E(X_{i})$
			 -  Pull out coefficients
			 -  For constant $c$, $E(c) = c$


-  Variance, standard deviation
	1.  Variance $\sigma^{2} = V(X) = E\lbrack(X -\mu)^{2}\rbrack =\lbrack(0 - 1.7)^{2}\rbrack(.1) +\lbrack(1 - 1.7)^{2}\rbrack(.3) +\lbrack(2 - 1.7)^{2}\rbrack(.4) +\lbrack(3 - 1.7)^{2}\rbrack(.2) = .81$
	2. Standard deviation $\sigma=\sqrt{\sigma^2} = \sqrt{.81} = .9$
        1.  Interpretation: by rule of thumb, "most" families own between -.1 and 3.5 cars

        2.  Note: variance, by itself, is difficult to interpret (e.g. units is "cars squared"), but is easier to work with algebraically, because it's technically and average of something, whereas standard deviation is the square root of an average of something.
	3. Simpler formula: $V(X) = E(X^{2}) -\mu^{2} = 3.7 -(1.7)^{2} = .81$
         1.  Show equivalent, as homework problem

         2.  Remember this formula, as we'll use it repeatedly
	4. Algebra shortcuts
        1.  $E(C^{2}) = 200^{2}(.1) + 300^{2}(.3) + 400^{2}(.4) + 500^{2}(.2) = 145,000$ doesn't have any easy algebra shortcut; $V(C) = E(C^{2}) - 370^{2} = 8,100$

        2.  Shortcut: $V(C) = V(200 + 100X) = V(100X) = 100^{2}V(X) = 8,100$

            -  $200$ gets added and subtracted: $V(C) = E\{\lbrack(200 + 100X) - E(200 + 100X)\rbrack^{2}\}$

            -  For constant $c$, $V(c) = 0$

            -  Pull out coefficients,\... but square them! (because Variance is a quadratic function of a random variable)


3.  Practice example: number $Y$ of car accidents $P(Y = y) =\begin{cases}.7\ if\ y = 0\\.2\ if\ y = 1\\.1\ if\ y = 2\\0\ \text{else}\end{cases}$

    -  $\mu = 0(.7) + 1(.2) + 2(.1) = .4$

    -  $E(Y^{2}) = 0^{2}(.7) + 1^{2}(.2) + 2^{2}(.1) = .6$

    -  $V(Y) = E(Y^{2}) -\mu^{2} = .6 -(.4)^{2} = .44$

    -  $\sigma =\approx .663$

    -  Insurance profit $\Pi =\$ 1200 -\$ 2000\cdot Y$
		1.  $E(\Pi) = E(1200 - 2000\cdot Y) = 1200 - 2000E(Y) = 1200 - 2000(.4) =\$ 400$
		2. $V(\Pi) = V(1200 - 2000Y) = 0 +(- 2000)^{2}V(Y) = 4,000,000(.44) = 1,760,000$
		3. $\sigma_{\Pi} = \sqrt{1,760,000} =\$ 1,326$

    -  Review this one more time before attempting your homework!

# L10 Correlation (WMS 3.1-8)
\[Long lecture; use time efficiently\]

1.  Correlation coefficient $\rho\in\lbrack - 1,1\rbrack$

    -  Positive correlation means variables $X$ and $Y$ tend to move in same direction (e.g. temperature $X$ and ice cream sales $Y$)

    -  Negative correlation means variables $X$ and $Y$ tend to move in opposite direction (e.g. frequency of exercise $X$ and body mass index $\text{Y}$)

    -  Magnitude indicates strength of relationship

    -  Independence implies $\rho = 0$

2.  Joint distribution function

    -  Employee hours per week $X$ and hourly wage $Y$

|          | $Y = 10$ | $Y = 15$ |
|----------|----------|----------|
| $X = 20$ | .2       | .1       |
| $X = 30$ | .1       | .2       |
| $X = 40$ | .1       | .3       |
 Illustrate: $P(x,y) = P(X = x\cap Y = y) =\begin{cases}.2\ if (x,y) =(20,10)\\.1\ if\ (x,y) =(20,15)\\.1\ if\ (x,y) =(30,10)\\.2\ if\ (x,y) =(30,15)\\.1\ if\ (x,y) =(40,10)\\.3\ if\ (x,y) =(40,15)\end{cases}$

3.  Marginal distributions

    -  Sum rows or columns: $P(x) =\begin{cases}.3\ if\ x = 20\\.3\ if\ x = 30\\.4\ if\ x = 40\end{cases}$ and $P(y) =\begin{cases}.4\ if\ y = 10\\.6\ if\ y = 15\end{cases}$

    -  Summary statistics (quick recap)
		1.  $\mu_{x} = 20(.3) + 30(.3) + 40(.4) = 31$
		2. $\sigma_{x}\approx 8.3$
            1.  $E(X^{2}) = 20^{2}(.3) + 30^{2}(.3) + 40^{2}(.4) = 1,030$
            2.  $\sigma_{x}^{2} = 1,030 - 31^{2} = 69$
            3.  $\sigma_{x} =\sqrt{69}\approx 8.3$
		3. $\mu_{y} = 10(.4) + 15(.6) = 13$
		4. $\sigma_{y}\approx 2.4$
            1.  $E(Y^{2}) = 10^{2}(.4) + 15^{2}(.6) = 175$

            2.  $\sigma_{y}^{2} = 175 - 13^{2} = 6$

            3.  $\sigma_{y} =\sqrt{6}\approx 2.4$

    -  Independence
		1.  Definition: $P(x,y) = P_{x}(x)P_{y}(y)$ for every $(x,y)$ pair
		2. Not independent here, since $P(20,10) = .20\neq P(20)P(10) = .3\times .4 = .12$

4.  Expectations of functions of $X$ and $Y$

    -  Average weekly payment $E(\text{XY}) =(20\cdot 10)(.20) +(20\cdot 15)(.10) +(30\cdot 10)(.10) +(30\cdot 15)(.20) +(40\cdot 10)(.10) +(40\cdot 15)(.30) = 40 + 30 + 30 + 90 + 40 + 180 = 410$

    -  Can do any function $E\lbrack f(X,Y)\rbrack = f(x,y)P(x,y)$

5.  Correlation

    -  Covariance
 $\sigma_{\text{xy}} = E\lbrack(X -\mu_{x})(Y -\mu_{y})\rbrack$ $=\lbrack(20 - 31)(10 - 13)\rbrack(.20)$ $+\lbrack(20 - 31)(15 - 13)\rbrack(.10)$ $+\lbrack(30 - 31)(10 - 13)\rbrack(.10)$ $+\lbrack(30 - 31)(10 - 15)\rbrack(.20)$ $+\lbrack(40 - 31)(10 - 13)\rbrack(.10)$ $+\lbrack(40 - 31)(15 - 13)\rbrack(.30) = 7$

-  Simpler formula: $\sigma_{\text{xy}} = E(\text{XY}) -\mu_{x}\mu_{y} = 410 -(31)(13) = 7$

-  Correlation $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} =\frac{7}{(8.3)(2.4)}\approx 0.35$
	1.  Positive, but fairly weak (again, not independent)
	2. Later: $\rho^{2}\approx 0.12$ measures % of variation in $Y$ that covaries with $X$


6.  Algebra shortcuts

    -  Covariance of a sum
 $\text{Cov}(X,1200 - 2000Y) = Cov(X,1200) + Cov(X, - 2000Y) = 0 +(- 2000)\sigma_{\text{xy}}$

-  Correlation of a sum
 $\text{Corr}(X,1200 - 2000Y) = -\rho$

-  Variance of a sum
 $V(X + Y) = V(X) + V(Y) + 2Cov(X,Y)$

-  Variance of a larger sum
 $V(X + Y + Z) = V(X) + V(Y) + V(Z) + 2Cov(X,Y) + 2Cov(X,Z) + 2Cov(Y,Z)$ (with 100 variables, $C_{2}^{100}\approx 5000$ $\text{Cov}$ terms)

-  Importance of independent samples


7.  Application: financial diversification

    -  Assume two stocks have same average return $\mu_{x} =\mu_{y} =\mu$ and same standard deviation $\sigma_{x} =\sigma_{y} =\sigma$.

    -  You could buy two shares of $X$, or one share of $X$ and one share of $Y$. Since you are indifferent between $X$ and $Y$, it might seem that you should be indifferent between these two stock portfolios.

    -  However, on your homework, you will prove that $E(2X) = E(X + Y)$ but $V(2X) < V(X + Y)$, as long as $X$ and $Y$ are not perfectly correlated (i.e. $\rho < 1$). In fact, if they are perfectly *negatively* correlated then $V(X + Y) = 0$!

    -  Thus, the common financial advice to "Diversify your portfolio".

8.  Practice\[if time\]: Cell phone use $X$ and number $Y$ of car accidents

|         | $Y = 0$ | $Y = 1$ | $Y = 2$ |
|---------|---------|---------|---------|
| $X = 0$ | .60     | .08     | .02     |
| $X = 1$ | .10     | .12     | .08     |

-  Note: numerical values can be assigned to binary categorical variables, so that notion of correlation is still meaningful.

-  Marginal distribution $P(X = x) =\begin{cases}.70\ if\ x = 0\\.30\ if\ x = 1\end{cases}$, mean $E(X) = .3$, variance $\sigma_{x}^{2} = E(X^{2}) -\mu_{x}^{2} = .3 - {.3}^{2} = \sqrt{.21}$, standard deviation $\sigma_{x} =\approx 0.458$

-  Marginal distribution $P(Y = y) =\begin{cases}.70\ if\ y = 0\\.20\ if\ y = 1\\.10\ if\ y = 2\end{cases}$, mean $E(Y) = .4$, variance $\sigma_{y}^{2} = \sqrt{.44}$, standard deviation $\sigma_{y} =\approx 0.663$

-  Not independent since $P(0,0) = .6\neq P_{x}(0)P_{y}(0) =(.7)(.7) = .49$

-  $E(\text{XY}) =(0)(0)(.60) +(0)(1)(.08) +(0)(2)(.02) +(1)(0)(.10) +(1)(1)(.12) +(1)(2)(.08) = .28$

-  Covariance $\sigma_{\text{xy}} = E(\text{XY}) -\mu_{x}\mu_{y} = .28 -(.3)(.4) = .16$

-  Correlation $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} =\frac{.16}{(.458)(.663)}\approx 0.527$ positive and moderately strong

# L11 Continuous Distributions (WMS 4.1-3)

1.  Continuous random variables

    -  Infinite domain, e.g. sleep hours $x\in\lbrack 6,9\rbrack$

    -  Philosophical view: continuous functions conveniently approximate discrete world, or world is truly infinite but measurement is imprecise

2.  Probability density function (pdf) $f(x)$

    -  Measures relative likelihood of individual $x$ values

    -  Individual $x$ values occur with zero probability (and $\int_7^8f(x) > 1$ is possible); to find probabilities, must take definite integral $P(7 < X < 8) = f(x)\text{dx}$

    -  Density must be non-negative and integrate to one over domain (just like probabilities sum to one)

    -  Example $f(x) = k(- x^{2} + 16x - 60)$; $6\leq x\leq 9$
		1.  Not directly from (finite) data; maybe from calibrated theory
		2. Find $k$
            1.  $1 = \int_6^9f(x)dx = k\lbrack -\frac{1}{3}x^{3} + 8x^{2} - 60x\rbrack_{6}^{9} = k\lbrack (- 243 + 648 - 540) -(- 72 + 288 - 360)\rbrack = 9k$ requires that $k =\frac{1}{9}$

            2.  That is, $f(x) = -\frac{1}{9}x^{2} +\frac{16}{9}x -\frac{60}{9}$; $6\leq x\leq 9$
		3. Mode solves $f^{'}(x) = -\frac{2}{9}kx +\frac{16}{9}k = 0$; solution at $x = 8$
             1.  Note: if $f^{'}(x)$ everywhere positive/negative then maximum is at highest/lowest $x$ in range

             2.  Note: second-order condition $f^{''}(x) = -\frac{2}{9}k\leq 0$ satisfied as long as $k\geq 0$
		4. Probabilities: $P(7\leq x\leq 8) =\frac{1}{9}(- x^{2} + 16x - 60)dx =\ldots =\frac{11}{27}\approx 0.4$

3.  Cumulative distribution function (cdf) $F(x)$

    -  $F(x) = P(X\leq x) =\frac{1}{9}(- {\widetilde{x}}^{2} + 16\widetilde{x} - 60)d\widetilde{x}$
 	$=\lbrack -\frac{1}{27}{\widetilde{x}}^{3} +\frac{8}{9}{\widetilde{x}}^{2} -\frac{20}{3}\widetilde{x}\rbrack_{\widetilde{x} = 6}^{\widetilde{x} = x} = -\frac{1}{27}x^{3} +\frac{8}{9}x^{2} -\frac{20}{3}x + 16$ (This assumes $6\leq x\leq 9$; if $x < 6$ then $F(x) = 0$ and if $x > 9$then $F(x) = 1$)
	-  Percentiles
 Median $F(x) = -\frac{1}{27}x^{3} +\frac{8}{9}x^{2} -\frac{20}{3}x + 16 =\frac{1}{2}$; solving by computer, $x\approx 7.8$ $75^{th}$ percentile $F(x) = -\frac{1}{27}x^{3} +\frac{8}{9}x^{2} -\frac{20}{3}x + 16 = .75\Rightarrow x\approx 8.4$ $95^{th}$ percentile $F(x) = -\frac{1}{27}x^{3} +\frac{8}{9}x^{2} -\frac{20}{3}x + 16 = .90\Rightarrow x\approx 8.7$

	-  Easier probabilities $P(7\leq X\leq 8) = F(8) - F(7)$
 	$=(-\frac{1}{27}8^{3} +\frac{8}{9}8^{2} -\frac{20}{3}8 + 16) -(-\frac{1}{27}7^{3} +\frac{8}{9}7^{2} -\frac{20}{3}7 + 16) =\frac{11}{27}\approx 0.4$

	-  From cdf, get pdf $f(x) = F^{'}(x) = -\frac{1}{9}x^{2} +\frac{16}{9}x -\frac{60}{9}$; $6\leq x\leq 9$, else $f(x) = 0$


4.  Moments

    -  Mean
 $\mu = E(X) =\int\text{xf}(x)\text{dx}$ (just like $E(X) =\sum xP(x)$) $= \int_6^9x\frac{1}{9}(- x^{2} + 16x - 60)\text{dx}$ $=\int_6^9\frac{1}{9}(- x^{3} + 16x^{2} - 60x)dx =\ldots =\frac{31}{4}\approx 7.75$

-  Standard deviation
	1.  $E(X^{2}) = \int_6^9x^{2}f(x)\text{dx}$
 $= \int_6^9x^{2}\frac{1}{9}(- x^{2} + 16x - 60)dx =\int_6^9\frac{1}{9}(- x^{4} + 16x^{3} - 60x^{2})dx =\ldots =\frac{303}{5}$

ii. $V(X) = E(X^{2}) -\mu^{2} =\frac{303}{5} -(\frac{31}{4})^{2} =\frac{43}{80}$

iii. $\sigma_{X} =\sqrt{\frac{43}{80}}\approx 0.73$


-  Note: algebra tricks still work (e.g. lost wages while sleeping)
	1.  $E(\$ 20X) =\$ 20E(X) =\$ 20\cdot 7.75 =\$ 155$
	2. $V(20X) = 20^{2}V(X)$


5.  Practice describing steps to classmate: Warehouse stock (as fraction of capacity) $f(x) = - 2x^{2} + kx +\frac{1}{6};0\leq x\leq 1$

    -  Find $k = 3$

    -  mode $=\frac{3}{4}$

    -  Draw and interpret pdf (upside-down parabola; warehouse full more often than empty)

    -  Find cdf $F(x) = -\frac{2}{3}x^{3} +\frac{3}{2}x^{2} +\frac{1}{6}x;0\leq x\leq 1$

    -  Find $f(x)$ from $F(x)$

    -  $P(\frac{1}{2}\leq X\leq\frac{3}{4}) =\frac{5}{16}$

    -  median $\approx .6$, 75^th^ percentile $\approx .8$

    -  mean $\mu\approx 0.58$
	-  standard deviation $\sigma\approx 0.26$

    -  Insurance payout $\pi =\$ 1,000,000X +\$ 100,000$
		1.  $E(\pi) =\$ 1,000,000\mu +\$ 100,000 =\$ 680,000$ $\sigma_{\pi} = \sqrt{V(\$1,000,000X+\$100,000)} =\$ 1,000,000\sigma_{x} =\$ 260,000$

# L12 Continuous Joint Distributions (WMS 5.1-8)

1.  Joint Density
    -  Compare discrete/continuous pdf and joint pdf
    -  Warehouse stocks up to two pallets of cereal $X$ and one pallet of cereal $Y$, with density $f(x,y) = c(x + 2y);x\in\lbrack 0,2\rbrack,y\in\lbrack 0,1\rbrack$.
    -  Height of joint pdf represents likelihood of particular $(x,y)$ pairs. Must integrate to one (double integral).
    	$1 = \int_{x=0}^{2}\int_{y=0}^1c(x + 2y)dydx = \int_{x=0}^{2}(cx + c)dx = 4c$ requires $c =\frac{1}{4}$,
 or $f(x,y) =\frac{1}{4}x +\frac{1}{2}y;x\in\lbrack 0,2\rbrack,y\in\lbrack 0,1\rbrack$.

-  Mode: since upward sloping in both dimensions, mode at $(x,y) = (2,1)$


2.  Marginal densities

    -  Analogous to margins of table in discrete joint distribution: total probability of particular realization of $x$ is the sum of all joint probabilities of $(x,y)$ pairs, with that particular $x$ value, but any $y$ value in domain.

    -  $f_{x}(x) =\int_{y=0}^{1}\frac{1}{4}(x + 2y)dy =\frac{1}{4}x +\frac{1}{4};x\in\lbrack 0,2\rbrack$

    -  $f_{y}(y) =\int_{x=0}^{2}\frac{1}{4}(x + 2y)dx =\frac{1}{2} + y;y\in\lbrack 0,1\rbrack$

    -  Subscript simply distinguishes $f_{x}(.5)$ from $f_{y}(.5)$

    -  Moments: means, standard deviations
	1.  $\mu_{x} = E(X) = \int_{x=0}^{2}xf_{x}(x)\text{dx}$
 			$= \int_{x=0}^{2}x(\frac{1}{4}x +\frac{1}{4})dx =\frac{2}{3} +\frac{1}{2} =\frac{7}{6}$
	2. $E(X^{2}) = \int_{x=0}^{2}x^{2}f_{x}(x)\text{dx}$
 			$= \int_{x=0}^{2}x^{2}(\frac{1}{4}x +\frac{1}{4})dx = 1 +\frac{2}{3} =\frac{5}{3}$
	3. $V(X) = E(X^{2}) -\mu_{x}^{2} =\frac{5}	{3} -(\frac{7}{6})^{2} =\frac{11}{36}$
	4. $\sigma_{x} = \sqrt{V(X)} =\sqrt{\frac{11}{36}}\approx .55$
	5.  $\mu_{y} = E(Y) = \int_{y=0}^{1}yf_{y}(y)\text{dy}$	
 			$= \int_{y=0}^{1}y(\frac{1}{2} + y)dy =\frac{1}{4} +\frac{1}{3} =\frac{7}{12}$
	6. $E(Y^{2}) = \int_{y=0}^{1}y^{2}f_{y}(y)\text{dy}$
 			$= \int_{y=0}^{1}y^{2}(\frac{1}{2} + y)dy =\frac{1}{6} +\frac{1}{4} =\frac{5}{12}$
	7. $V(Y) = E(Y^{2}) -\mu_{y}^{2} =\frac{5}{12} -(\frac{7}{12})^{2} =\frac{11}{144}$
	8. $\sigma_{y} = \sqrt{Y} =\sqrt{\frac{11}{144}}\approx 0.28$
	9. Could also derive mode, median, cdf, percentiles of $X$ or $Y$


-  Independence requires $f(x,y) = f_{x}(x)f_{y}(y)$ for all $(x,y)$ pairs.
	1.  $X$ and $Y$ not independent here, since $f(x,y) =\frac{1}{4}(x + 2y)\neq(\frac{1}{4}x +\frac{1}{4})(\frac{1}{2} + y)$ (e.g. when $(x,y) = (0,0)$)


3.  Correlation

    -  $E(\text{XY}) =\int_{x=0}^{2}\int_{y=0}^{1}\text{xyf}(x,y)\text{dydx}$
 $=\int_{x=0}^{2}\int_{y=0}^{1}\text{xy}\lbrack\frac{1}{4}(x + 2y)\rbrack dydx =\int_{x=0}^{2}(\frac{1}{8}x^{2} +\frac{1}{6}x)dx =\frac{1}{3} +\frac{1}{3} =\frac{2}{3}$

	-  $\sigma_{\text{xy}} = Cov(X,Y) = E(\text{XY}) -\mu_{x}\mu_{y}$
 $=\frac{2}{3} -(\frac{7}{6})(\frac{7}{12}) = -\frac{1}{72}$

	-  $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} =\frac{-\frac{1}{72}}{(.55)(.28)}\approx - .09$


4.  Practice example: $f(x,y) = c(1 - xy)$ for $x,y\in\lbrack 0,1\rbrack$

    -  Find $c$: $\int_{x=0}^{1}\int_{y=0}^{1}c(1 - xy)dydx =\frac{3}{4}c$ implies $c =\frac{4}{3}$

    -  Find marginal densities $f_{x}$, $f_{y}$: $f_{x}(x) =\int_{y=0}^1\frac{4}{3}(1 - xy)dy =\ldots =\frac{4}{3} -\frac{2}{3}x$ for $x\in\lbrack 0,1\rbrack$; symmetrically, $f_{y}(y) =\frac{4}{3} -\frac{2}{3}y$ for $y\in\lbrack 0,1\rbrack$

    -  Find means $\mu_{x}$ and $\mu_{y}$ and standard deviations $\sigma_{x}$ and $\sigma_{y}$:
 $\mu_{x} = E(X) = \int_{x=0}^1x(\frac{4}{3} -\frac{2}{3}x)dx =\ldots =\frac{4}{9}$ 
 $E(X^{2}) = \int_{x=0}^1x^{2}(\frac{4}{3} -\frac{2}{3}x)dx =\ldots =\frac{5}{18}$ 
 $\sigma_{x}^{2} =\frac{5}{18} -(\frac{4}{9})^{2} =\frac{13}{162}$ 
 $\sigma_{x} =\sqrt{\frac{13}{162}}\approx .283$ 
 Symmetrically, $\mu_{y} =\frac{4}{9}$, $\sigma_{y}\approx .283$

-  Correlation $\rho$:
 	$E(\text{XY}) =\int_{x=0}^1\int_{y=0}^1\text{xy}\frac{4}{3}(1 - xy)dydx =\frac{5}{27}$ $\sigma_{\text{xy}} = E(\text{XY}) -\mu_{x}\mu_{y}\approx\frac{5}{27} -(\frac{4}{9})^{2} = -\frac{1}{81}\approx - .012$ $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} =\frac{-\frac{1}{81}}{\sqrt{\frac{13}{162}}\sqrt{\frac{13}{162}}} = -\frac{2}{13}\approx - 0.154$

# L13 Conditional Distributions (WMS 5.3, 11)

1.  Recall distribution of cell phone use and car accidents:

|         | $Y = 0$ | $Y = 1$ | $Y = 2$ |
|---------|---------|---------|---------|
| $X = 0$ | .60     | .08     | .02     |
| $X = 1$ | .10     | .12     | .08     |

-  Recall $\mu_{x} = .3,\sigma_{x}\approx .458,\mu_{y} = .4,\sigma_{y}\approx .663,\rho\approx .527$


2.  Conditional probability

    -  Cell phone use among those with two accidents $P(X=1|Y = 2) =\frac{.08}{.10} = .80$ versus those with no accidents $P(X=1|Y = 0) =\frac{.10}{.70}\approx 0.14$

    -  Practice: find $P_{y}(0|X = 0) =\frac{.60}{.7}\approx .86$, $P_{y}(1|X = 0) =\frac{.08}{.7} = .11$,$P_{y}(2|X = 0) =\frac{.02}{.7}\approx .03$, $P_{y}(0|X = 1) =\frac{.10}{.3}\approx .33$, $P_{y}(1|X = 1) =\frac{.12}{.3} = .40$, $P_{y}(2|X = 1) =\frac{.08}{.3}\approx .27$

3.  Conditional distribution

    -  $P(y|X = 0)$ and $P(y|X = 1)$ are legitimate distribution functions (numerators sum to denominator)

    -  Plot, and compare with $P(y)$

    -  Conditional mean
	  1.  $E(Y|X = 1) =\sum\text{yP}(X = 1)$ $\approx 0(.33) + 1(.40) + 2(.27) = .94$
	  2. Practice $E(X = 0)\approx 0(.86) + 1(.11) + 2(.03) = .17$
    -  Average number of car accidents is higher for cell phone users than for non-users. This still doesn't imply causation!
    -  Conditional standard deviation
	      1.  Just like $V(Y) = E(Y^{2}) -\lbrack E(Y)\rbrack^{2}$,
 			   $V(Y|X = x) = E(Y^2|X = x) -\lbrack E(Y|X = x)\rbrack^{2}$
		    1. (If time) Example : $E(Y^2|X = 1)$ $\approx 0^{2}(.33) + 1^{2}(.40) + 2^{2}(.27) = 1.21$, so
 In this case, $V(Y|X = 1)\approx 1.21 - {.94}^{2}\approx \sqrt{0.326}$, and $\sigma_{y|X = 1}\approx\approx 0.57$ By a similar derivation, $\sigma_{y|X = 0}\approx 0.41$; cell phone use increases variance.

4.  In an effort to establish causation, could find $P(x,y|Z = z) =\frac{P(x,y,z)}{P_{z}(z)}$ or $f(Z = z) =\frac{f(x,y,z)}{f_{z}(z)}$, and then $\rho_{xy|z} = Corr(X,Y|Z = z)$. For example, find correlation between cell phone use and car accidents *among teenagers*.

5.  Continuous densities

    -  Recall joint density of cereal inventory, $f(x,y) =\frac{1}{4}x +\frac{1}{2}y;x\in\lbrack 0,2\rbrack,y\in\lbrack 0,1\rbrack$

    -  Recall marginal densities $f_{x}(x) =\frac{1}{4}x +\frac{1}{4};x\in\lbrack 0,2\rbrack$ and $f_{y}(y) =\frac{1}{2} + y;y\in\lbrack 0,1\rbrack$, means $\mu_{x} =\frac{7}{6}$, $\mu_{y} =\frac{7}{12}$, standard deviations $\sigma_{x}\approx .55$, $\sigma_{y}\approx 0.28$

    -  Conditional density $f_{x}(x|Y = y) =\frac{f(x,y)}{f_{y}(y)} =\frac{\frac{1}{4}x +\frac{1}{2}y}{\frac{1}{2} + y} =\frac{x + 2y}{2 + 4y};x\in\lbrack 0,2\rbrack$. For example, $f_{x}(x|Y = 0) =\frac{x}{2};x\in\lbrack 0,2\rbrack$

    -  Conditional mean and standard deviation
 $E(X|Y = 0) = x(\frac{x}{2})dx =\lbrack\frac{1}{6}x^{3}\rbrack_{0}^{2} =\frac{8}{6} =\frac{4}{3}$ $E(X^2|Y = 0) = x^{2}f_{x}(0)dx = x^{2}(\frac{x}{2})dx =\lbrack\frac{1}{8}x^{4}\rbrack_{0}^{2} = 2$ $V(X|Y = 0) = E(Y = 0) -\lbrack E(Y = 0)\rbrack^{2} = 2 -(\frac{4}{3})^{2} =\frac{2}{9}$. $\sigma_{x|Y = 0} =$ Thus, when $Y = 0$: density of $X$ is steeper, mean of $X$ is higher, variance is lower.

-  More generically, for arbitrary $y$ value,
 $E(X|Y = y) = \int xf_{x}(x|y)dx = \int_0^2x(\frac{x + 2y}{2 + 4y})\text{dx}$ 
 $=\frac{1}{2 + 4y}\int_0^2(x^{2} + 2xy)dx =\frac{1}{2 + 4y}\lbrack\frac{1}{3}x^{3} + x^{2}y\rbrack_{0}^{2} =\frac{1}{2 + 4y}(\frac{8}{3} + 4y) =\frac{4 + 6y}{3 + 6y}$
 For example, $E(X|y = 0) =\frac{4}{3}$ as before 
 Practice: $E(X|y = 1) =\frac{10}{9}$ 
 $E(X^2|Y = y) = \int x^{2}f_{x}(x|y)\text{dx}$ 
 $= \int_0^2x^{2}(\frac{x + 2y}{2 + 4y})dx =\ldots =\frac{6 + 8y}{3 + 6y}$ 
 $V(X|Y = y) = E(X^2|Y = y) -\lbrack E(X|Y = y)\rbrack^{2}$ 
 $=(\frac{6 + 8y}{3 + 6y}) -(\frac{4 + 6y}{3 + 6y})^{2}$ 
 $\sigma_{x|Y = y} =\sqrt{(\frac{6 + 8y}{3 + 6y}) -(\frac{4 + 6y}{3 + 6y})^{2}}$. For example, $\sigma_{x|Y = 0} = \sqrt{\frac{6}{3}-(\frac{4}{3})^2}=\sqrt{\frac{2}{9}}$ as before, 
 $\sigma_{x|Y = 1} =\sqrt{(\frac{14}{9})-(\frac{10}{9})^2}=\sqrt{\frac{26}{81}}\approx\frac{5}{9}$ Thus, when $Y = 1$, density of $X$ is less steep, mean is lower, variance is higher.

6.  With three variables, can derive joint distribution of $X$ and $Y$ conditional on $Z$

    -  Israel covid data
		1.  When covid Delta variant hit, Israeli hospitals filled up with covid patients. 60% of these patients had already been vaccinated.
		2. Natural (but erroneous) conclusion: vaccines make things worse, not better!
		3. Nearly 80% of Israelis over age 12 were vaccinated against covid, so if "random draw," 80% of hospital patients should have been vaccinated; lower rate means treatment helped.

# L14 Regressions (WMS 5.3, 11)

1.  Regressions

    -  Sir Francis Galton 1886 (cousin of Darwin)

    -  Use data to determine (average) linear relationship $Y =\beta_{0} +\beta_{1}X$. Once relationship is known, we can predict $Y$ for any $X$ value (even out of sample), as if through a crystal ball!

    -  Examples:
		1.  Income $Y$ as function of education $X$
		2. Unemployment $Y$ next year as function of (e.g. fiscal or monetary) policy $X$
		3. Stock price tomorrow $Y$ as function of today's earnings/price $X$
		4. Consultant's "secret formula" predicting sales, etc.

    -  Puts units on correlation ("education and income are strongly correlated" vs. "each year of education is associated with an additional\$4k of income")

    -  Working example: education $\mu_{x} = 15$ years; $\sigma_{x} = 3$ years; income $\mu_{y} =\$ 70,000$; $\sigma_{y} =\$ 20,000$; correlation $\rho = .6$

    -  Any $\beta_{0}$ and $\beta_{1}$ determine line $Y =\beta_{0} +\beta_{1}X$, implying an error term $\varepsilon = Y -\beta_{0} -\beta_{1}X$ such that the data satisfies $Y =\beta_{0} +\beta_{1}X +\varepsilon$. We can choose $\beta_{0}$ and $\beta_{1}$ so that the resulting line is as useful as possible.

    -  "Least squares" regression: choose $\beta_{0}$ and $\beta_{1}$ to minimize $E(\varepsilon^{2})$
		1.  Equivalently, choose $\beta_{0}$ so that $E(\varepsilon) = 0$ and $\beta_{1}$ to minimize $V(\varepsilon)$
		2. Can use other criteria (e.g. least absolute deviation $E(|\varepsilon|)$), but less common

2.  Intercept

    -  If $\beta_{0}$ is high, most $\varepsilon_{i}$ will be negative; if $\beta_{0}$ is low, most $\varepsilon_{i}$ will be positive

    -  $E(\varepsilon) =\mu_{y} -\beta_{0} -\beta_{1}\mu_{x} = 0$ implies that $\beta_{0} =\mu_{y} -\beta_{1}\mu_{x}$.
 Easier: $\mu_{y} =\beta_{0} +\beta_{1}\mu_{x}$, so regression line passes through $(\mu_{x},\mu_{y})$

-  Example: $\beta_{0} =\$ 70,000 -\$ 4,000\cdot 15 =\$ 10,000$


3.  Slope

    -  $V(\varepsilon) = V(Y) + V(-\beta_{1}X) + 2Cov(Y, -\beta_{1}X) =\sigma_{y}^{2} +\beta_{1}^{2}\sigma_{x}^{2} - 2\beta_{1}\sigma_{\text{xy}}$

    -  To minimize, $0 =\frac{\text{dV}(\varepsilon)}{d\beta_{1}} = 2\beta_{1}\sigma_{x}^{2} - 2\sigma_{\text{xy}}$

    -  Solution $\beta_{1} =\frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}}\frac{\sigma_{y}}{\sigma_{x}} =\rho\frac{\sigma_{y}}{\sigma_{x}}$

    -  Slope is simply (normalized) correlation coefficient

    -  Example: $\beta_{1} = .6\frac{\$ 20,000}{3yr.} =\$ 4,000$/yr. (e.g. four-year degree provides extra \$16,000/yr)

    -  Equivalently, $\beta_{1}$ solves $\text{Cov}(X,\varepsilon) = 0$ (see homework)

4.  Predictions

    -  High school grad ($X^{*} = 12$) expects $Y^{*} =\$ 10k +\$ 4k(12) =\$ 58k$

    -  College grad ($X^{*} = 16$) expects $Y^{*} =\$ 10k +\$ 4k(16) =\$ 74k$

    -  Three PhDs ($X^{*} = 31$) expects $Y^{*} =\$ 10k +\$ 4k(31) =\$ 134k$
		1.  This assumes linear trend holds up, constant returns to scale (which may not be reasonable); in econometrics (Econ 388), learn nonlinear regressions

    -  Standardized
		1.  $\frac{Y^{*} -\mu_{y}}{\sigma_{y}} =\rho\frac{X^{*} -\mu_{x}}{\sigma_{x}}$ (since $\beta_{1} =\rho\frac{\sigma_{y}}{\sigma_{x}}$, $\mu_{y} =\beta_{0} +\beta_{1}\mu_{x}$, and $Y^{*} =\beta_{0} +\beta_{1}X^{*}$).
		2. If $X^{*}$ is $1$ or $2$ or $k$ standard deviation above $\mu_{x}$ then $Y^{*}$ is $\rho$ or $2\rho$ or $\text{kρ}$ standard deviations above $\mu_{y}$

    -  Stay in school to get rich?
		1.  Caveat 1: I made these numbers up. Before making important financial decisions, you should collect the true numbers.
		2. Caveat 2: We've modeled this as straight line, implying constant marginal returns to education; if decreasing marginal returns, might be better to use parabola (take Econometrics first).
		3. Caveat 3: Regressions just express correlation, still not causation (despite popular terminology of "dependent" and "independent" variables).
             1.  Maybe causation: school teaches useful skills that generate income.

             2.  Maybe reverse causation: schooling is pure consumption, and wealthy individuals can afford more.

             3.  Maybe spurious correlation: smart kids enjoy school (just as athletes enjoy sports) but would earn high incomes with or without school.
		4. Either way, predict higher incomes for those who do stay in school: going to school increases my prediction of your income, even if it doesn't increase your income.

    -  Reverse predictions
		1.  What if worker makes \$100k income and asks for you to guess education?
		2. Could read regression backward, but it was designed to minimize errors in income not errors in education
		3. Better to start over, with income as $X$ and education as $Y$

5.  Errors

    -  $\varepsilon_{i} = y_{i} -(\beta_{0} +\beta_{1}x_{i})$

    -  De-trend data (e.g. "skill" or "luck", above and beyond education)

    -  Example: who is more genius (or luckier): $(x,y) = (12,\$ 80k)$ or $(x,y) =(16,\$ 100k)$?
		   1.  $\$ 80k -(10 + 4\cdot 12) =\$ 22k$
		   2. $\$ 100k -(10 + 4\cdot 16) =\$ 26k$

    -  Variance $\sigma_{\varepsilon}^{2}$ of error distribution tells us how far people are off the regression line
 $\sigma_{\varepsilon}^{2} = V(Y -\beta_{0} -\beta_{1}X) =\sigma_{y}^{2} +\beta_{1}^{2}\sigma_{x}^{2} - 2\beta_{1}\text{cov}(X,Y)$ $= {20k}^{2} + {4k}^{2}3^{2} - 2(4k)(.6\times 20k\times 3) =(\$ 16k)^{2}$

6.  Explanatory power (%)

    -  Partition $V(Y) =\beta_{1}^{2}V(X) + V(\varepsilon) = 144 + 256$
		1.  Note: $2\beta_{1}\text{Cov}(X,\varepsilon) = 0$ (see homework) because optimal slope extracts all correlation
		2. This decomposes $V(Y)$ into "explained" 144 plus "unexplained" 256 (e.g. talent, luck, or some other mystery). (Warning: terminology sounds like causation, but isn't; more accurately, variation is "related to education" and "unrelated to education".)

    -  "Explained" portion is $\rho^{2}$ fraction of $\sigma_{y}^{2}$
		1.  "Explained" portion is $\frac{144}{400} = .36$
		2. Generically, $\beta_{1}^{2}\sigma_{x}^{2} =(\frac{\sigma_{y}}{\sigma_{x}}\rho)^{2}\sigma_{x}^{2} =\rho^{2}\sigma_{y}^{2}$; thus, "explained" variation is always $\rho^{2}$ (sometimes called "coefficient of determination") fraction of $\sigma_{y}^{2}$. In this case ${.6}^{2} = 36\%$

    -  "Unexplained" portion is $1 -\rho^{2}$
		1.  In this case, $1 - {.6}^{2} = 64\%$, so $\sigma_{\varepsilon}^{2} = .64(\$ 20k)^{2}$

    -  Implicit linearity of $\rho$
		1.  Fundamentally, what does $\rho$ measure?
		2. $X^{2}$ is perfectly predictable from $X$, but linear regression produces $\rho^{2} < 1$
		3. Thus, $\text{corr}(X,X^{2})\neq 1$
		4. $\rho$ fundamentally measures *linear* relationship (see homework)

# Exam 1 Review

1.  Spiritual thought: prayer through life's trials, faith without works is dead, obedience gives confidence

2.  Exam info

    -  Any calculator

    -  No time limit, predict 2-3 hours

    -  Handout provided

    -  Hard: typically C average

3.  Study tips

    -  Take it seriously: equal weight with final exam

    -  Start with study guide

    -  Practice exams (first without solutions, then with)

    -  Extra homework problems (or repeat homework problems)

    -  Time saver: talk through steps, don't work out algebra

4.  Exam strategies

    -  Don't forget to pray!

    -  Extend familiar material to unfamiliar settings (good practice for real world)

    -  Difficulty is similar to homework, but no TAs or books, so fewer A's than homework

    -  Average score is typically C, which averaged with A- homework gives B- overall.

    -  Show work and list what you know for partial credit (e.g. $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}}$, even if you can't figure out $\sigma_{\text{xy}}$)

5.  Key formulas

    -  Binary events
		  1.  $P(E) =\frac{\# E}{\# S}$
		  2. $C_{k}^{n} =\frac{n!}{k!(n - k)!}$
		  3. $P(A\cup B) = P(A) + P(B) - P(A\cap B)$
		  4. Independent events: $P(A\cap B) = P(A)P(B)$ (or $P(B) = P(A)$)
		  5.  $P(B) =\frac{P(A\cap B)}{P(B)}$
		  6. $P(A\cap B) = P(B|A)P(A)$

    -  Random variables
	      1.  Legitimate distribution? $\sum P(x) =\int f(x)dx = 1$
	      2. Mode maximizes $P(x)$ or $f(x)$ (i.e. $f^{'}(x) = 0$ and $f^{''}(x) < 0$)
	      3. $\mu = E(X) =\sum xP(x) =\int xf(x)\text{dx}$
	      4. $E(X^{3}) =\sum x^{3}P(x) =\int x^{3}f(x)\text{dx}$
	      5.  $\sigma^{2} = V(X) = E\lbrack(X -\mu)^{2}\rbrack = E(X^{2}) -\mu^{2}$; $\sigma =\sqrt{V(X)}$
	      6. $F(x) = \int_{-\infty}^xf(\widetilde{x})d\widetilde{x}$, $f(x) = F'(x)$
	      7. $P(a < X < b) = F(b) - F(a)$
	      8. Percentile: solve $F(\phi_{.5}) = .5$
	      9. $f(x) = F'(x)$

    -  Joint distributions
	      1.  Legitimate joint distribution? $\sum\sum P(x,y) =\iint_{}^{}f(x,y)dxdy = 1$
	      2. Marginal distribution
              $P_{x}(x) = P(x,y)$ $f_{x}(x) =\int f(x,y)\text{dy}$
          3. Independent variables
              $P(x,y) = P_{x}(x)P_{y}(y)$ $f(x,y) = f_{x}(x)f_{y}(y)$
		  4. $E(\frac{X}{Y}) =\sum\sum(\frac{x}{y})P(x,y) =\iint_{}^{}(\frac{x}{y})f(x,y)\text{dxdy}$
          5.  $\text{Cov}(X,Y) = E\lbrack(X -\mu_{x})(Y -\mu_{y})\rbrack = E(\text{XY}) -\mu_{x}\mu_{y}$
          6. $\rho =\frac{\text{Cov}(X,Y)}{\sigma_{x}\sigma_{y}}$
          7. Conditional distribution
              $P(X=x|Y = 3) =\frac{P(x,3)}{P_{y}(3)}$ 
			  $f_{x}(x|Y = 3) =\frac{f(x,3)}{f_{y}(3)}$
          8. $E(X|Y = 3) =\sum xP(x|Y = 3) =\int xf(x|Y = 3)\text{dx}$
          9. $V(X|Y = 3) = E(X^2|Y = 3) -\lbrack E(X|Y = 3)\rbrack^{2}$
    -  Regressions
	      1.  $\beta_{1} =\frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} =\rho\frac{\sigma_{y}}{\sigma_{x}}$
	      2. $\beta_{0} =\mu_{y} - b\mu_{x}$
	      3. $\frac{V(a + bX)}{V(Y)} =\rho^{2}$
	      4. $\varepsilon_{i} = Y_{i} -(\beta_{0} +\beta_{1}X_{i})$


6.  Algebra tricks

    -  $E(\$ 100 -\$ 5X) =\$ 100 -\$ 5E(X)$

    -  $V(\$ 100 -\$ 5X +\$ 3Y) = V(\$ 100) + V(-\$ 5X) + V(\$ 3Y) + 2Cov(-\$ 5X,\$ 3Y) = 0 +(\$ 5)^{2}V(X) +(\$ 3)^{2}V(Y) -\$ 30Cov(X,Y)$

    -  $\text{Cov}(\$ 100 -\$ 5X,Y) = Cov(\$ 100,Y) + Cov(-\$ 5,Y) = 0 -\$ 5Cov(X,Y)$

    -  $\text{Corr}(\$ 100 -\$ 5X,Y) = Corr(- X,Y) = - Corr(X,Y)$

7.  Distributional relationships

    -  If $X\sim N$ then $3X\sim N$ and $X + 7\sim N$

    -  If $X_{1},X_{2}\sim N$ then $X_{1} + X_{2}\sim N$

    -  If $Z\sim N(0,1)$ then $Z^{2}\sim\chi^{2}(1)$

    -  If $W_{1}\sim\chi^{2}(3),W_{2}\sim\chi^{2}(5)$ independent then $W_{1} + W_{2}\sim\chi^{2}(8)$ and $\frac{W_{1}/3}{W2/5}\sim F(3,5)$

    -  If $Z\sim N(0,1)$ and $W\sim\chi^{2}(\nu)$ independent then $\frac{Z}{}\sim t(\nu)$

8.  Rejoice in how much we've learned!

# L15 Bernoulli, Uniform, Standard Normal (WMS 4.4-4.5)

Spiritual thought

1.  Dealing with disappointment

    -  In grad school, we took two years of courses, then two qualifying exams. If pass, four years of research; if fail, retake or exit with Masters degree. I prepped hard, but on day of exam, got hung up on one really hard question, lost track of time, didn't finish, and failed!

    -  I benefitted from a friend's experience, who had previously been preparing for graduation (robes, parents in town, etc.), when checked grades: E! Couldn't graduate.
		1.  First reaction: denial. Must be a mistake!
		2. Second reaction: blame. Grading is unfair!
		3. Third reaction: dejection. I'm a failure.
		4. Fourth reaction: hope. *I'm* not a failure, I just failed at this thing. I can move forward productively to the next step. Retook class, found a summer internship that turned out to be career altering.

    -  Scriptures
		1.  Joseph Smith in Liberty jail: "My son, peace be unto they soul; thine adversity and thine afflictions shall be but a small moment; and then, if thou endure it well, God shall exalt thee on high; thou shalt triumph over all thy foes" (D&C 121:7-8).
		2. "Search diligently, pray always, and be believing, and all things shall work together for your good, if ye walk uprightly and remember the covenant wherewith ye have covenanted one with another" (D&C 90:24).
		3. "...All things work together for good for them that love God..." (Romans 8:28).

    -  Midterm exam: If you performed less well than you hoped, press forward with a perfect brightness of hope! Help the Lord make it work toward your good.
		1.  Learn what went wrong (like spelling bee mistakes, may always remember). Final exam not cumulative per se, but does repeat concepts.
		2. Reassess study habits (e.g. understand every step of every question; don't just trust TA or study group).

2.  $X\sim$ Bernoulli($p$) (after Swiss mathematician Jacob Bernoulli, 1713)

    -  Recall cell phone use $P(X = x) =\{.7ifx = 0.3ifx = 1$

    -  Mean $E(X) = 0(.7) + 1(.3) = .3$

    -  Variance $V(X) = E(X^{2}) -\mu^{2} =\lbrack 0^{2}(.7) + 1^{2}(.3)\rbrack - {.3}^{2} = .21 =(.3)(.7)$

    -  Pattern: $E(X) = p$, $V(X) = p(1 - p)$ for "success" parameter $p$

3.  $X\sim $Uniform($a,b$)

    -  $f(x) = k;a\leq x\leq b$

    -  $F(x) =\text{kd}\widetilde{x} =\ldots =\frac{x - a}{b - a};a\leq x\leq b$

    -  $\mu =\text{xf}(x)dx =\ldots =\frac{a + b}{2}$

    -  $\sigma^{2} = x^{2}f(x)dx -\mu^{2} =\ldots =\frac{(b - a)^{2}}{12}$

    -  Example: 90 second stop light
		1.  Average wait time $E(X) = 45$
		2. Standard deviation $\sigma =\approx 26$
		3. Wait less than 30 seconds with probability $F(30) =\frac{30 - 0}{90 - 0} =\frac{1}{3}$


1.  Standard normal $N(0,1)$

    -  $f(z) =\frac{1}{}e^{-\frac{1}{2}z^{2}}$ (integrate using polar coordinates or trig substitutions)

    -  $E(Z) = z\frac{1}{}e^{-\frac{1}{2}z^{2}}dz =\ldots = 0$ (u substitution)

    -  $V(Z) = z^{2}\frac{1}{}e^{-\frac{1}{2}z^{2}}dz - 0^{2} =\ldots = 1$ (integration by parts)

    -  Practice reading Table A
		1.  Excel: NORM.S.DIST(x, cdf?) or NORM.S.INV(percentile)
		2. $P(- 1 < X < 1)\approx .68$
		3. $P(- 2 < X < 2)\approx .95$
		4. $P(- 3 < X < 3)\approx .997$

    -  Symmetric: $P(X < - 3) = P(X > 3)$

# L16 Normal, Chi Square, t Distributions (WMS 4.5-4.6)

1.  Standardization (for later reference)

    -  If $E(X) =\mu$ and $V(X) =\sigma^{2}$ then you can always change units to create a new random variable $Z =\frac{X -\mu}{\sigma}$ such that $E(Z) = 0$ and $V(Z) = 1$
		1.  $E(Z) = E\lbrack\frac{1}{\sigma}(X -\mu)\rbrack =\frac{1}{\sigma}\lbrack E(X) -\mu\rbrack = 0$
		2. $V(Z) = V\lbrack\frac{1}{\sigma}X -\frac{1}{\sigma}\mu\rbrack = V(\frac{1}{\sigma}X) =\frac{1}{\sigma^{2}}V(X) = 1$

2.  Normal (or Gaussian, after German mathematician Carl Friedrich Gauss, 1809) $N(\mu,\sigma^{2})$

    -  $f(x) =\frac{1}{\sigma}e^{-\frac{1}{2}(\frac{x -\mu}{\sigma})^{2}}$ (integrate using polar coordinates or trig substitutions)

    -  $E(X) = x\frac{1}{\sigma}e^{-\frac{1}{2}(\frac{x -\mu}{\sigma})^{2}}dx =\ldots =\mu$ (u substitution)

    -  $V(X) = x^{2}\frac{1}{\sigma}e^{-\frac{1}{2}(\frac{x -\mu}{\sigma})^{2}}dx -\mu^{2} =\ldots =\sigma^{2}$ (integration by parts)

    -  No analytical cdf; instead, approximate numerically
		1.  Excel: NORM.DIST(x, mu, sd, cdf?)
		2. Percentiles: NORM.INV(percentile, mu, sd)

    -  Special Properties
		1.  $N + 7\sim N$
 In other words, adding a constant changes the precise distribution of $X$ but keeps it in the normal family

1.  Note: this is true of some other families of random variables (e.g. uniform) but not all (e.g. Bernoulli, binomial, exponential)


ii. $3N\sim N$
 In other words, multiplying by a constant keeps $X$ in the normal family

1.  Note: this is true of some other families of random variables (e.g. uniform, exponential) but not all (e.g. Bernoulli, binomial)


iii. $N + N\sim N$
 That is, if $X\sim N(\mu_{x},\sigma_{x}^{2})$ and $Y\sim N(\mu_{y},\sigma_{y}^{2})$ then $X + Y\sim N(\mu_{x} +\mu_{y},\sigma_{x}^{2} +\sigma_{y}^{2} + 2\sigma_{\text{xy}})$ In other words, the sum of two normally distributed random variables is a normally distributed random variable

1.  Note: this is true of some other families of random variables (e.g. independent binomials), but not all (e.g. Bernoulli, correlated binomials, uniform, exponential)


3.  Standard normal $N(0,1)$

    -  Practice reading Table A
		1.  Excel: NORM.S.DIST(x, cdf?) or NORM.S.INV(percentile)
		2. $P(- 1 < X < 1)\approx .68$
		3. $P(- 2 < X < 2)\approx .95$
		4. $P(- 3 < X < 3)\approx .997$

    -  Symmetric: $P(X < - 3) = P(X > 3)$

    -  Standardized normal $Z =\frac{X -\mu}{\sigma}$ is standard normal $\sim N(0,1)$ (because of special properties of normal $X$)

    -  Example 1: $X\sim N(75,25)$ to find $P(X > 80) = P(Z >\frac{80 - 75}{})$
 $= P(Z > 1) = 1 - P(Z\leq 1)$ $\approx 1 - .8413 = .1587$

-  Example 2: costs $C\sim N(120,100)$
	1.  Budget $b$ so that $P(C < b) = .9$
	2. $.90 = P(C < b) = P(Z <\frac{b - 120}{10})\approx P(Z < 1.28)$ (from Table A)
	3. If $\frac{b - 120}{10}\approx 1.28$ then $b\approx 132.8$

-  Example 3: costs $C\sim N(120,100)$) and revenue $R\sim N(150,400)$ are independent; how often are profits $Y = R - C$ positive?
	1.  $Y\sim N$
	2. $E(Y) = E(R) - E(C) = 150 - 120 = 30$
	3. $V(Y) = V(R - C) = V(R) +(- 1)^{2}V(C) + 2Cov(R,C) = 400 + 100 = 500$
	4. So $Y\sim N(30,500)$
	5.  $P(Y > 0) = P(Z >\frac{0 - 30}{})\approx P(Z > - 1.34) = P(Z < 1.34)\approx .9099$


4.  $W\sim\chi^{2}(\nu)$ (German statistican Friedrich Robert Helmert, 1875)

    -  Domain is $\lbrack 0,\infty)$, roughly bell-shaped (but asymmetric, unlike Normal distribution)

    -  $\nu$ is often called "degrees of freedom", because in the most common application, it corresponds to how many

    -  $E(W) =\nu$ and $V(W) = 2\nu$

    -  $f(w) = ugly$ (I won't expect you to know or use)

    -  CDF $F(w)$ approximated on Table 6
		1.  $\chi_{\alpha}^{2}$ represents a realization of the random variable, where $\alpha$ is the probability to the right of that value (i.e., $1 - F(w)$)
		2. Example: suppose sales follow Chi-square distribution, with average of 30 units
            1.  Degrees of freedom $\nu = 30$

            2.  10^th^ percentile is $\chi_{.90}^{2}\approx 20.6$, 90^th^ percentile is $\chi_{.10}^{2}\approx 40.3$

            3.  Putting these together, $P(20.6 < W < 40.3)\approx .8$
		3. Note: Table 6 only gives 10 points on the cdf. With a computer, you can get the rest. Excel: CHISQ.DIST(x,df, cdf?), CHISQ.INV(percentile, df)

    -  Facts
		1.  If $Z\sim N(0,1)$ then $Z^{2}\sim\chi^{2}(1)$
		2. If $W_{1}\sim\chi^{2}(4)$ and $W_{2}\sim\chi^{2}(7)$ independent then $W_{1} + W_{2}\sim\chi^{2}(11)$
		3. Variance is a quadratic function of a random variable, so when we estimate the variance of a random variable that has a normal distribution (in lecture L19), our estimates will follow a $\chi^{2}$ distribution.

5.  $t$ distribution (Friedrich Robert Helmert 1876, Karl Pearson 1900)

    -  $T\sim t(\nu)$; as in Chi-square distribution, $\nu$ is called "degrees of freedom"

    -  Similar to standard normal, but with higher variance (i.e. thicker tails)

    -  Approaches $N(0,1)$ as $\nuarrow\infty$

    -  $f(t) = ugly$ (I won't expect you to know or use)

    -  $E(T) = 0$, $V(T) =\frac{\nu}{\nu - 2}arrow 1$

    -  CDF $F(t)$ approximated on Table C
		1.  Table is oriented so that probability $C$ lies between $- t^{*}$ and $t^{*}$.
		2. Example: if $T\sim t(20)$ find 90^th^ percentile
            1.  Following $C = 80\%$ (fifth column) for $df = 20$ leads to $t^{*} = 1.325$.

            2.  In other words, $10\%$ of the distribution is left of $- 1.325$, $80\%$ is between $- 1.325$ and $1.325$, and $10\%$ is above $1.325$.

            3.  Since $10\% + 80\% = 90\%$ of the distribution is below $1.325$ and $10\%$ is above, $1.325$ is the 90^th^ percentile of the distribution.

            4.  Alternatively, can come up from a one-sided p-value of $.10$ or a two-sided p-value of $.20$ (bottom of the table) to reach the same conclusion.
		3. For degrees of freedom greater than $1000$, can read $z^{*}$ row of the table, which corresponds to a standard normal distribution (i.e., $\infty$ degrees of freedom).
		4. Note: Table C only gives 12 points on CDF. With a computer, you can get the rest. Excel: T.DIST(x, df, cdf?) and T.INV(percentile, df)

    -  Fact
		1.  If $Z\sim N(0,1)$ and $W\sim\chi^{2}(\nu)$ independent then $\frac{Z}{}\sim t(\nu)$
		2. If we knew the population variance, then estimates of the mean would follow a normal distribution. Since we have to estimate the population variance, and estimates follow a $\chi^{2}$ distribution, our estimates of the mean follow a $t$ distribution

6.  Other distributions

    -  The distributions we've gone over are some of the most common; there are many others, with various shapes, properties, and uses.

    -  Illustrated: https://www.itl.nist.gov/div898/handbook/eda/section3/eda366.htm

    -  Discrete
		1.  Uniform
		2. Binomial
		3. Geometric
		4. Poisson
		5.  Hypergeometric

    -  Continuous
		1.  Exponential
		2. F
		3. Beta
		4. Gamma
		5.  Log-normal
		6. Pareto
		7. Weibull

# L17 Confidence Intervals (WMS 7.2-3,8.5-9)

Project note

1.  If you didn't turn the project in on time, get it in ASAP! Items from part 2 of the project will show up on homework; if you do them with your homework, your project will be finished by the end of the semester.

2.  From now on, must start on project as part of homework

3.  Keep results, to submit as project

4.  Note: If you have a population instead of a sample from a population (e.g. all 50 states), just pretend this is a sample from a larger population (i.e. 50 draws from a population of thousands of U.S. states).

Samples

1.  Population vs. sample

    -  So far, our discussion of distributions has presumed an entire population. Often, information is only available from a sample.
		1.  Surveys are costly, populations are often huge
		2. Some of you might have whole populations (e.g. all 50 states, all teams, every week of a company's sales data); for projects, pretend sample even if you actually have population. But be careful:
            1.  Sometimes population of interest includes future generations (e.g. NBA rookies, stock returns).

            2.  Similarly, population of things that actually happened can in some cases be viewed as a sample from the larger set of things that potentially could have occurred instead.

    -  Unless entire population is observed, can't know what is true, only what is *probably* true

2.  Random sample

    -  i.i.d. (Independently and Identically Distributed): survey answers are independent from each other, and identical to population of interest

    -  Convenience survey (e.g. urban survey of wages): expand sample or limit scope of inference

    -  Selection bias (e.g. survey participation, program participation): administrative records, measurements before participation decided, interpret results narrowly (e.g. benefit of college for those who chose to attend)

    -  Time trends (e.g. daily/weekly sales) -- rare "spot check" observations, econometric corrections

3.  Estimation

    -  Example: Suppose we wish to estimate the average family size $\mu$ of BYU students, along with the standard deviation $\sigma$ and the correlation $\rho$ between family size and GPA. What pieces of data should be used, and how should they be combined?

    -  Population parameter $\theta$ (i.e. generic proxy for $\mu,\sigma,a,b,\rho,\beta,p$, etc.), seek "estimator" function $\widehat{\theta}(x_{1},x_{2},\ldots,x_{n})$ (commonly denoted by "hat" variable)
		1.  Evaluating this "estimator" function with our data provides *point estimates*; next two lectures we'll talk about interval estimates, or margin of error

    -  An estimator is a tool for producing estimates. We'll spend most of the semester talking about a variety of such tools (i.e. estimators for different parameters) but first we need some tool-building tools (i.e. techniques for developing estimators in new settings of interest).

Estimators vs. estimates

1.  Example: suppose distribution of income among last year's $8,500$ BYU graduates has mean $E(X_{i}) =\mu =\$ 48k$ and standard deviation $=\sigma =\$ 13k$
 But we can't observe this, so we survey $n = 25$ graduates and estimate $\widehat{\mu} =\frac{1}{n}x_{i} =$ and $\widehat{\sigma^{2}} =\frac{1}{n}(x_{i} -)^{2}$

2.  Sampling distribution

    -  Every survey of $25$students yields different estimates $(\widehat{\mu},\widehat{\sigma^{2}})$. Sampling with replacement, there are ${8,500}^{25}\approx 10^{98}$ such samples.
 (Sampling without replacement is more common in practice, and violates i.i.d. but only slightly, as long as population size is large.)

-  Before we conduct interviews, survey responses $X_{1},X_{2},\ldots,X_{n}$ can be viewed as random variables, each drawn from the population of BYU grads


3.  Estimates and estimators

    -  Once we conduct survey, $\widehat{\theta}(x_{1},x_{2},\ldots,x_{n})$ provides *estimate* of parameter $\theta$. Before we conduct survey, *estimator* $\widehat{\theta}(X_{1},X_{2},\ldots,X_{n})$ is random.

    -  To evaluate estimation procedure, we must think about entire *distribution* of estimates (in other words, evaluate estimator), not individual estimate.

    -  Therefore, $\widehat{\mu} =\frac{1}{n}X_{i} =$ is random variable with mean $\mu_{\widehat{\mu}}$ and variance $\sigma_{\widehat{\mu}}^{2}$

    -  Similarly, $\widehat{\sigma^{2}} =\frac{1}{n}(X_{i} -)^{2}$ is random variable with mean $\mu_{\widehat{\sigma^{2}}}$ and variance $\sigma_{\widehat{\sigma^{2}}}^{2}$

Margin of error

1.  Recall that
 $\mu_{} = E(\frac{1}{n}X_{i}) =\ldots =\mu$ $\sigma_{}^{2} = V(\frac{1}{n}X_{i}) =\ldots =\frac{\sigma^{2}}{n}$

2.  Previous estimates are *point* estimates; *margin of error* (e.g. $\pm\$ 20k$) measures precision, gives *interval* estimate

3.  Example

    -  Income $X_{i}$ of 8,500 BYU graduates has unknown mean $\mu$ and known standard deviation $\sigma =\$ 13k$.

    -  If $n = 25$ then $$ has same mean $\mu$, and standard error $\sigma_{} = =\$ 2.6k$

    -  Rule of thumb: $X_{i}$ typically within $\mu\pm 2\sigma$, $$ typically within $\mu\pm 2\sigma_{} =\mu\pm\$ 5.2k$; thus, $\$ 5.2k$ is "margin of error"

    -  Dog and leash principle: 3 ft. leash keeps dog within 3 ft. of owner; symmetrically keeps owner within 3 ft. of dog

    -  Observe $=\$ 47.1k$
 Maybe $\mu$ as low as $\$ 41.9k$ and we overestimated Maybe $\mu$ as high as $\$ 52.3k$ and we underestimated.

4.  If $\sigma$ unknown, can estimate margin of error using $$

Confidence Intervals

1.  How often is $$ in interval $\mu\pm 2\sigma$? To compute probability, we need the cdf of $$.

2.  Normality of $$

    -  If population distribution of $X_{i}$ is normal then $=\frac{1}{n}X_{i}$ is normal too. Specifically, $\sim N(\mu,\frac{\sigma^{2}}{n})$.

    -  Standardizing, $\frac{-\mu}{}\sim N(0,1)$.

Confidence interval for $\mu$

1.  Construction

    -  We *want* $P(\# <\mu <\#)= .90$ and from Table A we *know* $\sim N(\mu,\frac{\sigma^{2}}{n}) = N(\mu,\$ 2.6k^{2})$(still assuming$\sigma =\$ 13k$and$n = 25$)
 $.90 = P(- 1.64 <\frac{-\mu}{\$ 2.6k} < 1.64)$ $= P(- 1.64\cdot\$ 2.6k < -\mu < 1.64\cdot\$ 2.6k)$ $\approx P(- -\$ 4.3k < -\mu < - +\$ 4.3k)$ $= P(+\$ 4.3k >\mu > -\$ 4.3k)$

-  (Can also construct one-sided confidence intervals)

-  Example: $=\$ 47.1k$ (still assume $\sigma =\$ 13k$; later we'll estimate)
	1.  90% confidence interval $\pm 1.64\sigma_{} =\$ 47.1k\pm\$ 4.3k$
	2. 95% confidence interval $\pm 1.96\sigma_{} =\$ 47.1k\pm\$ 5.1k$
	3. 99% confidence interval $\pm 2.58\sigma_{} =\$ 47.1k\pm\$ 6.7k$


2.  Distribution of $S^{2}$

    -  If $X_{i}\sim N(\mu,\sigma^{2})$ and $\sim N(\mu,\frac{\sigma^{2}}{n})$ then $(n - 1)\frac{S^{2}}{\sigma^{2}}\sim\chi^{2}(n - 1)$.

    -  Intuitively, expectation of $\chi^{2}(n - 1)$ is $n - 1$, expectation of $\frac{S^{2}}{\sigma^{2}}$ is $1$.

3.  Confidence interval for $\mu$ when $\sigma$ unknown

    -  If we replace $\sigma^{2}$with $s^{2}$ then $\frac{-\mu}{}\sim t(n - 1)$.
		1.  This is because $\frac{-\mu}{} =\frac{-\mu}{}\cdot\frac{1}{}$, which is $N(0,1)$ divided by $\frac{\chi^{2}(n - 1)}{n - 1}$
		2. Note: if $n$ large then $t(n - 1)\approx N(0,1)$.

    -  Example: average weekly income $n = 25$, $=\$ 47.1k$, $s =\$ 13k$, ${\widehat{\sigma}}_{} = =\$ 2.6k$
		1.  90% confidence interval $\pm 1.726{\widehat{\sigma}}_{} =\$ 47.1k\pm\$ 4.5k$
		2. 95% confidence interval $\pm 2.093{\widehat{\sigma}}_{} =\$ 47.1k\pm\$ 5.4k$
		3. 99% confidence interval $\pm 2.861{\widehat{\sigma}}_{} =\$ 47.1k\pm\$ 7.4k$

Central Limit Theorem (de Moivre 1733, Laplace 1812, Lyapunov 1901)

4.  $X_{i}arrow N$ (and therefore $\rightarrow N$) no matter what the distribution of $X_{i}$

5.  Dice example

    -  Distribution of $X_{1} + X_{2}$ is bell-shaped, even though $X_{i}$ is (discrete) uniform

    -  Intuition: centrist values frequent (e.g. moderate $X_{1}$ and $X_{2}$, or $X_{1}$ low $X_{2}$ high, or vice versa), but extreme values rare (e.g. $X_{1}$ and $X_{2}$ both low)

    -  $P({}_{100} = 1) =(\frac{1}{6})^{100}\approx 10^{- 78}$; tails become *exponentially* less likely (key feature of normal distribution) as $n$ increases

6.  Skewed example

    -  Bernoulli unemployment $P(0,1) =(.7,.3)$

    -  Average of two: $P(0,.5,1)\approx(.5,.4,.1)$

    -  Average of four: $P(0,.25,.5,.75,1)\approx (.2$`<!-- -->`{=html}5,$.4,.25,.1,0)$

7.  CLT explains why normal distribution is so prevalent in nature: one attribute is sum total of many, smaller, independent attributes

# L18 Hypothesis Tests (WMS 10.2-8)

1.  Hypothesis test: old profit $X\sim N({\$ 400,\$ 100}^{2})$, new management; keep or fire?

    -  Null hypothesis (benefit of doubt) $H_{0}:\mu = 400$

    -  Alternative hypothesis (burden of proof) $H_{a}:\mu < 400$

    -  Level $\alpha =P(H_{0}\text{true})= .10$

    -  Test statistic $\frac{-\mu}{}\sim N(0,1)$

    -  Critical value $- 1.28$, rejection region to left

    -  Data: $=\$ 350$ over 8 weeks

    -  If $H_{0}$ true, $\frac{-\mu}{} =\frac{350 - 400}{}\approx - 1.41\in RR$; reject $H_{0}$

    -  "Significantly less than 400" (statistical vs. practical significance)
	1.  Type 1 error: convict innocent (probability $\alpha$)

    -  Type 2 error: acquit guilty (probability $\beta$)

    -  Repeat for $\alpha = .01$; critical value $- 2.33$, fail to reject

    -  P-value = smallest $\alpha$ such that (for this data) reject $H_{0}$; $0.0793$ in this case

    -  Practice: Reject if $\alpha = .05$?

2.  Variations

    -  $H_{a}:\mu < 380$ (expect and tolerate adjustment cost\$20 for new); test statistic increases to $- .85$, p-value increases to $0.20$. (At $\alpha = .10$ level,\$350 is *significantly* less than\$400, but not significantly less than\$380)

    -  $H_{a}:\mu > 450$; if still $\alpha = .10$ then critical value $+ 1.28$; test statistic negative, so (really) fail to reject

    -  What if $\sigma^{2}$ unknown, and $s^{2} = 100^{2}$ instead? Use t-distribution with 7 degrees of freedom; critical value if $\alpha = .10$ is $1.415$; reject null hypothesis. (p-value not on chart, but by computer is $0.1007$)

    -  $H_{a}:\mu\neq 400$; critical values at $\pm 1.645$, now fail to reject; p-value $2(.079) = 0.158$

3.  Relationship to confidence intervals

    -  In two-sided $\alpha = .05$ level hypothesis test, reject if $|\frac{- 400}{\sigma_{}}| > 1.645$. In other words, if $$ more than $1.645\sigma_{}$ units from 400.

    -  Two-sided 95% confidence interval consists of $\pm 1.645\sigma_{}$

    -  In other words, $.05$ level hypothesis test merely asks whether $400$ lies inside the 95% confidence interval.

# L19 Bias and Consistency (WMS 7.2-7.4, 9.1-9.3)

\[What if you used median to estimate mean, say in income distribution?
Biased.\]

Properties of estimators

1.  Evaluating $\widehat{\theta}$ amounts to evaluating distribution of $\widehat{\theta}(X_{1},X_{2},\ldots,X_{n})$ relative to true unknown value $\theta$

2.  Though $\theta$ is unknown, we know how $\widehat{\theta}$ relates to $X_{i}$ and how $X_{i}$ relates to $\theta$, so can know (probabilistically) how $\widehat{\theta}$ relates to $\theta$

3.  We'll use this to evaluate estimator goodness and to define *margin of error*/*interval estimates*, and do *hypothesis test*

4.  Moments of $\widehat{\mu} =$

    -  $\mu_{\widehat{\mu}} = E(\widehat{\mu}) = E() = E(\frac{1}{n}X_{i}) =\frac{1}{n}E(X_{i}) =\frac{1}{n}\text{nE}(X_{i}) = E(X_{i}) =\mu$
 Thus, thought we don't know what $\mu$ is, we know that average realization of $$ and average realization of $X_{i}$ are same

-  $\sigma_{\widehat{\mu}}^{2} = V(\widehat{\mu}) = V() = V(\frac{1}{n}X_{i}) =\frac{1}{n^{2}}V(X_{i}) =\frac{1}{n^{2}}\text{nV}(X_{i}) =\frac{\sigma^{2}}{n}$
 Variance of $$ is much smaller than variance of $X_{i}$

-  Standard error (i.e. standard deviation of estimator) $\sigma_{} = =\frac{\sigma}{}$
	1.  In population ($n = 1$), incomes typically between $\$ 48k\pm\$ 26k$ $\lbrack\$ 22k,\$ 74k$\]
	2. For $n = 25$, sample average $$ typically between $\$ 48k\pm\$ 5.2k$ $\lbrack\$ 43k,\$ 53k\rbrack$
	3. For $n = 100$, sample average $$ typically between $\$ 48k\pm\$ 2.6k$ $\lbrack\$ 44k,\$ 51k\rbrack$
	4. For $n = 10,000$, $$ typically between $\$ 48k\pm\$ 0.26k$ $\lbrack\$ 47.7,\$ 48.3k\rbrack$

Consistency

1.  Best imaginable case: $\widehat{\theta}$ degenerate with $E(\widehat{\theta}) =\theta$ and $V(\widehat{\theta}) = 0$

2.  As $narrow\infty$, $\widehat{\theta}$ approaches ideal distribution

    -  That is, $E(\widehat{\theta})arrow\theta$ and $V(\widehat{\theta})arrow 0$
 Put differently, ${\widehat{\theta}}_{n}arrow\theta$ ("in probability")

3.  Example: $\widehat{\mu} =$ is consistent estimator of $\mu$

    -  $E(\widehat{\mu}) =\mu$ for all $n$

    -  $V(\widehat{\mu}) =\frac{\sigma^{2}}{n}arrow 0$

4.  Law of large numbers (Jacob Bernoulli, 1713)

    -  Sample means converge to population means

    -  Higher order moments
		1.  $E(\frac{1}{n}X_{i}^{3}) = E(X_{i}^{3})$
		2. $V(\frac{1}{n}X_{i}^{3}) =\frac{V(X_{i}^{3})}{n}arrow 0$
		3. Sample moments converge to population moments (justification for MOM)

5.  Fact: continuous functions of consistent estimators are consistent

6.  Fact: MLE are always consistent

Bias

1.  Bias $B(\widehat{\theta}) = E(\widehat{\theta} -\theta) = E(\widehat{\theta}) -\theta$

2.  On average, does $\widehat{\theta}$ produces estimates that are higher or lower than $\theta$?

3.  Unbiased estimator: $E(\widehat{\theta}) =\theta$

4.  $$ is *unbiased* estimator of $\mu$ because $E() =\mu$

5.  Example of biased estimation procedure: sample max from uniform distribution

6.  When bias can be measured, can sometimes correct (target analogy)

(Relative) Efficiency

5.  Given two estimators, the one with lower variance is more efficient.

6.  An estimator cannot be efficient, per se, but only more efficient than another estimator. In some cases in Econ 388, however, it is possible to prove categorically that a particular unbiased estimator is more efficient than any other unbiased estimator.

7.  Example: consider throwing out one observation, computing sample average of $n - 1$ observations

    -  $E(\widetilde{\mu}) =\mu$ still

    -  $V(\widetilde{\mu}) =\ldots =\frac{\sigma^{2}}{n - 1}$

    -  Still unbiased, still consistent, but less efficient than using all available data

Sample Variance

1.  ${\widehat{\sigma}}_{\text{MOM}}^{2}$ is biased

    -  ${\widehat{\sigma}}_{\text{MOM}}^{2} =\frac{1}{n}(X_{i} -)^{2} =\ldots =\frac{1}{n}X_{i}^{2} - {}^{2}$

    -  $E({\widehat{\sigma}}_{\text{MOM}}^{2}) =\frac{1}{n}E(X_{i}^{2}) - E({}^{2})$
 $=\frac{1}{n}(\mu^{2} +\sigma^{2}) -(\mu^{2} +\frac{\sigma^{2}}{n})$ (since $\sigma^{2} = V(X_{i}) = E(X_{i}^{2}) -\mu^{2}$ and $\frac{\sigma^{2}}{n} = V() = E({}^{2}) -\mu^{2}$) $=\mu^{2} +\sigma^{2} -\mu^{2} -\frac{\sigma^{2}}{n} =\sigma^{2} -\frac{\sigma^{2}}{n} =\frac{n - 1}{n}\sigma^{2}$

-  $B({\widehat{\sigma}}_{\text{MOM}}^{2}) =\frac{n - 1}{n}\sigma^{2} -\sigma^{2} = -\frac{1}{n}\sigma^{2}$

-  Still consistent: $B({\widehat{\sigma}}_{\text{MOM}}^{2})arrow 0$ (and can show that $V({\widehat{\sigma}}_{\text{MOM}}^{2})arrow 0$)


2.  "Sample variance" $S^{2} =\frac{1}{n - 1}(X_{i} -)^{2}$

    -  To eliminates bias: $E(\frac{n}{n - 1}{\widehat{\sigma}}_{\text{MOM}}^{2}) =\frac{n}{n - 1}E({\widehat{\sigma}}_{\text{MOM}}^{2}) =\frac{n}{n - 1}\frac{n - 1}{n}\sigma^{2} =\sigma^{2}$

    -  So if $S^{2} =\frac{n}{n - 1}{\widehat{\sigma}}_{\text{MOM}}^{2} =\frac{1}{n - 1}(X_{i} -)^{2}$then $B(S^{2}) = 0$
		1.  Example: sample of $n = 4$ student wages, $x_{i} =\$ 11,\$ 10,\$ 14,\$ 15$, $=\$ 13.50$, ${\widehat{\sigma}}_{\text{MOM}} = =\approx\$ 2.29$
 $s = =\approx\$ 2.65$

ii. Excel: use VAR.S or STDEV.S, not =VAR.P or =STDEV.P


-  Correcting bias actually sacrifices some efficiency

# L20 Difference in Means, Proportions (WMS 8.3-8,10.3)

1.\[Long lecture; use time efficiently.\]

2.  Difference in means

    -  Relating quantitative and binary variables: conditional distributions, conditional means $E(X = 0)$, $E(X = 1)$

    -  Wages gap between men and women:
 $n_{w} = 40$, ${{}_{w} =\$ 32,\sigma_{w} =\$ 13,n}_{m} = 45$, ${}_{m} =\$ 35$, $\sigma_{m} =\$ 15$.

-  95% confidence intervals for men $\lbrack\$ 30.62,\$ 39.38\rbrack$ and women $\lbrack\$ 27.97,\$ 36.03\rbrack$ overlap, making it difficult to tell true size of wage gap (if any)

-  Trick (used a lot in more advanced settings): combine into single parameter
 $\theta =(\mu_{m} -\mu_{w})$; MOM estimator $\widehat{\theta} =({}_{m} - {}_{w})$

-  $E(\widehat{\theta}) = E({}_{m} - {}_{w}) = E({}_{m}) - E({}_{w}) =\mu_{m} -\mu_{w} =\theta$; unbiased!

ii. $V(\widehat{\theta}) = V({}_{m} - {}_{w}) =\frac{\sigma_{m}^{2}}{n_{m}} +(- 1)^{2}\frac{\sigma_{w}^{2}}{n_{w}}arrow 0$; consistent (as long as both sample sizes grow large)!

iii. ${}_{m}\sim N(\mu_{m},\frac{\sigma_{m}^{2}}{n_{m}})$ and ${}_{w}\sim N(\mu_{w},\frac{\sigma_{w}^{2}}{n_{w}})$, so...

iv. ${}_{m} - {}_{w}\sim N(\mu_{m} -\mu_{w},\frac{\sigma_{m}^{2}}{n_{m}} +\frac{\sigma_{w}^{2}}{n_{w}})$
 Standardizing, $\frac{\widehat{\theta} -\mu_{\widehat{\theta}}}{\sigma_{\widehat{\theta}}} =\frac{({}_{m} - {}_{w}) -(\mu_{m} -\mu_{w})}{}\sim N(0,1)$

v.  Note: if estimate $s_{A}^{2}$ and $s_{B}^{2}$ then $\frac{({}_{m} - {}_{w}) -(\mu_{m} -\mu_{w})}{}\sim t(df =\frac{(\frac{s_{m}^{2}}{n_{m}} +\frac{s_{w}^{2}}{n_{w}})^{2}}{\frac{(\frac{s_{m}^{2}}{n_{m}})^{2}}{n_{m} - 1} +\frac{(\frac{s_{w}^{2}}{n_{w}})^{2}}{n_{w} - 1}})$
    1.  (e.g. If $s_{m} =\$ 12$ and $s_{w} =\$ 10$ then $df\approx 83$)

    2.  For this class, just use $t(\text{df})\approx N(0,1)$, which is appropriate when $n_{m}$ and $n_{w}$ are both large

    3.  (df between minimum and sum of $(n_{m} - 1)$ and $(n_{w} - 1)$)


-  Margin of error: $\pm 2 = 2(\$ 1.98) =\$ 3.96$

-  95% confidence interval for $(\mu_{m} -\mu_{w})$: $({}_{m} - {}_{w})\pm 1.96 =\lbrack\$ 0.11,\$ 7.89\rbrack$

-  Test $\mu_{m} -\mu_{w} > 0$: test statistic $\frac{({}_{m} - {}_{w}) -(\mu_{m} -\mu_{w})}{} =\frac{4 - 0}{} = 2.02$; p-value 0.0217

-  Test $\mu_{m} -\mu_{w}\neq 0$: p-value $2\cdot 0.0217 = 0.0434$

-  Test $\mu_{m} -\mu_{w} >\$ 2$: test statistic $\frac{({}_{m} - {}_{w}) -(\mu_{m} -\mu_{w})}{} =\frac{4 - 2}{} = 1.01$; p-value 0.1562

-  Note: if we estimated $\mu_{w} -\mu_{m}$ instead of $\mu_{m} -\mu_{w}$, rejection region would be on left instead of right, and test statistics would be negative instead of positive, but produce same p-values


3.  Binary data (i.e. Bernoulli($p$))

    -  Intuitive estimator: proportion $\widehat{p} =\frac{Y}{n}$, where $Y$ =\# of 1's in data
		1.  Example: election survey, $n = 100$, $\widehat{p} =\frac{52}{100} = .52$

    -  MOM estimator: ${\widehat{p}}_{\text{MOM}} =$; actually same, since $Y = X_{i}$ (for zeros and ones, adding is the same as counting)

    -  Since $Y\sim Bin(n,p)$,
 $E(\widehat{p}) = E(\frac{Y}{n}) =\frac{1}{n}E(Y) =\frac{\text{np}}{n} = p$; unbiased! $V(\widehat{p}) =\frac{1}{n^{2}}V(Y) =\frac{\text{np}(1 - p)}{n^{2}} =\frac{p(1 - p)}{n}arrow 0$; consistent!

-  By Central Limit Theorem, $\widehat{p} =arrow N(p,\frac{p(1 - p)}{n})\Rightarrow\frac{\widehat{p} - p}{}arrow N(0,1)$
 Note: this is not actually different from $\frac{-\mu}{}$; just special case with $=\widehat{p}$, $\mu = p$, and $\sigma^{2} = p(1 - p)$ Note: does not follow $t$ distribution for small $n$, because $X_{i}$ not normal

-  Example: election survey, $n = 100$, $\widehat{p} =\frac{52}{100} = .52$
	1.  Margin of error: $2\approx 2 = 2\approx 2(.05) = 0.1$
	2. 95% Confidence interval $\approx\widehat{p}\pm 1.96 = .52\pm 1.96(.05) =\lbrack.422,.618\rbrack$
	3. Test $H_{0}:p = 5$ against $H_{a}:p > 5$: test statistic $\frac{\widehat{p} - p}{} =\frac{.52 - .5}{} = 0.40$; p-value 0.3446


4.  Difference in proportions: unemployment in U.S. and France (2% difference?)

    -  $n_{F} = 1000$, $\widehat{p} =\frac{109}{1000} = .109$; $n_{\text{US}} = 500$, ${\widehat{p}}_{\text{US}} =\frac{38}{500} = .076$

    -  95% confidence intervals $\lbrack .090,.128\rbrack\lbrack.053,.099$\]

    -  Estimate $(p_{F} - p_{\text{US}})$ with MOM estimator $({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}})$
		1.  $E({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) = E({\widehat{p}}_{F}) - E({\widehat{p}}_{\text{US}}) = p_{F} - p_{\text{US}}$; unbiased!
		2. $V({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) = V({\widehat{p}}_{F}) + V({\widehat{p}}_{\text{US}}) =\frac{p_{F}(1 - p_{F})}{n_{F}} +\frac{p_{\text{US}}(1 - p_{\text{US}})}{n_{\text{US}}}arrow 0$; consistent!
		3. $\frac{({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) -(p_{F} - p_{\text{US}})}{}\sim N(0,1)$

    -  95% Confidence interval $({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}})\pm 1.96 =\lbrack.003,.063\rbrack$

    -  Test $(p_{F} - p_{\text{US}}) > 0$, test statistic $\frac{({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) - 0}{}\approx 2.14$; p-value .0162

    -  Test $(p_{F} - p_{\text{US}}) > .02$, test statistic $\frac{({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) - .02}{}\approx 0.84$; p-value .2005

# L21 Variance Estimation (WMS 8.9,10.9)

Review

1.  ${\widehat{\sigma}}_{\text{MOM}}^{2} =\frac{1}{n}(x_{i} -)^{2}$

2.  $S^{2} =\frac{1}{n - 1}(x_{i} -)^{2}$

Variance estimation

1.  Applications: inequality/heterogeneity, quality control, estimation error

2.  $(n - 1)\frac{S^{2}}{\sigma^{2}}\sim\chi^{2}(n - 1)$

3.  Sample variance: $(n - 1)\frac{S^{2}}{\sigma^{2}}\sim\chi^{2}(n - 1)$

    -  Intuition 1: $X_{i}\sim N(\mu,\sigma^{2})$, so $(\frac{X_{i} -\mu}{\sigma})^{2}\sim\chi^{2}(1)$; $(\frac{X_{i} -\mu}{\sigma})^{2}\sim\chi^{2}(n)$; we lose one degree of freedom because we're measuring deviations from $$ rather than deviations from $\mu$

    -  Intuition 2: a single observation conveys information about $\mu$ but not $\sigma^{2}$, so if $n = 100$ then we have 100 pieces of information about $\mu$ but only 99 pieces of information about $\sigma^{2}$

    -  Intuition 3: $E(S^{2}) =\sigma^{2}$, so $E\lbrack(n - 1)\frac{S^{2}}{\sigma^{2}}\rbrack = n - 1$

    -\[Skip\] Formal derivation: $(\frac{X_{i} -\mu}{\sigma})^{2} =(\frac{(X_{i} -) +(-\mu)}{\sigma})^{2}$
 $=(\frac{X_{i} -}{\sigma})^{2} +(\frac{-\mu}{\sigma})^{2} + 2\frac{(X_{i} -)(-\mu)}{\sigma^{2}}$

$=(n - 1)\frac{S^{2}}{\sigma^{2}} +\frac{n(-\mu)^{2}}{\sigma^{2}} + 2\frac{(-\mu)}{\sigma^{2}}(X_{i} -)$

$=(n - 1)\frac{S^{2}}{\sigma^{2}} +\frac{-\mu}{} + 2\frac{(-\mu)}{\sigma^{2}}(n - n)$

$\sim\chi^{2}(n - 1) +\chi^{2}(1) + 0$

-  Recall that, in estimating $\mu$, using $\frac{-\mu}{}$ instead of $\frac{-\mu}{}$ required the use of a t distribution instead of a normal. This is because it can be shown that $Z =\frac{-\mu}{}\sim N(0,1)$ and $W =(n - 1)\frac{S^{2}}{\sigma^{2}}\text{igmaheuseofatdistributioninsteadofanormal.ThisisbecausecouldpotentiallyhaveressionsthatIhavereceived}\sim\chi^{2}(n - 1)$ are independent, implying that $\frac{-\mu}{} =\frac{-\mu}{}\frac{1}{} =\frac{Z}{}\sim t(n - 1)$.


4.  Example: variance among $n = 71$ sales representatives is $s^{2} = {5.3}^{2}$

    -  Confidence interval
		1.  Seek $.95 = Pr(\# <\sigma <\#)$ and know $(n - 1)\frac{S^{2}}{\sigma^{2}}\sim\chi^{2}(70)$, so from Table 6,
		2. $P(48.76 <(n - 1)\frac{S^{2}}{\sigma^{2}} < 95.02)=P(\frac{1}{48.76} >\frac{\sigma^{2}}{(n - 1)s^{2}} >\frac{1}{95.02})$
 $=P(\frac{(n - 1)s^{2}}{48.76} >\sigma^{2} >\frac{(n - 1)s^{2}}{95.02})=P(>\sigma >)$ $=P(6.35 >\sigma > 4.55)$

-  Hypothesis test
	1.  $H_{a}:\sigma^{2} > 4^{2}$, $\alpha = .05$
	2. Critical value $90.53$
	3. Test statistic $(n - 1)\frac{S^{2}}{\sigma^{2}} = 70(\frac{{5.3}^{2}}{4^{2}}) = 122.9$, reject $H_{0}$ (from Excel, p-value is $10^{- 5}$)

# L22 Regression Estimation (WMS 11.1-3)

1.  Recall from Lecture 9

    -  Relationship between $X$ and $Y$ can be represented by $\rho = corr(X,Y)$ or by regression line $Y =\beta_{0} +\beta_{1}X +\varepsilon$

    -  $E(\varepsilon) = 0$ can be guaranteed by choosing intercept to solve $\mu_{y} =\beta_{0} +\beta_{1}\mu_{x}$

    -  Crystal ball: can predict $Y^{*} =\beta_{0} +\beta_{1}x^{*}$ for any $x^{*}$ value (even out of sample)

    -  $\sigma_{\varepsilon}^{2}$ can be minimized by choosing slope coefficient $\beta_{1} =\frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} =\rho\frac{\sigma_{y}}{\sigma_{x}}$

    -  Fraction of variation in $Y$ associated with $X$ is $\frac{V(\beta_{0} +\beta_{1}X)}{V(Y)} =\frac{\beta_{1}^{2}\sigma_{x}^{2}}{\sigma_{y}^{2}} =\frac{(\rho^{2}\frac{\sigma_{y}^{2}}{\sigma_{x}^{2}})\sigma_{x}^{2}}{\sigma_{y}^{2}} =\rho^{2}$

2.  Estimation

    -  $s_{x}^{2} =\frac{1}{n - 1}(x_{i} -)^{2}$

    -  $s_{\text{xy}} =\frac{1}{n - 1}(x_{i} -)(y_{i} -)$

    -  $r =\frac{s_{\text{xy}}}{s_{x}s_{y}}$

    -  $\widehat{\rho^{2}} = r^{2}$

    -  ${\widehat{\beta}}_{1} =\frac{s_{\text{xy}}}{s_{x}^{2}} = r\frac{s_{y}}{s_{x}} =\frac{(x_{i} -)(y_{i} -)}{(x_{i} -)^{2}}$

    -  ${\widehat{\beta}}_{0} = - b_{1}$

    -  Income predictions ${\widehat{y}}_{i} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$

    -  Individual errors ${\widehat{\varepsilon}}_{i} = y_{i} - {\widehat{y}}_{i}$
	1.  $s_{\varepsilon}^{2} =\frac{1}{n - 2}{\widehat{\varepsilon}}_{i}^{2}$

3.  Can also use "sums of squares", rather than variance (i.e. "total" not "average" deviations)

    -  Let $S_{\text{xx}} =(x_{i} -)^{2}$

    -  Let $S_{\text{xy}} =(x_{i} -)(y_{i} -)$

    -  With this notation, ${\widehat{\beta}}_{1} =\frac{s_{\text{xy}}}{s_{x}^{2}} =\frac{S_{\text{xy}}}{S_{\text{xx}}}$

    -  Let $S_{\text{εε}} = {\widehat{\varepsilon}}_{i}^{2}$

4.  Example : Regress Income $y$ (in\$ thousands) on Education $x$ (in years)

| $x_{i}$ | $x_{i} -$            | $y_{i}$ | $y_{i} -$              | $(x_{i} -)(y_{i} -)$ | ${\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$ | ${\widehat{\varepsilon}}_{i}$ |
|---------|----------------------|---------|------------------------|------------------------------------------------|------------------------------------------------------|-------------------------------|
| $11$    | $- 4$                | $40$    | $- 30$                 | 120                                            | 37.2                                                 | 2.8                           |
| $16$    | $1$                  | $80$    | $10$                   | 10                                             | 78.2                                                 | 1.8                           |
| $16$    | $1$                  | $70$    | $0$                    | 0                                              | 78.2                                                 | -8.2                          |
| $14$    | $- 1$                | $60$    | $- 10$                 | 10                                             | 61.8                                                 | -1.8                          |
| $18$    | $3$                  | $100$   | $30$                   | 90                                             | 94.6                                                 | 5.4                           |
| $= 15$  | $S_{\text{xx}} = 28$ | $= 70$  | $S_{\text{yy}} = 2000$ | $S_{\text{xy}} = 230$                          |                                                      | $= 0$                         |
|         | $s_{x}^{2} = 7$      |         | $s_{y}^{2} = 500$      | $s_{\text{xy}} = 57.5$                         |                                                      | $S_{\text{εε}} = 111$         |
|         | $s_{x}\approx 2.6$  |         | $s_{y}\approx 22.4$   | $r\approx 0.97$                               |                                                      | $s_{\varepsilon}^{2} = 37$    |
|         |                      |         |                        | $r^{2}\approx 0.94$                           |                                                      | $s_{\varepsilon} = 6.1$       |
|         |                      |         |                        | ${\widehat{\beta}}_{1}\approx 8.2$            |                                                      |                               |
|         |                      |         |                        | ${\widehat{\beta}}_{0}\approx - 53$           |                                                      |                               |

-  We'll use this example again in subsequent lecture

-  Predictions
	1.  High school graduate ${\widehat{y}}_{x^{*} = 12}^{*} = - 53 + 8.2(12) = 45.4$
	2. College graduate ${\widehat{y}}_{x^{*} = 16}^{*} = - 53 + 8.2(16) = 78.2$
	3. PhD graduate ${\widehat{y}}_{x^{*} = 20}^{*} = - 53 + 8.2(20) = 111$

-  Estimated errors
	1.  Predict income ${\widehat{y}}_{i}$ for each individual in sample
	2. ${\widehat{\varepsilon}}_{i} = y_{i} - {\widehat{y}}_{i}$
        1.  Individual
	3. $S_{\text{εε}} = {\widehat{\varepsilon}}_{i}^{2} = 111$
         1.  Alternatively, $\sigma_{\varepsilon}^{2} =(1 -\rho^{2})\sigma_{y}^{2}$, so $SSE =(1 - r^{2})S_{\text{yy}}\approx(1 - .9446)(2000) = 111$ (useful if only know summary statistics for $X$ and $Y$).
	4. $s_{\varepsilon}^{2} =\frac{1}{n - 2}SSE = 37$, $s_{\varepsilon} =\approx 6.1$

-  Illustrate with Excel: Data\>Data Analysis\>Regression, using education & income data above


5.  Preliminaries

    -  Algebra trick 1: It can be shown that $(x_{i} -) = 0$
 $= x_{i} - = n - n = 0$ Similarly, $(Y_{i} -) = 0$

-  Algebra trick 2: It can be shown that
 $S_{\text{xx}} =(x_{i} -)^{2} =(x_{i} -)(x_{i} -) =(x_{i} -)x_{i}$ $=(x_{i} -)x_{i} -(x_{i} -)$ $=(x_{i} -)x_{i} -(x_{i} -)$ $=(x_{i} -)x_{i}$ Similarly, $S_{\text{xy}} =(x_{i} -)Y_{i}$ and ${\widehat{\beta}}_{1} =\frac{S_{\text{xy}}}{S_{\text{xx}}} =\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{i}$

-  Deterministic $x_{i}$
	1.  You can think of $X_{i}$ and $Y_{i}$ as being random (i.e. they depend on who you interview), and this is what we did when we derived the population regression parameters. But for simplicity, assume in the estimation that $X_{i} = x_{i}$ are known. That is, we are only considering various samples of $n$ individuals who have the same education levels as the people we sampled today (and incomes that potentially differ from the people we interviewed).
	2. If an estimator is unbiased conditional on these $x_{i}$'s, it is also unbiased unconditionally. For example, if $E(X_{1} = x_{1},X_{2} = x_{2},\ldots,X_{n} = x_{n}) =\beta_{1}$ for every sample of $x$'s then, averaging across all such samples, $E({\widehat{\beta}}_{1}) =\beta_{1}$ as well.
	3. $Y_{i}$ is still random because $Y_{i} =\beta_{0} +\beta_{1}x_{i} +\varepsilon_{i}$ and $\varepsilon_{i}$ is random.

# L23 Regression Inference (WMS 11.4-9)

Introduction

1.  Long lecture (use time efficiently)

2.  We've derived estimators ${\widehat{\beta}}_{1}$, ${\widehat{\beta}}_{0}$, ${\widehat{Y}}^{*}$, but so far all we have are point estimates. Are these good estimators (i.e. unbiased and consistent)? What are the margins of errors? To get confidence intervals or do hypothesis tests, we need to know their distributions.

3.  Estimator distributions: if $\varepsilon_{i}\sim N(0,\sigma_{\varepsilon}^{2})$ (which is plausible, by Central Limit Theorem, if each error term is viewed as the sum total of a lot of smaller, independent factors) then

    -  $Y_{i} =\beta_{0} +\beta_{1}x_{i} +\varepsilon_{i}\sim N$

    -  $=\frac{1}{n}Y_{i}\sim N$

    -  ${\widehat{\beta}}_{1} =\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{i}\sim N$

    -  ${\widehat{\beta}}_{0} = - {\widehat{\beta}}_{1}\sim N$

    -  ${\widehat{Y}}^{*} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x^{*}\sim N$

    -  $Y - {\widehat{Y}}^{*}\sim N$

    -  Estimation error ${\widehat{\varepsilon}}_{i} = Y_{i} - {\widehat{Y}}_{i}\sim N$

    -  $\frac{(n - 2)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}}\sim\chi^{2}(n - 2)$ (essentially because estimating ${\widehat{\varepsilon}}_{i}$ requires estimating two parameters ${\widehat{\beta}}_{0}$ and ${\widehat{\beta}}_{1}$, leaving only $n - 2$ pieces of information)
	1.  Could compare $s_{\varepsilon}^{2}$ from two regressions to see which better explains $Y$, using $F$ distribution

Slope estimator

1.  It can be shown that $E({\widehat{\beta}}_{1}) =\beta_{1};unbiased!$
 $E({\widehat{\beta}}_{1}) = E\lbrack\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{i}\rbrack =\frac{1}{S_{\text{xx}}}(x_{i} -)\lbrack\beta_{0} +\beta_{1}x_{i} + E(\varepsilon_{i})\rbrack$ $=\frac{1}{S_{\text{xx}}}\lbrack 0\beta_{0} +\beta_{1}(x_{i} -)x_{i}\rbrack =\frac{S_{\text{xx}}}{S_{\text{xx}}}\beta_{1} =\beta_{1}$

2.  $V({\widehat{\beta}}_{1}) = V\lbrack\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{i}\rbrack =\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} =\frac{\sigma_{\varepsilon}^{2}}{(n - 1)s_{x}^{2}}arrow 0$; consistent ☺!
 $=\frac{1}{{S_{\text{xx}}}^{2}}V\lbrack(x_{i} -)Y_{i}\rbrack =\frac{1}{{S_{\text{xx}}}^{2}}\lbrack(x_{i} -)^{2}V(Y_{i}) + 0\rbrack$ $=\frac{1}{{S_{\text{xx}}}^{2}}(x_{i} -)^{2}(0 + 0 +\sigma_{\varepsilon}^{2}) =\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} =\frac{\sigma_{\varepsilon}^{2}}{(n - 1)s_{x}^{2}}$ Note: most noisy when incomes more varied (conditional on education); least noisy when education more varied ($s_{x}^{2}$ in denominator)

3.  $\frac{{\widehat{\beta}}_{1} -\beta_{1}}{}\sim N(0,1)$; therefore, $\frac{{\widehat{\beta}}_{1} -\beta_{1}}{}\sim t(n - 2)$

4.  Example

    -  From previous lecture, $n = 5$, $s_{\varepsilon}^{2} = 37$, $S_{\text{xx}} = 28$

    -  95% Confidence interval: $\$ 8.2k\pm 3.182 =\lbrack\$ 4.5k,\$ 11.9k\rbrack$

    -  Hypothesis Test $H_{a}:\beta_{1} >\$ 5k$ at $\alpha = .05$ level
		1.  Critical value 2.353
		2. Test statistic $\frac{8.2 - 5}{}\approx 2.78$; reject $H_{0}$

Intercept estimator

1.  It can be shown that $E({\widehat{\beta}}_{0}) =\ldots =\beta_{0}$; unbiased ☺!
 It can be shown that $V({\widehat{\beta}}_{0}) =\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{{}^{2}}{(n - 1)s_{x}^{2}})arrow 0$; consistent ☺!

-\[For those curious,
 $E({\widehat{\beta}}_{0}) = E(\frac{1}{n}Y_{i} - {\widehat{\beta}}_{1}) =\frac{1}{n}\lbrack\beta_{0} +\beta_{1}x_{i} + E(\varepsilon_{i})\rbrack - E({\widehat{\beta}}_{1})$ $=\frac{n\beta_{0}}{n} +\beta_{1}\frac{1}{n}x_{i} -\beta_{1} =\beta_{0}$ $V({\widehat{\beta}}_{0}) = V(- {\widehat{\beta}}_{1})$ $= V() + {}^{2}V({\widehat{\beta}}_{1}) - 2\text{Cov}(,{\widehat{\beta}}_{1})$ $=\frac{\sigma_{\varepsilon}^{2}}{n} + {}^{2}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} - 0 =\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{{}^{2}}{(n - 1)s_{x}^{2}})arrow 0$ Note: $C(,{\widehat{\beta}}_{1}) = 0$ because... $C(\frac{1}{n}Y_{i},\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{j}) =\frac{1}{nS_{\text{xx}}}C(Y_{i},(x_{i} -)Y_{j})$ $=\frac{1}{nS_{\text{xx}}}\lbrack(x_{i} -)C(Y_{i},Y_{i}) +(x_{i} -)C(Y_{i},Y_{j})\rbrack$ $=\frac{1}{nS_{\text{xx}}}\lbrack(x_{i} -)V(Y_{i}) +(x_{i} -)0\rbrack$ $=\frac{1}{nS_{\text{xx}}}\lbrack\sigma_{y}^{2}(x_{i} -)\rbrack$ $=\frac{\sigma_{y}^{2}}{nS_{\text{xx}}}\lbrack 0\rbrack$\]

2.  Note two pieces: small error in identifying $(\mu_{x},\mu_{y})$ and larger error in identifying slope (which matters more when ${}^{2}$ high).

3.  $\frac{{\widehat{\beta}}_{0} -\beta_{0}}{}\sim N(0,1)$; therefore, $\frac{{\widehat{\beta}}_{0} -\beta_{0}}{}\sim t(n - 2)$

Prediction estimator

1.  $\widehat{(\beta_{0} +\beta_{1}x_{i})} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$

2.  $E(\widehat{\beta_{0} +\beta_{1}x_{i}}) = E({\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}) =\beta_{0} +\beta_{1}x_{i}$; unbiased ☺!

3.  $V(\widehat{\beta_{0} +\beta_{1}x_{i}}) =\ldots =\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{(x_{i} -)^{2}}{S_{\text{xx}}})arrow 0$; consistent ☺!
\[$V(\widehat{\beta_{0} +\beta_{1}x_{i}}) = V({\widehat{\beta}}_{0}) + x_{i}^{2}V({\widehat{\beta}}_{1}) + 2Cov({\widehat{\beta}}_{0},{\widehat{\beta}}_{1}x_{i})$ $=\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{{}^{2}}{S_{\text{xx}}}) + {(x_{i})}^{2}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} - 2x_{i}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$ (since $\text{Cov}({\widehat{\beta}}_{0},{\widehat{\beta}}_{1}) = Cov(- {\widehat{\beta}}_{1},{\widehat{\beta}}_{1}) = 0 -\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$) $=\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{(x_{i} -)^{2}}{S_{\text{xx}}}) =\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{(x_{i} -)^{2}}{S_{\text{xx}}})$\] Note: most precise close to $$; can still make predictions far away from $$, but more noisy

4.  $\frac{\widehat{(\beta_{0} +\beta_{1}x_{i})} -(\beta_{0} +\beta_{1}x_{i})}{}\sim N(0,1)$
 $\frac{\widehat{(\beta_{0} +\beta_{1}x_{i})} -(\beta_{0} +\beta_{1}x_{i})}{}\sim t(n - 2)$

Error variance

1.  $\frac{(4)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}}\sim\chi^{2}(4)$, $s_{\varepsilon} = 6.1$

2.  95% confidence interval for $\sigma_{\varepsilon}$

    -  $.95 = P(.48 <\frac{(4)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}} < 11.14) = P(>\sigma_{\varepsilon} >) = P(17.6 >\sigma_{\varepsilon} > 3.6)$

3.  Test $H_{a}:\sigma_{\varepsilon}^{2} > 4^{2}$ at $\alpha = .05$ level

    -  Critical value 9.49 (from Table 6)

    -  Test statistic $\frac{4\cdot 37}{4^{2}} = 9.25$; not significant

4.  If you had two regressions and wanted to know which has better predictive power (i.e. lower residual error variance) you could compare $\sigma_{\text{εA}}^{2}$ and $\sigma_{\text{εB}}^{2}$ using F distribution

# Review

1.  Thanks for a great semester!

2.  Thanks TAs!

3.  Recommend Econ 388: regression with multiple variables

    -  We're on the brink of knowledge explosion

    -  Also Econ 210 for exploring careers in Economics

    -  For advanced statistics/econometrics, recommend linear algebra (Math 213)

4.  Student project findings

    -  Wide variety of projects

    -  Value of statistics for consumers, not just producers

5.  Key concepts

    -  We've seen several trees, now let's notice the forest

    -  Pre-midterm, we discussed population distributions (discrete or continuous), including moments such as mean, variance, and covariance.

    -  From sample, we seek to estimate population parameter: $\mu$, $\sigma$, $p$, $\rho$, $\mu_{1} -\mu_{2}$, $p_{1} - p_{2}$, $\frac{\sigma_{1}^{2}}{\sigma_{2}^{2}}$, $\beta_{0}$, $\beta_{1}$, $y^{*} =\beta_{0} +\beta_{1}x^{*}$, or $\theta$ from another distribution function (e.g. $a$, $b$ from uniform, $\theta$ from exponential), including distributions we haven't encountered yet (e.g. $p$ from geometric, $\lambda$ from Poisson, $\beta_{2}$ from quadratic regression)

    -  Deriving estimators: MOM and ML

    -  Properties of estimators: bias, efficiency, consistency

    -  Margin of error, confidence intervals, hypothesis tests

    -  Matrix algebra
		1.  This class has focused on the correlation $\rho$ between two variables, which also underlies linear regression line: slope coefficient $\rho\frac{\sigma_{y}}{\sigma_{x}}$ and coefficient of determination $\rho^{2}$
		2. Matrix algebra allows us to generalize everything to multiple variables (e.g. $\beta =(X^{'}X)^{- 1}X^{'}y$ instead of $\beta =\frac{x_{i}y_{i}}{x_{i}^{2}}$
		3. Individual slope coefficient $\beta_{1}$ then reflects *partial* correlation between education and income, holding experience, age, race, gender, etc. fixed.
		4. Controlling for more variable makes stronger case for correlation as causation

6.  Deriving estimator distributions

    -  Estimators depend on $X_{1},X_{2},\ldots,X_{n}$, and so are random variables with distributions

    -  $E() = E(\frac{1}{n}X_{i}) =\frac{1}{n}E(X_{i}) =\frac{1}{n}(\text{nμ}) =\mu$

    -  $V() = V(\frac{1}{n}X_{i}) =\frac{1}{n^{2}}V(X_{i}) =\frac{1}{n}(n\sigma^{2}) =\frac{\sigma^{2}}{n}$

    -  Distribution $\sim N(\mu,\frac{\sigma^{2}}{n})$ or $\frac{-\mu}{}\sim N(0,1)$ (by normality of $X_{i}$ or Central Limit Theorem)

    -  CLT also implies that $\frac{\widehat{p} - p}{}\sim N(0,1)$

    -  Difference estimators $\frac{({}_{1} - {}_{2}) - (\mu_{1} -\mu_{2})}{}\sim N(0,1)$ and $\frac{\widehat{p} - p}{}\approx N(0,1)$

    -  $X_{i}$ normal implies $(n - 1)\frac{\text{S}^{2}}{\sigma^{2}}\sim\chi^{2}(n - 1)$
 and therefore $\frac{s_{A}^{2}/\sigma_{A}^{2}}{s_{B}^{2}/\sigma_{B}^{2}}\sim F(n_{A} - 1,n_{B} - 1)$ and $\frac{-\mu}{}\sim t(n - 1)$

-  Similarly, $E({\widehat{\beta}}_{1}) =\ldots =\beta_{1}$, $V({\widehat{\beta}}_{1}) =\ldots =\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$
 and $\varepsilon_{i}$ normal implies that ${\widehat{\beta}}_{1}\sim N(\beta_{1},\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}})$ or $\frac{{\widehat{\beta}}_{1} -\beta_{1}}{}\sim N(0,1)$

-  $(n - 2)\frac{S_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}}\sim\chi(n - 2)$, implying that $\frac{{\widehat{\beta}}_{1} -\beta_{1}}{}\sim t(n - 2)$


7.  Matrix algebra True/False question tip

    -  Check simple cases (e.g. $1\times 1$, $2\times 2$), but not special cases

    -  Example: "All symmetric matrices are idempotent"
		1.  Try simple example: not special matrix like identity matrix or $(1111)$, but something with no special properties other than symmetry, such as $(1332)$ (and show that $(1332)(1332) =(109913)\neq(1332)$)
		2. Can also try really simple examples, such as scalar matrices: $(5)(5)\neq(5)$.

    -  T/F questions are not "trick" questions, but be careful. In real world, much of statistics is simply a matter of careful attention to details, and knowing exactly which inferences are legitimate under exactly which circumstances.

8.  Example problems

    -  Confidence interval for ${\widehat{Y}}^{*}$

    -  Hypothesis test for ${\widehat{p}}_{1} - {\widehat{p}}_{2}$
