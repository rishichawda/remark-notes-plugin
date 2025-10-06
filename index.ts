import { visit } from 'unist-util-visit'
import type { Node } from 'unist'
import type { Blockquote, Paragraph, Text } from 'mdast'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { toHtml } from 'hast-util-to-html'
import { toHast } from 'mdast-util-to-hast'
import { NOTE_TYPES } from './lib/types/index.js'

// Get the styles content
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Look for styles.css in the package root (one level up from dist)
const stylesPath = join(__dirname, 'styles.css')
const styles = readFileSync(stylesPath, 'utf-8')

export default function remarkNotes() {
  return (tree: Node) => {
    let hasInjectedStyles = false;

    visit(tree, 'root', (node: any) => {
      if (!hasInjectedStyles) {
        // Inject styles at the beginning of the document
        node.children.unshift({
          type: 'html',
          value: `<style>${styles}</style>`
        });
        hasInjectedStyles = true;
      }
    });

    visit(tree, 'blockquote', (node: Blockquote) => {
      const firstParagraph = node.children[0] as Paragraph
      if (!firstParagraph) return
      
      const firstChild = firstParagraph.children[0]
      if (!firstChild || firstChild.type !== 'text') return
      
      const textNode = firstChild as Text
      if (!textNode) return
      
      // Updated pattern to match [!type]
      const match = textNode.value.match(/^\[!(\w+)\]/)
      if (!match) return
      
      const noteType = match[1].toLowerCase() // Convert to lowercase to match our types
      
      if (noteType in NOTE_TYPES) {
        const noteConfig = NOTE_TYPES[noteType]
        
        // Create a clone of the blockquote children to preserve markdown structure
        const children = [...node.children]
        
        // Process the first paragraph to remove the note marker
        if (children.length > 0 && children[0].type === 'paragraph') {
          const firstPara = children[0] as Paragraph
          const firstTextNode = firstPara.children[0] as Text
          
          if (firstTextNode && firstTextNode.type === 'text') {
            // Only remove the marker from the text content
            firstTextNode.value = firstTextNode.value.replace(/^\[!\w+\]\s*/, '')
            
            // If the text node is now empty and it's the only child, remove it
            if (firstTextNode.value === '' && firstPara.children.length === 1) {
              children.shift()
            }
          }
        }
        
        // Convert the modified markdown structure to HTML
        const contentHast = toHast({
          type: 'root',
          children: children
        }) as any
        
        // Convert hast to HTML string
        const contentHtml = contentHast ? toHtml(contentHast) : ''
        
        // Create HTML structure using classes
        const html = {
          type: 'html',
          value: `
            <div class="remark-note ${noteConfig.type}">
              <div class="remark-note-header">
                <span class="remark-note-icon" data-type="${noteConfig.type}">${noteConfig.icon}</span>
                <span class="remark-note-title">${noteType}</span>
              </div>
              <div class="remark-note-content">
                ${contentHtml}
              </div>
            </div>
          `
        }
        
        // Replace the blockquote with our HTML
        Object.assign(node, html)
      }
    })
  }
} 