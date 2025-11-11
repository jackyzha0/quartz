# Dissertation Documents

> My PhD research on making medical vision-language models more robust and safe

[← Main Index](../Index.md)

---

## Research Planning Documents

### 📋 Core Documents
- [[01-overview|Overview]] — What my research is about and why it matters
- [[02-introduction|Introduction]] — The problem with current medical AI models
- [[01-proposal|Proposal]] — Formal research proposal with questions and methods  
- [[04-timeline-resources|Timeline & Resources]] — When things will happen and what I need
- [[06-publication-plan|Publication Plan]] — Papers I plan to submit and where

### 🎯 What I'm Working On

My research focuses on a big problem with medical AI models: they change their answers when you ask the same question in different ways. This is dangerous in hospitals because doctors need reliable AI assistance.

**Main Problems I'm Solving:**
- **Phrasing-Sensitive Failure** - models give different answers to the same question asked differently
- **Misleading Explanation Effect** - explanation metrics look better for wrong answers than correct ones
- **Safety Issues** - current evaluation doesn't catch these problems

### 📊 What I Will Deliver
1. **Measurement tools** to find these problems systematically
2. **Better models** that are more stable and reliable
3. **Safety framework** for using AI in hospitals safely
4. **Open-source toolkit** so others can use and improve my work
5. **Research papers** to share findings with the community

### 🗓️ When Things Happen
- **Now - March 2026**: Measure the problem and find causes
- **March - August 2026**: Build better models
- **May - October 2026**: Test safety in realistic scenarios
- **Throughout**: Write papers and share results

### 🎯 Target Models
- **LLaVA-Rad** - my main focus for testing improvements
- **MedGemma** - comparison model to see if findings generalize
- **Both models** work with chest X-rays and medical questions

## Related Resources
- [[../Evaluation/phrasing-robustness-framework|How I Measure Robustness]] — Technical details
- [[../Healthcare/03-llava-rad|LLaVA-RAD Model]] — Primary model under study
- [[../Healthcare/02-medgemma|MedGemma Model]] — Comparison model
- [[../Safety/02-selective-conformal-triage|Safety System]] — How to deploy safely