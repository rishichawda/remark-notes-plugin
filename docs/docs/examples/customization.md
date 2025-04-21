---
sidebar_position: 2
---

# Customization

You can customize the appearance of your notes by overriding the default CSS styles provided by `remark-notes-plugin`. This guide explains how to customize the notes to match your website's design.

## CSS Classes

The plugin generates the following HTML structure for each note:

```html
<div class="remark-note [type]">
  <div class="remark-note-header">
    <span class="remark-note-icon"></span>
    <span class="remark-note-title">[Type]</span>
  </div>
  <div>
    <p class="remark-note-content">Note content...</p>
  </div>
</div>
```

Where `[type]` is one of: `note`, `tip`, `important`, `quote`, or `bonus`.

## Basic Customization

You can customize the notes by targeting these CSS classes in your own stylesheet:

```css
/* Change the background color of all notes */
.remark-note {
  background-color: #f8f9fa;
}

/* Change the border color of tip notes */
.remark-note.tip {
  border-color: #4caf50;
}

/* Change the title style of important notes */
.remark-note.important .remark-note-title {
  color: #f44336;
  font-weight: bold;
}
```

## Complete Customization Example

Here's a complete example that changes the styling for all note types:

```css
/* Base note styles */
.remark-note {
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Note title styles */
.remark-note.title {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 8px;
}

/* Standard note */
.remark-note.note {
  background-color: #e8f4fd;
  border-left: 4px solid #1e88e5;
}
.remark-note.note .remark-note.title {
  color: #1565c0;
}

/* Tip note */
.remark-note.tip {
  background-color: #e8f5e9;
  border-left: 4px solid #43a047;
}
.remark-note.tip .remark-note-title {
  color: #2e7d32;
}

/* Important note */
.remark-note.important {
  background-color: #ffebee;
  border-left: 4px solid #e53935;
}
.remark-note.important .remark-note-title {
  color: #c62828;
}

/* Quote note */
.remark-note.quote {
  background-color: #ede7f6;
  border-left: 4px solid #7e57c2;
}
.remark-note.quote .remark-note-title {
  color: #5e35b1;
}

/* Bonus note */
.remark-note.bonus {
  background-color: #fff8e1;
  border-left: 4px solid #ffb300;
}
.remark-note.bonus .remark-note-title {
  color: #ff8f00;
}
```

## Applying Custom Styles

Add your custom styles to your project after importing the default styles. For example:

```javascript
// Import the default styles first
import 'remark-notes-plugin/dist/styles.css';
// Then import your custom styles
import './your-custom-styles.css';
```

This ensures that your custom styles override the default ones.

## Dark Mode Support

You can also add dark mode support by using CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  .remark-note {
    background-color: #1e1e1e;
    color: #e0e0e0;
  }
  
  .remark-note.title {
    color: #ffffff;
  }
  
  /* Customize other dark mode styles... */
}
```

Or if you're using a theme toggle, you can use CSS classes:

```css
.dark-theme .remark-note {
  background-color: #1e1e1e;
  color: #e0e0e0;
}
```

Adapt these examples to fit your website's specific styling needs and color scheme.