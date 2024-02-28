---
title: UWB reflected wave simulation experiment by VNA
tags:
  - VNA
  - UWB
  - experiment
---
# Objective 

1. A VNA based experiment setup is constructed for mimicking UWB apparatus.
2. Produce UWB signals by synthesizing waveforms with various frequencies.
3. Validate the setup and UWB signal transmitting/receiving processes by testing the distance among the system and a moving metal obstacle.

# Introduction

## UWB signal generation

Our VNA device only can eject frequency sweeping signal, which means we can eject different frequency sinusoidal signal in a specific frequency range. In our device, the range is about 100kHz - 6.5GHz. So how to eject UWB signal is the key problem in our experiment. 

The key assumption of the experiment is that the signal is transmitted from the VNA port1 port and received from the port2 port, and this whole process is linear. Means,

$$
\text{Eject Signal}, \quad x(t) = \sum_{i}^{N}x_i(t)
$$
$$
\text{Receive Signal}, \quad y(t)=\sum_{i}^N y_i(t)
$$
That is, we can consider that we have emitted a UWB signal by the linear superposition of the different component frequency signals of the swept signal, and superimpose the returned signals to consider that we have obtained the reflected signal of the UWB signal.

We can use the fast Fourier method to obtain the magnitude values and phases of the different frequency components that make up the Gaussian pulse through simulation experiments, so that we can make corresponding guidance for the subsequent adjustment of our VNA equipment to transmit UWB signals. 

Here are the results of the simulation experiment,

![](research_career/attachments/Figure_1%204.png)
<center><strong>Fig 1. Gaussian pulse Fourier transform to obtain magnitude and phase values of different frequency components</strong></center>


![](research_career/attachments/Figure_3.png)
<center><strong>Fig 1. Gaussian pulse Fourier transform to obtain magnitude and phase values of different frequency components, focusing on the range we can generate in our VNA device, 100kHz - 6.5GHz</strong></center>

Therefore, in subsequent experiments, we can adjust the components of the different frequencies of the swept signal we emit to correspond to the frequency-domain diagram in the above figure, and we can use the principle of superposition of linear systems to consider that a UWB signal is emitted, with Gaussian pulses.

# Hypothesis

We assume that sinusoid wave reflecting from the reflection material is a linear system. Based on this linear system, we can build the environment for studying UWB reflected signals.


# Materials

* VNA device, KEYSIGHT 5063A ENA
* N Male to SMA Female Connector
* UWB antenna
* Iron plate

# Method

## Setup Diagram

![](research_career/attachments/Untitled-1.png)
<center><strong>Fig 3.  Experimental setup overview diagram, using the VNA device to transmit a frequency swept signal from port1, after the medium reflection from port2 to get the echo signal, using the VNA to measure the scattering parameters and calculate the obtained signal of the transmitted signal</strong></center>


![](research_career/UWB_about/attachments/微信图片_20231115140355.jpg)
<center><strong>Fig 4.  Experimental real-world diagram, the reflective medium used in this diagram is an iron plate</strong></center>

<table align="center" style="width:100%; border:#000 solid; border-width:1px 0">
<caption><strong>Table 1. The VNA Setup for Measuring</strong></caption>
<thead style="border-bottom: #o80 1px solid; ">
<tr>
<th style="border:e">Option</th>
<td style="border:e">Value</td>
</tr>
</thead>
<tr>
<th style="border:e">RF Power</th>
<td style="border:e">-5dBm</td>
<tr>
<tr>
<th style="border:e">IF Bandwidth</th>
<td style="border:e">70kHz</td>
<tr>
<th style="border : ">Averaging</th>
<td style="border:0">64</td>
<tr>
<th style="border:e">Start Frequency</th>
<td style="border :e">100kHz</td>
</tr>
<tr>
<th style="border:e">Stop Frequency</th>
<td style="border :e">6.5GHz</td>
</tr>
<tr>
<th style="border:e">Number of Frequency Points</th>
<td style="border :e">10001</td>
</tr>
</table>
## Procedure

1. Start the VNA device.
2. Set up the VNA measurement parameters.
3. Set the iron plate at different distances from VNA, which are 5cm,10cm,15cm,20cm,25cm,30cm and $\infty$, which means no reflection medium will be set.
4. Get S11 and S21 scattering parameter from the iron plate at different distances from VNA.

# Results

## Scattering Parameters - S11, S21

First we focus on the raw data we obtained, the scattering parameters.

