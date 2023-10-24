# Sentencias Básicas de SQL

%%
Date:: [[2023-08-23]]
Course:: [[Programación III]]
Source:: [[]]
%%

1. **SELECT**:
La sentencia SELECT se utiliza para recuperar datos de una base de datos. Permite especificar qué columnas deseas recuperar y en qué filas estás interesado. También puedes aplicar filtros y condiciones utilizando la cláusula WHERE para limitar los resultados según ciertos criterios. La estructura básica de una consulta SELECT es:

```sql
SELECT columnas
FROM tabla
WHERE condiciones;
```

2. **INSERT**:
La sentencia INSERT se utiliza para agregar nuevos registros a una tabla. Indicas en qué tabla deseas insertar datos y proporcionas los valores para cada columna correspondiente. La sintaxis básica es:

```sql
INSERT INTO tabla (columna1, columna2, ...)
VALUES (valor1, valor2, ...);
```

3. **UPDATE**:
La sentencia UPDATE se utiliza para modificar los datos existentes en una tabla. Puedes actualizar uno o varios registros y especificar qué columnas deseas modificar, junto con los nuevos valores. También se usa con la cláusula WHERE para indicar qué registros deben actualizarse. La estructura básica es:

```sql
UPDATE tabla
SET columna1 = valor1, columna2 = valor2, ...
WHERE condiciones;
```

4. **DELETE**:
La sentencia DELETE se utiliza para eliminar registros de una tabla. Al igual que con UPDATE, puedes especificar condiciones para determinar qué registros deben eliminarse. La estructura básica es:

```sql
DELETE FROM tabla
WHERE condiciones;
```

