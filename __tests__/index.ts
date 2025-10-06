import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkNotes from '../index.js'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeParse from 'rehype-parse'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const FIXTURE_TYPES = ['note', 'tip', 'important', 'quote', 'bonus']
const FIXTURE_DIR = join(__dirname, '__fixtures__')

function parseHtmlToHast(html: string) {
  return unified().use(rehypeParse, { fragment: true }).parse(html)
}

// Remove position data from HAST tree for comparison
function stripPositions(node: any): any {
  if (!node) return node
  
  const { position, ...rest } = node
  
  if (rest.children) {
    rest.children = rest.children.map(stripPositions)
  }
  
  return rest
}

for (const type of FIXTURE_TYPES) {
  test(`remark-notes: ${type} fixture`, async (t) => {
    const inputPath = join(FIXTURE_DIR, type, 'input.md')
    const outputPath = join(FIXTURE_DIR, type, 'output.html')
    const inputMd = readFileSync(inputPath, 'utf8')
    const expectedHtml = readFileSync(outputPath, 'utf8')

    // Run plugin pipeline
    const result = await unified()
      .use(remarkParse)
      .use(remarkNotes)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(inputMd)
    const actualHtml = String(result)

    // Remove style tag from actual output
    const cleanActual = actualHtml.replace(/<style>[\s\S]*?<\/style>\s*/, '')
    
    // Parse both to HAST and strip positions for stable comparison
    const actualHast = stripPositions(parseHtmlToHast(cleanActual))
    const expectedHast = stripPositions(parseHtmlToHast(expectedHtml))

    // Compare the full HAST structure
    assert.deepEqual(actualHast, expectedHast, `${type} fixture should match expected output`)
  })
}
