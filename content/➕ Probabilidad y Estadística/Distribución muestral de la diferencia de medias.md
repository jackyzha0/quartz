# Distribución muestral de la diferencia de medias

%%
Date:: [[2023-05-10]]
Course:: [[Probabilidad y Estadística]]
Source:: [[Teoría de Muestreo]]
%%



Se tienen dos poblaciones, la primera con media $\mu_1$ y varianza $\sigma_1^2$ y la segunda con media $\mu_2$ y varianza $\sigma_2^2$. Si el estadístico $\bar{X_1}$, representa la media de una muestra de tamaño $n_1$ seleccionada de la primera población, y que el estadístico $\bar{X_2}$, representa la media de una población de tamaño $n_2$ seleccionada de la segunda población:
- Si se sacan al azar muestras independientes de tamaños $n_1$ y $n_2$ de dos poblaciones, discretas o continuas, con medias $\mu_1$ y $\mu_2$ y varianzas $\sigma_1^2$ y $\sigma_2^2$ respectivamente, entonces la distribución muestral de la diferencia de medias $\bar{X_1}-\bar{X_2}$ está distribuida de forma aproximadamente normal con medias y varianzas:
	$$\mu_{\bar{X_1}-\bar{X_2}}=\mu_1-\mu_2$$
	$$\sigma^2_{\bar{X_1}-\bar{X_2}}=\dfrac{\sigma_1^2}{n_1}+\dfrac{\sigma_2^2}{n_2}$$
 
De aquí que $$Z=\dfrac{\bar{X_1}-\bar{X_2}-(\mu_1-\mu_2)}{\sqrt{\frac{\sigma_1^2}{n_1}+\frac{\sigma_2^2}{n_2}}}$$
es aproximadamente una variable normal estándar siempre y cuando $n_1\geq 30$ y $n_2\geq 30$ o las dos poblaciones de las que se extraen son aproximadamente normal (de forma gráfica por ejemplo).

![[Pasted image 20230510202113.png | center | 500]]



___
## Flashcards