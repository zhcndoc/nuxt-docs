---
title: 'prerenderRoutes'
description: prerenderRoutes 提示 Nitro 预渲染额外的路由。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

在预渲染时，你可以提示 Nitro 预渲染额外的路径，即使它们的 URL 并未出现在生成的页面的 HTML 中。

::important
`prerenderRoutes` 只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

::note
`prerenderRoutes` 必须在预渲染期间执行。如果在未预渲染的动态页面/路由中使用 `prerenderRoutes`，则不会执行。
::

```js
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::note
在浏览器中，或如果在预渲染外部调用，`prerenderRoutes` 将没有效果。
::

你甚至可以预渲染 API 路由，这对于完全静态生成的网站（SSG）特别有用，因为这样你可以像使用可用的服务器一样 `$fetch` 数据！

```js
prerenderRoutes('/api/content/article/name-of-article')

// 在应用程序中稍后的某个地方
const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
})
```

::warning
在生产环境中，预渲染的 API 路由可能不会返回预期的响应头，具体取决于你部署的提供者。例如，JSON 响应可能会以 `application/octet-stream` 内容类型服务。
在获取预渲染的 API 路由时，请始终手动设置 `responseType`。
::