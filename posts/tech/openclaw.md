---
title: "OpenClaw：轻量级 AI Agent 工具"
date: 2026-05-24
tags:
  - AI Agent
  - OpenClaw
categories:
  - 技术学习
description: 深入介绍 OpenClaw 的核心功能、安装部署与使用体验。
---

# OpenClaw：轻量级 AI Agent 工具

> 官网：[https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

## 简介

OpenClaw 是一款轻量级 AI Agent 工具，专注于简洁的配置和快速上手。它的理念是"越简单越好"——不需要复杂的配置，几步就能开始使用。

OpenClaw 与 Hermes Agent 共享部分基础设施，但更加轻量。如果你只是想快速试试 AI Agent，不想花时间配置复杂的功能，OpenClaw 是最简单的选择。

## 安装与部署

### 系统要求

- Node.js 18+
- macOS、Linux、Windows (WSL)

### 安装

```bash
# 方式一：npm 全局安装
npm install -g openclaw

# 方式二：从 GitHub 安装最新版
git clone https://github.com/openclaw/openclaw.git
cd openclaw
npm install
npm link

# 验证安装
openclaw --version
```

### 初始化配置

OpenClaw 的配置流程非常简洁，只需要 3 步：

```bash
openclaw setup
```

交互式配置：

```text
Step 1/3: 选择 Provider
  > DeepSeek（推荐，性价比高）
    OpenRouter（聚合多个模型）
    Anthropic（Claude 系列）
    OpenAI（GPT 系列）

Step 2/3: 勾选技能
  [x] github — GitHub 操作
  [x] gh-issues — Issue 管理
  [ ] nano-pdf — PDF 编辑
  [x] xurl — X/Twitter 操作

Step 3/3: 开启 Hooks
  [x] 启用 Shell 集成
  [x] 启用 Git Hooks

配置完成！
```

### 配置 API Key

根据选择的 Provider 设置对应的 API Key：

```bash
# DeepSeek
export DEEPSEEK_API_KEY=sk-xxxxxxxxxxxx

# OpenRouter
export OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxx

# Anthropic
export ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxx

# OpenAI
export OPENAI_API_KEY=sk-xxxxxxxxxxxx
```

### 验证安装

```bash
# 测试是否正常工作
openclaw "Say hello"

# 查看配置
openclaw config list

# 查看已加载的技能
openclaw skills list
```

## 核心功能

### 极简配置

OpenClaw 的配置流程是所有 Agent 中最简单的：

- **Provider 选择**：选择一个 LLM 后端
- **技能勾选**：勾选需要的技能
- **Hooks 开关**：选择是否启用 Shell 集成
- 完成

不需要写配置文件，不需要申请多个 Token，不需要配置消息平台。

### 技能系统

OpenClaw 支持多种内置技能：

**github 技能：**
```bash
openclaw "查看这个仓库的最近 5 个 PR"
openclaw "创建一个 Issue：修复登录页面的样式问题"
openclaw "Review PR #42 的代码"
```

**gh-issues 技能：**
```bash
openclaw "列出所有 open 状态的 Issue"
openclaw "给 Issue #123 加上 bug 标签"
openclaw "关闭 Issue #456"
```

**nano-pdf 技能：**
```bash
openclaw "提取这个 PDF 的第三页内容"
openclaw "修改 PDF 中的错别字"
```

**xurl 技能：**
```bash
openclaw "发一条推文：今天学到了新的 AI 工具"
openclaw "搜索关于 AI Agent 的最新推文"
```

### Hooks 集成

OpenClaw 支持 Hooks（Shell 集成），可以在特定事件触发时自动执行操作：

```bash
# Git commit 时自动运行
openclaw hooks install

# 之后每次 git commit 会自动：
# 1. 检查代码风格
# 2. 运行测试
# 3. 生成 commit message 建议
```

### 代码编写

```bash
# 交互式
openclaw
> 给 UserController 加一个分页查询接口

# 一次性执行
openclaw "为这个函数写单元测试"
openclaw "把这段代码改成 async/await 风格"
```

### 文件操作

```bash
openclaw "分析这个 CSV 文件，生成统计报告"
openclaw "把这个 JSON 文件转换成 YAML 格式"
openclaw "找出这个目录下所有大于 10MB 的文件"
```

## 使用场景

### 快速上手

如果你只是想快速试试 AI Agent，OpenClaw 是最简单的选择：

```bash
# 3 步配置
openclaw setup

# 开始使用
openclaw "帮我写一个 Hello World 的 Python 脚本"
```

### 轻量任务

适合简单的代码编写、文件操作、Git 操作等：

```bash
openclaw "给这个函数加类型注解"
openclaw "生成一个 .gitignore 文件"
openclaw "分析这个项目的依赖树"
```

### GitHub 操作

```bash
openclaw "查看这个仓库的最近 PR"
openclaw "创建一个 Issue"
openclaw "Review PR #42"
```

### 日常脚本

```bash
openclaw "写一个脚本，每天备份数据库"
openclaw "写一个脚本，监控服务器磁盘空间"
openclaw "写一个脚本，批量重命名文件"
```

## 优势

1. **极简配置**：3 步完成配置，不需要写配置文件
2. **快速上手**：学习成本最低，5 分钟开始使用
3. **轻量级**：不依赖复杂基础设施，安装即用
4. **内置技能**：github、gh-issues、nano-pdf、xurl 等常用技能
5. **Hooks 集成**：Git Hooks 自动化
6. **与 Hermes 共享基础设施**：部分技能通用

## 定价

OpenClaw 本身免费，费用取决于你选择的 LLM Provider：

| Provider | 价格参考 |
|----------|----------|
| DeepSeek | ¥1/百万输入 tokens，¥2/百万输出 tokens |
| OpenRouter | 按模型计费，见 openrouter.ai/pricing |
| Anthropic | Sonnet: $3/M 输入，$15/M 输出 |
| OpenAI | GPT-4o: $2.5/M 输入，$10/M 输出 |

## 不足

- 功能相对简单，没有持久记忆
- 没有消息平台集成，只能在终端使用
- 没有 Cron 定时任务
- 没有 MCP 支持
- 没有浏览器能力
- 与 Hermes Agent 共用同一套凭证会冲突，不能同时运行
- 技能数量有限，扩展性不如 Hermes
- 文档较少，社区还在成长

---

> OpenClaw 适合想快速上手试试 AI Agent 的开发者。配置越简单越好，功能够用就行。如果你需要更强大的功能，可以后续迁移到 Hermes Agent。
