# Programación 3

%%
Date:: [[2023-10-11]]
Course:: [[Programación III]]
Source:: [[]]
%%

![what is cursor in sql server Archives - Welcome to SQL Skull](https://th.bing.com/th/id/OIP.CQHk7A_4w-2JDpj202WrOgHaFu?pid=ImgDet&rs=1)

Los cursores en SQL son estructuras que permiten recorrer los resultados de una consulta de manera secuencial. En otras palabras, los cursores permiten procesar los resultados de una consulta fila por fila. La sintaxis para declarar un cursor en SQL es la siguiente:

```sql
DECLARE cursor_name CURSOR FOR select_statement;
```

Donde `cursor_name` es el nombre que se le asigna al cursor y `select_statement` es la consulta que se desea procesar. A continuación, se muestra un ejemplo de cómo utilizar un cursor en SQL:

```sql
DECLARE @product_id INT;
DECLARE @product_name VARCHAR(50);

DECLARE product_cursor CURSOR FOR
SELECT product_id, product_name
FROM products;

OPEN product_cursor;

FETCH NEXT FROM product_cursor INTO @product_id, @product_name;

WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT 'Product ID: ' + CAST(@product_id AS VARCHAR(10)) + ', Product Name: ' + @product_name;
    FETCH NEXT FROM product_cursor INTO @product_id, @product_name;
END;

CLOSE product_cursor;
DEALLOCATE product_cursor;
```

En este ejemplo, se declara un cursor llamado `product_cursor` que recorre los resultados de la consulta `SELECT product_id, product_name FROM products`. Luego, se abre el cursor con la instrucción `OPEN`, se obtiene la primera fila con la instrucción `FETCH NEXT`, y se procesa cada fila dentro del bucle `WHILE`. Finalmente, se cierra el cursor con la instrucción `CLOSE` y se libera la memoria con la instrucción `DEALLOCATE`.

