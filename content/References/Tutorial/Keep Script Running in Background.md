---
tags:
  - ssh
  - linux
  - tmux
  - code
  - server
public: true
created: 2024-02-03
updated: 2024-02-10
---
## List all [[TMUX|TMUX]] instances
``` Shell
tmux ls function
```
___
## Creating a new TMUX instance
``` Shell
tmux new -s database
```
___
## Attaching to the new instance
``` Shell
tmux attach -t database
```
___
**Related**
- [Original Blog](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/)