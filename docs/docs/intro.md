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

Styles inject automatically — no CSS import needed. To control that, see [Customization](./customization).

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

Using a framework? See [Framework Integration](./frameworks) for Next.js, Astro, Gatsby, Docusaurus, VitePress, Eleventy, Hugo, and vanilla unified/remark setups.
