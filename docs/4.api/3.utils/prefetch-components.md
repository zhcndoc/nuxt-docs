---
title: 'prefetchComponents'
description: Nuxt 提供工具，让你可以控制组件的预获取。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


预获取组件会在后台下载其代码，基于该组件很可能会被用于渲染的假设，这样当用户需要时组件可以立即加载。组件在未被用户显式请求的情况下，为预期的未来使用而被下载并缓存。

使用 `prefetchComponents` 手动预获取在你的 Nuxt 应用中已全局注册的单个组件。默认情况下，Nuxt 将这些组件注册为异步组件。你必须使用 Pascal 命名（PascalCase）的组件名称。

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
当前实现的行为与 [`preloadComponents`](/docs/4.x/api/utils/preload-components) 完全相同：它是通过预加载组件而不仅仅是预获取组件来实现的，我们正在努力改进此行为。
::

::note
在服务端，`prefetchComponents` 不会生效。
::