Study guide

 #Chapter1 Cloud

 Since there’s no human processing involved in cloud compute billing, it’s as easy for a provider to charge a few pennies as it is thousands of dollars. This metered payment makes it possible to consider entirely new ways of testing and delivering your applications, and it often means your cost-cycle expenses will be considerably lower than they would if you were using physical servers running on-premises.
Comparing the costs of cloud deployments against on-premises deployments requires that you fully account for both capital expenses (capex) and operating expenses (opex). On-premises infrastructure tends to be very capex-heavy since you need to purchase loads of expensive hardware up front. Cloud operations, on the other hand, involve virtually no capex costs at all. Instead, your costs are ongoing, consisting mostly of perhour resource “rental” fees.

# Cloud Platform Models

* Infrastructure as a Service
You’ll learn much more about these examples later in the book, but AWS IaaS products include Elastic Cloud Compute (EC2) for virtual machine instances, Elastic Block Store (EBS) for storage volumes, and Elastic Load Balancing

* Platform as a Service
AWS PaaS products include Elastic Beanstalk and Elastic Container Service (ECS).
* Software as a Service
While some may disagree with the designation, AWS SaaS products arguably include Simple Email Service and Amazon WorkSpaces.
* ![[Screenshot from 2023-03-23 10-00-42.png]]
* Serverless 
*The serverless model—as provided by services like AWS Lambda—makes it possible to design code that reacts to external events. When, for instance, a video file is uploaded to a repository (like an AWS S3 bucket or even an on-premises FTP site), it can trigger a Lambda function that will convert the file to a new video format. There’s no need to maintain and pay for an actual instance running 24/7, just for the moments your code is actually running. And there’s no administration overhead to worry about.

While the precise layout and organization will change over time, as of this writing the main AWS documentation page can be found at https://docs.aws.amazon.com. There you’ll find links to more than 100 AWS services along with tutorials and projects, software development kits (SDKs), toolkits, and general resources.

https://aws.amazon.com/premiumsupport/knowledge-center/ is basically a frequently asked questions (FAQ) page that accidentally swallowed a family pack–sized box of steroids and then walked through the radioactive core of a nuclear power plant wearing wet pajamas. Or, in simpler terms, there’s a lot of information collected here.

The page, found at https://aws.amazon.com/security/security-resources, points to AWS blogs, white papers, articles, and tutorials covering topics such as security best practices and encrypting your data in transit and at rest.

# AWS Global Infrastructure: AWS Regions
AWS performs its cloud magic using hundreds of thousands of servers maintained within physical data centers located in a widely distributed set of geographic regions.

Dividing resources among regions lets you do the following: 
* Locate your infrastructure geographically closer to your users to allow access with the lowest possible latency
* Locate your infrastructure within national borders to meet regulatory compliance with legal and banking rules
* Isolate groups of resources from each other and from larger networks to allow the greatest possible security


AWS Shared Responsibility ==> security and integrity of resource you run on cloud your problem but cloud itself is managed by aws.

Comparing the costs of cloud deployments against on-premises deployments requires that you fully account for both capital expenses (capex) and operating expenses (opex). On-premises infrastructure tends to be very capex-heavy since you need to purchase loads of expensive hardware up front. Cloud operations, on the other hand, involve virtually no capex costs at all. Instead, your costs are ongoing, consisting mostly of per hour resource “rental” fees.

![[Screenshot from 2023-04-03 22-53-28.png]]



IAAS Infrastructure as a Service ==> AWS EC2, Elastic block storage EBS
PAAS Platform as a service ==> aws elastic beanstalk and elastic container service (ECS)
SAAS Software as a Service => simple email service, aws workspace
serverless model => Lambda

# Scalability and Elasticity


scalable service will automatically grow in capacity to seamlessly meet any changes in demand. large cloud provider like AWS will, for all practical purposes, have endless available capacity so the only practical limit to the maximum size of your application is your organization’s budget

Elasticity The reason the word elastic is used in the names of so many AWS services (Elastic Compute Cloud, Elastic Load Balancing, Elastic Beanstalk, and so on) is because those services are built to be easily and automatically resized.

Understand how scalability allows applications to grow to meet need. A cloud-optimized application allows for automated provisioning of server instances that are designed from scratch to perform a needed compute function within an appropriate network environment. Understand how elasticity matches compute power to both rising and falling demand. The scaling services of a cloud provider—like AWS Auto Scaling—should be configured to force compliance with your budget and application needs. You set the upper and lower limits, and the scaler handle

