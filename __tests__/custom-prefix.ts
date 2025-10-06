/**
 * Test custom class prefix option
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkNotes from '../index.js'

test('remark-notes: custom classPrefix should apply to all elements', async () => {
  const markdown = '> [!tip]\n> This is a tip'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes, { classPrefix: 'my' })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Container should have both base and type modifier classes with prefix prepended
  assert.ok(output.includes('class="my-remark-note my-remark-note-tip"'), 
    'Container should have prefix prepended to standard remark-note classes')
  
  // Header, icon, title, and content should all use the prefix prepended to remark-note
  assert.ok(output.includes('class="my-remark-note-header"'), 
    'Header should use prefix-remark-note-header pattern')
  assert.ok(output.includes('class="my-remark-note-icon"'), 
    'Icon should use prefix-remark-note-icon pattern')
  assert.ok(output.includes('class="my-remark-note-title"'), 
    'Title should use prefix-remark-note-title pattern')
  assert.ok(output.includes('class="my-remark-note-content"'), 
    'Content should use prefix-remark-note-content pattern')
  
  // Should still contain 'remark-note' as part of the class names
  assert.ok(output.includes('remark-note'), 
    'Should contain remark-note as part of class names')
})

test('remark-notes: all note types work with custom prefix', async () => {
  const noteTypes = ['note', 'tip', 'important', 'quote', 'bonus']
  const customPrefix = 'custom'
  
  for (const type of noteTypes) {
    const markdown = `> [!${type}]\n> Test ${type}`
    
    const file = await unified()
      .use(remarkParse)
      .use(remarkNotes, { classPrefix: customPrefix })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(markdown)
    
    const output = String(file)
    
    // Check for prefix prepended to remark-note in container classes
    assert.ok(
      output.includes(`class="${customPrefix}-remark-note ${customPrefix}-remark-note-${type}"`),
      `${type} should have prefix prepended: ${customPrefix}-remark-note ${customPrefix}-remark-note-${type}`
    )
    
    // Check for prefix prepended to remark-note in all sub-elements
    assert.ok(output.includes(`class="${customPrefix}-remark-note-header"`), 
      `${type} header should use ${customPrefix}-remark-note-header`)
    assert.ok(output.includes(`class="${customPrefix}-remark-note-icon"`), 
      `${type} icon should use ${customPrefix}-remark-note-icon`)
    assert.ok(output.includes(`class="${customPrefix}-remark-note-title"`), 
      `${type} title should use ${customPrefix}-remark-note-title`)
    assert.ok(output.includes(`class="${customPrefix}-remark-note-content"`), 
      `${type} content should use ${customPrefix}-remark-note-content`)
  }
})

test('remark-notes: injectStyles option controls style injection', async () => {
  const markdown = '> [!note]\n> Test note'
  
  // Test with injectStyles: true (default)
  const fileWithStyles = await unified()
    .use(remarkParse)
    .use(remarkNotes, { injectStyles: true })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  
  const outputWithStyles = String(fileWithStyles)
  assert.ok(outputWithStyles.includes('<style>'), 
    'Styles should be injected when injectStyles is true')
  
  // Test with injectStyles: false
  const fileWithoutStyles = await unified()
    .use(remarkParse)
    .use(remarkNotes, { injectStyles: false })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  
  const outputWithoutStyles = String(fileWithoutStyles)
  assert.ok(!outputWithoutStyles.includes('<style>'), 
    'Styles should NOT be injected when injectStyles is false')
})

test('remark-notes: combining custom prefix with injectStyles false', async () => {
  const markdown = '> [!important]\n> Important message'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes, { 
      classPrefix: 'alert',
      injectStyles: false 
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should have prefix prepended to remark-note classes
  assert.ok(output.includes('class="alert-remark-note alert-remark-note-important"'), 
    'Should use prefix prepended to remark-note classes')
  
  // Should NOT have styles
  assert.ok(!output.includes('<style>'), 
    'Should not inject styles')
})

console.log('All custom prefix tests completed!')
