---
sidebar_position: 1
---

# CSS Customization

Learn how to customize the appearance of your notes to match your design system.

## CSS Class Reference

The plugin generates the following CSS classes for each note:

### Container Classes

```css
.remark-note              /* Base class for all notes */
.remark-note-{type}       /* Type-specific class (note, tip, important, quote, bonus) */
```

### Element Classes

```css
.remark-note-header       /* Container for icon and title */
.remark-note-icon         /* Icon wrapper */
.remark-note-title        /* Title text */
.remark-note-content      /* Content wrapper */
```

### Complete HTML Structure

```html
<blockquote class="remark-note remark-note-tip">
  <div class="remark-note-header">
    <span class="remark-note-icon">
      <!-- SVG icon -->
    </span>
    <span class="remark-note-title">tip</span>
  </div>
  <div class="remark-note-content">
    <!-- Your markdown content -->
  </div>
</blockquote>
```

## Custom Class Prefix

Add a custom prefix to all class names:

```javascript
import remarkNotes from 'remark-notes-plugin';

unified().use(remarkNotes, { 
  classPrefix: 'docs' 
});
```

Generated classes:

```css
.docs-remark-note
.docs-remark-note-tip
.docs-remark-note-header
.docs-remark-note-icon
.docs-remark-note-title
.docs-remark-note-content
```

> [!tip]
> The default CSS uses attribute selectors like `[class*="remark-note"]`, so it works automatically with any prefix!

## Overriding Default Styles

### Method 1: CSS Variables (Recommended)

Define custom CSS variables in your stylesheet:

