# Funciones Tabla en SQL

%%
Date:: [[2023-09-06]]
Course:: [[Programación III]]
Source:: [[]]
%%

Las funciones tabla en SQL Server son funciones definidas por el usuario que retornan una tabla como resultado[1][2]. Estas funciones se pueden utilizar en lugar de la cláusula FROM de una consulta y son similares a un procedimiento almacenado, pero con la diferencia de que la tabla retornada por la función puede ser referenciada en la cláusula FROM de una consulta[1]. La sintaxis básica para crear una función tabla en SQL Server es la siguiente:

```sql
CREATE FUNCTION nombre_funcion (@parametro tipo_dato)
RETURNS @nombre_tabla_retorno TABLE (
    campo1 tipo_dato,
    campo2 tipo_dato,
    campo3 tipo_dato
)
AS
BEGIN
    -- Código de la función
END
```

Donde `nombre_funcion` es el nombre que se le dará a la función, `@parametro` es el parámetro de entrada de la función y `tipo_dato` es el tipo de dato del parámetro de entrada. `@nombre_tabla_retorno` es el nombre de la tabla que se retornará y `campo1`, `campo2` y `campo3` son los nombres de los campos de la tabla y su respectivo tipo de dato[1].

Un ejemplo de implementación de una función tabla en SQL Server es el siguiente:

```sql
CREATE FUNCTION obtenerEmpleadosPorDepartamento (@departamento varchar(50))
RETURNS @empleados TABLE (
    id int,
    nombre varchar(50),
    apellido varchar(50),
    departamento varchar(50)
)
AS
BEGIN
    INSERT INTO @empleados
    SELECT id, nombre, apellido, departamento
    FROM empleados
    WHERE departamento = @departamento
    RETURN
END
```

En este ejemplo, se crea una función llamada `obtenerEmpleadosPorDepartamento` que recibe como parámetro de entrada un valor de tipo `varchar(50)` llamado `@departamento`. La función retorna una tabla llamada `@empleados` que contiene los campos `id`, `nombre`, `apellido` y `departamento` de los empleados que pertenecen al departamento especificado. Para utilizar esta función, se puede ejecutar la siguiente sentencia:

```sql
SELECT * FROM dbo.obtenerEmpleadosPorDepartamento('Ventas')
```

Esta sentencia devuelve una tabla con los empleados que pertenecen al departamento de Ventas.

Citations:
[1] https://www.tutorialesprogramacionya.com/sqlserverya/temarios/descripcion.php?cod=142&punto=136
[2] https://www.kyocode.com/2019/07/funciones-escalares-sql-server/
[3] https://www.ibm.com/docs/es/db2/11.1?topic=elements-functions
[4] https://www.juntadeandalucia.es/servicios/madeja/contenido/recurso/107
[5] https://learn.microsoft.com/es-es/sql/relational-databases/user-defined-functions/create-user-defined-functions-database-engine?view=sql-server-ver16
[6] https://www.ibm.com/docs/es/SSEPGG_11.1.0/com.ibm.db2.luw.sql.ref.doc/doc/r0003493.html
