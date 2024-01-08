

# Data Lake

Last updated Dec 8, 2023

Table of Contents

1. [Why Do You Need a Data Lake?](https://www.ssp.sh/brain/data-lake/#why-do-you-need-a-data-lake)
2. [Adding Database and ML features](https://www.ssp.sh/brain/data-lake/#adding-database-and-ml-features)

A Data Lake is a versatile storage system, found within the [Storage Layer](https://www.ssp.sh/brain/storage-layer), containing a vast array of both unstructured and structured data. This data is stored without a predetermined purpose, allowing for flexibility and scalability. Data Lakes can be built using a variety of technologies, including Hadoop, NoSQL, Amazon Simple Storage Service, and relational databases, and they accommodate diverse data formats such as Excel, CSV, Text, Logs, and more.

The concept of a data lake, as detailed in the [Hortonworks Data Lake Whitepaper](http://hortonworks.com/wp-content/uploads/2014/05/TeradataHortonworks_Datalake_White-Paper_20140410.pdf), emerged from the need to capture and leverage new types of enterprise data. Early adopters found that significant insights could be gleaned from applications specifically designed to utilize this data. Key capabilities of a data lake include:

- Capturing and storing raw data at scale affordably
- Housing various data types in a unified repository
- Allowing data transformations for undefined purposes
- Facilitating new data processing methods
- Supporting focused analytics for specific use cases

[

## # Why Do You Need a Data Lake?

](https://www.ssp.sh/brain/data-lake/#why-do-you-need-a-data-lake)

A data lake serves as a comprehensive storage solution, employing [Data Lake File Formats](https://www.ssp.sh/brain/data-lake-file-formats) and various [Data Lake Table Format](https://www.ssp.sh/brain/data-lake-table-format)s to manage extensive volumes of unstructured and semi-structured data. As a primary destination for a growing assortment of exploratory and operational data, it caters to a broad spectrum of users, ranging from technical experts to business analysts, for diverse analytical and machine learning purposes.

The data lake model circumvents the limitations of traditional BI tools’ proprietary formats, offering direct data loading capabilities. This shift eliminates the time-consuming construction and maintenance of complex ETL pipelines and expedites data access, significantly reducing waiting times.

Early adopters of data lakes have demonstrated their efficacy in making data readily available and extractable for business insights. A data lake’s architecture enables efficient data storage and versatile transformations, facilitating swift iteration and exploration of business value on an ad-hoc basis.

Data lakes, as initially proposed in the [2014 Data Lake paper](http://hortonworks.com/wp-content/uploads/2014/05/TeradataHortonworks_Datalake_White-Paper_20140410.pdf), can be constructed using various technologies and support multiple data formats, including Excel, CSV, Text, Logs, Apache Parquet, and [Apache Arrow](https://www.ssp.sh/brain/apache-arrow).

The foundation of every data lake is a basic storage provider like AWS S3 or Azure Blob, which is then enhanced with essential database-like features, further discussed in this article.

[

## # Adding Database and ML features

](https://www.ssp.sh/brain/data-lake/#adding-database-and-ml-features)

If you want to reach the next level of the data lake, you can build a [Data Lakehouse](https://www.ssp.sh/brain/data-lakehouse), that mostly uses advanced features from the [Data Lake Table Format](https://www.ssp.sh/brain/data-lake-table-format)s. I also wrote a deep dive in [Data Lake / Lakehouse Guide: Powered by Data Lake Table Formats (Delta Lake, Iceberg, Hudi)](https://ssp.sh/blog/data-lake-lakehouse-guide/).