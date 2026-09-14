---
zotero-key: 8LZBQCLP
zt-attachments:
  - "6296"
title: Period Detection and Future Trend Prediction Using Machine Learning Techniques
aliases:
  - Lu et al. (2018)
people:
  - Haoye Lu
  - Anand Srinivasan
  - Amiya Nayak
dateadd: 2024-12-18T13:59:11.000Z
citetype: journalArticle
year: 2018
journal: 2018 IEEE International Conference on Internet of Things (iThings) and IEEE Green Computing and Communications (GreenCom) and IEEE Cyber, Physical and Social Computing (CPSCom) and IEEE Smart Data (SmartData)
DOI: 10.1109/Cybermatics_2018.2018.00161
tags:
  - Periodicity
type:
  - citation
status: open
project:
  - NA
priority:
  - p5
created: 2024-12-19 01:32
modified: 2024-12-20 11:52
---
# Period Detection and Future Trend Prediction Using Machine Learning Techniques
> [!About]
> Read:: - [ ] Lu et al. (2018) - **Period Detection and Future Trend Prediction Using Machine Learning Techniques** ➕2024-12-19 !!2 #rd #citation #todoist
> Print::  ❌
> Zotero Link:: [Zotero](zotero://select/library/items/8LZBQCLP)
> Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/HYBJ28PR/8726481.html>)
> Reading Note:: [[Period Detection and Future Trend Prediction Using Machine Learning Techniques - glossary]]
> Web Rip::
> url:: https://ieeexplore.ieee.org/document/8726481/
> notes::
> ---
> Abstract:: Period detection and trend prediction algorithms have widely ranged applications in many areas. Data involving periodic properties are omnipresent. However, while many general prediction methods are proposed, the prediction algorithms related to periodic data are hardly discussed. Also, period detection methods are still limited to the applications of autocorrelation functions. In this paper, we propose an algorithm, using learning automata techniques, to predict future trend and detect period. Given a repeating sequence, our method can automatically find its period and make predictions on its future values. To the best of our knowledge, this is the first algorithm that can automatically find the period of the inputs and further use it to predict future trend. The theoretical analysis and simulation results are also discussed in this paper.
> ```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"Obsidian Assets"
WHERE citekey = ""
SORT file.cday DESC
>```

# Quick Reference

# Top Notes

# Tasks








# Topics

> ## Extrapolation is a process that uses the known function values within some range to estimate the one outside it [1]. In particular, if it is a function of time, then the extrapolation becomes a prediction. This statistical technique has been applied in many fields including medicine [2], [3], civil engineering [4]. #tp
>
> 	 Extrapolation
> ^T7Z5JIAUaHYBJ28PR

> ## Time series analysis is another classical method to make predictions. It assumes that future events depend on the past ones (in particular, a function of the previous events). #tp
>
> 	 Time series analysis
> ^VVWVMWE6aHYBJ28PR

> ## The spectral theorem in time series shows that all time series can be divided into periodic and polynomial components [5]. So two components can be estimated independently followed by extrapolations for predictions. #tp
>
> 	 Spectral theorem
> ^XVUTH5WXaHYBJ28PR

> ## autocorrection function (ACF) #tp
> ^B6838RMRaHYBJ28PR


# Extracted Annotations and Comments

> [!Highlight] Page
> 	While many trend predication techniques are come up, the methods for detecting period are limited. Current methods are mainly derived from the spectral theory [5] we mentioned in the previous paragraph. Since a time series can be decomposed into periodic and polynomial components, the periodic component is extracted and further applied the autocorrection function (ACF) [13]. Then the value at which achieves the maximum of the ACF is considered as the period.
> ^SQWU8E3RaHYBJ28PR

> [!Highlight] Page
> 	we propose a period detection algorithm integrated trend prediction
> ^NMNXYWNJaHYBJ28PR

> [!Highlight] Page
> 	the method attempts different possible periods and deploys the same number of LAs
> ^HGJX824RaHYBJ28PR

> [!Highlight] Page
> 	If the period attempted matches the real one, all the environments in which the LAs function become stationary which leads to the accurate predictions of the LAs.
> ^SZTVLECVaHYBJ28PR

> [!Highlight] Page
> 	We propose two schemes to attempt possible input data periods. The brute-force method starts attempts from one and increments the tentative period until it matches the input's periods. A more efficient method is achieved by finding all primes factors of the input period.
> ^NB7SE5RVaHYBJ28PR

> [!Highlight] Page
> 	After obtaining all the factors, the period equals the product of them.
> ^ETGVF7U5aHYBJ28PR

> [!Highlight] Page
> 	The analysis shows that the observations required for period detection is upper bounded by a polynomial function, and for the most of the cases, the number of observations stays at a low level.
> ^2PWWVK24aHYBJ28PR

> [!Highlight] Page
> 	According to the simulation results, the predicted value matches the input value if the correct input period is found. Before this, the phase offsets between them can be observed.
> ^LS68MAAVaHYBJ28PR

> [!Highlight] Page
> 	In each iteration step, the algorithm attempts the potential prime factors starting from two.
> ^VT9NTA85aHYBJ28PR

> [!Highlight] Page
> 	Let
> Q
> z
>  denote the a list of primes factors of
> z
>  (may contain duplicated elements).
> ^C2RVU7IJaHYBJ28PR

> [!Highlight] Page
> 	may contain duplicated elements)
> ^Y423CD4UaHYBJ28PR

> [!Highlight] Page
> 	The formula of
> G(n)
>  shows that its value is proportional to
> U
> , which is a pre-known upper bound of the input sequence period.
>
> ---
> 	Ok so we set an upper bound at least
> ^48P7LJZIaHYBJ28PR












