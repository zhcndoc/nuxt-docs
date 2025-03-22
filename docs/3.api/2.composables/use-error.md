---
title: "useError"
description: useError 组合函数返回正在处理的全局 Nuxt 错误。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

该组合函数返回正在处理的全局 Nuxt 错误，并且在客户端和服务器上均可用。

```ts
const error = useError()
```

`useError` 在状态中设置一个错误，并创建一个响应式的、适合 SSR 的全局 Nuxt 错误，供组件使用。

Nuxt 错误具有以下属性：

```ts
interface {
  // HTTP 响应状态码
  statusCode: number
  // HTTP 响应状态信息
  statusMessage: string
  // 错误信息
  message: string
}
```

:read-more{to="/docs/getting-started/error-handling"}