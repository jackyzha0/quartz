Example yaml file name must be **.gitlab-ci.yaml**

```yaml
stages:
  # - test
  - build
  - deploy

pre-job:
  stage: .pre
  script:
    - echo 'This message is from .pre-job'

build-job:
  stage: build
  script:
    - echo 'This message is from build-job'

test-job:
  stage: test
  script:
    - echo 'This message is from test-job'

deploy-job:
  stage: deploy
  script:
    - echo 'This message is from deploy-job'
    
post-job:
  stage: .post
  script:
    - echo 'This message is from .post-job'
```
![[Screenshot from 2023-03-14 11-12-33.png]]

Default stages use default order other than that you can use
```yaml
stages:
	-test1
	-test2
	-test3
```

Example:
```yaml
stages:
  - build
  - deploy

build:
  image: node
  stage: build
  script:
    # - apt update -y
    # - apt install npm -y
    - npm install
  artifacts:
    paths:
      - node_modules
      - package-lock.json
    # expire_in: 1 week 

deploy:
  image: node
  stage: deploy
  script:
    # - apt update -y
    # - apt install nodejs -y
    - node index.js > /dev/null 2>&1 & # these command runs in background and does not effect timeout
```


## Gitlab Runners

Application that works for picking CI/CD and execute CI/CD jobs.


Settings > shared runners or specific runners 

Runners has tag like docker mongodb ruby. That means which can runners can handle.

for example windows tag we can use in our yaml.
```yaml
windows-info:
    tags:
        - windows
    script:
        - systeminfo
```

Runner must be same version with gitlab.

**sudo gitlab-runner register** for register runner. You can take runner token from setttings

run gitlab-runner locally 
```yaml
stages:
    - build_stage
    - deploy_stage

build:
    stage: build_stage
    script:
        - docker --version
        - docker build -t pyapp .
    tags:
        - localshell
        - localrunner

deploy:
    stage: deploy_stage
    script:
        - docker stop pyappcontainer1 || true && docker rm pyappcontainer1 || true
        - docker run -d --name pyappcontainer1 -p 8080:8080 pyapp
    tags:
        - localshell
        - localrunner
```

 Git-runner add admin group ==> sudo usermod -aG docker gitlab-runner

![[Screenshot from 2023-03-14 13-08-06.png]]

