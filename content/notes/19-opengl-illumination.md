---
title: "19-opengl-illumination"
tags: 
- cosc342
- lecture
---


WHY ILLUMINATION? 
- Illumination is important for perception and understanding of 3D scenes 
- Has visual cues for humans 
- Provides information about 
	- Positioning of light sources 
	- Characteristics of light sources 
	- Materials 
	- Viewpoint


ILLUMINATION MODEL 
- Can be complex 
- Equation for computing illumination 
- Includes: 
	- Light attributes (intensity, colour, position, direction, shape) 
	- Surface attributes (colour, reflectivity, transparency) 
	- Interaction between lights and objects 
- General rendering equation 
	- Introduced 1986 by Kajiya 
	- Global illumination model

> [!INFO] very complex. a light rays bounce around. and in very different ways. 
> we just try to simulate as close as possible
> would usually compute using ray tracing
> 

- OpenGL cannot render full global illumination 
- We need a simplified approximation 
- Local illumination model 
	- Does not consider light reaching after bouncing off other objects 
- Function of: 
	- Viewer position 
	- Light source 
	- Surface material properties 
	- Geometry

> [!INFO] Local illumination model
> does not take into account subsequent path of light. only the first "hit"
> 

- Perpendicular to tangent plane of surface 
- For triangles: 
	- Cross product of two edges of that triangle
