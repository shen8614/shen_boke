     1|---
     2|title: "Hermes Agent：全功能自治代理框架"
     3|date: 2026-05-24
     4|tags:
     5|  - AI Agent
     6|  - Hermes
     7|  - 自动化
     8|categories:
     9|  - 技术学习
    10|description: 深入介绍 Hermes Agent 的核心功能、安装部署与使用体验。
    11|---
    12|
    13|# Hermes Agent：全功能自治代理框架
    14|
    15|> 官网：[https://github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) / [文档](https://hermes-agent.nousresearch.com/docs)
    16|
    17|## 简介
    18|
    19|Hermes Agent 是 Nous Research 开发的开源 AI Agent 框架，不只是 Coding Agent——它是一个全功能的自治代理，支持终端、消息平台、定时任务等。它的目标是"让 AI 成为你的数字分身"。
    20|
    21|与其他 Coding Agent 不同，Hermes Agent 的能力远超代码编写。它能跑在 Telegram、Discord、Slack、QQ、微信等 10 多个消息平台上，内置 Cron 定时任务调度，有完整的持久记忆系统和技能库。支持 20+ LLM Provider，不绑定任何 AI 厂商。
    22|
    23|## 安装与部署
    24|
    25|### 系统要求
    26|
    27|- Python 3.10+
    28|- macOS、Linux、Windows (WSL)
    29|- Git
    30|
    31|### 一键安装
    32|
    33|```bash
    34|curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
    35|```
    36|
    37|安装脚本会自动：
    38|1. 检查系统依赖
    39|2. 下载 Hermes Agent
    40|3. 创建虚拟环境
    41|4. 安装依赖
    42|5. 配置 PATH
    43|
    44|### 手动安装
    45|
    46|```bash
    47|# 克隆仓库
    48|git clone https://github.com/NousResearch/hermes-agent.git
    49|cd hermes-agent
    50|
    51|# 创建虚拟环境
    52|python3 -m venv .venv
    53|source .venv/bin/activate
    54|
    55|# 安装依赖
    56|pip install -e .
    57|
    58|# 验证安装
    59|hermes --version
    60|```
    61|
    62|### 配置 Provider
    63|
    64|Hermes Agent 支持 20+ Provider，选择一个即可：
    65|
    66|**使用 DeepSeek（推荐，性价比高）：**
    67|
    68|```bash
    69|hermes config set provider deepseek
    70|hermes config set deepseek.api_key ***
    71|```
    72|
    73|**使用 OpenRouter（聚合多个模型）：**
    74|
    75|```bash
    76|hermes config set provider openrouter
    77|hermes config set openrouter.api_key sk-or-...xxxx
    78|```
    79|
    80|**使用 Anthropic：**
    81|
    82|```bash
    83|hermes config set provider anthropic
    84|hermes config set anthropic.api_key sk-ant...xxxx
    85|```
    86|
    87|**使用本地模型（Ollama）：**
    88|
    89|```bash
    90|# 先安装 Ollama
    91|ollama pull llama3
    92|
    93|hermes config set provider ollama
    94|hermes config set ollama.model llama3
    95|hermes config set ollama.host http://localhost:11434
    96|```
    97|
    98|### 配置消息平台
    99|
   100|**Telegram Bot：**
   101|
   102|```bash
   103|# 1. 在 Telegram 中找 @BotFather
   104|# 2. 发送 /newbot 创建 Bot
   105|# 3. 获取 Bot Token
   106|
   107|hermes config set telegram.token BOT_TOKEN
   108|hermes config set telegram.allowed_users YOUR_USER_ID
   109|```
   110|
   111|**Discord Bot：**
   112|
   113|```bash
   114|# 1. 访问 https://discord.com/developers/applications
   115|# 2. 创建 Application → Bot → 获取 Token
   116|
   117|hermes config set discord.token BOT_TOKEN
   118|```
   119|
   120|**QQ Bot：**
   121|
   122|```bash
   123|# 需要 QQ 开放平台的 Bot 凭证
   124|hermes config set qq.token BOT_TOKEN
   125|hermes config set qq.secret BOT_SECRET
   126|```
   127|
   128|### 验证安装
   129|
   130|```bash
   131|# 检查配置
   132|hermes config list
   133|
   134|# 测试对话
   135|hermes "Say hello"
   136|
   137|# 查看已安装的技能
   138|hermes skills list
   139|```
   140|
   141|## 核心功能
   142|
   143|### 终端交互
   144|
   145|```bash
   146|$ hermes
   147|╭─────────────────────────────────────╮
   148|│ Hermes Agent                        │
   149|│ Provider: deepseek                  │
   150|│ Model: deepseek-chat                │
   151|│ Memory: 47 entries                  │
   152|│ Skills: 12 loaded                   │
   153|╰─────────────────────────────────────╯
   154|
   155|> 帮我分析这个项目的架构
   156|
   157|# Hermes 会：
   158|# 1. 扫描项目结构
   159|# 2. 分析依赖关系
   160|# 3. 生成架构图
   161|# 4. 保存到记忆中
   162|```
   163|
   164|### 消息平台网关
   165|
   166|同一个 Agent 能跑在多个消息平台上，这是 Hermes 最独特的功能：
   167|
   168|```bash
   169|# 启动 Telegram 网关
   170|hermes gateway start telegram
   171|
   172|# 启动 Discord 网关
   173|hermes gateway start discord
   174|
   175|# 同时启动多个
   176|hermes gateway start telegram,discord,qq
   177|```
   178|
   179|在 Telegram 中直接和 AI 对话，它会记住你的偏好，下次在 Discord 中继续对话时还记得。
   180|
   181|### 持久记忆
   182|
   183|Hermes Agent 有完整的持久记忆系统，跨会话保留信息：
   184|
   185|```bash
   186|# 查看记忆
   187|hermes memory list
   188|
   189|# 手动添加记忆
   190|hermes memory add "用户偏好：简洁风格，不要啰嗦"
   191|
   192|# 记忆自动保存的内容：
   193|# - 用户偏好（语言、风格、习惯）
   194|# - 环境信息（OS、路径、工具）
   195|# - 操作经验（解决问题的方法）
   196|```
   197|
   198|### 技能系统
   199|
   200|技能是 Hermes Agent 的"程序性记忆"，可复用的工作流：
   201|
   202|```bash
   203|# 查看可用技能
   204|hermes skills list
   205|
   206|# 加载技能
   207|hermes skills load github-pr-workflow
   208|
   209|# 技能包含：
   210|# - 触发条件
   211|# - 执行步骤
   212|# - 精确命令
   213|# - 踩坑经验
   214|```
   215|
   216|### Cron 定时任务
   217|
   218|内置定时任务调度：
   219|
   220|```bash
   221|# 每天早上 9 点推送 GitHub Issues 摘要
   222|hermes cron create "0 9 * * 1-5" --prompt "查看 GitHub Issues 并在 Telegram 推送摘要"
   223|
   224|# 每周日跑测试
   225|hermes cron create "0 10 * * 0" --prompt "运行项目测试并报告结果"
   226|
   227|# 每小时检查服务器状态
   228|hermes cron create "0 * * * *" --prompt "检查服务器磁盘和内存使用情况"
   229|
   230|# 管理定时任务
   231|hermes cron list
   232|hermes cron pause <job-id>
   233|hermes cron remove <job-id>
   234|```
   235|
   236|### 子 Agent 编排
   237|
   238|```bash
   239|# 委托任务给子 Agent
   240|hermes delegate "分析项目架构并生成文档"
   241|
   242|# Hermes 会自动拆分为多个子任务：
   243|# 1. 扫描项目结构
   244|# 2. 分析依赖关系
   245|# 3. 生成架构文档
   246|# 4. 整合结果
   247|```
   248|
   249|### MCP 原生支持
   250|
   251|```bash
   252|# 在配置中添加 MCP servers
   253|hermes config set mcp.servers.github.command npx
   254|hermes config set mcp.servers.github.args "@modelcontextprotocol/server-github"
   255|
   256|hermes config set mcp.servers.postgres.command npx
   257|hermes config set mcp.servers.postgres.args "@modelcontextprotocol/server-postgres"
   258|```
   259|
   260|### 浏览器能力
   261|
   262|通过 CDP 协议控制浏览器：
   263|
   264|```bash
   265|hermes browser open "https://github.com"
   266|hermes browser screenshot
   267|hermes browser click "button.submit"
   268|hermes browser fill "input[name=email]" "test@example.com"
   269|```
   270|
   271|## 使用场景
   272|
   273|### 跨平台自动化
   274|
   275|```bash
   276|# 每天早上在 Telegram 推送 GitHub Issues 摘要
   277|hermes cron create "0 9 * * 1-5" --prompt "查看 GitHub Issues 并在 Telegram 推送摘要"
   278|
   279|# 周末自动跑测试
   280|hermes cron create "0 10 * * 0" --prompt "运行项目测试，失败就告警"
   281|```
   282|
   283|### 消息平台 Bot
   284|
   285|同一个 Agent 可以同时作为 Telegram Bot、Discord Bot、QQ Bot 运行。用户在任何平台问问题，AI 都能回答，而且共享记忆。
   286|
   287|### 代码编写
   288|
   289|```bash
   290|hermes
   291|> 给 UserController 加一个分页查询接口
   292|> 为这个接口写单元测试
   293|> 生成 API 文档
   294|```
   295|
   296|### 系统管理
   297|
   298|```bash
   299|hermes
   300|> 检查服务器磁盘空间，如果低于 20% 就告警
   301|> 分析 Nginx 日志，找出访问量最大的 URL
   302|> 监控 Docker 容器状态
   303|```
   304|
   305|### 研究助手
   306|
   307|```bash
   308|hermes
   309|> 搜索 arXiv 上关于 Transformer 的最新论文
   310|> 总结这篇论文的核心贡献
   311|> 生成文献综述
   312|```
   313|
   314|## 优势
   315|
   316|1. **平台覆盖最广**：10+ 消息平台，终端，定时任务
   317|2. **持久记忆**：跨会话保留用户偏好和操作经验
   318|3. **技能系统**：可复用的程序性记忆
   319|4. **Cron 调度**：内置定时任务，无需额外工具
   320|5. **MCP 原生支持**：可接入 GitHub、数据库、浏览器等外部工具
   321|6. **20+ Provider**：不绑定任何 AI 厂商
   322|7. **开源免费**：Agent 本身免费开源
   323|8. **浏览器能力**：CDP 协议控制浏览器
   324|9. **子 Agent 编排**：自动拆分复杂任务
   325|
   326|## 定价
   327|
   328|Hermes Agent 本身免费开源，费用取决于你选择的 LLM Provider：
   329|
   330|| Provider | 价格参考 |
   331||----------|----------|
   332|| DeepSeek | ¥1/百万输入 tokens，¥2/百万输出 tokens |
   333|| OpenRouter | 按模型计费，见 openrouter.ai/pricing |
   334|| Anthropic | Sonnet: $3/M 输入，$15/M 输出 |
   335|| Ollama | 完全免费 |
   336|
   337|## 不足
   338|
   339|- 配置相对复杂，需要配置 Provider、消息平台、技能等
   340|- 学习曲线较陡，功能太多需要时间熟悉
   341|- 消息平台配置需要各自申请 Bot Token
   342|- 文档还在完善中
   343|- 某些高级功能需要一定的技术背景
   344|
   345|---
   346|
   347|> Hermes Agent 适合需要全功能自治代理的开发者。如果你需要跨平台、持久记忆、定时任务、消息集成，这是唯一的选择。
   348|


---

<div class="disclaimer">

**免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。

</div>
