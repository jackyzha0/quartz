---
creation_date: 2023年11月05日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# R Programming

Different from S?

# 01 Background
**Resources**
- 📖 R for Data Science
- 
- 📹 
- 🌐

Limited in big data, too big to load in memory
# 02 Core Concepts
**Key Terms**
- Facets
- Geoms
- Asethetic
- Atomic: (1) character (2) number (real) (3) integer (4) complex (5) logical
Graphs tutorial
- Attributes: (1) names, dimnames (2) dimensions (matrices, arrays)
 (3) class (4) length (5) other user-defined attributes/metadata 
 - Coercion Implicit / Explicit
 - Matrices
 - Factors Ordered / Unordered
 - Missing Values NaN is Na, but Na is not NaN
 - Data Frames
 - Reading Data
	 - `read.table` and `read.csv` for tabular
	 - `source` for reading R code files
- Dput, Dget, Dumping
- Subsetting
- Partial Matching
 - https://www.storybench.org/getting-started-data-visualization-r-using-ggplot2/


```R
dir
?args  # helper
args() # determine the arguments of a 

```

"`...`" argument used heavily in generic functions

Lexical Scoping

Complete Cases
Times and Dates
- `as.Date` for dates
- `as.POSIXct` and `as.POSIXlt` for times
- `strptime` can be used to coerce to the above


Loop Functions (to make looping more easy on the command line)
- `lapply` look over a list and evaluate a function on each element
- `sapply` same as lapply but try to simplify the result
- `apply` apply function over the margins of array
- `tapply` apply function over subsets of a vector
- `mapply` multivariate version of lappy

Factor Variables


Debugging Tools - Basic Tools
- `traceback`
- `debug`
- `browser`
- `trace`
- `recover`

`str` Function
- compactly display the internal structure of an R object
- an alternative to `summary`

Simulation
- `rnorm` generate random Normal variates with a given mean and standard deviation
- `dnorm` evaluate the Normal probability (with a given mean/SD) at a point (or vector of points)
- `pnorm` evaluate the cumulative distribution function for a Normal distribution
- `rpois` generate random Poisson variates with a given rate

R Profiler
- `system.time()`
- `Rprof`
- `summaryRprof()`