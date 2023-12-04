Tools for Microsoft provides version control, reporting, requirements management. Project management. automated builds , testing and release capabilities.

### Continuous Integration 

-   Automated tests make sure that the bugs are captured in the early phases, and fewer bugs reach the production phase. 
-   After the issues are resolved efficiently, it becomes easy to build the release.
-   Developers are alerted when they break any build, so they have to rebuild and fix the build before moving forth on to the next task.
- -   As Continuous Integration can run multiple texts within seconds, the costs for testing decreases excessively.
-   When lesser time is invested in testing, more time can be spent in the improvement of quality.
### Continuous Delivery
-   The process of deploying software is no more complex, and now the team does not need to spend a lot of time preparing the release anymore.
- -   The releases can be made more frequently, this in turn speeds up the feedback loop with the customers.
-   The iterations in the case of the process become faster.
### Continuous Deployment
-   There is no need to stop the development for releases anymore, as the entire deployment process is now automated.
- -   The release process is less prone to risks and is easily fixable in the case of any issues, as only the small batches of changes are deployed.
-   There is a continuous chain of improvements in quality with every passing day. The process of development now does not take long duration like a month or a year.

Continuous Delivery vs Deployment
Continuous Delivery is a software engineering practice where the code changes are prepared to be released.
Continuous Deployment aims at continuously releasing the code changes into the production environment.

# Azure pipelines

* **Build pipelines**:
 These takes instructions from yaml file and build and publish artifacts from cloned source code. 
* **Release pipeline**
These pipelines are deploy build artifacts into Agent machines.
* **Create release**
This one help us for complete end to end pipeline for ci/cd impl.


Example azure yaml templates [url](https://github.com/microsoft/azure-pipelines-yaml)


Azure Board supports Agile boards

# Azure DevSecOps [URL](https://havelsan.udemy.com/course/devsecops-with-azure-devops/learn/lecture/33386494#overview)




![[Screenshot from 2023-03-13 14-15-06.png]]


* [[SAST(Static Application Security testing)]]
* [[SCA (Software Composition Analysis)]]
* [[DAST (Dynamic Application Security Testing)]]
* [[IAST(Interactive Application Security Testing)]]
* [[IAC(infrastructure as code)]]
* [[API Security]]

Shift left approach is DevSecOps approach.


## Development stage
* Git secrets
* Security Plugins in IDE
* TruffleHog (has enterprise license) similar to git secrets

## Security
* Code Quality tools (Sonarqube)
* SAST security tools (Fortify, Veracode,Chackmarx)
* SCA tools (Snyk,veracode, fortify,blackduck)
* DAST tools (OWASP,ZAP,WebInspect,Veracode,DAST,ACunetix)
* IAC tools (Synk, bridgecrew)
* Container security (Aqua,Qualys,PrismaCloud)

## Operations

* Build pipeline tools (Jenkins, AWS, GCP Cloudbuild,Azure devops, github actions, Gitlab)
* Cloud security posture (AQUA, bridgeCrews)
* Container Registry Scanning Tools (Aqua,AWS native registry scanning)
* Infrastructure Scanning tools ( Chef inspec(Compliance) ,nessus)
* Clouud security (Azure defender, aws security hub )


# Devsecops in Azure DevOps



![[Screenshot from 2023-03-13 14-34-07.png]]



Take a look at repository section.

https://github.com/asecurityguru/just-another-vulnerable-java-application

Added Azure DevOps yaml ==>
https://github.com/asecurityguru/devsecops-azure-devops-simple-yaml-file-repo

# SonarCloud

SaaS code quality and security tool.  #todos/recordingangel


Sonar cloud custom quality gate ==> for devsecops pipeline add azure yaml.

use section 4 for custom show examples.

**Need to add quality gate for our pipeline**

Use enviroment section in azure devops for token in YAML.

# Snyk 

* Source code 
* SaaS 
* Open source Third party libraries
* Containers
* Infra as Code.

# OWASP ZAP

