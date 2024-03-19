---
title: Release Notes 02.08.24
date: 02.08.24
tags:
  - releases
  - honcho
  - dev
---
Today we're releasing some much needed reliability and usability updates to Honcho.  
  
This one's for the nerds...well, except for one *meta* feature 👀.  
  
You can also [subscribe to these updates](https://plasticlabs.typeform.com/honchoupdates).  
  
## Honcho v0.0.2  

### ADDED
- An asynchronous client for all methods
    
- *Metamessages* to allow for more complex agents
    
- Paginated results for GET requests to support large numbers of Sessions, Messages, and Metamessages
    
- `created_at` field to all tables to give timestamps
    
- Singular `get_message` method for retrieving individual messages
    
- Size limits for string fields based on common database limits--65535 characters for message content and 512 characters for all other string fields

### CHANGED
- Default API rate limit raised to 100/minutes
    
- Default ID type to use UUIDs for built in robustness
    
- `session.delete()` is now `session.close()` to more accurately reflect functionality

### REMOVED
- Messages from Session GET requests to decrease payload size