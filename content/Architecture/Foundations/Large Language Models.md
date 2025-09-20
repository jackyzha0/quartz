# Chapter 2: Large Language Models

> From transformer architecture to chat-capable AI systems: The evolution and engineering of Large Language Models.

[← Transformer Architecture](Transformer%20Architecture.md) | [Back to Index](index.md) | [Next: VLM Basics →](VLM%20Basics.md)

---

## Executive Summary

Large Language Models (LLMs) represent the culmination of scaling transformer architectures to billions of parameters, trained on trillions of tokens. This chapter explores how these models are created, from massive pretraining to instruction fine-tuning, and their evolution into multimodal systems.

## 2.1 The Journey to Large Language Models

### Historical Progression

| Year | Model | Parameters | Key Innovation |
|------|-------|------------|----------------|
| 2018 | GPT-1 | 117M | Unsupervised pretraining + supervised fine-tuning |
| 2018 | BERT | 340M | Bidirectional pretraining |
| 2019 | GPT-2 | 1.5B | Zero-shot task transfer |
| 2020 | GPT-3 | 175B | In-context learning |
| 2022 | PaLM | 540B | Pathways system |
| 2023 | GPT-4 | ~1.7T | Multimodal capabilities |
| 2023 | Llama 2 | 70B | Open-source efficiency |

### The Scaling Hypothesis

The remarkable discovery: model capabilities scale predictably with:
- **Parameters (N)**: Number of model weights
- **Data (D)**: Training tokens
- **Compute (C)**: FLOPs used in training

**Chinchilla Scaling Laws**: Optimal ratio is ~20 tokens per parameter

## 2.2 Pretraining: Learning from the Internet

### 2.2.1 The Pretraining Objective

LLMs learn through **next-token prediction** (causal language modeling):

$$\mathcal{L} = -\sum_{t=1}^{T} \log P(x_t | x_{<t}; \theta)$$

This simple objective, when scaled, leads to emergent capabilities:
- Reasoning
- Few-shot learning
- Code generation
- Mathematical problem-solving

### 2.2.2 Data Requirements

Modern LLMs consume enormous datasets:

| Dataset Component | Size | Examples |
|-------------------|------|----------|
| Web Crawl | 60% | CommonCrawl, C4 |
| Books | 15% | BookCorpus, Gutenberg |
| Wikipedia | 5% | Multiple languages |
| Code | 10% | GitHub, StackOverflow |
| Academic | 5% | ArXiv, PubMed |
| Curated | 5% | High-quality sources |

**Total**: 1-15 trillion tokens for frontier models

### 2.2.3 Training Infrastructure

Training GPT-3 scale models requires:
- **Hardware**: 1,000+ A100 GPUs
- **Time**: 3-6 months
- **Cost**: $5-100 million
- **Energy**: 1,000+ MWh

## 2.3 Model Architecture Evolution

### 2.3.1 Architectural Improvements

Building on the transformer foundation:

```python
class ModernLLM(nn.Module):
    def __init__(self, config):
        super().__init__()
        # Key improvements over vanilla transformer
        self.use_flash_attention = True  # Faster attention
        self.use_rotary_embeddings = True  # Better positions
        self.use_swiglu = True  # Better activations
        self.use_rmsnorm = True  # Faster normalization
        
        self.layers = nn.ModuleList([
            TransformerBlock(
                d_model=config.hidden_size,
                n_heads=config.n_heads,
                use_gqa=True,  # Grouped-query attention
            ) for _ in range(config.n_layers)
        ])
```

### 2.3.2 Key Architectural Choices

| Component | Traditional | Modern Choice | Benefit |
|-----------|-------------|---------------|---------|
| Position | Sinusoidal | RoPE | Extrapolation |
| Attention | Full | Flash/GQA | 10x faster |
| Activation | ReLU | SwiGLU | Better gradients |
| Norm | LayerNorm | RMSNorm | 30% faster |

### 2.3.3 Context Window Expansion

Extending context from 2K to 128K+ tokens:

1. **Positional Interpolation**: Compress position encodings
2. **Sliding Window Attention**: Local + global attention
3. **Flash Attention**: Memory-efficient implementation
4. **Ring Attention**: Distributed across devices

## 2.4 Supervised Fine-Tuning (SFT)

### 2.4.1 From Completion to Conversation

After pretraining, models undergo instruction tuning:

**Before SFT**: 
```
Input: "What is the capital of France?"
Output: "is a common question. Many people wonder about..."
```

**After SFT**:
```
Input: "What is the capital of France?"
Output: "The capital of France is Paris."
```

### 2.4.2 Instruction Datasets

High-quality instruction-response pairs:

| Source | Examples | Size |
|--------|----------|------|
| Human-written | Professional annotations | 10-50K |
| GPT-4 generated | Self-instruct, Alpaca | 50-500K |
| Task-specific | Code, math, reasoning | 10-100K |
| Multi-turn | Conversations, dialogues | 10-50K |

### 2.4.3 Fine-Tuning Strategies

```python
# Full Fine-Tuning
optimizer = AdamW(model.parameters(), lr=1e-5)

# Parameter-Efficient Fine-Tuning (PEFT)
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,  # Rank
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.1,
)
model = get_peft_model(model, config)
# Only trains 0.1% of parameters!
```

## 2.5 Multimodal Extension: LLaMA 3.2 Case Study

### 2.5.1 Architecture Overview

Extending LLMs to process images:

![Multimodal Architecture](LLM%20Healthcare.svg)
*Figure 2.1: LLaMA 3.2 multimodal architecture with vision encoder integration*

