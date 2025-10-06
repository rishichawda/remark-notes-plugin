---
sidebar_position: 3
---

# Advanced Usage

This guide covers more advanced topics and integration patterns when using `remark-notes-plugin`.

## Using with MDX

When using the plugin with MDX (Markdown + JSX), you can combine notes with React components for even more powerful documentation:

```jsx
import { MyComponent } from '../components/MyComponent';

> [!tip]
> You can use React components inside your notes when using MDX.
>
> <MyComponent />
```

## Plugin Configuration

`remark-notes-plugin` supports two configuration options to customize its behavior:

### Class Prefix

Add a custom prefix to all generated CSS class names:

```javascript
import { unified } from 'unified';
import remarkNotes from 'remark-notes-plugin';

unified().use(remarkNotes, { 
  classPrefix: 'my-callout' 
});
```

**Default classes** (no prefix):

- `.remark-note`
- `.remark-note-tip`
- `.remark-note-header`
- `.remark-note-icon`
- etc.

**With prefix** `'my-callout'`:

- `.my-callout-remark-note`
- `.my-callout-remark-note-tip`
- `.my-callout-remark-note-header`
- `.my-callout-remark-note-icon`
- etc.

This is useful when you need to avoid CSS conflicts or integrate with existing design systems.

### Style Injection Control

Control whether the plugin automatically injects CSS styles:

```javascript
// Automatic injection (default)
unified().use(remarkNotes);

// Disable auto-injection (manual import)
unified().use(remarkNotes, { injectStyles: false });
```

When `injectStyles` is `false`, you must manually import the styles:

```javascript
import 'remark-notes-plugin/styles.css';
```

**When to disable auto-injection:**

- Server-Side Rendering (SSR) with separate CSS extraction
- Using build tools that handle CSS imports separately (Vite, Webpack, etc.)
- Providing completely custom styles
- Better control over style loading order and caching


### Combined Configuration

You can use both options together:

```javascript
unified().use(remarkNotes, {
  classPrefix: 'custom',
  injectStyles: false
});
```

## Integrating with Other Remark Plugins

`remark-notes-plugin` can be used alongside other remark plugins. Here's how to use it with other popular plugins:

```javascript
import { remark } from 'remark';
import remarkNotes from 'remark-notes-plugin';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkHtml from 'remark-html';

const result = await remark()
  .use(remarkGfm) // GitHub Flavored Markdown support
  .use(remarkMath) // Math support
  .use(remarkNotes) // Our notes plugin
  .use(remarkHtml)
  .process(markdownContent);
```

**Note**: The order of plugins matters. Generally, `remark-notes-plugin` should be placed before the final output transformer (like `remark-html` or `remark-rehype`).

## Using with Unified Pipeline

For more complex document processing pipelines, you can use the unified ecosystem:

```javascript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(remarkParse) // Parse markdown
  .use(remarkNotes) // Process notes
  .use(remarkRehype) // Convert to HTML AST
  .use(rehypeStringify); // Convert to HTML string

const result = await processor.process(markdownContent);
```

**Note**: The order of plugins matters. `remark-notes-plugin` should be placed before the final output transformer (like `remark-rehype` or `rehype-stringify`).


## Programmatic HTML Generation

You can also generate HTML for notes programmatically without writing markdown:

```javascript
import { remark } from 'remark';
import remarkNotes from 'remark-notes-plugin';
import html from 'remark-html';

// Generate a note programmatically
function generateNote(type, content) {
  const markdown = `> [!${type}]\n> ${content.replace(/\n/g, '\n> ')}`;
  
  const result = remark()
    .use(remarkNotes)
    .use(html)
    .processSync(markdown);
    
  return result.toString();
}

// Usage
const tipHtml = generateNote('tip', 'This is a programmatically generated tip.');
document.getElementById('my-tip').innerHTML = tipHtml;
```

## Server-Side Rendering Considerations

When using the plugin in an SSR (Server-Side Rendering) context, ensure that your CSS is properly included in the server output. For example, with Next.js:

```jsx
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link 
          rel="stylesheet" 
          href="/_next/static/css/styles.css" // Your bundled CSS including remark-notes-plugin styles
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```
