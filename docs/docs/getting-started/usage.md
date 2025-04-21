---
sidebar_position: 2
---

# Usage

This guide explains how to use `remark-notes-plugin` with various frameworks and tools.

## Basic Usage

Here's how to use the plugin with the remark processor:

```javascript
import { remark } from 'remark';
import remarkNotes from 'remark-notes-plugin';
import html from 'remark-html';

// Process markdown content with the notes plugin
const result = await remark()
  .use(remarkNotes)
  .use(html)
  .process(`
    > [!note]
    > This is a note.
  `);

console.log(result.toString());
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
import 'remark-notes-plugin/dist/styles.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

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
import 'remark-notes-plugin/dist/styles.css';

const Layout = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
```