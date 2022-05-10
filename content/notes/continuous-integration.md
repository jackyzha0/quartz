---
title: "continuous-integration"
aliases: continuous integration, CI
tags: 
- cosc202
---

# 1 Overview
Continuous integration (CI) is the practice of automating the integration of code changes from multiple contributors into a single software project -  [atlassian](https://www.atlassian.com/continuous-delivery/continuous-integration) . It allows you to automatically run tests, builds, etc when the code is changed. 

# 2 Pipelines, stages, jobs
A continous integration can be defined as a *Pipeline* with several *stages*, each stage with several *jobs*

A continuous integration pipeline will run whenever it is triggered. It can be triggered on a schedule, manually, or whenever code is changed. These pipelines run *asynchronously* i.e., the dev doesnt't have to wait for it to complete.

# 3 Triggers
Pipelines can also be run locally, and can be triggered, as you, commit, save, type etc. 

# 4 Output
Pipeline can produce several forms of asynchonous output such as email notifications, web badges, webhooks, etc. In addition, most VCS hosting platforms capture the terminal logs from the CI scripts.

# 5 Runners
Runners are what run the CI jobs. They are hosted and run by your git [VCS](notes/version-control-system.md) hosting system. You can also elect to have your hosting system trigger run that run on your local machine if you want to test your software on certain harware. Runners run on isolated infrastructure that is set up as needed to handle load variation. 

This is the basic gitlab infrastructure which uses google cloud
![300](https://i.imgur.com/HTWz2mQ.png) ![300](https://i.imgur.com/V87CeQY.png)

# 6 CI Website hosting
Due to the need to share artifacts produces by CI, most repo hosting services now also host websites. These are static websites i.e., all content if fixed. These websites are produced using Static Site Generators (SSGs). The code is hosted on the repo, which a CI pipeline converts into HTML files and publishes automatically.

# 7 How to create
Most CI frameworks use YAML for configuration. YAML  has a structured text based format similar to python and json

The CI config (in gitlab it is named `.gitlab-ci.yaml`) file goes in the top level of the repo, and is version-managed. This file specifies the stages and jobs of a pipeline, as well as indicating where the output should go.

# 8 Debugging
[debugging](notes/debugging.md) concepts should be applied

1st check yaml file

commands run from shell generate an exit code. This is stored in a variable called *$?*

If $? is non-zero, then the previous command failed. Your shell script can choose to hide this is the command is expected to fail

# 9 Secrets
If you need the CI script to log in to something, your repo hosting service can store and pass *secrets* to scripts using shell environment variables. When doing this, you need to make sure the CI script is secure, other wise someone could simply change the scripts to `echo` these variables.

# 10 Other tools can have CI-like functionality
e.g.,
- IDEs the compile code in background
- latexmk to auto build latex files when they change
- Git hooks (scritpts within .git/hooks)
	- informational: augment commit messages
	- pre-update: intecepts and check commit, push, rebase
	- pre-populate git messages
	- carry out post-update cleanup tasks

[10-continuous-integration-1](notes/10-continuous-integration-1.md)
[11-continuous-integration-2](notes/11-continuous-integration-2.md)
