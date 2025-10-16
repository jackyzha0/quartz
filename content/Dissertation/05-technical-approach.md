# Technical Approach: Methods and Implementation

> Detailed technical methods for measuring, analyzing, and mitigating FSF and EFG in medical vision-language models

[← Research Thrusts](04-research-thrusts.md) | [Site Index →](../index.md)

---

## Core Notation and Definitions

### Mathematical Framework
Let $x \in \mathbb{R}^{H \times W \times 3}$ denote a chest radiograph, $Q$ a base question, and $\mathcal{P}(Q) = \{q_1, \ldots, q_k\}$ the set of $k$ semantically equivalent paraphrases.

**Model Output**: $f(x, q_i) \in \mathcal{Y}$ where $\mathcal{Y}$ is the answer space  
**Ground Truth**: $y^* \in \mathcal{Y}$  
**Attention Map**: $A_{x,q} \in \mathbb{R}^{h \times w}$

### FSF Formalization
```math
\text{FSF Index} = \frac{|\{(q_i, q_j) : f(x, q_i) \neq f(x, q_j) \land \text{SSIM}(A_{x,q_i}, A_{x,q_j}) > \tau\}|}{|\{(q_i, q_j) : f(x, q_i) \neq f(x, q_j)\}|}
```
Where $\tau = 0.85$ based on empirical calibration against semantically distinct questions.

### EFG Formalization
```math
\text{EFG}_m = \mathbb{E}[m \mid f(x,q) \neq y^*] - \mathbb{E}[m \mid f(x,q) = y^*]
```
For faithfulness metric $m \in$ {Deletion AUC, Insertion AUC, Sufficiency, Necessity}

## Model Architectures and Configuration

### MedGemma-4b-it
```python
class MedGemmaConfig:
    # Vision encoder
    vision_encoder = "CLIP-ViT-L/14"  # 307M parameters
    vision_dim = 1024
    patch_size = 14
    image_size = 224
    
    # Language model
    hidden_dim = 2560
    n_layers = 18
    n_heads = 32
    vocab_size = 32000  # SentencePiece
    
    # Cross-attention
    cross_attention_layers = [8, 12, 16]
    projection_dim = 2048
    projection_layers = 2  # MLP depth
    
    # Training details
    checkpoint = "google/medgemma-4b-it"
    medical_pretrain = True  # MIMIC-CXR + general medical
```

### LLaVA-Rad
```python
class LLaVARadConfig:
    # Vision encoder (same as MedGemma)
    vision_encoder = "CLIP-ViT-L/14"
    vision_dim = 1024
    
    # Language model (Vicuna-7B)
    hidden_dim = 4096
    n_layers = 32
    n_heads = 32
    vocab_size = 32000  # LLaMA tokenizer
    
    # Cross-attention
    cross_attention_layers = [10, 15, 20, 25]
    projection_dim = 4096
    projection_layers = 1  # Single linear
    
    # Training details
    checkpoint = "microsoft/llava-rad"
    radiology_finetune = True
```

## Attention Extraction Pipeline

### Multi-Layer Aggregation
```python
def extract_attention_maps(model, image, question):
    """
    Extract and aggregate attention across layers.
    """
    # Forward pass with attention hooks
    hooks = []
    for layer_idx in model.cross_attention_layers:
        hook = model.layers[layer_idx].cross_attention.register_forward_hook(
            lambda m, i, o: attention_maps.append(o.attention_weights)
        )
        hooks.append(hook)
    
    # Get model output
    output = model(image, question)
    
    # Aggregate attention maps
    aggregated = torch.zeros(224, 224)
    for idx, attn in enumerate(attention_maps):
        # Average across heads
        attn_avg = attn.mean(dim=1)  # [batch, seq_len, n_patches]
        
        # Reshape to spatial
        attn_spatial = attn_avg.view(1, 16, 16)  # 224/14 = 16
        
        # Upsample to original resolution
        attn_upsampled = F.interpolate(
            attn_spatial.unsqueeze(0), 
            size=(224, 224), 
            mode='bilinear'
        )
        
        # Weight by layer index (later layers more task-relevant)
        weight = (idx + 1) / len(attention_maps)
        aggregated += weight * attn_upsampled.squeeze()
    
    # Normalize
    aggregated = aggregated / aggregated.sum()
    
    # Clean up hooks
    for hook in hooks:
        hook.remove()
    
    return aggregated, output
```

