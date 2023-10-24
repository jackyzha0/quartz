
%%
Date:: [[2023-09-27]]
Course:: [[]]
Source:: [[]]
%%

# SELECT INTO

La cláusula SELECT INTO en T-SQL se utiliza para crear una nueva tabla a partir de una tabla existente, copiando las columnas de la tabla existente. La sintaxis básica de la cláusula SELECT INTO es la siguiente:

```sql
SELECT column1, column2, ...
INTO new_table
FROM old_table
WHERE condition;
```

- `column1, column2, ...`: Las columnas que se copiarán en la nueva tabla.
- `new_table`: El nombre de la nueva tabla que se creará.
- `old_table`: La tabla existente de la cual se copiarán las columnas.
- `condition` (opcional): Una condición que especifica qué filas se copiarán en la nueva tabla.

A continuación, se muestra un ejemplo de cómo utilizar la cláusula SELECT INTO para copiar una tabla existente en una nueva tabla:

```sql
SELECT *
INTO customers_backup
FROM customers;
```

En este ejemplo, se crea una nueva tabla llamada `customers_backup` que contiene todas las columnas y filas de la tabla existente `customers`.

# INSERT...SELECT

La cláusula INSERT...SELECT en T-SQL se utiliza para insertar datos de una tabla existente en otra tabla. La sintaxis básica de la cláusula INSERT...SELECT es la siguiente:

```sql
INSERT INTO new_table (column1, column2, ...)
SELECT column1, column2, ...
FROM old_table
WHERE condition;
```

- `new_table`: El nombre de la tabla en la que se insertarán los datos.
- `column1, column2, ...`: Las columnas de la tabla en la que se insertarán los datos.
- `old_table`: La tabla existente de la cual se copiarán las columnas.
- `condition` (opcional): Una condición que especifica qué filas se copiarán en la nueva tabla.

A continuación, se muestra un ejemplo de cómo utilizar la cláusula INSERT...SELECT para insertar datos de una tabla existente en otra tabla:

```sql
INSERT INTO customers_backup (CustomerID, CompanyName, ContactName)
SELECT CustomerID, CompanyName, ContactName
FROM customers
WHERE Country = 'Mexico';
```

En este ejemplo, se insertan los datos de las columnas "CustomerID", "CompanyName" y "ContactName" de la tabla "customers" en la tabla "customers_backup", pero solo para los registros cuyo país sea "Mexico". La cláusula INSERT...SELECT también se puede utilizar para insertar datos de varias tablas en una sola tabla.


## Ejemplo de clase
Continuando con el ejemplo de ![[SELECT como tabla#Snippet]]
Lo podemos guardar en una tabla externa
```sql
SELECT * INTO compradoXcliente FROM
(SELECT c.CompanyName, c.Country, tabla.total FROM Customers c JOIN 
	(SELECT o.CustomerID , SUM(od.UnitPrice*od.Quantity) total  FROM Products p 
	JOIN [Order Details] od ON od.ProductID = p.ProductID 
	JOIN Orders o ON o.OrderID = od.OrderID 
	JOIN Employees e ON e.EmployeeID = o.EmployeeID 
	GROUP BY o.CustomerID ) AS tabla
	ON tabla.CustomerID = c.CustomerID 
) AS tabla2
```