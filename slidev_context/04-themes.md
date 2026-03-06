# Themes in Slidev

## Overview

Slidev themes provide a complete visual design system for your presentations, including layouts, styles, and components.

## Using Themes

### Setting a Theme

In your slide's frontmatter:

```md
---
theme: seriph
---
```

### Available Theme Sources

1. **Built-in themes**: Come with Slidev installation
2. **npm packages**: Install themes from npm
3. **Local themes**: Create custom themes in your project

## Installing Themes

### From npm

```bash
npm install slidev-theme-example
```

Then use in frontmatter:

```md
---
theme: example
---
```

## Theme Features

### Theme Configuration
Themes can provide:
- Custom layouts
- Color schemes
- Typography
- Components
- Styles

### Theme Addons
Additional functionality that can be installed alongside themes.

## Creating Custom Themes

### Writing Themes
Advanced users can create their own themes.

Resources:
- **Writing Themes Guide**: `/guide/write-theme`
- **Theme Gallery**: Browse existing themes at `/resources/theme-gallery`

### Eject Theme
Modify existing themes by "ejecting" them into your project:

```bash
slidev eject-theme
```

This copies the theme files to your project for customization.

## Theme Customization

### Override Theme Styles
Create `styles/index.css` in your project:

```css
/* Override theme variables */
:root {
  --slidev-theme-primary: #5b8c5a;
}

/* Override specific elements */
h1 {
  font-weight: 700;
}
```

### Extend Layouts
Create custom layouts in the `layouts/` directory to override or add to theme layouts.

## Theme Resources

### Theme Gallery
Browse community themes:
- Visit `/resources/theme-gallery`
- Preview themes
- Find installation instructions

### Theme Anatomy
A typical theme includes:
- `layouts/`: Layout components
- `components/`: Reusable components
- `styles/`: CSS files
- `setup/`: Setup scripts
- `package.json`: Theme metadata

## Popular Themes

Check the official theme gallery for:
- Official themes (seriph, default, etc.)
- Community themes
- Specialized themes for different use cases

## Best Practices

1. **Choose appropriate themes**: Select themes that match your content and audience
2. **Customize sparingly**: Don't override too much of the theme
3. **Test thoroughly**: Ensure custom changes work across all slides
4. **Share themes**: Publish useful themes for the community
5. **Version control**: Lock theme versions for consistency

## Reference
- Theme Guide: https://sli.dev/guide/theme-addon
- Writing Themes: https://sli.dev/guide/write-theme
- Theme Gallery: https://sli.dev/resources/theme-gallery
