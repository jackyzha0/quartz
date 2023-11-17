--1. Desarrolle una función escalar Accion(ProductId) en el que ingrese un código de productos y devuelva el literal:

-- Si UnitinStock=0 mostrar ‘Comprar ya’
-- si UnitInStock entre 1 y 30 mostrar ‘Comprar en unos dias’
-- si UnitInStock mayor que 30 mostrar “No Comprar”

--Luego, genere una Consulta listando, Nombre del producto, stock, Accion(Productid).

--Debe usar sentencias if


CREATE FUNCTION Accion(@product_id int)
RETURNS nvarchar(20)
AS 
BEGIN
	DECLARE @msg nvarchar(20)
	DECLARE @UnitsInStock smallint
	
	SELECT @UnitsInStock=p.UnitsInStock FROM Products p
	WHERE p.ProductID = @product_id;

	IF (@UnitsInStock = 0)
		SET @msg='Comprar ya!'
		
	IF (@UnitsInStock >= 1 AND @UnitsInStock < 30)
		SET @msg='Comprar en 2 dias'
		
	IF (@UnitsInStock >= 30)
		SET @msg='No comprar'
		
	RETURN @msg;
END;

SELECT dbo.Accion(p.ProductID) FROM Products p;


-- 2. Genere una consulta en la que califique a los clientes en función del monto comprado. 
-- Si compró menos de 10.000 pesos “cliente sin importancia”
-- si compró mas que 20.000 pesos “cliente importante”

SELECT c.CompanyName, 
	CASE WHEN sum(od.UnitPrice*od.Quantity) < 20000 THEN 'Cliente sin importancia.' 
		WHEN sum(od.UnitPrice*od.Quantity) >= 2000 THEN 'Cliente importante.' 
	END FROM Orders o 
INNER JOIN [Order Details] od ON o.OrderID = od.OrderID 
INNER JOIN Customers c ON c.CustomerID = o.CustomerID
GROUP BY o.CustomerID, c.CompanyName;


--3. Cree una tabla con los siguientes campos:

--VentaId. (autoincremental)
--NombreCliente
--Código Cliente
--TotalVendido

--Luego cree un procedimiento en el cual ingrese el código de un cliente e
--inserte un registro en la tabla con los datos que ella pide. El campo
--TotalVendido se refiere al total vendido a ese cliente.

DROP TABLE Ventas;

SELECT  
	IDENTITY(INT,1,1) AS ID, 
	c.CompanyName, 
	c.CustomerID, 
	sum(od.Quantity*od.UnitPrice)  AS 'TotalVendido',
	GETDATE() AS 'Fecha' 
INTO Ventas FROM Orders o 
INNER JOIN [Order Details] od  ON od.OrderID = o.OrderID 
INNER JOIN Customers c ON c.CustomerID = o.CustomerID 
GROUP BY o.CustomerID, c.CompanyName, c.CustomerID;

SELECT * FROM Ventas;

ALTER PROCEDURE NuevaVenta(@customer_id nvarchar(5))
AS 
BEGIN
	DECLARE @TotalVendido money;
	DECLARE @CompanyName nvarchar(40);
	
	SELECT  
		@TotalVendido = sum(od.Quantity*od.UnitPrice),
		@CompanyName = c.CompanyName 
	FROM Orders o 
	INNER JOIN [Order Details] od  ON od.OrderID = o.OrderID 
	INNER JOIN Customers c ON c.CustomerID = o.CustomerID 
	WHERE c.CustomerID = @customer_id
	GROUP BY c.CompanyName ;

	INSERT INTO Ventas 
		(CompanyName, CustomerID, Fecha, TotalVendido) 
	VALUES (@CompanyName, @customer_id,GETDATE(), @TotalVendido)
	
END

NuevaVenta 'ANTON';

SELECT * FROM Ventas 



