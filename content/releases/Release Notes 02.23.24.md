---
title: Release Notes 02.23.24
date: 02.23.24
tags:
  - releases
  - honcho
  - demos
  - announcements
  - dev
---
## News

*Big* stuff today.

- [A DSPy demo for Honcho](https://github.com/plastic-labs/honcho/tree/main/example/discord/honcho-dspy-personas)!  
    
- [Honcho v0.0.4](https://github.com/plastic-labs/honcho/tree/v0.0.4)  
    
- [[User State is State of the Art|A blog post exploring a new paradigm for user identity]]  


We're spinning up lots of direct channels for teams building with Honcho. [Join our Discord](https://discord.gg/plasticlabs), and let's build together 🦾.

## Honcho v0.0.4

ADDED
- A User object for global user level metadata and more object oriented interface
    
- Reverse Pagination support to get recent messages, sessions, etc. more easily
    
- Linting Rules

CHANGED
- Get sessions method returns all sessions including inactive
    
- Using timestampz instead of timestamp
    
- `Client` renamed to `Honcho`
    
- `Honcho` takes in `app_name` instead of `app_id`. `app_name` needs to be a unique identifier
    
- `Honcho` object requires an `initialize()` call to be used