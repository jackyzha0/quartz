---
creation_date: 2023年07月26日
banner: "https://images.unsplash.com/photo-1550432163-9cb326104944"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.09673
---

# Machine Learning

## 01 Background
>[!quote] "*If you can build a simple rule-based system that doesn't require machine learning, do that*" - Number 1 rule of Google's Machine Learning Handbook

**Resources**
- [ML Cheatsheet](https://ml-cheatsheet.readthedocs.io/en/latest/index.html)

#TODO 
- 🖊 Improve on how "Strategies to Improve ML Models"
- ❓ What is gradient boosting?
- ❓ What is ensembling?
- ❓ What is cross validation?
- ❓ What is gradient boosting?

### Mind Map of ML Universe
![[Pasted image 20231012211315.png]]
### Indexing ML Notes
- Supervised Machine Learning
	- [[Linear Regression]]
	- [[Classification]]
- Unsupervised Machine Learning
	- [[Clustering]]
- Reinforcement Machine Learning
- [[Neural Networks]]
	- [[Convolutional Neural Network]]
	- [[Recurrent Neural Network]]
	- [[Graph Neural Networks]]
	- [[Transformers]]
	- [[Generative Adversarial Networks]]
## 02 ML Concepts
These are some important key concepts in machine learning. 

### The importance of Statistics in Machine Learning
It is important to study the math and [[Statistics]] behind many classic machine learning approaches. Heavily inspired by Machine Learning, A Probabilistic Approach
- [[Linear Models for Classification]]
### What is Generalization, Overfitting and Under-fitting?
If a model is able to make accurate predictions on unseen data, we say that it is able to **generalize**  from the training set to the test set. This is important if the training and test data are not similar. 

A model can be super complex and specific for the training set. For example, for the data set about customers who bought a boat.

| Age | Number of cars owned | Owns house | Number of Children | Marital Status | Owns a dog | Bought a boat |
| --- | -------------------- | ---------- | ------------------ | -------------- | ---------- | ------------- |
| 66  | 1                    | yes        | 2                  | widowed        | no         | yes           |
| 52  | 2                    | yes        | 3                  | married        | no         | yes           |
| 22  | 0                    | no         | 0                  | married        | yes        | no            |

A complex model would have the following rule. If the customer is older than 52, has less then three children, and doesn't own a dog. This might fit well for this data set, but would fail when more entries are added. This is overfitting. 

Under-fitting rule might be: Anyone over age of 50 might buy a boat. This fails to consider any other feature other than age, and thus unable to capture the relationship between features and target.

Let's look at some training/testing/validation accuracy graphs to visualize when a model might be considered under-fitting, just right, or overfitting of a [[Linear Regression]].

![[Pasted image 20230913143318.png]]
This idea is also vital to [[Neural Networks|neural network]] models, where we often visualize under-fitting/overfitting in loss and accuracy graphs (after a model training). 

### What is Bias and Variance?
Bias is the inability for a ML algorithm to capture true relationship. (Large Bias vs Small Bias)
![[Pasted image 20230906115425.png | center | 300 ]]
The linear relationship on the left has large bias, while the relationship on the right has small bias. Which can be measured with Mean Squared Error.

Variance can be described as in the difference between fits between datasets. Imagine the blue dots as the training set, and green as test set. We can see that the straight line actually does better than the squiggly line relationship with a smaller bias. Thus the straight line is considered to have low variance.
![[Pasted image 20230906115723.png | center | 300 ]]
The squiggly line therefore has low bias, but high variability because it results in vastly different sum of squares for different datasets. It is hard to predict how well the squiggly line might do for future datasets.
![[Pasted image 20230906115605.png | center | 300]]
Another thing to consider in this case is that the squiggly line is [[Overfitting]] because it works extremely well for the test set, but poorly for the test set. Another popular example, 
![[Pasted image 20230926110508.png | center |400 ]]
How about in higher dimensions where we can't simply visualize? We can use train set error vs dev set error. For example, in a cat classification where we have

| Error Type      | Case 1        | Case 2    | Case 3                    | Case 4 |
| --------------- | ------------- | --------- | ------------------------- | ------ |
| Human Error     | 0%            | 0%        | 0%                        |  0%      |
| Train Set Error | 1%            | 15%       | 15%                       |    0.5%    |
| Dev Set Error   | 11%           | 16%       | 30%                       |      1%  |
| Bias/Variance   | High Variance | High Bias | High Bias & High Variance |    Low Bias/Variance    |

Human Error & Optimal Bayes Error are standards that determine whether train set error is high bias/low bias.

**Remark:** Error can be denoted as  $\text{Error} = \text{bias} + \text{variance} + \text{noise}$
### What is the difference between Inference and Predictions?


### What is Data Augmentation?
Data augmentation is the process of artificially increasing diversity to your training data. In the case of image data, this means applying different transformation to the image. 

### What is Regularization?
[[Regularization]] 
**Intuition:** Regularization methods add a penalty term to the model's loss function to discourage it from learning overly complex patterns that may not generalize well (prevent overfitting, reduce variance).  Take the following regression example below.
![[Pasted image 20230918161249.png]]
Our goal is to shift from overfit to balanced fit. So how do we do that? We should try to make $\theta_3$ and $\theta_4$ approach 0 to get a better prediction. Remember that when starting a regression model, we calculate mean squared error
$$ \text{MSE} = \frac{1}{n}\sum_{i=1}^{n}{(y_i - y_{predicted})^2} $$
on some randomly initialized weights (coefficient). Where $y_{predicted}$ is 
$$ \hat{y}_\theta(x_i) = \theta_0 + \theta_1x_1 + \theta_2x_2 + \dots + \theta_nx_n $$ Our goal is to minimize this error. So what if we add a parameter to the end.
$$  \text{MSE} = \frac{1}{n}\sum_{i=1}^{n}{(y_i - \hat{y}_\theta(x_i))^2} + \lambda\sum_{i=1}^n{\theta_i^2}  $$
where $\lambda$ is the **regularization paramter**, or a turning nob. In this case, if $\theta$ gets bigger, so will the error, the second part will also get bigger, and in turn the error gets bigger. And the model will not converge. This is known as **L2 Regularization**. We can see that we are penalizing extreme parameter values, such as he high $\theta$ parameter. 

***Regularization significantly reduces the variance of the model, without substantial increase in its bias***. Tuning the parameter $\lambda$ used in regularization techniques described above, controls the impact on bias and variance.
- As the value of λ rises, so does the regularization strength. **_Till a point, this increase in λ is beneficial as it is only reducing the variance(hence avoiding overfitting), without loosing any important properties in the data._** But after certain value, the model starts loosing important properties, giving rise to bias in the model and thus under-fitting. Therefore, the value of λ should be carefully selected.

Types of Regularization
- Ridge (L2) Regression
- Lasso (L1) Regression

### Understanding Softmax Loss, Categorical Cross-Entropy Loss, Binary Cross-Entropy Loss, Logistic Loss
Softmax Loss should not be confused with Softmax activation. Instead. it is softmax activation + cross entropy loss.

### What are Word Sequences Word Embeddings?
Key Terms
- Vocabulary / **Dictionary**  
- **One-hot representation**, 
- **Unknown Words Token**, 
- End of Sentence Token

Word embeddings is a way of representing words that allow algorithms to automatically understand analogies.

Here, we discuss some word embeddings / word representations types.
**1-Hot Representation** 
- One of the weaknesses of this representation is  that it treats each word as a thing unto itself,  and it doesn't allow an algorithm to easily generalize across words.
- Featured Representation - Learn a set of features and values for each of them

**Feature Representation** / **Embeddings**

| Features/Words | Man (5391) | Woman | King | Queen | Apple | Orange | 
| -------------- | ---------- | ----- | ---- | ----- | ----- | ------ | 
| Gender         |            |       |      |       |       |        | 
| Royal          |            |       |      |       |       |        | 
| Age            |            |       |      |       |       |        | 
| $\vdots$       |            |       |      |       |       |        |     
| Size           |            |       |      |       |       |             |
| Cost           |            |       |      |       |       |             |
| Alive          |            |       |      |       |       |        |     
| Verb               |            |       |      |       |       |        |  

- Each word may have a 300 feature vector or **embedding**. This allows an algorithm to quickly figure out relationships between words. For example, man and woman have a stronger relationship then man and orange or woman and orange. This gives a better representation than 1-hot. 
- These word embeddings are usually denoted with $e$
- One common algorithm, **t-SNE** (introduced by [van Der Maaten and Hinton]) projects these 300  dimensional word embeddings on a 2D plot and makes it easy to similar words.

**Embedding Matrix**
An embedding matrix is a list of all words and their corresponding embeddings. In order to get the embedding vector for a specific word. We can the embedding matrix and multiply it by  the one-hot representation.

The algorithms to learn Word Embeddings in NLP tasks are discussed more in [[Recurrent Neural Network]].
### What is Multi-Modal Machine Learning?

### Strategies to Improve Neural Network Models
There are many ways to select and improve a models performance. Here we talk about general methods to do so. For neural networks specifically, refer to [[Neural Networks#How to iteratively tune your model? | how to iteratively tune your model?]] 

- Chain of Assumptions in ML
	- Fit train set well on cost function (solve high bias)
	- Fit dev set well on cost function (solve variance)
	- Fit test set well on cost function 
	- Performs well in real world
	- ![[Pasted image 20230926111927.png | center | 400]]
- Orthogonalization
	- Early stopping is less orthogonalized, bc effects both training and test set.
- Setting up your goal: Metrics
	- Single number evaluation metric 
	- Satisficing and Optimizing Metric
	- Changing Dev/Test Metrics (better capture real world metrics)
- Human-level Performance
	- Bayes Optimal Error / Avoidable Bias
	- Focus on bias when Training/Human far apart. Focus on variance when Training/Human area already close, but Dev error is not yet. 
- Error Analysis
	- can help make much better prioritization decisions
	- DL algorithms are quiet robust to training set, small random label errors might not affect, but lets robust to systematic errors
	- Build first system quickly, then iterations
- Mismatched Training and Dev/Test Set Distributions
	- Put different distribution test cases into dev set and test set, rather than shuffling all test cases, then splitting into train/test/dev . 
	- When the training and dev set now have a large error, you can not safely draw the conclusion that it is due to variance.
	- How to solve? Carry out manual error analysis to try to understand difference between training and dev/tests, make training data more similar. Or, artificial data synthesis (but this may only simulate a small subset of what we want to test on. I.e, generating cars from images taken from a game, game has limited)
- Transfer Learning
	- Take trained parameters from a model that's been on a giant dataset and use it for another application
	- Multi-task learning: (1) training on a set of tasks that could benefit from having shared lower-level features.  (2) Usually, if amount of data you have for each task is quite similar. (3) Can train a big enough neural network to do well on all tasks, can hurt if NN is not big enough
- End-to-End Deep Learning
	- skip a task that usually requires a pipeline, replace with a DNN instead, but requires a large data set
	- pros: don't force human perceptions, conceptions, less-hand designing of components


