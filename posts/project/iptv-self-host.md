---
title: "自建 IPTV 直播源：从零搭建个人电视直播服务"
date: 2026-07-17
tags:
  - IPTV
  - 自托管
  - Docker
  - LunaTV
categories:
  - 项目实战
description: 详细介绍如何使用 iptv-api 自建 IPTV 直播源，从配置到 LunaTV 播放的完整流程。 
---

# 自建 IPTV 直播源：从零搭建个人电视直播服务

## 为什么要自建

市面上看电视的方案无非几种：

| 方案 | 问题 |
|------|------|
| 运营商 IPTV | 绑定宽带，只有家里的机顶盒能看，不能手机/Pad 看 |
| 电视直播 App | 广告多、源不稳定、动不动失效 |
| 网页直播 | 画质差、需要专门 App、手机兼容性不好 |

自建 IPTV 直播源可以解决这些问题：**一个稳定的 M3U 列表，所有设备都能看，不受平台限制。**

## 工具选择

选用的是 [Guovin/iptv-api](https://github.com/Guovin/iptv-api)（24k+ stars），它是目前最成熟的自建方案：

- 自动从多个公开源采集频道
- 支持频道模板（想要哪些台自己定）
- 可跳过测速（在有稳定源的情况下省时间）
- 输出标准 M3U/TXT 格式
- 自带 HTTP 服务，播放器直接拉取

有 Docker 版和 Windows GUI 版两种部署方式。

## 部署方式

### Windows GUI 版（推荐给非服务器环境）

iptv-api 提供了打包好的 exe，解压即用：

```
D:\tools\ai_zha\iptv-api-gui\
├── IPTV-API-v2.0.7.exe      # 主程序
├── config/
│   ├── config.ini           # 核心配置
│   ├── demo.txt             # 频道模板（想要哪些台）
│   ├── subscribe.txt        # 在线订阅源 URL
│   └── local.txt            # 本地源 URL
└── output/                  # 生成的 M3U 结果
```

双击exe启动即可，有可视化界面，使用门槛最低。

### Docker 版（适合长期运行）

```yaml
services:
  iptv-api:
    image: guovern/iptv-api:latest
    container_name: iptv-api
    restart: unless-stopped
    ports:
      - "5180:8080"
    volumes:
      - ./config:/iptv-api/config
      - ./output:/iptv-api/output
    environment:
      - update_mode=interval
      - update_interval=12
```

访问 `http://localhost:5180/m3u` 获取结果。

## 配置要点

### 频道模板（demo.txt）

这是核心——决定要什么频道。格式是按分组排列：

```
央视,#genre#
CCTV-1
CCTV-2
CCTV-3
CCTV-4
CCTV-5
CCTV-6
CCTV-7
CCTV-8
CCTV-9
CCTV-10
CCTV-11
CCTV-12
CCTV-13
CCTV-14
CCTV-15
CCTV-16
CCTV-17

卫视频道,#genre#
湖南卫视
浙江卫视
江苏卫视
东方卫视
北京卫视
广东卫视
深圳卫视

数字频道,#genre#
CHC高清电影
新视觉
劲爆体育
```

iptv-api 会从所有订阅源中搜索这些频道，采集可用的播放地址。

### 核心配置（config.ini）

```
# 跳过测速（有稳定源时建议关掉，省时间）
open_speed_test = False
open_filter_resolution = False
open_filter_speed = False

# 不匹配分类时保留到"其他"分组
open_unmatch_category = True

# 每12小时自动更新
update_mode = interval
update_interval = 12

# HTTP 服务端口
app_port = 5180

# 如使用代理拉取源
http_proxy = http://127.0.0.1:7890
```

### 订阅源（subscribe.txt）

这里填公开的 M3U 源地址，iptv-api 会从这些源里采集频道：

```
https://iptv-org.github.io/iptv/index.m3u
https://raw.githubusercontent.com/某个维护者/源/master/result.m3u
```

### 本地源（local.txt）

如果有一些自己收集的 M3U 链接，可以写在 local.txt 里，优先级高于订阅源：

```
http://example.com/自己收集的源.m3u
```

## 对接 LunaTV

LunaTV 是一个自托管的电视/视频聚合平台，支持 Docker 部署。

### 配置直播源

LunaTV 使用 Kvrocks（Redis 兼容）存储配置。通过 API 添加直播源：

```bash
# 添加 M3U 源
curl -X POST http://localhost:3000/api/admin/live \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "key": "my_iptv",
    "name": "自建直播源",
    "url": "http://host.docker.internal:5180/m3u"
  }'
```

其中 `host.docker.internal` 是 Docker 容器访问宿主机的地址。

### 启用网页直播

LunaTV 默认不开直播功能，需要在 Redis 中开启：

```bash
# 获取当前配置
docker exec lunatv-kvrocks redis-cli GET admin:config > config.json

# 修改 EnableWebLive 为 true
# 重新写回
cat config.json | docker exec -i lunatv-kvrocks redis-cli -x SET admin:config

# 重启 LunaTV
docker restart lunatv
```

## 使用体验

### 播放端

| 设备 | 方案 |
|------|------|
| Windows | PotPlayer / VLC，直接打开 M3U 链接 |
| 手机 | LunaTV 的 Web 界面或 Selene App |
| 电视/盒子 | 支持 M3U 的播放器 |

PotPlayer 播放效果最好，支持硬解和倍速，遇到需要 Referer 防盗链的源也能通过 `#EXTVLCOPT` 指令处理。

### 源管理原则

经过实践，源管理有一个经验：**不要混用 API 和配置文件的修改方式**。

最佳做法是：
1. **配置文件的源**（ConfigFile 方式）：只读不写，用 JSON 文件定义
2. **API/按钮添加的源**：通过界面管理，可自由删改
3. 需要换源时，先记下旧源 URL，删了再加新的

这样避免了源配置冲突导致的丢失问题。

## 一些踩坑记录

### 端口被占用

Docker 绑定的端口可能被 Windows 的 `netsh portproxy` 规则占用，导致容器反复重启。排查方法：

```bash
# Windows 侧查端口占用
netsh interface portproxy show all
# 删除残留规则
netsh interface portproxy delete v4tov4 listenport=18080
```

### 浏览器播不了 m3u8

LunaTV 的 Web 播放器依赖 hls.js，某些版本可能不支持。这不是源的问题——用 PotPlayer 或 VLC 就能播。

### 部分源有地区限制

- 运营商内网 IP 的源（如 `120.196.x.x:8088`）只有对应宽带能连
- 部分 CDN 源校验 Referer，需要播放器带上正确的请求头
- 有些源含时效 Token，需要定期刷新

## 总结

自建 IPTV 直播源的投入很小（一个 Docker 容器 + 几份配置文件），回报却很实在：

- 所有设备都能看电视，不受平台限制
- 频道列表自己控制，想加什么加什么
- 没有广告，不用看 App 的强制推送

如果你已经有 WSL + Docker 环境，部署 iptv-api 只需要十几分钟。之后就是按需调整频道模板，让它自动采集即可。

---

> **提示：** 本文介绍的是技术方案和工具使用，提供的订阅源地址均为公开的 iptv-org 源。请遵守相关法律法规，仅用于个人学习和研究。
