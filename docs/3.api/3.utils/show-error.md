---
title: 'showError'
description: Nuxt 提供了一种快速简单的方法来显示全屏错误页面（如果需要的话）。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中，您可以使用 `showError` 来显示错误。

**参数：**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, statusCode, statusMessage }>`

```ts
showError("😱 哦不，发生了一个错误。")
showError({
  statusCode: 404,
  statusMessage: "页面未找到"
})
```

错误通过 [`useError()`](/docs/api/composables/use-error) 设置在状态中，以创建一个反应式且支持 SSR 的共享错误状态，跨组件使用。

::tip
`showError` 调用 `app:error` 钩子。
::

:read-more{to="/docs/getting-started/error-handling"}