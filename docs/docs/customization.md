# Customization

## CSS class reference

| Class | Purpose |
|---|---|
| `.remark-note` | Base class, all note types |
| `.remark-note-{type}` | Type-specific (`note`/`tip`/`important`/`quote`/`bonus`) |
| `.remark-note-header` | Icon + title row |
| `.remark-note-icon` | Icon wrapper |
| `.remark-note-title` | Title text |
| `.remark-note-content` | Content wrapper |

```html
<blockquote class="remark-note remark-note-tip">
  <div class="remark-note-header">
    <span class="remark-note-icon"><!-- SVG icon --></span>
    <span class="remark-note-title">tip</span>
  </div>
  <div class="remark-note-content">
    <p>Note content...</p>
  </div>
</blockquote>
```

## Custom class prefix

```javascript
unified().use(remarkNotes, { classPrefix: 'my' });
// Generates: class="my-remark-note my-remark-note-tip",
// my-remark-note-header, my-remark-note-icon, my-remark-note-title, my-remark-note-content
```

The default CSS uses attribute selectors (`[class*="remark-note"]`), so it applies automatically regardless of prefix.

## Overriding styles

**Method 1 (recommended): the `--rn-accent` custom property.** Each note type sets one custom property that drives its border, background tint, icon color, and title color together:

```css
blockquote[class*="remark-note-tip"] {
  --rn-accent: #10b981;
}
```

**Method 2: direct overrides.** Everything else (padding, border-radius, font) is a fixed value in the base rule — override it directly:

```css
blockquote[class*="remark-note"] {
  padding: 2rem;
  border-radius: 12px;
}
```

If you disable auto-injection (`injectStyles: false`), import the default stylesheet before your overrides so specificity/order works as expected:

```javascript
import 'remark-notes-plugin/styles.css';
import './your-custom-styles.css';
```

## Dark mode

Dark mode is automatic via `prefers-color-scheme` — each type redeclares `--rn-accent` for OS dark mode by default. If your site has its own manual dark-mode toggle (a `data-theme` attribute, a `.dark` class) rather than relying on OS preference, override `--rn-accent` under your own selector instead:

```css
[data-theme='dark'] blockquote[class*="remark-note-note"] {
  --rn-accent: #60a5fa;
}
```

This site does exactly that — see `src/css/custom.css` in the [repo](https://github.com/rishichawda/remark-notes-plugin) for a real example covering all 5 types.

## Example: monochrome theme

Swapping all 5 accents to a single-hue palette is a few lines with the `--rn-accent` method:

```css
blockquote[class*="remark-note-note"] { --rn-accent: #64748b; }
blockquote[class*="remark-note-tip"] { --rn-accent: #64748b; }
blockquote[class*="remark-note-important"] { --rn-accent: #1e293b; }
blockquote[class*="remark-note-quote"] { --rn-accent: #64748b; }
blockquote[class*="remark-note-bonus"] { --rn-accent: #64748b; }
```

See [Troubleshooting](./troubleshooting) if your overrides aren't taking effect.
