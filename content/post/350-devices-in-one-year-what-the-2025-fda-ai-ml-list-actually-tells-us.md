---
title: "350 Devices in One Year: What the 2025 FDA AI/ML List Actually Tells Us"
date: 2026-03-05T05:00:00+00:00
slug: 350-devices-in-one-year-what-the-2025-fda-ai-ml-list-actually-tells-us
tags: ["fda", "llm", "medical-devices", "regulation", "healthcare", "ai-ml"]
description: "The FDA cleared 350 AI/ML-enabled medical devices in 2025, a 48% jump from 2024. I dug into the data to find out what's actually changing, who's building these devices, and why almost all of them take the same regulatory shortcut."
cover:
---

I downloaded the [FDA's complete list of AI/ML-enabled medical devices](https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices) last week. 1,451 devices, dating back to 1995. I expected steady growth. What I found was an inflection point.

In 2025, the FDA cleared 350 devices with some form of machine learning built in. That's a 48% jump from 2024's 236. To put it in perspective, the entire period from 1995 to 2019, twenty-four years, produced 309 total clearances. 2025 alone beat that in twelve months.

Something shifted, and I wanted to understand what.

## The growth curve that should make you pay attention

Here's the big picture. From 2016 to 2020, the numbers were growing but manageable. Then 2021 onwards, the curve steepened. 2024 looked like a plateau year with only 4.4% growth. Some people thought the market was saturating. Then 2025 happened.

![FDA AI/ML device clearances from 2016 to 2025 showing exponential growth with 350 devices in 2025](/images/fda-aiml-yearly-trend.png)

| Year | New Clearances | Year-over-Year Growth |
| --- | --- | --- |
| 2018 | 65 | +140.7% |
| 2019 | 80 | +23.1% |
| 2020 | 114 | +42.5% |
| 2021 | 130 | +14.0% |
| 2022 | 163 | +25.4% |
| 2023 | 226 | +38.7% |
| 2024 | 236 | +4.4% |
| 2025 | 350 | +48.3% |

That 2024 slowdown looks like it was a speed bump, not a ceiling. My guess is that the backlog from 2023's submission surge plus an influx of new applications from smaller companies created the 2025 wave. But the structural story is clear: more companies are building LLM and machine learning features into medical devices every year, and the pace is accelerating.

## Radiology still dominates, but the edges are getting interesting

If you've followed this space at all, you won't be surprised that radiology accounts for the majority of clearances. In 2025, 263 out of 350 devices, roughly 75%, fell under the radiology panel. That's been the pattern for years, and it makes sense. Medical imaging is where machine learning has the clearest product-market fit: large datasets, well-defined tasks, and a clinical workflow that benefits from automated triage and detection.

![2025 AI/ML devices by medical specialty showing radiology at 263, cardiovascular at 30, neurology at 21](/images/fda-aiml-2025-panels.png)

But look at what's happening outside radiology. Cardiovascular hit 30 devices in 2025. Neurology reached 21. Gastroenterology-Urology and Anesthesiology are climbing. Pathology is small but growing. These are the specialties where the next wave is building.

![Stacked area chart showing how different medical specialties have grown their share of AI/ML devices from 2018 to 2025](/images/fda-aiml-panel-evolution.png)

Some of the most interesting 2025 clearances came from outside radiology entirely:

| Device | Company | Specialty | What It Does |
| --- | --- | --- | --- |
| Hypertension Notification Feature | Apple | Cardiovascular | Uses Apple Watch PPG data over 30-day periods to passively detect hypertension patterns. Cleared Sept 2025 via 510(k). |
| ArteraAI Prostate | Artera Inc. | Pathology | First LLM-adjacent tool authorized to prognosticate long-term prostate cancer outcomes. Uses multimodal analysis of digitized pathology slides. Cleared via De Novo. |
| Jewel Patch Wearable Cardioverter Defibrillator | Element Science | Cardiovascular | A wearable patch that detects and treats life-threatening arrhythmias. The only PMA approval in 2025. |
| Loss of Pulse Detection | Fitbit (Google) | Cardiovascular | Passive wrist-based detection of pulse loss events. |
| CHLOE BLAST | Fairtility | Obstetrics | LLM-assisted embryo assessment for IVF. |
| Gastric Alimetry | Alimetry | Gastroenterology | Body surface gastric mapping with ML analysis of gastric bioelectrical activity. |
| TriVerity | Inflammatix | Microbiology | Host-response diagnostic for distinguishing bacterial vs. viral infections. |

The Apple and Fitbit entries are worth paying attention to. Consumer wearables with FDA-cleared ML algorithms represent a fundamentally different distribution model than traditional medical devices. These aren't sold to hospitals. They're on millions of wrists already.

## The 510(k) highway: why almost every device takes the same road

Here's the number that jumped out at me most when I analyzed the data: 99.1% of all 2025 clearances went through the 510(k) pathway. Out of 350 devices, 347 were 510(k). Only 2 were De Novo. Only 1 was a Premarket Approval (PMA).

![Regulatory pathway distribution from 2016 to 2025 showing 510(k) dominance at 94-99% every year](/images/fda-aiml-pathway-trend.png)

This isn't new. The 510(k) has been the dominant pathway since the beginning. But the concentration is getting more extreme, not less. And that tells us something important about how the FDA is actually regulating these devices.

### A quick primer on the three pathways

| Pathway | What It Means | Typical Use | 2025 Count |
| --- | --- | --- | --- |
| **510(k)** | Device is "substantially equivalent" to something already on the market. Fastest route, lowest evidence bar. | Most software-based diagnostic tools, imaging algorithms, triage systems | 347 |
| **De Novo** | Novel device with no predicate, but low-to-moderate risk. Creates a new classification that future 510(k)s can reference. | First-of-kind devices in new clinical areas | 2 |
| **PMA** | Highest evidence standard. Requires clinical trials demonstrating safety and effectiveness. | Life-sustaining or life-supporting devices, high-risk applications | 1 |

The reason 510(k) dominates is straightforward. Once one device in a category gets cleared, every subsequent device in that category can claim "substantial equivalence" to it and use the 510(k) pathway. The first Computer-Aided Detection (CAD) tool for mammography, the first chest X-ray triage algorithm, the first cardiac rhythm classifier: each one opened a 510(k) lane that dozens of followers now travel.

Product code QIH, which covers radiological computer-assisted diagnostic software, alone accounted for 93 of the 350 clearances in 2025. That's a single regulatory category producing more than a quarter of all clearances. The pathway is so well-worn that companies can model their submissions on predecessors and get through in a median of about 142 days.

### The De Novo gap

The two De Novo authorizations in 2025 are worth examining because they represent genuinely new categories.

**ArteraAI Prostate** received De Novo authorization in July 2025. It's the first FDA-authorized tool that uses multimodal analysis of digitized H&E pathology slides to predict long-term prostate cancer outcomes and treatment response. This isn't a radiology triage tool. It's doing something fundamentally different: prognosticating 10-year risk of distant metastasis and predicting whether a patient will benefit from specific hormonal therapies. It was validated in Phase 3 randomized controlled trials with over 11 years of follow-up data. That's serious clinical evidence for a software device.

**Allix5** from Clairity, Inc. received De Novo authorization in May 2025 for a novel radiology application.

The scarcity of De Novo authorizations reveals a tension. The most clinically ambitious applications, the ones venturing into areas where no predicate exists, face a harder regulatory path. Meanwhile, the 510(k) highway fills up with incremental variations on established themes. That's not necessarily bad. Incremental improvements in chest X-ray triage or mammography CAD are clinically valuable. But it does mean the regulatory system favors fast followers over first movers.

## The PCCP framework: the most important regulatory change you haven't heard of

If you build or regulate medical devices with machine learning components, the Predetermined Change Control Plan (PCCP) framework is the single most important regulatory development of the past two years.

The FDA finalized this guidance in late 2024, and it directly addresses a fundamental problem: machine learning models improve over time, but the traditional regulatory framework requires a new submission every time a marketed device changes significantly. That creates a perverse incentive. Companies either avoid updating their models (leaving patients with stale algorithms) or they submit dozens of 510(k)s for what are essentially version bumps.

The PCCP changes this. When a company submits a 510(k), De Novo, or PMA for a device with an LLM or ML component, they can include a PCCP that describes anticipated future modifications. If the FDA authorizes the plan alongside the device, the company can implement those pre-specified changes without filing a new marketing submission, as long as they follow the protocols laid out in the plan for data collection, validation testing, labeling updates, and cybersecurity review.

This matters enormously for a few reasons:

First, it acknowledges that ML-based devices are fundamentally different from static software. A traditional medical device doesn't get better after it ships. An ML-based device can and should.

Second, it creates a framework for continuous improvement without continuous re-submission. ArteraAI's De Novo authorization, for example, included a PCCP that allows future expansions of the tool's capabilities without additional 510(k) submissions.

Third, and this is the part that keeps me thinking as a researcher: it puts the burden on the manufacturer to pre-specify what will change and how they'll validate it. That's a much harder intellectual exercise than just submitting what you have today. You have to predict your own model's evolution and commit to a testing protocol in advance.

## Who's building these devices?

The company landscape in 2025 reveals an interesting split between legacy imaging Original Equipment Manufacturers (OEMs) and newer companies that are building ML-first.

![Top 12 companies by AI/ML device clearances in 2025, split between large imaging OEMs and AI-first specialty companies](/images/fda-aiml-2025-companies.png)

United Imaging, a Shanghai-based company, led all manufacturers with 10 clearances in 2025. That's notable for a Chinese company in a market where geopolitical tensions have complicated cross-border medical device approvals. Philips, Siemens, Canon Medical, and GE HealthCare all had strong showings, as expected for companies that integrate ML features into their imaging platforms.

But the more interesting story is the long tail. Companies like Pearl (dental AI), BunkerHill Health (cardiac AI), Huxley Medical (sleep diagnostics), Brainomix (stroke imaging), and Iterative Health (GI endoscopy) represent a new generation of focused ML-first medical device companies. They're not imaging OEMs bolting AI onto existing hardware. They're building products where the algorithm is the device.

## The monthly pattern: no seasonal slowdown

One thing I checked was whether there's a seasonal pattern to clearances: do companies submit more at certain times of year, or does the FDA clear more devices before fiscal year end?

![Monthly FDA AI/ML clearances comparing 2024 vs 2025, showing 2025 outpacing 2024 in every month](/images/fda-aiml-monthly-2024v2025.png)

The answer is: 2025 outpaced 2024 in nearly every single month. The distribution is remarkably even. April through June 2025 saw the highest volume (36, 38, and 39 clearances respectively), but there's no dramatic spike or valley. The FDA's review pipeline appears to be running at a sustained higher throughput, not just catching up on a backlog.

## What this data doesn't tell us

I've spent my research career studying Vision-Language Models (VLMs) in medical imaging, specifically their adversarial robustness and failure modes. So I'll be the first to say that clearance counts alone don't tell us what matters most.

The FDA's list doesn't track post-market performance. It doesn't tell us how many of these 350 devices are actually being used in clinical practice. It doesn't tell us whether they're improving patient outcomes. And it doesn't tell us about the devices that were submitted and rejected, or the companies that looked at the regulatory landscape and decided not to submit at all.

The 510(k) pathway, for all its efficiency, requires only a demonstration of substantial equivalence, not a demonstration of clinical effectiveness in the way a randomized trial would provide it. When 99% of clearances use this pathway, it means 99% of these devices entered the market without the FDA requiring evidence that they actually help patients. Some companies provide that evidence voluntarily (ArteraAI's Phase 3 trial data being a standout example). Most don't.

There's also the question of what happens after clearance. ML models can drift. Training data can become stale. Clinical populations can shift. The PCCP framework is a step toward addressing this, but it's still voluntary and only covers pre-specified changes. What about the unexpected ones?

## Where I think this is heading

Looking at this data, three trends feel inevitable:

The first: the non-radiology specialties are going to grow much faster over the next few years. Cardiology, neurology, pathology, and gastroenterology are where radiology was in 2018. The foundational work is being done now. The 510(k) predicates are being established. The flood of fast followers will come.

The second: consumer devices with FDA-cleared ML algorithms will blur the line between wellness products and medical devices in ways the regulatory framework isn't ready for. Apple's hypertension notification landed in a cardiovascular panel, cleared through 510(k), and shipped to millions of wrists within weeks. That's a fundamentally different distribution model than a PACS-integrated radiology tool used by 200 hospitals.

The third: the PCCP framework will become the de facto standard for any serious ML-based medical device submission. Companies that don't include a PCCP are essentially admitting they haven't thought about how their model will evolve. In a field where the technology improves monthly, that's a competitive disadvantage.

350 devices in 2025. The number will almost certainly be higher in 2026. The question isn't whether ML is becoming standard in medical devices. That's already decided. The question is whether our regulatory systems, our clinical validation standards, and our post-market surveillance infrastructure can keep pace with the rate at which these tools are entering clinical practice.

Based on what I've seen in the data, I'm not sure the answer is yes. But I'm glad someone is counting.
