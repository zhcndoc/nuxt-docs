---
title: "clearError"
description: "clearError 组合式 API 用于清除所有已处理的错误。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在您的页面、组件和插件中，您可以使用 `clearError` 来清除所有错误并重定向用户。

**参数：**

- `options?: { redirect?: string }`

您可以提供一个可选的重定向路径（例如，如果您想导航到一个“安全”的页面）。

```js
// 不重定向
clearError()

// 重定向
clearError({ redirect: '/homepage' })
```

错误使用 [`useError()`](/docs/api/composables/use-error) 设置在状态中。 `clearError` 组合式 API 将重置该状态并调用带有提供选项的 `app:error:cleared` 钩子。

:read-more{to="/docs/getting-started/error-handling"}