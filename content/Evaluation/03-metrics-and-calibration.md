# Chapter 10: Evaluation Metrics and Calibration

> Comprehensive metrics for assessing Visual Language Models: from perplexity to calibration, ensuring reliable and trustworthy AI systems.

[← Back to Index](../index.md) | [Next: HELM Framework →](HELM%20Framework.md)

---

## Executive Summary

Evaluating VLMs requires sophisticated metrics beyond simple accuracy. This chapter explores fundamental evaluation approaches including perplexity for language modeling, ROUGE for generation quality, calibration for uncertainty quantification, and specialized metrics for multimodal understanding.

![Evaluation Framework](../assets/LLM%20Healthcare.svg)
*Figure 10.1: Comprehensive evaluation framework for Visual Language Models*

## 10.1 Perplexity: The Foundation Metric

### 10.1.1 Mathematical Definition

Perplexity measures how well a model predicts a sequence:

$$\text{Perplexity}(\mathcal{D}, k) = \exp\left( - \frac{1}{D} \sum_{i=1}^{D} \log \Pr(t_i \mid t_{i-k}, \ldots, t_{i-1}) \right)$$

**Intuition**: Lower perplexity = better prediction = less "perplexed" by the data

### 10.1.2 Practical Calculation

```python
def calculate_perplexity(model, dataset, context_length=1024):
    total_loss = 0
    total_tokens = 0
    
    with torch.no_grad():
        for batch in dataset:
            # Get model predictions
            logits = model(batch['input_ids'])
            
            # Calculate cross-entropy loss
            loss = F.cross_entropy(
                logits.view(-1, vocab_size),
                batch['labels'].view(-1),
                reduction='sum'
            )
            
            total_loss += loss.item()
            total_tokens += batch['labels'].numel()
    
    # Perplexity = exp(average loss)
    avg_loss = total_loss / total_tokens
    perplexity = math.exp(avg_loss)
    
    return perplexity
```

### 10.1.3 Interpretation Guidelines

| Perplexity Range | Interpretation | Example Model |
|------------------|---------------|---------------|
| < 10 | Excellent | GPT-4 on common text |
| 10-50 | Good | BERT on Wikipedia |
| 50-100 | Moderate | Small models |
| 100-500 | Poor | Untrained models |
| > 500 | Random | Random baseline |

### 10.1.4 Limitations

- **Domain Sensitivity**: Lower on training domain
- **Length Bias**: Favors shorter sequences
- **Not Task-Specific**: Doesn't measure downstream performance

## 10.2 ROUGE: Generation Quality

### 10.2.1 ROUGE Variants

**ROUGE-N**: N-gram overlap

$$\text{ROUGE-N} = \frac{\sum_{s \in \text{Reference}} \sum_{\text{n-gram} \in s} \text{Count}_{\text{match}}(\text{n-gram})}{\sum_{s \in \text{Reference}} \sum_{\text{n-gram} \in s} \text{Count}(\text{n-gram})}$$

### 10.2.2 Implementation

```python
from rouge_score import rouge_scorer

def evaluate_generation(predictions, references):
    scorer = rouge_scorer.RougeScorer(
        ['rouge1', 'rouge2', 'rougeL'], 
        use_stemmer=True
    )
    
    scores = []
    for pred, ref in zip(predictions, references):
        score = scorer.score(ref, pred)
        scores.append({
            'rouge1': score['rouge1'].fmeasure,
            'rouge2': score['rouge2'].fmeasure,
            'rougeL': score['rougeL'].fmeasure
        })
    
    # Average scores
    avg_scores = {
        metric: np.mean([s[metric] for s in scores])
        for metric in ['rouge1', 'rouge2', 'rougeL']
    }
    
    return avg_scores
```

### 10.2.3 Interpretation

| Metric | Focus | Good Score |
|--------|-------|------------|
| ROUGE-1 | Unigram overlap | > 0.40 |
| ROUGE-2 | Bigram overlap | > 0.20 |
| ROUGE-L | Longest common subsequence | > 0.35 |

## 10.3 Calibration: Uncertainty Quantification

### 10.3.1 Expected Calibration Error (ECE)

Measures alignment between confidence and accuracy:

$$\text{ECE} = \sum_{m=1}^{M} \frac{|B_m|}{n} \left| \text{acc}(B_m) - \text{conf}(B_m) \right|$$

Where:
- $B_m$: Bin m of predictions
- $\text{acc}(B_m)$: Accuracy in bin
- $\text{conf}(B_m)$: Average confidence in bin

### 10.3.2 Calibration Implementation

