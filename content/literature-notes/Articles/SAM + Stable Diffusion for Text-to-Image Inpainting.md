---
author: [[Abby Morgan]]
title: "SAM + Stable Diffusion for Text-to-Image Inpainting"
tags: 
- articles
- literature-note
---
# SAM + Stable Diffusion for Text-to-Image Inpainting

![rw-book-cover](https://www.comet.com/site/wp-content/uploads/2023/06/Untitled-design.png)

## Metadata
- Author: [[Abby Morgan]]
- Full Title: SAM + Stable Diffusion for Text-to-Image Inpainting
- Category: #articles
- URL: https://www.comet.com/site/blog/sam-stable-diffusion-for-text-to-image-inpainting/

## Highlights
- In this article, we’ll leverage the power of SAM, the first foundational model for computer vision, along with Stable Diffusion, a popular generative AI tool, to create a text-to-image inpainting pipeline that we’ll track in Comet ([View Highlight](https://read.readwise.io/read/01h44bf49ea5vdrwzhefss0635))
- SAM is a prompt-able segmentation system with results that are simply stunning. It excels in zero-shot generalization to unfamiliar objects and images without the need for additional training. It’s also considered the first foundational model for computer vision, which is big news! We’ll talk a little more about foundational models next. ([View Highlight](https://read.readwise.io/read/01h44bfctbxw76057vqb4d05ah))
- different input types, however. SAM’s output masks can also be used as inputs to other AI systems for even more complicated pipelines! In this tutorial, we’ll demonstrate how to use SAM in conjunction with GroundingDINO and Stable Diffusion to create a pipeline that accepts text as input to perform image inpainting and outpainting with generative AI.
  [](http://https://colab.research.google.com/drive/1B7L4cork9UFTtIB02EntjiZRLYuqJS2b#scrollTo=3djVqDbQz4RO) ([View Highlight](https://read.readwise.io/read/01h44cdk0amfsn2770ewcs1a86))
- First, we’ll use Grounding DINO to interpret our text input prompt and perform object detection for those input labels. Next, we’ll use SAM to segment the masks within those bounding box predictions. Finally, we’ll use the masks generated from SAM to isolate regions of the image for either inpainting or outpainting with Stable Diffusion. We’ll also use Comet to log the images at each step in the pipeline so we can track exactly how we got from our input image to our output image. ([View Highlight](https://read.readwise.io/read/01h44ce1z8tbwaxd0bt417k5s3))
