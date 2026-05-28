---
title: "Cursor：为 AI 而生的代码编辑器"
date: 2026-05-20
tags:
  - AI
  - IDE
  - Cursor
categories:
  - 技术学习
description: 深入介绍 Cursor 编辑器的核心功能、安装部署与使用体验，探索 AI 原生编辑器的优势。
---

# Cursor：为 AI 而生的代码编辑器

## 简介

Cursor 是一款基于 VS Code fork 的 AI 原生代码编辑器，由 Anysphere 团队开发。它将 AI 能力深度嵌入编辑器的每一个角落，从代码补全到项目级重构，从单文件编辑到多 Agent 协作，目标是让开发者把精力花在真正需要思考的地方。

与传统的"编辑器 + AI 插件"模式不同，Cursor 从底层就为 AI 协作设计。它的 Tab 补全能预测你接下来几行要写什么，Cmd+K 能让 AI 直接改写选中代码，Agent 模式更是能自主分析项目结构、跨文件重构。

## 安装与部署

### 下载安装

Cursor 支持 macOS、Windows、Linux 三个平台：

```bash
# macOS (Homebrew)
brew install --cask cursor

# Windows
# 从 https://cursor.com 下载安装包

# Linux (AppImage)
# 从 https://cursor.com 下载 AppImage
```

### 账号注册

首次启动需要登录 Cursor 账号。支持 GitHub、Google 账号登录，也可以用邮箱注册。

### 配置 VS Code 迁移

如果你是 VS Code 用户，Cursor 支持一键导入 VS Code 的配置：

1. 打开 Cursor → Settings → Import
2. 选择导入 VS Code 的扩展、快捷键、设置
3. 重启 Cursor 即可

## 核心功能

### Tab 补全

Cursor 的 Tab 补全是目前体验最好的。它不只是补全当前行，而是能预测你接下来几行要写什么，按下 Tab 就能接受整段建议。

写 React 组件时经常出现这样的场景：你写了 `const [data, setData] =`，它直接补全 `useState(null)` 并且光标跳到下一行准备写 `useEffect`。这种"读心术"级别的补全在写重复性代码时效率极高。

### Cmd+K 编辑

Cmd+K 是 Cursor 的核心交互——选中代码，描述你想做什么，AI 直接改。支持：

- 选中代码后 Cmd+K 描述修改意图
- 在空白处 Cmd+K 让 AI 生成新代码
- 多次 Cmd+K 迭代修改

### Agent 模式

2025 年底 Cursor 引入了 Agent 模式，将能力从"改选中的代码"扩展到了"改整个项目"：

- 自动分析项目结构
- 跨文件搜索和修改
- 执行终端命令
- 遇到不确定的地方会停下来问你

### .cursorrules 项目记忆

Cursor 用 `.cursorrules` 文件来控制 AI 的行为：

```text
# .cursorrules 示例
这是一个 Spring Boot + Vue 3 项目。
后端使用 Java 17，前端使用 TypeScript。
代码风格遵循 Google Java Style Guide。
禁止使用 any 类型。
```

这个文件会被注入到每次 AI 对话的 system prompt 中，效果比每次手动提醒好得多。

## 使用场景

### 日常编码

```text
# 快速生成一个 REST API
Cmd+K: "给 UserController 加一个分页查询接口，支持按姓名模糊搜索"

# 重构代码
选中一段代码 → Cmd+K: "把这段代码提取成一个独立的 service 方法"

# 写测试
选中一个函数 → Cmd+K: "为这个函数写单元测试，覆盖边界情况"
```

### 大规模重构

Agent 模式下可以说"把所有 class 组件改成 hooks"，Agent 会分析项目结构，逐个文件修改。

### 代码审查

选中一段代码，Cmd+K 问"这段代码有什么潜在问题？"，AI 会给出分析和改进建议。

## 优势

1. **Tab 补全质量最高**：预测准确率高，能补全多行代码
2. **Agent 模式成熟**：跨文件重构能力强，能自主分析项目
3. **VS Code 生态兼容**：直接继承 VS Code 的插件生态
4. **项目记忆机制**：.cursorrules 让 AI 理解项目上下文
5. **迭代式编辑**：Cmd+K 支持多次迭代，逐步完善代码

## 定价

| 方案 | 价格 | 内容 |
|------|------|------|
| Hobby | 免费 | 有限的 fast requests |
| Pro | $20/月 | 更多 fast requests，Agent 模式 |
| Business | $40/月 | 团队管理，SSO，优先支持 |

## 不足

- 价格是最大争议点，重度使用时 fast requests 不够用会降速
- AI 有时会"过度自信"——你只想改一行，它把整个文件重写了
- 偶尔会出现上下文丢失的情况

---

> Cursor 适合追求极致 AI 编码体验的开发者。如果你是 VS Code 用户，迁移成本几乎为零。
