# Clinically Robust Vision-Language Models for Diagnostic Reasoning

> **Binesh Kumar** — PhD student at University of New Haven  
> My research: Clinically robust vision-language models for diagnostic reasoning in radiology

## What I'm Working On

This website contains my research notes about making medical AI better. Right now, medical AI models have a big problem - they change their answers when you ask the same question in different ways. This is dangerous for patients.

My goal is to understand why this happens and fix it. I want to make AI that doctors can trust to help them make better decisions.

### Main Questions I'm Trying to Answer
1. **Why do models change answers?** - When you ask the same question differently, why does the AI give different answers?
2. **Where does the problem come from?** - Which parts of the AI cause these failures?
3. **How can we tell when AI is unsure?** - Can we make AI say "I don't know" when it should?
4. **How to use AI safely in hospitals?** - How can doctors use AI without missing important problems?
5. **Do fixes work everywhere?** - If I fix the problem, does it work on different types of medical images?

## 🚀 Where to Start

### New Here? Start With These:
- [[Dissertation/01-overview|What My Research is About]] — Simple overview of the problem and my approach
- [[Dissertation/02-introduction|Why This Matters]] — The problem with current medical AI models
- [[Dissertation/04-timeline-resources|When Things Happen]] — My research timeline and what I need
- [[Healthcare/01-medical-vision-language-models|Medical AI Models]] — Background on the AI I'm studying

## 📚 My Research Areas

### 🏗️ How AI Models Work
- [[Architecture/01-transformer-architecture|How AI Understands]] — The basic building blocks of modern AI
- [[Architecture/02-large-language-models|Large Language Models]] — How AI learns from text
- [[Architecture/03-vlm-basics|Vision + Language]] — How AI combines images and text
- [[Architecture/04-byte-pair-encoding|How AI Reads]] — How AI breaks down text into pieces
- [[Architecture/05-gemma-3-architecture|Modern AI Designs]] — Latest model architectures

### 🏥 Medical AI Applications
- [[Healthcare/02-medgemma|MedGemma]] — Google's medical AI model
- [[Healthcare/03-llava-rad|LLaVA-RAD]] — The main AI model I'm studying
- [[Healthcare/04-ehr-and-temporal-models|Patient Data Over Time]] — How AI tracks patient progress
- [[Healthcare/05-validation-and-datasets|Medical Datasets]] — Collections of medical questions and images
- [[Healthcare/01-medical-vision-language-models|Medical AI Overview]] — Different types of medical AI

### 🛡️ Making AI Safer
- [[Evaluation/02-paraphrase-robustness|Testing AI Consistency]] — How I measure if AI gives same answers
- [[Safety/02-selective-conformal-triage|Safe Hospital Use]] — How to use AI safely with patients
- [[Safety/01-mllmguard-framework|AI Protection System]] — Tools to keep AI safe

### 📊 Testing AI Models
- [[Evaluation/01-medphr-rad|MedPhr-Rad Tests]] — Testing how AI handles different question phrasings
- [[Evaluation/03-metrics-and-calibration|Confidence Measurement]] — How to tell when AI is sure or unsure
- [[Evaluation/04-helm-framework|Complete AI Testing]] — Testing everything about AI models
- [[Evaluation/05-pretraining-comparison|Comparing AI Models]] — Which models work better for medical tasks
 - [[Attacks/index|Adversarial Robustness]] — How I test worst-case attacks

## 🔬 What I'm Working on Right Now

### My Current Projects

1. **Measuring the Problem (Phase 1)**
   - Finding how often AI changes answers (want to go from >20% to <5%)
   - Checking if AI looks at same image parts when answers change
   - Making a dataset with different ways to ask same questions
   - Testing LLaVA-Rad and MedGemma models

2. **Finding Why It Happens (Phase 2)**
   - Understanding the chain: different question → AI attention → wrong answer
   - Testing what happens when I change specific parts of the AI
   - Finding which types of questions cause problems
   - Measuring exactly how much each part contributes

3. **Fixing the Problem (Phase 3)**
   - Teaching AI to be more confident about what it knows
   - Training AI to say "I don't know" when unsure
   - Making AI give consistent answers across question variations
   - Goal: 95% accuracy while saying "I don't know" 5-10% of the time

4. **Making It Safe for Hospitals (Phase 4)**
   - Setting confidence levels for when AI should handle cases alone
   - Making sure AI never misses serious medical problems (near 100% detection)
   - Reducing doctor workload by 30-40% on normal cases
   - Detecting when images are too different from training data

## 🛠️ What I'm Using

### AI Models I'm Testing
- **[[Healthcare/03-llava-rad|LLaVA-RAD]]**: My main focus - medical AI that can read X-rays
- **[[Healthcare/02-medgemma|MedGemma]]**: Google's medical AI for comparison  
- **GPT-5**: Best commercial AI to compare against
- **LLaVA-Med**: Basic medical AI model
- **BiomedCLIP**: AI trained specifically on medical data

### Medical Image Collections
- **MIMIC-CXR**: Large collection of chest X-rays with reports
- **VQA-RAD**: Questions and answers about medical images
- **NEJM Image Challenge**: Hard medical cases from famous journal
- **Radiology Paraphrase QA**: New dataset I'm creating with multiple ways to ask questions

### How I Measure Success
- **Flip-Rate**: How often answers change (currently >20%, want <5%)
- **Attention Consistency**: Whether AI looks at same image parts consistently
- **Calibration**: How well AI confidence matches actual accuracy
- **Triage Sensitivity**: Finding serious problems (want ~100%)
- **Workload Reduction**: How much work AI can take off doctors (want 30-40%)
- **Generalization**: Whether improvements work on new datasets

## 📈 What I Hope to Achieve

- **Better consistency**: AI changes answers less than 5% of the time (vs >20% now)
- **Understanding causes**: Clear proof of which AI parts cause problems
- **Smart confidence**: 95% accuracy when AI is confident, says "I don't know" 5-10% of time  
- **Hospital efficiency**: Help doctors handle 30-40% more cases without missing serious problems
- **Broader impact**: Show that fixes work on different types of medical images
- **Open tools**: Share all my tools so other researchers can use and improve them

## 🤝 Want to Collaborate?

I'm interested in working with others on:
- Testing how reliable medical AI models are
- Understanding what AI "looks at" in medical images
- Making AI safer for hospital use
- Building better medical image datasets
- Validating AI with real doctors and patients

You can contact me through my university or the SAIL Lab.

---

### Quick Links to Main Sections
- [[Evaluation/index|How I Test AI]] — My methods for evaluating medical AI
- [[Healthcare/index|Medical AI Models]] — The AI systems I study
- [[Architecture/index|How AI Works]] — Technical background
- [[Safety/index|Keeping AI Safe]] — Safety frameworks and approaches
- [[Dissertation/index|My Dissertation]] — Main research documents

### Additional Notes
- [[additional-notes|Additional Notes & Archived Plans]] — Older terminology (FSF/EFG), early robustness gauntlet plan, and other background material that informed the current proposal

### Old Content (Archive)
- [[archive/old-structures/PhD-Plan|Previous Research Plan]] — Earlier framework (VSF-Med-VQA)
- [[archive/old-structures/About|Old About Page]] — Previous version
- [[archive/old-structures/medphr-rad-original|Original Paraphrase Focus]] — Earlier work
