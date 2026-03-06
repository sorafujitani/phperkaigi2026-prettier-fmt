# Code Blocks in Slidev

## Overview

One of Slidev's primary motivations was **"the need to perfectly display code in slides"**. Slidev provides extensive features for displaying and interacting with code.

## Basic Code Blocks

### Standard Markdown Syntax

````md
```typescript
console.log('Hello, World!')
```
````

### Language Support

Supports all languages via Shiki syntax highlighter:

````md
```python
def hello():
    print("Hello, World!")
```

```rust
fn main() {
    println!("Hello, World!");
}
```

```sql
SELECT * FROM users WHERE active = true;
```
````

## Syntax Highlighting

### Shiki Highlighter

Slidev uses **Shiki** as the built-in syntax highlighter:
- High-quality, accurate syntax highlighting
- Supports 100+ languages
- Multiple theme options
- Configurable via settings

### Configuring Shiki

Customize highlighter settings in your Slidev configuration.

## Code Block Features

### 1. Line Numbers

Show line numbers in code blocks:

````md
```ts {lines: true}
function hello() {
  console.log('Hello')
}
```
````

### 2. Line Highlighting

Highlight specific lines:

````md
```ts {2,3}
function hello() {
  console.log('Hello')  // highlighted
  console.log('World')  // highlighted
}
```
````

Highlight ranges:

````md
```ts {2-4,6}
// Line 1
// Lines 2-4 highlighted
// ...
// ...
// Line 5
// Line 6 highlighted
```
````

### 3. Maximum Height

Limit code block height:

````md
```ts {maxHeight: '100px'}
// Very long code
// ...
// Will be scrollable
```
````

### 4. Monaco Editor Integration

Use Monaco Editor (VS Code's editor) for editable code:

````md
```ts {monaco}
// Editable code with IntelliSense
const message: string = 'Hello'
console.log(message)
```
````

### 5. Monaco Code Running

Execute code directly in slides:

````md
```ts {monaco-run}
console.log('This will run!')
```
````

### 6. Writable Monaco Editor

Create an editable code playground:

````md
```ts {monaco-write}
// Edit and experiment
let count = 0
count++
```
````

## Advanced Features

### Shiki Magic Move

Animate code transformations between slides:

````md
---
# Slide 1
---

```ts
let count = 0
```

---
# Slide 2
---

```ts
let count = 0
count++
console.log(count) // 1
```
````

### TwoSlash Integration

TypeScript type information and IntelliSense:

````md
```ts twoslash
const message = 'Hello'
//    ^?
```
````

### Code Snippet Importing

Import code from external files:

````md
```ts
<<< @/snippets/example.ts
```
````

Import with line range:

````md
```ts
<<< @/snippets/example.ts#L10-L20
```
````

### Code Groups

Group related code examples:

````md
:::code-group

```js [JavaScript]
console.log('Hello')
```

```ts [TypeScript]
console.log('Hello' as string)
```

:::
````

## Styling Code Blocks

### Custom CSS

Style code blocks with custom CSS:

```css
.slidev-code {
  font-size: 14px;
  line-height: 1.6;
}
```

### Theme-based Styling

Choose from multiple Shiki themes in configuration.

## Best Practices

1. **Keep code concise**: Show only relevant portions
2. **Use line highlighting**: Draw attention to important lines
3. **Enable line numbers**: For referencing specific lines
4. **Use appropriate languages**: Ensure correct syntax highlighting
5. **Import from files**: Keep slides.md clean by importing code
6. **Test Monaco features**: Ensure editable code works as expected
7. **Consistent styling**: Use uniform code block settings throughout

## Code Block Configuration

### Per-Block Options

````md
```ts {lines: true, maxHeight: '200px', startLine: 5}
// Configuration per code block
```
````

### Global Configuration

Set default code block behavior in Slidev configuration file.

## Tips for Presenting Code

1. **Progressive revelation**: Use clicks to reveal code incrementally
2. **Highlight changes**: Use line highlighting for before/after comparisons
3. **Live editing**: Demonstrate with Monaco editor
4. **Keep it readable**: Use appropriate font sizes
5. **Explain as you go**: Don't show all code at once

## Reference
- Code Blocks Guide: https://sli.dev/guide/syntax#code-blocks