Variables ==> use security token,url , long string etc.
Gitlab variable [url](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

predefine 
```yaml
demo_job:
  script:
    - echo $CI_COMMIT_MESSAGE
    - echo $CI_JOB_NAME
```

direcly set in yaml
```yaml
variables:
    name: 'John'
    message: 'How are you?'

display_message:
    variables:
        name: 'Mark'
    script:
        - echo "Hello $name, $message"
```

secret variable

```yaml
push_image:
    script:
        - docker login -u $USERNAME -p $PASSWORD
        - docker tag pyapp:latest $USERNAME/mypyapp:latest
        - docker push $USERNAME/mypyapp:latest
    tags: 
        - localshell
        - localrunner
```

# Enviroments
```yaml
stages:
  - test
  - build
  - deploy staging
  - automated testing
  - deploy production

variables:
  IMAGE_TAG: $CI_REGISTRY_IMAGE/employee-image:$CI_COMMIT_SHORT_SHA
  STAGING_APP: emp-portal-staging
  PRODUCTION_APP: emp-portal-production

  HEROKU_STAGING: "registry.heroku.com/$STAGING_APP/web"
  HEROKU_PRODUCTION: "registry.heroku.com/$PRODUCTION_APP/web"


lint_test:
  image: python:3.8.0-slim
  stage: test
  before_script:
    - pip install flake8-html
  script:
    - flake8 --format=html --htmldir=flake_reports/
  artifacts:
    when: always
    paths:
      - flake_reports/

pytest:
  image: python:3.8.0-slim
  stage: test
  before_script:
    - pip install pytest-html
    - pip install -r requirements.txt
  script:
    - pytest --html=pytest_reports/pytest-report.html --self-contained-html
  artifacts:
    when: always
    paths:
      - pytest_reports/

build:
  image: docker:latest
  services:
    - docker:dind
  stage: build
  before_script: 
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $IMAGE_TAG .
    - docker images
    - docker push $IMAGE_TAG

deploy_stage:
  image: docker:latest
  services:
    - docker:dind
  stage: deploy staging
  environment:
    name: staging
    url: https://$STAGING_APP.herokuapp.com/
  before_script: 
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker pull $IMAGE_TAG
    - docker tag  $IMAGE_TAG $HEROKU_STAGING
    - docker login -u _ -p $HEROKU_STAGING_API_KEY registry.heroku.com
    - docker push $HEROKU_STAGING
    - docker run --rm -e HEROKU_API_KEY=$HEROKU_STAGING_API_KEY wingrunr21/alpine-heroku-cli container:release web --app $STAGING_APP
    - echo "App deployed to stagig server at https://$STAGING_APP.herokuapp.com/"
  only:
    - main

test_stage:
  image: alpine
  stage: automated testing
  before_script:
    - apk --no-cache add curl
  script:
    - curl https://$STAGING_APP.herokuapp.com/ | grep "Employee Data"
  only:
    - main

deploy_production:
  image: docker:latest
  services:
    - docker:dind
  stage: deploy production
  environment:
    name: production
    url: https://$PRODUCTION_APP.herokuapp.com/
  before_script: 
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker pull $IMAGE_TAG
    - docker tag  $IMAGE_TAG $HEROKU_PRODUCTION
    - docker login -u _ -p $HEROKU_PRODUCTION_API_KEY registry.heroku.com
    - docker push $HEROKU_PRODUCTION
    - docker run --rm -e HEROKU_API_KEY=$HEROKU_PRODUCTION_API_KEY wingrunr21/alpine-heroku-cli container:release web --app $PRODUCTION_APP
    - echo "App deployed to production server at https://$PRODUCTION_APP.herokuapp.com/"Project - deploy to production
  only:
    - main
```

  environment:
    name: production
    url: https://$PRODUCTION_APP.herokuapp.com/

# Dynamic enviroments

https://gitlab.com/gitlab-org/gitlab-runner/-/issues/1809


```yaml
stages:
  - test
  - build
  - deploy feature
  - automated feature testing
  - deploy staging
  - automated testing
  - deploy production

variables:
  IMAGE_TAG: $CI_REGISTRY_IMAGE/employee-image:$CI_COMMIT_SHORT_SHA
  STAGING_APP: emp-portal-staging
  PRODUCTION_APP: emp-portal-production

  HEROKU_STAGING: "registry.heroku.com/$STAGING_APP/web"
  HEROKU_PRODUCTION: "registry.heroku.com/$PRODUCTION_APP/web"


lint_test:
  image: python:3.8.0-slim
  stage: test
  before_script:
    - pip install flake8-html
  script:
    - flake8 --format=html --htmldir=flake_reports/
  artifacts:
    when: always
    paths:
      - flake_reports/

pytest:
  image: python:3.8.0-slim
  stage: test
  before_script:
    - pip install pytest-html
    - pip install -r requirements.txt
  script:
    - pytest --html=pytest_reports/pytest-report.html --self-contained-html
  artifacts:
    when: always
    paths:
      - pytest_reports/

build:
  image: docker:latest
  services:
    - docker:dind
  stage: build
  before_script: 
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $IMAGE_TAG .
    - docker images
    - docker push $IMAGE_TAG

deploy_feature:
  image: docker:latest
  services:
    - docker:dind
  stage: deploy feature
  environment:
    name: review/$CI_COMMIT_REF_NAME
    url: https://$CI_ENVIRONMENT_SLUG.herokuapp.com/
  before_script: 
    - export FEATURE_APP="$CI_ENVIRONMENT_SLUG"
    - export HEROKU_FEATURE="registry.heroku.com/$FEATURE_APP/web"
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - echo "FEATURE_APP=$CI_ENVIRONMENT_SLUG" >> deploy_feature.env
    - docker pull $IMAGE_TAG
    - docker tag  $IMAGE_TAG $HEROKU_FEATURE
    - docker run --rm -e HEROKU_API_KEY=$HEROKU_STAGING_API_KEY wingrunr21/alpine-heroku-cli create $FEATURE_APP
    - docker login -u _ -p $HEROKU_STAGING_API_KEY registry.heroku.com
    - docker push $HEROKU_FEATURE
    - docker run --rm -e HEROKU_API_KEY=$HEROKU_STAGING_API_KEY wingrunr21/alpine-heroku-cli container:release web --app $FEATURE_APP
    - echo "App deployed to FEATURE server at https://$FEATURE_APP.herokuapp.com/"
  artifacts:
    reports:
      dotenv: deploy_feature.env
  only:
    - /^feature-.*$/

test_feature:
  image: alpine
  stage: automated feature testing
  before_script:
    - apk --no-cache add curl
  script:
    - curl https://$FEATURE_APP.herokuapp.com/ | grep "Employee Data"
  dependencies:
    - deploy_feature
  only:
    - /^feature-.*$/

deploy_stage:
  image: docker:latest
  services:
    - docker:dind
  stage: deploy staging
  environment:
    name: staging
    url: https://$STAGING_APP.herokuapp.com/
  before_script: 
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker pull $IMAGE_TAG
    - docker tag  $IMAGE_TAG $HEROKU_STAGING
    - docker login -u _ -p $HEROKU_STAGING_API_KEY registry.heroku.com
    - docker push $HEROKU_STAGING
    - docker run --rm -e HEROKU_API_KEY=$HEROKU_STAGING_API_KEY wingrunr21/alpine-heroku-cli container:release web --app $STAGING_APP
    - echo "App deployed to stagig server at https://$STAGING_APP.herokuapp.com/"
  only:
    - main

test_stage:
  image: alpine
  stage: automated testing
  before_script:
    - apk --no-cache add curl
  script:
    - curl https://$STAGING_APP.herokuapp.com/ | grep "Employee Data"
  only:
    - main

deploy_production:
  image: docker:latest
  services:
    - docker:dind
  stage: deploy production
  environment:
    name: production
    url: https://$PRODUCTION_APP.herokuapp.com/
  before_script: 
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker pull $IMAGE_TAG
    - docker tag  $IMAGE_TAG $HEROKU_PRODUCTION
    - docker login -u _ -p $HEROKU_PRODUCTION_API_KEY registry.heroku.com
    - docker push $HEROKU_PRODUCTION
    - docker run --rm -e HEROKU_API_KEY=$HEROKU_PRODUCTION_API_KEY wingrunr21/alpine-heroku-cli container:release web --app $PRODUCTION_APP
    - echo "App deployed to production server at https://$PRODUCTION_APP.herokuapp.com/"Project - deploy to production
  only:
    - main
  when: manual
  
```


# GitLab DevSecOps

SAST sonar cloud.
```yaml
stages:
    - runSAST

run-sast-job:
    stage: runSAST
    image: maven:3.8.5-openjdk-11-slim
    script: |
      mvn verify package sonar:sonar -Dsonar.host.url=https://sonarcloud.io/ -Dsonar.organization=gitlabdevsecopsintegration -Dsonar.projectKey=gitlabdevsecopsintegration -Dsonar.login=token01 
```
==================================================================
Sonar cloud quality gateways
```
1) Create Custom Quality Gate in SonarCloud and Add conditions to the Quality Gate
2) Assign this Quality Gate to the Project
3) Add script in .gitlab-ci.yml file to enable quality gate check (Note: This will fail your build in case Quality Gate fails)

sleep 5
apt-get update
apt-get -y install curl jq 
quality_status=$(curl -s -u 14ad4797c02810a818f21384add02744d3f9e34d: https://sonarcloud.io/api/qualitygates/project_status?projectKey=gitLabdevsecopsintegration | jq -r '.projectStatus.status')
echo "SonarCloud Analysis Status is $quality_status"; 
if [[ $quality_status == "ERROR" ]] ; then exit 1;fi


-----------Sample JSON Response from SonarCloud or SonarQube Quality Gate API---------------------

{
	"projectStatus": {
		"status": "ERROR",
		"conditions": [
			{
				"status": "ERROR",
				"metricKey": "coverage",
				"comparator": "LT",
				"errorThreshold": "90",
				"actualValue": "0.0"
			}
		],
		"periods": [],
		"ignoredConditions": false
	}
}
```

```yaml
stages:
    - runSAST

run-sast-job:
    stage: runSAST
    image: maven:3.8.5-openjdk-11-slim
    script: |
      apt-get update
      apt-get -y install curl jq
      mvn verify package sonar:sonar -Dsonar.host.url=https://sonarcloud.io/ -Dsonar.organization=gitlabdevsecopsintegrtion -Dsonar.projectKey=gitLabdevsecopsintegration -Dsonar.login=14ad4797c02810a818f21384add02744d3f9e34d
      sleep 5 
      quality_status=$(curl -s -u 14ad4797c02810a818f21384add02744d3f9e34d: https://sonarcloud.io/api/qualitygates/project_status?projectKey=gitLabdevsecopsintegration | jq -r '.projectStatus.status')
      echo "SonarCloud Analysis Status is $quality_status"; 
      if [[ $quality_status == "ERROR" ]] ; then exit 1;fi
```
==================================================================
Test coverage
```
1) Unit Test cases should be present in test folder
2) Junit Plugin should be present in pom.xml
3) Jacoco Plugin should be present in pom.xml
4) Jacoco report execution goal should be present in build tag in pom.xml
5) Maven "verify" goal should be run while running sonar analysis
```

```yaml
stages:
    - runSAST

run-sast-job:
    stage: runSAST
    image: maven:3.8.5-openjdk-11-slim
    script: |
      mvn verify package sonar:sonar -Dsonar.host.url=https://sonarcloud.io/ -Dsonar.organization=gitlabdevsecopsintegration -Dsonar.projectKey=gitlabdevsecopsintegration -Dsonar.login=2fda8f4a1af600afbede42c54c868083d8e34c01 
```
==================================================================
SCA in gitlab security

Steps to integrate Snyk using .gitlab-ci.yml file:

1) Add Snyk Plugin to Pom.xml
2) Define Snyk Token as an environment Variable on the runner machine
3) Add code changes to .gitlab-ci.yml file

