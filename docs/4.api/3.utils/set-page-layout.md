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
`setPageLayout` 允许你动态更改页面的布局。它依赖于访问 Nuxt 上下文，因此只能在[Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)内调用。
::

```ts [app/middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 在你要导航到的路由上设置布局
  setPageLayout('other')
})
```

## 向布局传递 Props :badge[v4.3]{color="info" size="xs" class="align-middle"}

你可以通过提供一个对象作为第二个参数，将 props 传递给布局：

```ts [app/middleware/admin-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  setPageLayout('admin', {
    sidebar: true,
    title: '仪表盘',
  })
})
```

然后布局就可以接收这些 props：

```vue [app/layouts/admin.vue]
<script setup lang="ts">
const props = defineProps<{
  sidebar?: boolean
  title?: string
}>()
</script>

<template>
  <div>
    <aside v-if="sidebar">
      侧边栏
    </aside>
    <main>
      <h1>{{ title }}</h1>
      <slot />
    </main>
  </div>
</template>
```

::note
如果你选择在服务器端动态设置布局，你必须在 Vue 渲染布局之前（即在插件或路由中间件中）执行此操作，以避免水合（hydration）不匹配。
::
