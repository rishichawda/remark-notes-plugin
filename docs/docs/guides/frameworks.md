---
sidebar_position: 1
---

# Framework Integration

Complete integration guides for using `remark-notes-plugin` with popular frameworks and static site generators.

## Next.js

### Next.js 13+ (App Router with MDX)

For Next.js 13+ using the App Router with `@next/mdx`:

**1. Install dependencies:**

```bash
npm install remark-notes-plugin @next/mdx @mdx-js/loader @mdx-js/react
```

**2. Configure `next.config.mjs`:**

```javascript
import createMDX from '@next/mdx';
import remarkNotes from 'remark-notes-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkNotes],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

**3. Import styles in your root layout (`app/layout.tsx`):**

```typescript
import 'remark-notes-plugin/styles.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**4. Create an MDX file (`app/blog/post.mdx`):**

```mdx
# My Blog Post

> [!tip]
> This is a helpful tip in Next.js!

Regular content here...

> [!important]
> Don't forget this important detail.
```

### Next.js (Pages Router with MDX)

For the traditional Pages Router:

**1. Install dependencies:**

```bash
npm install remark-notes-plugin @next/mdx @mdx-js/loader
```

**2. Configure `next.config.js`:**

```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-notes-plugin')],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
```

**3. Import styles in `pages/_app.js` or `pages/_app.tsx`:**

```javascript
import 'remark-notes-plugin/styles.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Next.js with Custom Markdown Processing

If you're processing markdown programmatically:

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export async function getStaticProps() {
  const markdown = `
> [!note]
> This is processed server-side
  `;

  const result = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return {
    props: {
      content: result.toString(),
    },
  };
}
```

> [!tip]
> For better performance with many pages, disable automatic style injection and import the CSS file manually in your layout.

## Astro

Astro has excellent built-in support for remark plugins.

**1. Install the plugin:**

```bash
npm install remark-notes-plugin
```

**2. Configure `astro.config.mjs`:**

```javascript
import { defineConfig } from 'astro/config';
import remarkNotes from 'remark-notes-plugin';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkNotes],
  },
});
```

**3. The CSS is automatically injected, but you can also import it manually:**

```astro
---
// src/layouts/Layout.astro
import 'remark-notes-plugin/styles.css';
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Site</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

**4. Use in your markdown files:**

```markdown
---
title: My Page
---

# Welcome

> [!note]
> This is a note in Astro!

> [!tip]
> Astro makes it super easy to use remark plugins.
```

### Astro with Custom Class Prefix

```javascript
import { defineConfig } from 'astro/config';
import remarkNotes from 'remark-notes-plugin';

export default defineConfig({
  markdown: {
    remarkPlugins: [
      [remarkNotes, { classPrefix: 'astro' }]
    ],
  },
});
```

## Gatsby

**1. Install dependencies:**

```bash
npm install remark-notes-plugin gatsby-plugin-mdx
```

**2. Configure `gatsby-config.js`:**

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdxOptions: {
          remarkPlugins: [require('remark-notes-plugin')],
        },
      },
    },
  ],
};
```

**3. Import styles in `gatsby-browser.js`:**

```javascript
import 'remark-notes-plugin/styles.css';
```

**4. Or disable auto-injection and use CSS modules:**

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        mdxOptions: {
          remarkPlugins: [
            [require('remark-notes-plugin'), { injectStyles: false }]
          ],
        },
      },
    },
  ],
};
```

## Docusaurus

Docusaurus is what we use for this documentation site!

**1. Install the plugin:**

```bash
npm install remark-notes-plugin
```

**2. Configure `docusaurus.config.js`:**

```javascript
import remarkNotes from 'remark-notes-plugin';

const config = {
  presets: [
    [
      'classic',
      {
        docs: {
          remarkPlugins: [remarkNotes],
        },
        blog: {
          remarkPlugins: [remarkNotes],
        },
      },
    ],
  ],
};

