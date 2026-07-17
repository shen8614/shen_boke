---
title: "Grok Build：SpaceXAI 的全新 Coding Agent 登场"
date: 2026-07-17
tags:
  - AI Agent
  - Grok Build
  - Coding Agent
  - SpaceXAI
categories:
  - 技术学习
description: SpaceXAI 刚发布的终端 Coding Agent，全屏 TUI、鼠标交互、支持 MCP 和插件，来看看它能做什么。
---

# Grok Build：SpaceXAI 的全新 Coding Agent 登场

## 简介

2026 年 7 月 14 日，SpaceXAI 正式发布了 **Grok Build**——一个终端里的 AI 编程代理，命令行叫 `grok`。发布仅 3 天就在 GitHub 上斩获 15000+ 星。

与 Claude Code、Codex、OpenCode 等已有 Coding Agent 相比，Grok Build 有几个鲜明的特色：

- **全屏 TUI**：不是传统终端里一问一答，而是一个全屏交互界面
- **鼠标支持**：可以用鼠标操作，不像传统 CLI 只能键盘
- **Rust 编写**：性能好，启动快
- **插件系统**：支持 MCP、Skills、Hooks 扩展
- **Headless 模式**：可用于 CI/CD 和脚本化场景

GitHub：https://github.com/xai-org/grok-build  
官网：https://x.ai/cli  
文档：https://docs.x.ai/build/overview

## 安装

```bash
# macOS / Linux / Git Bash
curl -fsSL https://x.ai/cli/install.sh | bash

# Windows PowerShell
irm https://x.ai/cli/install.ps1 | iex

# 验证
grok --version
```

首次启动会打开浏览器进行身份验证（需要 x.ai 账号）。

从源码构建需要 Rust 工具链：

```bash
git clone https://github.com/xai-org/grok-build.git
cd grok-build
cargo run -p xai-grok-pager-bin
```

## TUI 界面

Grok Build 的 TUI 跟其他 Coding Agent 完全不同。它不是终端里一问一答的聊天界面，而是一个全屏交互环境：

- **分屏布局**：左侧代码/文件树，右侧对话/输出
- **鼠标交互**：点击选择文件、滚动查看输出、点击按钮执行操作
- **语法高亮**：内置代码视图，编辑和查看文件不用切编辑器
- **快捷键丰富**：支持 Vim 风格快捷键和自定义绑定

如果你用过 Claude Code 或 Codex 的命令行界面，Grok Build 的感觉更像是一个在终端里运行的轻量 IDE。

## 核心功能

### 代码理解与编辑

Grok Build 能扫描整个代码库，理解项目结构和依赖关系。它可以直接编辑文件、创建新文件、执行重构。

```bash
# 在项目目录中启动
cd my-project
grok

# 进入 TUI 后直接输入自然语言指令
# "给 UserService 加一个分页查询方法"
# "把这段代码提取成单独的组件"
# "帮我找到所有未使用的 import 并清理"
```

### Shell 执行

Grok Build 可以在终端中直接运行命令，并捕获输出进行分析：

```bash
# 在 TUI 中
# "运行测试并修复失败的用例"
# "检查这个端点的返回结构"
# "把这几个包更新到最新版本"
```

### 网页搜索

支持搜索网络信息，获取最新文档、API 变更、bug 解决方案等。

### 长任务管理

长时间运行的任务（如编译、测试、部署）会后台执行，不阻塞当前操作。可以随时查看进度。

### Headless 模式

适合 CI/CD 和脚本化场景：

```bash
# 无需 TUI，直接运行指令
grok run "为所有 Controller 添加请求日志中间件"

# 输出 JSON 结果，方便程序处理
grok run --json "分析这个项目的依赖关系"
```

### ACP 协议

Grok Build 支持 Agent Client Protocol（ACP），可以集成到编辑器中作为后端：

- VS Code 插件
- JetBrains 插件
- 自定义编辑器集成

## 扩展性

Grok Build 的扩展系统层级分明：

| 层级 | 能力 | 示例 |
|------|------|------|
| **MCP** | 接入外部工具 | 数据库、API、文件系统 |
| **Skills** | 保存工作流和经验 | ponytail skill、代码审查 skill |
| **Plugins** | 修改 TUI 行为 | 自定义主题、快捷键 |
| **Hooks** | 事件触发脚本 | 提交前检查、自动格式化 |

### MCP 支持

Grok Build 原生支持 MCP（Model Context Protocol），可以接入已有的 MCP 服务器生态：

```json
// ~/.config/grok/mcp.json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem"]
    }
  }
}
```

## 跟其他 Coding Agent 对比

| 维度 | Grok Build | Claude Code | Codex | OpenCode |
|------|-----------|------------|-------|---------|
| 界面 | 全屏 TUI | 终端对话 | 终端对话 | 终端对话 |
| 鼠标 | ✅ | ❌ | ❌ | ❌ |
| 语言 | Rust | TypeScript | Python | Go |
| MCP | ✅ | ✅ | ❌ | ❌ |
| Skills | ✅ | ❌ | ❌ | ❌ |
| 插件 | ✅ | ❌ | ❌ | ❌ |
| 免费？ | 需订阅 | 按量付费 | 免费额度 | 开源免费 |
| 模型 | Grok 系列 | Claude 系列 | GPT 系列 | 可切换 |

## 使用场景建议

**适合 Grok Build 的场景：**
- 喜欢全屏 TUI 胜过命令行问答的开发者
- 已经在用 Grok 生态（xAI 账号），不想再开别的订阅
- 需要插件/MCP 扩展的复杂项目
- Rust 项目（同为 Rust 生态，兼容性更好）

**不太适合的场景：**
- 只想要一个简单的 CLI 问答工具（TUI 对你来说太重了）
- 已深度绑定 Claude 或 OpenAI 生态
- 没有 xAI 账号或不想额外订阅

## 总结

Grok Build 是 2026 年中 Coding Agent 赛道的一个重要新选手。它的差异化很明显——全屏 TUI、鼠标交互、Rust 性能、完善的扩展系统，这些让它在众多 Coding Agent 中有了自己的定位。

它不是要取代 Claude Code 或 Codex，而是提供了另一种选择。如果你喜欢全屏交互、想要更丰富的 TUI 体验、或者已经是 Grok 生态用户，Grok Build 值得试试。

---

> **提示：** 本文基于 Grok Build 2026 年 7 月 14 日的初始版本。功能可能随版本更新而变化。文中提到的"免费/订阅"情况以 x.ai 官方最新信息为准。
