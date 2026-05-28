     1|---
     2|title: "Codex：OpenAI 的沙箱 Coding Agent"
     3|date: 2026-05-24
     4|tags:
     5|  - AI Agent
     6|  - Codex
     7|  - OpenAI
     8|categories:
     9|  - 技术学习
    10|description: 深入介绍 Codex 的核心功能、安装部署与使用体验。
    11|---
    12|
    13|# Codex：OpenAI 的沙箱 Coding Agent
    14|
    15|> 官网：[https://openai.com/index/codex](https://openai.com/index/codex) / [https://platform.openai.com](https://platform.openai.com)
    16|
    17|## 简介
    18|
    19|Codex 是 OpenAI 的终端 Coding Agent，基于 codex-1 模型（o3 微调版）。它的核心特色是"沙箱安全执行"——所有命令都在隔离的沙箱中运行，不会影响本地环境。
    20|
    21|Codex 的推理能力非常强，特别适合处理复杂的算法和逻辑问题。`codex exec --full-auto` 模式能自动完成从零到一的项目搭建，沙箱隔离保证不影响本地环境。
    22|
    23|## 安装与部署
    24|
    25|### 系统要求
    26|
    27|- Node.js 18+
    28|- npm
    29|- macOS、Linux（Windows 推荐 WSL）
    30|
    31|### 安装
    32|
    33|```bash
    34|# 全局安装
    35|npm install -g @openai/codex
    36|
    37|# 验证安装
    38|codex --version
    39|```
    40|
    41|### 认证方式一：API Key
    42|
    43|```bash
    44|# 设置环境变量
    45|export OPENAI_API_KEY=sk-xxx...xxxx
    46|
    47|# 或写入 shell 配置文件
    48|echo 'export OPENAI_API_KEY=sk-xxx...xxxx' >> ~/.bashrc
    49|source ~/.bashrc
    50|```
    51|
    52|API Key 获取方式：访问 https://platform.openai.com → API Keys → Create new secret key
    53|
    54|### 认证方式二：OAuth 登录
    55|
    56|```bash
    57|# 交互式登录
    58|codex login
    59|
    60|# 按提示完成 OAuth 授权
    61|```
    62|
    63|### 验证安装
    64|
    65|```bash
    66|# 测试是否正常工作
    67|codex -p "Say hello"
    68|
    69|# 或者用 exec 模式
    70|codex exec "Create a hello world Python script"
    71|```
    72|
    73|## 核心功能
    74|
    75|### 沙箱执行
    76|
    77|Codex 的所有命令都在沙箱中运行，这是它最大的特色：
    78|
    79|- **文件操作**：在隔离目录进行，不影响本地文件系统
    80|- **Shell 命令**：在沙箱容器中执行，无法访问本地环境
    81|- **网络访问**：受限，只能访问必要的依赖源
    82|- **进程隔离**：无法看到或影响本地进程
    83|
    84|这意味着你可以在生产服务器上安全地使用 Codex，不用担心它误操作本地文件。
    85|
    86|### 一次性执行（exec）
    87|
    88|`codex exec` 支持一次性任务执行，完成后自动退出：
    89|
    90|```bash
    91|# 创建项目
    92|codex exec "用 FastAPI 搭一个带 JWT 认证的用户管理系统"
    93|
    94|# 生成代码
    95|codex exec "实现一个 LRU Cache，要求 O(1) 的 get 和 put 操作"
    96|
    97|# 分析代码
    98|codex exec "分析这个项目的依赖关系，找出潜在的安全漏洞"
    99|```
   100|
   101|### 交互式 PTY
   102|
   103|支持交互式终端，可以持续对话：
   104|
   105|```bash
   106|$ codex
   107|╭─────────────────────────────────────╮
   108|│ Codex CLI                           │
   109|│ Type /help for commands             │
   110|╰─────────────────────────────────────╯
   111|
   112|> 帮我分析这个项目的架构
   113|
   114|# Codex 会：
   115|# 1. 扫描项目结构
   116|# 2. 分析依赖关系
   117|# 3. 生成架构图
   118|# 4. 给出优化建议
   119|```
   120|
   121|### full-auto 模式
   122|
   123|全自动模式，不需要任何确认：
   124|
   125|```bash
   126|codex exec --full-auto "重构这个模块，把回调改成 async/await"
   127|```
   128|
   129|Codex 会自动完成所有操作，包括修改文件、运行测试、修复错误。
   130|
   131|### yolo 模式
   132|
   133|跳过所有安全检查，最快执行：
   134|
   135|```bash
   136|codex exec --yolo "快速原型验证"
   137|```
   138|
   139|适合快速验证想法，不建议在正式项目中使用。
   140|
   141|### 并行 worktree
   142|
   143|支持 Git worktree 并行执行多个任务：
   144|
   145|```bash
   146|# 在不同 worktree 中并行执行
   147|codex exec --worktree feature-a "实现功能 A"
   148|codex exec --worktree feature-b "实现功能 B"
   149|codex exec --worktree bugfix-c "修复 Bug C"
   150|```
   151|
   152|每个任务在独立的 worktree 中执行，互不干扰。
   153|
   154|## 使用场景
   155|
   156|### 快速原型
   157|
   158|```bash
   159|codex exec --full-auto "用 FastAPI 搭一个带 JWT 认证的用户管理系统"
   160|# Codex 会自动：
   161|# 1. 创建项目结构
   162|# 2. 安装依赖
   163|# 3. 编写代码
   164|# 4. 配置数据库
   165|# 5. 写测试
   166|# 6. 生成文档
   167|```
   168|
   169|### 算法题
   170|
   171|Codex 的推理能力在处理算法题时特别强：
   172|
   173|```bash
   174|codex -p "实现一个 LRU Cache，要求 O(1) 的 get 和 put 操作"
   175|codex -p "实现一个支持通配符的正则表达式匹配器"
   176|codex -p "实现一个跳表（Skip List）数据结构"
   177|```
   178|
   179|### 安全敏感场景
   180|
   181|沙箱执行保证不影响本地环境，适合在生产服务器上执行任务：
   182|
   183|```bash
   184|# 在生产服务器上安全分析日志
   185|codex exec "分析 /var/log/app.log，找出异常请求"
   186|
   187|# 安全地测试配置
   188|codex exec "测试这个 Nginx 配置是否正确"
   189|```
   190|
   191|### 代码分析
   192|
   193|```bash
   194|codex exec "分析这个项目的代码质量，找出潜在的 Bug"
   195|codex exec "生成这个项目的 API 文档"
   196|codex exec "分析这个项目的性能瓶颈"
   197|```
   198|
   199|## 优势
   200|
   201|1. **沙箱安全执行**：不影响本地环境，可在生产环境使用
   202|2. **推理能力强**：codex-1 模型在复杂逻辑任务上表现突出
   203|3. **并行 worktree**：支持多任务并行执行
   204|4. **快速原型**：full-auto 模式能自动完成从零到一的项目搭建
   205|5. **yolo 模式**：最快执行速度
   206|6. **OpenAI 生态**：与 OpenAI 其他服务无缝集成
   207|
   208|## 定价
   209|
   210|| 方案 | 价格 | 内容 |
   211||------|------|------|
   212|| Free | 有限免费 | 基础功能 |
   213|| API | 按 token 计费 | 使用 codex-1 模型 |
   214|
   215|API 费用参考 OpenAI 官网：https://platform.openai.com/pricing
   216|
   217|## 不足
   218|
   219|- 沙箱限制了灵活性，某些需要本地环境的操作无法执行
   220|- 没有 MCP 支持，无法接入外部工具
   221|- 没有浏览器能力，无法操作 Web 页面
   222|- 跨会话记忆较弱，没有持久记忆机制
   223|- 没有子 Agent 编排能力
   224|- Windows 原生支持不好，推荐 WSL
   225|
   226|---
   227|
   228|> Codex 适合需要沙箱安全执行、处理推理密集型任务的开发者。如果你是 OpenAI 生态用户，这是最佳选择。
   229|


---

<div class="disclaimer">

**免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。

</div>
