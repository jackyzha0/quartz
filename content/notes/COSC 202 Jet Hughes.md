---
title: "COSC 202 Jet Hughes"
aliases: 
tags: 

---


<div style="page-break-after: always;"></div>

# 1 Teamwork
a) 
-  Quality control
- Developer

These roles are compementary because the person in the quality control role, helps the developer to write better code

b) 
- Its can help to reduce errors via quality control and code review
- It can help to speed up development because two peolple will (usually) be faster than one


<div style="page-break-after: always;"></div>

# 2 Ethics

a) One example could be an AI algorithm for a self driving car. There are mulitple ethical issues with this. The main one being the choice of whether to save the driver or the pedestrians in the event of an inevitable accicent. Another is whether or not it is morally right to produce these cars, knowing it is very possible that they could be hacked, and controlled by others.

b) 
1) Confront your manager, and explain to him your feelings, then quit
2) Another course of action you could take, which would be unethical, would be to confront him, and ask for a raise with the threat of quitting


<div style="page-break-after: always;"></div>

# 3 Testing and Debugging

a) If you introduced a bug into your program,the bug is an array index out of bounds error, and the error message shows which method the bug occured. This debug symbol (the name of the method) is useful because it shows you where the bug is
b) 

| Unit tests                                             | end to end tests                           |
|:-------------------------------------------------------|:-------------------------------------------|
| testing only small "unit" of the code e.g., one method | Test the entire system from "end" to "end" |
| Very quick to run, and are run frequently              | Often run less often                       |
| Independent so no dependencies                         | Often interconnected with other systems    |


<div style="page-break-after: always;"></div>

# 4 Documentation and source code management

a) 
1) Open source contributors - if the project is open source, it is very useful to provide documentation so that is is as easy as possible for other people to understand your code, and thus contribute to it
2) Users of a public API - the people who want to use the API, need to now about the data they can get, what authentication they need to provide, what parameters they should consider, and many other things. 


<div style="page-break-after: always;"></div>

# 5 Continuous integration and automation

a) 
1) IDEs - These can be used to greatly speed up development with advanced tools like code completion, and many other things. They are best suited for large projects, with many team members. However there are also many lightweight IDEs (e.g., vscode) which are also quite suitable for small projects
2) shell scripting languages(e.g., poweshell, bash, fish, etc) - can be used to automate quick and simple tasks. They are not suited for more complex tasks as edge cases and quirks become hard to handle and are usually not worth the time. For these tasks you could use python or some other language.

b)
i) ADD HERE
ii) ADD HERE



<div style="page-break-after: always;"></div>

# 6 Libraries and APIs

a) A code library provide code that can be used within one's own project. APIs differ from libraries because they deal with the interactions between applications at runtime. 

b) A RESTful API adheres to the guidlines of Representational state transfer. Some fo these best practices include:
- decoupled
- stateless
- uniform interface

c)
i) Sorting algorthims can be very complicated. Is would be far easier and faster to use one that has been thouroughly tested and optimised already.
ii) Often there is no library that perfectly matches your specific needs, and it would be faster, and better to create if yourself. Also using a library can bloat your program and introduce security vulnerabilities as well as other things

<div style="page-break-after: always;"></div>

# 7 Security
a) Users will try to input malicious data to your software. For example, an SQL Injection attack. This is when the user inputs data to a form, which tries to change the underlying SQL string, and alter the data in the database, in a malicious way. This can usually be avoided by using SQL prepared statements, or secure datbase abstraction.

b) more software ∴ more dependecies ∴ more complex ∴ more "surface area" of risk of vulnerability. so it is very important to manage which dependencies you have, and monitor their status, so you can quickly resolve any vulnerabilities they might introduce, or remove, them entirely if necessary.

<div style="page-break-after: always;"></div>

# 8 Software Licensing

a) Authors copyright holds for software that does not have a specific license. This means 

b) Copyleft licenses require, software that uses other code (not limited to code, could be art, writing, etc) with a copyleft license to use the same license. i.e., code with a copyleft license requires it's derivatives to have the same requirements. This is not enforced with other licenses like MIT or CC-0

c) Open source software is software which is considered 'free libre open source software'. This means it has no cost, and other people are allowed to use it in their own projects, or contribute to it. Software with a copyleft license like (CC BY-SA-NC or GPL) *can* be open source, and this is usually the case. These two example ()

However it is not necessarily closed source, e.g., with lesser GPL. 