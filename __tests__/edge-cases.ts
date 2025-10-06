/**
 * Test edge case handling
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkNotes from '../index.js'

test('remark-notes: empty note block (only marker)', async () => {
  const markdown = '> [!note]'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should still transform into a note (with empty content)
  assert.ok(output.includes('class="remark-note remark-note-note"'), 
    'Empty note should still be transformed')
  
  // Should have the note structure
  assert.ok(output.includes('remark-note-header'), 
    'Empty note should have header')
  assert.ok(output.includes('remark-note-content'), 
    'Empty note should have content container')
})

test('remark-notes: note with only marker and whitespace', async () => {
  const markdown = '> [!tip]\n>   \n>  '
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should transform with empty/minimal content
  assert.ok(output.includes('class="remark-note remark-note-tip"'), 
    'Note with only whitespace should be transformed')
})

test('remark-notes: special HTML characters in content', async () => {
  const markdown = '> [!note]\n> Content with <script>alert("XSS")</script> & special chars < > " \''
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should escape or properly handle special characters
  // The remark/rehype pipeline should handle escaping automatically
  assert.ok(output.includes('remark-note-note'), 
    'Note with special chars should be transformed')
  
  // Verify some form of the content exists (may be escaped)
  assert.ok(output.includes('special chars') || output.includes('Content with'), 
    'Content should be present')
})

test('remark-notes: note with code blocks', async () => {
  const markdown = `> [!tip]
> Here's some code:
> 
> \`\`\`javascript
> const x = 42;
> console.log(x);
> \`\`\`
> 
> End of tip`
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should transform and preserve code block
  assert.ok(output.includes('class="remark-note remark-note-tip"'), 
    'Note with code block should be transformed')
  
  assert.ok(output.includes('<code>') || output.includes('const x'), 
    'Code block should be preserved')
})

test('remark-notes: note with inline code and formatting', async () => {
  const markdown = '> [!important]\n> Use `const` not `var` and **always** use *strict mode*'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should preserve inline code and formatting
  assert.ok(output.includes('class="remark-note remark-note-important"'), 
    'Note with inline formatting should be transformed')
  
  assert.ok(output.includes('<code>') && output.includes('const'), 
    'Inline code should be preserved')
  
  assert.ok(output.includes('<strong>') || output.includes('<em>'), 
    'Bold/italic formatting should be preserved')
})

test('remark-notes: note with links and images', async () => {
  const markdown = '> [!note]\n> Check [the docs](https://example.com) and ![image](test.png)'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should preserve links and images
  assert.ok(output.includes('class="remark-note remark-note-note"'), 
    'Note with links/images should be transformed')
  
  assert.ok(output.includes('<a') && output.includes('href="https://example.com"'), 
    'Links should be preserved')
  
  assert.ok(output.includes('<img') && output.includes('src="test.png"'), 
    'Images should be preserved')
})

test('remark-notes: note with lists', async () => {
  const markdown = `> [!tip]
> Here are some tips:
> 
> - First item
> - Second item
> - Third item`
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should preserve lists
  assert.ok(output.includes('class="remark-note remark-note-tip"'), 
    'Note with lists should be transformed')
  
  assert.ok(output.includes('<ul>') || output.includes('<li>'), 
    'List structure should be preserved')
  
  assert.ok(output.includes('First item') && output.includes('Second item'), 
    'List content should be preserved')
})

test('remark-notes: note with blockquote in content', async () => {
  const markdown = `> [!quote]
> As someone once said:
> 
> > This is a nested quote
> > on multiple lines
> 
> End of note`
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should handle nested blockquotes
  assert.ok(output.includes('class="remark-note remark-note-quote"'), 
    'Note with nested blockquote should be transformed')
  
  // Nested blockquote should be preserved (may be rendered as blockquote)
  assert.ok(output.includes('nested quote') || output.includes('This is a'), 
    'Nested blockquote content should be preserved')
})

test('remark-notes: very long content (performance test)', async () => {
  // Generate a note with ~2000 words
  const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(250)
  const markdown = `> [!note]\n> ${longText}`
  
  const startTime = performance.now()
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const endTime = performance.now()
  const processingTime = endTime - startTime
  
  const output = String(file)
  
  // Should handle large content
  assert.ok(output.includes('class="remark-note remark-note-note"'), 
    'Large note should be transformed')
  
  assert.ok(output.includes('Lorem ipsum'), 
    'Large content should be preserved')
  
  // Performance check - should process in reasonable time (< 1000ms for ~2000 words)
  assert.ok(processingTime < 1000, 
    `Large note processing should be fast (took ${processingTime.toFixed(2)}ms)`)
})

test('remark-notes: whitespace preservation - tabs and spaces', async () => {
  // Using explicit tab character
  const markdown = '> [!note]\n> Line with\ttabs\tand   multiple   spaces'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should transform
  assert.ok(output.includes('class="remark-note remark-note-note"'), 
    'Note with mixed whitespace should be transformed')
  
  // Content should exist (exact whitespace might be normalized by HTML)
  assert.ok(output.includes('Line with') && output.includes('tabs'), 
    'Content with whitespace should be preserved')
})

test('remark-notes: multiline content with varying indentation', async () => {
  const markdown = `> [!important]
> First line
>   Indented line
>     Double indented
> Back to normal`
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should transform with preserved content
  assert.ok(output.includes('class="remark-note remark-note-important"'), 
    'Note with varying indentation should be transformed')
  
  assert.ok(output.includes('First line') && output.includes('Indented line'), 
    'All content lines should be preserved')
})

test('remark-notes: unicode and emoji content', async () => {
  const markdown = '> [!tip]\n> 你好 🎉 Testing unicode: café, naïve, 日本語'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should handle unicode and emoji
  assert.ok(output.includes('class="remark-note remark-note-tip"'), 
    'Note with unicode should be transformed')
  
  assert.ok(output.includes('你好') || output.includes('Testing'), 
    'Unicode content should be preserved')
})

test('remark-notes: note with HTML entities', async () => {
  const markdown = '> [!note]\n> Use &lt;div&gt; and &amp; entities &copy; 2024'
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should transform and handle entities
  assert.ok(output.includes('class="remark-note remark-note-note"'), 
    'Note with HTML entities should be transformed')
  
  // Entities should be preserved or properly decoded
  assert.ok(output.includes('div') || output.includes('entities'), 
    'Content with entities should be present')
})

test('remark-notes: multiple paragraphs in note', async () => {
  const markdown = `> [!bonus]
> First paragraph here.
>
> Second paragraph here.
>
> Third paragraph here.`
  
  const file = await unified()
    .use(remarkParse)
    .use(remarkNotes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  
  const output = String(file)
  
  // Should preserve multiple paragraphs
  assert.ok(output.includes('class="remark-note remark-note-bonus"'), 
    'Note with multiple paragraphs should be transformed')
  
  assert.ok(output.includes('First paragraph') && 
           output.includes('Second paragraph') && 
           output.includes('Third paragraph'), 
    'All paragraphs should be preserved')
  
  // Should have paragraph tags
  const paragraphCount = (output.match(/<p>/g) || []).length
  assert.ok(paragraphCount >= 3, 
    'Multiple paragraphs should be rendered as separate <p> tags')
})

console.log('\n✅ All edge case tests completed!')
