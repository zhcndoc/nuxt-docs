---
title: 'setPageLayout'
description: setPageLayout 允许你动态地改变页面的布局。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` 允许你动态地改变页面的布局。它依赖于对 Nuxt 上下文的访问，因此只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 内调用。
::

```ts [middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 在你导航到的路由上设置布局
  setPageLayout('other')
})
```

::note
如果你选择在服务器端动态设置布局，你必须在做 Vue 渲染布局之前设置，以避免 hydration 不匹配。
::
