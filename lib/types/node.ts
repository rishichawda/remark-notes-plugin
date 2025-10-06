import type { Node } from 'unist'
import type { BlockContent, DefinitionContent } from 'mdast'

/**
 * Represents a custom note node in the mdast syntax tree.
 * This node type is created when a blockquote with the [!type] syntax is encountered.
 * 
 * @example
 * ```markdown
 * > [!note]
 * > This is a note content
 * ```
 * 
 * Transforms to:
 * ```typescript
 * {
 *   type: 'note',
 *   noteType: 'note',
 *   data: {
 *     hName: 'div',
 *     hProperties: {
 *       className: ['remark-note', 'note']
 *     }
 *   },
 *   children: [...]
 * }
 * ```
 */
export interface NoteNode extends Node {
  /** Node type identifier */
  type: 'note'
  
  /** The type of note (e.g., 'note', 'tip', 'important', 'quote', 'bonus') */
  noteType: string
  
  /** 
   * Data object containing hints for HTML generation (used by rehype).
   * These properties tell rehype how to convert this custom node to HTML.
   */
  data: {
    /** The HTML element name to use when converting to HTML */
    hName: 'div'
    
    /** HTML attributes/properties for the element */
    hProperties: {
      /** CSS classes to apply to the div element */
      className: string[]
    }
  }
  
  /** 
   * Child nodes containing the actual content of the note.
   * These remain as markdown AST nodes (paragraphs, lists, code blocks, etc.)
   * to preserve markdown features and allow further processing by other plugins.
   */
  children: Array<BlockContent | DefinitionContent>
}

/**
 * Type guard to check if a node is a NoteNode
 * 
 * @param node - The node to check
 * @returns True if the node is a valid NoteNode
 * 
 * @example
 * ```typescript
 * if (isNoteNode(node)) {
 *   console.log(node.noteType) // TypeScript knows this is safe
 * }
 * ```
 */
export function isNoteNode(node: unknown): node is NoteNode {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    node.type === 'note' &&
    'noteType' in node &&
    typeof node.noteType === 'string' &&
    'children' in node &&
    Array.isArray(node.children) &&
    'data' in node &&
    typeof node.data === 'object' &&
    node.data !== null
  )
}
