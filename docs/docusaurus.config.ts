import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkNotes from 'remark-notes-plugin';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Remark Notes Plugin',
  tagline: 'Transform markdown blockquotes into beautiful, professional note components',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://rishichawda.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/remark-notes-plugin/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rishichawda', // Usually your GitHub org/user name.
  projectName: 'remark-notes-plugin', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/rishichawda/remark-notes-plugin/tree/main/docs',
          // Add remark plugin to process notes
          remarkPlugins: [remarkNotes],
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false, // We don't need a blog for this project
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        // Google Analytics (optional - uncomment and add your tracking ID)
        // gtag: {
        //   trackingID: 'G-XXXXXXXXXX',
        //   anonymizeIP: true,
        // },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/remark-notes-social-card.jpg',
    
    // Announcement bar
    announcementBar: {
      id: 'support_us',
      content: '⭐ If you like remark-notes-plugin, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/rishichawda/remark-notes-plugin">GitHub</a>!',
      backgroundColor: '#667eea',
      textColor: '#ffffff',
      isCloseable: true,
    },
    
    metadata: [
      {name: 'keywords', content: 'remark, markdown, notes, callouts, documentation, plugin, mdx, astro, next.js'},
      {name: 'description', content: 'A powerful remark plugin that transforms markdown blockquotes into beautiful, professional note components. Perfect for documentation, blogs, and technical writing.'},
      {name: 'author', content: 'rishichawda'},
      {name: 'og:type', content: 'website'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    navbar: {
      title: 'Remark Notes Plugin',
      logo: {
        alt: 'Remark Notes Plugin Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Quick Links',
          position: 'left',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'API Reference',
              to: '/docs/api/overview',
            },
            {
              label: 'Framework Integration',
              to: '/docs/guides/frameworks',
            },
            {
              label: 'Customization',
              to: '/docs/customization/styling',
            },
          ],
        },
        {
          href: 'https://www.npmjs.com/package/remark-notes-plugin',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/rishichawda/remark-notes-plugin',
          label: 'GitHub',
          position: 'right',
        },
      ],
      hideOnScroll: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'API Reference',
              to: '/docs/api/overview',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Framework Integration',
              to: '/docs/guides/frameworks',
            },
            {
              label: 'Customization',
              to: '/docs/customization/styling',
            },
            {
              label: 'Troubleshooting',
              to: '/docs/guides/troubleshooting',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/rishichawda/remark-notes-plugin',
            },
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/remark-notes-plugin',
            },
            {
              label: 'Issues',
              href: 'https://github.com/rishichawda/remark-notes-plugin/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} remark-notes-plugin. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'markdown', 'typescript', 'jsx', 'tsx'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    
    // Algolia search (optional - configure when ready)
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'remark-notes-plugin',
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
