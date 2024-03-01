---
title: VNA based simulation of UWB signals
tags:
  - VNA
  - UWB
  - report
date: 2024-02-28
---
## Objective
1. A VNA based experiment setup is constructed for mimicking UWB apparatus.

2. Produce UWB signals by synthesizing waveforms with various frequencies.

3. Validate the setup and UWB signal transmitting/receiving processes by testing the distance among the system and a moving metal obstacle.

## Hypothesis

It is assumed that wave reflecting procedure is linear

## Materials

* VNA device, KEYSIGHT 5063A ENA
* N Male to SMA Female Connector
* UWB antenna, provided by Gary (Shenzhen), bandwidth 3 - 20GHz
* Metal plate, as a wave full reflection obstacle, size 34cm 

![](research_career/UWB_about/attachments/antenna.png)
<center><strong>Fig 1. Geometry of antenna</strong></center>

## Method

### Setup Diagram

![](research_career/UWB_about/attachments/set.png)<center><strong>Fig 2.  Experimental setup overview diagram, using the VNA device to transmit a frequency swept signal from Port1, after the medium reflection from Port2 to get the echo signal, using the VNA to measure the scattering parameters and calculate the obtained signal of the transmitted signal</strong></center>


![](research_career/UWB_about/attachments/setup.png)
<center><strong>Fig 3.   Experimental real-world diagram, the reflective medium used in this diagram is an iron plate</strong></center>

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

### UWB Signal Generation

The present VNA device only can eject sweeping signals, with frequency range 100kHz - 6.5GHz. How to produce UWB signal is the key problem in the experiment.

The key assumption of the experiment is that the signal is transmitted from the VNA Port1 port and received at Port2, and the whole process is linear. Thus,

$$
\text{Eject Signal}, \quad x(t) = \sum_{i}^{N}x_i(t)
$$
$$
\text{Receive Signal}, \quad y(t)=\sum_{i}^N y_i(t)
$$
That is, a UWB signal can be represented by a linear superposition of the swept signals with varying frequency, and at the receiving port, by summing the returned signals responding to the swept emitting waves one can get the full reflected UWB signal.

We can follow the spectrogram of the Gaussian pulse modulated by the cosine signal to adjust the intensity of the signals of different frequencies of our sweep signal, and then get the Gaussian pulse modulated by the cosine signal by summing up these signals, and the following is the mathematical formula analysis and the resultant figure

Gaussian Impulse Signal modulated by the cosine signal:
$$
x(t) = \cos(\omega_c t)\cdot e^{[-\frac{1}{2\sigma^2} \cdot t^2]} = \cos(\omega_c t)\cdot e^{-a\cdot t^2}
$$

where the center frequency $f_c$ is the frequency of the cosine signal and the bandwidth of the pulse is controlled by the parameter $a$ of the Gaussian signal. 

By following two Fourier transform pairs we can obtain the spectrogram of a Gaussian pulse,

$$
e^{-at^2} \leftrightarrow \frac{1}{\sqrt{2a}}e^{-\frac{\omega^2}{4a}}
$$
$$
x(t)cos(\omega_0 t) \leftrightarrow \frac{1}{2}[X(\omega + \omega_0) + X(\omega - \omega_0)]
$$

So, spectrum of cosine signal modulation gaussian pulse:

$$
X(\omega) = \frac{1}{\sqrt{2a}} [e^{-\frac{(\omega + \omega_c)^2}{4a}} + e^{-\frac{(\omega - \omega_c)^2}{4a}}]
$$
Here's the result,

![](research_career/UWB_about/attachments/Pasted%20image%2020231123213936.png)
<center><strong>Fig 4.  The two diagrams above are the magnitude spectrum and phase spectrum derived from the Fourier transform of a Gaussian pulse signal modulated by a cosine signal, the third diagram is the generative gaussian pulse by summing up all frequencies signal by adjusting their magnitude</strong></center>

The two diagrams above are the magnitude spectrum and phase spectrum derived from the Fourier transform of a Gaussian pulse signal modulated by a cosine signal. In generating Gaussian pulses, we consider the spectrogram energy drop to 50% as the termination of the bandwidth. We can get a Gaussian pulse by summing the frequencies we have adjusted according to the above magnitude spectrum and phase spectrum. Under the assumption of a linear system, the swept signal that is emitted can be emitted by us as a Gaussian pulse, and the emitted signal looks as shown in the figure.


### Scattering Parameters


$$
S_{11} = \frac{V_{\text{reflected at port1}}}{V_\text{towars at port1}}
$$
$$
S_{21} = \frac{V_{\text{out of port2}}}{V_{\text{towards port1}}}
$$

$S_{11}$ is defined as the square root of the ratio of the energy reflected from the Port1 port to the input energy, and is often simplified as the ratio of the equivalent reflected voltage to the equivalent incident voltage.

$S_{21}$ represents the insertion loss, that is, how much energy has been transmitted to the destination (Port2), the larger the value, the better, the ideal value is 1, i.e., 0 dB, the larger the S21 the more efficient the transmission, it is generally recommended that the $S_{21}$>0.7, i.e., -3 dB, is considered to have occurred the signal transmission.

###  Time-domain Signal Construction by Scattering Parameters

We can compute the time-domain signal from the scattering parameters, where the transmitted signal can be obtained from the S11 parameter and the received signal from the S21 parameter.

