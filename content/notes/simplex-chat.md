---
title: Simplex Chat notes
tags:
- notes
- simplex chat
date: 2023-12-29
---

## Overview
Simplex chat [1] is a chat application that boasts privacy as a feature and doesn't have user IDs. As I have been involved with [Status](https://status.app) and [Waku](https://waku.org) and the underlying protocols that run them (hosted by [Vac](https://vac.devv)), it makes sense for me to understand how it differentiates itself from the protocols I understand, and what their tradeoffs are. 

These are my notes in trying to understand Simplex, and how it differentiates itself, technically, from other chat protocols and apps. 

## How does it not have User IDs? 
As per the front page of the website, it uses "temporary anonymous pairwise identifiers of message queues." The Whitepaper [2] goes on to detail how this is done. 

The tl;dr is a user defines what servers they receives messages at, which is described in the initial contact creation. Sending a message to someone is just sending a message to a queue within their predefined server(s). From there, clever use of cryptography allows an app to reconstruct a back and forth betwen users. 

## General data flow
1. Contact addition is out of band
  a. contact addition includes: 

## References

[1]: https://simplex.chat official site 
[2]: https://github.com/simplex-chat/simplexmq/blob/stable/protocol/overview-tjr.md whitepaper
[3]: https://github.com/simplex-chat/simplexmq/tree/stable/protocol/diagrams diagrams