---
title: Hermes Agent 深度体验：不只是 Coding Agent
date: 2026-05-25
tags:
  - AI Agent
  - Hermes Agent
  - 自动化
  - 效率工具
categories:
  - 技术学习
description: 使用 Hermes Agent 三个月的真实体验，从终端编程到消息平台自动化，它如何改变我的工作方式。
---

# Hermes Agent 深度体验：不只是 Coding Agent

## 为什么选 Hermes

市面上的 AI Coding Agent 大多只做一件事——在终端里帮你写代码。Claude Code 写代码很强，Codex 沙箱执行很安全，OpenCode 模型选择很灵活。但我的需求不只是写代码：我希望 AI 能帮我管理定时任务、在 QQ 上回答问题、自动监控 GitHub 仓库、甚至控制智能家居。

Hermes Agent 是我找到的唯一一个能满足这些需求的工具。它不是一个 Coding Agent，而是一个通用的 AI 自治代理框架——Coding 只是它的能力之一。

## 安装与配置

```bash
# 一键安装
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 交互式配置向导
hermes setup

# 选择模型和 Provider
hermes model

# 检查环境
hermes doctor
```

Hermes 支持 20+ 个 LLM Provider，我用的是 DeepSeek（性价比高）。配置文件在 `~/.hermes/config.yaml`，API Key 在 `~/.hermes/.env`。

## 核心体验

### 1. 技能系统：AI 会"学习"

这是 Hermes 最独特的能力。当它解决了一个复杂问题、发现了一个工作流、或者被你纠正了做法，可以把经验保存为"技能"（Skill）。技能是一份 Markdown 文档，包含操作步骤、注意事项、验证方法。下次遇到类似任务时，Hermes 会自动加载相关技能。

举个例子：我第一次让 Hermes 帮我用 draw.io 画 ER 图时，它踩了不少坑（ID 重复、元素重叠、线条交叉）。我纠正了几次后，它主动把这些经验保存成了一个技能。之后再画图就直接用正确的方式了。

```bash
# 查看已安装的技能
hermes skills list

# 从技能库安装
hermes skills install er-diagram-drawio

# 搜索技能
hermes skills search "database"
```

### 2. 持久记忆：跨会话的"大脑"

Hermes 的记忆系统分两层：

- **用户画像**：你的名字、角色、偏好、习惯
- **环境笔记**：工具配置、项目约定、踩坑经验

这些记忆在每次会话开始时自动注入 system prompt，所以 Hermes 总是"记得"你之前告诉它的事情。不需要每次都重复说明你的技术栈、代码风格、或者常用路径。

```bash
# 查看当前记忆
# 在会话中直接说"记住这个"

# 管理记忆
hermes memory setup
```

### 3. 消息网关：AI 在你身边

这是我用得最多的功能。Hermes 可以同时接入多个消息平台——Telegram、Discord、Slack、QQ、微信等。同一个 AI 实例，在终端里帮你写代码，在 QQ 上回答朋友的技术问题，在 Telegram 里推送每日摘要。

```bash
# 配置消息平台
hermes gateway setup

# 启动网关
hermes gateway run

# 安装为后台服务
hermes gateway install
```

我给 Hermes 接了 QQ Bot，朋友们可以直接在群里 @它问技术问题。它能读代码、搜网页、甚至帮他们 debug。

### 4. Cron 定时任务

Hermes 内置了定时任务调度器，支持 cron 表达式、间隔时间、自然语言描述。

```bash
# 创建定时任务
hermes cron create "0 9 * * *" --prompt "查看 GitHub Issues 并推送摘要到 Telegram"

# 查看所有任务
hermes cron list

# 手动触发
hermes cron run <job_id>
```

我设置了几个常用的：
- 每天早上 9 点推送 GitHub 通知
- 每周一生成项目进度报告
- 每小时检查一次服务器状态

### 5. 子 Agent 编排

对于复杂任务，Hermes 可以拆分成多个子任务并行执行。每个子任务在一个独立的子 Agent 中运行，有自己的上下文和工具集，互不干扰。

比如我说"帮我重构这个项目的数据库层，同时更新 API 文档"，Hermes 会拆成两个子 Agent 并行跑，最后汇总结果。这比单线程顺序执行快很多。

### 6. Profile 多实例

Hermes 支持多个 Profile，每个 Profile 有独立的配置、会话、技能和记忆。我用一个 Profile 做日常开发，另一个 Profile 做自动化任务，互不干扰。

```bash
# 创建新 Profile
hermes profile create work --clone-all

# 切换 Profile
hermes profile use work

# 用指定 Profile 启动
hermes --profile work
```

## 实际使用场景

### 场景 1：全栈开发

用 Claude Code 式的方式写代码，但更强。Hermes 能读写文件、执行命令、搜索代码、调用 API。配合技能系统，它会越用越顺手。

### 场景 2：论文辅助

上传论文 PDF，让它翻译、总结、分析。Hermes 支持文件上传和 OCR，能处理图片和文档。

### 场景 3：项目管理

用 Kanban 看板管理多 Agent 协作。创建任务、分配给不同 Agent、跟踪进度。适合需要多人/多 Agent 协作的大型项目。

### 场景 4：信息聚合

定时抓取博客、RSS、GitHub 动态，汇总推送到消息平台。不用自己写爬虫，告诉 Hermes 你要监控什么就行。

### 场景 5：智能家居

通过 Home Assistant 集成，用自然语言控制家里的灯、空调、扫地机器人。"把客厅灯调暗一点"，Hermes 直接执行。

## 和其他工具的配合

Hermes 不是孤立使用的。我的日常工作流：

1. **Claude Code**：写代码、重构、Review PR
2. **Hermes Agent**：管理自动化、消息平台、定时任务、记忆
3. **Cursor**：日常 IDE 编辑，AI 补全

三者各司其职。Claude Code 做深度编码，Hermes 做全栈自动化，Cursor 做日常编辑。Hermes 的子 Agent 编排能力甚至可以调用 Claude Code——把编码任务委派给它执行。

## 不足之处

- **学习曲线**：功能太多，配置项也多，新手容易迷路
- **资源占用**：作为 Python 应用，内存占用比 Claude Code（Node.js）高一些
- **文档不够完善**：部分高级功能的文档还在建设中
- **模型依赖**：核心能力取决于底层 LLM，换模型后体验可能不同

## 总结

Hermes Agent 不是"又一个 Coding Agent"，它是一个 AI 自治代理平台。如果你只需要写代码，Claude Code 或 Codex 可能更专注更好用。但如果你想要一个能写代码、能管消息、能定时执行、能跨平台运行、能记住你偏好的全能 AI 助手，Hermes 是目前最好的选择。

---

> 三个月用下来，Hermes 已经从"工具"变成了"搭档"。它记得我的项目结构、代码风格、常用命令，甚至知道我喜欢简洁的回复。这种"越用越懂你"的体验，是其他工具给不了的。
