# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Quartz v4 digital garden instance used for PhD research notes on Medical Vision-Language Model robustness. Quartz is a static site generator that transforms Markdown notes into an interconnected website.

## Essential Commands

### Development
```bash
# Start development server with live reload
npx quartz build --serve

# Build static site for production
npx quartz build

# Run with specific port
npx quartz build --serve --port 8080
```

### Code Quality
```bash
# Check TypeScript types and run Prettier
npm run check

# Auto-format code
npm run format

# Run tests
npm run test
```

## Architecture

### Core Structure
- `/quartz/` - Framework source code (TypeScript)
  - `/components/` - Preact UI components
  - `/plugins/` - Transformers, filters, and emitters for content processing
  - `/util/` - Utility functions and helpers
  - `/static/` - Static assets and scripts
- `/content/` - Markdown notes and research content
- `/docs/` - Framework documentation

### Content Processing Pipeline
1. **Transformers** - Process Markdown content (frontmatter, syntax highlighting, LaTeX, Obsidian syntax)
2. **Filters** - Filter content (e.g., remove drafts)
3. **Emitters** - Generate output files (HTML pages, RSS, sitemap, assets)

### Key Technologies
- **TypeScript** with Preact for UI components
- **esbuild** for fast bundling
- **remark/rehype** for Markdown processing
- **FlexSearch** for full-text search
- **KaTeX** for LaTeX math rendering
- **D3.js** for graph visualization

### Configuration
- Main config: `quartz.config.ts` - Site settings, theme, plugins
- Layout config: `quartz.layout.ts` - Page structure and component placement
- Plugin configurations are inline in `quartz.config.ts`

### Testing
- Uses Node.js built-in test runner
- Run individual tests: `tsx --test path/to/file.test.ts`
- Limited test coverage - mainly utility functions

## Content Features
- Obsidian-compatible wikilinks `[[Note Name]]`
- LaTeX math with `$inline$` and `$$block$$`
- Mermaid diagrams
- Callouts/admonitions
- Table of contents generation
- Backlinks and graph view
- Full-text search with FlexSearch

## Research Context
This instance contains PhD research on:
- Medical Vision-Language Models (Med-VLMs)
- VSF-Med-VQA framework
- Adversarial robustness in healthcare AI
- Clinical decision support systems
- MLLMGuard safety framework