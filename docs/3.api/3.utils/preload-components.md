---
title: 'preloadComponents'
description: Nuxt 提供了用于控制组件预加载的工具。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载组件会加载页面很快就需要的组件，你希望在渲染生命周期的早期就开始加载这些组件。这可以保证它们更早可用并且更不可能阻塞页面渲染，从而提高性能。

使用 `preloadComponents` 手动预加载在 Nuxt 应用中已全局注册的单个组件。默认情况下，Nuxt 将这些注册为异步组件。你必须使用组件名称的 Pascal 命名（PascalCase）版本。

```ts
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
在服务器端，`preloadComponents` 不会生效。
::