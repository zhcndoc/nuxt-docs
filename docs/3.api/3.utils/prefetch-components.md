---
title: 'prefetchComponents'
description: Nuxt 提供了工具，让您控制组件的预取。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


预取组件会在后台下载代码，这是基于组件很可能用于渲染的假设，使组件在用户请求时能够立即加载。组件被下载并缓存起来，以备预期的未来使用，而不需要用户明确请求它。

使用 `prefetchComponents` 手动预取在您的 Nuxt 应用程序中全局注册的单个组件。默认情况下，Nuxt 将这些组件注册为异步组件。您必须使用组件名称的大写形式。

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
当前实现的行为与 [`preloadComponents`](/docs/api/utils/preload-components) 完全相同，通过预加载组件而不是仅预取组件，我们正在努力改进这种行为。
::

::note
在服务器上，`prefetchComponents` 将不起作用。
::
