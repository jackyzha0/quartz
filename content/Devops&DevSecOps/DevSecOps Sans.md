
User access keys provide programmatic access to AWS services using the CLI, PowerShell Tools, and SDKs: 
• Allow full access to AWS under the user's assigned group/policies 
• Do NOT hard-code access keys in source code 
• Do NOT check in to source control repositories 
• Store in the AWS credentials file, user environment variables, or not at all (more on this later)
• Rotate access keys regularly 
• Remove access keys as part of employee off boarding process

### Docker Image to AMI [URL](https://stackoverflow.com/a/45146861)

### Passwords for VM SANS
Username: student Password: StartTheLabs

• Development: rapid and frictionless delivery of features through Agile and Lean methods, by small colocated teams, Continuous Integration, work managed by sticky notes on a wall, “working software over documentation” 
• Operations: minimize firefighting and downtime, maximize stability and efficiency by following ITSM governance frameworks (ITIL, COBIT), rigorous change management, using standardized technology, configuration management, work managed in ticketing systems
• Security and Compliance: risk-focused, assurance of controls through stage gates, point-in-time audits, pen testing, spreadsheets, and checklists

DevOpsSec: break down the barriers with security and compliance

_Dogfooding_ is short for "Eating your own dog food," which represents the practice of using your own products.  For software developers, that means working with, as a real user, the applications you're building, or at least working closely with people who do use it.  Dogfooding provides a number of advantages, both marketing and technical.

Three key characteristics of DevOps unicorns: 
1. Omnipresent culture: around values of accountability, continuous learning, collaboration, and experimentation. High levels of patience, trust, ethics, and empowerment. Little patience for waste and inefficiency in decision making and bureaucracy. 
2. Technology savvy, customer-obsessed business leadership. Executives at all levels fully understand the importance of technology to their success.
3. Optimized organizational structure: prepared to rethink structure, staffing, performance metrics, and ownership




![[Screenshot from 2023-07-27 21-15-52.png]]

