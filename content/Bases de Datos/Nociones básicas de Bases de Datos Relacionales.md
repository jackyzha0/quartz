# Nociones básicas de Bases de Datos Relacionales 

- Date:: [[2023-03-17]] : 17:42
- Course:: [[Bases de datos]]
- Source: [[]]

#main_page 
#basesdatos/normalizacion 

## Qué es el modelo de datos?
?
- Representación de la realidad.
- En una organización, quién es el destinatario de mi solución informática? Primero definir el modelo de datos, y luego vendrán las aplicaciones que le consumen.
- **Modelo de datos:** Conjunto de dato organizados de alguna manera a fin de facilitar la gestión de los contenidos.

## Modelo Orientado a Objetos
- Las tablas o entidades representan tablas.
- Estándar <mark style="background: #FF5582A6;">UML</mark>. Es un lenguaje predefinido.

## Qué es un modelo relacional de bases de datos?
?
- Orientado a conjuntos, marcado por el álgebra relacional.
- Haré todas las operaciones del algebra de conjuntos para trabajarlo.
- *Entidades*
	- En el modelado una entidad es un argumento de componentes que posee idénticos atributos. Una agrupación de atributos que describen algo.
	- Si no es un campo clave, no aparece dos veces en una base de datos.
	- Solo tenemos un campo identificador, el resto serán atributos descriptivos.
- *Atributos*
	- **Clave primaria (PK).** Identifica de manera equívoca a la entidad.
	- **Clave compuesta.** Cuando dos atributos juntos forman la clave.
	- **Clave Foránea (FK).** Atributo dependiente de la entidad que es la clave primaria en otra entidad.

Qué tipos de relaciones existen en las bases de datos relacionales?
?
## Relaciones en bases de datos
Las denotamos con una flecha $\rightarrow$
1. Relación 1 a 1
	- 1 elemento de una entidad, se corresponde a 1 solo elemento de otra entidad
2. Relación 1 a *
	- Una entidad se relaciona con 1 o más elementos de otra entidad (siendo de la misma naturaleza)
3. Relación * a *
	- Muchos elementos de una entidad se vinculan con muchos elementos de otra entidad.



>[!info] Summary
> - Existen muchos tipos de bases de datos, las que veremos en la materia son las relacionales, las cuales poseen entidades (con atributos) y relaciones entre ellas
> - Las relaciones pueden ser 1-1, 1-N o N-N
