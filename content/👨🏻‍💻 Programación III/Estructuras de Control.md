# Estructuras de Control

%%
Date:: [[2023-09-20]]
Course:: [[Programación III]]
Source:: [[]]
%%

En T-SQL, existen varias estructuras de control de flujo que permiten controlar el flujo de ejecución de un programa. A continuación, se describen algunas de las más comunes, junto con un ejemplo de código para cada una de ellas:

- **if...else**: Esta estructura permite ejecutar un bloque de código si se cumple una condición, y otro bloque de código si no se cumple. Por ejemplo:

```SQL
DECLARE @num INT = 10;

IF @num > 0
BEGIN
    PRINT 'El número es positivo';
END
ELSE
BEGIN
    PRINT 'El número es negativo o cero';
END
```

- **try...catch**: Esta estructura permite manejar errores que puedan ocurrir durante la ejecución de un bloque de código. En caso de que ocurra un error, se ejecuta un bloque de código específico para manejar el error. Las variables de error que existen en SQL son: error_number, error_state, error_severity, error_procedure, error_line, error_message. Por ejemplo:

```SQL
BEGIN TRY
    SELECT 1/0;
END TRY
BEGIN CATCH
    SELECT 
        ERROR_NUMBER() AS ErrorNumber,
        ERROR_STATE() AS ErrorState,
        ERROR_SEVERITY() AS ErrorSeverity,
        ERROR_PROCEDURE() AS ErrorProcedure,
        ERROR_LINE() AS ErrorLine,
        ERROR_MESSAGE() AS ErrorMessage;
END CATCH;
```

- **transactions**: Esta estructura permite agrupar un conjunto de operaciones en una transacción, de manera que si alguna de las operaciones falla, se pueden deshacer todas las operaciones realizadas hasta ese momento. Por ejemplo:

```SQL
BEGIN TRANSACTION;

UPDATE Customers SET ContactName = 'Juan' WHERE CustomerID = 1;
INSERT INTO Orders (CustomerID, OrderDate) VALUES (1, GETDATE());

COMMIT TRANSACTION;
```

- **while**: Esta estructura permite ejecutar un bloque de código mientras se cumpla una condición. Por ejemplo:

```SQL
DECLARE @num INT = 0;

WHILE @num < 10
BEGIN
    PRINT @num;
    SET @num = @num + 1;
END
```

- **case**: Esta estructura permite ejecutar un bloque de código dependiendo del valor de una expresión. Por ejemplo:

```SQL
DECLARE @num INT = 2;

SELECT 
    CASE 
        WHEN @num = 1 THEN 'Uno'
        WHEN @num = 2 THEN 'Dos'
        WHEN @num = 3 THEN 'Tres'
        ELSE 'Otro'
    END AS NumeroEnLetras;
```

- **raiserror**: Esta estructura permite generar un error personalizado. Por ejemplo:

```SQL
DECLARE @num INT = -1;

IF @num < 0
BEGIN
    RAISERROR('El número debe ser positivo', 16, 1);
END
```

