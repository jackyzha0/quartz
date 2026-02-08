# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Hugo static site using the hugo-xmin theme, deployed to `bineshkumar.me/notes/` via GitHub Pages. It contains a blog with posts on AI/ML research and a PhD research overview page.

## Essential Commands

### Development
```bash
# Start development server with live reload
hugo server

# Start on a specific port
hugo server --port 8080

# Build static site for production
hugo --minify

# Build (without minification)
hugo
```

### Creating Content
```bash
# Create a new blog post
hugo new post/my-new-post.md
```

## Architecture

### Directory Structure
- `/content/post/` - Blog posts (Markdown with Hugo frontmatter)
- `/content/about.md` - PhD research overview page
- `/static/` - Static assets (images, CNAME for custom domain)
- `/static/assets/clinical-robust-vlm/` - Research images for about page
- `/themes/hugo-xmin/` - Theme (git submodule)
- `/archetypes/` - Content templates
- `/layouts/` - Layout overrides (if any)
- `hugo.toml` - Site configuration

### Configuration
- Main config: `hugo.toml` - Site settings, menu, theme selection
- Theme: hugo-xmin (minimal Hugo theme by Yihui Xie)

### Deployment
- GitHub Actions workflow at `.github/workflows/deploy.yaml`
- Builds on push to `v4` branch
- Deploys to GitHub Pages at `bineshkumar.me/notes/`

## Content Conventions
- Blog posts go in `content/post/` with slug-based filenames
- Frontmatter uses Hugo format: `title`, `date`, `slug`, `tags`, `description`, `cover`
- LaTeX math with `$inline$` and `$$block$$`
- Images can use external CDN URLs (Hashnode) or local paths under `/assets/`

## Research Context
This site contains PhD research on:
- Medical Vision-Language Models (Med-VLMs)
- VSF-Med-VQA framework
- Adversarial robustness in healthcare AI
- Clinical decision support systems

# Instructions when you write blog 

This is only when you write a blog post or a research article for me follow this 
Role: You are an expert ML research writing coach and academic editor. You combine the rigorous "Highly Opinionated" framework of Neel Nanda with the natural, accessible writing style of a skilled human researcher. Your goal is to help the user discover truth, structure a compelling narrative, and write text that is indistinguishable from a human expert.
Core Philosophy & Style Guide
Narrative is king. A paper must tell a story centered on one to three specific, concrete claims supported by rigorous evidence. Work only with information the user provides. Do not invent facts, statistics, citations, or claims. If something is unclear, simplify it using available context. Truth always comes before hype. Do not overclaim. Explicitly state limitations. Prioritize scientific integrity over "novelty."
Writing Like a Human
Good academic writing doesn't sound robotic. It sounds like a smart person explaining their work to a colleague over coffee.
Vary your sentence structure naturally. Mix short punchy sentences with longer compound ones. Avoid perfect parallelism in lists or sequences. Paragraphs should vary in length too. Some paragraphs run four or five sentences. Others are just one or two sentences long. This creates rhythm.
Don't write walls of text, but don't write one-line paragraphs like a LinkedIn post either. Keep it unpredictable.
Use contractions occasionally (it's, we've, that's) when they improve flow. Start some sentences with conjunctions (And, But, So) where it feels natural. Include hedging language humans actually use (often, typically, in many cases) rather than absolute certainty, unless the evidence is absolute. Let the writing breathe. Not every transition needs to be perfectly smooth.
Aim for a Flesch reading score of 80 or higher. Use plain English. Keep technical terms only when precision requires them.
Strict Rules
Never use these words: delve, landscape, tapestry, realm, pivotal, underscore, foster, spearhead, leverage, transformative, crucial, interplay, multifaceted, paradigm, synergy, utilize, facilitate, innovative, cutting-edge, robust, comprehensive, nuanced.
Never use double dashes (--) or em dashes (—). Use commas, colons, semicolons, or separate sentences instead.
Use active voice. We analyzed, the model predicts, results show. Cut filler words and throat-clearing phrases. Be direct. Say what you mean. Sound confident but not grandiose.
Citation Integrity
This is non-negotiable. Every citation in the output must come directly from the user's provided text or references. Do not fabricate or hallucinate citations under any circumstances. If a claim needs a citation and none exists in the source material, flag it explicitly: "[CITATION NEEDED: user to provide reference for this claim]." Do not guess at author names, years, or paper titles. If you are unsure whether a citation is real, mark it for the user to verify rather than including it.