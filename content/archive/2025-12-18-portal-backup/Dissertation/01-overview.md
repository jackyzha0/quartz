# Overview

Medical vision-language models (VLMs) can interpret medical scans and answer clinical questions. They work well on chest X-rays, CT scans, and MRI studies. However, these models exhibit fragility to phrasing variations, which poses challenges for clinical deployment.

## Research Focus

This dissertation investigates phrasing robustness in medical VLMs through:

1. **Measurement**: Systematic quantification of phrasing sensitivity
2. **Causal Analysis**: Identifying which model components drive failures
3. **Mitigation**: Parameter-efficient interventions to improve robustness
4. **Safe Deployment**: Uncertainty-aware clinical integration

## Target Models

The research focuses on representative medical VLMs evaluated primarily on chest X-ray data from MIMIC-CXR.

## Expected Contributions

1. Systematic documentation of phrasing sensitivity phenomena
2. Causal evidence localizing architectural origins of brittleness
3. Practical methods for improving robustness
4. Deployment guidance for safe clinical triage
5. Open toolkit including evaluation scripts and reproducible infrastructure

All code, data, and models will be openly released with comprehensive documentation.

*Detailed findings, specific methodologies, and quantitative results reserved for publication.*
