---
sidebar_position: 2
---

# Usage

This guide explains how to use `remark-notes-plugin` with various frameworks and tools.

## Basic Usage

Here's how to use the plugin with the remark processor:

```javascript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkNotes from 'remark-notes-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// Process markdown content with the notes plugin
const result = await unified()
  .use(remarkParse)
  .use(remarkNotes)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(`
    > [!note]
    > This is a note.
  `);

console.log(result.toString());
```

## Configuration Options

The plugin accepts an optional configuration object:

```javascript
import remarkNotes from 'remark-notes-plugin';

// Default configuration (auto-inject styles)
unified().use(remarkNotes);

// Custom class prefix
unified().use(remarkNotes, { 
  classPrefix: 'my-callout' 
});
// Generates: my-callout-remark-note, my-callout-remark-note-tip, etc.

// Disable automatic style injection
unified().use(remarkNotes, { 
  injectStyles: false 
});

// Both options
unified().use(remarkNotes, { 
  classPrefix: 'custom',
  injectStyles: false 
});
```

## With Astro

Astro has excellent support for remark plugins. Add the plugin to your `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import remarkNotes from 'remark-notes-plugin';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkNotes],
  },
});
```

## With Next.js

For Next.js projects using MDX:

```javascript
// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-notes-plugin')],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
```

Import the CSS in your `_app.js` or `_app.tsx`:

```javascript
// pages/_app.js
// Only needed if you disable auto-injection
import 'remark-notes-plugin/styles.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

Or use the default auto-injection by not disabling it in the plugin options.

## With Gatsby

For Gatsby projects:

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins: [require('remark-notes-plugin')],
      },
    },
  ],
};
```

Import the CSS in your layout component:

```javascript
// src/components/layout.js
// Only needed if you disable auto-injection
import 'remark-notes-plugin/styles.css';

const Layout = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
```

Or use the default auto-injection by not disabling it in the plugin options.
