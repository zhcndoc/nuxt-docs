---
title: 'prefetchComponents'
description: Nuxt 提供工具让你可以控制组件的预取。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


预取组件会在后台下载代码，这基于组件可能会被用于渲染的假设，使得当用户请求时组件能够即时加载。组件会被下载并缓存，以备将来使用，无需用户的显式请求。

使用 `prefetchComponents` 来手动预取在你的 Nuxt 应用中全局注册的单个组件。默认情况下，Nuxt 将这些注册为异步组件。你必须使用 Pascal 命名法的组件名称。

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
当前实现行为与 [`preloadComponents`](/docs/api/utils/preload-components) 完全相同，都是通过预加载组件而非仅仅预取组件，我们正在努力改进此行为。
::

::note
在服务器端，`prefetchComponents` 不会产生任何效果。
::