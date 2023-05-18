---
title: "21-shadows"
tags: 
- lecture
- cosc342
---


SHADOWS 
- Important depth cue 
- Spatial Relationship between objects 
- Realism 
- Provides information about scene lighting
![](https://i.imgur.com/h6Cu1w0.png)

SHADOWS AS DEPTH CUE 
- Important depth cues 
- Provide information about relative locations
![](https://i.imgur.com/lDUt6Lv.png)

SHADOWS FOR REALISM 
Examples: 
- Missing Shadows 
- Wrong Shadows
![](https://i.imgur.com/rOQh14w.png)

SCENE LIGHTING 
- Position of light sources 
- Types of lights: 
	- Hard shadows vs. soft shadows 
	- Point lights have hard edges 
	- Area lights have soft edges 
- Coloured light sources
![](https://i.imgur.com/VXbUSux.png)

WHAT ARE SHADOWS? 
- Shadows are areas hidden from a light source 
- Surface is only illuminated if nothing blocks its view of the light
![](https://i.imgur.com/jckVgXO.png)

TERMINOLOGY
![TERMINOLOGY](https://i.imgur.com/53biIuI.png)

PROJECTIVE SHADOWS
- Easy to compute 
- Simply project geometry on ground plane 
- Only works on flat shadow receivers, e.g. car on street, player on ground 
- No self-shadows 
- Expensive: needs to be rendered every frame even for static scenes
![](https://i.imgur.com/gVOGSsp.png)

SHADOW/VIEW DUALITY
- A point is in shadow if it not visible from the perspective of the light source 
- Use the view from the light source to compute shadows
![](https://i.imgur.com/55TRlPL.png)

> [!INFO] every ray from the light will hit the scene. if a point is in shadow it is not visivble from the light source

SHADOW MAPPING 
- Use shadow/view duality 
- Two rendering passes 
	- 1st Pass: Rendering shadow map representing the depth from light source 
	- 2nd Pass: Render final image from camera view and check shadow map to see if points are in shadow
![](https://i.imgur.com/r0Pxxyy.png)

SIDE NOTE: RENDER-TO-TEXTURE 
- Render scene into a texture 
- Can be used for post render effects (lab) 
- Can be used for shadow mapping
![](https://i.imgur.com/V2YlA8c.png)

FIRST PASS: RENDER SHADOW MAP 
Create a map of depth values as seen from the light’s point of view 
- Geometry is rendered into a depth buffer from the point of view of the light 
- Transform the geometry into light-view space
![](https://i.imgur.com/WuZ1LJw.png)
![](https://i.imgur.com/90Aeed0.png)

In practice: Vertex shader transforms the geometry into light-view space
![](https://i.imgur.com/ZKd6vYg.png)

- Render to texture: shadowMap 
- Use shadowMap as input for second rendering pass
![](https://i.imgur.com/7q3lsoz.png)

SECOND PASS: RENDER SCENE 
- Render final output from camera view and check shadow map to see if points are in shadow 
- Compare distance between point and light source and value in shadow map 
- If distance larger than value in shadow map point is in shadow
![](https://i.imgur.com/VNRwUPf.png)
![](https://i.imgur.com/AzzKkuq.png)


- Transform points in light space 
- Transform points in shadow map 
- Look up value from shadow map (depthVal(p)) 
- Compute visibility based on: 
- dist(p) > depthVal(p) 
- **In practice**: use vertex shader and fragment shader
![Vertexshader:](https://i.imgur.com/opPV4F0.png)
![Fragmentshader:](https://i.imgur.com/2Bkndf6.png)

Final Shading Step 
- Use calculated visibility to compute fragment’s output colour 
- **In practice**: use visibility in fragment shader:
- ![](https://i.imgur.com/ggc9I79.png)

LIMITATIONS 
- Field of View 
- Surface Acne 
- Aliasing

FIELD OF VIEW PROBLEM 
- What if object is outside field of view of shadow map? 
- No shadows or partial shadows 
- For spot lights, this can be changed by tweaking its range 
- Problem in particular for larger scenes
![](https://i.imgur.com/LSmO1SZ.png)

SURFACE ACNE 
- Self-shadowing problem due to precision and depth map resolution 
	- Depth value in map can differs from actual distance between object and light source 
	- Sampling problem: neighbouring vertices map to the same depth map pixel