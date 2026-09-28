---
title: 'showError'
description: Nuxt 提供了一种快速简单的方式在需要时显示全屏错误页面。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)中，你可以使用 `showError` 显示错误。

**参数：**

- `error`：`string | Error | Partial<{ cause, data, message, name, stack, status, statusText }>`

```ts
showError('😱 Oh no, an error has been thrown.')
showError({
  status: 404,
  statusText: 'Page Not Found',
})
```

使用 [`useError()`](/docs/api/composables/use-error) 将错误设置到状态中，以在组件间创建响应式且支持 SSR 的共享错误状态。

::tip
`showError` 会调用 `app:error` 钩子。
::

:read-more{to="/docs/getting-started/error-handling"}
