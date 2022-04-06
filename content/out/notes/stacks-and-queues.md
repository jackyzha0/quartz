---
title: Stacks and queues
draft: true
---
# Stacks and queues
Dynamic linear data types (interface)
- an abstraction of a collection of data organised "in a line" which supprts addition of new elements and the removal of (some) old elements
- e.g., stacks and queues
- the difference in the removal operation
	- stacks ⇒ (pop) LIFO
	- queues ⇒ (remove, offer, pull) FIFO
- representation
	- array (preffered because of memory management)
	- linked list (seems more natural)