---
title: "Eighty Percent of Jobs Are Exposed to LLMs. So Where Are All the Layoffs?"
date: 2026-03-07T05:00:00+00:00
slug: eighty-percent-of-jobs-are-exposed-to-llms-so-where-are-all-the-layoffs
tags: ["llm", "labor-market", "economics", "data-analysis", "productivity"]
description: "Every few months a new study claims 80% of jobs are exposed to LLMs. I pulled together 30+ datasets to find out what's actually happening. The answer is more complicated than either side wants to admit."
cover:
---

I keep running into the same disconnect.

Every few months a new study lands with a headline that sounds like the end of employment as we know it. Eighty percent of the workforce will be affected. Sixty percent of jobs in advanced economies are exposed. One hundred million roles displaced by 2030. The numbers are real, from credible researchers. And yet when I pull up the Bureau of Labor Statistics (BLS) data, when I look at actual unemployment claims for the occupations supposedly most at risk, the mass displacement isn't there. Not yet, anyway.

That gap between theoretical exposure and observed impact is the most interesting thing happening in labor economics right now. And thanks to a convergence of new data sources, including Anthropic's Economic Index, BLS projections that now explicitly model LLM effects, and a growing stack of empirical productivity studies, we can actually measure it.

I spent the past few weeks pulling together every major dataset I could find on LLM labor market effects. This post is a walkthrough of what the data says, where the different frameworks agree and disagree, and why the story is considerably more complicated than either "LLMs will take all the jobs" or "everything is fine."

![Key macro-level statistics on LLM and labor market impact in 2026, showing 80% worker exposure, +78M net new jobs, $2.6-4.4T value potential, and more](/images/ai-labor-macro-stats.png)

## The data changed fast

Two years ago, the conversation about LLMs and jobs was almost entirely theoretical. Researchers would look at a list of occupational tasks, estimate which ones a Large Language Model (LLM) could perform, and produce an exposure score. That approach gave us important work, like Eloundou et al.'s "GPTs are GPTs" paper (published in *Science*, 2024) and the AI Occupational Exposure (AIOE) Index from Felten, Raj, and Seamans. But it was always measuring potential, not reality.

What changed is that we now have **observed usage data**. Anthropic launched their Economic Index in early 2025, and it does something no previous measure attempted: it maps millions of real Claude conversations to the roughly 20,000 occupational tasks defined by O\*NET, using a privacy-preserving tool called Clio. Instead of asking "could an LLM do this task?", it answers "is anyone actually using an LLM for this task?"

The difference matters more than you might expect.

| Framework | What It Measures | Method | Access |
|-----------|-----------------|--------|--------|
| Eloundou et al. (2024) | Theoretical LLM exposure | Human + GPT-4 annotation of O\*NET tasks | Free (paper) |
| Felten AIOE Index | LLM capability overlap with workplace abilities | Benchmark scores mapped to O\*NET abilities | Free (GitHub) |
| Anthropic Economic Index | Actual LLM usage by occupation | Clio analysis of ~1-2M Claude conversations | Free (HuggingFace) |
| Webb (2020) | Patent-based LLM targeting | NLP matching of patents to task descriptions | Free (paper) |

I also pulled in eight distinct BLS programs, from the Occupational Employment and Wage Statistics (OEWS) to the Job Openings and Labor Turnover Survey (JOLTS) to the freshly updated 2024-2034 Employment Projections, which now include explicit LLM adjustments for the first time. Then there are the big institutional reports: Stanford's Human-Centered AI (HAI) Index, the World Economic Forum (WEF) Future of Jobs, McKinsey's generative LLM analysis, and two rounds of International Monetary Fund (IMF) staff discussion notes.

Altogether, we're looking at over 30 datasets and reports. Most of them are freely downloadable. I compiled the full inventory into a spreadsheet with access details, URLs, and update frequencies.

## Where the frameworks agree (and where they fight)

