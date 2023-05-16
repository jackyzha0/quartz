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

TEXTURING Simulation of different material properties: 
- Color 
- Reflection 
- Gloss 
- Transparency 
- Bumpiness

HOW? 
- When drawing fragments, we use the local colour from the texture image 
- Usually an image 
- Can hold arbitrary information: 
	- Interpreted by shader 
	- Basis for most advanced rendering effects 
- We need a coordinate system on the surface to find the right part of the texture

`vec3 textureVal = texture( myTexture, UV ).rgb;`

OBJECT OR WORLD COORDINATES?
![OBJECT OR WORLD COORDINATES?](https://i.imgur.com/ioq9o8x.png)

TEXTURE MAPPING 
- Process of finding u,v coordinates for each vertex 
- Texture is defined in a normalised space (e.g. for 2D textures:(u,v)∈[0...1,0...1]
![texture, 3d coordinates](https://i.imgur.com/TSKJArL.png)

Often objects are not that simple
![](https://i.imgur.com/kgWzow8.png)

PARAMETRISATION
- Manual mapping 
- Unwrap object (e.g. in Blender)
![](https://i.imgur.com/7EMGSeB.png)
![](https://i.imgur.com/3y8EFow.png)

- Planar mapping 
	- Eliminates one axis (z) and use x and y directly: (u,v)=(x,y) 
	- Looks only good from front
![](https://i.imgur.com/DLQyYK2.png)

- Spherical mapping 
	- p(x,y,z) value of a point is converted into spherical coordinates (theta, phi) 
	- Wraps texture around the object
![](https://i.imgur.com/IVdXGkg.png)

- Box mapping 
	- Similar to planar mapping 
	- But uses 6 textures instead of 1 
	- Used mainly for environment mapping
![](https://i.imgur.com/TRyEwgM.png)
![](https://i.imgur.com/BzSO6nG.png)

TEXTURE ADDRESSING 
- At some point, texture coordinates have to be mapped to texels 
- What happens if coordinates are outside of the image? -> “texture addressing”
![](https://i.imgur.com/mUid6Qm.png)

CHALLENGES 
- Undersampling: one fragment maps to an area covering many texel (Minification)
![](https://i.imgur.com/a3j2Xic.png)

- Oversampling: many fragments map to an area contained by only one texel (Magnification)
![](https://i.imgur.com/gvipnBX.png)

TEXTURE FILTERING
- Interpolate texel value from neighbours

![Nearest Neighbour (lower quality)](https://i.imgur.com/S7i5VqT.png)
![Linear interpolate the neighbours (better quality, slower)](https://i.imgur.com/Ah65ykp.png)

```
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
```

![](https://i.imgur.com/0tzXN9Y.png)

MIPMAPS 
- Start with most detailed texture 
- Reduce to half size by combining (averaging) adjacent four texels 
- Continue to minimum. 
- During rendering choose texture level according to distance
![](https://i.imgur.com/xsooooe.png)
![](https://i.imgur.com/R93jUWB.png)
![](https://i.imgur.com/cYAuCfB.png)

![](https://i.imgur.com/NksVdVt.png)

# APPLICATIONS
BUMP MAPPING
- Create details with changing geometry 
- Modifies the normals used for computing illumination
![](https://i.imgur.com/SYA25ie.png)

ALPHA MAPPING
- Alpha map contains opacity values 
- Use for blending between multiple textures 
- Creating transparency effects 
- Billboard rendering
![](https://i.imgur.com/FH3km40.png)
![](https://i.imgur.com/h0mDQ1W.png)

ENVIRONMENT MAPPING