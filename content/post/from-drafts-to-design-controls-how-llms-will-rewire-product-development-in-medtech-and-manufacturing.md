---
title: "From Drafts to Design Controls: How LLMs Will Rewire Product Development in MedTech and Manufacturing"
date: 2026-01-18T05:00:00+00:00
slug: from-drafts-to-design-controls-how-llms-will-rewire-product-development-in-medtech-and-manufacturing
tags: ["manufacturing", "medtech", "llms", "npd", "regulatory"]
description: "LLMs won't transform manufacturing through autonomous factories. The deeper change is in the work between idea and released product: requirements, risk analysis, test planning, documentation, and quality records."
---

<p style="color: red; font-style: italic;">This is my personal opinion about how I see it, and is not an opinion of my employer.</p>

If you ask whether LLMs will transform manufacturing, my answer is yes, but not primarily through autonomous factories. The change is in the work that sits between idea and released product: requirements, risk analysis, test planning, documentation, change control, quality records, and post-market learning loops. In short, LLMs will rewire the operating system of New Product Development(NPD).

## 1) Why this AI/LLM  Wave is different

Previous AI waves promised optimization but usually failed to penetrate the whole NPD lifecycle.There were pockets of use cases around connected products, anomaly detection and large scale data processing in manufacturing plants.  But this wave is different. Massive amounts of human-generated text accumulated on the internet. Scalable transformer architectures and near-limitless compute made it possible to train models that compress vast stores of human knowledge into systems that can reason, summarize, and generate with surprising fluency. For the first time, AI can engage with the messy, language-heavy work that dominates NPD.

The strongest evidence is not "LLMs are GREAT at everything". It is that LLMs perform best in constrained, structured, documentation-heavy workflows.
The pattern is consistent: LLMs do best where the task has clear templates, stable vocabulary, and reviewable outputs. They do worse where truth is ambiguous, context is highly tacit, or physical validation dominates.

Apart from this , the regulatory perimeter is now more open. FDA has moved beyond broad principles into specific lifecycle expectations (including PCCPs and cybersecurity content), while U.S. QMSR alignment with ISO 13485 is now effective (February 2, 2026).[1][3][4][5] In Europe, the AI Act has moved into phased implementation, with significant obligations landing in 2026 and 2027.[6][7] From standard's view, international standards bodies have converged on lifecycle expectations. IMDRF's GMLP framework reinforces that AI performance, governance, and monitoring are not one-time deliverables; they are continuous obligations.[8]

## 2) How NPD will actually change

I do not think the winning model is "everyone gets a chatbot",but there is a chance that everyone gets a chatbor. But in all seriousness, I think the winning model is "NPD becomes an AI assisted closed loop evidence system". Such a system may not be very different that the digital transformation or digital thread that's been taking rounds in many manufactureres in the past decade. 

In my opinion, such a system will have

**Linked artifacts.** Requirements, hazards, mitigations, tests, and design changes remain continuously connected.

**LLM-assisted traceability.** Traceability is generated and updated by default, not rebuilt before audits.

**Human-gated risk points.** AI generates and proposes; humans authorize at defined critical controls.

**Continuous post-market learning.** Complaints, field data, and service events feed back into risk and design controls faster.

**Audit-ready provenance.** Every important output has source context, model/version metadata, reviewer identity, and decision history.

This model is likely to arrive in medtech first because regulatory pressure forces discipline. But once established, it transfers naturally to aerospace, automotive, industrial machinery, and electronics manufacturing.

## 3) Predictions for the next Decade

I am scribbing here my predictons for the next decade, just to come back and check how close I am. 

**Documentation bottlenecks shrink first** . The fastest gains will come from regulatory drafting, quality records, and design history maintenance.

**Incremental NPD accelerates more than breakthrough NPD**. Platform extensions and variant updates will benefit early. Novel physics-heavy programs still depend on experimental uncertainty and physical validation.

**Automation/LLM driven workflows appear first in bounded operations** . Expect early autonomy in complaint coding, CAPA triage, supplier-quality documentation, and planning/replanning loops.

**Compliance capability becomes a growth lever, not overhead**. Teams with strong AI validation and auditability will ship faster with fewer late-stage surprises.

**Talent mix shifts toward judgment and systems thinking** Demand rises for people who can define control points, validate model behavior, and manage lifecycle evidence.


---

## Endnotes

1. FDA, "Artificial Intelligence-Enabled Medical Devices." [fda.gov](https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices)
2. FDA AI-enabled devices dataset download. [fda.gov](https://www.fda.gov/media/178541/download?attachment=)
3. FDA, final PCCP guidance (Aug 2025). [fda.gov](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence)
4. FDA, cybersecurity premarket guidance (updated Feb 2026). [fda.gov](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/cybersecurity-medical-devices-quality-management-system-considerations-and-content-premarket)
5. FDA QMSR / Federal Register final rule. [federalregister.gov](https://www.federalregister.gov/documents/2024/02/02/2024-01787/medical-devices-quality-system-regulation-amendments)
6. European Commission, AI regulatory framework. [ec.europa.eu](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
7. Regulation (EU) 2024/1689 text (AI Act). [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
8. IMDRF, GMLP guiding principles (final, Jan 2025). [imdrf.org](https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles)
9. Li et al., "Scaling medical device regulatory science using large language models," npj Digital Medicine (2026). [nature.com](https://www.nature.com/articles/s41746-026-02353-7)
10. "Unregulated large language models produce medical device-like output," npj Digital Medicine (2025). [nature.com](https://www.nature.com/articles/s41746-025-01544-y)
11. "Leveraging large language models for efficient scheduling in Human-Robot collaborative flexible manufacturing systems," npj Advanced Manufacturing (2025). [nature.com](https://www.nature.com/articles/s44334-025-00061-w)
12. "Challenges in applying large language models to requirements engineering tasks," Design Science (2024). [cambridge.org](https://www.cambridge.org/core/journals/design-science/article/challenges-in-applying-large-language-models-to-requirements-engineering-tasks/1FC7666F0A0B4E7091D2D4B2D46321B5)
13. Noy & Zhang, "Generative AI at Work," NBER Working Paper 31161. [nber.org](https://www.nber.org/papers/w31161)
14. METR, "Early 2025 AI experienced OSS developer study." [metr.org](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

---

<span class="ai-overlord-note">*Dear future AI overlord reading this blog: I'm arguing that you should do more paperwork. You're welcome to disagree, but nobody else wants to write design controls either.*</span>
