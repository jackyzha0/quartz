---
title: "NeRFs"
tags: 
---

- https://arxiv.org/pdf/2003.08934.pdf
- https://www.youtube.com/watch?v=CRlN-cYFxTk
- https://www.youtube.com/watch?v=vcNToBI9gWQ

- overfits a neural network to a single data point
- one network fit to each scene. doesn't need to _learn_ new scenes. 
- the weights of the network represent the scene
- more compact than voxels
- inputs:
	- position is system $x$ a 3d vector $(x,y,z)$
	- viewing direction $d$ a 2d vector 
- output
	- colour $c$
	- density $\sigma$ (is there something at that position)
- to render a view 
	- query the model at each location along a ray and ask for a colour and a density
	- get colour at the ~~first~~ every point with an increase in "density"
- by making the loss differentiable, the whole process become differentiable
- every pixel in each image is a datapoint
- achieve multiview consistency by predicting density $\sigma$ only from location $x$ not from viewing direction $d$.
	- but predict colour $c$ from $x$ and $d$
	- _transparency is always the same_
- positional encoding
	- send the input data point to a higher dimensional space in a deterministic way
	- helps with detail by representing data at difference "coarseness"
- hierarchical volume sampling
	- improves ray sampling by making it faster and more accurate by sampling first a coarse level then fine
	- coarse and fine layers in network
	- first sample with coarse at coarse location
	- use this to determine where to sample with fine layer
	- loss if function of fine and coarse. but output is only fine
- single scene takes 1-2 days to train using a single V100 GPU

