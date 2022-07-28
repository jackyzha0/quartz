---
title: "05-javascript"
aliases: 
tags: 
- lecture
- cosc203
sr-due: 2022-08-06
sr-interval: 8
sr-ease: 250
---

# Javascript
## DOM
- JS can access and change all the elements of an HTML document
- When a webpage is loaded, the browser creates a DOM of the page
- The HTML DOM model is contructed as a tree of Objects

![HTML DOM Diagram|300](https://i.imgur.com/2TZ2i1c.png)

JS can:
- change elements
- change attributes
- change styles
- remove elements
- add new elements
- react to events
- create new events

JS is 
- descriptive
- structued
- interpreted

can be linked externally
- `<scipt src="script.js" defer></script>`
- `defer` ensures that the js is loaded after the html (in a specific order)
- `async` ensures that the js is run as soon as it is loaded (not in a specific order)

typing
 - js is dynamically typed
 - you dont need to specify the type of variable

events
- e.g., click, hover, resize etc
- smoke alarm analogy
	- fire is the event
	- alarm is the listener
	- sound of the alarm is the handler

cookies
- websites can use JS to store cookies on client machines.
- usually server 'serve' the file to the user and nothing else
- cookies allow to server to remember information about the client
- `document.cookie`

limitations
- cannot write to files (apart from cookies)
- cannot execute programs on client computer
- cannot establish a connection to any server except the one it came from (apart from re-directing to a new site)
- cannot read history of brower (but is can cause the brower to move around in the history list)
- not supposed to be able to open an invisible window
