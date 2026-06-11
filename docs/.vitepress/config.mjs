import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Rakuten Reward SDK',
  description: 'Integration guide for Rakuten Reward Native SDK',

  // GitHub Pages — repo name is the root, so no base needed for user/org pages
  // base: '/',

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Rakuten Reward SDK',

    // Top navigation
    nav: [
      { text: 'Android', link: '/android/' },
      { text: 'iOS', link: '/ios/' },
      { text: 'JavaScript', link: '/javascript/' },
    ],

    // Per-path sidebars
    sidebar: {
      '/android/': androidSidebar(),
      '/ios/': iosSidebar(),
      '/javascript/': jsSidebar(),
    },

    // Prev/next labels
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },

    // Edit link (optional — point to your source repo when ready)
    // editLink: {
    //   pattern: 'https://github.com/your-org/your-repo/edit/main/docs/:path',
    //   text: 'Edit this page',
    // },

    footer: {
      copyright: 'Copyright © 2024 Rakuten Group, Inc.',
    },

    search: {
      provider: 'local',
    },
  },
})

function androidSidebar() {
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Basic Setup', link: '/android/' },
        { text: 'Integration', link: '/android/integration' },
      ],
    },
    {
      text: 'Features',
      items: [
        { text: 'Mission Achievement', link: '/android/mission' },
        { text: 'Built-in UI', link: '/android/ui' },
        { text: 'User Information', link: '/android/user-info' },
      ],
    },
    {
      text: 'Reference',
      items: [
        { text: 'API Reference', link: '/android/api-reference' },
        { text: 'Migration Guide', link: '/android/migration' },
        { text: 'FAQ', link: '/android/faq' },
      ],
    },
  ]
}

function iosSidebar() {
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Basic Setup', link: '/ios/' },
        { text: 'Integration', link: '/ios/integration' },
      ],
    },
    {
      text: 'Features',
      items: [
        { text: 'Mission Achievement', link: '/ios/mission' },
        { text: 'Built-in UI', link: '/ios/ui' },
        { text: 'User Information', link: '/ios/user-info' },
      ],
    },
    {
      text: 'Reference',
      items: [
        { text: 'API Reference', link: '/ios/api-reference' },
        { text: 'Migration Guide', link: '/ios/migration' },
        { text: 'FAQ', link: '/ios/faq' },
      ],
    },
  ]
}

function jsSidebar() {
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Basic Setup', link: '/javascript/' },
        { text: 'Integration', link: '/javascript/integration' },
      ],
    },
    {
      text: 'Features',
      items: [
        { text: 'Mission Achievement', link: '/javascript/mission' },
        { text: 'Built-in UI', link: '/javascript/ui' },
      ],
    },
    {
      text: 'Reference',
      items: [
        { text: 'API Reference', link: '/javascript/api-reference' },
        { text: 'FAQ', link: '/javascript/faq' },
      ],
    },
  ]
}
