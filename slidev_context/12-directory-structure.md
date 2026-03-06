# Directory Structure in Slidev

## Overview

Slidev uses **conventions over configuration** to minimize setup complexity while providing flexible, intuitive extensions.

## Standard Directory Structure

```
your-slidev/
  ├── components/       # Custom Vue components
  ├── layouts/          # Custom slide layouts
  ├── public/           # Static assets
  ├── setup/            # Custom setup / hooks
  ├── snippets/         # Code snippets
  ├── styles/           # Custom styles
  ├── index.html        # HTML injections
  ├── slides.md         # Main slides file
  ├── uno.config.ts     # UnoCSS configuration
  └── vite.config.ts    # Vite configuration
```

## Directory Details

### `components/`
**Purpose**: Custom Vue components

**Supported file types**:
- `.vue`
- `.js` / `.ts`
- `.jsx` / `.tsx`
- `.md`

**Features**:
- Auto-imported globally
- Available in all slides
- No manual import needed

**Example**:
```
components/
  ├── Counter.vue
  ├── Chart.ts
  └── CustomButton.vue
```

**Usage in slides**:
```md
<Counter />
<CustomButton label="Click me" />
```

### `layouts/`
**Purpose**: Custom slide layouts

**Supported file types**:
- `.vue`
- `.js` / `.ts`
- `.jsx` / `.tsx`

**Features**:
- Override theme layouts
- Create new layouts
- Auto-registered

**Example**:
```
layouts/
  ├── my-layout.vue
  ├── two-cols-custom.vue
  └── cover-special.vue
```

**Usage**:
```md
---
layout: my-layout
---

# Slide with custom layout
```

### `public/`
**Purpose**: Static assets

**Features**:
- Served at root path
- Directly accessible
- Not processed by Vite

**Example**:
```
public/
  ├── images/
  │   ├── logo.png
  │   └── avatar.jpg
  ├── fonts/
  │   └── custom.woff2
  └── data/
      └── config.json
```

**Usage**:
```md
![Logo](/images/logo.png)

<img src="/images/avatar.jpg" alt="Avatar">
```

**Important**: Always use absolute paths from root (`/`) for public assets.

### `setup/`
**Purpose**: Custom setup and hooks

**Available setup files**:
- `main.ts` - Vue app setup
- `monaco.ts` - Monaco editor configuration
- `mermaid.ts` - Mermaid configuration
- `shiki.ts` - Shiki highlighter configuration
- `vite-plugins.ts` - Custom Vite plugins
- `code-runners.ts` - Code execution environments
- `shortcuts.ts` - Keyboard shortcuts
- `routes.ts` - Custom routing

**Example**:
```
setup/
  ├── main.ts
  ├── monaco.ts
  └── shortcuts.ts
```

**main.ts example**:
```ts
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app, router }) => {
  // Vue app customizations
  app.use(MyPlugin)
})
```

### `snippets/`
**Purpose**: Code snippets for import

**Features**:
- Organize code examples
- Import into slides
- Keep slides.md clean

**Example**:
```
snippets/
  ├── example.ts
  ├── demo.py
  └── config.json
```

**Usage in slides**:
````md
```ts
<<< @/snippets/example.ts
```

```ts
<<< @/snippets/example.ts#L10-L20
```
````

### `styles/`
**Purpose**: Custom CSS styles

**Supported**:
- CSS
- PostCSS
- UnoCSS

**Example**:
```
styles/
  ├── index.css
  ├── variables.css
  └── custom.css
```

**Main stylesheet** (`styles/index.css`):
```css
/* Override theme variables */
:root {
  --slidev-theme-primary: #5b8c5a;
}

/* Custom styles */
.custom-class {
  background: linear-gradient(45deg, #5b8c5a, #2d5a2d);
}
```

**Auto-loading**: `styles/index.css` is automatically loaded.

### `slides.md`
**Purpose**: Main slides entry file

**Features**:
- Contains all slide content
- First slide has headmatter
- Slides separated by `---`

**Can be renamed**:
```bash
slidev my-slides.md
```

### `index.html`
**Purpose**: Inject custom HTML

**Use cases**:
- Add meta tags
- Include external scripts
- Custom head content

**Example**:
```html
<head>
  <meta property="og:title" content="My Presentation" />
  <link rel="icon" href="/favicon.ico" />
  <script src="https://example.com/analytics.js"></script>
</head>
```

### `vite.config.ts`
**Purpose**: Extend Vite configuration

**Example**:
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3030
  },
  slidev: {
    vue: {
      /* vue options */
    }
  }
})
```

### `uno.config.ts`
**Purpose**: UnoCSS configuration

**Example**:
```ts
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': 'px-4 py-2 rounded bg-primary text-white',
  },
  theme: {
    colors: {
      primary: '#5b8c5a',
    }
  }
})
```

## Optional Directories

**All directories are optional**. Create only what you need:

- No custom components? Skip `components/`
- Using theme layouts only? Skip `layouts/`
- No custom setup? Skip `setup/`
- etc.

## Best Practices

### 1. Organization
```
your-slidev/
  ├── components/
  │   ├── ui/           # UI components
  │   ├── charts/       # Chart components
  │   └── diagrams/     # Diagram components
  ├── layouts/
  │   ├── custom/       # Custom layouts
  │   └── overrides/    # Theme overrides
  └── public/
      ├── images/
      ├── fonts/
      └── data/
```

### 2. Naming Conventions
- Use PascalCase for components: `MyComponent.vue`
- Use kebab-case for layouts: `my-layout.vue`
- Use lowercase for public assets: `logo.png`

### 3. File Structure
- Keep related files together
- Use subdirectories for organization
- Maintain consistent structure

### 4. Asset Management
- Place images in `public/images/`
- Use descriptive filenames
- Optimize images before adding
- Consider using CDN for large assets

### 5. Code Splitting
- Split large components
- Use dynamic imports
- Lazy load heavy dependencies

## Multi-Presentation Projects

For multiple presentations:

```
project/
  ├── presentation-1/
  │   ├── slides.md
  │   └── components/
  ├── presentation-2/
  │   ├── slides.md
  │   └── components/
  └── shared/
      ├── components/
      └── layouts/
```

## Monorepo Structure

```
monorepo/
  ├── packages/
  │   ├── slides-common/
  │   │   ├── components/
  │   │   └── layouts/
  │   ├── presentation-a/
  │   │   └── slides.md
  │   └── presentation-b/
  │       └── slides.md
  └── package.json
```

## Philosophy

Slidev's directory structure follows these principles:

1. **Convention over configuration**: Smart defaults reduce setup
2. **Flexibility**: Override or extend as needed
3. **Intuitiveness**: Logical organization
4. **Minimal surface area**: Only configure what you need
5. **Extensibility**: Easy to extend and customize

## Reference
- Directory Structure Guide: https://sli.dev/custom/directory-structure
