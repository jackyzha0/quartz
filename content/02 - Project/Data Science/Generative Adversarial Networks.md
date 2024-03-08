---
creation_date: 2023年11月06日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Generative Adversarial Networks

# 01 Background
Generative Adversarial Networks are widely applied in vision tasks, such as Image Synthesis, Video In-painting, and Visual Style Transfer. A typical image-generation GAN contains a **generator** network (G) and a **discriminator** network (D). G is trained to generate fake images that can fool D, while D aims to distinguish the real images and synthetic images.  For example, image synthesis can be shown below.
![Image Synthesis](https://blogs.mathworks.com/deep-learning/files/2021/10/BP3_fig1-1024x390.jpg)

The following formula can be used to describe the process. It is also called the **adversarial loss**.

$$\min_G\max_{D}\mathbb{E}_{x \sim p_{\text{data}}}[\log{D}(x)]+\mathbb{E}_{z\sim p(z)}[\log(D(G(z)))]$$
where 
- $x \sim p_{\text{data}}$ are real training samples
- $z\sim p(z)$ are the random noise samples.
- $G(z)$ is the generated images using the neural network generator $G$
- $D(\cdot)$ is the output of the discriminator, which specifies the probability of the input being real.

In order to understand this formula, note that the discriminator $D$ is simply a classifier that performs a binary classification. Recall the equation of a Binary cross-entropy loss function. 
$$ L(\hat{y}, y) = \text{TODO}$$
This implies that $D(x)$ should be 1 when as it is fed real training data from $p_\text{data}$ and the output of $D(G(z))$ as 0. Calculating the the loss using the binary cross-entropy loss function for both these cases we get the following values.
$$ L(D(x), 1) = \log{D(x)}, \space L(D(G(Z), 0)) = \log{(1-D(G(Z)))} \tag{1}$$
Remember the goal of the discriminator is to maximize the the loss functions, or become better at discriminating between real and fake samples. This gives us the inner portion of the formula above.
$$ 
\max_{D}\left[\log{D}(x)+\log(D(G(z))\right]
$$
If we want the max loss function for the discriminator over a batch of samples, we arrive with the expected $\mathbb{E}$ notation.
$$ 
\max_{D}\left[\mathbb{E}_{x \sim p_{\text{data}}}[\log{D}(x)]+\mathbb{E}_{z\sim p(z)}[\log(D(G(z))]\right] \tag{2}
$$
The generator, on the other hands, needs to trick the discriminator by generating images that are as real as possible. This means that generated images $G(z)$ should pass though the discriminator and be labeled as 1. In other words,  it wants to minimize the chance of an image being fake (0). Looking at the formula, we want to minimize
$$ 
L(D(G(Z)), 0) = \log(1-D(G(Z)))
$$
Or for a batch.
$$
\min_G\left[\mathbb{E}_{z\sim p(z)}[\log(D(G(z)))\right] \tag{3}
$$
Not that the generator is never fed real images, thus we can ignore the first term when putting (2) and (3) together to get (1)
$$
\min_G\max_{D}\mathbb{E}_{x \sim p_{\text{data}}}[\log{D}(x)]+\mathbb{E}_{z\sim p(z)}[\log(D(G(z)))]
$$
To summarize, this means that the discriminator parameters (Defined by D) will maximize the loss function and the generator parameters will minimize the loss function.

> It is important to note that the generator and discriminator are not trained simultaneously, but one at a time, i.e freeze the other network 

This article on [Medium](https://medium.com/analytics-vidhya/understanding-gans-deriving-the-adversarial-loss-from-scratch-ccd8b683d7e2) is a good review on understanding the intuition behind GANs, the random noise vector $z$, and the formula described above. 

## 02 Concepts
- There are two main directions to modify a GAN
	- loss function
	- network backbone
	
![[Pasted image 20240109183227.png]]


# 03 Famous GAN Developments

## GAN (2014)
### Background
**Paper:** [Ian J. Goodfellow et. al., 2014, Generative Adversarial Networks](https://arxiv.org/abs/1406.2661)
**Resources**
- https://medium.com/analytics-vidhya/understanding-gans-deriving-the-adversarial-loss-from-scratch-ccd8b683d7e2
💡 Paper that first outlined the concept of GAN.

## CGANS (2014)
### Background
**Paper:** [Mehdi Mirza and Simon Osindero, 2014, Conditional Generative Adversarial Nets](https://arxiv.org/abs/1411.1784)
## DCGANS (2015)
**Paper:** [Alec Radford et. al., 2015, Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks](https://arxiv.org/abs/1511.06434)


## 3DGANS (2016)
**Paper:** [Learning a Probabilistic Latent Space of Object Shapes via 3D Generative-Adversarial Modeling](http://arxiv.org/abs/1610.07584)