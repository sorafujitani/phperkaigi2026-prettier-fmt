# Animations in Slidev

## Click Animations

### Basic v-click
Show/hide elements on click:

```vue
<v-click>

This appears on click

</v-click>
```

### v-click Directive
Apply to any element:

```vue
<div v-click>Appears on click</div>
```

### v-after
Reveals when previous `v-click` is triggered:

```vue
<div v-click>First</div>
<div v-after>Appears after first</div>
```

### Hide Modifier
Make elements disappear after clicking:

```vue
<div v-click.hide>Disappears on next click</div>
```

### v-clicks for Lists
Animate list items automatically:

```vue
<v-clicks>

- First item
- Second item
- Third item

</v-clicks>
```

Options for `v-clicks`:
- `depth`: Control nesting level
- `every`: Animate every nth item

## Positioning Animations

### at Prop
Control animation timing:

```vue
<!-- Absolute positioning -->
<div v-click="3">Appears at click 3</div>

<!-- Relative positioning -->
<div v-click="'+1'">One click after previous</div>
```

### Synchronizing Animations
Multiple elements at same position:

```vue
<div v-click="1">First group</div>
<div v-click="1">Also in first group</div>
<div v-click="2">Second group</div>
```

## Motion Animations

Uses `@vueuse/motion` for advanced animations.

### v-motion Directive

```vue
<div
  v-motion
  :initial="{ x: -80 }"
  :enter="{ x: 0 }"
  :click-1="{ x: 80 }"
  :leave="{ x: 1000 }"
>
  Animated element
</div>
```

States:
- `initial`: Starting state before entering
- `enter`: State when entering slide
- `click-x`: Triggered at specific click number
- `leave`: State when leaving slide

## Slide Transitions

### Built-in Transitions
Set via frontmatter:

```md
---
transition: slide-left
---
```

Available transitions:
- `fade`: Fade in/out
- `slide-left`: Slide from right to left
- `slide-right`: Slide from left to right
- `slide-up`: Slide from bottom to top
- `slide-down`: Slide from top to bottom

### Different Forward/Backward Transitions

```md
---
transition: slide-left
transitionBack: slide-right
---
```

### View Transition API (Experimental)
Enable experimental View Transition API for smoother transitions.

## Element Transitions

### Automatic Classes
Slidev adds classes to elements with `v-click`:
- `slidev-vclick-target`: Applied to clickable elements
- `slidev-vclick-hidden`: Applied when hidden

### Custom CSS Transitions

```css
.slidev-vclick-target {
  transition: opacity 0.3s ease;
}

.slidev-vclick-hidden {
  opacity: 0;
}
```

## Advanced Features

### Per-Slide Animation Customization
Override animation behavior on specific slides or layouts.

### Complex Animation Sequences
Combine multiple animation techniques for sophisticated effects.

## Best Practices

1. **Don't overuse**: Too many animations can be distracting
2. **Keep it smooth**: Use appropriate timing and easing
3. **Test thoroughly**: Ensure animations work as expected
4. **Progressive revelation**: Use clicks to reveal content step by step
5. **Consistent timing**: Keep animation speeds consistent throughout presentation

## Reference
- Official Animations Guide: https://sli.dev/guide/animations
