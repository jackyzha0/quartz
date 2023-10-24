CREATE PROCEDURE VentasAcumuladas @CustomerID nchar(5)
AS 
BEGIN 
	DECLARE Cursor1 CURSOR FOR
SELECT 
	o.OrderID, 
	o.OrderDate,  
	od.UnitPrice*od.Quantity AS 'price'
FROM Orders o 
INNER JOIN [Order Details] od ON od.OrderID = o.OrderID 
INNER JOIN Customers c ON c.CustomerID = o.CustomerID
WHERE c.CustomerID  = @CustomerID;

DECLARE @currOrder int, @order int, @orderDate datetime, @totalPrice money, @rowPrice money
OPEN Cursor1;

SET @currOrder = 0;
SET @totalPrice = 0;

FETCH NEXT FROM Cursor1 INTO  @order, @orderDate, @rowPrice;
print('Numero_Orden    Total   Fecha')
WHILE @@FETCH_STATUS = 0
	BEGIN 
		
		IF @order = @currOrder OR @currOrder = 0
			BEGIN
				SET @currOrder = @order
				SET @totalPrice = @totalPrice + @rowPrice
			END
		ELSE 
			BEGIN 
				SET @currOrder = @order
				PRINT (CONVERT(char, @order) + CONVERT(char, @totalPrice) +'    ' +CONVERT(char, @orderDate))
			END
			
			
		FETCH NEXT FROM Cursor1 INTO  @order, @orderDate, @totalPrice;
	END
CLOSE Cursor1;
DEALLOCATE Cursor1
END


EXEC VentasAcumuladas 'ANTON';

