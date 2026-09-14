

# Hopfield Networks is All You Need
Read:: 
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [@ramsauerHopfieldNetworksAll2020.md](file://G:\My%20Drive\Obsidian\Obsidian\Charlie%20Vault\MDnotes\@ramsauerHopfieldNetworksAll2020.md); [arXiv Fulltext PDF](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/T942KAZL/Ramsauer%20et%20al.%20-%202020%20-%20Hopfield%20Networks%20is%20All%20You%20Need.pdf); [arXiv.org Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/PP7KJ8VZ/2008.html)
Reading Note:: [[Hubert Ramsauer, Bernhard Schäfl, Johannes Lehner, Philipp Seidl, Michael Widrich, Thomas Adler, Lukas Gruber, Markus Holzleitner, Milena Pavlović, Geir Kjetil Sandve, Victor Greiff, David Kreil, Michael Kopp, Günter Klambauer, Johannes Brandstetter, Sepp Hochreiter 2020]]

See the YT video [[Hopfield Networks is All You Need]]
# Abstract
We introduce a modern Hopfield network with continuous states and a corresponding update rule. The new Hopfield network can store exponentially (with the dimension of the associative space) many patterns, retrieves the pattern with one update, and has exponentially small retrieval errors. 

It has three types of energy minima (fixed points of the update): 
(1) global fixed point averaging over all patterns, 
(2) metastable states averaging over a subset of patterns, and 
(3) fixed points which store a single pattern. 
 
The new update rule is equivalent to the attention mechanism used in transformers. This equivalence enables a characterization of the heads of transformer models. These heads perform in the first layers preferably global averaging and in higher layers partial averaging via metastable states. 

The new modern Hopfield network can be integrated into deep learning architectures as layers to allow the storage of and access to raw input data, intermediate results, or learned prototypes. These Hopfield layers enable new ways of deep learning, beyond fully-connected, convolutional, or recurrent networks, and provide pooling, memory, association, and attention mechanisms. 

We demonstrate the broad applicability of the Hopfield layers across various domains. Hopfield layers improved state-of-the-art on three out of four considered multiple instance learning problems as well as on immune repertoire classification with several hundreds of thousands of instances. 

On the UCI benchmark collections of small classification tasks, where deep learning methods typically struggle, Hopfield layers yielded a new state-of-the-art when compared to different machine learning methods. Finally, Hopfield layers achieved state-of-the-art on two drug design datasets. The implementation is available at: https://github.com/ml-jku/hopfield-layers

# Quick Reference


# Top Comments


# Topics


# Tasks


--
# Extracted Annotations and Comments