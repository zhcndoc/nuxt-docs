---
title: 'showError'
description: Nuxt 提供了一种快速简单的方式，可以在需要时显示一个全屏错误页面。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中，你可以使用 `showError` 来显示一个错误。

**参数:**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, statusCode, statusMessage }>`

```ts
showError("😱 Oh no, an error has been thrown.")
showError({
  statusCode: 404,
  statusMessage: "Page Not Found"
})
```

错误是使用 [`useError()`](/docs/api/composables/use-error) 设置在状态中，以创建一个跨组件的响应式和 SSR 友好的共享错误状态。

::tip
`showError` 调用了 `app:error` 钩子。
::

:read-more{to="/docs/getting-started/error-handling"}
