---
title: 酒店客房管理系统开发记录
date: 2026-05-22
tags:
  - Spring Boot
  - Vue 3
  - 项目实战
  - 全栈开发
categories:
  - 项目实战
description: 连锁酒店客房管理系统全栈项目开发记录，包含技术选型、架构设计、功能实现等内容。
---

# 酒店客房管理系统开发记录

## 项目概述

本项目是一个连锁酒店客房管理系统，采用前后端分离架构，实现了酒店客房的预订、管理、统计等功能。

## 技术栈

### 后端

- **框架**: Spring Boot 3.x
- **ORM**: MyBatis-Plus
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **安全**: Spring Security + JWT

### 前端

- **框架**: Vue 3 + Vite
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **HTTP 客户端**: Axios

## 系统架构

```
┌─────────────────────────────────────────────────┐
│                   前端 (Vue 3)                   │
├─────────────────────────────────────────────────┤
│              Nginx (反向代理)                    │
├─────────────────────────────────────────────────┤
│             后端 (Spring Boot)                  │
├──────────────┬──────────────┬──────────────────┤
│   MySQL      │    Redis     │   文件存储       │
└──────────────┴──────────────┴──────────────────┘
```

## 核心功能模块

### 1. 用户管理

- 管理员登录/登出
- 角色权限控制（管理员、前台、保洁）
- 个人信息修改

### 2. 客房管理

- 客房类型管理（单人间、双人间、套房等）
- 客房状态管理（空闲、已预订、入住、维修）
- 客房价格设置

### 3. 预订管理

- 在线预订
- 预订查询
- 预订取消
- 入住登记

### 4. 财务统计

- 收入统计
- 入住率分析
- 报表导出

## 数据库设计

### 核心表结构

```sql
-- 用户表
CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    nickname VARCHAR(50),
    role VARCHAR(20) DEFAULT 'staff',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 客房类型表
CREATE TABLE room_type (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    capacity INT DEFAULT 1
);

-- 客房表
CREATE TABLE room (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(20) NOT NULL,
    type_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'available',
    floor INT,
    FOREIGN KEY (type_id) REFERENCES room_type(id)
);

-- 预订表
CREATE TABLE reservation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id BIGINT NOT NULL,
    guest_name VARCHAR(50) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES room(id)
);
```

## 开发过程

### 阶段一：需求分析

- 调研酒店管理业务流程
- 确定系统功能需求
- 设计系统用例图

### 阶段二：系统设计

- 数据库设计
- API 接口设计
- 前端页面设计

### 阶段三：编码实现

- 后端接口开发
- 前端页面开发
- 前后端联调

### 阶段四：测试部署

- 单元测试
- 集成测试
- 部署上线

## 遇到的问题与解决方案

### 1. 并发预订问题

**问题**：多个用户同时预订同一房间，导致超售。

**解决方案**：使用 Redis 分布式锁 + 数据库乐观锁。

```java
@Service
public class ReservationService {
    
    @Autowired
    private RedissonClient redissonClient;
    
    public boolean createReservation(Reservation reservation) {
        String lockKey = "room:" + reservation.getRoomId();
        RLock lock = redissonClient.getLock(lockKey);
        
        try {
            // 尝试获取锁，最多等待3秒
            if (lock.tryLock(3, 10, TimeUnit.SECONDS)) {
                // 检查房间状态
                Room room = roomMapper.selectById(reservation.getRoomId());
                if (!"available".equals(room.getStatus())) {
                    return false;
                }
                
                // 创建预订
                reservationMapper.insert(reservation);
                
                // 更新房间状态
                room.setStatus("reserved");
                roomMapper.updateById(room);
                
                return true;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            lock.unlock();
        }
        
        return false;
    }
}
```

### 2. 数据统计性能问题

**问题**：大量数据统计查询缓慢。

**解决方案**：使用 Redis 缓存统计结果 + 定时任务更新。

```java
@Scheduled(cron = "0 0 2 * * ?")  // 每天凌晨2点
public void updateStatistics() {
    // 计算统计数据
    Map<String, Object> stats = calculateStatistics();
    
    // 缓存到 Redis
    redisTemplate.opsForValue().set("stats:daily", stats, 24, TimeUnit.HOURS);
}
```

## 项目收获

1. **全栈开发经验** - 独立完成前后端开发
2. **数据库设计能力** - 设计合理的数据库结构
3. **问题解决能力** - 解决并发、性能等实际问题
4. **项目管理经验** - 合理安排开发进度

## 后续计划

- 添加微信小程序端
- 接入第三方支付
- 增加数据分析功能
- 优化系统性能

## 总结

通过这个项目，我深入理解了全栈开发的完整流程，掌握了 Spring Boot + Vue 3 的开发技术，积累了宝贵的项目经验。

---

> 项目地址：[GitHub 仓库](https://github.com/)
