-- Ejercicio 1


CREATE FUNCTION calcDescuento(
	@lista money,
	@venta money
)
RETURNS float
AS 
BEGIN
	DECLARE @desc float = (@venta - @lista)/@lista
	RETURN @desc
END

ALTER PROCEDURE descExcesivos(@lim int)
AS
BEGIN
	SELECT * FROM (
		SELECT 
			p.UnitPrice AS 'precioLista',
			od.UnitPrice AS 'precioVenta',
			dbo.calcDescuento(p.UnitPrice,od.UnitPrice) AS 'descuento'
		FROM Orders o 
		INNER JOIN [Order Details] od ON od.OrderID = o.OrderID
		INNER JOIN Products p ON p.ProductID = od.ProductID) AS _ 
		WHERE descuento > @lim;
END

EXEC descExcesivos -0.05 

-- Ejercicio 2


CREATE VIEW ventasTotalesClientes
AS 
SELECT c.CustomerID, c.CompanyName, ventas.total FROM (
	SELECT o.CustomerID, sum(od.Quantity * od.UnitPrice ) AS 'total' 
	FROM Orders o 
	INNER JOIN [Order Details] od ON od.OrderID = o.OrderID 
	GROUP BY o.CustomerID
) AS ventas
JOIN Customers c ON c.CustomerID = ventas.CustomerID;

SELECT * FROM ventasTotalesClientes;


-- Ejercicio 3

-- apartado "a"
SELECT c.CustomerID, c.CompanyName 
INTO Clientes
FROM Customers c;

-- apartado "b"
INSERT INTO Clientes VALUES 
('VALEN', 'Valentín'), 
('EZE', 'Ezequiel'),
('FEDE', 'Federico')

-- apartado "c"
ALTER TRIGGER conFactura
ON Clientes
AFTER DELETE 
AS
IF EXISTS (
		SELECT * FROM Orders o JOIN deleted
		ON deleted.CustomerID = o.CustomerID 
	)
	BEGIN
		RAISERROR ('Error elminando el cliente, posee factura.', 16, 1)
		ROLLBACK TRANSACTION;
		RETURN
	END

DELETE FROM Clientes 
WHERE CustomerID = 'ANTON';

DROP TABLE Clientes;

--IF EXISTS(SELECT * FROM Orders o
--WHERE o.CustomerID LIKE 'ANTON')
--BEGIN 
--	PRINT ('EXISTE')
--END
--ELSE 
--BEGIN 
--	PRINT('NO EXISTE')
--END

























