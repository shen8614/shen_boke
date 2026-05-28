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

> 官网：[https://github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) / [文档](https://hermes-agent.nousresearch.com/docs)

## 简介

Hermes Agent 是 Nous Research 开发的开源 AI Agent 框架，不只是 Coding Agent——它是一个全功能的自治代理，支持终端、消息平台、定时任务等。它的目标是"让 AI 成为你的数字分身"。

与其他 Coding Agent 不同，Hermes Agent 的能力远超代码编写。它能跑在 Telegram、Discord、Slack、QQ、微信等 10 多个消息平台上，内置 Cron 定时任务调度，有完整的持久记忆系统和技能库。支持 20+ LLM Provider，不绑定任何 AI 厂商。

## 安装与部署

### 系统要求

- Python 3.10+
- macOS、Linux、Windows (WSL)
- Git

### 一键安装

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装脚本会自动：
1. 检查系统依赖
2. 下载 Hermes Agent
3. 创建虚拟环境
4. 安装依赖
5. 配置 PATH

### 手动安装

```bash
# 克隆仓库
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent

# 创建虚拟环境
python3 -m venv .venv
source .venv/bin/activate

# 安装依赖
pip install -e .

# 验证安装
hermes --version
```

### 配置 Provider

Hermes Agent 支持 20+ Provider，选择一个即可：

**使用 DeepSeek（推荐，性价比高）：**

```bash
hermes config set provider deepseek
hermes config set deepseek.api_key ***
```

**使用 OpenRouter（聚合多个模型）：**

```bash
hermes config set provider openrouter
hermes config set openrouter.api_key sk-or-...xxxx
```

**使用 Anthropic：**

```bash
hermes config set provider anthropic
hermes config set anthropic.api_key sk-ant...xxxx
```

**使用本地模型（Ollama）：**

```bash
# 先安装 Ollama
ollama pull llama3

hermes config set provider ollama
hermes config set ollama.model llama3
hermes config set ollama.host http://localhost:11434
```

### 配置消息平台

**Telegram Bot：**

```bash
# 1. 在 Telegram 中找 @BotFather
# 2. 发送 /newbot 创建 Bot
# 3. 获取 Bot Token

hermes config set telegram.token BOT_TOKEN
hermes config set telegram.allowed_users YOUR_USER_ID
```

**Discord Bot：**

```bash
# 1. 访问 https://discord.com/developers/applications
# 2. 创建 Application → Bot → 获取 Token

hermes config set discord.token BOT_TOKEN
```

**QQ Bot：**

```bash
# 需要 QQ 开放平台的 Bot 凭证
hermes config set qq.token BOT_TOKEN
hermes config set qq.secret BOT_SECRET
```

### 验证安装

```bash
# 检查配置
hermes config list

# 测试对话
hermes "Say hello"

# 查看已安装的技能
hermes skills list
```

## 核心功能

### 终端交互

```bash
$ hermes
╭─────────────────────────────────────╮
│ Hermes Agent                        │
│ Provider: deepseek                  │
│ Model: deepseek-chat                │
│ Memory: 47 entries                  │
│ Skills: 12 loaded                   │
╰─────────────────────────────────────╯

> 帮我分析这个项目的架构

# Hermes 会：
# 1. 扫描项目结构
# 2. 分析依赖关系
# 3. 生成架构图
# 4. 保存到记忆中
```

### 消息平台网关

同一个 Agent 能跑在多个消息平台上，这是 Hermes 最独特的功能：

```bash
# 启动 Telegram 网关
hermes gateway start telegram

# 启动 Discord 网关
hermes gateway start discord

# 同时启动多个
hermes gateway start telegram,discord,qq
```

在 Telegram 中直接和 AI 对话，它会记住你的偏好，下次在 Discord 中继续对话时还记得。

### 持久记忆

Hermes Agent 有完整的持久记忆系统，跨会话保留信息：

```bash
# 查看记忆
hermes memory list

# 手动添加记忆
hermes memory add "用户偏好：简洁风格，不要啰嗦"

# 记忆自动保存的内容：
# - 用户偏好（语言、风格、习惯）
# - 环境信息（OS、路径、工具）
# - 操作经验（解决问题的方法）
```

### 技能系统

技能是 Hermes Agent 的"程序性记忆"，可复用的工作流：

```bash
# 查看可用技能
hermes skills list

# 加载技能
hermes skills load github-pr-workflow

# 技能包含：
# - 触发条件
# - 执行步骤
# - 精确命令
# - 踩坑经验
```

### Cron 定时任务

内置定时任务调度：

```bash
# 每天早上 9 点推送 GitHub Issues 摘要
hermes cron create "0 9 * * 1-5" --prompt "查看 GitHub Issues 并在 Telegram 推送摘要"

# 每周日跑测试
hermes cron create "0 10 * * 0" --prompt "运行项目测试并报告结果"

# 每小时检查服务器状态
hermes cron create "0 * * * *" --prompt "检查服务器磁盘和内存使用情况"

# 管理定时任务
hermes cron list
hermes cron pause <job-id>
hermes cron remove <job-id>
```

### 子 Agent 编排

```bash
# 委托任务给子 Agent
hermes delegate "分析项目架构并生成文档"

# Hermes 会自动拆分为多个子任务：
# 1. 扫描项目结构
# 2. 分析依赖关系
# 3. 生成架构文档
# 4. 整合结果
```

### MCP 原生支持

```bash
# 在配置中添加 MCP servers
hermes config set mcp.servers.github.command npx
hermes config set mcp.servers.github.args "@modelcontextprotocol/server-github"

hermes config set mcp.servers.postgres.command npx
hermes config set mcp.servers.postgres.args "@modelcontextprotocol/server-postgres"
```

### 浏览器能力

通过 CDP 协议控制浏览器：

```bash
hermes browser open "https://github.com"
hermes browser screenshot
hermes browser click "button.submit"
hermes browser fill "input[name=email]" "test@example.com"
```

## 使用场景

### 跨平台自动化

```bash
# 每天早上在 Telegram 推送 GitHub Issues 摘要
hermes cron create "0 9 * * 1-5" --prompt "查看 GitHub Issues 并在 Telegram 推送摘要"

# 周末自动跑测试
hermes cron create "0 10 * * 0" --prompt "运行项目测试，失败就告警"
```

### 消息平台 Bot

同一个 Agent 可以同时作为 Telegram Bot、Discord Bot、QQ Bot 运行。用户在任何平台问问题，AI 都能回答，而且共享记忆。

### 代码编写

```bash
hermes
> 给 UserController 加一个分页查询接口
> 为这个接口写单元测试
> 生成 API 文档
```

### 系统管理

```bash
hermes
> 检查服务器磁盘空间，如果低于 20% 就告警
> 分析 Nginx 日志，找出访问量最大的 URL
> 监控 Docker 容器状态
```

### 研究助手

```bash
hermes
> 搜索 arXiv 上关于 Transformer 的最新论文
> 总结这篇论文的核心贡献
> 生成文献综述
```

## 优势

1. **平台覆盖最广**：10+ 消息平台，终端，定时任务
2. **持久记忆**：跨会话保留用户偏好和操作经验
3. **技能系统**：可复用的程序性记忆
4. **Cron 调度**：内置定时任务，无需额外工具
5. **MCP 原生支持**：可接入 GitHub、数据库、浏览器等外部工具
6. **20+ Provider**：不绑定任何 AI 厂商
7. **开源免费**：Agent 本身免费开源
8. **浏览器能力**：CDP 协议控制浏览器
9. **子 Agent 编排**：自动拆分复杂任务

## 定价

Hermes Agent 本身免费开源，费用取决于你选择的 LLM Provider：

| Provider | 价格参考 |
|----------|----------|
| DeepSeek | ¥1/百万输入 tokens，¥2/百万输出 tokens |
| OpenRouter | 按模型计费，见 openrouter.ai/pricing |
| Anthropic | Sonnet: $3/M 输入，$15/M 输出 |
| Ollama | 完全免费 |

## 不足

- 配置相对复杂，需要配置 Provider、消息平台、技能等
- 学习曲线较陡，功能太多需要时间熟悉
- 消息平台配置需要各自申请 Bot Token
- 文档还在完善中
- 某些高级功能需要一定的技术背景

---

> Hermes Agent 适合需要全功能自治代理的开发者。如果你需要跨平台、持久记忆、定时任务、消息集成，这是唯一的选择。

---

> **免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。
