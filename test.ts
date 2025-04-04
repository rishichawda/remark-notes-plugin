import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkNotes from './index.js'

const markdown = `
# Test Document

> [!Note]
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

async function main() {
  try {
    // Convert to HTML
    const file = await unified()
      .use(remarkParse)
      .use(remarkNotes)
      .use(remarkStringify)
      .process(markdown)

    const output = String(file)
    console.log('Final output:', output)

    // Basic validation
    if (!output.includes('<style>')) {
      throw new Error('Styles were not injected');
    }

    if (!output.includes('remark-note')) {
      throw new Error('Note classes were not properly added');
    }

    // Test for content
    if (!output.includes('This is a note about something important')) {
      throw new Error('Note content is missing');
    }

    // Test for each note type
    ['note', 'tip', 'important', 'quote', 'bonus'].forEach(type => {
      if (!output.includes(`remark-note ${type}`)) {
        throw new Error(`${type} note was not properly transformed`);
      }
    });

    console.log('✅ Test passed: Styles were injected and notes were transformed with content');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

main().catch(console.error) 