---
title: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span class="handwritten pageKicker">the basics</span>

# Introduction

`remark-notes-plugin` turns markdown blockquotes into styled note components.

```markdown
> [!tip]
> Share best practices and pro tips with your readers.
```

```html
<blockquote class="remark-note remark-note-tip">
  <div class="remark-note-header">
    <span class="remark-note-icon"><!-- SVG icon --></span>
    <span class="remark-note-title">tip</span>
  </div>
  <div class="remark-note-content">
    <p>Share best practices and pro tips with your readers.</p>
  </div>
</blockquote>
```

## Install

```bash
npm install remark-notes-plugin
# or: yarn add remark-notes-plugin
# or: pnpm add remark-notes-plugin
```

Requires remark v13+ and Node.js v14+.

## Usage

Wire the plugin in wherever your project already processes markdown:

<Tabs groupId="framework">
<TabItem value="nextjs" label="Next.js">

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

</TabItem>
<TabItem value="astro" label="Astro">

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import remarkNotes from 'remark-notes-plugin';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkNotes],
  },
});
```

</TabItem>
<TabItem value="gatsby" label="Gatsby">

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

</TabItem>
<TabItem value="docusaurus" label="Docusaurus">

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

</TabItem>
<TabItem value="vitepress" label="VitePress">

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

VitePress uses markdown-it, not remark, by default — the `md.use()` call above bridges the two.

</TabItem>
<TabItem value="eleventy" label="Eleventy (11ty)">

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

</TabItem>
<TabItem value="hugo" label="Hugo">

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

</TabItem>
<TabItem value="vanilla" label="Vanilla unified/remark">

```javascript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const html = await unified()
  .use(remarkParse)
  .use(remarkNotes)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true })
  .process(markdown);
```

</TabItem>
</Tabs>

Styles inject automatically — no CSS import needed. To control that, see [Customization](./customization).

Every framework here has more detail — alternate routers, extra config options, Hugo's build wiring — on [Framework Integration](./frameworks).

## The 5 note types

```markdown
> [!note]
> Perfect for general information and helpful context.

> [!tip]
> Share best practices and pro tips with your readers.

> [!important]
> Highlight critical information that demands attention.

> [!quote]
> Showcase quotes and testimonials beautifully.

> [!bonus]
> Add extra value with advanced techniques.
```

- **note** — general information and context
- **tip** — best practices and suggestions
- **important** — critical information that demands attention
- **quote** — quotations and testimonials
- **bonus** — extra, optional value
