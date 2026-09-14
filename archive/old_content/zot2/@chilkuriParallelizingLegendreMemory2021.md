

# Parallelizing Legendre Memory Unit Training
Read:: 
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [@chilkuriParallelizingLegendreMemory2021.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/@chilkuriParallelizingLegendreMemory2021.md); [Chilkuri_Eliasmith_2021_Parallelizing Legendre Memory Unit Training.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/S9SRRNVJ/Chilkuri_Eliasmith_2021_Parallelizing%20Legendre%20Memory%20Unit%20Training.pdf); [chilkuriParallelizingLegendreMemory2021-zotero.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/chilkuriParallelizingLegendreMemory2021-zotero.md); [Supplementary PDF](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/I6ID9IH2/Chilkuri%20and%20Eliasmith%20-%202021%20-%20Parallelizing%20Legendre%20Memory%20Unit%20Training.pdf)
Reading Note:: [[Narsimha Reddy Chilkuri, Chris Eliasmith 2021]]

# Abstract
Recently, a new recurrent neural network (RNN) named the Legendre Memory Unit (LMU) was proposed and shown to achieve state-of-the-art performance on several benchmark datasets. Here we leverage the linear time-invariant (LTI) memory component of the LMU to construct a simplified variant that can be parallelized during training (and yet executed as an RNN during inference), resulting in up to 200 times faster training. We note that our efficient parallelizing scheme is general and is applicable to any deep network whose recurrent components are linear dynamical systems. We demonstrate the improved accuracy of our new architecture compared to the original LMU and a variety of published LSTM and transformer networks across seven benchmarks. For instance, our LMU sets a new state-of-the-art result on psMNIST, and uses half the parameters while outperforming DistilBERT and LSTM models on IMDB sentiment analysis.

# Quick Reference


# Top Comments


# Topics


# Tasks


--
# Extracted Annotations and Comments