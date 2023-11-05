---
creation_date: 2023年07月27日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Support Vector Machines
#TODO 
- 🖊 Multi-class SVMs
- 

**Intuition:** The goal of support vector machines is to maximize a margin, defined as the distance between the separating hyperplane or decision boundary and training examples that are closest to this hyperplanes. These training examples mentioned are known as **support vectors**
![[Pasted image 20230924223341.png | center | 400]]
Decision boundaries with large margins *tend* to have lower generalization error, and vice versa.

***What is Kernel SVM?*** In order to solve non-linear classifications, we use **kernel** methods to create nonlinear combinations of the original features to project them onto a higher-dimensional space via a mapping function. In the higher dimension, the data may become linearly separable.

| Problem | Solution  |
| ------- | ---------- |
|     ![[Pasted image 20230926143303.png]]    |     ![[Pasted image 20230926143346.png]]       |

How is this done? 


Common **kernel functions** include 
1. Linear
2. Polynomial
3. RBF
4. Sigmoid



***What are pros and cons of SVM?***



***Applications?*** Good for
- Image recognition
- Text category assignment
- Detecting spam
- Sentiment Analysis
- Gene Expression Classification
- Regression, Outlier Detection and Clustering.

***Pros and Cons?***
Advantages
- Accurate in high-dimensional spaces
- Memory efficient
Disadvantages
- Prone to overfitting
- No probability estimation
- Small datasets -> not efficient computationally for a lot of rows