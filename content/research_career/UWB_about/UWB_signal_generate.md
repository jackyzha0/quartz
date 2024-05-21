---
title: How to generate UWB signal
tags:
  - UWB
  - signal-processing
date: 2024-01-23
---
# Actual Signals which find use in UWB systems

* Gaussian-derived pulses
* Edge-derived pulses
* Sinc pulses
* Truncated sine pulses
* Chirp signals (frequency sweep)

## Gaussian-derived pulses

Time-domain function:

$$
T_n(t) = \frac{\tau^n (\frac{n}{2})! d^n}{n!} \frac{d^n}{d t^n} e^{-\frac{t^2}{\tau^2}}
$$
Frequency-domain function:


$$
F_n(\omega) = \frac{{\tau^n} (\frac{n}{2})!}{n!} (j\omega)^n \sqrt{\pi \tau^2} e^{-\frac{\pi^2 \omega^2}{4}}
$$


# Methods of generating UWB signals


There are two methods to generate UWB signals. 

1. Radio Frequency (RF)/ microwave analogue techniques
2. Digital synthesis methods such as direct digital synthesis (DSS).


## RF, micro analogue techniques


Modern analogue techniques make use of solid-state devices such as diodes and transistors. 

Diodes:
* Step recovery diodes (SRDs)
* Tunnel diodes
* Schottky diodes

## DDS

### Specific Example of using DDS to generate UWB signal

![](research_career/UWB_about/attachments/Pasted%20image%2020231102151328.png)


In this article, [Circularly Polarized Ultra-Wideband Radar System for Vital Signs Monitoring](https://ieeexplore.ieee.org/document/6491501), it uses AD9959 DDS to control UWB pulse repetition frequency (PRF). This DDS has the capability to generate sinusoids up to 250MHz at 0.1-Hz frequency tuning resolution. The DDS has four channels, one for transmitting pulse, one for storing reference pulse from receiver.

The outputs from the DDS, the sinusoids will be amplified by [op-amps](signal/hardware/device_and_components/op_amp.md)(Texas Instruments Incorporated OPA699, in this article). After amplifying, the signal will be fed to [step recovery diode](signal/hardware/SRD/SRD.md)(SRD). 

The **cascaded shunt mode SRD** with **decreasing lifetime method** of pulse generation produces high amplitude pulses of 3 $V_{p-p}$ at low PRFs (megahertz range), thus the pulse generator can directly drive the antenna subsystem saving the need for expensive broadband power amplifiers

This method is introduced in other article, [Chan, K. K. M., et al. “Efficient Passive Low-Rate Pulse Generator for Ultra-Wideband Radar.” _IET Microwaves, Antennas & Propagation_, vol. 4, no. 12, 2010, p. 2196. _DOI.org (Crossref)_, https://doi.org/10.1049/iet-map.2010.0030.](http://dx.doi.org/10.1049/iet-map.2010.0030). It says that, a commonly used scheme for UWB pulse generation is the **shunt-mode SRD impulse generator**.


![](research_career/UWB_about/attachments/Pasted%20image%2020231102164316.png)


The source, 50 $\Omega$ waveform generator, generates CWs with amplitudes greater than turn-on voltages of SRD1 and SRD2. L1 and SRD1 form the first stage of the shunt-mode harmonic generator, whereas L2 and SRD2 form the second stage. First stage is cascaded with second stage in series configuration.

For different UWB applications, such as 5GHz, 10GHz, ..., we can calculated components' parameters to design. The key formulas are,

$$
\text{Pulse Width} = \pi \sqrt{LC}
$$

$$
\text{Time constant} = RC
$$
After SRDs based pulse generator, the CWs will transform to UWB pulse. The last step is eject the UWB signal by feed network and antenna.

# Reference

* [Papers Read in 2023.11](research_career/papers_read/papers_2023_11.md)
* [Chan, K. K. M., et al. “Efficient Passive Low-Rate Pulse Generator for Ultra-Wideband Radar.” _IET Microwaves, Antennas & Propagation_, vol. 4, no. 12, 2010, p. 2196. _DOI.org (Crossref)_, https://doi.org/10.1049/iet-map.2010.0030.](http://dx.doi.org/10.1049/iet-map.2010.0030).