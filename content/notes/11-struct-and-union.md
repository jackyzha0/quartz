---
title: "11-struct-and-union"
aliases: 
tags: 
- cosc204
---

# Struct
not a calss
- class like *composite data type* called struct
- POD plain old data

## declare
```
struct <name>{
	<type><name>;
	<type><name>;
} <variable>;

struct point_2d {
	double x;
	double y;
} point;
```

typically an anonymous struct is declared and then given a name with typedef

```
typedef struct {
	double x;
	double y;
} point_2d;
```

This is the common convention now.

## initalize
```
point_2d location = {0.0, 1.0}; //initalizers
point_2d location = {.y = 1.0, .x = 0.0}; //designated initalizers
```

## accessing
use the `.`

```
point_2d location;

location.x = 0;
location.y = 1;
```

## shallow copy
copy the members including pointers
- but not the things the pointers point to

![shallow copy example 1](https://i.imgur.com/w3B3ce0.png)
![shallow copy example 2](https://i.imgur.com/mL5QION.png)

 both point to the same memory location.
when you change one - they both change.

## passing to routines
passed by value

```
void print(thing object)
```

