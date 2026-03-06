# Layouts in Slidev

## Overview

Layouts define the structure and arrangement of content on slides. Slidev provides many built-in layouts, and themes can add more.

## Available Built-in Layouts

### 1. default
Basic layout for displaying content.

```md
---
layout: default
---

# Default Layout
Regular content
```

### 2. center
Displays content in the middle of the screen.

```md
---
layout: center
---

# Centered Content
```

### 3. cover
Used for presentation cover page.

```md
---
layout: cover
background: /cover-image.png
---

# Presentation Title
## Subtitle
```

### 4. end
Final page of the presentation.

```md
---
layout: end
---

# Thank You!
```

### 5. intro
Introduces the presentation.

```md
---
layout: intro
---

# Introduction
Brief overview
```

### 6. section
Marks a new presentation section.

```md
---
layout: section
---

# Section 2
New Topic
```

## Image Layouts

### 7. image
Shows an image as main page content.

```md
---
layout: image
image: /path/to/image.png
---
```

### 8. image-left
Image on left, content on right.

```md
---
layout: image-left
image: /path/to/image.png
---

# Content on Right
Description here
```

### 9. image-right
Image on right, content on left.

```md
---
layout: image-right
image: /path/to/image.png
---

# Content on Left
Description here
```

## IFrame Layouts

### 10. iframe
Web page as main page content.

```md
---
layout: iframe
url: https://example.com
---
```

### 11. iframe-left
Web page on left, content on right.

```md
---
layout: iframe-left
url: https://example.com
---

# Content on Right
```

### 12. iframe-right
Web page on right, content on left.

```md
---
layout: iframe-right
url: https://example.com
---

# Content on Left
```

## Content Layouts

### 13. two-cols
Splits page into two columns.

```md
---
layout: two-cols
---

# Left Column

Content for left column

::right::

# Right Column

Content for right column
```

### 14. two-cols-header
Header with two-column sections below.

```md
---
layout: two-cols-header
---

# Header

::left::
Left column content

::right::
Right column content
```

### 15. quote
Displays quotations prominently.

```md
---
layout: quote
---

# "Great quote here"
— Author Name
```

### 16. statement
Makes an affirmation as main content.

```md
---
layout: statement
---

# Bold Statement
```

### 17. fact
Prominently displays facts or data.

```md
---
layout: fact
---

# 95%
Success rate
```

### 18. full
Uses entire screen space.

```md
---
layout: full
---

Content uses full screen
```

### 19. none
Layout without any styling.

```md
---
layout: none
---

Completely custom styled content
```

## Using Layouts

### Setting Layout
Via frontmatter:

```md
---
layout: image-left
image: /my-image.png
class: my-custom-class
---

# Slide Content
```

### Layout Props
Pass configuration via frontmatter:

```md
---
layout: image-left
image: /path/to/image.png
backgroundSize: contain
class: text-white
---
```

## Custom Layouts

### Creating Custom Layouts

Create layout files in `layouts/` directory:

```
your-slidev/
  ├── layouts/
  │   └── my-layout.vue
  └── slides.md
```

**my-layout.vue:**
```vue
<template>
  <div class="my-layout">
    <slot />
  </div>
</template>

<style scoped>
.my-layout {
  /* Custom styles */
}
</style>
```

**Usage:**
```md
---
layout: my-layout
---

# My Custom Layout
```

## Layout Composition

### Slots
Some layouts support named slots:

```md
---
layout: two-cols
---

Default slot (left column)

::right::

Right column content
```

## Best Practices

1. **Choose appropriate layouts**: Match layout to content type
2. **Consistent usage**: Use similar layouts for similar content
3. **Don't overuse complex layouts**: Keep most slides simple
4. **Test responsiveness**: Ensure layouts work at different screen sizes
5. **Custom layouts for branding**: Create custom layouts for company presentations

## Theme Layouts

**Note:** Themes may provide additional layouts or override built-in ones. Check your theme's documentation for available layouts.

## Reference
- Built-in Layouts: https://sli.dev/builtin/layouts