### Deterministic Inference
```python
def setup_deterministic_inference():
    """
    Ensure reproducible results across runs.
    """
    # Set all random seeds
    seed = 42
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    
    # Deterministic operations
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
    
    # Disable dropout
    def disable_dropout(module):
        if isinstance(module, nn.Dropout):
            module.p = 0
    
    model.apply(disable_dropout)
    
    # Use greedy decoding
    generation_config = {
        'temperature': 0.0,
        'do_sample': False,
        'top_p': 1.0,
        'top_k': 1
    }
    
    return generation_config
```

## Paraphrase Generation and Validation

### Linguistic Variation Framework
```python
class ParaphraseGenerator:
    def __init__(self):
        self.strategies = {
            'lexical': self.lexical_substitution,
            'syntactic': self.syntactic_transformation,
            'pragmatic': self.pragmatic_modulation,
            'negation': self.negation_inversion,
            'scope': self.scope_modification
        }
        
        # Medical synonym dictionary
        self.medical_synonyms = {
            'cardiomegaly': ['enlarged heart', 'cardiac enlargement'],
            'pleural effusion': ['fluid in pleural space', 'pleural fluid'],
            'pneumothorax': ['collapsed lung', 'air in pleural space'],
            'consolidation': ['airspace opacity', 'lung opacity'],
            'infiltrate': ['pulmonary infiltrate', 'lung infiltrate']
        }
    
    def lexical_substitution(self, question):
        """Replace medical terms with synonyms."""
        for term, synonyms in self.medical_synonyms.items():
            if term in question.lower():
                synonym = random.choice(synonyms)
                return question.lower().replace(term, synonym)
        return question
    
    def syntactic_transformation(self, question):
        """Transform syntactic structure."""
        # Parse tree manipulation
        doc = nlp(question)
        # ... transformation logic ...
        return transformed
    
    def negation_inversion(self, question):
        """Add or remove negation."""
        if any(neg in question.lower() for neg in ['no', 'not', 'without']):
            # Remove negation
            return self.remove_negation(question)
        else:
            # Add negation forms
            patterns = [
                f"No {finding} is seen, correct?",
                f"There isn't any {finding}, right?",
                f"Absence of {finding}?"
            ]
            return random.choice(patterns)
```

### Clinical Validation Protocol
```python
class ClinicalValidator:
    def __init__(self, validator_credentials):
        self.validator = validator_credentials
        self.rejection_reasons = []
    
    def validate_semantic_equivalence(self, original, paraphrase):
        """
        Ensure paraphrases maintain clinical meaning.
        """
        checks = {
            'anatomical_consistency': self.check_anatomy,
            'finding_consistency': self.check_findings,
            'clinical_naturalism': self.check_naturalism,
            'unambiguous': self.check_ambiguity
        }
        
        for check_name, check_func in checks.items():
            if not check_func(original, paraphrase):
                self.rejection_reasons.append(check_name)
                return False
        
        return True
    
    def check_anatomy(self, original, paraphrase):
        """Ensure same anatomical regions referenced."""
        original_anatomy = extract_anatomy_terms(original)
        paraphrase_anatomy = extract_anatomy_terms(paraphrase)
        return original_anatomy == paraphrase_anatomy
```

## Causal Analysis Methods

### Layer-wise Representation Analysis
```python
def analyze_representation_similarity(model, image, paraphrases):
    """
    Track how representations diverge through layers.
    """
    similarities = defaultdict(list)
    
    # Hook to capture hidden states
    hidden_states = {}
    def hook_fn(name):
        def hook(module, input, output):
            hidden_states[name] = output.detach()
        return hook
    
    # Register hooks for all layers
    for idx, layer in enumerate(model.layers):
        layer.register_forward_hook(hook_fn(f'layer_{idx}'))
    
    # Process each paraphrase
    representations = []
    for p in paraphrases:
        _ = model(image, p)
        representations.append({k: v.clone() for k, v in hidden_states.items()})
    
    # Compute pairwise similarities
    for i in range(len(paraphrases)):
        for j in range(i+1, len(paraphrases)):
            for layer_name in representations[0].keys():
                rep_i = representations[i][layer_name]
                rep_j = representations[j][layer_name]
                
                # Cosine similarity
                sim = F.cosine_similarity(
                    rep_i.flatten(), 
                    rep_j.flatten(), 
                    dim=0
                ).item()
                
                similarities[layer_name].append(sim)
    
    return similarities
```

