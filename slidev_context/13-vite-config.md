# Vite Configuration in Slidev

## Overview

Slidev is built on **Vite**, allowing extensive plugin and configuration customization while maintaining simplicity.

## Internal Vite Plugins

Slidev automatically adds several Vite plugins:

1. **@vitejs/plugin-vue** - Vue 3 support
2. **unplugin-vue-components** - Auto-import components
3. **unplugin-icons** - Icon support
4. **vite-plugin-vue-markdown** - Markdown as Vue components
5. **vite-plugin-remote-assets** - Download remote assets
6. **unocss/vite** - UnoCSS integration

**Important**: Do not re-add these plugins manually, as they are already configured by Slidev.

## Basic Configuration

### Creating vite.config.ts

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  // Standard Vite options
  server: {
    port: 3030,
    open: true
  },

  // Slidev-specific options
  slidev: {
    vue: {
      /* Vue options */
    },
    markdown: {
      /* Markdown options */
    }
  }
})
```

## Slidev-Specific Configuration

### Vue Configuration

```ts
export default defineConfig({
  slidev: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('custom-')
        }
      }
    }
  }
})
```

### Markdown Configuration

```ts
export default defineConfig({
  slidev: {
    markdown: {
      markdownItSetup(md) {
        // Add markdown-it plugins
        md.use(require('markdown-it-emoji'))
        md.use(require('markdown-it-footnote'))
      }
    }
  }
})
```

## Standard Vite Options

### Server Configuration

```ts
export default defineConfig({
  server: {
    port: 3030,
    host: '0.0.0.0',
    open: true,
    cors: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
```

### Build Options

```ts
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router']
        }
      }
    }
  }
})
```

### Resolve Options

```ts
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/components',
      '@layouts': '/layouts'
    }
  }
})
```

## Custom Vite Plugins

### Method 1: Direct in vite.config.ts

```ts
import { defineConfig } from 'vite'
import myPlugin from 'vite-plugin-my-plugin'

export default defineConfig({
  plugins: [
    myPlugin({
      // Plugin options
    })
  ]
})
```

### Method 2: setup/vite-plugins.ts

For plugins that need access to slide data:

```ts
// setup/vite-plugins.ts
import { defineVitePluginsSetup } from '@slidev/types'

export default defineVitePluginsSetup((options) => {
  // Access slide metadata
  console.log(options.data)

  return [
    // Your custom plugins
    {
      name: 'my-plugin',
      transform(code, id) {
        // Plugin logic
        return code
      }
    }
  ]
})
```

## Environment Variables

### .env Files

```bash
# .env
VITE_APP_TITLE=My Presentation
VITE_API_URL=https://api.example.com
```

**Usage in slides**:

```vue
<script setup>
const apiUrl = import.meta.env.VITE_API_URL
</script>
```

### .env Files Hierarchy

```
.env                # Loaded in all cases
.env.local          # Loaded in all cases, ignored by git
.env.[mode]         # Loaded in specified mode
.env.[mode].local   # Loaded in specified mode, ignored by git
```

## CSS Configuration

### CSS Preprocessors

```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
```

### PostCSS

```ts
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')
      ]
    }
  }
})
```

## Optimization

### Dependency Pre-bundling

```ts
export default defineConfig({
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@vueuse/core']
  }
})
```

### Code Splitting

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('components/')) {
            return 'components'
          }
        }
      }
    }
  }
})
```

## Advanced Configuration

### Custom Transformations

```ts
export default defineConfig({
  plugins: [
    {
      name: 'transform-slides',
      transform(code, id) {
        if (id.endsWith('.md')) {
          // Transform markdown
          return code.replace(/PLACEHOLDER/g, 'REPLACED')
        }
      }
    }
  ]
})
```

### HMR Configuration

```ts
export default defineConfig({
  server: {
    hmr: {
      overlay: true,
      port: 3031
    }
  }
})
```

## Common Plugins

### Adding Icons

```bash
npm install -D @iconify/json
```

```ts
// Already included by Slidev
// No additional configuration needed
```

**Usage**:
```vue
<carbon-logo-github />
<mdi-home />
```

### Adding PWA Support

```bash
npm install -D vite-plugin-pwa
```

```ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Presentation',
        short_name: 'Slides',
        theme_color: '#5b8c5a'
      }
    })
  ]
})
```

### Adding Compression

```bash
npm install -D vite-plugin-compression
```

```ts
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    compression({
      algorithm: 'gzip'
    })
  ]
})
```

## TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "types": ["vite/client", "@slidev/types"]
  },
  "include": [
    "components/**/*",
    "layouts/**/*",
    "setup/**/*",
    "*.ts"
  ]
}
```

## Debugging

### Source Maps

```ts
export default defineConfig({
  build: {
    sourcemap: true
  }
})
```

### Debug Mode

```ts
export default defineConfig({
  logLevel: 'info',
  clearScreen: false
})
```

## Performance Optimization

### Asset Inlining

```ts
export default defineConfig({
  build: {
    assetsInlineLimit: 4096 // 4kb
  }
})
```

### Chunk Size Warnings

```ts
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000 // kb
  }
})
```

## Best Practices

1. **Don't re-add internal plugins**: Slidev already includes essential plugins
2. **Use setup/vite-plugins.ts**: For plugins needing slide data
3. **Keep config simple**: Only add what you need
4. **Test build**: Ensure config works in production
5. **Use environment variables**: For environment-specific settings
6. **Optimize dependencies**: Pre-bundle heavy dependencies
7. **Enable source maps in dev**: For easier debugging
8. **Document custom plugins**: Explain why they're needed

## Troubleshooting

### Plugin Conflicts

If you encounter plugin conflicts:
1. Check Slidev's internal plugins
2. Ensure you're not duplicating functionality
3. Check plugin load order

### Build Failures

Common issues:
- Missing dependencies
- Incorrect import paths
- Plugin incompatibilities
- TypeScript errors

### HMR Issues

If HMR isn't working:
```ts
export default defineConfig({
  server: {
    watch: {
      usePolling: true
    }
  }
})
```

## Reference
- Vite Configuration: https://sli.dev/custom/config-vite
- Official Vite Docs: https://vitejs.dev/config/
