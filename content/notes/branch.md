---
sr-due: 2022-04-10
sr-interval: 13
sr-ease: 210
---
#### 0.1.1 Review Questions
1. name and describe two methodologies for using branches. Acronym for methodologies -> (GOOF)
	- gitflow
		- very structured
		- uses a set of branches each with a specific purpose
	- On the main branch 
		- focused on not creating new branches
		- smaller self-contained commits are better
	- Off the main branch
		- most work occurs on a branch
	- Feature branches
		- each features has it's own branch which is merged and ~~deleted~~ can be worked on after completion
1. what is the difference between a topic/feature branch and a persistent branch 
	- feature branch
		- used for a fixed term task such as a bug or a feature
	- persistent branch
		- branch that exists for the lifetime of the project

2. what is continuous intergration

---

#review 

# Branch
Split current dev path into two to work on e.g., a bug or a feature

![Books](Books.md)

## 1 Overview
- allows users to work independently
- development continues independently along each branch
	- can easily switch between branches
	- can push a branch without affecting others
	- branches can be merged back into the original
	- always at least one main branch (usually master, main, trunk)
	
## 2 Default branch
used to be called master
now called main

## 3 Methodologies
### 3.1 Working on the main branch
focuses on not creating branches
- over time long branches become difficult to merge
- smaller, self-contained changes are encouraged
- focus on main code objective, avoiding side-experiments

sometimes this is not possible
- complex bugs or features need branches

pair programming
- e.g., vs code allows multiple developers to work on the same code at the same time.

### 3.2 Working off the main branch
- branches can be shared with teams
	- still isolated commits from the main branch
- more commits can be added to a branch _after_ it has been merged

### 3.3 Feature branching
all new features are developed in a separate branch
merging to the branch "adds" that feature
after a feature is added, it call still be added to using the same branch

### 3.4 Gitflow
viewed as ovecomplicated
a set of shell scripts helps it be used
highly structured

e.g.,
- main branch -> branch has commit for release versions
- develop branch -> branch is where development occurs
- feature branch -> branches branch off development branch
- release branch -> branch polishes for release
- hotfix -> branches of main branch thence into develop



## 4 continuous integration
- [CI vs feature branch](https://www.youtube.com/watch?v=v4lijkq6Myfc)
		- [cl vs feature branch](https://www.youtube.com/watch?v=IXQEi1O5!OI)
		
## 5 Topic/feature branch
- created for a specific purpose .e.g, bug/feature
	- can pull from remote without marge conflicts (should be only one person working on branch) 
	- the more short-lived branches are the less likely there are to be merge conflicts with main
		
## 6 Persistent branch
- long term branch that exists for the lifetime of the project
- e.g.,
	- release branches
		- release v1, start on v2
		- security flaw in v1, needs to be fixed
		- v2 not finished yet
		- create branch at last v1 commit and fix there
		- also fix in v2 (if applicable)
		- v1 branch will last until v2 is released
	- specialsed versions of code base
		- e.g., to support specific platforms or hardware
		- e.g., to support feaures for a specific customer
		- features for this specilised version on go on that branch
		- keeps specialised code out of main codebase