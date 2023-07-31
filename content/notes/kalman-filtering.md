---
title: "kalman-filtering"
aliases: kalman filtering
tags: CV, HCI, math, 
---

- method of [[sensor-fusion]] using a [[hidden-markov-model]]
- estimate the current state and update previous state factoring in an amount of uncertainty

**Kalman gain
- relative weight given to measurements and current state estimate.
- in highly uncertain conditions a low gain is better otherwise it should be high

**Process**
- predict
	- new estimate is a prediction from previous estimate and know external influences
	- new uncertainty is predicted from old uncertainty and environment uncertainty
- correct
	- estimate of current state is prediction of last state plus gain times the difference between our measurement and the prediction
	- new uncertainly is estimated from predicted uncertainty and the gain
