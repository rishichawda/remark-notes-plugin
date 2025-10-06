/**
 * Test validation behavior
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkNotes from '../index.js'

test('remark-notes: invalid note type is ignored (graceful degradation)', async () => {
  const markdown = '> [!warning]\n> This is an invalid note type'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should remain as a regular blockquote
  assert.ok(output.includes('<blockquote>'), 
    'Invalid note type should remain as blockquote')
  
  // Should NOT be transformed into a note
  assert.ok(!output.includes('class="remark-note'), 
    'Invalid note type should not be transformed into a note')
  
  // Should still contain the original marker
  assert.ok(output.includes('[!warning]'), 
    'Original marker should be preserved for invalid types')
})

test('remark-notes: valid note types are transformed', async () => {
  const validTypes = ['note', 'tip', 'important', 'quote', 'bonus']
  
  for (const type of validTypes) {
    const markdown = `> [!${type}]\n> Test content`
    
    const file = await unified()
      .use(remarkParse)
      .use(remarkNotes)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(markdown)
    
    const output = String(file)
    
    // Should be transformed into a note
    assert.ok(output.includes(`class="remark-note remark-note-${type}"`), 
      `Valid type '${type}' should be transformed into a note`)
    
    // Should NOT remain as blockquote with marker
    assert.ok(!output.includes(`[!${type}]`), 
      `Marker should be removed for valid type '${type}'`)
  }
})

test('remark-notes: case insensitive note type matching', async () => {
  const variations = ['TIP', 'Tip', 'tIp', 'tiP']
  
  for (const variant of variations) {
    const markdown = `> [!${variant}]\n> Test content`
    
    const file = await unified()
      .use(remarkParse)
      .use(remarkNotes)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(markdown)
    
    const output = String(file)
    
    // Should be transformed (case insensitive)
    assert.ok(output.includes('class="remark-note remark-note-tip"'), 
      `Case variant '${variant}' should be recognized as valid`)
  }
})

test('remark-notes: multiple notes with mixed valid and invalid types', async () => {
  const markdown = `
> [!note]
> Valid note

> [!warning]
> Invalid type

> [!tip]
> Another valid note
`
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Valid notes should be transformed
  assert.ok(output.includes('class="remark-note remark-note-note"'), 
    'First valid note should be transformed')
  assert.ok(output.includes('class="remark-note remark-note-tip"'), 
    'Second valid note should be transformed')
  
  // Invalid note should remain as blockquote
  assert.ok(output.includes('[!warning]'), 
    'Invalid note marker should be preserved')
  
  // Count blockquotes (should have 1 for the invalid type)
  const blockquoteMatches = output.match(/<blockquote>/g)
  assert.ok(blockquoteMatches && blockquoteMatches.length >= 1, 
    'At least one blockquote should remain for invalid type')
})

test('remark-notes: typos in note types are not transformed', async () => {
  const typos = ['notte', 'tipp', 'importnt', 'qoute', 'bouns']
  
  for (const typo of typos) {
    const markdown = `> [!${typo}]\n> Test content`
    
    const file = await unified()
      .use(remarkParse)
      .use(remarkNotes)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(markdown)
    
    const output = String(file)
    
    // Should remain as blockquote with marker
    assert.ok(output.includes(`[!${typo}]`), 
      `Typo '${typo}' should remain as blockquote`)
    
    // Should NOT be transformed
    assert.ok(!output.includes('class="remark-note'), 
      `Typo '${typo}' should not be transformed`)
  }
})

console.log('All validation tests completed!')
