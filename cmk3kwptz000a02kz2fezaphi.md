---
title: "OCR on Engineering Drawings with a 0.9B Vision-Language Model"
datePublished: Wed Jan 07 2026 05:29:34 GMT+0000 (Coordinated Universal Time)
cuid: cmk3kwptz000a02kz2fezaphi
slug: ocr-on-engineering-drawings-with-a-09b-vision-language-model
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1767764396726/0f4d1dc4-5746-4201-9a13-10acb3eac70f.png
tags: pdf, ocr, drawings, paddlepaddle

---

Late last year, I started exploring how to extract metadata from product drawings. Part numbers, material specifications, revision history, manufacturing process notes. The kind of information that lives in title blocks and needs to end up in a PLM database. I tried various OCR techniques - with the tolerance call outs, dimensions, it was a mess and I stretched the limit of what can be done with regular expressions. Then I found PaddleOCR-VL. It runs on a decent laptop and actually works.

VLMs learn joint representations of visual and textual information. PaddleOCR-VL-0.9B integrates a NaViT-style dynamic resolution visual encoder with the ERNIE-4.5-0.3B language model.

The key difference is semantic pattern matching. VLMs recognize that text in specific title block locations represents part numbers. That tabular arrangements indicate structured data. That text following "Material:" is a specification.PaddleOCR-VL uses a two-stage approach. First, PP-DocLayoutV2 performs layout analysis, localizing semantic regions and predicting reading order. Then PaddleOCR-VL-0.9B recognizes the content. A post-processing module outputs structured Markdown and JSON.

On OmniDocBench v1.5, it achieves an overall score of 92.56, surpassing MinerU2.5-1.2B (90.67) and general VLMs like Qwen2.5-VL-72B. A model 80 times smaller achieving higher accuracy.

For my use case, I used a two-stage pipeline:

```plaintext
PDF → Images → PaddleOCR-VL (OCR) → Qwen3-0.6B (Extraction) → Structured JSON
```

The input is the entire drawing in pdf.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1767763315772/2f1d9aba-64f3-4844-a9cc-1c442bb12dec.png align="center")

PaddleOCR-VL handles the OCR. Then I pass the extracted text to Qwen3-0.6B, a 600M parameter LLM, for structured information extraction. No complex regex patterns. The LLM figures out which text corresponds to which field.

The output looks like this:

```json
{
  "part_number": "3814200",
  "drawing_number": "4095700.M00.027PI1/2",
  "material": "Polycarbonate (makrolon cristal ref:2458)",
  "finish": "poli",
  "description": "CAPOT INTERRUPTEUR / SWITCH COVER",
  "product": "LEGENDAIR XL2 US"
}
```

The whole thing runs on a laptop with 16GB RAM. GPU helps but is not required. Manufacturers accumulate vast archives of engineering drawings and the title blocks contains the recipe, part numbers, material specifications, supplier references, revision histories.Cloud-based OCR means documents leave your network. They might be logged or used for training. For industries, this creates compliance complexity.

### ***A 0.9B parameter model changes this. It runs locally on a computer without network access. Documents never leave your infrastructure. The Apache 2.0 license allows commercial use.***

I have shared my extraction pipeline on GitHub: [PaddleOCR\_Engineering\_Drawings](https://github.com/thedatasense/PaddleOCR_Engineering_Drawings).