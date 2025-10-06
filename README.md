# remark-notes-plugin 📝

A powerful TypeScript remark plugin that transforms markdown blockquotes into beautifully styled note elements. Add professional-looking notes, tips, quotes, and more to your markdown documentation with minimal effort!

![Test Status](https://img.shields.io/github/actions/workflow/status/rishichawda/remark-notes-plugin/test.yml?branch=main&label=tests)
![npm](https://img.shields.io/npm/v/remark-notes-plugin)
![License](https://img.shields.io/npm/l/remark-notes-plugin)
![Website](https://img.shields.io/website?url=https%3A%2F%2Frishichawda.github.io%2Fremark-notes-plugin)

## ✨ Features

- 🎨 **5 Beautiful Note Types** - Note, Tip, Important, Quote, and Bonus
- 🎯 **Semantic HTML Output** - Clean and accessible HTML structure
- 💅 **Customizable Styling** - Easy to override CSS classes
- 🔧 **Easy Integration** - Works with any remark-based markdown processor

## 📦 Installation

```bash
npm install remark-notes-plugin
```

## 🚀 Usage

```typescript
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkNotes from 'remark-notes-plugin'

const markdown = `
> [!note]
> This is a note about something important.

> [!tip]
> Here's a helpful tip for you.

> [!important]
> This is a very important message!

> [!quote]
> Here's a memorable quote.

> [!bonus]
> Here's some extra content for you!
`

const file = await unified()
  .use(remarkParse)
  .use(remarkNotes)
  .use(remarkStringify)
  .process(markdown)

console.log(String(file))
```

## 📝 Note Types

The plugin supports five distinct types of notes, each with its own unique style:

1. **Note** - For general information and remarks
   ```markdown
   > [!note]
   > Your note content here
   ```

2. **Tip** - For helpful tips and tricks
   ```markdown
   > [!tip]
   > Your tip content here
   ```

3. **Important** - For critical information and warnings
   ```markdown
   > [!important]
   > Your important message here
   ```

4. **Quote** - For quotations and references
   ```markdown
   > [!quote]
   > Your quote content here
   ```

5. **Bonus** - For additional, supplementary content
   ```markdown
   > [!bonus]
   > Your bonus content here
   ```

## 🎨 Styling

Default styles are loaded automatically when you use the plugin. You can also modify the styles since the plugin uses a modular class structure that makes it easy to customize the appearance:

### Base Classes

- `.remark-note` - Base container for all note types
- `.remark-note-header` - Note header container
- `.remark-note-icon` - Icon styling
- `.remark-note-title` - Note title styling
- `.remark-note-content` - Note content container

### Type-Specific Classes

- `.remark-note.note` - Note type styling
- `.remark-note.tip` - Tip type styling
- `.remark-note.important` - Important type styling
- `.remark-note.quote` - Quote type styling
- `.remark-note.bonus` - Bonus type styling

### Customization Example

```css
/* Example: Customize the Note type */
.remark-note.note {
  background-color: #your-color;
  border-color: #your-border-color;
}

.remark-note.note .remark-note-title {
  color: #your-text-color;
}
```

## 🛠️ Development

This project is written in TypeScript. To contribute or modify:

```bash
# Install dependencies
yarn

# Build the project
yarn build

# Run tests
yarn test

# Watch mode for development
yarn watch
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

Please ensure your pull request passes all tests and includes appropriate documentation.

---

⭐️ If you find this plugin useful, please consider giving it a star on GitHub! ⭐️ 