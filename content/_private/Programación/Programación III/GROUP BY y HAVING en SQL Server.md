# GROUP BY y HAVING en SQL Server

%%
Date:: [[2023-08-23]]
Course:: [[Programación III]]
Source:: [[]]
%%

1. **GROUP BY**:
El modificador GROUP BY se utiliza para agrupar filas en una tabla según los valores de una columna o varias columnas. Esto permite aplicar funciones de agregación (como SUM, COUNT, AVG, etc.) a cada grupo de filas con valores idénticos en las columnas especificadas. Ayuda a resumir los datos y obtener información agregada.

```
Tabla Original:
+---------+-------+
| Categoría | Valor |
+---------+-------+
|    A    |   5   |
|    B    |   7   |
|    A    |   3   |
|    B    |   4   |
+---------+-------+

Resultado con GROUP BY:
+---------+-------+
| Categoría | SUM   |
+---------+-------+
|    A    |   8   |
|    B    |  11   |
+---------+-------+
```

2. **HAVING**:
El modificador HAVING se utiliza en combinación con GROUP BY para filtrar los grupos generados por la cláusula GROUP BY. Permite establecer condiciones en las funciones de agregación para limitar los grupos que se incluirán en el resultado final.

```
Tabla Original:
+---------+-------+
| Categoría | Valor |
+---------+-------+
|    A    |   5   |
|    B    |   7   |
|    A    |   3   |
|    B    |   4   |
+---------+-------+

Resultado con GROUP BY y HAVING:
+---------+-------+
| Categoría | SUM   |
+---------+-------+
|    B    |  11   |
+---------+-------+
```

En este ejemplo, se aplicó GROUP BY a la columna "Categoría" y se calculó la suma de valores para cada categoría. Luego, se utilizó HAVING para mostrar solo los grupos donde la suma sea mayor o igual a 10.

