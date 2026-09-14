
# Training Compute-Optimal Large Language Models
Read:: - [ ] Hoffmann et al. (2022) - Training Compute-Optimal Large Language Models 🛫2023-11-22 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/7ANXQQDV) 
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage_new/arXiv_2022/Hoffmann%20et%20al_2022_Training%20Compute-Optimal%20Large%20Language%20Models.pdf>)
Reading Note::
Web Rip::
url:: http://arxiv.org/abs/2203.15556

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "hoffmannTrainingComputeOptimalLarge2022" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> We investigate the optimal model size and number of tokens for training a transformer language model under a given compute budget. We find that current large language models are significantly undertrained, a consequence of the recent focus on scaling language models whilst keeping the amount of training data constant. By training over 400 language models ranging from 70 million to over 16 billion parameters on 5 to 500 billion tokens, we find that for compute-optimal training, the model size and the number of training tokens should be scaled equally: for every doubling of model size the number of training tokens should also be doubled. We test this hypothesis by training a predicted compute-optimal model, Chinchilla, that uses the same compute budget as Gopher but with 70B parameters and 4$\times$ more more data. Chinchilla uniformly and significantly outperforms Gopher (280B), GPT-3 (175B), Jurassic-1 (178B), and Megatron-Turing NLG (530B) on a large range of downstream evaluation tasks. This also means that Chinchilla uses substantially less compute for fine-tuning and inference, greatly facilitating downstream usage. As a highlight, Chinchilla reaches a state-of-the-art average accuracy of 67.5% on the MMLU benchmark, greater than a 7% improvement over Gopher.
# Quick Reference

# Top Notes

# Tasks










# Extracted Annotations and Comments

> [!Highlight] Page 1
> 	Kaplan et al. (2020) showed that there is a power law relationship between the number of parameters in an autoregressive language model (LM) and its performance. As a result, the field has been training larger and larger models, expecting performance improvements. One notable conclusion in Kaplan et al. (2020) is that large models should not be trained to their lowest possible loss to be compute optimal. Whilst we reach the same conclusion, we estimate that large models should be trained for many more training tokens than recommended by the authors. Specifically, given a 10  increase computational budget, they suggests that the size of the model should increase 55  while the number of training tokens should only increase 1.8 . Instead, we find that model size and the number of training tokens should be scaled in equal proportions.
> ^UV4HKEFTaX4KBJT5Fp1

> [!Highlight] Page 6
> 	For each FLOP budget, we plot the final loss (after smoothing) against the parameter count in Figure 3 (left). In all cases, we ensure that we have trained a diverse enough set of model sizes to see a clear minimum in the loss. We fit a parabola to each IsoFLOPs curve to directly estimate at what model size the minimum loss is achieved (Figure 3 (left)). As with the previous approach, we then fit a power law between FLOPs and loss-optimal model size and number of training tokens, shown in Figure 3 (center, right). Again, we fit exponents of the form 𝑁𝑜𝑝𝑡 / 𝐶𝑎 and 𝐷𝑜𝑝𝑡 / 𝐶𝑏 and we find that 𝑎 = 049 and 𝑏 = 051—as summarized in Table 2.
> ^NRTMW8IKaX4KBJT5Fp6

> [!Highlight] Page 15
> 	The trend so far in large language model training has been to increase the model size, often without increasing the number of training tokens. The largest dense transformer, MT-NLG 530B, is now over 3  larger than GPT-3’s 170 billion parameters from just two years ago. However, this model, as well as the majority of existing large models, have all been trained for a comparable number of tokens—around 300 billion. While the desire to train these mega-models has led to substantial engineering innovation, we hypothesize that the race to train larger and larger models is resulting in models that are substantially underperforming compared to what could be achieved with the same compute budget
> ^PGJEGCCYaX4KBJT5Fp15






# Figures (blue)

> [!Fig 3]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/2MRBX5QS.png]]
> **Page 6**
> 
> ---
> 	Fig 3
> ^2MRBX5QSaX4KBJT5Fp6

> Figure 3 j IsoFLOP curves. For various model sizes, we choose the number of training tokens such that the final FLOPs is a constant. The cosine cycle length is set to match the target FLOP count. We find a clear valley in loss, meaning that for a given FLOP budget there is an optimal model to train (left). Using the location of these valleys, we project optimal model size and number of tokens for larger models (center and right). In green, we show the estimated number of parameters and tokens for an optimal model trained with the compute budget of Gopher.
> **Page 6**
> ^MAGIFPF4aX4KBJT5Fp6

> Table 3 j Estimated optimal training FLOPs and training tokens for various model sizes. For various model sizes, we show the projections from Approach 1 of how many FLOPs and training tokens would be needed to train compute-optimal models. The estimates for Approach 2 & 3 are similar (shown in Section D.3)
> **Page 8**
> ^MAC2Q5RHaX4KBJT5Fp8

