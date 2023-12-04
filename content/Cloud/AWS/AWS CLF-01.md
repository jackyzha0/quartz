1**Multi-tenancy** is a **software architecture where a single software instance or application serves multiple customers or user groups, called tenants**[1](https://www.bing.com/ck/a?!&&p=03811f617effd63cJmltdHM9MTY4MTI1NzYwMCZpZ3VpZD0zZWFhOWFlOC03NGY3LTY4M2ItMGMwYi04ODMyNzU2ZTY5ZTkmaW5zaWQ9NTQ1Ng&ptn=3&hsh=3&fclid=3eaa9ae8-74f7-683b-0c0b-8832756e69e9&psq=multi+tenancy+meaning&u=a1aHR0cHM6Ly93d3cucmVkaGF0LmNvbS9lbi90b3BpY3MvY2xvdWQtY29tcHV0aW5nL3doYXQtaXMtbXVsdGl0ZW5hbmN5&ntb=1)[2](https://www.bing.com/ck/a?!&&p=d4bd1f2f65e9884cJmltdHM9MTY4MTI1NzYwMCZpZ3VpZD0zZWFhOWFlOC03NGY3LTY4M2ItMGMwYi04ODMyNzU2ZTY5ZTkmaW5zaWQ9NTQ1Nw&ptn=3&hsh=3&fclid=3eaa9ae8-74f7-683b-0c0b-8832756e69e9&psq=multi+tenancy+meaning&u=a1aHR0cHM6Ly93d3cudGVjaHRhcmdldC5jb20vd2hhdGlzL2RlZmluaXRpb24vbXVsdGktdGVuYW5jeQ&ntb=1)[3](https://www.bing.com/ck/a?!&&p=c3cbe2e48c656247JmltdHM9MTY4MTI1NzYwMCZpZ3VpZD0zZWFhOWFlOC03NGY3LTY4M2ItMGMwYi04ODMyNzU2ZTY5ZTkmaW5zaWQ9NTQ1OA&ptn=3&hsh=3&fclid=3eaa9ae8-74f7-683b-0c0b-8832756e69e9&psq=multi+tenancy+meaning&u=a1aHR0cHM6Ly93d3cuc2ltcGxpbGVhcm4uY29tL3doYXQtaXMtbXVsdGl0ZW5hbmN5LWFydGljbGU&ntb=1). It is the opposite of single tenancy, when a software instance or system has only one user or group[1](https://www.bing.com/ck/a?!&&p=49cc17b36f4fb96aJmltdHM9MTY4MTI1NzYwMCZpZ3VpZD0zZWFhOWFlOC03NGY3LTY4M2ItMGMwYi04ODMyNzU2ZTY5ZTkmaW5zaWQ9NTQ1OQ&ptn=3&hsh=3&fclid=3eaa9ae8-74f7-683b-0c0b-8832756e69e9&psq=multi+tenancy+meaning&u=a1aHR0cHM6Ly93d3cucmVkaGF0LmNvbS9lbi90b3BpY3MvY2xvdWQtY29tcHV0aW5nL3doYXQtaXMtbXVsdGl0ZW5hbmN5&ntb=1). Multi-tenancy is the backbone of cloud computing, where software is hosted, provisioned and managed by a cloud provider and accessed by users over the Internet[1](https://www.bing.com/ck/a?!&&p=df9f98904547e6d5JmltdHM9MTY4MTI1NzYwMCZpZ3VpZD0zZWFhOWFlOC03NGY3LTY4M2ItMGMwYi04ODMyNzU2ZTY5ZTkmaW5zaWQ9NTQ2MA&ptn=3&hsh=3&fclid=3eaa9ae8-74f7-683b-0c0b-8832756e69e9&psq=multi+tenancy+meaning&u=a1aHR0cHM6Ly93d3cucmVkaGF0LmNvbS9lbi90b3BpY3MvY2xvdWQtY29tcHV0aW5nL3doYXQtaXMtbXVsdGl0ZW5hbmN5&ntb=1)[4](https://www.bing.com/ck/a?!&&p=8d572e87cfb1426eJmltdHM9MTY4MTI1NzYwMCZpZ3VpZD0zZWFhOWFlOC03NGY3LTY4M2ItMGMwYi04ODMyNzU2ZTY5ZTkmaW5zaWQ9NTQ2MQ&ptn=3&hsh=3&fclid=3eaa9ae8-74f7-683b-0c0b-8832756e69e9&psq=multi+tenancy+meaning&u=a1aHR0cHM6Ly93d3cudGVjaG9wZWRpYS5jb20vZGVmaW5pdGlvbi8xNjYzMy9tdWx0aXRlbmFuY3k&ntb=1). The tenants are logically isolated from each other, but physically integrated in the shared environment[5](https://www.bing.com/ck/a?!&&p=6c332eaed65358b6JmltdHM9MTY4MTI1NzYwMCZpZ3VpZD0zZWFhOWFlOC03NGY3LTY4M2ItMGMwYi04ODMyNzU2ZTY5ZTkmaW5zaWQ9NTQ2Mg&ptn=3&hsh=3&fclid=3eaa9ae8-74f7-683b-0c0b-8832756e69e9&psq=multi+tenancy+meaning&u=a1aHR0cHM6Ly93d3cuZ2FydG5lci5jb20vZW4vaW5mb3JtYXRpb24tdGVjaG5vbG9neS9nbG9zc2FyeS9tdWx0aXRlbmFuY3k&ntb=1). They can customize some aspects of the software, but not the code.

**SCALABILITY** - ability of a _software system_ to process higher amount of workload on its current hardware resources (_scale up_) or on current and additional hardware resources (_scale out_) without application service interruption;

**ELASTICITY** - ability of the _hardware layer_ below (usually cloud infrastructure) to increase or shrink the amount of the physical resources offered by that hardware layer to the software layer above. The increase / decrease is triggered by business rules defined in advance (usually related to application's demands). The increase / decrease happens on the fly without physical service interruption.

Scalability is the ability of the system to accommodate larger loads just by adding resources either making hardware stronger (scale up) or adding additional nodes (scale out).

Elasticity is the ability to fit the resources needed to cope with loads dynamically usually in relation to scale out. So that when the load increases you scale by adding more resources and when demand wanes you shrink back and remove unneeded resources. Elasticity is mostly important in Cloud environments where you pay-per-use and don't want to pay for resources you do not currently need on the one hand, and want to meet rising demand when needed on the other hand.

**AWS Regions**

AWS has the concept of a Region, which is a physical location around the world where we cluster data centers. We call each group of logical data centers an Availability Zone. Each AWS Region consists of a minimum of three, isolated, and physically separate AZs within a geographic area.

**Avability Zones**

An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking, and connectivity in an AWS Region. AZs give customers the ability to operate production applications and databases that are more highly available, fault tolerant, and scalable than would be possible from a single data center. All AZs in an AWS Region are interconnected with high-bandwidth, low-latency networking, over fully redundant, dedicated metro fiber providing high-throughput, low-latency networking between AZs. All traffic between AZs is encrypted. The network performance is sufficient to accomplish synchronous replication between AZs. AZs make partitioning applications for high availability easy. If an application is partitioned across AZs, companies are better isolated and protected from issues such as power outages, lightning strikes, tornadoes, earthquakes, and more. AZs are physically separated by a meaningful distance, many kilometers, from any other AZ, although all are within 100 km (60 miles) of each other.


**AWS Edge Locations**

Edge locations are endpoints for AWS which are used for **caching content** and used as Content delivery network (CDN).

This consists of Amazon Cloud front (CF).There are many more edge locations than regions (217 Points of Presence (205 Edge Locations and 12 Regional Edge Caches)) across globe.

Edge locations serve requests for CloudFront and Route 53. CloudFront is a content delivery network, while Route 53 is a DNS service. Requests going to either one of these services will be routed to the nearest edge location automatically. **This allows for low latency no matter where the end user is located**.

**AWS Local Zones**

AWS Local Zones allow you to use select AWS services, like compute and storage services, closer to more end-users, providing them very low latency access to the applications running locally.

AWS Local Zones are also connected to the parent region via Amazon’s redundant and very high bandwidth private network, giving applications running in AWS Local Zones fast, secure, and seamless access to the rest of AWS services.

AWS Local Zones have their own connection to the internet and support AWS Direct Connect, so resources created in the Local Zone can serve **local end-users** with very low-latency communications.

# Policy and Role

Users can manage access in AWS through the creation of policies and then associating them with IAM identities or AWS resources. The policy is an AWS object that defines permissions of identity or resource, with which it associates.

AWS undertakes an evaluation of these policies upon the request by a principal entity such as user or role.

[docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#Overview%20of%20Json%20Policies)

Elastic Beanstalk or Elastic Container service ?

EB vs ECS really comes down to control. Do you want to control your scaling and capacity or do you want to have that more abstracted and instead focus primarily on your app. ECS will give you control, as you have to specify the size and number of nodes in the cluster and whether or not auto-scaling should be used. With EB, you simply provide a Dockerfile and EB takes care of scaling your provisioning of number and size of nodes, you basically can forget about the infrastructure with the EB route.

Here's the EB documentation on Docker: [http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.html](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.html)

With ECS you'll have to build the infrastructure first before you can start deploying the the Dockerfile so it really comes down to 1) your familiarity with infrastructure and 2) level of effort that you want to spend on the infrastructure vs the app.