```python
class CalibrationEvaluator:
    def __init__(self, n_bins=10):
        self.n_bins = n_bins
        
    def compute_ece(self, confidences, predictions, labels):
        bin_boundaries = np.linspace(0, 1, self.n_bins + 1)
        bin_lowers = bin_boundaries[:-1]
        bin_uppers = bin_boundaries[1:]
        
        ece = 0
        for bin_lower, bin_upper in zip(bin_lowers, bin_uppers):
            # Find predictions in this confidence bin
            in_bin = (confidences > bin_lower) & (confidences <= bin_upper)
            prop_in_bin = in_bin.float().mean()
            
            if prop_in_bin > 0:
                # Accuracy in bin
                accuracy_in_bin = (predictions[in_bin] == labels[in_bin]).float().mean()
                # Average confidence in bin
                avg_confidence_in_bin = confidences[in_bin].mean()
                # Contribution to ECE
                ece += prop_in_bin * abs(avg_confidence_in_bin - accuracy_in_bin)
        
        return ece.item()
```

### 10.3.3 Calibration Visualization

```python
def plot_reliability_diagram(confidences, accuracies):
    plt.figure(figsize=(8, 6))
    
    # Perfect calibration line
    plt.plot([0, 1], [0, 1], 'k--', label='Perfect calibration')
    
    # Actual calibration
    plt.plot(confidences, accuracies, 'ro-', label='Model calibration')
    
    # Shading for confidence intervals
    plt.fill_between(confidences, 
                     accuracies - std_errors, 
                     accuracies + std_errors,
                     alpha=0.2)
    
    plt.xlabel('Confidence')
    plt.ylabel('Accuracy')
    plt.title('Calibration Plot')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()
```

## 10.4 Multimodal Metrics

### 10.4.1 Image-Text Alignment

**CLIP Score**: Cosine similarity between embeddings

```python
def clip_score(images, texts, clip_model):
    # Encode images and texts
    image_features = clip_model.encode_image(images)
    text_features = clip_model.encode_text(texts)
    
    # Normalize
    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features /= text_features.norm(dim=-1, keepdim=True)
    
    # Cosine similarity
    similarity = (image_features @ text_features.T)
    
    return similarity.diagonal().mean()
```

### 10.4.2 Visual Question Answering Metrics

```python
class VQAEvaluator:
    def __init__(self):
        self.metrics = {}
        
    def evaluate(self, predictions, ground_truths):
        # Exact match
        exact_match = sum(
            p == g for p, g in zip(predictions, ground_truths)
        ) / len(predictions)
        
        # Soft accuracy (for multiple acceptable answers)
        soft_accuracy = 0
        for pred, gts in zip(predictions, ground_truths):
            # VQA uses 10 human answers
            matches = sum(pred == gt for gt in gts)
            soft_accuracy += min(matches / 3, 1.0)
        soft_accuracy /= len(predictions)
        
        return {
            'exact_match': exact_match,
            'soft_accuracy': soft_accuracy
        }
```

## 10.5 Robustness Metrics

### 10.5.1 Adversarial Robustness

See [[../Attacks/vlm-attacks|Adversarial Attacks]] for detailed methods.

```python
def adversarial_accuracy(model, dataset, attack_fn, epsilon=8/255):
    correct = 0
    total = 0
    
    for images, labels in dataset:
        # Generate adversarial examples
        adv_images = attack_fn(model, images, labels, epsilon)
        
        # Evaluate on adversarial examples
        with torch.no_grad():
            outputs = model(adv_images)
            predictions = outputs.argmax(dim=1)
            correct += (predictions == labels).sum().item()
            total += labels.size(0)
    
    return correct / total
```

### 10.5.2 Distribution Shift Metrics

```python
class DistributionShiftEvaluator:
    def __init__(self, model):
        self.model = model
        
    def evaluate_robustness(self, clean_data, shifted_datasets):
        results = {}
        
        # Baseline on clean data
        clean_acc = self.evaluate(clean_data)
        
        for shift_name, shift_data in shifted_datasets.items():
            shift_acc = self.evaluate(shift_data)
            
            # Relative robustness
            relative_robustness = shift_acc / clean_acc
            
            # Effective robustness (linear fit)
            effective_robustness = self.compute_effective_robustness(
                clean_acc, shift_acc
            )
            
            results[shift_name] = {
                'accuracy': shift_acc,
                'relative': relative_robustness,
                'effective': effective_robustness
            }
        
        return results
```

## 10.6 Fairness and Bias Metrics

### 10.6.1 Demographic Parity

```python
def demographic_parity_difference(predictions, sensitive_attribute):
    """
    Measures difference in positive prediction rates across groups
    """
    groups = np.unique(sensitive_attribute)
    positive_rates = []
    
    for group in groups:
        group_mask = sensitive_attribute == group
        group_predictions = predictions[group_mask]
        positive_rate = (group_predictions == 1).mean()
        positive_rates.append(positive_rate)
    
    # Maximum difference between groups
    dpd = max(positive_rates) - min(positive_rates)
    
    return dpd
```

### 10.6.2 Equalized Odds

