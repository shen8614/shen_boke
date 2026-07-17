---
title: "RSS 自建阅读体系：告别算法，掌握信息流"
date: 2026-07-17
tags:
  - RSS
  - FreshRSS
  - RSSHub
  - 自托管
  - 效率
categories:
  - 技术学习
description: 为什么要用 RSS、如何自建阅读服务，以及怎样订阅那些没有提供 RSS 的网站。
---

# RSS 自建阅读体系：告别算法，掌握信息流

## 为什么 RSS

你可能觉得 RSS 是个过时的东西。但在 2026 年，各大平台的信息茧房越来越严重，RSS 反而更有价值。

### 现状问题

| 渠道 | 问题 |
|------|------|
| 微信订阅号 | 封闭生态，只能看推送，信息茧房 |
| 今日头条/抖音 | 算法推荐，你看到的是平台想让你看到的 |
| 微博/知乎 | 信息流混杂广告和推广，时间线不可控 |

这些平台的商业模式是抢占你的注意力，而不是帮你高效获取信息。RSS 的哲学正相反——**你决定看什么**。

### RSS 的优势

1. **去算法化**：内容严格按时间排序，没有算法插手的空间
2. **聚合性**：一个界面看所有关注的博客、新闻、论坛，不用切十几个 App
3. **私密**：没有跟踪、没有用户画像
4. **去中心化**：不依赖任何平台，就算某个网站倒了，你的订阅列表还在

### 自建还是用托管

| 维度 | 自建（FreshRSS） | 托管服务（Feedly/Inoreader） |
|------|-----------------|------------------------------|
| 数据主权 | 全在自己服务器 | 数据在第三方 |
| 费用 | 免费（只花服务器电费） | 免费版有限制，Pro $5-15/月 |
| 隐私 | 完全私有 | 服务商会分析你的阅读习惯 |
| 维护 | 需要管 Docker | 不用管 |

如果你已经有 Docker 环境（比如 WSL），自建成本几乎为零。

## 搭建 RSS 服务

### FreshRSS——阅读器本体

[FreshRSS](https://freshrss.org/) 是开源的自托管 RSS 阅读器，够轻量，功能也够。

部署（Docker Compose）：

```yaml
services:
  freshrss:
    image: freshrss/freshrss:latest
    container_name: freshrss
    restart: unless-stopped
    ports:
      - "18080:80"
    volumes:
      - ./data:/var/www/FreshRSS/data
      - ./extensions:/var/www/FreshRSS/extensions
    environment:
      CRON_MIN: '*/30'
```

启动后访问 `http://localhost:18080`，设好管理员账号就能用了。

### RSSHub——把一切变成 RSS

[RSSHub](https://rsshub.app/) 是一个开源的内容聚合器，能把几乎所有网站的内容转为 RSS。它是解决"这个网站没有提供 RSS"的关键。

支持的源类型：

- 社交媒体：Twitter、微博、B站、知乎、小红书
- 新闻媒体：多数新闻网站
- 论坛：V2EX、NGA、贴吧
- 视频平台：YouTube、B站、抖音
- 代码平台：GitHub Releases、Commits

部署：

```yaml
services:
  rsshub:
    image: diygod/rsshub:latest
    container_name: rsshub
    restart: unless-stopped
    ports:
      - "1200:1200"
```

启动后 `http://localhost:1200` 就是你的私有 RSSHub。

## 怎么订阅没有 RSS 的网站

这是 RSS 自建最核心的技能。按推荐程度排序：

### 方案一：用 RSSHub 现成路由

对于大多数常见网站，RSSHub 已有现成路由。直接在 FreshRSS 里添加即可：

```
http://localhost:1200/bilibili/user/video/UP主UID
http://localhost:1200/zhihu/column/专栏ID
http://localhost:1200/weibo/user/微博UID
http://localhost:1200/github/release/owner/repo
http://localhost:1200/jianshu/user/用户ID
```

RSSHub 的路由列表很全，大部分场景到这里就够用了。

### 方案二：自写爬虫脚本生成 RSS

当 RSSHub 也没有覆盖（比如小众论坛、无 API 的老站），自己写一个 Python 脚本定期抓取，输出 RSS XML，让 FreshRSS 来拉取。

基本思路：

```python
# 伪代码示例
import requests
from bs4 import BeautifulSoup
from feedgen.feed import FeedGenerator

def fetch_and_generate_feed():
    html = requests.get('https://目标网站.com')
    soup = BeautifulSoup(html.text, 'html.parser')
    
    fg = FeedGenerator()
    fg.title('目标网站 RSS')
    fg.link(href='https://目标网站.com')
    
    for item in soup.select('.article-list a'):
        fg.add_entry()
        fg.entry.title(item.text)
        fg.entry.link(href=item['href'])
    
    fg.rss_file('/path/to/output/feed.xml')
```

实现后挂到 cron 定时执行，产生的 XML 文件通过 nginx 或 Python HTTP 暴露出去，FreshRSS 订阅这个 URL 即可。

这个方案也复用了我们之前在爬虫项目中的经验——同样是抓取、解析、输出标准格式，只不过这次输出的是 RSS 而非 M3U。

## 使用建议

### 文件夹分类

```
📂 技术博客
   ├── 个人博客（阮一峰、酷壳等）
   ├── 团队博客（Vercel、Cloudflare 等）
   └── 新闻聚合（Hacker News、Reddit 编程版）
📂 科技资讯（36氪、少数派等）
📂 社交动态（B站关注、GitHub 关注）
```

### 与 Telegram 配合

FreshRSS 有 API 接口，配合 Hermes Agent 的 cron 定时任务，可以把未读摘要推送到 Telegram，实现"每天早上看精选"的效果。

## 总结

自建 RSS 的投入是一次性的，收益是长期的：

- 不再每天刷十几个网站
- 不再被算法牵着走
- 数据完全属于自己

如果你有 WSL + Docker 环境，FreshRSS + RSSHub 这套组合值得一试。

---

> **小提示：** 如果只偶尔需要一两个无 RSS 的网站，先用 rsshub.app 公共实例，不够用了再自建。
