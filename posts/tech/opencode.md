     1|---
     2|title: "OpenCode：开源 Provider 无关的 Coding Agent"
     3|date: 2026-05-24
     4|tags:
     5|  - AI Agent
     6|  - OpenCode
     7|categories:
     8|  - 技术学习
     9|description: 深入介绍 OpenCode 的核心功能、安装部署与使用体验。
    10|---
    11|
    12|# OpenCode：开源 Provider 无关的 Coding Agent
    13|
    14|> 官网：[https://opencode.ai](https://opencode.ai) / [GitHub](https://github.com/opencode-ai/opencode)
    15|
    16|## 简介
    17|
    18|OpenCode 是一款开源、Provider 无关的 Coding Agent，支持任意 LLM 后端。它的理念是"不绑定某个模型，让你自由选择"。类似 Claude Code 的交互方式，但不依赖 Anthropic 的服务。
    19|
    20|对于不想被锁定在某个 AI 厂商生态的开发者来说，OpenCode 是最灵活的选择。它支持 OpenRouter、Anthropic、OpenAI、本地模型等多种后端，可以根据任务类型随时切换。
    21|
    22|## 安装与部署
    23|
    24|### 系统要求
    25|
    26|- Node.js 18+ 或 Go 1.21+
    27|- macOS、Linux、Windows (WSL)
    28|
    29|### 安装方式一：npm
    30|
    31|```bash
    32|# 全局安装
    33|npm i -g opencode-ai@latest
    34|
    35|# 验证安装
    36|opencode --version
    37|```
    38|
    39|### 安装方式二：Homebrew (macOS)
    40|
    41|```bash
    42|brew install anomalyco/tap/opencode
    43|
    44|# 验证安装
    45|opencode --version
    46|```
    47|
    48|### 安装方式三：Go
    49|
    50|```bash
    51|go install github.com/opencode-ai/opencode@latest
    52|```
    53|
    54|### 配置 Provider
    55|
    56|OpenCode 支持多个 Provider，选择一个即可：
    57|
    58|**使用 OpenRouter（推荐，聚合多个模型）：**
    59|
    60|```bash
    61|# 获取 API Key：https://openrouter.ai/keys
    62|export OPENROUTER_API_KEY=sk-or-...xxxx
    63|```
    64|
    65|**使用 Anthropic：**
    66|
    67|```bash
    68|# 获取 API Key：https://console.anthropic.com
    69|export ANTHROPIC_API_KEY=sk-ant...xxxx
    70|```
    71|
    72|**使用 OpenAI：**
    73|
    74|```bash
    75|# 获取 API Key：https://platform.openai.com/api-keys
    76|export OPENAI_API_KEY=***
    77|```
    78|
    79|**使用本地模型（Ollama）：**
    80|
    81|```bash
    82|# 先安装 Ollama：https://ollama.ai
    83|ollama pull llama3
    84|export OLLAMA_HOST=http://localhost:11434
    85|```
    86|
    87|### 配置文件
    88|
    89|可以在项目根目录创建 `.opencode.json` 配置文件：
    90|
    91|```json
    92|{
    93|  "provider": "openrouter",
    94|  "model": "anthropic/claude-3.5-sonnet",
    95|  "temperature": 0.7
    96|}
    97|```
    98|
    99|### 验证安装
   100|
   101|```bash
   102|# 测试是否正常工作
   103|opencode run "Say hello"
   104|```
   105|
   106|## 核心功能
   107|
   108|### 多 Provider 支持
   109|
   110|OpenCode 支持多种 LLM 后端，这是它最大的特色：
   111|
   112|- **OpenRouter**：聚合多个模型，一个 API Key 用所有模型
   113|- **Anthropic**：Claude 系列，代码理解最强
   114|- **OpenAI**：GPT 系列，推理能力突出
   115|- **本地模型**：Ollama、LM Studio 等，免费无限制
   116|
   117|不同任务用不同模型：
   118|
   119|```bash
   120|# 写前端用 Claude
   121|OPENROUTER_API_KEY=xxx opencode run "写一个 React 组件"
   122|
   123|# 算法题用 GPT-4o
   124|OPENAI_API_KEY=xxx opencode run "实现一个红黑树"
   125|
   126|# 本地模型免费跑
   127|OLLAMA_HOST=http://localhost:11434 opencode run "解释这段代码"
   128|```
   129|
   130|### TUI 交互
   131|
   132|```bash
   133|$ opencode
   134|╭─────────────────────────────────────╮
   135|│ OpenCode                            │
   136|│ Provider: openrouter                │
   137|│ Model: anthropic/claude-3.5-sonnet  │
   138|╰─────────────────────────────────────╯
   139|
   140|> 帮我分析这个项目的架构
   141|
   142|# OpenCode 会：
   143|# 1. 扫描项目结构
   144|# 2. 分析依赖关系
   145|# 3. 生成架构图
   146|# 4. 给出优化建议
   147|```
   148|
   149|### 一次性执行
   150|
   151|```bash
   152|opencode run "给 UserController 加一个分页查询接口"
   153|opencode run "为这个函数写单元测试"
   154|opencode run "把这段代码改成 async/await 风格"
   155|```
   156|
   157|### PR Review
   158|
   159|OpenCode 内置 PR Review 能力：
   160|
   161|```bash
   162|# Review 指定 PR
   163|opencode pr 42
   164|
   165|# Review 当前分支的 diff
   166|git diff main | opencode run "Review this diff"
   167|```
   168|
   169|### Session 管理
   170|
   171|OpenCode 支持 Session 管理，可以保存和恢复对话上下文：
   172|
   173|```bash
   174|# 列出所有 Session
   175|opencode sessions list
   176|
   177|# 恢复某个 Session
   178|opencode sessions resume <session-id>
   179|
   180|# 删除 Session
   181|opencode sessions delete <session-id>
   182|```
   183|
   184|### 思考过程可见
   185|
   186|OpenCode 会展示 AI 的思考过程，让你了解它是如何分析和解决问题的：
   187|
   188|```text
   189|> 实现一个 LRU Cache
   190|
   191|[思考] LRU Cache 需要 O(1) 的 get 和 put 操作...
   192|[思考] 使用 HashMap + 双向链表实现...
   193|[分析] HashMap 存储 key -> node 映射...
   194|[分析] 双向链表维护访问顺序...
   195|
   196|[代码] class LRUCache { ... }
   197|```
   198|
   199|## 使用场景
   200|
   201|### 灵活选模型
   202|
   203|不同任务用不同模型，这是 OpenCode 的核心优势：
   204|
   205|```bash
   206|# 前端开发用 Claude（代码理解强）
   207|OPENROUTER_API_KEY=xxx opencode run "写一个 Vue 3 表单组件"
   208|
   209|# 算法题用 GPT-4o（推理能力强）
   210|OPENAI_API_KEY=xxx opencode run "实现一个 B+ 树"
   211|
   212|# 日常任务用本地模型（免费）
   213|OLLAMA_HOST=http://localhost:11434 opencode run "写一个 Shell 脚本"
   214|```
   215|
   216|### PR Review
   217|
   218|```bash
   219|opencode pr 42
   220|# 自动分析 PR 的代码质量、安全性、性能问题
   221|```
   222|
   223|### 不绑定厂商
   224|
   225|如果你不想被锁定在某个 AI 厂商生态，OpenCode 是最佳选择。随时可以切换 Provider，不需要改工作流。
   226|
   227|### 本地模型开发
   228|
   229|```bash
   230|# 用 Ollama 本地模型，完全免费
   231|ollama pull codellama:34b
   232|OLLAMA_HOST=http://localhost:11434 opencode run "重构这个模块"
   233|```
   234|
   235|## 优势
   236|
   237|1. **Provider 无关**：不绑定任何 AI 厂商，自由切换
   238|2. **开源免费**：Agent 本身免费，费用取决于 Provider
   239|3. **PR Review**：内置代码审查能力
   240|4. **思考过程可见**：了解 AI 的分析过程
   241|5. **灵活切换**：根据任务类型切换最优模型
   242|6. **本地模型支持**：可用 Ollama 完全免费使用
   243|7. **Session 管理**：保存和恢复对话上下文
   244|
   245|## 定价
   246|
   247|OpenCode 本身免费开源，费用取决于你选择的 LLM Provider：
   248|
   249|| Provider | 价格参考 |
   250||----------|----------|
   251|| OpenRouter | 按模型计费，见 openrouter.ai/pricing |
   252|| Anthropic | Sonnet: $3/M 输入，$15/M 输出 |
   253|| OpenAI | GPT-4o: $2.5/M 输入，$10/M 输出 |
   254|| Ollama | 完全免费 |
   255|
   256|## 不足
   257|
   258|- 没有浏览器能力，无法操作 Web 页面
   259|- 没有 MCP 支持，无法接入外部工具
   260|- 多 Agent 协作能力较弱，没有子 Agent 编排
   261|- 跨会话记忆较弱，没有持久记忆机制
   262|- 对超大型项目的支持还有提升空间
   263|- 文档相对较少，社区还在成长
   264|
   265|---
   266|
   267|> OpenCode 适合不想绑定某个 Provider、想用任意模型的开发者。它是 Claude Code 的开源替代品，也是本地模型开发的最佳选择。
   268|


---

<div class="disclaimer">

**免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。

</div>
