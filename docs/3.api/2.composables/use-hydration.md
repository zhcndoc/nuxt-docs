---
title: 'useHydration'
description: '允许完全控制水化循环，以设置和接收来自服务器的数据。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

::note
这是一个高级组合函数，主要用于 Nuxt 模块。
::

::note
`useHydration` 旨在 **确保 SSR 期间状态的同步和恢复**。如果您需要在 Nuxt 中创建一个对 SSR 友好的全局响应式状态，推荐使用 [`useState`](/docs/api/composables/use-state)。
::

`useHydration` 是一个内置组合函数，提供了一种在每次新的 HTTP 请求时在服务器端设置数据并在客户端接收这些数据的方法。这样，`useHydration` 允许您对水化循环进行完全控制。

从服务器的 `get` 函数返回的数据存储在 `nuxtApp.payload` 中，使用作为第一个参数提供的唯一键。在水化过程中，这些数据将被客户端检索，从而避免冗余计算或 API 调用。

`useHydration()` 可以在组合函数、插件和组件中使用。

## 用法

::code-group

```ts [没有 useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      nuxtApp.payload.myStoreState = myStore.getState()
    })
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      myStore.setState(nuxtApp.payload.myStoreState)
    })
  }
})
```

```ts [使用 useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  useHydration(
    'myStoreState',
    () => myStore.getState(),
    (data) => myStore.setState(data)
  )
})
```
::

## 类型

```ts [签名]
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => void
```

## 参数

- `key`: 在您的 Nuxt 应用程序中标识数据的唯一键。
- `get`: 在 **服务器上** 执行的函数（在 SSR 渲染完成时调用），用于设置初始值。
- `set`: 在 **客户端** 执行的函数（在初始 Vue 实例创建时调用），用于接收数据。