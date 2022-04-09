---
title: "continuous-integration"
aliases: continuous integration, CI
tags: 
- cosc202
---
## 0.1 What is it
continuous --> is always happening
integration --> connecting software components

- in contrast to ad hoc, occasional integration:
	- diverging component developmetnamy break integration
	- repaiing software may be expensive

- supports 'aglile' software dev
	- like test driven development, help catch issues early

- usually automated

## 0.2 Purposes
- checking code syntax
	- e.g., have CI compile the code and report errors
	- (local devs compilaer may be different from remote)
- checking semantics of code
- building docs
	- e.g., auto run javadoc
- running projects code tests
	- auto run JUnit, and report fails

## 0.3 Starting CI jobs
- from version control
	- e.g., every commit triggered CI jobs to run
	- starts on a push to server
- manually
- on a schedule

## 0.4 Runs asnychronously
- dont require devs to wait for completion
- common to run locally as well as on consistent standard environment

- other timescales
	 - local checks as you commit
	 - checks as you type
	 - checks as you save

## 0.5 Output
since CI is asynchronous, its feedback is also

- e.g., 
	- web badges showing status
	- can send emails
	- messaging platform
		- e.g., slack, discord, teams
		- webhooks etc

git project websites usually provide logging interface,. They will watch scripts in virtual terminal and capture output from CI scripts

## 0.6 Github piplines

- a pipeline has multiple _stages_
	- e.g., test, build, deploy

- each stages has multiple _jobs_
	- e.g., JUnit, custom tests, etc

## 0.7 Yaml

- most Ci frameworks use YAML for their configuration
- structured text based formats
- python-like format or ≈JSON

## 0.8 configurationg from git repo

- CI config often via file in git top-level directory
- CI is version managed

- Gitlab pipeline specs go into .gitlab-ci.yaml:
	- shows command sequece to run for a jon, within a stage
	- output from commands is stored for a subsequent viewing
	- indicates what files 'artifacts' should be kept from jobs
