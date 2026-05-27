---
title: Vue 3 组合式 API 详解
date: 2026-05-25
tags:
  - Vue 3
  - 前端
  - JavaScript
categories:
  - 技术学习
description: Vue 3 组合式 API 完全指南，包含 setup、ref、reactive、computed 等核心概念。
---

# Vue 3 组合式 API 详解

## 什么是组合式 API？

组合式 API 是 Vue 3 引入的一种新的组件编写方式，它允许我们使用函数来组织组件逻辑，而不是使用选项（data、methods、computed 等）。

![Vue 3 Logo](https://vuejs.org/images/logo.png)

## 为什么使用组合式 API？

1. **更好的逻辑复用** - 通过组合函数实现逻辑复用
2. **更灵活的代码组织** - 相关逻辑可以放在一起
3. **更好的类型推导** - 对 TypeScript 支持更好
4. **更小的生产体积** - 通过 tree-shaking 优化

## 核心概念

### setup 函数

`setup` 是组合式 API 的入口点：

```vue
<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const state = reactive({
      name: 'Vue 3',
      version: '3.x'
    })
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 返回模板需要的内容
    return {
      count,
      state,
      increment
    }
  }
}
</script>
```

### `<script setup>` 语法糖

Vue 3.2+ 推荐使用 `<script setup>`：

```vue
<script setup>
import { ref, reactive } from 'vue'

// 直接使用，无需 return
const count = ref(0)
const state = reactive({
  name: 'Vue 3',
  version: '3.x'
})

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <p>{{ state.name }} {{ state.version }}</p>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

## 响应式数据

### ref

用于基本类型：

```javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

### reactive

用于对象类型：

```javascript
import { reactive } from 'vue'

const state = reactive({
  name: '张三',
  age: 25,
  hobbies: ['编程', '阅读']
})

// 直接修改
state.age = 26
state.hobbies.push('运动')
```

### computed

计算属性：

```javascript
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 计算属性
const fullName = computed(() => {
  return firstName.value + lastName.value
})

console.log(fullName.value) // '张三'
```

## 生命周期钩子

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUpdated(() => {
  console.log('组件已更新')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
```

## 组合函数

将逻辑提取为独立的函数：

```javascript
// useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

在组件中使用：

```vue
<script setup>
import { useCounter } from './useCounter'

const { count, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

## 对比选项式 API

| 特性 | 选项式 API | 组合式 API |
|------|-----------|-----------|
| 代码组织 | 按选项分类 | 按逻辑功能分组 |
| 逻辑复用 | Mixins | 组合函数 |
| TypeScript | 支持一般 | 支持优秀 |
| 学习曲线 | 较低 | 较高 |

## 最佳实践

1. **使用 `<script setup>`** - 更简洁的语法
2. **提取组合函数** - 复用逻辑
3. **合理使用 ref 和 reactive** - 基本类型用 ref，对象用 reactive
4. **避免过度使用 reactive** - 复杂对象才用

## 总结

组合式 API 是 Vue 3 的重要特性，它提供了更灵活的代码组织方式和更好的逻辑复用能力。虽然学习曲线稍高，但对于大型项目来说，组合式 API 能带来更好的可维护性。

---

> 参考资料：[Vue 3 官方文档](https://vuejs.org/guide/introduction.html)
