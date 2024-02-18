---
title: 
draft: false
tags:
  - argo-proj
aliases:
  - 아르고 프로젝트
---
# #정의
- [Intuit](https://www.intuit.com/careers/teams/software-engineering)사에서 개발한 [[Kubernetes|쿠버네티스]] 확장 오픈소스 프로젝트




# #어원
아르고 프로젝트의 어원은 [프로젝트 창시자의 인터뷰](https://www.decibel.vc/articles/akuity-setting-sail-with-argo-for-every-cloud-native-journey)에서 찾아볼 수 있다:

> [!quote] Jesse Suen - Co-creator of Akuity Inc.
> Argonauts are groups of hard-working deep-sea octopuses that traverse undersea and perform numerous tasks critical to marine biology. When you are building a distributed system on containers such as Kubernetes, Argo makes it possible to orchestrate numerous steps that would be very difficult to do without some extra hands. Though an army of Argonauts are limited to 8 arms each, Argo itself has virtually no limitations in the number of containers it can orchestrate in the cloud.
> 
> 아르고는 열심히 일하는 심해 문어 집단으로 해저를 횡단하며 해양생물학에 중요한 수많은 작업을 수행합니다. 쿠버네티스와 같은 컨테이너에 분산 시스템을 구축할 때, 아르고는 별도의 손 없이는 매우 어려운 수많은 단계를 조정할 수 있습니다. 아르고는 아르고로 구성된 군대가 각각 8개의 팔로 제한되어 있지만, 클라우드에서 조정할 수 있는 컨테이너 수에는 사실상 제한이 없습니다.

위 내용을 바탕으로 유추하자면:

- 아르고(Argo)는 그리스 신화에서 주로 '아르고호'와 연관되어 있으며, 아르고호는 이아손(Jason)과 아르고나우타이(Argonauts)가 황금 양털을 찾기 위한 여정에 사용한 배이다.
- 클라우드 네이티브 업계는 **해양**과 **그리스 신화**에 많은 영감을 받는다.
	- 예시: 도커, [[Kubernetes|쿠버네티스]], 로키, 미미르
- 이 프로젝트는 그리스 신화와 심해 문어에 영감을 받아, 쿠버네티스를 위한 여러 업무를 하는 프로젝트로 **'아르고 (Argo)'** 라는 이름을 정하였다고 볼 수 있다.




# #소개
- 공식 페이지: https://argoproj.github.io
- 마스코트: 그리스 신화에서 영감을 얻은 **문어** ([[Argo Project#어원]] 참조)
	- 하지만 우주를 여행하는 **우주 문어**의 느낌이 난다.
    ![argo|400](https://argoproj.github.io/static/7e59aa017f9653a5d9d22e86fe7f83bb/93d75/gitops-cd.png)




# #예시
아르고의 메인 프로젝트 4개는 다음과 같다:

- [[Argo Workflows|Workflows]]: 쿠버네티스 워크플로우 엔진
- [[Argo CD|CD]]: 쿠버네티스 배포 도구
- [[Argo Rollouts|Rollouts]]: TBA
- [[Argo Events|Events]]: 쿠버네티스 이벤트 생성 도구

그리고 실험적 프로젝트나 메인 프로젝트를 에드온 개발을 위한 [[argoproj-labs|보조 프로젝트]]가 있다.



# #스타-히스토리
#예시 에 나온 프로젝트들의 Github 스타 히스토리를 보면 꾸준히 성장하는 걸 볼 수 있다:

- 메인 프로젝트:
[![Star History Chart](https://api.star-history.com/svg?repos=argoproj/argo-workflows,argoproj/argo-cd,argoproj/argo-rollouts,argoproj/argo-events&type=Date)](https://star-history.com/#argoproj/argo-workflows&argoproj/argo-cd&argoproj/argo-rollouts&argoproj/argo-events&Date)

- 보조 프로젝트: [[argoproj-labs]] 참조
