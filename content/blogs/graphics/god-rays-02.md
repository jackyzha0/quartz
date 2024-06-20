---
draft: false
title: God Rays - Part 2
tags:
  - graphics
created: 2024-06-14
publishDate: 2024-06-16
aliases: 
description: In this post I document my progress as I attempt my own implementation of god rays.
previewImg: ./Resources/god-rays/god-rays-2-preview.png
---

> [!warning] Disclaimer
> **For Non-Engineers:**
> The goal of this blog is to be layman-friendly so any feedback about anything confusing or unclear is valuable and appreciated. I am currently working on a way to allow those without a **Github** account to provide feedback at the end of the article.
> 
> **For Engineers:**
> This is still a subject I am actively learning about so feel free to leave a comment with corrections or suggestions if you have any.

[[god-rays-01|Last time]] we talked about what god rays are and some ways that video games try to emulate them. Today I'll be documenting my progress as I attempt to implement a version of the approach detailed [[god-rays-01#Quad-based Approximation|here]]. Giant shout out to [Cyanilux's blog](https://www.cyanilux.com/tutorials/god-rays-shader-breakdown/) and [t3ssel8r](https://www.youtube.com/watch?v=fSNdZ82I-eQ)'s video on the topic for the inspiration.


> [!important] For Developers
> I will be creating this effect in my game [[01.far-reaches|The Far Reaches]] using [4.3 Beta 1](https://godotengine.org/article/dev-snapshot-godot-4-3-beta-1/) build of the Godot open source engine. This may leverage some of the features strictly available to that version so if you're following along as a developer please bear that in mind.

## Implementation

To kick things off, I quickly threw together a basic scene to work with and add our god rays to.

> [!caption|center]
> ![[god-rays-base-scene.png]]
> Basic Scene

### Adding Quads

Let's jump back to what I said last time. To quickly reiterate:
> The first step is to place our quads in our scene where we would like the rays to be and set them to act as **billboards**. This means the quad will always face the camera regardless of how the camera moves.

Sound like we need some squares. Let's place a few quads throughout our scene and uhhh...

> [!caption|center]
> ![[god-rays-some_quads.png]]
> Some Quads

Those quads certainly don't look like they're facing the camera. Let's try to remedy that with a [[shaders|shader]] that transforms our quads such that they remain facing the camera.

> [!math]- Here There Be Math!
> When we are transforming our quads from [[coordinate-spaces#Model Space|model space]] to [[coordinate-spaces#View Space|view space]] we want to translate without rotating our quads. Typically our vertex transformation would look something like this:
> ```glsl
> vec4 world_pos = MODEL_MATRIX * vec4(VERTEX, 1.0);
> vec4 view_pos =VIEW_MATRIX * world_pos;
> vec4 clip_pos = PROJECTION_MATRIX * view_pos;
> ```
> However, we don't want to use the built-in `VIEW_MATRIX` as that contain a rotation component. Instead we effectively just want `view_pos` to be `world_pos + <some translation>`. We can figure out this translation by transforming the origin or `(0, 0, 0)` to both world space and view space and finding the difference between them.
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

Applying the shader seems to have given us the billboard effect that we were looking for!

> [!caption|center]
> ![[god-rays-billboard.mp4]]
> Billboarding Effect

### Stretching Towards the Light
Now we have a bunch of squares but they're not really looking like heavenly rays yet. Let's jump into this next little bit that I mentioned last time:
> Then we use a [[shaders|vertex shader]] to stretch the upper parts of the quad towards our light source. This creates the effect of a quadrilateral shape stretching from its base towards the sun.

The trick here is that we need to only have the upper parts of the quad stretching. This way the base of the quads can remain firmly planted where we placed them in our scene. We need two things to do this: the **direction** towards our sun or light source and an **amount** to stretch by.

Then we can simply move the vertices along that **direction** by that **amount**.

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
"Modulating the Alpha" sounds like a bit of *Magic: The Gathering* card text but the reality is much more mundane. What we mean here is that we want to change (*modulate*) the transparency (*the alpha component of our color*) of our rays based on several factors. Those factors include:
- [[#Scene Depth]]
- [[#Camera Position]]
- [[#Shadow Map]]
- Any other stylistic factors 

#### Scene Depth
The closer a ray is to an object, the less we want the ray to obscure that object. This can be accomplished using what's called a [[depth-buffer|depth buffer]]. Depth buffers are just images that store how far away each pixel is from the camera.

We can take a look at how far away our ray is from the screen and then compare it against how far away the rest of the scene is. The **closer they are** together, the **smaller the alpha value** we want so long as the ray is **in front of the scene.** 

A lot of words here but basically: the closer our ray is to something, the less visible it should be.

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
> void fragment() {
> 	float fragment_depth = abs(FRAGCOORD.z);
> 	float scene_depth = texture(depth_texture, SCREEN_UV).r;
>
> 	ALPHA *= clamp((fragment_depth - scene_depth) * god_ray_depth_strength, 0.0f, 1.0f);
> }
> ```

I took this as an opportunity to widen the quads slightly and the results are a huge step in the right direction:

> [!caption|center]
> ![[god-rays-depth_modulated.png]]
> Alpha Modulation - Scene Depth

#### Camera Position
We want rays to dissipate as our camera nears them as to avoid blocking our view of the scene. Similar to how we achieved [[#Scene Depth]] modulation, we can choose a distance at which we would like the the rays to start dissipating and compare the ray's depth against it.

The rays should then become more transparent the closer they get to the camera.

> [!math]- Here There Be Math!
> Since we want to be able to specify how close in world coordinates we want the rays to dissipate, we must first convert the fragment depth to a linear depth value. What do we mean by that? Well the depth buffer currently only holds values in the 0 to 1 range and we need to get the depth in world coordinates (measured in virtual meters).
> 
> Fortunately Godot provides a guide for this conversion [here](https://docs.godotengine.org/en/stable/tutorials/shaders/advanced_postprocessing.html#depth-texture). Following along with that we get:
> ```glsl
> vec3 fragment_ndc = vec3(SCREEN_UV * 2.0 - 1.0, fragment_depth);
> vec4 fragment_view = INV_PROJECTION_MATRIX * vec4(fragment_ndc, 1.0);
> fragment_view.xyz /= fragment_view.w;
> float linear_fragment_depth = -fragment_view.z;
> ```
> Now that we have the linear depth, we use a `smoothstep()` function to create a smooth alpha gradient when the ray gets close to the camera. We can control the distances this gradient begins and ends with the `god_ray_camera_cutoff` and `god_ray_camera_falloff` uniforms respectively.
> ```glsl
> global uniform float god_ray_camera_cutoff = 0.25f;
> global uniform float god_ray_camera_falloff = 1.0f;
> 
> void fragment() {
>	...
>
>	vec3 fragment_ndc = vec3(SCREEN_UV * 2.0 - 1.0, fragment_depth);
>	vec4 fragment_view = INV_PROJECTION_MATRIX * vec4(fragment_ndc, 1.0);
>	fragment_view.xyz /= fragment_view.w;
>	float linear_fragment_depth = -fragment_view.z;
>
>	ALPHA *= smoothstep(god_ray_camera_cutoff, god_ray_camera_falloff, max(linear_fragment_depth, 0.0f));
> }
> ```

> [!caption|center]
> ![[god-rays-camera-pos.mp4]]
> Alpha Modulation - Camera Distance

#### Shadow Map

I mentioned [[shadow-map|shadow maps]] in my last post but to reiterate, shadow maps allow us to check if a position in the world is in shadow or not. I won't delve too far into how shadow maps are generated but suffice to say that they are incredibly useful for anything involving shadows as the name suggests.

 If a ray is in shadow, we want it to be invisible; we can use the shadow map of our sun to identify what parts of our ray are in shadows and change the transparency accordingly to achieve this. 

> [!math]- Here There Be Math!
>  > [!important] Disclaimer
>  > 
>  > As of writing this, Godot does not support the ability to query shadow maps. Fortunately thanks to the help of Reddit user [u/ShaderError](https://www.reddit.com/user/ShaderError/) who has an [article](https://medium.com/@ShaderError/godot-custom-shader-built-ins-functions-part-2-3-4a1772c12dfe) on hacking the engine I was able to query the shadow map using a custom shader function. 
>  > 
>  > Please let me know in the comments if you need help recreating this.
>
> In order to sample the shadow map, we need our fragments position in [[coordinate-spaces#View Space|view space]]. 
> 
> The good news is we already did that in the [[#Camera Position]] section. The bad news is that do to the disclaimer above we have to sample the shadow map in Godot's  `light()` shader. Fortunately, that's not that difficult and we get:
> ```glsl
> vec2 ndc = (2.0f * FRAGCOORD.xy - VIEWPORT_SIZE.xy) / VIEWPORT_SIZE.xy;
> vec4 fragment_view = INV_PROJECTION_MATRIX * vec4(ndc.x, ndc.y, FRAGCOORD.z, 1.0);
> fragment_view.xyz /= fragment_view.w;
> ```
> Now doing this in the `light()` function has a couple quirks. The first being that we want our rays to be *unshaded* which in Godot terms mainly just means that light sources do not illuminate it. This is unfortunate because the `light()` function does not run on un-shaded objects. 
> 
> So to get around this we set the `DIFFUSE_LIGHT` variable to pure white light which gives the impression of being unshaded and hope for the best down the line.
> ```glsl
> DIFFUSE_LIGHT = vec3(1.0f, 1.0f, 1.0f);
> ```
> The second quirk is that the `light()` function runs for **every** light in the scene while we only care about directional lights like the sun. Fortunately we have a solution in the form of Godot's `LIGHT_IS_DIRECTIONAL` and the `LIGHT_INDEX` variable we hacked in.
> 
> Putting all this together gets us:
> ```glsl
> void light() {
>	if(LIGHT_IS_DIRECTIONAL) {
>		vec2 ndc = (2.0f * FRAGCOORD.xy - VIEWPORT_SIZE.xy) / VIEWPORT_SIZE.xy;
>		vec4 fragment_view = INV_PROJECTION_MATRIX * vec4(ndc.x, ndc.y, FRAGCOORD.z, 1.0);
>		fragment_view.xyz /= fragment_view.w;
>		ALPHA *= sample_directional_shadow(LIGHT_INDEX, fragment_view.xyz);
>	}
>	
>	DIFFUSE_LIGHT = vec3(1, 1, 1);	// Prevent shading
> }
> ```

And there we go! Now we have these very satisfying sections of the ray that get blocked by objects in our game. I can't wait to try this out later in a scene with lots of trees and foliage.

> [!caption|center]
> ![[god-rays-shadow-mapped.png]]
> Alpha Modulation - Shadow Mapping

### Finishing Touches
Now comes the exciting part! Theoretically we just multiply all of the alpha values we created in the previous sections together and...

> [!caption|center]
> ![[god-ray-composited.mp4]]
> All Together

It's looking pretty good for what was at one point just a bunch of white squares. I still think we can do just a little better.

#### Adding Noise
 Let's give the rays a more stripe-like quality. We can do this by once again by modulating the alpha. We're going to use something called a [[noise|noise texture]] which is basically just a way of getting random values.

A useful type of noise for this is a type called **gradient noise** where the various points along the noise make a smooth gradient. A common choice for gradient noise is a type of noise called [[noise#Perlin Noise|perlin noise]]. It looks like:

> [!caption|center]
> ![[noise-perlin.png]]
> Perlin Noise

By sampling values along single direction we can get a stripe-like pattern that we can use to modulate the rays' alphas along their cross-axis.

> [!caption|center]
> ![[god-rays-stripes.png]]
> Stripes

Better yet, we can also move our sample up and down the noise texture to get the impression of the stripes moving.

> [!caption|center]
> ![[god-rays-stripes-move.mp4]]
> Moving Stripes

> [!math]- Here There Be Math!
> Let's first add some uniforms to control our stripes. We'll need a `sampler2D` that contains our noise texture and a `float` variable to control how fast our stripes move.
> ```glsl
> uniform sampler2D god_ray_stripe_noise : filter_nearest;
> uniform float god_ray_stripe_speed = 0.2f;
>```
> Our noise texture is two-dimensional but we just want to sample along a line. We can do this by constructing a texture coordinate to sample where the **x** direction is varied and the **y** direction remains constant. 
> ```glsl
> texture(god_ray_stripe_noise, vec2(UV.x,  /* CONSTANT */ );
>```
> Now to actually get the stripes to move with time is a simple matter of replacing that constant with a value that changes with time. This has the effect of moving our line up and down the noise texture.
> 
> Putting it all together we get:
> ```glsl
> ...
> 
> uniform sampler2D god_ray_stripe_noise : filter_nearest;
> uniform float god_ray_stripe_speed = 0.2f;
> 
> ...
> 
> void fragment() {
> 	...
> 	ALPHA *= texture(god_ray_stripe_noise, vec2(UV.x, TIME * god_ray_stripe_speed)).r;
> 	...
> }
> ```

Let's just quickly change the color of our quads to make our rays take on a more golden hue as well and that's looking pretty good! 

> [!caption|center]
> ![[god-rays-result.mp4]]
> The Result

## Conclusion

I think that marks a good stopping point for now although there's plenty of room for improvement. For one, I would like it if the rays moved as though clouds int atmosphere were affecting them.

Additionally, I might do a post about implementing a dynamic weather system that utilizes these rays. For now we've covered the core components that go into achieving this stylistic form of god rays and I hope you learned something with me. And, hey, at the very least it was cool to go from this...

> [!caption|center]
> ![[god-rays-some_quads.png]]

...to this!

> [!caption|center]
> ![[god-rays-result.mp4]]

As always please leave a comment below if anything was confusing or if I got some information wrong so I can clarify / correct any mistakes. Also feel free to let me know what you think, offer advice or tell me what topics you'd like me to try to tackle!

Take care and see you soon! 

-- Carson

---

## Resources

> [!math]- Final Shader
> ```glsl
> shader_type spatial;
> render_mode depth_draw_never;
> render_mode blend_mix;
> 
> global uniform vec3 sun_direction;
> global uniform float god_ray_depth_strength = 0.3f;
> global uniform float god_ray_camera_cutoff = 0.25f;
> global uniform float god_ray_camera_falloff = 1.0f;
> 
> uniform float god_ray_strength = 1.0f;
> uniform vec4 god_ray_color : source_color;
> 
> uniform float stretch_amount = 30.0f;
> uniform sampler2D god_ray_stripe_noise : filter_nearest;
> uniform float god_ray_stripe_speed = 0.2f;
> 
> uniform sampler2D depth_texture: hint_depth_texture, filter_nearest;
> 
> varying vec3 _node_position;
> 
> void vertex() {
> 	vec4 origin = vec4(0.0f, 0.0f, 0.0f, 1.0f);
> 	vec4 world_origin = MODEL_MATRIX * origin;
> 	vec4 view_origin = VIEW_MATRIX * world_origin;
> 	vec4 world_to_view_translation = view_origin - world_origin;
> 
> 	vec4 world_pos = MODEL_MATRIX * vec4(VERTEX, 1.0);
> 	vec4 view_pos = world_pos + world_to_view_translation;
> 
> 	float uv_mask = 1.0 - UV.y;
> 	vec4 world_light_dir = MODELVIEW_MATRIX * vec4(-sun_direction, 0.0f);
> 	vec3 stretch_vector = uv_mask * stretch_amount * world_light_dir.xyz;
> 	view_pos += vec4(stretch_vector, 0.0f);
> 
> 	vec4 clip_pos = PROJECTION_MATRIX * view_pos;
> 
> 	_node_position = NODE_POSITION_WORLD;
> 	POSITION = clip_pos;
> }
> 
> void light() {
> 	if(LIGHT_IS_DIRECTIONAL) {
> 		vec2 ndc = (2.0f * FRAGCOORD.xy - VIEWPORT_SIZE.xy) / VIEWPORT_SIZE.xy;
> 		vec4 fragment_view = INV_PROJECTION_MATRIX * vec4(ndc.x, ndc.y, FRAGCOORD.z, 1.0);
> 		fragment_view.xyz /= fragment_view.w;
> 		ALPHA *= sample_directional_shadow(LIGHT_INDEX, fragment_view.xyz);
> 	}
> 	
> 	DIFFUSE_LIGHT = vec3(1, 1, 1);	// Prevent shading
> }
> 
> void fragment() {
> 	float fragment_depth = abs(FRAGCOORD.z);
> 	float scene_depth = texture(depth_texture, SCREEN_UV).r;
> 
> 	vec3 fragment_ndc = vec3(SCREEN_UV * 2.0 - 1.0, fragment_depth);
> 	vec4 fragment_view = INV_PROJECTION_MATRIX * vec4(fragment_ndc, 1.0);
> 	fragment_view.xyz /= fragment_view.w;
> 	float linear_fragment_depth = -fragment_view.z;
> 
> 	ALPHA *= clamp((fragment_depth - scene_depth) * god_ray_depth_strength, 0.0f, 1.0f);						// Scene Depth
> 	ALPHA *= smoothstep(god_ray_camera_cutoff, god_ray_camera_falloff, max(linear_fragment_depth, 0.0f));		// Camera Distance
> 	ALPHA *= texture(god_ray_stripe_noise, vec2(UV.x, (TIME * god_ray_stripe_speed) + (_node_position.x))).r;	// Stripes
> 	ALPHA = clamp(god_ray_strength * ALPHA, 0.0, 1.0);	
> 	
> 	ALBEDO = god_ray_color.xyz;
> }
> ```

- **Inspiration**  - I highly recommend these as I took most of my approach from them.
	- [Sun Beams / God Rays Shader Breakdown](https://www.cyanilux.com/tutorials/god-rays-shader-breakdown/) by *Cyanilux*
	- [God Rays in 3D Pixel Art Game Engine](https://www.youtube.com/watch?v=fSNdZ82I-eQ) by *t3ssel8r*
- **Articles**
	- [Screen-reading shaders](https://docs.godotengine.org/en/stable/tutorials/shaders/screen-reading_shaders.html#depth-texture) by *Godot*
	- [Godot Custom Shader Built-ins. Functions](https://medium.com/@ShaderError/godot-custom-shader-built-ins-functions-part-2-3-4a1772c12dfe) by DivideByZero
- **Tools**
	- [Godot Engine](https://godotengine.org/)