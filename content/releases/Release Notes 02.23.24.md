## News

*Big* stuff today.

- A DSPy demo for Honcho!  
    
- Honcho v0.0.4  
    
- A blog post exploring a new paradigm for user identity  


We're spinning up lots of direct channels for teams building with Honcho. [Join our Discord](https://mc.sendgrid.com/single-sends/f6b4e9ec-d1b9-11ee-a861-2a442512d272/editor/modules?moduleId=3132ac4a-0e6a-41d6-a023-b4348211294b.2), and let's build together 🦾.

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