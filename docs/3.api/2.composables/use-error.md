---
title: "useError"
description: 使用 useError 组合函数可以获取到正在处理的 Nuxt 全局错误。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

这个组合函数返回正在处理的 Nuxt 全局错误，它同时在客户端和服务端都是可用的。

```ts
const error = useError()
```

`useError` 在状态中设置一个错误，并创建一个响应式且适合服务端渲染的跨组件全局 Nuxt 错误。

Nuxt 错误具有以下属性：

```ts
interface {
  // HTTP 响应状态码
  statusCode: number
  // HTTP 响应状态消息
  statusMessage: string
  // 错误消息
  message: string
}
```

:read-more{to="/docs/getting-started/error-handling"}
