---
sidebar_position: 2
---

# Troubleshooting

Common issues and solutions when using `remark-notes-plugin`.

## Installation Issues

### Module Not Found

**Problem:**
```
Error: Cannot find module 'remark-notes-plugin'
```

**Solutions:**

1. Verify the package is installed:
   ```bash
   npm list remark-notes-plugin
   ```

2. Reinstall the package:
   ```bash
   npm install remark-notes-plugin
   ```

3. Clear your package manager cache:
   ```bash
   npm cache clean --force
   # or
   yarn cache clean
   # or
   pnpm store prune
   ```

### Type Definitions Not Found

**Problem:**
```
Could not find a declaration file for module 'remark-notes-plugin'
```

**Solution:**

The package includes TypeScript definitions. Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": false
  }
}
```

## Style Issues

### Styles Not Appearing

**Problem:** Notes appear as plain blockquotes without styling.

**Common Causes:**

1. **Missing CSS import** when `injectStyles: false`:
   ```javascript
   // Add this to your app:
   import 'remark-notes-plugin/styles.css';
   ```

2. **CSS not loaded** in build output:
   ```javascript
   // Ensure your bundler handles CSS imports
   // For Vite, Webpack, this should work automatically
   ```

3. **CSP (Content Security Policy)** blocking inline styles:
   ```javascript
   // Use manual import instead:
   unified().use(remarkNotes, { injectStyles: false });
   import 'remark-notes-plugin/styles.css';
   ```

4. **CSS load order** - styles being overridden:
   ```css
   /* Increase specificity */
   blockquote[class*="remark-note"] {
     /* Your styles */
   } !important; /* Last resort */
   ```

### Styles Conflict with Existing CSS

**Problem:** Note styles clash with your site's CSS.

**Solutions:**

1. **Use a custom class prefix:**
   ```javascript
   unified().use(remarkNotes, { classPrefix: 'my-docs' });
   ```

2. **Scope your overrides:**
   ```css
   .documentation-content [class*="remark-note"] {
     /* Your custom styles */
   }
   ```

3. **Disable default styles completely:**
   ```javascript
   unified().use(remarkNotes, { injectStyles: false });
   // Provide your own CSS
   ```

### Dark Mode Not Working

**Problem:** Notes don't change appearance in dark mode.

**Solution:**

Ensure your theme uses the standard `[data-theme='dark']` selector:

```css
/* Add dark mode overrides */
[data-theme='dark'] blockquote[class*="remark-note"] {
  background-color: #1a202c;
  border-color: #4a5568;
  color: #e2e8f0;
}
```

For other theme selectors:

```css
.dark blockquote[class*="remark-note"],
html.dark blockquote[class*="remark-note"] {
  /* Dark mode styles */
}
```

## Build Issues

### SSR/SSG Errors

**Problem:**
```
ReferenceError: document is not defined
TypeError: fs.readFileSync is not a function
```

**Solution:**

The plugin is designed for SSR. If you see these errors:

1. **Ensure you're using the correct import:**
   ```javascript
   // Server-side (Node.js)
   import remarkNotes from 'remark-notes-plugin';
   
   // NOT the browser build
   ```

2. **For Vite/Webpack, configure externals:**
   ```javascript
   // vite.config.js
   export default {
     ssr: {
       noExternal: ['remark-notes-plugin']
     }
   }
   ```

### Next.js Build Errors

**Problem:** Build fails with MDX or remark errors.

**Solutions:**

1. **Next.js 13+ App Router:**
   ```javascript
   // next.config.mjs
   import createMDX from '@next/mdx';
   import remarkNotes from 'remark-notes-plugin';
   
   const withMDX = createMDX({
     options: {
       remarkPlugins: [remarkNotes],
     },
   });
   
   export default withMDX({
     pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
   });
   ```

2. **Next.js Pages Router:**
   ```javascript
   // next.config.js
   const withMDX = require('@next/mdx')({
     options: {
       remarkPlugins: [require('remark-notes-plugin')],
     },
   });
   
   module.exports = withMDX({
     pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
   });
   ```

3. **Disable style injection for better SSR:**
   ```javascript
   remarkPlugins: [
     [remarkNotes, { injectStyles: false }]
   ]
   ```

### Astro Build Errors

**Problem:** Build fails or styles missing.

**Solution:**

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

Import styles in your layout:

```astro
---
// src/layouts/Layout.astro
import 'remark-notes-plugin/styles.css';
---
```

## Runtime Issues

### Notes Not Being Transformed

**Problem:** Blockquotes remain as plain blockquotes.

**Checklist:**

1. **Verify syntax is correct:**
   ```markdown
   > [!note]
   > Text here
   
   // NOT:
   > [note]  ❌
   > !note   ❌
   [!note]  ❌
   ```

2. **Check note type is valid:**
   ```markdown
   Valid: note, tip, important, quote, bonus
   
   Invalid: warning, info, danger, caution
   ```

3. **Ensure plugin is in pipeline:**
   ```javascript
   unified()
     .use(remarkParse)
     .use(remarkNotes)  // Must be AFTER parse
     .use(remarkRehype)
     .process(content);
   ```

4. **Check MDX processing:**
   ```javascript
   // For MDX, may need specific configuration
   remarkPlugins: [remarkNotes]
   ```

### Invalid Note Types Silently Ignored

**Problem:** Unknown note types don't produce notes.

**Expected Behavior:** This is intentional! Invalid types gracefully degrade to regular blockquotes.

**Valid types:** `note`, `tip`, `important`, `quote`, `bonus`

**To add custom types:** You'll need to modify the source code or create a custom plugin variant.

## Performance Issues

### Slow Build Times

**Problem:** Build takes significantly longer with the plugin.

**Optimizations:**

1. **Disable style injection:**
   ```javascript
   unified().use(remarkNotes, { injectStyles: false });
   // Import CSS once in your layout instead
   ```

2. **Cache markdown processing:**
   ```javascript
   // Use your framework's caching mechanisms
   // For example, Next.js automatic MDX caching
   ```

3. **Limit plugin usage:**
   ```javascript
   // Only apply to specific content
   if (isDocumentation) {
     remarkPlugins.push(remarkNotes);
   }
   ```

### Large Bundle Size

**Problem:** Plugin increases bundle size.

**Solution:**

The plugin is very lightweight (~10KB total):
- Plugin code: ~8KB
- CSS: ~2KB

If size is critical:

1. Use tree-shaking (automatic with ES modules)
2. Disable style injection and use minimal custom CSS
3. Consider if you really need all note types

## MDX-Specific Issues

### MDX Components Not Working Inside Notes

**Problem:**
```markdown
> [!note]
> <MyComponent /> doesn't render
```

**Solution:**

MDX components work inside notes. Ensure:

1. **Component is properly imported:**
   ```mdx
   import MyComponent from './MyComponent';
   
   > [!note]
   > <MyComponent />
   ```

2. **Syntax is valid MDX:**
   ```mdx
   > [!note]
   > Regular text
   >
   > <MyComponent />
   ```

### Code Blocks in Notes

**Problem:** Code blocks inside notes not rendering correctly.

**Solution:**

Ensure proper markdown syntax:

```markdown
> [!tip]
> Here's how to use it:
>
> ```javascript
> const x = 1;
> ```
```

Note the empty line before the code block!

## Framework-Specific Issues

### Gatsby: GraphQL Queries Failing

**Problem:** GraphQL can't query MDX with notes.

**Solution:**

```javascript
// gatsby-config.js
{
  resolve: 'gatsby-plugin-mdx',
  options: {
    mdxOptions: {
      remarkPlugins: [require('remark-notes-plugin')],
    },
  },
}
```

### Docusaurus: Admonitions Conflicting

**Problem:** Docusaurus admonitions and remark-notes conflict.

**Solution:**

They use different syntaxes and shouldn't conflict:

```markdown
<!-- Docusaurus admonition -->
:::note
This is a Docusaurus admonition
:::

