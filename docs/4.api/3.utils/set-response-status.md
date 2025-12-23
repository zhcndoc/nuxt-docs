---
title: 'setResponseStatus'
description: setResponseStatus 用于设置响应的状态（以及可选的状态文本）。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt 提供用于一流服务器端渲染支持的 composables 和实用工具。

`setResponseStatus` 用于设置响应的状态（以及可选的状态文本）。

::important
`setResponseStatus` 只能在 [Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

```ts
const event = useRequestEvent()

// 在浏览器中 event 将是 undefined
if (event) {
  // 为自定义 404 页面设置状态码为 404
  setResponseStatus(event, 404)

  // 同时设置状态信息
  setResponseStatus(event, 404, 'Page Not Found')
}
```

::note
在浏览器中，`setResponseStatus` 不会产生任何效果。
::

:read-more{to="/docs/4.x/getting-started/error-handling"}