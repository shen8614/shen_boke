---
title: "Claude Code：Anthropic 的终端 Coding Agent"
date: 2026-05-24
tags:
  - AI Agent
  - Claude Code
  - Anthropic
categories:
  - 技术学习
description: 深入介绍 Claude Code 的核心功能、安装部署与使用体验。
---

# Claude Code：Anthropic 的终端 Coding Agent

## 简介

Claude Code 是 Anthropic 出品的终端 Coding Agent，基于 Claude 模型。核心理念是"一个能在终端里做任何事的 AI"。它不只是代码补全工具，而是一个能自主读写文件、执行命令、管理 Git 工作流的完整 Agent。

Claude Code 在代码理解方面是目前最强的。它的 `/compact` 命令能在上下文快满时智能压缩，保持长时间对话的质量。CLAUDE.md 项目记忆机制让 AI 能快速学习项目规范。

## 安装与部署

### 安装

```bash
npm install -g @anthropic-ai/claude-code
```

### 认证

支持两种认证方式：

1. **OAuth 登录**（推荐）：Pro/Max 订阅用户
2. **API Key**：直接使用 Anthropic API Key

```bash
# OAuth 登录
claude login

# 或者设置 API Key
export ANTHROPIC_API_KEY=sk-ant-xxx
```

### 验证安装

```bash
claude --version
claude -p "Hello" --max-turns 1
```

## 核心功能

### 交互式 TUI

直接运行 `claude` 进入交互式终端界面：

```bash
claude
> 给 UserController 加一个分页查询接口
```

Claude Code 会自动分析项目结构，找到相关文件，生成代码，运行测试。

### 非交互模式

`-p` 参数支持非交互式执行，适合脚本和 CI/CD：

```bash
claude -p "给 UserController 加一个分页查询接口" --max-turns 10
```

### CLAUDE.md 项目记忆

在项目根目录创建 `CLAUDE.md` 文件，写入项目规范：

```markdown
# 项目规范
- 使用 Spring Boot 3.x + Java 17
- 代码风格遵循 Google Java Style Guide
- 所有 API 必须有单元测试
- 禁止使用 Lombok
```

Claude Code 会自动读取这个文件，将规范注入到每次对话中。

### 子 Agent 编排

支持 `@agent` 语法调用自定义子 Agent：

```bash
# 定义子 Agent
claude agent create reviewer --prompt "Review code for security issues"

# 使用子 Agent
> @reviewer 检查 UserController 的安全性
```

### Hooks 自动化

Hooks 可以在特定事件触发时自动执行操作：

```json
{
  "hooks": {
    "onCommit": "npm test && npm run lint",
    "onFileChange": "npm run type-check"
  }
}
```

### MCP 集成

Claude Code 原生支持 MCP 协议，可以接入 GitHub、数据库、浏览器等外部工具。

## 使用场景

### 日常写代码

```bash
claude -p "给 UserController 加一个分页查询接口，支持按姓名模糊搜索" --max-turns 10
```

### 代码审查

```bash
git diff main...feature | claude -p "Review this diff for bugs and security issues"
```

### 开源项目贡献

```bash
claude --from-pr 123 -p "根据 review 意见修复所有问题"
```

### 大规模重构

```bash
claude -p "把所有 class 组件改成 hooks，逐个文件修改并测试"
```

## 优势

1. **代码理解最强**：对整个代码库的理解深度无人能及
2. **CLAUDE.md 记忆**：项目规范自动注入，不需要每次提醒
3. **子 Agent 编排**：支持自定义 Agent 协作
4. **MCP 原生支持**：可接入外部工具和数据源
5. **Hooks 自动化**：事件驱动的自动化流程

## 定价

| 方案 | 价格 | 内容 |
|------|------|------|
| Free | 有限免费 | 基础功能 |
| Pro | $20/月 | 更多 fast requests |
| Max | $100/月 | 最多 fast requests |
| API | 按 token 计费 | 直接使用 API |

## 不足

- Pro 订阅的 fast requests 重度使用时不够用
- 价格相对较高
- 偶尔会出现过度自信的情况

---

> Claude Code 适合追求极致代码理解能力的开发者。如果你是 Claude 深度用户，这是最佳选择。
