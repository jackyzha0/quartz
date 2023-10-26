-- 1.a Dado un cliente(parámetro) listar todos los vendedores que lo atendieron 
--indicando el monto total de las transacciones.

CREATE PROCEDURE totalsell_of_client @client_id nchar(5)
AS 
SELECT e.FirstName, sum(od.Quantity*od.UnitPrice)  FROM Customers c 
JOIN Orders o ON o.CustomerID = c.CustomerID 
JOIN [Order Details] od ON od.OrderID = o.OrderID 
JOIN Employees e ON e.EmployeeID = o.EmployeeID 
WHERE c.CustomerID = @client_id
GROUP BY e.FirstName;

EXEC totalsell_of_client @client_id = 'ANTON';

-- 1.b Dado un producto y dos fechas (parámetros) indicar todas las ventas que hicieron 
--sobre ese producto totalizando por vendedor.

CREATE PROCEDURE sells_per_employee 
@start_date date,
@end_date date,
@product_name nvarchar(40)
AS
SELECT e.EmployeeID, e.FirstName,  sum(od.UnitPrice*od.Quantity) FROM Orders o
INNER JOIN [Order Details] od ON od.OrderID = o.OrderID 
INNER JOIN Products p ON p.ProductID = od.ProductID 
INNER JOIN Employees e ON e.EmployeeID  = o.EmployeeID 
WHERE o.OrderDate >= @start_date
	AND o.OrderDate <= @end_date
	AND p.ProductName = @product_name
GROUP BY e.EmployeeID, e.FirstName ;

sells_per_employee @start_date = '1995/01/01', @end_date = '1999/01/01', @product_name = 'Chai'


-- 1.c Dado un vendedor y un cliente, indicar los productos vendidos al cliente indicando
--cuantos vendieron. La lista debe estar ordenada en forma descendente en
--función de las cantidades vendidas

CREATE PROCEDURE products_by_client
@employee_id int,
@customer_id nchar(5)
AS 
SELECT p.ProductName , SUM(od.Quantity) AS total_quantity  FROM Orders o 
INNER JOIN Employees e ON e.EmployeeID = o.EmployeeID 
INNER JOIN Customers c ON c.CustomerID = o.CustomerID 
INNER JOIN [Order Details] od ON od.OrderID = o.OrderID 
INNER JOIN Products p ON p.ProductID = od.ProductID 
WHERE o.EmployeeID = @employee_id AND c.CustomerID = @customer_id
GROUP BY p.ProductName
ORDER BY total_quantity DESC;

products_by_client @employee_id = 3, @customer_id = 'ANTON'

-- 2.a Dado un producto (parámetro) devolver el precio promedio de ese producto.

CREATE  FUNCTION precioPromedio
(@product_id int)
RETURNS float
AS 
BEGIN
	
	DECLARE @avg_price float;

	SELECT @avg_price=avg(od.UnitPrice) FROM [Order Details] od 
	INNER JOIN Products p ON p.ProductID = od.ProductID 
	WHERE p.ProductID = @product_id;

	RETURN @avg_price;
	
END

SELECT p.ProductName, dbo.precioPromedio(p.ProductID) FROM Products p;

-- 2.b Dado un cliente (parámetro) devolver el total vendido a ese cliente

CREATE FUNCTION totalVendidoXCliente
(@customer_id nchar(5) )
RETURNS float
AS
BEGIN
	
	DECLARE @total_sell float;
	
	SELECT @total_sell=sum(od.UnitPrice*od.Quantity) FROM Orders o
	INNER JOIN [Order Details] od ON o.OrderID = od.OrderID
	WHERE o.CustomerID = @customer_id;
	
	RETURN @total_sell;
END

SELECT c.CompanyName, dbo.totalVendidoXCliente(c.CustomerID) FROM Customers c 

--2.c Dado un vendedor(parámetro) indicar el número total de clientes atendidos 

CREATE FUNCTION cantidadClientesAtendidos
(@employee_id int)
RETURNS int
AS
BEGIN 
	DECLARE @n_clientes int
	
	SELECT @n_clientes=count(DISTINCT (o.CustomerID))  FROM Orders o 
	WHERE o.EmployeeID = @employee_id;

	RETURN @n_clientes;
END

SELECT e.FirstName, e.LastName, dbo.cantidadClientesAtendidos(e.EmployeeID) FROM Employees e 

-- 3.a Listar vendedor, cliente atendido por el vendedor, total vendido al cliente

SELECT 
	e.FirstName AS "Vendedor_Nombre",
	e.LastName AS "Vendedor_Apellido",
	c.CompanyName,
	dbo.totalVendidoXCliente(c.CustomerID)
FROM Orders o 
INNER JOIN Customers c ON o.CustomerID = c.CustomerID 
INNER JOIN Employees e ON e.EmployeeID = o.EmployeeID 

-- 3.b Listar un ranking de vendedores: nombre y cantidad de clientes atendidos.

SELECT
	e.FirstName,
	e.LastName,
	dbo.cantidadClientesAtendidos(e.EmployeeID)
FROM Employees e
ORDER BY dbo.cantidadClientesAtendidos(e.EmployeeID) DESC;





