---
title: LLM Precision About
tags:
  - LLM
date: 2024-09-26
---
# Default Precision

In conventional scientific computing, we typically use 64-bit floats for a higher precision. While training deep neural networks on a GPU, we typically use a lower-than-maximum precision, namely, 32-bit floating point operation. PyTorch uses 32-bit floats by default.

Reasons for deep learning use 32-bit precision:

* 64-bit precision unnecessary and computationally expensive
* GPU not optimized for 64-bit precision

**32-bit floating point operations have become the standard for training deep neural networks on GPUs.**


# Reference

[1] Raschka, Sebastian. “Accelerating Large Language Models with Mixed-Precision Techniques.” _Sebastian Raschka, PhD_, 11 May 2023, https://sebastianraschka.com/blog/2023/llm-mixed-precision-copy.html.