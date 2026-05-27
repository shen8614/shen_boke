---
title: Hello Blog - 我的第一篇博客
date: 2026-05-27
tags:
  - 博客
  - VitePress
categories:
  - 技术学习
description: 这是我的第一篇博客文章，记录博客搭建的过程和初衷。
---

# Hello Blog - 我的第一篇博客

## 前言

你好！欢迎来到我的博客。这是我的第一篇博客文章，用来记录博客搭建的过程和我的初衷。

## 为什么写博客？

写博客有很多好处：

1. **记录学习过程** - 把学到的知识整理成文字，加深理解
2. **分享经验** - 帮助其他学习者少走弯路
3. **建立个人品牌** - 展示自己的技术能力和学习态度
4. **面试加分** - 博客是最好的项目经历之一

## 博客技术栈

这个博客使用以下技术搭建：

- **VitePress** - Vue 生态的静态站点生成器
- **GitHub Pages** - 免费托管
- **Markdown** - 写作格式

为什么选择 VitePress？

1. 我有 Vue 3 开发经验，VitePress 上手零成本
2. VitePress 速度快，构建时间短
3. 支持自定义主题，可以打造独特的博客风格
4. 社区活跃，有很多优秀的插件和主题

## 博客功能

目前博客具备以下功能：

- ✅ 文章分类与标签
- ✅ 文章归档（按时间线）
- ✅ 目录导航
- ✅ 响应式布局
- ✅ 暗色模式
- ✅ 全文搜索（后续添加）

后续计划添加：

- 评论系统
- RSS 订阅
- 访客统计
- 更多自定义样式

## 搭建过程

### 1. 初始化项目

```bash
npm init -y
npm install -D vitepress
```

### 2. 创建配置文件

在 `.vitepress/config.ts` 中配置网站基本信息：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '沈同学的博客',
  description: '记录技术学习、项目实战与生活感悟',
  // ... 其他配置
})
```

### 3. 创建文章

在 `posts/` 目录下创建 Markdown 文件，VitePress 会自动识别并生成页面。

### 4. 部署到 GitHub Pages

```bash
# 构建静态文件
npm run docs:build

# 推送到 GitHub
git add .
git commit -m "Initial blog"
git push origin main
```

在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支作为源。

## 后续计划

我会持续更新这个博客，记录：

- Spring Boot 学习笔记
- Vue 3 开发经验
- 项目实战记录
- 面试准备
- 学习心得

## 总结

写博客是一个很好的学习方式，希望我能坚持下去。如果你也想写博客，不妨从今天开始！

---

> 如果你觉得这篇文章对你有帮助，欢迎点赞和分享！
