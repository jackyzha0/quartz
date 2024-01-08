
Table of Contents

1. [Layers](https://www.ssp.sh/brain/classical-architecture-of-data-warehouse#layers)
    1. [Staging Area]
    2. [Cleansing Area]
    3. [Core]
    4. [Data Mart]
    5. [Metadata]

This is the classical data warehouse architecture I learned at the beginning of my career. And to this day, I like to [model](https://www.ssp.sh/brain/data-modeling) my data warehouse this way.

![](https://www.ssp.sh/brain/Pasted%20image%2020230323114520.png)  
From [Data Warehouse Blueprints: Business Intelligence in der Praxis : Schnider, Dani, Jordan, Claus, Welker, Peter, Wehner, Joachim: Amazon.de: Bücher](https://www.amazon.de/Data-Warehouse-Blueprints-Business-Intelligence/dp/3446450750), September 2016

[

## # Layers


In this overview, we’ll delve into each layer of a complete [[Data Warehouse]] (DWH) architecture and explore why this modeling approach is effective:



### # Staging Area


**Staging Area**: This initial layer serves as the landing point for data from various source systems.

- Here, data is stored in its original form, as delivered.
- The structure of the staging tables mirrors the source system interfaces, with no inter-table relationships.
- Each table holds data from the latest delivery, which is cleared before the next batch.
- Think of it like a grocery store’s loading dock, where suppliers (source systems) drop off goods (data) for temporary storage.


### # Cleansing Area


**Cleansing Area**: Prior to integration into the Core, data undergoes cleaning in the Cleansing Area.

- This involves filtering out, correcting, or supplementing faulty data.
- Data from different sources is transformed and unified.
- Similar to the Staging Area, only the most recent data batch is kept here.
- A grocery store analogy would be the preparation area where goods are made ready for sale, undergoing quality control and labeling.


### # Core


**Core**: Data from various sources converges in the Core, having passed through the Staging and Cleansing areas, and is stored long-term, often for years.

- The Core’s main function is integrating data from diverse sources and organizing it thematically.
- It’s the go-to source for [[Data Marts]] and should generally not be accessed directly by users.



### # Data Mart


**Data Mart**: Marts store subsets of Core data, optimized for user queries.

- Each Mart caters to specific applications or user groups, simplifying query complexity and enhancing system usability.
- These can be likened to specialized market stalls in a grocery store, each offering a curated selection of goods.


### # Metadata


**Metadata**: The foundation of the DWH system, metadata, is essential for its smooth operation.

- Business metadata includes descriptions of attributes, drill paths, and aggregation rules for front-end applications.
- Technical metadata covers data structures, mapping rules, and ETL control parameters.
- Operational metadata encompasses log tables, error messages, ETL process logs, and more, essentially forming the DWH’s infrastructure.

While not every [Data Warehouse](https://www.ssp.sh/brain/data-warehouse) adheres strictly to this structure, with some areas merged or renamed, the essential concept is to segment the system for task specialization. This segmentation facilitates data cleaning, integration, historization, and query handling, simplifying the transformation processes between layers.


Metadata in data engineering refers to data that describes other data. It provides context or additional information about the main data, making it easier to understand, manage, and use effectively. In the realm of data engineering, metadata plays a crucial role in various aspects of data management, including data warehousing, database management, and data analytics. Here are some key aspects of metadata in data engineering:

1. **Definition and Structure**: Metadata describes the structure, definition, and formatting of data. This includes information like data types, field lengths, allowable values, and file formats. For example, in a database, metadata would define table structures, field names, and relationships between tables.

2. **Data Lineage**: It tracks the lineage of data, showing how data has been modified or transformed over time. This is especially important in complex data environments where data moves through various stages of processing.

3. **Data Quality and Profiling**: Metadata helps in assessing the quality of data by providing information about data accuracy, completeness, and relevance. Data profiling tools use metadata to analyze the data in databases for inconsistencies, anomalies, or deviations.

4. **Data Governance and Compliance**: In the context of data governance, metadata assists in enforcing policies, standards, and regulations. It helps organizations understand where sensitive data is stored, how it is used, and ensures compliance with data protection laws like GDPR or HIPAA.

5. **Searchability and Discovery**: Metadata makes data searchable and discoverable. It includes keywords, tags, and descriptions that help in locating and identifying data sets.

6. **Integration and Interoperability**: In environments where different systems and data formats are used, metadata ensures that data from various sources can be integrated and interoperable.

7. **Cataloging and Documentation**: Metadata serves as a catalog or documentation for data, providing essential information for users and data analysts to understand the data sources, their content, and their purpose.

8. **Types of Metadata**: There are several types of metadata, including descriptive metadata (information for discovery and identification), structural metadata (data design and specification), and administrative metadata (data management and preservation).

In data engineering, effectively managing and utilizing metadata is key to understanding complex data systems and making informed decisions based on the data. It acts as a guide to the data, providing essential context and background for users and systems interacting with the data.

