---
title: "13-code-librarires"
aliases: code libraries, libraries, software library
tags: 
- cosc202
- lecture
sr-due: 2022-04-14
sr-interval: 3
sr-ease: 250
---

# what is a software library

- collections of potentailly useful code. 
- implement comon fuunctionality so you dont have to 
- e.g., 
	- music processign
	- game engines
	- etc.

- languages may include standard libraries
- *standard library* is one that is always available within a language
	- e.g., Java standard library
- these make up only a small part of the broader available library functionality


# Pros and cons of libraries

- utf-8 conversion tables and collation schemes
	- e.g., for comparing equality of e.g., 'Māori' and 'Maori'.
	- this equality depends on the 'collation' scheme that is being used
	- conversion tables and collations are need for all known languages
	- it is good to not have to rewite these for each piece of software
	- just use a library

- library code quality
	- well written libraries can propogate great benefits
	- econoomies of scale from reusilng good implementations
		- somebody needs to pay for the develp ment of the library
		- needs to be maintained
	- There is a downside -  code homogeneity
		- all programs using the same library carry the same security bugs
	- if you dont know the librar;y in detail you may not be able to fully utilise it

- deep experience libraries
	- intel creates libraries that utilise their CPUs the best
	- they dont have to wait for library to be made that fully utilises their hardware
	- 

# understand trasitive dependencies in libraries
https://xkcd.com/2347/

libraries rely on other libraries. These are called transitive dependencies. 

Software bill of materials enumerate what you depend on.
when one of the libraries you use is updates, you may need to update to .

# how they are provided
- provided within language
- some OSs provide large amounts of functionality
	- e.g., apple ecosystem
		- co dev of language and OS
	- microsoft windows ecosystem
		- .net

# your obligations from using libraries

mulitple different ways to interact with libraries
- tight integration compiler builds library code into yours
	- only uses parts of library that you included in your app
	- but upgrading library requires rebuilding the app
- library is packed alongside you app
	- may bloat youu app: includes unused library parts
- licencing of the library
	- legal obligations

# considerations when writing libraries
- must consider general use cases
- proper documentation
- future maintenance
	- include abstractions to facilitate incremental updates
- version numbering is important for compatibility
	- minor changes wont affect existing code
	- major changes will affect existing code

# features of Java standard libraries
- very large
- e.g., two flavours of I/O
	- traditional
	- async i.e., non-blocking (NIO)
- written in java
	- portable across OSs
	- thin layer of OS specific code
	- this helped it to 
	
# FYI "Boost"ing C++ library support

boost is a rich set of libraries for C++



