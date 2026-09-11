---
title: Framework Integration
---

<span class="handwritten pageKicker">the setups</span>

# Framework Integration

## Next.js

App Router (`@next/mdx`):

```javascript
// next.config.mjs
import createMDX from '@next/mdx';
import remarkNotes from 'remark-notes-plugin';

const withMDX = createMDX({
  options: { remarkPlugins: [remarkNotes] },
});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
});
```

Pages Router:

```javascript
// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: { remarkPlugins: [require('remark-notes-plugin')] },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
```

Processing markdown programmatically (e.g. `getStaticProps`) works the same as [vanilla unified](#vanilla-unifiedremark) below.

## Astro

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import remarkNotes from 'remark-notes-plugin';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkNotes],
    // or with a custom prefix: [[remarkNotes, { classPrefix: 'astro' }]]
  },
});
```

## Gatsby

```bash
npm install remark-notes-plugin gatsby-plugin-mdx
```

```javascript
// gatsby-config.js
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

## Docusaurus

This is what this documentation site uses.

```javascript
// docusaurus.config.js
import remarkNotes from 'remark-notes-plugin';

const config = {
  presets: [
    ['classic', {
      docs: { remarkPlugins: [remarkNotes] },
    }],
  ],
};
```

Docusaurus ships its own `:::note`/`:::tip` admonitions — the two systems coexist fine, but they can visually conflict if you use both in the same page. See [Troubleshooting](./troubleshooting) if they clash.

## VitePress

```typescript
// .vitepress/config.ts
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

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import 'remark-notes-plugin/styles.css';

export default {
  extends: DefaultTheme,
};
```

VitePress uses markdown-it, not remark, by default — the `md.use()` call above is what bridges the two; without it the plugin won't run.

## Eleventy (11ty)

```bash
npm install @11ty/eleventy-plugin-remark remark-notes-plugin
```

```javascript
// .eleventy.js
const eleventyRemark = require('@11ty/eleventy-plugin-remark');
const remarkNotes = require('remark-notes-plugin');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyRemark, {
    plugins: [remarkNotes],
  });
};
```

## Hugo

Hugo doesn't run remark natively. Preprocess your markdown before Hugo builds:

```javascript
// scripts/process-markdown.js
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkStringify from 'remark-stringify';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

for (const filepath of glob.sync('content/**/*.md')) {
  const content = readFileSync(filepath, 'utf-8');
  const result = await unified()
    .use(remarkParse)
    .use(remarkNotes, { injectStyles: false })
    .use(remarkStringify)
    .process(content);
  writeFileSync(filepath, result.toString());
}
```

```json
{ "scripts": { "prebuild": "node scripts/process-markdown.js", "build": "hugo" } }
```

## Vanilla unified/remark

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const html = await unified()
  .use(remarkParse)
  .use(remarkNotes, { classPrefix: 'custom', injectStyles: false })
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true })
  .process(markdown);
```

## Configuration best practices

Disable style injection (`injectStyles: false`) when a build tool already handles your CSS imports, you're doing SSR with separate CSS extraction, or you're providing your own styles.

Use `classPrefix` when the default `remark-note` classes would collide with something else in your CSS, or you're running the plugin more than once with different styling.

See [Customization](./customization) for CSS overrides, or [Troubleshooting](./troubleshooting) if something isn't working.
