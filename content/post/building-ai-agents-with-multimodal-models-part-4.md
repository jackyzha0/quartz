---
title: "Building AI Agents with Multimodal Models: Part 4"
date: 2025-07-20T05:00:00+00:00
slug: building-ai-agents-with-multimodal-models-part-4
tags: ["nvidia", "rag", "multimodalai", "graphrag"]
description: "Explore NVIDIA's Video Understanding, Graph-RAG for AI video analysis, reasoning, summarization, prompt engineering, and multimodal integration"
cover: /images/ba1dc2e22c6453fc22d4b1918c55a671.jpeg
---
## Video Understanding & Graph-RAG: AI That Watches, Remembers, and Reasons

*This is Part 4 (Final) of a 4-part series based on learnings from NVIDIA's "Building AI Agents with Multimodal Models" certification.*

---

### The Final Frontier: Understanding Video

We've covered images, text, and documents. Now we tackle the most challenging modality: **video**.

Video isn't just a collection of images. It's a temporal sequence where:
- Actions unfold over time
- Objects enter and exit scenes
- Events have causes and effects
- Context from the past informs the present

**The Analogy**: Imagine describing a movie to someone who hasn't seen it. You don't describe each frame. You summarize scenes, explain character motivations, and connect plot points. This requires understanding time, causality, and narrative structure.

Teaching AI to do this is the challenge of Video Search and Summarization (VSS).

---

### NVIDIA's Video Search and Summarization Pipeline

NVIDIA provides a production-ready blueprint for video understanding. Let's break down how it works.

#### The Architecture: Three-Stage Processing

```
┌─────────────────────────────────────────────────────────────────────┐
│                        VIDEO INPUT                                  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 1: Dense Captioning                                         │
│  Video chunks ──> VLM ──> Detailed captions with timestamps        │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 2: Caption Aggregation                                      │
│  Overlapping captions ──> LLM ──> Condensed, coherent descriptions │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 3: Summary Generation                                       │
│  All descriptions ──> LLM ──> Final coherent summary               │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
              Vector Database (Milvus) for RAG queries
```

#### Stage 1: Dense Captioning with Vision Language Models

**What Happens**: The video is split into chunks (e.g., 30-second segments with 5-second overlap). A Vision Language Model (VLM) watches each chunk and generates detailed captions.

**The Analogy**: Like a court stenographer who watches a trial and creates detailed notes of everything that happens, with timestamps.

**Key Parameters**:
- `chunk_duration`: How long each segment is (trade-off between detail and processing time)
- `chunk_overlap_duration`: Overlap between segments to catch events at boundaries
- `prompt`: Instructions to the VLM on what to describe and how

**Example VLM Output**:
```
[00:00-00:30] A silver sedan approaches the intersection from the north.
              The traffic light is green. Two pedestrians wait on the sidewalk.

[00:25-00:55] The sedan enters the intersection. A red SUV approaches from
              the east, running a yellow light. The pedestrians begin crossing.
```

**Why Overlap Matters**: If a car crash happens exactly at second 30, without overlap, neither chunk fully captures it. The 5-second overlap ensures boundary events are seen by at least one chunk.

#### Stage 2: Caption Aggregation

**The Problem**: Overlapping chunks produce redundant descriptions. The same event might be described twice.

**The Solution**: An LLM reads overlapping captions and condenses them, removing redundancy while preserving all unique information.

**Before Aggregation**:
```
Chunk 1: "A worker places a box on the shelf. The box appears heavy."
Chunk 2: "A heavy box is placed on the shelf. It appears unstable."
Chunk 3: "The unstable box falls from the shelf onto the floor."
```

**After Aggregation**:
```
"A worker places a heavy box on the shelf. The box appears unstable
and subsequently falls onto the floor."
```

#### Stage 3: Summary Generation

**What Happens**: All aggregated descriptions are combined into a final, coherent summary that reads like a narrative rather than a collection of observations.

