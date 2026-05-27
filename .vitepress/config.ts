import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/shen_boke/',
  title: '沈同学的博客',
  description: '记录技术学习、项目实战与生活感悟',
  lang: 'zh-CN',
  lastUpdated: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '沈同学的博客',
    
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
            { text: 'Java & Spring Boot', link: '/posts/categories/tech/' },
            { text: '前端开发', link: '/posts/categories/tech/' },
            { text: '数据库', link: '/posts/categories/tech/' },
          ]
        },
        {
          text: '项目实战',
          collapsed: false,
          items: [
            { text: '项目记录', link: '/posts/categories/project/' },
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
      copyright: '© 2026 沈同学'
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
