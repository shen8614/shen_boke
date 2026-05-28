---
title: "Hermes Agent：全功能自治代理框架"
date: 2026-05-24
tags:
  - AI Agent
  - Hermes
  - 自动化
categories:
  - 技术学习
description: 深入介绍 Hermes Agent 的核心功能、安装部署与使用体验。
---

# Hermes Agent：全功能自治代理框架

## 简介

Hermes Agent 是 Nous Research 开发的开源 AI Agent 框架，不只是 Coding Agent——它是一个全功能的自治代理，支持终端、消息平台、定时任务等。它的目标是"让 AI 成为你的数字分身"。

与其他 Coding Agent 不同，Hermes Agent 的能力远超代码编写。它能跑在 Telegram、Discord、Slack、QQ、微信等 10 多个消息平台上，内置 Cron 定时任务调度，有完整的持久记忆系统和技能库。

## 安装与部署

### 安装

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

### 配置 Provider

Hermes Agent 支持 20+ Provider：

```bash
# 配置 DeepSeek
hermes config set provider deepseek
hermes config set deepseek.api_key sk-xxx

# 配置 OpenRouter
hermes config set provider openrouter
hermes config set openrouter.api_key sk-or-xxx

# 配置本地模型
hermes config set provider ollama
hermes config set ollama.model llama3
```

### 消息平台配置

```bash
# Telegram
hermes config set telegram.token BOT_TOKEN

# Discord
hermes config set discord.token BOT_TOKEN

# QQ
hermes config set qq.token BOT_TOKEN
```

## 核心功能

### 终端交互

```bash
hermes
> 帮我分析这个项目的架构
```

### 消息平台网关

同一个 Agent 能跑在多个消息平台上：

- Telegram
- Discord
- Slack
- QQ
- 微信
- Signal
- Matrix
- 等 10+ 平台

### 持久记忆

Hermes Agent 有完整的持久记忆系统：

- **用户偏好**：记住你的习惯和喜好
- **环境信息**：记住你的系统配置
- **操作经验**：记住解决问题的方法

### 技能系统

技能是 Hermes Agent 的"程序性记忆"：

```bash
# 查看可用技能
hermes skills list

# 加载技能
hermes skills load github-pr-workflow
```

### Cron 定时任务

```bash
# 每天早上 9 点推送 GitHub Issues 摘要
hermes cron create "0 9 * * 1-5" --prompt "查看 GitHub Issues 并在 Telegram 推送摘要"

# 每周日跑测试
hermes cron create "0 10 * * 0" --prompt "运行项目测试并报告结果"
```

### 子 Agent 编排

```bash
hermes delegate "分析项目架构并生成文档"
# 自动拆分为多个子任务并行执行
```

### MCP 原生支持

Hermes Agent 原生支持 MCP 协议，可以接入 GitHub、数据库、浏览器等外部工具。

### 浏览器能力

通过 CDP 协议控制浏览器：

```bash
hermes browser open "https://github.com"
hermes browser screenshot
```

## 使用场景

### 跨平台自动化

```bash
# 每天早上在 Telegram 推送 GitHub Issues 摘要
hermes cron create "0 9 * * 1-5" --prompt "查看 GitHub Issues 并在 Telegram 推送摘要"
```

### 消息平台 Bot

同一个 Agent 可以同时作为 Telegram Bot、Discord Bot、QQ Bot 运行。

### 代码编写

```bash
hermes
> 给 UserController 加一个分页查询接口
```

### 系统管理

```bash
hermes
> 检查服务器磁盘空间，如果低于 20% 就告警
```

## 优势

1. **平台覆盖最广**：10+ 消息平台，终端，定时任务
2. **持久记忆**：跨会话保留用户偏好和操作经验
3. **技能系统**：可复用的程序性记忆
4. **Cron 调度**：内置定时任务
5. **MCP 原生支持**：可接入外部工具
6. **20+ Provider**：不绑定任何 AI 厂商
7. **开源免费**：Agent 本身免费

## 定价

Hermes Agent 本身免费开源，费用取决于你选择的 LLM Provider。

## 不足

- 配置相对复杂
- 学习曲线较陡
- 消息平台配置需要各自申请 Bot Token

---

> Hermes Agent 适合需要全功能自治代理——跨平台、持久记忆、定时任务、消息集成的开发者。
