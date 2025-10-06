import { test } from 'node:test'
import assert from 'node:assert/strict'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkNotes from '../index.js'

test('remark-notes: styles should be automatically injected', async () => {
  const markdown = '> [!note]\n> Test note'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  
  const output = String(file)
  
  assert.ok(output.includes('<style>'), 'Styles should be injected')
  assert.ok(output.includes('[class*="remark-note-icon"]'), 'CSS attribute selectors should be in injected styles')
})

test('remark-notes: styles should only be injected once', async () => {
  const markdown = `> [!note]
> Note 1

> [!tip]
> Tip 1

> [!important]
> Important 1`
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  
  const output = String(file)
  const styleCount = (output.match(/<style>/g) || []).length
  
  assert.strictEqual(styleCount, 1, 'Styles should be injected exactly once')
})

test('remark-notes: injected CSS content should not be empty', async () => {
  const markdown = '> [!note]\n> Test note'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  
  const output = String(file)
  const styleMatch = output.match(/<style>(.*?)<\/style>/s)
  
  assert.ok(styleMatch, 'Should be able to extract style content')
  assert.ok(styleMatch[1].length > 0, 'Style content should not be empty')
})