import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkNotes from '../index.js'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const FIXTURE_TYPES = ['note', 'tip', 'important', 'quote', 'bonus']
const FIXTURE_DIR = join(__dirname, '__fixtures__')

async function generateFixtures() {
  for (const type of FIXTURE_TYPES) {
    const inputPath = join(FIXTURE_DIR, type, 'input.md')
    const outputPath = join(FIXTURE_DIR, type, 'output.html')
    
    const inputMd = readFileSync(inputPath, 'utf8')
    
    // Run plugin pipeline
    const result = await unified()
      .use(remarkParse)
      .use(remarkNotes)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(inputMd)
    
    let html = String(result)
    
    // Remove the style tag for cleaner fixtures
    html = html.replace(/<style>[\s\S]*?<\/style>\s*/, '')
    
    writeFileSync(outputPath, html, 'utf8')
    console.log(`Generated fixture for ${type}`)
  }

  console.log('\nAll fixtures generated successfully!')
}

generateFixtures().catch(console.error)
