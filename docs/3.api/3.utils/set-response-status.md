---
title: 'setResponseStatus'
description: 将响应状态码 (以及可选的响应状态消息) 设置为响应。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt 提供了用于一流服务器端渲染支持的组合器和实用程序。

`setResponseStatus` 将响应状态码 (以及可选的响应状态消息) 设置为响应。

::important
`setResponseStatus` 只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

```js
const event = useRequestEvent()

// 在浏览器中，event 将是不确定的
if (event) {
  // 将状态码设置为 404 以显示自定义 404 页面
  setResponseStatus(event, 404)

  // 同时设置状态消息
  setResponseStatus(event, 404, 'Page Not Found')
}
```

::note
在浏览器中，`setResponseStatus` 将不会有任何效果。
::

:read-more{to="/docs/getting-started/error-handling"}
