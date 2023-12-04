
# Index

* Azure Devops ortaminin kurulmasi
* Azure dev ve hvl bulutun gosterilmesi
* ++[Local install steps](https://www.flexmind.co/azure-devops-local-server/#:~:text=Azure%20DevOps%20Server%20Installation%20Steps%20%3A%201%201.,exe%20file%20downloaded%20for%20us%20.%20More%20items)
```bash
No hosted parallelism has been purchased or granted. To request a free parallelism grant, please fill out the following form https://aka.ms/azpipelines-parallelism-reques

```
* Local Agent kurulmasi
*
### Repo url [link](https://github.com/HVLRED/azure-devops-basics)

### First pipeline yml
Name of file azure-pipeline.yml
```yaml
# Maven
# Build your Java project and run tests with Apache Maven.
# Add steps that analyze code, save build artifacts, deploy, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/java

trigger:
- main

pool:
  name: hvlubuntu

steps:
- task: Maven@1
  inputs:
    mavenPomFile: 'pom.xml'
    publishJUnitResults: true
    testResultsFiles: '**/surefire-reports/TEST-*.xml'
    javaHomeOption: 'JDKVersion'
    mavenVersionOption: 'Default'
    mavenAuthenticateFeed: false
    effectivePomSkip: false
    sonarQubeRunAnalysis: false`
```

![[Pasted image 20230714155723.png]]

**CI/CD Build and Release Pipelines**

![[Pasted image 20230714155935.png]]

### Change index.jsp and trigger pipeline


## Show source code and build dir.


![[Screenshot from 2023-07-14 16-37-45.png]]


### Copy artifacts

```yaml
# Maven

# Build your Java project and run tests with Apache Maven.

# Add steps that analyze code, save build artifacts, deploy, and more:

# https://docs.microsoft.com/azure/devops/pipelines/languages/java

  

trigger:

- main

  

pool:

name: hvlubuntu

  

steps:

- task: Maven@1

inputs:

mavenPomFile: 'pom.xml'

publishJUnitResults: true

testResultsFiles: '**/surefire-reports/TEST-*.xml'

javaHomeOption: 'JDKVersion'

mavenVersionOption: 'Default'

mavenAuthenticateFeed: false

effectivePomSkip: false

sonarQubeRunAnalysis: false`

- task: CopyFiles@2

inputs:

Contents: '**/*.war'

TargetFolder: '$(build.artifactstagingdirectory)'
```

![[Pasted image 20230714164425.png]]

### For see results in azuredevops we need to publish artifacts

![[Pasted image 20230714164855.png]]

```yaml
# Maven
# Build your Java project and run tests with Apache Maven.
# Add steps that analyze code, save build artifacts, deploy, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/java

trigger:
- main

pool:
  name: hvlubuntu

steps:
- task: Maven@1
  inputs:
    mavenPomFile: 'pom.xml'
    publishJUnitResults: true
    testResultsFiles: '**/surefire-reports/TEST-*.xml'
    javaHomeOption: 'JDKVersion'
    mavenVersionOption: 'Default'
    mavenAuthenticateFeed: false
    effectivePomSkip: false
    sonarQubeRunAnalysis: false`
    
- task: CopyFiles@2
  inputs:
    Contents: '**/*.war'
    TargetFolder: '$(build.artifactstagingdirectory)'
- task: PublishPipelineArtifact@1
  inputs:
    targetPath: '$(Pipeline.Workspace)'
    artifact: 'warfile'
    publishLocation: 'pipeline'
```


