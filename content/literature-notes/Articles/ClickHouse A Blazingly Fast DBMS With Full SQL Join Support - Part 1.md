---
author: [[ClickHouse]]
title: "ClickHouse: A Blazingly Fast DBMS With Full SQL Join Support - Part 1"
tags: 
- articles
- literature-note
---
# ClickHouse: A Blazingly Fast DBMS With Full SQL Join Support - Part 1

![rw-book-cover](https://clickhouse.com/uploads/Blazingly_Fast_DBMS_f057785f6f.png)

## Metadata
- Author: [[ClickHouse]]
- Full Title: ClickHouse: A Blazingly Fast DBMS With Full SQL Join Support - Part 1
- Category: #articles
- URL: https://clickhouse.com/blog/clickhouse-fully-supports-joins

## Highlights
- The INNER JOIN returns, for each pair of rows matching on join keys, the column values of the row from the left table, combined with the column values of the row from the right table. If a row has more than one match, then all matches are returned (meaning that the [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) is produced for rows with matching join keys). ([View Highlight](https://read.readwise.io/read/01h13vxvvaajjc284ze0g16yx0))
- We can check that for the example query via [EXPLAIN SYNTAX](https://clickhouse.com/docs/en/sql-reference/statements/explain/#explain-syntax) (that returns the syntactically optimized version into which a query gets rewritten before being [executed](https://youtu.be/hP6G2Nlz_cA)) ([View Highlight](https://read.readwise.io/read/01h13w6p9mdv52s3s09r6sf15n))
- The ASOF JOIN, implemented for ClickHouse in 2019 by [Martijn Bakker](https://github.com/ClickHouse/ClickHouse/pull/4774) and [Artem Zuikov](https://github.com/ClickHouse/ClickHouse/pull/6211), provides non-exact matching capabilities. If a row from the left table doesn’t have an exact match in the right table, then the closest matching row from the right table is used as a match instead. ([View Highlight](https://read.readwise.io/read/01h13wbz3zrsddj7q2m21kp8da))
