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
(d) $\{-1+3x, 1+x^{2,}x-3x^{2,}4+4x-11x^2\}$    

Since $P_2(\mathbb{R})$ has dimension 3, by default all bases of $P_2(\mathbb{R})$ have three elements. Hence (a) and (d) cannot possibly be bases of $P_2(\mathbb{R})$

(b) Since this set has 3 vectors and $P_2(\mathbb{R})$ has dimension 3, it is enough to check either that is is linearly independent or that it spans $P_2(\mathbb{R})$.
To show linear independence, if $a(1-x)+b(2x^2)+c(3+x^2)=(0x^2 + 0x + 0)$, we have $2b+c=0$, $-a=0$ and $a+3c = 0$. So $a=0$ which implies $c=0$ which then implies $b=0$. So the only linear combination equal to the zero vector is the one where $a=b=c=0$, hence this set in linearly independent. Since it is linearly independent and has three vectors, its span is a subspace of $P_2(\mathbb{R})$ of dimension 3, i.e., all of $P_2(\mathbb{R})$

(c) Since this set has 3 vectors and $P_2(\mathbb{R})$ has dimension 3, it is enough to check either that is is linearly independent or that it spans $P_2(\mathbb{R})$.
To show linear independence, if $a(0 +2x+0x^2)+b(4+2x-x^2)+c(-4-6x+x^2)=(0+0x+0x^2)$, we have $4b-4c=0$, $2a+2b-6c=0$ and $-b+c = 0$. So $b=c$ which implies $-c+c=0$ and $2a+2c-6c=0$ so $a=2c=2b$. But this does no force $a,b,c$ t obe zero; we could have e.g., $a=2$ and $b=c=1$. Therefore we have a linear combination of the vectors that gives the zero vector when the coefficients are not all zero. So it is linearly dependent, and therefore can't be a basis.

# 2. 
Let $V$ be a vector space such that $dim(V)= 10$. Let $U$ and $W$ denote subspaces of $V$.

(a). What is the max value of $dim(U\cap W)$, assuming $dim(U)=7$ and $dim(W)=4$ ?

The largest possible dimension of $(U\cap W)$ is 4 which occurs when $W$ is entirely contained in $U$.

(b). What is the min value of $dim(U+W)$

$dim(U\cap W) \leq 4$ so from the formula $dim(U+W) = dim(U) + dim(W) - dim(U \cap W)$ we have $dim(U+W) \geq 7 + 4 - 4= 7$.

(c). Max value of $dim(U+W)$

We have $dim(U+W) \leq dim(U) + dim(W) = 11$. But since $U+W$ is a subspace of $V$ which has dimension $10$ , we must have $dim(U+W) \leq 10$. To show that this can be achieved, we could let $\{v_1,...,v_{10}\}$ be a basis for V, and choose $U = span\{v_1, v_2, v_3, v_4, v_5, v_5, v_7)\}$ and $W=span\{v_7,v_8,v_9,v_{10}\}$. Then $U+W$ will contain the basis for $V$ and hence $U+W=V$. So the maximum possible value of dim(U+W) is 10.

(d). Since $dim(U+W) \leq 10$ and $dim(U+W) = 11 - dim(U\cap W)$, we have $dim(U\cap W) \geq 11-10= 1$ 

(c). No, because if $U+W$ is direct then $dim(U+W) = 0$, but we showed that $dim(U\cap W) \geq 1$

# 3.
Let $U$ = $\{p\in P_2(\mathbb{R}): p(x)$ is divisible by $x-3\}$. Then U is a subspace of P2
(a) Find a basis of U.

Suppose a polynomial of degree 2 is divisible by $x-3$ . It can be written as $(x-3)(ax+b)$ where $a,b \in \mathbb{R}$. Then we have a basis $\{(x-3), x(x-3)\}$