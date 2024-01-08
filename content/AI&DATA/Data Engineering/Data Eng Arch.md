

# Data Engineering Architecture


A good data engineering architecture is hard.

But the best one is the overview from Emerging Architectures for Modern Data Infrastructure - a16z (or Zotero: The Guide to Modern Data Architecture | Future). Check also Perfect DWH architecture.


## Data lake vs Data Warehouse

The concepts of "data lake" and "data warehouse" are both related to big data and analytics, but they serve different purposes and have distinct characteristics. Let's explore each of them:

### Data Lake

1. **Definition**: A data lake is a vast pool of raw data, the purpose of which is not yet defined. It stores structured, semi-structured, and unstructured data. The data is kept in its native format until it is needed.

2. **Flexibility**: Since data lakes retain all data in its raw form, they offer high flexibility to analysts and data scientists to apply different types of analytics, from dashboards and visualizations to big data processing, real-time analytics, and machine learning.

3. **Users**: Data lakes are mainly used by Data Scientists and Data Engineers who need to perform exploratory data analysis, and who are skilled in using advanced analytical tools and techniques.

4. **Scalability and Cost**: Data lakes, especially when implemented in a cloud environment, can scale easily to store and process large amounts of data, and they can be more cost-effective in terms of storage.

5. **Data Quality and Governance**: One challenge with data lakes is managing the quality and governance of the data. Without proper management, data lakes can become unmanageable and turn into what is sometimes called a “data swamp”.

### Data Warehouse

1. **Definition**: A data warehouse is a system used for data analysis and reporting. It is a central repository of integrated data from one or more disparate sources. The data stored in a data warehouse is structured and processed.

2. **Purpose and Structure**: The data in a data warehouse is processed, structured, and used for specific purposes like reporting and analysis. It's organized in a way to quickly provide insights (like sales performance, operational efficiency, etc.).

3. **Users**: Data warehouses are typically used by business professionals like Business Analysts, who rely on data for making strategic decisions. They are not necessarily technical experts in data processing.

4. **Performance and Complexity**: Data warehouses are highly efficient at handling queries and are optimized for read-access and simplicity, making them suitable for less complex queries that are repeated frequently.

5. **Maintenance and Cost**: They generally require more maintenance, including data cleaning and data integration tasks. This can make them more expensive to operate compared to data lakes.

In summary, a data lake is a large-scale storage solution for raw, unstructured data, which offers flexibility for different types of data processing and analysis. A data warehouse, in contrast, is a structured repository of processed and refined data, designed for specific analytical tasks and queries. The choice between a data lake and a data warehouse depends on the specific needs, the nature of the data, and the intended use cases.



## # Common Architectures


- Examples and Types of Data Architecture:
    - [[Data Warehouse]]
    - [[Cloud Data Warehouse]]
    - Data Marts
    - [[Data Lake]]
    - [[Modern Data Stack]]vs [Open Data Stack](https://www.ssp.sh/brain/open-data-stack)
    - Lambda Architecture vs Kappa Architecture, Medallion Architecture
        - [MapReduce](https://www.ssp.sh/brain/mapreduce) vs [Hadoop](https://www.ssp.sh/brain/hadoop)
    - Metrics Layer vs Semantic Warehouse vs Data Virtualization
        - [Metrics](https://www.ssp.sh/brain/metrics), Key Performance Indicator (KPI)
        - Push-Downs vs rollup
        - Data Modeling vs [Dimensional Modeling](https://www.ssp.sh/brain/dimensional-modeling)
        - Data Contracts
    - Delta Lake architecture where they unified batch processing and Streaming
    - Architecture for IoT
    - [Data Mesh](https://www.ssp.sh/brain/data-mesh)
    - Data architectures have countless other variations
    - Data Fabric, data hub, scaled architecture, metadata-first architecture, event-driven architecture, live data stack, and many more. Reis and Housley - Fundamentals of Data Engineering.pdf

Many overlap and more I have listed in [Data Modeling](https://www.ssp.sh/brain/data-modeling).

[

## # Data Architectures Images

](https://www.ssp.sh/brain/data-engineering-architecture/#data-architectures-images)

Updated:  
![](https://www.ssp.sh/brain/Pasted%20image%2020220812142059.png)  
by [Emerging Architectures for Modern Data Infrastructure | Andreessen Horowitz](https://a16z.com/emerging-architectures-for-modern-data-infrastructure/)

[

### # People (on top of the illustration)

](https://www.ssp.sh/brain/data-engineering-architecture/#people-on-top-of-the-illustration)

![](https://www.ssp.sh/brain/Pasted%20image%2020221222063638.png)  
RW The Modern Data Graph - By Stephen Bailey

![](https://www.ssp.sh/brain/Pasted%20image%2020220405073024.png)

![](https://www.ssp.sh/brain/Pasted%20image%2020220503123606.png)

See a collection of many more on Data Engineering Architectures Overview or 4 Data Architectures.pdf, or Perfect DWH architecture.