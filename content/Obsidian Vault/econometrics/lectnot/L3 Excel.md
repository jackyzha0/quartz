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