# Roles y usuarios en SQL

%%
Date:: [[2023-10-25]]
Course:: [[Programación III]]
Source:: [[]]
%%

En SQL Server, existen distintos tipos de usuarios y roles que permiten administrar los permisos y accesos a la base de datos. A continuación, se describen los roles y usuarios más comunes:

Roles de nivel de servidor:
- Estos roles se utilizan para controlar el acceso a los recursos del servidor y están relacionados con acciones administrativas. SQL Server proporciona nueve roles fijos de servidor que no pueden ser modificados, excepto el rol público. A partir de SQL Server 2012, se pueden crear roles de servidor definidos por el usuario y agregarles permisos de nivel de servidor. Además, SQL Server 2022 incluye 10 roles de servidor adicionales diseñados específicamente para el principio de privilegios mínimos.

Roles de nivel de base de datos:
- Estos roles se aplican a toda la base de datos en lo que respecta a su ámbito de permisos. SQL Server proporciona varios roles que agrupan otras entidades de seguridad, como los grupos del sistema operativo Microsoft Windows. Los roles de nivel de base de datos se utilizan para administrar los permisos en las bases de datos. Para agregar y quitar usuarios en un rol de base de datos, se pueden utilizar las opciones ADD MEMBER y REMOVE MEMBER.

Usuarios:
- Los usuarios son entidades de seguridad que se utilizan para autenticar y autorizar el acceso a la base de datos. SQL Server valida los usuarios de dos formas: mediante la autenticación de Windows o mediante la autenticación de SQL Server. Los inicios de sesión de acceso a SQL Server se definen desde la entrada Seguridad, botón derecho Nuevo inicio de sesión. Además, se pueden definir el acceso a la base de datos y la asignación de permisos o restricciones sobre la base de datos.



| Rol | Descripción |
| --- | --- |
| sysadmin | Los miembros de este rol pueden realizar cualquier actividad en el servidor. |
| serveradmin | Los miembros de este rol pueden cambiar opciones de configuración en el servidor y cerrar el servidor. |
| securityadmin | Los miembros de este rol administran los inicios de sesión y sus propiedades. Pueden administrar los permisos de nivel de servidor GRANT, DENY y REVOKE. También pueden administrar los permisos de nivel de base de datos GRANT, DENY y REVOKE si tienen acceso a una base de datos. |
| db_owner | Los miembros de este rol pueden realizar cualquier actividad en la base de datos, incluyendo la asignación de permisos a otros usuarios. |
| db_datareader | Los miembros de este rol pueden leer todos los datos de todas las tablas de la base de datos. |
| db_datawriter | Los miembros de este rol pueden agregar, modificar y eliminar datos en todas las tablas de la base de datos. |
| db_backupoperator | Los miembros de este rol pueden realizar copias de seguridad de la base de datos. |


