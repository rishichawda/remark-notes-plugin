import { visit } from 'unist-util-visit'
import type { Node, Parent } from 'unist'
import type { Blockquote, Paragraph, Text } from 'mdast'
import type { NoteNode } from './lib/types/index.js'
import { NOTE_TYPES } from './lib/types/index.js'
import { styles } from './lib/styles.js'

export default function remarkNotes() {
  let hasInjectedStyles = false

  return (tree: Node) => {
    // Inject styles at the beginning of the document (only once)
    if (!hasInjectedStyles) {
      const root = tree as Parent
      if (root.children) {
        root.children.unshift({
          type: 'html',
          value: `<style>${styles}</style>`
        } as any)
        hasInjectedStyles = true
      }
    }

    visit(tree, 'blockquote', (node: Blockquote, index, parent) => {
      // Validate we have parent and index for proper node replacement
      if (!parent || index === null || index === undefined) return
      
      const firstParagraph = node.children[0]
      if (!firstParagraph || firstParagraph.type !== 'paragraph') return
      
      const firstChild = firstParagraph.children[0]
      if (!firstChild || firstChild.type !== 'text') return
      
      const textNode = firstChild as Text
      
      // Match [!type] pattern
      const match = textNode.value.match(/^\[!(\w+)\]/)
      if (!match) return
      
      const noteType = match[1].toLowerCase()
      
      // Only transform if it's a recognized note type
      if (!(noteType in NOTE_TYPES)) return
      
      // Clone children to preserve original markdown structure
      const children = [...node.children]
      
      // Process the first paragraph to remove the note marker
      if (children.length > 0 && children[0].type === 'paragraph') {
        const firstPara = children[0] as Paragraph
        const firstTextNode = firstPara.children[0] as Text
        
        if (firstTextNode && firstTextNode.type === 'text') {
          // Remove the [!type] marker and any trailing whitespace
          firstTextNode.value = firstTextNode.value.replace(/^\[!\w+\]\s*/, '')
          
          // If the text node is now empty and it's the only child, remove the paragraph
          if (firstTextNode.value === '' && firstPara.children.length === 1) {
            children.shift()
          }
        }
      }
      
      // Get the icon for this note type
      const noteConfig = NOTE_TYPES[noteType]
      const icon = noteConfig.icon
      
      // Create header with icon and title
      const headerNode = {
        type: 'html',
        value: `<div class="remark-note-header"><span class="remark-note-icon">${icon}</span><span class="remark-note-title">${noteType}</span></div>`
      }
      
      const contentWrapperStart = {
        type: 'html',
        value: '<div class="remark-note-content">'
      }
      
      const contentWrapperEnd = {
        type: 'html',
        value: '</div>'
      }
      
      // Wrap content with header and content wrapper
      const wrappedChildren = [
        headerNode,
        contentWrapperStart,
        ...children,
        contentWrapperEnd
      ]
      
      // Create the custom NoteNode
      const noteNode = {
        type: 'note',
        noteType: noteType,
        data: {
          hName: 'div',
          hProperties: {
            className: ['remark-note', noteType]
          }
        },
        children: wrappedChildren
      } as NoteNode
      
      // Replace the blockquote with the note node in the parent
      (parent as Parent).children[index] = noteNode as any
    })
  }
}
