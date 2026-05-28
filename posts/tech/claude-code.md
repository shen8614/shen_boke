     1|     1|---
     2|     2|title: "Claude Code：Anthropic 的终端 Coding Agent"
     3|     3|date: 2026-05-24
     4|     4|tags:
     5|     5|  - AI Agent
     6|     6|  - Claude Code
     7|     7|  - Anthropic
     8|     8|categories:
     9|     9|  - 技术学习
    10|    10|description: 深入介绍 Claude Code 的核心功能、安装部署与使用体验。
    11|    11|---
    12|    12|
    13|    13|# Claude Code：Anthropic 的终端 Coding Agent
    14|    14|
    15|    15|> 官网：[https://docs.anthropic.com/claude-code](https://docs.anthropic.com/claude-code)
    16|    16|
    17|    17|## 简介
    18|    18|
    19|    19|Claude Code 是 Anthropic 出品的终端 Coding Agent，基于 Claude 模型。核心理念是"一个能在终端里做任何事的 AI"。它不只是代码补全工具，而是一个能自主读写文件、执行命令、管理 Git 工作流的完整 Agent。
    20|    20|
    21|    21|Claude Code 在代码理解方面是目前最强的。它的 `/compact` 命令能在上下文快满时智能压缩，保持长时间对话的质量。CLAUDE.md 项目记忆机制让 AI 能快速学习项目规范。子 Agent 编排支持自定义 Agent 协作，MCP 协议可接入外部工具。
    22|    22|
    23|    23|## 安装与部署
    24|    24|
    25|    25|### 系统要求
    26|    26|
    27|    27|- Node.js 18+ （推荐 20 LTS）
    28|    28|- npm 或 yarn
    29|    29|- macOS、Windows (WSL)、Linux
    30|    30|
    31|    31|### 安装
    32|    32|
    33|    33|```bash
    34|    34|# 全局安装
    35|    35|npm install -g @anthropic-ai/claude-code
    36|    36|
    37|    37|# 验证安装
    38|    38|claude --version
    39|    39|```
    40|    40|
    41|    41|### 认证方式一：OAuth 登录（推荐）
    42|    42|
    43|    43|适用于 Pro/Max 订阅用户：
    44|    44|
    45|    45|```bash
    46|    46|# 交互式登录，会打开浏览器
    47|    47|claude login
    48|    48|
    49|    49|# 按提示完成 OAuth 授权
    50|    50|# 登录后凭证自动保存
    51|    51|```
    52|    52|
    53|    53|### 认证方式二：API Key
    54|    54|
    55|    55|适用于 API 用户：
    56|    56|
    57|    57|```bash
    58|    58|# 设置环境变量
    59|    59|export ANTHROPIC_API_KEY=sk-ant...xxxx
    60|    60|
    61|    61|# 或写入 shell 配置文件
    62|    62|echo 'export ANTHROPIC_API_KEY=sk-ant...xxxx' >> ~/.bashrc
    63|    63|source ~/.bashrc
    64|    64|```
    65|    65|
    66|    66|API Key 获取方式：访问 https://console.anthropic.com → API Keys → Create Key
    67|    67|
    68|    68|### 验证认证
    69|    69|
    70|    70|```bash
    71|    71|# 测试是否正常工作
    72|    72|claude -p "Say hello" --max-turns 1
    73|    73|
    74|    74|# 应该返回 Claude 的回复
    75|    75|```
    76|    76|
    77|    77|### VS Code 集成
    78|    78|
    79|    79|Claude Code 可以作为 VS Code 的终端使用：
    80|    80|
    81|    81|1. 在 VS Code 中打开终端
    82|    82|2. 运行 `claude` 进入交互模式
    83|    83|3. 代码修改会自动反映在编辑器中
    84|    84|
    85|    85|## 核心功能
    86|    86|
    87|    87|### 交互式 TUI
    88|    88|
    89|    89|直接运行 `claude` 进入交互式终端界面：
    90|    90|
    91|    91|```bash
    92|    92|$ claude
    93|    93|╭─────────────────────────────────────╮
    94|    94|│ Claude Code v1.0                    │
    95|    95|│ Type /help for commands             │
    96|    96|╰─────────────────────────────────────╯
    97|    97|
    98|    98|> 给 UserController 加一个分页查询接口
    99|    99|
   100|   100|# Claude 会：
   101|   101|# 1. 分析项目结构
   102|   102|# 2. 找到 UserController.java
   103|   103|# 3. 生成分页查询代码
   104|   104|# 4. 运行测试验证
   105|   105|# 5. 询问是否提交
   106|   106|```
   107|   107|
   108|   108|### 非交互模式
   109|   109|
   110|   110|`-p` 参数支持非交互式执行，适合脚本和 CI/CD：
   111|   111|
   112|   112|```bash
   113|   113|# 单次执行
   114|   114|claude -p "给 UserController 加一个分页查询接口" --max-turns 10
   115|   115|
   116|   116|# 管道输入
   117|   117|git diff | claude -p "Review this diff for bugs"
   118|   118|
   119|   119|# 从文件读取
   120|   120|claude -p "解释这段代码" < src/utils/helper.py
   121|   121|```
   122|   122|
   123|   123|### CLAUDE.md 项目记忆
   124|   124|
   125|   125|在项目根目录创建 `CLAUDE.md` 文件，写入项目规范：
   126|   126|
   127|   127|```markdown
   128|   128|# 项目规范
   129|   129|
   130|   130|## 技术栈
   131|   131|- 后端：Spring Boot 3.x + Java 17
   132|   132|- 前端：Vue 3 + TypeScript
   133|   133|- 数据库：MySQL 8.0
   134|   134|
   135|   135|## 代码风格
   136|   136|- 后端遵循 Google Java Style Guide
   137|   137|- 前端使用 ESLint + Prettier
   138|   138|- 禁止使用 Lombok
   139|   139|
   140|   140|## 测试要求
   141|   141|- 所有 API 必须有单元测试
   142|   142|- 测试覆盖率不低于 70%
   143|   143|- 使用 JUnit 5 + Mockito
   144|   144|
   145|   145|## Git 规范
   146|   146|- 提交信息格式：type(scope): description
   147|   147|- type: feat/fix/docs/style/refactor/test/chore
   148|   148|```
   149|   149|
   150|   150|Claude Code 会自动读取这个文件，将规范注入到每次对话中。
   151|   151|
   152|   152|### 子 Agent 编排
   153|   153|
   154|   154|支持 `@agent` 语法调用自定义子 Agent：
   155|   155|
   156|   156|```bash
   157|   157|# 创建自定义 Agent
   158|   158|claude agent create reviewer --prompt "Review code for security issues"
   159|   159|claude agent create tester --prompt "Write comprehensive unit tests"
   160|   160|
   161|   161|# 使用子 Agent
   162|   162|> @reviewer 检查 UserController 的安全性
   163|   163|> @tester 为 OrderService 写测试
   164|   164|```
   165|   165|
   166|   166|子 Agent 有独立的上下文，不会污染主对话。
   167|   167|
   168|   168|### Hooks 自动化
   169|   169|
   170|   170|Hooks 可以在特定事件触发时自动执行操作：
   171|   171|
   172|   172|```json
   173|   173|{
   174|   174|  "hooks": {
   175|   175|    "onCommit": "npm test && npm run lint",
   176|   176|    "onFileChange": "npm run type-check",
   177|   177|    "onCreate": "npm run format"
   178|   178|  }
   179|   179|}
   180|   180|```
   181|   181|
   182|   182|### MCP 集成
   183|   183|
   184|   184|Claude Code 原生支持 MCP 协议，可以接入外部工具：
   185|   185|
   186|   186|```bash
   187|   187|# 在 ~/.claude/settings.json 中配置 MCP servers
   188|   188|{
   189|   189|  "mcpServers": {
   190|   190|    "github": {
   191|   191|      "command": "npx",
   192|   192|      "args": ["@modelcontextprotocol/server-github"]
   193|   193|    },
   194|   194|    "postgres": {
   195|   195|      "command": "npx",
   196|   196|      "args": ["@modelcontextprotocol/server-postgres"]
   197|   197|    }
   198|   198|  }
   199|   199|}
   200|   200|```
   201|   201|
   202|   202|配置后 Claude Code 可以直接操作 GitHub、数据库等。
   203|   203|
   204|   204|### /compact 智能压缩
   205|   205|
   206|   206|当对话上下文快满时，`/compact` 命令能智能压缩历史：
   207|   207|
   208|   208|```bash
   209|   209|> /compact
   210|   210|
   211|   211|# Claude Code 会：
   212|   212|# 1. 总结之前的对话
   213|   213|# 2. 保留关键上下文
   214|   214|# 3. 丢弃冗余信息
   215|   215|# 4. 压缩后继续对话
   216|   216|```
   217|   217|
   218|   218|这保证了长时间对话的质量不会下降。
   219|   219|
   220|   220|## 使用场景
   221|   221|
   222|   222|### 日常写代码
   223|   223|
   224|   224|```bash
   225|   225|claude -p "给 UserController 加一个分页查询接口，支持按姓名模糊搜索" --max-turns 10
   226|   226|```
   227|   227|
   228|   228|### 代码审查
   229|   229|
   230|   230|```bash
   231|   231|git diff main...feature | claude -p "Review this diff for bugs and security issues"
   232|   232|```
   233|   233|
   234|   234|### 开源项目贡献
   235|   235|
   236|   236|```bash
   237|   237|# 从 PR 恢复上下文
   238|   238|claude --from-pr 123 -p "根据 review 意见修复所有问题"
   239|   239|
   240|   240|# 学习项目规范
   241|   241|claude -p "分析这个项目的代码规范，生成 CLAUDE.md"
   242|   242|```
   243|   243|
   244|   244|### 大规模重构
   245|   245|
   246|   246|```bash
   247|   247|claude -p "把所有 class 组件改成 hooks，逐个文件修改并测试"
   248|   248|```
   249|   249|
   250|   250|### CI/CD 集成
   251|   251|
   252|   252|```yaml
   253|   253|# GitHub Actions
   254|   254|- name: Code Review
   255|   255|  run: |
   256|   256|    git diff origin/main | claude -p "Review for security issues" --output json
   257|   257|```
   258|   258|
   259|   259|## 优势
   260|   260|
   261|   261|1. **代码理解最强**：对整个代码库的理解深度无人能及
   262|   262|2. **CLAUDE.md 记忆**：项目规范自动注入，不需要每次提醒
   263|   263|3. **子 Agent 编排**：支持自定义 Agent 协作，独立上下文
   264|   264|4. **MCP 原生支持**：可接入 GitHub、数据库、浏览器等外部工具
   265|   265|5. **Hooks 自动化**：事件驱动的自动化流程
   266|   266|6. **/compact 压缩**：智能压缩保持长对话质量
   267|   267|7. **管道支持**：可以与其他 CLI 工具组合使用
   268|   268|
   269|   269|## 定价
   270|   270|
   271|   271|| 方案 | 价格 | 内容 |
   272|   272||------|------|------|
   273|   273|| Free | 有限免费 | 基础功能，有限请求 |
   274|   274|| Pro | $20/月 | 更多 fast requests |
   275|   275|| Max | $100/月 | 最多 fast requests，优先队列 |
   276|   276|| API | 按 token 计费 | 输入 $3/M，输出 $15/M (Sonnet) |
   277|   277|
   278|   278|API Key 获取：https://console.anthropic.com
   279|   279|
   280|   280|## 不足
   281|   281|
   282|   282|- Pro 订阅的 fast requests 重度使用时不够用，会降速
   283|   283|- 价格相对较高，纯 API 使用费用不低
   284|   284|- 偶尔会出现过度自信的情况，改了不该改的文件
   285|   285|- 没有 GUI 界面，纯终端操作对新手不太友好
   286|   286|- 对 Windows 原生支持不够好，推荐 WSL
   287|   287|
   288|   288|---
   289|   289|
   290|   290|> Claude Code 适合追求极致代码理解能力的开发者。如果你是 Claude 深度用户，这是最佳选择。
   291|   291|
   292|
   293|
   294|
---

---

> **免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。

   301|