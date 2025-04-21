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

The plugin comes with default styles that are included in your project by default. However, if you want to find them in your project, there are two ways to do this:

### Option 1: Import CSS directly in JavaScript/TypeScript

If you're using a bundler that supports CSS imports (like webpack, Parcel, Vite, etc.), you can import the styles directly:

```javascript
// Import the plugin styles
import 'remark-notes-plugin/dist/styles.css';
```

### Option 2: Include CSS in your HTML

Alternatively, you can include the CSS file directly in your HTML:

```html
<link rel="stylesheet" href="node_modules/remark-notes-plugin/dist/styles.css">
```

Or copy the CSS file to your public assets directory and include it from there.