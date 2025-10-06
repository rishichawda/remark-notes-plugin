/**
 * CSS styles for remark-notes
 * Loaded once at module initialization
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read CSS file once at module load time
const cssPath = join(__dirname, '..', 'styles.css')
export const styles = readFileSync(cssPath, 'utf-8')

export default styles
