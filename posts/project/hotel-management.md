     1|     1|---
     2|     2|title: 酒店客房管理系统开发记录
     3|     3|date: 2026-05-22
     4|     4|tags:
     5|     5|  - Spring Boot
     6|     6|  - Vue 3
     7|     7|  - 项目实战
     8|     8|  - 全栈开发
     9|     9|categories:
    10|    10|  - 项目实战
    11|    11|description: 连锁酒店客房管理系统全栈项目开发记录，包含技术选型、架构设计、功能实现等内容。
    12|    12|---
    13|    13|
    14|    14|# 酒店客房管理系统开发记录
    15|    15|
    16|    16|## 项目概述
    17|    17|
    18|    18|本项目是一个连锁酒店客房管理系统，采用前后端分离架构，支持多门店运营，覆盖了从客人在线预订、前台入住办理、退房结算到管理员经营分析的完整业务链路。系统按管理员、前台、客人三种角色划分权限，不同角色登录后进入不同的操作界面，各自只能看到与自身职责相关的功能。
    19|    19|
    20|    20|## 技术栈
    21|    21|
    22|    22|### 后端
    23|    23|
    24|    24|- **框架**: Spring Boot 3.2.0
    25|    25|- **ORM**: MyBatis 3.0.3
    26|    26|- **数据库**: MySQL 8.0
    27|    27|- **认证**: JWT（jjwt 0.12.3）
    28|    28|- **构建**: Maven
    29|    29|
    30|    30|### 前端
    31|    31|
    32|    32|- **框架**: Vue 3.4 + Vite 5.0
    33|    33|- **UI 组件库**: Element Plus 2.4
    34|    34|- **路由**: Vue Router 4.2
    35|    35|- **HTTP 客户端**: Axios 1.6
    36|    36|
    37|    37|## 系统架构
    38|    38|
    39|    39|```mermaid
    40|    40|graph TB
    41|    41|    subgraph FE[前端 Vue 3]
    42|    42|        A[管理员 8页] --- B[前台 6页]
    43|    43|        B --- C[客人 3页]
    44|    44|    end
    45|    45|    FE -->|Axios + JWT| BE[后端 Spring Boot<br/>13 个 Controller]
    46|    46|    BE --> DB[(MySQL 11表)]
    47|    47|    BE --> CACHE[(Redis)]
    48|    48|    BE --> FILES[文件存储]
    49|    49|
    50|    50|    style FE fill:#eef2ff,stroke:#a5b4fc
    51|    51|    style BE fill:#ecfdf5,stroke:#86efac
    52|    52|    style DB fill:#faf5ff,stroke:#c084fc
    53|    53|```
    54|    54|
    55|    55|## 三种角色与权限设计
    56|    56|
    57|    57|系统的核心设计之一是角色隔离。登录时后端通过 JWT 生成包含角色信息的 Token，前端路由守卫根据角色跳转到不同模块，后端拦截器在每个 API 请求中校验角色和门店归属。
    58|    58|
    59|    59|| 角色 | 登录方式 | 核心功能 |
    60|    60||------|----------|----------|
    61|    61|| 管理员 | 用户名+密码 | 全系统管理、数据分析、门店/员工/房型管理、图片上传 |
    62|    62|| 前台 | 用户名+密码 | 客房状态查看、预订/入住/退房办理、账单开具 |
    63|    63|| 客人 | 手机号+密码 | 房间预订、订单查询、个人信息管理 |
    64|    64|
    65|    65|前端路由守卫的实现逻辑是：未登录用户强制跳转到登录页，已登录用户访问登录页时根据角色自动重定向到对应模块。后端的 JwtInterceptor 拦截所有 `/api/**` 请求（排除登录和注册接口），从 Token 中解析出用户角色和门店 ID，注入到请求上下文中，供后续业务逻辑使用。
    66|    66|
    67|    67|## 连锁门店管理
    68|    68|
    69|    69|系统从设计之初就考虑了多门店场景。stores 表存储门店基本信息（名称、地址、电话、描述、图片），其他所有业务数据都通过 `store_id` 外键关联到具体门店。
    70|    70|
    71|    71|前台员工登录后，系统根据其 `store_id` 自动过滤数据——只能看到自己门店的房间、预订和入住记录。如果尝试通过 API 访问其他门店的数据，后端会返回 403 权限不足。管理员角色不受此限制，可以查看所有门店的汇总数据。
    72|    72|
    73|    73|## 核心功能模块
    74|    74|
    75|    75|### 1. 客房管理
    76|    76|
    77|    77|客房管理涉及三张表：stores（门店）、room_types（房型）、rooms（房间）。一个门店下有多种房型（标准间、豪华间、行政套房、家庭套房、总统套房等），每种房型下有具体房间。
    78|    78|
    79|    79|房间状态使用枚举值管理：可售、已预订、已入住、清扫中、维修中。前台端的客房状态页面以色块视图展示各房间的当前状态，一目了然。管理员和前台都可以修改房间状态，例如保洁完成后将"清扫中"改为"可售"。
    80|    80|
    81|    81|房型和门店都支持图片上传。管理员上传图片后，前端实时预览，更新时自动删除旧文件，删除门店或房型时同步清理图片目录。上传的文件存储在后端 `uploads/` 目录下，通过 Spring MVC 的静态资源映射对外提供访问。
    82|    82|
    83|    83|### 2. 预订管理
    84|    84|
    85|    85|客人通过客人端浏览门店和房型，选择入住日期、离店日期和房间数量后提交预订。预订创建后状态为"待确认"，前台确认后变为"已确认"，客人实际入住后变为"已入住"，也可以在任意阶段取消。
    86|    86|
    87|    87|预订表（reservations）记录了客人、房型、入住离店日期、预订间数、实际入住人数、押金、备注等信息。预订时可以选择指定具体房间（room_id），也可以只选房型由前台分配。
    88|    88|
    89|    89|### 3. 入住与退房
    90|    90|
    91|    91|入住登记时，前台关联预订记录，选择具体房间，系统自动记录入住时间和操作员工。退房时触发结算流程：房费按入住天数计算，加上客人在住期间的其他消费（餐饮、迷你吧、洗衣服务等），扣除已付押金，得出实际应付金额。
    92|    92|
    93|    93|入住表（checkins）通过 `reservation_id` 外键关联预订，支持散客直接入住（无预订的情况）。
    94|    94|
    95|    95|### 4. 消费管理
    96|    96|
    97|    97|系统内置了消费项目目录（consumption_items），预设了早餐、午餐、晚餐、迷你吧、洗衣服务、叫醒服务、会议室等项目，管理员可以自行增减。客人入住期间产生的消费通过消费记录表（consumption）关联到具体入住记录，退房时自动汇总计入账单。
    98|    98|
    99|    99|### 5. 账单与发票
   100|   100|
   101|   101|退房结算时自动生成账单（bills），记录房费、其他费用、总费用、押金抵扣、实际支付金额和支付方式（现金、刷卡、微信、支付宝）。账单支持发票管理，记录发票状态和发票号（A 开头流水号）。
   102|   102|
   103|   103|### 6. 经营数据分析
   104|   104|
   105|   105|管理员专享的数据分析模块包含四个维度：
   106|   106|
   107|   107|- **入住率概览**：实时统计各门店的总房间数、已入住数、入住率
   108|   108|- **门店入住率对比**：横向对比各门店的入住情况
   109|   109|- **营收分析**：按日期范围查询营收趋势，支持按门店筛选，展示每日营收变化图表
   110|   110|- **账单报表**：按日期范围导出详细账单明细，支持多维度筛选
   111|   111|
   112|   112|所有统计接口都做了权限校验，只有管理员角色才能访问。
   113|   113|
   114|   114|### 7. 员工管理
   115|   115|
   116|   116|管理员可以对员工账号进行增删改查，分配角色（管理员、前台）和所属门店。员工登录后系统根据角色和门店自动限制可访问的数据范围。
   117|   117|
   118|   118|## 数据库设计
   119|   119|
   120|   120|系统共 11 张核心表，关系如下（Chen 记法）：
   121|   121|
   122|   122|![酒店管理系统 ER 图](/hotel-er.svg)
   123|   123|
   124|   124|### 核心表结构
   125|   125|
   126|   126|```sql
   127|   127|-- 门店表
   128|   128|CREATE TABLE stores (
   129|   129|  store_id INT PRIMARY KEY AUTO_INCREMENT,
   130|   130|  store_name VARCHAR(100) NOT NULL,
   131|   131|  address VARCHAR(255) NOT NULL,
   132|   132|  phone VARCHAR(20) NOT NULL,
   133|   133|  description TEXT,
   134|   134|  image VARCHAR(500),
   135|   135|  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   136|   136|);
   137|   137|
   138|   138|-- 客房类型表
   139|   139|CREATE TABLE room_types (
   140|   140|  type_id INT PRIMARY KEY AUTO_INCREMENT,
   141|   141|  type_name VARCHAR(50) NOT NULL,
   142|   142|  description TEXT,
   143|   143|  base_price DECIMAL(10,2) NOT NULL,
   144|   144|  max_occupancy INT NOT NULL,
   145|   145|  store_id INT NOT NULL,
   146|   146|  image VARCHAR(500),
   147|   147|  FOREIGN KEY (store_id) REFERENCES stores(store_id)
   148|   148|);
   149|   149|
   150|   150|-- 客房表
   151|   151|CREATE TABLE rooms (
   152|   152|  room_id INT PRIMARY KEY AUTO_INCREMENT,
   153|   153|  room_number VARCHAR(20) NOT NULL,
   154|   154|  type_id INT NOT NULL,
   155|   155|  floor INT NOT NULL,
   156|   156|  standard_price DECIMAL(10,2) NOT NULL,
   157|   157|  status ENUM('可售','已预订','已入住','清扫中','维修中') DEFAULT '可售',
   158|   158|  facilities TEXT,
   159|   159|  store_id INT NOT NULL,
   160|   160|  FOREIGN KEY (type_id) REFERENCES room_types(type_id),
   161|   161|  FOREIGN KEY (store_id) REFERENCES stores(store_id),
   162|   162|  UNIQUE KEY uk_store_room (store_id, room_number)
   163|   163|);
   164|   164|
   165|   165|-- 客人表
   166|   166|CREATE TABLE guests (
   167|   167|  guest_id INT PRIMARY KEY AUTO_INCREMENT,
   168|   168|  name VARCHAR(50) NOT NULL,
   169|   169|  id_type ENUM('身份证','护照','军官证','其他') NOT NULL DEFAULT '身份证',
   170|   170|  id_number VARCHAR(50),
   171|   171|  phone VARCHAR(20) NOT NULL,
   172|   172|  password VARCHAR(100) NOT NULL DEFAULT '123456',
   173|   173|  email VARCHAR(100),
   174|   174|  UNIQUE KEY uk_phone (phone)
   175|   175|);
   176|   176|
   177|   177|-- 角色表
   178|   178|CREATE TABLE roles (
   179|   179|  role_id INT PRIMARY KEY AUTO_INCREMENT,
   180|   180|  role_name VARCHAR(50) NOT NULL,
   181|   181|  description TEXT,
   182|   182|  UNIQUE KEY uk_role_name (role_name)
   183|   183|);
   184|   184|
   185|   185|-- 员工表
   186|   186|CREATE TABLE staff (
   187|   187|  staff_id INT PRIMARY KEY AUTO_INCREMENT,
   188|   188|  username VARCHAR(50) NOT NULL,
   189|   189|  password VARCHAR(100) NOT NULL,
   190|   190|  name VARCHAR(50) NOT NULL,
   191|   191|  role_id INT NOT NULL,
   192|   192|  phone VARCHAR(20) NOT NULL,
   193|   193|  store_id INT,
   194|   194|  FOREIGN KEY (role_id) REFERENCES roles(role_id),
   195|   195|  FOREIGN KEY (store_id) REFERENCES stores(store_id),
   196|   196|  UNIQUE KEY uk_username (username)
   197|   197|);
   198|   198|
   199|   199|-- 预订表
   200|   200|CREATE TABLE reservations (
   201|   201|  reservation_id INT PRIMARY KEY AUTO_INCREMENT,
   202|   202|  guest_id INT NOT NULL,
   203|   203|  room_id INT,
   204|   204|  type_id INT NOT NULL,
   205|   205|  checkin_date DATE NOT NULL,
   206|   206|  checkout_date DATE NOT NULL,
   207|   207|  room_count INT NOT NULL DEFAULT 1,
   208|   208|  actual_guests INT,
   209|   209|  status ENUM('待确认','已确认','已入住','已取消','已完成') DEFAULT '待确认',
   210|   210|  deposit DECIMAL(10,2) DEFAULT 0,
   211|   211|  notes TEXT,
   212|   212|  FOREIGN KEY (guest_id) REFERENCES guests(guest_id),
   213|   213|  FOREIGN KEY (room_id) REFERENCES rooms(room_id),
   214|   214|  FOREIGN KEY (type_id) REFERENCES room_types(type_id)
   215|   215|);
   216|   216|
   217|   217|-- 入住登记表
   218|   218|CREATE TABLE checkins (
   219|   219|  checkin_id INT PRIMARY KEY AUTO_INCREMENT,
   220|   220|  reservation_id INT,
   221|   221|  guest_id INT NOT NULL,
   222|   222|  room_id INT NOT NULL,
   223|   223|  checkin_time DATETIME NOT NULL,
   224|   224|  checkout_time DATETIME,
   225|   225|  status ENUM('入住中','已退房') DEFAULT '入住中',
   226|   226|  staff_id INT NOT NULL,
   227|   227|  FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id),
   228|   228|  FOREIGN KEY (guest_id) REFERENCES guests(guest_id),
   229|   229|  FOREIGN KEY (room_id) REFERENCES rooms(room_id),
   230|   230|  FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
   231|   231|);
   232|   232|
   233|   233|-- 消费项目表
   234|   234|CREATE TABLE consumption_items (
   235|   235|  item_id INT PRIMARY KEY AUTO_INCREMENT,
   236|   236|  item_name VARCHAR(100) NOT NULL,
   237|   237|  price DECIMAL(10,2) NOT NULL,
   238|   238|  category VARCHAR(50)
   239|   239|);
   240|   240|
   241|   241|-- 消费记录表
   242|   242|CREATE TABLE consumption (
   243|   243|  consumption_id INT PRIMARY KEY AUTO_INCREMENT,
   244|   244|  checkin_id INT NOT NULL,
   245|   245|  item_id INT NOT NULL,
   246|   246|  quantity INT NOT NULL DEFAULT 1,
   247|   247|  amount DECIMAL(10,2) NOT NULL,
   248|   248|  consumption_time DATETIME DEFAULT CURRENT_TIMESTAMP,
   249|   249|  FOREIGN KEY (checkin_id) REFERENCES checkins(checkin_id),
   250|   250|  FOREIGN KEY (item_id) REFERENCES consumption_items(item_id)
   251|   251|);
   252|   252|
   253|   253|-- 账单表
   254|   254|CREATE TABLE bills (
   255|   255|  bill_id INT PRIMARY KEY AUTO_INCREMENT,
   256|   256|  checkin_id INT NOT NULL,
   257|   257|  room_charge DECIMAL(10,2) NOT NULL,
   258|   258|  other_charge DECIMAL(10,2) DEFAULT 0,
   259|   259|  total_charge DECIMAL(10,2) NOT NULL,
   260|   260|  deposit DECIMAL(10,2) DEFAULT 0,
   261|   261|  actual_pay DECIMAL(10,2) NOT NULL,
   262|   262|  payment_method ENUM('现金','刷卡','微信','支付宝'),
   263|   263|  invoice_status ENUM('未开具','已开具') DEFAULT '未开具',
   264|   264|  invoice_number VARCHAR(50),
   265|   265|  checkout_time DATETIME NOT NULL,
   266|   266|  staff_id INT NOT NULL,
   267|   267|  FOREIGN KEY (checkin_id) REFERENCES checkins(checkin_id),
   268|   268|  FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
   269|   269|);
   270|   270|```
   271|   271|
   272|   272|## API 接口一览
   273|   273|
   274|   274|| 控制器 | 基础路径 | 说明 |
   275|   275||--------|----------|------|
   276|   276|| AuthController | `/api/auth` | 登录 / 客人注册 |
   277|   277|| StoreController | `/api/stores` | 门店 CRUD |
   278|   278|| RoomTypeController | `/api/room-types` | 房型 CRUD |
   279|   279|| RoomController | `/api/rooms` | 客房 CRUD，状态变更 |
   280|   280|| GuestController | `/api/guests` | 客人 CRUD |
   281|   281|| StaffController | `/api/staff` | 员工 CRUD |
   282|   282|| ReservationController | `/api/reservations` | 预订管理，状态流转 |
   283|   283|| CheckinController | `/api/checkins` | 入住 / 退房 |
   284|   284|| BillController | `/api/bills` | 账单 / 发票 |
   285|   285|| ConsumptionController | `/api/consumption` | 消费记录 CRUD |
   286|   286|| ConsumptionItemController | `/api/consumption-items` | 消费项目目录 |
   287|   287|| StatisticsController | `/api/statistics` | 经营数据统计（管理员专享） |
   288|   288|| UploadController | `/api/upload` | 图片上传（门店/房型） |
   289|   289|
   290|   290|## 遇到的问题与解决方案
   291|   291|
   292|   292|### 1. 多门店数据隔离
   293|   293|
   294|   294|**问题**：前台员工登录后，需要自动只能看到自己门店的数据，但又不能影响管理员查看全部数据。
   295|   295|
   296|   296|**解决方案**：在 JwtInterceptor 中从 Token 解析出角色和门店 ID，注入到 request 属性中。每个 Controller 的查询方法中判断角色——如果是管理员则查询全部，否则按 store_id 过滤。增删改操作也做了跨门店校验，返回 403 而不是静默失败。
   297|   297|
   298|   298|### 2. 预订到入住的状态流转
   299|   299|
   300|   300|**问题**：预订涉及多个状态（待确认、已确认、已入住、已取消、已完成），状态变更时需要同步更新房间状态，逻辑容易出错。
   301|   301|
   302|   302|**解决方案**：将状态流转逻辑集中在 Service 层处理。确认预订时不改房间状态（因为还没分配具体房间），入住登记时才将房间改为"已入住"，退房时改为"清扫中"。每个状态变更都有前置条件校验，防止非法跳转。
   303|   303|
   304|   304|### 3. 图片上传与清理
   305|   305|
   306|   306|**问题**：门店和房型支持图片上传，更新图片时旧文件会残留在服务器上，删除记录时也需要同步清理图片。
   307|   307|
   308|   308|**解决方案**：在 Service 层的 update 和 delete 方法中，先查询旧记录获取图片路径，更新时如果新图片路径不同则删除旧文件，删除记录时直接清理关联图片。前端上传后实时预览，通过 Vite 代理将 `/uploads` 请求转发到后端。
   309|   309|
   310|   310|## 测试账号
   311|   311|
   312|   312|| 角色 | 用户名 | 密码 |
   313|   313||------|--------|------|
   314|   314|| 管理员 | admin | 123456 |
   315|   315|| 前台（门店1） | reception1 | 123456 |
   316|   316|| 前台（门店2） | reception2 | 123456 |
   317|   317|| 客人 | 13800138001（手机号） | 123456 |
   318|   318|
   319|   319|## 项目收获
   320|   320|
   321|   321|通过这个项目，我完整实践了前后端分离的全栈开发流程。从数据库设计到 API 开发，从 JWT 认证到角色权限控制，从单表 CRUD 到多表联查统计，每个环节都有实际的踩坑和解决经验。特别是多门店数据隔离的设计，让我对 RBAC 权限模型有了更深入的理解。
   322|   322|
   323|   323|---
   324|   324|
   325|   325|> 项目下载：[hotel-management.zip](/upload/hotel-management.zip)
   326|   326|
   327|
   328|
   329|
---

---

> **免责声明：** 本文仅供学习交流，不构成任何商业推荐。软件功能、定价等信息可能随版本更新而变化，请以官方最新信息为准。文中涉及的商标、产品名称归各自所有者所有。

   336|