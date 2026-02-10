---
title: 'prerenderRoutes'
description: prerenderRoutes 提示 Nitro 预渲染额外的路由。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

在预渲染时，你可以提示 Nitro 预渲染额外的路径，即使这些路径的 URL 没有出现在生成页面的 HTML 中。

::important
`prerenderRoutes` 只能在 [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

::note
`prerenderRoutes` 必须在预渲染期间执行。如果 `prerenderRoutes` 在未被预渲染的动态页面/路由中使用，则不会被执行。
::

```ts
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::note
在浏览器中，或在预渲染之外调用时，`prerenderRoutes` 不会产生任何效果。
::

你甚至可以预渲染 API 路由，这对完全静态生成的站点（SSG）尤其有用，因为这样你就可以像有可用服务器一样使用 `$fetch` 获取数据！

```ts
prerenderRoutes('/api/content/article/name-of-article')

// Somewhere later in App
const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
})
```

::warning
在生产环境中，预渲染的 API 路由可能不会返回预期的响应头，这取决于你部署所用的提供商。例如，JSON 响应可能会以 `application/octet-stream` 内容类型被提供。  
在获取预渲染的 API 路由时，请始终手动设置 `responseType`。
::
