/**
 * Validation utilities for note types and error message generation
 * 
 * @module lib/validation
 */

import type { Position } from 'unist'
import { VALID_NOTE_TYPES, ValidNoteType } from './icons-hast.js'

/**
 * Type guard to check if a string is a valid note type
 * 
 * @param type - The string to check
 * @returns True if the type is a valid note type, false otherwise
 * 
 * @example
 * ```typescript
 * if (isValidNoteType(noteType)) {
 *   // TypeScript now knows noteType is ValidNoteType
 *   createNoteStructure(noteType, ...)
 * }
 * ```
 */
export function isValidNoteType(type: string): type is ValidNoteType {
  return VALID_NOTE_TYPES.includes(type as ValidNoteType)
}

/**
 * Creates a descriptive error message for invalid note types
 * 
 * @param invalidType - The invalid note type that was encountered
 * @param position - Optional position information from the AST node
 * @returns A formatted error message with context
 * 
 * @example
 * ```typescript
 * const error = createInvalidTypeError('warn', node.position)
 * // Returns: "Invalid note type 'warn' at line 5, column 3. Valid types are: note, tip, important, quote, bonus"
 * ```
 */
export function createInvalidTypeError(invalidType: string, position?: Position): string {
  const validTypes = VALID_NOTE_TYPES.join(', ')
  const positionInfo = position?.start 
    ? ` at line ${position.start.line}, column ${position.start.column}` 
    : ''
  
  return `Invalid note type '${invalidType}'${positionInfo}. Valid types are: ${validTypes}`
}

/**
 * Validates a note type and throws an error if invalid
 * 
 * @param type - The note type to validate
 * @param position - Optional position information for error messages
 * @throws {Error} If the note type is invalid
 * 
 * @example
 * ```typescript
 * try {
 *   validateNoteType(noteType, node.position)
 *   // If we get here, noteType is valid
 * } catch (error) {
 *   console.error(error.message)
 * }
 * ```
 */
export function validateNoteType(type: string, position?: Position): asserts type is ValidNoteType {
  if (!isValidNoteType(type)) {
    throw new Error(createInvalidTypeError(type, position))
  }
}
