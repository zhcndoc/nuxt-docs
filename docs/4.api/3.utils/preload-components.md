---
title: 'preloadComponents'
description: Nuxt 提供了实用工具，让你可以控制组件的预加载。
links:
  - label: 资源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载组件会加载页面即将需要的组件，你可以在渲染生命周期早期开始加载它们。这确保了组件能更早可用，减少阻塞页面渲染的可能性，从而提升性能。

使用 `preloadComponents` 手动预加载你在 Nuxt 应用中全局注册的单个组件。默认情况下，Nuxt 会将这些注册为异步组件。你必须使用组件名称的 PascalCase 写法。

```ts
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
在服务器端，`preloadComponents` 不会生效。
::