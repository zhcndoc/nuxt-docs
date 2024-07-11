---
title: "callOnce"
description: "运行给定的函数或代码块，在服务器端渲染或客户端导航时只执行一次。"
navigation:
  badge: 新的
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
这个工具从 [Nuxt v3.9](/blog/v3-9) 版本开始可用。
::

## 目的

`callOnce` 函数旨在在以下情况下仅执行一次给定的函数或代码块：
- 服务器端渲染，但不包括 hydrate
- 客户端导航

这适用于应该只执行一次的代码，如记录事件或设置全局状态。

## 使用

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('这只会被打印一次')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

::tip{to="/docs/getting-started/state-management#usage-with-pinia"}
`callOnce` 与 [Pinia 模块](/modules/pinia)结合使用时，用于调用 Store 操作非常有用。
::

:read-more{to="/docs/getting-started/state-management"}

::warning
`callOnce` 不返回任何内容。如果您想在服务器端执行数据获取，应使用 [`useAsyncData`](/docs/api/composables/use-async-data) 或 [`useFetch`](/docs/api/composables/use-fetch)。
::

::note
`callOnce` 是一个组合工具，旨在直接在设置函数、插件或路由中间件中调用，因为它需要在 Nuxt 负载中添加数据，以避免在页面 hydrate 时重新调用函数。
::

## 类型

```ts
callOnce(fn?: () => any | Promise<any>): Promise<void>
callOnce(key: string, fn?: () => any | Promise<any>): Promise<void>
```

- `key`: 一个唯一的键，确保代码只执行一次。如果您不提供键，那么将为您生成一个唯一的键，该键与 `callOnce` 实例的文件和行号相对应。
- `fn`: 要执行一次的函数。这个函数也可以返回一个 `Promise` 和一个值。
