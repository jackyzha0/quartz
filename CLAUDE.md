# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Hugo static site using the hugo-xmin theme, deployed to `thedatasense.com` via GitHub Pages. It contains a blog with posts on AI/ML research and a PhD research overview page.

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
- Deploys to GitHub Pages with custom domain `thedatasense.com`

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
