---
sidebar_position: 1
---

# Installation

You can install `remark-notes-plugin` via npm, yarn, or pnpm:

```bash
# Using npm
npm install remark-notes-plugin

# Using yarn
yarn add remark-notes-plugin

# Using pnpm
pnpm add remark-notes-plugin
```

## Requirements

This plugin is compatible with:
- remark v13.0.0 and above
- Node.js v14.0.0 and above

## Including CSS Styles

The plugin automatically injects styles by default, so no additional setup is required. However, you can customize this behavior:

### Option 1: Automatic Style Injection (Default)

By default, the plugin automatically injects styles when you use it:

```javascript
import remarkNotes from 'remark-notes-plugin';

// Styles are automatically included
unified().use(remarkNotes);
```

### Option 2: Manual Style Import

If you prefer to control when and how styles are loaded (e.g., for SSR, custom build tools, or better caching), you can disable auto-injection:

```javascript
import remarkNotes from 'remark-notes-plugin';
import 'remark-notes-plugin/styles.css'; // Import styles manually

unified().use(remarkNotes, { injectStyles: false });
```

### Option 3: Include CSS in HTML

Alternatively, you can include the CSS file directly in your HTML:

```html
<link rel="stylesheet" href="node_modules/remark-notes-plugin/dist/styles.css">
```

Or copy the CSS file to your public assets directory and include it from there.

:::tip
For most use cases, the default automatic injection works great. Only disable it if you have specific requirements like SSR optimization or custom style bundling.
:::