---
sidebar_position: 1
---

# API Reference

Complete TypeScript API reference for `remark-notes-plugin`.

## Plugin Function

### `remarkNotes(options?)`

The main plugin function that transforms markdown blockquotes into styled note elements.

**Type Signature:**

```typescript
function remarkNotes(options?: RemarkNotesOptions): (tree: Node) => void
```

**Parameters:**

- `options` (optional): Configuration object of type `RemarkNotesOptions`

**Returns:**

A transformer function that processes the AST (Abstract Syntax Tree).

**Example:**

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(remarkParse)
  .use(remarkNotes, { classPrefix: 'custom' })
  .use(remarkRehype)
  .use(rehypeStringify);

const result = await processor.process('> [!note]\n> This is a note');
```

## Configuration Options

### `RemarkNotesOptions`

Configuration interface for the plugin.

```typescript
interface RemarkNotesOptions {
  classPrefix?: string;
  injectStyles?: boolean;
}
```

#### `classPrefix`

Custom prefix for all generated CSS class names.

- **Type:** `string`
- **Default:** `''` (empty string - no prefix)
- **Optional:** Yes

The prefix is **prepended** to the standard `remark-note` class names.

**Default behavior (no prefix):**
```html
<blockquote class="remark-note remark-note-tip">
  <div class="remark-note-header">
    <span class="remark-note-icon">...</span>
    <span class="remark-note-title">tip</span>
  </div>
  <div class="remark-note-content">...</div>
</blockquote>
```

**With prefix (e.g., `'my'`):**
```html
<blockquote class="my-remark-note my-remark-note-tip">
  <div class="my-remark-note-header">
    <span class="my-remark-note-icon">...</span>
    <span class="my-remark-note-title">tip</span>
  </div>
  <div class="my-remark-note-content">...</div>
</blockquote>
```

**Example:**

```typescript
unified().use(remarkNotes, { classPrefix: 'docs' });
// Generates: docs-remark-note, docs-remark-note-tip, etc.
```

> [!note]
> The shipped CSS uses attribute selectors (e.g., `[class*="remark-note-icon"]`) and will work automatically with any prefix.

#### `injectStyles`

Controls whether the plugin automatically injects styles into the document.

- **Type:** `boolean`
- **Default:** `true`
- **Optional:** Yes

When `true`, the plugin injects a `<style>` tag containing note styles directly into the AST. When `false`, you must manually import the CSS file.

**When to set to `false`:**

- Using Server-Side Rendering (SSR) with separate CSS extraction
- Building with tools that handle CSS imports separately (Vite, Webpack, etc.)
- Providing completely custom styles
- You want more control over style loading order

**Example:**

```typescript
// Automatic style injection (default)
unified().use(remarkNotes);

// Manual CSS import required
unified().use(remarkNotes, { injectStyles: false });
// Then in your code:
import 'remark-notes-plugin/styles.css';
```

## Types

### `ValidNoteType`

Union type of all valid note type strings.

```typescript
type ValidNoteType = 'note' | 'tip' | 'important' | 'quote' | 'bonus';
```

**Valid note types:**

- `note` - General informational notes
- `tip` - Helpful suggestions and advice
- `important` - Critical information requiring attention
- `quote` - Styled quote blocks
- `bonus` - Additional information or advanced features

**Usage in Markdown:**

```markdown
> [!note]
> General information

> [!tip]
> Helpful advice

> [!important]
> Critical information

> [!quote]
> "A memorable quote"

> [!bonus]
> Advanced techniques
```

> [!important]
> Note types are case-insensitive in markdown (`[!NOTE]`, `[!Note]`, `[!note]` all work), but the plugin normalizes them to lowercase.

## Exports

The package exports the following from its main entry point:

```typescript
// Default export
export default function remarkNotes(options?: RemarkNotesOptions): Transformer;

// Named type exports
export type { RemarkNotesOptions };
export type { ValidNoteType };
```

**Importing the plugin:**

```typescript
// ES Modules (recommended)
import remarkNotes from 'remark-notes-plugin';
import type { RemarkNotesOptions, ValidNoteType } from 'remark-notes-plugin';

// CommonJS
const remarkNotes = require('remark-notes-plugin');
```

**Importing styles:**

```typescript
// When injectStyles is false
import 'remark-notes-plugin/styles.css';
```

## Package Exports

The package.json defines the following exports:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.js",
      "default": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

This allows you to import:

- The plugin: `import remarkNotes from 'remark-notes-plugin'`
- Types: `import type { RemarkNotesOptions } from 'remark-notes-plugin'`
- Styles: `import 'remark-notes-plugin/styles.css'`

## HTML Output Structure

The plugin generates the following HTML structure for each note:

```html
<blockquote class="remark-note remark-note-{type}">
  <div class="remark-note-header">
    <span class="remark-note-icon">
      <!-- SVG icon -->
    </span>
    <span class="remark-note-title">{type}</span>
  </div>
  <div class="remark-note-content">
    <!-- Original markdown content -->
  </div>
</blockquote>
```

**CSS Classes:**

- `remark-note` - Base class applied to all notes
- `remark-note-{type}` - Specific class for note type (e.g., `remark-note-tip`)
- `remark-note-header` - Container for icon and title
- `remark-note-icon` - Icon wrapper
- `remark-note-title` - Title text (displays the note type)
- `remark-note-content` - Content wrapper

With a custom prefix (e.g., `'my'`), classes become:
- `my-remark-note`
- `my-remark-note-{type}`
- `my-remark-note-header`
- etc.

## Browser and Environment Support

- **Node.js:** v14.0.0 or higher
- **Remark:** v13.0.0 or higher
- **Module System:** ESM (ES Modules)
- **TypeScript:** Full type definitions included

**Browser Support:**

The generated HTML and CSS work in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Error Handling

The plugin implements graceful degradation:

**Invalid note types:**

If an invalid note type is encountered (e.g., `[!warning]`), the plugin leaves the blockquote unchanged. No error is thrown.

```markdown
> [!warning]
> This is not a valid note type
```

Output: Regular blockquote (not transformed)

**Valid note types:**

Only these types are transformed:
- `note`
- `tip`
- `important`
- `quote`
- `bonus`

## Performance Considerations

**Style Injection:**

When `injectStyles` is `true`, styles are injected only once per document, regardless of how many notes are present.

**AST Processing:**

The plugin uses efficient AST traversal with `unist-util-visit`, processing only blockquote nodes.

**Bundle Size:**

- Plugin code: ~8KB minified
- CSS file: ~2KB minified
- Total: ~10KB for complete functionality

## MDX Compatibility

The plugin is fully compatible with MDX. It transforms markdown blockquotes in `.mdx` files just like in `.md` files.

```mdx
import { SomeComponent } from './components';

> [!note]
> This note works in MDX!

<SomeComponent />

> [!tip]
> You can mix markdown notes with JSX components.
```

## TypeScript Usage

Full type safety with TypeScript:

```typescript
import remarkNotes from 'remark-notes-plugin';
import type { RemarkNotesOptions, ValidNoteType } from 'remark-notes-plugin';

// Type-safe configuration
const options: RemarkNotesOptions = {
  classPrefix: 'docs',
  injectStyles: false,
};

// Type-safe note type checking
const noteType: ValidNoteType = 'tip'; // ✓ Valid
const invalid: ValidNoteType = 'warning'; // ✗ TypeScript error
```

## Next Steps

- [Installation Guide](/docs/getting-started/installation)
- [Usage Examples](/docs/getting-started/usage)
- [CSS Customization](/docs/customization/styling)
- [Framework Integration](/docs/guides/frameworks)