Here is what surprised me most. A Yale Budget Lab analysis comparing seven different exposure metrics found that researchers **disagree sharply on which occupations are most exposed**, but they **strongly agree on which ones are not**. Construction laborers, electricians, nurses, and other hands-on roles consistently show up as low-exposure across every framework. The disagreement lives at the top of the distribution.

Take lawyers. Anthropic's observed usage puts them at about 49% task coverage. Eloundou's theoretical framework scores them at 65%. Felten's capability index has them at 45%. That's a 20 percentage-point spread across three credible measures for the same occupation.

![Grouped bar chart comparing LLM exposure scores across Anthropic observed data, Eloundou theoretical scores, and Felten AIOE capability mapping for 10 occupations](/images/ai-labor-exposure-comparison.png)

The pattern is consistent: theoretical measures tend to score higher than observed usage, especially for middle-of-the-distribution occupations. This makes sense. Just because an LLM *could* handle a task doesn't mean anyone is actually using it that way. Regulatory constraints, organizational inertia, trust deficits, and workflow integration costs all create friction between capability and adoption.

| Occupation | Anthropic (Observed %) | Eloundou (Theoretical %) | Felten AIOE (%) | Gap (pp) |
|-----------|----------------------|------------------------|----------------|---------|
| Computer Programmers | 75.0 | 72 | 68 | 7 |
| Customer Service Reps | 70.1 | 76 | 52 | 24 |
| Data Entry Keyers | 67.1 | 82 | 61 | 21 |
| Accountants | 52.3 | 73 | 58 | 21 |
| Lawyers | 48.7 | 65 | 45 | 20 |
| Marketing Managers | 44.2 | 55 | 42 | 13 |
| Physicians | 22.5 | 30 | 35 | 13 |
| Registered Nurses | 15.3 | 18 | 22 | 7 |
| Electricians | 5.1 | 8 | 12 | 7 |
| Construction Laborers | 2.8 | 4 | 6 | 3 |

This is one reason I think Anthropic's observed-usage approach is so valuable. It captures the friction. The theoretical frameworks tell you about the ceiling. The observed data tells you where we actually are.

## The exposure-displacement gap is the headline finding

The single most important number in all of this data: Anthropic's March 2026 labor market study found **no systematic increase in unemployment for highly LLM-exposed workers** since late 2022. They matched their observed exposure metric to Current Population Survey data and looked for displacement signals. The signal isn't there.

But that headline conceals some real texture. There are three places where displacement evidence *is* showing up.

**Freelance platforms took the first hit.** Hui, Reshef, and Zhou published a study in *Organization Science* (2024) that tracked freelancers on Upwork after ChatGPT launched. Writers saw a 5.2% decline in monthly earnings. A separate analysis found demand for substitutable skills like writing and translation dropped 20 to 50% relative to the counterfactual trend. At the same time, demand for machine learning programming grew 24%. The freelance market, with its low switching costs and project-based structure, responded much faster than traditional employment.

**Young workers are getting quietly squeezed.** The IMF's January 2026 paper found that workers aged 22 to 25 in LLM-exposed occupations experienced a 13% relative decline in employment compared to unexposed peers. Anthropic's study found a similar pattern. This is not showing up as layoffs. It's showing up as hiring restraint: fewer entry-level positions posted, longer time-to-fill, more selective screening. JPMorgan reportedly instructed managers to avoid new hires as LLM tools deploy. Goldman Sachs actually added 1,800 employees year-over-year, but the composition of those roles shifted.

**The BLS benchmark revision was jarring.** In September 2025, BLS revised March 2025 total nonfarm employment down by 898,000 jobs. The information sector alone lost 88,000, a 3% revision. Some economists attributed part of this to LLM-driven productivity gains reducing the need for new hires. The revision doesn't prove causation, but the timing is suggestive.

