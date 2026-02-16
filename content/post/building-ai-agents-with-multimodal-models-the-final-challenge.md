---
title: "Building AI Agents with Multimodal Models: The Final Challenge"
date: 2025-08-03T05:00:00+00:00
slug: building-ai-agents-with-multimodal-models-the-final-challenge
tags: ["nvidia", "lidarsensor", "multimodalai"]
description: "Multimodal AI uses contrastive learning and embedding alignments to adapt LiDAR models for RGB images without retraining on RGB labels"
cover: /images/8b41e212edf58813764910931957f54b.jpeg
---
## The Challenge That Ties Everything Together

After four modules of learning multimodal techniques, NVIDIA's certification throws you into the deep end with a beautifully designed assessment. The problem sounds almost paradoxical at first:

**You have a classifier that works perfectly with LiDAR data. Make it work with RGB images instead, without retraining it on RGB labels.**

Wait, what? How do you make a model trained on depth data suddenly understand colors?

This is where everything you've learned comes together: contrastive learning, cross-modal projection, and embedding alignment. Let me walk you through my journey of solving this puzzle.

---

### Understanding the Problem: Cubes and Spheres

The scenario is elegant in its simplicity. You have a dataset of 3D scenes containing either cubes or spheres. Each scene is captured two ways:

1. **RGB Images**: Color photographs showing red, green, or blue objects
2. **LiDAR Depth Maps**: Point cloud data showing the 3D shape

Here's the catch:
- The pre-trained classifier only understands LiDAR data
- At inference time, you only have RGB images
- You cannot retrain the classifier on RGB labels

**The Analogy**: Imagine you have an expert sculpture appraiser who identifies shapes by touch alone (LiDAR). Now you need them to identify shapes from photographs (RGB) without teaching them what photographs are. Instead, you'll build a translator that converts photographs into "touch descriptions" the expert already understands.

---

### The Three-Part Solution

The assessment breaks down into three interconnected challenges. Each builds on the previous, and skipping steps or misunderstanding the flow will leave you stuck.

#### Mental Model: The Translation Pipeline

```
What you have:     RGB Image of a cube
What you need:     "cube" prediction
What you can use:  A LiDAR classifier that's already perfect

The bridge:        RGB → [Something Magic] → LiDAR-like representation → Classifier
```

The "something magic" is what you'll build: a contrastive pre-training system plus a projector network.

---

### Part 1: Teaching Two Modalities to Speak the Same Language

**The Goal**: Create embedders that place RGB and LiDAR representations of the same scene close together in embedding space.

**The Analogy**: Imagine training two translators. One reads English books and creates summaries. The other reads French books and creates summaries. Your goal is to train them so that when they read the same story (one in English, one in French), their summaries are nearly identical.

#### The Architecture I Built

Two separate CNN encoders:
- **Image Embedder**: Takes 4-channel RGB input, outputs a compact embedding
- **LiDAR Embedder**: Takes 1-channel depth input, outputs an embedding of the same size

The key insight is that both embedders output vectors of identical dimensions. This is crucial because you'll be comparing them directly.

#### The Training Objective

For each batch:
1. Pass RGB images through the image embedder
2. Pass corresponding LiDAR data through the LiDAR embedder
3. Normalize both sets of embeddings (this is critical and easy to forget)
4. Calculate similarity between every RGB embedding and every LiDAR embedding
5. The diagonal of this similarity matrix should be high (matching pairs)
6. Off-diagonal entries should be low (non-matching pairs)

#### Where I Got Stuck (And How I Fixed It)

**Problem 1: The Similarity Matrix**

My first attempt produced garbage results. The issue? I was calculating similarity wrong.

When you have a batch of N image embeddings and N LiDAR embeddings, you need an N×N matrix where entry (i,j) represents the similarity between image i and LiDAR j.

The trick is creating all pairwise combinations efficiently:
- Take your image embeddings and repeat each one N times
- Take your LiDAR embeddings and tile the entire batch N times
- Now you have N² pairs that you can compare

I initially confused `repeat` with `repeat_interleave`. These do very different things:
- `repeat_interleave`: [A, B, C] with repeats=2 → [A, A, B, B, C, C]
- `repeat`: [A, B, C] with repeats=2 → [A, B, C, A, B, C]

Getting this wrong meant my similarity matrix had the wrong structure, and the model couldn't learn meaningful alignments.

**Problem 2: Cosine Similarity Dimensions**

Another subtle bug: when using cosine similarity on batched pairwise comparisons, you need to specify the correct dimension. The embedding dimension (not the batch dimension) is where the dot product happens.

**Problem 3: Loss Function Setup**

The contrastive loss treats this as a classification problem. For each image, the "correct class" is the index of its matching LiDAR pair. With proper normalization and similarity calculation, cross-entropy loss does the heavy lifting.

#### The "Aha" Moment

Once I fixed the similarity matrix construction, training loss dropped dramatically. Watching the validation loss decrease below the threshold was satisfying, but the real test was visualizing the embeddings.

After training, RGB images of cubes clustered near LiDAR scans of cubes. Spheres clustered with spheres. The two modalities had learned a shared language.

---

### Part 2: Building the Bridge Between Worlds

**The Goal**: Project RGB embeddings into the space where the LiDAR classifier operates.

