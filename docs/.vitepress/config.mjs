import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Rakuten Reward SDK',
  description: 'Integration guide for Rakuten Reward Native SDK',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      themeConfig: {
        nav: [
          { text: 'Android', link: '/ja/android/' },
          { text: 'iOS', link: '/ja/ios/' },
          { text: 'JavaScript', link: '/ja/javascript/' },
        ],
        sidebar: {
          '/ja/android/': jaAndroidSidebar(),
          '/ja/ios/': jaIosSidebar(),
        },
        docFooter: {
          prev: '前のページ',
          next: '次のページ',
        },
        footer: {
          copyright: `Copyright © ${new Date().getFullYear()} Rakuten Group, Inc.`,
        },
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Rakuten Reward SDK',

    nav: [
      { text: 'Android', link: '/android/' },
      { text: 'iOS', link: '/ios/' },
      { text: 'JavaScript', link: '/javascript/' },
    ],

    sidebar: {
      '/android/': androidSidebar(),
      '/ios/': iosSidebar(),
      '/javascript/': jsSidebar(),
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },

    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Rakuten Group, Inc.`,
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
        { text: 'Login', link: '/android/login' },
      ],
    },
    {
      text: 'Features',
      items: [
        { text: 'Built-in UI', link: '/android/ui' },
        { text: 'Mission Achievement', link: '/android/mission' },
        { text: 'User Consent', link: '/android/consent' },
        { text: 'JavaScript Extension', link: '/android/js-extension' },
      ],
    },
    {
      text: 'Configuration',
      items: [
        { text: 'Debugging', link: '/android/debugging' },
        { text: 'App Locale', link: '/android/app-locale' },
        { text: 'RakutenRewardConfig', link: '/android/reward-config' },
      ],
    },
    {
      text: 'Reference',
      items: [
        { text: 'RakutenReward', link: '/android/api-rakuten-reward' },
        { text: 'RakutenRewardCoroutine', link: '/android/api-rakuten-reward-coroutine' },
        { text: 'KDoc ↗', link: 'https://rakuten-ads.github.io/products/mission/android/kdoc/8.2.0/index.html', target: '_blank', rel: 'noopener' },
        { text: 'Sample Code ↗', link: 'https://github.com/Rakuten-Reward-SDK/Reward-Native-SDK-Sample-Android', target: '_blank', rel: 'noopener' },
        { text: 'FAQ', link: '/android/faq' },
        { text: 'Version History ↗', link: 'https://github.com/rakuten-ads/Rakuten-Reward-Native-Android/blob/master/doc/history/README.md', target: '_blank', rel: 'noopener' },
      ],
    },
  ]
}

function jaAndroidSidebar() {
  return [
    {
      text: 'はじめに',
      items: [
        { text: '基本セットアップ', link: '/ja/android/' },
        { text: 'インテグレーション', link: '/ja/android/integration' },
        { text: 'ログイン', link: '/ja/android/login' },
      ],
    },
    {
      text: '機能',
      items: [
        { text: 'Built-in UI', link: '/ja/android/ui' },
        { text: 'ミッションの達成', link: '/ja/android/mission' },
        { text: 'ユーザー同意', link: '/ja/android/consent' },
        { text: 'JavaScript拡張機能', link: '/ja/android/js-extension' },
      ],
    },
    {
      text: '設定',
      items: [
        { text: 'デバッグ', link: '/ja/android/debugging' },
        { text: 'アプリのロケール', link: '/ja/android/app-locale' },
        { text: 'RakutenRewardConfig', link: '/ja/android/reward-config' },
      ],
    },
    {
      text: 'リファレンス',
      items: [
        { text: 'RakutenReward', link: '/ja/android/api-rakuten-reward' },
        { text: 'RakutenRewardCoroutine', link: '/ja/android/api-rakuten-reward-coroutine' },
        { text: 'KDoc ↗', link: 'https://rakuten-ads.github.io/products/mission/android/kdoc/8.2.0/index.html', target: '_blank', rel: 'noopener' },
        { text: 'Sample Code ↗', link: 'https://github.com/Rakuten-Reward-SDK/Reward-Native-SDK-Sample-Android', target: '_blank', rel: 'noopener' },
        { text: 'FAQ', link: '/ja/android/faq' },
        { text: 'バージョン履歴 ↗', link: 'https://github.com/rakuten-ads/Rakuten-Reward-Native-Android/blob/master/doc/history/README.md', target: '_blank', rel: 'noopener' },
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
        { text: 'User Consent', link: '/ios/consent' },
        { text: 'JavaScript Extension', link: '/ios/js-extension' },
      ],
    },
    {
      text: 'Configuration',
      items: [
        { text: 'Debugging', link: '/ios/debugging' },
        { text: 'App Language', link: '/ios/app-language' },
        { text: 'RewardConfiguration', link: '/ios/configuration' },
      ],
    },
    {
      text: 'Reference',
      items: [
        { text: 'API Reference', link: '/ios/api-reference' },
        { text: 'API Doc ↗', link: 'https://rakuten-ads.github.io/products/mission/iOS/Native/jazzy/9.1.0/index.html', target: '_blank', rel: 'noopener' },
        { text: 'Changelog ↗', link: 'https://github.com/rakuten-ads/Rakuten-Reward-Native-iOS/blob/master/doc/changelog.md', target: '_blank', rel: 'noopener' },
        { text: 'FAQ', link: '/ios/faq' },
      ],
    },
  ]
}

function jaIosSidebar() {
  return [
    {
      text: 'はじめに',
      items: [
        { text: '基本セットアップ', link: '/ja/ios/' },
        { text: 'インテグレーション', link: '/ja/ios/integration' },
      ],
    },
    {
      text: '機能',
      items: [
        { text: 'ミッションの達成', link: '/ja/ios/mission' },
        { text: 'Built-in UI', link: '/ja/ios/ui' },
        { text: 'ユーザー同意', link: '/ja/ios/consent' },
        { text: 'JavaScript拡張機能', link: '/ja/ios/js-extension' },
      ],
    },
    {
      text: '設定',
      items: [
        { text: 'デバッグ', link: '/ja/ios/debugging' },
        { text: 'アプリの言語', link: '/ja/ios/app-language' },
        { text: 'RewardConfiguration', link: '/ja/ios/configuration' },
      ],
    },
    {
      text: 'リファレンス',
      items: [
        { text: 'APIリファレンス', link: '/ja/ios/api-reference' },
        { text: 'API Doc ↗', link: 'https://rakuten-ads.github.io/products/mission/iOS/Native/jazzy/9.1.0/index.html', target: '_blank', rel: 'noopener' },
        { text: 'Changelog ↗', link: 'https://github.com/rakuten-ads/Rakuten-Reward-Native-iOS/blob/master/doc/changelog.md', target: '_blank', rel: 'noopener' },
        { text: 'FAQ', link: '/ja/ios/faq' },
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