**The Output**: A comprehensive summary that can answer questions like:
- "What happened in this video?"
- "Were there any safety violations?"
- "Describe the sequence of events."

---

### Prompt Engineering for Video: The Secret Sauce

The quality of video understanding depends heavily on prompt engineering. NVIDIA's training emphasizes three components of effective prompts:

#### 1. Persona
Tell the VLM who it is and what expertise it has.

```
You are a traffic safety analyst reviewing intersection footage.
You have expertise in identifying traffic violations, near-misses,
and pedestrian safety concerns.
```

#### 2. Specific Details to Capture
List exactly what information you want extracted.

```
For each scene, note:
- Vehicle types, colors, and directions of travel
- Traffic signal states (red, yellow, green)
- Pedestrian positions and movements
- Any violations or concerning behaviors
- Timestamp of each observation
```

#### 3. Output Format
Specify how results should be structured.

```
Format your observations as:
[TIMESTAMP] OBSERVATION
Include severity levels for any safety concerns: LOW, MEDIUM, HIGH
```

**Why This Matters**: Generic prompts like "Describe this video" produce generic results. Specific prompts produce actionable intelligence.

---

### From Summaries to Q&A: Vector-RAG

Once videos are processed, you can query them using Retrieval Augmented Generation.

**The Process**:
1. User asks: "Were there any safety violations in today's warehouse footage?"
2. Question is embedded as a vector
3. Similar caption segments are retrieved from Milvus
4. Retrieved context is fed to LLM with the question
5. LLM generates an answer grounded in the video content

**Example Query Flow**:
```
Question: "What time did the forklift enter the frame?"

Retrieved Context:
[00:02:15] A yellow forklift enters the warehouse from the loading dock.
[00:02:45] The forklift operator picks up a pallet of boxes.

Answer: "The forklift entered the frame at approximately 2 minutes
and 15 seconds into the footage."
```

---

### Graph-RAG: When Vector Search Isn't Enough

Vector-RAG works great for simple queries. But what about complex reasoning?

**The Limitation of Vector Search**:
Query: "What caused the accident?"

Vector search finds segments mentioning "accident" but may miss:
- The speeding vehicle 30 seconds before
- The obscured stop sign 2 minutes earlier
- The wet road conditions mentioned at the start

These are causally related but semantically distant. Vector similarity misses the connection.

**The Analogy**: Imagine a detective investigating a crime. They don't just search for clues similar to the crime scene. They build a web of relationships: who knew whom, who was where when, what events led to what. This web of connections is a **knowledge graph**.

---

### Building a Knowledge Graph from Video

Graph-RAG extracts entities and relationships to build a queryable knowledge structure.

#### The Three G's of Graph-RAG

**1. G-Extraction (Building the Graph)**

An LLM analyzes video captions and extracts:
- **Entities**: Objects, people, locations, events
- **Relationships**: How entities connect to each other
- **Properties**: Attributes of entities

**Example Extraction**:
```
Caption: "A worker places a heavy box on the top shelf.
         The box falls due to improper placement."

Entities:
- Worker (type: person)
- Box (type: object, property: heavy)
- Top Shelf (type: location)
- Fall Event (type: event)

Relationships:
- Worker PLACES Box
- Box ON Top Shelf
- Box FALLS_DUE_TO improper_placement
- improper_placement CAUSES Fall Event
```

This creates a graph structure:
```
       [Worker]
          │
       PLACES
          │
          ▼
        [Box] ─── heavy
          │
          ON
          │
          ▼
     [Top Shelf]
          │
     FALLS_DUE_TO
          │
          ▼
  [improper_placement]
          │
       CAUSES
          │
          ▼
    [Fall Event]
```

**2. G-Retrieval (Querying the Graph)**

Instead of vector similarity, queries are converted to graph queries (Cypher for Neo4j):

```cypher
// Query: "What caused the box to fall?"
MATCH (b:Object {name: 'Box'})-[:FALLS_DUE_TO]->(cause)
RETURN cause

// Result: improper_placement
```

