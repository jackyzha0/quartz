---
title: "How PostgresQL scan?"
tags:
- setup
weight: -4
---

## Sequential scan
This is the simples of fetching data from a table: it scans through every page of data sequentially. Like most other scans, this can apply a filter while reading data, but it needs to read the data first and then discard it. This is generally inefficient unless your need a large proportion of the database to answer your query.

## Index scan
An index scan uses an index to find either a specific row, or all rows matching a predicate. An index must first look up each row in the index, and then check the actual table data for that index entry. The table data must be checked to ensure that the row it found is actually visible to the current transaction, and also to fetch any column is included in the query that are not present in the index.

## Index only scan & covering
This is very similar to an Index Scan, but the data comes directly from the index and the visibility check is handled specially, so it can avoid looking at the table data entirely. At first glance you think it is good, but it has some restrictions:
- The index type must support **Index-Only Scans** (the common B-Tree index type always does)
- The query must only project columns included in the index. If you have a SQL
```sql
SELECT * FROM TABLE
```
it never match to your index, you must change the column list in select which setup in the index to use **Index-Only Scan**
- And because the data is stored in the index directly that can lead to bigger storage for storing the data, and synchronization between index and actual table.

## Bitmap scan
After understanding the **Sequential scan** and **Index scan**, now we can think bitmap as the middle ground of them. Like an **index scan** , it scans an index to determine exactly what data it needs to fetch, but like a sequential scan, it take advantage of data being easier to read in bulk

If you only select a handful of rows, PostgreSQL will decide on an index scan – if you select a majority of the rows, PostgreSQL will decide to read the table completely. But what if you read too much for an index scan to be efficient but too little for a sequential scan? The solution to the problem is to use a bitmap scan. The idea behind a bitmap scan is that a single block is only used once during a scan. It can also be very helpful if you want to use more than one index to scan a single table.

To summarize, the bitmap scan happens when the result set will have a high selectivity rate with respect to the filter condition, it is a bitmap of which pages on disk to pull the data out from, it only scans the relevant pages on disk, skip the pages that it knows relevant data does not exist.

![[me/notes/images/bitmap-scan.png]]*Bitmap scan*
