# Hosting Slidev Presentations

## Overview

Slidev presentations can be built as static Single-Page Applications (SPA) and hosted on various platforms.

## Building for Production

### Basic Build Command

```bash
slidev build
```

This generates a static site in the `dist` folder (default).

### Build Options

#### Custom Output Directory

```bash
slidev build --out my-dist
```

#### Base Path

For hosting in a subdirectory:

```bash
slidev build --base /my-slides/
```

**Important**: Base path must begin and end with a slash `/`

### Testing Built Version

Preview the built version locally:

```bash
npx vite preview
```

## Deployment Platforms

### 1. GitHub Pages

#### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build -- --base /repository-name/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Access Your Slides

After deployment, slides will be available at:
```
https://<username>.github.io/<repository-name>/
```

#### Repository Settings

1. Go to repository Settings
2. Navigate to Pages
3. Select `gh-pages` branch as source

### 2. Netlify

#### Configuration File

Create `netlify.toml`:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Deploy Steps

1. Connect repository to Netlify
2. Netlify automatically detects configuration
3. Deploy on push to main branch

#### Manual Deploy

```bash
npm run build
netlify deploy --prod --dir=dist
```

### 3. Vercel

#### Configuration File

Create `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Deploy Steps

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

Or connect repository via Vercel dashboard for automatic deployments.

### 4. Docker

#### Using Prebuilt Image

```bash
docker run --name slidev --rm -it \
  -v ${PWD}:/slidev \
  -p 3030:3030 \
  tangramor/slidev:latest
```

#### Custom Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t my-slidev .
docker run -p 8080:80 my-slidev
```

## Multiple Slide Decks

Build and host multiple presentations:

```bash
# Project structure
/
├── deck1/
│   └── slides.md
├── deck2/
│   └── slides.md
└── package.json
```

Build each deck:

```bash
slidev build deck1/slides.md --out dist/deck1 --base /deck1/
slidev build deck2/slides.md --out dist/deck2 --base /deck2/
```

## Pre-configured Setup

Use initialization command for pre-configured hosting:

```bash
npm init slidev@latest
```

This creates a project with hosting configurations already set up.

## Best Practices

### 1. Environment Configuration

Use environment variables for different deployment environments:

```bash
# .env.production
VITE_BASE_URL=/my-slides/
```

### 2. Asset Paths

Use absolute paths from public folder:

```md
![Image](/images/logo.png)
```

Not relative paths:
```md
![Image](./images/logo.png)  <!-- May break after build -->
```

### 3. Testing

Always test the built version before deploying:

```bash
npm run build
npx vite preview
```

### 4. Caching

Configure caching headers for better performance:

```nginx
# nginx example
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 5. Security

- Use HTTPS for hosted presentations
- Set appropriate CORS headers if needed
- Don't commit sensitive information

## Custom Server

Host on any static file server:

```bash
# Python
python -m http.server -d dist 8000

# Node.js
npx serve dist

# PHP
php -S localhost:8000 -t dist
```

## CI/CD Integration

### GitLab CI

```yaml
# .gitlab-ci.yml
pages:
  stage: deploy
  script:
    - npm install
    - npm run build
    - mv dist public
  artifacts:
    paths:
      - public
  only:
    - main
```

### Jenkins

```groovy
pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'rsync -av dist/ user@server:/var/www/slides/'
      }
    }
  }
}
```

## Reference
- Official Hosting Guide: https://sli.dev/guide/hosting
