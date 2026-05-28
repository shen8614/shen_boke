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

## 简介

Codex 是 OpenAI 的终端 Coding Agent，基于 codex-1 模型（o3 微调版）。它的核心特色是"沙箱安全执行"——所有命令都在隔离的沙箱中运行，不会影响本地环境。

Codex 的推理能力非常强，特别适合处理复杂的算法和逻辑问题。

## 安装与部署

### 安装

```bash
npm install -g @openai/codex
```

### 认证

```bash
# 设置 API Key
export OPENAI_API_KEY=sk-xxx

# 或者 OAuth 登录
codex login
```

### 验证安装

```bash
codex --version
```

## 核心功能

### 沙箱执行

Codex 的所有命令都在沙箱中运行：

- 文件操作在隔离目录
- Shell 命令在沙箱容器
- 网络访问受限
- 不会影响本地环境

### 一次性执行

`codex exec` 支持一次性任务执行：

```bash
codex exec "用 FastAPI 搭一个带 JWT 认证的用户管理系统"
```

### 交互式 PTY

支持交互式终端：

```bash
codex
> 帮我分析这个项目的依赖关系
```

### full-auto / yolo 模式

```bash
# 全自动模式，不需要确认
codex exec --full-auto "重构这个模块"

# yolo 模式，跳过所有安全检查
codex exec --yolo "快速原型"
```

### 并行 worktree

支持 Git worktree 并行执行多个任务：

```bash
codex exec --worktree feature-a "实现功能 A"
codex exec --worktree feature-b "实现功能 B"
```

## 使用场景

### 快速原型

```bash
codex exec --full-auto "用 FastAPI 搭一个带 JWT 认证的用户管理系统"
```

### 算法题

Codex 的推理能力在处理算法题时特别强：

```bash
codex -p "实现一个 LRU Cache，要求 O(1) 的 get 和 put 操作"
```

### 安全敏感场景

沙箱执行保证不影响本地环境，适合在生产服务器上执行任务。

## 优势

1. **沙箱安全执行**：不影响本地环境
2. **推理能力强**：codex-1 模型在复杂逻辑任务上表现突出
3. **并行 worktree**：支持多任务并行
4. **快速原型**：full-auto 模式能自动完成从零到一的项目搭建

## 定价

| 方案 | 价格 | 内容 |
|------|------|------|
| Free | 有限免费 | 基础功能 |
| API | 按 token 计费 | 使用 codex-1 模型 |

## 不足

- 沙箱限制了灵活性，某些需要本地环境的操作无法执行
- 没有 MCP 支持
- 没有浏览器能力
- 跨会话记忆较弱

---

> Codex 适合需要沙箱安全执行、处理推理密集型任务的开发者。如果你是 OpenAI 生态用户，这是最佳选择。
