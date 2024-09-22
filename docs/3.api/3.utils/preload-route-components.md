---
title: 'preloadRouteComponents'
description: preloadRouteComponents 允许你手动预加载 Nuxt 应用中的单个页面。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载路由会加载用户将来可能会导航到的给定路由的组件。这确保组件可以更早地可用，并且不太可能阻塞导航，从而提高性能。

::tip{icon="i-ph-rocket-launch" color="gray"}
Nuxt 已经在使用 `NuxtLink` 组件时自动预加载必要的路由。
::

:read-more{to="/docs/api/components/nuxt-link"}

## 示例

在使用 `navigateTo` 时预加载一个路由。

```ts
// 我们不等待这个异步函数，以避免阻塞渲染
// 这个组件的设置函数
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}
```

:read-more{to="/docs/api/utils/navigate-to"}

::note
在服务器端，`preloadRouteComponents` 将不会有任何效果。
::
