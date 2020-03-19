module.exports = {
  title: "Unbinilium's 📖",

  description: "Unbinilium's personal knowledge book",

  base: "/",
  
  locales: {
    '/': {
      lang: 'en-US'
    }
  },
  
  head: [ 
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover' }],
    ['link', { rel: 'manifest', href: '/manifest.json', crossorigin: 'use-credentials' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#fff' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileColor', content: '#fff' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon.png' }]
  ],

  markdown: {
    lineNumbers: false
  },

  plugins: [
    ['vuepress-plugin-smooth-scroll'],
    ['vuepress-plugin-nprogress'],
    ['@vuepress/active-header-links'],
    ['@vuepress/last-updated'],
    ['@vuepress/pwa',
      {
        serviceWorker: true,
        popupComponent: 'UbnSWUpdatePopup',
        updatePopup: true
      }
    ],
    ['vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/'
      }
    ],
    ['vuepress-plugin-mathjax',
      {
        target: 'chtml',
        macros: {
          '*': '\\times'
        }
      }
    ],
    ['vuepress-plugin-copyright',
      {
        noCopy: true,
        minLength: 1000,
        authorName: 'Unbinilium'
      }
    ]
  ],

  theme: 'default-prefers-color-scheme',
  
  themeConfig: {
    smoothScroll: true,
    nav: require("./nav"),
    sidebar: require("./sidebar"),
    sidebarDepth: 3,
    lastUpdated: "CC BY-SA 4.0 / Last Updated",
    search: true,
    searchMaxSuggestoins: 10,
    nextLinks: true,
    prevLinks: true,
    activeHeaderLinks: true,
    repo: "",
    editLinks: false
  },

  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-html5-embed'),
      {
        html5embed: {
          useImageSyntax: true,
          useLinkSyntax: false,
          attributes: {
            'audio': 'width="100%" controls class="audioplayer" preload="metadata" playsinline',
            'video': 'width="100%" height="auto" controls class="audioplayer" preload="metadata" playsinline'
          }
        } 
      })
    }
  },

  evergreen: true
};
