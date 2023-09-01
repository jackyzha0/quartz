---
title: "Page and tuple"
tags:
- postgres
weight: -4
---

## Tuple
It refers to *rows* which contains the actual data stored in the database, together with some additional information. They are located just before the **special space**

In the case of *table*, we have to deal with *row versions* rather than *rows* because *MVCC* implies having several versions of one and the same row. 
## Operations
To identify different versions of one and the same row, PostgreSQL marks each of  
them with two values: *xmin* and *xmax*.

- When a row is created, its *xmin* value is set to the transaction ID of **INSERT** command
- When a row is deleted, the *xmax* value of its current version is set to the transaction ID of **DELETE** command
- *xmax* value of current version is set to transaction ID of the **UPDATE** command, then a new version of the row is created; its *xmin* value will be the same as the *xmax* of previous version
### Demo
Firstly, you need to create **pageinspect** extension to use some special functions
```sql
CREATE EXTENSION pageinspect;
```
To prepare for demo, I will create a arbitrary table
```sql
CREATE TABLE t (
	id integer GENERATED ALWAYS AS IDENTITY
	s value
)
```
#### Insert
```sql
BEGIN
INSERT INTO t(s) VALUES ('FOO')
SELECT pg_current_xact_id();
```
output
```
pg_current_xact_id 
−−−−−−−−−−−−−−−−−−−−
776
```

```sql
COMMIT
```

```sql
SELECT *, xmin, xmax FROM t;
```
output
```
+----+-----+------+------+
| id | s   | xmin | xmax |
|----+-----+------+------|
| 1  | FOO | 776  | 0    |
+----+-----+------+------+
```
As you can see, the *xmin* value is set to transaction ID of **INSERT** command
When any other transaction accesses a heap page, it has to answer following questions:
- Has *xmin* transaction already finished?
	- If not, then the created tuple must not be visible
	- If yes, was it committed or aborted?
		- If it is aborted, the corresponding tuple cannot be visible either
#### Update
```sql
BEGIN
UPDATE t SET s='BAR'
SELECT pg_current_xact_id();
```
output
```
pg_current_xact_id 
−−−−−−−−−−−−−−−−−−−−
777
```

```sql
SELECT *, xmin, xmax FROM t;
```
output
```
+----+-----+------+------+
| id | s   | xmin | xmax |
|----+-----+------+------|
| 1  | FOO | 776  | 777  |
+----+-----+------+------+
```

```sql
COMMIT
```

```sql
SELECT *, xmin, xmax FROM t;
```
output
```
+----+-----+------+------+
| id | s   | xmin | xmax |
|----+-----+------+------|
| 1  | FOO | 777  | 0    |
+----+-----+------+------+
```