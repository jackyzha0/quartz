**Funciones y Módulos en [[Python]]**

En este tema, exploraremos dos conceptos clave en Python: funciones y módulos. Estas herramientas te permitirán organizar y reutilizar tu código de manera efectiva, lo que es esencial en el desarrollo de aplicaciones más grandes y complejas.

**1. Funciones:**
   - Una función es un bloque de código reutilizable que realiza una tarea específica.
   - Las funciones se definen con la palabra clave `def` seguida de un nombre descriptivo y paréntesis que pueden contener argumentos.
   - Ejemplo de definición de una función que suma dos números:

```python
def suma(a, b):
 resultado = a + b
 return resultado
```

**2. Llamada de Funciones:**
   - Para utilizar una función, simplemente la llamas por su nombre y proporcionas los argumentos necesarios.
   - Ejemplo de llamada a la función `suma`:

```python
resultado_suma = suma(3, 5)
```

**3. Retorno de Valores:**
   - Las funciones pueden devolver un valor mediante la palabra clave `return`. Esto permite utilizar el resultado en otras partes del programa.
   - En el ejemplo anterior, la función `suma` retorna el resultado de la suma.

**4. Módulos:**
   - Los módulos son archivos de Python que contienen funciones, variables y clases relacionadas.
	- [[NumPy]], [[Pandas]], [[Matplotlib y Seaborn]].
   - Python tiene una amplia biblioteca estándar, pero también puedes crear tus propios módulos para organizar tu código de manera más efectiva.
   - Ejemplo de importación de un módulo de la biblioteca estándar de Python:

```python
import math
raiz_cuadrada = math.sqrt(16)
```


Continuación:
[[Manejo de Excepciones en Python]]