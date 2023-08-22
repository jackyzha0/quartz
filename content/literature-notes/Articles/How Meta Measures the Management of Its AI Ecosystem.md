---
author: [[facebook.com]]
title: "How Meta Measures the Management of Its AI Ecosystem"
tags: 
- articles
- literature-note
---
# How Meta Measures the Management of Its AI Ecosystem

![rw-book-cover](https://scontent-lax3-1.xx.fbcdn.net/v/t39.2365-6/329234186_930918231689922_3285773809582652411_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=RU0GESjgIB4AX9qbUBi&_nc_oc=AQkg1wFWei_XXivsqCAYN0ukwGdqiAIHsCPvzQAoousH5voRuqf1ZgYoYKbyno_-T4A&_nc_ht=scontent-lax3-1.xx&oh=00_AfCGyHrMIKs11s2nCHFncQ22KzaxSfkGc2F6QgUVETCMDg&oe=6424F147)

## Metadata
- Author: [[facebook.com]]
- Full Title: How Meta Measures the Management of Its AI Ecosystem
- Category: #articles
- URL: https://ai.facebook.com/blog/meta-ai-ecosystem-management-metrics/

## Highlights
- we will walk through approaches we’ve developed for measuring the maturity of our AI models and tracking management outcomes. ([View Highlight](https://read.readwise.io/read/01gyay9skv57kp276d0g5afqz4))
- We’ll start by exploring the way we think about AI model management (one of the core components of Meta’s broader AI governance strategy), then discuss how to move toward consistently defining concepts across authoring, training, and deploying AI model ([View Highlight](https://read.readwise.io/read/01gyaya1z9nna89r44tqbyk8pb))
- t Meta, we have developed measurement processes for specific metrics about AI systems that can be used to make managing models more effective and efficient, and we’ve tested these processes across a diverse ecosystem of tools and systems. ([View Highlight](https://read.readwise.io/read/01gyay8f2cc4701akacqa543j2))
- we provide product teams with opportunities to match AI tooling to their needs. Some product teams use tightly coupled custom solutions to meet exceptional feature and scale requirements, while others benefit from the ease of use of simpler, more general tools. This variance allows for effective AI development and fast iterations, but it also adds complexity to model management. Vari ([View Highlight](https://read.readwise.io/read/01gyaybgwrehggvcm5qgvtcbgs))
- The first step in assessing the artifacts of AI modeling is selecting the right component for each use case. To do so, it can be helpful to picture a general structure of model development, pictured below as it looks at Meta. ([View Highlight](https://read.readwise.io/read/01gyaycwp2q18zky66byh98na7))
- Model source code is written by engineers to solve a given purpose (such as ranking posts), and then one or more model binaries are trained from this source, often being created periodically for either iterative model improvements or retrainin ([View Highlight](https://read.readwise.io/read/01gyaydj44ghznn60qhw9fe6m2))
- After selecting the model artifact to measure, additional complexity arises when artifacts with the same function have different labels in different tools ([View Highlight](https://read.readwise.io/read/01gyayf02c5dv7mbpd6vhrqyw8))
- , where system 1 calls the model source code the “Model,” with another term denoting the trained binaries, and system 2 considers binaries the “Model,” calling the model source code something else. If we were to select all “Models” from these systems, we’d get a mix of source code and binaries, which are not comparable. T ([View Highlight](https://read.readwise.io/read/01gyayfggtntzg243xe69fdra9))
- To avoid inconsistency while maintaining decentralization of our AI systems, we’ve worked toward consolidating certain logging information into a single platform that can then serve various needs when queried. ([View Highlight](https://read.readwise.io/read/01gyayg7dqeyt0sc98vv9v0whx))
- • A feature source record stores the origin of data for a particular feature.
  • These sources are linked to any number of logical feature records, which store the logic to transform the raw data into a training dataset.
  • Model code and its training dataset are connected to a workflow run, which is a pipeline that executes to produce one or more model binaries.
  • Finally, the model binaries are linked to one or more model deployments, which track each place where binaries are serving inference requests. ([View Highlight](https://read.readwise.io/read/01gyayhcesxsmc14a59fg4gs30))
- These describe the outcomes expected in models with a standardized, bucketed format. ([View Highlight](https://read.readwise.io/read/01gyayjwm2j3krh02ad6brt4rr))
- Even with consistently defined metrics, it can be challenging to make sense of outcomes across each metric individually. Implementing a hierarchical framework structure to group metrics can help alleviate this problem. These groupings constitute a graph of metrics and their aggregations for each model, and various nodes on that graph can be reported for different purposes. Ag ([View Highlight](https://read.readwise.io/read/01gyayk7nfsmmmzr8kdd3g01hx))
- • Think about how different tools contribute to a generic AI development process, and map outputs from various tools to consistent artifacts in that process.
  • If your AI systems are complex and can’t be consolidated, think of measurement as a platform with a metadata graph and common interoperability standards.
  • For a broad view of outcomes, consider a metric framework that can compare and aggregate across model management domains. ([View Highlight](https://read.readwise.io/read/01gyaykkbc96b25x29pgpka7f8))
