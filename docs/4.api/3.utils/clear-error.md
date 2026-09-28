---
title: "clearError"
description: "clearError 组合式函数清除所有已处理的错误。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在页面、组件和插件中，可以使用 `clearError` 清除所有错误并重定向用户。

**参数：**

- `options?: { redirect?: string }`

您可以提供一个可选的重定向路径（例如，当您想导航到一个“安全”页面时）。

```ts
// 不带重定向
clearError()

// 带重定向
clearError({ redirect: '/homepage' })
```

错误通过 [`useError()`](/docs/api/composables/use-error) 设置在状态中。`clearError` 组合式函数会重置此状态，并使用提供的选项调用 `app:error:cleared` hook。

:read-more{to="/docs/getting-started/error-handling"}
