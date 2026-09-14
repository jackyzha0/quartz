

# A Spike in Performance: Training Hybrid-Spiking Neural Networks with Quantized Activation Functions
Read:: 
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [@voelkerSpikePerformanceTraining2021.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/@voelkerSpikePerformanceTraining2021.md); [arXiv.org Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/UN8EPBJ3/2002.html); [Voelker et al_2021_A Spike in Performance.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/3RNXY9TL/Voelker%20et%20al_2021_A%20Spike%20in%20Performance.pdf); [voelkerSpikePerformanceTraining2021 - Comment 8 pages, 7 page supplementary.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/voelkerSpikePerformanceTraining2021%20-%20Comment%208%20pages,%207%20page%20supplementary.md); [voelkerSpikePerformanceTraining2021-zotero.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/voelkerSpikePerformanceTraining2021-zotero.md)
Reading Note:: [[Aaron R. Voelker, Daniel Rasmussen, Chris Eliasmith 2021]]

# Abstract
The machine learning community has become increasingly interested in the energy efficiency of neural networks. The Spiking Neural Network (SNN) is a promising approach to energy-efficient computing, since its activation levels are quantized into temporally sparse, one-bit values (i.e., "spike" events), which additionally converts the sum over weight-activity products into a simple addition of weights (one weight for each spike). However, the goal of maintaining state-of-the-art (SotA) accuracy when converting a non-spiking network into an SNN has remained an elusive challenge, primarily due to spikes having only a single bit of precision. Adopting tools from signal processing, we cast neural activation functions as quantizers with temporally-diffused error, and then train networks while smoothly interpolating between the non-spiking and spiking regimes. We apply this technique to the Legendre Memory Unit (LMU) to obtain the first known example of a hybrid SNN outperforming SotA recurrent architectures -- including the LSTM, GRU, and NRU -- in accuracy, while reducing activities to at most 3.74 bits on average with 1.26 significant bits multiplying each weight. We discuss how these methods can significantly improve the energy efficiency of neural networks.

# Quick Reference


# Top Comments


# Topics


# Tasks


--
# Extracted Annotations and Comments