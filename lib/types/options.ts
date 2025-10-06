/**
 * Configuration options for the remark-notes plugin
 * 
 * @module lib/types/options
 */

/**
 * Options for configuring the remark-notes plugin behavior
 * 
 * @example
 * ```typescript
 * import remarkNotes from 'remark-notes-plugin'
 * 
 * // Using default options
 * unified().use(remarkNotes)
 * 
 * // With custom class prefix
 * unified().use(remarkNotes, { classPrefix: 'my-callout' })
 * 
 * // Disable automatic style injection
 * unified().use(remarkNotes, { injectStyles: false })
 * 
 * // Both options
 * unified().use(remarkNotes, { 
 *   classPrefix: 'custom-note',
 *   injectStyles: false 
 * })
 * ```
 */
export interface RemarkNotesOptions {
    /**
     * Custom prefix for all generated CSS class names
     * 
     * This prefix is **prepended** to the standard 'remark-note' class names.
     * 
     * **Default (no prefix):**
     * - Container: `remark-note` and `remark-note-{noteType}`
     * - Elements: `remark-note-header`, `remark-note-icon`, etc.
     * 
     * **With prefix (e.g., 'my'):**
     * - Container: `my-remark-note` and `my-remark-note-{noteType}`
     * - Elements: `my-remark-note-header`, `my-remark-note-icon`, etc.
     * 
     * @default '' (empty string - no prefix)
     * 
     * @example
     * ```typescript
     * // No prefix (default)
     * { classPrefix: '' }
     * // Generates: class="remark-note remark-note-tip"
     * 
     * // Custom prefix
     * { classPrefix: 'my' }
     * // Generates: class="my-remark-note my-remark-note-tip"
     * ```
     * 
     * @remarks
     * The shipped CSS uses attribute selectors (e.g., `[class*="remark-note-icon"]`)
     * and will work with any prefix automatically.
     */
    classPrefix?: string

    /**
     * Controls whether the plugin automatically injects styles into the document
     * 
     * When `true` (default), the plugin injects a `<style>` tag containing the note styles
     * directly into the AST. This is convenient for most use cases.
     * 
     * When `false`, styles are not injected and you must manually import the CSS file:
     * `import 'remark-notes-plugin/styles.css'`
     * 
     * Set to `false` when:
     * - Using Server-Side Rendering (SSR) with separate CSS extraction
     * - Building with tools that handle CSS imports separately (Vite, Webpack, etc.)
     * - Providing completely custom styles
     * - You want more control over style loading order
     * 
     * @default true
     * 
     * @example
     * ```typescript
     * // Automatic style injection (default)
     * { injectStyles: true }
     * 
     * // Manual CSS import
     * { injectStyles: false }
     * // Then in your code:
     * // import 'remark-notes-plugin/styles.css'
     * ```
     * 
     * @remarks
     * The CSS file is available at the package export: `remark-notes-plugin/styles.css`
     */
    injectStyles?: boolean
}
