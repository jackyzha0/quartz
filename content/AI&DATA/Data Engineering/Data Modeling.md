
# Data Modeling

Last updated Dec 31, 2023

Table of Contents

1. [Different Levels](https://www.ssp.sh/brain/data-modeling/#different-levels)
    1. [Different Data Modeling Techniques](https://www.ssp.sh/brain/data-modeling/#different-data-modeling-techniques)
2. [(Design) Patterns](https://www.ssp.sh/brain/data-modeling/#design-patterns)
3. [Data Modeling is changing](https://www.ssp.sh/brain/data-modeling/#data-modeling-is-changing)
4. [Tools](https://www.ssp.sh/brain/data-modeling/#tools)
5. [Frameworks](https://www.ssp.sh/brain/data-modeling/#frameworks)
6. [Difference to [[Dimensional Modeling]]](https://www.ssp.sh/brain/data-modeling/#difference-to-dimensional-modeling)
7. [Data Modeling part of Data Engineering?](https://www.ssp.sh/brain/data-modeling/#data-modeling-part-of-data-engineering)

Data modeling has changed over time; when I started (~20 years ago), choosing between Inmon and Kimball was common.

Today, in the context of data engineering, data modeling creates a structured representation of your organization’s data. Often illustrated visually, this representation helps understand the relationships, constraints, and patterns within the data and serves as a blueprint for gaining business value in designing data systems, such as data warehouses, lakes, or any analytics solution.

In its most straightforward form, data modeling is how we design the flow of our data such that it flows as efficiently and in a structured way, with good data quality and as little redundancy as possible.

---

Data Modeling is as much about [Data Engineering Architecture](https://www.ssp.sh/brain/data-engineering-architecture) as it is about modeling the data only. Therefore besides the below links, many approaches and common architecture you can find in [Data Engineering Architecture](https://www.ssp.sh/brain/data-engineering-architecture#common-architectures).

It’s getting more about language than really modeling, Shane Gibson says on [Making Data Modeling Accessible](https://open.spotify.com/episode/4DNyy4cIttEFMUEWjKEHqV?si=748743c87c2a4d0e). For example, a Data Scientist speaks [Wide Tables](https://www.ssp.sh/brain/one-big-table), a Data engineer talks about facts and dimensions, etc., it’s what I call the different levels of data modeling in Data Modeling – The Unsung Hero of Data Engineering- An Introduction to Data Modeling (Part 1).

[

## # Different Levels

](https://www.ssp.sh/brain/data-modeling/#different-levels)

How do you think about different levels of modeling? Generally, when I started (20 years ago) it was common to choose between Inmon and Kimball. But today, there are so many layers, levels, and approaches. Did you find a good way of separating or naming the different “levels” (still not sure about levels) to make it clear what is meant? Below I collected a list of what I think so far (I also wrote extensively about, in case of interest).

- **Levels of Modeling**
    - Generation or source database design
    - Data integration
    - ETL processes
    - Data warehouse schema creation
    - Data lake structuring
    - BI tool presentation layer design
    - Machine learning or AI feature engineering
- **Data Modeling Approaches**
    - Conceptual, Logical to physical Data Models
    - Other lesser known: Hierarchical Data Modeling, Network Data Modeling and Object-Role Modeling
- **Data Modeling Techniques**
    - [Dimensional Modeling](https://www.ssp.sh/brain/dimensional-modeling)
    - Data Vault Modeling
    - [Anchor Modeling](https://www.ssp.sh/brain/anchor-modeling)
    - [Bitemporal Modeling](https://www.ssp.sh/brain/bitemporal-modeling)
    - [Entity-Centric Data Modeling (ECM)](https://www.ssp.sh/brain/entity-centric-data-modeling-ecm)
    - [Focal Modeling](https://www.ssp.sh/brain/focal-modeling)
    - [Activity Schema](https://www.ssp.sh/brain/activity-schema)
- **Data Architecture Pattern**
    - General Purpose Data Architecture Pattern
        - Staging, Cleansing, Core, Data Mart ([Classical Architecture of Data Warehouse](https://www.ssp.sh/brain/classical-architecture-of-data-warehouse)) or Medallion Architecture
    - Specialized
        - Batch vs. Streaming (Streaming vs Batch in Orchestration)
        - Data Lake/Lakehouse vs. Data Warehouse Pattern
        - [Semantic Layer](https://www.ssp.sh/brain/semantic-layer) (In-memory vs. Persistence or Semantic vs. Transformation Layer)
        - [Modern Data Stack](https://www.ssp.sh/brain/modern-data-stack) / [Open Data Stack](https://www.ssp.sh/brain/open-data-stack) Pattern
        - many more: Data Modeling- The Unsung Hero of Data Engineering- Data Architecture Pattern, Tools and The Future (Part 3)

[LinkedIn Post and Discussion](https://www.linkedin.com/posts/sspaeti_datamodeling-dataarchitecture-dataengineering-activity-7075390406099652609-sUfh?utm_source=share&utm_medium=member_desktop) and [dbt Slack](https://getdbt.slack.com/archives/C0VLZPLAE/p1686903398031609). Links (from post): Data Model Matrix.

[

### # Different Data Modeling Techniques

](https://www.ssp.sh/brain/data-modeling/#different-data-modeling-techniques)

![](https://www.ssp.sh/brain/normalization%E2%80%94denormalization-illustration.png)  
Nice illustration how different modeling techniques work | Source: [GitHub - Data-Engineer-Camp/dbt-dimensional-modelling: Step-by-step tutorial on building a Kimball dimensional model with dbt](https://github.com/Data-Engineer-Camp/dbt-dimensional-modelling)

Or other data modeling techniques ( [my Tweet](https://twitter.com/sspaeti/status/1707638116360589730))

- Enterprise Data Warehouse (Inmon)
- Star Schema (Kimball)
- Data Vault
- One Big Table (OBT)  
    ![](https://www.ssp.sh/brain/dwh-inmonn-vs-star-schema-vs-data-vault-vs-one-big-table.png)  
    Source: [Data Modeling in the Modern Data Stack | Towards Dev](https://towardsdev.com/data-modeling-in-the-modern-data-stack-d29be964b3a7)

[

## # (Design) Patterns

](https://www.ssp.sh/brain/data-modeling/#design-patterns)

Common approaches are well explained [here](https://youtu.be/IdCmMkQLvGA?t=153):

- [Dimensional Modeling](https://www.ssp.sh/brain/dimensional-modeling)
    - [Data Lake File Format](https://www.ssp.sh/brain/data-lake-file-formats) -> [Data Lake Table Format](https://www.ssp.sh/brain/data-lake-table-format)
- [Relational Model](https://www.ssp.sh/brain/relational-model)
- Graph Data Modeling ?

others

- streaming vs batch processing
- RW Data Pipeline Design Patterns - 1. Data Flow Patterns · Start Data Engineering (Nice Visual)

[

## # Data Modeling is changing

](https://www.ssp.sh/brain/data-modeling/#data-modeling-is-changing)

See [Data Modeling is changing](https://www.ssp.sh/brain/data-modeling-is-changing).

[

## # Tools

](https://www.ssp.sh/brain/data-modeling/#tools)

See Data Modeling Tools or Data Modeling- The Unsung Hero of Data Engineering- Data Architecture Pattern, Tools and The Future (Part 3) .

[

## # Frameworks

](https://www.ssp.sh/brain/data-modeling/#frameworks)

- BEAM from Agile Data Warehouse Design (Lawrence Corr, Jim Stagnitto)
- ADAPT for [OLAP](https://www.ssp.sh/brain/olap) cubes
- …

[](https://www.ssp.sh/brain/data-modeling/#difference-to-dimensional-modeling)

## [# Difference to](https://www.ssp.sh/brain/data-modeling/#difference-to-dimensional-modeling) [Dimensional Modeling](https://www.ssp.sh/brain/dimensional-modeling)

![](https://www.ssp.sh/brain/Data%20Modeling%20%E2%80%93%20The%20Unsung%20Hero%20of%20Data%20Engineering-%20Modeling%20Techniques%20and%20Data%20Architecture%20Patterns%20(Part%202)#Data%20Modeling%20vs.%20Dimensional%20Modeling)

There is more than dimensional modeling:

- hierarchies, semistructured sources, conformed dimensions, historical updates, and the logic used to keep them up to date
- Source: [Serge Gershkovich on LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:6993236783610114048?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6993236783610114048%2C6993250097132130304%29&replyUrn=urn%3Ali%3Acomment%3A%28activity%3A6993236783610114048%2C6993251854910406657%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%286993250097132130304%2Curn%3Ali%3Aactivity%3A6993236783610114048%29&dashReplyUrn=urn%3Ali%3Afsd_comment%3A%286993251854910406657%2Curn%3Ali%3Aactivity%3A6993236783610114048%29)

[

## # Data Modeling part of Data Engineering?

](https://www.ssp.sh/brain/data-modeling/#data-modeling-part-of-data-engineering)

Data modeling, incredibly [Dimensional Modeling](https://www.ssp.sh/brain/dimensional-modeling) with defining facts and dimensions, is a big thing for a data engineer, IMO. It would help if you asked vital questions to optimize for data consumers. Do you want to drill down the different products? Daily or monthly enough —keywords granularity and rollup.

It also lets you think about Big-O implications regarding how often you touch and transfer data. I’d recommend the old  [Data Warehouse Toolkit](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/) from Ralph Kimball, which initiated many of these concepts and is still applicable today. Mostly it’s not done in the beginning, but as soon as you get bigger, you wish you had done more :)

Links:

- [Honest No-BS Data Modeling w/ Juan Sequeda](https://www.linkedin.com/video/event/urn:li:ugcPost:6994285263711596545/)
- [What Is Data Modeling? - DATAVERSITY](https://www.dataversity.net/what-is-data-modeling/)
- [Modern Data Modeling Beyond The Theory - With Veronika Durgin - YouTube](https://youtu.be/3P3wMCYTQJc)

