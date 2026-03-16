---
title: " Machine Learning Primer"
date: 2024-10-25T05:00:00+00:00
slug: machine-learning-primer-study-notes
tags: ["machine-learning", "mathematics", "linear-algebra", "calculus", "neural-networks", "study-notes"]
description: "A 100-page primer connecting the math behind machine learning to practical intuition. Covers linear algebra, calculus, probability, gradient descent, neural networks, and modern architectures, with worked problems and code throughout."
---

I started writing these notes for myself during the first year of my PhD. I kept finding that papers assumed fluency in linear algebra, optimization, and probability at a level that my undergraduate courses hadn't quite provided. Not because those courses were bad, but because they taught the math in isolation. I knew how to compute eigenvalues. I didn't know why eigenvalues matter for Principal Component Analysis (PCA). I could differentiate a function of two variables. I couldn't explain why the Hessian tells you whether your model is stuck at a saddle point or a local minimum.

The primer grew out of that frustration. I wanted a single document where the math and the ML motivation appeared side by side, so that learning one reinforced the other.

## What it covers

The primer is organized into four parts across twelve chapters.

**Part I: Mathematical Foundations** covers the three pillars that nearly everything in ML rests on. Chapter 1 is linear algebra: vectors, matrices, norms, eigenvalues, Singular Value Decomposition (SVD), and positive definite matrices. Chapter 2 is multivariable calculus: gradients, the chain rule, Jacobians, Hessians, matrix calculus, and Taylor expansions. Chapter 3 is probability and statistics: distributions, Bayes' theorem, Maximum Likelihood Estimation (MLE), information theory, and the bias-variance decomposition.

**Part II: Core Machine Learning** takes those foundations and builds the classical algorithms on top of them. Chapter 4 derives linear regression from scratch, starting from the loss function and arriving at the normal equation. Chapter 5 covers gradient descent and its variants: batch, stochastic, momentum, Adam, and learning rate schedules. Chapter 6 does the same for logistic regression and classification, including the sigmoid function, cross-entropy loss, and softmax. Chapter 7 pulls together loss functions and regularization, covering $L^1$ and $L^2$ penalties, dropout, early stopping, and batch normalization.

**Part III: Neural Networks** moves into deeper models. Chapter 8 introduces neural networks from the perspective of what they add beyond linear models: activation functions, the universal approximation theorem, weight initialization, and the classic XOR problem. Chapter 9 covers backpropagation in detail, including computational graphs, a full worked backprop pass, the vanishing and exploding gradient problem, and automatic differentiation.

**Part IV: Advanced Architectures** covers the models that dominate modern ML. Chapter 10 is Convolutional Neural Networks (CNNs): the convolution operation, pooling, what CNNs actually learn, and landmark architectures. Chapter 11 covers sequence models and attention: Recurrent Neural Networks (RNNs), Long Short-Term Memory (LSTM), the attention mechanism, and the Transformer. Chapter 12 closes with dimensionality reduction: PCA (again, but now with the full ML context), t-SNE, and autoencoders.

## How it's structured

Each chapter follows the same pattern. It opens with a formal definition or derivation, then immediately shows a worked numerical example so you can verify the math with a calculator. Then comes the "ML Intuition" box, which explains why this particular concept matters in practice. For instance, after defining the Gram matrix $X^\top X$, the intuition box explains that the same matrix appears in the normal equation, the covariance matrix, PCA, and ridge regression. Understanding that one object unlocks half of classical ML.

Most chapters also include Python code. Not toy scripts, but short NumPy snippets that let you verify the math computationally. Here's one from the eigenvalue section:

```python
import numpy as np

A = np.array([[3, 1], [0, 2]])
eigenvalues, eigenvectors = np.linalg.eig(A)

# Verify: A @ v = lambda * v
for i in range(len(eigenvalues)):
    v = eigenvectors[:, i]
    lam = eigenvalues[i]
    print(f"A*v = {A @ v}, lambda*v = {lam * v}")
```

Each chapter ends with a set of practice questions: conceptual questions that test understanding, multiple-choice questions for quick self-assessment, computational problems that require working through the math by hand, and interview-style questions that ask you to explain concepts in plain language. All answers are included.


I wrote this primarily for people in a position similar to mine when I started: you know some ML, you've trained some models, but the math feels like a black box in places. Maybe you're starting a PhD and want to fill gaps. Maybe you're preparing for ML interviews and want to understand the derivations behind the algorithms. Maybe you're just curious about what's actually happening when you call `model.fit()`.

It's not a replacement for a full textbook on linear algebra or optimization. It's the 100 pages you'd want to read before opening one of those textbooks, so that when you get there, you know why each topic matters.

These notes are a living document. I keep updating them as I find better explanations or encounter new connections between topics. You can [download the PDF here](/assets/Machine_Learning_Primer.pdf).