### Cross-Attention Intervention
```python
class CrossAttentionIntervention:
    def __init__(self, model):
        self.model = model
        self.saved_attention = {}
    
    def save_attention_state(self, image, question, name='reference'):
        """Save attention patterns from a forward pass."""
        def save_hook(module, input, output):
            self.saved_attention[name] = {
                'queries': output.queries.detach(),
                'keys': output.keys.detach(),
                'values': output.values.detach(),
                'weights': output.attention_weights.detach()
            }
        
        # Attach to cross-attention layers
        hooks = []
        for layer_idx in self.model.cross_attention_layers:
            hook = self.model.layers[layer_idx].cross_attention.register_forward_hook(save_hook)
            hooks.append(hook)
        
        # Forward pass
        _ = self.model(image, question)
        
        # Clean up
        for hook in hooks:
            hook.remove()
    
    def interchange_experiment(self, image, q1, q2):
        """Test effect of swapping attention components."""
        # Save attention from both questions
        self.save_attention_state(image, q1, 'q1')
        self.save_attention_state(image, q2, 'q2')
        
        results = {}
        
        # Test different swapping strategies
        swap_configs = [
            ('swap_kv', {'keys': 'q2', 'values': 'q2', 'queries': 'q1'}),
            ('swap_q', {'keys': 'q1', 'values': 'q1', 'queries': 'q2'}),
            ('swap_all', {'keys': 'q2', 'values': 'q2', 'queries': 'q2'})
        ]
        
        for config_name, config in swap_configs:
            # Override forward pass
            output = self.forward_with_intervention(image, q1, config)
            results[config_name] = output
        
        return results
```

## Mitigation Strategies

### LoRA Configuration for Targeted Adaptation
```python
from peft import LoraConfig, get_peft_model

def create_targeted_lora_model(base_model, causal_analysis_results):
    """
    Create LoRA model targeting causally-identified layers.
    """
    # Identify target modules from causal analysis
    target_layers = causal_analysis_results['high_impact_layers']  # e.g., [12, 13, 14, 15, 16]
    
    # Configure LoRA for specific attention projections
    target_modules = []
    for layer_idx in target_layers:
        target_modules.extend([
            f"layers.{layer_idx}.self_attn.q_proj",
            f"layers.{layer_idx}.self_attn.v_proj",
            f"layers.{layer_idx}.cross_attn.q_proj",
            f"layers.{layer_idx}.cross_attn.v_proj"
        ])
    
    lora_config = LoraConfig(
        r=16,  # Rank
        lora_alpha=32,  # Scaling factor
        target_modules=target_modules,
        lora_dropout=0.05,
        bias="none",
        task_type="VL_QA"
    )
    
    # Create PEFT model
    model = get_peft_model(base_model, lora_config)
    
    # Verify parameter efficiency
    trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total_params = sum(p.numel() for p in model.parameters())
    print(f"Trainable: {trainable_params:,} ({100 * trainable_params / total_params:.2f}%)")
    
    return model
```

### Multi-Objective Training
```python
class ParaphraseRobustTrainer:
    def __init__(self, model, config):
        self.model = model
        self.config = config
        
    def compute_consistency_loss(self, image, paraphrases, model_outputs):
        """
        KL divergence between paraphrase outputs.
        """
        consistency_loss = 0
        n_pairs = 0
        
        for i in range(len(paraphrases)):
            for j in range(i+1, len(paraphrases)):
                # Get logits for both paraphrases
                logits_i = model_outputs[i].logits
                logits_j = model_outputs[j].logits
                
                # Convert to probabilities
                probs_i = F.softmax(logits_i, dim=-1)
                probs_j = F.softmax(logits_j, dim=-1)
                
                # KL divergence (symmetrized)
                kl_ij = F.kl_div(probs_i.log(), probs_j, reduction='batchmean')
                kl_ji = F.kl_div(probs_j.log(), probs_i, reduction='batchmean')
                
                consistency_loss += (kl_ij + kl_ji) / 2
                n_pairs += 1
        
        return consistency_loss / n_pairs
    
    def compute_attention_stability_loss(self, attention_maps):
        """
        Encourage stable attention across paraphrases.
        """
        stability_loss = 0
        n_pairs = 0
        
        for i in range(len(attention_maps)):
            for j in range(i+1, len(attention_maps)):
                # Compute SSIM loss (1 - SSIM for minimization)
                ssim_loss = 1 - structural_similarity(
                    attention_maps[i].cpu().numpy(),
                    attention_maps[j].cpu().numpy()
                )
                stability_loss += ssim_loss
                n_pairs += 1
        
        return stability_loss / n_pairs
    
    def training_step(self, batch):
        """
        Single training iteration with multi-objective loss.
        """
        images, questions, paraphrases, labels = batch
        
        # Forward pass for all paraphrases
        outputs = []
        attention_maps = []
        
        for para_set in paraphrases:
            para_outputs = []
            para_attention = []
            
            for p in para_set:
                out, attn = self.model(images, p, return_attention=True)
                para_outputs.append(out)
                para_attention.append(attn)
            
            outputs.append(para_outputs)
            attention_maps.append(para_attention)
        
        # Task loss (standard VQA)
        task_loss = sum(
            F.cross_entropy(out[0].logits, labels) 
            for out in outputs
        ) / len(outputs)
        
        # Consistency loss
        consistency_loss = np.mean([
            self.compute_consistency_loss(img, para, out)
            for img, para, out in zip(images, paraphrases, outputs)
        ])
        
        # Attention stability loss
        attention_loss = np.mean([
            self.compute_attention_stability_loss(attn)
            for attn in attention_maps
        ])
        
        # Combined loss
        total_loss = (
            self.config.lambda_task * task_loss +
            self.config.lambda_consistency * consistency_loss +
            self.config.lambda_attention * attention_loss
        )
        
        return {
            'loss': total_loss,
            'task_loss': task_loss.item(),
            'consistency_loss': consistency_loss,
            'attention_loss': attention_loss
        }
```

