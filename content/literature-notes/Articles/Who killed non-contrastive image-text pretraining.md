---
author: [[Lucas Beyer]]
title: "Who killed non-contrastive image-text pretraining?"
tags: 
- articles
- literature-note
---
# Who killed non-contrastive image-text pretraining?

![rw-book-cover](https://pbs.twimg.com/profile_images/378800000845687873/37bba4f807fe3a2c644a252f8191338d_normal.jpeg)

## Metadata
- Author: [[Lucas Beyer]]
- Full Title: Who killed non-contrastive image-text pretraining?
- Category: #articles
- URL: https://twitter.com/giffmana/status/1669840989853196292

## Highlights
- Looking at a wide mix of tasks, an image encoder pre-trained on image/alt-text pairs via captioning (Cap/CapPa) almost matches a contrastive one (CLIP) on classification tasks, and largely outperforms it on image-text tasks. ([View Highlight](https://read.readwise.io/read/01h41qm34wfsfg6yd5acjdkdpr))
- The method is almost as straightforward as it gets: Cap (middle) is an encoder-decoder model with ViT encoder and auto-regressive decoder.
  Because predicting the rest of the caption after the first few tokens may be too easy, leading to little signal from later tokens to image… ([View Highlight](https://read.readwise.io/read/01h41qmveb9jpxenxanmrk98e1))
- you're generally interested in pre-training models with noisy image-text data, I highly recommend you read it: ([View Highlight](https://read.readwise.io/read/01h41re3td2w11cfhg71pv2b88))
