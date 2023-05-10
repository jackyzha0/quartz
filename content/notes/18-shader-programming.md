---
title: "18-shader-programming"
tags: 
- cosc342
- lecture
---

first triangle
![](https://i.imgur.com/HCRXBXe.png)

SHADER
- Programs implementing the programmable parts of the pipeline 
- Parts of a pipeline 
	- Vertex Shader 
	- Fragment Shader 
	- Others (e.g. Geometry Shader, Tessellation Shader) 
- Name originates from small programs used to calculate the shading of a surface

Shading languages: 
- GLSL 
	- OpenGL Shading Language 
	- C-like syntax 
- HLSL 
	- High-Level Shader Language 
	- Developed by Microsoft for Direct3D 
- CG 
	- C for graphics 
	- Developed by NVIDIA (not supported any more)

SHADER: STRUCTURE
![](https://i.imgur.com/x0Klrx5.png)

SHADER USAGE
1. Create Shader 
2. Load shader program into object 
3. Compile Shader program 
4. Use Shader program (bind)
![](https://i.imgur.com/tEK5Rlh.png)

PASSING PARAMETERS TO SHADER
For passing uniforms to shaders we need to create the location (glGetUniformLocation) and specify the value (glProgramUniformXX) Example: 
- Add a model-view-projection matrix using a 4x4 matrix Note: Example uses OpenGL Mathematics library (glm) - Documentation https://glm.g-truc.net/

Examples
![Add a model-view-projection matrix using a 4x4 matrix](https://i.imgur.com/c0g1ZCR.png)
![Add a colour value using a 4-dimensional vector](https://i.imgur.com/kgyznJB.png)

VERTEX SHADER Remember from the rasterisation pipeline: 
- Handles the processing of individual vertices 
- Input: vertex attributes (usually in model space) 
- Output: vertex attributes (gl_Position is mandatory, usually in screen space) Interface to fixed-function parts of the pipeline: 
	- in int gl_VertexID; 
	- out vec4 gl_Position;
![VERTEX PROCESSING](https://i.imgur.com/cGPI8KB.png)

VERTEX SHADER: TRANSFORMATIONS
![VERTEX SHADER: TRANSFORMATIONS](https://i.imgur.com/wt1iXPv.png)

VERTEX SHADER
Simple vertex shader apply the model view project transformation
![VERTEX SHADER](https://i.imgur.com/gwvP3Fl.png)

SHADER: STRUCTURE
![SHADER: STRUCTURE](https://i.imgur.com/tzOXA67.png)

![Example combining Shader.cpp and basicShader.vert](https://i.imgur.com/NGPfnFW.png)

![](https://i.imgur.com/jqZnNOm.png)
![set camera position](https://i.imgur.com/MT1HOuZ.png)

FRAGMENT SHADER
Simple Fragment Shader outputting specified colou
![Example combining ColourShader.cpp and basicShader.frag](https://i.imgur.com/B9Bmoiy.png)

FRAGMENT SHADER
Simple Fragment Shader outputting gl_FragCoord:
![Simple Fragment Shader outputting gl_FragCoord:](https://i.imgur.com/srSkepU.png)

VERTEX ARRAY OBJECT

- There are different ways how to configure vertex data: 
- Packed Arrays 
- Interleaved Arrays
![different ways how to configure vertex data:](https://i.imgur.com/JR0aIb2.png)
![VERTEX ARRAY OBJECT](https://i.imgur.com/QBoEXgd.png)
VERTEX ARRAY OBJECT 
- If an application renders a lot of different objects, we would need to reconfigure the buffers 
- To avoid this -> Use vertex array objects 
- Vertex Array Object: 
- Holds the state that configures the vertex specification stage: 
- Stores the data format of vertices 
- Buffer object bindings 
- Vertex attribute mapping

EXAMPLE: VERTEX ARRAY OBJECT
![EXAMPLE: VERTEX ARRAY OBJECT](https://i.imgur.com/i8Vu8qU.png)

VERTEX ARRAY OBJECT EXAMPLE
![VERTEX ARRAY OBJECT EXAMPLE](https://i.imgur.com/15Vt1lf.png)