## Deployment Framework

### Uncertainty Quantification
```python
class UncertaintyEstimator:
    def __init__(self, model, n_samples=10):
        self.model = model
        self.n_samples = n_samples
    
    def paraphrase_uncertainty(self, image, paraphrases):
        """
        Uncertainty from paraphrase ensemble variance.
        """
        predictions = []
        
        for p in paraphrases:
            output = self.model(image, p)
            pred_probs = F.softmax(output.logits, dim=-1)
            predictions.append(pred_probs)
        
        # Stack predictions
        pred_stack = torch.stack(predictions)
        
        # Compute variance
        pred_mean = pred_stack.mean(dim=0)
        pred_var = pred_stack.var(dim=0)
        
        # Entropy of mean prediction
        entropy = -torch.sum(pred_mean * torch.log(pred_mean + 1e-8), dim=-1)
        
        return {
            'mean_prediction': pred_mean,
            'variance': pred_var,
            'entropy': entropy,
            'disagreement': (pred_stack.argmax(dim=-1) != pred_mean.argmax(dim=-1)).float().mean()
        }
    
    def mc_dropout_uncertainty(self, image, question):
        """
        Monte Carlo dropout uncertainty.
        """
        # Enable dropout
        self.model.train()
        
        predictions = []
        for _ in range(self.n_samples):
            with torch.no_grad():
                output = self.model(image, question)
                predictions.append(F.softmax(output.logits, dim=-1))
        
        # Back to eval mode
        self.model.eval()
        
        # Compute statistics
        pred_stack = torch.stack(predictions)
        return {
            'mean': pred_stack.mean(dim=0),
            'std': pred_stack.std(dim=0),
            'entropy': self.predictive_entropy(pred_stack)
        }
```

### Selective Triage System
```python
class SelectiveTriageSystem:
    def __init__(self, model, thresholds):
        self.model = model
        self.uncertainty_estimator = UncertaintyEstimator(model)
        self.thresholds = thresholds
        
        # Critical findings that always need review
        self.critical_findings = [
            'pneumothorax', 'tension pneumothorax',
            'large pleural effusion', 'mediastinal shift',
            'free air', 'aortic dissection'
        ]
    
    def triage_decision(self, image, question, paraphrases=None):
        """
        Make triage decision with safety guarantees.
        """
        # Generate paraphrases if not provided
        if paraphrases is None:
            paraphrases = self.generate_paraphrases(question, n=5)
        
        # Get uncertainty estimates
        para_uncertainty = self.uncertainty_estimator.paraphrase_uncertainty(
            image, paraphrases
        )
        
        # Get primary prediction
        primary_output = self.model(image, question)
        primary_pred = primary_output.logits.argmax(dim=-1)
        
        # Decision logic
        decision_path = []
        
        # Check paraphrase agreement
        if para_uncertainty['disagreement'] > self.thresholds['max_disagreement']:
            decision_path.append('high_paraphrase_disagreement')
            return self.create_decision('defer', 'paraphrase_uncertainty', decision_path)
        
        # Check confidence
        confidence = para_uncertainty['mean_prediction'].max().item()
        if confidence < self.thresholds['min_confidence']:
            decision_path.append('low_confidence')
            return self.create_decision('defer', 'low_confidence', decision_path)
        
        # Check for critical findings
        predicted_text = self.decode_prediction(primary_pred)
        if any(critical in predicted_text.lower() for critical in self.critical_findings):
            decision_path.append('critical_finding_detected')
            return self.create_decision('urgent_review', 'critical_finding', decision_path)
        
        # Check if normal with high confidence
        if self.is_normal_finding(predicted_text) and confidence > self.thresholds['normal_confidence']:
            decision_path.append('high_confidence_normal')
            return self.create_decision('auto_clear', 'normal', decision_path)
        
        # Default to radiologist review
        decision_path.append('standard_review')
        return self.create_decision('review', 'standard', decision_path)
    
    def create_decision(self, action, reason, path):
        """
        Create structured triage decision.
        """
        return {
            'action': action,
            'reason': reason,
            'decision_path': path,
            'timestamp': datetime.now().isoformat(),
            'model_version': self.model.config.version,
            'thresholds_used': self.thresholds
        }
```

