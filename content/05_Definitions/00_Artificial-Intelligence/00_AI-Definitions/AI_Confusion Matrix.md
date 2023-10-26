
#Definitions 

---
### # What is a Confusion Matrix

In the field of [machine learning](https://en.wikipedia.org/wiki/Machine_learning "Machine learning") and specifically the problem of [statistical classification](https://en.wikipedia.org/wiki/Statistical_classification "Statistical classification"), a **confusion matrix**, also known as **error matrix**, is a specific [table](https://en.wikipedia.org/wiki/Table_(information) "Table (information)") layout that allows visualization of the performance of an algorithm, typically a [supervised learning](https://en.wikipedia.org/wiki/Supervised_learning "Supervised learning") one; in [unsupervised learning](https://en.wikipedia.org/wiki/Unsupervised_learning "Unsupervised learning") it is usually called a **matching matrix**.

Each row of the [matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics) "Matrix (mathematics)") represents the instances in an actual class while each column represents the instances in a predicted class, or vice versa – both variants are found in the literature.

---
## # Confusion Matrix:

#### 4 outcomes

True, if the prediction matches the classification
False, if the prediction does not match the classification

1. actual classification is positive - predicted classification is positive (1, 1) = <mark style="background: #D2B3FFA6;">T</mark>rue <mark style="background: #D2B3FFA6;">P</mark>ositive
2. actual classification is positive - predicted classification is negative (1, 0) = <mark style="background: #D2B3FFA6;">F</mark>alse <mark style="background: #D2B3FFA6;">N</mark>egative
3. actual classification is negative - predicted classification is positive (0, 1) = <mark style="background: #D2B3FFA6;">F</mark>alse <mark style="background: #D2B3FFA6;">P</mark>ositive
4. actual classification is negative - predicted classification is negative (0, 0) = <mark style="background: #D2B3FFA6;">T</mark>rue <mark style="background: #D2B3FFA6;">N</mark>egative

---
#### Wikipedia Example
[Confusion Matrix - Wikipedia](https://en.wikipedia.org/wiki/Confusion_matrix)

- We have 12 individuals
- 8 have been diagnosed with cancer (1) - 4 are cancer-free (0)

![[Pasted image 20231015105940.png]]

---
- A classifier distinguishes between individuals with / without cancer

![[Pasted image 20231015110230.png]]

![[Pasted image 20231015111304.png]]

---
#### # Example
In a Classificationmodel (picture: man/woman) with a test amount of 100 pictures (60/40) show the following results:

1. 40 / men - were right
2. 35 / women - were right

![[Pasted image 20231015115622.png]]

![[Pasted image 20231015115647.png]]
