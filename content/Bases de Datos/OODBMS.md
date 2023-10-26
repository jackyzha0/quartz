# OODBMS

%%
Date:: [[2023-04-24]]
Course:: [[Bases de datos]]
Source:: [[Modelado Orientado a Objetos]]
%%


Object-oriented databases (OODB) are a type of database management system (DBMS) that stores data in the form of objects, which are similar to the objects in object-oriented programming (OOP). In OODB, each object represents a real-world entity and contains both its data and the methods that operate on that data. This allows for a more natural representation of data than traditional relational databases, which store data in tables with fixed columns and rows.

In an OODB, objects can be linked to each other to represent relationships, and objects can inherit properties and methods from parent objects to create a hierarchy of objects. This makes it easier to model complex real-world relationships in the database.

## Types of relationships in OODB

1. **Inheritance**: Inheritance <mark style="background: #FFF3A3A6;">allows objects to inherit properties and methods from a parent object.</mark> This creates a hierarchy of objects, with parent objects at the top and child objects at the bottom. Child objects inherit properties and methods from their parent objects and can override or extend them as needed.
2. **Association**: Association <mark style="background: #FFF3A3A6;">represents a relationship between two or more objects, where each object maintains a reference to the other.</mark> For example, an order object may be associated with one or more line item objects, each of which represents a product ordered in that order. The order object maintains a reference to each line item object, and vice versa.
3. **Composition**: Composition is a more specific form of association where <mark style="background: #FFF3A3A6;">one object is composed of one or more other objects.</mark> The composed objects cannot exist outside of the composite object. For example, a car object may be composed of engine, wheel, and chassis objects. If the car object is deleted, the engine, wheel, and chassis objects are also deleted.
4. **Aggregation**: Aggregation is a type of association where <mark style="background: #FFF3A3A6;">one object is a container for one or more other objects, but the composed objects can exist outside of the container object.</mark> For example, a university object may aggregate department objects, but if the university object is deleted, the department objects continue to exist.


___
## Flashcards