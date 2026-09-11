---
title: Troubleshooting
---

<span class="handwritten pageKicker">when it breaks</span>

# Troubleshooting

## Installation issues

**`Cannot find module 'remark-notes-plugin'`** — reinstall (`npm install remark-notes-plugin`) or clear your package manager's cache.

**Type definitions not found** — the package ships its own types. Check your `tsconfig.json` has:
```json
{ "compilerOptions": { "moduleResolution": "node", "esModuleInterop": true } }
```

## Styles not appearing

- You set `injectStyles: false` and forgot to import the CSS: `import 'remark-notes-plugin/styles.css'`.
- Your bundler isn't picking up the CSS import — most bundlers (Vite, Webpack) handle this automatically; check your config if not.
- Your own CSS loads before the plugin's default stylesheet and gets overridden — load your overrides after the default, or use a `classPrefix` to avoid the conflict entirely (see [Customization](./customization)).

## Dark mode not working

The plugin's default dark mode is OS-level (`prefers-color-scheme`). If your site has its own manual toggle (a `data-theme` attribute, a `.dark` class), you need an explicit override — OS preference alone won't track your toggle:

```css
[data-theme='dark'] blockquote[class*="remark-note-note"] {
  --rn-accent: #60a5fa;
}
```

See [Customization → Dark mode](./customization#dark-mode) for the full pattern across all 5 types.

## Build errors

**`ReferenceError: document is not defined` / `TypeError: fs.readFileSync is not a function`** during SSR — you're importing a server-side build in a browser context, or vice versa. For Vite, add the package to `ssr.noExternal` in your config.

**Next.js / Astro build fails on MDX** — double-check your `remarkPlugins` config matches [Framework Integration](./frameworks). Setting `injectStyles: false` and importing CSS manually often resolves SSR-specific failures.

## Notes not transforming

Checklist:
1. Syntax must be `> [!type]` on its own line, immediately followed by `>` content lines — not `> [type]` or `!type`.
2. The type must be one of `note`, `tip`, `important`, `quote`, `bonus` (case-insensitive).
3. `remarkNotes` must run after `remarkParse` and before `remarkRehype` in your pipeline.
4. In MDX, a code block inside a note needs a blank `>` line before the fence, and any component used inside a note must be imported at the top of the file.

**Invalid types are silently ignored — this is intentional.** `> [!warning]` (not a valid type) is left as a plain, untransformed blockquote. No error, no console warning. The 5 valid types are fixed; adding a 6th requires forking the plugin.

## Framework-specific gotchas

- **Gatsby** — GraphQL queries against MDX content work normally; the plugin only affects rendering, not the content schema.
- **Docusaurus** — its built-in `:::note`/`:::tip` admonitions use different syntax than `> [!note]` and don't conflict, but avoid mixing both styles on the same page for consistency.
- **VitePress** — uses markdown-it, not remark, by default. You must bridge it explicitly with `md.use(remarkNotes)` — see [Framework Integration → VitePress](./frameworks#vitepress).

Still stuck? [Open an issue](https://github.com/rishichawda/remark-notes-plugin/issues).