Here's a subtlety that tripped me up: the CILP embedders produce 200-dimensional vectors, but the pre-trained LiDAR classifier expects 3200-dimensional inputs (from its internal `get_embs()` method).

**The Analogy**: You've taught two translators to write similar summaries. But the expert appraiser doesn't read summaries. They read detailed technical reports in a specific format. Now you need a "report writer" that converts summaries into the format the expert expects.

#### The Architecture

A simple multi-layer perceptron (MLP) that:
- Takes 200-dim input (CILP image embeddings)
- Outputs 3200-dim vectors (matching the LiDAR classifier's embedding space)

#### The Training Strategy

This is where the two-stage training approach from the course pays off:

1. **Freeze the CILP embedders**: They've already learned good representations
2. **Generate embedding pairs**: For each training sample, get both the RGB embedding (from CILP) and the LiDAR embedding (from the pre-trained classifier's internal method)
3. **Train the projector**: Minimize the MSE between projected RGB embeddings and actual LiDAR embeddings

#### Where I Got Stuck (And How I Fixed It)

**Problem: Dimension Mismatch**

My first projector architecture was too shallow. A single linear layer from 200 to 3200 dimensions struggled to capture the complex mapping. Adding intermediate layers with non-linearities helped significantly.

**Problem: Not Using the Right LiDAR Embeddings**

Initially, I tried to project to the CILP LiDAR embeddings (200-dim). Wrong target! The goal is to project to where the *classifier* expects its input, which is the 3200-dim space from `lidar_cnn.get_embs()`.

This distinction is crucial: CILP learns alignment, but the projector bridges to the classifier's specific representation space.

---

### Part 3: Assembling the Complete Pipeline

**The Goal**: Chain everything together so RGB images flow through to correct predictions.

#### The Final Architecture

```
RGB Image
    │
    ▼
┌─────────────────────┐
│  CILP Image Embedder │  ← Frozen (from Part 1)
│     (4ch → 200-dim)  │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│      Projector       │  ← Trainable (from Part 2)
│   (200 → 3200-dim)   │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│   LiDAR Classifier   │  ← Frozen (pre-trained)
│  (3200-dim → class)  │
└─────────────────────┘
    │
    ▼
"cube" or "sphere"
```

#### The Final Training Loop

With the complete pipeline assembled:
1. Pass RGB images through the frozen CILP image embedder
2. Project the embeddings to 3200 dimensions
3. Pass through the frozen LiDAR classifier
4. Compare predictions to ground truth labels
5. Backpropagate through the projector only

#### The Moment of Truth

Running validation on RGB images the model had never seen during training:

**Accuracy: 97.2%**

The model correctly classified cubes and spheres from color images, despite never being trained on RGB labels directly. All it learned was:
1. How RGB and LiDAR representations relate (contrastive pre-training)
2. How to translate from CILP space to classifier space (projection)

The classifier did what it always does. The magic was in the translation layers.

---

### Key Insights from the Assessment

#### 1. Contrastive Learning Creates Bridges, Not Solutions

CILP doesn't solve the classification problem. It creates aligned representations that make downstream tasks possible. The embeddings have no inherent "cube-ness" or "sphere-ness." They only know that certain RGB patterns correspond to certain LiDAR patterns.

#### 2. Projection is Surprisingly Simple

I expected the projector to be complex. In reality, a few linear layers with activations suffice. The heavy lifting was done by CILP. The projector just needs to reshape the information.

#### 3. Freezing is Your Friend

Trying to train everything end-to-end from scratch would be a nightmare. The staged approach (freeze CILP, train projector, freeze everything) provides stability and interpretability.

#### 4. Dimension Awareness is Critical

Throughout the assessment, I had to track:
- RGB input channels: 4
- LiDAR input channels: 1
- CILP embedding dimension: 200
- Classifier embedding dimension: 3200
- Output classes: 2

Mixing these up causes silent failures where the model trains but learns nothing useful.

#### 5. The Similarity Matrix is the Heart of Contrastive Learning

If I could give one piece of advice: spend extra time understanding how the similarity matrix is constructed. Draw it out on paper. Trace through the tensor operations. This is where most bugs hide.

---

### What This Assessment Taught Me

Beyond the technical implementation, this assessment crystallized why multimodal AI matters:

**You can transfer knowledge across modalities without paired labels.**

Think about the implications:
- Train a model on abundant labeled data in one modality
- Transfer to a modality where labels are scarce or expensive
- The bridge is learned from unlabeled paired data

This is how modern AI systems handle:
- Medical imaging (transfer from annotated scans to new imaging techniques)
- Robotics (transfer from simulation to real sensors)
- Accessibility (convert between visual and audio representations)

---

### Final Thoughts

The CILP assessment is cleverly designed. It doesn't just test whether you can copy code from notebooks. It tests whether you understand:
- Why contrastive learning works
- How embedding spaces relate
- When to freeze and when to train
- How information flows through multimodal pipelines

If you're attempting this assessment, my advice:
1. Draw the architecture before writing code
2. Print tensor shapes obsessively
3. Verify each component independently before combining
4. Trust the staged training approach

The satisfaction of seeing 95%+ accuracy on a modality your classifier was never trained on is worth the debugging struggle.

---

*This post documents my experience completing the assessment for NVIDIA's Deep Learning Institute course: [Building AI Agents with Multimodal Models](https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+C-FX-17+V1).*



