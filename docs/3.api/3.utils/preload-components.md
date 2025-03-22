---
title: '预加载组件'
description: Nuxt 提供工具让你控制组件的预加载。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载组件会加载页面即将需要的组件，这样你可以在渲染生命周期的早期开始加载它们。这确保了它们更早可用，并且更不容易阻塞页面的渲染，从而提高性能。

使用 `preloadComponents` 手动预加载在 Nuxt 应用中全局注册的单个组件。默认情况下，Nuxt 将这些组件注册为异步组件。你必须使用 Pascal 大小写形式的组件名称。

```js
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
在服务器上，`preloadComponents` 将无效。
::