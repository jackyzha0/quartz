

# The Transformer Architecture: Attention Is All You Need

[← Back to Foundations Index](index.md) | [Next: Large Language Models →](Large%20Language%20Models.md)

## Overview

The Transformer architecture, introduced in 2017, fundamentally changed how we process sequences in machine learning. By replacing recurrence with attention, it enabled parallel computation and better long-range dependency modeling—critical capabilities for modern language models and multimodal AI systems.

The Transformer revolutionized sequence processing by replacing sequential computation with parallel attention mechanisms. Instead of processing tokens one by one like RNNs, transformers see entire sequences simultaneously, enabling both computational efficiency and better long-range dependency modeling.



## 1. The Core Problem: Sequential Bottleneck

RNNs process sequences like reading through a straw - one token at a time. To connect "cat" to "orange" in "The cat that chased the mouse was orange", an RNN must pass information through 6 intermediate steps, each potentially corrupting the signal.

Transformers solve this by creating direct connections between all positions. Every word can directly "talk" to every other word through attention, regardless of distance.

## 2. Self-Attention: The Key Innovation

### Understanding Query, Key, Value

Think of a conference where each word needs to understand its context:

- **Query**: "What information am I looking for?" (asked by current word)
- **Key**: "What type of information do I contain?" (advertised by each word)
- **Value**: "Here's my actual information" (content from each word)

When processing "bank" in "river bank":

1. "bank" creates a Query: "I need context about my domain"
2. "river" advertises with its Key: "I contain nature/water context"
3. "bank" computes similarity between its Query and "river"'s Key
4. High similarity means "bank" pays more attention to "river"'s Value

### The Attention Formula

```python
def attention(Q, K, V):
    """
    Q: [seq_len, d_k] - queries
    K: [seq_len, d_k] - keys  
    V: [seq_len, d_v] - values
    """
    # Compute how much each query "matches" each key
    scores = Q @ K.T  # [seq_len, seq_len]
    
    # Scale to prevent gradient vanishing in softmax
    scores = scores / sqrt(d_k)
    
    # Convert to probabilities (attention weights)
    weights = softmax(scores, dim=-1)
    
    # Weighted sum of values
    output = weights @ V
    return output
```

The scaling factor `1/√d_k` is crucial: without it, dot products grow with dimension, pushing softmax into saturation where gradients vanish.

### Multi-Head Attention

Instead of one attention pattern, use multiple "heads" that learn different relationships:

- **Head 1**: Syntactic relationships (subject-verb)
- **Head 2**: Semantic similarity (synonyms, related concepts)
- **Head 3**: Positional patterns (adjacent words)
- **Head 4**: Long-range dependencies

Each head uses different learned projections, then results are concatenated and mixed.

## 3. Encoder vs Decoder Architecture

### Encoder: Bidirectional Understanding

- Sees entire input simultaneously
- No masking - each position attends to all positions
- Used for: classification, embedding, analysis
- Example: BERT

### Decoder: Autoregressive Generation

- Can only attend to previous positions (causal masking)
- Generates one token at a time during inference
- Used for: text generation, completion
- Example: GPT

### The Masking Mechanism

```python
# Causal mask for decoder (lower triangular)
mask = torch.tril(torch.ones(seq_len, seq_len))
# Apply to attention scores before softmax
scores = scores.masked_fill(mask == 0, float('-inf'))
```

This ensures position i can only attend to positions [0, ..., i], maintaining causality for generation.

## 4. Positional Encoding: Injecting Order

Attention is permutation-invariant - it doesn't know word order. Positional encoding adds unique position information:

$$PE_{(pos,2i)} = \sin(pos/10000^{2i/d_{model}})$$ $$PE_{(pos,2i+1)} = \cos(pos/10000^{2i/d_{model}})$$

Key properties:

- Each position gets a unique encoding
- Smooth changes between adjacent positions
- Can extrapolate to longer sequences than training
- Different frequencies in different dimensions capture various scales of patterns

