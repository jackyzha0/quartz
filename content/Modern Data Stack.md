# Modern Data Stack

Last updated Dec 7, 2023

- [Dataquestion](https://www.ssp.sh/brain/tags/dataquestion/)

Table of Contents

1. [Why the Modern Data Stack?](https://www.ssp.sh/brain/modern-data-stack/#why-the-modern-data-stack)
2. [Integrating with [[Dagster]]](https://www.ssp.sh/brain/modern-data-stack/#integrating-with-dagster)
3. [A comment I made on Social](https://www.ssp.sh/brain/modern-data-stack/#a-comment-i-made-on-social)
4. [Further Links](https://www.ssp.sh/brain/modern-data-stack/#further-links)
5. [[[Counter Arguments against Modern Data Stack]]](https://www.ssp.sh/brain/modern-data-stack/#counter-arguments-against-modern-data-stack)

The Modern Data Stack (MDS) comprises a suite of open-source tools designed for end-to-end analytics. This includes data ingestion, transformation, machine learning, and integration into a columnar data warehouse or lake solution, all complemented by an analytics BI dashboard backend. The stack’s versatility allows extensions for data quality, data cataloging, and more.

MDS aims to enable data insights using the best-suited tools for each process. It’s worth noting that “Modern Data Stack” is a relatively new term, with its definition still evolving.

> Synonym Names  
> A burgeoning term, [ngods (new generation open-source data stack)](https://www.ssp.sh/brain/ngods-new-generation-open-source-data-stack), has emerged. Previously, I’ve referred to this concept as the Open Data Stack Project. Additionally, Dagster introduced the term DataStack 2.0 in a [recent blog post](https://dagster.io/blog/evolution-iq-case-study). [Open Data Stack](https://www.ssp.sh/brain/open-data-stack) is my own definition of it.

> Closed Source vs Open Source  
> Closed Source examples: dbt, Looker, Snowflake, Fivetran, Hightouch, Census  
> Open Source alternatives: airbyte, dbt, dagster, Superset, Reverse-ETL?

> Modern Data Stack on a Laptop  
> [DuckDB: Modern Data Stack in a Box](https://duckdb.org/2022/10/12/modern-data-stack-in-a-box.html)

[

## # Why the Modern Data Stack?

](https://www.ssp.sh/brain/modern-data-stack/#why-the-modern-data-stack)

A perspective from [Reddit](https://www.reddit.com/r/dataengineering/comments/12acdrk/comment/jes4pr8/?utm_source=share&utm_medium=web2x&context=3) highlights the shift in data warehousing and analytics. It underscores the reduced need for extensive teams and infrastructure, thanks to new tools that streamline data management and reporting. Particularly for small and mid-sized companies, MDS offers a competitive edge in data handling, allowing even a single data engineer to manage vast datasets efficiently.

---

A notable article discussing Lakehouse, Metrics Layer, and Clickhouse:  
[The Next Cloud Data Platform | Greylock](https://greylock.com/greymatter/the-next-cloud-data-platform/)  
![](https://www.ssp.sh/brain/Pasted%20image%2020220527120559.png)

[](https://www.ssp.sh/brain/modern-data-stack/#integrating-with-dagster)

## [# Integrating with](https://www.ssp.sh/brain/modern-data-stack/#integrating-with-dagster) Dagster

The downside of MDS is the unbundling of Bundling vs Unbundling- Monolith Data vs Microservices, but Dagster helps integrate the full data stack together:  
![](https://www.ssp.sh/brain/Pasted%20image%2020220428103513.png)  
![](https://www.ssp.sh/brain/Pasted%20image%2020220428103632.png)  
Dagster elevates the Modern Data Stack:  
![](https://www.ssp.sh/brain/Pasted%20image%2020220428103934.png)  
![](https://www.ssp.sh/brain/Pasted%20image%2020220428103939.png)  
Explore more about its power with Dagster and [Data Assets](https://www.ssp.sh/brain/data-assets).

[

## # A comment I made on Social

](https://www.ssp.sh/brain/modern-data-stack/#a-comment-i-made-on-social)

I often ponder over the ideal tools for a data stack. My preference leans toward a [Cloud Data Warehouse](https://www.sspaeti.com/blog/olap-whats-coming-next/#cloud-data-warehouses) such as [](https://www.firebolt.io/)Firebolt, [Snowflake](https://www.snowflake.com/), [BigQuery](https://cloud.google.com/bigquery/), [Redshift](https://aws.amazon.com/redshift/), or [Synapse](https://azure.microsoft.com/en-us/services/synapse-analytics/), as a starting point.

The journey typically begins with [Airbyte](https://airbyte.com/) for data integration, followed by SQL-based transformation with [dbt](https://www.getdbt.com/). Orchestrating the processes in [Python](https://www.sspaeti.com/blog/business-intelligence-meets-data-engineering/#8220use-python-and-sql-if-possible8221) with tools like [dagster](https://ask.astorik.com/c/resources-sspaeti/what-are-common-alternatives-to-apache-airflow) is crucial.

From there, I would integrate additional open-source tools based on specific needs: [Spark](https://spark.apache.org/) for processing, [Delta Lake](https://delta.io/) for data lake formatting and ACID Transactions, [Amundsen](http://amundsen.io/) for data cataloging, and [Great Expectation](https://greatexpectations.io/) for data quality, among others. For smaller projects, [DuckDB](https://duckdb.org/) is suitable for local [OLAP](https://www.ssp.sh/brain/olap) scenarios, while [Kubernetes](https://kubernetes.io/) and DevOps provide scalability.

For teams without data engineering resources, closed-source options like [Ascend](https://www.ascend.io/) or [Foundry](https://www.palantir.com/platforms/foundry/) are viable alternatives.

Feel free to reach out for further discussion or clarifications.

[

## # Further Links

](https://www.ssp.sh/brain/modern-data-stack/#further-links)

- [The next layer of the modern data stack](https://www.getdbt.com/blog/next-layer-of-the-modern-data-stack/)
- [What Is the Modern Data Stack? | Fivetran](https://www.fivetran.com/blog/what-is-the-modern-data-stack)

[](https://www.ssp.sh/brain/modern-data-stack/#counter-arguments-against-modern-data-stack)

## [#](https://www.ssp.sh/brain/modern-data-stack/#counter-arguments-against-modern-data-stack) Counter Arguments against Modern Data Stack