```cypher
// Query: "Show all safety incidents and their causes"
MATCH (event:Event)-[:CAUSED_BY]->(cause)
WHERE event.type = 'safety_incident'
RETURN event, cause
```

**3. G-Generation (Answering with Context)**

Retrieved graph data is fed to an LLM which synthesizes a natural language answer:

```
Graph Data Retrieved:
- Box FALLS_DUE_TO improper_placement
- Worker PLACES Box
- improper_placement CAUSED_BY rushing

LLM Answer: "The box fell because of improper placement. The worker
placed the box hastily on the top shelf without ensuring stability.
This appears to be caused by rushing to meet a deadline."
```

---

### Vector-RAG vs. Graph-RAG: When to Use Which

| Aspect | Vector-RAG | Graph-RAG |
|--------|-----------|-----------|
| Best For | Simple fact retrieval | Complex reasoning |
| Query Type | "What happened at 2pm?" | "What caused the failure?" |
| Speed | Faster | Slower (graph traversal) |
| Setup | Simpler | Requires graph construction |
| Reasoning | Shallow (similarity) | Deep (relationships) |
| Storage | Vector database | Graph database (Neo4j) |

**Use Vector-RAG When**:
- Questions are about specific facts or timestamps
- Real-time response is critical (live streaming)
- Relationships between events are not important

**Use Graph-RAG When**:
- Questions involve causality or chains of events
- You need to understand how things connect
- Complex multi-hop reasoning is required

---

### Practical Applications

#### Traffic Monitoring
- Detect violations and near-misses
- Analyze accident causes
- Track traffic patterns over time

#### Warehouse Safety
- Monitor worker compliance
- Track inventory movement
- Identify safety hazards

#### Bridge Inspection
- Detect structural anomalies
- Track changes over time
- Prioritize maintenance needs

#### Security Surveillance
- Track persons of interest
- Detect unusual behavior
- Generate incident reports

---

### The Complete Multimodal Picture

Looking back at this 4-part series, we've covered the full spectrum:

**Part 1**: How to combine different data types (fusion strategies)
**Part 2**: How to align different modalities (contrastive learning)
**Part 3**: How to extract intelligence from documents (OCR + RAG)
**Part 4**: How to understand temporal content (Video + Graph-RAG)

Together, these techniques enable AI systems that can:
- See images and video
- Read documents and text
- Understand depth and 3D structure
- Connect concepts across modalities
- Reason about relationships and causality

---

### Key Takeaways from the Complete Series

1. **Multimodal AI is about combining strengths**: Each modality has unique capabilities. Fusion multiplies them.

2. **Embeddings are the universal language**: Converting everything to vectors enables cross-modal comparison.

3. **Contrastive learning aligns modalities**: Push matching pairs together, pull non-matches apart.

4. **RAG grounds AI in your data**: Retrieval prevents hallucination and enables factual answers.

5. **Graphs capture relationships**: When causality matters, knowledge graphs outperform vector search.

6. **Prompt engineering is crucial**: Specific, well-structured prompts dramatically improve results.

7. **Production systems need pipelines**: Real applications require chunking, batching, and careful orchestration.

---

### Where to Go From Here

This certification provides a foundation. To deepen your expertise:

- **Experiment**: Build your own multimodal pipelines with the techniques learned
- **Explore NVIDIA NIMs**: Pre-built microservices for production deployment
- **Study Attention Mechanisms**: Transformers power most modern multimodal models
- **Follow Research**: Multimodal AI is evolving rapidly with new architectures monthly

The future of AI is multimodal. The ability to process and reason across data types will define the next generation of intelligent systems.

---

*This content is inspired by NVIDIA's Deep Learning Institute course: [Building AI Agents with Multimodal Models](https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+C-FX-17+V1). For hands-on experience with these techniques, consider enrolling in their official courses.*