```python
def equalized_odds_difference(predictions, labels, sensitive_attribute):
    """
    Measures difference in TPR and FPR across groups
    """
    groups = np.unique(sensitive_attribute)
    tpr_diff = 0
    fpr_diff = 0
    
    tprs, fprs = [], []
    for group in groups:
        group_mask = sensitive_attribute == group
        group_preds = predictions[group_mask]
        group_labels = labels[group_mask]
        
        # True Positive Rate
        tpr = ((group_preds == 1) & (group_labels == 1)).sum() / (group_labels == 1).sum()
        tprs.append(tpr)
        
        # False Positive Rate
        fpr = ((group_preds == 1) & (group_labels == 0)).sum() / (group_labels == 0).sum()
        fprs.append(fpr)
    
    eod = max(max(tprs) - min(tprs), max(fprs) - min(fprs))
    
    return eod
```

## 10.7 Task-Specific Metrics

### 10.7.1 Medical Imaging Metrics

| Metric | Formula | Use Case |
|--------|---------|----------|
| **Sensitivity** | TP/(TP+FN) | Disease detection |
| **Specificity** | TN/(TN+FP) | Ruling out disease |
| **PPV** | TP/(TP+FP) | Positive result reliability |
| **NPV** | TN/(TN+FN) | Negative result reliability |
| **F1 Score** | 2×(Precision×Recall)/(Precision+Recall) | Balanced performance |

### 10.7.2 Generation Quality Metrics

```python
class GenerationMetrics:
    def __init__(self):
        self.bert_scorer = BERTScorer()
        self.bleurt_scorer = BLEURT()
        
    def comprehensive_eval(self, predictions, references):
        metrics = {}
        
        # N-gram based
        metrics['bleu'] = calculate_bleu(predictions, references)
        metrics['rouge'] = calculate_rouge(predictions, references)
        
        # Embedding based
        metrics['bertscore'] = self.bert_scorer.score(predictions, references)
        
        # Learned metrics
        metrics['bleurt'] = self.bleurt_scorer.score(predictions, references)
        
        # Diversity
        metrics['distinct_1'] = calculate_distinct_ngrams(predictions, n=1)
        metrics['distinct_2'] = calculate_distinct_ngrams(predictions, n=2)
        
        return metrics
```

## 10.8 Holistic Evaluation Framework

### 10.8.1 Multi-Dimensional Assessment

```python
class HolisticEvaluator:
    def __init__(self, model):
        self.model = model
        self.metrics = {
            'capability': CapabilityMetrics(),
            'robustness': RobustnessMetrics(),
            'fairness': FairnessMetrics(),
            'efficiency': EfficiencyMetrics(),
            'calibration': CalibrationMetrics()
        }
    
    def evaluate(self, test_suite):
        results = {}
        
        for category, metric_evaluator in self.metrics.items():
            results[category] = metric_evaluator.evaluate(
                self.model, 
                test_suite[category]
            )
        
        # Aggregate score
        results['overall'] = self.aggregate_scores(results)
        
        return results
```

See [[HELM Framework|HELM Framework]] for complete implementation.

## 10.9 Best Practices

### 10.9.1 Metric Selection Guide

| Task Type | Primary Metrics | Secondary Metrics |
|-----------|----------------|-------------------|
| **Classification** | Accuracy, F1 | Calibration, Fairness |
| **Generation** | ROUGE, BERTScore | Diversity, Factuality |
| **VQA** | Exact Match, Soft Accuracy | Consistency |
| **Medical** | Sensitivity, Specificity | Calibration |
| **Retrieval** | Recall@K, MRR | Diversity |

### 10.9.2 Common Pitfalls

1. **Single Metric Fixation**: Always use multiple metrics
2. **Training Set Leakage**: Ensure proper data splits
3. **Cherry-Picking**: Report all metrics, not just best
4. **Ignoring Uncertainty**: Always include confidence intervals
5. **Static Evaluation**: Consider temporal/distribution shifts

## 10.10 Implementation Tools

### Libraries and Frameworks

```python
# Comprehensive evaluation suite
from evaluate import load

# Load multiple metrics
metrics = {
    'accuracy': load('accuracy'),
    'f1': load('f1'),
    'bleu': load('bleu'),
    'rouge': load('rouge'),
    'bertscore': load('bertscore'),
    'perplexity': load('perplexity')
}

# Evaluate model
results = {}
for metric_name, metric in metrics.items():
    results[metric_name] = metric.compute(
        predictions=model_outputs,
        references=ground_truth
    )
```

## 10.11 Key Takeaways

1. **No Single Perfect Metric**: Use complementary metrics
2. **Calibration Matters**: Especially in high-stakes applications
3. **Fairness is Essential**: Check demographic parity
4. **Robustness Beyond Accuracy**: Test distribution shifts
5. **Task-Specific Needs**: Choose metrics aligned with objectives

---

### Navigation

[← Back to Index](../index.md) | [Next: HELM Framework →](HELM%20Framework.md)

### Related Topics
- [[HELM Framework|Holistic Evaluation]]
- [[../Attacks/vlm-attacks|Robustness Testing]]
- [[../Healthcare/Validation and Datasets|Medical Benchmarks]]
