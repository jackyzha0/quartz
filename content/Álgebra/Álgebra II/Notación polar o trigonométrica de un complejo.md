Course: [[Algebra II]]

## Módulo y Argumento de Número complejo

El módulo y el argumento son dos medidas importantes de un número complejo en el plano complejo.

- **Módulo**: El módulo de un número complejo $z = a + bi$ es una medida de su magnitud o longitud en el plano complejo. El módulo de $z$ se denota por $|z|$ y se define como la distancia del número complejo $z$ al origen en el plano complejo. Matemáticamente, el módulo de $z$ se puede expresar como:

$$|z| = \sqrt{a^2 + b^2}$$

En otras palabras, el módulo de un número complejo es la raíz cuadrada de la suma de los cuadrados de su parte real y su parte imaginaria.

- **Argumento**: El argumento de un número complejo $z = a + bi$ es una medida del ángulo que forma el número complejo con el eje real en el plano complejo. El argumento de $z$ se denota por $\operatorname{arg}(z)$ y se define como el ángulo $\theta$ tal que $\tan(\theta) = \frac{b}{a}$, donde $a$ y $b$ son la parte real e imaginaria de $z$, respectivamente. El argumento de un número complejo se puede expresar en radianes o grados.

- Propiedades del módulo de un complejo
	- El módulo de un número complejo es siempre un número real no negativo, es decir, $|z| \geq 0$ para todo número complejo $z$.
	- El módulo de un número complejo es igual a cero si y solo si el número complejo es cero, es decir, $|z| = 0$ si y solo si $z = 0$.
	- El módulo de un producto de dos números complejos es igual al producto de los módulos de los números complejos, es decir, $|z_1 z_2| = |z_1| \cdot |z_2|$ para todo número complejo $z_1$ y $z_2$.
	- El módulo de un cociente de dos números complejos es igual al cociente de los módulos de los números complejos, es decir, $|\frac{z_1}{z_2}| = \frac{|z_1|}{|z_2|}$ para todo número complejo $z_1$ y $z_2$ con $z_2 \neq 0$.
	- El módulo de la suma de dos números complejos es menor o igual a la suma de los módulos de los números complejos, es decir, $|z_1 + z_2| \leq |z_1| + |z_2|$ para todo número complejo $z_1$ y $z_2$.
    

## Notación polar o trigonométrica de un complejo
La notación polar o trigonométrica de un número complejo es una forma alternativa de representar un número complejo en el plano complejo utilizando su módulo y su argumento. Formalmente, si $z$ es un número complejo con módulo $r$ y argumento $\theta$, entonces la notación polar de $z$ se puede escribir como:

$$z = r(\cos \theta + i \sin \theta)$$

En esta forma, $r$ es el módulo de $z$ y $\theta$ es el argumento de $z$. La expresión $\cos \theta + i \sin \theta$ se conoce como la forma exponencial de un número complejo, y se denota por $e^{i\theta}$.

## Multiplicación y división de números complejos
La multiplicación y división de números complejos en forma trigonométrica se pueden realizar utilizando las propiedades de la notación polar o trigonométrica de los números complejos. Si $z_1$ y $z_2$ son dos números complejos con módulos $r_1$ y $r_2$ y argumentos $\theta_1$ y $\theta_2$, respectivamente, entonces la multiplicación y división de $z_1$ y $z_2$ en forma trigonométrica se pueden realizar de la siguiente manera:

- Multiplicación: Para multiplicar dos números complejos en forma trigonométrica, se multiplican sus módulos y se suman sus argumentos. Es decir, si $z_1 = r_1(\cos \theta_1 + i \sin \theta_1)$ y $z_2 = r_2(\cos \theta_2 + i \sin \theta_2)$, entonces:

$$z_1 z_2 = r_1 r_2 (\cos (\theta_1 + \theta_2) + i \sin (\theta_1 + \theta_2))$$

- División: Para dividir dos números complejos en forma trigonométrica, se dividen sus módulos y se restan sus argumentos. Es decir, si $z_1 = r_1(\cos \theta_1 + i \sin \theta_1)$ y $z_2 = r_2(\cos \theta_2 + i \sin \theta_2)$, entonces:

