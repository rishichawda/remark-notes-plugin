---
sidebar_position: 1
---

# Introduction

Transform your markdown documentation from plain text to polished content with beautifully styled note callouts.

![npm](https://img.shields.io/npm/v/remark-notes-plugin)
![npm](https://img.shields.io/npm/dt/remark-notes-plugin)
![GitHub](https://img.shields.io/github/license/rishichawda/remark-notes-plugin)

## What is remark-notes-plugin?

**remark-notes-plugin** is a powerful [remark](https://github.com/remarkjs/remark) plugin that automatically converts GitHub-flavored alert syntax into beautifully styled note components. Write simple markdown, get professional-looking callouts.

```markdown
> [!tip]
> Pro tip: This plugin makes your docs look amazing!
```

Becomes a beautiful, styled tip callout with an icon, custom colors, and professional typography.

## Why Use This Plugin?

### 📝 Familiar Syntax

Uses the same `[!type]` syntax as GitHub Alerts - no new syntax to learn. If you write markdown on GitHub, you already know how to use this plugin.

### 🎨 Professional Design

Five carefully designed note types with:

- Custom icons for each type
- Thoughtful color palettes
- Smooth animations and hover effects
- Full dark mode support

### ⚡ Zero Configuration

Works out of the box with sensible defaults:

- Automatic style injection
- Responsive design
- Accessibility built-in
- No setup required

### 🔧 Fully Customizable

When you need more control:

- Custom CSS class prefixes
- Manual style import
- Complete style override capability
- Framework-specific optimizations

### 🚀 Framework Agnostic

Seamlessly integrates with:

- Astro
- Next.js (App Router & Pages Router)
- Gatsby
- Docusaurus
- Any remark-based system

## Quick Start

Get up and running in under 2 minutes:

**1. Install**

```bash
npm install remark-notes-plugin
```

**2. Configure**

```javascript
import remarkNotes from 'remark-notes-plugin';

// Add to your remark pipeline
unified()
  .use(remarkParse)
  .use(remarkNotes)  // 👈 That's it!
  .use(remarkRehype)
  .use(rehypeStringify);
```

**3. Write**

```markdown
> [!note]
> Now you can write beautiful notes in your markdown!
```

**Done!** Your notes are now beautifully styled.

## Five Note Types

Each type serves a specific purpose and has its own distinct visual style:

### 📘 Note

For general information, definitions, and helpful context.

> [!note]
> This is a standard note with a blue theme. Perfect for providing additional context or explaining concepts.

### 💡 Tip

For best practices, helpful suggestions, and pro tips.

> [!tip]
> Share expert advice and shortcuts that help readers work more efficiently.

### ⚠️ Important

For critical information that demands attention.

> [!important]
> Highlight warnings, requirements, and information that readers must not miss.

### 💬 Quote

For testimonials, quotations, and highlighted text.

> [!quote]
> "The best way to predict the future is to invent it." — Alan Kay

### ⭐ Bonus

For advanced techniques, optional features, and extra value.

> [!bonus]
> Go beyond the basics with advanced tips and additional features.

## Features at a Glance

- ✅ **Simple Integration** - Drop into any remark pipeline in seconds
- ✅ **GitHub-Compatible** - Same syntax as GitHub Alerts
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **MDX Compatible** - Works seamlessly with MDX files
- ✅ **Accessible** - WCAG compliant with proper semantic HTML
- ✅ **Responsive** - Mobile-optimized out of the box
- ✅ **Customizable** - Override styles with CSS

## Real-World Use Cases

### Documentation Sites

Make your technical documentation more engaging and scannable:

```markdown
## Installation

> [!important]
> Requires Node.js 14 or higher

> [!tip]
> Use pnpm for faster installs: `pnpm add package-name`
```

### Blog Posts

Add visual interest and highlight key points:

```markdown
> [!quote]
> "This plugin transformed our documentation from boring to beautiful!"
> — Happy User

> [!bonus]
> Want to take it further? Check out our advanced customization guide.
```

### Tutorial Content

Structure learning content with clear visual cues:

```markdown
> [!note]
> Before starting, make sure you understand JavaScript basics.

> [!tip]
> Follow along by cloning the example repository.

> [!important]
> Save your work before running this command!
```

## Browser Support

Works in all modern browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps

Ready to enhance your markdown? Here's where to go:

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', margin: '2rem 0'}}>
  <div style={{padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px'}}>
    <h3 style={{marginTop: 0}}>📦 Installation</h3>
    <p>Get started in less than 2 minutes</p>
    <a href="/docs/getting-started/installation">Install Now →</a>
  </div>
  
  <div style={{padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px'}}>
    <h3 style={{marginTop: 0}}>📖 Usage Guide</h3>
    <p>Learn how to use the plugin</p>
    <a href="/docs/getting-started/usage">View Guide →</a>
  </div>
  
  <div style={{padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px'}}>
    <h3 style={{marginTop: 0}}>🎨 Customization</h3>
    <p>Make it match your design system</p>
    <a href="/docs/customization/styling">Customize →</a>
  </div>
  
  <div style={{padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px'}}>
    <h3 style={{marginTop: 0}}>🔌 Frameworks</h3>
    <p>Integration guides for popular tools</p>
    <a href="/docs/guides/frameworks">See Integrations →</a>
  </div>
</div>

## Questions?

- **Need help?** Check our [troubleshooting guide](/docs/guides/troubleshooting)
- **Want the full API?** See the [API reference](/docs/api/overview)
- **Found a bug?** [Open an issue](https://github.com/rishichawda/remark-notes-plugin/issues)
- **Want to contribute?** [View the repo](https://github.com/rishichawda/remark-notes-plugin)

---

Built with ❤️ for the markdown community. [Star us on GitHub](https://github.com/rishichawda/remark-notes-plugin) ⭐
