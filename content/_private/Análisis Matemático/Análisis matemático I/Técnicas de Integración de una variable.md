Course: [[Análisis matemático I]]
### Técnicas de integración
La integración es una operación matemática que consiste en encontrar la función primitiva de una función dada. Existen diversas técnicas de integración, entre las cuales se encuentran el método de sustitución y la integración por partes.

## Método de sustitución
El método de sustitución es una técnica de integración que se utiliza para integrar funciones compuestas. Se basa en la regla de la cadena de derivación, que establece que si $u$ es una función de $x$, entonces la derivada de $f(u)$ con respecto a $x$ es $f'(u)u'$. La idea es sustituir una función compleja por una función más simple, para lo cual se utiliza una variable auxiliar $u$.

La fórmula general del método de sustitución es:

$$\int f(g(x))g'(x)dx = \int f(u)du$$

donde $u=g(x)$ y $du=g'(x)dx$.

## Integración por partes
La integración por partes es otra técnica de integración que se utiliza para integrar el producto de dos funciones. Se basa en la regla del producto de derivación, que establece que si $u$ y $v$ son funciones de $x$, entonces la derivada de $u(x)v(x)$ con respecto a $x$ es $u'(x)v(x)+u(x)v'(x)$. La idea es elegir una función para $u$ y otra para $dv$, de tal manera que la integral se convierta en una forma más simple.

La fórmula general de la integración por partes es:

$$\int u(x)dv(x) = u(x)v(x) - \int v(x)du(x)$$

donde $u(x)$ es la función que se deriva y $dv(x)$ es la función que se integra.

- Integrales comunes en las que se usa la integración por partes![Untitled](Images/Técnicas%20de%20Integración%20de%20una%20variable/Untitled%203.png)

- Relación de lados y ángulos en integración por método trigonométrica![Untitled](Images/Técnicas%20de%20Integración%20de%20una%20variable/Untitled%204.png)


### Fracciones parciales (cocientes de polinomios)
- Si el grado del polinomio superior > inferior
    - Se utiliza cuando el polinomio del denominador es de mayor grado que el del numerador
    ![Untitled](Images/Técnicas%20de%20Integración%20de%20una%20variable/Untitled%205.png)

