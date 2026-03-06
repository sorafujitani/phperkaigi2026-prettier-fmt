# Customization in Slidev

## Overview

Slidev is **"fully customizable, from styling to tooling configurations"**. It provides granular control at both project and individual slide levels.

## Customization Levels

### 1. Project-Wide Configuration (Headmatter)

Configure entire project in the first slide's frontmatter:

```md
---
# Theme
theme: seriph
addons: []

# Presentation metadata
title: My Presentation
author: Your Name
keywords: slidev,presentation

# Export settings
download: true
exportFilename: my-slides

# Appearance
colorSchema: auto
fonts:
  sans: 'Roboto'
  serif: 'Roboto Slab'
  mono: 'Fira Code'

# Presenter mode
presenter: true
---

# First Slide
```

### 2. Per-Slide Configuration (Frontmatter)

Customize individual slides:

```md
---
layout: center
background: /bg.png
class: text-white
transition: slide-left
clicks: 3
hide: false
disabled: false
zoom: 1.5
---

# Slide Content
```

## Configuration Options

### Slides Deck Configs

Common project settings:

| Option | Type | Description |
|--------|------|-------------|
| `theme` | string | Theme name |
| `addons` | array | Addon packages |
| `title` | string | Presentation title |
| `author` | string | Author name |
| `keywords` | string | SEO keywords |
| `download` | boolean | Enable download |
| `exportFilename` | string | Export filename |
| `colorSchema` | string | 'auto', 'light', 'dark' |
| `presenter` | boolean | Enable presenter mode |
| `remoteAssets` | boolean | Download remote assets |

### Per-Slide Options

| Option | Type | Description |
|--------|------|-------------|
| `layout` | string | Slide layout |
| `background` | string | Background image/color |
| `class` | string | CSS classes |
| `transition` | string | Slide transition |
| `clicks` | number | Custom click count |
| `hide` | boolean | Hide from slide list |
| `disabled` | boolean | Disable slide |
| `zoom` | number | Zoom level |

## Advanced Configuration

### 1. Highlighter Configuration

Customize syntax highlighting:

```ts
// vite.config.ts
export default {
  slidev: {
    highlighter: {
      theme: 'github-dark',
      lineNumbers: true,
    }
  }
}
```

### 2. Vite Configuration

Extend Vite config in `vite.config.ts`:

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3030
  },
  // Other Vite options
})
```

### 3. Vue App Configuration

Customize Vue app in `setup/main.ts`:

```ts
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app, router }) => {
  // Vue app customizations
  app.use(MyPlugin)
})
```

### 4. UnoCSS Configuration

Create `uno.config.ts`:

```ts
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-main': 'bg-white dark:bg-gray-900',
  },
  theme: {
    colors: {
      primary: '#5b8c5a',
    }
  }
})
```

### 5. Code Runners

Configure code execution environments:

```ts
// setup/code-runners.ts
import { defineCodeRunnersSetup } from '@slidev/types'

export default defineCodeRunnersSetup(() => {
  return {
    async javascript(code, ctx) {
      // Custom JavaScript runner
    }
  }
})
```

### 6. Monaco Editor

Customize Monaco editor:

```ts
// setup/monaco.ts
import { defineMonacoSetup } from '@slidev/types'

export default defineMonacoSetup((monaco) => {
  // Monaco customizations
  monaco.languages.register({ id: 'custom-lang' })
})
```

### 7. KaTeX Configuration

Math rendering settings:

```ts
// vite.config.ts
export default {
  slidev: {
    katex: {
      strict: false,
      macros: {
        '\\RR': '\\mathbb{R}'
      }
    }
  }
}
```

### 8. Mermaid Configuration

Diagram settings:

```ts
// setup/mermaid.ts
import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
  return {
    theme: 'dark',
    themeVariables: {
      primaryColor: '#5b8c5a',
    }
  }
})
```

## File-Based Configuration

### Directory Structure

```
your-slidev/
  ├── components/       # Custom components
  ├── layouts/          # Custom layouts
  ├── public/           # Static assets
  ├── setup/            # Setup scripts
  │   ├── main.ts       # Vue app setup
  │   ├── monaco.ts     # Monaco setup
  │   ├── mermaid.ts    # Mermaid setup
  │   └── shiki.ts      # Shiki setup
  ├── styles/           # Custom styles
  │   └── index.css     # Main stylesheet
  ├── uno.config.ts     # UnoCSS config
  ├── vite.config.ts    # Vite config
  └── slides.md         # Slides
```

## Customizing Styles

### Global Styles

Create `styles/index.css`:

```css
/* Override theme variables */
:root {
  --slidev-theme-primary: #5b8c5a;
  --slidev-code-font-size: 14px;
}

/* Custom styles */
.my-custom-class {
  background: linear-gradient(45deg, #5b8c5a, #2d5a2d);
}
```

### UnoCSS Utilities

Use UnoCSS classes directly in slides:

```md
<div class="text-center text-5xl font-bold text-primary">
  Custom styled content
</div>
```

## Routes Configuration

Customize routing in `setup/routes.ts`:

```ts
import { defineRoutesSetup } from '@slidev/types'

export default defineRoutesSetup(() => {
  return {
    // Custom route handling
  }
})
```

## Shortcuts Configuration

Define custom keyboard shortcuts:

```ts
// setup/shortcuts.ts
import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((nav, base) => {
  return [
    ...base,
    {
      key: 'ctrl+enter',
      fn: () => nav.next(),
      name: 'Next Slide'
    }
  ]
})
```

## Context Menu Configuration

Customize right-click menu:

```ts
// setup/context-menu.ts
import { defineContextMenuSetup } from '@slidev/types'

export default defineContextMenuSetup(() => {
  return {
    // Custom menu items
  }
})
```

## Fonts Configuration

### Custom Fonts

```md
---
fonts:
  sans: 'Roboto'
  serif: 'Roboto Slab'
  mono: 'Fira Code'
  weights: '200,400,600,800'
  provider: 'google'
---
```

### Local Fonts

Place font files in `public/fonts/` and configure:

```css
/* styles/index.css */
@font-face {
  font-family: 'Custom Font';
  src: url('/fonts/custom.woff2');
}
```

## Pre-Parser Configuration

Customize Markdown preprocessing:

```ts
// setup/preparser.ts
import { definePreparserSetup } from '@slidev/types'

export default definePreparserSetup(() => {
  return {
    // Custom preprocessing
  }
})
```

## Best Practices

1. **Start minimal**: Only customize what you need
2. **Use conventions**: Follow Slidev's directory structure
3. **Test changes**: Ensure customizations don't break functionality
4. **Document customizations**: Comment your configuration
5. **Version control**: Track all configuration files
6. **Modular approach**: Separate concerns into different config files
7. **Theme first**: Use themes before heavy customization
8. **Gradual customization**: Build up complexity incrementally

## Philosophy

Slidev follows the principle of **"convention over configuration"**:
- Minimal setup required
- Smart defaults
- Easy to extend
- Flexible when needed

## Reference
- Custom Configuration: https://sli.dev/custom/
