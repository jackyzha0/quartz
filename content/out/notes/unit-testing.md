---
title: Unit testing
draft: true
---
# Unit testing
- divide code into units ⇒ test those units

- consider appropriate scale
	- depends on type of code project as well as language
	- object oriented: classes? methods?
	- procedural: functions? modules?

- test each unit independently
	- frequently
	- often after each commit/push
	- can run tests if parallel
	- may need to build environment in which tests run

### 0.1 supports useful principles
can support complementary work by team members
early discovery of problems
can help with documentation and specification
- unit tests can be a form of executable specification
- helps team members understand requirements

### 0.2 Test environment
consider code that interacts with a database
- you cant let that code write to a real database
- but you want to check that writes were performed

common solution is to create a fake database
- class that mocs database operations
- can also test error handling by returning error codes

mock up the database with a pretend model that returns fixed results to query
- be careful not to mock up data base incorrectly

can be a pre-recorded interaction

### 0.3 Test life cycle
- set up test environment
- run test code
- check results
- aggregate results into test summary

simple test: run method ⇒ check value
tests may chack that code fails appropriately
- crash when expected
- exceptions are generated

### 0.4 Language support
language may have bilt in testing support
- e.g., Go and Rust have command line tools to run tests

External tools can often work well too
- e.g., java code annotations can mark tests
- java ignores most annotations, but testing tools (JUnit)  can use them
- annotations are symbols that begin with @ in source code

we want to distinguish between tests and normal code
- also should support for sqapping in/out mocking code

### 0.5 JUnit
test classes have a particular filename pattern
annotate test methods with @Test
other annotations
- @BeforeAll and @BeforeEach (and after)
- @RepeatedTest

JUnit 5 also supports dynamically generated tests

### 0.6 TestNG
based off JUnit and fixes some it it's problems
- provides control over threading
	- run tests in parallel
	- also tests for parallelism bugs
	- multithreaded code i hard to debug
- data driven testing
- also
	- integration testing
	- end to end testing