---
title: "WSL2 网络配置实战：代理、DNS、端口那些事"
date: 2026-07-17
tags:
  - WSL
  - 网络
  - 代理
  - Docker
  - Windows
categories:
  - 技术学习
description: WSL2 环境下代理配置、DNS 污染解决、端口转发、Docker 网络互通等实战经验总结。
---

# WSL2 网络配置实战：代理、DNS、端口那些事

## 前言

WSL2 的开发体验很好，但网络方面有不少坑。这篇文章总结我实际使用中遇到的各种网络问题和解决方案，包括代理配置、DNS 污染、端口转发、Docker 网络等。

## 代理配置

国内开发者访问 GitHub、npm、pip 等海外资源基本绕不开代理。

### 基础设置

WSL2 中通过环境变量配置代理：

```bash
# 假设 Windows 宿主机上 Clash/其他代理运行在 7890 端口
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
```

### WSL2 网络模式的变化

WSL2 默认使用 NAT 网络模式，WSL 的 IP 跟 Windows 不同。但在最新的 WSL2 中，可以启用 **mirrored 网络模式**，让 WSL 与宿主机共享 IP 地址：

```bash
# %USERPROFILE%\.wslconfig
[wsl2]
networkingMode=mirrored
dnsTunneling=true
firewall=false
autoProxy=true
```

启用 mirrored 模式后：
- WSL2 的 IP 与 Windows 宿主相同，`127.0.0.1` 直接互通
- 代理配置更简单，不需要关心 WSL 的虚拟 IP
- 端口自动映射，WSL 中启动的服务可以直接用 `localhost` 访问

配置完后重启 WSL：

```bash
wsl --shutdown
# 重新打开 WSL 终端
```

### 持久化代理配置

每次启动都手动 export 很烦。推荐在 `~/.bashrc` 或 `~/.zshrc` 中做条件判断：

```bash
# 检测代理端口是否可用，可用则设置
if nc -z 127.0.0.1 7890 2>/dev/null; then
    export http_proxy=http://127.0.0.1:7890
    export https_proxy=http://127.0.0.1:7890
    export no_proxy=localhost,127.0.0.1,.local
fi
```

这样只有代理在运行时才启用，避免代理不可用时连接被挂起。

### Git 代理

Git 有独立的代理配置：

```bash
# 设置 Git 的 HTTP 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# SSH 方式不受影响，不需要代理
```

如果只用 SSH 连 GitHub，Git 代理可以不配。

## DNS 污染问题

这是国内 WSL 用户最头疼的问题之一。表现是：浏览器能访问的网站，WSL 里 curl 却连不上。

### 现象

```bash
# 浏览器能打开，但 WSL 里……
curl https://某些网站.com
# 报错：Could not resolve host 或 Connection refused

# 检查 DNS 解析结果
nslookup 某些网站.com
# 可能返回 198.18.0.x 之类的异常 IP
```

### 原因

WSL2 的 DNS 请求经过 Windows 的 DNS 解析器时，某些域名被污染（返回错误的 IP 地址）。

### 解决方案

**方案一：使用公共 DNS**

修改 `/etc/resolv.conf`，但 WSL2 默认会覆盖这个文件。需要先阻止它自动生成：

```bash
# 禁止 WSL 自动生成 /etc/resolv.conf
sudo tee /etc/wsl.conf << EOF
[network]
generateResolvConf = false
EOF

# 然后手动设置 DNS
sudo tee /etc/resolv.conf << EOF
nameserver 8.8.8.8
nameserver 1.1.1.1
EOF

# 重启 WSL 生效
```

**方案二：通过代理访问**

对于被 DNS 污染的域名，走代理可以绕过本地 DNS 解析：

```bash
curl -x http://127.0.0.1:7890 https://被污染的网站.com
```

这是最省事的方案——配置好代理环境变量后，所有流量都走代理出去，DNS 解析也在代理端完成。

**方案三：在 Windows 上用 Python 跑**

对于某些极端情况（比如某些视频站点的 CDN 域名只在 Windows 的浏览器中才解析正常），直接在 Windows 的 Python 环境中运行脚本，不走 WSL。WSL 仅用于开发和测试。

```
WSL 适合: 开发、构建、git、Docker
Windows Python 适合: 需要访问被污染域名、爬虫
```

## Docker 网络

WSL2 + Docker Desktop 的网络有一些需要注意的地方。

### 宿主机访问容器

启动容器时映射端口：

```bash
docker run -p 8080:80 nginx
```

然后通过 `localhost:8080` 或 `127.0.0.1:8080` 访问。

### 容器访问宿主机

容器内部通过 `host.docker.internal` 访问 Windows 宿主机：

```bash
# 从容器内访问宿主机的某个服务
curl http://host.docker.internal:5180/m3u
```

### 端口占用排查

Docker 端口映射失败时，可能是 Windows 的 `netsh portproxy` 规则占用了端口：

```bash
# Windows 侧查看所有端口转发规则
netsh interface portproxy show all

# 删除某条规则
netsh interface portproxy delete v4tov4 listenport=18080

# 查看端口占用进程
netstat -ano | findstr :18080
```

这在 FreshRSS 等服务的部署中遇到过——之前设置的 portproxy 规则在重启后残留，导致 Docker 绑定失败，容器反复重启。删掉规则后一切正常。

### 多个容器互通

创建 Docker 网络，让容器在同一网络内：

```yaml
services:
  freshrss:
    networks:
      - selfhost

  rsshub:
    networks:
      - selfhost

networks:
  selfhost:
    driver: bridge
```

这样 FreshRSS 可以通过容器名 `rsshub` 访问 RSSHub，而不需要知道 IP。

## 性能优化

### 跨文件系统性能

WSL2 访问 Windows 文件系统（`/mnt/c/`、`/mnt/d/`）的性能远低于访问 Linux 原生文件系统（`/home/`、`/var/`）。

```bash
# 慢（跨文件系统）
cd /mnt/d/projects/myapp && npm install

# 快（Linux 原生文件系统）
cd ~/projects/myapp && npm install
```

**最佳实践：项目文件放 WSL 内（`~/projects/`），仅在需要时复制到 Windows。**

### 内存限制

WSL2 默认会吃大量内存，可以限制最大值：

```bash
# %USERPROFILE%\.wslconfig
[wsl2]
memory=8GB
processors=4
swap=2GB
```

## 常用诊断命令

```bash
# 查看 WSL 网络模式
ip addr show eth0

# 测试 DNS 解析
nslookup github.com

# 测试端口连通性
nc -zv 127.0.0.1 7890

# 查看监听端口
ss -tlnp

# 查看路由表
ip route

# 从 Windows 侧查看 WSL 网络
# PowerShell: wsl -d Ubuntu -e ip addr show
```

## 总结

WSL2 的网络问题看似复杂，但核心就几条原则：

1. **开启 mirrored 网络模式**——这是解决大部分网络互通问题的最简单方法
2. **配置好代理**——国内开发必备，同时解决 DNS 污染
3. **项目文件放 WSL 内**——获得最佳 IO 性能
4. **Docker 端口冲突查 portproxy**——不要跟 Windows 的端口转发规则打架

WSL2 是 Windows 下最好的 Linux 开发环境，以上配置一次后基本不用再折腾。

---

> **提示：** 文中提到的 `.wslconfig` 配置需要 WSL2 较新版本支持。如果某些参数不生效，请检查 Windows 版本和 WSL 更新状态。
