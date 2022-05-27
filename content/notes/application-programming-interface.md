---
title: "application-programming-interface"
aliases: API
tags: 
- cosc202
---

Allows code (and people) to interact with other people applications. They define interactions points (*endpoints*) within the code, where data is retrieved (GET) or inserted (POST). Each endpoint is accessed using a *URL* or URI through *HTTP*.

# REST principles
> Representational state transfer.

These principles describe the best practives for building APIs.

Some of the main points are:
- decoupled
	- not dependent of e.g., a specific browser
- stateless
	- each interaction is self contained
	- although sometimes this is not used
		- e.g., authenticated "sessions"
- uniform interface.
	- codifies principle of using HTTP methods on URLs
	- internal representation of data id hidden
	- interactions are based on resources

REST principles were Co-developed with the web

# Java REST APIs
java servelts are code blocks that handle requests. java.servlet.http library

framworks like Spring support Java API development
- wraps an aplicationserver around you data classes
- can persist your data in a database
- also provides servers that can host API access to your data

## Web technologies
- resources on the web are identified using URLs 
- HTTP is the network protocol for data transfer in the web
- HTTP describes 'methods' to apply to URLs
	- GET *read* a resource identified using a URL
	- PUT *writes* to a resource identified using a URL

# Cloud computing
Uses *mircoservices*

apps built from intercommunicating microservice components/ each component can scale independently.components are loosely coupled. 

# Bulding an API
Use a [library](notes/libraries.md)/framework with:
- human readable documentation of functions
- ability to manually interact

Some APIs will provide tools to interactively build snippets which can be copy pasted

# Maintaining API
Similar to maintenance of code [libraries](notes/libraries.md)
- need to consider abstractions
- need to evolve
- future proof as much as possible
- avoid complete rewrites
- use versioning


# Other stuff
## Flask
small python web sever

## code and data
APIs define interaction points within code. (Similar to visibilty of methods).
- also force a barrier between devs code

need developer to understand data model
- this may appear explicitly in API calls
- may be that API calls manipulate unseen data
	- need ndevs to be comfortable with you *mental model*

Use of [libraries](notes/13-code-librarires.md) share many of these points

## Overview
Allow code to interact with others applicatioins.

can be used by people, not only code. 

API differ from libraries because they deal with the interactions between applications at runtime. 

APIs work accross different "distances" of interaction. e.g., intergrating software components within one server vs across the internet

web technologies have positively impacteed api by
- simplfy development - provide base of technologies that can be used to gain access to data in a structure way
- normalised tools to using APIs

