---
title: "clearError"
description: "clearError 可组合元素用于清除所有已处理的错误。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用 `clearError` 来清除所有错误并将用户重定向。

**参数：**

- `options?: { redirect?: string }`

你可以提供一个可选的路径进行重定向（例如，如果你想导航到一个“安全”页面）。

```js
// 不带重定向
clearError()

// 带重定向
clearError({ redirect: '/homepage' })
```

错误是在使用 [`useError()`](/docs/api/composables/use-error) 可组合元素中设置的。`clearError` 可组合元素将会重置这个状态，并调用提供选项的 `app:error:cleared` 钩子。

:read-more{to="/docs/getting-started/error-handling"}
