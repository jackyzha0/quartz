**Manipulación de Datos en el Ámbito de Data Science**

La manipulación de datos es una parte fundamental en el campo de Data Science. Permite preparar y transformar los datos para su posterior análisis, modelado y visualización. Aquí exploraremos algunos de los métodos de manipulación de datos comunes y proporcionaremos ejemplos de código en Python.

**1. Filtrado de Datos**

Filtrar datos implica seleccionar un subconjunto de filas o columnas de un DataFrame en función de una condición. Esto es útil para enfocarse en datos relevantes.

```python
import pandas as pd

# Crear un DataFrame de ejemplo
data = pd.DataFrame({'A': [1, 2, 3, 4], 'B': [5, 6, 7, 8]})

# Filtrar filas donde A sea mayor que 2
filtered_data = data[data['A'] > 2]
print(filtered_data)
```

**2. Limpieza de Datos**

La limpieza de datos implica tratar con valores faltantes, duplicados y datos erróneos. Aquí hay un ejemplo de cómo manejar valores faltantes:

```python
import pandas as pd

# Crear un DataFrame de ejemplo con valores faltantes
data = pd.DataFrame({'A': [1, 2, None, 4], 'B': [5, None, 7, 8]})

# Eliminar filas con valores faltantes
cleaned_data = data.dropna()
print(cleaned_data)
```

**3. Transformación de Datos**

La transformación de datos implica cambiar la estructura o los valores de los datos. Un ejemplo común es aplicar una función a una columna:

```python
import pandas as pd

# Crear un DataFrame de ejemplo
data = pd.DataFrame({'A': [1, 2, 3, 4], 'B': [5, 6, 7, 8]})

# Aplicar una función a la columna A (duplicar los valores)
data['A'] = data['A'].apply(lambda x: x * 2)
print(data)
```

**4. Combinación de Datos**

La combinación de datos implica unir dos o más conjuntos de datos en uno solo. Aquí se muestra cómo unir DataFrames en función de una clave común:

```python
import pandas as pd

# Crear dos DataFrames de ejemplo
data1 = pd.DataFrame({'key': ['A', 'B', 'C'], 'value': [1, 2, 3]})
data2 = pd.DataFrame({'key': ['B', 'C', 'D'], 'value': [4, 5, 6]})

# Unir los DataFrames en función de la columna 'key'
merged_data = pd.merge(data1, data2, on='key')
print(merged_data)
```

**5. Agregación de Datos**

La agregación de datos implica resumir los datos en función de ciertas características. Por ejemplo, calcular la media de una columna:

```python
import pandas as pd

# Crear un DataFrame de ejemplo
data = pd.DataFrame({'Category': ['A', 'B', 'A', 'B'], 'Value': [1, 2, 3, 4]})

# Calcular la media por categoría
mean_data = data.groupby('Category')['Value'].mean()
print(mean_data)
```


[[Normalización de variables]]