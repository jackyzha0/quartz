# Funciones Escalares

%%
Date:: [[2023-09-06]]
Course:: [[Programación III]]
Source:: [[]]
%%


Las funciones escalares en SQL Server son funciones definidas por el usuario que devuelven un valor único, como una cadena, un entero o un valor de bit[1][2]. Estas funciones se pueden crear en código administrado mediante cualquier lenguaje de programación de .NET Framework y son accesibles para Transact-SQL u otro código administrado[1]. Para crear una función escalar en SQL Server, se utiliza la sentencia CREATE FUNCTION, que permite crear nuevas funciones en la base de datos[2]. La sintaxis básica de esta sentencia es la siguiente:

```sql
CREATE FUNCTION nombre_funcion (@parametro tipo_dato)
RETURNS tipo_dato_retorno
AS
BEGIN
    -- Código de la función
END
```

Donde `nombre_funcion` es el nombre que se le dará a la función, `@parametro` es el parámetro de entrada de la función y `tipo_dato` es el tipo de dato del parámetro de entrada. `tipo_dato_retorno` es el tipo de dato que devolverá la función[2].

Un ejemplo de implementación de una función escalar en SQL Server es el siguiente:

```sql
CREATE FUNCTION calcularIVA (@precio float)
RETURNS float
AS
BEGIN
    DECLARE @iva float
    SET @iva = @precio * 0.21
    RETURN @iva
END
```

En este ejemplo, se crea una función llamada `calcularIVA` que recibe como parámetro de entrada un valor de tipo `float` llamado `@precio`. La función calcula el IVA del precio recibido y lo devuelve como un valor de tipo `float`. Para utilizar esta función, se puede ejecutar la siguiente sentencia:

```sql
SELECT dbo.calcularIVA(100)
```

Esta sentencia devuelve el valor del IVA de un precio de 100, que en este caso es 21.

Citations:
[1] https://learn.microsoft.com/es-es/sql/relational-databases/clr-integration-database-objects-user-defined-functions/clr-scalar-valued-functions?view=sql-server-ver16
[2] https://sqlearning.com/es/funciones/funciones-escalares/
[3] https://www.sqlshack.com/es/como-utilizar-las-funciones-integradas-de-sql-server-y-crear-funciones-escalares-definidas-por-el-usuario/
[4] https://youtube.com/watch?v=TjLazgOPUPE
[5] https://www.kyocode.com/2019/07/funciones-escalares-sql-server/
[6] https://www.ibm.com/docs/es/SSEPGG_11.1.0/com.ibm.db2.luw.sql.ref.doc/doc/r0003493.html