$$
\text{Eject Signal} = \sum_{\text{different frequency}}(1-S_{11_i})\sin(\omega_i t + \phi_i)
$$
$$
\text{Receive Signal} = \sum_{\text{different frequency}} S_{21_i}\sin(\omega_i t + \phi_i)
$$

Also, when we don't set any reflection material in front of the VNA,  there are still $S_{21}$ parameter which we called initial $S_{21}$ parameter, which represents the base energy we can get from the port2. When we calculate the receive signal, we need to minus the base energy and because we adjust deferent frequencies signal's magnitude to fit gaussian pulse, considering these two factors, here's the adjusted formula we calculate the receive signal,

$$
\text{Receive Signal} = \sum_{\text{different frequency}} A_{\text{gaussian}} \cdot (S_{21_i} - S_{21_{\text{initial}}}) \cdot \sin(\omega_i t + \phi_i)
$$

## Procedure

1. Start the VNA device.
2. Set up the VNA measurement parameters.
3. Set the metal plate at different distances from VNA, which are 5cm,10cm,15cm,20cm,25cm,30cm and , which means no reflection.
4. Get S11 and S21 scattering parameter from the metal plate at different distances from VNA.
5. Analyze raw data - scattering parameter.

## Results

### Scattering Parameters - S11, S21

First we focus on the raw data we obtained, the scattering parameters, and cause we emit the adjusted magnitude signal to generate gaussian impulse, we also adjust our S21 parameter to match the adjustments of our launch.

![](research_career/UWB_about/attachments/S%202.png)
<center><strong>Fig 5.  S21 magnitude linear format, multiplied by the  gaussian pulse adjust factor from Fig4</strong></center>

Also, we will minus the base energy we can get from port2 by minus the $S_{21_{initial}}$, here's the result,


![](research_career/UWB_about/attachments/S21_adjust%203.png)
<center><strong>Fig 6.  S21 magnitude linear format, multiplied by the  gaussian pulse adjust factor from Fig4, then minus the base energy</strong></center>


### Energy receiving graph for different distance


Refer to Fig 6, the area under S21 curves for estimating the energy received at Port2, as illustrated in Fig 7. The values are given in Table 2.

![](research_career/UWB_about/attachments/Amp_AUC%202.png)
<center><strong>Fig 7. Area under S21 liner curve of different distance</strong></center>

<table align="center" style="width:100%; border:#000 solid; border-width:1px 0">
<caption><strong>Table 2. The AUC value of S21 liner curve of different distance, normalization to 0 - 1</strong></caption>
<thead style="border-bottom: #o80 1px solid; ">
<tr>
<th style="border:e">Distance</th>
<td style="border:e">AUC</td>
</tr>
</thead>
<tr>
<th style="border:e">5cm</th>
<td style="border:e">1</td>
<tr>
<tr>
<th style="border:e">10cm</th>
<td style="border:e">0.56055976</td>
<tr>
<th style="border : ">15cm</th>
<td style="border:0">0.32978441</td>
<tr>
<th style="border:e">20cm</th>
<td style="border :e">0.17302525</td>
</tr>
<tr>
<th style="border:e">25cm</th>
<td style="border :e">0.16454077</td>
</tr>
<tr>
<th style="border:e">30cm</th>
<td style="border :e">0.11857247</td>
</tr>
<tr>
<th style="border:e">35cm</th>
<td style="border :e">0.08575671</td>
</tr>
<tr>
<th style="border:e">40cm</th>
<td style="border :e">0.06632118</td>
</tr>
</table>


We then used the data from this table to perform polynomial fitting using a grid search method with the MSE (mean squared error) metric as a criterion, as well as five-fold cross-validation, and finally obtained the best result for polynomial fitting as shown below:

![](research_career/UWB_about/attachments/fit%202.png)
<center><strong>Fig 7. Best polynomial function fit for AUC vs. Distance</strong></center>

The best fitting function is,

$$
AUC =  -5.37 \times 10^{-5}d^3 + 4.83 \times 10^{-3} d^2 -1.46 \times 10^{-1} d
$$
We can get distance from this curve function by solving this cubic equation. The fitting assessment result is $MSE = 2.68\times 10^{-4}$ and $r^2 = 0.997$ 

### Receiving Signal Observation


![](research_career/UWB_about/attachments/receiving_signal%201.png)
<center><strong>Fig 8. Signal received for one cycle in different distance</strong></center>

With the S21 parameter and the previously calculated factor, we finally calculate that the signal received by port2, at a minimum frequency of 100kHZ for one cycle. We can get this signals $peak \ peak \ value = max \ value - min \ value$, 

![](research_career/UWB_about/attachments/peak_peak.png)
<center><strong>Fig 9. The Peak-Peak value in receiving signal for different distance</strong></center>

## Conclusion and Problem

### Conclusion

* Echo UWB signal is capable of range detecting
	* By estimating the energy of received signal, the system is able to identify the distance of the metal obstacle ranging 5cm-40cm.
	* In accordance with the third degree polynomial law, the energy of the received echo signal decays rapidly within 20 cm, and then the energy decay tends to level off.

### Problem

* Is the present simulation protocol of emitting/receiving UWB signal reasonable? Are there optimum method for UWB signal simulation?
* The **lack of feed-forward circuitry** in VNAs, compared to mature UWB signal transmitting devices, has a significant impact on the strength of both the emitted and received. As a result, the S21 value in Fig 6 is only about 0.35, far below 0.70.