```yaml
stages:
    - runSCAScanUsingSnyk

run-sca-job:
    stage: runSCAScanUsingSnyk
    image: maven:3.8.5-openjdk-11-slim
    script: |
      SNYK_TOKEN='2f4afa39-c493-4c6d-b34e-080c1a8f9014'
      export SNYK_TOKEN
      mvn snyk:test -fn
```

==================================================================

DAST tool using OWASP ZAP

```yaml
stages:
    - runDASTScanUsingZAP

run-dast-job:
    stage: runDASTScanUsingZAP
    image: maven:3.8.5-openjdk-11-slim
    script: |
      apt-get update
      apt-get -y install wget
      wget https://github.com/zaproxy/zaproxy/releases/download/v2.11.1/ZAP_2.11.1_Linux.tar.gz
      mkdir zap
      tar -xvf ZAP_2.11.1_Linux.tar.gz
      cd ZAP_2.11.1
      ./zap.sh -cmd -quickurl https://www.example.com -quickprogress -quickout ../zap_report.html 
    artifacts:
      paths:
        - zap_report.html
```
==================================================================
End to end CI/CD pipeline for java projects


```yaml
stages:
    - runSASTScanUsingSonarCloud
    - runSCAScanUsingSnyk
    - runDASTScanUsingZAP

run-sast-job:
    stage: runSASTScanUsingSonarCloud
    image: maven:3.8.5-openjdk-11-slim
    script: |
      mvn verify package sonar:sonar -Dsonar.host.url=https://sonarcloud.io/ -Dsonar.organization=gitlabdevsecopsintegration -Dsonar.projectKey=gitlabdevsecopsintegration -Dsonar.login=2fda8f4a1af600afbede42c54c868083d8e34c01  

run-sca-job:
    stage: runSCAScanUsingSnyk
    image: maven:3.8.5-openjdk-11-slim
    script: |
      SNYK_TOKEN='2f4afa39-c493-4c6d-b34e-080c1a8f9014'
      export SNYK_TOKEN
      mvn snyk:test -fn 

run-dast-job:
    stage: runDASTScanUsingZAP
    image: maven:3.8.5-openjdk-11-slim
    script: |
      apt-get update
      apt-get -y install wget
      wget https://github.com/zaproxy/zaproxy/releases/download/v2.11.1/ZAP_2.11.1_Linux.tar.gz
      mkdir zap
      tar -xvf ZAP_2.11.1_Linux.tar.gz
      cd ZAP_2.11.1
      ./zap.sh -cmd -quickurl https://www.example.com -quickprogress -quickout ../zap_report.html 
    artifacts:
      paths:
        - zap_report.html
```

