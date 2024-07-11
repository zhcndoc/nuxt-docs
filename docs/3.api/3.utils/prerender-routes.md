---
title: 'prerenderRoutes'
description: 预渲染路径提示 Nitro 预渲染额外的路径。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

当进行预渲染时，您可以为 Nitro 提示预渲染额外的路径，即使它们的 URL 在生成的页面 HTML 中不会显示。

::important
`预渲染路径` 只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中被调用。
::

::note
`预渲染路径` 必须在预渲染期间执行。如果 `预渲染路径` 用在不被预渲染的动态页面/路由中，则它将不会被执行。
::

```js
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::note
在浏览器中，或在预渲染之外调用，`预渲染路径` 将不会有任何效果。
::
