-- Borrar una tabla
DROP TABLE Products;


-- "BEGIN TRANSACTION" nos permite luego hacer un rollback si no queremos realizar la transacción
BEGIN TRANSACTION 
DELETE Products WHERE ProductID > 78;

ROLLBACK TRANSACTION; 
COMMIT TRANSACTION ;


-- Insertar una fila más en la tabla de productos
 INSERT INTO Products ( ProductName, UnitPrice)
 VALUES ('Computadora', 150),('Computadora', 150);


-- Utilizamos el "LIKE" para comparar strings
SELECT * FROM Products p 
WHERE p.ProductName LIKE 'Comp%';

--ProductID|ProductName|SupplierID|CategoryID|QuantityPerUnit|UnitPrice|UnitsInStock|UnitsOnOrder|ReorderLevel|Discontinued|
-----------+-----------+----------+----------+---------------+---------+------------+------------+------------+------------+
--       78|Computadora|          |          |               | 150.0000|           0|           0|           0|           0|
--       79|Computadora|          |          |               | 150.0000|           0|           0|           0|           0|
--       80|Computadora|          |          |               | 150.0000|           0|           0|           0|           0|

-- Modificar ciertos campos de la tabla
BEGIN TRANSACTION 
UPDATE Products SET UnitsInStock = 150, UnitsOnOrder = 7
WHERE ProductID = 1;
ROLLBACK TRANSACTION; -- Undo


-- GROUP BY
SELECT p.ProductName, AVG(od.UnitPrice), MAX(od.UnitPrice), MIN(od.UnitPrice)  FROM Products p 
JOIN [Order Details] od ON p.ProductID = od.ProductID
WHERE od.UnitPrice > 20 -- Antes de realizar el cálculo del avg
GROUP BY P.ProductName 
HAVING AVG(od.UnitPrice) < 40 -- Luego de realizar el cálculo
ORDER BY p.ProductName;


--ProductName                     |       |       |       |
----------------------------------+-------+-------+-------+
--Alice Mutton                    |36.4702|39.0000|31.2000|
--Camembert Pierrot               |32.1333|34.0000|27.2000|
--Chef Anton's Cajun Seasoning    |22.0000|22.0000|22.0000|
--Chef Anton's Gumbo Mix          |21.3500|21.3500|21.3500|
--Flotemysost                     |21.5000|21.5000|21.5000|
--Gnocchi di nonna Alice          |35.4160|38.0000|30.4000|
--Grandma's Boysenberry Spread    |25.0000|25.0000|25.0000|
--Gravad lax                      |23.4000|26.0000|20.8000|


-- Cuáles son los productos que no facturaron?
SELECT * FROM Products p LEFT JOIN [Order Details] od ON p.ProductID = od.ProductID 
WHERE od.OrderID IS NULL;









