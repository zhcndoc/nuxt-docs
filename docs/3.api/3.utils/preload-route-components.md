---
title: '预加载路由组件'
description: preloadRouteComponents 允许您手动预加载您 Nuxt 应用中的单个页面。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载路由会加载用户可能未来会导航到的特定路由的组件。这确保组件能够更早地可用，并更不容易阻塞导航，从而提高性能。

::tip{icon="i-lucide-rocket"}
如果您使用 `NuxtLink` 组件，Nuxt 已经会自动预加载必要的路由。
::

:read-more{to="/docs/api/components/nuxt-link"}

## 示例

在使用 `navigateTo` 时预加载一个路由。

```ts
// 我们不等待这个异步函数，以避免阻塞渲染
// 这个组件的 setup 函数
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
在服务器上，`preloadRouteComponents` 将没有效果。
::