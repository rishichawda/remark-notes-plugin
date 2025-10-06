/**
 * Creates the mdast node structure for a note callout
 * 
 * This module handles the creation of proper mdast nodes with transformation hints
 * that tell remark-rehype how to convert them to the appropriate HTML structure.
 * 
 * @module lib/create-note-structure
 */

import type { Node } from 'unist'
import { ICON_HAST_MAP, ValidNoteType } from './icons-hast.js'

/**
 * Creates a properly structured mdast node for a note callout
 * 
 * The structure uses standard mdast node types (paragraph, text) with data hints
 * (hName, hProperties) to tell remark-rehype how to transform them into the
 * desired HTML structure without requiring manual handlers.
 * 
 * SVG icons are embedded as hast nodes using data.hast property for direct transformation.
 * 
 * @param noteType - The type of note (note, tip, important, etc.)
 * @param children - The content nodes (markdown) to include in the note
 * @returns A mdast node that will be transformed to the note HTML structure
 */
export function createNoteStructure(
  noteType: ValidNoteType,
  children: Node[]
): any {
  // Get the hast representation of the icon
  const iconHast = ICON_HAST_MAP[noteType]
  
  // Create icon span with embedded hast node
  // Using data.hast tells remark-rehype to use this hast node directly
  const iconNode: any = {
    type: 'paragraph',
    data: {
      hName: 'span',
      hProperties: {
        className: ['remark-note-icon']
      },
      hChildren: [iconHast]  // Embed hast node directly
    },
  }
  
  // Create title span
  const titleNode: any = {
    type: 'paragraph',
    data: {
      hName: 'span',
      hProperties: {
        className: ['remark-note-title']
      }
    },
    children: [
      {
        type: 'text',
        value: noteType
      }
    ]
  }
  
  // Create header div
  const headerNode: any = {
    type: 'paragraph',
    data: {
      hName: 'div',
      hProperties: {
        className: ['remark-note-header']
      }
    },
    children: [iconNode, titleNode]
  }
  
  // Create content wrapper div
  const contentNode: any = {
    type: 'paragraph',
    data: {
      hName: 'div',
      hProperties: {
        className: ['remark-note-content']
      }
    },
    children: children
  }
  
  // Build the structure: wrap everything in a blockquote container with data hints
  // Using blockquote for semantic HTML since the source is a blockquote
  const noteContainer: any = {
    type: 'paragraph', // Use a standard mdast type
    data: {
      hName: 'blockquote',  // Transform to blockquote for semantic HTML
      hProperties: {
        className: ['remark-note', noteType]
      }
    },
    children: [headerNode, contentNode]
  }
  
  return noteContainer
}
