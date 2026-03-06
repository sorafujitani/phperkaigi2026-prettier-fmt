# Slidev Markdown Syntax

## Slide Structure

### Slide Separators
- Slides are separated by `---` on a new line
- Each `---` creates a new slide

```md
# Slide 1

Content for first slide

---

# Slide 2

Content for second slide
```

## Frontmatter Configuration

### Headmatter (First Slide)
The first slide can include a "headmatter" configuration block for project-wide settings:

```md
---
theme: seriph
title: Welcome to Slidev
download: true
---

# First Slide
```

### Per-Slide Frontmatter
Individual slides can have their own configuration:

```md
---
layout: center
background: /background-1.png
class: text-white
transition: slide-left
---

# Centered Slide with Background
```

## Key Syntax Features

### 1. Slide Separators
Use `---` to separate slides:

```md
# Slide 1

---

# Slide 2
```

### 2. Notes
Add presenter notes at the end of a slide using HTML comments:

```md
# Slide Title

Slide content

<!--
This is a presenter note.
It supports **Markdown** and basic formatting.
-->
```

### 3. Code Blocks
Standard Markdown code block syntax with syntax highlighting:

````md
```typescript
console.log('Hello, World!')
```
````

### 4. Mixing Content Types
You can mix Markdown, HTML, and Vue components:

```md
# My Slide

Regular **Markdown** content

<div class="custom-class">
  HTML content
</div>

<MyCustomComponent :prop="value" />
```

## Additional Supported Elements

### LaTeX
Mathematical expressions using LaTeX:

```md
$$
\frac{1}{2}
$$
```

### Diagrams
- **Mermaid** diagrams
- **PlantUML** diagrams

### Scoped CSS
Add custom styles to specific slides:

```md
---
# Slide with custom styles
---

<style scoped>
h1 {
  color: red;
}
</style>
```

### Importing External Slides
Import content from other slide files for better organization.

## Best Practices

1. **Keep slides simple**: Focus on one main idea per slide
2. **Use frontmatter**: Configure slide behavior and appearance
3. **Leverage components**: Reuse common elements across slides
4. **Add notes**: Help yourself during presentation with presenter notes
5. **Organize content**: Use imports for large presentations

## Reference
- Official Syntax Guide: https://sli.dev/guide/syntax
