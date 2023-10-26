#Software-Engineering 

---
#### # Introduction

First of all, what is Python? According to its creator, `Guido van Rossum`, Python is a:

> “high-level programming language, and its core design philosophy is all about code readability and a syntax which allows programmers to express concepts in a few lines of code.”
---
### # Zero to Hero

#### 1. Variables

You can think about variables as words that store a value. Simple as that.

```python
# integers
one = 1
some_number = 10000

# booleans
true_boolean = True
false_boolean = False

# string
my_name = "Leandro Tk"

# float
book_price = 15.80
```
---
#### 2. Control Flow: conditional statements

“**If**” uses an expression to evaluate whether a statement is True or False
The “**else**” / **"elif"** statement will be executed if the “**if**” expression is **false**

```python
if True:
  print("Hello Python If")

if 2 > 1:
  print("2 is greater than 1")
elif 1 == 1:
  print("1 is as great as 1")
else:
  print("1 is not greater than 2")
```

---
#### 3. Looping / Iterator

In Python, we can iterate in different forms. I’ll talk about two: **while** and **for**.

**While** Looping: while the statement is True, the code inside the block will be executed.

```python
num = 1

while num <= 10:
    print(num)
    num += 1
```

The **while** loop needs a “**loop condition.**” If it stays True, it continues iterating. In this example, when `num` is `11` the **loop condition** equals `False`.

Another basic bit of code to better understand it:

```python
loop_condition = True

while loop_condition:
# %s - for string output
    print("Loop Condition keeps: %s" %(loop_condition))
    loop_condition = False
```

The **loop condition** is `True` so it keeps iterating — until we set it to `False`.

**For Looping**: you apply the variable “**num**” to the block, and the “**for**” statement will iterate it for you. This code will print the same as **while** code: from **1** to **10**.

```python
# output: 1 2 3 4 5 6 7 8 9 10
for i in range(1, 11):
  print(i)
```

See? It is so simple. The range starts with `1` and goes until the `11`th element (`10` is the `10`th element).

---

### List: Collection | Array | Data Structure

Imagine you want to store the integer 1 in a variable. But maybe now you want to store 2. And 3, 4, 5 …

Do I have another way to store all the integers that I want, but not in **millions of variables**? You guessed it — there is indeed another way to store them.

`List` is a collection that can be used to store a list of values (like these integers that you want). So let’s use it:

```python
my_integers = [1, 2, 3, 4, 5]
```

It is really simple. We created an array and stored it on **my_integer**.

But maybe you are asking: “How can I get a value from this array?”

Great question. `List` has a concept called **index**. The first element gets the index 0 (zero). The second gets 1, and so on. You get the idea.

To make it clearer, we can represent the array and each element with its index. I can draw it:

