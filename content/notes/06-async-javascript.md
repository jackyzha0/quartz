---
title: "06-async-javascript"
aliases: 
tags: 
- lecture
- cosc203
---

Async programming allows you to start a potentially long running task have still be able to interact while it it running

general process
- start the task
- return immediately so other tasks can run
- notify us with result when the task is finished


promises
- an object returned by an async function
- represents the current state of the operation
- when the promise is returned to the caller it not always finished
- the promise object has methods to handle the eventual success or failure of the operation

```
const fetchPromise = fetch('https://url.url.json')

fetchPromise
	.then((reponse) => {
		return response.json();
	})
	.then((data) => {
		console.log(data[0].name)
	})
```
