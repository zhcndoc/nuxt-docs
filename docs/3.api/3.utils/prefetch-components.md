---
title: 'prefetchComponents'
description: Nuxt 提供了工具，以便让你控制组件的预取。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


预取组件会在后台下载代码，这是基于组件可能会用于渲染的假设，从而使组件能够在用户请求时立即加载。该组件会被下载并缓存以备将来使用，而用户并不需要对其进行显式请求。

使用 `prefetchComponents` 来手动预取在你的 Nuxt 应用中全局注册的单个组件。默认情况下，Nuxt 将这些组件注册为异步组件。你必须使用帕斯卡命名法（PascalCase）版本的组件名称。

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
当前实现的行为与 [`preloadComponents`](/docs/api/utils/preload-components) 完全相同，通过预加载组件而不仅仅是预取，我们正在努力改善这一行为。
::

::note
在服务器上，`prefetchComponents` 将没有效果。
::