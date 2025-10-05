---
title: 'setPageLayout'
description: setPageLayout 允许你动态更改页面的布局。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` 允许你动态更改页面的布局。它依赖于访问 Nuxt 上下文，因此只能在[Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)内调用。
::

```ts [app/middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 在你要导航到的路由上设置布局
  setPageLayout('other')
})
```

::note
如果你选择在服务器端动态设置布局，你必须在 Vue 渲染布局之前（即在插件或路由中间件中）执行此操作，以避免水合（hydration）不匹配。
::