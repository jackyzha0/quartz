

# Data Warehouse


A Data Warehouse (DWH), also known as an Enterprise Data Warehouse (EDW), represents the traditional approach to data collection, a practice [established over 30 years ago](https://tdwi.org/articles/2016/02/01/data-warehousing-30.aspx). The DWH is crucial for integrating data from numerous sources, serving as a single source of truth, and managing data through processes such as cleaning, historical tracking, and data consolidation. It facilitates enhanced executive insight into corporate performance through management dashboards, reports, or ad-hoc analyses.

Data Warehouses are instrumental in analyzing various types of business data. Their importance is particularly evident when analytic demands clash with the performance of operational databases. Running complex queries on a database necessitates a temporary fixed state, which can disrupt transactional databases. In such scenarios, a data warehouse is utilized to perform the analytics, allowing the transactional database to continue handling transactions efficiently.

Another key characteristic of DWHs is their capability to analyze data from diverse origins (for example, combining Google Analytics with CRM data). This is possible due to the data being heavily transformed and structured through the [ETL](https://www.ssp.sh/brain/etl) (Extract, Transform, Load) process.