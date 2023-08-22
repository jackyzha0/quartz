---
author: [[Nathan Lambert]]
title: "Red-Teaming Large Language Models"
tags: 
- articles
- literature-note
---
# Red-Teaming Large Language Models

![rw-book-cover](https://huggingface.co/blog/assets/red-teaming/thumbnail.png)

## Metadata
- Author: [[Nathan Lambert]]
- Full Title: Red-Teaming Large Language Models
- Category: #articles
- URL: https://huggingface.co/blog/red-teaming

## Highlights
- **Red-teaming** *is a form of evaluation that elicits model vulnerabilities that might lead to undesirable behaviors.* Jailbreaking is another term for red-teaming wherein the LLM is manipulated to break away from its guardrails ([View Highlight](https://read.readwise.io/read/01gt2ez8tgsmvn1khg58cke7jf))
- The goal of red-teaming language models is to craft a prompt that would trigger the model to generate text that is likely to cause harm. Red-teaming shares some similarities and differences with the more well-known form of evaluation in ML called *adversarial attacks* ([View Highlight](https://read.readwise.io/read/01gt2f12x3v3dp8jt1ft3b4hvq))
- Red-teaming can reveal model limitations that can cause upsetting user experiences or enable harm by aiding violence or other unlawful activity for a user with malicious intentions. The outputs from red-teaming (just like adversarial attacks) are generally used to train the model to be less likely to cause harm or steer it away from undesirable outputs. ([View Highlight](https://read.readwise.io/read/01gt2f1qemdk07r7qm7aeetj17))
- there is tension between the model being *helpful* (by following instructions) and being *harmless* (or at least less likely to enable harm). This is where red-teaming can be very useful. ([View Highlight](https://read.readwise.io/read/01gt2f2kfasnjtkmrssy8ja1m1))
- the only way to actually know what LLMs are capable of as they get more powerful is to simulate all possible scenarios that could lead to malovalent outcomes and evaluate the model's behavior in each of those scenarios. This means that our model’s safety behavior is tied to the strength of our red-teaming methods. ([View Highlight](https://read.readwise.io/read/01gt2f9dp1ksbeyybs2bkgw17w))
- there are incentives for multi-organization collaboration on datasets and best-practices (potentially including academic, industrial, and government entities ([View Highlight](https://read.readwise.io/read/01gt2f9p6f6h9qr6ac60dk47zt))
