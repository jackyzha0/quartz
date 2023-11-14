-- Cuántos clientes tenemos?
SELECT COUNT(*) n_clients FROM Customers c;

-- Cuál es la edad promedio de los empleados?
SELECT  avg(DATEDIFF(YEAR,  BirthDate, GETDATE())) AS avgDate FROM Employees e;

-- Cuantos clientes compraron el producto “Queso Cabrales”?
SELECT DISTINCT count(c.CompanyName)  FROM Customers c 
INNER JOIN Orders o ON o.CustomerID  = c.CustomerID 
INNER JOIN [Order Details] od ON od.OrderID = o.OrderID 
INNER JOIN Products p ON p.ProductID = od.ProductID 
WHERE p.ProductName = 'Queso Cabrales';

-- Cual fue el promedio de precios al que se vendió el queso cabrales entre el 03/09/1996 y el 04/11/1996.
SELECT avg(od.UnitPrice) FROM Orders o 
INNER JOIN [Order Details] od ON o.OrderID = od.OrderID 
INNER JOIN Products p ON p.ProductID = od.ProductID 
WHERE p.ProductName = 'Queso Cabrales' 
	AND o.OrderDate >= CAST ('1996/09/03' AS datetime) 
	AND o.OrderDate <= CAST ('1996/11/04' AS datetime);

-- Cuantos son los clientes del vendedor de apellido “King”.
SELECT DISTINCT count(c.CompanyName) FROM Customers c
INNER JOIN Orders o ON o.CustomerID  = c.CustomerID 
INNER JOIN Employees e ON e.EmployeeID = o.EmployeeID
WHERE e.LastName = 'King';


