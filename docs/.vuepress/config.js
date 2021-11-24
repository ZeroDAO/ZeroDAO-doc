const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Docs",
  description: "User-friendly Web3",

  dest: "./dist",

  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      title: "Docs",
      description: "用户友好的Web3",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://docs.zerodao.net",

    author: "ZeroDAO",
    repo: "https://github.com/ZeroDAO",

    nav: [
      {
        text: "Home",
        icon: "flex",
        link: "/",
      },
      {
        text: "Learn",
        icon: "plugin",
        link: "/learn/",
      },
      {
        text: "Guide",
        icon: "overflow",
        link: "/guide/",
      },
      {
        text: "ZeroDAO",
        icon: "note",
        link: "https://zerodao.net",
      },
    ],
    sidebar: {
      "/learn/": [
        {
          title: "Getting Started",
          icon: "select",
          prefix: "getting-started/",
          children: [ "../" , "architecture","roadmap","resources"],
        },
        {
          title: "Social Finance",
          icon: "more",
          prefix: "social-finance/",
          children: [ "", "social-currency", "zero-cost-payment","applications"],
        },
        {
          title: "Reputation System",
          icon: "advance",
          prefix: "reputation/",
          children: [ "", "tir", "challenge-games"],
        }
      ],
      "/guide/": [
        {
          title: "Run node",
          icon: "shell",
          prefix: "node/",
          children: [ "../" , "experience"],
        },
        {
          title: "Reputation System",
          icon: "advance",
          prefix: "reputation/",
          children: [ "", "reputation", "seeds"],
        },
        {
          title: "Challenge Games",
          icon: "ability",
          prefix: "challenge/",
          children: [ "", "seed-challenge", "reputation-challenge"],
        }
      ],
    },

    locales: {
      "/zh/": {
        nav: [
          {
            text: "首页",
            icon: "flex",
            link: "/zh/",
          },
          {
            text: "学习",
            icon: "plugin",
            link: "/zh/learn/",
          },
          {
            text: "文档",
            icon: "overflow",
            link: "/zh/guide/",
          },
          {
            text: "ZeroDAO",
            icon: "note",
            link: "https://zerodao.net",
          },
        ],
        sidebar: {
          "/zh/learn/": [
            {
              title: "开始",
              icon: "select",
              prefix: "getting-started/",
              children: [ "../" , "architecture","roadmap","resources"],
            },
            {
              title: "社交金融",
              icon: "more",
              prefix: "social-finance/",
              children: [ "", "social-currency", "zero-cost-payment","applications"],
            },
            {
              title: "声誉系统",
              icon: "advance",
              prefix: "reputation/",
              children: [ "", "tir", "challenge-games"],
            }
          ],
          "/zh/guide/": [
            {
              title: "运行节点",
              icon: "shell",
              prefix: "node/",
              children: [ "../" , "experience"],
            },
            {
              title: "声誉系统",
              icon: "advance",
              prefix: "reputation/",
              children: [ "", "reputation", "seeds"],
            },
            {
              title: "挑战游戏",
              icon: "ability",
              prefix: "challenge/",
              children: [ "", "seed-challenge", "reputation-challenge"],
            }
          ],
        },
      },
    },

    footer: {
      display: true,
      content: "ZeroDAO",
    },

    copyright: {
      status: "global",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    blog: false,

    mdEnhance: {
      enableAll: false,
      flowchart: true,
      tex: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },

  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'G-WQME70JS71'
      }
    ]
  ]
});
