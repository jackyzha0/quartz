---
title: Release Notes 02.15.24
date: 02.15.24
tags:
  - releases
  - dev
  - honcho
  - demos
  - announcements
---
Today we've got Honcho v0.0.3, vectorDBs, open source OAI memory, demos, and a blog post.
  
If you're building with or adjacent to [Honcho](https://honcho.dev), [join our Discord](https://discord.gg/plasticlabs), and let's jam on what we can build together 🤝.  

## News
- VectorDB support for global, session-spanning user information!
    
- An open source reimplementation of OpenAI's 'memory' features:
    
	- Uses Honcho to effortlessly organize sessions on a per-user basis
    
	- Derives facts about users, stores them, and retrieves for later use
    
	- [Implementation with the useful abstractions LangChain provides](https://docs.honcho.dev/how-to/personal-memory/simple-user-memory)
	  
	- [Discord Bot demo](https://discord.gg/plasticlabs)!
    
	- [[Memories for All|Blog post on the why]]

## Honcho v0.0.3
ADDED
- Collections table to reference a collection of embedding documents
    
- Documents table to hold vector embeddings for RAG workflows
    
- Local scripts for running a postgres database with pgvector installed
    
- OpenAI Dependency for embedding models
    
- PGvector dependency for vectorDB support

CHANGED
- `session_data` is now `metadata`
    
- `session_data` is a JSON field, used python `dict` for compatibility