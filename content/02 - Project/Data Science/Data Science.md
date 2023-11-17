---
creation_date: 2023年06月11日
banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
banner_icon: 🌞
tags: "#笔记"
banner_y: 0.4705
---

# Data Science
This is my data science journey. Here we index Machine Learning, Neural Networks, Statistics, Database, and other notes/resources.

## 01 Introduction to Data Science
***What is Data Science?*** 
1. [Intro to Data Science - Crash Course for Beginners](https://www.youtube.com/watch?v=N6BghzuFLIg) 
2. [Learn Data Science Tutorial -- Full Course for Beginners](https://www.youtube.com/watch?v=ua-CiDNNj30&list=PLWKjhJtqVAblQe2CCWqV4Zy3LY01Z8aF1)

***What are some good Platforms to practice Data Science?***
1. Platforms: (1) Kaggle
2. Datasets: (1) Human Development Reports https://hdr.undp.org 

***What are some core Data Science Technologies?***
- [[PyTorch]]
- [[R Programming]]

## 02 Math
***What is the importance of math in data analytics, data science, and deep learning?***
[[Statistics]]
Resources
- 📖 Introduction to Mathematical Statistics
	- Topics skipped: Transformations, Moment Generating Functions, Multivariate Normal Distribution, t- and F-Distributions, Mixture Distributions,
- 📖 The Elements of Statistical Learning
- 📖 Machine Learning: A Probabilistic Perspective
## 03 Database
***What is the importance of database and data in data science?***
[[Database]]
## 04 Online Courses and Books 
1. 📹 [[IBM Data Science Professional Certificate]]  by [Coursera](https://www.coursera.org/professional-certificates/ibm-data-science)  🟢
2. 📹 [[IBM Data Analytics Professional Certificate]] by [Coursera](https://www.coursera.org/professional-certificates/ibm-data-analyst) 🟢
3. 📹 Meta Backend Development by Coursera 🟢
4. 📹 Introduction to TensorFlow for Artificial Intelligence, Machine Learning and Deep Learning by [Coursera](https://www.coursera.org/learn/introduction-tensorflow) 🟢
5. 📹 IBM AI Engineering Professional Certificate by [Courser](https://www.coursera.org/professional-certificates/ai-engineer) 🔴
6. 📹 IBM Applied AI Professional Certificate by [Coursera](https://www.coursera.org/professional-certificates/applied-artifical-intelligence-ibm-watson-ai)  🔴
7. 📹 IBM Data Engineering by Coursera  🔴
8. 📹 Deep Learning Specialization  🟢
9. 📹 [Generative AI with Large Language Models](https://www.coursera.org/learn/generative-ai-with-llms) 🔴
10. 📹 Stanford CS229: Machine Learning Course,  Andrew Ng (Autumn 2018)  on [Youtube](https://www.youtube.com/watch?v=jGwO_UgTS7I&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU) 🔴
11. 📹 Machine Learning Specialization, DeeplearningAI with Andrew NG on [Youtube](https://www.youtube.com/watch?v=vStJoetOxJg&list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI) 🔴
12. 📖 Machine Learning with Pytorch and Scikit 🟡
13. 📖 Introduction to Mathematical Statistics 🟡
14. 🌐 [Deep Learning](https://engineering.purdue.edu/DeepLearn/pdf-kak/) by Purdue Spring 2024

🟢 Completed
🟡 Working On
🔴 Not Yet Started

📹 Lectures
📖 Books
🌐 Online PDFs, Articles

## 05 Important Concepts and Questions
- [[Data Science Reports]]
- Data Science Pipeline
	- Preprocessing
	- [[Descriptive Statistics]]
	- [[Explanatory Statistics]]: Mean Squared Error, Coefficient of Determinism, Pearson Coefficient, F1 Score, Precision, Accuracy, Sensitivity, Specificity
- Data Visualization
	- Core Concepts - 
	- **Plots** - Residual Plots, Distribution Plots,  Line Plots, Waffle Charts, Area Plots, Histogram, Scatter Plots Box Plot, Bar Charts, Pie Charts, Heatmaps, Area Plots, Geospatial Maps (Forium) w/ GeoJson File, Count Plot, Bubble Plot, **PairPlot**, Scatter Plot fit Lines with Confidence Intervals
	- **Tools**: Python, R, Tabeau, Power BI, Microsoft Excel
- [[Machine Learning]]
	- **Tasks:** [[Linear Regression]], [[Classification]], [[Clustering]], Association, Anomaly Detection, Sequence Mining, Dimension Reduction, Recommendation Systems
	- **Algorithms**: [[Linear Regression]], [[Logistic Regression]], [[Support Vector Machines]], [[K-Means]], K-Modes K-Nearest Neighbor, Random Forest, XGBoost, Naive Bayes
	- **Types of Learning:** Supervised, Unsupervised, Self-Supervised, Transfer Learning, Reinforcement Learning
	- **Fields/Applications**: 
		- Computer Vision: (1) Image classification (2) Object Detection (3) Semantic Segmentation (4) Image Segmentation 
		- Natural Language Processing: (1) Machine Translation (2) Semantic Analysis (3)
		- Automated Speech Recognition: (1) Trigger Word Detection
		- Time Series
		- Recommendation Systems
	- **Core Concepts**: Bias/Variance, Normalization, Train/Dev/Test Sets
		- Exhaustive Grid Search - model tuning for variables like c in [[Support Vector Machines]], [[K-Nearest Neighbor]], and Number of layers in Neural Networks
	- #TODO:  Analyze U-Net,
- [[Neural Networks]]
	- **Architectures**: [[Convolutional Neural Network]], [[Recurrent Neural Network]] (GRU, Simple RNN, Sequence to Vector RNN, Sequence to Sequence RNN, LSTMs), [[Transformers]], [[Generative Adversarial Networks]], 
	- **Core Concepts**: Input/Output Shape, Loss Functions, Optimizers, Activation Functions, Mini-batch Gradient Descent, Convergence, Callbacks/Early Stopping, [[Data Augmentation]], Dropout, Vanishing/Exploding Gradients,
- Excel, Pivot tables, VLookup, HLookup, 

### What is the difference between Algorithms, Machine Learning, Artificial Intelligence, Neural Networks, and Deep Learning?

### Data Engineer vs Data Analyst vs Data Scientist vs Business Intelligence
The roles of Data Analyst and Data Scientists are extremely similar.

Let's see how IBM differentiates the two through their IBM Data Science Professional Certificate Course and IBM Data Analytics Professional Course. 

Data Analysts can develop into Data Engineers, Data Scientists, Business Analysts, or Busines Intelligence Analysts

I believe Data Engineer and Business Analyst . 

Summary
- Data Engineering convert raw data into usable data
- Data Analytics use this data to generate insights
- Data Scientists use Data Analytics and Data Engineering to predict the future using data from the past
- Business Analysts and Business Intelligence Analyst to use these insights and predictions to drive decisions that benefit and grow their business

Data Analysts Responsibilities
- Gather, clean, analyze, and mine data
- Interpret results
- Report findings

![[Pasted image 20230830111450.png]]
***What is the difference between descriptive and explanatory statistics?***


***What is out-of-sample vs in-sample?***
For example, in-sample training accuracy is the percentage of correct predictions that the model makes when using the test dataset for training. But a high-training accuracy isn't necessarily a good thing, easily causing over-fit.

Out-of-sample accuracy!


***Predictive vs Descriptive Models?***  
*Predictive models* find causality, relationships between explanatory variables and dependent variables. 
- A predictive model tries to yield yes/no or stop/go outcomes
*Descriptive models* find clusters of data elements with similar characteristics
-  Might examine, if a person did this, then they're like to prefer that

### Full Stack Architecture of AI
[![AI系统全栈架构图](https://chenzomi12.github.io/_images/AIsystem01.png)

## 06 Interview Preparation
***What are the most important qualities of a Data Analyst?***
- curiosity
- detailed-oriented
- love technology
- love numbers and information
- presentation skills
- integrity and detailed oriented
- clear communication
- ability to understand complex analysis
- AB tests
- SQL
- Flexible - be able to pick up technical quickly
- Dynamic and Adaptable



***Different types of Data Analysis***
- Descriptive Analytics - "what happened", insights about past events
- Diagnostic Analytics - "why did it happen", insights from descriptive analytics to dig deeper to find cause of outcome
- Predictive Analytics - "what will happen" -> not what will, instead **what might**, meaning probabilistic
- Prescriptive Analytics - "what should be done about it"

***Steps of Data Analysis Process*
1. understanding the problem and desired result
2. setting a clear metric
3. gathering data
4. cleaning data
5. analyze and mining data
6. interpreting results
7. presenting the data

***What are data repositories?*
- Databases
- Data Warehouses
- Data Marts
- Data Lakes
- Big Data Stores

***Common sources of data*
- relational databse
- flat files and xml datasets
- apis and web services
- web scraping
- data streams and feeds


***Types of Databases*
- RDBMS - rigid definition using structured, ACID compliance, 
- NoSQL - ability to handle large volumes of structured, semi-structured and unstructured data
	- Key-Value Store
		- Pros: Great storing user session data, user pro
		- Cons: Not a great fit if you want to query data on specific data values. Need relationships between data values. Need multiple unique keys
	- Document-Based - store each record and its associated data within a single document
		- Cons: Not great to run complex queries. Perform multi-operation transactions.
	- Column-based - Data is stored in cells grouped as columns of data instead of rows
		- Cons: Not good for complex queries
	- Graph Based
		- Profs: Good for 
		- Cons: Not good for processing high volumes of transactions


***What is Data Wrangling*
1. Discovery
2. Transformation -> 
	1. Structuring (joins and unions)
	2. Normalizing 0 clean the data base of unused and redundant data
	3. Denormalizing - combine data from multiple tables into a single table so that it can be queried faster
	4. Cleaning: Inaccuracies, Missing Data, Incomplete Data, Biases in Data, Null Values, Outliers
		1. Inspection
		2. Clearning
		3. Verification
	5. Enriching: Adding data points that make the analysis more meaningful.
3. Validation
4. Publishing - delivering the output of the wrangled data for downstream 
5. Documentation


***Tools for Data Wrangling***
- Excel Power Query / Spreadsheets
- OpenRefine
- Google Data Prep
- Watson Studio Refinery
- Trifacta Wrangler
- Python and R

***Descriptive Statistics vs Inferential***
Descriptive Statistics - summarizing information about the sample
- Central Tendency - mean, median, mode
- Dispersion - variance, standard deviation, range
- Skewness - distribution of values is symmetrical around a central value or not
Inferential Statistics - making inferences or generalizations about the broader population from which a sample was drawn
- hypothesis testing
- confidence intervals
- logistic regression

***What is Data Mining***?
The process of extracting knowledge from data.
An interdisciplinary field that involves the use of **pattern recognition** technologies, **statistical analysis**, and **mathematical** techniques
Aims to identify correlations in data, find patterns and variations, understand trends, and predict probabilities.

***IBM SPSS Statistics***
Stands for Statistical Process for Social Sciences
- popularly used for advanced analytics, text analytics, trend analysis, validation of assumptions, and translation of business problems into data science solutions

***Data visualization tools***
- 

