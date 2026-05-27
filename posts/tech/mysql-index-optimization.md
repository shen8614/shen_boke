---
title: MySQL 索引优化实践
date: 2026-05-24
tags:
  - MySQL
  - 数据库
  - 性能优化
categories:
  - 技术学习
description: MySQL 索引优化详解，包含索引类型、创建原则、性能分析等内容。
---

# MySQL 索引优化实践

## 什么是索引？

索引是数据库中用于加速查询的数据结构。就像书籍的目录一样，索引可以帮助数据库快速定位到所需的数据，而不需要扫描整个表。

![MySQL Logo](https://www.mysql.com/common/logos/logo-mysql-170x115.png)

## 索引类型

### 1. B+ 树索引

最常见的索引类型，适用于等值查询和范围查询：

```sql
CREATE INDEX idx_name ON users(name);
```

### 2. 哈希索引

仅支持等值查询，不支持范围查询：

```sql
CREATE INDEX idx_email ON users(email) USING HASH;
```

### 3. 全文索引

用于文本搜索：

```sql
CREATE FULLTEXT INDEX idx_content ON articles(content);
```

## 索引创建原则

### 适合创建索引的列

1. **WHERE 子句频繁使用的列**
2. **JOIN 连接的列**
3. **ORDER BY 排序的列**
4. **GROUP BY 分组的列**

### 不适合创建索引的列

1. **数据量小的表**
2. **频繁更新的列**
3. **数据重复度高的列**（如性别）

## 索引优化技巧

### 1. 最左前缀原则

组合索引遵循最左前缀原则：

```sql
-- 创建组合索引
CREATE INDEX idx_name_age ON users(name, age);

-- 可以使用索引的查询
SELECT * FROM users WHERE name = '张三';
SELECT * FROM users WHERE name = '张三' AND age = 25;

-- 不能使用索引的查询
SELECT * FROM users WHERE age = 25;
```

### 2. 覆盖索引

查询的列都在索引中，无需回表：

```sql
-- 创建覆盖索引
CREATE INDEX idx_name_age_email ON users(name, age, email);

-- 查询只需要索引列
SELECT name, age, email FROM users WHERE name = '张三';
```

### 3. 索引下推

MySQL 5.6+ 支持索引下推优化：

```sql
-- 创建索引
CREATE INDEX idx_name_age ON users(name, age);

-- 查询
SELECT * FROM users WHERE name LIKE '张%' AND age = 25;
```

## 性能分析工具

### EXPLAIN 命令

```sql
EXPLAIN SELECT * FROM users WHERE name = '张三';
```

输出字段说明：

| 字段 | 说明 |
|------|------|
| type | 访问类型（ALL、index、range、ref、const） |
| key | 实际使用的索引 |
| rows | 预估扫描行数 |
| Extra | 额外信息 |

### 慢查询日志

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2; -- 超过2秒的查询
```

## 常见索引失效场景

### 1. 使用函数或表达式

```sql
-- 索引失效
SELECT * FROM users WHERE YEAR(create_time) = 2026;

-- 优化后
SELECT * FROM users WHERE create_time >= '2026-01-01' 
  AND create_time < '2027-01-01';
```

### 2. 隐式类型转换

```sql
-- phone 是 varchar 类型
-- 索引失效
SELECT * FROM users WHERE phone = 13800138000;

-- 优化后
SELECT * FROM users WHERE phone = '13800138000';
```

### 3. LIKE 以通配符开头

```sql
-- 索引失效
SELECT * FROM users WHERE name LIKE '%三';

-- 可以使用索引
SELECT * FROM users WHERE name LIKE '张%';
```

## 实战案例

### 慢查询优化

原始查询（执行时间 2.5 秒）：

```sql
SELECT * FROM orders 
WHERE user_id = 1001 
  AND status = 'completed' 
  AND create_time > '2026-01-01'
ORDER BY create_time DESC
LIMIT 10;
```

优化步骤：

1. **分析执行计划**
```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 1001 ...
```

2. **创建合适的索引**
```sql
CREATE INDEX idx_user_status_time ON orders(user_id, status, create_time);
```

3. **优化后执行时间**：0.02 秒

## 总结

索引优化是数据库性能优化的重要手段。合理使用索引可以显著提升查询性能，但过多的索引也会影响写入性能。需要根据实际业务场景，权衡读写性能，选择合适的索引策略。

---

> 参考资料：[MySQL 官方文档 - 索引](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)
