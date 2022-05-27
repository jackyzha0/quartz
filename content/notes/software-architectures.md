---
title: "software-architectures"
aliases: 
tags: 
- info201
---


\# of pieces?
- one integrated piece
- a few distinct components
- many distict components

does it run:
- on one machine
- spread across multiple machines
- in the cloud

these consdier ations dtermine the structure of the software we create

these have changed over time. from monolithic to distributed ![changes of distribution](https://i.imgur.com/QAxVwgn.png)

## Monolithic architecture
system includes all relevant code in one executable
- e.g., UI, business logic, data management
- self-contained
- no significant separation of reponsibilities

easy to deploy,  awkward to upgrade.
- widely spaced "big bang releases"
usually only seen in legacy systems now

## Separation of reponsibilities
partition systems into logically separated parts. e.g., UI, business rules, data access, utilities

easier to upgrade

each part can be deployed ina different location

each part is more cohesive
- related code all in one place
-  unrelated code cleanly separated
- well definec interactions between parts
- easier to design, devleop and maintain

can have "fake data" etc for development

## Generic (old) info sys architecture
![front middle back end](https://i.imgur.com/oPPMVfz.png)
![client server](https://i.imgur.com/46LHAyw.png)

this is limiting and old. based more of hardware than software.

## modern system example
![modern system](https://i.imgur.com/uLVaVbQ.png)

## Microservices
everything is a service
- APIs that can be called over the internet
- e.g. product service, customer service

small cohesive units of code
- performs a single function
- each with their "own" data
	- not necessarily its own database
- as autonomous as possible
- independent and effectively disposable
	- very scalable
	- auto matic load management
- can run many redundant instances concurrently


A system is a collection of services

most common implementation architecture for modern distributed information systems and web apps

## serverless computing
tradtional web app deployment usually still involves one or more identifiable servers
- includes microservice baed aps
- server may be virtualised
- generally require per sserver configuration

serverless eliminates the "server" concept
- just deploy code into the cloud
- no server config needed
- a form of *utility computing*
- e.g., google app engine

## Function as a service

logical extreme of serverless computing

deploy individual functions into the cloud
- no real concept of a "app"
- fits well with microservice acrchitecture
- very lightwright - fast and scalable
- application logic only ⇒ dont store any data

componentised highly distributed software

ideal for on-demand computing

e.g., AWS lambda, google cloud functions, microsoft azure functions etc
