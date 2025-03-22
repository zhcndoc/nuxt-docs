---
title: 'useHydration'
description: '允许完全控制水合周期，以设置和接收来自服务器的数据。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

::note
这是一个高级组合函数，主要由 Nuxt 模块使用。
::

::note
`useHydration` 旨在 **确保 SSR 期间状态的同步和恢复**。如果您需要在 Nuxt 中创建一个全局响应式状态，建议使用 [`useState`](/docs/api/composables/use-state)。
::

`useHydration` 是一个内置的组合函数，它提供了一种方法，可以在每次发出新的 HTTP 请求时在服务器端设置数据，并在客户端接收这些数据。通过这种方式，`useHydration` 允许您完全控制水合周期。

从服务器上 `get` 函数返回的数据存储在 `nuxtApp.payload` 中，键为传递给 `useHydration` 的第一个参数。在水合过程中，这些数据会在客户端检索，从而避免冗余的计算或 API 调用。

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

- `key`: 唯一的键，用于识别您在 Nuxt 应用程序中的数据。
- `get`: 仅在 **服务器上** 执行的函数（在 SSR 渲染完成时调用），用于设置初始值。
- `set`: 仅在 **客户端** 执行的函数（在初始 Vue 实例创建时调用），用于接收数据。