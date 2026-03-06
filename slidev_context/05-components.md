# Built-in Components in Slidev

## Overview

Slidev provides a rich set of built-in components for creating interactive and engaging presentations.

## Core Components

### 1. Arrow
Draw arrows between specified coordinates.

```vue
<Arrow x1="10" y1="20" x2="100" y2="200" />
```

**Props:**
- `x1`, `y1`: Start coordinates (required)
- `x2`, `y2`: End coordinates (required)
- `width`: Line width
- `color`: Arrow color
- `two-way`: Bidirectional arrow

### 2. VDragArrow
Draggable version of Arrow component - position by dragging.

```vue
<VDragArrow />
```

### 3. AutoFitText
Automatically adjusts font size to fit content.

```vue
<AutoFitText :max="200" :min="100">
  Your text here
</AutoFitText>
```

**Props:**
- `max`: Maximum font size
- `min`: Minimum font size

### 4. LightOrDark
Display different content based on light/dark theme.

```vue
<LightOrDark>
  <template #dark>Dark theme content</template>
  <template #light>Light theme content</template>
</LightOrDark>
```

### 5. Link
Navigate to specific slides.

```vue
<Link to="5">Go to slide 5</Link>
<Link to="/intro">Go to intro slide</Link>
```

**Props:**
- `to`: Slide number or route (required)
- `title`: Optional link title

### 6. RenderWhen
Conditionally render content based on context.

```vue
<RenderWhen context="main">
  Only visible in main view
</RenderWhen>

<RenderWhen context="presenter">
  Only visible in presenter mode
</RenderWhen>
```

**Context types:**
- `main`: Main slide view
- `slide`: Slide view
- `presenter`: Presenter mode
- `overview`: Overview mode

## Content Components

### 7. Toc (Table of Contents)
Generate a table of contents.

```vue
<Toc />
```

**Props:**
- `columns`: Number of columns
- `maxDepth`: Maximum heading depth
- `mode`: Display mode

### 8. Tweet
Embed tweets.

```vue
<Tweet id="1234567890" />
```

**Props:**
- `id`: Tweet ID (required)
- `scale`: Size scale
- `conversation`: Show conversation

### 9. Youtube
Embed YouTube videos.

```vue
<Youtube id="dQw4w9WgXcQ" width="600" height="400" />
```

**Props:**
- `id`: YouTube video ID (required)
- `width`: Video width
- `height`: Video height

### 10. SlidevVideo
Embed and control video playback with advanced features.

```vue
<SlidevVideo autoplay controls>
  <source src="/my-video.mp4" type="video/mp4" />
</SlidevVideo>
```

**Props:**
- `autoplay`: Auto-play video
- `controls`: Show video controls
- `timestamp`: Start at specific time
- Other standard HTML5 video attributes

## Animation Components

### VClick
Create click-triggered animations.

```vue
<VClick>Content appears on click</VClick>
```

### VSwitch
Switch between different content on clicks.

```vue
<VSwitch>
  <template #1>First click content</template>
  <template #2>Second click content</template>
</VSwitch>
```

### VDrag
Make elements draggable.

```vue
<VDrag>
  Draggable element
</VDrag>
```

## Utility Components

### Transform
Transform and scale elements.

```vue
<Transform :scale="1.5">
  Scaled content
</Transform>
```

**Props:**
- `scale`: Scale factor
- `origin`: Transform origin

## Custom Components

### Creating Custom Components

Place Vue components in the `components/` directory:

```
your-slidev/
  ├── components/
  │   ├── MyComponent.vue
  │   └── Counter.vue
  └── slides.md
```

Use in slides:

```vue
<MyComponent />
```

### Component Auto-Import

Components in the `components/` directory are automatically imported and available globally.

## Best Practices

1. **Use semantic components**: Choose components that match your intent
2. **Combine components**: Mix and match for rich interactions
3. **Keep it simple**: Don't overcomplicate slides with too many components
4. **Test interactivity**: Ensure interactive components work in presentation mode
5. **Create reusable components**: Extract common patterns into custom components

## Reference
- Built-in Components: https://sli.dev/builtin/components
