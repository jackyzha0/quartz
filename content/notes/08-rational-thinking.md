---
title: "08-rational-thinking"
tags: 
- 
---


use a string to represent data
could use array of single value integers
could use binary
do long division, multiplication, subtraction and addition of string representation of ints

std::vector<int> 

look into what integer is doing.

round up or down after dividing negative numbers?

need to write << and >> operator


keep header file mostly as it is. add your data structure and helper methods.

inside operator methods you cant acees private methods of the class. 
not best solution to use getter methods. dont need to.

cool trick: use compound assignment operators (where you can access data) to do data access
can use these operators inside the other operators. save time and dont need to create getter methods. 

set up constructors: then += methods. then binary operators.



rationals: 3 and 2/4 should be simplified to  1 and 1/2
3 and 4/2 should be converted to 5 and 0

# Process
- use std::vector<int> to store data
- create constructors