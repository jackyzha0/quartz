---
title: "Artificial Neuron"
tag: ml
date: 
alias:
---

This is also sometimes called a [[perceptron]] but I prefer to use perceptron to refer to the learning algorithm.

This is the most basic artificial neuron that essentially acts as a classifier (very similar in formulation to [[Linear Classifier]]).

## Formulation
A neuron takes several binary inputs $x_{1}, x_{2}, \cdots,$ and produces a single binary output.

![[Pasted image 20230717123750.png|325]]

- Inputs $x_{1}, x_{2}, x_{3}$
- Weights $w_{1}, w_{2}, w_{3}$
	- Express the importance of the respective input to the output
- The neuron’s output, $0$ or $1$, is determined by whether the weighted sum $\sum_{j}\limits w_{j}x_{j}$ is greater than some *threshold*
- Thus, we have: 
$$
\text{output}= 
\begin{cases} 
 0 \text{ if } \sum_{j}\limits w_{j}x_{j} \leq \text{threshold} \\
 1 \text{ if} \sum_{j}\limits w_{j}x_{j} > \text{threshold}
\end{cases}
$$
- By using the dot product ($w \cdot x \equiv \sum_{j}\limits w_{j}x_{j}$) and using a bias term $b \equiv \text{threshold}$, we have a more general form: 
$$
\text{output}= 
\begin{cases} 
 0 \text{ if } w \cdot x + b \leq 0 \\
 1 \text{ if} w \cdot x + b > 0 \\
\end{cases}
$$
## Applications
Neurons can be useful in unexpected ways like, modeling logic gates such as `AND`, `NOR`, and `NAND`.
![[Pasted image 20230718163252.png|300]]

- Input $00$ produces output $1$, input $11$ produces output $0$
- We’ve made a `NAND` gate!

Obviously, if we can make a `NAND` gate we can also expand to more complex logic circuits like an adder. 


