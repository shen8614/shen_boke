     1|     1|---
     2|     2|title: MCP 协议：AI 工具集成的新标准
     3|     3|date: 2026-05-22
     4|     4|tags:
     5|     5|  - MCP
     6|     6|  - AI Agent
     7|     7|  - 协议
     8|     8|categories:
     9|     9|  - 技术学习
    10|    10|description: 理解 Model Context Protocol 的设计理念和实际应用，以及它为什么可能成为 AI 工具生态的 USB-C。
    11|    11|---
    12|    12|
    13|    13|# MCP 协议：AI 工具集成的新标准
    14|    14|
    15|    15|## 从混乱到标准化
    16|    16|
    17|    17|2025 年之前，每个 AI 应用集成外部工具的方式都不一样。LangChain 有自己的 tool 格式，OpenAI 有自己的 function calling 规范，各家 Agent 框架各搞一套。你想让 AI 读 GitHub 仓库、查数据库、发邮件，每个都要写专门的适配代码。
    18|    18|
    19|    19|Anthropic 在 2024 年底提出了 MCP（Model Context Protocol），想做的事情很简单——给 AI 和外部工具之间定义一个统一的通信协议。就像 USB-C 统一了充电接口一样，MCP 想统一 AI 调用工具的方式。
    20|    20|
    21|    21|到 2026 年中，MCP 已经被主流 AI 工具广泛支持：Cursor、Windsurf、Claude Code、Claude Desktop、Cline、Continue 等等。可以说 MCP 已经事实标准化了。
    22|    22|
    23|    23|## MCP 的架构
    24|    24|
    25|    25|MCP 采用客户端-服务器架构：
    26|    26|
    27|    27|```mermaid
    28|    28|graph LR
    29|    29|    subgraph Hosts[宿主应用]
    30|    30|        H1[Cursor] ~~~ H2[Claude Code]
    31|    31|        H3[Hermes] ~~~ H4[Desktop]
    32|    32|    end
    33|    33|    Hosts -->|MCP 协议| MCP[Tools / Resources / Prompts]
    34|    34|    MCP --> S1[GitHub]
    35|    35|    MCP --> S2[Database]
    36|    36|    MCP --> S3[Filesystem]
    37|    37|    MCP --> S4[Browser]
    38|    38|
    39|    39|    style Hosts fill:#eef2ff,stroke:#a5b4fc
    40|    40|    style MCP fill:#f0f9ff,stroke:#7dd3fc
    41|    41|```
    42|    42|
    43|    43|- **Host（宿主）**：发起请求的 AI 应用，比如 Cursor、Claude Desktop
    44|    44|- **MCP Server**：提供工具能力的服务端，比如 GitHub MCP Server、文件系统 MCP Server
    45|    45|
    46|    46|Host 通过 MCP 协议向 Server 请求三类能力：
    47|    47|
    48|    48|1. **Tools（工具）**：Server 暴露的可调用函数，比如 `search_repositories`、`create_issue`
    49|    49|2. **Resources（资源）**：Server 提供的上下文数据，比如文件内容、数据库 schema
    50|    50|3. **Prompts（提示模板）**：Server 预定义的 prompt 模板，用于特定场景
    51|    51|
    52|    52|## 实际例子：GitHub MCP Server
    53|    53|
    54|    54|装一个 GitHub MCP Server，你的 AI 应用就能直接操作 GitHub——搜索仓库、创建 Issue、提交 PR、查看 CI 状态。不需要写任何 GitHub API 的适配代码。
    55|    55|
    56|    56|配置方式通常是在 MCP 配置文件里加一段：
    57|    57|
    58|    58|```json
    59|    59|{
    60|    60|  "mcpServers": {
    61|    61|    "github": {
    62|    62|      "command": "npx",
    63|    63|      "args": ["-y", "@modelcontextprotocol/server-github"],
    64|    64|      "env": {
    65|    65|        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx"
    66|    66|      }
    67|    67|    }
    68|    68|  }
    69|    69|}
    70|    70|```
    71|    71|
    72|    72|配置完重启 Host 应用，AI 就自动发现了 GitHub 提供的所有工具。你可以说"帮我看看 shen8614/hotel-management 这个仓库最近的 PR"，AI 会自动调用 GitHub MCP Server 的工具完成查询。
    73|    73|
    74|    74|## MCP Server 生态
    75|    75|
    76|    76|2026 年主流的 MCP Server：
    77|    77|
    78|    78|| Server | 功能 | 来源 |
    79|    79||--------|------|------|
    80|    80|| filesystem | 读写本地文件 | 官方 |
    81|    81|| github | GitHub 全功能操作 | 官方 |
    82|    82|| postgres/mysql | 数据库查询和管理 | 官方 |
    83|    83|| puppeteer | 浏览器自动化 | 官方 |
    84|    84|| slack | Slack 消息和频道 | 官方 |
    85|    85|| brave-search | 网络搜索 | 官方 |
    86|    86|| memory | 持久化记忆存储 | 社区 |
    87|    87|| figma | 读取设计稿 | 社区 |
    88|    88|| notion | Notion 页面操作 | 社区 |
    89|    89|
    90|    90|官方 Server 由 Anthropic 维护，质量有保证。社区 Server 数量增长很快，但质量参差不齐，用之前最好看看源码。
    91|    91|
    92|    92|## 自己写一个 MCP Server
    93|    93|
    94|    94|MCP Server 的开发门槛很低。以 TypeScript 为例：
    95|    95|
    96|    96|```typescript
    97|    97|import { Server } from "@modelcontextprotocol/sdk/server/index.js";
    98|    98|import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
    99|    99|
   100|   100|const server = new Server(
   101|   101|  { name: "my-server", version: "1.0.0" },
   102|   102|  { capabilities: { tools: {} } }
   103|   103|);
   104|   104|
   105|   105|// 注册工具
   106|   106|server.setRequestHandler(ListToolsRequestSchema, async () => ({
   107|   107|  tools: [
   108|   108|    {
   109|   109|      name: "get_weather",
   110|   110|      description: "查询指定城市的天气",
   111|   111|      inputSchema: {
   112|   112|        type: "object",
   113|   113|        properties: {
   114|   114|          city: { type: "string", description: "城市名称" }
   115|   115|        },
   116|   116|        required: ["city"]
   117|   117|      }
   118|   118|    }
   119|   119|  ]
   120|   120|}));
   121|   121|
   122|   122|// 处理工具调用
   123|   123|server.setRequestHandler(CallToolRequestSchema, async (request) => {
   124|   124|  if (request.params.name === "get_weather") {
   125|   125|    const city = request.params.arguments.city;
   126|   126|    const weather = await fetchWeather(city);
   127|   127|    return { content: [{ type: "text", text: JSON.stringify(weather) }] };
   128|   128|  }
   129|   129|});
   130|   130|
   131|   131|// 启动
   132|   132|const transport = new StdioServerTransport();
   133|   133|await server.connect(transport);
   134|   134|```
   135|   135|
   136|   136|核心就是三步：定义工具 schema、实现工具逻辑、启动服务。MCP SDK 处理了协议细节，你只需要关注业务逻辑。
   137|   137|
   138|   138|## MCP 的传输方式
   139|   139|
   140|   140|MCP 支持两种传输方式：
   141|   141|
   142|   142|- **stdio**：通过标准输入输出通信，适合本地工具。Host 启动 Server 进程，通过 stdin/stdout 交换 JSON-RPC 消息。
   143|   143|- **SSE（Server-Sent Events）**：通过 HTTP 通信，适合远程服务。Server 作为 HTTP 服务运行，Host 通过 HTTP 请求调用。
   144|   144|
   145|   145|本地开发场景用 stdio 最简单，部署到服务器时用 SSE 更合适。
   146|   146|
   147|   147|## MCP vs Function Calling
   148|   148|
   149|   149|很多人会问：OpenAI 的 function calling 不也能调用工具吗？为什么还需要 MCP？
   150|   150|
   151|   151|区别在于：
   152|   152|
   153|   153|- **Function Calling** 是模型层面的能力——模型输出一个 JSON 表示要调用某个函数，由应用层负责执行。每个应用自己定义函数格式和执行逻辑。
   154|   154|- **MCP** 是协议层面的标准——定义了 Host 和工具提供方之间的完整通信规范，包括工具发现、调用、错误处理、资源访问等。
   155|   155|
   156|   156|简单说，function calling 解决了"模型怎么表达我想调工具"，MCP 解决了"工具怎么被发现、接入和使用"。两者是互补关系，不是替代关系。
   157|   157|
   158|   158|## 实际使用感受
   159|   159|
   160|   160|我在 Cursor 中配置了 5 个 MCP Server（GitHub、文件系统、数据库、浏览器、搜索），用了三个月，感受是：
   161|   161|
   162|   162|**好的方面**：确实省了大量适配代码。以前每个项目要写一遍 GitHub API 调用，现在配一个 MCP Server 就行。工具发现是自动的，不用手动注册。
   163|   163|
   164|   164|**不足**：MCP Server 的启动速度是个问题。每个 Server 都是一个独立进程，Host 启动时要等所有 Server 就绪，配置多了启动变慢。另外 MCP Server 的错误处理还不够完善，Server 崩了 Host 有时感知不到。
   165|   165|
   166|   166|**建议**：只装你真正会用到的 Server。装太多不仅拖慢启动，还会占用上下文窗口（工具描述会被注入到 prompt 中）。
   167|   167|
   168|   168|---
   169|   169|
   170|   170|> MCP 的愿景是让 AI 工具生态像 Web API 一样标准化。目前还在早期阶段，但方向是对的。如果你在做 AI 应用开发，现在就开始了解 MCP，不会亏。
   171|   171|
   172|
   173|
   174|
---

---

> **免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。

   181|