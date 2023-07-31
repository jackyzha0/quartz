---
title: "17-OpenGL-essentials"
tags: 
- cosc-342
- lecture
sr-due: 2023-08-03
sr-interval: 3
sr-ease: 250
---

> [!INFO] better to use gPU for computations and rendering because it can do multiple operations in parallel

> [!INFO] vertices are the points. they are assembled into primitives (triangles). rasterisation projects the primitives to the screen. the fragment processer colours the rasterised primitives and produces pixels.

![GRAPHICS PIPELINE](https://i.imgur.com/RUY0jsN.png)
![GRAPHICS PIPELINE](https://i.imgur.com/LgzVaeQ.png)

VERTEX PROCESSING
- Programmable shader stage (GPU program) 
- “Shaders” were small programs performing lighting calculations 
- Transforms input vertex stream into stream of vertices mapped onto the screen (clip space coordinates: homogeneous coordinates) 
- Uses model, view and projection matrices to transform from model to world to view and to clip space
VERTEX SHADER: TRANSFORMATIONS
![VERTEX SHADER: TRANSFORMATIONS](https://i.imgur.com/69mgYvL.png)

> [!INFO] vertex shader: small program, runs on the GPU. shaders were historically used for calculating lighting. now shaders might have nothing to do with shading - they are just programs that run on the GPU. 
> performs the same computation (possible matrix multiplication) for each point/pixel/vertex

> [!INFO] matrices
> model matrix: places triangle in the real world. gives relationship for other objects in the world
> view matrix: brings coordnates from world space into image/eye space. defines where virtual camera is relative to object. still in 3d space
> projection matrix: uses the relationship of virtual camera and object to projetc object onto screen (clip space)
> model-view matrix: model-view-projection matrix: can combine matrices into one. allows you to precomute the multiplicatoin and apply all at once to the object. so we dont have to recompute for each vertex. MVP should be the same for each vertex of the object.

![VERTEX SHADER: EXAMPLE](https://i.imgur.com/aEtj50Z.png)

PRIMITIVES ASSEMBLY
- Primitive assembly receives processed vertices, and the vertex connectivity information as input 
- Divides them into a sequence of individual base primitives 
- Primitives now have a certain facing 
- Face culling discards faces based on their facing
![](https://i.imgur.com/GLRHNvK.png)

![PRIMITIVES](https://i.imgur.com/TKEx7ge.png)

RASTERISATION
![RASTERISATION](https://i.imgur.com/Us6TdGw.png)

FRAGMENT PROCESSING
- Output of the rasterisation stage are fragments 
- Fragments are processed by a fragment shader 
- Fragment shader have control over the color and depth values
![FRAGMENT PROCESSING](https://i.imgur.com/Ja98OcA.png)
![FRAGMENT SHADER: EXAMPLE](https://i.imgur.com/HLJzgWy.png)

GRAPHICS APIS
![GRAPHICS APIS](https://i.imgur.com/lBKyqjl.png)

OPENGL

- Cross-language, cross-platform application programming interface (API) 
- Interface is platform independent 
- Implementation is platform dependent. 
- API for interacting with graphics processing unit (GPU) to render 2D and 3D graphics 
- Works using a client-server model 
- Client (application) creates commands 
- Server processes commands
![](https://i.imgur.com/f3UWZwU.png)

Important to note: 
- The API is defined as a set of functions 
- Drawing commands 
- No concept of permanent objects

```
glEnableVertexAttribArray(0); 
glDrawArrays(GL_TRIANGLES, 0, 3); 
glDisableVertexAttribArray(0);
```


OPENGL - HISTORY
- Originally released by Silicon Graphics Inc. (SGI) in 1992 
- Now managed by non-profit technology consortium Khronos Group 
- Significant changes: 
- OpenGL 2.0 incorporates the significant addition of the OpenGL Shading Language (also called GLSL) 
- OpenGL 3.0 first major API revision deprecated fixed-function vertex and fragment processing and direct-mode rendering, using glBegin and glEnd

OPENGL CONCEPTS
- OpenGL Context 
- State 
- OpenGL Object Model

OPENGL CONTEXT
- Represents an instance of OpenGL 
- Context stores all of the state associated with this instance of OpenGL 
- A process can have multiple contexts 
- Each represent separate viewable surface (e.g. a window) 
- Each has own OpenGL Objects 
- Multiple contexts can share resources.

![Context creation with GLFW](https://i.imgur.com/vWQrTdR.png)

OPENGL STATE
- Information that the context contains and that is used by the rendering system 
- A piece of state is simply some value stored in the OpenGL context 
- OpenGL as "state machine" 
- When a context is created, state is initialised to default values

```
// Enable depth test 
glEnable(GL_DEPTH_TEST); 
// Enable blending 
glEnable(GL_BLEND); 

// Disable depth test 
glDisable(GL_DEPTH_TEST);
```

OBJECT MODEL
- OpenGL is “object oriented” 
- Object instances are identified by a name 
- Unsigned integer handle (GLuint) 
- References that identify an object (no pointers) 
- Commands work on targets 
- Each target has an object currently bound to the target 
- To modify objects, you must first bind them to the OpenGL context, then execute command

```
GLuint m_textureID; 
// Create texture 
glGenTextures(1, &m_textureID); 
// "Bind" texture 
glBindTexture(GL_TEXTURE_2D, m_textureID);

//specifies textures "modify object"
glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, width, height, 0, GL_RGB, GL_UNSIGNED_BYTE, image);
```

OPENGL OBJECTS
- Act as 
- Sources of input 
- Sinks for output 
- Examples: 
- Buffer 
- Textures 
- State objects
- Buffer objects 
- Unformatted chunks of memory 
- Can store vertex data (VBO) or pixel data, etc. 
- Textures 
- 1D, 2D, or 3D arrays of texels 
- Can be used as input for texture sampling 
- Vertex Array Objects 
- Stores all of the state needed to supply vertex data (vertex data + format) 
- Framebuffer Objects 
- User-defined framebuffers that can be rendered to

![EXAMPLE: VERTEX BUFFER OBJECT](https://i.imgur.com/fyGvJ6y.png)
![EXAMPLE: VERTEX BUFFER OBJECT](https://i.imgur.com/Ahl2Zk5.png)


STRIDE

- Specifies the byte offset between consecutive generic vertex attributes (if stride equals 0 -> means tightly packed)
![](https://i.imgur.com/vrdFqlF.png)
![Tightly packed](https://i.imgur.com/uPpm03x.png)
![Interleaved:](https://i.imgur.com/Cc8DIoJ.png)

DRAW CALL
- After creating and loading data: 
- We use the draw call to actually draw something
![](https://i.imgur.com/6mW4Io7.png)
