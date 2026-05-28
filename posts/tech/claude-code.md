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

> 官网：[https://docs.anthropic.com/claude-code](https://docs.anthropic.com/claude-code)

## 简介

Claude Code 是 Anthropic 出品的终端 Coding Agent，基于 Claude 模型。核心理念是"一个能在终端里做任何事的 AI"。它不只是代码补全工具，而是一个能自主读写文件、执行命令、管理 Git 工作流的完整 Agent。

Claude Code 在代码理解方面是目前最强的。它的 `/compact` 命令能在上下文快满时智能压缩，保持长时间对话的质量。CLAUDE.md 项目记忆机制让 AI 能快速学习项目规范。子 Agent 编排支持自定义 Agent 协作，MCP 协议可接入外部工具。

## 安装与部署

### 系统要求

- Node.js 18+ （推荐 20 LTS）
- npm 或 yarn
- macOS、Windows (WSL)、Linux

### 安装

```bash
# 全局安装
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
```

### 认证方式一：OAuth 登录（推荐）

适用于 Pro/Max 订阅用户：

```bash
# 交互式登录，会打开浏览器
claude login

# 按提示完成 OAuth 授权
# 登录后凭证自动保存
```

### 认证方式二：API Key

适用于 API 用户：

```bash
# 设置环境变量
export ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxx

# 或写入 shell 配置文件
echo 'export ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxx' >> ~/.bashrc
source ~/.bashrc
```

API Key 获取方式：访问 https://console.anthropic.com → API Keys → Create Key

### 验证认证

```bash
# 测试是否正常工作
claude -p "Say hello" --max-turns 1

# 应该返回 Claude 的回复
```

### VS Code 集成

Claude Code 可以作为 VS Code 的终端使用：

1. 在 VS Code 中打开终端
2. 运行 `claude` 进入交互模式
3. 代码修改会自动反映在编辑器中

## 核心功能

### 交互式 TUI

直接运行 `claude` 进入交互式终端界面：

```bash
$ claude
╭─────────────────────────────────────╮
│ Claude Code v1.0                    │
│ Type /help for commands             │
╰─────────────────────────────────────╯

> 给 UserController 加一个分页查询接口

# Claude 会：
# 1. 分析项目结构
# 2. 找到 UserController.java
# 3. 生成分页查询代码
# 4. 运行测试验证
# 5. 询问是否提交
```

### 非交互模式

`-p` 参数支持非交互式执行，适合脚本和 CI/CD：

```bash
# 单次执行
claude -p "给 UserController 加一个分页查询接口" --max-turns 10

# 管道输入
git diff | claude -p "Review this diff for bugs"

# 从文件读取
claude -p "解释这段代码" < src/utils/helper.py
```

### CLAUDE.md 项目记忆

在项目根目录创建 `CLAUDE.md` 文件，写入项目规范：

```markdown
# 项目规范

## 技术栈
- 后端：Spring Boot 3.x + Java 17
- 前端：Vue 3 + TypeScript
- 数据库：MySQL 8.0

## 代码风格
- 后端遵循 Google Java Style Guide
- 前端使用 ESLint + Prettier
- 禁止使用 Lombok

## 测试要求
- 所有 API 必须有单元测试
- 测试覆盖率不低于 70%
- 使用 JUnit 5 + Mockito

## Git 规范
- 提交信息格式：type(scope): description
- type: feat/fix/docs/style/refactor/test/chore
```

Claude Code 会自动读取这个文件，将规范注入到每次对话中。

### 子 Agent 编排

支持 `@agent` 语法调用自定义子 Agent：

```bash
# 创建自定义 Agent
claude agent create reviewer --prompt "Review code for security issues"
claude agent create tester --prompt "Write comprehensive unit tests"

# 使用子 Agent
> @reviewer 检查 UserController 的安全性
> @tester 为 OrderService 写测试
```

子 Agent 有独立的上下文，不会污染主对话。

### Hooks 自动化

Hooks 可以在特定事件触发时自动执行操作：

```json
{
  "hooks": {
    "onCommit": "npm test && npm run lint",
    "onFileChange": "npm run type-check",
    "onCreate": "npm run format"
  }
}
```

### MCP 集成

Claude Code 原生支持 MCP 协议，可以接入外部工具：

```bash
# 在 ~/.claude/settings.json 中配置 MCP servers
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"]
    },
    "postgres": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"]
    }
  }
}
```

配置后 Claude Code 可以直接操作 GitHub、数据库等。

### /compact 智能压缩

当对话上下文快满时，`/compact` 命令能智能压缩历史：

```bash
> /compact

# Claude Code 会：
# 1. 总结之前的对话
# 2. 保留关键上下文
# 3. 丢弃冗余信息
# 4. 压缩后继续对话
```

这保证了长时间对话的质量不会下降。

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
# 从 PR 恢复上下文
claude --from-pr 123 -p "根据 review 意见修复所有问题"

# 学习项目规范
claude -p "分析这个项目的代码规范，生成 CLAUDE.md"
```

### 大规模重构

```bash
claude -p "把所有 class 组件改成 hooks，逐个文件修改并测试"
```

### CI/CD 集成

```yaml
# GitHub Actions
- name: Code Review
  run: |
    git diff origin/main | claude -p "Review for security issues" --output json
```

## 优势

1. **代码理解最强**：对整个代码库的理解深度无人能及
2. **CLAUDE.md 记忆**：项目规范自动注入，不需要每次提醒
3. **子 Agent 编排**：支持自定义 Agent 协作，独立上下文
4. **MCP 原生支持**：可接入 GitHub、数据库、浏览器等外部工具
5. **Hooks 自动化**：事件驱动的自动化流程
6. **/compact 压缩**：智能压缩保持长对话质量
7. **管道支持**：可以与其他 CLI 工具组合使用

## 定价

| 方案 | 价格 | 内容 |
|------|------|------|
| Free | 有限免费 | 基础功能，有限请求 |
| Pro | $20/月 | 更多 fast requests |
| Max | $100/月 | 最多 fast requests，优先队列 |
| API | 按 token 计费 | 输入 $3/M，输出 $15/M (Sonnet) |

API Key 获取：https://console.anthropic.com

## 不足

- Pro 订阅的 fast requests 重度使用时不够用，会降速
- 价格相对较高，纯 API 使用费用不低
- 偶尔会出现过度自信的情况，改了不该改的文件
- 没有 GUI 界面，纯终端操作对新手不太友好
- 对 Windows 原生支持不够好，推荐 WSL

---

> Claude Code 适合追求极致代码理解能力的开发者。如果你是 Claude 深度用户，这是最佳选择。
