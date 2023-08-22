---
author: [[eugeneyan.com]]
title: "What I Do Before a Data Science Project to Ensure Success"
tags: 
- articles
- literature-note
---
# What I Do Before a Data Science Project to Ensure Success

![rw-book-cover](https://eugeneyan.com/assets/og_image/ideal-data-science-workflow.jpg)

## Metadata
- Author: [[eugeneyan.com]]
- Full Title: What I Do Before a Data Science Project to Ensure Success
- Category: #articles
- URL: https://eugeneyan.com/writing/what-i-do-before-a-data-science-project-to-ensure-success/#first-draw-the-map-to-the-destination-one-pager

## Highlights
- First, Draw The Map To The Destination (One-Pager)
  The map covers the intent, desired outcome, deliverable, and constraints. ([View Highlight](https://read.readwise.io/read/01gqqv431az1h7ewqhayqwy2ne))
- Intent (Why?)
  What’s the problem we’re trying to solve, or the opportunity we want to gain from? How will customers benefit? *Why* are we doing this, and *why* is it important? ([View Highlight](https://read.readwise.io/read/01gqqv4a4pvrf9vxa699rqhprg))
- Management is doing things right; leadership is doing the right things.” - Peter Drucker ([View Highlight](https://read.readwise.io/read/01gqqv4hdmekgf30nmbb39a6m6))
- But, by taking the time to think through the problem and intent, we might realise that, hey, maybe we don’t need to fix it after all. ([View Highlight](https://read.readwise.io/read/01gqqv4x33hv6db37nkwd2ctrs))
- Now that we have the intent, we can discuss how success looks like. How well should we solve this problem? How do we measure it? In data science, this is usually a business metric such as conversion, savings from fraud reduction, net promoter score, etc. ([View Highlight](https://read.readwise.io/read/01gqqv5gr6134s6j3wjeb0st5x))
- Specifying the desired outcome, in quantifiable terms, prevents us from falling into the trap of chasing a moving target. ([View Highlight](https://read.readwise.io/read/01gqqv6b867t3pwd6vt38xjjk1))
- Solving a problem to 95% could take 3-4x the effort of solving to 90%; solving to 99% might take 10-100x more. ([View Highlight](https://read.readwise.io/read/01gqqv6pmnpzyvbvc1wvt9zdc5))
- we can design a deliverable that meets the intent and desired outcome. How should we solve this problem? The solution should be designed to meet the intent and desired outcome, keeping in mind the need to integrate with the existing system. ([View Highlight](https://read.readwise.io/read/01gqqv7370g0gq3s43402p6dn3))
- e-commerce platform has the intent of improving how customers discover and purchase products. To achieve this, should we improve search? Or recommendations? Or email campaigns? If it’s a recommender, how will we deploy it? ([View Highlight](https://read.readwise.io/read/01gqqv7f3mznfp9vyn1dht7a16))
- This doesn’t have to be especially detailed; for now, we don’t need the full architecture and specs. But it’s useful to have a rough sketch to get upfront buy-in from the business, product, and tech teams ([View Highlight](https://read.readwise.io/read/01gqqv8mysz7s0xdarcnh4ye69))
- How *not* to solve a problem is often more important than how to solve it. Unfortunately, this doesn’t get addressed enough. ([View Highlight](https://read.readwise.io/read/01gqqvb5gaekkk4q99gpwtvt2e))
- Providing teams with boundaries and constraints counterintuitively leads to greater creativity and freedom. Without constraints, we don’t know what we cannot do. ([View Highlight](https://read.readwise.io/read/01gqqvdmxvq01q7m9xfz6yzyta))
- “Constraints drive innovation and force focus. Instead of trying to remove them, use them to your advantage.” ([View Highlight](https://read.readwise.io/read/01gqqvfbjwzcf77wk1chc642ar))
- We write the intent, desired outcome, deliverable, and constraints in simple language on a single-paged document. This can be shared to stakeholders for their review, feedback, and buy-in. ([View Highlight](https://read.readwise.io/read/01gqqvfna7vqsse7bg262jjs8h))
- This requires a certain amount of discipline from stakeholders. After all, the work comes at no cost to them. There’s nothing stopping them from changing their minds halfway through the project. ([View Highlight](https://read.readwise.io/read/01gqqvg2g9rhn16e9n4vnqdyey))
- Most projects start with a solution, then come up with estimates for each component and the overall design. ([View Highlight](https://read.readwise.io/read/01gqqvk6xgj43mky36dtx6z4rd))
- I tend to do the opposite. Given a budget (read: time-box), how can we design a solution that fits? The intent and desired outcome determine the time-box, and the time-box determines the solution design. This is how Basecamp does it too—they have different [appetite](https://basecamp.com/shapeup/1.5-chapter-06#ingredient-2-appetite) for various problems, and scope the solutions accordingly. ([View Highlight](https://read.readwise.io/read/01gqqvkhd2w3teftgc6y5hhsf6))
- The time-box will vary across the project stages. At the start, when we’re still exploring and uncertainty is high, we’ll want tighter time-boxes to limit wild goose chases. ([View Highlight](https://read.readwise.io/read/01gqqvmh5wgk8zff8p1zy3c46a))
- **feasibility assessment**. With our existing data and technology, are we able to solve the problem? If so, to what extent? In this stage, we aim for a quick and dirty investigation. I usually time-box this at 1-2 weeks. ([View Highlight](https://read.readwise.io/read/01gqqvmypq0e71g7khczbc0tb3))
- After determining feasibility, we proceed with a **proof of concept** (POC). In this stage, we *hack* together a prototype to assess if our solution is technically achievable. Ideally, we also test the integration points with upstream data providers and downstream consumers. Can we meet the technical constraints (e.g., latency, throughput)? Is model performance satisfactory? This usually takes a month or two. ([View Highlight](https://read.readwise.io/read/01gqqvq07vrkf3f5gbdgy0bcs0))
- We’ll want to time-box this too. An overly generous timeline can lead to non-essential features being squeezed in and never-ending development—without actually deploying it, no one benefits from it. This usually takes 3-6 months, including infra, job orchestration, testing, monitoring, documentation, etc. ([View Highlight](https://read.readwise.io/read/01gqqvqfe9tqzqgsaphad7mssf))
- Having the one-pager and time-box improves a project’s chances of success. Usually, it’s sufficient. Nonetheless, it can be helpful to **break it down**, especially if it involves unfamiliar data or technology. ([View Highlight](https://read.readwise.io/read/01gqqw13n8btrm10ddeegqt3fk))
- the breakdown indicates which components are harder to implement or more at risk—these usually involve things we’ve not done before. We want to front-load the *risk* and start with these *scary* bits first ([View Highlight](https://read.readwise.io/read/01gqqw1pce7bm7metr0z6eh1m4))
- When breaking it down, I often consult seniors with more expertise and experience. They usually have better intuition on potential gotchas and blockers that deserve more attention. ([View Highlight](https://read.readwise.io/read/01gqqw1yppnv89h54gxa2b93j8))
---
author: [[eugeneyan.com]]
title: "What I Do Before a Data Science Project to Ensure Success"
tags: 
- articles
- literature-note
---
# What I Do Before a Data Science Project to Ensure Success

![rw-book-cover](https://eugeneyan.com/assets/og_image/ideal-data-science-workflow.jpg)

## Metadata
- Author: [[eugeneyan.com]]
- Full Title: What I Do Before a Data Science Project to Ensure Success
- Category: #articles
- URL: https://eugeneyan.com/writing/what-i-do-before-a-data-science-project-to-ensure-success/#first-draw-the-map-to-the-destination-one-pager

## Highlights
- First, Draw The Map To The Destination (One-Pager)
  The map covers the intent, desired outcome, deliverable, and constraints. ([View Highlight](https://read.readwise.io/read/01gqqv431az1h7ewqhayqwy2ne))
- Intent (Why?)
  What’s the problem we’re trying to solve, or the opportunity we want to gain from? How will customers benefit? *Why* are we doing this, and *why* is it important? ([View Highlight](https://read.readwise.io/read/01gqqv4a4pvrf9vxa699rqhprg))
- Management is doing things right; leadership is doing the right things.” - Peter Drucker ([View Highlight](https://read.readwise.io/read/01gqqv4hdmekgf30nmbb39a6m6))
- But, by taking the time to think through the problem and intent, we might realise that, hey, maybe we don’t need to fix it after all. ([View Highlight](https://read.readwise.io/read/01gqqv4x33hv6db37nkwd2ctrs))
- Now that we have the intent, we can discuss how success looks like. How well should we solve this problem? How do we measure it? In data science, this is usually a business metric such as conversion, savings from fraud reduction, net promoter score, etc. ([View Highlight](https://read.readwise.io/read/01gqqv5gr6134s6j3wjeb0st5x))
- Specifying the desired outcome, in quantifiable terms, prevents us from falling into the trap of chasing a moving target. ([View Highlight](https://read.readwise.io/read/01gqqv6b867t3pwd6vt38xjjk1))
- Solving a problem to 95% could take 3-4x the effort of solving to 90%; solving to 99% might take 10-100x more. ([View Highlight](https://read.readwise.io/read/01gqqv6pmnpzyvbvc1wvt9zdc5))
- we can design a deliverable that meets the intent and desired outcome. How should we solve this problem? The solution should be designed to meet the intent and desired outcome, keeping in mind the need to integrate with the existing system. ([View Highlight](https://read.readwise.io/read/01gqqv7370g0gq3s43402p6dn3))
- e-commerce platform has the intent of improving how customers discover and purchase products. To achieve this, should we improve search? Or recommendations? Or email campaigns? If it’s a recommender, how will we deploy it? ([View Highlight](https://read.readwise.io/read/01gqqv7f3mznfp9vyn1dht7a16))
- This doesn’t have to be especially detailed; for now, we don’t need the full architecture and specs. But it’s useful to have a rough sketch to get upfront buy-in from the business, product, and tech teams ([View Highlight](https://read.readwise.io/read/01gqqv8mysz7s0xdarcnh4ye69))
- How *not* to solve a problem is often more important than how to solve it. Unfortunately, this doesn’t get addressed enough. ([View Highlight](https://read.readwise.io/read/01gqqvb5gaekkk4q99gpwtvt2e))
- Providing teams with boundaries and constraints counterintuitively leads to greater creativity and freedom. Without constraints, we don’t know what we cannot do. ([View Highlight](https://read.readwise.io/read/01gqqvdmxvq01q7m9xfz6yzyta))
- “Constraints drive innovation and force focus. Instead of trying to remove them, use them to your advantage.” ([View Highlight](https://read.readwise.io/read/01gqqvfbjwzcf77wk1chc642ar))
- We write the intent, desired outcome, deliverable, and constraints in simple language on a single-paged document. This can be shared to stakeholders for their review, feedback, and buy-in. ([View Highlight](https://read.readwise.io/read/01gqqvfna7vqsse7bg262jjs8h))
- This requires a certain amount of discipline from stakeholders. After all, the work comes at no cost to them. There’s nothing stopping them from changing their minds halfway through the project. ([View Highlight](https://read.readwise.io/read/01gqqvg2g9rhn16e9n4vnqdyey))
- Most projects start with a solution, then come up with estimates for each component and the overall design. ([View Highlight](https://read.readwise.io/read/01gqqvk6xgj43mky36dtx6z4rd))
- I tend to do the opposite. Given a budget (read: time-box), how can we design a solution that fits? The intent and desired outcome determine the time-box, and the time-box determines the solution design. This is how Basecamp does it too—they have different [appetite](https://basecamp.com/shapeup/1.5-chapter-06#ingredient-2-appetite) for various problems, and scope the solutions accordingly. ([View Highlight](https://read.readwise.io/read/01gqqvkhd2w3teftgc6y5hhsf6))
- The time-box will vary across the project stages. At the start, when we’re still exploring and uncertainty is high, we’ll want tighter time-boxes to limit wild goose chases. ([View Highlight](https://read.readwise.io/read/01gqqvmh5wgk8zff8p1zy3c46a))
- **feasibility assessment**. With our existing data and technology, are we able to solve the problem? If so, to what extent? In this stage, we aim for a quick and dirty investigation. I usually time-box this at 1-2 weeks. ([View Highlight](https://read.readwise.io/read/01gqqvmypq0e71g7khczbc0tb3))
- After determining feasibility, we proceed with a **proof of concept** (POC). In this stage, we *hack* together a prototype to assess if our solution is technically achievable. Ideally, we also test the integration points with upstream data providers and downstream consumers. Can we meet the technical constraints (e.g., latency, throughput)? Is model performance satisfactory? This usually takes a month or two. ([View Highlight](https://read.readwise.io/read/01gqqvq07vrkf3f5gbdgy0bcs0))
- We’ll want to time-box this too. An overly generous timeline can lead to non-essential features being squeezed in and never-ending development—without actually deploying it, no one benefits from it. This usually takes 3-6 months, including infra, job orchestration, testing, monitoring, documentation, etc. ([View Highlight](https://read.readwise.io/read/01gqqvqfe9tqzqgsaphad7mssf))
- Having the one-pager and time-box improves a project’s chances of success. Usually, it’s sufficient. Nonetheless, it can be helpful to **break it down**, especially if it involves unfamiliar data or technology. ([View Highlight](https://read.readwise.io/read/01gqqw13n8btrm10ddeegqt3fk))
- the breakdown indicates which components are harder to implement or more at risk—these usually involve things we’ve not done before. We want to front-load the *risk* and start with these *scary* bits first ([View Highlight](https://read.readwise.io/read/01gqqw1pce7bm7metr0z6eh1m4))
- When breaking it down, I often consult seniors with more expertise and experience. They usually have better intuition on potential gotchas and blockers that deserve more attention. ([View Highlight](https://read.readwise.io/read/01gqqw1yppnv89h54gxa2b93j8))
---
author: [[eugeneyan.com]]
title: "What I Do Before a Data Science Project to Ensure Success"
tags: 
- articles
- literature-note
---
# What I Do Before a Data Science Project to Ensure Success

![rw-book-cover](https://eugeneyan.com/assets/og_image/ideal-data-science-workflow.jpg)

## Metadata
- Author: [[eugeneyan.com]]
- Full Title: What I Do Before a Data Science Project to Ensure Success
- Category: #articles
- URL: https://eugeneyan.com/writing/what-i-do-before-a-data-science-project-to-ensure-success/#first-draw-the-map-to-the-destination-one-pager

## Highlights
- First, Draw The Map To The Destination (One-Pager)
  The map covers the intent, desired outcome, deliverable, and constraints. ([View Highlight](https://read.readwise.io/read/01gqqv431az1h7ewqhayqwy2ne))
- Intent (Why?)
  What’s the problem we’re trying to solve, or the opportunity we want to gain from? How will customers benefit? *Why* are we doing this, and *why* is it important? ([View Highlight](https://read.readwise.io/read/01gqqv4a4pvrf9vxa699rqhprg))
- Management is doing things right; leadership is doing the right things.” - Peter Drucker ([View Highlight](https://read.readwise.io/read/01gqqv4hdmekgf30nmbb39a6m6))
- But, by taking the time to think through the problem and intent, we might realise that, hey, maybe we don’t need to fix it after all. ([View Highlight](https://read.readwise.io/read/01gqqv4x33hv6db37nkwd2ctrs))
- Now that we have the intent, we can discuss how success looks like. How well should we solve this problem? How do we measure it? In data science, this is usually a business metric such as conversion, savings from fraud reduction, net promoter score, etc. ([View Highlight](https://read.readwise.io/read/01gqqv5gr6134s6j3wjeb0st5x))
- Specifying the desired outcome, in quantifiable terms, prevents us from falling into the trap of chasing a moving target. ([View Highlight](https://read.readwise.io/read/01gqqv6b867t3pwd6vt38xjjk1))
- Solving a problem to 95% could take 3-4x the effort of solving to 90%; solving to 99% might take 10-100x more. ([View Highlight](https://read.readwise.io/read/01gqqv6pmnpzyvbvc1wvt9zdc5))
- we can design a deliverable that meets the intent and desired outcome. How should we solve this problem? The solution should be designed to meet the intent and desired outcome, keeping in mind the need to integrate with the existing system. ([View Highlight](https://read.readwise.io/read/01gqqv7370g0gq3s43402p6dn3))
- e-commerce platform has the intent of improving how customers discover and purchase products. To achieve this, should we improve search? Or recommendations? Or email campaigns? If it’s a recommender, how will we deploy it? ([View Highlight](https://read.readwise.io/read/01gqqv7f3mznfp9vyn1dht7a16))
- This doesn’t have to be especially detailed; for now, we don’t need the full architecture and specs. But it’s useful to have a rough sketch to get upfront buy-in from the business, product, and tech teams ([View Highlight](https://read.readwise.io/read/01gqqv8mysz7s0xdarcnh4ye69))
- How *not* to solve a problem is often more important than how to solve it. Unfortunately, this doesn’t get addressed enough. ([View Highlight](https://read.readwise.io/read/01gqqvb5gaekkk4q99gpwtvt2e))
- Providing teams with boundaries and constraints counterintuitively leads to greater creativity and freedom. Without constraints, we don’t know what we cannot do. ([View Highlight](https://read.readwise.io/read/01gqqvdmxvq01q7m9xfz6yzyta))
- “Constraints drive innovation and force focus. Instead of trying to remove them, use them to your advantage.” ([View Highlight](https://read.readwise.io/read/01gqqvfbjwzcf77wk1chc642ar))
- We write the intent, desired outcome, deliverable, and constraints in simple language on a single-paged document. This can be shared to stakeholders for their review, feedback, and buy-in. ([View Highlight](https://read.readwise.io/read/01gqqvfna7vqsse7bg262jjs8h))
- This requires a certain amount of discipline from stakeholders. After all, the work comes at no cost to them. There’s nothing stopping them from changing their minds halfway through the project. ([View Highlight](https://read.readwise.io/read/01gqqvg2g9rhn16e9n4vnqdyey))
- Most projects start with a solution, then come up with estimates for each component and the overall design. ([View Highlight](https://read.readwise.io/read/01gqqvk6xgj43mky36dtx6z4rd))
- I tend to do the opposite. Given a budget (read: time-box), how can we design a solution that fits? The intent and desired outcome determine the time-box, and the time-box determines the solution design. This is how Basecamp does it too—they have different [appetite](https://basecamp.com/shapeup/1.5-chapter-06#ingredient-2-appetite) for various problems, and scope the solutions accordingly. ([View Highlight](https://read.readwise.io/read/01gqqvkhd2w3teftgc6y5hhsf6))
- The time-box will vary across the project stages. At the start, when we’re still exploring and uncertainty is high, we’ll want tighter time-boxes to limit wild goose chases. ([View Highlight](https://read.readwise.io/read/01gqqvmh5wgk8zff8p1zy3c46a))
- **feasibility assessment**. With our existing data and technology, are we able to solve the problem? If so, to what extent? In this stage, we aim for a quick and dirty investigation. I usually time-box this at 1-2 weeks. ([View Highlight](https://read.readwise.io/read/01gqqvmypq0e71g7khczbc0tb3))
- After determining feasibility, we proceed with a **proof of concept** (POC). In this stage, we *hack* together a prototype to assess if our solution is technically achievable. Ideally, we also test the integration points with upstream data providers and downstream consumers. Can we meet the technical constraints (e.g., latency, throughput)? Is model performance satisfactory? This usually takes a month or two. ([View Highlight](https://read.readwise.io/read/01gqqvq07vrkf3f5gbdgy0bcs0))
- We’ll want to time-box this too. An overly generous timeline can lead to non-essential features being squeezed in and never-ending development—without actually deploying it, no one benefits from it. This usually takes 3-6 months, including infra, job orchestration, testing, monitoring, documentation, etc. ([View Highlight](https://read.readwise.io/read/01gqqvqfe9tqzqgsaphad7mssf))
- Having the one-pager and time-box improves a project’s chances of success. Usually, it’s sufficient. Nonetheless, it can be helpful to **break it down**, especially if it involves unfamiliar data or technology. ([View Highlight](https://read.readwise.io/read/01gqqw13n8btrm10ddeegqt3fk))
- the breakdown indicates which components are harder to implement or more at risk—these usually involve things we’ve not done before. We want to front-load the *risk* and start with these *scary* bits first ([View Highlight](https://read.readwise.io/read/01gqqw1pce7bm7metr0z6eh1m4))
- When breaking it down, I often consult seniors with more expertise and experience. They usually have better intuition on potential gotchas and blockers that deserve more attention. ([View Highlight](https://read.readwise.io/read/01gqqw1yppnv89h54gxa2b93j8))
---
author: [[eugeneyan.com]]
title: "What I Do Before a Data Science Project to Ensure Success"
tags: 
- articles
- literature-note
---
# What I Do Before a Data Science Project to Ensure Success

![rw-book-cover](https://eugeneyan.com/assets/og_image/ideal-data-science-workflow.jpg)

## Metadata
- Author: [[eugeneyan.com]]
- Full Title: What I Do Before a Data Science Project to Ensure Success
- Category: #articles
- URL: https://eugeneyan.com/writing/what-i-do-before-a-data-science-project-to-ensure-success/#first-draw-the-map-to-the-destination-one-pager

## Highlights
- First, Draw The Map To The Destination (One-Pager)
  The map covers the intent, desired outcome, deliverable, and constraints. ([View Highlight](https://read.readwise.io/read/01gqqv431az1h7ewqhayqwy2ne))
- Intent (Why?)
  What’s the problem we’re trying to solve, or the opportunity we want to gain from? How will customers benefit? *Why* are we doing this, and *why* is it important? ([View Highlight](https://read.readwise.io/read/01gqqv4a4pvrf9vxa699rqhprg))
- Management is doing things right; leadership is doing the right things.” - Peter Drucker ([View Highlight](https://read.readwise.io/read/01gqqv4hdmekgf30nmbb39a6m6))
- But, by taking the time to think through the problem and intent, we might realise that, hey, maybe we don’t need to fix it after all. ([View Highlight](https://read.readwise.io/read/01gqqv4x33hv6db37nkwd2ctrs))
- Now that we have the intent, we can discuss how success looks like. How well should we solve this problem? How do we measure it? In data science, this is usually a business metric such as conversion, savings from fraud reduction, net promoter score, etc. ([View Highlight](https://read.readwise.io/read/01gqqv5gr6134s6j3wjeb0st5x))
- Specifying the desired outcome, in quantifiable terms, prevents us from falling into the trap of chasing a moving target. ([View Highlight](https://read.readwise.io/read/01gqqv6b867t3pwd6vt38xjjk1))
- Solving a problem to 95% could take 3-4x the effort of solving to 90%; solving to 99% might take 10-100x more. ([View Highlight](https://read.readwise.io/read/01gqqv6pmnpzyvbvc1wvt9zdc5))
- we can design a deliverable that meets the intent and desired outcome. How should we solve this problem? The solution should be designed to meet the intent and desired outcome, keeping in mind the need to integrate with the existing system. ([View Highlight](https://read.readwise.io/read/01gqqv7370g0gq3s43402p6dn3))
- e-commerce platform has the intent of improving how customers discover and purchase products. To achieve this, should we improve search? Or recommendations? Or email campaigns? If it’s a recommender, how will we deploy it? ([View Highlight](https://read.readwise.io/read/01gqqv7f3mznfp9vyn1dht7a16))
- This doesn’t have to be especially detailed; for now, we don’t need the full architecture and specs. But it’s useful to have a rough sketch to get upfront buy-in from the business, product, and tech teams ([View Highlight](https://read.readwise.io/read/01gqqv8mysz7s0xdarcnh4ye69))
- How *not* to solve a problem is often more important than how to solve it. Unfortunately, this doesn’t get addressed enough. ([View Highlight](https://read.readwise.io/read/01gqqvb5gaekkk4q99gpwtvt2e))
- Providing teams with boundaries and constraints counterintuitively leads to greater creativity and freedom. Without constraints, we don’t know what we cannot do. ([View Highlight](https://read.readwise.io/read/01gqqvdmxvq01q7m9xfz6yzyta))
- “Constraints drive innovation and force focus. Instead of trying to remove them, use them to your advantage.” ([View Highlight](https://read.readwise.io/read/01gqqvfbjwzcf77wk1chc642ar))
- We write the intent, desired outcome, deliverable, and constraints in simple language on a single-paged document. This can be shared to stakeholders for their review, feedback, and buy-in. ([View Highlight](https://read.readwise.io/read/01gqqvfna7vqsse7bg262jjs8h))
- This requires a certain amount of discipline from stakeholders. After all, the work comes at no cost to them. There’s nothing stopping them from changing their minds halfway through the project. ([View Highlight](https://read.readwise.io/read/01gqqvg2g9rhn16e9n4vnqdyey))
- Most projects start with a solution, then come up with estimates for each component and the overall design. ([View Highlight](https://read.readwise.io/read/01gqqvk6xgj43mky36dtx6z4rd))
- I tend to do the opposite. Given a budget (read: time-box), how can we design a solution that fits? The intent and desired outcome determine the time-box, and the time-box determines the solution design. This is how Basecamp does it too—they have different [appetite](https://basecamp.com/shapeup/1.5-chapter-06#ingredient-2-appetite) for various problems, and scope the solutions accordingly. ([View Highlight](https://read.readwise.io/read/01gqqvkhd2w3teftgc6y5hhsf6))
- The time-box will vary across the project stages. At the start, when we’re still exploring and uncertainty is high, we’ll want tighter time-boxes to limit wild goose chases. ([View Highlight](https://read.readwise.io/read/01gqqvmh5wgk8zff8p1zy3c46a))
- **feasibility assessment**. With our existing data and technology, are we able to solve the problem? If so, to what extent? In this stage, we aim for a quick and dirty investigation. I usually time-box this at 1-2 weeks. ([View Highlight](https://read.readwise.io/read/01gqqvmypq0e71g7khczbc0tb3))
- After determining feasibility, we proceed with a **proof of concept** (POC). In this stage, we *hack* together a prototype to assess if our solution is technically achievable. Ideally, we also test the integration points with upstream data providers and downstream consumers. Can we meet the technical constraints (e.g., latency, throughput)? Is model performance satisfactory? This usually takes a month or two. ([View Highlight](https://read.readwise.io/read/01gqqvq07vrkf3f5gbdgy0bcs0))
- We’ll want to time-box this too. An overly generous timeline can lead to non-essential features being squeezed in and never-ending development—without actually deploying it, no one benefits from it. This usually takes 3-6 months, including infra, job orchestration, testing, monitoring, documentation, etc. ([View Highlight](https://read.readwise.io/read/01gqqvqfe9tqzqgsaphad7mssf))
- Having the one-pager and time-box improves a project’s chances of success. Usually, it’s sufficient. Nonetheless, it can be helpful to **break it down**, especially if it involves unfamiliar data or technology. ([View Highlight](https://read.readwise.io/read/01gqqw13n8btrm10ddeegqt3fk))
- the breakdown indicates which components are harder to implement or more at risk—these usually involve things we’ve not done before. We want to front-load the *risk* and start with these *scary* bits first ([View Highlight](https://read.readwise.io/read/01gqqw1pce7bm7metr0z6eh1m4))
- When breaking it down, I often consult seniors with more expertise and experience. They usually have better intuition on potential gotchas and blockers that deserve more attention. ([View Highlight](https://read.readwise.io/read/01gqqw1yppnv89h54gxa2b93j8))
