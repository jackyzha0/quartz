---
title: "Arc Length with Vector Functions"
tag: calc3
date: 
alias:
---

Determining the length of a vector function $\vec{r}(t)= \langle f(t), g(t), h(t) \rangle$ on the interval $a \leq t \leq b$

We can first rewrite in parametric form:
$$x = f(t), y=g(t), z=h(t)$$
Recall the arc length of a 2D parametric curve:
$$L = \int_{a}^{b} \sqrt{ [f'(t)]^{2} + [g'(t)]^{2} }  \, dx $$
Extending this to 3D: $$L = \int_{a}^{b} \sqrt{ [f'(t)]^{2}+[g'(t)]^{2}+[h'(t)]^{2} } \, dt $$
This can be simplified based on the fact that the the integrand is actually the same as the magnitude of the tangent vector: $$\mid \mid \vec{r}'(t) \mid \mid =  \sqrt{ [f'(t)]^{2}+[g'(t)]^{2}+[h'(t)]^{2} }$$
Thus, we have:
>[!definition] Arc Length
>$$L = \int_{a}^{b} \mid \mid \vec{r}'(t) \mid \mid \, dt $$


We can also have:
>[!defn] Arc length function
>$$s(t) = \int_{0}^{t} \mid \mid \vec{r}'(u) \mid \mid \, du $$
>Plugged into the original function, we can reparametrize the function into  the form $$\vec{r}(t(s))$$. This allows us to tell where we are on the curve after we've traveled a distance $t$ along the curve (start measurement for where we are at $t=0$)
>^arclengthfunction

Here's an example of how this works:
>[!example] Example: Arc length function
>Where on the curve $\vec{r}(t) = \langle 2t, 3\sin(2t), 3\cos(2t) \rangle$ are we after traveling for a distance of $\frac{\pi \sqrt{ 10 }}{3}$?
>
>Finding the arc length function: $$\begin{align}
\mid \mid \vec{r}(t) \mid \mid &= \sqrt{ 4 + 36\cos ^{2}(2t) + 36\sin ^{2}(2t) } = \sqrt{ 4+36 } = 2\sqrt{ 10 } \\ \\ s(t) &= \int_{0}^{t} 2\sqrt{ 10 } \, du = (2\sqrt{ 10 }u \Big|_0) = 2\sqrt{ 10 }t \end{align}$$
>Solving for $t$ based on $s(t)$: $$t = \frac{s}{2\sqrt{ 10 }}$$
>Thus, we have $$\begin{align}
\vec{r}(t(s)) &= \left\langle  \frac{s}{\sqrt{ 10 }}, 3\sin\left( \frac{s}{\sqrt{ 10 }} \right), 3\cos\left( \frac{s}{\sqrt{ 10 }} \right)  \right\rangle \\
\vec{r}\left( t\left( \frac{\pi\sqrt{ 10 }}{3} \right) \right) &= \left\langle  \frac{\pi}{3}, 3\sin\left( \frac{\pi}{3} \right), 3\cos\left( \frac{\pi}{3} \right)  \right\rangle  \\
&= \left\langle  \frac{\pi}{3}, \frac{3\sqrt{ 3 }}{2}, \frac{3}{2}  \right\rangle 
\end{align}$$
Therefore, after traveling a distance of  $\frac{\pi \sqrt{ 10 }}{3}$ along the curve, we are at the point $(\frac{\pi}{3}, \frac{3\sqrt{ 3 }}{2}, \frac{3}{2})$.









