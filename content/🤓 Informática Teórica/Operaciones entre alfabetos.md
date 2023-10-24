# Operaciones entre alfabetos

- Date:: [[2023-03-23]]
- Course:: [[Informática Teórica]]
- Source:: [[Alfabeto y Cadenas de Caracteres]]

#infoteo/alfabetos_y_cadenas 

## Definición y propiedades de potencia de un alfabeto
?
- Todas las posibles cadenas que puedo formar en el alfabeto con la longitud del exponente
- Si  $\Sigma =\{0,1\}$
	- $\Sigma^1=\{0,1\}$
	- $\Sigma^2=\{01,10\}$
	- $\Sigma^3=\{000,001,010,100,011,100,101,110,111\}$
- Propiedades
	- Si $\Sigma^0=\{\lambda \}$
	- $\Sigma \neq \Sigma^1$
	- $\Sigma^{*}=\Sigma^0\cup\Sigma^1\cup\Sigma^2\dots$ (Cierre de Kleene)
	- $\Sigma^{+}=\Sigma^1\cup\Sigma^2\dots$ (Clausura positiva)
		- $\Sigma^{*}=\Sigma^{+}\cup\{\lambda\}$

