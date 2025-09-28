# Interpreting Gemma-3 VLM Outputs on Chest X-rays

> A comprehensive framework for producing faithful visual explanations of Gemma-3 VLM decisions in medical imaging

[← Evaluation Index](index.md) | [Interpretability Toolkit →](interpretability-toolkit.md) | [GitHub Repository](https://github.com/UNHSAILLab/lvlm-interpret-medgemma)

---

## Overview

This framework provides a complete solution for interpreting Gemma-3 Vision-Language Model outputs on chest X-rays, addressing the critical need for explainable AI in medical imaging. The approach produces faithful, per-token visual explanations that help clinicians understand model decisions, debug failures, and ensure safe deployment in clinical settings.

The framework supports three primary use cases:
- **Per-token evidence maps** during generation for understanding incremental decisions
- **Single evidence mask** for the complete answer providing holistic explanations
- **Quantitative faithfulness metrics** via deletion and insertion AUCs for rigorous evaluation

## Architecture Details

### Vision-Language Architecture

The Gemma-3 VLM combines powerful vision and language components:

**Vision Tower**: SigLIP ViT encoder
- 27 transformer layers
- Hidden dimension: 1152
- Patch size: 14×14 pixels
- Projector with average pooling (stride 4)
- Pooled grid dimensions: `gH = (H/14)/4`, `gW = (W/14)/4`

**Language Model**: Gemma-3 decoder
- 34 transformer layers  
- Hidden dimension: 2560
- Grouped Query Attention (GQA)
- No KV tiling required (attention already per-query head)

### Explanation Components

Different explanation methods target different architectural components:

| Method | Location | Type |
|--------|----------|------|
| Cross-modal Attention | Decoder self-attention | Weight-based |
| Integrated Gradients | Image token embeddings | Gradient-based |
| TAM | Attention with deconfounding | Hybrid |
| CLEANN | Last-layer attention graph | Graph-based |
| iGOS++ | Pixel space | Optimization-based |
| SAE Features | Vision residual streams | Feature-based |

## Core Methods

### 1. Reliable Image-Token Indexing

Accurate indexing is critical for all explanation methods. The framework ensures robust token-to-image mapping:

```python
def find_image_span(self, inputs):
    """
    Find the exact span of image tokens in the decoder input
    
    Returns:
        tuple: (start_idx, end_idx, (grid_height, grid_width))
    """
    # Extract pooled vision embeddings
    mm_tokens = self.get_pooled_embeddings(inputs)  # [P, D]
    
    # Hook decoder input before layer 0
    with self.hook_manager.register_hook('decoder.layer_0.input'):
        x0 = self.model.forward_with_hooks(inputs)  # [S, D]
    
    # Find best matching span via sliding window
    best_score = -1
    best_start = 0
    
    for i in range(len(x0) - len(mm_tokens) + 1):
        window = x0[i:i+len(mm_tokens)]
        score = F.cosine_similarity(window, mm_tokens, dim=-1).mean()
        if score > best_score:
            best_score = score
            best_start = i
    
    # Validate span length matches grid size
    span_length = len(mm_tokens)
    assert span_length == self.grid_h * self.grid_w
    
    return best_start, best_start + span_length, (self.grid_h, self.grid_w)
```

### 2. Raw Cross-Modal Attention

Extract attention patterns between text tokens and image regions:

```python
def raw_attn_map(self, inputs, target_t, layers=None, heads=None,
                 agg_head="entropy", agg_layer="mean"):
    """
    Extract cross-modal attention for target token
    
    Args:
        target_t: Target token index
        agg_head: Head aggregation strategy ('mean', 'max', 'entropy')
        agg_layer: Layer aggregation ('mean', 'last', 'deep')
    """
    # Get attention tensors [Hq, Q, K] per layer
    attentions = self.extract_attentions(inputs)
    
    # Find image token span
    i0, i1, (gH, gW) = self.find_image_span(inputs)
    
    # Extract image attention for target token
    img_attns = []
    for layer_idx, A_l in enumerate(attentions):
        # Slice: A_l[:, target_t, i0:i1] → [Hq, K_img]
        attn_slice = A_l[:, target_t, i0:i1]
        
        # Renormalize over image tokens
        attn_slice = attn_slice / attn_slice.sum(dim=-1, keepdim=True)
        
        # Aggregate heads
        if agg_head == "entropy":
            # Weight by inverse entropy
            entropy = -(attn_slice * attn_slice.log()).sum(-1)
            weights = 1 - entropy / np.log(attn_slice.shape[-1])
            attn_agg = (attn_slice * weights.unsqueeze(-1)).sum(0)
        elif agg_head == "max":
            attn_agg = attn_slice.max(0)[0]
        else:  # mean
            attn_agg = attn_slice.mean(0)
        
        img_attns.append(attn_agg)
    
    # Aggregate layers
    if agg_layer == "last":
        final_attn = img_attns[-1]
    elif agg_layer == "deep":
        final_attn = torch.stack(img_attns[-4:]).mean(0)
    else:  # mean
        final_attn = torch.stack(img_attns).mean(0)
    
    # Reshape to grid and upsample
    attn_map = final_attn.reshape(gH, gW)
    attn_map = F.interpolate(attn_map.unsqueeze(0).unsqueeze(0), 
                             size=inputs['image'].shape[-2:],
                             mode='bilinear',
                             align_corners=False)[0, 0]
    
    return attn_map.cpu().numpy()
```

### 3. Gradient-Based Attribution

Integrated Gradients for faithful importance attribution:

```python
def grad_map(self, inputs, target_t, mode="integrated", steps=32):
    """
    Compute gradient-based attribution map
    
    For presence questions: uses first-step margin m = z(no) - z(yes)
    For specific tokens: uses logit margin at that position
    """
    # Prepare inputs with gradients only on image tokens
    inputs_embeds = self.build_inputs_embeds(inputs, requires_grad_img=True)
    
    # Define scoring function
    if self.is_presence_question(inputs['prompt']):
        # First-step margin under teacher forcing
        yes_id, no_id = self.first_step_margin_ids(self.tokenizer)
        
        def score_fn(embeds):
            outputs = self.model(inputs_embeds=embeds, 
                                 attention_mask=inputs['attention_mask'],
                                 use_cache=False)
            logits = outputs.logits[:, -1]
            return logits[:, no_id] - logits[:, yes_id]
    else:
        # Token-specific logit margin
        def score_fn(embeds):
            outputs = self.model(inputs_embeds=embeds,
                                 attention_mask=inputs['attention_mask'], 
                                 use_cache=False)
            logits = outputs.logits[:, target_t]
            gold_logit = logits.gather(-1, inputs['labels'][target_t])
            runner_up = logits.topk(2)[0][:, 1]
            return gold_logit - runner_up
    
    # Integrated gradients
    if mode == "integrated":
        # Baseline: zero on image tokens only
        baseline = inputs_embeds.clone()
        i0, i1, _ = self.find_image_span(inputs)
        baseline[:, i0:i1] = 0
        
        # Compute IG
        grads_x_inputs = []
        for alpha in torch.linspace(0, 1, steps):
            interp = baseline + alpha * (inputs_embeds - baseline)
            interp.retain_grad()
            
            score = score_fn(interp)
            score.backward()
            
            grad_x_input = interp.grad[:, i0:i1] * inputs_embeds[:, i0:i1]
            grads_x_inputs.append(grad_x_input)
        
        # Average and take positive part
        attribution = torch.stack(grads_x_inputs).mean(0)
        attribution = F.relu(attribution).sum(-1)  # Reduce channels
    
    else:  # Simple gradient
        inputs_embeds.retain_grad()
        score = score_fn(inputs_embeds)
        score.backward()
        attribution = inputs_embeds.grad[:, i0:i1].abs().sum(-1)
    
    # Reshape and upsample
    _, _, (gH, gW) = self.find_image_span(inputs)
    attr_map = attribution.reshape(gH, gW)
    attr_map = F.interpolate(attr_map.unsqueeze(0).unsqueeze(0),
                             size=inputs['image'].shape[-2:],
                             mode='bilinear',
                             align_corners=False)[0, 0]
    
    return attr_map.cpu().numpy()
```

### 4. TAM: Token Activation Map with Deconfounding

Remove context interference for cleaner attributions:

```python
def tam_map(self, raw_cam_t, context_cams, alpha=1e-2, weights=None):
    """
    Deconfound attention map by removing context interference
    
    Args:
        raw_cam_t: Raw CAM for target token [gH, gW]
        context_cams: List of context token CAMs
        alpha: Ridge regression parameter
        weights: Optional weights for context tokens
    """
    # Flatten spatial dimensions
    y = raw_cam_t.flatten()
    X = np.stack([cam.flatten() for cam in context_cams], axis=1)
    
    # Ridge regression to estimate interference
    if weights is None:
        # Default: equal weights
        XtX = X.T @ X
        Xty = X.T @ y
        w = np.linalg.solve(XtX + alpha * np.eye(X.shape[1]), Xty)
    else:
        # Weighted regression
        W = np.diag(weights)
        XtWX = X.T @ W @ X
        XtWy = X.T @ W @ y
        w = np.linalg.solve(XtWX + alpha * np.eye(X.shape[1]), XtWy)
    
    # Compute interference and deconfound
    interference = X @ w
    interference = interference.reshape(raw_cam_t.shape)
    
    # Deconfounded map with double ReLU
    deconfounded = np.maximum(0, raw_cam_t - np.maximum(0, interference))
    
    # Post-processing: rank-Gaussian normalization
    flat = deconfounded.flatten()
    ranks = np.argsort(np.argsort(flat))
    norm_ranks = (ranks + 0.5) / len(ranks)
    gaussian_vals = stats.norm.ppf(norm_ranks)
    deconfounded = gaussian_vals.reshape(deconfounded.shape)
    
    # Min-max normalization
    deconfounded = (deconfounded - deconfounded.min()) / (deconfounded.max() - deconfounded.min() + 1e-8)
    
    return deconfounded
```

### 5. CLEANN-Style Minimal Explaining Set

Find minimal image regions that explain a token:

```python
def cleann_set(self, inputs, target_t, radius_max=3, mass=0.9):
    """
    Extract minimal set of image tokens explaining target token
    
    Returns:
        dict: {
            'binary_mask': Binary mask on image grid
            'soft_weights': Attention weights for selected tokens
            'validation_score': Score drop when masking the set
        }
    """
    # Get last layer attention
    with torch.no_grad():
        outputs = self.model(**inputs, output_attentions=True)
        last_attn = outputs.attentions[-1]  # [B, Hq, Q, K]
    
    # Average over heads
    avg_attn = last_attn.mean(1)[0]  # [Q, K]
    
    # Build directed graph
    graph = {}
    for q in range(avg_attn.shape[0]):
        graph[q] = [(k, avg_attn[q, k].item()) 
                    for k in range(avg_attn.shape[1])]
    
    # BFS from target token
    i0, i1, (gH, gW) = self.find_image_span(inputs)
    visited = set()
    queue = [(target_t, 0)]
    image_nodes = []
    
    while queue:
        node, depth = queue.pop(0)
        if node in visited or depth > radius_max:
            continue
        
        visited.add(node)
        
        # Check if image token
        if i0 <= node < i1:
            img_idx = node - i0
            weight = avg_attn[target_t, node].item()
            image_nodes.append((img_idx, weight))
        
        # Add neighbors
        for next_node, _ in graph[node]:
            if next_node not in visited:
                queue.append((next_node, depth + 1))
    
    # Select minimal subset with cumulative mass
    image_nodes.sort(key=lambda x: x[1], reverse=True)
    selected = []
    cumsum = 0
    
    for idx, weight in image_nodes:
        selected.append(idx)
        cumsum += weight
        if cumsum >= mass:
            break
    
    # Create binary mask
    binary_mask = np.zeros(gH * gW)
    binary_mask[selected] = 1
    binary_mask = binary_mask.reshape(gH, gW)
    
    # Soft weights for visualization
    soft_weights = np.zeros(gH * gW)
    for idx, weight in image_nodes:
        if idx in selected:
            soft_weights[idx] = weight
    soft_weights = soft_weights.reshape(gH, gW)
    
    # Validate by masking
    validation_score = self.validate_masking(inputs, selected, target_t)
    
    return {
        'binary_mask': binary_mask,
        'soft_weights': soft_weights,
        'validation_score': validation_score
    }
```

### 6. iGOS++ Optimization for Answer-Level Attribution

Optimize a single mask explaining the complete answer:

```python
def igos_llr_mask(self, inputs, topk=8, iters=200, tv=3e-3, l1=1e-3):
    """
    Optimize single mask for whole answer using iGOS++
    
    Returns:
        dict: {
            'mask': Optimized mask [gH, gW]
            'selected_tokens': Top-K important tokens
            'token_llrs': Log-likelihood ratios
            'convergence_history': Loss values
        }
    """
    # Prepare blurred baseline
    image = inputs['pixel_values']
    image_blur = gaussian_filter(image.cpu().numpy(), sigma=2.0)
    image_blur = torch.tensor(image_blur).to(image.device)
    
    # Token selection via LLR
    with torch.no_grad():
        # Original image scores
        outputs_orig = self.model(**inputs)
        logprobs_orig = F.log_softmax(outputs_orig.logits, dim=-1)
        
        # Blurred image scores
        inputs_blur = {**inputs, 'pixel_values': image_blur}
        outputs_blur = self.model(**inputs_blur)
        logprobs_blur = F.log_softmax(outputs_blur.logits, dim=-1)
        
        # Per-token LLR
        labels = inputs['labels']
        llr = []
        for t in range(len(labels)):
            if labels[t] != -100:  # Skip padding
                llr_t = (logprobs_orig[0, t, labels[t]] - 
                        logprobs_blur[0, t, labels[t]]).item()
                llr.append((t, llr_t))
        
        # Select top-K tokens
        llr.sort(key=lambda x: x[1], reverse=True)
        selected_tokens = [t for t, _ in llr[:topk]]
        token_llrs = [score for _, score in llr[:topk]]
    
    # Initialize mask with gradient map
    _, _, (gH, gW) = self.find_image_span(inputs)
    grad_init = self.grad_map(inputs, selected_tokens[0], mode="simple")
    mask = torch.tensor(grad_init).to(image.device).requires_grad_(True)
    mask = F.interpolate(mask.unsqueeze(0).unsqueeze(0), 
                         size=(gH, gW), mode='bilinear')[0, 0]
    
    # Optimization
    optimizer = torch.optim.Adam([mask], lr=0.1)
    history = []
    
    for iter in range(iters):
        # Upsample mask to image size
        mask_up = F.interpolate(mask.unsqueeze(0).unsqueeze(0),
                                size=image.shape[-2:],
                                mode='bilinear',
                                align_corners=False)[0, 0]
        mask_up = torch.sigmoid(mask_up)  # Ensure [0,1]
        
        # Compose masked images
        img_masked_del = mask_up * image + (1 - mask_up) * image_blur
        img_masked_ins = (1 - mask_up) * image + mask_up * image_blur
        
        # Compute scores
        score_del = self.compute_selected_score(img_masked_del, 
                                                inputs, selected_tokens)
        score_ins = self.compute_selected_score(img_masked_ins,
                                                inputs, selected_tokens)
        score_orig = self.compute_selected_score(image, 
                                                 inputs, selected_tokens)
        score_blur = self.compute_selected_score(image_blur,
                                                 inputs, selected_tokens)
        
        # Combined objective
        loss_del = (score_del - score_blur) / (score_orig - score_blur + 1e-8)
        loss_ins = (score_orig - score_ins) / (score_orig - score_blur + 1e-8)
        
        # Regularization
        tv_loss = self.total_variation(mask) * tv
        l1_loss = mask.abs().mean() * l1
        
        loss = loss_del + loss_ins + tv_loss + l1_loss
        
        # Update
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        # Clamp mask to [0,1]
        with torch.no_grad():
            mask.clamp_(0, 1)
        
        history.append(loss.item())
    
    return {
        'mask': mask.detach().cpu().numpy(),
        'selected_tokens': selected_tokens,
        'token_llrs': token_llrs,
        'convergence_history': history
    }
```

## Evaluation Framework

### Faithfulness Metrics via Deletion/Insertion AUCs

The framework provides comprehensive faithfulness evaluation using deletion and insertion curves:

```python
def auc_batched(self, pv, pv_blur, ranks, gH, gW,
                input_ids, attention_mask, yes_id, no_id,
                steps=50, sigma=1.0):
    """
    Compute deletion and insertion AUCs in batched mode
    
    Returns:
        dict: {
            'deletion_auc': Area under deletion curve
            'insertion_auc': Area under insertion curve
            'drop_50': Score drop at 50% deletion
            'curves': Raw curve data
        }
    """
    N = gH * gW
    device = pv.device
    
    # Create mask schedule
    masks = []
    for s in range(steps + 1):
        k = int(np.ceil(s * N / steps))
        mask = np.zeros(N)
        mask[ranks[:k]] = 1
        mask = mask.reshape(gH, gW)
        
        # Upsample to image size with soft blending
        mask = cv2.resize(mask, pv.shape[-2:], 
                          interpolation=cv2.INTER_LINEAR)
        mask = gaussian_filter(mask, sigma=sigma)
        masks.append(mask)
    
    masks = torch.tensor(np.stack(masks)).to(device)
    
    # Batch compose images
    alpha = masks.unsqueeze(1)  # [S+1, 1, H, W]
    pv_del = (1 - alpha) * pv + alpha * pv_blur
    pv_ins = alpha * pv + (1 - alpha) * pv_blur
    
    # Batch forward passes
    with torch.no_grad(), torch.cuda.amp.autocast():
        # Deletion scores
        outputs_del = self.model(
            pixel_values=pv_del,
            input_ids=input_ids.expand(steps + 1, -1),
            attention_mask=attention_mask.expand(steps + 1, -1)
        )
        margins_del = (outputs_del.logits[:, -1, no_id] - 
                       outputs_del.logits[:, -1, yes_id])
        
        # Insertion scores
        outputs_ins = self.model(
            pixel_values=pv_ins,
            input_ids=input_ids.expand(steps + 1, -1),
            attention_mask=attention_mask.expand(steps + 1, -1)
        )
        margins_ins = (outputs_ins.logits[:, -1, no_id] -
                       outputs_ins.logits[:, -1, yes_id])
    
    # Extract key scores
    y_orig = margins_del[0].item()
    y_full = margins_del[-1].item()
    y_blur = margins_ins[0].item()
    
    # Determine orientation
    sgn = np.sign(y_orig - y_full)
    s = lambda x: sgn * x
    
    # Normalize curves
    y_del_norm = np.clip(
        (s(margins_del.cpu().numpy()) - s(y_full)) / 
        (s(y_orig) - s(y_full) + 1e-8), 0, 1
    )
    y_ins_norm = np.clip(
        (s(margins_ins.cpu().numpy()) - s(y_blur)) /
        (s(y_orig) - s(y_blur) + 1e-8), 0, 1
    )
    
    # Compute AUCs
    x = np.linspace(0, 1, steps + 1)
    auc_del = np.trapz(y_del_norm, x)
    auc_ins = np.trapz(y_ins_norm, x)
    
    # Drop@50%
    drop_50 = y_del_norm[steps // 2]
    
    return {
        'deletion_auc': auc_del,
        'insertion_auc': auc_ins,
        'drop_50': drop_50,
        'curves': {
            'deletion': y_del_norm,
            'insertion': y_ins_norm,
            'x': x
        },
        'scores': {
            'y_orig': y_orig,
            'y_full': y_full,
            'y_blur': y_blur,
            'orientation': sgn
        }
    }
```

### Baseline Comparisons

The framework includes robust baseline methods:

```python
def compute_baselines(self, gH, gW, steps=50, n_random=20):
    """
    Compute random and center-bias baselines
    """
    N = gH * gW
    
    # Random baseline: average over multiple seeds
    random_aucs = []
    for seed in range(n_random):
        np.random.seed(seed)
        random_ranks = np.random.permutation(N)
        auc_results = self.auc_batched(..., ranks=random_ranks, ...)
        random_aucs.append(auc_results)
    
    # Center prior baseline
    center = (gH // 2, gW // 2)
    distances = []
    for i in range(gH):
        for j in range(gW):
            dist = np.sqrt((i - center[0])**2 + (j - center[1])**2)
            distances.append(dist)
    
    center_ranks = np.argsort(distances)
    center_results = self.auc_batched(..., ranks=center_ranks, ...)
    
    return {
        'random': {
            'deletion_auc': np.mean([r['deletion_auc'] for r in random_aucs]),
            'insertion_auc': np.mean([r['insertion_auc'] for r in random_aucs]),
            'std': np.std([r['deletion_auc'] for r in random_aucs])
        },
        'center': center_results
    }
```

## Visualization and Analysis

### Comprehensive Visualization Pipeline

```python
def show_maps(self, image, maps: dict, save_path=None):
    """
    Create publication-ready visualization of all attribution maps
    """
    n_maps = len(maps)
    fig, axes = plt.subplots(2, (n_maps + 1) // 2, 
                            figsize=(5 * ((n_maps + 1) // 2), 10))
    axes = axes.flatten()
    
    # Original image
    axes[0].imshow(image)
    axes[0].set_title("Original Chest X-ray", fontsize=14, weight='bold')
    axes[0].axis('off')
    
    # Compute global color scale (2nd-98th percentile)
    all_values = []
    for map_data in maps.values():
        all_values.extend(map_data.flatten())
    vmin = np.percentile(all_values, 2)
    vmax = np.percentile(all_values, 98)
    
    # Plot each attribution map
    for idx, (name, attr_map) in enumerate(maps.items(), 1):
        ax = axes[idx]
        
        # Show original with overlay
        ax.imshow(image, alpha=0.7)
        im = ax.imshow(attr_map, alpha=0.4, cmap='hot',
                       vmin=vmin, vmax=vmax)
        
        # Format
        ax.set_title(self.format_method_name(name), 
                    fontsize=14, weight='bold')
        ax.axis('off')
    
    # Add colorbar
    plt.colorbar(im, ax=axes, fraction=0.046, pad=0.04)
    
    # Hide unused subplots
    for idx in range(len(maps) + 1, len(axes)):
        axes[idx].set_visible(False)
    
    plt.tight_layout()
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
    
    return fig
```

### Clinical Integration Features

```python
class ClinicalIntegration:
    """Integration with clinical workflows and safety checks"""
    
    def generate_clinical_report(self, image, question, answer, attributions):
        """
        Generate structured report for clinical review
        """
        report = {
            'timestamp': datetime.now().isoformat(),
            'model_info': {
                'name': 'Gemma-3 VLM',
                'version': self.model.config._name_or_path,
                'parameters': '27B'
            },
            'input': {
                'question': question,
                'image_metadata': self.extract_image_metadata(image)
            },
            'output': {
                'answer': answer,
                'confidence': self.compute_confidence(answer)
            },
            'explanations': {}
        }
        
        # Add attribution summaries
        for method, attr_map in attributions.items():
            report['explanations'][method] = {
                'peak_location': self.find_peak_location(attr_map),
                'coverage': self.compute_coverage(attr_map),
                'consistency_check': self.check_anatomical_consistency(attr_map)
            }
        
        # Safety checks
        report['safety'] = {
            'critical_regions_checked': self.check_critical_regions(attributions),
            'attribution_agreement': self.compute_method_agreement(attributions),
            'confidence_calibration': self.assess_calibration(answer)
        }
        
        return report
    
    def check_critical_regions(self, attributions):
        """Verify model attended to clinically important regions"""
        critical_regions = {
            'heart': {'bounds': (150, 250, 200, 350), 'threshold': 0.1},
            'lungs': {'bounds': (50, 450, 100, 400), 'threshold': 0.2},
            'mediastinum': {'bounds': (200, 300, 150, 350), 'threshold': 0.1}
        }
        
        checks = {}
        for region, params in critical_regions.items():
            y1, y2, x1, x2 = params['bounds']
            
            # Check if any method shows significant attention
            attended = False
            for attr_map in attributions.values():
                region_attention = attr_map[y1:y2, x1:x2].mean()
                if region_attention > params['threshold']:
                    attended = True
                    break
            
            checks[region] = attended
        
        return checks
```

## Implementation Guidelines

### System Requirements

- **Hardware**: NVIDIA GPU with ≥24GB VRAM (A10G, V100, A100 recommended)
- **Software**: PyTorch 2.0+, Transformers 4.40+, CUDA 11.8+
- **Memory**: 32GB+ system RAM for preprocessing

### Installation and Setup

```bash
# Clone repository
git clone https://github.com/UNHSAILLab/lvlm-interpret-medgemma
cd lvlm-interpret-medgemma

# Create environment
conda create -n gemma-interpret python=3.10
conda activate gemma-interpret

# Install dependencies
pip install -r requirements.txt

# Download model weights (requires HuggingFace access)
python scripts/download_model.py --model google/gemma-3-vlm
```

### Quick Start Example

```python
from explainer import VLMExplainer
from utils import load_chest_xray

# Initialize explainer
explainer = VLMExplainer(
    model_name="google/gemma-3-vlm",
    device="cuda",
    dtype=torch.float16
)

# Load chest X-ray
image = load_chest_xray("data/sample_cxr.jpg")
question = "Is there evidence of pneumonia in the right lung?"

# Prepare inputs
inputs = explainer.prepare_inputs(image, question)

# Generate answer with explanations
with torch.cuda.amp.autocast():
    # Get model answer
    answer = explainer.generate(inputs, max_new_tokens=50)
    print(f"Model answer: {answer['text']}")
    
    # Compute attribution maps
    target_t = explainer.pick_token_index(answer['ids'], strategy="first_content")
    
    maps = {
        'attention': explainer.raw_attn_map(inputs, target_t),
        'gradients': explainer.grad_map(inputs, target_t),
        'tam': explainer.tam_map(
            raw_cam_t=maps['attention'],
            context_cams=explainer.get_context_cams(inputs, target_t)
        )
    }
    
    # Evaluate faithfulness
    results = {}
    for name, attr_map in maps.items():
        ranks = explainer.spatial_ranking(attr_map)
        auc_results = explainer.auc_batched(
            pv=inputs['pixel_values'],
            pv_blur=explainer.blur_image(inputs['pixel_values']),
            ranks=ranks,
            gH=explainer.grid_h,
            gW=explainer.grid_w,
            input_ids=inputs['input_ids'],
            attention_mask=inputs['attention_mask'],
            yes_id=explainer.yes_id,
            no_id=explainer.no_id
        )
        results[name] = auc_results
    
    # Visualize
    explainer.show_maps(image, maps)
    
    # Print metrics
    print("\nFaithfulness Metrics:")
    for name, res in results.items():
        print(f"{name}:")
        print(f"  Deletion AUC: {res['deletion_auc']:.3f}")
        print(f"  Insertion AUC: {res['insertion_auc']:.3f}")
        print(f"  Drop@50%: {res['drop_50']:.3f}")
```

## Common Failure Modes and Solutions

### 1. Wrong Target Token Attribution

**Problem**: Attributing to `<eos>` token instead of decision token.

**Solution**: Use first-step margin for yes/no questions:
```python
def get_decision_score(self, outputs, inputs):
    if self.is_presence_question(inputs['prompt']):
        # Use first-step margin
        return outputs.logits[:, -1, self.no_id] - outputs.logits[:, -1, self.yes_id]
    else:
        # Use token-specific score
        return self.get_token_score(outputs, target_t)
```

### 2. Identical AUCs Across Methods

**Problem**: Cache reuse causing identical scores.

**Solution**: Disable caching during evaluation:
```python
outputs = model(inputs, use_cache=False)
```

### 3. Low-Contrast Attribution Maps

**Problem**: Poor visualization due to log-probability targets.

**Solution**: Use margin-based scoring:
```python
score = logit_no - logit_yes  # Better contrast than log_prob
```

### 4. Spurious Border Attention

**Problem**: Model attending to image borders/markers.

**Solution**: Crop borders and apply anatomical masking:
```python
def preprocess_medical_image(image):
    # Crop 5% borders
    h, w = image.shape[:2]
    crop = int(0.05 * min(h, w))
    image = image[crop:-crop, crop:-crop]
    
    # Apply lung segmentation mask (optional)
    if self.use_lung_mask:
        mask = self.segment_lungs(image)
        image = image * mask
    
    return image
```

## Performance Optimization

### Batched Evaluation Pipeline

```python
class BatchedEvaluator:
    """Optimized evaluation for large-scale experiments"""
    
    def evaluate_dataset(self, dataset, batch_size=8):
        # Precompute all blurred images
        blurred_cache = self.precompute_blurred_images(dataset)
        
        # Batch process
        results = []
        for batch in self.batch_iterator(dataset, batch_size):
            with torch.cuda.amp.autocast():
                # Stack inputs
                pixel_values = torch.stack([item['image'] for item in batch])
                pixel_values_blur = torch.stack([blurred_cache[item['id']] 
                                                for item in batch])
                
                # Parallel attribution computation
                attributions = self.compute_attributions_batched(
                    pixel_values, batch['questions']
                )
                
                # Batched AUC computation
                auc_results = self.auc_batched_multi(
                    pixel_values, pixel_values_blur, attributions
                )
                
                results.extend(auc_results)
        
        return self.aggregate_results(results)
```

### Memory-Efficient Attribution

```python
@torch.no_grad()
def compute_attention_maps_efficient(self, inputs, max_layers=4):
    """Memory-efficient attention extraction"""
    # Use gradient checkpointing
    self.model.gradient_checkpointing_enable()
    
    # Process layers in chunks
    attention_maps = []
    for layer_chunk in range(0, self.model.config.num_layers, max_layers):
        chunk_maps = self.extract_attention_chunk(
            inputs, layer_chunk, min(layer_chunk + max_layers, 
                                    self.model.config.num_layers)
        )
        attention_maps.extend(chunk_maps)
        
        # Clear cache
        torch.cuda.empty_cache()
    
    return attention_maps
```

## Quality Assurance Checklist

### Pre-deployment Verification

- [ ] Image token indexing assertion passes for all test samples
- [ ] Random baseline AUC ≈ 0.5 (±0.05) after normalization  
- [ ] Center baseline AUC ≈ 0.5 (±0.05) after normalization
- [ ] Deletion curves monotonically decrease
- [ ] Insertion curves monotonically increase
- [ ] Attribution maps highlight anatomical structures, not borders
- [ ] Methods show reasonable agreement (correlation > 0.3)
- [ ] Confidence calibration ECE < 0.15

### Runtime Monitoring

```python
class RuntimeMonitor:
    """Monitor interpretation quality during deployment"""
    
    def __init__(self, thresholds):
        self.thresholds = thresholds
        self.metrics_buffer = deque(maxlen=100)
    
    def check_interpretation_quality(self, attribution_results):
        """Real-time quality checks"""
        alerts = []
        
        # Check AUC bounds
        if attribution_results['deletion_auc'] > 0.8:
            alerts.append("Abnormally high deletion AUC")
        
        # Check attribution sparsity
        sparsity = (attribution_results['attribution_map'] > 0.1).mean()
        if sparsity > 0.7:
            alerts.append("Attribution map too dense")
        
        # Check method agreement
        if 'method_correlation' in attribution_results:
            if attribution_results['method_correlation'] < 0.2:
                alerts.append("Low agreement between methods")
        
        # Update metrics buffer
        self.metrics_buffer.append(attribution_results)
        
        # Check trends
        if len(self.metrics_buffer) == 100:
            recent_aucs = [m['deletion_auc'] for m in self.metrics_buffer[-10:]]
            if np.std(recent_aucs) > 0.2:
                alerts.append("High variance in recent AUCs")
        
        return alerts
```

## Integration with Existing Frameworks

### Compatibility with Medical VLM Toolkit

```python
# Integration with interpretability toolkit
from medical_vlm_interpretability import MedicalVLMInterpretabilityToolkit

class GemmaVLMAdapter:
    """Adapter for Gemma-3 VLM in the medical interpretability toolkit"""
    
    def __init__(self, gemma_explainer):
        self.explainer = gemma_explainer
    
    def get_attention_maps(self, image, question):
        inputs = self.explainer.prepare_inputs(image, question)
        return self.explainer.raw_attn_map(inputs, target_t=-1)
    
    def get_gradient_attribution(self, image, question):
        inputs = self.explainer.prepare_inputs(image, question)
        return self.explainer.grad_map(inputs, target_t=-1)
    
    # Implement other required interfaces...
```

### Integration with Robustness Gauntlet

```python
# Use within robustness evaluation framework
from robustness_gauntlet import RobustnessGauntlet

gauntlet = RobustnessGauntlet()
gauntlet.register_explainer('gemma3-vlm', GemmaVLMExplainer)

# Evaluate with paraphrase robustness
results = gauntlet.evaluate_phrasing_robustness(
    model='gemma3-vlm',
    dataset='medphr-rad',
    include_explanations=True
)
```

## Future Directions

### Research Opportunities

1. **Multi-scale Attribution**: Combine patch-level and pixel-level explanations
2. **Temporal Consistency**: Track explanation stability across conversation turns
3. **Counterfactual Generation**: Generate minimal image edits that change predictions
4. **Uncertainty-Aware Explanations**: Incorporate model uncertainty into attributions

### Planned Enhancements

- Support for video explanation (temporal medical imaging)
- Integration with 3D medical imaging (CT, MRI volumes)
- Real-time explanation generation for clinical deployment
- Federated learning compatible explanations

## Related Resources

- [[interpretability-toolkit|Medical VLM Interpretability Toolkit]] - Extended toolkit features
- [[02-paraphrase-robustness|Paraphrase Robustness Metrics]] - Evaluation metrics
- [[../Healthcare/02-medgemma|MedGemma Architecture]] - Model details
- [[robustness-gauntlet|Robustness Gauntlet Framework]] - Comprehensive evaluation
- [[../Safety/01-mllmguard-framework|MLLMGuard Framework]] - Safety considerations
- [GitHub Repository](https://github.com/UNHSAILLab/lvlm-interpret-medgemma) - Source code and notebooks