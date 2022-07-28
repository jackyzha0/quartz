---
title: "06-async-javascript"
aliases: 
tags: 
- lecture
- cosc203
---

Async programming allows you to start a potentially long running task have still be able to interact while it it running

# general process
- start the task
- return immediately so other tasks can run
- notify us with result when the task is finished

# promises
- an object returned by an async function
- represents the current state of the operation
- when the promise is returned to the caller it not always finished
- the promise object has methods to handle the eventual success or failure of the operation

``` javascript
const fetchPromise = fetch('https://url.url.json')

fetchPromise
	.then((reponse) => {
		return response.json();
	})
	.then((data) => {
		console.log(data[0].name)
	})
```

each `.then` itself returns another promise which also has a `.then` method. This is called **promise chaining**


## promise statuses

**pending:** the promise is created but the task has not finished yet
**fulfilled:** the task has finished successfully -> `then()` is called
**rejected:** the task has failed -> `catch()` is called
**settled:** fulfilled or rejected

## combining promises

```javascript
Promise.all([fetchPromsise1, fetchPromsise2, fetchPromsise3]) //it is fullfilled once and if all the promises are fulfilled
Promise.any([fetchPromsise1, fetchPromsise2, fetchPromsise3]) //it is fulfilled once any one of the promises is fullfilled or all are rejected
```

# Async and await
looks like sync code but is actually async

async functions always return a promise

the `await` keyword can only be used in async functions. It makes the code wait at that point untill the promise is fulfilled

``` javascript
async function myFunction(){
	const response = await fetch('https://mdn.github.io/learningarea/javascript/apis/fetching-data/can-store/products.json');
}
```

# error handling
the fetch API can throw errors

to handle these promise objects have a `catch` method. this is similar to a `.then` but only trigger when there is an error.

``` javascript
const fetchPromise = fetch('https://url.url.json')

fetchPromise
	.then((reponse) => {
		return response.json();
	})
	.then((data) => {
		console.log(data[0].name)
	})
	.catch((error) => {
		console.error('could not get products: ${error}')
	})
```

# JSON

Javasript Object Notionation

``` json
[
	{
		"name": "john",
		"type": "person"
	},
	{
		"name": "bob",
		"type": "person"
	},
	{
		"name": "sally",
		"type": "person"
	},
]	
```