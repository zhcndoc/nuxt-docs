---
title: 'setPageLayout'
description: setPageLayout 允许你动态更改页面的布局。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` 允许你动态更改页面的布局。它依赖于对 Nuxt 上下文的访问，因此只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

```ts [middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 设置你要导航到的路由的布局
  setPageLayout('other')
})
```

::note
如果你选择在服务器端动态设置布局，**必须**在 Vue 渲染布局之前完成（即，在插件或路由中间件内进行），以避免水合不匹配的问题。
::