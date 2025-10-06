import { visit } from 'unist-util-visit'
import type { Node, Parent } from 'unist'
import type { Blockquote, Paragraph, Text } from 'mdast'
import { styles } from './lib/styles.js'
import { createNoteStructure } from './lib/node-structure.js'
import { isValidNoteType } from './lib/validation.js'
import type { RemarkNotesOptions } from './lib/types/options.js'

// Export types for public API
export type { RemarkNotesOptions } from './lib/types/options.js'
export type { ValidNoteType } from './lib/icons-hast.js'

export default function remarkNotes(options: RemarkNotesOptions = {}) {
  // Extract options with defaults
  const classPrefix = options.classPrefix ?? ''
  const injectStyles = options.injectStyles ?? true

  let hasInjectedStyles = false

  return (tree: Node) => {
    // Inject styles at the beginning of the document (only once) if enabled
    // Using proper mdast node instead of HTML string for MDX compatibility
    if (injectStyles && !hasInjectedStyles) {
      const root = tree as Parent
      if (root.children) {
        // Create a proper mdast node that will be transformed to <style> tag
        root.children.unshift({
          type: 'paragraph',
          data: {
            hName: 'style',
            hProperties: {}
          },
          children: [{
            type: 'text',
            value: styles
          }]
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

      // Validate note type - skip transformation if invalid (graceful degradation)
      if (!isValidNoteType(noteType)) return

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

      // Create the note structure using proper mdast nodes (with hast-converted SVG icons)
      const noteContainer = createNoteStructure(noteType, children, classPrefix);

      // Replace the blockquote with the container
      (parent as Parent).children[index] = noteContainer;
    })
  }
}
