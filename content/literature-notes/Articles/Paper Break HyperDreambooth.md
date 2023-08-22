---
author: [[Scott Moss]]
title: "Paper Break: HyperDreambooth"
tags: 
- articles
- literature-note
---
# Paper Break: HyperDreambooth

![rw-book-cover](https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2310205-8836-4610-a670-e0908677f729_1024x1024.png)

## Metadata
- Author: [[Scott Moss]]
- Full Title: Paper Break: HyperDreambooth
- Category: #articles
- URL: https://open.substack.com/pub/aibits/p/paper-break-hyperdreambooth?utm_source=share&utm_medium=android&r=44mvk

## Highlights
- If you want to use stable diffusion to generate portraits of a person, dog, or art in a specific style, then your best bet is to do some training. You can use img-to-img generation as you would in Midjourney, but you’re extremely limited in how much control you have over the output. Also, getting consistent generations across prompts would require reusing the same seed and even supplying another image. Ideally, you want the model to “remember” a face and be able to use it with a specific keyword in a prompt ([View Highlight](https://read.readwise.io/read/01h6cj0z3d1xb1gmbe5pn1kybz))
- Dreambooth takes two inputs:
  1. The concept you want to train. This is probably a few sample pictures. In the above diagram, our concept is a woman.
  2. The phrase with a unique identifier acts like a trigger word associated with your concept. Our identifier in this example is “ohwx“. Word with no meaning and is probably unknown to a model. ([View Highlight](https://read.readwise.io/read/01h6cj30d4pnjt3yey4c2kw6p2))
- The whole point of Dreambooth is associating that unique identifier with the chosen concept. That’s it. So, how is it done? First, your phrase is converted to an embedding. ([View Highlight](https://read.readwise.io/read/01h6cj3xpk21g1xwv890sdh4p5))
- Once the embedding for your phrase is created, two images are created from your sample—one with n amount of noise and one with (n-1) amount of noise applied to it. Let’s say n is 5. The five-noised image and the embedding are then passed to the model with the expected output to be a four-noised image. Afterward, a diff is performed against the original four-noised image created at the beginning and the new one. ([View Highlight](https://read.readwise.io/read/01h6cj4d16vkb8mn6sjn8ej9xg))
- From the diff, a loss check is performed. High loss means these images look nothing alike; a low loss means they are similar. Next, something called a `Gradient Update` is applied to the model. This means the model is either rewarded if the loss is low or punished if they are high. The model then adjusts its weights accordingly. The output is an **entirely new model.** GB’s in size. ([View Highlight](https://read.readwise.io/read/01h6cj4svr2f1qx7n0rcr4rncj))
- This process runs in cycles up to the configured parameters. Depending on how much VRAM you have for your GPU and what settings you’re using, this could take over 30 mins. Even then, the results might not be high quality. You have to play around with it. I’ve spent hundreds of hours using Dreambooth to train faces to get that one good model. At this time, Dreambooth creates the best results when done right. ([View Highlight](https://read.readwise.io/read/01h6cj5bcryde9c7zqmgw5k0mz))
- Textual Inversion is almost the same as Dreambooth, with some pretty cool changes that don’t seem like it should work. ([View Highlight](https://read.readwise.io/read/01h6cj5yefkt7hgwvqmp57ba5w))
- With Textual Inversion, the Gradient Update is applied to the vector or the unique identifier instead of the weights on the model. Everything else is the same. To me, this seems like magic that just adjusting this vector over and over would eventually lead to some outputs with low loss. ([View Highlight](https://read.readwise.io/read/01h6cj6746xmnyaf25y9xawarq))
- The output of this training method is a tiny KB file because it’s just the vector. This makes it so easy to share with others and use different models. ([View Highlight](https://read.readwise.io/read/01h6cj6msaqze55dr7nqrmzjpg))
- Low-Rank Adaptation, or LoRa for short, is similar to Dreambooth but has some important differences. ([View Highlight](https://read.readwise.io/read/01h6cj7w38qwyfn8ax9by2g3bp))
- Dreambooth has a problem in that it makes a copy of the model. Stable Diffusion is not a huge model, so the copies aren’t too bad, usually around 2-3 GBs. Still big enough to affect storage, costs, and speed. Cold booting a GB+ file from Disk to VRAM will incur a speed penalty. ([View Highlight](https://read.readwise.io/read/01h6cj89dvhfaf76hwrecbwdb4))
- LoRa aims to solve this problem by inserting new weights into the model instead of making an entirely new one. Everything is exactly the same. When a Gradient Update is performed, the new weights in the inner layers of the Neural Network are adjusted. These weights are set up not to affect the model at all. When LoRA training starts, the weights pass through to the next. ([View Highlight](https://read.readwise.io/read/01h6cj8vmp3pnm4sw2mkaksggm))
- When the loss is calculated, and gradient update is applied, the new weights are adjusted, changing their output and the inputs of the intermediate layers after them. This happens enough that eventually, the model can output that (n-1) noised image and have a negligible loss. ([View Highlight](https://read.readwise.io/read/01h6cja8geknd6zd4vmg0tbhbh))
- LoRA training is much faster than Dreambooth and takes much less memory. The layers are so much smaller, allowing you to pass them around and use them in any compatible model. They’re usually around 150MB. The quality is not as good as proper Dreambooth training, but it’s more than good enough. Because of these upsides, LoRA is currently the preferred method in the community, overtaking Dreambooth. ([View Highlight](https://read.readwise.io/read/01h6cj9x8q9h5e10pzqxncmvme))
- The main difference is with the Gradient Update. With HyperNetworks, the update is applied to a network that creates the weights added to the model, like in LoRA. This network learns and adapts over time. ([View Highlight](https://read.readwise.io/read/01h6cjay5520162zmh3w4pyec4))
- HyperDream booth introduces new concepts with training but also takes advantage of previous techniques. As you might have guessed from the name, HyperDreambooth essentially uses HyperNetworks with Dreambooth. That is a disgustingly high-level view, so let’s break it down. There are two phases. ([View Highlight](https://read.readwise.io/read/01h6cjcv6rezkyznr1xr69amnv))
