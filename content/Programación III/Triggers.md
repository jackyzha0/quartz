# Triggers

%%
Date:: [[2023-09-27]]
Course:: [[Programación III]]
Source:: [[]]
%%

- Son "disparadores", programas que se ejecutan de forma automática. 
- Existen varios tipos, ahora veremos los DML. Cuando hago un INSERT, UPDATE o DELETE; **el trigger se dispara y realizaremos algo**.

Un trigger o disparador en SQL Server es un tipo especial de procedimiento almacenado que se ejecuta automáticamente cuando se produce un evento en la base de datos. Los triggers se asocian a una tabla y consisten en una serie de reglas predefinidas que se aplican a la base de datos cuando se realizan determinadas operaciones en la tabla, como añadir, actualizar o eliminar registros. 

Un ejemplo de trigger en SQL Server podría ser un trigger que se active después de insertar un nuevo registro en una tabla de ventas. Este trigger podría actualizar automáticamente el campo "total" de la tabla de ventas con la suma de los precios de los conceptos de venta asociados a esa venta. 

La sintaxis para crear un trigger en SQL Server es la siguiente:

```sql
CREATE TRIGGER nombre_trigger
ON nombre_tabla
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    -- Código del trigger aquí
END
```

En este ejemplo, "nombre_trigger" es el nombre que le damos al trigger, "nombre_tabla" es el nombre de la tabla a la que se asocia el trigger, y "AFTER INSERT, UPDATE, DELETE" indica que el trigger se activará después de insertar, actualizar o eliminar registros en la tabla. El código del trigger se escribe dentro del bloque "BEGIN...END".


## Ejemplo

```sql
CREATE TRIGGER Tr_Comprado
ON compradoXcliente -- A que tabla?
FOR INSERT  -- Por cuál acción?
AS 
	PRINT ('Se insertó un movimiento.')
```

## Tablas del trigger
- Cuando se utiliza un trigger, se crean dos tablas llamadas `inserted` y `deleted`
```sql
CREATE TRIGGER Tr_Comprado
ON compradoXcliente -- A que tabla?
FOR INSERT  -- Por cuál acción?
AS 
	SELECT inserted.Companyname FROM inserted;
```

