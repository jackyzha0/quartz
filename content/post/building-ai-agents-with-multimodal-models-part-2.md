---
title: "Building AI Agents with Multimodal Models: Part 2"
date: 2026-01-07T05:00:00+00:00
slug: building-ai-agents-with-multimodal-models-part-2
tags: ["nvidia", "contrastive-learning", "multimodal-ai"]
description: "Contrastive learning aligns images and text in AI with embeddings and cosine similarity, inspired by NVIDIA's AI models"
cover: /images/6f2d8d4b9c8674cf6a049c008e040e89.jpeg
---
## Contrastive Learning: Teaching AI That a Picture is Worth a Thousand Words

*This is Part 2 of a 4-part series based on learnings from NVIDIA's "Building AI Agents with Multimodal Models" certification.*

---

### The Big Question: How Do You Connect Pictures and Words?

Here's a puzzle: You have a photo of a golden retriever playing fetch, and you have the text "a happy dog catching a frisbee." To you, these obviously go together. But to a computer, an image is just a grid of numbers, and text is a sequence of characters. They're completely different data types.

How do we teach AI that these two things represent the same concept?

The answer is **Contrastive Learning**, and it's the secret sauce behind revolutionary models like OpenAI's CLIP and forms the foundation of modern image search, text-to-image generation, and visual question answering.

---

### The Embedding Space: A Universe Where Ideas Live

Before we dive into contrastive learning, we need to understand **embeddings**.

**The Analogy**: Imagine a massive library where every book has a specific location. Similar books are shelved near each other. Mystery novels are in one section, cooking books in another, and within cooking, Italian cuisine is close to French cuisine.

An **embedding** is like giving every piece of data (an image, a sentence, a sound) coordinates in this library. The magic is that similar concepts get similar coordinates, regardless of their original format.

So when we "embed" an image of a dog and the word "dog," if done correctly, both should end up in the same neighborhood of this mathematical space.

```
Image of dog  ──> [Image Encoder] ──> [0.8, 0.2, 0.5, ...] ──┐
                                                              ├──> Close together!
Text "a dog"  ──> [Text Encoder]  ──> [0.79, 0.21, 0.48, ...] ┘
```

---

### Contrastive Learning: Learning by Comparison

**The Analogy**: Imagine you're teaching a child to identify animals using flashcards. You show them two cards and ask: "Are these the same animal?"

- Show a dog photo and say "dog" → "Yes, same!"
- Show a dog photo and say "cat" → "No, different!"

Through thousands of these comparisons, the child learns what "dog" means without you ever explicitly defining it.

Contrastive learning works the same way. You don't tell the model what a dog is. Instead, you show it:
- **Positive pairs**: Image of dog + text "dog" (these should be similar)
- **Negative pairs**: Image of dog + text "cat" (these should be different)

The model learns to push positive pairs together and pull negative pairs apart in the embedding space.

---

### The Math Behind the Magic: Cosine Similarity

How do we measure if two embeddings are "close"?

**The Analogy**: Imagine two arrows pointing from the center of a room. If they point in the same direction, they're similar. If they point in opposite directions, they're different. The angle between them tells you how similar they are.

**Cosine Similarity** measures exactly this. It calculates the angle between two vectors (embeddings):
- **Score of 1.0**: Pointing in the exact same direction (identical meaning)
- **Score of 0.0**: Perpendicular (unrelated)
- **Score of -1.0**: Opposite directions (opposite meaning)

The formula normalizes vectors to unit length (arrows of length 1) so we only care about direction, not magnitude.

```
Similarity = (A · B) / (|A| × |B|)

Where:
- A · B is the dot product
- |A| and |B| are the magnitudes
```

---

### Building a CLIP-Style Model: Step by Step

Let's walk through how this works in practice, using a simplified example from NVIDIA's training.

#### Step 1: Create Two Encoder Networks

You need one encoder for each modality:

```
Image Encoder: Takes images → Produces image embeddings
Text Encoder:  Takes text   → Produces text embeddings
```

These can be any architecture (CNNs for images, Transformers for text). The key is that both produce vectors of the same size.

#### Step 2: Normalize the Embeddings

Before comparing, we normalize all embeddings to unit vectors. This ensures we're comparing direction only.

```python
# Normalize to unit vectors
image_embedding = F.normalize(image_embedding, dim=1)
text_embedding = F.normalize(text_embedding, dim=1)
```

#### Step 3: Calculate the Similarity Matrix

