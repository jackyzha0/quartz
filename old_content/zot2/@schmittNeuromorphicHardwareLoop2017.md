

# Neuromorphic hardware in the loop: Training a deep spiking network on the BrainScaleS wafer-scale system
Read:: 
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [IEEE Xplore Abstract Record](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/WWGSGS8E/7966125.html); [Schmitt et al_2017_Neuromorphic hardware in the loop.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/XAV7T3HQ/Schmitt%20et%20al_2017_Neuromorphic%20hardware%20in%20the%20loop.pdf)
Reading Note:: [[Sebastian Schmitt, Johann Klähn, Guillaume Bellec, Andreas Grübl, Maurice Güttler, Andreas Hartel, Stephan Hartmann, Dan Husmann, Kai Husmann, Sebastian Jeltsch, Vitali Karasenko, Mitja Kleider, Christoph Koke, Alexander Kononov, Christian Mauch, Eric Müller, Paul Müller, Johannes Partzsch, Mihai A. Petrovici, Stefan Schiefer, Stefan Scholze, Vasilis Thanasoulis, Bernhard Vogginger, Robert Legenstein, Wolfgang Maass, Christian Mayr, René Schüffny, Johannes Schemmel, Karlheinz Meier 2017]]

# Abstract
Emulating spiking neural networks on analog neuromorphic hardware offers several advantages over simulating them on conventional computers, particularly in terms of speed and energy consumption. However, this usually comes at the cost of reduced control over the dynamics of the emulated networks. In this paper, we demonstrate how iterative training of a hardware-emulated network can compensate for anomalies induced by the analog substrate. We first convert a deep neural network trained in software to a spiking network on the BrainScaleS wafer-scale neuromorphic system, thereby enabling an acceleration factor of 10000 compared to the biological time domain. This mapping is followed by the in-the-loop training, where in each training step, the network activity is first recorded in hardware and then used to compute the parameter updates in software via backpropagation. An essential finding is that the parameter updates do not have to be precise, but only need to approximately follow the correct gradient, which simplifies the computation of updates. Using this approach, after only several tens of iterations, the spiking network shows an accuracy close to the ideal software-emulated prototype. The presented techniques show that deep spiking networks emulated on analog neuromorphic devices can attain good computational performance despite the inherent variations of the analog substrate.

# Quick Reference


# Top Comments


# Topics


# Tasks


--
# Extracted Annotations and Comments