$$
S_{11} = \frac{V_{\text{reflected at port1}}}{V_\text{towars at port1}}
$$
$$
S_{21} = \frac{V_{\text{out of port2}}}{V_{\text{towards port1}}}
$$
S11 is defined as the square root of the ratio of the energy reflected from the Port1 port to the input energy, and is often simplified as the ratio of the equivalent reflected voltage to the equivalent incident voltage.

S21 represents the insertion loss, that is, how much energy has been transmitted to the destination (Port2), the larger the value, the better, the ideal value is 1, i.e., 0 dB, the larger the S21 the more efficient the transmission, it is generally recommended that the S21>0.7, i.e., -3 dB, is considered to have occurred the signal transmission.

Here's our S21 parameter's result in logarithmic magnitude, the amplitude in dB:

![](research_career/UWB_about/attachments/Figure_1.png)
<center><strong>Fig 5.  The S21 result for different distance between iron plate from VNA, in logarithmic magnitude, "initial" legend means no iron plate be set.</strong></center>

We can convert logarithmic magnitude result into linear result for convince, here's result.

![](research_career/UWB_about/attachments/Figure_2.png)<center><strong>Fig 6. The S21 result for different distance between iron plate from VNA, in linear, "initial" legend means no iron plate be set.</strong></center>


## Energy receiving graph for different distance

For the linear form of S21, we calculate the area under its curve and can qualitatively analyze the energy received by port2, here's the result:

![](research_career/UWB_about/attachments/Amp_AUC.png)<center><strong>Fig 7. Area under S21 liner curve of different distance</strong></center>


## Signal Observation

The different frequency components of the swept signal are superimposed to get what we consider to be the transmitted signal, based on the calculation of the S11 parameter we get the signal transmitted from the antenna after the loss, and based on the S21 parameter we get the received signal.

Below is a generalized graph of the signals in each part of our experiment and graphs specific to each signal.

Generalized graph of the signals in each part of our experiment:

![](research_career/UWB_about/attachments/signal_obersvation.png)
<center><strong>Fig 8. Different signal in this experiment</strong></center>

Graphs specific to each signal:

![](research_career/UWB_about/attachments/eject_value.png)
<center><strong>Fig 9. UWB Impulse signals obtained by linear superposition of different frequency component signals</strong></center>

![](research_career/UWB_about/attachments/eject_signal_after_port.png)
<center><strong>Fig 10. UWB Impulse signals, ejected by UWB antenna</strong></center>

![](research_career/UWB_about/attachments/receive%202.png)
<center><strong>Fig 11. UWB echo signal for different distances between iron plate and VNA</strong></center>


<table align="center" style="width:100%; border:#000 solid; border-width:1px 0">
<caption><strong>Table 2. The Peak-Peak value in receiving signal for different distance</strong></caption>
<thead style="border-bottom: #o80 1px solid; ">
<tr>
<th style="border:e">Distance</th>
<td style="border:e">Peak - Peak Value in t-domain signal</td>
</tr>
</thead>
<tr>
<th style="border:e">5cm</th>
<td style="border:e">0.010178</td>
<tr>
<tr>
<th style="border:e">10cm</th>
<td style="border:e">0.006971</td>
<tr>
<th style="border : ">15cm</th>
<td style="border:0">0.005052</td>
<tr>
<th style="border:e">20cm</th>
<td style="border :e">0.005065</td>
</tr>
<tr>
<th style="border:e">25cm</th>
<td style="border :e">0.005073</td>
</tr>
<tr>
<th style="border:e">30cm</th>
<td style="border :e">0.005099</td>
</tr>
</table>

# Conclusion and Problem

## Conclusion

* We successfully constructed a system for ranging UWB echo signals based on the VNA system reached, which can be demonstrated in the S21 AUC. This demonstrated that when the iron plate was placed at different distances, we clearly received echo signals with different energies, especially in the 5cm-25cm range. When coming to far-field communication, the ranging capability loses its effect. This accomplishes the purpose of our experiment
* This is also confirmed by our reconstructed time-domain signals using the S-parameters, which also show a clear difference in the strength of the time-domain signals when the iron plate is placed at different distances, especially in the range of 5cm - 15cm, which is strongly decreasing, as can be seen in Fig 11 and Table 2.

## Problem

* The experimental environment needs to be improved, we do not have the equipment to clamp the board to carry out **accurate distance measurement**, the accuracy of our experiments is carried out through the human fixation of the board, the accuracy is within 1cm
* The **lack of feed-forward circuitry** in VNAs compared to mature UWB signal transmitting devices has a significant impact on both the strength of the signal we transmit and the signal we receive, making it possible that we may not be able to receive all of the signals that we should be able to receive. Even in this case, our equipment can still be considered to have a range capability of 0 - 25cm.