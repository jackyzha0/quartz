---
title: "20-texture-mapping"
tags: 
- cosc342
- lecture
---

MATERIAL DEFINITIONS 
- Material Template Library (MTL) can be used to define material settings 
- Defines ambient (Ka), diffuse (Kd), specular (Ks) colours and the specular exponent (Ns) 
- Also allows to define opacity (d) - 1.0 means fully opaque 
- Set texture maps (map_Kd)
![](https://i.imgur.com/wuQSsoS.png)

TERMINOLOGY 
- Texture: Array of values: 
	- 2D (most common), 1D, 3D 
	- Colour, depth, alpha, normals 
- Texels (texture elements): Elements of the texture map 
- Texture coordinates: Textures are defined in texture (u, v) coordinates 
	- Coordinates u and v ranging from 0.0 - 1.0 
	- Think of it as a continuous image

WHY TEXTURING? 
- Enhance visual appearance of plain surfaces and objects by applying texture details 
- Two spheres with identical geometry 
- The earth model appears to involve more complex materials for the objects in the scene
- Detail is expensive to model 
- Often the surface of an object is viewed only from a distance 
- We can ‘paint’ the detail on the object instead of increasing the complexity of the object