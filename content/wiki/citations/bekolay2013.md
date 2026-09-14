---
zotero-key: RXQPIEJ4
zt-attachments:
  - "6127"
title: Simultaneous unsupervised and supervised learning of cognitive functions in biologically plausible spiking neural networks
citekey: bekolay2013
aliases:
  - Bekolay et al. (2013)
people:
  - Trevor Bekolay
  - Carter Kolbeck
  - Chris Eliasmith
citetype: conferencePaper
year: 2013
tags: []
type: citation
status: open
project: NA
priority: p5
created: 2024-06-07 18:04
---
# Simultaneous unsupervised and supervised learning of cognitive functions in biologically plausible spiking neural networks
Read:: - [x] Bekolay et al. (2013) - **Simultaneous unsupervised and supervised learning of cognitive functions in biologically plausible spiking neural networks** ➕2024-06-07 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/RXQPIEJ4) 
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/422VCF4Z/Bekolay%20et%20al.%20-%20Simultaneous%20unsupervised%20and%20supervised%20learning%20.pdf>)
Reading Note::
Web Rip::
url:: 

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"Obsidian Assets"
WHERE citekey = "bekolay2013" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> We present a novel learning rule for learning transformations of sophisticated neural representations in a biologically plausible manner. We show that the rule can learn to transmit and bind semantic pointers. Semantic pointers have previously been used to build Spaun, which is currently the world's largest functional brain model (Eliasmith et al., 2012) and can perform several complex cognitive tasks. The learning rule combines a previously proposed supervised learning rule and a novel spiking form of the BCM unsupervised learning rule. We show that spiking BCM increases sparsity of connection weights at the cost of increased signal transmission error. We demonstrate that the combined learning rule can learn transformations as well as the supervised rule alone, and as well as the offline optimization used previously. We also demonstrate that the combined learning rule is more robust to changes in parameters and leads to better outcomes in higher dimensional spaces.
# Quick Reference

# Top Notes

# Glossary
[[Prescribed Error Sensitivity]]
[[Bienenstock-Cooper-Munroe Learning]]

# Tasks


# Topics

> ## Prescribed Error Sensitivity (PES) rule #tp
> ^DPGA6SFUa422VCF4Zp2


# Extracted Annotations and Comments

> [!Highlight] Page 2
> 	The encoders and decoders used to represent semantic pointers also enable arbitrary transformations (i.e., mathematical functions) of encoded semantic pointers.
> ^8M8KFYVLa422VCF4Zp2

> [!Highlight] Page 2
> 	Other linear transformations are implemented by multiplying di by a linear operator.
> ^YCWEURXPa422VCF4Zp2

> [!Highlight] Page 2
> 	Nonlinear transformations are implemented by solving for a new set of decoding weights. This is done by minimizing the difference between the decoded estimate of f (x) and the actual f (x), rather than just x, in Equation (4).
>     
> ---
> 	Super unclear
> ^AIGL8LI7a422VCF4Zp2

> [!Highlight] Page 2
> 	The key difference between this rule and backpropagation is that the global-tolocal mapping is done by imposing the portion of the error vector space each neuron is sensitive to via its encoder.
>     
> ---
> 	This would make sense if they better defined encoder
> ^JF7F8A2Qa422VCF4Zp2

> [!Highlight] Page 3
> 	The modification threshold reflects the expectation of a cell’s activity. It is typically calculated as the temporal average of the cell’s activity over a long time window (on the order of hours).
> ^XH4KF4B3a422VCF4Zp3

> [!Highlight] Page 3
> 	The PES rule gives us the ability to minimize some provided error signal, allowing a network to learn to compute a transformation online. However, biological synapses can change when no error signal is present. More practically, transformation learning may be easier in more sparse systems. For these reasons, we propose a new learning rule that combines the error-minimization abilities of the PES rule with the biological plausibility and sparsification of the spiking BCM rule.
> ^WSLSABFWa422VCF4Zp3

> [!Highlight] Page 3
> 	Note that this rule is a generalization of the previously discussed rules; if we set S = 1, this rule is equivalent to PES, and if we set S = 0, this rule is equivalent to spiking BCM.
> ^ZH67A3DFa422VCF4Zp3

> [!Highlight] Page 4
> 	However, these STDP curves do not capture the frequency dependence of STDP. In order to capture those effects, modellers have created STDP rules that take into account triplets and quadruplets of spikes, rather than just pre-post spike pairings (Pfister & Gerstner, 2006).
> ^6DMJR6Z4a422VCF4Zp4












