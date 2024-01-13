---
title: "Fn Lock: Functional Programming"
tags:
  - seedling
  - programming
  - project
  - haskell
date: 2024-01-04
draft: false
---
Functional programming is my favorite paradigm. 'Nuff said.

## Functional Programming in Comparative Perspective
Let's look at an object-oriented pseudo-program for doing something with a piece of data:

```java
class Point {
	int x;
	int y;

	Point(int x, int y) {
		this.x = x;
		this.y = y;
	}

	void printPoint() {
		println("({this.x}, {this.y})");
	}
}

void main() {
	Point xy = Point(1, 1);
	xy.printPoint();
}
```

In OOP, data and code live together in one object (association), which comes with finer-grained control over what can access that data (encapsulation). But in functional programming, code and data are purely separate. Data is defined in terms of what's inside a type, and code is defined in terms of inputs and outputs:

```haskell
data Point = Point { x :: Int, y :: Int }

-- Function declaration (think C header)
printPoint :: Point -> IO () -- Takes in a point, outputs nothing, but has a side effect of doing an IO action

-- Function definition (think C implementation)
-- new concept: "pattern match": if the arguments match the LHS, it will execute RHS. Otherwise, keep going down the list. Often used for a "base case" of a recursive function.
printPoint Point (0, 0) = println "(origin)" -- Parentheses usu. not required around fn arguments, but can specify precedence in evaluation

-- Can also use "guard clauses" as finer-grained if statements inside a general pattern match.
printPoint Point (px, py)
  | px < 0 && py < 0 = println "(negative)"
  | otherwise = println ("(" ++ show px ++ ", " ++ show py ++ ")") 

main :: IO ()
main = do
  let xy = Point 1 1 -- if more complex, use parentheses like Point (1 + 2) (2 + 4)
  printPoint xy
```

Pattern matching, guard clauses, and precedence manipulation are the main features of functional language statement syntax over OOP syntax. But functional languages are even more powerful when you start looking at their type systems in-depth.
## Monads
WIP
## Arrows and Applicatives
WIP