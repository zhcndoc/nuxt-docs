---
title: 'setResponseStatus'
description: setResponseStatus 设置响应的 statusCode（以及可选的 statusMessage）。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt 提供了组合函数和工具，以支持一流的服务端渲染。

`setResponseStatus` 用于设置响应的 statusCode（以及可选的 statusMessage）。

::important
`setResponseStatus` 只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

```ts
const event = useRequestEvent()

// 在浏览器中 event 将是 undefined
if (event) {
  // 为自定义的 404 页面设置状态码为 404
  setResponseStatus(event, 404)

  // 也可以同时设置状态信息
  setResponseStatus(event, 404, '页面未找到')
}
```

::note
在浏览器中，`setResponseStatus` 不会生效。
::

:read-more{to="/docs/getting-started/error-handling"}