### 2.5.2 Vision Integration Components

**Three-Stage Design**:

1. **Vision Encoder** (See [[VLM Basics|VLM Basics]])
   - 32-layer local encoder for patches
   - 8-layer global encoder with gated attention
   - Outputs: 1280-dim patch features

2. **Cross-Modal Projection**
   ```python
   self.vision_projector = nn.Sequential(
       nn.Linear(7680, 4096),  # Match LLM dimension
       nn.GELU(),
       nn.Linear(4096, 4096)
   )
   ```

3. **Interleaved Attention**
   - Self-attention layers: Process text
   - Cross-attention layers (every 5th): Integrate vision
   - Preserves pretrained LLM capabilities

### 2.5.3 Training Strategy

1. **Stage 1**: Vision encoder pretraining
2. **Stage 2**: Projection layer alignment
3. **Stage 3**: Full model fine-tuning (vision unfrozen)

## 2.6 Emergent Capabilities

### 2.6.1 Scaling Laws and Emergence

Capabilities that appear suddenly at scale:

| Capability | Emergence Scale | Example |
|------------|----------------|---------|
| Three-digit arithmetic | ~10B params | 234 + 567 = ? |
| Chain-of-thought | ~50B params | Step-by-step reasoning |
| Instruction following | ~10B params | Complex multi-step tasks |
| Code generation | ~10B params | Writing functions |
| Self-correction | ~100B params | Identifying own mistakes |

### 2.6.2 In-Context Learning

Models learn from examples without parameter updates:

```
Few-shot prompt:
Translate English to French:
sea otter → loutre de mer
peppermint → menthe poivrée
plush giraffe → girafe en peluche
cheese → [model completes: fromage]
```

## 2.7 Optimization and Training

### 2.7.1 Modern Training Recipe

```python
# Typical configuration for 7B model
config = {
    'learning_rate': 3e-4,
    'warmup_steps': 2000,
    'weight_decay': 0.1,
    'batch_size': 4M tokens,
    'gradient_clip': 1.0,
    'adam_beta1': 0.9,
    'adam_beta2': 0.95,
    'adam_epsilon': 1e-8,
}

# Learning rate schedule
def lr_schedule(step):
    if step < warmup_steps:
        return lr * (step / warmup_steps)
    return lr * (warmup_steps / step) ** 0.5
```

### 2.7.2 Distributed Training

Parallelism strategies for scale:

1. **Data Parallel**: Split batch across GPUs
2. **Tensor Parallel**: Split layers across GPUs  
3. **Pipeline Parallel**: Split model depth across GPUs
4. **Sequence Parallel**: Split sequence length
5. **Expert Parallel**: For mixture-of-experts

## 2.8 Evaluation Challenges

### Standard Benchmarks

| Benchmark | Focus | Metric |
|-----------|-------|--------|
| MMLU | Knowledge | Accuracy |
| HumanEval | Code | Pass@1 |
| GSM8K | Math | Accuracy |
| TruthfulQA | Factuality | % Truthful |
| MT-Bench | Conversation | GPT-4 judged |

See [[../Evaluation/HELM Framework|HELM Framework]] for comprehensive evaluation.

## 2.9 Deployment Considerations

### 2.9.1 Model Compression

Techniques for efficient deployment:

1. **Quantization**: FP16 → INT8/INT4
2. **Distillation**: Teacher → Student
3. **Pruning**: Remove redundant weights
4. **Dynamic Sparsity**: Conditional computation

### 2.9.2 Inference Optimization

```python
# Example: KV-cache for faster generation
class OptimizedGeneration:
    def __init__(self, model):
        self.model = model
        self.kv_cache = {}
    
    def generate(self, prompt, max_length=100):
        # Cache key-value pairs from attention
        # Reuse for subsequent tokens
        # 10-50x speedup for long generations
```

## 2.10 Safety and Alignment

Critical considerations for deployment:

- **Hallucination**: See [[../Safety/MLLMGuard Framework|Safety Frameworks]]
- **Bias**: Evaluation across demographics
- **Toxicity**: Content filtering and moderation
- **Security**: [[vlm-attacks|Adversarial robustness]]

## 2.11 Future Directions

### Near-term (2024-2025)
- Context windows: 1M+ tokens
- Mixture of Experts: Conditional computation
- Multimodal by default: Text, image, audio, video

### Long-term (2025+)
- Continual learning: Updating without forgetting
- Efficient architectures: Sub-quadratic attention
- Reasoning models: Chain-of-thought as default

## 2.12 Key Takeaways

1. **Scale enables emergence**: Capabilities appear at scale thresholds
2. **Pretraining is foundation**: Quality and quantity both matter
3. **Fine-tuning aligns behavior**: From completion to assistance
4. **Multimodal is next**: Vision, audio integration
5. **Efficiency is crucial**: Compression, optimization for deployment

## 2.13 Practical Resources

- **Open Models**: LLaMA, Mistral, Falcon
- **Frameworks**: Transformers, vLLM, TGI
- **Datasets**: RedPajama, RefinedWeb, The Pile
- **Benchmarks**: [[Metrics and Calibration|Evaluation Metrics]]

---

### Navigation

[← Transformer Architecture](Transformer%20Architecture.md) | [Back to Index](index.md) | [Next: VLM Basics →](VLM%20Basics.md)

### Related Topics
- [[Medical Vision-Language Models|Medical Applications]]
- [[../Evaluation/Pretraining Comparison|Pretraining Strategies]]
- [[vlm-attacks|Security Considerations]]
