---
title: "git-cheat-sheet"
tags: 
- cheatsheet
---

# Git Cheat Sheet

## 1 Commands
- Clone -> create local copy of remote repo
- Commit -> save changes to local repo
	- Packages logically related collection of changes and save the permanently is repos history
	- Each commit should address single well defined task
	- Commits should be small and regular
	-  Should contain a brief, informative, message
		- one line -> <50 (commit needing more than this are likely too large)
		- multi line -> <72
		- well defined, shared terminology
		- consider what other devs need to know
- Stash -> temporarily store uncommited changes
- Push -> Upload changes from local repo to remote
- Pull -> Download and merge changes from remote repo into local repo (fetch + merge)
- Merge -> Merge changes from one brach into another
	- merge when:
		- pulling changes from remote into your repo
		- merging from branch into main codebase
	- Can merge any branch into any other branch
	- good idea to regularly rebase specialised persistent branches to keep them in sync with the more general main codebase
	- rebase topic branches before merging into main
		- helps to deal with merge conflicts
		- only branch is broken if you mess up
		- can test for breakage before merging to main 
	- Merging is usually automatic
		- sometimes merge algorithm can't resolve conflicting changes to the same code
			- e.g., two devs  change the same method at the same time
			- conflict must then be manually resolved
		- All VCS will check that your repo is up to date before pushing, and force you to push if not 
- Tag -> name a particular commit e.g., for a release

## 2 Terms
- Head -> most recent commit on Current branch
- [[branch]] -> Split current dev path into two to work on e.g., a bug or a feature
- Repository -> Where the codebase/file are stored
	- Contains meta-data about the previous vesions etc
- Merge commit -> commits which are derived from multiple parent commits
- Git tag -> e.g., v 1.0
	- cannot be move by commits
	- record metadata