$$\frac{z_1}{z_2} = \frac{r_1}{r_2} (\cos (\theta_1 - \theta_2) + i \sin (\theta_1 - \theta_2))$$

Es importante tener en cuenta que la notación polar o trigonométrica de un número complejo no es única, ya que el argumento de un número complejo puede variar en un múltiplo entero de $2\pi$. Por lo tanto, al realizar operaciones con números complejos en forma trigonométrica, es necesario asegurarse de que los argumentos estén en el rango adecuado para evitar errores en los cálculos.

- Formula De Moivre
    La fórmula de Moivre es una fórmula matemática que permite calcular las potencias de un número complejo en forma trigonométrica. La fórmula establece que si $z$ es un número complejo con módulo $r$ y argumento $\theta$, entonces la potencia $z^n$ se puede expresar en forma trigonométrica como:$$(r(\cos \theta + i \sin \theta))^n = r^n (\cos n\theta + i \sin n\theta)$$

## Forma exponencial de un complejo y función exponencial
La forma exponencial de un número complejo es una forma alternativa de representar un número complejo en el plano complejo utilizando la función exponencial compleja. Formalmente, si $z$ es un número complejo con módulo $r$ y argumento $\theta$, entonces la forma exponencial de $z$ se puede escribir como:

$$z = r e^{i\theta}$$

En esta forma, $r$ es el módulo de $z$ y $\theta$ es el argumento de $z$. La expresión $e^{i\theta}$ se conoce como la función exponencial compleja, y se define como $e^{i\theta} = \cos \theta + i \sin \theta$.

## Propiedades de la forma exponencial de un complejo
La forma exponencial de un número complejo tiene las siguientes propiedades:

- La multiplicación de dos números complejos en forma exponencial se puede realizar multiplicando sus módulos y sumando sus argumentos. Es decir, si $z_1 = r_1 e^{i\theta_1}$ y $z_2 = r_2 e^{i\theta_2}$, entonces:$$z_1 z_2 = r_1 r_2 e^{i(\theta_1 + \theta_2)}$$

- La división de dos números complejos en forma exponencial se puede realizar dividiendo sus módulos y restando sus argumentos. Es decir, si $z_1 = r_1 e^{i\theta_1}$ y $z_2 = r_2 e^{i\theta_2}$, entonces:$$\frac{z_1}{z_2} = \frac{r_1}{r_2} e^{i(\theta_1 - \theta_2)}$$

- La potencia $n$-ésima de un número complejo en forma exponencial se puede calcular elevando su módulo a la $n$-ésima potencia y multiplicando su argumento por $n$. Es decir, si $z = r e^{i\theta}$, entonces:$$z^n = r^n e^{i n\theta}$$

- El conjugado de un número complejo en forma exponencial se puede obtener reemplazando $i$ por $-i$ en la expresión exponencial. Es decir, si $z = r e^{i\theta}$, entonces:$$\overline{z} = r e^{-i\theta}$$

## Raiz enésima de un número
La raíz enésima de un número es un número que, elevado a la enésima potencia, es igual al número original. En el caso de los números complejos, la raíz enésima de un número complejo $z$ es un número complejo $w$ tal que $w^n = z$, donde $n$ es un número entero positivo.

La raíz enésima de un número complejo se puede expresar en forma polar o trigonométrica utilizando su módulo y su argumento. Si $z$ es un número complejo con módulo $r$ y argumento $\theta$, entonces la raíz enésima de $z$ se puede expresar en forma polar como:

$$w_k = \sqrt[n]{r} \, e^{i\frac{\theta + 2k\pi}{n}}$$

donde $k = 0, 1, 2, \ldots, n-1$ son los $n$ valores posibles de la raíz enésima de $z$. En otras palabras, la raíz enésima de un número complejo se puede obtener tomando la raíz enésima de su módulo y dividiendo su argumento entre $n$, y luego sumando un múltiplo entero de $2\pi/n$ para obtener los $n$ valores posibles de la raíz enésima.

Es importante tener en cuenta que la raíz enésima de un número complejo no es única, ya que hay $n$ valores posibles de la raíz enésima. Además, la raíz enésima de un número complejo puede ser un número complejo con partes real e imaginaria no racionales, lo que puede dificultar su cálculo.
