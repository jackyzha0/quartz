--SELECT p.ProductID, avg(od.UnitPrice) FROM Orders o 
--INNER JOIN [Order Details] od ON od.OrderID = o.OrderID 
--INNER JOIN Products p ON p.ProductID = od.ProductID
--GROUP BY p.ProductID;


CREATE PROCEDURE UpdateCriticStock
AS 
DECLARE Cursor1 CURSOR FOR 
SELECT p.ProductID, p.ProductName, p.UnitsInStock  FROM Products p;
OPEN Cursor1

DECLARE @productId int, @productName nvarchar(40), @unitsInStock int, @avgStock float;

DELETE FROM CriticStock;

FETCH NEXT FROM Cursor1 INTO @productId, @productName, @unitsInStock
WHILE @@FETCH_STATUS = 0
BEGIN
	SELECT @avgStock = avg(od.UnitPrice) FROM Orders o 
	INNER JOIN [Order Details] od ON od.OrderID = o.OrderID 
	INNER JOIN Products p ON p.ProductID = od.ProductID
	WHERE p.ProductID  = @productId
	GROUP BY p.ProductID;

	IF @unitsInStock < @avgStock
	BEGIN 
		INSERT INTO CriticStock VALUES (@productId, @unitsInStock, @avgStock)
	END
	
	FETCH NEXT FROM Cursor1 INTO @productId, @productName, @unitsInStock
END
CLOSE Cursor1;
DEALLOCATE Cursor1;


SELECT p.ProductName , cs.InStock , cs.AvgSellQuantity  FROM CriticStock cs
INNER JOIN Products p ON p.ProductID = cs.ProductID ;






