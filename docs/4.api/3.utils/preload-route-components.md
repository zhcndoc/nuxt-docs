---
title: 'preloadRouteComponents'
description: preloadRouteComponents 允许你在 Nuxt 应用中手动预加载单个页面。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载路由会加载用户未来可能访问的指定路由的组件。这确保组件更早可用，从而减少阻塞导航的可能性，提升性能。

::tip{icon="i-lucide-rocket"}
如果你使用 `NuxtLink` 组件，Nuxt 已经会自动预加载必要的路由。
::

:read-more{to="/docs/3.x/api/components/nuxt-link"}

## 示例

在使用 `navigateTo` 时预加载路由。

```ts
// 我们不会等待这个异步函数，以避免阻塞渲染
// 当前组件的 setup 函数
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}
```

:read-more{to="/docs/3.x/api/utils/navigate-to"}

::note
在服务器端，`preloadRouteComponents` 不会生效。
::