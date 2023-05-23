---
title: "22-webgl"
tags: 
- lecture
- cosc301
---

WEBGL 
- Derivative of OpenGL 
- More specifically, OpenGL ES version 2.0 
- WebGL 2.0 is based on OpenGL ES 3.0 
- Allows HTML pages to use WebGL to render using GPU resources 
- Provides JavaScript bindings for OpenGL functions 
- WebGL is under development by the Khronos Group 
- Similar to modern OpenGL applications, all rendering is controlled by vertex and fragment shaders 
- Supports GLSL

> [!INFO] platform independent.

WEBGL 
- Inside an HTML `<canvas>` element. 
- Development is likely to involve HTML, CSS, JavaScript, GLSL, in addition to WebGL’s OpenGL-style naming.

![SUPPORT OF WEBGL](https://i.imgur.com/P51IBm1.png)
![WEBGL APPLICATION STRUCTURE](https://i.imgur.com/nOXZNZO.png)

WEBGL “HELLO TRIANGLE”
![](https://i.imgur.com/2dOtRvH.png)
![](https://i.imgur.com/O6b6RSD.png)
![](https://i.imgur.com/HVVFpqi.png)
![](https://i.imgur.com/vrLmGDO.png)
![](https://i.imgur.com/HwvLfOS.png)
![](https://i.imgur.com/3HLWdvB.png)
![](https://i.imgur.com/edVLWnb.png)

> [!INFO] need to bin buffer. tell gl to use this vertex buffer. 
> very similar to opengl.

THREE.JS 
- First released April 2010 
- 3D Javascript Library 
- Under MIT license 
- Uses WebGL for rendering (previously also CanvasRenderer, SVGRenderer) 
- Runs in all browsers that support WebGL 
- Website: threejs.org 
- Library is in single javascript file

- Features: 
	- Scenes: For adding and removing objects during runtime 
	- Cameras: Different camera models (perspective, orthographic) 
	- Lights: Ambient, direction, point and spot lights 
	- Shadows: Control shadow casting and receiving 
	- Materials: Phong, textures 
	- Shaders: GLSL 
	- Objects: Meshes 
	- Geometries: Box, Planes etc. 
	- Loaders: Obj, Json, Collada
	

- First steps 
	- Initialise scene 
	- Initialise camera 
	- Initialise renderer (Obtains rendering context from its domElement)
	
![](https://i.imgur.com/apXFlS3.png)
![](https://i.imgur.com/LdJAGd7.png)


- Setup 
	- Create geometry 	
	- Add geometry to scene 
	- Move camera