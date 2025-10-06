/**
 * Type definitions for remark-notes-plugin
 * 
 * This module exports all TypeScript types and interfaces used by the plugin.
 * It provides type definitions for custom AST nodes, note configurations,
 * and type guard utilities.
 * 
 * @module lib/types
 */

// Note node type definitions
export type { NoteNode } from './node.js'
export { isNoteNode } from './node.js'

// Note configuration type definitions
export type { NoteType, NoteTypes } from './noteTypes.js'
export { NOTE_TYPES } from './noteTypes.js'
