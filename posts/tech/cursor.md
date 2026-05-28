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

> 官网：[https://cursor.com](https://cursor.com)

## 简介

Cursor 是一款基于 VS Code fork 的 AI 原生代码编辑器，由 Anysphere 团队开发。它将 AI 能力深度嵌入编辑器的每一个角落，从代码补全到项目级重构，从单文件编辑到多 Agent 协作，目标是让开发者把精力花在真正需要思考的地方。

与传统的"编辑器 + AI 插件"模式不同，Cursor 从底层就为 AI 协作设计。它的 Tab 补全能预测你接下来几行要写什么，Cmd+K 能让 AI 直接改写选中代码，Agent 模式更是能自主分析项目结构、跨文件重构。

## 安装与部署

### macOS

```bash
# 方式一：Homebrew（推荐）
brew install --cask cursor

# 方式二：官网下载
# 访问 https://cursor.com 下载 .dmg 安装包
```

### Windows

```bash
# 方式一：winget
winget install Anysphere.Cursor

# 方式二：官网下载
# 访问 https://cursor.com 下载 .exe 安装包
```

### Linux

```bash
# 方式一：AppImage
# 访问 https://cursor.com 下载 AppImage
chmod +x Cursor-*.AppImage
./Cursor-*.AppImage

# 方式二：deb 包（Ubuntu/Debian）
# 访问 https://cursor.com 下载 .deb 包
sudo dpkg -i cursor-*.deb
```

### 账号注册与登录

首次启动 Cursor 会引导你登录账号：

1. 打开 Cursor
2. 点击左下角 Account 图标
3. 选择 GitHub、Google 账号登录，或用邮箱注册
4. 登录后选择订阅方案

### 从 VS Code 迁移

如果你是 VS Code 用户，Cursor 支持一键导入配置：

1. 打开 Cursor → Settings → Import
2. 选择导入 VS Code 的扩展、快捷键、设置
3. 重启 Cursor 即可

所有 VS Code 插件都兼容 Cursor，迁移成本几乎为零。

## 核心功能

### Tab 补全

Cursor 的 Tab 补全是目前体验最好的。它不只是补全当前行，而是能预测你接下来几行要写什么，按下 Tab 就能接受整段建议。

写 React 组件时经常出现这样的场景：你写了 `const [data, setData] =`，它直接补全 `useState(null)` 并且光标跳到下一行准备写 `useEffect`。这种"读心术"级别的补全在写重复性代码时效率极高。

Tab 补全的特点：
- **多行预测**：不只是当前行，能预测接下来 3-5 行
- **上下文感知**：理解整个文件的上下文，补全更准确
- **快速接受**：Tab 接受，Esc 拒绝，Ctrl+→ 逐词接受

### Cmd+K 编辑

Cmd+K 是 Cursor 的核心交互——选中代码，描述你想做什么，AI 直接改。

```text
# 选中代码后 Cmd+K
"把这段代码改成 async/await 风格"
"为这个函数加上错误处理"
"优化这段代码的性能"

# 在空白处 Cmd+K
"写一个 React Hook 用于表单验证"
"生成一个 REST API 的 CRUD 接口"
```

Cmd+K 支持多次迭代：第一次改完后可以继续 Cmd+K 微调，直到满意为止。

### Agent 模式

2025 年底 Cursor 引入了 Agent 模式，将能力从"改选中的代码"扩展到了"改整个项目"：

- **自动分析项目结构**：理解目录组织、依赖关系
- **跨文件搜索和修改**：找到所有相关文件并逐一修改
- **执行终端命令**：运行测试、安装依赖、启动服务
- **交互确认**：遇到不确定的地方会停下来问你

```text
# Agent 模式下的典型对话
"把所有 class 组件改成 hooks"
"给所有 API 接口加上参数校验"
"把这个模块从 JavaScript 迁移到 TypeScript"
```

### .cursorrules 项目记忆

Cursor 用 `.cursorrules` 文件来控制 AI 的行为。在项目根目录创建这个文件：

```text
# .cursorrules 示例
这是一个 Spring Boot + Vue 3 全栈项目。

## 后端规范
- Java 17，Spring Boot 3.x
- 代码风格遵循 Google Java Style Guide
- 所有 API 必须有单元测试
- 禁止使用 Lombok

## 前端规范
- TypeScript，Vue 3 Composition API
- 使用 Pinia 管理状态
- 组件命名使用 PascalCase
- 禁止使用 any 类型
```

这个文件会被注入到每次 AI 对话的 system prompt 中，效果比每次手动提醒好得多。

### 多模型支持

Cursor 支持切换底层模型：
- **Claude 3.5 Sonnet**：默认模型，综合能力最强
- **GPT-4o**：推理能力突出
- **Claude 3.5 Haiku**：速度快，适合简单任务

在 Settings → Models 中可以切换。

## 使用场景

### 日常编码

```bash
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
6. **多模型支持**：可在 Claude、GPT-4o 之间切换

## 定价

| 方案 | 价格 | 内容 |
|------|------|------|
| Hobby | 免费 | 有限的 fast requests，基础补全 |
| Pro | $20/月 | 更多 fast requests，Agent 模式，多模型 |
| Business | $40/月 | 团队管理，SSO，优先支持，集中计费 |

## 不足

- 价格是最大争议点，重度使用时 fast requests 不够用会降速到慢队列
- AI 有时会"过度自信"——你只想改一行，它把整个文件重写了
- 偶尔会出现上下文丢失的情况，长对话时需要重新描述
- 对大型 monorepo 的支持还有提升空间

---

> Cursor 适合追求极致 AI 编码体验的开发者。如果你是 VS Code 用户，迁移成本几乎为零，建议直接试试。
