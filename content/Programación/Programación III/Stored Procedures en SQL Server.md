# Stored Procedures en SQL Server

%%
Date:: [[2023-08-23]]
Course:: [[Programación III]]
Source:: [[]]
%%

<mark style="background: #FFF3A3A6;">Siempre debemos ejecutar stored procedures desde el front-end!!!</mark>

# Procedimientos Almacenados en SQL Server

Los procedimientos almacenados son una característica esencial de SQL Server que permite encapsular lógica de negocios y tareas repetitivas en un objeto de base de datos. Son bloques de código SQL precompilado que pueden recibir parámetros y ejecutarse posteriormente mediante una llamada.

## Beneficios de los Procedimientos Almacenados

1. **Rendimiento Mejorado:** Los procedimientos almacenados se compilan y almacenan en caché, lo que mejora el rendimiento y la eficiencia de las consultas.
2. **Reutilización de Código:** Evita la duplicación de código al permitir que varias partes de una aplicación compartan la misma lógica.
3. **Seguridad:** Controla el acceso a los datos al permitir que los usuarios ejecuten solo procedimientos específicos, manteniendo la lógica dentro del servidor.
4. **Modularidad:** Divide la lógica en unidades lógicas más pequeñas y manejables, lo que facilita el mantenimiento y la escalabilidad.
5. **Reducción de Tráfico de Red:** Al ejecutarse en el servidor, los procedimientos almacenados reducen la cantidad de datos transferidos entre el cliente y el servidor.

## Creación y Uso de Procedimientos Almacenados

La creación de un procedimiento almacenado implica definir el código SQL necesario y, si es necesario, los parámetros que aceptará. Luego, el procedimiento se compila y almacena en la base de datos. Para ejecutar un procedimiento almacenado, se utiliza la sentencia EXECUTE o su forma abreviada EXEC.

### Ejemplo de Creación de Procedimiento Almacenado:

```sql
CREATE PROCEDURE NombreDelProcedimiento
    @Parametro1 TipoDeDato,
    @Parametro2 TipoDeDato
AS
BEGIN
    -- Código SQL aquí
END;
```

### Ejemplo de Uso de Procedimiento Almacenado:

```sql
EXEC NombreDelProcedimiento @Parametro1 = Valor1, @Parametro2 = Valor2;
```

## Consideraciones

- Los procedimientos almacenados pueden contener consultas SELECT, INSERT, UPDATE, DELETE y lógica de control como condicionales y bucles.
- Pueden ser utilizados en transacciones, lo que garantiza la integridad de los datos.
- Ofrecen una forma eficiente de gestionar operaciones complejas desde aplicaciones y herramientas de administración.

