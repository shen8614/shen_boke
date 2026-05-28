---
title: "OpenCode：开源 Provider 无关的 Coding Agent"
date: 2026-05-24
tags:
  - AI Agent
  - OpenCode
categories:
  - 技术学习
description: 深入介绍 OpenCode 的核心功能、安装部署与使用体验。
---

# OpenCode：开源 Provider 无关的 Coding Agent

## 简介

OpenCode 是一款开源、Provider 无关的 Coding Agent，支持任意 LLM 后端。它的理念是"不绑定某个模型，让你自由选择"。类似 Claude Code 的交互方式，但不依赖 Anthropic 的服务。

对于不想被锁定在某个 AI 厂商生态的开发者来说，OpenCode 是最灵活的选择。

## 安装与部署

### 安装

```bash
# npm 安装
npm i -g opencode-ai@latest

# macOS (Homebrew)
brew install anomalyco/tap/opencode
```

### 配置 Provider

OpenCode 支持多个 Provider：

```bash
# 使用 OpenRouter
export OPENROUTER_API_KEY=sk-or-xxx

# 使用 Anthropic
export ANTHROPIC_API_KEY=sk-ant-xxx

# 使用 OpenAI
export OPENAI_API_KEY=sk-xxx
```

### 验证安装

```bash
opencode --version
```

## 核心功能

### 多 Provider 支持

OpenCode 支持多种 LLM 后端：

- OpenRouter（聚合多个模型）
- Anthropic（Claude 系列）
- OpenAI（GPT 系列）
- 本地模型（Ollama 等）

### TUI 交互

```bash
opencode
> 帮我分析这个项目的架构
```

### 一次性执行

```bash
opencode run "给 UserController 加一个分页查询接口"
```

### PR Review

```bash
opencode pr 42
```

OpenCode 内置 PR Review 能力，可以直接分析 PR 的代码质量。

### Session 管理

OpenCode 支持 Session 管理，可以保存和恢复对话上下文。

### 思考过程可见

OpenCode 会展示 AI 的思考过程，让你了解它是如何分析和解决问题的。

## 使用场景

### 灵活选模型

不同任务用不同模型：

```bash
# 写前端用 Claude
OPENROUTER_API_KEY=xxx opencode run "写一个 React 组件"

# 算法题用 GPT-4o
OPENAI_API_KEY=xxx opencode run "实现一个红黑树"
```

### PR Review

```bash
opencode pr 42
# 自动分析 PR 的代码质量、安全性、性能问题
```

### 不绑定厂商

如果你不想被锁定在某个 AI 厂商生态，OpenCode 是最佳选择。

## 优势

1. **Provider 无关**：不绑定任何 AI 厂商
2. **开源免费**：Agent 本身免费，费用取决于 Provider
3. **PR Review**：内置代码审查能力
4. **思考过程可见**：了解 AI 的分析过程
5. **灵活切换**：根据任务类型切换最优模型

## 定价

OpenCode 本身免费开源，费用取决于你选择的 LLM Provider。

## 不足

- 没有浏览器能力
- 没有 MCP 支持
- 多 Agent 协作能力较弱
- 跨会话记忆较弱

---

> OpenCode 适合不想绑定某个 Provider、想用任意模型的开发者。它是 Claude Code 的开源替代品。
