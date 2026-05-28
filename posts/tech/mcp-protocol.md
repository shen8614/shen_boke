---
title: MCP 协议：AI 工具集成的新标准
date: 2026-05-22
tags:
  - MCP
  - AI Agent
  - 协议
categories:
  - 技术学习
description: 理解 Model Context Protocol 的设计理念和实际应用，以及它为什么可能成为 AI 工具生态的 USB-C。
---

# MCP 协议：AI 工具集成的新标准

## 从混乱到标准化

2025 年之前，每个 AI 应用集成外部工具的方式都不一样。LangChain 有自己的 tool 格式，OpenAI 有自己的 function calling 规范，各家 Agent 框架各搞一套。你想让 AI 读 GitHub 仓库、查数据库、发邮件，每个都要写专门的适配代码。

Anthropic 在 2024 年底提出了 MCP（Model Context Protocol），想做的事情很简单——给 AI 和外部工具之间定义一个统一的通信协议。就像 USB-C 统一了充电接口一样，MCP 想统一 AI 调用工具的方式。

到 2026 年中，MCP 已经被主流 AI 工具广泛支持：Cursor、Windsurf、Claude Code、Claude Desktop、Cline、Continue 等等。可以说 MCP 已经事实标准化了。

## MCP 的架构

MCP 采用客户端-服务器架构：

```
┌──────────────┐     MCP 协议     ┌──────────────┐
│  AI 应用      │ ◄──────────────► │  MCP Server   │
│  (Host)       │                  │  (工具提供方)  │
└──────────────┘                  └──────────────┘
```

- **Host（宿主）**：发起请求的 AI 应用，比如 Cursor、Claude Desktop
- **MCP Server**：提供工具能力的服务端，比如 GitHub MCP Server、文件系统 MCP Server

Host 通过 MCP 协议向 Server 请求三类能力：

1. **Tools（工具）**：Server 暴露的可调用函数，比如 `search_repositories`、`create_issue`
2. **Resources（资源）**：Server 提供的上下文数据，比如文件内容、数据库 schema
3. **Prompts（提示模板）**：Server 预定义的 prompt 模板，用于特定场景

## 实际例子：GitHub MCP Server

装一个 GitHub MCP Server，你的 AI 应用就能直接操作 GitHub——搜索仓库、创建 Issue、提交 PR、查看 CI 状态。不需要写任何 GitHub API 的适配代码。

配置方式通常是在 MCP 配置文件里加一段：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx"
      }
    }
  }
}
```

配置完重启 Host 应用，AI 就自动发现了 GitHub 提供的所有工具。你可以说"帮我看看 shen8614/hotel-management 这个仓库最近的 PR"，AI 会自动调用 GitHub MCP Server 的工具完成查询。

## MCP Server 生态

2026 年主流的 MCP Server：

| Server | 功能 | 来源 |
|--------|------|------|
| filesystem | 读写本地文件 | 官方 |
| github | GitHub 全功能操作 | 官方 |
| postgres/mysql | 数据库查询和管理 | 官方 |
| puppeteer | 浏览器自动化 | 官方 |
| slack | Slack 消息和频道 | 官方 |
| brave-search | 网络搜索 | 官方 |
| memory | 持久化记忆存储 | 社区 |
| figma | 读取设计稿 | 社区 |
| notion | Notion 页面操作 | 社区 |

官方 Server 由 Anthropic 维护，质量有保证。社区 Server 数量增长很快，但质量参差不齐，用之前最好看看源码。

## 自己写一个 MCP Server

MCP Server 的开发门槛很低。以 TypeScript 为例：

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "my-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 注册工具
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_weather",
      description: "查询指定城市的天气",
      inputSchema: {
        type: "object",
        properties: {
          city: { type: "string", description: "城市名称" }
        },
        required: ["city"]
      }
    }
  ]
}));

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_weather") {
    const city = request.params.arguments.city;
    const weather = await fetchWeather(city);
    return { content: [{ type: "text", text: JSON.stringify(weather) }] };
  }
});

// 启动
const transport = new StdioServerTransport();
await server.connect(transport);
```

核心就是三步：定义工具 schema、实现工具逻辑、启动服务。MCP SDK 处理了协议细节，你只需要关注业务逻辑。

## MCP 的传输方式

MCP 支持两种传输方式：

- **stdio**：通过标准输入输出通信，适合本地工具。Host 启动 Server 进程，通过 stdin/stdout 交换 JSON-RPC 消息。
- **SSE（Server-Sent Events）**：通过 HTTP 通信，适合远程服务。Server 作为 HTTP 服务运行，Host 通过 HTTP 请求调用。

本地开发场景用 stdio 最简单，部署到服务器时用 SSE 更合适。

## MCP vs Function Calling

很多人会问：OpenAI 的 function calling 不也能调用工具吗？为什么还需要 MCP？

区别在于：

- **Function Calling** 是模型层面的能力——模型输出一个 JSON 表示要调用某个函数，由应用层负责执行。每个应用自己定义函数格式和执行逻辑。
- **MCP** 是协议层面的标准——定义了 Host 和工具提供方之间的完整通信规范，包括工具发现、调用、错误处理、资源访问等。

简单说，function calling 解决了"模型怎么表达我想调工具"，MCP 解决了"工具怎么被发现、接入和使用"。两者是互补关系，不是替代关系。

## 实际使用感受

我在 Cursor 中配置了 5 个 MCP Server（GitHub、文件系统、数据库、浏览器、搜索），用了三个月，感受是：

**好的方面**：确实省了大量适配代码。以前每个项目要写一遍 GitHub API 调用，现在配一个 MCP Server 就行。工具发现是自动的，不用手动注册。

**不足**：MCP Server 的启动速度是个问题。每个 Server 都是一个独立进程，Host 启动时要等所有 Server 就绪，配置多了启动变慢。另外 MCP Server 的错误处理还不够完善，Server 崩了 Host 有时感知不到。

**建议**：只装你真正会用到的 Server。装太多不仅拖慢启动，还会占用上下文窗口（工具描述会被注入到 prompt 中）。

---

> MCP 的愿景是让 AI 工具生态像 Web API 一样标准化。目前还在早期阶段，但方向是对的。如果你在做 AI 应用开发，现在就开始了解 MCP，不会亏。
