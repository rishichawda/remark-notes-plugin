---
title: API Reference
---

<span class="handwritten pageKicker">the reference</span>

# API Reference

## `remarkNotes(options?)`

```typescript
function remarkNotes(options?: RemarkNotesOptions): (tree: Node) => void
```

```typescript
const processor = unified()
  .use(remarkParse)
  .use(remarkNotes, { classPrefix: 'custom' })
  .use(remarkRehype)
  .use(rehypeStringify);

const result = await processor.process('> [!note]\n> This is a note');
```

## `RemarkNotesOptions`

```typescript
interface RemarkNotesOptions {
  classPrefix?: string
  injectStyles?: boolean
}
```

| Option | Type | Default | Description |
|---|---|---|---|
| `classPrefix` | `string` | `''` | Prepended to every generated class name (`remark-note` → `my-remark-note`). |
| `injectStyles` | `boolean` | `true` | Inject a `<style>` tag automatically. Set `false` to import `remark-notes-plugin/styles.css` yourself. |

## `ValidNoteType`

```typescript
type ValidNoteType = 'note' | 'tip' | 'important' | 'quote' | 'bonus'
```

Note types are case-insensitive in markdown (`[!NOTE]`, `[!Note]`, `[!note]` all work) — the plugin normalizes to lowercase before matching.

## Exports

```typescript
// ES Modules
import remarkNotes from 'remark-notes-plugin';
import type { RemarkNotesOptions, ValidNoteType } from 'remark-notes-plugin';
import 'remark-notes-plugin/styles.css'; // when injectStyles is false

// CommonJS
const remarkNotes = require('remark-notes-plugin');
```

`package.json` export map: `main` → `dist/index.js`, `types` → `dist/index.d.ts`, `./styles.css` → `dist/styles.css`.

## HTML output structure

```html
<blockquote class="remark-note remark-note-{type}">
  <div class="remark-note-header">
    <span class="remark-note-icon"><!-- SVG icon --></span>
    <span class="remark-note-title">{type}</span>
  </div>
  <div class="remark-note-content"><!-- original markdown content --></div>
</blockquote>
```

With `classPrefix: 'my'`, every class above gets `my-` prepended.

## TypeScript usage

```typescript
import remarkNotes from 'remark-notes-plugin';
import type { RemarkNotesOptions, ValidNoteType } from 'remark-notes-plugin';

const options: RemarkNotesOptions = { classPrefix: 'docs', injectStyles: false };
const noteType: ValidNoteType = 'tip'; // valid
const invalid: ValidNoteType = 'warning'; // TypeScript error
```

## Environment support

Node.js v14+, remark v13+, ESM. Full TypeScript definitions included. No browser-specific constraints — the generated HTML/CSS works in any modern browser.

## Error handling

An invalid `[!type]` (e.g. `[!warning]`) is left as a plain, untransformed blockquote — no error thrown, no warning logged. See [Troubleshooting](./troubleshooting#notes-not-transforming) if this happens unexpectedly.

## MDX compatibility

Works the same in `.mdx` as `.md` — notes and JSX components can be mixed freely:

```mdx
import { SomeComponent } from './components';

> [!note]
> This note works in MDX!

<SomeComponent />
```
