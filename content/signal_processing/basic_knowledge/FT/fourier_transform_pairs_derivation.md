---
title: Fourier transform pairs and properties derivation
tags:
  - signal-processing
  - signal
  - fourier-transform
  - math
date: 2023-11-30
---
# Fourier Transform Paris

## $1 \leftrightarrow 2\pi\delta(\omega)$


$$
\begin{equation}
\begin{split}
	X(\omega) & = \int_{-\infty}^{\infty} 1 * e^{-j\omega t} dt \\ 
			& = \lim_{T\rightarrow\infty}\int_{-\frac{T}{2}}^{\frac{T}{2}} e^{-j\omega t} dt \\ 
			& = \lim_{T\rightarrow\infty} -\frac{1}{j\omega} [e^{-j\omega t}] |_{t=-T/2}^{t=T/2}
\end{split}
\end{equation}
$$