<!-- remark-notes-plugin -->
> [!note]
> This is a remark note
```

Both can coexist. Choose based on preference.

### VitePress: Plugin Not Working

**Problem:** VitePress uses markdown-it, not remark.

**Solution:**

VitePress requires additional configuration as it doesn't use remark by default. Consider:

1. Using VitePress's built-in custom containers instead
2. Using a markdown-it plugin for similar functionality
3. Pre-processing markdown files before VitePress build

## Browser Compatibility

### IE11 Support

**Problem:** Notes don't work in Internet Explorer 11.

**Solution:**

IE11 is not supported. The plugin uses modern CSS features:
- CSS Grid
- CSS Custom Properties
- Flexbox

For legacy browser support:
- Add polyfills
- Transpile CSS with PostCSS and Autoprefixer
- Use a CSS-in-JS solution

### Mobile Safari Issues

**Problem:** Rendering issues on iOS Safari.

**Solution:**

The plugin is mobile-optimized. If you encounter issues:

1. **Check your viewport meta tag:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1">
   ```

2. **Test responsive breakpoints:**
   ```css
   @media (max-width: 768px) {
     [class*="remark-note"] {
       /* Mobile-specific overrides */
     }
   }
   ```

## Getting Help

If your issue isn't covered here:

### 1. Check Existing Issues

Search [GitHub Issues](https://github.com/rishichawda/remark-notes-plugin/issues) for similar problems.

### 2. Create a Minimal Reproduction

Use [StackBlitz](https://stackblitz.com/) or [CodeSandbox](https://codesandbox.io/) to create a minimal example.

### 3. Open an Issue

Include:
- Node.js version (`node --version`)
- Package manager version
- Framework and version
- Plugin configuration
- Error messages
- Minimal reproduction

### 4. Check the Documentation

- [API Reference](/docs/api/overview) - Complete API docs
- [Framework Integration](/docs/guides/frameworks) - Framework-specific guides
- [CSS Customization](/docs/customization/styling) - Styling help

## FAQ

### Can I use custom note types?

Not directly. The plugin supports five types: `note`, `tip`, `important`, `quote`, `bonus`. To add custom types, you'd need to fork and modify the source.

### Does it work with rehype plugins?

Yes! Use it in your remark pipeline before converting to rehype:

```javascript
unified()
  .use(remarkParse)
  .use(remarkNotes)
  .use(remarkRehype)
  .use(rehypePluginHere)
  .use(rehypeStringify);
```

### Can I disable specific note types?

Not built-in, but you can override their styles to hide them:

```css
[class*="remark-note-bonus"] {
  display: none;
}
```

### Is it compatible with GitHub Flavored Markdown?

Yes! It uses the same `[!type]` syntax as GitHub Alerts, making it compatible.

### Can I change the icons?

Yes, by overriding the CSS and providing your own SVGs or icon fonts:

```css
[class*="remark-note-icon"] {
  /* Hide default icon */
  visibility: hidden;
}

[class*="remark-note-icon"]::before {
  visibility: visible;
  content: '🔔'; /* Your custom icon */
}
```

---

Still stuck? [Open an issue](https://github.com/rishichawda/remark-notes-plugin/issues) on GitHub!
