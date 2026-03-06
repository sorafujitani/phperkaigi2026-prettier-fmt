# Slidev Knowledge Base

This directory contains comprehensive documentation about Slidev, extracted from the official guide at https://sli.dev/guide/

## Files Overview

| File | Topic | Description |
|------|-------|-------------|
| `00-overview.md` | Getting Started | Installation, commands, tech stack |
| `01-why-slidev.md` | Why Slidev | Motivation, features, philosophy |
| `02-syntax.md` | Markdown Syntax | Slide structure, frontmatter, syntax |
| `03-animations.md` | Animations | Click animations, transitions, motion |
| `04-themes.md` | Themes | Using and creating themes |
| `05-components.md` | Components | Built-in and custom components |
| `06-layouts.md` | Layouts | Built-in layouts and custom layouts |
| `07-code-blocks.md` | Code Blocks | Syntax highlighting, Monaco editor |
| `08-exporting.md` | Exporting | PDF, PPTX, PNG exports |
| `09-hosting.md` | Hosting | Deployment to various platforms |
| `10-customization.md` | Customization | Configuration options |
| `11-ui.md` | User Interface | Navigation, presenter mode, controls |
| `12-directory-structure.md` | Directory Structure | Project organization |
| `13-vite-config.md` | Vite Configuration | Build tool configuration |
| `14-faq.md` | FAQ | Common questions and answers |
| `15-chrome-devtools-guide.md` | Chrome DevTools MCP | Browser debugging for Slidev development |

## Quick Reference

### Essential Commands

```bash
# Development
slidev

# Export to PDF
slidev export

# Build for production
slidev build

# Format slides
slidev format
```

### Common Slide Patterns

```md
---
layout: center
background: /bg.png
transition: slide-left
---

# Slide Title

<v-click>

Content appears on click

</v-click>
```

### Directory Structure

```
your-slidev/
  ├── components/       # Custom components
  ├── layouts/          # Custom layouts
  ├── public/           # Static assets
  ├── setup/            # Setup scripts
  ├── styles/           # Custom styles
  └── slides.md         # Main slides
```

## Key Concepts

### 1. Slides are Markdown
Write slides using enhanced Markdown with frontmatter configuration.

### 2. Vue Components
Use Vue components for interactivity and reusability.

### 3. Themes & Layouts
Choose from built-in themes/layouts or create custom ones.

### 4. Animations
Rich animation support with click-based progression.

### 5. Code Display
First-class code presentation with syntax highlighting.

### 6. Export & Host
Export to PDF/PPTX or host as static web app.

## Philosophy

Slidev follows these principles:

- **Developer-friendly**: Built for developers
- **Markdown-based**: Content in plain text
- **Web-powered**: Leverage modern web tech
- **Flexible**: Highly customizable
- **Portable**: Multiple export formats

## Learning Path

1. **Start** → `00-overview.md` - Installation and basics
2. **Understand** → `01-why-slidev.md` - Philosophy and features
3. **Write** → `02-syntax.md` - Markdown syntax
4. **Generate** → `../workflows/slide-generation.md` - Auto-generate slides from content MD
5. **Enhance** → `03-animations.md`, `05-components.md` - Add interactivity
6. **Style** → `04-themes.md`, `06-layouts.md` - Visual design
7. **Debug** → `15-chrome-devtools-guide.md` - Visual debugging and layout checks
8. **Share** → `08-exporting.md`, `09-hosting.md` - Export and deploy
9. **Customize** → `10-customization.md`, `13-vite-config.md` - Advanced config

## Common Tasks

### Create New Presentation

```bash
npm init slidev@latest
```

### Add Custom Component

1. Create `components/MyComponent.vue`
2. Use `<MyComponent />` in slides

### Change Theme

```md
---
theme: seriph
---
```

### Export to PDF

```bash
npm install -D playwright-chromium
slidev export
```

### Deploy to GitHub Pages

```bash
slidev build --base /repo-name/
# Push dist folder to gh-pages branch
```

## Resources

- **Official Site**: https://sli.dev/
- **Guide**: https://sli.dev/guide/
- **Components**: https://sli.dev/builtin/components
- **Layouts**: https://sli.dev/builtin/layouts
- **Themes**: https://sli.dev/resources/theme-gallery
- **GitHub**: https://github.com/slidevjs/slidev
- **Discord**: Official Discord server

## Tips

1. **Use presenter mode** (`p`) for professional presentations
2. **Add notes** with HTML comments for presenter view
3. **Test exports early** to ensure everything renders correctly
4. **Keep slides simple** - one main idea per slide
5. **Use components** for reusable content
6. **Leverage themes** before heavy customization
7. **Practice navigation** before presenting
8. **Debug visually** - Use Chrome DevTools MCP (`15-chrome-devtools-guide.md`) for layout issues
9. **Avoid `min-height: 100vh`** in Slidev - Use `height: 100%` instead
10. **Prefer Flexbox over `position: absolute`** for better layout control

## Last Updated

Knowledge extracted from: https://sli.dev/guide/ (2025)

## Contributing

To update this knowledge base:

1. Visit latest docs at https://sli.dev/
2. Update relevant markdown files
3. Keep structure consistent
4. Update this README if adding new files
