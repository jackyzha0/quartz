ALTER FUNCTION funcEvalVentas (@limit money)
RETURNS @ventas TABLE (
    orderId int,
    productId int,
    montoVenta money,
    evalMonto varchar(50)
)
AS
BEGIN
	INSERT INTO @ventas
    SELECT 
		o.OrderID, 
		od.ProductID,
		od.Quantity*od.UnitPrice AS 'montoVenta',
		dbo.evalMonto(od.Quantity*od.UnitPrice, @limit) AS 'evalMonto'
	FROM Orders o 
	INNER JOIN [Order Details] od ON o.OrderID = od.OrderID 
    RETURN
END

SELECT * FROM funcEvalVentas(100);




-----------

SELECT 
	o.OrderID, 
	od.ProductID,
	od.Quantity*od.UnitPrice AS 'montoVenta',
	dbo.evalMonto(od.Quantity*od.UnitPrice, 100) AS 'evalMonto',
	c.CompanyName ,
	o.OrderDate 
FROM Orders o 
INNER JOIN [Order Details] od ON o.OrderID = od.OrderID 
INNER JOIN Customers c ON c.CustomerID = o.CustomerID 
WHERE o.OrderDate BETWEEN '1996-07-05' AND '2023-07-07'


ALTER PROCEDURE ventasMayorMenor (
	@lower_date date,
	@upper_date date,
	@limit money,
	@key nvarchar(10)
)
AS 
BEGIN
	SELECT * FROM (
		SELECT 
			o.OrderID, 
			od.ProductID,
			od.Quantity*od.UnitPrice AS 'montoVenta',
			dbo.evalMonto(od.Quantity*od.UnitPrice, @limit) AS 'evalMonto',
			c.CompanyName ,
			o.OrderDate 
		FROM Orders o 
		INNER JOIN [Order Details] od ON o.OrderID = od.OrderID 
		INNER JOIN Customers c ON c.CustomerID = o.CustomerID 
		WHERE o.OrderDate BETWEEN @lower_date AND @upper_date) AS _
	WHERE evalMonto LIKE @key
END

EXEC ventasMayorMenor '1996-07-05', '2023-07-07', 200, 'mayor'

-------------
--SELECT 
--	o.OrderID, 
--	od.ProductID,
--	od.Quantity*od.UnitPrice AS 'montoVenta',
--	dbo.evalMonto(od.Quantity*od.UnitPrice, 100) AS 'evalMonto'
--INTO evalVentasTable  
--FROM Orders o 
--INNER JOIN [Order Details] od ON o.OrderID = od.OrderID 
--WHERE 1=0;


CREATE PROCEDURE evalVentas(@limit money)
AS 
BEGIN 
	DECLARE @productId int;
	DECLARE @montoVenta money;
	DECLARE @msg varchar(10);
	
	DECLARE eval_cursor CURSOR FOR 
	SELECT 
		o.OrderID, 
		od.ProductID,
		od.Quantity*od.UnitPrice AS 'montoVenta'FROM Orders o 
	INNER JOIN [Order Details] od ON o.OrderID = od.OrderID 
	OPEN eval_cursor;
	
	DECLARE @orderId int;
	
	DELETE FROM evalVentasTable;
	
	FETCH NEXT FROM eval_cursor INTO @orderId, @productId, @montoVenta;
	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @msg = 'mayor';
		
		IF @limit >= @montoVenta
		BEGIN 
			SET @msg = 'menor'
		END
		
		INSERT INTO evalVentasTable VALUES (@orderId, @productId, @montoVenta, @msg)
		FETCH NEXT FROM eval_cursor INTO @orderId, @productId, @montoVenta;
	END;
	
	CLOSE eval_cursor;
	DEALLOCATE eval_cursor;
	
	SELECT * FROM evalVentasTable;
END

EXEC evalVentas 100;




