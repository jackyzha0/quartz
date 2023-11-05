---
creation_date: 2023年09月22日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Residual Network
A [[Convolutional Neural Network]] architecture.
## Residual Blocks

![[Pasted image 20230922094003.png | center | 500]]

Residual Blocks allows you to train much deeper networks. 
## Plain Network vs Residual Network
![[Pasted image 20230922094135.png | center | 500 ]]

Helps with [[Vanishing and Exploding gradient problem]]. Helps in training much deeper networks.

Why doesn't it hurt performance? It maintains identify function, which is essential just a single layer. 
![[Pasted image 20230922094800.png | center | 500 ]]
While in plain networks, it's hard to learn the identity function, which may hurt the performance.