```css
:root {
  /* Note type colors */
  --note-color: #4285f4;
  --tip-color: #34a853;
  --important-color: #ea4335;
  --quote-color: #7e57c2;
  --bonus-color: #ff9800;
  
  /* Note styling */
  --note-border-radius: 12px;
  --note-padding: 1.5rem;
  --note-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Method 2: Override Specific Classes

Override the plugin's default styles:

```css
/* Override all notes */
blockquote[class*="remark-note"] {
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Override specific note type */
blockquote[class*="remark-note-tip"] {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-color: #4caf50;
}

/* Override header */
[class*="remark-note-header"] {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid currentColor;
}

/* Override icon */
[class*="remark-note-icon"] {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  padding: 8px;
}
```

## Dark Mode Support

Add dark mode variants for your notes:

```css
/* Light mode (default) */
:root {
  --note-bg: #e3f2fd;
  --note-border: #2196f3;
  --note-text: #1565c0;
}

/* Dark mode */
[data-theme='dark'] {
  --note-bg: #1a237e;
  --note-border: #3f51b5;
  --note-text: #7986cb;
}

/* Apply variables */
blockquote[class*="remark-note-note"] {
  background-color: var(--note-bg);
  border-color: var(--note-border);
  color: var(--note-text);
}
```

### Framework-Specific Dark Mode

**Tailwind CSS:**

```css
@layer components {
  .remark-note {
    @apply bg-gray-50 border-gray-300;
    @apply dark:bg-gray-800 dark:border-gray-600;
  }
  
  .remark-note-note {
    @apply bg-blue-50 border-blue-500;
    @apply dark:bg-blue-900/20 dark:border-blue-400;
  }
}
```

**CSS Modules:**

```css
.note {
  background: #e3f2fd;
  border-color: #2196f3;
}

:global([data-theme='dark']) .note {
  background: #1a237e;
  border-color: #3f51b5;
}
```

## Complete Custom Theme

Create a completely custom theme by overriding all default styles:

```css
/* Disable default styles */
/* Set injectStyles: false in plugin options */

/* Custom note container */
.remark-note {
  position: relative;
  margin: 2rem 0;
  padding: 1.5rem;
  padding-left: 4rem;
  border-left: 4px solid;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.remark-note:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Custom header */
.remark-note-header {
  position: absolute;
  left: 1rem;
  top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Custom icon */
.remark-note-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: currentColor;
  color: white;
  padding: 6px;
}

/* Custom title */
.remark-note-title {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

/* Custom content */
.remark-note-content {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

/* Type-specific colors */
.remark-note-note {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.remark-note-tip {
  border-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
}

.remark-note-important {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.remark-note-quote {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
}

.remark-note-bonus {
  border-color: #ec4899;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
}
```

## Minimal/Compact Theme

A minimalist theme with less visual weight:

```css
.remark-note {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border-left: 3px solid currentColor;
  background: transparent;
  box-shadow: none;
}

.remark-note-header {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.remark-note-icon {
  width: 20px;
  height: 20px;
}

.remark-note-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

.remark-note-content {
  font-size: 0.95rem;
  color: inherit;
}

.remark-note-content > *:first-child {
  margin-top: 0;
}

.remark-note-content > *:last-child {
  margin-bottom: 0;
}
```

## GitHub-Style Theme

Match GitHub's alert style:

```css
.remark-note {
  margin: 16px 0;
  padding: 8px 16px;
  border-left: 4px solid;
  border-radius: 0;
  background: var(--note-bg);
  box-shadow: none;
}

.remark-note-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
}

.remark-note-icon {
  width: 16px;
  height: 16px;
}

.remark-note-title {
  font-size: 14px;
  text-transform: capitalize;
}

.remark-note-content {
  font-size: 14px;
  line-height: 1.5;
}

/* GitHub colors */
.remark-note-note {
  --note-bg: #ddf4ff;
  border-color: #54aeff;
  color: #0969da;
}

.remark-note-tip {
  --note-bg: #d4f8d4;
  border-color: #36c736;
  color: #1a7f37;
}

.remark-note-important {
  --note-bg: #fcf0d4;
  border-color: #d4a72c;
  color: #7d4e00;
}

.remark-note-quote {
  --note-bg: #f0f0f0;
  border-color: #656d76;
  color: #1f2328;
}
```

## Colorful Gradient Theme

Bold gradients and modern styling:

```css
.remark-note {
  margin: 2rem 0;
  padding: 0;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
}

.remark-note-header {
  padding: 1.25rem 1.5rem;
  background: var(--header-gradient);
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.remark-note-icon {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.remark-note-title {
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.remark-note-content {
  padding: 1.5rem;
  background: white;
  font-size: 1rem;
  line-height: 1.6;
}

/* Gradient backgrounds */
.remark-note-note {
  --header-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.remark-note-tip {
  --header-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.remark-note-important {
  --header-gradient: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.remark-note-quote {
  --header-gradient: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.remark-note-bonus {
  --header-gradient: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
}

[data-theme='dark'] .remark-note-content {
  background: #1a202c;
  color: #e2e8f0;
}
```

## Accessibility Considerations

Ensure your custom styles maintain accessibility:

```css
/* Maintain sufficient color contrast */
.remark-note-content {
  color: #1a202c; /* Dark text on light background */
}

[data-theme='dark'] .remark-note-content {
  color: #e2e8f0; /* Light text on dark background */
}

/* Focus styles for keyboard navigation */
.remark-note:focus-within {
  outline: 2px solid var(--ifm-color-primary);
  outline-offset: 2px;
}

/* Ensure icons are decorative or have proper labels */
.remark-note-icon {
  aria-hidden: true;
}

/* Make titles screen-reader friendly */
.remark-note-title {
  /* Visually hidden but accessible */
  clip-path: inset(50%);
  /* Or visible as in default */
}
```

## Print Styles

Optimize notes for printing:

```css
@media print {
  .remark-note {
    page-break-inside: avoid;
    border: 2px solid black;
    box-shadow: none;
  }
  
  .remark-note-icon svg {
    stroke: black !important;
    fill: black !important;
  }
  
  .remark-note-note {
    background: white;
    border-color: black;
  }
}
```

## Mobile Optimization

Responsive styles for mobile devices:

```css
@media (max-width: 768px) {
  .remark-note {
    margin: 1rem -1rem; /* Bleed to edges */
    border-radius: 0;
    padding: 1rem;
  }
  
  .remark-note-header {
    font-size: 0.9rem;
  }
  
  .remark-note-icon {
    width: 24px;
    height: 24px;
  }
  
  .remark-note-content {
    font-size: 0.95rem;
  }
}
```

## Best Practices

### 1. Use CSS Custom Properties

Define colors and dimensions as variables for easy theming:

```css
:root {
  --note-spacing: 1.5rem;
  --note-radius: 8px;
  --note-icon-size: 24px;
}
```

### 2. Maintain Semantic HTML

The plugin uses `<blockquote>` elements semantically. Preserve this in your styles:

```css
/* Good: Targets the generated structure */
blockquote[class*="remark-note"] {
  /* styles */
}

/* Avoid: Changing semantic meaning */
.remark-note {
  display: flex; /* Don't make blockquote a flex container */
}
```

### 3. Test Across Themes

Always test your custom styles in both light and dark modes:

```css
/* Light mode */
.remark-note {
  background: white;
  color: black;
}

/* Dark mode */
[data-theme='dark'] .remark-note {
  background: #1a202c;
  color: white;
}
```

### 4. Consider Content Variety

Test with different content types:

- Short one-liners
- Multiple paragraphs
- Lists and code blocks
- Nested elements

## Example: Complete Custom Implementation

Here's a production-ready custom theme:

```css
/* Disable auto-injection in plugin options */
/* Use: { injectStyles: false } */

/* Custom theme variables */
:root {
  --note-radius: 12px;
  --note-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --note-padding: 1.5rem;
  --note-gap: 1rem;
  
  /* Color palette */
  --note-blue: #3b82f6;
  --note-green: #10b981;
  --note-orange: #f59e0b;
  --note-purple: #8b5cf6;
  --note-pink: #ec4899;
}

[data-theme='dark'] {
  --note-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  --note-blue: #60a5fa;
  --note-green: #34d399;
  --note-orange: #fbbf24;
  --note-purple: #a78bfa;
  --note-pink: #f472b6;
}

/* Base note styles */
.remark-note {
  margin: var(--note-gap) 0;
  padding: var(--note-padding);
  border-radius: var(--note-radius);
  border: 1px solid;
  box-shadow: var(--note-shadow);
  transition: all 0.2s ease;
}

/* Import remaining styles... */
```

## Next Steps

- [Framework Integration](/docs/guides/frameworks) - Use with popular frameworks
- [API Reference](/docs/api/overview) - Complete API documentation
- [Troubleshooting](/docs/guides/troubleshooting) - Common issues and solutions
