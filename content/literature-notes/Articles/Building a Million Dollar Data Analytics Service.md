---
author: [[SeattleDataGuy]]
title: "Building a Million Dollar Data Analytics Service"
tags: 
- articles
- literature-note
---
# Building a Million Dollar Data Analytics Service

![rw-book-cover](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb39d82e6-6f36-4226-b452-4ec05b6daeed_2956x1094.png)

## Metadata
- Author: [[SeattleDataGuy]]
- Full Title: Building a Million Dollar Data Analytics Service
- Category: #articles
- URL: https://seattledataguy.substack.com/p/building-a-million-dollar-data-analytics

## Highlights
- The point being that this is very different when you work for a company that is a third-party analytics company.
  Because instead of a few data sources, you’re likely dealing with 50, 100, 1,000, etc. companies who all are sending data to you, and this is the first place where you can easily make mistakes. ([View Highlight](https://read.readwise.io/read/01h3t0nh9e2fjjvtaj5m837fh1))
- Anyone can scrape websites and rebuild your solution if they feel it is worthwhile. But very few companies can go through the effort of reaching out, making contacts and relationships, and developing trust with customers. Thus, a massive competitive advantage is created by directly accessing the actual first-party data sources. ([View Highlight](https://read.readwise.io/read/01h3t1gc2rmjrzdsx89ke6wj2g))
- **Accuracy** - Whenever I have worked on a project using some form of proxy data set, it's okay but never right. Now if you plan to take those insights and sell them back to that same client, you risk showing them data they flat-out know is wrong. And you don’t have the data to prove it, but they do. ([View Highlight](https://read.readwise.io/read/01h3t1gtn5sdy19yhe7sp9pg69))
- Once you have your data layer and ingestion set up, now you’ll need to create transforms to both standardize and create the product.
  If you’re lucky, you were able to get your client to commit to a standard schema that helped reduce the layers of processing required to map column names. But even if you map column names, you likely can’t map column values. What one company might call “Category A” another company might call “Group A,” and you need to map it all into one. ([View Highlight](https://read.readwise.io/read/01h3t275w98nmrhyqynrhvbbtd))
- In fact, I have seen many companies use standard metrics like churn, per patient per month, monthly revenue and forecasts, and other pretty standard metrics to build their product ([View Highlight](https://read.readwise.io/read/01h3t27q8pjt8tchv7vmj4f963))
- If you just show these metrics without driving your customers to take action ([View Highlight](https://read.readwise.io/read/01h3t284fsgq1xd29pamv1ntqk))
- The most common way is to provide a [dashboard](https://uxplanet.org/10-rules-for-better-dashboard-design-ef68189d734c) from which users can easily go and get their insights. Perhaps you provide some drill-down ability, but the goal is to create a very succinct dashboard that anyone can drill into quickly ([View Highlight](https://read.readwise.io/read/01h3t28vaqmpzfwwyn9ph8215x))
- Another common service is to provide insights back to your customers via an API. Perhaps you perform some [machine learning](https://seattledataguy.substack.com/p/data-engineering-vs-machine-learning), customer classification, fraud detection, etc. Whatever it might be, a great way to create a well-integrated system is via an API. That being said, I will add that it does look like having the ability to share data via [Snowflake](https://www.youtube.com/watch?v=njttWa08pwo&t=2s) or other data platforms is becoming more common ([View Highlight](https://read.readwise.io/read/01h3t2a0wafdr9ykpxgpx7hf60))
- A great product to create when you first start your third-party analytics service is just a simple set of CSVs or reports. Perhaps it's a list of fraudulent actors or super users. Yes, this isn’t the most advanced approach, but when building an MVP, why try to build out an entire API when you don’t even know if people want your product? Instead, find a group of businesses that you can build with ([View Highlight](https://read.readwise.io/read/01h3t2bac5jrm72gkhesvtfs9q))
