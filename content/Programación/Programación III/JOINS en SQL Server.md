# JOINS en SQL Server

%%
Date:: [[2023-08-23]]
Course:: [[Programación III]]
Source:: [[]]
%%

Es un modificador para las [[Sentencias Básicas de SQL Server]], que nos permite juntar más de una tabla.

![[Pasted image 20230823192005.png]]

1. **INNER JOIN**:
El INNER JOIN devuelve solo los registros que tienen coincidencias en ambas tablas. En otras palabras, se combinan las filas de ambas tablas que cumplen con la condición especificada en la cláusula ON. Si no hay coincidencias, esas filas no aparecerán en el resultado.

```sql
SELECT columnas
FROM tabla1
INNER JOIN tabla2 ON tabla1.columna = tabla2.columna;
```

2. **LEFT JOIN (o LEFT OUTER JOIN)**:
El LEFT JOIN devuelve todos los registros de la tabla izquierda y los registros coincidentes de la tabla derecha. Si no hay coincidencias en la tabla derecha, los campos correspondientes tendrán valores nulos en el resultado.

```sql
SELECT columnas
FROM tabla1
LEFT JOIN tabla2 ON tabla1.columna = tabla2.columna;
```

3. **RIGHT JOIN (o RIGHT OUTER JOIN)**:
El RIGHT JOIN es similar al LEFT JOIN, pero devuelve todos los registros de la tabla derecha y los registros coincidentes de la tabla izquierda. Las filas sin coincidencias en la tabla izquierda tendrán valores nulos en el resultado.

```sql
SELECT columnas
FROM tabla1
RIGHT JOIN tabla2 ON tabla1.columna = tabla2.columna;
```

4. **FULL JOIN (o FULL OUTER JOIN)**:
El FULL JOIN devuelve todos los registros de ambas tablas, junto con las coincidencias. Si no hay coincidencias en una tabla, los campos correspondientes tendrán valores nulos en el resultado.

```sql
SELECT columnas
FROM tabla1
FULL JOIN tabla2 ON tabla1.columna = tabla2.columna;
```

5. **CROSS JOIN**:
El CROSS JOIN realiza una combinación de todas las filas de la tabla izquierda con todas las filas de la tabla derecha, generando un producto cartesiano. No requiere una condición ON, por lo que devuelve todas las combinaciones posibles.

```sql
SELECT columnas
FROM tabla1
CROSS JOIN tabla2;
```

