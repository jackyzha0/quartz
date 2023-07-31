---
title: "19-advanced-sql-2"
aliases: 
tags: 
- info201
- lecture
sr-due: 2025-04-07
sr-interval: 616
sr-ease: 250
---


# CASE
![case example](https://i.imgur.com/H0VjLAK.png)

basically a switch statement

- derived valye where calcyulation isnt simple
- standardising values e.g., booleans: t/f, y/n, 0/1
- flipping between row and col orientation (*privoting*)
	- all students vs all on one students papers

# Set operators
relations are sets of tuples ⇒ we can use set operators

combine rows of two table vertically

source table must be compativble
- same set of columns
- same data types
- = same heading

get new table with same headings as inputs

identical rows deleted

![set example 1](https://i.imgur.com/omk0DYv.png)

union: all rows
- ![union](https://i.imgur.com/GfrjCLI.png)
- ![union result](https://i.imgur.com/OPsaTuu.png)

intersect: rows that appear in both
- ![intersect](https://i.imgur.com/yKp8x6q.png)
- ![intersect results](https://i.imgur.com/VsrACMF.png)

difference (except, minus): rows in top that arent in bottom
- ![diff](https://i.imgur.com/LEpaeeT.png)
- ![diff results](https://i.imgur.com/0I6BqOn.png)

# Aggregation and grouping
![recall](https://i.imgur.com/AyBCAN3.png)

 ## group by
![](https://i.imgur.com/LxxyZaf.png)
- groups rows that have equal values across all the columns in \<column-list>
- always used with aggregate function(s) in select clause
- one row in the result for each differect combined value of the grouped columns

![group example](https://i.imgur.com/ZYgqzlD.png)

- all non computed columns in select clause must normally appear in group y, and vice versa

### restricting by groups (having)
![](https://i.imgur.com/ylqvkU5.png)

- similiar to where, restricts output of group by
- cant include aggregate functions (where can't);

## Analytic functions (FYI)
![](https://i.imgur.com/L59hwEa.png)

- enchancement of aggregation
- aggregate without reshaping the ouput
- many more functions avaiable
- sliding windows supported
- dont use when simple group by is sufficient

# Select
![slide](https://i.imgur.com/4rsQ1B9.png)

- select
- from
- where
- group  by
- having
- order by

order of evaluation
- from
- where
- group by
- having
- select
- order by

# Joins
![recall](https://i.imgur.com/khcpBa0.png)
![recall join syntax](https://i.imgur.com/hQHotL3.png)

inner join : matching rows only

outer join: may include non-matching rows from the left table, right table, or both tables

also, cross, and semi join

## Cross join product
![cross join](https://i.imgur.com/CxGUhpu.png)
![cross join result](https://i.imgur.com/O3FxL5o.png)

every possible combination of rows from two tables

uses:
- cards
	- suits table
	- ranks table
	- deck = suits cross join ranks
-  timetable
	- days table
	- timeslots table
	- timetable = days cross join timeslots

## Semi join
output only trows from one table that match rows from the other

![semijoin](https://i.imgur.com/bW4uVPQ.png)
![semijoin results](https://i.imgur.com/ts5hEf9.png)

inverse is antijoin: ouput only rows from one table that dont match rows from the other

# Subqueries
a select expression embedded inside another
- inselect clause to compute value using data from other tables
- in from: inline view
- in where clause with in, all, some , exists

- can refer to data from "outer" expression (correlated subquery)
- tricky to write, so be careful. maybe stepwise
- can rewrite joins as subqueries, but not vice versa

prefer joins to subqueries

## how to develop
- identify components opf multi part query
- implement and test the components as separeate select statements
- combine into one query, nesting one within the other.

![subquery part 1](https://i.imgur.com/yhOriER.png)
![subquery part 2](https://i.imgur.com/APZGzz5.png)

# Inline views
a named subqueriy embedded in the from clause is effectively a temporary view

visible within thescope of current select expression only

![inline view](https://i.imgur.com/s3G8L7X.png)

## saving sub queries (WITH)
- sometimes need to re-use same or very similar subquery severl times in the same query
- with saves named subqueries for later re-use (in the same query)
- visible iwthin scope of entire select statement

![with](https://i.imgur.com/uQ5bn3B.png)

# Scope  in select
- row variable only exist inside the select expression that defines them
- a select expression can only directly refer to items declared in:
	- its own select and from clause
	- select and from clauses of any elclosing expressions
	- any preceedin with expression
- particularly important for correlated subqueries

