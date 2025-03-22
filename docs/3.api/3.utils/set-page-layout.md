---
title: 'setPageLayout'
description: setPageLayout 允许你动态更改页面的布局。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` 允许你动态更改页面的布局。它依赖于对 Nuxt 上下文的访问，因此只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 内部调用。
::

```ts [middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 在你导航到的路由上设置布局
  setPageLayout('other')
})
```

::note
如果你选择在服务器端动态设置布局，必须在 Vue 渲染布局之前进行设置（即在插件或路由中间件内）以避免水合不匹配。
::