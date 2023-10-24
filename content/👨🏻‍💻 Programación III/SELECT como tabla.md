# SELECT como tabla

%%
Date:: [[2023-09-27]]
Course:: [[]]
Source:: [[Programación III]]
%%

- Podemos utilizar comandos SELECT como tablas y realizar [[JOINS en SQL Server]]

### Snippet
```sql
SELECT c.CompanyName, c.Country, tabla.total FROM Customers c JOIN 
(SELECT o.CustomerID , SUM(od.UnitPrice*od.Quantity) total  FROM Products p 
JOIN [Order Details] od ON od.ProductID = p.ProductID 
JOIN Orders o ON o.OrderID = od.OrderID 
JOIN Employees e ON e.EmployeeID = o.EmployeeID 
GROUP BY o.CustomerID ) AS tabla
ON tabla.CustomerID = c.CustomerID 
```

