import { visit } from 'unist-util-visit'
import type { Node } from 'unist'
import type { Blockquote, Paragraph, Text, BlockContent, DefinitionContent } from 'mdast'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { toHtml } from 'hast-util-to-html'
import { toHast } from 'mdast-util-to-hast'

interface NoteType {
  icon: string
  type: string
}

interface NoteTypes {
  [key: string]: NoteType
}

const noteTypes: NoteTypes = {
  'note': {
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke-linecap="round" stroke-linejoin="round" stroke-width="0.048">
    </g>
    <g>
        <path d="M8 2V5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M16 2V5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
            stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M8 11H16" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M8 16H12" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
    </g>
</svg>`,
    type: 'note'
  },
  'tip': {
    icon: `<svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g>
        <path
            d="M19.0006 9.03002C19.0007 8.10058 18.8158 7.18037 18.4565 6.32317C18.0972 5.46598 17.5709 4.68895 16.9081 4.03734C16.2453 3.38574 15.4594 2.87265 14.5962 2.52801C13.7331 2.18336 12.8099 2.01409 11.8806 2.03002C10.0966 2.08307 8.39798 2.80604 7.12302 4.05504C5.84807 5.30405 5.0903 6.98746 5.00059 8.77001C4.95795 9.9595 5.21931 11.1402 5.75999 12.2006C6.30067 13.2609 7.10281 14.1659 8.09058 14.83C8.36897 15.011 8.59791 15.2584 8.75678 15.5499C8.91565 15.8415 8.99945 16.168 9.00059 16.5V18.03H15.0006V16.5C15.0006 16.1689 15.0829 15.843 15.24 15.5515C15.3971 15.26 15.6241 15.0121 15.9006 14.83C16.8528 14.1911 17.6336 13.328 18.1741 12.3167C18.7147 11.3054 18.9985 10.1767 19.0006 9.03002Z"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M15 21.04C14.1345 21.6891 13.0819 22.04 12 22.04C10.9181 22.04 9.86548 21.6891 9 21.04"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
            d="M11.9901 5.64001L10.3301 8.41998C10.2549 8.54184 10.2138 8.68167 10.2111 8.82483C10.2084 8.96799 10.2441 9.10925 10.3146 9.23389C10.3851 9.35852 10.4877 9.46195 10.6118 9.53339C10.7359 9.60482 10.8769 9.64165 11.0201 9.64001H13.0201C13.1617 9.63947 13.301 9.67657 13.4237 9.7475C13.5463 9.81843 13.6479 9.92063 13.7181 10.0437C13.7883 10.1668 13.8245 10.3063 13.8231 10.4479C13.8217 10.5896 13.7827 10.7283 13.7101 10.85L12.0301 13.64"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
</svg>`,
    type: 'tip'
  },
  'important': {
    icon: `<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g stroke-width="0"></g>
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g>
        <path fill="currentColor" d="M9,14a1.5,1.5,0,1,1,1.5068-1.5A1.5035,1.5035,0,0,1,9,14Z"></path>
        <path fill="currentColor" d="M9,2A7,7,0,1,1,2,9,7.0079,7.0079,0,0,1,9,2M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
        <path fill="currentColor" d="M10,4H8a1,1,0,0,0-.97,1.2425l1,4a1,1,0,0,0,1.94,0l1-4A1,1,0,0,0,10,4Zm0,2h0Z"></path>
    </g>
</svg>`,
    type: 'important'
  },
  'quote': {
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g>
        <path
            d="M14 15V14C14 13.0681 14 12.6022 14.1522 12.2346C14.3552 11.7446 14.7446 11.3552 15.2346 11.1522C15.6022 11 16.0681 11 17 11H17.5C18.9045 11 19.6067 11 20.1111 11.3371C20.3295 11.483 20.517 11.6705 20.6629 11.8889C21 12.3933 21 13.0955 21 14.5V15.3431C21 16.1606 21 16.5694 20.8478 16.9369C20.6955 17.3045 20.4065 17.5935 19.8284 18.1716L19.2396 18.7604C18.7822 19.2178 18 18.8938 18 18.2469V17.8787C18 17.3934 17.6066 17 17.1213 17H16C14.8954 17 14 16.1046 14 15Z"
            stroke-width="1.5" stroke-linejoin="round"></path>
        <path
            d="M3 9V8C3 7.06812 3 6.60218 3.15224 6.23463C3.35523 5.74458 3.74458 5.35523 4.23463 5.15224C4.60218 5 5.06812 5 6 5H6.5C7.90446 5 8.60669 5 9.11114 5.33706C9.32952 5.48298 9.51702 5.67048 9.66294 5.88886C10 6.39331 10 7.09554 10 8.5V9.34315C10 10.1606 10 10.5694 9.84776 10.9369C9.69552 11.3045 9.40649 11.5935 8.82843 12.1716L8.23965 12.7604C7.78219 13.2178 7 12.8938 7 12.2469V11.8787C7 11.3934 6.6066 11 6.12132 11H5C3.89543 11 3 10.1046 3 9Z"
            stroke-width="1.5" stroke-linejoin="round"></path>
    </g>
</svg>`,
    type: 'quote'
  },
  'bonus': {
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g>
        <path
            d="M9.23163 8.61762C7.26389 9.06284 6.28001 9.28545 6.04594 10.0382C5.81186 10.7909 6.4826 11.5753 7.82408 13.1439L8.17113 13.5498C8.55234 13.9955 8.74294 14.2184 8.82869 14.4942C8.91444 14.7699 8.88562 15.0673 8.82799 15.662L8.77552 16.2035C8.5727 18.2965 8.4713 19.343 9.08412 19.8082C9.69694 20.2734 10.6181 19.8492 12.4605 19.0009L12.9372 18.7815C13.4607 18.5404 13.7225 18.4199 14 18.4199C14.2775 18.4199 14.5393 18.5404 15.0628 18.7815L15.5395 19.0009C17.3819 19.8492 18.3031 20.2734 18.9159 19.8082C19.5287 19.343 19.4273 18.2965 19.2245 16.2035M20.1759 13.1439C21.5174 11.5753 22.1881 10.7909 21.9541 10.0382C21.72 9.28545 20.7361 9.06284 18.7684 8.61762L18.2593 8.50244C17.7001 8.37592 17.4205 8.31266 17.196 8.14225C16.9716 7.97183 16.8276 7.71355 16.5396 7.19699L16.2775 6.7267C15.2641 4.9089 14.7575 4 14 4C13.2425 4 12.7359 4.9089 11.7225 6.7267"
            stroke-width="1.5" stroke-linecap="round"></path>
        <path d="M2.08887 16C3.20445 15.121 4.68639 14.7971 6.08887 15.1257" stroke-width="1.5"
            stroke-linecap="round"></path>
        <path d="M2.08887 10.5C3.08887 10 3.37862 10.0605 4.08887 10" stroke-width="1.5"
            stroke-linecap="round"></path>
        <path d="M2 5.60867L2.20816 5.48676C4.41383 4.19506 6.75032 3.84687 8.95304 4.48161L9.16092 4.54152"
            stroke-width="1.5" stroke-linecap="round"></path>
    </g>
</svg>`,
    type: 'bonus'
  }
}

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
      
      if (noteType in noteTypes) {
        const noteConfig = noteTypes[noteType]
        
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