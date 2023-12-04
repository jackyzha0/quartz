
## # What are the 4 Vs of Big Data?
 There are generally four characteristics that must be part of a dataset to qualify it as big data—volume, velocity, variety and veracity [link](https://bernardmarr.com/what-are-the-4-vs-of-big-data/#:~:text=There%20are%20generally%20four%20characteristics,%2C%20velocity%2C%20variety%20and%20veracity.)
#etl

### What is ETL

ETL provides the foundation for data analytics and machine learning workstreams. Through a series of business rules, ETL cleanses and organizes data in a way which addresses specific business intelligence needs, like monthly reporting, but it can also tackle more advanced analytics, which can improve back-end processes or end user experiences. ETL is often used by an organization to: 

- Extract data from legacy systems
- Cleanse the data to improve data quality and establish consistency
- Load data into a target database

#apachebeam
### Apache Beam 
Apache Beam is an open-source, unified programming model and set of tools for building batch and streaming data processing pipelines. It provides a way to express data processing pipelines that can run on various distributed processing backends, such as Apache Spark, Apache Flink, Google Cloud Dataflow, and others. Apache Beam offers a high-level API that abstracts away the complexities of distributed data processing and allows developers to write pipeline code in a language-agnostic manner.

The key concept in Apache Beam is the data processing pipeline, which consists of a series of transforms that are applied to input data to produce an output. A transform represents a specific operation on the data, such as filtering, mapping, aggregating, or joining. Apache Beam provides a rich set of built-in transforms, as well as the ability to create custom transforms to suit specific processing needs.

One of the main advantages of Apache Beam is its portability across different processing engines. With Apache Beam, you can write your pipeline code once and run it on multiple execution engines without modifying the code. This flexibility allows you to choose the processing engine that best fits your requirements or take advantage of the capabilities offered by different engines for specific tasks.

Apache Beam supports both batch and streaming processing. It provides a programming model that enables developers to write pipelines that can handle both bounded (batch) and unbounded (streaming) data. This makes it possible to build end-to-end data processing solutions that can handle diverse data processing scenarios.

Overall, Apache Beam simplifies the development of data processing pipelines by providing a unified model and a set of tools that abstract away the complexities of distributed data processing. It allows developers to focus on the logic of their data transformations rather than the intricacies of the underlying execution engines.