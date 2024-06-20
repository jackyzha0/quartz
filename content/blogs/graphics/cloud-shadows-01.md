---
draft: false
title: Cloud Shadows
tags:
  - graphics
created: 2024-06-18
publishDate: 2024-06-20
aliases:
  - Cloud Shadows
description: A procedural approach to creating cloud shadows that also affect our god rays.
previewImg: ./Resources/cloud-shadows/clouds.png
---

## Introduction

As I mentioned in my post on [[god-rays-01|god rays]], I've been focusing my time recently on environmental weather effects. The end goal being a weather system for my game that can dynamically transition between different weather patterns. This could be used for creating transitions in weather between different regions or just base on the time of day.

Today I want to cover an approach to adding shadows for our clouds. What about making *actual* clouds you might ask? Well since [[01.far-reaches|The Far Reaches]] is a top-down game, the camera is never actually pointed at the clouds. 

It doesn't really make sense to render clouds if we never see them so let's instead focus on how they affect the world around them. The main way that clouds impact our scene is shadows. Let's dive into a procedural approach to creating these shadows!

### Cloud Silhouette
I think a reasonable start is to first create a silhouette of our clouds. We're going to achieve this with [[noise]]. Luckily Godot provides a noise texture we can sample to create our clouds from.

> [!caption|center]
> ![[noise.png]]
> Godot's Perlin Noise

This, unfortunately, looks more like a stormy day with high cloud cover.  We want to be able to control how much cloud cover there is. Since the image can be treated as black-and-white pixels in the range of 0 to 1 let's try setting all pixels above a certain **cutoff** value to white and the rest to black.

> [!math]- Here There Be Math!
> We're going to write a function that handles sampling so we can re-use it across multiple shaders. All we need to do for now is sample the noise texture and then use the `step()` function to set all values below our cutoff to 0 and above our cutoff to 1.
> ``` glsl
> float sample_cloud_shadow(sampler2D noise_tex, vec2 uv, float cutoff) {
>	float sample = texture(noise_tex, uv).r;
>	return step(cutoff, sample);
> }
> ```
> Eventually we'll probably migrate some of the parameters to global uniforms.

> [!caption|center]
> ![[cutoff.mp4]]
> Varied Cutoff values

Varying that cutoff makes the black take up more or less space in the texture depending. We can still improve this a little. Playing around with some parameters for the built-in noise texture gets us:

> [!caption|center]
> ![[shadows-noise-2.png]]

There's definitely room for improvement in the shape of the clouds but for now we'll make do with these shapes for our silhouette.

### Sampling the Silhouette

Okay now that we have the silhouette of our shadows how do we actually check to see if a point on surface is in our shadow. Let's first look at a two-dimensional version of this problem:

> [!caption|wtall center]
> ![[shadow-diagram.png]]
> Shadow Casting

Here we see three distinct layers:
- **Clouds** The point above us where our clouds exist. We are treating this as a flat plane.
- **Origin** Where the world's y-coordinate is 0. This could potentially be the same as whatever surface we are casting shadows on..
- **Surface** The surface we are trying to cast shadows on. Shown as flat for simplicity's sake.

In order to check if a point on the **surface** layer is shadowed by a cloud we can cast a ray in the opposite direction of the **sun direction** and see where it intersects with the **cloud** layer. The point at which it intersects is where we want to sample. Notice that in order for this to work we define a height **h** above the **origin** layer we want our **cloud** layer to be.

> [!math]- Here There Be Math!
> Identifying the point on the cloud layer we want to sample is basic linear algebra problem. Let's model it quickly:
> $$
> \vec{c} =\vec{v}-d\vec{l}
> $$
> This equation just says that the point on the cloud layer we want is equal to the point minus some value time the the direction of the light where:
> - $\vec{c}$ is the resulting point on the cloud layer
> - $\vec{v}$ is the point on the surface we want to sampler for
> - $\vec{l}$ is the vector representing the direction of our light
> - $d$ is some distance along the light vector
> 
> Expanding this out in three dimensions gives us the following three equations:
> $$
> c_x = v_x - dl_x \newline
> c_y = v_y - dl_y \newline
> c_z = v_z - dl_z
> $$
> Now we if set our cloud layer's height ($c_y$) to a constant $h$, we can solve for $d$. With $d$ known we can solve for our cloud layer's other two components:
> $$
> d = \frac{v_y - h}{l_y}
> $$
> Put into code looks like:
> ```glsl
> vec2 calculate_cloud_uv(vec3 v, vec3 l, float h) {
> 	float d = (v.y - h) / l.y;
> 	return vec2(v.x - (d * l.x), v.z - (d * l.z));
>}
>
> global uniform sampler2D cloud_noise_texture: repeat_enable;
>
> float sample_cloud_shadow(vec3 world_pos, vec3 sunlight_direction, float cutoff) {
>	vec2 uv = calculate_cloud_uv(world_pos, sunlight_direction, 10.0f); // Arbitrary value h
>	float sample = texture(cloud_noise_texture, uv).r;
>	...
> }
> ```

