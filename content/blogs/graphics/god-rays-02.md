---
draft: true
title: God Rays - Part 2
tags:
  - graphics
created: 2024-06-14
date: 2024-06-13
aliases: 
description: In this post I document my progress as I attempt my own implementation of god rays.
previewImg: ./Resources/crepuscular_rays_fake.png
---

[[god-rays-01|Last time]] we talked about what god rays are and some ways that video games try to emulate them. Today I'll be documenting my progress as I attempt to implement a version of the approach detailed [[god-rays-01#Quad-based Approximation|here]]. Giant shout out to [Cyanilux's blog](https://www.cyanilux.com/tutorials/god-rays-shader-breakdown/) and [t3ssel8r](https://www.youtube.com/watch?v=fSNdZ82I-eQ)'s video on the topic for the inspiration.


> [!important] For Developers
> I will be creating this effect in my game [[01.far-reaches|The Far Reaches]] using [4.3 Beta 1](https://godotengine.org/article/dev-snapshot-godot-4-3-beta-1/) build of the Godot open source engine. This leverages some of the features strictly available to that version so if you're following along as a developer please bear that in mind.

## Implementation

To kick things off, I quickly threw together a basic scene to work with and add our god rays to. We may need to fiddle around with this scene and add objects and geometry to experiment with later.

> [!caption|center]
> ![[god-rays-base-scene.png]]
> Basic Scene

### Adding Quads

To quickly reiterate from last time:
> The first step is to place our quads in our scene where we would like the rays to be and set them to act as **billboards**. This means the quad will always face the camera regardless of how the camera moves.

Let's place a few quads throughout the our scene and uhhh...

> [!caption|center]
> ![[god-rays-some_quads.png]]
> Some Quads

Those quads certainly don't look like they're facing the camera. Let's try to remedy that with a [[shaders|shader]] that transforms our quads such that the quads don't rotate.

> [!math]- Here There Be Math!
> When we are transforming our quads from [[coordinate-spaces#Model Space|model space]] to [[coordinate-spaces#View Space|view space]] we want to translate without rotating our quads. Typically our vertex transformation would look something like this:
> ```glsl
> vec4 world_pos = MODEL_MATRIX * vec4(VERTEX, 1.0);
> vec4 view_pos =VIEW_MATRIX * world_pos;
> vec4 clip_pos = PROJECTION_MATRIX * view_pos;
> ```
> However, we don't want to use the built-in `VIEW_MATRIX` as that contain a rotation component. Instead we effectively just want `view_pos` to be `world_pos + <some translation>`. We can figure out this translation by transforming the origin or `(0, 0, 0)` to world space and view space and finding the difference between them.
> 
> Taking this approach yields us:
> ```glsl
> void vertex() {
>	vec4 origin = vec4(0.0f, 0.0f, 0.0f, 1.0f);
>	vec4 world_origin = MODEL_MATRIX * origin;
>	vec4 view_origin = VIEW_MATRIX * world_origin;
>	vec4 world_to_view_translation = view_origin - world_origin;
>	
>	vec4 world_pos = MODEL_MATRIX * vec4(VERTEX, 1.0);
>	vec4 view_pos = world_pos + world_to_view_translation;
>	vec4 clip_pos = PROJECTION_MATRIX * view_pos;
>	
>	POSITION = clip_pos;
> }
> ```
> While this approach is quite readable I will likely elect to go for an approach with less matrix multiplications for the long run. There is an approach from the [Godot forums](https://forum.godotengine.org/t/how-to-do-i-make-a-shader-a-billboard-face-the-player/1980/2) that surgically manipulates the view matrix using its inverse to achieve the same effect.

Applying the shader seems to have given us the billboard effect we we're looking for!

> [!caption|center]
> ![[god-rays-billboard.mp4]]
> Billboarding Effect

### Stretching Towards the Light
Now we have a bunch of squares but they're not really looking like heavenly rays yet. Let's jump into this next little bit that I mentioned last time:
> Then we use a [[shaders|vertex shader]] to stretch the upper parts of the quad towards our light source. This creates the effect of a quadrilateral shape stretching from its base towards the sun.

The trick here is that we need to only have the upper parts of the quad stretching. This way the base of the quads remain firmly planted where we placed them in our scene. We need two things to do this: The **direction** towards our sun or light source and an **amount** to stretch by.

Then we can simply move the vertices of along that direction by that amount.

> [!math]- Here There Be Math!
> Jumping back to our vertex shader from before, we first add two new uniforms. A global uniform for the **sun's direction** as this should be available across multiple shader in the game and a regular uniform **stretch amount** so we can control how much each beam stretches.
> ```glsl
> global uniform vec3 sun_direction;
> uniform float stretch_amount;
>```
>Then to get our displacement we can just multiple the inverse sun direction by our stretch amount and add it to our view position.
>```glsl
> global uniform vec3 sun_direction;
> uniform float stretch_amount;
> 
> void vertex() {
>	...
>	// Stretch towards the light
>	float uv_mask = 1.0 - UV.y;
>	vec3 stretch_vector = uv_mask * stretch_amount * -sun_direction;
>	view_pos += vec4(stretch_vector, 0.0f);
>	...
> }
>```
> Note that we use the UV coordinate's to mask the `stretch_vector`. This causes the only the top vertices to be displaced as the **y** component of top vertices' is 0 while the bottoms' are 1.

With just a couple lines of code, our little quads are starting to look a bit more beam-like!

> [!caption|center]
> ![[god-rays-beams.mp4]]
> Stretched Quads

### Modulating the Alpha
"Modulating the Alpha" sounds like a bit of Magic: The Gathering card text but the reality is much more mundane. What we mean here is that we want to change (*modulate*) the transparency (*the alpha component of our color*) of our rays based on several factors. Those factors include:
- [[god-rays-02#Scene Depth]]

#### Scene Depth
The closer a ray is to an object, the less we want the ray to obscure that object. This can accomplished using what's called a [[depth-buffer|depth buffer]]. Depth buffers are just images that store how far away each pixel is from the camera.

We can take a look at how far away our ray is from the screen and then compare it against how far away the rest of the scene is. The **closer they are** together, the **smaller the alpha value** we want to for our ray so long as the ray is **in front of the scene.** 

> [!math]- Here There Be Math!
> We can acquire the scene and ray (referred to as fragment) depth in our fragment shader for our god rays.
>  
> We get the **fragment depth** out of  `FRAGCOORD` as described in the [Godot docs](https://docs.godotengine.org/en/stable/tutorials/shaders/shader_reference/spatial_shader.html#fragment-built-ins). The **scene depth** we can get from reading the depth texture for the scene.
> ```glsl
> float fragment_depth = abs(FRAGCOORD.z);
> float scene_depth = texture(depth_texture, SCREEN_UV).r;
> ```
> Then we need only subtract the two and clamp the resulting value between 0 and 1. We can also multiple the difference by a strength factor to be able to control how much scene depth affects the alpha.
> 
> When it's all said and done it looks a little something like this:
> ```glsl
> float alpha = 1.0f;
> 
> float fragment_depth = abs(FRAGCOORD.z);
> float scene_depth = texture(depth_texture, SCREEN_UV).r;
>
> alpha *= clamp((fragment_depth - scene_depth) * god_ray_depth_strength, 0.0f, 1.0f);
>
> ALPHA = alpha;
> ```

I took this as an opportunity to widen the quads slightly and the results are a huge step in the right direction:

> [!caption|center]
> ![[god-rays-depth_modulated.png]]
> Alpha Modulation - Scene Depth

