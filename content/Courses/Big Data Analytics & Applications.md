---
creation_date: 2024年02月27日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Big Data Analytics & Applications

英文授课
教授：Bin Li, School of Computer Science, libin@fudan.edu.cn



## Lecture 1: Big Data Analytics and Applications
Goal:
- Introduce real-world data analytics applications
- Introduce typical machine learning solutions

Syllabus of the Course
1. Part 1: Introduction to Machine Learning
2. Part 2: Text Data Analytics
3. Part 3: Network Data Analytics
4. Part 4: Image Data Analytics 

Assessment Methods
- Interactions and presentations (30%) (10 weeks of lecture, 6 weeks of presentation)
- Course project with final report (70%)
	- Select one data analytics problem introduced in the course (collect real-world new dataset by yourself - extra point)
	- Use toolbox (e.g., scikit, TensoFlow) to solve the problem (Develop a new method by yourself - extra point)
	- Write project report in english.
Reference Books
- Mining of Massive Data Sets
- Pattern Recognition and Machine Learning
- Deep Learning


Data Mining not popular use anymore, Data Science and Big Data Analytics (BDA)

Three elements for big data analytics
- Source: Big Data
- Demand: Applications & Services
- Tools: Machine Learning

BDA Examples
- 局部敏感 Locality-sensitive hasing (LSH) reduces the dimensionality of high-dimensional data such tat similar items to the same buckets with high probability
	- Similarity search
	- Duplicate detection
	- Dimension reduction
	- Preprocessing for machine learning tasks
- Topic Modeling: Discover latent topics from massive documents: Each news article has a distribution over K latent topics while each of the K latent topics has a distribution over the words
	- Document automatic categorization
	- Any bag-of-words object grouping tasks
- Collaborative FIltering: makes predictions (filtering) about the interest of a user by collecting preferences or taste information from many users (collaborating)
	- Recommender systems
	- User behavior prediction
	- Marketing
- Social Network Analysis (SNA) is the process of investigating social structures where nodes denote users and links denote relatinships.
	- Community detection
	- Link Predictions
	- Social Capital Detection
- Object Detection: Detect certain objects from massive images or video streams using bounding boxes
	- Security surveillance
	- Inteligent transport
	- Image annotation and retrieval
	- Internet censorship
- 文本识别 Optical Character Recognition (OCR) is a technology that extracts and recognizes texts from images
	- Document scanning
	- Text recognition in the wild
	- Commercial Analysis
	- Internet Censorship
 - PCA, Principle Component Analysis

## Lecture 2
**ML Problems in BDA**
- Supervised Learning Algorithms - Classification, Regression
- Unsupervised Learning Algorithms - Clustering, Dimensionality Reduction
- Semi-Supervised
- Self-Supervised
**Classification**
**Regression**
- Regression Loss

**Generalization**
**Regularization**
**Structural Risk Minimization**

 