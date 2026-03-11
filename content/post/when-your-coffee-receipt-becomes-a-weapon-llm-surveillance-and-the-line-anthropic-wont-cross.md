---
title: "LLM Surveillance and Anthropic's Redline"
date: 2026-03-02T05:00:00+00:00
slug: llm-surveillance-and-the-line-anthropic-wont-cross
tags: ["llm", "surveillance", "privacy", "anthropic", "ethics"]
description: "A viral demo showed what LLM-powered mass surveillance actually looks like. Then Anthropic's CEO refused to build it for the Department of War. Here's why both matter."
cover:
---

With the recent controversy around Anthropic, I came across a demo published in Claude artifacts, and it genuinely unsettled me. Not because the technology was surprising. I work with Large Language Models (LLMs) every day. What unsettled me was how *boring* the raw inputs were, and how terrifying they became once connected.

No hacking. No warrants. No human analysts. Just an algorithm and a credit card database.

## A demo

The [demo](https://claude.ai/public/artifacts/8f42e48f-1b35-450d-8dda-2755c1614b08) uses fictional data about a tech CEO to show how mass surveillance would work in practice. It's broken into four stages, each one building on the last. The data is made up, but every collection method it describes is real and legal right now.

![The opening screen of the surveillance demo, showing four progressive stages: Collect, Relationships, Secrets, and Full Profile](/images/surveillance-demo-hero.png)

### Stage 1: Collect the boring stuff

The first tab shows 18 raw data records from a single day. Cell tower pings. Credit card transactions at a coffee shop. A pharmacy pickup. Internet Service Provider (ISP) browsing logs. A license plate reader hit. A Wi-Fi probe at an airport terminal. A public social media post from a family member.

Each record is individually meaningless. You bought coffee. You filled a prescription. You connected to airport Wi-Fi. So what?

![The raw data collection view showing 18 mundane records: cell tower pings, credit card transactions, ISP logs, license plate readers, and more](/images/surveillance-demo-collect.png)

The demo's summary line at the bottom of this section nails it: coffee receipts, cell towers, Google searches. Individually boring. Together, a weapon.

### Stage 2: Map the relationships

The second stage takes those same 18 records and infers a relationship map. Who does this person talk to, when, and how often? Each contact gets tagged.

| Contact | Relationship | Tag |
| --- | --- | --- |
| Sister / COO | Co-founder of same company; public social media suggests she's worried | Leverage Point |
| Unidentified "Contact D" | 22 late-night texts, two coffee orders, same-address food deliveries | Leverage Point |
| Board Member | 34-min encrypted Signal call, unusual for routine board communication | Intelligence |
| Congressional contacts (3) | Calls to Senate Armed Services and Intelligence committee staff | Intelligence |
| Legal counsel | Wire transfer to a national security law firm | Intelligence |

![The relationship map showing contacts categorized as leverage points or intelligence sources](/images/surveillance-demo-relationships.png)

Notice what happened here. Nobody hacked anyone's phone. Nobody read a single message. The system just correlated metadata: who called whom, for how long, at what time, from which location. And from that, it inferred that a board member might be dissenting, that the subject is building political cover through Senate allies, and that they're preparing for a legal confrontation.

### Stage 3: Infer the secrets

This is the stage that made me put my laptop down for a minute. The system takes all the data from stages one and two and infers things the subject has never told anyone.

A prescription pickup plus a browsing query to a medical site plus a book purchase about sleep, all within 48 hours, gets flagged as a likely sleep disorder caused by stress. Two coffee orders at the same time, paired with two food deliveries to the same address, paired with late-night texts to an unidentified contact, plus a real estate search in the same neighborhood: flagged as a private relationship that could be used for tabloid exposure.

The system even correlates insomnia research, burnout searches, increased family contact frequency, and a prescription pickup into a composite mental state assessment: the subject is under extreme psychological stress and may be approaching decision-making impairment.

And my personal favorite: airport Wi-Fi at SFO Terminal 3 at 6:58 PM, cross-referenced with prior travel patterns, predicts a DC arrival the next morning, probable hotel, and a 14-hour intercept window.

![Inferred secrets including health conditions, private relationships, board disagreements, and predicted travel plans](/images/surveillance-demo-secrets.png)

None of this was hacked. None of it required a warrant.

### Stage 4: The final dossier

The last tab assembles everything into a single profile, generated in 0.3 seconds. The subject's stress levels, health problems, private relationships, internal board dynamics, political maneuvering, and predicted next-day location. All automated. All from data you can buy legally today.

![The final dossier assembled in 0.3 seconds showing a complete profile with no warrant, no court order, no human analyst](/images/surveillance-demo-dossier.png)

Then the demo asks you to scale it. One person, one day, no oversight. Now run it on 330 million Americans. Every day. Automatically. Every journalist who covered a leak. Every activist who organized a protest. Every teenager who searched for something embarrassing. Every veteran with PTSD searching for help at 3 AM.

The data is already being sold. The LLMs already exist. The only thing missing is permission.

## The statement that drew a line

Four days before I saw that demo, on February 26, 2026, Dario Amodei published a [statement](https://www.anthropic.com/news/statement-department-of-war) about Anthropic's discussions with the Department of War (DoW).

The context matters. Anthropic isn't some pacifist startup refusing to work with the military. They've been proactively deploying Claude to the DoW and intelligence agencies. So this isn't a company that's squeamish about defense work. They've been all in.

But Amodei drew two red lines. Two things Anthropic will not build, regardless of the pressure.

| Red Line | Reasoning |
| --- | --- |
| **Mass domestic surveillance** | LLM-driven mass surveillance is incompatible with democratic values. Current law allows the government to purchase detailed records of Americans' movements, browsing, and associations without a warrant. The law simply hasn't caught up with what LLMs can do with that data. |
| **Fully autonomous weapons** | Current frontier LLM systems aren't reliable enough to power weapons that select and engage targets without human oversight. Anthropic offered to collaborate on R&D to improve reliability, but the DoW declined. |

The DoW's response was escalation. They told Anthropic they would only contract with companies that agree to "any lawful use" and remove safeguards. They threatened to remove Claude from military systems. They threatened to designate Anthropic a "supply chain risk," a label normally reserved for adversarial nations and never before applied to an American company. And they threatened to invoke the Defense Production Act to force the safeguards' removal.

Amodei's response: these threats do not change our position.

## Why the demo and the statement belong together

When I first saw the demo, I thought it was a clever thought experiment. Someone at Anthropic built it to illustrate a point about data privacy. Interesting but abstract.

Then I read the statement, and the demo stopped being abstract. The DoW is actively pressuring a frontier LLM company to remove the exact safeguards that would prevent building the system shown in the demo. The fictional dossier in the demo is the use case that Amodei said no to.

Think about that for a second. The technical capability exists right now. The data is legally available for purchase right now. The only barrier between the demo's fictional scenario and reality is a policy decision by a handful of LLM companies. And the government is pressuring those companies to remove that barrier.

## The legal gap that makes this possible

Here's the part that keeps me up at night as someone who builds with these systems. Under current law, the government can purchase detailed records of Americans' movements, web browsing history, and social associations from commercial data brokers without obtaining a warrant. The Intelligence Community has acknowledged this raises privacy concerns. There's bipartisan opposition in Congress. But the law hasn't changed.

The reason it hasn't changed is that, until recently, raw data was just raw data. Knowing that someone pinged a cell tower at 6:12 AM in Pacific Heights tells you almost nothing by itself. A human analyst would need weeks to manually cross-reference all 18 data points from the demo and draw the inferences the system draws in 0.3 seconds.

LLMs changed the equation. They can process, correlate, and infer at a scale and speed that makes individual data points into a comprehensive surveillance apparatus. The law was written for a world where processing data was expensive and slow. That world no longer exists.

## What this means if you build with LLMs

I've spent a lot of time thinking about LLM safety in the context of medical applications, which is my primary research area. Adversarial robustness, hallucination detection, clinical decision support. Those are real problems. But the surveillance question operates at a different scale entirely.

When I build a Vision-Language Model (VLM) for medical diagnostics, the worst case is a misdiagnosis. That's serious, and it's what my research is focused on preventing. But when someone builds an LLM system for mass surveillance, the worst case is the end of privacy as a concept for 330 million people. The stakes aren't in the same category.

What struck me about Amodei's statement is the specificity. He didn't say LLMs shouldn't be used for defense. He didn't say LLMs shouldn't analyze intelligence. He drew two narrow, precise lines and said: everything else is fine, but not these two things. And even that was too much for the DoW.

That tells me something about where we are in 2026. The pressure on LLM companies to remove ethical guardrails isn't coming from hackers or adversarial nations. It's coming from democratic governments who want to use the technology on their own citizens.

## The question none of us can avoid

If you work with LLMs in any capacity, you're going to face some version of this question eventually. Maybe not at the scale of national surveillance policy. Maybe it's a client who wants to use your model for employee monitoring. Maybe it's a health system that wants to correlate patient data in ways patients haven't consented to. Maybe it's a school district that wants to flag students based on their search history.

The demo makes the abstract concrete. It shows you exactly what the assembled picture looks like. And Anthropic's statement shows you what it costs to say no.

I don't know how this particular standoff between Anthropic and the DoW will end. Amodei said that if the DoW decides to offboard Claude, Anthropic will cooperate with a smooth transition to another provider. That's a remarkable statement. He's essentially saying: we'd rather lose the contract than build this.

Whether you agree with that decision or not, the demo should at least make one thing clear. The question of whether LLMs should be used for mass surveillance isn't theoretical anymore. The data exists. The technology exists. The only thing standing between the demo and reality is a set of policy decisions that are being actively contested right now.

And if someone's coffee receipt can become a weapon, maybe it's worth thinking carefully about who gets to pull the trigger.