![normal of triangle|300](https://i.imgur.com/F66DFQZ.png)

# LIGHT SOURCES
![LIGHT SOURCES|300](https://i.imgur.com/w79lQrA.png)

POINT LIGHT 
- Starts at one point and spreads out in all directions 
- Defined by position 
- Intensity decreases with the square of distance 
- Direction is different at each vertex (light direction = light position – vertex position) 
- Example: light bulb

SPOT LIGHT 
- Light starts at one point and spreads out as cone with defined angle 
- Described by position, direction and width of beam 
- Useful for dramatic light effects (e.g. theatre spot light)

DIRECTIONAL LIGHT
- Described by direction only 
- No position 
- Direction is same for all points 
- Used for light sources that are infinitely far away 
- Intensity does not change depending on distance 
- Used for modelling sun ligh

# REFLECTION MODEL
![REFLECTION MODEL|300](https://i.imgur.com/AhvCYm6.png)

AMBIENT COMPONENT 
- Indirect illumination from light that has been reflected multiple times 
- Does not come from a specific direction 
- “Base” lighting 
- Consists of: 
	- Ambient light component Iₐ 
	- Ambient material factor kₐ
![|300](https://i.imgur.com/8WtVE70.png)

DIFFUSE COMPONENT 
- Also called Lambertian reflection 
- Ideal diffuse surface reflects light equally in all directions 
- Incident ray is reflected in many directions 
	- Independent of view angle (reflects equally in all directions) 
	- But dependent on direction of incoming light (angle between normal N and incident light L : angle of incidence θ)
![|300](https://i.imgur.com/JNo8xkp.png)

DIFFUSE COMPONENT 
Surface Incident Light Diffuse Reflection N θ 
- Also called Lambertian reflection 
- Ideal diffuse surface reflects light equally in all directions 
- Incident ray is reflected in many directions 
	- Independent of view angle (reflects equally in all directions) 
	- But dependent on direction of incoming light (angle between normal N and incident light L : angle of incidence θ)
- Incoming light rays with perpendicular angle to the surface reflect more light 
- The larger the angle θ between normal and incoming light rays, the less light is reflected
![|300](https://i.imgur.com/UX3o4LJ.png)
![|300](https://i.imgur.com/Se6wKWk.png)
![|300](https://i.imgur.com/wVstdLs.png)
![|300](https://i.imgur.com/oLmN3TN.png)

SPECULAR COMPONENT
- Simulates highlights from shiny objects 
- Called specular highlight 
- For ideal reflectors: angle of incidence equals angle of reflection (only visible if R equals V) 
- For non-perfect reflectors: highlight is visible from a range of angles
![|300](https://i.imgur.com/3ki68Pi.png)


- Consists of: 
	- Direction to light source 
	- Reflected ray R ̂ = 2(N ̂ ⋅ L ̂ )N ̂− L (in GLSL using reflect method) 
	- Specular material factor ks 
	- Specular exponent ns (the larger, the smaller the highlight) 
	- ks and ns have no physical meaning (a lot of tweaking required to achieve desired result)
![|300](https://i.imgur.com/JhGqZKQ.png)
![|300](https://i.imgur.com/QaXbihb.png)

REFLECTION MODELS 
- Combine components 
- Different ways to do the computation 
	- Phong 
	- Blinn-Phong 
	- Cook-Torrance 
	- Oren-Naya

PHONG REFLECTION MODEL
![PHONG REFLECTION MODEL(https://i.imgur.com/0JuEGqq.png)

BLINN-PHONG REFLECTION MODEL
- Modification of phong reflection model by Jim Blinn 
- Phong requires to recalculate the dot product (R dot V) 
- Blinn-Phong uses halfway vector (H) between the viewer and light-source vectors
![|300](https://i.imgur.com/cZEimwJ.png)
![|300](https://i.imgur.com/MweKzes.png)
![BLINN vs PHONG|300](https://i.imgur.com/OTZbbRj.png)

# SHADING MODELS
![|300](https://i.imgur.com/0hqXYuI.png)

FLAT SHADING 
- Per polygon 
- Was used for high speed rendering 
- All vertices of one polygons have the same colour 
- Difference between polygons 
- No smooth transitions
![|300](https://i.imgur.com/A7vXECP.png)

GOURAUD SHADING

- Per vertex 
- Interpolative shading 
- Calculate polygon vertex colour 
- Interpolate colours for interior points
![|300](https://i.imgur.com/Ssu1Dzm.png)
![|300](https://i.imgur.com/kY14uv3.png)

**Vertex shader (basicMaterialShaderGouraud.vert)**
``` cpp
float cosTheta = clamp( dot( N,L), 0,1 ); 
float cosAlpha = clamp( dot( V,R ), 0,1 ); //V or E vector for eye vector 
vec3 diffuseComponent = diffuseLightColor* diffuseMatColor * textureVal * cosTheta; 
vec3 ambientComponent = ambientLightColor * ambientMatColor * textureVal; //for simplification we reuse the diffuse texture map for the ambient texture map 
vec3 specularComponent = specularLightColor * specularMatColor * pow(cosAlpha,ns); 
color = 
	// Ambient : simulates indirect lighting 
ambientComponent + 
	// Diffuse : "color" of the object 
diffuseComponent + 
	// Specular : reflective highlight, like a mirror 
specularComponent;
```

PHONG SHADING 
- This is NOT Phong illumination 
- Per fragment 
- Interpolates the surface normals instead of the intensity values 
- Then do calculation of intensities using the interpolated normal 
- Gives better results, especially for highlights
![|300](https://i.imgur.com/XAu4AUA.png)
![|300](https://i.imgur.com/I2mCrPN.png)

**Fragment shader (basicMaterialShader.frag)**
``` cpp 
float cosTheta = clamp( dot( N,L), 0,1 ); 
float cosAlpha = clamp( dot( V,R ), 0,1 ); //V or E vector for eye vector 
vec3 diffuseComponent = diffuseLightColor* diffuseMatColor * textureVal * cosTheta; 
vec3 ambientComponent = ambientLightColor * ambientMatColor * textureVal; //for simplification we reuse the diffuse texture map for the ambient texture map 
vec3 specularComponent = specularLightColor * specularMatColor * pow(cosAlpha,ns); 

color = 
	// Ambient : simulates indirect lighting 
ambientComponent + 
	// Diffuse : "color" of the object 
diffuseComponent + 
	// Specular : reflective highlight, like a mirror 
specularComponent;
```

MATERIAL DEFINITIONS 
- Material Template Library (MTL) can be used to define material settings 
- Defines ambient (Ka), diffuse (Kd), specular (Ks) colours and the specular exponent (Ns) 
- Also allows to define opacity (d) - 1.0 means fully opaque 
- Set texture maps (map_Kd)
![|300](https://i.imgur.com/1yr6lYy.png)
