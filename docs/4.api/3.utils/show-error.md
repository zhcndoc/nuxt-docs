---
title: 'showError'
description: Nuxt 提供了一种快速且简单的方式，在需要时显示全屏错误页面。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中，你可以使用 `showError` 来显示错误。

**参数：**

- `error`：`string | Error | Partial<{ cause, data, message, name, stack, statusCode, statusMessage }>`

```ts
showError("😱 哎呀，抛出了一个错误。")
showError({
  statusCode: 404,
  statusMessage: "页面未找到"
})
```

该错误通过 [`useError()`](/docs/api/composables/use-error) 设置到状态中，以创建一个响应式且支持 SSR 的跨组件共享错误状态。

::tip
`showError` 会调用 `app:error` 钩子。
::

:read-more{to="/docs/getting-started/error-handling"}