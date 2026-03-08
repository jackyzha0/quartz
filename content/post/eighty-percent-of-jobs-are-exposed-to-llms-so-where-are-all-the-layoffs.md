---
title: "Exposed But Not Replaced: What 30 Datasets Say About LLMs and Jobs"
date: 2026-03-07T05:00:00+00:00
slug: exposed-but-not-replaced-what-30-datasets-say-about-llms-and-jobs
tags: ["llm", "labor-market", "economics", "data-analysis", "productivity", "big-tech"]
description: "Big tech cut 400,000 jobs in two years then hired for different roles. 80% of workers are exposed to LLMs. I pulled together 30+ datasets to find out what's actually happening."
cover:
---

I keep running into the same weird pattern.

Every few months, a new paper lands with a number that sounds huge. Sixty percent of jobs in advanced economies are exposed to Large Language Models (LLMs) ([Cazzaniga et al., IMF, 2024](https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379)). Eighty percent of workers will see at least some tasks affected ([Eloundou et al., *Science*, 2024](https://www.science.org/doi/10.1126/science.adj0998)). One hundred million roles displaced by 2030 ([WEF Future of Jobs Report, 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/)). These are not fringe estimates. They come from serious researchers and major institutions.

Then I go look at the actual labor market data. I pull up Bureau of Labor Statistics(BLS) series. I check employment by occupation. And the mass displacement just is not there. Not in the broad data, anyway.

That gap is the whole story. The theoretical exposure numbers describe a real phenomenon, but "affected" does not mean "replaced." Understanding the difference between those two words is what this entire post is about.

I spent 3 days pulling together more than 30 datasets. After sitting with all of it,my read is pretty simple. The exposure numbers are real. Some displacement is real too. But the broad pattern so far is not mass replacement. It is uneven adoption, skill compression, and a labor market that is changing faster than our usual measurement tools can keep up.

## Why do exposure headlines sound so apocalyptic?

Because until recently, we could only measure what LLMs *could* do, not what anyone was actually using them for. Eloundou et al.'s "GPTs are GPTs" paper and the [AI Occupational Exposure Index from Felten, Raj, and Seamans](https://github.com/AIOE-Data/AIOE) gave us important theoretical baselines. But they were always measuring potential, not reality.

What changed is that we now have **observed usage data**. [Anthropic's Economic Index](https://www.anthropic.com/research/the-anthropic-economic-index) maps millions of real Claude conversations to the roughly 20,000 occupational tasks defined by the Occupational Information Network (O\*NET). Instead of asking "could an LLM do this task?", it answers "is anyone actually using an LLM for this task?"

That difference turned out to be enormous. A [Yale Budget Lab analysis](https://budgetlab.yale.edu/) comparing seven exposure metrics found that researchers **disagree sharply on which occupations are most exposed**, but they **strongly agree on which ones are not**. Take lawyers: Anthropic's observed usage puts them at 49%, Eloundou's theoretical framework at 65%, Felten's capability index at 45%. A 20 percentage-point spread for the same occupation. Theoretical measures consistently score higher because they ignore the friction of actual adoption: regulatory constraints, organizational inertia, trust deficits, integration costs.

![Grouped bar chart comparing LLM exposure scores across Anthropic observed data, Eloundou theoretical scores, and Felten AIOE capability mapping for 10 occupations](/images/ai-labor-exposure-comparison.png)

## Where is the damage actually showing up?

[Anthropic's March 2026 labor market study](https://www.anthropic.com/research/labor-market-impacts) found **no systematic increase in unemployment for highly LLM-exposed workers** since late 2022. But that does not mean nothing is happening. The displacement is real, it is just concentrated in places that traditional labor statistics are slow to capture.

**Freelance platforms took the first hit.** [Hui, Reshef, and Zhou (*Organization Science*, 2024)](https://pubsonline.informs.org/doi/10.1287/orsc.2023.17944) tracked freelancers on Upwork after ChatGPT launched. Writers saw a 5.2% decline in monthly earnings. Demand for writing and translation dropped 20 to 50% relative to the counterfactual trend. The freelance market, with its low switching costs and project-based structure, responded much faster than traditional employment.

**Young workers are getting quietly squeezed.** The [IMF's January 2026 update](https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379) found that workers aged 22 to 25 in LLM-exposed occupations experienced a 13% relative decline in employment compared to unexposed peers. This is not showing up as layoffs, its showing up as hiring restraint: fewer entry-level positions posted, longer time-to-fill, more selective screening. JPMorgan's Jamie Dimon [told shareholders in 2025](https://reports.jpmorganchase.com/investor-relations/2024/ar-ceo-letters.htm) that LLMs were already replacing certain human tasks, and the bank has been restraining headcount growth in exposed roles. Goldman Sachs added 1,800 employees year-over-year per their [2024 annual report](https://www.goldmansachs.com/investor-relations/), but the composition of roles shifted toward engineering and away from routine analysis.

**Big tech showed the pattern most visibly.** The tech industry cut over [260,000 jobs in 2023](https://layoffs.fyi/) and another [150,000 in 2024](https://layoffs.fyi/). Google, Meta, Amazon, Microsoft, they all ran major rounds. But here's the thing that rarely makes the headlines: most of these companies ended 2025 with more employees than they had at their post-layoff lows. Meta went from calling 2023 the "[Year of Efficiency](https://about.meta.com/media-gallery/metaearnings-q4-2022/)" and cutting over 20,000 roles to aggressively hiring for AI infrastructure through 2024 and 2025. Zuckerberg [told investors in January 2025](https://www.threads.net/@zuck/post/DExrJwkJ-nE) that LLMs would start replacing mid-level software engineers that year. Google's headcount dropped by about 12,000 in early 2023, then its DeepMind and AI divisions expanded steadily through 2025. Same pattern at Microsoft: layoffs in gaming and traditional software, growth in Copilot and Azure AI teams. The companies most aggressively deploying LLMs are not net shedding workers. They are reshuffling them. Firing in one department, hiring in another,same quarter, same building sometimes.

![Dual panel chart showing tech industry layoffs peaking at 264K in 2023, while Meta, Alphabet, and Microsoft headcounts recovered and grew past pre-layoff levels by 2025](/images/ai-labor-bigtech-headcount.png)

The common thread across all of these signals: displacement arrived first where switching costs are lowest. Freelancers can be replaced project by project. Entry-level hiring can be quietly reduced. Big tech can restructure fast because engineers are used to reorgs. But in sectors with regulatory oversight and employment contracts, LLMs are changing *what* people do, not *whether* they have jobs.

## Why are many high-exposure jobs still growing?

Every major empirical study on LLM productivity tells a version of same story. [Brynjolfsson, Li, and Raymond (*QJE*, 2025)](https://academic.oup.com/qje/article/140/2/1101/7890894) studied 5,172 customer support agents and found LLM assistance increased productivity by 14% on average. But **novice workers improved by 34%, while experts improved by only 2%**. The LLM was effectively transferring the tacit knowledge of top performers to less experienced workers. Every subsequent study found the same asymmetry.

![Grouped bar chart showing productivity gains for novice versus expert workers across five major empirical studies, with novice/expert compression ratios ranging from 1.4x to 17x](/images/ai-labor-skill-compression.png)

[Peng et al.'s GitHub Copilot RCT (2023)](https://arxiv.org/abs/2302.06590) found a 55% speedup with a 2.2x novice/expert ratio. [Noy and Zhang (*Science*, 2023)](https://www.science.org/doi/10.1126/science.adh2586) found a 37% gain in writing tasks at 3.1x. [Dell'Acqua et al.'s BCG study (2023)](https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7571.pdf) found 40% in management consulting at 2.5x. If an LLM narrows the gap between a two-year employee and a ten-year veteran, the value of experience doesn't disappear, but it becomes less of a differentiator. Firms can staff positions with less-experienced workers and still maintain output quality.

### Healthcare tells the augmentation story most clearly

The Food and Drug Administration (FDA) has authorized [1,357 AI/ML-enabled medical devices](https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices), with 77% in radiology. These are mostly machine learning and computer vision systems, not LLMs, but they're clearest test of whether ML tools displace clinical workers. Geoffrey Hinton said in 2016 we should stop training radiologists. A decade later, radiology employment is growing and ML-powered tools help radiologists read more scans faster rather than replace them. The [American Medical Association's 2024 survey](https://www.ama-assn.org/practice-management/digital/ama-digital-health-research) found physician tool usage at 66%, up from 38% in 2023. The Permanente Medical Group processed [2.5 million patient encounters with LLM scribes](https://permanente.org/) in one year, saving an estimated 15,791 clinician hours. The BLS projects nurse practitioners to grow 46% through 2034. The one healthcare occupation facing decline is medical transcriptionists, at -4.7%, but that's about 48,000 workers.

### The BLS projections confirm the split

For the first time, the [BLS 2024-2034 Employment Projections](https://www.bls.gov/emp/) explicitly incorporate LLM impacts. The declining occupations are real but small: medical transcriptionists, insurance appraisers, and graphic designers together employs about 368,000 workers. The growing occupations, data scientists, nurse practitioners, and software developers, employ over 2.4 million and are expanding at 17% to 46%. The Computer and Mathematical occupation group, projected to grow 10.1% (three times the average), is both the most LLM-exposed and the fastest-growing. That's the augmentation thesis in one statistic.

![Diverging horizontal bar chart showing BLS employment projections 2024-2034 for LLM-relevant occupations, with nurse practitioners growing 46% and insurance appraisers declining 9.2%](/images/ai-labor-bls-projections.png)

## What changed once we got observed usage data?

[Anthropic's Economic Index](https://www.anthropic.com/research/the-anthropic-economic-index) reveals the texture of how people actually use LLMs at work. Across all users, 57% of Claude usage is augmentation (learning, iterating, exploring), while 43% is automation (directive task completion). But enterprise and API users have flipped that ratio. Among API users, directive automation climbed from 27% to 39% between December 2024 and mid-2025: a 12 percentage-point shift in six months.

That trend is the one I keep staring at. The users with most economic leverage, the ones building LLMs into production workflows, are already past the augmentation-to-automation tipping point. The [September 2025 Economic Index update](https://www.anthropic.com/research/the-anthropic-economic-index) also found that US state-level adoption is converging in 2 to 5 years, which is 10x faster than 20th-century technology diffusion patterns.

## What I think is happening

The displacement that has occurred is real but concentrated. The 20 to 50% decline in freelance writing and translation demand is not a theoretical projection, it happened. The 13% relative employment decline for workers aged 22 to 25 is concerning because it means the on-ramp to professional careers is getting narrower in precisely the fields where LLMs are most capable.

But the broader pattern is augmentation. LLMs are making existing workers more productive, compressing skill distributions, and changing the composition of tasks within roles rather than eliminating roles outright. "Affected" does not mean "replaced." It means the nature of work is shifting, and it's shifting fast.

The speed question is the one that keeps me up at night. If displacement follows the same accelerated timeline as adoption (2 to 5 years for full geographic diffusion, versus decades for previous technologies), the adjustment challenges could be severe, even if the net employment effect is positive in the long run. The story the data tells isn't "LLMs are coming for your job." It isn't "everything is fine" either. It's "the nature of work is changing faster than our measurement tools, our institutions, and our policy frameworks are ready for."

---

*All datasets referenced in this post are cataloged in the [companion spreadsheet](/assets/ai_labor_impact_data.xlsx) with access URLs, update frequencies, and format details.*
