---
title: 'setResponseStatus'
description: setResponseStatus 设置响应的 statusCode（可选地设置 statusMessage）。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt 提供了用于一流服务器端渲染支持的组合函数和工具。

`setResponseStatus` 设置响应的 statusCode（可选地设置 statusMessage）。

::important
`setResponseStatus` 只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

```js
const event = useRequestEvent()

// 在浏览器中，event 将是 undefined
if (event) {
  // 设置状态码为 404，表示自定义的 404 页面
  setResponseStatus(event, 404)

  // 也设置状态信息
  setResponseStatus(event, 404, '页面未找到')
}
```

::note
在浏览器中，`setResponseStatus` 将无效。
::

:read-more{to="/docs/getting-started/error-handling"}