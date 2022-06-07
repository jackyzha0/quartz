title: Econ 378 Lecture Notes  
  Joseph McMurray

# L0 Introduction

1.  Opening Prayer

2.  About me

    1.  Raised in Salt Lake City, mission in Seoul Korea, Economics
        > major at BYU, met my wife at BYU, PhD at University of
        > Rochester, research in political economics (also teach Econ
        > 477), 4 kids, sincerely believe in the Gospel of Jesus Christ
        > and the mission of BYU.

    2.  I enjoy teaching Econ 378 because the material is so useful for
        > students, which is rewarding. It is also hard, so making it
        > interesting and easy is a fun challenge.

3.  Data analysis in Economics

    1.  Scientific method: observe patterns, theorize, test theories,
        > policy implications, policy calibration

    2.  Theory: Econ 110, 380-382, 400+

    3.  Evidence: Econ 378, 388, 400+, Research, internships, jobs (big
        > data industrial transition)

    4.  Economics is *both* (recommend Econ 210 for exploring careers in
        > Economics, also MATH 213/215 linear algebra)

4.  Probability and statistics

    1.  Often care about population but observe only sample.

> Can’t know what’s true, but can know what’s *probably* true

1.  Probability is the language of uncertainty

2.  Probability theory also useful in theoretical models of
    > risk/uncertainty (e.g. insurance, investments, search, asymmetric
    > information)

```{=html}
<!-- -->
```
1.  Syllabus

    1.  Materials, participation, homework, exams, project

    2.  How to choose a research topic

    3.  Finish part 1 (data collection) on time! After the midterm,
        > homework will include data analysis from your own projects.

# L1 Math Preview

1.  Spiritual thought: like Joseph in Egypt, your time at BYU is 7 years
    > of plenty (spiritual abundance). Likely less so when you go to
    > graduate school or workforce. Store up all you can now (e.g.
    > devotionals, religion classes, student ward, ministering), like
    > wise virgins with oil lamps, to sustain you as you “go forth to
    > serve”

2.  In a similar (but temporal) way, this lecture and HW 1 seek to fill
    > your “math lamps” in preparation for the rest of the semester.

3.  Factorials

    1.  $5! = 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1$

    2.  $0! = 1$

4.  Exponents

    1.  $e \approx 2.7$ denotes growth

        1.  \$1 invested at 100% interest, compound annually, equals \$2
            > a year later

        2.  \$1 invested at 100% interest, compound continuously, equals
            > \$2.72 a year later

| Expression                 | Simplified / Rewritten |
|----------------------------|------------------------|
| $x^{- 1}$                  | $1/x$                  |
| $x^{1/2}$                  | $\sqrt(x)$                     |
| $x^{0}$                    | $1$                    |
| $x^{2}x^{3}$               | $x^{5}$                |
| $\left( x^{2} \right)^{3}$ | $x^{6}$                |
| $e^{x}e^{y}$               | $e^{x + y}$            |
| $e^{x}/e^{y}$              | $e^{x - y}$            |
| $e^{x + y}$                | $e^{x}e^{y}$           |
| $e^{x - y}$                | $e^{x}/e^{y}$          |

1.  Logarithms

    1.  $100 = 2$ (How many powers of $10$ give you $100$?)

        1.  $\log\log\ \left( .01 \right)\  = - 2$

    2.  $\ln\ln\ \left( 100 \right)\  \approx 4.6$ (How many powers of
        > $e \approx 2.7$ give you $100$?)

        1.  $\ln\ln\ \left( .01 \right)\  = - 4.6$

    3.  Logs makes huge numbers smaller, miniscule numbers (e.g.
        > probabilities) bigger

    4.  Inverse of exponents

        1.  $\ln\ln\ \left( e^{5} \right)\  = 5$ (How many powers of $e$
            > does it take to reach $e^{5}$?)

        2.  $e^{\ln\ln\ \left( 5 \right)\ } = 5$ (It takes
            > $\ln\ln\ \left( 5 \right)\ $ powers of $e$ to make $5$;
            > what if we take $e$ to that many powers?)

<table>
<thead>
<tr class="header">
<th>Expression</th>
<th>Simplified / Rewritten</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><span class="math inline">ln ln  (xy) </span></td>
<td><span class="math inline">ln ln  (<em>x</em>)  + ln ln  (<em>y</em>) </span></td>
</tr>
<tr class="even">
<td><span class="math inline">$\ln\ln\ \left( \frac{x}{y} \right)\ $</span></td>
<td><span class="math inline">ln ln  (<em>x</em>)  − ln ln  (<em>y</em>) </span></td>
</tr>
<tr class="odd">
<td><span class="math inline">ln (2<em>x</em>)</span></td>
<td><p><span class="math inline"> ≠ 2<em>l</em><em>n</em>(<em>x</em>)</span></p>
<p><span class="math inline"> ≠ ln ln  (2) ln ln  (<em>x</em>) </span></p>
<p><span class="math inline"> = ln ln  (2)  + ln ln  (<em>x</em>) </span></p></td>
</tr>
<tr class="even">
<td><span class="math inline">ln ln  (<em>x</em><sup>2</sup>) </span></td>
<td><span class="math inline">2<em>l</em><em>n</em>(<em>x</em>)</span></td>
</tr>
<tr class="odd">
<td><span class="math inline"><em>l</em><em>n</em>(<em>x</em> + <em>y</em>)</span></td>
<td>Can’t simplify</td>
</tr>
<tr class="even">
<td><span class="math inline">ln ln  (<em>x</em>)  + ln ln  (<em>y</em>) </span></td>
<td><span class="math inline">ln ln  (xy) </span></td>
</tr>
<tr class="odd">
<td><span class="math inline">ln ln  (<em>x</em>)  − ln ln  (<em>y</em>) </span></td>
<td><span class="math inline">$\ln\ln\ \left( \frac{x}{y} \right)\ $</span></td>
</tr>
<tr class="even">
<td><span class="math inline">2<em>l</em><em>n</em>(<em>x</em>)</span></td>
<td><span class="math inline">ln ln  (<em>x</em><sup>2</sup>) </span></td>
</tr>
</tbody>
</table>

1.  Summation

    1.  $k^{2} = 1^{2} + 2^{2} + 3^{2} + 4^{2} + 5^{2} = 55$

    2.  Column of $n = 500$ observations can be denoted by $x_{i}$, with
        > $i = 1,\ldots,n$

    3.  $\frac{1}{n}x_{i}$ denotes the average

    4.  $3x_{i} = 3x_{i}$

    5.  $(x_{i} + y_{i}) = x_{i} + y_{i}$

    6.  $\left( x_{i} + 3 \right) = x_{i} + 3 = x_{i} + 3n$

    7.  Does $(x_{i}y_{i}) = x_{i}y_{i}$? No!

        1.  e.g. $2 \cdot 3 + 5 \cdot 4 \neq (2 + 5)(3 + 4)$

