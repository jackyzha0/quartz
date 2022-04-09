---
title: "continuous-integration"
aliases: continuous integration, CI
tags: 
- cosc202
---

Continuous integration (CI) is the practice of automating the integration of code changes from multiple contributors into a single software project -  [atlassian](https://www.atlassian.com/continuous-delivery/continuous-integration) . It allows you to automatically run tests, builds, etc when the code is changed. 

A continous integration can be defined as a *Pipeline* with several *stages*, each stage with several *jobs*

A continuous integration pipeline will run whenever it is triggered. It can be triggered on a schedule, manually, or whenever code is changed. These pipelines run *asynchronously* i.e., the dev doesnt't have to wait for it to complete.

Pipelines can also be run locally, and can be triggered, as you, commit, save, type etc. 

Pipeline can produce several forms of asynchonous output such as email notifications, web badges, webhooks, etc. In addition, most VCS hosting platforms capture the terminal logs from the CI scripts.

Most CI frameworks use YAML for configuration. YAML has a structured text based format similar to python and json

The CI config (in gitlab it is named `.gitlab-ci.yaml`) file goes in the top level of the repo, and is version-managed. This file specifies the stages and jobs of a pipeline, as well as indicating where the output should go.

#unfinished 

[10-continuous-integration-1](notes/10-continuous-integration-1.md)

[11-continuous-integration-2](notes/11-continuous-integration-2.md)