![](https://cdn-images-1.medium.com/max/1600/1*ReMk6NgghLII20vPD6uNEA.jpeg)

Using the Python syntax, it’s also simple to understand:

```python
my_integers = [5, 7, 1, 3, 4]
print(my_integers[0]) # 5
print(my_integers[1]) # 7
print(my_integers[4]) # 4
```

Imagine that you don’t want to store integers. You just want to store strings, like a list of your relatives’ names. Mine would look something like this:

```python
relatives_names = [
  "Toshiaki",
  "Juliana",
  "Yuji",
  "Bruno",
  "Kaio"
]

print(relatives_names[4]) # Kaio
```

It works the same way as integers. Nice.

We just learned how `Lists` indices work. But I still need to show you how we can add an element to the `List` data structure (an item to a list).

The most common method to add a new value to a `List` is `append`. Let’s see how it works:

```python
bookshelf = []
bookshelf.append("The Effective Engineer")
bookshelf.append("The 4 Hour Work Week")
print(bookshelf[0]) # The Effective Engineer
print(bookshelf[1]) # The 4 Hour Work Week
```

`append` is super simple. You just need to apply the element (eg. “**The Effective Engineer**”) as the `append` parameter.

Well, enough about `Lists`**.** Let’s talk about another data structure.

### Dictionary: Key-Value Data Structure

Now we know that `Lists` are indexed with integer numbers. But what if we don’t want to use integer numbers as indices? Some data structures that we can use are numeric, string, or other types of indices.

Let’s learn about the `Dictionary` data structure. `Dictionary` is a collection of key-value pairs. Here’s what it looks like:

```python
dictionary_example = {
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```

The **key** is the index pointing to the **value**. How do we access the `Dictionary` **value**? You guessed it — using the **key**. Let’s try it:

```python
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian"
}

print("My name is %s" %(dictionary_tk["name"])) # My name is Leandro
print("But you can call me %s" %(dictionary_tk["nickname"])) # But you can call me Tk
print("And by the way I'm %s" %(dictionary_tk["nationality"])) # And by the way I'm Brazilian
```

I created a `Dictionary` about me. My name, nickname, and nationality. Those attributes are the `Dictionary` **keys**.

As we learned how to access the `List` using index, we also use indices (**keys** in the `Dictionary` context) to access the **value** stored in the `Dictionary`.

In the example, I printed a phrase about me using all the values stored in the `Dictionary`. Pretty simple, right?

Another cool thing about `Dictionary` is that we can use anything as the value. In the `Dictionary` I created, I want to add the **key** “age” and my real integer age in it:

```python
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian",
  "age": 24
}

print("My name is %s" %(dictionary_tk["name"])) # My name is Leandro
print("But you can call me %s" %(dictionary_tk["nickname"])) # But you can call me Tk
print("And by the way I'm %i and %s" %(dictionary_tk["age"], dictionary_tk["nationality"])) # And by the way I'm Brazilian
```

Here we have a **key** (age) **value** (24) pair using string as the **key** and integer as the **value**.

As we did with `Lists`, let’s learn how to add elements to a `Dictionary`. The **key - pointing to a value** is a big part of what `Dictionary` is. This is also true when we are talking about adding elements to it:

```python
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian"
}

dictionary_tk['age'] = 24

print(dictionary_tk) # {'nationality': 'Brazilian', 'age': 24, 'nickname': 'Tk', 'name': 'Leandro'}
```

We just need to assign a **value** to a `Dictionary` **key**. Nothing complicated here, right?

### Iteration: Looping Through Data Structures

As we learned in the [Python Basics](https://medium.com/the-renaissance-developer/python-101-the-basics-441136fb7cc3), the `List` iteration is very simple. We `Python` developers commonly use `For` looping. Let’s do it:

```python
bookshelf = [
  "The Effective Engineer",
  "The 4 hours work week",
  "Zero to One",
  "Lean Startup",
  "Hooked"
]

for book in bookshelf:
    print(book)
```

So for each book in the bookshelf, we (**can do everything with it**) print it. Pretty simple and intuitive. That’s Python.

For a hash data structure, we can also use the `for` loop, but we apply the `key` :

```python
dictionary = { "some_key": "some_value" }

for key in dictionary:
    print("%s --> %s" %(key, dictionary[key]))

# output: some_key --> some_value
```

This is an example how to use it. For each `key` in the `dictionary` , we `print` the `key` and its corresponding `value`.

Another way to do it is to use the `iteritems` method.

```python
dictionary = { "some_key": "some_value" }

for key, value in dictionary.items():
    print("%s --> %s" %(key, value))

# some_key --> some_value
```

We did name the two parameters as `key` and `value`, but it is not necessary. We can name them anything. Let’s see it:

```python
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian",
  "age": 24
}

for attribute, value in dictionary_tk.items():
    print("My %s is %s" %(attribute, value))

# My name is Leandro
# My nickname is Tk
# My nationality is Brazilian
# My age is 24
```

We can see we used attribute as a parameter for the `Dictionary` `key`, and it works properly. Great!

---
#### # Functions in Python

```python
# simple function
def myFunction():
	print("Hello World")

# with arguments
def myFunction(fname, lname):
	print(fname + " " + lname)

# arbitrary arguments * - accepts a tuple of arguments
def myFunction(*kids)
	print("The youngest child is" + kids[2])
myFunction("Emil", "Tobias", "Linus")

# arbitrary keyword arguments ** - accept a tuple of keyword arguments
def my_function(**kid):  
  print("His last name is " + kid["lname"])    
my_function(fname = "Anton", lname = "Haul")

# return values
def myFunction(x):
	return 5 * x
print(myFunction(5))

# list as argument
def my_function(food):  
  for x in food:  
    print(x)  
fruits = ["apple", "banana", "cherry"]  
my_function(fruits)

# pass statement - function definition with no content (avoid getting error)
def myfunction():  
  pass
```
---
### Classes & Objects

#### A little bit of theory:

**Objects** are a representation of real world objects like cars, dogs, or bikes. The objects share two main characteristics: **data** and **behavior**.

Cars have **data,** like number of wheels, number of doors, and seating capacity They also exhibit **behavior**: they can accelerate, stop, show how much fuel is left, and so many other things.

We identify **data** as **attributes** and **behavior** as **methods** in object-oriented programming. Again:

Data → Attributes and Behavior → Methods

And a **Class** is the blueprint from which individual objects are created. In the real world, we often find many objects with the same type. Like cars. All the same make and model (and all have an engine, wheels, doors, and so on). Each car was built from the same set of blueprints and has the same components.

#### Python Object-Oriented Programming mode: ON

Python, as an Object-Oriented programming language, has these concepts: **class** and **object**.

A class is a blueprint, a model for its objects.

So again, a class it is just a model, or a way to define **attributes** and **behavior** (as we talked about in the theory section). As an example, a vehicle **class** has its own **attributes** that define what **objects** are vehicles. The number of wheels, type of tank, seating capacity, and maximum velocity are all attributes of a vehicle.

With this in mind, let’s look at Python syntax for **classes**:

```python
class Vehicle:
    pass
```

We define classes with a class statement — and that’s it. Easy, isn’t it?

**Objects** are instances of a **class**. We create an instance by naming the class.

```python
car = Vehicle()
print(car) # <__main__.Vehicle instance at 0x7fb1de6c2638>
```

Here `car` is an **object** (or instance) of the **class** `Vehicle`.

Remember that our vehicle **class** has four **attributes**: number of wheels, type of tank, seating capacity, and maximum velocity. We set all these **attributes** when creating a vehicle **object**. So here, we define our **class** to receive data when it initiates it:

```python
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity
```

We use the `init` **method**. We call it a constructor method. So when we create the vehicle **object**, we can define these **attributes**. Imagine that we love the **Tesla Model S,** and we want to create this kind of **object**. It has four wheels, runs on electric energy, has space for five seats, and the maximum velocity is 250km/hour (155 mph). Let’s create this **object:**

```python
tesla_model_s = Vehicle(4, 'electric', 5, 250)
```

Four wheels + electric “tank type” + five seats + 250km/hour maximum speed.

All attributes are set. But how can we access these attributes’ values? We **send a message to the object asking about them**. We call it a **method**. It’s the **object’s behavior**. Let’s implement it:

```python
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    def number_of_wheels(self):
        return self.number_of_wheels

    def set_number_of_wheels(self, number):
        self.number_of_wheels = number
```

This is an implementation of two methods: **number_of_wheels** and **set_number_of_wheels**. We call it `getter` & `setter`. Because the first gets the attribute value, and the second sets a new value for the attribute.

In Python, we can do that using `@property` (`decorators`) to define `getters` and `setters`. Let’s see it with code:

```python
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    @property
    def number_of_wheels(self):
        return self.number_of_wheels

    @number_of_wheels.setter
    def number_of_wheels(self, number):
        self.number_of_wheels = number
```

And we can use these methods as attributes:

```python
tesla_model_s = Vehicle(4, 'electric', 5, 250)
print(tesla_model_s.number_of_wheels) # 4
tesla_model_s.number_of_wheels = 2 # setting number of wheels to 2
print(tesla_model_s.number_of_wheels) # 2
```

This is slightly different than defining methods. The methods work as attributes. For example, when we set the new number of wheels, we don’t apply two as a parameter, but set the value 2 to `number_of_wheels`. This is one way to write `pythonic` `getter` and `setter` code.

But we can also use methods for other things, like the “**make_noise**” method. Let’s see it:

```python
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    def make_noise(self):
        print('VRUUUUUUUM')
```

When we call this method, it just returns a string **“VRRRRUUUUM.”**

```python
tesla_model_s = Vehicle(4, 'electric', 5, 250)
tesla_model_s.make_noise() # VRUUUUUUUM
```

### Encapsulation: Hiding Information

Encapsulation is a mechanism that restricts direct access to objects’ data and methods. But at the same time, it facilitates operation on that data (objects’ methods).

> “Encapsulation can be used to hide data members and members function. Under this definition, encapsulation means that the internal representation of an object is generally hidden from view outside of the object’s definition.” — Wikipedia

All internal representation of an object is hidden from the outside. Only the object can interact with its internal data.

First, we need to understand how `public` and `non-public` instance variables and methods work.

#### Public Instance Variables

For a Python class, we can initialize a `public instance variable` within our constructor method. Let’s see this:

Within the constructor method:

```python
class Person:
    def __init__(self, first_name):
        self.first_name = first_name
```

Here we apply the `first_name` value as an argument to the `public instance variable`.

```python
tk = Person('TK')
print(tk.first_name) # => TK
```

Within the class:

```python
class Person:
    first_name = 'TK'
```

Here, we do not need to apply the `first_name` as an argument, and all instance objects will have a `class attribute` initialized with `TK`.

```python
tk = Person()
print(tk.first_name) # => TK
```

Cool. We have now learned that we can use `public instance variables` and `class attributes`. Another interesting thing about the `public` part is that we can manage the variable value. What do I mean by that? Our `object` can manage its variable value: `Get` and `Set` variable values.

Keeping the `Person` class in mind, we want to set another value to its `first_name` variable:

```python
tk = Person('TK')
tk.first_name = 'Kaio'
print(tk.first_name) # => Kaio
```

There we go. We just set another value (`kaio`) to the `first_name` instance variable and it updated the value. Simple as that. Since it’s a `public` variable, we can do that.

#### Non-public Instance Variable

> We don’t use the term “private” here, since no attribute is really private in Python (without a generally unnecessary amount of work). — PEP 8

As the `public instance variable` , we can define the `non-public instance variable` both within the constructor method or within the class. The syntax difference is: for `non-public instance variables` , use an underscore (`_`) before the `variable` name.

> “‘Private’ instance variables that cannot be accessed except from inside an object don’t exist in Python. However, there is a convention that is followed by most Python code: a name prefixed with an underscore (e.g. _spam) should be treated as a non-public part of the API (whether it is a function, a method or a data member)” — Python Software Foundation

Here’s an example:

```python
class Person:
    def __init__(self, first_name, email):
        self.first_name = first_name
        self._email = email
```

Did you see the `email` variable? This is how we define a `non-public variable` :

```python
tk = Person('TK', 'tk@mail.com')
print(tk._email) # tk@mail.com
```

> We can access and update it. Non-public variables are just a convention and should be treated as a non-public part of the API.

So we use a method that allows us to do it inside our class definition. Let’s implement two methods (`email` and `update_email`) to understand it:

```python
class Person:
    def __init__(self, first_name, email):
        self.first_name = first_name
        self._email = email

    def update_email(self, new_email):
        self._email = new_email

    def email(self):
        return self._email
```

Now we can update and access `non-public variables` using those methods. Let’s see:

```python
tk = Person('TK', 'tk@mail.com')
print(tk.email()) # => tk@mail.com
tk._email = 'new_tk@mail.com'
print(tk.email()) # => tk@mail.com
tk.update_email('new_tk@mail.com')
print(tk.email()) # => new_tk@mail.com
```

#### Public Method

With `public methods`, we can also use them out of our class:

```python
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def show_age(self):
        return self._age
```

Let’s test it:

```python
tk = Person('TK', 25)
print(tk.show_age()) # => 25
```

Great — we can use it without any problem.

#### Non-public Method

But with `non-public methods` we aren’t able to do it. Let’s implement the same `Person` class, but now with a `show_age` `non-public method` using an underscore (`_`).

```python
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def _show_age(self):
        return self._age
```

And now, we’ll try to call this `non-public method` with our object:

```python
tk = Person('TK', 25)
print(tk._show_age()) # => 25
```

> We can access and update it. Non-public methods are just a convention and should be treated as a non-public part of the API.

Here’s an example for how we can use it:

```python
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def show_age(self):
        return self._get_age()

    def _get_age(self):
        return self._age

tk = Person('TK', 25)
print(tk.show_age()) # => 25
```

Here we have a `_get_age` `non-public method` and a `show_age` `public method`. The `show_age` can be used by our object (out of our class) and the `_get_age` only used inside our class definition (inside `show_age` method). But again: as a matter of convention.

#### Encapsulation Summary

With encapsulation we can ensure that the internal representation of the object is hidden from the outside.

### Inheritance: behaviors and characteristics

Certain objects have some things in common: their behavior and characteristics.

For example, I inherited some characteristics and behaviors from my father. I inherited his eyes and hair as characteristics, and his impatience and introversion as behaviors.

In object-oriented programming, classes can inherit common characteristics (data) and behavior (methods) from another class.

Let’s see another example and implement it in Python.

**ElectricCar** class inherits these same attributes from the regular **Car** class.

```python
class Car:
    def __init__(self, number_of_wheels, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity
```

Our **Car** class implemented:

```python
my_car = Car(4, 5, 250)
print(my_car.number_of_wheels)
print(my_car.seating_capacity)
print(my_car.maximum_velocity)
```

Once initiated, we can use all `instance variables` created. Nice.

In Python, we apply a `parent class` to the `child class` as a parameter. An **ElectricCar** class can inherit from our **Car** class.

```python
class ElectricCar(Car):
    def __init__(self, number_of_wheels, seating_capacity, maximum_velocity):
        Car.__init__(self, number_of_wheels, seating_capacity, maximum_velocity)
```

Simple as that. We don’t need to implement any other method, because this class already has it (inherited from **Car** class). Let’s prove it:

```python
my_electric_car = ElectricCar(4, 5, 250)
print(my_electric_car.number_of_wheels) # => 4
print(my_electric_car.seating_capacity) # => 5
print(my_electric_car.maximum_velocity) # => 250
```

Beautiful.

### Magic Methods

`__str__` - 


`__init__` - used for a Constructor


`__new__` - 


### That’s it!

We learned a lot of things about Python basics:

- How Python variables work
- How Python conditional statements work
- How Python looping (while & for) works
- How to use Lists: Collection | Array
- Dictionary Key-Value Collection
- How we can iterate through these data structures
- Objects and Classes
- Attributes as objects’ data
- Methods as objects’ behavior
- Using Python getters and setters & property decorator
- Encapsulation: hiding information
- Inheritance: behaviors and characteristics

Congrats! You completed this dense piece of content about Python.
