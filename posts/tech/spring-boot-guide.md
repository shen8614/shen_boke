---
title: Spring Boot 入门指南
date: 2026-05-26
tags:
  - Spring Boot
  - Java
  - 后端
categories:
  - 技术学习
description: Spring Boot 快速入门教程，从零开始搭建第一个 Spring Boot 应用。
---

# Spring Boot 入门指南

## 什么是 Spring Boot？

Spring Boot 是 Spring 框架的扩展，它简化了 Spring 应用的创建和开发过程。通过 Spring Boot，你可以快速创建独立的、生产级的 Spring 应用程序。

![Spring Boot Logo](https://spring.io/images/spring-logo.svg)

## 为什么选择 Spring Boot？

1. **快速启动** - 内嵌 Tomcat，无需部署 WAR 文件
2. **自动配置** - 根据依赖自动配置 Spring 应用
3. **起步依赖** - 简化 Maven/Gradle 配置
4. **生产就绪** - 内置监控、健康检查等功能

## 快速开始

### 1. 创建项目

使用 Spring Initializr 创建项目：

```bash
curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d baseDir=demo \
  -d name=demo \
  -d packageName=com.example.demo \
  -d javaVersion=17
```

### 2. 项目结构

```
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── static/
│   │       └── templates/
│   └── test/
└── pom.xml
```

### 3. 编写第一个接口

```java
@RestController
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

### 4. 运行应用

```bash
mvn spring-boot:run
```

访问 `http://localhost:8080/hello` 即可看到结果。

## 核心特性

### 自动配置

Spring Boot 会根据类路径中的依赖自动配置 Bean：

```java
// 只要引入了 spring-boot-starter-web
// Spring Boot 会自动配置 DispatcherServlet、Tomcat 等
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### 配置文件

支持 `application.yml` 和 `application.properties`：

```yaml
server:
  port: 8080
  
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: 123456
```

## 常用注解

| 注解 | 说明 |
|------|------|
| `@SpringBootApplication` | 启动类注解 |
| `@RestController` | RESTful 控制器 |
| `@Service` | 服务层注解 |
| `@Repository` | 数据访问层注解 |
| `@Autowired` | 自动注入依赖 |

## 总结

Spring Boot 极大地简化了 Spring 应用的开发过程，让开发者可以专注于业务逻辑而不是配置。通过本文，你已经了解了 Spring Boot 的基本概念和使用方法。

下一步，建议学习：
- Spring Boot 数据访问（JPA、MyBatis）
- Spring Security 安全框架
- Spring Cloud 微服务架构

---

> 参考资料：[Spring Boot 官方文档](https://spring.io/projects/spring-boot)