## 5. Feed-Forward Networks

After attention aggregates information across positions, FFN processes each position independently:

```python
FFN(x) = Linear(ReLU(Linear(x)))
# Typically: d_model → 4*d_model → d_model
```

This acts as a position-wise "thinking" step, transforming the aggregated information. The expansion (usually 4x) provides capacity for learning complex patterns.

## 6. Residual Connections and Layer Normalization

Each sublayer is wrapped with:

```python
output = LayerNorm(x + Sublayer(x))
```

- **Residual connections**: Enable gradient flow through deep networks
- **Layer normalization**: Stabilizes training by normalizing activations

Without these, training deep transformers (12+ layers) becomes unstable or impossible.

## 7. Training Dynamics

### Teacher Forcing

During training, the model sees the entire target sequence but with causal masking:

- Input: `[START, The, cat, sat]`
- Target: `[The, cat, sat, END]`
- All positions trained in parallel

### Learning Rate Schedule

Transformers use a unique warmup schedule:

```python
lr = d_model^(-0.5) * min(step^(-0.5), step * warmup_steps^(-1.5))
```

- Warmup: Gradually increase LR to stabilize attention patterns
- Decay: Inverse square root decay after warmup

## 8. Computational Complexity

|Component|Complexity|Memory|
|---|---|---|
|Self-Attention|O(n²·d)|O(n²)|
|Feed-Forward|O(n·d²)|O(n·d)|
|Total per Layer|O(n²·d + n·d²)|O(n² + n·d)|

The quadratic attention is the bottleneck for long sequences, motivating efficient variants like:

- Sparse attention (local windows)
- Linear attention (kernel approximations)
- Flash Attention (IO-aware implementation)

## 9. Evolution of Transformer Models

|Year|Model|Parameters|Key Innovation|
|---|---|---|---|
|2017|Original|65M|Attention mechanism|
|2018|BERT|340M|Bidirectional pretraining|
|2018|GPT-1|117M|Unsupervised pretraining|
|2019|GPT-2|1.5B|Zero-shot emergence|
|2020|GPT-3|175B|In-context learning|
|2023|GPT-4|~1.7T|Multimodal reasoning|
|2024|Gemma-3|27B|Efficient long context|

The trend isn't just scale but architectural efficiency - modern models achieve more with fewer parameters through innovations like GQA, RoPE, and mixed attention patterns.

## 10. Connection to Vision Transformers

Vision Transformers (ViT) treat images as sequences:

1. Divide image into patches (e.g., 16×16)
2. Flatten patches into vectors
3. Add positional embeddings
4. Process with standard transformer

This unification of vision and language processing enables powerful multimodal models.

## Key Insights

1. **Attention enables parallel processing** while maintaining global context
2. **Q/K/V separation** allows learning what to look for vs what to provide
3. **Multi-head attention** captures diverse relationship types
4. **Positional encoding** preserves sequence order without recurrence
5. **Residual connections** enable very deep networks
6. **Scale reveals emergent capabilities** not seen in smaller models

## Critical Questions for Understanding

1. Why does attention need three matrices (Q/K/V) instead of just computing similarity directly?
2. How does causal masking maintain autoregressive property while allowing parallel training?
3. Why is the 1/√d_k scaling essential for stable training?
4. How do sinusoidal positional encodings enable length generalization?
5. What makes transformers more parallelizable than RNNs during training?

---

### Navigation

[← Back to Foundations Index](index.md) | [Next: Large Language Models →](Large%20Language%20Models.md)

### Related Topics

- [[VLM Basics|Visual Language Model Basics]]
- [[Medical Vision-Language Models|Medical VLMs]]
- [[linear-hypothesis-explanation|Security Vulnerabilities]]
- [[Byte Pair Encoding|Tokenization Methods]]

### Further Reading

- [Attention Is All You Need (Original Paper)](https://arxiv.org/abs/1706.03762)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [[../Evaluation/Pretraining Comparison|Pretraining Strategies]]