2.  Derivatives

    1.  Intuition: limit of slope

    2.  Finding maximum/minimum

        1.  First-order condition: $f^{'}\left( x \right) = 0$

        2.  Second-order condition: $f^{''}\left( x \right)$ negative
            > for max (slope is decreasing, function makes a frown),
            > positive for min (slope is increasing, function makes a
            > smile)

    3.  Simple derivatives

| $f\left( x \right)$ | $f^{'}\left( x \right)$                      |
|---------------------|----------------------------------------------|
| $x^{3}$             | $3x^{2}$                                     |
| $4x$                | $4$                                          |
| $4$                 | $0$                                          |
| $\frac{1}{x}$       | $- \frac{1}{x^{2}}$                          |
| $$                  | $\frac{1}{2}x^{- \frac{1}{2}} = \frac{1}{2}$ |
| $e^{x}$             | $e^{x}$                                      |
| $ln(x)$             | $\frac{1}{x}$                                |

1.  Product rule:
    > $\frac{d}{\text{dx}}\left\lbrack f\left( x \right)g\left( x \right) \right\rbrack = f^{'}\left( x \right)g\left( x \right) + f\left( x \right)g'(x)$

    1.  $\frac{d}{\text{dx}}x^{2}\ln\ln\ \left( x \right)\  = 2x\ln\ln\ \left( x \right)\  + x^{2}\left( \frac{1}{x} \right)$

    2.  Same pattern for products of 100 terms

2.  Chain rule:
    > $\frac{d}{\text{dx}}f\left( g\left( x \right) \right) = f^{'}\left( g\left( x \right) \right)g^{'}\left( x \right) = \frac{\text{df}}{\text{dg}}\frac{\text{dg}}{\text{dx}}$

    1.  Example:
        > $\frac{d}{\text{dx}}\ln\ln\ \left( x^{2} - 3x + 1 \right)\  = \frac{1}{x^{2} - 3x + 1} \cdot (2x - 3)$

    2.  Example: $\frac{d}{\text{dx}}e^{- 3x^{2}} = e^{- 3x^{2}}( - 6x)$

    3.  Same pattern for longer chains

3.  \[The Quotient rule is useful as well, but I won’t require it
    > here.\]

```{=html}
<!-- -->
```
1.  Integrals

    1.  Intuition

        1.  “sum”/area under $f$ (negative if $f < 0$)

        2.  Anti-derivative: add up $f'(x)dx$ to get
            > $f\left( b \right) - f(a)$

| $f(x)$            | Anti-derivative of $f\left( x \right)$ |
|-------------------|----------------------------------------|
| $x^{2}$           | $\frac{1}{3}x^{3}$                     |
| $4$               | $4x$                                   |
| $\frac{1}{x^{2}}$ | $- \frac{1}{x}$                        |
| $$                | $\frac{2}{3}x^{\frac{3}{2}}$           |
| $e^{x}$           | $e^{x}$                                |
| $x(x - 1)$        | $\frac{1}{3}x^{3} - \frac{1}{2}x^{2}$  |

1.  Definite integral
    > $x^{2}dx = \left\lbrack \frac{1}{3}x^{3} \right\rbrack_{x = 4}^{7}$

> $= \frac{1}{3}\left( 7 \right)^{3} - \frac{1}{3}\left( 4 \right)^{3} = \frac{343}{3} - \frac{64}{3} = 93$

1.  $x^{2}dx = \frac{64}{3} - \frac{343}{3} = - 93$

```{=html}
<!-- -->
```
1.  Useful techniques that I won’t cover (or expect you to know)

    1.  $u$-substitution (chain rule in reverse)

    2.  Integration by Parts (product rule in reverse)

2.  Double Integrals

    1.  Simple: inside integral then outside integral

$x^{2}ydxdy = \left\lbrack \frac{y}{3}x^{3} \right\rbrack_{x = 0}^{x = 2}dy = \frac{8}{3}ydy = \ldots = \frac{32}{3}$

1.  Note: for rectangular bounds (i.e. bounds of $x$ don’t depend on
    > $y$, and vice versa), can integrate in reverse order

$x^{2}ydydx = \left\lbrack \frac{1}{2}x^{2}y^{2} \right\rbrack_{y = 1}^{y = 3}dx = 4x^{2}dx = \ldots = \frac{32}{3}$

1.  Practice $\frac{x}{y}\text{dxdy}$

# L2 Statistics preview

Introduction

1.  We recently revised the Econ 378 curriculum. Formerly, we started
    > with basic theory and the basic tools based on it, introduced
    > complex theory with complex tools, then more complex theory and
    > more complex tools. This seemed reasonable, but I realized: “Still
    > to this day, I’ve never learned to build a car, but even without
    > knowing how to build one, I managed to learn to drive one.”

2.  Now: learn basic, complex, and more complex tools upfront. Then go
    > learn the underlying theory.

Spreadsheets

1.  Unit of observation

2.  Quantitative variables

3.  Binary variables

    1.  Categorical variables as binary (or “dummy”) variables

Data Visualization

1.  Single variables

    1.  Binary variables: Pie charts

    2.  Quantitative variables: Histograms

2.  Interactions

    1.  Two binary variables: Double pie charts

    2.  Binary and quantitative: bar chart

    3.  Two quantitative: scatter chart

        1.  Quantitative & time: line graph

    4.  Three variables

        1.  Two binary & quantitative: clustered bar chart

        2.  Two quantitative & binary: color-coded scatter chart

        3.  Three quantitative: bubble chart

Summary statistics

1.  Proportions

2.  Mean

    1.  From histogram, eyeball center of gravity

3.  Median/percentiles

4.  Mode

5.  Standard deviation

    1.  Rule of thumb: two standard deviations

    2.  Chebyshev’s inequality: % of population outside $k$ standard
        > deviations can’t exceed $\frac{1}{k^{2}}$

6.  Correlation coefficient

    1.  $\rho \in \left\lbrack - 1,1 \right\rbrack$

    2.  $\rho^{2}$ gives fraction of variance in $Y$ that coincides with
        > variation in $X$

7.  Regressions

    1.  Slope & intercept

        1.  Predict $y$ for any $x$

        2.  Predict future!

        3.  Counterfactual “experiments” (way less costly than real
            > experiments)

    2.  $R^{2}$ (coefficient of determination)

    3.  Error terms / detrended data

    4.  Multiple regression

Estimation

1.  Population / samples

    1.  Importance of representative sample

2.  Point estimates, interval estimates / margin of error

3.  Hypothesis test

# L3 Excel

Excel basics

1.  Intro FRED website: maintained by Federal Reserve Bank of St. Louis,
    > 800,000+ macroeconomic variable series over time; virtually
    > everything collected by federal agencies, and many variables
    > collected by foreign governments and central banks.

2.  Downloading variables

    1.  Choose variable 1: real GPD

    2.  Edit chart \> Add variable \> population (quarterly, not
        > monthly)

    3.  Adjust years (1960 onward)

    4.  Download .xlsx (explain .csv, etc.)

3.  Spreadsheet management

    1.  Basic calculator (e.g. $2 + sqrt(9)$ displays $5$)

    2.  Navigation shortcuts: Ctrl+arrows, Ctrl+Shift+arrows, Ctrl+Home

    3.  Adjust column widths, center cells, format color code

    4.  Freeze pains

    5.  Hide labels

        1.  Show how to uhide

    6.  Cut, paste, copy, slide cells, reverse cells

    7.  Sort

4.  Construct variables

    1.  Real GDP per capita = real GDP/pop, copy formula

        1.  Always label variables!

    2.  Real GDP per cap (absolute) growth = real GDP per cap minus
        > previous

    3.  Percentage real GDP per cap growth = real GDP per cap growth /
        > previous

        1.  Suppress digits / format percentage

    4.  Pos growth (binary / Boolean / dummy variable) =
        > 1\*(growth \> 0)

    5.  Percentage population growth = (pop-previous)/previous

5.  Summary statistics

    1.  Histogram of % GDP per cap growth, % pop growth

        1.  File \> Options \> Add-ins \> Analysis ToolPak + Go \>
            > Analysis Toolpak + OK

        2.  Data Analysis Toolbar \> Histogram

        3.  GDP Bins from -10% to +10% by 1% increments (excludes one
            > outlier)

            1.  Reduce typing by extrapolating (“plus” cursor in bottom
                > right-hand corner of cell)

        4.  Pop bins from 0% to .75% by .05%

    2.  Min, max, mean, median, standard deviation

        1.  Eyeball first

        2.  Compute for % real GDP per cap growth

        3.  Copy formulas for % pop growth

    3.  Correlation % pop growth, % real GDP per cap growth

        1.  Reasons to expect positive/negative?

        2.  Compute

    4.  Line graph: % pop growth, % real GDP per cap growth

    5.  Conditional mean

        1.  Sort by pos growth

        2.  Compute mean % real pop growth (does pop growth
            > accelerate/slow down in recessions?)

6.  Regressions

    1.  Scatter % real GDP per cap growth over time

    2.  Scatter real GDP per cap (not growth) and time

    3.  Regress real GDP per cap (not growth) on time

        1.  First create time index variable?

    4.  Create predicted real GDP

        1.  Use \$ sign to pin formula

    5.  Detrend to create business cycle variable: actual real GDP minus
        > predicted real GDP

7.  Task: test whether pop growth is higher or lower on average in booms
    > than busts

    1.  Create boom dummy: residual \> 0

    2.  Sort boom, average % pop growth

8.  Filter

    1.  Decompose date

    2.  Filter by quarters

    3.  Create dummy for first half of year (Q1-2)

    4.  Is % real GDP per cap growth higher in first half or second half
        > of year, on average?

Learning Statistics

1.  We just finished semester (overview). You can now do everything by
    > computer. Rest of semester, we’ll go back and do them by hand.

2.  Why work by hand? Important to know what computer is doing. (GIGO)

    1.  Pushing a button works great unless a situation arises when the
        > standard button is the wrong one to use. We need to know the
        > limitations of the standard techniques and how to modify them
        > appropriately.

    2.  Car analogy: why insist on building cars when we could just
        > drive them? Analogy incomplete: I can objectively verify that
        > I’ve correctly driven a car; I can’t objectively verify that
        > I’ve correctly used statistics. In the real world of research
        > projects, internships, and jobs, there is no answer key! We
        > only know our answers are correct if we know we’ve done them
        > correctly, and that’s only possible if we understand deeply
        > what theoretical basis underlies the tools we’re using.

3.  Simple things (e.g. margin of error) mask extremely complex
    > background. Understanding entire background is essential for
    > confidence that we’re using statistical formulas appropriately.
    > (Sometimes, tweaks are necessary.)

4.  Spiritual analogy: the “why” of the gospel. If atheist friend is
    > kind and righteous already, why need doctrine? Even more
    > happiness. Example: doctrine of eternal marriage informs decisions
    > to resolve conflicts, versus divorce.

# L4 Stata: Basics

Stata

1.  Statistical programming

    1.  Data sets get too big for spreadsheet software

    2.  Many operations, nice to save work and save steps

        1.  Helps with collaboration

        2.  Helps with finding and correcting errors (without redoing
            > work)

        3.  Commands efficiently operate on large sections of data
            > simultaneously

2.  Introduction

    1.  Stata especially well-suited to economics (regression analysis).

    2.  But expensive.

    3.  Other stats packages are available (e.g. R, SAS, SPSS), can
        > program in Python, C, Matlab, Java). But learning new stats
        > package or programming language is like using a Casio
        > calculator when you’re familiar with TI—all the buttons do all
        > the same things, they’re just located in different places. So
        > learning one language helps you pick up others quickly, as
        > needed. (Stata has specific value for Economics research
        > assistants, future PhDs.)

3.  Basic user interface

    1.  Open Stata. Very different GUI (graphical user interface) than
        > Excel, but same idea. Feels more like computer programming
        > software, for good reason.

    2.  Click on Data Editor (Edit), enter data by hand: numbers 1-10 in
        > column 1, make up ten values in column 2.

        1.  Row entries are called observations (numbered automatically
            > on left side)

        2.  Column entries are called variables, default named “var1”
            > and “var2”

    3.  Close data editor. Notice in main screen, a running list of
        > individual commands (and their results), based on what we just
        > did manually.

        1.  With our first action, we actually implemented three
            > commands: set “obs” from 0 to 1, generate variable “var1”,
            > and set the value of var1 for observation 1.

        2.  As we added more data, we set “obs” to 2, 3, …, 10, replaced
            > var1 for observations 2, 3, …, 10, and then generated a
            > second variable, “var2”, and replaced its values for
            > observations 1-10. (Note, we no longer needed to expand
            > “obs” at that point.)

    4.  Command line

        1.  We can use the command line as a calculator: type
            > <u>di</u>splay sqrt(8\*2)

        2.  We can add additional commands using the command line. Type:
            > <u>gen</u>erate varthree

            1.  Note: in Stata commands, shortcuts are indicated by
                > underlining the minimal number of letters to convey
                > the same meaning: “gen” or “gene” or “gener” or
                > “genera” or “generat” or “generate” are all
                > equivalent, but “ge” is ambiguous, and will therefore
                > not work.

        3.  Error: when we generate a new variable, we need to define
            > its values. Let’s try again: generate varthree=3

        4.  Now open Data Editor again to see the result. We have
            > defined a new variable “varthree” to equal 3, not just for
            > a particular observation, but for every observation. This
            > is the power of the programming approach to data: you can
            > do lots of things at once! (In Excel, there are shortcuts
            > to copy and fill, but nothing this quick.) Most of the
            > time, we won’t interact with the spreadsheet directly;
            > we’ll just be programming.

        5.  To see this again, close Data Editor and type: replace
            > varthree=2\*var2 if var1\>7. We see that three real
            > changes were made, and if we open the Data Editor again,
            > we can see what that looks like.

        6.  What if we meant to type varthree=2\*var2 if var1\>5? We
            > could type over again, or we can push “PgUp” to repeat the
            > previous command (and edit it before hitting return).
            > Pushing this multiple times allows us to repeat earlier
            > commands.

    5.  Left and right panels

        1.  On top right-hand side is a list of the variables we have so
            > far: var1, var2, and newvar.

        2.  The bottom right-hand side summarizes our data: we have
            > three variables and 10 observations.

        3.  (If you ever need to, you can resize these panels by
            > dragging their borders.)

        4.  Notice on left-hand side is list of commands we’ve used so
            > far (red for the ones that returned error codes). Let’s
            > highlight the first 26 lines (click on the first, then
            > shift-click on line 26) and push Ctrl+C to copy these.
            > (This creates var1 and var2 and replaces all 10 values of
            > var1 but only the first 5 values of var2.)

        5.  Break. If you send the computer on an impossible task, it
            > may think for a really long time. To get it to stop so you
            > can revise its instructions, click on “Break” (red X
            > button).

4.  Do Files

    1.  Click on “New Do File Editor” at the top of the screen (looks
        > like a Word document, with a pencil). This opens a new window,
        > with a text editor.

    2.  Type Ctrl+V to paste the command lines that we copied earlier.
        > This becomes a short computer program that, once we execute,
        > will create two variables and replace their values. (In
        > computer programming, a “command” tells the computer to do
        > something. A “script” is a list of commands, to be executed in
        > order. Scripts in Stata are called Do files.)

    3.  Note: some programming languages require a semicolon or other
        > punctuation to denote the end of one command and the beginning
        > of the next. “Return” plays that role in Stata, so writing on
        > separate commands on separate lines is sufficient.

    4.  Always use a script, not the command line!

        1.  Often, after many steps of manipulating data, you realize
            > that you should have done step 3 differently. In Excel,
            > you might be able to hit “undo” repeatedly (if you haven’t
            > saved and closed the program yet), but once you correct
            > step 3, you’ll then have to redo all subsequent steps.
            > With a script, you can edit step 3 and recompile in
            > moments.

        2.  A script is also useful for collaborators and replicators,
            > as well as yourself when you come back to a project after
            > a long pause. I learned this the hard way: I downloaded
            > data, manipulated it repeatedly using the command line,
            > found results that were really interesting, and copied and
            > pasted them into my research paper. A more urgent project
            > came up, so it was months before I came back to this. When
            > I came back, I did (what I thought were) the same
            > manipulations but got totally different results. I
            > couldn’t figure out how to reproduce the results that I
            > had recorded earlier. Maybe I had been making a mistake?
            > Maybe I’m making a mistake now, but was previously
            > correct? If I had a paper trail of all my data
            > manipulations at the time, I could compare my work now and
            > then to see how they differ, and which is more reliable.
            > …But I don’t, and may never publish that paper.

        3.  For your data project, you will need to submit your Do file,
            > not just your results.

        4.  Related programming tip: Never overwrite your original data
            > set. Use a script to open your original data set, make
            > whatever edits need to made, and then save the revised
            > data as a new data set with a different file name. That
            > way, every time you run your script, it pulls the same
            > original data.

    5.  Use comments to keep things neat, organized

        1.  \*Comments begin with an asterisk.

        2.  /\* Or they can be enclosed (even mid-line) in asterisks and
            > slashes \*/

    6.  Save .do file using Save icon.

Data files

1.  Clear

2.  Computer programs are designed to recognize and interpret
    > information, but only in specific formats, specified by file type
    > (e.g. .pdf, .docx, .mp3).

3.  For example, Spreadsheets often saved as .csv (“comma separated
    > values”)

    1.  year,growth;2021,2%;2020,1%;2019,1.5% can be understood to be a
        > 3x2 table

4.  Excel recognizes .csv or .xlsx, which adds formatting information.

5.  Stata stores data using .dta and stores scripts using .do

6.  Example: search Google for “Our World in Data Covid github”,
    > download xslx of covid data. Save as FileName (maybe
    > FileName_raw). (If you save in OneDrive, you should be able to
    > access it from other computers.) Good idea to save in its own
    > folder, so that additional files all stay together.

7.  Directories

    1.  Open file location and Shift-right click to “Copy as path”. In
        > Stata .do file, type import delimited “FilePath”, clear (with
        > quotation marks around FilePath).

        1.  The “delimited” command lets Stata know it’s a .csv file.

        2.  Note: “clear” option replaces data in Stata memory, if any
            > (can only hold one dataset at a time).

    2.  We’ll often be creating multiple files: the original .xlsx or
        > .csv, the converted original .dta, a .do, a final .dta, and
        > possibly intermediate .dta or other files. To keep things
        > organized, it’s a good idea to make a directory for each
        > project.

    3.  Stata is set to work within a “working directory”. From any
        > working directory, you can call a file that has a complete
        > file path name. But you can also set the working directory to
        > be the file you want to work in, and not have to write out the
        > complete file path each time.

    4.  To see what directory is the current working directory, type pwd
        > in the command line (for print working directory).

    5.  cd command: can change working directory. Then can rewrite
        > earlier import command with shorter file name instead of
        > complete file path.

8.  Resave as .dta

    1.  export excel Filename_raw.xlsx, replace firstline

        1.  firstline option recognizes first line of data set as
            > labeling variable names.

    2.  save Filename_raw.dta

    3.  use Filename_raw(.dta), clear

9.  Save edited.dta at end of .do file

    1.  save FileName_edited.dta, replace

    2.  Note: replace option only important when re-running code.

Exploring data

1.  Browse

2.  Describe

3.  Lookfor

4.  Sort

5.  Order

6.  Summarize

    1.  Summarize icu_patients_per_million hosp_patients_per_million

    2.  Summarize tot\* \[where \* is a place holder for any letter or
        > combination of letters\]

    3.  Summarize \*

    4.  Doesn’t work with strings; notice location isn’t summarized.

    5.  Summarize, detail gives medians and percentiles

7.  Generate

    1.  Generate rich = gdp_per_capita \> 11840.85

8.  Tabulate

    1.  tabulate rich

    2.  tab continent

9.  Histogram

10. Correlate

11. Scatter

# L5 Stata: Advanced

Covid data:

Histogram

Hist total_deaths_per_million if date==”2021-09-08”

Scatter

Scatter total_deaths_per_million gdp

Regress

regress new_deaths_per_million people_vaccinated_per_hundred if
date=="2021-09-08"

Predict

predict predictable_new_deaths if date=="2021-09-08"

predict excess_new_deaths if date=="2021-09-08", resid

Twoway graphs

graph twoway (scatter new_deaths_per_million
people_vaccinated_per_hundred) (line predictable_new_deaths
people_vaccinated_per_hundred) if date==”2021-09-08”

twoway scatter new_deaths_per_million people_vaccinated_per_hundred \|\|
line predictable_new_deaths people_vaccinated_per_hundred

Collapse

gen US=1 if location==”United States”

gen US_newdeaths_percap = us\*new_deaths_per_million

collapse (mean) new_cases_per_million new_deaths_per_million
new_vaccinations_smoothed_per_mi \[fweight=population\], by(date)

Variable types

help datatypes

destring date, gen(date2)

generate int numdate = date(date,"YMD",2021)

Graphs

twoway line us_new_deaths_percap numdate \|\| line
new_deaths_per_million numdate

twoway line new_deaths_per_million numdate \|\| line
new_cases_per_million numdate

graph save filename.gph, replace

Time Series

tsset numdate

gen rising = new_deaths_per_million \> new_deaths_per_million

Log files

log using filename.og, replace

log close

Review stata commands

# L6 Probability, Combinatorics (WMS 2.1-6)

1.  How many have already collected data? How many know what data to
    > collect?

2.  Spiritual thought: many of our greatest priorities are not time
    > sensitive, so it’s easy to procrastinate till “later”, but often
    > this postpones blessings. Let your daily activities match your
    > eternal priorities! (e.g. Don’t delay repentance,
    > marriage/children, promptings, family history, making life plans,
    > for movies/hobbies or even school/work)

3.  Probability

    1.  Language of uncertainty

    2.  Economic applications: risk/insurance, investments,
        > shopping/learning

    3.  Data analysis (huge): infer population characteristics from
        > sample

    4.  Fundamentally, probability is merely ratio

    5.  Sample space / Universe$\ S = \{ 1,2,3,4,5,6\}$

    6.  Subset / Event

        1.  $B = \left\{ 4,5,6 \right\}$

        2.  $E = \{ 2,4,6\}$

    7.  Probability function
        > $P\left( E \right) = \frac{n_{E}}{n_{S}} = \frac{3}{6}$

        1.  A function is like a machine; in this case, output is number
            > but input is set

        2.  $P\left( S \right) = 1$

    8.  Categorical descriptions: 50/500 unemployed = 10% unemployment
        > rate / probability

4.  Set Notation

    1.  Element

        1.  $5 \in B$, $5 \notin E$

    2.  Subset

        1.  $B \subseteq S$

    3.  Empty set $\varnothing$

    4.  Complement

        1.  $= \left\{ 1,2,3 \right\}$

        2.  $= \left\{ 1,3,5 \right\}$

        3.  $P\left( \right) = 1 - P\left( \right)$

        4.  Note: this is a simple but useful tool. Sometimes it’s
            > easier to derive $P\left( \right)$ than to derive
            > $P\left( E \right)$. For example: the probability that two
            > or more students in Econ 378 share birthdays is very
            > difficult to find directly, but the complementary event
            > (i.e. that no two students share a birthday) is not as
            > bad.

    5.  Intersection (“and”)

        1.  $B \cap E = \left\{ 4,6 \right\}$

        2.  $\cap = \left\{ 1,3 \right\}$

    6.  Union (“or”, “at least one”)

        1.  $B \cup E = \left\{ 2,4,5,6 \right\}$

        2.  $\cup = \left\{ 1,2,3,5 \right\}$

    7.  Mutually exclusive

        1.  $A \cap B = \varnothing$

        2.  $P\left( A \cap B \right) = 0$

    8.  Collectively exhaustive

        1.  $A \cup B = S$

        2.  $P\left( A \cup B \right) = 1$

5.  Total probability:
    > $P\left( A \cup B \right) = P\left( A \right) + P\left( B \right) - P(A \cap B)$

    1.  Including both $P\left( A \right)$ and $P\left( B \right)$
        > “double counts” $P\left( A \cap B \right)$

    2.  Example: among set $S$ of workers in particular industry,
        > unemployment rate $P\left( U \right) = .10$, women
        > $P\left( W \right) = .25$, intersection
        > $P\left( U \cap W \right) = .05$;
        > $P\left( U \cup W \right) = .1 + .25 - .05 = .3$

6.  Independence: $P\left( A \cap B \right) = P\left( A \right)P(B)$

    1.  Example:
        > $P\left( U \right)P\left( W \right) = \left( .10 \right)\left( .25 \right) = .025 \neq .05 = P(U \cap W)$

    2.  Not the same as mutually exclusive! (Mutually exclusive events
        > are highly negatively correlated)

7.  Combinatorics

    1.  “$\text{mn}$ rule”

        1.  6 pants (2 brown), 10 shirts (3 green); probability that
            > random outfit consists of brown pants and green shirt is
            > $P\left( B \cap G \right) = \frac{\#\left\{ B \cap G\ outfits \right\}}{\#\left\{ \text{outfits} \right\}} = \frac{2 \cdot 3}{6 \cdot 10} = .1$

        2.  Equivalently, since independent,
            > $P\left( B \cap G \right) = P\left( B \right)P\left( G \right) = \frac{2}{6} \cdot \frac{3}{10} = .1$

    2.  Number of ways to permute (i.e. order) 10 students:
        > $10! \approx 3.6\ million$

    3.  Number of ways to choose 3 out of 10 students:
        > $C_{3}^{10} = \left( 10\ 3\  \right) = \frac{10!}{3!7!} = 120$

        1.  Numerator: there are $10!$ ways to order the 10 students

        2.  Denominator: but this double-counts ($3!7!$ times) orderings
            > which shuffle the first three and last seven, but don’t
            > change the identity of the chosen three

    4.  Number of ways to assign 10 students into bins of 3, 5, 2:
        > $\frac{10!}{3!5!2!} = 2,520$

8.  Applications: discrimination lawsuit after 9 workers (3 immigrants,
    > 6 natives) assigned to 4 dangerous jobs + 5 safe jobs

    1.  All 3 immigrants assigned to dangerous jobs

        1.  $P\left( E \right) = \frac{n_{E}}{n_{S}} = \frac{C_{3}^{3} \times C_{1}^{6}}{C_{4}^{9}} = \frac{\left( \frac{3!}{3!0!} \right)\left( \frac{6!}{1!5!} \right)}{\frac{9!}{4!5!}} = \frac{6}{\left( \frac{9 \cdot 8 \cdot 7 \cdot 6}{4 \cdot 3 \cdot 2 \cdot 1} \right)} = \frac{1}{21} \approx 0.05$

        2.  Alternatively, can think sequentially:
            > $\frac{4}{9} \cdot \frac{3}{8} \cdot \frac{2}{7} = \frac{1}{21}$

        3.  Alternatively, can assign workers to safe jobs:
            > $P\left( E \right) = \frac{n_{E}}{n_{S}} = \frac{C_{0}^{3} \times C_{5}^{6}}{C_{5}^{9}} \approx 0.05$

        4.  Alternatively, can assign jobs to workers:
            > $P\left( E \right) = \frac{C_{3}^{4}C_{0}^{5}}{C_{3}^{9}} \approx 0.05$

    2.  2 out of 3 immigrants assigned to dangerous jobs

        1.  $P\left( 2 \right) = \frac{n_{E}}{n_{S}} = \frac{\left( C_{2}^{3} \times C_{2}^{6} \right)}{C_{4}^{9}} = \frac{\left( \frac{3!}{2!1!} \right)\left( \frac{6!}{2!4!} \right)}{\frac{9!}{4!5!}} = \frac{3\left( \frac{6 \cdot 5}{2 \cdot 1} \right)}{\left( \frac{9 \cdot 8 \cdot 7 \cdot 6}{4 \cdot 3 \cdot 2 \cdot 1} \right)} = \frac{5}{14} \approx 0.36$

        2.  $P\left( E \right) = P\left( 2 \right) + P\left( 3 \right) \approx 0.36 + 0.05 = 0.41$

    3.  24 workers assigned to 10 safe and 14 dangerous jobs, lawsuit
        > because 6 immigrants all assigned dangerous job

        1.  $P\left( E_{1} \right) = \frac{n_{E}}{n_{S}} = \frac{C_{8}^{18}C_{6}^{6}}{C_{14}^{24}} = \frac{\frac{18!}{8!10!}\frac{6!}{6!0!}}{\frac{24!}{14!10!}} = \frac{18!14!}{8!24!} \approx .022$

        2.  $\frac{C_{6}^{14}C_{0}^{10}}{C_{6}^{24}} = \frac{\frac{14!}{6!8!}\frac{10!}{0!10!}}{\frac{24!}{6!18!}} = \frac{14!18!}{8!24!} \approx .022$

        3.  If 5 out of 6 assigned dangerous job:
            > $P\left( E_{2} \right) = \frac{C_{9}^{18}C_{5}^{6}}{C_{14}^{24}} = \frac{\frac{18!}{9!9!}\frac{6!}{5!1!}}{\frac{24!}{14!10!}} = \frac{18!14!10 \bullet 6}{24!9!} \approx .149$,
            > $P\left( E \right) \approx .022 + .149 = .171$

# L7 Conditional Probability (WMS 2.7-10)

1.  If possible, be prepared next lecture with idea for research project

2.  Typically, don’t count to determine $\Pr\Pr\ \left( E \right)\ $;
    > estimate from sample

Conditional probability

1.  Definition:
    > $\Pr\Pr\ \left( B \right)\  = \frac{\Pr\Pr\ \left( A \cap B \right)\ }{\Pr\Pr\ \left( B \right)\ }$

2.  This is how online stores (e.g. Ebay, Amazon, Google) figure out
    > what to advertise: given that you purchased a textbook, how likely
    > are you to want a Lego set or motorcycle helmet?

3.  Story problem keywords: “given”, “conditional on”, “among”, or “out
    > of”

4.  Example 1: Among set $S$ of workers in particular industry,
    > unemployment rate $P\left( U \right) = .10$, women
    > $P\left( W \right) = .25$, intersection
    > $P\left( U \cap W \right) = .05$

    1.  Rectangular Venn diagram

    2.  Unemployment rate among women
        > $P\left( W \right) = \frac{.05}{.25} = .20$

    3.  Fraction of unemployed who are women
        > $P\left( U \right) = \frac{.05}{.10} = .50$

    4.  Practice:

        1.  Unemployment rate among men
            > $P\left( \right) = \frac{.05}{.75} = \frac{1}{15} \approx .07$

        2.  Fraction of unemployed who are men
            > $P\left( U \right) = \frac{.05}{.10} = .50 = 1 - P(W|U)$

Independence

1.  Definition: $P\left( B \right) = P(A)$, $P\left( A \right) = P(B)$
    > (equivalent to
    > $P\left( A \cap B \right) = P\left( A \right)P\left( B \right)$)

2.  What is the probability of a person being unemployed?
    > $P\left( A \right) = .10$; what if it’s raining outside? Then the
    > probability of being unemployed is $P\left( B \right) = .10$.

3.  Surgeon joke (failing to account for independence): the bad news is
    > that this type of surgery is successful only 25% of the time. The
    > good news is that the last three patients all died.

Event decomposition:

1.  If $E_{1},\ldots,E_{k}$ are mutually exclusive and collectively
    > exhaustive then $P\left( A \right) = P\left( A \cap E_{k} \right)$

2.  Example 1: 30% of web traffic comes from a Google add ($G$), 30%
    > from online newspaper ($N$), and 40% from a product reviewer’s
    > blog ($R$). 40% of Google traffic, 20% of newspaper traffic, and
    > 30% of reviewer traffic end in a sale ($S$). What fraction of
    > overall traffic ends in a purchase?

    1.  Step 1: draw event tree (first web source, then purchase
        > decision)

    2.  Step 2: translate question into notation.
        > $P\left( G \right) = .3$, $P\left( N \right) = .3$,
        > $P\left( T \right) = .4$, $P\left( G \right) = .4$,
        > $P\left( N \right) = .2$, $P\left( R \right) = .3$, wish to
        > find $P(S)$

    3.  $P\left( S \right) = P\left( S \cap G \right) + P\left( S \cap N \right) + P\left( S \cap R \right)$

> $= P\left( G \right)P\left( G \right) + P\left( N \right)P\left( N \right) + P\left( R \right)P\left( R \right) = .3 \times .4 + .3 \times .2 + .4 \times .3 = .12 + .06 + .12 = .3$

1.  $S$ and $R$ are independent, since
    > $P\left( R \right) = P\left( S \right) = .3$. Is $S$ independent
    > of $G$? Of $N$?

```{=html}
<!-- -->
```
1.  Bayes’ Rule

    1.  $P\left( A \cap B \right) = \{ P\left( B \right)P\left( B \right)\ P\left( A \right)P\left( A \right)\ $

    2.  Therefore, can derive $P\left( B \right)$ from
        > $P\left( A \right)$, or vice versa.

    3.  $P\left( B \right) = \frac{P\left( A \right)P\left( A \right)}{P\left( B \right)} = \frac{P\left( A \right)P\left( A \right)}{P\left( A \right)P\left( A \right) + P\left( \right)P\left( \right)}$

    4.  Practice: find and interpret $P(G|S)$, $P\left( S \right)$,
        > $P(N|S) = \frac{P\left( N \cap S \right)}{P\left( S \right)} = \frac{.06}{.3} = .2$
        > (mere coincidence that $P\left( S \right) = P(S|N)$)

2.  Warning: think carefully about difference between
    > $P\left( B \right)$, $P(A)$, and $P\left( A \right)$. Be sure you
    > know which you really want.

3.  Note: It’s possible for composite probabilities and conditional
    > probabilities to tell rather opposite stories

    1.  Charig et al. (1986): Kidney stone treatment B looked more
        > effective, but A was more actually effective more effective
        > both with small stones and large stones (but stone size
        > matters, and treatments A and B had been used
        > disproportionately on large and small stones, respectively)

| Kidney stone size | Treatment A     | Treatment B     |
|-------------------|-----------------|-----------------|
| Small             | 81/87=**93%**   | 234/270=87%     |
| Large             | 192/263=**73%** | 55/80=69%       |
| Both              | 273/350=78%     | 289/350=**83%** |

1.  MLB batting averages: David Justice was better in 1995 and 1996 but
    > Derek Jeter was better in 1995-96. Who is better batter?

| Batter        | 1995             | 1996            | 1995-96          |
|---------------|------------------|-----------------|------------------|
| Derek Jeter   | 12/48=.250       | 183/582=.314    | 195/630=**.310** |
| David Justice | 104/411=**.253** | 45/140=**.321** | 149/551=.270     |

> Either could be. Likely depends on which is more predictive of 1997
> (depends on other assumptions)

1.  Israel covid data: August 2021
    > (https://www.covid-datascience.com/post/israeli-data-how-can-efficacy-vs-severe-disease-be-strong-when-60-of-hospitalized-are-vaccinated)

    1.  When covid Delta variant hit, Israeli hospitals filled up with
        > covid cases: 214 that were unvaccinated and 301 that were
        > vaccinated. Since 60% were vaccinated, superficial conclusion
        > is that vaccines make covid worse, not better!

    2.  But 60%=P(vax\|cv). We really want to know P(cv\|vax) (actually,
        > want to compare P(cv\|vax) and P(cv\|no vax))

    3.  $P(cv|vax) = 301/5,634,634 = 5.3*10^{- 5}$

> $P\left( \text{no\ vax} \right) = \frac{214}{1,302,912} = 16.4*10^{- 5}$
>
> Vaccinated only catch covid $\frac{5.3}{16.4} = 32\%$ as often (i.e.
> vaccine 68% effective)

1.  Nearly 80% of Israelis over age 12 were vaccinated against covid, so
    > if it were unrelated random draw, 80% of covid patients should
    > have been vaccinated; lower rate than 80% supports hypothesis that
    > treatment helped.

2.  Put differently, so many Israelis were vaccinated that even though
    > those vaccinated only got covid 68% as often, there were more
    > vaccinated covid cases than unvaccinated covid cases.

# L? Research Design

Research questions

1.  There are two important ingredients to a good research study: a good
    > question, and a good methodology for finding an answer

2.  Question selection

    1.  What ideas do you already have for data analysis projects?

    2.  What (topic) are you excited / passionate about?

    3.  If you had a crystal ball, what would you ask?

    4.  What if you had a crystal ball that could answer anything but
        > that? What would you need to ask so that you can figure out
        > your own answer to the main question?

    5.  Continue until so narrow you can collect your own data (the more
        > specific, the better)

    6.  Given (time and money) budget constraints, your project may need
        > to settle for similar data

        1.  Similar variables

        2.  A few observations

        3.  “Pilot study”: this is often what is done in real world

        4.  Proof of concept (consulting sales pitch): can even use fake
            > data

3.  Data mining

    1.  Given data (e.g. from a private business, a consulting client,
        > etc.), ask, “what can we learn?” and “who is interested?”

    2.  Example: private business data

    3.  Typically needs to be paired with research question process
        > above

    4.  Example: what would CEO want to know?

Correlation may not mean causation!

1.  Three possibilities

2.  Causation: $X \Rightarrow Y$

> Theory: cell phones $\Rightarrow$ distraction $\Rightarrow$ accidents
>
> Policy implication: banning cell phones will reduce car accidents

1.  Reverse causation: $X \Leftarrow Y$

> Not likely in this case (car accidents cause cell phone use?)

1.  Lurking variable: $X \Leftarrow Z \Rightarrow Y$

> Example: careless (teenage?) drivers are prone independently both to
> use cell phones and (regardless of cell phone use) to get in accidents
>
> Policy implication: banning cell phones will not reduce car accidents

1.  Historic instances of conflating correlation with causation

    1.  The “Phillips curve” documented a negative correlation between
        > inflation and unemployment, suggesting to policy makers that
        > monetary policy could only avoid one problem by embracing the
        > other. They printed more money in the 1970s, hoping to lower
        > unemployment, but discovered “stagflation”: the coincidence of
        > high unemployment and high inflation.

    2.  Documenting a positive correlation between on-the-job computer
        > use and income, Krueger (QJE 1993) concluded that computers
        > increase productivity, and recommended policies to increase
        > computer use. Using similar data, however, DiNardo and Pischke
        > (QJE 1997) showed that income is also correlated with pencil
        > use on the job and argued (tongue-in-cheek) that subsidizing
        > pencils would be a much more cost-effective intervention.

    3.  Can also conflate lack of correlation with lack of causation: in
        > yesterday’s covid example, we derived that
        > $P\left( \text{vax} \right) = 5.3*10^{- 5}$ and
        > $P\left( \text{no\ vax} \right) = \frac{214}{1,302,912} = 16.4*10^{- 5}$,
        > so vaccine is 68% effective. Correlation of $\text{cv}$ and
        > $\text{vax}$ is negative, but weak. If further condition on
        > age (\<50 vs. \>50):

        1.  $P\left( vax < 50 \right) = \frac{11}{3,501,118} = .3*10^{- 5}$

> $P\left( no\ vax < 50 \right) = \frac{43}{1,116,834} = 3.9*10^{- 5}$
>
> Vaccine 92% effective for this group.

1.  $P\left( vax > 50 \right) = \frac{290}{2,133,516} = 13.6*10^{- 5}$

> $P\left( no\ vax > 50 \right) = \frac{171}{186,078} = 91.9*10^{- 5}$
>
> Vaccine 85% effective for this group.

1.  If condition further, vaccine efficacy by age:

| Age   | Vaccine efficacy | Age   | Vaccine efficacy |
|-------|------------------|-------|------------------|
| 12-15 | 100%             | 50-59 | 93%              |
| 16-19 | 100%             | 60-69 | 89%              |
| 20-29 | 100%             | 70-79 | 90%              |
| 30-39 | 97%              | 80-89 | 81%              |
| 40-49 | 94%              | 90+   | 92%              |

1.  Biggest determinant of covid is age (overall, 90+ over 1000 times
    > more likely than 12-15 to be hospitalized with covid), not
    > vaccine. Since people of all ages got vaccinated, corr(vax,cv)
    > gets weaker when not conditioning in age than when conditioning on
    > age. But even for oldest groups (where most “breakthrough” cases
    > are occurring), vaccinated do way better than unvaccinated.

```{=html}
<!-- -->
```
1.  These examples underscore importance of careful data work,
    > understanding statistics! Good intentions can easily be led astray
    > by statistical subtleties.

Establishing causation (this is most of the work in economics)

1.  Random experiment

```{=html}
<!-- -->
```
1.  Best method

2.  Example: force group A to drive with cell phone, group B to not

3.  Often impractical, ethically and/or logistically (e.g. only one
    > national economy; no control group) or even impossible (e.g.
    > race/gender)

4.  Natural experiment: wait for nature to run experiments

    1.  These are rare, might wait a long time

    2.  Government policy randomly allocates permits for some drivers to
        > use cell phones.

    3.  Angrist and Evans (1998): Does having more children affect
        > mother’s income? Lurking variables and reverse causation both
        > likely. But parents whose second child was (randomly) same
        > gender as first child were more likely to have third child,
        > (temporarily) reduced (poor) mother’s income

    4.  Angrist (1990): What impact (positive or negative) did military
        > service have on men with (randomly) high Vietnam draft numbers
        > had 15% lower incomes years later.

    5.  Clever researchers keep eyes open for natural randomness, ask
        > “what can we learn?”

    6.  Sources of randomness: lottery numbers (e.g. gambling, school
        > choice, scarce social program), random executive decisions
        > (e.g. dorm rooms, judge assignment, advertising), weather,
        > earthquakes, accidents, terrorist attacks

```{=html}
<!-- -->
```
1.  Second best: quasi-experiment

```{=html}
<!-- -->
```
1.  Example: cell phones legal in one state, illegal in another

2.  Problem: other reasons for differential accidents (e.g. speed
    > limits, enforcement, roads, recklessness?)

3.  Refinement: large number of states; before/after cell phone law
    > change

4.  Pope (1989, BYU): Geneva Steel closed then reopened six months
    > later, concomitant decrease then increase in local
    > hospitalizations for pneumonia, pleurisy, bronchitis, asthma.
    > (Landmark study in air pollution.)

5.  Sargeant et al. (2004): Restaurant smoking ban in Montana, repealed
    > after six months. Heart attacks dropped 40%, then went back up.

6.  Lee et al. (2004): How does politician (Democrat/Republican) affect
    > policy outcomes? Random election? No. But in close elections (e.g.
    > 48-52% votes), winning or losing was plausibly random.

7.  Possible sources of quasi-randomness: cutoffs (e.g. grades, income
    > thresholds, performance thresholds, birth date), bureaucratic
    > decisions that are not literally random but seem arbitrary (e.g.
    > regulatory decisions, tax levels, regularly/tax hike timing,
    > pre-/post-construction project, mission assignment)

```{=html}
<!-- -->
```
1.  Controls

```{=html}
<!-- -->
```
1.  Compare sub-populations to “control” for lurking variables

2.  Most common method (since others infeasible)

3.  Example: compare cell phone use and accidents among teenagers/adults

    1.  Other proxies for recklessness: grades? debt? Often imperfect

4.  Econ 378: restrict sample (Econ 388: regressions)

Prediction

1.  If correlation does not reflect causation, $X$ cannot be used to
    > control $Y$, but still can be used to predict $Y$

    1.  Example: reduced car insurance premiums for good grades,
        > females, good driving history, yellow cars

    2.  Ethics of “statistical discrimination” (e.g. traffic stops for
        > blacks, airport scrutiny for Arabs)

    3.  Role of theory is to posit reasons for correlation; essential if
        > anything changes (e.g. cell phones get cheaper).

Research Design for Causal Inference

1.  Many of the topics we’re interested in seek to establish
    > cause/effect relationships.

    1.  What examples did you come up with? (e.g. Do masks reduce covid
        > spread?)

    2.  Were there any topics you came up with that do not involve
        > cause/effect relationships? (Probably not.)

2.  What is a cause/effect relationship you would like to discover?

3.  Which variables might have a simple correlation that suggests the
    > relationship above?

4.  Are there any competing forces that might produce the opposite
    > correlation? If the correlation turns out to be consistent with a
    > hypothesized cause/effect relationship, the hypothesized
    > relationship might outweigh any competing forces.

5.  But are there other mechanisms that could produce the same
    > correlation? If so, finding a correlation where you expected it
    > does not guarantee that the hypothesized cause/effect relationship
    > is valid.

6.  This raises a new question: where could we look for evidence of the
    > hypothesized cause/effect relationship that would not pick up
    > correlations for these other reasons?

7.  This is the key question of research design. Note that you can (and
    > should!) think through and plan out your response to these issues
    > before you ever look at the data.

Research design in the quest for spiritual truth

1.  A friend, skeptical of spiritual things, recommended the following
    > experiment: go to a hospital, pray for people in every other room.
    > See if they recover more quickly/fully than the others. (His
    > prediction: no.) Is this a valid statistical test of the validity
    > of prayer? Why or why not?

2.  Research design is important in answering spiritual questions, too:

    1.  What do the scriptures say about experiments to uncover
        > spiritual truth?

    2.  “If any of you lack wisdom, let him ask of God, who giveth to
        > all men liberally, and upbraideth not; and it shall be given
        > him. *But let him ask in faith*, nothing wavering.” (James
        > 1:5-6, emphasis added)

    3.  “And when ye shall receive these things, I would exhort you that
        > ye would ask God, the Eternal Father, in the name of Christ,
        > if these things are not true; and *if ye shall ask with a
        > sincere heart, with real intent, having faith in Christ*, he
        > will manifest the truth of it unto you, by the power of the
        > Holy Ghost.” (Moroni 10:4, emphasis added)

    4.  “Now, we will compare the word unto a seed. Now, *if ye give
        > place, that a seed may be planted in your heart*, behold, if
        > it be a true seed, or a good seed, *if ye do not cast it out
        > by your unbelief, that ye will resist the Spirit of the Lord*,
        > behold, it will begin to swell within your breasts; and when
        > you feel these swelling motions, ye will begin to say within
        > yourselves—It must needs be that this is a good seed, or that
        > the word is good, for it beginneth to enlarge my soul; yea, it
        > beginneth to enlighten my understanding, yea, it beginneth to
        > be delicious to me.” (Alma 32:28, emphasis added)

    5.  To me, asking in faith means an honest willingness to follow the
        > promptings received. If I don’t honestly intend to follow
        > impressions that are given, the experiment is void.

    6.  “If any man will *do his will*, he shall know of the doctrine,
        > whether it be of God, or whether I speak of myself.” (John
        > 7:17, emphasis added)

    7.  Mission friend: finally prayed about the Book of Mormon but
        > “nothing happened”. Zone leader: real intent might mean
        > praying more than once. After continued prayer, he received
        > confirming witness.

# L9 Probability Distributions (WMS 3.1-3)

1.  Events are useful for describing binary/categorical information.
    > Next, we’ll consider random variables, which are useful for
    > describing quantitative information.

2.  Random variables

    1.  Distribution Function: Number of cars $X$ owned by a family
        > $P\left( x \right) = P\left( X = x \right) = \{.10\ if\ x = 0\ .30\ if\ x = 1\ .40\ if\ x = 2\ .20\ if\ x = 3\ 0\ \text{else}\ $

    2.  Mean (i.e. average) “mu” $\mu$

        1.  We don’t know total population size. If we knew there were
            > $100$ families,
            > $\mu = \frac{1}{100}\left( 0 \cdot 10 + 1 \cdot 30 + 2 \cdot 40 + 3 \cdot 20 \right) = 1.7$.
            > If population size $n$ is unknown then
            > $\mu = \frac{1}{n}\left\lbrack 0\left( .10n \right) + 1\left( .30n \right) + 2\left( .40n \right) + 3\left( .20n \right) \right\rbrack$
            > but this reduces to …

        2.  Expected value (or “expectation”)
            > $\mu = E\left( X \right) = xP(x) = 0\left( .10 \right) + 1\left( .30 \right) + 2\left( .40 \right) + 3\left( .20 \right) = 1.7$

            1.  Note: if all realizations of $X$ are equally likely then
                > $P\left( x \right) = \frac{1}{n}$ for all $x$ so
                > $E\left( X \right) = x\frac{1}{n} = \frac{1}{n}x$
                > reduces to familiar formula

    3.  Expected value of functions of $X$

        1.  Example: expected utility
            > $E\left\lbrack u\left( X \right) \right\rbrack = E\left( \right)$)

        2.  Formula:
            > $E\left\lbrack f\left( x \right) \right\rbrack = f(x)P(x)$

        3.  Example:
            > $E\left( X^{2} \right) = 0^{2}\left( .1 \right) + 1^{2}\left( .3 \right) + 2^{2}\left( .4 \right) + 3^{2}\left( .2 \right) = 3.7$

        4.  Algebra shortcuts

            1.  Linear functions, e.g. car maintenance cost
                > $C = 200 + 100X$; average maintenance cost
                > $E\left( C \right) = 200\left( .1 \right) + 300\left( .3 \right) + 400\left( .4 \right) + 500\left( .2 \right) = 370$

            2.  Shortcuts:
                > $E\left( 200 + 100X \right) = E\left( 200 \right) + E\left( 100X \right)$

> $= 200 + 100E\left( X \right) = 200 + 100\left( 1.7 \right) = 370$

1.  Summations: $E\left( X_{i} \right) = E\left( X_{i} \right)$

2.  Pull out coefficients

3.  For constant $c$, $E\left( c \right) = c$

```{=html}
<!-- -->
```
1.  Variance, standard deviation

    1.  Variance
        > $\sigma^{2} = V\left( X \right) = E\left\lbrack \left( X - \mu \right)^{2} \right\rbrack = \left\lbrack \left( 0 - 1.7 \right)^{2} \right\rbrack\left( .1 \right) + \left\lbrack \left( 1 - 1.7 \right)^{2} \right\rbrack\left( .3 \right) + \left\lbrack \left( 2 - 1.7 \right)^{2} \right\rbrack\left( .4 \right) + \left\lbrack \left( 3 - 1.7 \right)^{2} \right\rbrack\left( .2 \right) = .81$

    2.  Standard deviation $\sigma = = = .9$

        1.  Interpretation: by rule of thumb, “most” families own
            > between -.1 and 3.5 cars

        2.  Note: variance, by itself, is difficult to interpret (e.g.
            > units is “cars squared”), but is easier to work with
            > algebraically, because it’s technically and average of
            > something, whereas standard deviation is the square root
            > of an average of something.

    3.  Simpler formula:
        > $V(X) = E\left( X^{2} \right) - \mu^{2} = 3.7 - \left( 1.7 \right)^{2} = .81$

        1.  Show equivalent, as homework problem

        2.  Remember this formula, as we’ll use it repeatedly

    4.  Algebra shortcuts

        1.  $E\left( C^{2} \right) = 200^{2}\left( .1 \right) + 300^{2}\left( .3 \right) + 400^{2}\left( .4 \right) + 500^{2}\left( .2 \right) = 145,000$
            > doesn’t have any easy algebra shortcut;
            > $V\left( C \right) = E\left( C^{2} \right) - 370^{2} = 8,100$

        2.  Shortcut:
            > $V\left( C \right) = V\left( 200 + 100X \right) = V\left( 100X \right) = 100^{2}V\left( X \right) = 8,100$

            1.  $200$ gets added and subtracted:
                > $V\left( C \right) = E\left\{ \left\lbrack \left( 200 + 100X \right) - E\left( 200 + 100X \right) \right\rbrack^{2} \right\}$

            2.  For constant $c$, $V\left( c \right) = 0$

            3.  Pull out coefficients, ... but square them! (because
                > Variance is a quadratic function of a random variable)

```{=html}
<!-- -->
```
1.  Practice example: number $Y$ of car accidents
    > $P\left( Y = y \right) = \{.7\ if\ y = 0\ .2\ if\ y = 1\ .1\ if\ y = 2\ 0\ \text{else}\ $

    1.  $\mu = 0\left( .7 \right) + 1\left( .2 \right) + 2\left( .1 \right) = .4$

    2.  $E\left( Y^{2} \right) = 0^{2}\left( .7 \right) + 1^{2}\left( .2 \right) + 2^{2}\left( .1 \right) = .6$

    3.  $V\left( Y \right) = E\left( Y^{2} \right) - \mu^{2} = .6 - \left( .4 \right)^{2} = .44$

    4.  $\sigma = \approx .663$

    5.  Insurance profit $\Pi = \$ 1200 - \$ 2000 \cdot Y$

        1.  $E\left( \Pi \right) = E\left( 1200 - 2000 \cdot Y \right) = 1200 - 2000E\left( Y \right) = 1200 - 2000\left( .4 \right) = \$ 400$

        2.  $V\left( \Pi \right) = V\left( 1200 - 2000Y \right) = 0 + \left( - 2000 \right)^{2}V\left( Y \right) = 4,000,000\left( .44 \right) = 1,760,000$

        3.  $\sigma_{\Pi} = = \$ 1,326$

    6.  Review this one more time before attempting your homework!

# L10 Correlation (WMS 3.1-8)

> \[Long lecture; use time efficiently\]

1.  Correlation coefficient $\rho \in \lbrack - 1,1\rbrack$

    1.  Positive correlation means variables $X$ and $Y$ tend to move in
        > same direction (e.g. temperature $X$ and ice cream sales $Y$)

    2.  Negative correlation means variables $X$ and $Y$ tend to move in
        > opposite direction (e.g. frequency of exercise $X$ and body
        > mass index$\text{\ Y}$)

    3.  Magnitude indicates strength of relationship

    4.  Independence implies $\rho = 0$

2.  Joint distribution function

    1.  Employee hours per week $X$ and hourly wage $Y$

|          | $Y = 10$ | $Y = 15$ |
|----------|----------|----------|
| $X = 20$ | .2       | .1       |
| $X = 30$ | .1       | .2       |
| $X = 40$ | .1       | .3       |

> Illustrate:
> $P\left( x,y \right) = P\left( X = x \cap Y = y \right) = \{.2\ \ \ if\ \left( x,y \right) = \left( 20,10 \right)\ .1\ \ \ if\ \left( x,y \right) = \left( 20,15 \right)\ .1\ \ \ if\ \left( x,y \right) = \left( 30,10 \right)\ .2\ \ \ \ if\ \left( x,y \right) = \left( 30,15 \right)\ .1\ \ \ if\ \left( x,y \right) = \left( 40,10 \right)\ .3\ \ \ \ if\ \left( x,y \right) = \left( 40,15 \right)\ $

1.  Marginal distributions

    1.  Sum rows or columns:
        > $P\left( x \right) = \{.3\ \ \ if\ x = 20\ .3\ \ \ if\ x = 30\ .4\ \ \ if\ x = 40\ $
        > and
        > $P\left( y \right) = \{.4\ \ \ \ if\ y = 10\ .6\ \ \ \ if\ y = 15\ $

    2.  Summary statistics (quick recap)

        1.  $\mu_{x} = 20\left( .3 \right) + 30\left( .3 \right) + 40\left( .4 \right) = 31$

        2.  $\sigma_{x} \approx 8.3$

            1.  $E\left( X^{2} \right) = 20^{2}\left( .3 \right) + 30^{2}\left( .3 \right) + 40^{2}\left( .4 \right) = 1,030$

            2.  $\sigma_{x}^{2} = 1,030 - 31^{2} = 69$

            3.  $\sigma_{x} = \approx 8.3$

        3.  $\mu_{y} = 10\left( .4 \right) + 15\left( .6 \right) = 13$

        4.  $\sigma_{y} \approx 2.4$

            1.  $E\left( Y^{2} \right) = 10^{2}\left( .4 \right) + 15^{2}\left( .6 \right) = 175$

            2.  $\sigma_{y}^{2} = 175 - 13^{2} = 6$

            3.  $\sigma_{y} = \approx 2.4$

    3.  Independence

        1.  Definition:
            > $P\left( x,y \right) = P_{x}\left( x \right)P_{y}(y)$ for
            > every $\left( x,y \right)$ pair

        2.  Not independent here, since
            > $P\left( 20,10 \right) = .20 \neq P\left( 20 \right)P\left( 10 \right) = .3 \times .4 = .12$

2.  Expectations of functions of $X$ and $Y$

    1.  Average weekly payment
        > $E\left( \text{XY} \right) = \ \left( 20 \cdot 10 \right)\left( .20 \right) + \left( 20 \cdot 15 \right)\left( .10 \right) + \left( 30 \cdot 10 \right)\left( .10 \right) + \left( 30 \cdot 15 \right)\left( .20 \right) + \left( 40 \cdot 10 \right)\left( .10 \right) + \left( 40 \cdot 15 \right)\left( .30 \right) = 40 + 30 + 30 + 90 + 40 + 180 = 410$

    2.  Can do any function
        > $E\left\lbrack f\left( X,Y \right) \right\rbrack = f\left( x,y \right)P(x,y)$

3.  Correlation

    1.  Covariance

> $\sigma_{\text{xy}} = E\left\lbrack \left( X - \mu_{x} \right)\left( Y - \mu_{y} \right) \right\rbrack$
>
> $= \left\lbrack \left( 20 - 31 \right)\left( 10 - 13 \right) \right\rbrack\left( .20 \right)$
>
> $+ \left\lbrack \left( 20 - 31 \right)\left( 15 - 13 \right) \right\rbrack\left( .10 \right)$
>
> $+ \left\lbrack \left( 30 - 31 \right)\left( 10 - 13 \right) \right\rbrack\left( .10 \right)$
>
> $+ \left\lbrack \left( 30 - 31 \right)\left( 10 - 15 \right) \right\rbrack\left( .20 \right)$
>
> $+ \left\lbrack \left( 40 - 31 \right)\left( 10 - 13 \right) \right\rbrack\left( .10 \right)$
>
> $+ \left\lbrack \left( 40 - 31 \right)\left( 15 - 13 \right) \right\rbrack\left( .30 \right) = 7$

1.  Simpler formula:
    > $\sigma_{\text{xy}} = E\left( \text{XY} \right) - \mu_{x}\mu_{y} = 410 - \left( 31 \right)\left( 13 \right) = 7$

2.  Correlation
    > $\rho = \frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} = \frac{7}{\left( 8.3 \right)\left( 2.4 \right)} \approx 0.35$

    1.  Positive, but fairly weak (again, not independent)

    2.  Later: $\rho^{2} \approx 0.12$ measures % of variation in $Y$
        > that covaries with $X$

```{=html}
<!-- -->
```
1.  Algebra shortcuts

    1.  Covariance of a sum

> $\text{Cov}\left( X,1200 - 2000Y \right) = Cov\left( X,1200 \right) + Cov\left( X, - 2000Y \right) = 0 + \left( - 2000 \right)\sigma_{\text{xy}}$

1.  Correlation of a sum

> $\text{Corr}\left( X,1200 - 2000Y \right) = - \rho$

1.  Variance of a sum

> $V\left( X + Y \right) = V\left( X \right) + V\left( Y \right) + 2Cov(X,Y)$

1.  Variance of a larger sum

> $V\left( X + Y + Z \right) = V\left( X \right) + V\left( Y \right) + V\left( Z \right) + 2Cov\left( X,Y \right) + 2Cov\left( X,Z \right) + 2Cov(Y,Z)$
> (with 100 variables, $C_{2}^{100} \approx 5000$ $\text{Cov}$ terms)

1.  Importance of independent samples

```{=html}
<!-- -->
```
1.  Application: financial diversification

    1.  Assume two stocks have same average return
        > $\mu_{x} = \mu_{y} = \mu$ and same standard deviation
        > $\sigma_{x} = \sigma_{y} = \sigma$.

    2.  You could buy two shares of $X$, or one share of $X$ and one
        > share of $Y$. Since you are indifferent between $X$ and $Y$,
        > it might seem that you should be indifferent between these two
        > stock portfolios.

    3.  However, on your homework, you will prove that
        > $E\left( 2X \right) = E(X + Y)$ but
        > $V\left( 2X \right) < V(X + Y)$, as long as $X$ and $Y$ are
        > not perfectly correlated (i.e. $\rho < 1$). In fact, if they
        > are perfectly *negatively* correlated then
        > $V\left( X + Y \right) = 0$!

    4.  Thus, the common financial advice to “Diversify your portfolio”.

2.  Practice \[if time\]: Cell phone use $X$ and number $Y$ of car
    > accidents

|         | $Y = 0$ | $Y = 1$ | $Y = 2$ |
|---------|---------|---------|---------|
| $X = 0$ | .60     | .08     | .02     |
| $X = 1$ | .10     | .12     | .08     |

1.  Note: numerical values can be assigned to binary categorical
    > variables, so that notion of correlation is still meaningful.

2.  Marginal distribution
    > $P\left( X = x \right) = \{.70\ if\ x = 0\ .30\ if\ x = 1\ $, mean
    > $E\left( X \right) = .3$, variance
    > $\sigma_{x}^{2} = E\left( X^{2} \right) - \mu_{x}^{2} = .3 - {.3}^{2} = .21$,
    > standard deviation $\sigma_{x} = \approx 0.458$

3.  Marginal distribution
    > $P\left( Y = y \right) = \{.70\ if\ y = 0\ .20\ if\ y = 1\ .10\ if\ y = 2\ $,
    > mean $E\left( Y \right) = .4$, variance $\sigma_{y}^{2} = .44$,
    > standard deviation $\sigma_{y} = \approx 0.663$

4.  Not independent since
    > $P\left( 0,0 \right) = .6 \neq P_{x}\left( 0 \right)P_{y}\left( 0 \right) = \left( .7 \right)\left( .7 \right) = .49$

5.  $E\left( \text{XY} \right) = \left( 0 \right)\left( 0 \right)\left( .60 \right) + \left( 0 \right)\left( 1 \right)\left( .08 \right) + \left( 0 \right)\left( 2 \right)\left( .02 \right) + \left( 1 \right)\left( 0 \right)\left( .10 \right) + \left( 1 \right)\left( 1 \right)\left( .12 \right) + \left( 1 \right)\left( 2 \right)\left( .08 \right) = .28$

6.  Covariance
    > $\sigma_{\text{xy}} = E\left( \text{XY} \right) - \mu_{x}\mu_{y} = .28 - \left( .3 \right)\left( .4 \right) = .16$

7.  Correlation
    > $\rho = \frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} = \frac{.16}{(.458)(.663)} \approx 0.527$
    > positive and moderately strong

# L11 Continuous Distributions (WMS 4.1-3)

1.  Continuous random variables

    1.  Infinite domain, e.g. sleep hours
        > $x \in \left\lbrack 6,9 \right\rbrack$

    2.  Philosophical view: continuous functions conveniently
        > approximate discrete world, or world is truly infinite but
        > measurement is imprecise

2.  Probability density function (pdf) $f(x)$

    1.  Measures relative likelihood of individual $x$ values

    2.  Individual $x$ values occur with zero probability (and
        > $f\left( x \right) > 1$ is possible); to find probabilities,
        > must take definite integral
        > $P\left( 7 < X < 8 \right) = f\left( x \right)\text{dx}$

    3.  Density must be non-negative and integrate to one over domain
        > (just like probabilities sum to one)

    4.  Example $f\left( x \right) = k( - x^{2} + 16x - 60)$;
        > $6 \leq x \leq 9$

        1.  Not directly from (finite) data; maybe from calibrated
            > theory

        2.  Find $k$

            1.  $1 = f\left( x \right)dx = k\left\lbrack - \frac{1}{3}x^{3} + 8x^{2} - 60x \right\rbrack_{6}^{9} = k\left\lbrack ( - 243 + 648 - 540) - \left( - 72 + 288 - 360 \right) \right\rbrack = 9k$
                > requires that $k = \frac{1}{9}$

            2.  That is,
                > $f\left( x \right) = - \frac{1}{9}x^{2} + \frac{16}{9}x - \frac{60}{9}$;
                > $6 \leq x \leq 9$

        3.  Mode solves
            > $f^{'}\left( x \right) = - \frac{2}{9}kx + \frac{16}{9}k = 0$;
            > solution at $x = 8$

            1.  Note: if $f^{'}\left( x \right)$ everywhere
                > positive/negative then maximum is at highest/lowest
                > $x$ in range

            2.  Note: second-order condition
                > $f^{''}\left( x \right) = - \frac{2}{9}k \leq 0$
                > satisfied as long as $k \geq 0$

        4.  Probabilities:
            > $P\left( 7 \leq x \leq 8 \right) = \frac{1}{9}( - x^{2} + 16x - 60)dx = \ldots = \frac{11}{27} \approx 0.4$

3.  Cumulative distribution function (cdf) $F(x)$

    1.  $F\left( x \right) = P\left( X \leq x \right) = \frac{1}{9}\left( - {\widetilde{x}}^{2} + 16\widetilde{x} - 60 \right)d\widetilde{x}$

> $= \left\lbrack - \frac{1}{27}{\widetilde{x}}^{3} + \frac{8}{9}{\widetilde{x}}^{2} - \frac{20}{3}\widetilde{x} \right\rbrack_{\widetilde{x} = 6}^{\widetilde{x} = x} = - \frac{1}{27}x^{3} + \frac{8}{9}x^{2} - \frac{20}{3}x + 16$
>
> (This assumes $6 \leq x \leq 9$; if $x < 6$ then
> $F\left( x \right) = 0$ and if $x > 9\ $then $F\left( x \right) = 1$)

1.  Percentiles

> Median
> $F\left( x \right) = - \frac{1}{27}x^{3} + \frac{8}{9}x^{2} - \frac{20}{3}x + 16 = \frac{1}{2}$;
> solving by computer, $x \approx 7.8$
>
> 75^th^ percentile
> $F\left( x \right) = - \frac{1}{27}x^{3} + \frac{8}{9}x^{2} - \frac{20}{3}x + 16 = .75 \Rightarrow x \approx 8.4$
>
> 90^th^ percentile
> $F\left( x \right) = - \frac{1}{27}x^{3} + \frac{8}{9}x^{2} - \frac{20}{3}x + 16 = .90 \Rightarrow x \approx 8.7$

1.  Easier probabilities
    > $P\left( 7 \leq X \leq 8 \right) = F\left( 8 \right) - F\left( 7 \right)$

> $= \left( - \frac{1}{27}8^{3} + \frac{8}{9}8^{2} - \frac{20}{3}8 + 16 \right) - \left( - \frac{1}{27}7^{3} + \frac{8}{9}7^{2} - \frac{20}{3}7 + 16 \right) = \frac{11}{27} \approx 0.4$

1.  From cdf, get pdf
    > $f\left( x \right) = F^{'}\left( x \right) = - \frac{1}{9}x^{2} + \frac{16}{9}x - \frac{60}{9}$;
    > $6 \leq x \leq 9$, else $f\left( x \right) = 0$

```{=html}
<!-- -->
```
1.  Moments

    1.  Mean

> $\mu = E\left( X \right) = \text{xf}\left( x \right)\text{dx}$ (just
> like $E\left( X \right) = \sum xP\left( x \right)$)
>
> $= x\frac{1}{9}\left( - x^{2} + 16x - 60 \right)\text{dx}$
>
> $= \frac{1}{9}\left( - x^{3} + 16x^{2} - 60x \right)dx = \ldots = \frac{31}{4} \approx 7.75$

1.  Standard deviation

    1.  $E\left( X^{2} \right) = x^{2}f\left( x \right)\text{dx}$

> $= x^{2}\frac{1}{9}\left( - x^{2} + 16x - 60 \right)dx = \frac{1}{9}\left( - x^{4} + 16x^{3} - 60x^{2} \right)dx = \ldots = \frac{303}{5}$

1.  $V\left( X \right) = E\left( X^{2} \right) - \mu^{2} = \frac{303}{5} - \left( \frac{31}{4} \right)^{2} = \frac{43}{80}$

2.  $\sigma_{X} = \approx 0.73$

```{=html}
<!-- -->
```
1.  Note: algebra tricks still work (e.g. lost wages while sleeping)

    1.  $E\left( \$ 20X \right) = \$ 20E(X) = \$ 20 \cdot 7.75 = \$ 155$

    2.  $V\left( 20X \right) = 20^{2}V\left( X \right)$

```{=html}
<!-- -->
```
1.  Practice describing steps to classmate: Warehouse stock (as fraction
    > of capacity)
    > $f\left( x \right) = - 2x^{2} + kx + \frac{1}{6};0 \leq x \leq 1$

    1.  Find $k = 3$

    2.  mode $= \frac{3}{4}$

    3.  Draw and interpret pdf (upside-down parabola; warehouse full
        > more often than empty)

    4.  Find cdf
        > $F\left( x \right) = - \frac{2}{3}x^{3} + \frac{3}{2}x^{2} + \frac{1}{6}x;0 \leq x \leq 1$

    5.  Find $f(x)$ from $F(x)$

    6.  $P\left( \frac{1}{2} \leq X \leq \frac{3}{4} \right) = \frac{5}{16}$

    7.  median $\approx .6$, 75^th^ percentile $\approx .8$

    8.  mean $\mu \approx 0.58$

    9.  standard deviation $\sigma \approx 0.26$

    10. Insurance payout $\pi = \$ 1,000,000X + \$ 100,000$

        1.  $E\left( \pi \right) = \$ 1,000,000\mu + \$ 100,000 = \$ 680,000$
            > $\sigma_{\pi} = = \$ 1,000,000\sigma_{x} = \$ 260,000$

# L12 Continuous Joint Distributions (WMS 5.1-8)

1.  Joint Density

    1.  Compare discrete/continuous pdf and joint pdf

    2.  Warehouse stocks up to two pallets of cereal $X$ and one pallet
        > of cereal $Y$, with density
        > $f\left( x,y \right) = c\left( x + 2y \right);x \in \left\lbrack 0,2 \right\rbrack,y \in \lbrack 0,1\rbrack$.

    3.  Height of joint pdf represents likelihood of particular $(x,y)$
        > pairs. Must integrate to one (double integral).

        1.  $1 = c\left( x + 2y \right)dydx = (cx + c)dx = 4c$ requires
            > $c = \frac{1}{4}$,

> or
> $f\left( x,y \right) = \frac{1}{4}x + \frac{1}{2}y;x \in \left\lbrack 0,2 \right\rbrack,y \in \lbrack 0,1\rbrack$.

1.  Mode: since upward sloping in both dimensions, mode at
    > $\left( x,y \right) = (2,1)$

```{=html}
<!-- -->
```
1.  Marginal densities

    1.  Analogous to margins of table in discrete joint distribution:
        > total probability of particular realization of $x$ is the sum
        > of all joint probabilities of $(x,y)$ pairs, with that
        > particular $x$ value, but any $y$ value in domain.

    2.  $f_{x}\left( x \right) = \frac{1}{4}\left( x + 2y \right)dy = \frac{1}{4}x + \frac{1}{4};x \in \lbrack 0,2\rbrack$

    3.  $f_{y}\left( y \right) = \frac{1}{4}\left( x + 2y \right)dx = \frac{1}{2} + y;y \in \lbrack 0,1\rbrack$

    4.  Subscript simply distinguishes $f_{x}(.5)$ from $f_{y}(.5)$

    5.  Moments: means, standard deviations

        1.  $\mu_{x} = E\left( X \right) = xf_{x}\left( x \right)\text{dx}$

> $= x\left( \frac{1}{4}x + \frac{1}{4} \right)dx = \frac{2}{3} + \frac{1}{2} = \frac{7}{6}$

1.  $E\left( X^{2} \right) = x^{2}f_{x}\left( x \right)\text{dx}$

> $= x^{2}\left( \frac{1}{4}x + \frac{1}{4} \right)dx = 1 + \frac{2}{3} = \frac{5}{3}$

1.  $V\left( X \right) = E\left( X^{2} \right) - \mu_{x}^{2} = \frac{5}{3} - \left( \frac{7}{6} \right)^{2} = \frac{11}{36}$

2.  $\sigma_{x} = = \approx .55$

3.  $\mu_{y} = E\left( Y \right) = yf_{y}\left( y \right)\text{dy}$

> $= y\left( \frac{1}{2} + y \right)dy = \frac{1}{4} + \frac{1}{3} = \frac{7}{12}$

1.  $E\left( Y^{2} \right) = y^{2}f_{y}\left( y \right)\text{dy}$

> $= y^{2}\left( \frac{1}{2} + y \right)dy = \frac{1}{6} + \frac{1}{4} = \frac{5}{12}$

1.  $V\left( Y \right) = E\left( Y^{2} \right) - \mu_{y}^{2} = \frac{5}{12} - \left( \frac{7}{12} \right)^{2} = \frac{11}{144}$

2.  $\sigma_{y} = = \approx 0.28$

3.  Could also derive mode, median, cdf, percentiles of $X$ or $Y$

```{=html}
<!-- -->
```
1.  Independence requires
    > $f\left( x,y \right) = f_{x}\left( x \right)f_{y}\left( y \right)$
    > for all $(x,y)$ pairs.

    1.  $X$ and $Y$ not independent here, since
        > $f\left( x,y \right) = \frac{1}{4}\left( x + 2y \right) \neq \left( \frac{1}{4}x + \frac{1}{4} \right)\left( \frac{1}{2} + y \right)$
        > (e.g. when $\left( x,y \right) = (0,0)$)

```{=html}
<!-- -->
```
1.  Correlation

    1.  $E\left( \text{XY} \right) = \text{xyf}\left( x,y \right)\text{dydx}$

> $= \text{xy}\left\lbrack \frac{1}{4}\left( x + 2y \right) \right\rbrack dydx = \left( \frac{1}{8}x^{2} + \frac{1}{6}x \right)dx = \frac{1}{3} + \frac{1}{3} = \frac{2}{3}$

1.  $\sigma_{\text{xy}} = Cov\left( X,Y \right) = E\left( \text{XY} \right) - \mu_{x}\mu_{y}$

> $= \frac{2}{3} - \left( \frac{7}{6} \right)\left( \frac{7}{12} \right) = - \frac{1}{72}$

1.  $\rho = \frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} = \frac{- \frac{1}{72}}{\left( .55 \right)\left( .28 \right)} \approx - .09$

```{=html}
<!-- -->
```
1.  Practice example: $f\left( x,y \right) = c(1 - xy)$ for
    > $x,y \in \left\lbrack 0,1 \right\rbrack$

    1.  Find $c$: $c\left( 1 - xy \right)dydx = \frac{3}{4}c$ implies
        > $c = \frac{4}{3}$

    2.  Find marginal densities $f_{x}$, $f_{y}$:
        > $f_{x}\left( x \right) = \frac{4}{3}\left( 1 - xy \right)dy = \ldots = \frac{4}{3} - \frac{2}{3}x$
        > for $x \in \left\lbrack 0,1 \right\rbrack$; symmetrically,
        > $f_{y}\left( y \right) = \frac{4}{3} - \frac{2}{3}y$ for
        > $y \in \left\lbrack 0,1 \right\rbrack$

    3.  Find means $\mu_{x}$ and $\mu_{y}$ and standard deviations
        > $\sigma_{x}$ and $\sigma_{y}$:

> $\mu_{x} = E\left( X \right) = x\left( \frac{4}{3} - \frac{2}{3}x \right)dx = \ldots = \frac{4}{9}$
>
> $E\left( X^{2} \right) = x^{2}\left( \frac{4}{3} - \frac{2}{3}x \right)dx = \ldots = \frac{5}{18}$
>
> $\sigma_{x}^{2} = \frac{5}{18} - \left( \frac{4}{9} \right)^{2} = \frac{13}{162}$
>
> $\sigma_{x} = \approx .283$
>
> Symmetrically, $\mu_{y} = \frac{4}{9}$, $\sigma_{y} \approx .283$

1.  Correlation $\rho$:

> $E\left( \text{XY} \right) = \text{xy}\frac{4}{3}\left( 1 - xy \right)dydx = \frac{5}{27}$
>
> $\sigma_{\text{xy}} = E\left( \text{XY} \right) - \mu_{x}\mu_{y} \approx \frac{5}{27} - \left( \frac{4}{9} \right)^{2} = - \frac{1}{81} \approx - .012$
>
> $\rho = \frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} = \frac{- \frac{1}{81}}{} = - \frac{2}{13} \approx - 0.154$

# L13 Conditional Distributions (WMS 5.3, 11)

1.  Recall distribution of cell phone use and car accidents:

|         | $Y = 0$ | $Y = 1$ | $Y = 2$ |
|---------|---------|---------|---------|
| $X = 0$ | .60     | .08     | .02     |
| $X = 1$ | .10     | .12     | .08     |

1.  Recall
    > $\mu_{x} = .3,\sigma_{x} \approx .458,\mu_{y} = .4,\ \sigma_{y} \approx .663,\rho \approx .527$

```{=html}
<!-- -->
```
1.  Conditional probability

    1.  Cell phone use among those with two accidents
        > $P\left( Y = 2 \right) = \frac{.08}{.10} = .80$ versus those
        > with no accidents
        > $P\left( Y = 0 \right) = \frac{.10}{.70} \approx 0.14$

    2.  Practice: find
        > $P_{y}\left( X = 0 \right) = \frac{.60}{.7} \approx .86$,
        > $P_{y}\left( X = 0 \right) = \frac{.08}{.7} = .11$,$\ P_{y}\left( X = 0 \right) = \frac{.02}{.7} \approx .03$,
        > $P_{y}\left( X = 1 \right) = \frac{.10}{.3} \approx .33$,
        > $P_{y}\left( X = 1 \right) = \frac{.12}{.3} = .40$,
        > $P_{y}\left( X = 1 \right) = \frac{.08}{.3} \approx .27$

2.  Conditional distribution

    1.  $P(y|X = 0)$ and $P(y|X = 1)$ are legitimate distribution
        > functions (numerators sum to denominator)

    2.  Plot, and compare with $P(y)$

    3.  Conditional mean

        1.  $E\left( X = 1 \right) = \text{yP}\left( X = 1 \right)$
            > $\approx 0\left( .33 \right) + 1\left( .40 \right) + 2\left( .27 \right) = .94$

        2.  Practice
            > $E\left( X = 0 \right) \approx 0\left( .86 \right) + 1\left( .11 \right) + 2\left( .03 \right) = .17$

    4.  Average number of car accidents is higher for cell phone users
        > than for non-users. This still doesn’t imply causation!

    5.  Conditional standard deviation

        1.  Just like
            > $V\left( Y \right) = E\left( Y^{2} \right) - \left\lbrack E\left( Y \right) \right\rbrack^{2}$,

> $V\left( X = x \right) = E\left( X = x \right) - \left\lbrack E\left( X = x \right) \right\rbrack^{2}$

1.  (If time) Example : $E\left( X = 1 \right)$
    > $\approx 0^{2}\left( .33 \right) + 1^{2}\left( .40 \right) + 2^{2}\left( .27 \right) = 1.21$,
    > so

> In this case,
> $V\left( X = 1 \right) \approx 1.21 - {.94}^{2} \approx 0.326$, and
> $\sigma_{y|X = 1} \approx \approx 0.57$
>
> By a similar derivation, $\sigma_{y|X = 0} \approx 0.41$; cell phone
> use increases variance.

1.  In an effort to establish causation, could find
    > $P\left( Z = z \right) = \frac{P\left( x,y,z \right)}{P_{z}\left( z \right)}$
    > or
    > $f\left( Z = z \right) = \frac{f\left( x,y,z \right)}{f_{z}\left( z \right)}$,
    > and then $\rho_{xy|z} = Corr(X,Y|Z = z)$. For example, find
    > correlation between cell phone use and car accidents *among
    > teenagers*.

2.  Continuous densities

    1.  Recall joint density of cereal inventory,
        > $f\left( x,y \right) = \frac{1}{4}x + \frac{1}{2}y;x \in \left\lbrack 0,2 \right\rbrack,y \in \left\lbrack 0,1 \right\rbrack$

    2.  Recall marginal densities
        > $f_{x}\left( x \right) = \frac{1}{4}x + \frac{1}{4};x \in \lbrack 0,2\rbrack$
        > and
        > $f_{y}\left( y \right) = \frac{1}{2} + y;y \in \lbrack 0,1\rbrack$,
        > means $\mu_{x} = \frac{7}{6}$, $\mu_{y} = \frac{7}{12}$,
        > standard deviations $\sigma_{x} \approx .55$,
        > $\sigma_{y} \approx 0.28$

    3.  Conditional density
        > $f_{x}\left( Y = y \right) = \frac{f\left( x,y \right)}{f_{y}\left( y \right)} = \frac{\frac{1}{4}x + \frac{1}{2}y}{\frac{1}{2} + y} = \frac{x + 2y}{2 + 4y};x \in \lbrack 0,2\rbrack$.
        > For example,
        > $f_{x}\left( Y = 0 \right) = \frac{x}{2};x \in \lbrack 0,2\rbrack$

    4.  Conditional mean and standard deviation

> $E\left( Y = 0 \right) = x\left( \frac{x}{2} \right)dx = \left\lbrack \frac{1}{6}x^{3} \right\rbrack_{0}^{2} = \frac{8}{6} = \frac{4}{3}$
>
> $E\left( Y = 0 \right) = x^{2}f_{x}\left( 0 \right)dx = x^{2}\left( \frac{x}{2} \right)dx = \left\lbrack \frac{1}{8}x^{4} \right\rbrack_{0}^{2} = 2$
>
> $V\left( Y = 0 \right) = E\left( Y = 0 \right) - \left\lbrack E\left( Y = 0 \right) \right\rbrack^{2} = 2 - \left( \frac{4}{3} \right)^{2} = \frac{2}{9}$.
>
> $\sigma_{x|Y = 0} =$
>
> Thus, when $Y = 0$: density of $X$ is steeper, mean of $X$ is higher,
> variance is lower.

1.  More generically, for arbitrary $y$ value,

> $E\left( Y = y \right) = xf_{x}\left( y \right)dx = x\left( \frac{x + 2y}{2 + 4y} \right)\text{dx}$
>
> $= \frac{1}{2 + 4y}(x^{2} + 2xy)dx = \frac{1}{2 + 4y}\left\lbrack \frac{1}{3}x^{3} + x^{2}y \right\rbrack_{0}^{2} = \frac{1}{2 + 4y}\left( \frac{8}{3} + 4y \right) = \frac{4 + 6y}{3 + 6y}$
>
> For example, $E\left( y = 0 \right) = \frac{4}{3}$ as before
>
> Practice: $E\left( y = 1 \right) = \frac{10}{9}$
>
> $E\left( Y = y \right) = x^{2}f_{x}\left( y \right)\text{dx}$
>
> $= x^{2}\left( \frac{x + 2y}{2 + 4y} \right)dx = \ldots = \frac{6 + 8y}{3 + 6y}$
>
> $V\left( Y = y \right) = E\left( Y = y \right) - \left\lbrack E\left( Y = y \right) \right\rbrack^{2}$
>
> $= \left( \frac{6 + 8y}{3 + 6y} \right) - \left( \frac{4 + 6y}{3 + 6y} \right)^{2}$
>
> $\sigma_{x|Y = y} =$. For example, $\sigma_{x|Y = 0} = =$ as before,
> $\sigma_{x|Y = 1} = = \approx \frac{5}{9}$
>
> Thus, when $Y = 1$, density of $X$ is less steep, mean is lower,
> variance is higher.

1.  With three variables, can derive joint distribution of $X$ and $Y$
    > conditional on $Z$

    1.  Israel covid data

        1.  When covid Delta variant hit, Israeli hospitals filled up
            > with covid patients. 60% of these patients had already
            > been vaccinated.

        2.  Natural (but erroneous) conclusion: vaccines make things
            > worse, not better!

        3.  Nearly 80% of Israelis over age 12 were vaccinated against
            > covid, so if “random draw,” 80% of hospital patients
            > should have been vaccinated; lower rate means treatment
            > helped.

        4.  

2.  

# L14 Regressions (WMS 5.3, 11)

1.  Regressions

    1.  Sir Francis Galton 1886 (cousin of Darwin)

    2.  Use data to determine (average) linear relationship
        > $Y = \beta_{0} + \beta_{1}X$. Once relationship is known, we
        > can predict $Y$ for any $X$ value (even out of sample), as if
        > through a crystal ball!

    3.  Examples:

        1.  Income $Y$ as function of education $X$

        2.  Unemployment $Y$ next year as function of (e.g. fiscal or
            > monetary) policy $X$

        3.  Stock price tomorrow $Y$ as function of today’s
            > earnings/price $X$

        4.  Consultant’s “secret formula” predicting sales, etc.

    4.  Puts units on correlation (“education and income are strongly
        > correlated” vs. “each year of education is associated with an
        > additional \$4k of income”)

    5.  Working example: education $\mu_{x} = 15$ years;
        > $\sigma_{x} = 3$ years; income $\mu_{y} = \$ 70,000$;
        > $\sigma_{y} = \$ 20,000$; correlation $\rho = .6$

    6.  Any $\beta_{0}$ and $\beta_{1}$ determine line
        > $Y = \beta_{0} + \beta_{1}X$, implying an error term
        > $\varepsilon = Y - \beta_{0} - \beta_{1}X$ such that the data
        > satisfies $Y = \beta_{0} + \beta_{1}X + \varepsilon$. We can
        > choose $\beta_{0}$ and $\beta_{1}$ so that the resulting line
        > is as useful as possible.

    7.  “Least squares” regression: choose $\beta_{0}$ and $\beta_{1}$
        > to minimize $E\left( \varepsilon^{2} \right)$

        1.  Equivalently, choose $\beta_{0}$ so that
            > $E\left( \varepsilon \right) = 0$ and $\beta_{1}$ to
            > minimize $V\left( \varepsilon \right)$

        2.  Can use other criteria (e.g. least absolute deviation
            > $E\left( \left| \varepsilon \right| \right)$), but less
            > common

2.  Intercept

    1.  If $\beta_{0}$ is high, most $\varepsilon_{i}$ will be negative;
        > if $\beta_{0}$ is low, most $\varepsilon_{i}$ will be positive

    2.  $E\left( \varepsilon \right) = \mu_{y} - \beta_{0} - \beta_{1}\mu_{x} = 0$
        > implies that $\beta_{0} = \mu_{y} - \beta_{1}\mu_{x}$.

> Easier: $\mu_{y} = \beta_{0} + \beta_{1}\mu_{x}$, so regression line
> passes through $\left( \mu_{x},\mu_{y} \right)$

1.  Example: $\beta_{0} = \$ 70,000 - \$ 4,000 \cdot 15 = \$ 10,000$

```{=html}
<!-- -->
```
1.  Slope

    1.  $V\left( \varepsilon \right) = V\left( Y \right) + V\left( - \beta_{1}X \right) + 2Cov\left( Y, - \beta_{1}X \right) = \sigma_{y}^{2} + \beta_{1}^{2}\sigma_{x}^{2} - 2\beta_{1}\sigma_{\text{xy}}$

    2.  To minimize,
        > $0 = \frac{\text{dV}\left( \varepsilon \right)}{d\beta_{1}} = 2\beta_{1}\sigma_{x}^{2} - 2\sigma_{\text{xy}}$

    3.  Solution
        > $\beta_{1} = \frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} = \frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}}\frac{\sigma_{y}}{\sigma_{x}} = \rho\frac{\sigma_{y}}{\sigma_{x}}$

    4.  Slope is simply (normalized) correlation coefficient

    5.  Example: $\beta_{1} = .6\frac{\$ 20,000}{3yr.} = \$ 4,000$/yr.
        > (e.g. four-year degree provides extra \$16,000/yr)

    6.  Equivalently, $\beta_{1}$ solves
        > $\text{Cov}\left( X,\varepsilon \right) = 0$ (see homework)

2.  Predictions

    1.  High school grad ($X^{*} = 12$) expects
        > $Y^{*} = \$ 10k + \$ 4k(12) = \$ 58k$

    2.  College grad ($X^{*} = 16$) expects
        > $Y^{*} = \$ 10k + \$ 4k(16) = \$ 74k$

    3.  Three PhDs ($X^{*} = 31$) expects
        > $Y^{*} = \$ 10k + \$ 4k(31) = \$ 134k$

        1.  This assumes linear trend holds up, constant returns to
            > scale (which may not be reasonable); in econometrics (Econ
            > 388), learn nonlinear regressions

    4.  Standardized

        1.  $\frac{Y^{*} - \mu_{y}}{\sigma_{y}} = \rho\frac{X^{*} - \mu_{x}}{\sigma_{x}}$
            > (since $\beta_{1} = \rho\frac{\sigma_{y}}{\sigma_{x}}$,
            > $\mu_{y} = \beta_{0} + \beta_{1}\mu_{x}$, and
            > $Y^{*} = \beta_{0} + \beta_{1}X^{*}$).

        2.  If $X^{*}$ is $1$ or $2$ or $k$ standard deviation above
            > $\mu_{x}$ then $Y^{*}$ is $\rho$ or $2\rho$ or $\text{kρ}$
            > standard deviations above $\mu_{y}$

    5.  Stay in school to get rich?

        1.  Caveat 1: I made these numbers up. Before making important
            > financial decisions, you should collect the true numbers.

        2.  Caveat 2: We’ve modeled this as straight line, implying
            > constant marginal returns to education; if decreasing
            > marginal returns, might be better to use parabola (take
            > Econometrics first).

        3.  Caveat 3: Regressions just express correlation, still not
            > causation (despite popular terminology of “dependent” and
            > “independent” variables).

            1.  Maybe causation: school teaches useful skills that
                > generate income.

            2.  Maybe reverse causation: schooling is pure consumption,
                > and wealthy individuals can afford more.

            3.  Maybe spurious correlation: smart kids enjoy school
                > (just as athletes enjoy sports) but would earn high
                > incomes with or without school.

        4.  Either way, predict higher incomes for those who do stay in
            > school: going to school increases my prediction of your
            > income, even if it doesn’t increase your income.

    6.  Reverse predictions

        1.  What if worker makes \$100k income and asks for you to guess
            > education?

        2.  Could read regression backward, but it was designed to
            > minimize errors in income not errors in education

        3.  Better to start over, with income as $X$ and education as
            > $Y$

3.  Errors

    1.  $\varepsilon_{i} = y_{i} - \left( \beta_{0} + \beta_{1}x_{i} \right)$

    2.  De-trend data (e.g. “skill” or “luck”, above and beyond
        > education)

    3.  Example: who is more genius (or luckier):
        > $\left( x,y \right) = (12,\$ 80k)$ or
        > $\left( x,y \right) = \left( 16,\$ 100k \right)$?

        1.  $\$ 80k - \left( 10 + 4 \cdot 12 \right) = \$ 22k$

        2.  $\$ 100k - \left( 10 + 4 \cdot 16 \right) = \$ 26k$

    4.  Variance $\sigma_{\varepsilon}^{2}$ of error distribution tells
        > us how far people are off the regression line

> $\sigma_{\varepsilon}^{2} = V\left( Y - \beta_{0} - \beta_{1}X \right) = \sigma_{y}^{2} + \beta_{1}^{2}\sigma_{x}^{2} - 2\beta_{1}\text{cov}\left( X,Y \right)$
>
> $= {20k}^{2} + {4k}^{2}3^{2} - 2\left( 4k \right)\left( .6 \times 20k \times 3 \right) = \left( \$ 16k \right)^{2}$

1.  Explanatory power (%)

    1.  Partition
        > $V\left( Y \right) = \beta_{1}^{2}V\left( X \right) + V\left( \varepsilon \right) = 144 + 256$

        1.  Note: $2\beta_{1}\text{Cov}\left( X,\varepsilon \right) = 0$
            > (see homework) because optimal slope extracts all
            > correlation

        2.  This decomposes $V\left( Y \right)$ into “explained” 144
            > plus “unexplained” 256 (e.g. talent, luck, or some other
            > mystery). (Warning: terminology sounds like causation, but
            > isn’t; more accurately, variation is “related to
            > education” and “unrelated to education”.)

    2.  “Explained” portion is $\rho^{2}$ fraction of $\sigma_{y}^{2}$

        1.  “Explained” portion is $\frac{144}{400} = .36$

        2.  Generically,
            > $\beta_{1}^{2}\sigma_{x}^{2} = \left( \frac{\sigma_{y}}{\sigma_{x}}\rho \right)^{2}\sigma_{x}^{2} = \rho^{2}\sigma_{y}^{2}$;
            > thus, “explained” variation is always $\rho^{2}$
            > (sometimes called “coefficient of determination”) fraction
            > of $\sigma_{y}^{2}$. In this case ${.6}^{2} = 36\%$

    3.  “Unexplained” portion is $1 - \rho^{2}$

        1.  In this case, $1 - {.6}^{2} = 64\%$, so
            > $\sigma_{\varepsilon}^{2} = .64\left( \$ 20k \right)^{2}$

    4.  Implicit linearity of $\rho$

        1.  Fundamentally, what does $\rho$ measure?

        2.  $X^{2}$ is perfectly predictable from $X$, but linear
            > regression produces $\rho^{2} < 1$

        3.  Thus, $\text{corr}\left( X,X^{2} \right) \neq 1$

        4.  $\rho$ fundamentally measures *linear* relationship (see
            > homework)

# Exam 1 Review

1.  Spiritual thought: prayer through life’s trials, faith without works
    > is dead, obedience gives confidence

2.  Exam info

    1.  Any calculator

    2.  No time limit, predict 2-3 hours

    3.  Handout provided

    4.  Hard: typically C average

3.  Study tips

    1.  Take it seriously: equal weight with final exam

    2.  Start with study guide

    3.  Practice exams (first without solutions, then with)

    4.  Extra homework problems (or repeat homework problems)

    5.  Time saver: talk through steps, don’t work out algebra

4.  Exam strategies

    1.  Don’t forget to pray!

    2.  Extend familiar material to unfamiliar settings (good practice
        > for real world)

    3.  Difficulty is similar to homework, but no TAs or books, so fewer
        > A’s than homework

    4.  Average score is typically C, which averaged with A- homework
        > gives B- overall.

    5.  Show work and list what you know for partial credit (e.g.
        > $\rho = \frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}}$, even
        > if you can’t figure out $\sigma_{\text{xy}}$)

5.  Key formulas

    1.  Binary events

        1.  $P\left( E \right) = \frac{\# E}{\# S}$

        2.  $C_{k}^{n} = \frac{n!}{k!\left( n - k \right)!}$

        3.  $P\left( A \cup B \right) = P\left( A \right) + P\left( B \right) - P\left( A \cap B \right)$

        4.  Independent events:
            > $P\left( A \cap B \right) = P\left( A \right)P(B)$ (or
            > $P\left( B \right) = P(A)$)

        5.  $P\left( B \right) = \frac{P\left( A \cap B \right)}{P\left( B \right)}$

        6.  $P\left( A \cap B \right) = P(B|A)P\left( A \right)$

    2.  Random variables

        1.  Legitimate distribution?
            > $\sum P\left( x \right) = \int f\left( x \right)dx = 1$

        2.  Mode maximizes $P\left( x \right)$ or $f\left( x \right)$
            > (i.e. $f^{'}\left( x \right) = 0$ and
            > $f^{''}\left( x \right) < 0$)

        3.  $\mu = E\left( X \right) = \sum xP\left( x \right) = \int xf\left( x \right)\text{dx}$

        4.  $E\left( X^{3} \right) = \sum x^{3}P\left( x \right) = \int x^{3}f\left( x \right)\text{dx}$

        5.  $\sigma^{2} = V\left( X \right) = E\left\lbrack \left( X - \mu \right)^{2} \right\rbrack = E\left( X^{2} \right) - \mu^{2}$;
            > $\sigma =$

        6.  $F\left( x \right) = f\left( \widetilde{x} \right)d\widetilde{x}$,
            > $f\left( x \right) = F'\left( x \right)$

        7.  $P\left( a < X < b \right) = F\left( b \right) - F(a)$

        8.  Percentile: solve $F\left( \phi_{.5} \right) = .5$

        9.  $f\left( x \right) = F'(x)$

    3.  Joint distributions

        1.  Legitimate joint distribution?
            > $\ \sum\ \sum P\left( x,y \right) = \iint_{}^{}f\left( x,y \right)dxdy = 1$

        2.  Marginal distribution

> $P_{x}\left( x \right) = P(x,y)$
>
> $f_{x}\left( x \right) = \int f\left( x,y \right)\text{dy}$

1.  Independent variables

> $P\left( x,y \right) = P_{x}\left( x \right)P_{y}(y)$
>
> $f\left( x,y \right) = f_{x}\left( x \right)f_{y}(y)$

1.  $E\left( \frac{X}{Y} \right) = \sum\ \sum\left( \frac{x}{y} \right)P\left( x,y \right) = \iint_{}^{}\left( \frac{x}{y} \right)f\left( x,y \right)\text{dxdy}$

2.  $\text{Cov}\left( X,Y \right) = E\left\lbrack \left( X - \mu_{x} \right)\left( Y - \mu_{y} \right) \right\rbrack = E\left( \text{XY} \right) - \mu_{x}\mu_{y}$

3.  $\rho = \frac{\text{Cov}\left( X,Y \right)}{\sigma_{x}\sigma_{y}}$

4.  Conditional distribution

> $P\left( Y = 3 \right) = \frac{P\left( x,3 \right)}{P_{y}\left( 3 \right)}$
>
> $f_{x}\left( Y = 3 \right) = \frac{f\left( x,3 \right)}{f_{y}\left( 3 \right)}$

1.  $E\left( Y = 3 \right) = \sum xP\left( x|Y = 3 \right) = \int xf\left( x|Y = 3 \right)\text{dx}$

2.  $V\left( Y = 3 \right) = E\left( Y = 3 \right) - \left\lbrack E\left( Y = 3 \right) \right\rbrack^{2}$

```{=html}
<!-- -->
```
1.  Regressions

    1.  $\beta_{1} = \frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} = \rho\frac{\sigma_{y}}{\sigma_{x}}$

    2.  $\beta_{0} = \mu_{y} - b\mu_{x}$

    3.  $\frac{V\left( a + bX \right)}{V\left( Y \right)} = \rho^{2}$

    4.  $\varepsilon_{i} = Y_{i} - \left( \beta_{0} + \beta_{1}X_{i} \right)$

```{=html}
<!-- -->
```
1.  Algebra tricks

    1.  $E\left( \$ 100 - \$ 5X \right) = \$ 100 - \$ 5E\left( X \right)$

    2.  $V\left( \$ 100 - \$ 5X + \$ 3Y \right) = V\left( \$ 100 \right) + V\left( - \$ 5X \right) + V\left( \$ 3Y \right) + 2Cov\left( - \$ 5X,\$ 3Y \right) = 0 + \left( \$ 5 \right)^{2}V\left( X \right) + \left( \$ 3 \right)^{2}V\left( Y \right) - \$ 30Cov\left( X,Y \right)$

    3.  $\text{Cov}\left( \$ 100 - \$ 5X,Y \right) = Cov\left( \$ 100,Y \right) + Cov\left( - \$ 5,Y \right) = 0 - \$ 5Cov\left( X,Y \right)$

    4.  $\text{Corr}\left( \$ 100 - \$ 5X,Y \right) = Corr\left( - X,Y \right) = - Corr\left( X,Y \right)$

2.  Distributional relationships

    1.  If $X \sim N$ then $3X \sim N$ and $X + 7 \sim N$

    2.  If $X_{1},X_{2} \sim N$ then $X_{1} + X_{2} \sim N$

    3.  If $Z \sim N\left( 0,1 \right)$ then
        > $Z^{2} \sim \chi^{2}\left( 1 \right)$

    4.  If $W_{1} \sim \chi^{2}(3),W_{2} \sim \chi^{2}(5)$ independent
        > then $W_{1} + W_{2} \sim \chi^{2}(8)$ and
        > $\frac{W_{1}/3}{W2/5} \sim F\left( 3,5 \right)$

    5.  If $Z \sim N(0,1)$ and $W \sim \chi^{2}(\nu)$ independent then
        > $\frac{Z}{} \sim t(\nu)$

3.  Rejoice in how much we’ve learned!

# L15 Bernoulli, Uniform, Standard Normal (WMS 4.4-4.5)

Spiritual thought

1.  Dealing with disappointment

    1.  In grad school, we took two years of courses, then two
        > qualifying exams. If pass, four years of research; if fail,
        > retake or exit with Masters degree. I prepped hard, but on day
        > of exam, got hung up on one really hard question, lost track
        > of time, didn’t finish, and failed!

    2.  I benefitted from a friend’s experience, who had previously been
        > preparing for graduation (robes, parents in town, etc.), when
        > checked grades: E! Couldn’t graduate.

        1.  First reaction: denial. Must be a mistake!

        2.  Second reaction: blame. Grading is unfair!

        3.  Third reaction: dejection. I’m a failure.

        4.  Fourth reaction: hope. *I’m* not a failure, I just failed at
            > this thing. I can move forward productively to the next
            > step. Retook class, found a summer internship that turned
            > out to be career altering.

    3.  Scriptures

        1.  Joseph Smith in Liberty jail: “My son, peace be unto they
            > soul; thine adversity and thine afflictions shall be but a
            > small moment; and then, if thou endure it well, God shall
            > exalt thee on high; thou shalt triumph over all thy foes”
            > (D&C 121:7-8).

        2.  “Search diligently, pray always, and be believing, and all
            > things shall work together for your good, if ye walk
            > uprightly and remember the covenant wherewith ye have
            > covenanted one with another” (D&C 90:24).

        3.  “…All things work together for good for them that love God…”
            > (Romans 8:28).

    4.  Midterm exam: If you performed less well than you hoped, press
        > forward with a perfect brightness of hope! Help the Lord make
        > it work toward your good.

        1.  Learn what went wrong (like spelling bee mistakes, may
            > always remember). Final exam not cumulative per se, but
            > does repeat concepts.

        2.  Reassess study habits (e.g. understand every step of every
            > question; don’t just trust TA or study group).

2.  $X \sim$ Bernoulli($p$) (after Swiss mathematician Jacob
    > Bernoulli, 1713)

    1.  Recall cell phone use
        > $P\left( X = x \right) = \{.7\ if\ x = 0\ .3\ if\ x = 1\ $

    2.  Mean
        > $E\left( X \right) = 0\left( .7 \right) + 1\left( .3 \right) = .3$

    3.  Variance
        > $V\left( X \right) = E\left( X^{2} \right) - \mu^{2} = \left\lbrack 0^{2}\left( .7 \right) + 1^{2}\left( .3 \right) \right\rbrack - {.3}^{2} = .21 = \left( .3 \right)(.7)$

    4.  Pattern: $E\left( X \right) = p$, $V\left( X \right) = p(1 - p)$
        > for “success” parameter $p$

3.  $X \sim \ $Uniform($a,b$)

    1.  $f\left( x \right) = k;a \leq x \leq b$

    2.  $F\left( x \right) = \text{kd}\widetilde{x} = \ldots = \frac{x - a}{b - a};a \leq x \leq b$

    3.  $\mu = \text{xf}\left( x \right)dx = \ldots = \frac{a + b}{2}$

    4.  $\sigma^{2} = x^{2}f\left( x \right)dx - \mu^{2} = \ldots = \frac{\left( b - a \right)^{2}}{12}$

    5.  Example: 90 second stop light

        1.  Average wait time $E\left( X \right) = 45$

        2.  Standard deviation $\sigma = \approx 26$

        3.  Wait less than 30 seconds with probability
            > $F\left( 30 \right) = \frac{30 - 0}{90 - 0} = \frac{1}{3}$

```{=html}
<!-- -->
```
1.  Standard normal $N\left( 0,1 \right)$

    1.  $f\left( z \right) = \frac{1}{}e^{- \frac{1}{2}z^{2}}$
        > (integrate using polar coordinates or trig substitutions)

    2.  $E\left( Z \right) = z\frac{1}{}e^{- \frac{1}{2}z^{2}}dz = \ldots = 0$
        > (u substitution)

    3.  $V\left( Z \right) = z^{2}\frac{1}{}e^{- \frac{1}{2}z^{2}}dz - 0^{2} = \ldots = 1$
        > (integration by parts)

    4.  Practice reading Table A

        1.  Excel: NORM.S.DIST(x, cdf?) or NORM.S.INV(percentile)

        2.  $P\left( - 1 < X < 1 \right) \approx .68$

        3.  $P\left( - 2 < X < 2 \right) \approx .95$

        4.  $P\left( - 3 < X < 3 \right) \approx .997$

    5.  Symmetric: $P\left( X < - 3 \right) = P(X > 3)$

# L16 Normal, Chi Square, t Distributions (WMS 4.5-4.6)

1.  Standardization (for later reference)

    1.  If $E\left( X \right) = \mu$ and
        > $V\left( X \right) = \sigma^{2}$ then you can always change
        > units to create a new random variable
        > $Z = \frac{X - \mu}{\sigma}$ such that $E\left( Z \right) = 0$
        > and $V\left( Z \right) = 1$

        1.  $E\left( Z \right) = E\left\lbrack \frac{1}{\sigma}\left( X - \mu \right) \right\rbrack = \frac{1}{\sigma}\left\lbrack E\left( X \right) - \mu \right\rbrack = 0$

        2.  $V\left( Z \right) = V\left\lbrack \frac{1}{\sigma}X - \frac{1}{\sigma}\mu \right\rbrack = V\left( \frac{1}{\sigma}X \right) = \frac{1}{\sigma^{2}}V\left( X \right) = 1$

2.  Normal (or Gaussian, after German mathematician Carl Friedrich
    > Gauss, 1809) $N\left( \mu,\sigma^{2} \right)$

    1.  $f\left( x \right) = \frac{1}{\sigma}e^{- \frac{1}{2}\left( \frac{x - \mu}{\sigma} \right)^{2}}$
        > (integrate using polar coordinates or trig substitutions)

    2.  $E\left( X \right) = x\frac{1}{\sigma}e^{- \frac{1}{2}\left( \frac{x - \mu}{\sigma} \right)^{2}}dx = \ldots = \mu$
        > (u substitution)

    3.  $V\left( X \right) = x^{2}\frac{1}{\sigma}e^{- \frac{1}{2}\left( \frac{x - \mu}{\sigma} \right)^{2}}dx - \mu^{2} = \ldots = \sigma^{2}$
        > (integration by parts)

    4.  No analytical cdf; instead, approximate numerically

        1.  Excel: NORM.DIST(x, mu, sd, cdf?)

        2.  Percentiles: NORM.INV(percentile, mu, sd)

    5.  Special Properties

        1.  $N + 7 \sim N$

> In other words, adding a constant changes the precise distribution of
> $X$ but keeps it in the normal family

1.  Note: this is true of some other families of random variables (e.g.
    > uniform) but not all (e.g. Bernoulli, binomial, exponential)

```{=html}
<!-- -->
```
1.  $3N \sim N$

> In other words, multiplying by a constant keeps $X$ in the normal
> family

1.  Note: this is true of some other families of random variables (e.g.
    > uniform, exponential) but not all (e.g. Bernoulli, binomial)

```{=html}
<!-- -->
```
1.  $N + N \sim N$

> That is, if $X \sim N\left( \mu_{x},\sigma_{x}^{2} \right)$ and
> $Y \sim N\left( \mu_{y},\sigma_{y}^{2} \right)$
>
> then
> $X + Y \sim N\left( \mu_{x} + \mu_{y},\sigma_{x}^{2} + \sigma_{y}^{2} + 2\sigma_{\text{xy}} \right)$
>
> In other words, the sum of two normally distributed random variables
> is a normally distributed random variable

1.  Note: this is true of some other families of random variables (e.g.
    > independent binomials), but not all (e.g. Bernoulli, correlated
    > binomials, uniform, exponential)

```{=html}
<!-- -->
```
1.  Standard normal $N\left( 0,1 \right)$

    1.  Practice reading Table A

        1.  Excel: NORM.S.DIST(x, cdf?) or NORM.S.INV(percentile)

        2.  $P\left( - 1 < X < 1 \right) \approx .68$

        3.  $P\left( - 2 < X < 2 \right) \approx .95$

        4.  $P\left( - 3 < X < 3 \right) \approx .997$

    2.  Symmetric: $P\left( X < - 3 \right) = P(X > 3)$

    3.  Standardized normal $Z = \frac{X - \mu}{\sigma}$ is standard
        > normal $\sim N\left( 0,1 \right)$ (because of special
        > properties of normal $X$)

    4.  Example 1: $X \sim N\left( 75,25 \right)$ to find
        > $P\left( X > 80 \right) = P\left( Z > \frac{80 - 75}{} \right)$

> $= P\left( Z > 1 \right) = 1 - P\left( Z \leq 1 \right)$
>
> $\approx 1 - .8413 = .1587$

1.  Example 2: costs $C \sim N(120,100)$

    1.  Budget $b$ so that $P\left( C < b \right) = .9$

    2.  $.90 = P\left( C < b \right) = P\left( Z < \frac{b - 120}{10} \right) \approx P\left( Z < 1.28 \right)$
        > (from Table A)

    3.  If $\frac{b - 120}{10} \approx 1.28$ then $b \approx 132.8$

2.  Example 3: costs $C \sim N(120,100)$) and revenue
    > $R \sim N(150,400)$ are independent; how often are profits
    > $Y = R - C$ positive?

    1.  $Y \sim N$

    2.  $E\left( Y \right) = E\left( R \right) - E\left( C \right) = 150 - 120 = 30$

    3.  $V\left( Y \right) = V\left( R - C \right) = V\left( R \right) + \left( - 1 \right)^{2}V\left( C \right) + 2Cov\left( R,C \right) = 400 + 100 = 500$

    4.  So $Y \sim N\left( 30,500 \right)$

    5.  $P\left( Y > 0 \right) = P\left( Z > \frac{0 - 30}{} \right) \approx P\left( Z > - 1.34 \right) = P\left( Z < 1.34 \right) \approx .9099$

```{=html}
<!-- -->
```
1.  $W \sim \chi^{2}(\nu)$ (German statistican Friedrich Robert
    > Helmert, 1875)

    1.  Domain is $\lbrack 0,\infty)$, roughly bell-shaped (but
        > asymmetric, unlike Normal distribution)

    2.  $\nu$ is often called “degrees of freedom”, because in the most
        > common application, it corresponds to how many

    3.  $E\left( W \right) = \nu$ and $V\left( W \right) = 2\nu$

    4.  $f\left( w \right) = ugly$ (I won’t expect you to know or use)

    5.  CDF $F\left( w \right)$ approximated on Table 6

        1.  $\chi_{\alpha}^{2}$ represents a realization of the random
            > variable, where $\alpha$ is the probability to the right
            > of that value (i.e., $1 - F\left( w \right)$)

        2.  Example: suppose sales follow Chi-square distribution, with
            > average of 30 units

            1.  Degrees of freedom $\nu = 30$

            2.  10^th^ percentile is $\chi_{.90}^{2} \approx 20.6$,
                > 90^th^ percentile is $\chi_{.10}^{2} \approx 40.3$

            3.  Putting these together,
                > $P\left( 20.6 < W < 40.3 \right) \approx .8$

        3.  Note: Table 6 only gives 10 points on the cdf. With a
            > computer, you can get the rest. Excel: CHISQ.DIST(x,df,
            > cdf?), CHISQ.INV(percentile, df)

    6.  Facts

        1.  If $Z \sim N(0,1)$ then $Z^{2} \sim \chi^{2}(1)$

        2.  If $W_{1} \sim \chi^{2}(4)$ and
            > $W_{2} \sim \chi^{2}\left( 7 \right)$ independent then
            > $W_{1} + W_{2} \sim \chi^{2}(11)$

        3.  Variance is a quadratic function of a random variable, so
            > when we estimate the variance of a random variable that
            > has a normal distribution (in lecture L19), our estimates
            > will follow a $\chi^{2}$ distribution.

2.  $t$ distribution (Friedrich Robert Helmert 1876, Karl Pearson 1900)

    1.  $T \sim t(\nu)$; as in Chi-square distribution, $\nu$ is called
        > “degrees of freedom”

    2.  Similar to standard normal, but with higher variance (i.e.
        > thicker tails)

    3.  Approaches $N(0,1)$ as $\nu \rightarrow \infty$

    4.  $f\left( t \right) = ugly$ (I won’t expect you to know or use)

    5.  $E\left( T \right) = 0$,
        > $V\left( T \right) = \frac{\nu}{\nu - 2} \rightarrow 1$

    6.  CDF $F\left( t \right)$ approximated on Table C

        1.  Table is oriented so that probability $C$ lies between
            > $- t^{*}$ and $t^{*}$.

        2.  Example: if $T \sim t\left( 20 \right)$ find 90^th^
            > percentile

            1.  Following $C = 80\%$ (fifth column) for $df = 20$ leads
                > to $t^{*} = 1.325$.

            2.  In other words, $10\%$ of the distribution is left of
                > $- 1.325$, $80\%$ is between $- 1.325$ and $1.325$,
                > and $10\%$ is above $1.325$.

            3.  Since $10\% + 80\% = 90\%$ of the distribution is below
                > $1.325$ and $10\%$ is above, $1.325$ is the 90^th^
                > percentile of the distribution.

            4.  Alternatively, can come up from a one-sided p-value of
                > $.10$ or a two-sided p-value of $.20$ (bottom of the
                > table) to reach the same conclusion.

        3.  For degrees of freedom greater than $1000$, can read $z^{*}$
            > row of the table, which corresponds to a standard normal
            > distribution (i.e., $\infty$ degrees of freedom).

        4.  Note: Table C only gives 12 points on CDF. With a computer,
            > you can get the rest. Excel: T.DIST(x, df, cdf?) and
            > T.INV(percentile, df)

    7.  Fact

        1.  If $Z \sim N(0,1)$ and $W \sim \chi^{2}(\nu)$ independent
            > then $\frac{Z}{} \sim t(\nu)$

        2.  If we knew the population variance, then estimates of the
            > mean would follow a normal distribution. Since we have to
            > estimate the population variance, and estimates follow a
            > $\chi^{2}$ distribution, our estimates of the mean follow
            > a $t$ distribution

3.  Other distributions

    1.  The distributions we’ve gone over are some of the most common;
        > there are many others, with various shapes, properties, and
        > uses.

    2.  Illustrated:
        > https://www.itl.nist.gov/div898/handbook/eda/section3/eda366.htm

    3.  Discrete

        1.  Uniform

        2.  Binomial

        3.  Geometric

        4.  Poisson

        5.  Hypergeometric

    4.  Continuous

        1.  Exponential

        2.  F

        3.  Beta

        4.  Gamma

        5.  Log-normal

        6.  Pareto

        7.  Weibull

# L17 Confidence Intervals (WMS 7.2-3,8.5-9)

Project note

1.  If you didn’t turn the project in on time, get it in ASAP! Items
    > from part 2 of the project will show up on homework; if you do
    > them with your homework, your project will be finished by the end
    > of the semester.

2.  From now on, must start on project as part of homework

3.  Keep results, to submit as project

4.  Note: If you have a population instead of a sample from a population
    > (e.g. all 50 states), just pretend this is a sample from a larger
    > population (i.e. 50 draws from a population of thousands of U.S.
    > states).

Samples

1.  Population vs. sample

    1.  So far, our discussion of distributions has presumed an entire
        > population. Often, information is only available from a
        > sample.

        1.  Surveys are costly, populations are often huge

        2.  Some of you might have whole populations (e.g. all 50
            > states, all teams, every week of a company’s sales data);
            > for projects, pretend sample even if you actually have
            > population. But be careful:

            1.  Sometimes population of interest includes future
                > generations (e.g. NBA rookies, stock returns).

            2.  Similarly, population of things that actually happened
                > can in some cases be viewed as a sample from the
                > larger set of things that potentially could have
                > occurred instead.

    2.  Unless entire population is observed, can’t know what is true,
        > only what is *probably* true

2.  Random sample

    1.  i.i.d. (Independently and Identically Distributed): survey
        > answers are independent from each other, and identical to
        > population of interest

    2.  Convenience survey (e.g. urban survey of wages): expand sample
        > or limit scope of inference

    3.  Selection bias (e.g. survey participation, program
        > participation): administrative records, measurements before
        > participation decided, interpret results narrowly (e.g.
        > benefit of college for those who chose to attend)

    4.  Time trends (e.g. daily/weekly sales) – rare “spot check”
        > observations, econometric corrections

3.  Estimation

    1.  Example: Suppose we wish to estimate the average family size
        > $\mu$ of BYU students, along with the standard deviation
        > $\sigma$ and the correlation $\rho$ between family size and
        > GPA. What pieces of data should be used, and how should they
        > be combined?

    2.  Population parameter $\theta$ (i.e. generic proxy for
        > $\mu,\ \sigma,\ a,\ b,\ \rho,\ \beta,\ p$, etc.), seek
        > “estimator” function
        > $\widehat{\theta}(x_{1},x_{2},\ldots,x_{n})$ (commonly denoted
        > by “hat” variable)

        1.  Evaluating this “estimator” function with our data provides
            > *point estimates*; next two lectures we’ll talk about
            > interval estimates, or margin of error

    3.  An estimator is a tool for producing estimates. We’ll spend most
        > of the semester talking about a variety of such tools (i.e.
        > estimators for different parameters) but first we need some
        > tool-building tools (i.e. techniques for developing estimators
        > in new settings of interest).

Estimators vs. estimates

1.  Example: suppose distribution of income among last year’s $8,500$
    > BYU graduates has mean $E\left( X_{i} \right) = \mu = \$ 48k$ and
    > standard deviation $= \sigma = \$ 13k$

> But we can’t observe this, so we survey $n = 25$ graduates and
> estimate $\widehat{\mu} = \frac{1}{n}x_{i} =$ and
> $\widehat{\sigma^{2}} = \frac{1}{n}\left( x_{i} - \right)^{2}$

1.  Sampling distribution

    1.  Every survey of $25\ $students yields different estimates
        > $\left( \widehat{\mu},\widehat{\sigma^{2}} \right)$. Sampling
        > with replacement, there are ${8,500}^{25} \approx 10^{98}$
        > such samples.

> (Sampling without replacement is more common in practice, and violates
> i.i.d. but only slightly, as long as population size is large.)

1.  Before we conduct interviews, survey responses
    > $X_{1},X_{2},\ldots,X_{n}$ can be viewed as random variables, each
    > drawn from the population of BYU grads

```{=html}
<!-- -->
```
1.  Estimates and estimators

    1.  Once we conduct survey,
        > $\widehat{\theta}\left( x_{1},x_{2},\ldots,x_{n} \right)$
        > provides *estimate* of parameter $\theta$. Before we conduct
        > survey, *estimator*
        > $\widehat{\theta}\left( X_{1},X_{2},\ldots,X_{n} \right)$ is
        > random.

    2.  To evaluate estimation procedure, we must think about entire
        > *distribution* of estimates (in other words, evaluate
        > estimator), not individual estimate.

    3.  Therefore, $\widehat{\mu} = \frac{1}{n}X_{i} =$ is random
        > variable with mean $\mu_{\widehat{\mu}}$ and variance
        > $\sigma_{\widehat{\mu}}^{2}$

    4.  Similarly,
        > $\widehat{\sigma^{2}} = \frac{1}{n}\left( X_{i} - \right)^{2}$
        > is random variable with mean $\mu_{\widehat{\sigma^{2}}}$ and
        > variance $\sigma_{\widehat{\sigma^{2}}}^{2}$

Margin of error

1.  Recall that

> $\mu_{} = E\left( \frac{1}{n}X_{i} \right) = \ldots = \mu$
>
> $\sigma_{}^{2} = V\left( \frac{1}{n}X_{i} \right) = \ldots = \frac{\sigma^{2}}{n}$

1.  Previous estimates are *point* estimates; *margin of error* (e.g.
    > $\pm \$ 20k$) measures precision, gives *interval* estimate

2.  Example

    1.  Income $X_{i}$ of 8,500 BYU graduates has unknown mean $\mu$ and
        > known standard deviation $\sigma = \$ 13k$.

    2.  If $n = 25$ then $$ has same mean $\mu$, and standard error
        > $\sigma_{} = = \$ 2.6k$

    3.  Rule of thumb: $X_{i}$ typically within $\mu \pm 2\sigma$, $$
        > typically within $\mu \pm 2\sigma_{} = \mu \pm \$ 5.2k$; thus,
        > $\$ 5.2k$ is “margin of error”

    4.  Dog and leash principle: 3 ft. leash keeps dog within 3 ft. of
        > owner; symmetrically keeps owner within 3 ft. of dog

    5.  Observe $= \$ 47.1k$

> Maybe $\mu$ as low as $\$ 41.9k$ and we overestimated
>
> Maybe $\mu$ as high as $\$ 52.3k$ and we underestimated.

1.  If $\sigma$ unknown, can estimate margin of error using $$

Confidence Intervals

1.  How often is $$ in interval $\mu \pm 2\sigma$? To compute
    > probability, we need the cdf of $$.

2.  Normality of $$

    1.  If population distribution of $X_{i}$ is normal then
        > $= \frac{1}{n}X_{i}$ is normal too. Specifically,
        > $\sim N\left( \mu,\frac{\sigma^{2}}{n} \right)$.

    2.  Standardizing, $\frac{- \mu}{} \sim N(0,1)$.

Confidence interval for $\mu$

1.  Construction

    1.  We *want* $\Pr\Pr\ \left( \# < \mu < \# \right)\  = .90$ and
        > from Table A we *know*
        > $\sim N\left( \mu,\frac{\sigma^{2}}{n} \right) = N\left( \mu,\$ 2.6k^{2} \right)\ $(still
        > assuming$\ \sigma = \$ 13k\ $and$\ n = 25$)

> $.90 = P\left( - 1.64 < \frac{- \mu}{\$ 2.6k} < 1.64 \right)$
>
> $= P\left( - 1.64 \cdot \$ 2.6k < - \mu < 1.64 \cdot \$ 2.6k \right)$
>
> $\approx P\left( - - \$ 4.3k < - \mu < - + \$ 4.3k \right)$
>
> $= P\left( + \$ 4.3k > \mu > - \$ 4.3k \right)$

1.  (Can also construct one-sided confidence intervals)

2.  Example: $= \$ 47.1k$ (still assume $\sigma = \$ 13k$; later we’ll
    > estimate)

    1.  90% confidence interval
        > $\pm 1.64\sigma_{} = \$ 47.1k \pm \$ 4.3k$

    2.  95% confidence interval
        > $\pm 1.96\sigma_{} = \$ 47.1k \pm \$ 5.1k$

    3.  99% confidence interval
        > $\pm 2.58\sigma_{} = \$ 47.1k \pm \$ 6.7k$

```{=html}
<!-- -->
```
1.  Distribution of $S^{2}$

    1.  If $X_{i} \sim N\left( \mu,\sigma^{2} \right)$ and
        > $\sim N\left( \mu,\frac{\sigma^{2}}{n} \right)$ then
        > $\left( n - 1 \right)\frac{S^{2}}{\sigma^{2}} \sim \chi^{2}\left( n - 1 \right)$.

    2.  Intuitively, expectation of $\chi^{2}\left( n - 1 \right)$ is
        > $n - 1$, expectation of $\frac{S^{2}}{\sigma^{2}}$ is $1$.

2.  Confidence interval for $\mu$ when $\sigma$ unknown

    1.  If we replace $\sigma^{2}$with $s^{2}$ then
        > $\frac{- \mu}{} \sim t(n - 1)$.

        1.  This is because
            > $\frac{- \mu}{} = \frac{- \mu}{} \cdot \frac{1}{}$, which
            > is $N\left( 0,1 \right)$ divided by
            > $\frac{\chi^{2}\left( n - 1 \right)}{n - 1}$

        2.  Note: if $n$ large then
            > $t\left( n - 1 \right) \approx N(0,1)$.

    2.  Example: average weekly income $n = 25$, $= \$ 47.1k$,
        > $s = \$ 13k$, ${\widehat{\sigma}}_{} = = \$ 2.6k$

        1.  90% confidence interval
            > $\pm 1.726{\widehat{\sigma}}_{} = \$ 47.1k \pm \$ 4.5k$

        2.  95% confidence interval
            > $\pm 2.093{\widehat{\sigma}}_{} = \$ 47.1k \pm \$ 5.4k$

        3.  99% confidence interval
            > $\pm 2.861{\widehat{\sigma}}_{} = \$ 47.1k \pm \$ 7.4k$

Central Limit Theorem (de Moivre 1733, Laplace 1812, Lyapunov 1901)

1.  $X_{i} \rightarrow N$ (and therefore $\rightarrow N$) no matter what
    > the distribution of $X_{i}$

2.  Dice example

    1.  Distribution of $X_{1} + X_{2}$ is bell-shaped, even though
        > $X_{i}$ is (discrete) uniform

    2.  Intuition: centrist values frequent (e.g. moderate $X_{1}$ and
        > $X_{2}$, or $X_{1}$ low $X_{2}$ high, or vice versa), but
        > extreme values rare (e.g. $X_{1}$ and $X_{2}$ both low)

    3.  $P\left( {}_{100} = 1 \right) = \left( \frac{1}{6} \right)^{100} \approx 10^{- 78}$;
        > tails become *exponentially* less likely (key feature of
        > normal distribution) as $n$ increases

3.  Skewed example

    1.  Bernoulli unemployment
        > $P\left( 0,1 \right) = \left( .7,.3 \right)$

    2.  Average of two:
        > $P\left( 0,.5,1 \right) \approx \left( .5,.4,.1 \right)$

    3.  Average of four:
        > $P\left( 0,.25,.5,.75,1 \right) \approx (.2$`<!-- -->`{=html}5,$.4,.25,.1,0)$

4.  CLT explains why normal distribution is so prevalent in nature: one
    > attribute is sum total of many, smaller, independent attributes

# L18 Hypothesis Tests (WMS 10.2-8)

1.  Hypothesis test: old profit $X \sim N({\$ 400,\$ 100}^{2})$, new
    > management; keep or fire?

    1.  Null hypothesis (benefit of doubt) $H_{0}:\mu = 400$

    2.  Alternative hypothesis (burden of proof) $H_{a}:\mu < 400$

    3.  Level
        > $\alpha = \Pr\Pr\ \left( H_{0}\text{\ true} \right)\  = .10$

    4.  Test statistic $\frac{- \mu}{} \sim N(0,1)$

    5.  Critical value $- 1.28$, rejection region to left

    6.  Data: $= \$ 350$ over 8 weeks

    7.  If $H_{0}$ true,
        > $\frac{- \mu}{} = \frac{350 - 400}{} \approx - 1.41 \in RR$;
        > reject $H_{0}$

    8.  “Significantly less than 400” (statistical vs. practical
        > significance)

    9.  Type 1 error: convict innocent (probability $\alpha$)

    10. Type 2 error: acquit guilty (probability $\beta$)

    11. Repeat for $\alpha = .01$; critical value $- 2.33$, fail to
        > reject

    12. P-value = smallest $\alpha$ such that (for this data) reject
        > $H_{0}$; $0.0793$ in this case

    13. Practice: Reject if $\alpha = .05$?

2.  Variations

    1.  $H_{a}:\mu < 380$ (expect and tolerate adjustment cost \$20 for
        > new); test statistic increases to $- .85$, p-value increases
        > to $0.20$. (At $\alpha = .10$ level, \$350 is *significantly*
        > less than \$400, but not significantly less than \$380)

    2.  $H_{a}:\mu > 450$; if still $\alpha = .10$ then critical value
        > $+ 1.28$; test statistic negative, so (really) fail to reject

    3.  What if $\sigma^{2}$ unknown, and $s^{2} = 100^{2}$ instead? Use
        > t-distribution with 7 degrees of freedom; critical value if
        > $\alpha = .10$ is $1.415$; reject null hypothesis. (p-value
        > not on chart, but by computer is $0.1007$)

    4.  $H_{a}:\mu \neq 400$; critical values at $\pm 1.645$, now fail
        > to reject; p-value $2\left( .079 \right) = 0.158$

3.  Relationship to confidence intervals

    1.  In two-sided $\alpha = .05$ level hypothesis test, reject if
        > $\left| \frac{- 400}{\sigma_{}} \right| > 1.645$. In other
        > words, if $$ more than $1.645\sigma_{}$ units from 400.

    2.  Two-sided 95% confidence interval consists of
        > $\pm 1.645\sigma_{}$

    3.  In other words, $.05$ level hypothesis test merely asks whether
        > $400$ lies inside the 95% confidence interval.

# L19 Bias and Consistency (WMS 7.2-7.4, 9.1-9.3)

\[What if you used median to estimate mean, say in income distribution?
Biased.\]

Properties of estimators

1.  Evaluating $\widehat{\theta}$ amounts to evaluating distribution of
    > $\widehat{\theta}\left( X_{1},X_{2},\ldots,X_{n} \right)$ relative
    > to true unknown value $\theta$

2.  Though $\theta$ is unknown, we know how $\widehat{\theta}$ relates
    > to $X_{i}$ and how $X_{i}$ relates to $\theta$, so can know
    > (probabilistically) how $\widehat{\theta}$ relates to $\theta$

3.  We’ll use this to evaluate estimator goodness and to define *margin
    > of error*/*interval estimates*, and do *hypothesis test*

4.  Moments of $\widehat{\mu} =$

    1.  $\mu_{\widehat{\mu}} = E\left( \widehat{\mu} \right) = E\left( \right) = E\left( \frac{1}{n}X_{i} \right) = \frac{1}{n}E\left( X_{i} \right) = \frac{1}{n}\text{nE}\left( X_{i} \right) = E\left( X_{i} \right) = \mu$

> Thus, thought we don’t know what $\mu$ is, we know that average
> realization of $$ and average realization of $X_{i}$ are same

1.  $\sigma_{\widehat{\mu}}^{2} = V\left( \widehat{\mu} \right) = V\left( \right) = V\left( \frac{1}{n}X_{i} \right) = \frac{1}{n^{2}}V\left( X_{i} \right) = \frac{1}{n^{2}}\text{nV}\left( X_{i} \right) = \frac{\sigma^{2}}{n}$

> Variance of $$ is much smaller than variance of $X_{i}$

1.  Standard error (i.e. standard deviation of estimator)
    > $\sigma_{} = = \frac{\sigma}{}$

    1.  In population ($n = 1$), incomes typically between
        > $\$ 48k \pm \$ 26k$ $\lbrack\$ 22k,\$ 74k$\]

    2.  For $n = 25$, sample average $$ typically between
        > $\$ 48k \pm \$ 5.2k$
        > $\left\lbrack \$ 43k,\$ 53k \right\rbrack$

    3.  For $n = 100$, sample average $$ typically between
        > $\$ 48k \pm \$ 2.6k$ $\lbrack\$ 44k,\$ 51k\rbrack$

    4.  For $n = 10,000$, $$ typically between $\$ 48k \pm \$ 0.26k$
        > $\lbrack\$ 47.7,\$ 48.3k\rbrack$

Consistency

1.  Best imaginable case: $\widehat{\theta}$ degenerate with
    > $E\left( \widehat{\theta} \right) = \theta$ and
    > $V\left( \widehat{\theta} \right) = 0$

2.  As $n \rightarrow \infty$, $\widehat{\theta}$ approaches ideal
    > distribution

    1.  That is, $E\left( \widehat{\theta} \right) \rightarrow \theta$
        > and $V\left( \widehat{\theta} \right) \rightarrow 0$

> Put differently, ${\widehat{\theta}}_{n} \rightarrow \theta$ (“in
> probability”)

1.  Example: $\widehat{\mu} =$ is consistent estimator of $\mu$

    1.  $E\left( \widehat{\mu} \right) = \mu$ for all $n$

    2.  $V\left( \widehat{\mu} \right) = \frac{\sigma^{2}}{n} \rightarrow 0$

2.  Law of large numbers (Jacob Bernoulli, 1713)

    1.  Sample means converge to population means

    2.  Higher order moments

        1.  $E\left( \frac{1}{n}X_{i}^{3} \right) = E\left( X_{i}^{3} \right)$

        2.  $V\left( \frac{1}{n}X_{i}^{3} \right) = \frac{V\left( X_{i}^{3} \right)}{n} \rightarrow 0$

        3.  Sample moments converge to population moments (justification
            > for MOM)

3.  Fact: continuous functions of consistent estimators are consistent

4.  Fact: MLE are always consistent

Bias

1.  Bias
    > $B\left( \widehat{\theta} \right) = E\left( \widehat{\theta} - \theta \right) = E\left( \widehat{\theta} \right) - \theta$

2.  On average, does $\widehat{\theta}$ produces estimates that are
    > higher or lower than $\theta$?

3.  Unbiased estimator: $E\left( \widehat{\theta} \right) = \theta$

4.  $$ is *unbiased* estimator of $\mu$ because $E\left( \right) = \mu$

5.  Example of biased estimation procedure: sample max from uniform
    > distribution

6.  When bias can be measured, can sometimes correct (target analogy)

(Relative) Efficiency

1.  Given two estimators, the one with lower variance is more efficient.

2.  An estimator cannot be efficient, per se, but only more efficient
    > than another estimator. In some cases in Econ 388, however, it is
    > possible to prove categorically that a particular unbiased
    > estimator is more efficient than any other unbiased estimator.

3.  Example: consider throwing out one observation, computing sample
    > average of $n - 1$ observations

    1.  $E\left( \widetilde{\mu} \right) = \mu$ still

    2.  $V\left( \widetilde{\mu} \right) = \ldots = \frac{\sigma^{2}}{n - 1}$

    3.  Still unbiased, still consistent, but less efficient than using
        > all available data

Sample Variance

1.  ${\widehat{\sigma}}_{\text{MOM}}^{2}$ is biased

    1.  ${\widehat{\sigma}}_{\text{MOM}}^{2} = \frac{1}{n}\left( X_{i} - \right)^{2} = \ldots = \frac{1}{n}X_{i}^{2} - {}^{2}$

    2.  $E\left( {\widehat{\sigma}}_{\text{MOM}}^{2} \right) = \frac{1}{n}E\left( X_{i}^{2} \right) - E\left( {}^{2} \right)$

> $= \frac{1}{n}(\mu^{2} + \sigma^{2}) - \left( \mu^{2} + \frac{\sigma^{2}}{n} \right)$
>
> (since
> $\sigma^{2} = V\left( X_{i} \right) = E\left( X_{i}^{2} \right) - \mu^{2}$
> and
> $\frac{\sigma^{2}}{n} = V\left( \right) = E\left( {}^{2} \right) - \mu^{2}$)
>
> $= \mu^{2} + \sigma^{2} - \mu^{2} - \frac{\sigma^{2}}{n} = \sigma^{2} - \frac{\sigma^{2}}{n} = \frac{n - 1}{n}\sigma^{2}$

1.  $B\left( {\widehat{\sigma}}_{\text{MOM}}^{2} \right) = \frac{n - 1}{n}\sigma^{2} - \sigma^{2} = - \frac{1}{n}\sigma^{2}$

2.  Still consistent:
    > $B\left( {\widehat{\sigma}}_{\text{MOM}}^{2} \right) \rightarrow 0$
    > (and can show that
    > $V\left( {\widehat{\sigma}}_{\text{MOM}}^{2} \right) \rightarrow 0$)

```{=html}
<!-- -->
```
1.  “Sample variance”
    > $S^{2} = \frac{1}{n - 1}\left( X_{i} - \right)^{2}$

    1.  To eliminates bias:
        > $E\left( \frac{n}{n - 1}{\widehat{\sigma}}_{\text{MOM}}^{2} \right) = \frac{n}{n - 1}E\left( {\widehat{\sigma}}_{\text{MOM}}^{2} \right) = \frac{n}{n - 1}\frac{n - 1}{n}\sigma^{2} = \sigma^{2}$

    2.  So if
        > $S^{2} = \frac{n}{n - 1}{\widehat{\sigma}}_{\text{MOM}}^{2} = \frac{1}{n - 1}\left( X_{i} - \right)^{2}$then
        > $B\left( S^{2} \right) = 0$

        1.  Example: sample of $n = 4$ student wages,
            > $x_{i} = \$ 11,\$ 10,\$ 14,\$ 15$, $= \$ 13.50$,
            > ${\widehat{\sigma}}_{\text{MOM}} = = \approx \$ 2.29$

> $s = = \approx \$ 2.65$

1.  Excel: use VAR.S or STDEV.S, not =VAR.P or =STDEV.P

```{=html}
<!-- -->
```
1.  Correcting bias actually sacrifices some efficiency

# L20 Difference in Means, Proportions (WMS 8.3-8,10.3)

1.  \[Long lecture; use time efficiently.\]

2.  Difference in means

    1.  Relating quantitative and binary variables: conditional
        > distributions, conditional means $E\left( X = 0 \right)$,
        > $E\left( X = 1 \right)$

    2.  Wages gap between men and women:

> $n_{w} = 40$, ${{}_{w} = \$ 32,\ \sigma_{w} = \$ 13,\ \ n}_{m} = 45$,
> ${}_{m} = \$ 35$, $\sigma_{m} = \$ 15$.

1.  95% confidence intervals for men
    > $\left\lbrack \$ 30.62,\ \$ 39.38 \right\rbrack$ and women
    > $\left\lbrack \$ 27.97,\$ 36.03 \right\rbrack$ overlap, making it
    > difficult to tell true size of wage gap (if any)

2.  Trick (used a lot in more advanced settings): combine into single
    > parameter

> $\theta = \left( \mu_{m} - \mu_{w} \right)$; MOM estimator
> $\widehat{\theta} = \left( {}_{m} - {}_{w} \right)$

1.  $E\left( \widehat{\theta} \right) = E\left( {}_{m} - {}_{w} \right) = E\left( {}_{m} \right) - E\left( {}_{w} \right) = \mu_{m} - \mu_{w} = \theta$;
    > unbiased!

2.  $V\left( \widehat{\theta} \right) = V\left( {}_{m} - {}_{w} \right) = \frac{\sigma_{m}^{2}}{n_{m}} + \left( - 1 \right)^{2}\frac{\sigma_{w}^{2}}{n_{w}} \rightarrow 0$;
    > consistent (as long as both sample sizes grow large)!

3.  ${}_{m} \sim N\left( \mu_{m},\frac{\sigma_{m}^{2}}{n_{m}} \right)$
    > and
    > ${}_{w} \sim N\left( \mu_{w},\frac{\sigma_{w}^{2}}{n_{w}} \right)$,
    > so…

4.  ${}_{m} - {}_{w} \sim N\left( \mu_{m} - \mu_{w},\frac{\sigma_{m}^{2}}{n_{m}} + \frac{\sigma_{w}^{2}}{n_{w}} \right)$

> Standardizing,
> $\frac{\widehat{\theta} - \mu_{\widehat{\theta}}}{\sigma_{\widehat{\theta}}} = \frac{\left( {}_{m} - {}_{w} \right) - \left( \mu_{m} - \mu_{w} \right)}{} \sim N(0,1)$

1.  Note: if estimate $s_{A}^{2}$ and $s_{B}^{2}$ then
    > $\frac{\left( {}_{m} - {}_{w} \right) - \left( \mu_{m} - \mu_{w} \right)}{} \sim t\left( df = \frac{\left( \frac{s_{m}^{2}}{n_{m}} + \frac{s_{w}^{2}}{n_{w}} \right)^{2}}{\frac{\left( \frac{s_{m}^{2}}{n_{m}} \right)^{2}}{n_{m} - 1} + \frac{\left( \frac{s_{w}^{2}}{n_{w}} \right)^{2}}{n_{w} - 1}} \right)$

    1.  (e.g. If $s_{m} = \$ 12$ and $s_{w} = \$ 10$ then
        > $df \approx 83$)

    2.  For this class, just use
        > $t\left( \text{df} \right) \approx N\left( 0,1 \right)$, which
        > is appropriate when $n_{m}$ and $n_{w}$ are both large

    3.  (df between minimum and sum of $\left( n_{m} - 1 \right)$ and
        > $\left( n_{w} - 1 \right)$)

```{=html}
<!-- -->
```
1.  Margin of error: $\pm \ 2 = 2\left( \$ 1.98 \right) = \$ 3.96$

2.  95% confidence interval for $\left( \mu_{m} - \mu_{w} \right)$:
    > $\left( {}_{m} - {}_{w} \right) \pm 1.96 = \lbrack\$ 0.11,\$ 7.89\rbrack$

3.  Test $\mu_{m} - \mu_{w} > 0$: test statistic
    > $\frac{\left( {}_{m} - {}_{w} \right) - \left( \mu_{m} - \mu_{w} \right)}{} = \frac{4 - 0}{} = 2.02$;
    > p-value 0.0217

4.  Test $\mu_{m} - \mu_{w} \neq 0$: p-value $2 \cdot 0.0217 = 0.0434$

5.  Test $\mu_{m} - \mu_{w} > \$ 2$: test statistic
    > $\frac{\left( {}_{m} - {}_{w} \right) - \left( \mu_{m} - \mu_{w} \right)}{} = \frac{4 - 2}{} = 1.01$;
    > p-value 0.1562

6.  Note: if we estimated $\mu_{w} - \mu_{m}$ instead of
    > $\mu_{m} - \mu_{w}$, rejection region would be on left instead of
    > right, and test statistics would be negative instead of positive,
    > but produce same p-values

```{=html}
<!-- -->
```
1.  Binary data (i.e. Bernoulli($p$))

    1.  Intuitive estimator: proportion $\widehat{p} = \frac{Y}{n}$,
        > where $Y$ = \# of 1’s in data

        1.  Example: election survey, $n = 100$,
            > $\widehat{p} = \frac{52}{100} = .52$

    2.  MOM estimator: ${\widehat{p}}_{\text{MOM}} =$; actually same,
        > since $Y = X_{i}$ (for zeros and ones, adding is the same as
        > counting)

    3.  Since $Y \sim Bin(n,p)$,

> $E\left( \widehat{p} \right) = E\left( \frac{Y}{n} \right) = \frac{1}{n}E\left( Y \right) = \frac{\text{np}}{n} = p$;
> unbiased!
>
> $V\left( \widehat{p} \right) = \frac{1}{n^{2}}V\left( Y \right) = \frac{\text{np}\left( 1 - p \right)}{n^{2}} = \frac{p\left( 1 - p \right)}{n} \rightarrow 0$;
> consistent!

1.  By Central Limit Theorem,
    > $\widehat{p} = \rightarrow N\left( p,\frac{p\left( 1 - p \right)}{n} \right) \Rightarrow \frac{\widehat{p} - p}{} \rightarrow N\left( 0,1 \right)$

> Note: this is not actually different from $\frac{- \mu}{}$; just
> special case with $= \widehat{p}$, $\mu = p$, and
> $\sigma^{2} = p(1 - p)$
>
> Note: does not follow $t$ distribution for small $n$, because $X_{i}$
> not normal

1.  Example: election survey, $n = 100$,
    > $\widehat{p} = \frac{52}{100} = .52$

    1.  Margin of error:
        > $2 \approx 2 = 2 \approx 2\left( .05 \right) = 0.1$

    2.  95% Confidence interval
        > $\approx \widehat{p} \pm 1.96 = .52 \pm 1.96\left( .05 \right) = \lbrack.422,.618\rbrack$

    3.  Test $H_{0}:p = 5$ against $H_{a}:p > 5$: test statistic
        > $\frac{\widehat{p} - p}{} = \frac{.52 - .5}{} = 0.40$; p-value
        > 0.3446

```{=html}
<!-- -->
```
1.  Difference in proportions: unemployment in U.S. and France (2%
    > difference?)

    1.  $n_{F} = 1000$, $\widehat{p} = \frac{109}{1000} = .109$;
        > $n_{\text{US}} = 500$,
        > ${\widehat{p}}_{\text{US}} = \frac{38}{500} = .076$

    2.  95% confidence intervals
        > $\left\lbrack .090,.128 \right\rbrack\lbrack.053,.099$\]

    3.  Estimate $\left( p_{F} - p_{\text{US}} \right)$ with MOM
        > estimator
        > $\left( {\widehat{p}}_{F} - {\widehat{p}}_{\text{US}} \right)$

        1.  $E\left( {\widehat{p}}_{F} - {\widehat{p}}_{\text{US}} \right) = E\left( {\widehat{p}}_{F} \right) - E\left( {\widehat{p}}_{\text{US}} \right) = p_{F} - p_{\text{US}}$;
            > unbiased!

        2.  $V\left( {\widehat{p}}_{F} - {\widehat{p}}_{\text{US}} \right) = V\left( {\widehat{p}}_{F} \right) + V\left( {\widehat{p}}_{\text{US}} \right) = \frac{p_{F}\left( 1 - p_{F} \right)}{n_{F}} + \frac{p_{\text{US}}\left( 1 - p_{\text{US}} \right)}{n_{\text{US}}} \rightarrow 0$;
            > consistent!

        3.  $\frac{\left( {\widehat{p}}_{F} - {\widehat{p}}_{\text{US}} \right) - \left( p_{F} - p_{\text{US}} \right)}{} \sim N\left( 0,1 \right)$

    4.  95% Confidence interval
        > $\left( {\widehat{p}}_{F} - {\widehat{p}}_{\text{US}} \right) \pm 1.96 = \lbrack.003,.063\rbrack$

    5.  Test $\left( p_{F} - p_{\text{US}} \right) > 0$, test statistic
        > $\frac{\left( {\widehat{p}}_{F} - {\widehat{p}}_{\text{US}} \right) - 0}{} \approx 2.14$;
        > p-value .0162

    6.  Test $\left( p_{F} - p_{\text{US}} \right) > .02$, test
        > statistic
        > $\frac{\left( {\widehat{p}}_{F} - {\widehat{p}}_{\text{US}} \right) - .02}{} \approx 0.84$;
        > p-value .2005

# L21 Variance Estimation (WMS 8.9,10.9)

Review

1.  ${\widehat{\sigma}}_{\text{MOM}}^{2} = \frac{1}{n}\left( x_{i} - \right)^{2}$

2.  $S^{2} = \frac{1}{n - 1}\left( x_{i} - \right)^{2}$

Variance estimation

1.  Applications: inequality/heterogeneity, quality control, estimation
    > error

2.  $\left( n - 1 \right)\frac{S^{2}}{\sigma^{2}} \sim \chi^{2}\left( n - 1 \right)$

3.  Sample variance:
    > $(n - 1)\frac{S^{2}}{\sigma^{2}} \sim \chi^{2}(n - 1)$

    1.  Intuition 1: $X_{i} \sim N(\mu,\sigma^{2})$, so
        > $\left( \frac{X_{i} - \mu}{\sigma} \right)^{2} \sim \chi^{2}(1)$;
        > $\left( \frac{X_{i} - \mu}{\sigma} \right)^{2} \sim \chi^{2}(n)$;
        > we lose one degree of freedom because we’re measuring
        > deviations from $$ rather than deviations from $\mu$

    2.  Intuition 2: a single observation conveys information about
        > $\mu$ but not $\sigma^{2}$, so if $n = 100$ then we have 100
        > pieces of information about $\mu$ but only 99 pieces of
        > information about $\sigma^{2}$

    3.  Intuition 3: $E\left( S^{2} \right) = \sigma^{2}$, so
        > $E\left\lbrack \left( n - 1 \right)\frac{S^{2}}{\sigma^{2}} \right\rbrack = n - 1$

    4.  \[Skip\] Formal derivation:
        > $\left( \frac{X_{i} - \mu}{\sigma} \right)^{2} = \left( \frac{\left( X_{i} - \right) + \left( - \mu \right)}{\sigma} \right)^{2}$

> $= \left( \frac{X_{i} -}{\sigma} \right)^{2} + \left( \frac{- \mu}{\sigma} \right)^{2} + 2\frac{\left( X_{i} - \right)\left( - \mu \right)}{\sigma^{2}}$

$= \left( n - 1 \right)\frac{S^{2}}{\sigma^{2}} + \frac{n\left( - \mu \right)^{2}}{\sigma^{2}} + 2\frac{\left( - \mu \right)}{\sigma^{2}}\left( X_{i} - \right)$

$= \left( n - 1 \right)\frac{S^{2}}{\sigma^{2}} + \frac{- \mu}{} + 2\frac{\left( - \mu \right)}{\sigma^{2}}\left( n - n \right)$

$\sim \chi^{2}\left( n - 1 \right) + \chi^{2}\left( 1 \right) + 0$

1.  Recall that, in estimating $\mu$, using $\frac{- \mu}{}$ instead of
    > $\frac{- \mu}{}$ required the use of a t distribution instead of a
    > normal. This is because it can be shown that
    > $Z = \frac{- \mu}{} \sim N\left( 0,1 \right)$ and
    > $W = \left( n - 1 \right)\frac{S^{2}}{\sigma^{2}}\text{\ igma\ he\ use\ of\ a\ t\ distribution\ instead\ of\ a\ normal.\ \ This\ is\ becausecould\ potentially\ have\ ressions\ that\ I\ have\ received\ } \sim \chi^{2}\left( n - 1 \right)$
    > are independent, implying that
    > $\frac{- \mu}{} = \frac{- \mu}{}\frac{1}{} = \frac{Z}{} \sim t\left( n - 1 \right)$.

```{=html}
<!-- -->
```
1.  Example: variance among $n = 71$ sales representatives is
    > $s^{2} = {5.3}^{2}$

    1.  Confidence interval

        1.  Seek $.95 = Pr(\# < \sigma < \#)$ and know
            > $\left( n - 1 \right)\frac{S^{2}}{\sigma^{2}} \sim \chi^{2}\left( 70 \right)$,
            > so from Table 6,

        2.  $\Pr\Pr\ \left( 48.76 < \left( n - 1 \right)\frac{S^{2}}{\sigma^{2}} < 95.02 \right)\  = \Pr\Pr\ \left( \frac{1}{48.76} > \frac{\sigma^{2}}{\left( n - 1 \right)s^{2}} > \frac{1}{95.02} \right)\ $

> $= \Pr\Pr\ \left( \frac{\left( n - 1 \right)s^{2}}{48.76} > \sigma^{2} > \frac{\left( n - 1 \right)s^{2}}{95.02} \right)\  = \Pr\Pr\ \left( > \sigma > \right)\ $
>
> $= \Pr\Pr\ \left( 6.35 > \sigma > 4.55 \right)\ $

1.  Hypothesis test

    1.  $H_{a}:\sigma^{2} > 4^{2}$, $\alpha = .05$

    2.  Critical value $90.53$

    3.  Test statistic
        > $\left( n - 1 \right)\frac{S^{2}}{\sigma^{2}} = 70\left( \frac{{5.3}^{2}}{4^{2}} \right) = 122.9$,
        > reject $H_{0}$ (from Excel, p-value is $10^{- 5}$)

# L22 Regression Estimation (WMS 11.1-3)

1.  Recall from Lecture 9

    1.  Relationship between $X$ and $Y$ can be represented by
        > $\rho = corr(X,Y)$ or by regression line
        > $Y = \beta_{0} + \beta_{1}X + \varepsilon$

    2.  $E\left( \varepsilon \right) = 0$ can be guaranteed by choosing
        > intercept to solve $\mu_{y} = \beta_{0} + \beta_{1}\mu_{x}$

    3.  Crystal ball: can predict $Y^{*} = \beta_{0} + \beta_{1}x^{*}$
        > for any $x^{*}$ value (even out of sample)

    4.  $\sigma_{\varepsilon}^{2}$ can be minimized by choosing slope
        > coefficient
        > $\beta_{1} = \frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} = \rho\frac{\sigma_{y}}{\sigma_{x}}$

    5.  Fraction of variation in $Y$ associated with $X$ is
        > $\frac{V\left( \beta_{0} + \beta_{1}X \right)}{V\left( Y \right)} = \frac{\beta_{1}^{2}\sigma_{x}^{2}}{\sigma_{y}^{2}} = \frac{\left( \rho^{2}\frac{\sigma_{y}^{2}}{\sigma_{x}^{2}} \right)\sigma_{x}^{2}}{\sigma_{y}^{2}} = \rho^{2}$

2.  Estimation

    1.  $s_{x}^{2} = \frac{1}{n - 1}\left( x_{i} - \right)^{2}$

    2.  $s_{\text{xy}} = \frac{1}{n - 1}\left( x_{i} - \right)\left( y_{i} - \right)$

    3.  $r = \frac{s_{\text{xy}}}{s_{x}s_{y}}$

    4.  $\widehat{\rho^{2}} = r^{2}$

    5.  ${\widehat{\beta}}_{1} = \frac{s_{\text{xy}}}{s_{x}^{2}} = r\frac{s_{y}}{s_{x}} = \frac{\left( x_{i} - \right)\left( y_{i} - \right)}{\left( x_{i} - \right)^{2}}$

    6.  ${\widehat{\beta}}_{0} = - b_{1}$

    7.  Income predictions
        > ${\widehat{y}}_{i} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$

    8.  Individual errors
        > ${\widehat{\varepsilon}}_{i} = y_{i} - {\widehat{y}}_{i}$

    9.  $s_{\varepsilon}^{2} = \frac{1}{n - 2}{\widehat{\varepsilon}}_{i}^{2}$

3.  Can also use “sums of squares”, rather than variance (i.e. “total”
    > not “average” deviations)

    1.  Let $S_{\text{xx}} = \left( x_{i} - \right)^{2}$

    2.  Let
        > $S_{\text{xy}} = \left( x_{i} - \right)\left( y_{i} - \right)$

    3.  With this notation,
        > ${\widehat{\beta}}_{1} = \frac{s_{\text{xy}}}{s_{x}^{2}} = \frac{S_{\text{xy}}}{S_{\text{xx}}}$

    4.  Let $S_{\text{εε}} = {\widehat{\varepsilon}}_{i}^{2}$

4.  Example : Regress Income $y$ (in \$ thousands) on Education $x$ (in
    > years)

| $x_{i}$ | $x_{i} -$            | $y_{i}$ | $y_{i} -$              | $\left( x_{i} - \right)\left( y_{i} - \right)$ | ${\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$ | ${\widehat{\varepsilon}}_{i}$ |
|---------|----------------------|---------|------------------------|------------------------------------------------|------------------------------------------------------|-------------------------------|
| $11$    | $- 4$                | $40$    | $- 30$                 | 120                                            | 37.2                                                 | 2.8                           |
| $16$    | $1$                  | $80$    | $10$                   | 10                                             | 78.2                                                 | 1.8                           |
| $16$    | $1$                  | $70$    | $0$                    | 0                                              | 78.2                                                 | -8.2                          |
| $14$    | $- 1$                | $60$    | $- 10$                 | 10                                             | 61.8                                                 | -1.8                          |
| $18$    | $3$                  | $100$   | $30$                   | 90                                             | 94.6                                                 | 5.4                           |
| $= 15$  | $S_{\text{xx}} = 28$ | $= 70$  | $S_{\text{yy}} = 2000$ | $S_{\text{xy}} = 230$                          |                                                      | $= 0$                         |
|         | $s_{x}^{2} = 7$      |         | $s_{y}^{2} = 500$      | $s_{\text{xy}} = 57.5$                         |                                                      | $S_{\text{εε}} = 111$         |
|         | $s_{x} \approx 2.6$  |         | $s_{y} \approx 22.4$   | $r \approx 0.97$                               |                                                      | $s_{\varepsilon}^{2} = 37$    |
|         |                      |         |                        | $r^{2} \approx 0.94$                           |                                                      | $s_{\varepsilon} = 6.1$       |
|         |                      |         |                        | ${\widehat{\beta}}_{1} \approx 8.2$            |                                                      |                               |
|         |                      |         |                        | ${\widehat{\beta}}_{0} \approx - 53$           |                                                      |                               |

1.  We’ll use this example again in subsequent lecture

2.  Predictions

    1.  High school graduate
        > ${\widehat{y}}_{x^{*} = 12}^{*} = - 53 + 8.2\left( 12 \right) = 45.4$

    2.  College graduate
        > ${\widehat{y}}_{x^{*} = 16}^{*} = - 53 + 8.2\left( 16 \right) = 78.2$

    3.  PhD graduate
        > ${\widehat{y}}_{x^{*} = 20}^{*} = - 53 + 8.2\left( 20 \right) = 111$

3.  Estimated errors

    1.  Predict income ${\widehat{y}}_{i}$ for each individual in sample

    2.  $\ {\widehat{\varepsilon}}_{i} = y_{i} - {\widehat{y}}_{i}$

        1.  Individual

    3.  $S_{\text{εε}} = {\widehat{\varepsilon}}_{i}^{2} = 111$

        1.  Alternatively,
            > $\sigma_{\varepsilon}^{2} = \left( 1 - \rho^{2} \right)\sigma_{y}^{2}$,
            > so
            > $SSE = \left( 1 - r^{2} \right)S_{\text{yy}} \approx \left( 1 - .9446 \right)\left( 2000 \right) = 111$
            > (useful if only know summary statistics for $X$ and $Y$).

    4.  $s_{\varepsilon}^{2} = \frac{1}{n - 2}SSE = 37$,
        > $s_{\varepsilon} = \approx 6.1$

4.  Illustrate with Excel: Data\>Data Analysis\>Regression, using
    > education & income data above

```{=html}
<!-- -->
```
1.  Preliminaries

    1.  Algebra trick 1: It can be shown that
        > $\left( x_{i} - \right) = 0$

> $= x_{i} - = n - n = 0$
>
> Similarly, $\left( Y_{i} - \right) = 0$

1.  Algebra trick 2: It can be shown that

> $S_{\text{xx}} = \left( x_{i} - \right)^{2} = \left( x_{i} - \right)\left( x_{i} - \right) = \left( x_{i} - \right)x_{i}$
>
> $= \left( x_{i} - \right)x_{i} - \left( x_{i} - \right)$
>
> $= \left( x_{i} - \right)x_{i} - \left( x_{i} - \right)$
>
> $= \left( x_{i} - \right)x_{i}$
>
> Similarly, $S_{\text{xy}} = \left( x_{i} - \right)Y_{i}$ and
> ${\widehat{\beta}}_{1} = \frac{S_{\text{xy}}}{S_{\text{xx}}} = \frac{1}{S_{\text{xx}}}\left( x_{i} - \right)Y_{i}$

1.  Deterministic $x_{i}$

    1.  You can think of $X_{i}$ and $Y_{i}$ as being random (i.e. they
        > depend on who you interview), and this is what we did when we
        > derived the population regression parameters. But for
        > simplicity, assume in the estimation that $X_{i} = x_{i}$ are
        > known. That is, we are only considering various samples of $n$
        > individuals who have the same education levels as the people
        > we sampled today (and incomes that potentially differ from the
        > people we interviewed).

    2.  If an estimator is unbiased conditional on these $x_{i}$’s, it
        > is also unbiased unconditionally. For example, if
        > $E\left( X_{1} = x_{1},X_{2} = x_{2},\ldots,X_{n} = x_{n} \right) = \beta_{1}$
        > for every sample of $x$’s then, averaging across all such
        > samples, $E\left( {\widehat{\beta}}_{1} \right) = \beta_{1}$
        > as well.

    3.  $Y_{i}$ is still random because
        > $Y_{i} = \beta_{0} + \beta_{1}x_{i} + \varepsilon_{i}$ and
        > $\varepsilon_{i}$ is random.

# L23 Regression Inference (WMS 11.4-9)

Introduction

1.  Long lecture (use time efficiently)

2.  We’ve derived estimators ${\widehat{\beta}}_{1}$,
    > ${\widehat{\beta}}_{0}$, ${\widehat{Y}}^{*}$, but so far all we
    > have are point estimates. Are these good estimators (i.e. unbiased
    > and consistent)? What are the margins of errors? To get confidence
    > intervals or do hypothesis tests, we need to know their
    > distributions.

3.  Estimator distributions: if
    > $\varepsilon_{i} \sim N\left( 0,\sigma_{\varepsilon}^{2} \right)$
    > (which is plausible, by Central Limit Theorem, if each error term
    > is viewed as the sum total of a lot of smaller, independent
    > factors) then

    1.  $Y_{i} = \beta_{0} + \beta_{1}x_{i} + \varepsilon_{i} \sim N$

    2.  $= \frac{1}{n}Y_{i} \sim N$

    3.  ${\widehat{\beta}}_{1} = \frac{1}{S_{\text{xx}}}\left( x_{i} - \right)Y_{i} \sim N$

    4.  ${\widehat{\beta}}_{0} = - {\widehat{\beta}}_{1} \sim N$

    5.  ${\widehat{Y}}^{*} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x^{*} \sim N$

    6.  $Y - {\widehat{Y}}^{*} \sim N$

    7.  Estimation error
        > ${\widehat{\varepsilon}}_{i} = Y_{i} - {\widehat{Y}}_{i} \sim N$

    8.  $\frac{\left( n - 2 \right)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}} \sim \chi^{2}\left( n - 2 \right)$
        > (essentially because estimating ${\widehat{\varepsilon}}_{i}$
        > requires estimating two parameters ${\widehat{\beta}}_{0}$ and
        > ${\widehat{\beta}}_{1}$, leaving only $n - 2$ pieces of
        > information)

    9.  Could compare $s_{\varepsilon}^{2}$ from two regressions to see
        > which better explains $Y$, using $F$ distribution

Slope estimator

1.  It can be shown that
    > $E\left( {\widehat{\beta}}_{1} \right) = \beta_{1};\ unbiased\ !$

> $E\left( {\widehat{\beta}}_{1} \right) = E\left\lbrack \frac{1}{S_{\text{xx}}}\left( x_{i} - \right)Y_{i} \right\rbrack = \frac{1}{S_{\text{xx}}}\left( x_{i} - \right)\left\lbrack \beta_{0} + \beta_{1}x_{i} + E\left( \varepsilon_{i} \right) \right\rbrack$
>
> $\  = \frac{1}{S_{\text{xx}}}\left\lbrack 0\beta_{0} + \beta_{1}\left( x_{i} - \right)x_{i} \right\rbrack = \frac{S_{\text{xx}}}{S_{\text{xx}}}\beta_{1} = \beta_{1}$

1.  $V\left( {\widehat{\beta}}_{1} \right) = V\left\lbrack \frac{1}{S_{\text{xx}}}\left( x_{i} - \right)Y_{i} \right\rbrack = \frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} = \frac{\sigma_{\varepsilon}^{2}}{\left( n - 1 \right)s_{x}^{2}} \rightarrow 0$;
    > consistent ☺!

> $= \frac{1}{{S_{\text{xx}}}^{2}}V\left\lbrack \left( x_{i} - \right)Y_{i} \right\rbrack = \frac{1}{{S_{\text{xx}}}^{2}}\left\lbrack \left( x_{i} - \right)^{2}V\left( Y_{i} \right) + 0 \right\rbrack$
>
> $= \frac{1}{{S_{\text{xx}}}^{2}}\left( x_{i} - \right)^{2}\left( 0 + 0 + \sigma_{\varepsilon}^{2} \right) = \frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} = \frac{\sigma_{\varepsilon}^{2}}{\left( n - 1 \right)s_{x}^{2}}$
>
> Note: most noisy when incomes more varied (conditional on education);
> least noisy when education more varied ($s_{x}^{2}$ in denominator)

1.  $\frac{{\widehat{\beta}}_{1} - \beta_{1}}{} \sim N(0,1)$; therefore,
    > $\frac{{\widehat{\beta}}_{1} - \beta_{1}}{} \sim t\left( n - 2 \right)$

2.  Example

    1.  From previous lecture, $n = 5$, $s_{\varepsilon}^{2} = 37$,
        > $S_{\text{xx}} = 28$

    2.  95% Confidence interval:
        > $\$ 8.2k \pm 3.182 = \left\lbrack \$ 4.5k,\$ 11.9k \right\rbrack$

    3.  Hypothesis Test $H_{a}:\beta_{1} > \$ 5k$ at $\alpha = .05$
        > level

        1.  Critical value 2.353

        2.  Test statistic $\frac{8.2 - 5}{} \approx 2.78$; reject
            > $H_{0}$

Intercept estimator

1.  It can be shown that
    > $E\left( {\widehat{\beta}}_{0} \right) = \ldots = \beta_{0}$;
    > unbiased ☺!

> It can be shown that
> $V\left( {\widehat{\beta}}_{0} \right) = \sigma_{\varepsilon}^{2}\left( \frac{1}{n} + \frac{{}^{2}}{\left( n - 1 \right)s_{x}^{2}} \right) \rightarrow 0$;
> consistent ☺!

1.  \[For those curious,

> $E\left( {\widehat{\beta}}_{0} \right) = E\left( \frac{1}{n}Y_{i} - {\widehat{\beta}}_{1} \right) = \frac{1}{n}\left\lbrack \beta_{0} + \beta_{1}x_{i} + E\left( \varepsilon_{i} \right) \right\rbrack - E\left( {\widehat{\beta}}_{1} \right)$
>
> $= \frac{n\beta_{0}}{n} + \beta_{1}\frac{1}{n}x_{i} - \beta_{1} = \beta_{0}$
>
> $V\left( {\widehat{\beta}}_{0} \right) = V\left( - {\widehat{\beta}}_{1} \right)$
>
> $= V\left( \right) + {}^{2}V\left( {\widehat{\beta}}_{1} \right) - 2\text{Cov}\left( ,{\widehat{\beta}}_{1} \right)$
>
> $= \frac{\sigma_{\varepsilon}^{2}}{n} + {}^{2}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} - 0 = \sigma_{\varepsilon}^{2}\left( \frac{1}{n} + \frac{{}^{2}}{\left( n - 1 \right)s_{x}^{2}} \right) \rightarrow 0$
>
> Note: $C\left( ,{\widehat{\beta}}_{1} \right) = 0$ because…
>
> $C\left( \frac{1}{n}Y_{i},\frac{1}{S_{\text{xx}}}\left( x_{i} - \right)Y_{j} \right) = \frac{1}{nS_{\text{xx}}}C\left( Y_{i},\left( x_{i} - \right)Y_{j} \right)$
>
> $= \frac{1}{nS_{\text{xx}}}\left\lbrack \left( x_{i} - \right)C\left( Y_{i},Y_{i} \right) + \left( x_{i} - \right)C\left( Y_{i},Y_{j} \right) \right\rbrack$
>
> $= \frac{1}{nS_{\text{xx}}}\left\lbrack \left( x_{i} - \right)V\left( Y_{i} \right) + \left( x_{i} - \right)0 \right\rbrack$
>
> $= \frac{1}{nS_{\text{xx}}}\left\lbrack \sigma_{y}^{2}\left( x_{i} - \right) \right\rbrack$
>
> $= \frac{\sigma_{y}^{2}}{nS_{\text{xx}}}\left\lbrack 0 \right\rbrack$
> \]

1.  Note two pieces: small error in identifying
    > $\left( \mu_{x},\mu_{y} \right)$ and larger error in identifying
    > slope (which matters more when ${}^{2}$ high).

2.  $\frac{{\widehat{\beta}}_{0} - \beta_{0}}{} \sim N(0,1)$; therefore,
    > $\frac{{\widehat{\beta}}_{0} - \beta_{0}}{} \sim t\left( n - 2 \right)$

Prediction estimator

1.  $\widehat{\left( \beta_{0} + \beta_{1}x_{i} \right)} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$

2.  $E\left( \widehat{\beta_{0} + \beta_{1}x_{i}} \right) = E\left( {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i} \right) = \beta_{0} + \beta_{1}x_{i}$;
    > unbiased ☺!

3.  $V\left( \widehat{\beta_{0} + \beta_{1}x_{i}} \right) = \ldots = \sigma_{\varepsilon}^{2}\left( \frac{1}{n} + \frac{\left( x_{i} - \right)^{2}}{S_{\text{xx}}} \right) \rightarrow 0$;
    > consistent ☺!

> \[$V\left( \widehat{\beta_{0} + \beta_{1}x_{i}} \right) = V\left( {\widehat{\beta}}_{0} \right) + x_{i}^{2}V\left( {\widehat{\beta}}_{1} \right) + 2Cov\left( {\widehat{\beta}}_{0},{\widehat{\beta}}_{1}x_{i} \right)$
>
> $= \sigma_{\varepsilon}^{2}\left( \frac{1}{n} + \frac{{}^{2}}{S_{\text{xx}}} \right) + {(x_{i})}^{2}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} - 2x_{i}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$
> (since
> $\text{Cov}\left( {\widehat{\beta}}_{0},{\widehat{\beta}}_{1} \right) = Cov\left( - {\widehat{\beta}}_{1},{\widehat{\beta}}_{1} \right) = 0 - \frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$)
> $= \sigma_{\varepsilon}^{2}\left( \frac{1}{n} + \frac{\left( x_{i} - \right)^{2}}{S_{\text{xx}}} \right) = \sigma_{\varepsilon}^{2}\left( \frac{1}{n} + \frac{\left( x_{i} - \right)^{2}}{S_{\text{xx}}} \right)$\]
>
> Note: most precise close to $$; can still make predictions far away
> from $$, but more noisy

1.  $\frac{\widehat{\left( \beta_{0} + \beta_{1}x_{i} \right)} - \left( \beta_{0} + \beta_{1}x_{i} \right)}{} \sim N(0,1)$

> $\frac{\widehat{\left( \beta_{0} + \beta_{1}x_{i} \right)} - \left( \beta_{0} + \beta_{1}x_{i} \right)}{} \sim t(n - 2)$

Error variance

1.  $\frac{\left( 4 \right)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}} \sim \chi^{2}\left( 4 \right)$,
    > $s_{\varepsilon} = 6.1$

2.  95% confidence interval for $\sigma_{\varepsilon}$

    1.  $.95 = P\left( .48 < \frac{\left( 4 \right)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}} < 11.14 \right) = P\left( > \sigma_{\varepsilon} > \right) = P\left( 17.6 > \sigma_{\varepsilon} > 3.6 \right)$

3.  Test $H_{a}:\sigma_{\varepsilon}^{2} > 4^{2}$ at $\alpha = .05$
    > level

    1.  Critical value 9.49 (from Table 6)

    2.  Test statistic $\frac{4 \cdot 37}{4^{2}} = 9.25$; not
        > significant

4.  If you had two regressions and wanted to know which has better
    > predictive power (i.e. lower residual error variance) you could
    > compare $\sigma_{\text{εA}}^{2}$ and $\sigma_{\text{εB}}^{2}$
    > using F distribution

# Review

1.  Thanks for a great semester!

2.  Thanks TAs!

3.  Recommend Econ 388: regression with multiple variables

    1.  We’re on the brink of knowledge explosion

    2.  Also Econ 210 for exploring careers in Economics

    3.  For advanced statistics/econometrics, recommend linear algebra
        > (Math 213)

4.  Student project findings

    1.  Wide variety of projects

    2.  Value of statistics for consumers, not just producers

5.  Key concepts

    1.  We’ve seen several trees, now let’s notice the forest

    2.  Pre-midterm, we discussed population distributions (discrete or
        > continuous), including moments such as mean, variance, and
        > covariance.

    3.  From sample, we seek to estimate population parameter: $\mu$,
        > $\sigma$, $p$, $\rho$, $\mu_{1} - \mu_{2}$, $p_{1} - p_{2}$,
        > $\frac{\sigma_{1}^{2}}{\sigma_{2}^{2}}$, $\beta_{0}$,
        > $\beta_{1}$, $y^{*} = \beta_{0} + \beta_{1}x^{*}$, or $\theta$
        > from another distribution function (e.g. $a$, $b$ from
        > uniform, $\theta$ from exponential), including distributions
        > we haven’t encountered yet (e.g. $p$ from geometric, $\lambda$
        > from Poisson, $\beta_{2}$ from quadratic regression)

    4.  Deriving estimators: MOM and ML

    5.  Properties of estimators: bias, efficiency, consistency

    6.  Margin of error, confidence intervals, hypothesis tests

    7.  Matrix algebra

        1.  This class has focused on the correlation $\rho$ between two
            > variables, which also underlies linear regression line:
            > slope coefficient $\rho\frac{\sigma_{y}}{\sigma_{x}}$ and
            > coefficient of determination $\rho^{2}$

        2.  Matrix algebra allows us to generalize everything to
            > multiple variables (e.g.
            > $\beta = \left( X^{'}X \right)^{- 1}X^{'}y$ instead of
            > $\beta = \frac{x_{i}y_{i}}{x_{i}^{2}}$

        3.  Individual slope coefficient $\beta_{1}$ then reflects
            > *partial* correlation between education and income,
            > holding experience, age, race, gender, etc. fixed.

        4.  Controlling for more variable makes stronger case for
            > correlation as causation

6.  Deriving estimator distributions

    1.  Estimators depend on $X_{1},X_{2},\ldots,X_{n}$, and so are
        > random variables with distributions

    2.  $E\left( \right) = E\left( \frac{1}{n}X_{i} \right) = \frac{1}{n}E\left( X_{i} \right) = \frac{1}{n}\left( \text{nμ} \right) = \mu$

    3.  $V\left( \right) = V\left( \frac{1}{n}X_{i} \right) = \frac{1}{n^{2}}V\left( X_{i} \right) = \frac{1}{n}\left( n\sigma^{2} \right) = \frac{\sigma^{2}}{n}$

    4.  Distribution $\sim N\left( \mu,\frac{\sigma^{2}}{n} \right)$ or
        > $\frac{- \mu}{} \sim N\left( 0,1 \right)$ (by normality of
        > $X_{i}$ or Central Limit Theorem)

    5.  CLT also implies that $\frac{\widehat{p} - p}{} \sim N(0,1)$

    6.  Difference estimators
        > $\frac{\left( {}_{1} - {}_{2} \right) - (\mu_{1} - \mu_{2})}{} \sim N(0,1)$
        > and $\frac{\widehat{p} - p}{} \approx N(0,1)$

    7.  $X_{i}$ normal implies
        > $\left( n - 1 \right)\frac{\text{S\ }^{2}}{\sigma^{2}} \sim \chi^{2}(n - 1)$

> and therefore
> $\frac{s_{A}^{2}/\sigma_{A}^{2}}{s_{B}^{2}/\sigma_{B}^{2}} \sim F(n_{A} - 1,n_{B} - 1)$
> and $\frac{- \mu}{} \sim t(n - 1)$

1.  Similarly,
    > $E\left( {\widehat{\beta}}_{1} \right) = \ldots = \beta_{1}$,
    > $V\left( {\widehat{\beta}}_{1} \right) = \ldots = \frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$

> and $\varepsilon_{i}$ normal implies that
> ${\widehat{\beta}}_{1} \sim N\left( \beta_{1},\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} \right)$
> or
> $\frac{{\widehat{\beta}}_{1} - \beta_{1}}{} \sim N\left( 0,1 \right)$

1.  $\left( n - 2 \right)\frac{S_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}} \sim \chi\left( n - 2 \right)$,
    > implying that
    > $\frac{{\widehat{\beta}}_{1} - \beta_{1}}{} \sim t(n - 2)$

```{=html}
<!-- -->
```
1.  Matrix algebra True/False question tip

    1.  Check simple cases (e.g. $1 \times 1$, $2 \times 2$), but not
        > special cases

    2.  Example: “All symmetric matrices are idempotent”

        1.  Try simple example: not special matrix like identity matrix
            > or $\left( 1\ 1\ 1\ 1\  \right)$, but something with no
            > special properties other than symmetry, such as
            > $\left( 1\ 3\ 3\ 2\  \right)$ (and show that
            > $\left( 1\ 3\ 3\ 2\  \right)\left( 1\ 3\ 3\ 2\  \right) = \left( 10\ 9\ 9\ 13\  \right) \neq \left( 1\ 3\ 3\ 2\  \right)$)

        2.  Can also try really simple examples, such as scalar
            > matrices:
            > $\left( 5 \right)\left( 5 \right) \neq \left( 5 \right)$.

    3.  T/F questions are not “trick” questions, but be careful. In real
        > world, much of statistics is simply a matter of careful
        > attention to details, and knowing exactly which inferences are
        > legitimate under exactly which circumstances.

2.  Example problems

    1.  Confidence interval for ${\widehat{Y}}^{*}$

    2.  Hypothesis test for ${\widehat{p}}_{1} - {\widehat{p}}_{2}$
