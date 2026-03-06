# Exporting Slides in Slidev

## Overview

Slidev offers multiple export options to share your presentations in various formats.

## Export Formats

1. **PDF** - Portable Document Format
2. **PPTX** - PowerPoint (exported as images)
3. **PNG** - Individual slide images
4. **Markdown** - Markdown format

## Export Methods

### Browser Exporter (Recommended)
Available since v0.50.0-beta.11

### CLI Command
```bash
slidev export
```

## Prerequisites

Install Playwright Chromium:

```bash
npm install -D playwright-chromium
```

Or with other package managers:

```bash
pnpm add -D playwright-chromium
yarn add -D playwright-chromium
```

## Export Commands

### Basic Export

```bash
# Export to PDF (default)
slidev export

# Export to PPTX
slidev export --format pptx

# Export to PNG
slidev export --format png

# Export to Markdown
slidev export --format md
```

### Export Options

#### Output File
```bash
slidev export --output my-presentation.pdf
```

#### Include Click Steps
Export slides with multiple click steps:

```bash
slidev export --with-clicks
```

#### Specific Slides
Export specific slides or ranges:

```bash
# Single slide
slidev export --range 5

# Range of slides
slidev export --range 1-10

# Multiple ranges
slidev export --range 1-5,10,15-20
```

#### Dark Mode
Export in dark mode:

```bash
slidev export --dark
```

#### Timeout
Adjust Playwright timeout (in milliseconds):

```bash
slidev export --timeout 60000
```

#### Wait Time
Add extra rendering delay (in milliseconds):

```bash
slidev export --wait 1000
```

#### PDF Outline/TOC
Generate PDF outline/table of contents:

```bash
slidev export --with-toc
```

#### Omit Background
Remove default browser background:

```bash
slidev export --omit-background
```

## Export Configuration

### Complete Example

```bash
slidev export \
  --format pdf \
  --output slides.pdf \
  --with-clicks \
  --dark \
  --with-toc \
  --wait 500 \
  --range 1-20
```

## Important Notes

### Limitations

1. **Interactive Features**: May not work in exported files
   - Vue component interactions
   - Real-time updates
   - Dynamic content

2. **Browser Dependency**: Best results with modern Chromium-based browsers

3. **Export Quality**: Some exports might require adjusting wait times or browser settings

### PPTX Export Note

PPTX exports are essentially images in PowerPoint format:
- Each slide is converted to an image
- No text editing in PowerPoint
- Good for sharing read-only presentations

## Troubleshooting

### Missing Content

If content is missing from exports:

```bash
slidev export --wait 1000
```

Increase wait time if necessary:

```bash
slidev export --wait 2000
```

### Broken Emojis

Install emoji fonts if emojis appear broken:

```bash
# On macOS/Linux
sudo apt-get install fonts-noto-color-emoji

# Or download and install emoji fonts manually
```

### Timeout Errors

Increase timeout for large presentations:

```bash
slidev export --timeout 120000
```

### Global Layer Issues

Check global layer context for potential export issues:
- Some global layers may not render correctly in exports
- Test exports to ensure all content appears

## Best Practices

1. **Test exports early**: Don't wait until the last minute
2. **Use --with-clicks**: If your presentation relies on click animations
3. **Check file size**: Large presentations may need timeout adjustments
4. **Preview before sharing**: Always review exported files
5. **Keep backups**: Save both source and exported versions
6. **Use appropriate formats**:
   - PDF: Best for sharing and printing
   - PPTX: When PowerPoint compatibility is needed
   - PNG: For individual slide images
   - Markdown: For editing or version control

## Browser Exporter

The browser-based exporter provides:
- Visual preview before export
- Better control over export process
- Real-time feedback

Access via UI when running `slidev` in dev mode.

## Advanced Export

### Custom Export Scripts

Create custom export workflows using Slidev's API and Playwright.

### Batch Exports

Export multiple presentations:

```bash
#!/bin/bash
for dir in */; do
  cd "$dir"
  slidev export --output "../exports/${dir%/}.pdf"
  cd ..
done
```

## Reference
- Official Export Guide: https://sli.dev/guide/exporting
