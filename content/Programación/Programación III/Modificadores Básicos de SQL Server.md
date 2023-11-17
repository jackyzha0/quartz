# Modificadores Básicos de SQL Server

%%
Date:: [[2023-08-23]]
Course:: [[Programación III]]
Source:: [[]]
%%

Modificadores básicos para las [[Sentencias Básicas de SQL Server]]

1. **ORDER BY**:
La cláusula ORDER BY se utiliza para ordenar los resultados de una consulta en un orden específico. Puedes ordenar los resultados en función de una o más columnas, ya sea de manera ascendente (ASC) o descendente (DESC). La sintaxis básica es:

```sql
SELECT columnas
FROM tabla
ORDER BY columna1 [ASC|DESC], columna2 [ASC|DESC], ...;
```

2. **LIMIT (TOP en SQL Server)**:
La cláusula LIMIT (en otros sistemas, como MySQL) o TOP (en SQL Server) se utiliza para limitar el número de filas devueltas por una consulta. Es útil cuando solo deseas obtener un número específico de registros, como en la paginación de resultados. En SQL Server, se utiliza TOP de la siguiente manera:

```sql
SELECT TOP n columnas
FROM tabla;
```

3. **WHERE**:
La cláusula WHERE se utiliza para filtrar los resultados de una consulta en función de condiciones especificadas. Puedes utilizar operadores lógicos como AND y OR para combinar múltiples condiciones. La sintaxis básica es:

```sql
SELECT columnas
FROM tabla
WHERE condicion;
```

4. **GROUP BY**:
La cláusula GROUP BY se utiliza para agrupar filas en función de los valores de una o más columnas. Se utiliza con funciones de agregación como COUNT, SUM, AVG, etc., para realizar cálculos sobre grupos de filas. La estructura es:

```sql
SELECT columna1, funcion_agregacion(columna2)
FROM tabla
GROUP BY columna1;
```

5. **HAVING**:
La cláusula HAVING se utiliza en combinación con GROUP BY para filtrar grupos basados en condiciones de agregación. Te permite aplicar condiciones a los resultados de las funciones de agregación. La sintaxis es similar a la de WHERE:

```sql
SELECT columna1, funcion_agregacion(columna2)
FROM tabla
GROUP BY columna1
HAVING condicion;
```


