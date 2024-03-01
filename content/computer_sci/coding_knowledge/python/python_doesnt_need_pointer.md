---
title: Why python doesn't need pointer?
tags:
- python
- coding-language
- basic
date: 2023-06-06
---


Python doesn't require the explicit use of pointers like C because of its **underlying memory management** and **object model**.

# Design Concept

## Underlying memory management

In Python, variables are *references to objects rather than memory addresses* like pointers in C. When you assign a value to a variable in Python, you are actually creating a reference to an object in memory. This reference allows you to access and manipulate the object, but you don't need to manage memory explicitly.

Python uses automatic memory management through a mechanism called **garbage collection**. It keeps track of objects in memory and automatically deallocates memory for objects that are no longer referenced or used. **This automatic memory management frees developers from the responsibility of explicitly allocating and deallocating memory using pointers.**

## Object model


For python, everything is object, objects contains at least three pieces of data:

* Reference count
* Type
* Value

Reference count is an interesting concept in python, it's designed for memory management. 

> [!help] 
> Reference count refers to the number of references an object. Each object in Python contains a reference count, which is a count of how many references or variables are currently pointing to that object. 
> 
> The reference count mechanism is part of Python's memory management system. When an object is created or assigned to a variable, the reference count of that object is incremented. When a reference to an object is deleted or reassigned, the reference count is decremented. When the reference count of an object reaches zero, it means that there are no more references to that object, and the memory occupied by the object can be deallocated.
> 
> The reference count mechanism help python build its **garbage collection** memory management.

Python's object model also provides additional benefits. For example, *objects in Python can have different types, and variables can be dynamically reassigned to different objects of different types without any explicit type declarations or memory management.*

# Example

Generating by [ChatGPT](https://chat.openai.com/):

**Example about swap**

--- 
Code:

```python
def swap_variables(a, b):
    return b, a

# Example usage
x = 10
y = 20

x, y = swap_variables(x, y)
print("x =", x)
print("y =", y)
```


Certainly! Let's go through the example step by step to understand how memory management and the reference system work in Python when swapping two variables.

Step 1: Variable assignment
```python
x = 10
y = 20
```
In this step, two variables `x` and `y` are created and assigned the values `10` and `20`, respectively. At this point, **the reference count for the objects `10` and `20` is 1** each because both `x` and `y` reference these objects.

Step 2: Calling the `swap_variables` function
```python
x, y = swap_variables(x, y)
```
Here, the `swap_variables` function is called with the current values of `x` and `y` as arguments. The function returns a tuple containing the swapped values, which are then assigned to `x` and `y`. At this stage, the memory and reference count changes as follows:

- The `swap_variables` function receives the values of `x` and `y` (references to objects `10` and `20`) as arguments. *The function does not create any new objects or change the reference count*.
- The `swap_variables` function returns a tuple with the swapped values `(20, 10)`. *This creates a new tuple object in memory and increments the reference count of objects `20` and `10` to 2 each* (one reference from the tuple, one reference from `x` and `y`).

Step 3: Swapping the values
```python
x, y = 20, 10
```
The parallel assignment swaps the values of `x` and `y`. At this point, `x` refers to the object `20`, and `y` refers to the object `10`. The reference count of objects `10` and `20` remains at 2 each (one reference from the tuple, one reference from `x` and `y`).

Step 4: Printing the swapped values
```python
print("x =", x)
print("y =", y)
```
This step simply prints the values of `x` and `y`. The output will be:
```
x = 20
y = 10
```

Step 5: Memory deallocation
At the end of the program, Python's garbage collector runs periodically to identify and deallocate objects that are no longer referenced. In this example, the tuple created in the `swap_variables` function (`(20, 10)`) becomes eligible for garbage collection because it is no longer referenced. When the garbage collector runs, it will decrement the reference count of objects `10` and `20` to 1 each, and since the reference count reaches zero, the memory occupied by the tuple and the objects will be deallocated.

In summary, the Python memory management and reference system handles the creation, reference counting, and deallocation of objects automatically. The variables `x` and `y` act as references to the objects `10` and `20`, and swapping their values using the parallel assignment does not involve explicit memory management or pointer manipulation.

--- 

## Trick

> [!quote] 
>You can use  `getrefcount` to get reference count of the object. *The count returned is generally one higher than you might expect, because it includes the (temporary) reference as an argument to* `getrefcount()`.

# Conclusion

Overall, Python's design philosophy aims to prioritize simplicity and readability while abstracting away low-level memory management concerns, making it easier and more convenient to work with compared to languages like C that require explicit pointer manipulation.

# Reference

* ChatGPT - Prompt: Why python don't need pointer？