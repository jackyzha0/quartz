---
title: UWB signal characterization experiment by VNA demo
tags:
  - experiment
---


# Experiment Graph Overview

![](research_career/attachments/Untitled-1.png)


In this experiment, we use VNA Port 1 to eject signal and port2 to receive the signal reflecting by the reflection medium, such as burned tissue.

And we can use VNA to get scattering parameter to do analysis in frequency spectrum, including amplitude information and phase information.

# Experiment Explanations

## What is VNA

![](research_career/attachments/Pasted%20image%2020231016082202.png)

A Vector Network Analyzer (VNA) is a sophisticated electronic instrument used in the field of radio frequency (RF) and microwave engineering. Its primary function is to measure and characterize the electrical behavior of high-frequency components, such as antennas, cables, and passive RF devices like filters and amplifiers. VNAs are essential tools in the design, testing, and maintenance of RF and microwave systems.
## Ejecting Signal

The VNA generates an "ejecting signal," also known as the "incident signal" or "test signal", which is usually be a continuous wave (CW) or narrowband signal. In our VNA equipment, the signal is CW signal, which is at discrete frequencies sweeping in the specific frequency range.

Here I want to name the signal, which is at discrete frequencies sweeping in the specific frequency range, **frequency sweeping signal**

**So we can not acquire UWB signal directly in VNA.**

Here are two possible solutions:

1. Modem our sweep signal to UWB signal.
	* I have already find the way to modem chirp signal to UWB signal, here:
		[Chirp BOK BPSK.pdf](https://pinktalk.online/research_career/attachments/CN101267424A.pdf)
	* Not sure if we can modem our frequency sweeping signal to UWB signal. 

2. Direct using our frequency sweeping signal.
	* Though we don't directly eject UWB signal, our ejecting signal also contains discrete frequencies, which are composition of UWB signal. In this way, we can analysis different frequencies component in UWB separately.
	* Speculatively, we guess the high frequency part's phase information can provide the range detection function. The low frequency part's amplitude information will have a relation with the reflecting medium.

In this experiment demo, we use solution 2.

## Data we get

In this experiment, we can only get scattering parameter, S11 and S12.

![](research_career/attachments/Pasted%20image%2020231016091540.png)

Using this parameter, considering incident as a constant we can get frequency spectrum information, though the signal is not UWB signal

# Experiment Step

## 1. Set up Experiment equipment

*  Prepare the experimental apparatus
	* VNA, Keysight E5063A 100kHz - 6.5GHz
	* UWB antennas
	* N, male - SMA male

* VNA calibration
* Load the UWB antennas to VNA port1 and port2


## 2. Set reference data

* In antenna's near field and far filed, such as 20cm and 40cm, we need to set a specified medium and get S11 and S12 trace data.
* This two experiments will be our reference. Later we can get other S11 and S12 to compare with this data get range and material.


## 3. Data collection

Collect S11 and S12 trace in different reflection mediums and distances between antennas and mediums. 

## 4. Data analysis

We want to build relationship between our data with distance and reflection mediums to show that UWB can have the ability to detect burning tissue level.