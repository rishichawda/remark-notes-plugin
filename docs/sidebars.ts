import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '👋 Introduction',
    },
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/usage',
        'getting-started/advanced-usage',
      ],
    },
    {
      type: 'category',
      label: '📚 Guides',
      collapsed: false,
      items: [
        'guides/frameworks',
        'guides/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: '🎨 Customization',
      collapsed: false,
      items: [
        'customization/styling',
      ],
    },
    {
      type: 'category',
      label: '💡 Examples',
      collapsed: false,
      items: [
        'examples/note-types',
        'examples/customization',
      ],
    },
    {
      type: 'category',
      label: '📖 API Reference',
      collapsed: false,
      items: [
        'api/overview',
      ],
    },
  ],
};

export default sidebars;
