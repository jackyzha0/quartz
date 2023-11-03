# Exploratory Data Analysis (EDA)

El Análisis Exploratorio de Datos (EDA) es una fase crucial en el proceso de Ciencia de Datos. Se trata de la exploración y visualización de datos con el objetivo de comprender la estructura, las relaciones y los patrones presentes en un conjunto de datos. En este apunte teórico, abordaremos los conceptos clave del EDA y proporcionaremos ejemplos programados en Python.

**Conceptos Clave de EDA:**

1. **[[Estadistica Descriptiva]]**: El EDA comienza con la descripción de los datos utilizando estadísticas descriptivas. Esto incluye calcular medidas como la media, la mediana, la desviación estándar, y el rango de las variables para comprender sus propiedades fundamentales.

2. **Visualización de Datos**: Las visualizaciones desempeñan un papel esencial en el EDA. Gráficos como histogramas, diagramas de caja (box plots), gráficos de dispersión y mapas de calor permiten observar la distribución de los datos y las relaciones entre las variables. Se utilizan librerías como [[Matplotlib y Seaborn]]

3. **Identificación de Valores Atípicos (Outliers)**: Durante el EDA, se busca identificar valores atípicos que pueden tener un impacto significativo en el análisis. Los valores atípicos pueden distorsionar las estadísticas y los modelos. 

4. **Exploración de Relaciones**: Se investigan las relaciones entre las variables para identificar patrones y asociaciones. Esto puede incluir correlaciones, tablas de contingencia y análisis de series temporales. También evaluamos las [[Regresión Lineal]] entre variables para ver sus dependencias.

**Ejemplos Programados en Python:**

A continuación, se presentan ejemplos programados en Python para ilustrar los conceptos de EDA utilizando un conjunto de datos hipotético de calificaciones de estudiantes:

```python
# Importar las bibliotecas necesarias
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Cargar los datos (supongamos que el conjunto de datos se llama "student_data.csv")
data = pd.read_csv("student_data.csv")

# Estadísticas descriptivas
print(data.describe())

# Histograma de las calificaciones
plt.hist(data['Calificaciones'], bins=10)
plt.xlabel('Calificaciones')
plt.ylabel('Frecuencia')
plt.title('Distribución de Calificaciones')
plt.show()

# Diagrama de caja para identificar valores atípicos
sns.boxplot(x=data['Calificaciones'])
plt.title('Diagrama de Caja de Calificaciones')
plt.show()

# Matriz de correlación
correlation_matrix = data.corr()
sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm")
plt.title('Matriz de Correlación')
plt.show()

# Gráfico de dispersión entre horas de estudio y calificaciones
plt.scatter(data['Horas_de_Estudio'], data['Calificaciones'])
plt.xlabel('Horas de Estudio')
plt.ylabel('Calificaciones')
plt.title('Relación entre Horas de Estudio y Calificaciones')
plt.show()
```

