# Slidev Overview & Getting Started

## What is Slidev?

Slidev is a **web-based slides maker and presenter** designed for developers to create presentations using Markdown, leveraging web technologies like Vue.

## Creating Slides

### Online Option
- StackBlitz: [sli.dev/new](https://sli.dev/new)

### Local Setup
- **Requirements**: Node.js >=18.0
- **Package managers supported**: pnpm, npm, yarn, bun, deno

#### Installation Commands

```bash
# Using npm
npm init slidev@latest

# Using pnpm
pnpm create slidev

# Using yarn
yarn create slidev

# Using bun
bun create slidev

# Using deno
deno run -A npm:create-slidev@latest
```

## Basic Commands

| Command | Description |
|---------|-------------|
| `slidev` | Start dev server |
| `slidev export` | Export slides to PDF/PPTX/PNGs |
| `slidev build` | Build static web application |
| `slidev format` | Format slides |
| `slidev --help` | Show help message |

## Editor Setup

### Recommended Tools
- **VS Code Extension**: Official Slidev extension for VS Code
- **Integrated Editor**: Built-in editor within Slidev
- **Prettier Plugin**: For formatting slides

## Tech Stack

Slidev is built on top of modern web technologies:

- **Vite**: Fast build tool
- **Vue 3**: Progressive JavaScript framework
- **UnoCSS**: Instant on-demand atomic CSS engine
- **Shiki**: Syntax highlighter
- **Monaco Editor**: The code editor that powers VS Code
- **RecordRTC**: WebRTC recording
- **VueUse**: Collection of Vue Composition Utilities
- **Iconify**: Unified icon framework
- **Drauu**: Drawing library
- **KaTeX**: Math typesetting
- **Mermaid**: Diagram and flowchart tool

## Community & Support

- **Official Discord Server**: Join for discussions and help
- **GitHub**: Report bugs and contribute

## Reference Links
- Official Guide: https://sli.dev/guide/
- Documentation: https://sli.dev/