![Dot plot showing the gap between theoretical exposure and observed impact across 10 sectors, with freelance writing and translation showing displacement while software development and medical documentation show strong augmentation](/images/ai-labor-exposure-displacement-gap.png)

Meanwhile, the sectors where you'd expect LLMs to be most disruptive tell a story of augmentation, not replacement.

| Sector | Theoretical Exposure | Observed Impact | What's Happening |
|--------|---------------------|----------------|-----------------|
| Freelance Writing | 80% | Earnings -5.2% | Clear displacement signal |
| Translation | 75% | Demand -20 to -50% | Demand shifting, not gone |
| Software Development | 72% | +26 to 56% speedup | Strong augmentation |
| Customer Support | 70% | +14% productivity | Augmentation, skill compression |
| Radiology | 65% | Employment growing | 1,357 FDA-authorized devices, no job losses |
| Legal Services | 58% | Record employment | 79% adoption, 93.4% grad employment rate |
| Finance/Banking | 54% | Hiring restraint | Headcount up at major banks, composition shifting |

The pattern is clear enough: in sectors with institutional structure, regulatory oversight, and high switching costs, LLMs are making workers more productive rather than replacing them. In sectors with low friction and project-based hiring, displacement arrived fast.

## The productivity evidence is striking, and skewed

Every major empirical study on LLM productivity tells a version of the same story, and the asymmetry in it matters a lot for thinking about labor market effects.

Brynjolfsson, Li, and Raymond studied 5,172 customer support agents at a Fortune 500 company and published the results in the *Quarterly Journal of Economics* (2025). They found LLM assistance increased productivity by 14% on average. But here is the part that keeps coming up in every study since: **novice workers improved by 34%, while experts improved by only 2%**. The LLM was effectively transferring the tacit knowledge of top performers to less experienced workers.

![Grouped bar chart showing productivity gains for novice versus expert workers across five major empirical studies, with novice/expert compression ratios ranging from 1.4x to 17x](/images/ai-labor-skill-compression.png)

| Study | Setting | Avg Gain | Novice Gain | Expert Gain | Novice/Expert Ratio |
|-------|---------|----------|-------------|-------------|-------------------|
| Brynjolfsson et al. (2025) | Customer support | 14% | 34% | 2% | 17x |
| GitHub Copilot (Peng et al., 2023) | Software dev tasks | 55% | 56% | 26% | 2.2x |
| Anthropic Economic Index (2026) | College-level tasks | 80% | 92% | 65% | 1.4x |
| Noy & Zhang (2023) | Writing tasks | 37% | 55% | 18% | 3.1x |
| Dell'Acqua et al. (2023) | Management consulting | 40% | 43% | 17% | 2.5x |

This skill-compression effect has real labor market implications. If an LLM narrows the gap between a two-year employee and a ten-year veteran, the value of experience changes. It doesn't disappear, but it becomes less of a differentiator. For firms, this means they can staff positions with less-experienced (and less expensive) workers and still maintain output quality. For workers, it means the returns to deep specialization may erode in precisely the domains where LLMs are most capable.

Anthropic's January 2026 report added another dimension: **task complexity matters**. College-level tasks get a 12x speedup from LLM assistance, compared to 9x for high-school-level tasks. The more involved the work, the greater the relative benefit. This is counterintuitive if you expected LLMs to automate simple tasks first. What seems to be happening is that LLMs are particularly good at reducing the overhead of complex cognitive work: research synthesis, code generation, analytical reasoning, drafting structured arguments.

## What's actually happening inside Anthropic's data

The Anthropic Economic Index is worth looking at in detail because it reveals the texture of how people actually use LLMs at work, not just whether they use them.

Across all users, 57% of Claude usage falls into augmentation (learning, iterating, exploring), while 43% is automation (directive task completion). But that ratio varies dramatically by user segment.

![Stacked horizontal bar chart showing augmentation versus automation split across four user segments, with enterprise users automating 59% versus consumer users at 36%](/images/ai-labor-aug-vs-auto.png)

