---
title: "Anomalies in PostgreSQL"
tags:
- postgres
weight: -4
---
## Lost update
The lost update anomaly occurs when two transactions read one and the same table row, then one of the transactions updates this row, and finally the other transaction updates the same row without taking into account any changes made by the first transaction.
![](/postgres/attachment/lost-update.png)
## Dirty read
The dirty read anomaly occurs when a transaction reads uncommitted changes made by another transaction.
![](/postgres/attachment/dirty-read.png)
## Non-repeatable read
The non-repeatable read anomaly occurs when a transaction reads one and the same row twice, whereas another transaction updates (or deletes) this row between these reads and commits the change. As a result, the first transaction gets different results.
![](/postgres/attachment/non-repeat-read.png)
## Phantom read
The phantom read anomaly occurs when one and the same transaction executes two identical queries returning a set of rows that satisfy a particular condition, while another transaction adds some other rows satisfying this condition and commits the changes in the time interval between these queries. As a result, the first trans- action gets two different sets of rows.
![](/postgres/attachment/repeat-read.png)
## Serializable
It does not allow any anomalies

## Sum up
![](/postgres/attachment/isolation-sumup.png)