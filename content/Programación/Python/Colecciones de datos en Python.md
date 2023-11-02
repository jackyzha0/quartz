# **Colecciones de Datos en [[Python]]**

En este tema, nos centraremos en las colecciones de datos en Python, que son estructuras que te permiten almacenar y manipular múltiples valores. Las colecciones de datos son fundamentales en la programación y se utilizan para resolver una amplia variedad de problemas.

**1. Listas:**
   - Una lista es una colección ordenada y mutable de elementos en Python.
   - Los elementos de una lista pueden ser de diferentes tipos, y se acceden mediante índices (números enteros).
   - Ejemplo de creación de una lista y acceso a elementos:

```python
mi_lista = [1, "dos", 3.0]
primer_elemento = mi_lista[0]  # Acceso al primer elemento
```

**2. Tuplas:**
   - Una tupla es similar a una lista, pero es inmutable, lo que significa que no puedes modificar sus elementos una vez que se han definido.
   - Se utiliza para representar colecciones de datos que no deben cambiar.
   - Ejemplo de creación de una tupla:

```python
mi_tupla = (1, "dos", 3.0)
```

**3. Diccionarios:**
   - Un diccionario es una estructura de datos que almacena pares clave-valor.
   - Las claves son únicas y se utilizan para acceder a los valores correspondientes.
   - Ejemplo de creación de un diccionario y acceso a valores:

```python
mi_diccionario = {"nombre": "Juan", "edad": 30}
nombre = mi_diccionario["nombre"]
```

**4. Conjuntos:**
   - Un conjunto es una colección desordenada de elementos únicos.
   - Se utiliza para realizar operaciones de conjuntos, como unión, intersección y diferencia.
   - Ejemplo de creación de un conjunto:
   
```python
mi_conjunto = {1, 2, 3, 3, 4}  # Los duplicados se eliminan automáticamente
```

**5. Operaciones Comunes en Colecciones:**
   - Las colecciones de datos en Python admiten diversas operaciones, como agregar, eliminar, buscar elementos, y más.
   - Por ejemplo, para agregar un elemento a una lista:
   
 ```python
 mi_lista.append(5)  # Agregar el valor 5 al final de la lista
 ```


Continuación: 
[[Funciones y Módulos en Python]]