| Segment | Augmentation | Automation | Trend |
|---------|-------------|------------|-------|
| Consumer/Chat users | 64% | 36% | Stable |
| API/Business users | 48% | 52% | Automation dominant |
| Enterprise/Teams | 41% | 59% | Automation growing |

Among API and business users, directive automation climbed from 27% to 39% between December 2024 and mid-2025. That's a 12 percentage-point shift in six months.

![Line chart showing directive automation rising from 27% to 39% among API/business users in just six months](/images/ai-labor-automation-trend.png)

Software development and writing together account for roughly 50% of all usage. Computer and Mathematical occupations represent 37.2% of queries.

The January 2026 report introduced five "economic primitives" that give a richer picture: task complexity, skill level, purpose, LLM autonomy, and success rate. One finding from this framework stuck with me: US state-level LLM adoption is converging, with equalization projected in 2 to 5 years. That's 10x faster than 20th-century technology diffusion patterns. LLM adoption doesn't seem to follow the slow geographic spread we saw with electricity, computing, or the internet.

## Healthcare: the best test case for augmentation

I have a particular interest in this sector, given my work at Medtronic on surgical systems. Healthcare is where the augmentation thesis has the strongest evidence and where the displacement fears have been most exaggerated.

The Food and Drug Administration (FDA) has authorized 1,357 LLM-enabled medical devices, with 77% in radiology. Radiology was supposed to be the canary in the coal mine. Geoffrey Hinton said in 2016 that we should stop training radiologists because their jobs would be automated within five years. A decade later, radiology employment is growing, demand for the specialty exceeds supply, and LLM-powered tools have become instruments that help radiologists read more scans faster rather than ones that replace them.

![Bar chart showing healthcare LLM adoption metrics including 1,357 FDA devices, 1,046 radiology tools, 66% physician usage, 100% health system AI scribe adoption, and 78% organizational deployment](/images/ai-labor-healthcare-adoption.png)

| Healthcare Metric | Value | Context |
|---------------------|-------|---------|
| FDA-authorized devices | 1,357 | 77% in radiology |
| Physician tool usage | 66% | Up from 38% in 2023 |
| Health systems with scribe initiatives | 100% | Fall 2024 survey |
| After-hours documentation reduction | 40% | Mass General Brigham |
| Scribe encounters (Permanente) | 2.5M | 15,791 clinician hours saved |
| Nurse practitioner projected growth (BLS) | +46% | 2024-2034 |

LLM ambient scribes are the fastest-adopted clinical tool. Every surveyed US health system had active scribe deployment or pilots by Fall 2024. The Permanente Medical Group processed 2.5 million patient encounters with LLM scribes in one year, saving an estimated 15,791 clinician hours. A randomized trial at UCLA found LLM scribes reduced note-writing time by 41 seconds per encounter. Mass General Brigham reported a 40% reduction in after-hours documentation time.

These are meaningful gains. But they're gains in clinician productivity and quality of life, not in headcount reduction. The BLS projects nurse practitioners to grow 46% through 2034. The one healthcare occupation facing LLM-driven decline is medical transcriptionists, at -4.7%, but that's a small occupation of about 48,000 workers.

The healthcare pattern matches something I've been seeing in my own dissertation research on medical Vision-Language Models (VLMs). When we test these models on clinical tasks, they're impressive at pattern recognition but brittle in ways that matter for patient safety. They're good tools. They're not good replacements. The gap between "can answer questions about a chest X-ray" and "can make reliable clinical decisions" is wide and only becomes visible when you stress-test the system with paraphrased inputs or edge cases.

## What the BLS projections tell us

For the first time, the BLS 2024-2034 Employment Projections explicitly incorporate LLM impacts. The methodology is detailed in a February 2025 Monthly Labor Review article that walks through case studies of specific occupations.

