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

## 简介

OpenClaw 是一款轻量级 AI Agent 工具，专注于简洁的配置和快速上手。它的理念是"越简单越好"——不需要复杂的配置，几步就能开始使用。

OpenClaw 与 Hermes Agent 共享部分基础设施，但更加轻量。

## 安装与部署

### 安装

```bash
# 从 GitHub 安装
git clone https://github.com/openclaw/openclaw.git
cd openclaw
npm install
```

### 配置

OpenClaw 的配置流程非常简洁：

1. **选择 Provider**：DeepSeek、OpenRouter、Anthropic 等
2. **勾选技能**：github、gh-issues、nano-pdf、xurl 等
3. **开启 Hooks**：Shell 集成
4. 完成

```bash
openclaw setup
# 按提示选择 Provider、技能、Hooks
```

## 核心功能

### 极简配置

OpenClaw 的配置流程是所有 Agent 中最简单的：

- Provider 选择
- 技能勾选
- Hooks 开关
- 完成

### 技能系统

OpenClaw 支持多种技能：

- **github**：GitHub 操作
- **gh-issues**：Issue 管理
- **nano-pdf**：PDF 编辑
- **xurl**：X/Twitter 操作

### Hooks 集成

OpenClaw 支持 Hooks（Shell 集成），可以在特定事件触发时自动执行操作。

## 使用场景

### 快速上手

如果你只是想快速试试 AI Agent，OpenClaw 是最简单的选择：

```bash
openclaw setup  # 3 步配置
openclaw        # 开始使用
```

### 轻量任务

适合简单的代码编写、文件操作、Git 操作等。

## 优势

1. **极简配置**：3 步完成配置
2. **快速上手**：学习成本最低
3. **轻量级**：不依赖复杂基础设施
4. **与 Hermes 共享基础设施**：部分技能通用

## 定价

OpenClaw 本身免费，费用取决于你选择的 LLM Provider。

## 不足

- 功能相对简单
- 没有持久记忆
- 没有消息平台集成
- 没有 Cron 定时任务
- 与 Hermes Agent 共用同一套凭证会冲突，不能同时运行

---

> OpenClaw 适合想快速上手试试 AI Agent 的开发者。配置越简单越好，功能够用就行。