For a batch of N image-text pairs:
- Row i contains similarities between image i and all N texts
- Column j contains similarities between text j and all N images
- The diagonal should be high (matching pairs)
- Off-diagonal should be low (non-matching pairs)

```
              Text1   Text2   Text3   Text4
Image1      [ 0.95   0.10    0.05    0.12 ]  ← Image1 matches Text1
Image2      [ 0.08   0.92    0.15    0.20 ]  ← Image2 matches Text2
Image3      [ 0.12   0.18    0.89    0.10 ]  ← Image3 matches Text3
Image4      [ 0.05   0.22    0.08    0.91 ]  ← Image4 matches Text4
```

#### Step 4: Apply Cross-Entropy Loss

We treat this as a classification problem. For each image, the correct text is its "class." We use cross-entropy loss to:
- Maximize diagonal values (correct pairs)
- Minimize off-diagonal values (wrong pairs)

The loss is computed in both directions:
1. Given image, predict correct text
2. Given text, predict correct image

Final loss = Average of both directions

---

### A Practical Example: Fashion Item Search

NVIDIA's training demonstrates this with the FashionMNIST dataset. The twist? Instead of pairing images with text, they pair original images with their edge-detected outlines (using Sobel filters).

**The Use Case**: Build a system where you can sketch a rough outline of clothing, and the system finds matching products.

**How It Works**:
1. Take images of t-shirts, pants, shoes, etc.
2. Extract edge outlines using Sobel filters (simulating hand-drawn sketches)
3. Train contrastively: Original image ↔ Outline should be close
4. At inference: User draws a sketch → System finds images with similar embeddings

This is the foundation of **visual search systems** used by e-commerce platforms.

---

### Cross-Modal Projection: The Bridge Between Worlds

Contrastive learning creates aligned embeddings, but sometimes you need to go further. What if you have a model trained on LiDAR data, and you want to use RGB images instead?

**The Analogy**: Imagine you have a expert translator who only speaks Japanese. You speak English. Instead of training a new expert, you hire an interpreter (a projector) who converts your English into Japanese.

**Cross-Modal Projection** trains a simple neural network to convert embeddings from one modality space to another:

```
RGB Embedding ──> [Projector Network] ──> LiDAR Embedding Space
```

The projector is typically just a few linear layers, trained using Mean Squared Error (MSE) loss to match the target embeddings.

#### Why This Matters

1. **Reuse Expensive Models**: LiDAR models are expensive to train. Projection lets you reuse them with cheaper RGB data.

2. **Missing Modality at Inference**: Your training data has both RGB and depth, but your deployment camera only captures RGB. Project to fill the gap.

3. **Transfer Learning**: Project from a modality where you have lots of data to one where you have less.

---

### Two-Stage Training Strategy

For complex multimodal systems, NVIDIA recommends a two-stage approach:

**Stage 1: Alignment**
Train the projector to align embeddings using frozen pre-trained encoders.
- Freeze: Both encoders
- Train: Projector only
- Loss: MSE between projected and target embeddings

**Stage 2: Fine-tuning**
Optionally unfreeze everything and fine-tune end-to-end for your specific task.
- Unfreeze: Everything (or selectively)
- Train: Whole pipeline
- Loss: Task-specific (classification, regression, etc.)

This staged approach prevents catastrophic forgetting and ensures stable training.

---

### Key Takeaways

1. **Embeddings are coordinates in meaning-space**: Similar concepts cluster together regardless of original data type

2. **Contrastive learning teaches through comparison**: Push matching pairs together, pull non-matching pairs apart

3. **Cosine similarity measures directional alignment**: Normalized dot product tells you how "same direction" two vectors point

4. **Cross-modal projection bridges modality gaps**: A simple network can translate between embedding spaces

5. **Two-stage training is more stable**: First align embeddings, then fine-tune for your task

---

### Real-World Applications

- **Image Search**: Type "sunset over mountains" → Find matching photos (CLIP)
- **Product Discovery**: Upload a photo → Find similar products (Pinterest, Amazon)
- **Content Moderation**: Align images with violation categories for detection
- **Accessibility**: Connect images to audio descriptions for visually impaired users
- **Robotics**: Align camera views with depth sensors for navigation

---

### What's Next?

In Part 3, we'll explore how to extract and process multimodal data from documents using **OCR and RAG pipelines**. You'll learn how AI can read PDFs, extract tables and images, and build searchable knowledge bases from unstructured documents.

---

*This content is inspired by NVIDIA's Deep Learning Institute course: [Building AI Agents with Multimodal Models](https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+C-FX-17+V1). For hands-on experience, consider enrolling in their official courses.*