Now that we know how to sample our clouds' shadows at any point in the scene. We can use this function in our various [[shaders]] to actually cast shadows on our objects. The way this works is a bit in the weeds but put simply: when calculating the impact of each light on each pixel of the screen, we also take into account whether or not that pixel is in the clouds' shadows. 

> [!math]- Here There Be Math!
> Godot provides the `ATTENUATION` parameter in the `light()` function to help tell our custom lighting code how much a light affects final color. We want to modify this value using our shadow lookup like so:
> ```glsl
>  global uniform sampler2D cloud_noise_texture: repeat_enable;
>
> float sample_cloud_attenuation(vec3 world_pos, vec3 sunlight_direction, float atten, bool is_directional) {
> 	return is_directional ? min(sample_cloud_shadow(cloud_noise_texture, world_pos, sunlight_direction, 0.5f), atten) : atten;
> }
>```
>Then we need only call this function before we use our attenuation in any lighting calculations.
> ```glsl
> void light() {
> 	float atten = sample_cloud_attenuation(world_pos, sun_direction, ATTENUATION, LIGHT_IS_DIRECTIONAL);
> 	
> 	/* Lighting Code Using Attenuation */
> 	...
> }
>```
> We do something similar to the way we [[god-rays-02#Modulating the Alpha|modulated the alpha]] for our god rays to get the clouds to also block our god rays.
> ```glsl
> ALPHA *= sample_cloud_shadow(...);
> ```
> See my post on [[god-rays-02|god rays]] for more.

The result is pretty cool but as always, I think we can do a little better.

> [!caption|center]
> ![[clouds-result.png]]
> Cloud Shadows!

### Softer Edges
> [!important] Developer Disclaimer
> My game's rendering utilizes a far bit of custom lighting such as dithering between brightness levels. This means that if you're following along, some of my rendered scenes may appear slightly different from yours.

My first complaint is the hard edges on our shadows. Let's fix this by creating a region between our 1s and 0s in our noise texture that smoothly gradients between them.

> [!math]- Here There Be Math!
> Doing this is fairly straightforward with the use of the the `smoothstep()` function. This operates similar to the `step()` function but instead smoothly gradients if the value is between its two cutoff values.
> 
> We can determine these two cutoff values using our original **cutoff** and a new **range** parameter to determine how large of a range around our cutoff we want our gradient to be.
> ```glsl
> global uniform sampler2D cloud_noise_texture: repeat_enable;
> 
> float sample_cloud_shadow(vec3 world_pos, vec3 sunlight_direction, float cutoff, float range) {
>	...
>	float sample = texture(cloud_noise_texture, uv).r;
>	float low_cutoff = cutoff - (range / 2.0f);
>	float high_cutoff = cutoff + (range / 2.0f);
>	return smoothstep(low_cutoff, high_cutoff, sample);
> }
> ```

Now our shadows are looking a lot softer.
> [!caption|center]
> ![[clouds-soft.png]]
> Softer Shadows

### Roiling and Moving Clouds

Okay I really just wanted to use the word *roil* if I'm being honest.

What I'm referring to is the nature of clouds to slowly change shape over time. This turbulent behavior is usually caused by winds pushing on the clouds. And speaking of wind, we should let the clouds move as well.

#### Roiling
Let's talk about how we can make the clouds roil (see its a really good word). This seems like it would be really hard to achieve with our two-dimensional noise texture. Good thing there's a such as three-dimensional noise!

If two-dimensional noise changes in the **x** and **y** directions then its safe to assume that three-dimensional noise changes in the **x**, **y** and **z** direction. So let's just replace our 2D noise with 3D noise and try slowly moving through our noise's z dimension with time!

> [!math]- Here There Be Math!
> Honestly this one is pretty straightforward. We can change our `sampler2D` to a `sampler3D` to sample from Godot's [NoiseTexture3D](https://docs.godotengine.org/en/stable/classes/class_noisetexture3d.html). Then just vary the sample point's z-coordinate with time.
> 
> I've also started defining some constants and uniforms so shaders using the `sample_cloud_shadow()` function don't have to copy it each time. This could be parameterized easily.
> ```glsl
> global uniform sampler3D cloud_noise_texture: repeat_enable;
> 
> const float cutoff = 0.4f;
> const float roil_speed = 0.005;
> 
> float sample_cloud_shadow(vec3 world_pos, vec3 sunlight_direction, float range, float t) {
> 	vec2 cloud_uv = calculate_cloud_uv(world_pos, sunlight_direction, 10.0f);
> 	vec3 uv = vec3(cloud_uv, t * roil_speed);
> 	float sample = texture(cloud_noise_texture, uv).r;
> 	...
> }
> ```

This looks pretty good already!

>[!caption|center]
> ![[clouds-roiling.mp4]]
> Roiling Clouds

#### Moving
Moving the clouds is as easy as simply defining a direction we want the wind to be blowing our clouds and moving our noise texture's sample point in that direction.

> [!math]- Here There Be Math!
> This is also fairly straightforward. We can introduce a `wind_direction` vector that points in the direction the wind is blowing and who's magnitude is the speed of the wind. The we need only multiply it by our time and add it to our sample point.
> ```glsl
> global uniform sampler3D cloud_noise_texture: repeat_enable;
> 
> const float cutoff = 0.4f;
> const float roil_speed = 0.005;
> const float wind_speed = 0.007;
> const vec2 wind_direction = wind_speed * vec2(1, 1);
> 
> float sample_cloud_shadow(vec3 world_pos, vec3 sunlight_direction, float range, float t) {
> 	vec2 cloud_uv = calculate_cloud_uv(world_pos, sunlight_direction, 10.0f);
> 	vec3 uv = vec3(cloud_uv + (t * wind_direction), t * roil_speed);
> 	float sample = texture(cloud_noise_texture, uv).r;
> 	...
> }
> ```

---

Putting everything we've discussed together and we get a pretty neat effect. The clouds affect both the god rays *and* the surfaces they pass over!

>[!caption|center]
> ![[clouds-full.mp4]]
> Full Cloud Shadows

## Conclusion
I hope you enjoyed this short excursion into the world of procedural generation. There's many improvements that could be done to make these clouds seem more realistic. For now I think these stylized clouds will serve [[01.far-reaches|The Far Reaches]] very well. Although in the future I may attempt to improve them.

As always please leave a comment below if anything was confusing or if I got some information wrong so I can clarify / correct any mistakes. Also feel free to let me know what you think, offer advice or tell me what topics you'd like me to try to tackle!

Take care and see you soon! 

-- Carson

## Resources

> [!math]- Final Function
> ```glsl
> global uniform sampler3D cloud_noise_texture: repeat_enable;
> 
> const float cutoff = 0.4f;
> const float roil_speed = 0.005;
> const float wind_speed = 0.007;
> const vec2 wind_direction = wind_speed * vec2(1, 1);
> const float shadow_edge_range = 0.2;
> 
> vec2 calculate_cloud_uv(vec3 v, vec3 l, float h) {
> 	float d = (v.y - h) / l.y;
> 	return vec2(v.x - (d * l.x), v.z - (d * l.z));
> }
> 
> float sample_cloud_shadow(vec3 world_pos, vec3 sunlight_direction, float edge_range, float t) {
> 	vec2 cloud_uv = calculate_cloud_uv(world_pos, sunlight_direction, 10.0f);
> 	vec3 uv = vec3((cloud_uv / 30.0f) + (wind_direction * t), t * roil_speed);
> 	
> 	float sample = texture(cloud_noise_texture, uv).r;
> 	float low = cutoff - (edge_range / 2.0f);
> 	float high = cutoff + (edge_range / 2.0f);
> 	return smoothstep(low, high, sample);
> }
> 
> float sample_cloud_attenuation(vec3 world_pos, vec3 sunlight_direction, float t, float atten, bool is_directional) {
> 	return is_directional ? min(sample_cloud_shadow(world_pos, sunlight_direction, shadow_edge_range, t), atten) : atten;
> }
> ```