> [!Table 3]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/UTNASG99.png]]
> **Page 8**
> 
> ---
> 	Table 3
> ^UTNASG99aX4KBJT5Fp8












# Further Reading

> - [ ] J. Kaplan, S. McCandlish, T. Henighan, T. B. Brown, B. Chess, R. Child, S. Gray, A. Radford, J. Wu, and D. Amodei. Scaling laws for neural language models. arXiv preprint arXiv:2001.08361, 2020.  #rd #p5 🛫<% tp.date.now("YYYY-MM-DD") %>
> ^QBH2NDPBaX4KBJT5Fp18

> - [ ] R. Thoppilan, D. D. Freitas, J. Hall, N. Shazeer, A. Kulshreshtha, H.-T. Cheng, A. Jin, T. Bos, L. Baker, Y. Du, Y. Li, H. Lee, H. S. Zheng, A. Ghafouri, M. Menegali, Y. Huang, M. Krikun, D. Lepikhin, J. Qin, D. Chen, Y. Xu, Z. Chen, A. Roberts, M. Bosma, Y. Zhou, C.-C. Chang, I. Krivokon, W. Rusch, M. Pickett, K. Meier-Hellstern, M. R. Morris, T. Doshi, R. D. Santos, T. Duke, J. Soraker, B. Zevenbergen, V. Prabhakaran, M. Diaz, B. Hutchinson, K. Olson, A. Molina, E. Hoffman-John, J. Lee, L. Aroyo, R. Rajakumar, A. Butryna, M. Lamm, V. Kuzmina, J. Fenton, A. Cohen, R. Bernstein, R. Kurzweil, B. Aguera-Arcas, C. Cui, M. Croak, E. Chi, and Q. Le. LaMDA: Language models for dialog applications, 2022.  #rd #p5 🛫<% tp.date.now("YYYY-MM-DD") %>
> ^DCQEE499aX4KBJT5Fp20


> J. Kaplan, S. McCandlish, T. Henighan, T. B. Brown, B. Chess, R. Child, S. Gray, A. Radford, J. Wu, and D. Amodei. Scaling laws for neural language models. arXiv preprint arXiv:2001.08361, 2020.
> **Page 18**
> ^9QT9BSILaX4KBJT5Fp18

> J. Kaplan, S. McCandlish, T. Henighan, T. B. Brown, B. Chess, R. Child, S. Gray, A. Radford, J. Wu, and D. Amodei. Scaling laws for neural language models. arXiv preprint arXiv:2001.08361, 2020.
> **Page 18**
> ^N8TI8YGIaX4KBJT5Fp18







# Figures (blue)

> large autoregressive transformers
> **Page 1**
> ^448F35GXaX4KBJT5Fp1

> [!Figure 1]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/Z8ZA22XT.png]]
> **Page 2**
> ^Z8ZA22XTaX4KBJT5Fp2

> Figure 1 j Overlaid predictions. We overlay the predictions from our three different approaches, along with projections from Kaplan et al. (2020). We find that all three methods predict that current large models should be substantially smaller and therefore trained much longer than is currently done. In Figure A3, we show the results with the predicted optimal tokens plotted against the optimal number of parameters for fixed FLOP budgets. Chinchilla outperforms Gopher and the other large models (see Section 4.2).
> **Page 2**
> ^WNLX3ERDaX4KBJT5Fp2

> Table 1 j Current LLMs. We show five of the current largest dense transformer models, their size, and the number of training tokens. Other than LaMDA (Thoppilan et al., 2022), most models are trained for approximately 300 billion tokens. We introduce Chinchilla, a substantially smaller model, trained for much longer than 300B tokens.
> **Page 3**
> 
> ---
> 	Table 1
> ^IQY49YIQaX4KBJT5Fp3

> [!Table 1]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/JH6MSC7P.png]]
> **Page 3**
> 
> ---
> 	Table 1
> ^JH6MSC7PaX4KBJT5Fp3



> [!Table A3]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/C8EQPYFQ.png]]
> **Page 26**
> ^C8EQPYFQaX4KBJT5Fp26

> Table A3 j Estimated optimal training FLOPs and training tokens for various model sizes. Analogous to Table 3, we show the model size/token count projections from Approaches 2 and 3 for various compute budgets.
> **Page 26**
> 
> ---
> 	Table A3
> ^3AMR7PBKaX4KBJT5Fp26

> [!]
> ![[50 Reading/zotlit_plugin/ZtImgExcerpt/7H8J7I4I.png]]
> **Page 26**
> ^7H8J7I4IaX4KBJT5Fp26

> Figure A3 j Optimal number of tokens and parameters for a training FLOP budget. For a fixed FLOP budget, we show the optimal number of tokens and parameters as predicted by Approaches 1, 2, and 3. For an alternate representation, see Figure 1.
> **Page 26**
> 
> ---
> 	Figure A3
> ^65WWVGPSaX4KBJT5Fp26






