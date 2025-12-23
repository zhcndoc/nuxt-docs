---
title: 'showError'
description: Nuxt 提供了一种快速简单的方式在需要时显示全屏错误页面。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在 [Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 中，你可以使用 `showError` 来显示一个错误。

**参数：**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, status, statusText }>`

```ts
showError('😱 Oh no, an error has been thrown.')
showError({
  status: 404,
  statusText: 'Page Not Found',
})
```

该错误通过使用 [`useError()`](/docs/4.x/api/composables/use-error) 在状态中设置，以便在组件之间创建一个响应式且对 SSR 友好的共享错误状态。

::tip
`showError` 会调用 `app:error` 钩子。
::

:read-more{to="/docs/4.x/getting-started/error-handling"}