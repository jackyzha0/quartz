
# Cloud Data Warehouses

Last updated Dec 8, 2023

- Snowflake
- Google BigQuery
- Amazon Redshift
- Azure SQL Data Warehouse

- Firebolt

Another approach is that you change your on-premise Data Warehouse to a **Cloud Data Warehouse** to get more scalability, more speed, and better availability. This option is best suited for you if you do not necessarily need the fastest response time and you do not have - or petabytes of data. **The idea is to speed up your DWH and skip the layer of cubes. This way you save much time in the development, processing, and maintenance of [OLAP Cubes](https://www.ssp.sh/brain/olap).** On the other hand, you lose in query latency while you create your dashboards. If you mainly have reports anyway, which can run beforehand, then this is perfect for you.