---
title: "OpenCode：开源 Provider 无关的 Coding Agent"
date: 2026-07-17
tags:
  - AI Agent
  - OpenCode
categories:
  - 技术学习
description: 深入介绍 OpenCode 的核心功能、安装部署、订阅制对比，以及与 DeepSeek、Mimo 等国内服务的性价比分析。
---

# OpenCode：开源 Provider 无关的 Coding Agent

> 官网：[https://opencode.ai](https://opencode.ai) / [GitHub](https://github.com/opencode-ai/opencode)

## 简介

OpenCode 是一款开源、Provider 无关的 Coding Agent，支持任意 LLM 后端。它的理念是"不绑定某个模型，让你自由选择"。类似 Claude Code 的交互方式，但不依赖 Anthropic 的服务。

对于不想被锁定在某个 AI 厂商生态的开发者来说，OpenCode 是最灵活的选择。它支持 OpenRouter、Anthropic、OpenAI、本地模型等多种后端，可以根据任务类型随时切换。

## 安装与部署

### 系统要求

- Node.js 18+ 或 Go 1.21+
- macOS、Linux、Windows (WSL)

### 安装方式一：npm

```bash
# 全局安装
npm i -g opencode-ai@latest

# 验证安装
opencode --version
```

### 安装方式二：Homebrew (macOS)

```bash
brew install anomalyco/tap/opencode

# 验证安装
opencode --version
```

### 安装方式三：Go

```bash
go install github.com/opencode-ai/opencode@latest
```

### 配置 Provider

OpenCode 支持多个 Provider，选择一个即可：

**使用 OpenRouter（推荐，聚合多个模型）：**

```bash
# 获取 API Key：https://openrouter.ai/keys
export OPENROUTER_API_KEY=sk-or-...xxxx
```

**使用 Anthropic：**

```bash
# 获取 API Key：https://console.anthropic.com
export ANTHROPIC_API_KEY=sk-ant...xxxx
```

**使用 OpenAI：**

```bash
# 获取 API Key：https://platform.openai.com/api-keys
export OPENAI_API_KEY=***
```

**使用本地模型（Ollama）：**

```bash
# 先安装 Ollama：https://ollama.ai
ollama pull llama3
export OLLAMA_HOST=http://localhost:11434
```

### 配置文件

可以在项目根目录创建 `.opencode.json` 配置文件：

```json
{
  "provider": "openrouter",
  "model": "anthropic/claude-3.5-sonnet",
  "temperature": 0.7
}
```

### 验证安装

```bash
# 测试是否正常工作
opencode run "Say hello"
```

## 核心功能

### 多 Provider 支持

OpenCode 支持多种 LLM 后端，这是它最大的特色：

- **OpenRouter**：聚合多个模型，一个 API Key 用所有模型
- **Anthropic**：Claude 系列，代码理解最强
- **OpenAI**：GPT 系列，推理能力突出
- **本地模型**：Ollama、LM Studio 等，免费无限制

不同任务用不同模型：

```bash
# 写前端用 Claude
OPENROUTER_API_KEY=xxx opencode run "写一个 React 组件"

# 算法题用 GPT-4o
OPENAI_API_KEY=xxx opencode run "实现一个红黑树"

# 本地模型免费跑
OLLAMA_HOST=http://localhost:11434 opencode run "解释这段代码"
```

### TUI 交互

```bash
$ opencode
╭─────────────────────────────────────╮
│ OpenCode                            │
│ Provider: openrouter                │
│ Model: anthropic/claude-3.5-sonnet  │
╰─────────────────────────────────────╯

> 帮我分析这个项目的架构

# OpenCode 会：
# 1. 扫描项目结构
# 2. 分析依赖关系
# 3. 生成架构图
# 4. 给出优化建议
```

### 一次性执行

```bash
opencode run "给 UserController 加一个分页查询接口"
opencode run "为这个函数写单元测试"
opencode run "把这段代码改成 async/await 风格"
```

### PR Review

OpenCode 内置 PR Review 能力：

```bash
# Review 指定 PR
opencode pr 42

# Review 当前分支的 diff
git diff main | opencode run "Review this diff"
```

### Session 管理

OpenCode 支持 Session 管理，可以保存和恢复对话上下文：

```bash
# 列出所有 Session
opencode sessions list

# 恢复某个 Session
opencode sessions resume <session-id>

# 删除 Session
opencode sessions delete <session-id>
```

### 思考过程可见

OpenCode 会展示 AI 的思考过程，让你了解它是如何分析和解决问题的：

```text
> 实现一个 LRU Cache

[思考] LRU Cache 需要 O(1) 的 get 和 put 操作...
[思考] 使用 HashMap + 双向链表实现...
[分析] HashMap 存储 key -> node 映射...
[分析] 双向链表维护访问顺序...

[代码] class LRUCache { ... }
```

## 使用场景

### 灵活选模型

不同任务用不同模型，这是 OpenCode 的核心优势：

```bash
# 前端开发用 Claude（代码理解强）
OPENROUTER_API_KEY=xxx opencode run "写一个 Vue 3 表单组件"

# 算法题用 GPT-4o（推理能力强）
OPENAI_API_KEY=xxx opencode run "实现一个 B+ 树"

# 日常任务用本地模型（免费）
OLLAMA_HOST=http://localhost:11434 opencode run "写一个 Shell 脚本"
```

### PR Review

```bash
opencode pr 42
# 自动分析 PR 的代码质量、安全性、性能问题
```

### 不绑定厂商

如果你不想被锁定在某个 AI 厂商生态，OpenCode 是最佳选择。随时可以切换 Provider，不需要改工作流。

### 本地模型开发

```bash
# 用 Ollama 本地模型，完全免费
ollama pull codellama:34b
OLLAMA_HOST=http://localhost:11434 opencode run "重构这个模块"
```

## 优势

1. **Provider 无关**：不绑定任何 AI 厂商，自由切换
2. **开源免费**：Agent 本身免费，费用取决于 Provider
3. **PR Review**：内置代码审查能力
4. **思考过程可见**：了解 AI 的分析过程
5. **灵活切换**：根据任务类型切换最优模型
6. **本地模型支持**：可用 Ollama 完全免费使用
7. **Session 管理**：保存和恢复对话上下文

## 定价

OpenCode 本身免费开源，费用取决于你选择的 LLM Provider：

| Provider | 价格参考 |
|----------|----------|
| OpenRouter | 按模型计费，见 openrouter.ai/pricing |
| Anthropic | Sonnet: $3/M 输入，$15/M 输出 |
| OpenAI | GPT-4o: $2.5/M 输入，$10/M 输出 |
| Ollama | 完全免费 |

## OpenCode Go：订阅制 vs 国内直连

OpenCode 除了开源自部署版本外，还推出了 **OpenCode Go**——一个 Go 语言重写的订阅版 CLI。它走的是 Provider 聚合路线，通过 OpenRouter 等中间层接入模型，按美元订阅计费。

与此同时，国内用户也可以选择直接使用 **DeepSeek** 或 **Mimo（稀宇）** 等国产 AI 服务。下面是两者的详细对比。

### 费用模式对比

| 维度 | OpenCode Go 订阅 | DeepSeek 直连 | Mimo 直连 |
|------|-----------------|--------------|-----------|
| 计费方式 | 月订阅（约 $20） | 按量计费（Token） | 按量/包月 |
| 支付货币 | 美元 | 人民币 | 人民币 |
| 模型选择 | 10+ 模型可选 | DeepSeek V3/R1 | Mimo 自研模型 |
| 延迟 | 经 OpenRouter 中转（略高） | 国内直连（低） | 国内直连（低） |
| 内容限制 | 宽松（OpenRouter 政策） | 国内审核 | 国内审核 |
| 网络 | 需海外网络 | 国内直接可连 | 国内直接可连 |

### 性价比分析

**OpenCode Go $20/月 订阅制：**

- 月费固定，不限 Token 使用量
- 可切换不同模型（Claude Sonnet、GPT-4o、DeepSeek 等）
- 适合高频使用者：日均 500+ 次对话的用户，$20 远低于按量付费
- 一个订阅覆盖多种模型，不需要分别充值

**DeepSeek 直接使用：**

- DeepSeek V3 价格约 ¥1-2/百万 Token，R1 约 ¥4/百万 Token
- 轻度使用（日均 100 次对话）月消费约 ¥30-60
- 重度使用（日均 500+ 次对话）月消费可达 ¥200+
- 优势：国内直接访问，延迟低，无网络问题

**Mimo 直接使用：**

- 价位与 DeepSeek 相当
- 优势：国内生态兼容好，微信/支付宝支付方便
- 不足：模型选择相对有限

### OpenCode Go 的核心优势

1. **汇率优势**：$20/月 ≈ ¥145（按当前汇率），对于重度使用来说，比 DeepSeek 按量付费更划算。DeepSeek 重度使用一个月可能 ¥200+，反而更贵。

2. **模型多样性**：一个订阅 = 同时拥有 Claude、GPT、DeepSeek、Gemini 等多个顶级模型。DeepSeek 直连只能用 DeepSeek 系模型，Mimo 只能用 Mimo 的模型。

3. **不受国内审核限制**：OpenRouter 路由遵守的是海外服务条款，对于某些需要突破内容边界的开发场景，OpenCode Go 没有国内 AI 模型的审核限制。

4. **统一工作流**：无论用什么模型，操作界面、命令行参数、配置文件完全一致。DeepSeek 和 Mimo 各有各的 API、SDK、调用方式，切换成本高。

5. **免运维**：OpenCode Go 是 SaaS 服务，不需要自己配置 API Key、不需要管理多个 Provider 的余额。开箱即用。

### 什么情况选哪个？

| 使用场景 | 推荐方案 |
|---------|---------|
| 轻度使用（日均 <50 次） | DeepSeek 直连，按量最省 |
| 重度使用（日均 >300 次） | OpenCode Go 订阅更划算 |
| 需要多种模型切换 | OpenCode Go，一个订阅全搞定 |
| 有严格的国内网络限制 | DeepSeek/Mimo 直连，延迟最低 |
| 需要不受审核的内容生成 | OpenCode Go + OpenRouter 路由 |
| 偶尔用用，不想花钱 | 本地 Ollama 免费跑 |

### 小结

从纯性价比角度看：

- **轻度用户**（< ¥50/月）：DeepSeek 直连胜出，按量付费，国内直连延迟低
- **中度用户**（¥50-100/月）：两者打平，看是否需要多模型
- **重度用户**（> ¥100/月）：**OpenCode Go 订阅反超**，$20 不限量 + 多模型切换，性价比完胜

本质上这不是简单的"哪个便宜"的问题，而是 **¥付费 vs $付费的计量单位博弈** + **单一模型 vs 多模型聚合的灵活性博弈**。如果你本身就需要频繁切换不同模型做开发，OpenCode Go 一个订阅解决所有问题；如果你只认准某一个国产模型，直连最省心。

## 不足

- 没有浏览器能力，无法操作 Web 页面
- 没有 MCP 支持，无法接入外部工具
- 多 Agent 协作能力较弱，没有子 Agent 编排
- 跨会话记忆较弱，没有持久记忆机制
- 对超大型项目的支持还有提升空间
- 文档相对较少，社区还在成长

---

> OpenCode 适合不想绑定某个 Provider、想用任意模型的开发者。它是 Claude Code 的开源替代品，也是本地模型开发的最佳选择。

---

> **免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。价格数据基于 2026 年 7 月市场情况，实际价格以各服务商最新报价为准。
