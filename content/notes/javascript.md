---
title: "javascript"
aliases: 
tags: 
- cosc203
---

An dynamically typed interpreted scripting language to dynamically control websites.

# HTML DOM
(Document object model)
- JS can access and alter HTML elements
- When a page loads it creates the DOM as a tree of objects

# Using js
Add inline, external or internal (script tags) js

loading
- defer makes scripts run only after all scripts are loaded
- async scripts run as soon as they are loaded (no order guaranteed)

# Events
Triggered by various things that happen on a webpage

You can add an event listener to an element, which will trigger a function when that event occurs

# Cookies
Used to store data on client machines

Allows server to "remember users"

# Limitations
- Cannot access client files
- Cannot establish a connection to any server except the one it came from (apart from re-directing to a new site)
- no multithreading
- cannot read history
- cannot open invisible windows

# Async
Allows running long tasks in background while browser remains responsive

process
- Call function - returns a promise immediately
- When function is finished - we are notified and promise become a value

callback: function passed to another function

promise: object which represents the status of a function
- pending
- fulfilled -> .then
- rejected -> .catch
- settled (fulfilled or rejected)

await: keyword within as async function which makes code wait at a point for a task to finish

## Fetch
Used to request data from a server to update the page. Data is i