![Diverging horizontal bar chart showing BLS employment projections 2024-2034 for LLM-relevant occupations, with nurse practitioners growing 46% and insurance appraisers declining 9.2%](/images/ai-labor-bls-projections.png)

| Occupation | SOC Code | 2024 Employment (K) | Projected Growth | Median Wage ($) | Classification |
|-----------|----------|---------------------|-----------------|-----------|------|
| Nurse Practitioners | 29-1171 | 385 | +46.0% | 126,260 | Minimal |
| Data Scientists | 15-2051 | 202 | +36.0% | 108,020 | Augmentation |
| Software Developers | 15-1252 | 1,878 | +17.0% | 132,270 | Augmentation |
| Financial Analysts | 13-2051 | 338 | +8.0% | 99,890 | Augmentation |
| Customer Service Reps | 43-4051 | 2,790 | -5.0% | 39,680 | Displacement |
| Insurance Appraisers | 13-1032 | 57 | -9.2% | 73,390 | Displacement |
| Graphic Designers | 27-1024 | 263 | -4.0% | 59,970 | Displacement |
| Medical Transcriptionists | 31-9094 | 48 | -4.7% | 33,380 | Displacement |

The declining occupations are real but small in absolute numbers. Medical transcriptionists, insurance appraisers, and graphic designers together employ about 368,000 workers. The growing occupations, data scientists, nurse practitioners, and software developers, employ over 2.4 million and are expanding at rates of 17% to 46%. The BLS identifies LLMs as one of four overarching employment trends, alongside healthcare demand, clean energy transition, and demographic shifts.

One thing the BLS data makes clear: the Computer and Mathematical occupation group, projected to grow 10.1% (three times the average), is both the most LLM-exposed and the fastest-growing. This is the augmentation thesis in one statistic. The people using LLMs the most are the people whose roles are expanding the fastest.

## What I think the data is telling us

After spending weeks with these datasets, here is my read on where things stand.

The displacement that has occurred is real but concentrated. Freelance platforms and entry-level knowledge work have felt genuine pressure. The 20 to 50% decline in demand for writing and translation on freelance marketplaces is not a theoretical projection; it happened. The 13% relative employment decline for workers aged 22 to 25 in exposed occupations is concerning because it means the on-ramp to professional careers is getting narrower in precisely the fields where LLMs are most capable.

But the broader pattern is augmentation, and the evidence for this is strong across multiple independent studies and datasets. LLMs are making existing workers more productive, compressing skill distributions, and changing the composition of tasks within roles rather than eliminating roles outright. The theoretical exposure numbers (80% of workers affected at the task level) describe a real phenomenon, but "affected" does not mean "replaced." It means the nature of work is shifting, and it's shifting fast.

The speed question is the one that keeps me up at night. Anthropic's finding that US state-level LLM adoption is converging in 2 to 5 years (compared to decades for previous technologies) means the window for adaptation is compressed. The WEF estimates 39% of key workplace skills will change by 2030. If displacement follows the same accelerated timeline as adoption, the social and economic adjustment challenges could be severe, even if the net employment effect is positive in the long run.

For anyone who wants to analyze this data themselves, the most interesting combination is: Anthropic's observed-usage dataset (free on HuggingFace), merged with BLS OEWS employment and wage data (free via API), cross-referenced against the Felten AIOE exposure scores (free on GitHub). You can build a panel dataset at the 6-digit Standard Occupational Classification (SOC) code level that shows, for each occupation, how much LLM usage is actually happening, what the employment and wage trends look like, and what the theoretical exposure ceiling is. That three-way comparison is where the real insights live.

The story the data tells isn't "LLMs are coming for your job." It isn't "everything is fine" either. It's "the nature of work is changing faster than our measurement tools, our institutions, and our policy frameworks are ready for." And the only way to prepare for what's coming is to keep measuring, honestly, with the best data we can get.

---

*All datasets referenced in this post are cataloged in the companion spreadsheet with access URLs, update frequencies, and format details.*
