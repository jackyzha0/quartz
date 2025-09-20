# Byte Pair Encoding: Subword Tokenization for Language Models

> A data-driven tokenization algorithm that balances vocabulary size with representation flexibility, forming the foundation of modern LLM tokenization

## Introduction

Byte Pair Encoding (BPE) is a subword tokenization algorithm that has become the standard for most modern language models. Originally developed for data compression, BPE was adapted for NLP to address the vocabulary problem: how to represent an infinite set of possible words with a finite vocabulary while handling rare words, morphology, and out-of-vocabulary terms.

## Core Algorithm

### Training Phase

BPE builds a vocabulary through iterative merging:

```python
def train_bpe(corpus, vocab_size):
    # Start with character-level tokens
    vocabulary = get_all_characters(corpus)
    
    while len(vocabulary) < vocab_size:
        # Count all adjacent pairs
        pair_counts = count_pairs(corpus)
        
        # Find most frequent pair
        best_pair = max(pair_counts, key=pair_counts.get)
        
        # Merge pair into new token
        new_token = merge(best_pair[0], best_pair[1])
        vocabulary.add(new_token)
        
        # Update corpus with merged tokens
        corpus = replace_pairs(corpus, best_pair, new_token)
    
    return vocabulary
```

### Tokenization Phase

```python
def tokenize(text, merge_rules):
    # Start from characters or bytes depending on training
    tokens = list(text)
    for a, b in merge_rules:  # ordered, most frequent first
        i = 0
        merged = []
        while i < len(tokens):
            if i+1 < len(tokens) and tokens[i] == a and tokens[i+1] == b:
                merged.append(a + b)
                i += 2
            else:
                merged.append(tokens[i])
                i += 1
        tokens = merged
    return tokens
```

## Key Properties

### Advantages

1. **Vocabulary Efficiency**
   - Common words: single tokens
   - Rare words: composed of subwords
   - Unknown words: always representable

2. **Morphological Awareness**
   - "running" → ["run", "ning"]
   - "unhappy" → ["un", "happy"]
   - Captures linguistic structure

3. **Cross-lingual Benefits**
   - Shared subwords across languages
   - Better zero-shot transfer [CHECK]
   - Reduced vocabulary for multilingual models

### Limitations

1. **Greedy Algorithm**
   - Not globally optimal
   - Order-dependent results
   - May miss better segmentations

2. **Determinism and casing**
   - Given a fixed pretokenizer and merge list, BPE segmentation is deterministic
   - Case sensitivity and leading-space symbols can yield different tokens for "the" vs "The"
   - Whitespace handling is tokenizer-specific but deterministic

## Medical Domain Considerations

### Challenges

1. **Medical Terminology**
   - Complex compound words
   - Latin/Greek roots
   - Abbreviations and acronyms

2. **Clinical Context**
   ```
   "pneumonoultramicroscopicsilicovolcanoconiosis"
   → ["pneum", "ono", "ultra", "microscopic", "silico", "volcano", "con", "iosis"]
   ```
   > The example segmentation above is illustrative. Actual splits depend on the learned merges and may differ. [CHECK]

3. **Dosage and Units**
   - "5mg" vs "5 mg" tokenization
   - Numerical precision critical
   - Unit standardization needed

### Solutions

1. **Domain-Specific Vocabulary**
   - Pre-train on medical corpora
   - Include medical abbreviations
   - Preserve clinical entities

2. **Custom Merge Rules**
   - Prioritize medical term integrity
   - Handle units consistently
   - Preserve numerical formats

## Implementation Variants

### SentencePiece
- Language-agnostic (no pre-tokenization)
- Includes BPE and Unigram modes
- Used in: T5, mT5, XLM-R

### WordPiece
- Similar to BPE but uses likelihood
- Maximizes corpus likelihood
- Used in: BERT, DistilBERT

### Unigram LM
- Probabilistic model
- Starts large, prunes vocabulary
- Better theoretical foundation

## Practical Considerations

### Vocabulary Size Selection

| Model Type | Typical Size | Trade-offs |
|------------|--------------|------------|
| Small models | 8K-16K | Faster, less coverage |
| Base models | 32K-50K | Balanced performance |
| Large models | 50K-100K | Better coverage, slower |
| Multilingual | 100K-250K | Handle many languages |

### Performance Impact

1. **Sequence Length**
   - More tokens = longer sequences
   - Affects attention complexity O(n²)
   - Critical for long documents

2. **Embedding Size**
   - Large vocabulary = more parameters
   - Memory: vocab_size × embedding_dim
   - Initialization considerations

## Advanced Topics

### Byte-level BPE
- Uses bytes instead of Unicode characters
- Handles any input without OOV
- Used in: GPT-2, GPT-3, RoBERTa

### Dynamic Vocabularies
- Adapt vocabulary per domain
- Online vocabulary updates
- Continual learning approaches

### Multimodal Tokenization
- Vision tokens (patches)
- Audio tokens (spectrograms)
- Unified token spaces

## Code Example: Simple BPE

```python
from collections import defaultdict

class SimpleBPE:
    def __init__(self, vocab_size=1000):
        self.vocab_size = vocab_size
        self.vocabulary = {}
        self.merge_rules = []
    
    def train(self, corpus):
        # Initialize with characters
        vocab = set(char for text in corpus for char in text)
        
        # Tokenize corpus
        tokenized = [[char for char in text] for text in corpus]
        
        while len(vocab) < self.vocab_size:
            # Count pairs
            pair_freq = defaultdict(int)
            for tokens in tokenized:
                for i in range(len(tokens)-1):
                    pair_freq[(tokens[i], tokens[i+1])] += 1
            
            if not pair_freq:
                break
                
            # Get best pair
            best_pair = max(pair_freq, key=pair_freq.get)
            
            # Merge in corpus
            new_token = best_pair[0] + best_pair[1]
            vocab.add(new_token)
            self.merge_rules.append(best_pair)
            
            # Update tokenization
            for tokens in tokenized:
                i = 0
                while i < len(tokens) - 1:
                    if tokens[i] == best_pair[0] and tokens[i+1] == best_pair[1]:
                        tokens[i] = new_token
                        del tokens[i+1]
                    i += 1
        
        self.vocabulary = vocab
        # ensure merges are available at inference
        # merges are stored in the order they were learned
```

## Related Topics

- [[Large Language Models]] — How tokenization affects model size
- [[Transformer Architecture]] — Token embedding layers
- [[VLM Basics]] — Multimodal tokenization strategies
- [[Healthcare/Medical Vision-Language Models]] — Medical terminology handling
