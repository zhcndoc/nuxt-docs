---
title: 'preloadComponents'
description: Nuxt 提供了一些工具来控制组件的预加载。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载组件会在你的页面需要这些组件之前就加载它们，这样你就可以在渲染生命周期的早期开始加载这些组件。这样做可以确保它们更早可用，并且不太可能阻塞页面的渲染，从而提高性能。

使用 `preloadComponents` 手动预加载在 Nuxt 应用中全局注册的单个组件。默认情况下，Nuxt 会将这些组件注册为异步组件。你必须使用组件名称的 Pascal 大小写版本。

```js
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
在服务器端，`preloadComponents` 不会有任何效果。
::