## Evaluation Metrics

### Comprehensive FSF and EFG Computation
```python
class RobustnessEvaluator:
    def __init__(self, model, dataset, tau=0.85):
        self.model = model
        self.dataset = dataset
        self.tau = tau
    
    def compute_fsf_index(self, results):
        """
        Compute FSF index from evaluation results.
        """
        flips_with_stable_attention = 0
        total_flips = 0
        
        for item in results:
            paraphrase_answers = item['paraphrase_answers']
            attention_maps = item['attention_maps']
            
            # Check all pairs
            for i in range(len(paraphrase_answers)):
                for j in range(i+1, len(paraphrase_answers)):
                    # Check if answers differ
                    if paraphrase_answers[i] != paraphrase_answers[j]:
                        total_flips += 1
                        
                        # Check attention similarity
                        ssim = structural_similarity(
                            attention_maps[i],
                            attention_maps[j]
                        )
                        
                        if ssim > self.tau:
                            flips_with_stable_attention += 1
        
        fsf_index = flips_with_stable_attention / total_flips if total_flips > 0 else 0
        return fsf_index, flips_with_stable_attention, total_flips
    
    def compute_efg(self, results):
        """
        Compute error-faithfulness gap.
        """
        correct_faithfulness = []
        incorrect_faithfulness = []
        
        for item in results:
            prediction = item['prediction']
            ground_truth = item['ground_truth']
            faithfulness_scores = item['faithfulness_scores']
            
            if prediction == ground_truth:
                correct_faithfulness.append(faithfulness_scores)
            else:
                incorrect_faithfulness.append(faithfulness_scores)
        
        # Compute means
        efg_results = {}
        for metric in ['deletion_auc', 'insertion_auc', 'sufficiency', 'necessity']:
            correct_mean = np.mean([s[metric] for s in correct_faithfulness])
            incorrect_mean = np.mean([s[metric] for s in incorrect_faithfulness])
            
            efg_results[metric] = {
                'correct_mean': correct_mean,
                'incorrect_mean': incorrect_mean,
                'gap': incorrect_mean - correct_mean,
                'cohens_d': self.compute_cohens_d(
                    [s[metric] for s in correct_faithfulness],
                    [s[metric] for s in incorrect_faithfulness]
                )
            }
        
        return efg_results
```

## Computational Optimization

### Efficient Batch Processing
```python
class EfficientBatchProcessor:
    def __init__(self, model, batch_size=32):
        self.model = model
        self.batch_size = batch_size
        
        # Compile model for faster inference (PyTorch 2.0+)
        self.model = torch.compile(self.model, mode="max-autotune")
    
    def process_dataset(self, dataset, use_amp=True):
        """
        Process dataset with optimizations.
        """
        dataloader = DataLoader(
            dataset, 
            batch_size=self.batch_size,
            num_workers=4,
            pin_memory=True,
            prefetch_factor=2
        )
        
        results = []
        
        # Mixed precision for faster processing
        with torch.cuda.amp.autocast(enabled=use_amp):
            for batch in tqdm(dataloader):
                # Move to GPU
                batch = {k: v.cuda(non_blocking=True) for k, v in batch.items()}
                
                # Process with gradient checkpointing for memory efficiency
                with torch.no_grad():
                    outputs = self.model(**batch)
                
                results.append({
                    'outputs': outputs.cpu(),
                    'batch_indices': batch['indices']
                })
        
        return results
```

This technical approach provides a comprehensive implementation framework for measuring, analyzing, and mitigating FSF and EFG phenomena in medical VLMs, enabling safe clinical deployment through rigorous engineering and evaluation.