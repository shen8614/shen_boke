---
title: "Codex：OpenAI 的沙箱 Coding Agent"
date: 2026-05-24
tags:
  - AI Agent
  - Codex
  - OpenAI
categories:
  - 技术学习
description: 深入介绍 Codex 的核心功能、安装部署与使用体验。
---

# Codex：OpenAI 的沙箱 Coding Agent

> 官网：[https://openai.com/index/codex](https://openai.com/index/codex) / [https://platform.openai.com](https://platform.openai.com)

## 简介

Codex 是 OpenAI 的终端 Coding Agent，基于 codex-1 模型（o3 微调版）。它的核心特色是"沙箱安全执行"——所有命令都在隔离的沙箱中运行，不会影响本地环境。

Codex 的推理能力非常强，特别适合处理复杂的算法和逻辑问题。`codex exec --full-auto` 模式能自动完成从零到一的项目搭建，沙箱隔离保证不影响本地环境。

## 安装与部署

### 系统要求

- Node.js 18+
- npm
- macOS、Linux（Windows 推荐 WSL）

### 安装

```bash
# 全局安装
npm install -g @openai/codex

# 验证安装
codex --version
```

### 认证方式一：API Key

```bash
# 设置环境变量
export OPENAI_API_KEY=sk-xxx...xxxx

# 或写入 shell 配置文件
echo 'export OPENAI_API_KEY=sk-xxx...xxxx' >> ~/.bashrc
source ~/.bashrc
```

API Key 获取方式：访问 https://platform.openai.com → API Keys → Create new secret key

### 认证方式二：OAuth 登录

```bash
# 交互式登录
codex login

# 按提示完成 OAuth 授权
```

### 验证安装

```bash
# 测试是否正常工作
codex -p "Say hello"

# 或者用 exec 模式
codex exec "Create a hello world Python script"
```

## 核心功能

### 沙箱执行

Codex 的所有命令都在沙箱中运行，这是它最大的特色：

- **文件操作**：在隔离目录进行，不影响本地文件系统
- **Shell 命令**：在沙箱容器中执行，无法访问本地环境
- **网络访问**：受限，只能访问必要的依赖源
- **进程隔离**：无法看到或影响本地进程

这意味着你可以在生产服务器上安全地使用 Codex，不用担心它误操作本地文件。

### 一次性执行（exec）

`codex exec` 支持一次性任务执行，完成后自动退出：

```bash
# 创建项目
codex exec "用 FastAPI 搭一个带 JWT 认证的用户管理系统"

# 生成代码
codex exec "实现一个 LRU Cache，要求 O(1) 的 get 和 put 操作"

# 分析代码
codex exec "分析这个项目的依赖关系，找出潜在的安全漏洞"
```

### 交互式 PTY

支持交互式终端，可以持续对话：

```bash
$ codex
╭─────────────────────────────────────╮
│ Codex CLI                           │
│ Type /help for commands             │
╰─────────────────────────────────────╯

> 帮我分析这个项目的架构

# Codex 会：
# 1. 扫描项目结构
# 2. 分析依赖关系
# 3. 生成架构图
# 4. 给出优化建议
```

### full-auto 模式

全自动模式，不需要任何确认：

```bash
codex exec --full-auto "重构这个模块，把回调改成 async/await"
```

Codex 会自动完成所有操作，包括修改文件、运行测试、修复错误。

### yolo 模式

跳过所有安全检查，最快执行：

```bash
codex exec --yolo "快速原型验证"
```

适合快速验证想法，不建议在正式项目中使用。

### 并行 worktree

支持 Git worktree 并行执行多个任务：

```bash
# 在不同 worktree 中并行执行
codex exec --worktree feature-a "实现功能 A"
codex exec --worktree feature-b "实现功能 B"
codex exec --worktree bugfix-c "修复 Bug C"
```

每个任务在独立的 worktree 中执行，互不干扰。

## 使用场景

### 快速原型

```bash
codex exec --full-auto "用 FastAPI 搭一个带 JWT 认证的用户管理系统"
# Codex 会自动：
# 1. 创建项目结构
# 2. 安装依赖
# 3. 编写代码
# 4. 配置数据库
# 5. 写测试
# 6. 生成文档
```

### 算法题

Codex 的推理能力在处理算法题时特别强：

```bash
codex -p "实现一个 LRU Cache，要求 O(1) 的 get 和 put 操作"
codex -p "实现一个支持通配符的正则表达式匹配器"
codex -p "实现一个跳表（Skip List）数据结构"
```

### 安全敏感场景

沙箱执行保证不影响本地环境，适合在生产服务器上执行任务：

```bash
# 在生产服务器上安全分析日志
codex exec "分析 /var/log/app.log，找出异常请求"

# 安全地测试配置
codex exec "测试这个 Nginx 配置是否正确"
```

### 代码分析

```bash
codex exec "分析这个项目的代码质量，找出潜在的 Bug"
codex exec "生成这个项目的 API 文档"
codex exec "分析这个项目的性能瓶颈"
```

## 优势

1. **沙箱安全执行**：不影响本地环境，可在生产环境使用
2. **推理能力强**：codex-1 模型在复杂逻辑任务上表现突出
3. **并行 worktree**：支持多任务并行执行
4. **快速原型**：full-auto 模式能自动完成从零到一的项目搭建
5. **yolo 模式**：最快执行速度
6. **OpenAI 生态**：与 OpenAI 其他服务无缝集成

## 定价

| 方案 | 价格 | 内容 |
|------|------|------|
| Free | 有限免费 | 基础功能 |
| API | 按 token 计费 | 使用 codex-1 模型 |

API 费用参考 OpenAI 官网：https://platform.openai.com/pricing

## 不足

- 沙箱限制了灵活性，某些需要本地环境的操作无法执行
- 没有 MCP 支持，无法接入外部工具
- 没有浏览器能力，无法操作 Web 页面
- 跨会话记忆较弱，没有持久记忆机制
- 没有子 Agent 编排能力
- Windows 原生支持不好，推荐 WSL

---

> Codex 适合需要沙箱安全执行、处理推理密集型任务的开发者。如果你是 OpenAI 生态用户，这是最佳选择。

---

> **免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。
