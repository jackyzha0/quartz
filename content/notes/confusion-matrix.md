---
title: "confusion-matrix"
aliases: 
tags: AI
---


For binary classification we often need more information on the distribution of the errors. For this we form a confusion matrix, which shows the counts of true/false positives/negatives, from which various measurements can be derived:

|       | Positive | Negative |
| ----- | -------- | -------- |
| True  | TP       | FN       |
| False | FP       | FN       |

- Total number of positives (labels of one type) in the data is TP+FN.
- Total number of negatives (labels of second type) in the data is FP+TN. 
- Total number of positive predictions by the model is TP+FP. 
- Total number of negative predictions by the model is FN+TN