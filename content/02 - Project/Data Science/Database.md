---
creation_date: 2023年09月07日
banner: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988"
banner_icon: 🌞
tags:
  - "#笔记"
banner_y: 0.09673
---

# Database

***Types of databases?***
- Relational Database

***Database Schema***
- Logical database schema, Entity Relationship Model (Design)
- Physical schema (Implementation using specific database)

***Types of Keys?*** Primary, Foreign, Composite

Books Table

| BookId | Book Title | Price | Published |
| ------- | ---------- | ----- | --------- |
| 1       | Learn SQL  | 10    | Yes       |
| 2       | Learn C#   | 20    | Yes       |
| 3       | Learn CSS  | 15    | Yes       |
| 4       | Learn HTML | 20    | No          |

Authors Table

| AuthorId | FirstName | LastName | Gender |
| -------- | --------- | -------- | ------ |
| 1        | Mark      | Dunn     | Male   |
| 2        | Sara      | Longhorn | Female |
| 3        | Jessica   | Dale     | Female |
| 4        | Steve     | Wicht    | Male   |

An example of primary key would be BooksId for Books tables, or AuthorId for Authors table. In this relationship, we can say that a book can have many authors, but an author can have published many books.We can create a junction table to handle many to many relationships. The code below gives us a composite primary key.

```SQL
CREATE TABLE Authors_Books (
	AuthorId int not null foreign key references Authors(AuthorId),
	BookId int not null foregin key references Books(BookId),
	Constraint PK_Books_Authors primary key (AuthorId, BookId)
)
```

| AuthorId | BookId |
| -------- | ------ |
| 1        | 1      |
| 1        | 3      |
| 2        | 1      |

You can also create a composite primary key on a single table.
```SQL
ALTER TABLE [table_name]
ADD Constrait [name] primary key (Col 1, Col2, Col3, ...)
```

A composite primary key does not allow null values or duplicate values (across columns), just like a primary key. *A composite key is a primary key made up of multiple columns/features* 

***Table Relationships?*** One-to-many, many-to-one, many-to-many


***What is data normalization?*** 1NF, 2NF, 3NF
- non-key attributes
- functional dependency
- partial dependency
	- transitive dependency