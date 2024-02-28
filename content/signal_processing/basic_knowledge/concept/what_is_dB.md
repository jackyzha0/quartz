---
title: What is dB
tags:
- signal-processing
- basic
---
dB is short for decibel, which is a unit that indicates ratio or gain. It is often used to measure *sound intensity*, *signal strength*, *attenuation* and other quantities. 

For example, if a sound has a power of 10 W and another sound has a power of 1 W, then the difference in decibels is 10 dB = 10 log (10/1) = 10 log 10 = 10.

**Signal Noise Ratio** is also measured by dB

## Signal Noise Ratio
$$
{SNR}_{power}=\frac{\text{Average Signal Power}}{\text{Average Noise Power}}
$$

$$
{SNR}_{voltage}=\frac{\text{RMS Signal Voltage}}{\text{RMS Noise Voltage}}
$$

$$
{SNR}_{power}={{SNR}_{voltage}}^2
$$

$$
{SNR}_{dB}=10\log_{10}{{SNR}_{power}}=20\log_{10}{{SNR}_{voltage}}
$$
