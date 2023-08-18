---
title: "Calculus with Vector Functions"
tag: calc3
date: 
alias:
---

Let’s say our generic vector function form is $\vec{r} (t) = \langle f(t), g(t), h(t) \rangle$ 

## Limits of Vector Functions
$$\begin{align}
\lim_{ t \to a } \vec{r} (t) &= \lim_{ t \to a } \langle f(t), g(t), h(t) \rangle \\ \\
&= \langle \lim_{ t \to a } f(t), \lim_{ t \to a } g(t), \lim_{ t \to a } h(t) \rangle \\ \\
&=\lim_{ t \to a } f(t) \vec{i} + \lim_{ t \to a } g(t) \vec{j}+ \lim_{ t \to a } h(t)\vec{k}
\end{align}$$


## Derivatives of Vector Functions 
$$\begin{align}
\vec{r}'(t) &= \langle f'(t), g'(t), h'(t) \rangle \\ \\
&= f'(t) \vec{i} + g'(t) \vec{j} +h'(t)\vec{k}
\end{align}$$
## Properties of Derivatives
Addition: $\frac{d}{dt}(\vec{u} + \vec{v}) = \vec{u}' + \vec{v}'$
Constant multiple:$(c\vec{u})'=c\vec{u}'$
Chain rule: $\frac{d}{dt} (\vec{u} \cdot f(t)) = f'(t)\cdot\vec{u}'f(t)$
Product rule:
$$\frac{d}{dt} (f(t)\vec{u}(t)) = f'(t)\vec{u}(t)+f(t)\vec{u}'(t)$$
$$\frac{d}{dt} (\vec{u} \cdot \vec{v}) = \vec{u}' \cdot \vec{v} + \vec{u} \cdot \vec{v}'$$
$$\frac{d}{dt} (\vec{u} \times \vec{v})= \vec{u}' \times \vec{v} + \vec{u} \times \vec{v}'$$
## Integrals of Vector Functions

Indefinite:
$$\begin{align}
\int \vec{r}(t) \, dt &= \left\langle  \int f(t) \, dt,  \int g(t) \, dt, \int h(t) \, dt \\  \right\rangle \\ \\
&=\int f(t) \, dt  \;\vec{i} + \int g(t) \, dt \;\vec{j} + \int h(t) \, dt \;\vec{k} + \vec{c}  
\end{align}$$
Definite:$$\begin{align}
\int_{a}^{b} \vec{r}(t) \, dt &= \left\langle  \int_{a}^{b} f(t) \, dt, \int_{a}^{b} g(t) \, dt, \int_{a}^{b} h(t) \, dt \\      \right\rangle   \\ \\

&=\int_{a}^{b} f(t) \, dt \;\vec{i}+\int_{a}^{b} g(t) \, dt \; \vec{j} + \int_{a}^{b} h(t) \, dt \;\vec{k} \\ \\

&=\left( \left\langle  \int f(t) \, dt, \int g(t) \, dt, \int h(t) \, dt    \right\rangle  \right ) \Big|_a^b  \\\\

&=\left(   \int f(t) \, dt \; \vec{i}, \int g(t) \, dt \; \vec{j}, \int h(t)  \, dt  \; \vec{j}    \right ) \Big|_a^b

\end{align}$$
## Smooth Curve
- Any curve for which $\vec{r}(t)$ is continuous and $\vec{r}(t)\neq 0$ for any $t$ (except maybe endpoints)
- A helix is an example of smooth curve