export default config;
```

**3. Import styles in `src/css/custom.css`:**

```css
@import 'remark-notes-plugin/styles.css';

/* Your custom styles below */
```

> [!note]
> Styles are automatically injected by default, but importing them manually gives you more control over the cascade order.

## VitePress

**1. Install dependencies:**

```bash
npm install remark-notes-plugin
```

**2. Configure `.vitepress/config.ts`:**

```typescript
import { defineConfig } from 'vitepress';
import remarkNotes from 'remark-notes-plugin';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(remarkNotes);
    },
  },
});
```

**3. Import styles in `.vitepress/theme/index.ts`:**

```typescript
import DefaultTheme from 'vitepress/theme';
import 'remark-notes-plugin/styles.css';
import './custom.css';

export default {
  extends: DefaultTheme,
};
```

> [!important]
> VitePress uses markdown-it by default, not remark. You may need additional configuration or consider using a different approach for VitePress.

## Eleventy (11ty)

**1. Install dependencies:**

```bash
npm install @11ty/eleventy-plugin-remark remark-notes-plugin
```

**2. Configure `.eleventy.js`:**

```javascript
const eleventyRemark = require('@11ty/eleventy-plugin-remark');
const remarkNotes = require('remark-notes-plugin');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyRemark, {
    plugins: [remarkNotes],
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
```

## Hugo

Hugo doesn't use remark directly, but you can preprocess markdown files:

**1. Create a preprocessing script (`scripts/process-markdown.js`):**

```javascript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkStringify from 'remark-stringify';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

async function processFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  
  const result = await unified()
    .use(remarkParse)
    .use(remarkNotes, { injectStyles: false })
    .use(remarkStringify)
    .process(content);

  writeFileSync(filepath, result.toString());
}

const files = glob.sync('content/**/*.md');
files.forEach(processFile);
```

**2. Add to your build process in `package.json`:**

```json
{
  "scripts": {
    "prebuild": "node scripts/process-markdown.js",
    "build": "hugo"
  }
}
```

## Vanilla Unified/Remark

For custom implementations using unified directly:

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

async function processMarkdown(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkNotes, {
      classPrefix: 'custom',
      injectStyles: false,
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}

// Usage
const html = await processMarkdown(`
> [!tip]
> This is processed with vanilla unified!
`);

console.log(html);
```

## Configuration Best Practices

### When to Disable Style Injection

Set `injectStyles: false` when:

1. **Using a build tool** (Vite, Webpack, Rollup) that handles CSS imports
2. **Server-Side Rendering** with separate CSS extraction
3. **Custom styling** - you're providing your own styles
4. **Performance optimization** - better caching with separate CSS files

### When to Use Custom Class Prefix

Use `classPrefix` when:

1. **Avoiding conflicts** with existing CSS classes
2. **Multiple instances** of the plugin with different styles
3. **Framework conventions** - matching your project's naming scheme
4. **Scoped styling** - better encapsulation

## Troubleshooting

### Styles Not Appearing

**Problem:** Notes appear unstyled.

**Solutions:**
1. Ensure styles are imported: `import 'remark-notes-plugin/styles.css'`
2. Check if `injectStyles` is set to `false` and you forgot to import CSS
3. Verify CSS load order in your build tool

### Build Errors with MDX

**Problem:** Build fails when processing MDX files.

**Solutions:**
1. Ensure you're using compatible versions of MDX and remark
2. Check for syntax errors in your markdown notes
3. Try setting `injectStyles: false` for SSR environments

### TypeScript Errors

**Problem:** TypeScript can't find module types.

**Solution:**
```typescript
// If types aren't recognized, add to your tsconfig.json:
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## Next Steps

- [API Reference](/docs/api/overview) - Complete API documentation
- [CSS Customization](/docs/customization/styling) - Customize note styles
- [Troubleshooting](/docs/guides/troubleshooting) - Common issues and solutions
