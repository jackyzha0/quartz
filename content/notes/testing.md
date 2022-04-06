---
title: Testing
draft: true
---
# Testing
most software will contain bugs
bug severity if not always equivalent to bug priority
testing is seeking out bugs
some test types
- unit tests
- integration tests ⇒ check units work together
- end-to-end tests ⇒ check behaviour of whole program


## 1 Limitations
testing every code path is impossible
- halting problem - cant fully analyse code using code
- proved by alan turing in 1936

good test design focuses on _key cases_ to pass and fail
not probe interaction between units
- this should be done by integration testing

testing may afffect behaviour of code
- testing framework may affect the order of esecution
- testing framework may change execution speed