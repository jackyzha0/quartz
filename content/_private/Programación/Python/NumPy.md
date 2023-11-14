Claro, aquí tienes ejemplos de sintaxis para cada uno de los títulos mencionados en la descripción de NumPy en [[Python]]:

**1. Creación de Arreglos:**
```python
import numpy as np

# Crear un arreglo NumPy a partir de una lista
mi_arreglo = np.array([1, 2, 3, 4, 5])
```

**2. Propiedades de los Arreglos:**
```python
import numpy as np

mi_arreglo = np.array([1, 2, 3, 4, 5])

# Acceder a la forma del arreglo (shape)
forma = mi_arreglo.shape

# Acceder al tipo de dato del arreglo (dtype)
tipo_de_dato = mi_arreglo.dtype
```

**3. Operaciones con Arreglos:**
```python
import numpy as np

arreglo_a = np.array([1, 2, 3])
arreglo_b = np.array([4, 5, 6])

# Realizar una suma de arreglos
resultado = arreglo_a + arreglo_b
```

**4. Indexación y Rebanado:**
```python
import numpy as np

mi_arreglo = np.array([0, 1, 2, 3, 4, 5])

# Acceder al primer elemento
primer_elemento = mi_arreglo[0]

# Rebanar el arreglo para obtener un subconjunto
subconjunto = mi_arreglo[2:5]
```

**5. Funciones Universales (ufuncs):**
```python
import numpy as np

mi_arreglo = np.array([1, 2, 3])

# Aplicar una función universal, en este caso, la función cuadrado
cuadrados = np.square(mi_arreglo)
```

**6. Broadcasting:**
```python
import numpy as np

arreglo_a = np.array([1, 2, 3])
escalar = 2

# Broadcasting: multiplicar un arreglo por un escalar
resultado = arreglo_a * escalar
```
