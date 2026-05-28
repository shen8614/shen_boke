import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    base: '/shen_boke/',
    title: 'shen的博客',
    description: '记录技术学习、项目实战与生活感悟',
    lang: 'zh-CN',
    lastUpdated: true,
    
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/shen_boke/favicon.svg' }],
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
              { text: 'Cursor', link: '/posts/tech/cursor' },
              { text: 'Windsurf', link: '/posts/tech/windsurf' },
              { text: 'VS Code Copilot', link: '/posts/tech/vscode-copilot' },
              { text: 'Claude Code', link: '/posts/tech/claude-code' },
              { text: 'Codex', link: '/posts/tech/codex' },
              { text: 'OpenCode', link: '/posts/tech/opencode' },
              { text: 'Hermes Agent', link: '/posts/tech/hermes-agent' },
              { text: 'OpenClaw', link: '/posts/tech/openclaw' },
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
    },

    mermaid: {
      theme: 'base',
      themeVariables: {
        primaryColor: '#eef2ff',
        primaryTextColor: '#3730a3',
        primaryBorderColor: '#a5b4fc',
        lineColor: '#c7d2fe',
        secondaryColor: '#f0f9ff',
        tertiaryColor: '#faf5ff',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '13px',
        noteBkgColor: '#fef3c7',
        noteTextColor: '#92400e',
        clusterBkg: '#f8fafc',
        clusterBorder: '#e2e8f0',
      },
      flowchart: {
        curve: 'basis',
        padding: 12,
        htmlLabels: true,
        useMaxWidth: true,
      },
    },
  })
)
