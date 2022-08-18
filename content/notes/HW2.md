---
title: "HW2"
aliases: 
tags: 
- math202
- assignment
---

# Assignment 2
Jet Hughes 9474308

# 1. 
Let $V = P_2(\mathbb{R})$ with the ususal vector addition and scalar multiplication. For each of the following subsets of $V$, either prove that it is a basis of $V$ or explain why it is not a basis of $V$ . You may use any result from class.

(a) $\{759, 20+2x+43x^2\}$  
(b) $\{1-x, 2x^{2},3+x^2\}$   
(c) $\{2x, 4+2x-x^{2}, -4-6x+x^2\}$   
(c) $\{-1+3x, 1+x^{2,}x-3x^{2,}4+4x-11x^2\}$    

Since $P_2(\mathbb{R})$ has dimension 3, by default all bases of $P_2(\mathbb{R})$ have three elements. Hence (a) and (d) cannot possibly be bases of $P_2(\mathbb{R})$

(b) Since this set has 3 vectors and $P_2(\mathbb{R})$ has dimension 3, it is enough to check either that is is linearly independent or that it spans $P_2(\mathbb{R})$.
To show linear independence, if $a(1-x)+b(2x^2)+c(3+x^2)=(0x^2 + 0x + 0)$, we have $2b+c=0$, $-a=0$ and $a+3c = 0$. So $a=0$ which implies $c=0$ which then implies $b=0$. So the only linear combination equal to the zero vector is the one where $a=b=c=0$, hence this set in linearly independent. Since it is linearly independent and has three vectors, its span is a subspace of $P_2(\mathbb{R})$ of dimension 3, i.e., all of $P_2(\mathbb{R})$