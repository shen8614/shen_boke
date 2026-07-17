# shen的博客

> 📝 记录技术学习、项目实战与成长旅程

一个基于 [VitePress](https://vitepress.dev/) 构建的技术博客，采用简洁克制的 Linear/Vercel 设计风格。

## 🌐 在线访问

**地址**: [https://shen8614.github.io/shen_boke/](https://shen8614.github.io/shen_boke/)

## 📂 项目结构

```
blog/
├── .vitepress/
│   ├── config.ts            # VitePress 配置
│   └── theme/
│       ├── index.ts         # 主题入口
│       ├── style.css        # 自定义样式
│       └── ReadingProgress.vue  # 阅读进度条组件
├── posts/
│   ├── tech/                # 技术学习文章
│   ├── project/             # 项目实战记录
│   └── categories/          # 分类索引
├── index.md                 # 首页
├── about.md                 # 关于我
├── archives.md              # 归档页
└── package.json
```

## 🛠️ 技术栈

- **框架**: VitePress 1.6
- **语言**: Markdown + Vue 3
- **图表**: Mermaid (vitepress-plugin-mermaid)
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions 自动构建部署

## 🎨 设计特色

- **配色**: Indigo 品牌色 (#6366f1) + 暗色模式支持
- **字体**: Inter (正文) + JetBrains Mono (代码)
- **背景**: 微妙点阵纹理 + 渐变光晕
- **交互**: 导航栏毛玻璃、阅读进度条、卡片 3D hover、页面淡入动画
- **Mermaid**: 紧凑优雅的图表样式，圆角卡片 + 阴影

## 📖 文章内容

### 技术学习
- Cursor / Windsurf / VS Code Copilot — AI IDE 体验对比
- Claude Code / Codex / OpenCode — Coding Agent 深度评测
- Hermes Agent — 全功能自治代理框架
- MCP 协议 — AI 工具集成新标准
- 本地大模型部署 — Ollama + Open WebUI 实战
- RSS 自建阅读体系 — FreshRSS + RSSHub 构建个人信息流

### 项目实战
- 酒店管理系统 — Spring Boot + Vue 3 全栈开发

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📦 部署

博客通过 GitHub Actions 自动部署到 GitHub Pages。推送到 `main` 分支后会自动触发构建和部署。

## 📬 联系方式

- **GitHub**: [github.com/shen8614](https://github.com/shen8614)
- **Email**: 3756959811@qq.com

## 📄 License

MIT
