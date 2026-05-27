---
title: Git 常用命令速查
date: 2026-05-23
tags:
  - Git
  - 版本控制
  - 开发工具
categories:
  - 技术学习
description: Git 常用命令速查表，包含日常开发中最常用的 Git 操作。
---

# Git 常用命令速查

## Git 简介

Git 是一个分布式版本控制系统，用于跟踪文件变化、协调多人协作开发。它是目前最流行的版本控制工具。

![Git Logo](https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png)

## 基础配置

### 用户信息

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 查看配置

```bash
git config --list
```

## 仓库操作

### 初始化仓库

```bash
git init
```

### 克隆仓库

```bash
git clone https://github.com/user/repo.git
git clone git@github.com:user/repo.git  # SSH 方式
```

## 日常操作

### 查看状态

```bash
git status
git status -s  # 简洁模式
```

### 添加文件

```bash
git add file.txt      # 添加单个文件
git add .             # 添加所有变化
git add *.js          # 添加所有 JS 文件
```

### 提交更改

```bash
git commit -m "提交说明"
git commit -am "提交说明"  # 添加并提交已跟踪文件
```

### 查看日志

```bash
git log
git log --oneline      # 简洁模式
git log --graph        # 图形模式
git log -10            # 最近10条
```

## 分支管理

### 查看分支

```bash
git branch             # 本地分支
git branch -r          # 远程分支
git branch -a          # 所有分支
```

### 创建分支

```bash
git branch feature     # 创建分支
git checkout -b feature  # 创建并切换
git switch -c feature    # 新语法
```

### 切换分支

```bash
git checkout feature
git switch feature       # 新语法
```

### 合并分支

```bash
git merge feature
```

### 删除分支

```bash
git branch -d feature     # 删除已合并分支
git branch -D feature     # 强制删除
```

## 远程操作

### 查看远程

```bash
git remote -v
```

### 添加远程

```bash
git remote add origin https://github.com/user/repo.git
```

### 推送

```bash
git push origin main
git push -u origin main  # 设置上游分支
```

### 拉取

```bash
git pull
git pull origin main
```

### 获取

```bash
git fetch origin
```

## 撤销操作

### 撤销工作区修改

```bash
git checkout -- file.txt
git restore file.txt      # 新语法
```

### 撤销暂存

```bash
git reset HEAD file.txt
git restore --staged file.txt  # 新语法
```

### 撤销提交

```bash
git reset --soft HEAD~1   # 保留修改在暂存区
git reset --hard HEAD~1   # 丢弃修改
```

## 标签管理

### 查看标签

```bash
git tag
git tag -l "v1.*"
```

### 创建标签

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "版本 1.0.0"
```

### 推送标签

```bash
git push origin v1.0.0
git push origin --tags
```

## 暂存操作

### 暂存更改

```bash
git stash
git stash save "暂存说明"
```

### 查看暂存

```bash
git stash list
```

### 恢复暂存

```bash
git stash pop
git stash apply stash@{0}
```

### 删除暂存

```bash
git stash drop stash@{0}
git stash clear
```

## 常用技巧

### 查看文件差异

```bash
git diff                  # 工作区 vs 暂存区
git diff --cached         # 暂存区 vs 仓库
git diff HEAD             # 工作区 vs 仓库
```

### 查看某行修改

```bash
git blame file.txt
```

### 搜索

```bash
git grep "搜索内容"
```

### 清理未跟踪文件

```bash
git clean -n              # 预览
git clean -f              # 删除
```

## .gitignore 文件

```
# 编译文件
*.class
*.o
*.pyc

# 依赖目录
node_modules/
vendor/

# IDE 文件
.idea/
.vscode/
*.swp

# 系统文件
.DS_Store
Thumbs.db

# 日志文件
*.log
```

## 总结

掌握 Git 常用命令是每个开发者的必备技能。本文涵盖了日常开发中最常用的 Git 操作，建议收藏备用。

---

> 参考资料：[Git 官方文档](https://git-scm.com/doc)
