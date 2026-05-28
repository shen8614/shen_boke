import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/shen_boke/',
  title: 'shen的博客',
  description: '记录技术学习、项目实战与生活感悟',
  lang: 'zh-CN',
  lastUpdated: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'shen的博客',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '归档', link: '/archives' },
      { text: '关于', link: '/about' },
    ],

    sidebar: {
      '/posts/': [
        {
          text: '技术学习',
          collapsed: false,
          items: [
            { text: 'Hello Blog', link: '/posts/tech/hello-blog' },
            { text: 'AI IDE 横评', link: '/posts/tech/ai-ide-comparison' },
            { text: 'AI Coding Agent 对比', link: '/posts/tech/ai-coding-agents' },
            { text: 'Hermes Agent 深度体验', link: '/posts/tech/hermes-agent-review' },
            { text: 'AI Agent 开发实践', link: '/posts/tech/ai-agent-development' },
            { text: 'MCP 协议', link: '/posts/tech/mcp-protocol' },
            { text: '本地大模型部署', link: '/posts/tech/local-llm-deployment' },
          ]
        },
        {
          text: '项目实战',
          collapsed: false,
          items: [
            { text: '酒店管理系统', link: '/posts/project/hotel-management' },
          ]
        },
        {
          text: '日常随笔',
          collapsed: false,
          items: [
            { text: '生活记录', link: '/posts/categories/daily/' },
          ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
    ],

    footer: {
      message: '用 VitePress 搭建',
      copyright: '© 2026 shen'
    },

    outline: {
      label: '目录',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  }
})