# Gitlab buildin SAST and DAST
GitLab SAST Analyzer Documentation Page: https://docs.gitlab.com/ee/user/application_security/sast/


GitLab DAST Analyzer Documentation Page: https://docs.gitlab.com/ee/user/application_security/dast/

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - template: DAST.gitlab-ci.yml

variables:
  SAST_EXPERIMENTAL_FEATURES: "true"
  DAST_WEBSITE: http://www.example.com
  DAST_FULL_SCAN_ENABLED: "true" 
  DAST_BROWSER_SCAN: "true"

stages:
  - test
  - runSASTScanUsingSonarCloud
  - runSCAScanUsingSnyk
  - runDASTScanUsingZAP
  - dast

run-sast-job:
    stage: runSASTScanUsingSonarCloud
    image: maven:3.8.5-openjdk-11-slim
    script: |
      mvn verify package sonar:sonar -Dsonar.host.url=https://sonarcloud.io/ -Dsonar.organization=gitlabdevsecopsintegrationkey -Dsonar.projectKey=gitlabdevsecopsintegrationkey -Dsonar.login=9ff892826b54980437f4fb0fbc72f4049ec97585 

run-sca-job:
    stage: runSCAScanUsingSnyk
    image: maven:3.8.5-openjdk-11-slim
    script: |
      SNYK_TOKEN='2f4afa39-c493-4c6d-b34e-080c1a8f9014'
      export SNYK_TOKEN
      mvn snyk:test -fn 
      
run-dast-job:
    stage: runDASTScanUsingZAP
    image: maven:3.8.5-openjdk-11-slim
    script: |
      apt-get update
      apt-get -y install wget
      wget https://github.com/zaproxy/zaproxy/releases/download/v2.11.1/ZAP_2.11.1_Linux.tar.gz
      mkdir zap
      tar -xvf ZAP_2.11.1_Linux.tar.gz
      cd ZAP_2.11.1
      ./zap.sh -cmd -quickurl https://www.example.com -quickprogress -quickout ../zap_report.html 
    artifacts:
      paths:
        - zap_report.html 
```