Security Development Lifecycle (SDL): Microsoft has had a version of its SDL since 2004. However, in 2008, they began publishing/releasing their SDL, and many companies have used their SDL to model their own internal secure development efforts. They have also released tools to assist with the security activities within the SDL, such as the Attack Surface Analyzer (https://www.microsoft.com/en-us/download/details.aspx?id=24487) and the Microsoft Threat Modeling Tool (https://www.microsoft.com/en-us/download/details.aspx?id=49168).


Amazon has developed an extensive set of cloud-based security services that are available to users of AWS 
• IAM, CloudWatch, CloudTrail, Trusted Advisor, Inspector, DDOS protection, KMS, managed WAF… Shared Responsibility Model 
• Understand and separate what Amazon is responsible for and what the customer is responsible for 
• You are responsible for using AWS capabilities correctly AWS Cloud Compliance 
• Certified operating environments for finance, healthcare, government, PCI 
• Higher SLAs and detailed guidance


CAMS (or CALMS) is a common lens for understanding DevOps and for driving DevOps change Your organization succeeds when it reaches “CALMS” 
• Culture: people come first
• Automation: rely on tools for efficiency and repeatability 
• Lean: apply Lean engineering practices to continuously improve 
• Measurement: use data to drive decisions and improvements
• Sharing: share ideas, information, and goals across silos

Developers are lazy, so make it easy for them to do the right thing. Make systems safe by default: Provide safe libraries and safe default configurations in templates and make them available to engineers. Bake security into base images and watch closely when base (“gold”) images are changed. Publish and evangelize safe patterns. • Engineering autonomy: Provide developers with self-service tools so that they can take responsibility for security in whatever they are working on. • Undifferentiated heavy lifting: Work with Amazon AWS to provide high-quality, safe infrastructure as a service, and leverage the cloud provider’s built-in capabilities to scale efficiently. Take advantage of AWS (cloud) APIs to do security work: snapshot drive for forensic analysis, change firewall config, inventory systems… • Scale engineering (and security) through extensive automation. • Eliminate snowflake configurations through standard deployment tools and templates. • Microservices: Assess risks at the service level and provide transparency to teams. • Continuous Deployment: Hundreds of small changes are made every day, which means that there are many chances for making small errors, so…. • Trust, but verify. No security gates or change review boards. Extensive checks in test and production (security, compliance, reliability…).

In DevOps, the goal is to automate as much of the work as possible through code. Get everything out of paper (policies, procedures, run books, checklists) and spreadsheets and into code that can be reviewed, scanned, tracked, and tested.

All code needs to be checked in to a source code control system/repository—if possible, a common repository or set of repositories shared by dev and ops—not just application code and unit tests written by developers, but database schemas, application configuration specifications, documentation, build and deployment scripts, operational scripts, job schedules, and everything needed to set up, deploy, and run the system, from the bare metal up (configuration cookbooks or manifests and associated tests, hardening templates…

MTTR: Mean Time to Recover or Repair from a failure. Together with Change Failure Rate, this measures the reliability/quality of service and availability. Some teams may want to separately track, and optimize for, MTTD—Mean Time to Detect a failure—so that they can look for ways to identify problems quickly. Note that many DevOps teams do not measure or optimize for MTTF (Mean Time to Failure) because they recognize that failures will happen. Instead, they work on trying to minimize the impact and cost of failures. See John Allspaw: https://www.kitchensoap.com/2010/11/07/mttr-mtbf-formost-types-of-f/

Change Lead Time or Cycle Time. The average time it takes to get a change or fix into production, which is a key metric for DevOps teams (and Lean teams) to optimize for. This can be measured from three points: 1. Change cycle time: from when a change was requested by the business to when it is deployed. This looks at the full value stream, both upstream and downstream of development. 2. Development change lead time: from when development starts to when the change is deployed (a subset of the change cycle time, which focuses on speeding up development, testing, and deployment) 3. Deployment lead time: from when development is finished to when the change is deployed (the tail end of the change cycle time, which focuses on speeding up acceptance testing, change control, and deployment)

## Security measurement
Measure automated test coverage for high-risk code • Track # of vulnerabilities found… and where they were found in the pipeline • Track # of vulnerabilities fixed • How long vulnerabilities remain open (window of exposure) • Type of vulnerability (OWASP Top 10) for Root Cause Analysis • Elapsed time for security testing—make feedback loops as short as possible • False positives versus true positives—improve quality of feedback • Vulnerability escape rate to production.

Continuous Deployment: from 2x/week to 50x/day • Engineers push (small) changes to production on their first day on the job A “Just Culture” shared across the organization • Blameless Postmortems (and Morgue) It is safe to make mistakes—as long as you own them and help fix them • Security Outreach: don’t be a jerk to developers Measure Everything: data-driven learning and decisions • If in doubt, measure it: engineers are “addicted to data porn” • Make data visible: Etsy “worships at the church of graphs” • Use real data to improve security: “attack-driven defense”.

Automatically monitor changes to high-risk code: why is somebody changing crypto or authentication functions?

Attack-driven (and data-driven) defense: monitor attack activity at the application level in production, and use this to prioritize testing and defensive actions. What kind of attacks are you seeing? Replay these attacks to see which ones are succeeding. Make information about security attacks visible to everyone in engineering and ops.


Technology: How do you manage risks in new, rapidly evolving platforms and architectures such as microservices, cloud, containers, serverless? Integrity: Is there enough time to fully test and review changes before they make it to production? Availability: Does frequent change increase chances of failure? Confidentiality: In “you build it, you run it”, how do you control developer access to production data? 

# DevOps Kata - Single Line of Code

Since DevOps is a broad topic, it can be difficult to determine if a team has enough skills and is doing enough knowledge sharing to keep the [Bus Factor](http://en.wikipedia.org/wiki/Bus_factor) low. It can also be difficult for someone interested in learning to know where to start. I thought I’d try to brainstorm some DevOps katas to give people challenges to learn and refine their skills. If you’re worried about your bus factor, challenge less experienced team members to do these katas, imagining the senior team members are unavailable.

## Single Line of Code

Goal: Deploy a change that involves a single line of code to production.

The Deployment Kata is also a useful tool for compliance and governance. By deploying a simple easy-tofollow change, you can walk auditors through how patches, upgrades, and other changes are made to a system, showing them all of the steps and tests, and letting them review the build artifacts and evidence created along the path.


Opportunities for security testing in Continuous Integration are limited because of the rapid cycle time in CI. Testing in CI is designed to catch regressions on a code change. In order to encourage fast feedback to developers, the entire check-in and build/test cycle has to complete within a few minutes at most, which means that tests have to execute quickly and cannot require complex setup. All of the tests that execute in CI have to provide unambiguous pass/fail results. Flakey tests, and tests that may return false positives, will be ignored by development teams. There is no time for comprehensive static or dynamic scanning in Continuous Integration.



CI often includes at least some basic static analysis (checks for hardcoded credentials, dangerous functions, dependency checks) and incremental static analysis checking if this is supported by the tools that you are using


Smoke testing, also called _build verification testing_ or _confidence testing_, is a software testing method that is used to determine if a new software [build](https://www.techtarget.com/searchsoftwarequality/definition/build) is ready for the next testing phase. This testing method determines if the most crucial functions of a program work but does not delve into finer details.


## CD

Pipeline model and control framework built on/extending Continuous Integration and Agile build/test practices • Uses latest good build from CI, packages for deployment, and release • Changes are automatically pushed to test/staging environments to conduct more realistic/comprehensive tests • Can insert manual reviews/testing/approvals between pipeline stages • Log steps and results to provide audit trail from check-in to deploy • Any failures will “stop the line”: No additional changes can be accepted until the failure is corrected • Ensures that code is always ready to be deployed: Changes may be batched up before production release

A CD workflow could consist of the following steps: 
1. IDE checking for coding/security mistakes as code is entered/changed 
2. Pre-commit code reviews
3. Pre-commit smoke test 
4. Commit build in CI with fast feedback to developers: SAST (incremental), automated unit tests with code coverage failure, integration sanity checks (some of these steps could be done in parallel)
5. Software Component Analysis (SCA) on open-source components to identify code with known vulnerabilities (some SCA tools will also check for licensing risks)
6. Alert on high-risk code changes (e.g., unit tests that check hash value of code, or quick scanning for dangerous functions) which require review by InfoSec 
7. Store binaries, configuration files, and other artifacts in repository 
8. Deploy to acceptance test environment (configure and stand up test systems using Puppet/Chef, Terraform, Docker…) and run post-deployment asserts/smoke tests 
9. Automated acceptance and integration testing 
10. Automated performance and load tests (in parallel)
11. Automated dynamic (DAST) scans—with clear pass/fail criteria 
12. Deploy to staging using same deployment tools and instructions as acceptance test—and run postdeployment asserts/smoke tests 
13. Environmental and data migration tests 
14. Code is now ready to be deployed to production
15. Environmental/data migration checks
16. Operations tests 
17. Code is ready to be deployed and released to production
![[Screenshot from 2023-07-29 17-06-55.png]]

![[Screenshot from 2023-07-29 17-09-50.png]]



Blue/Green Deployment is a pattern for managing Continuous Deployment. You run two different environments (one “blue”, one “green”) in production. The blue environment is active. Changes are rolled out to the green environment. Once the changes are deployed and the green environment is running and warmed up, load balancing is used to reroute traffic from the blue to the green environment. Once all customer traffic has been routed to the green environment, the blue environment is available to be updated.


Canary Releasing (https://martinfowler.com/bliki/CanaryRelease.html) Another technique to minimize the impact and risk of Continuous Deployment is “canary releasing”. Changes are pushed to one server and carefully monitored to ensure that the update was done correctly, and everything is running as expected. Then the change is pushed to two servers and checked, then ten servers and checked again, then half of the servers, before finally being pushed to all servers. At any point, if monitoring or other checks determine that the change is not working as expected, the change can be automatically rolled back, or the roll out can be halted until a fix is rolled out

Before deployment, check that operational dependencies are correct After deployment, ensure that the system is set up and running correctly • Simple, end-to-end tests of core functions using test data/simulated transactions • Ensure that all connections are running • Check that monitoring functions are working correctly • Configuration checks • Version/dependency checks • Basic runtime security smoke tests to catch obvious mistakes

![[Screenshot from 2023-07-29 17-18-38.png]]



CD PIPELINE RULES

1. Use the CD pipeline for all changes to all environments: changes to code, infrastructure, and runtime configuration 2. Build the binaries once (and protect them) 3. Keep development and test environments in sync with production (as closely as possible) 4. Isolate differences between environments in runtime variables 5. Stop if any step fails—and fix it immediately 6. Run smoke tests/checks after every deployment 7. Automate repetitive/expensive work 8. Timestamp and record every step
1. Use the CD Pipeline for all changes to all environments: code changes, changes to runtime configuration, changes to infrastructure. 2. Build binaries once. Version them and sign them or otherwise protect them to ensure that they are not tampered with along the pipeline stages. 3. Use automated configuration management to set up development and test environments to match production (as closely as possible) and to keep all environments in sync. 4. Isolate differences between environments (test, acceptance, staging, production…) in runtime variables that are supplied to the configuration. 5. If any step fails, stop the line. Based on Toyota’s Lean Manufacturing principles: if something is wrong, pull the “Andon Cord”. 6. Run automated health checks/smoke tests after every deployment or configuration change. 7. Automate repetitive and expensive work wherever possible—minimize manual steps and checks. 8. Audit everything, taking advantage of logs from automated tools. Protect and archive these logs to ensure integrity.

![[Screenshot from 2023-07-29 17-27-10.png]]


production runtimes are immutable, and nobody has direct access to production servers. Every change (to applications and to infrastructure) must be checked in to source control and deployed through automated pipelines. All pipelines must be identified and registered in advance. Every change must be peer reviewed and must pass several levels of testing and scanning.

https://www.cloudbees.com/blog/blue-ocean-makes-creating-pipelines-fun-and-intuitive-teams-doing-continuous-delivery

Some security tools can’t be easily automated in pipelines—simpler tools that are API-driven work best • Some checks take too long and have to be done out of band • Get Security, Dev, and Ops working together to solve problems • Help engineers to write their own tests

![[Screenshot from 2023-07-29 23-22-40.png]]

In many cases, the “code is the design”, which means that to understand the design, people need to be able to read the code. And this also means that the design changes as the code changes—which is often.

CODE IS DESIGN

This makes it difficult for InfoSec to understand where and how they can review the design for security risks. How do you do threat modeling of the design when the design is never finished and is always changing?


Tools to help perform rapid risk assessments: 
• PayPal risk questionnaire for new apps/services
• Mozilla Rapid Risk Assessment (RRA) model: 30-minute review 
• Slack goSDL for questions to determine initial risk rating


High-level, basic risk assessments should be done in upfront platform selection and architecture decisions. This should focus on:
• Data classification: What data is sensitive, restricted, or confidential and needs to be protected? What are the legal/compliance restrictions and obligations (for auditing, archival, encryption…)?

• Security risks in platform choice (OS, cloud platform), data management solutions (SQL or NoSQL), languages, and frameworks. The team needs to understand their tools and how to use them properly.

• CD toolchain support: What scanning (DAST, SAST, IAST) tools and other test tools are available based on the language(s) and platform that the team is using?


Ask these questions when you are making changes (based on SAFECode’s Tactical Threat Modeling Guide): 
1. Are you changing the attack surface? 
2. Are you changing the technology stack?
3. Are you changing application security controls? 
4. Are you adding confidential/sensitive data?
5. Are you modifying high-risk code?
https://safecode.org/safecodepublications/tactical-threat-modeling/

### Version Control
* Local (e.g., RCS, SCCS) 
• Client-Server (e.g., CVS, Subversion)
• Distributed (e.g., git, mercurial) 

![[Screenshot from 2023-07-29 23-41-33.png]]


[**Code ownership is a model in which a developer or team of developers are responsible for a specific piece of code within a software project**](https://www.bing.com/ck/a?!&&p=24374ec20bcf6785JmltdHM9MTY5MDU4ODgwMCZpZ3VpZD0wNmQ1ZjAwYS0wOTVlLTYyN2QtMGFiZC1lMzNkMDhjNzYzMDkmaW5zaWQ9NTY2OA&ptn=3&hsh=3&fclid=06d5f00a-095e-627d-0abd-e33d08c76309&psq=CODEOWNERS&u=a1aHR0cHM6Ly9jb2Rlb3duZXJzLmNvbS9sZWFybi93aGF0LWlzLWNvZGUtb3duZXJzaGlwLw&ntb=1)[1](https://www.bing.com/ck/a?!&&p=12a7ff66e9db05a1JmltdHM9MTY5MDU4ODgwMCZpZ3VpZD0wNmQ1ZjAwYS0wOTVlLTYyN2QtMGFiZC1lMzNkMDhjNzYzMDkmaW5zaWQ9NTY2OQ&ptn=3&hsh=3&fclid=06d5f00a-095e-627d-0abd-e33d08c76309&psq=CODEOWNERS&u=a1aHR0cHM6Ly9jb2Rlb3duZXJzLmNvbS9sZWFybi93aGF0LWlzLWNvZGUtb3duZXJzaGlwLw&ntb=1). [Code owners can be defined in the special file named CODEOWNERS](https://www.bing.com/ck/a?!&&p=165034411758d5e3JmltdHM9MTY5MDU4ODgwMCZpZ3VpZD0wNmQ1ZjAwYS0wOTVlLTYyN2QtMGFiZC1lMzNkMDhjNzYzMDkmaW5zaWQ9NTY3MA&ptn=3&hsh=3&fclid=06d5f00a-095e-627d-0abd-e33d08c76309&psq=CODEOWNERS&u=a1aHR0cHM6Ly93d3cuamV0YnJhaW5zLmNvbS9oZWxwL3NwYWNlL2NvZGUtb3duZXJzLmh0bWw&ntb=1)[2](https://www.bing.com/ck/a?!&&p=6d50054bf9cb3a7bJmltdHM9MTY5MDU4ODgwMCZpZ3VpZD0wNmQ1ZjAwYS0wOTVlLTYyN2QtMGFiZC1lMzNkMDhjNzYzMDkmaW5zaWQ9NTY3MQ&ptn=3&hsh=3&fclid=06d5f00a-095e-627d-0abd-e33d08c76309&psq=CODEOWNERS&u=a1aHR0cHM6Ly93d3cuamV0YnJhaW5zLmNvbS9oZWxwL3NwYWNlL2NvZGUtb3duZXJzLmh0bWw&ntb=1). [People with write permissions for the repository can create or edit the CODEOWNERS file and be listed as code owners](https://www.bing.com/ck/a?!&&p=2088f5aee47567fdJmltdHM9MTY5MDU4ODgwMCZpZ3VpZD0wNmQ1ZjAwYS0wOTVlLTYyN2QtMGFiZC1lMzNkMDhjNzYzMDkmaW5zaWQ9NTY3Mg&ptn=3&hsh=3&fclid=06d5f00a-095e-627d-0abd-e33d08c76309&psq=CODEOWNERS&u=a1aHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vZW4vcmVwb3NpdG9yaWVzL21hbmFnaW5nLXlvdXItcmVwb3NpdG9yeXMtc2V0dGluZ3MtYW5kLWZlYXR1cmVzL2N1c3RvbWl6aW5nLXlvdXItcmVwb3NpdG9yeS9hYm91dC1jb2RlLW93bmVycw&ntb=1)[3](https://www.bing.com/ck/a?!&&p=a32460b9b8ab7422JmltdHM9MTY5MDU4ODgwMCZpZ3VpZD0wNmQ1ZjAwYS0wOTVlLTYyN2QtMGFiZC1lMzNkMDhjNzYzMDkmaW5zaWQ9NTY3Mw&ptn=3&hsh=3&fclid=06d5f00a-095e-627d-0abd-e33d08c76309&psq=CODEOWNERS&u=a1aHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vZW4vcmVwb3NpdG9yaWVzL21hbmFnaW5nLXlvdXItcmVwb3NpdG9yeXMtc2V0dGluZ3MtYW5kLWZlYXR1cmVzL2N1c3RvbWl6aW5nLXlvdXItcmVwb3NpdG9yeS9hYm91dC1jb2RlLW93bmVycw&ntb=1). [People with admin or owner permissions can require that pull requests have to be approved by code owners before they can be me

Take advantage of engineering teams that are “test obsessed”: • Ensure high levels of unit test coverage for high-risk code • Review unit tests as well as code when changes are made • Use “OWASP User Security Stories”, “Abuse Cases”, and OWASP ASVS Verification Requirements to come up with test cases (more later) • Make tests count: too many tests will make it expensive to change code • Red means STOP—ensure team does not ignore/remove broken tests • Write unit tests first when fixing vulnerabilities • Leverage unit tests to refactor buggy/complex code—cover the code in tests, then clean it up in small steps • Use Unit tests to alert on changes to high-risk code (more later)

![[Screenshot from 2023-07-30 00-45-44.png]]


![[Screenshot from 2023-07-30 01-44-31.png]]


Evil User Story: As a software engineer, I shall not be able to deploy highrisk code to production without a security review

• security controls (authentication, password handling, access control, output encoding libraries, data entitlement checks, user management, crypto methods) • admin functions • application code that works with private data • runtime frameworks • public network-facing APIs • legacy code that is known to be tricky to change (high complexity…) or that is known to be buggy • release/deployment scripts or tooling


Many organizations (especially large enterprises) operate a centralized “Scanning Factory” where code is scanned periodically, the results triaged and reviewed by InfoSec and then submitted back to the development team for remediation. However, by this time, the developers may have already moved on to other work, especially in Agile environments… and in Continuous Deployment, the code has already been deployed to production


![[Screenshot from 2023-07-30 02-02-49.png]]


