---
title: UWB Board OPA699 I/O Test
tags:
  - hardware
  - UWB
date: 2024-02-28
---
# OPA699 Pin Configuration

![](research_career/UWB_about/report/attachments/Pasted%20image%2020240124144133.png)

# Board Realistic Diagram

![](research_career/UWB_about/report/attachments/Pasted%20image%2020240124144847.png)


We call OPAM above as OPAM_1, OPAM below as OPAM_2


# Test Method

![](research_career/UWB_about/report/attachments/c081ff3279755e8e6c176e4255d97c7.jpg)

* Connect oscilloscope to inverting input pin and noninverting input pin.
* Connect oscilloscope to Gnd and inverting input pin.
* Connect oscilloscope to Gnd and noninverting input pin.
* Connect oscilloscope to Gnd and output pin.
* Connect oscilloscope to Gnd and NC pin.


# Results

## OPAM_1

### Pin 2,3 Differential Input

![](research_career/UWB_about/report/attachments/433a119c3e1f83e7ea7157832975943.jpg)

> [!summary] 
>  Peak-Peak Amp ——500mV
>  
>  Frequency —— 10.00MHz


### Pin 2 Inverting Input

![](research_career/UWB_about/report/attachments/b902f9c023b000eb6413aa1649ed201%201.jpg

> [!summary] 
>  Peak-Peak Amp ——640.0mV
>  
>  Frequency —— 10.00MHz


### Pin 3 Noninverting Input

![](research_career/UWB_about/report/attachments/ad2ea92696689e9e923adc3dd45d696%201.jpg)

> [!summary] 
>  Peak-Peak Amp ——392.0mV
>  
>  Frequency —— 9.97MHz

### Pin 6 - Output

![](research_career/UWB_about/report/attachments/5719cb6122c3ba1bef2738606b8214d.jpg)

> [!summary] 
>  Peak-Peak Amp —— 4.32v
>  
>  Frequency —— 10.01MHz


## OPAM_2

### Pin 2,3 Differential Input

![](research_career/UWB_about/report/attachments/433a119c3e1f83e7ea7157832975943%201.jpg)

> [!summary] 
>  Peak-Peak Amp ——500mV
>  
>  Frequency —— 10.00MHz


### Pin 2 Inverting Input

![](research_career/UWB_about/report/attachments/02156794ddb5d9dbb7ca91e3965f6db.jpg)

> [!summary] 
>  Peak-Peak Amp ——576.0mV
>  
>  Frequency —— 10.11MHz


### Pin 3 Noninverting Input

![](research_career/UWB_about/report/attachments/0f51b9ad16d2735614bff788e55dda5.jpg)

> [!summary] 
>  Peak-Peak Amp ——368.0mV
>  
>  Frequency —— 10.02MHz


### Pin 6 - Output

![](research_career/UWB_about/report/attachments/3a3cabdf08d107b7fe5086c7379525b.jpg)

> [!summary] 
>  Peak-Peak Amp ——4.44V
>  
>  Frequency —— 10.03MHz



