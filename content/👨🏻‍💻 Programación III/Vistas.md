# Vistas

%%
Date:: [[2023-09-20]]
Course:: [[Programación III]]
Source:: [[]]
%%

Las vistas en T-SQL **son tablas virtuales** que se derivan de una o más tablas existentes en una base de datos. En otras palabras, una vista no almacena datos físicamente, sino que es una consulta predefinida que se ejecuta cada vez que se accede a ella. La vista se define utilizando una consulta SELECT, y una vez definida, puede ser tratada como cualquier otra tabla en la base de datos, permitiendo que se realicen consultas, actualizaciones y eliminaciones de registros. Algunas características de las vistas en T-SQL son:

- La consulta que define la vista puede provenir de una o varias tablas, o bien de otras vistas de la base de datos actual u otras bases de datos.
- Las vistas pueden utilizarse para proporcionar una interfaz compatible con versiones anteriores con el fin de emular una tabla que existía pero cuyo esquema ha cambiado.
- Las vistas pueden mejorar el rendimiento de la base de datos al reducir la cantidad de datos que se acceden y la complejidad de las consultas.

La sintaxis para crear una vista en T-SQL es la siguiente:

```SQL
CREATE VIEW nombre_vista
AS
SELECT columna1, columna2, ...
FROM tabla1
WHERE condicion;
```

Donde "nombre_vista" es el nombre que se le dará a la vista, "columna1, columna2, ..." son las columnas que se seleccionarán de la tabla o tablas subyacentes, "tabla1" es la tabla o tablas subyacentes, y "condicion" es una condición opcional que se puede utilizar para filtrar los datos.

A continuación, se muestra un ejemplo de creación de una vista en T-SQL:

```SQL
CREATE VIEW vista_clientes
AS
SELECT CustomerID, CompanyName, ContactName
FROM Customers
WHERE Country = 'Mexico';
```

Este ejemplo crea una vista llamada "vista_clientes" que selecciona las columnas "CustomerID", "CompanyName" y "ContactName" de la tabla "Customers", pero solo para los registros cuyo país sea "Mexico". Una vez creada la vista, se puede utilizar como cualquier otra tabla en la base de datos:

```SQL
SELECT * FROM vista_clientes;
```

Esta consulta devolverá todos los registros de la vista "vista_clientes".
