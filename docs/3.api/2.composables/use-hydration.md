---
title: 'useHydration'
description: '允许对 hydration 周期进行完全控制，以便从服务器设置和接收数据。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

::note
这是一个高级的 composable，主要用于插件内，并且大多由 Nuxt 模块使用。
::

::note
`useHydration` 的设计目的是用于 **确保 SSR 期间的状态同步与恢复**。如果你需要在 Nuxt 中创建一个全局的、对 SSR 友好的响应式状态，推荐使用 [`useState`](/docs/4.x/api/composables/use-state)。
::

`useHydration` 是一个内置的 composable，提供了一种在每次新的 HTTP 请求时在服务器端设置数据并在客户端接收该数据的方式。通过这种方式，`useHydration` 允许你对 hydration 周期进行完全控制。

服务器端 `get` 函数返回的数据会根据传递给 `useHydration` 的第一个参数（唯一键）存储在 `nuxtApp.payload` 中。在 hydration 期间，这些数据会在客户端被取回，从而避免多余的计算或 API 调用。

## 用法

::code-group

```ts [Without useHydration]
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

```ts [With useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  useHydration(
    'myStoreState',
    () => myStore.getState(),
    data => myStore.setState(data),
  )
})
```
::

## 类型

```ts [Signature]
export function useHydration<T> (key: string, get: () => T, set: (value: T) => void): void
```

## 参数

- `key`：在你的 Nuxt 应用中标识该数据的唯一键。
- `get`：仅在 **服务器端执行** 的函数（在 SSR 渲染完成时调用），用于设置初始值。
- `set`：仅在 **客户端执行** 的函数（在初始 Vue 实例创建时调用），用于接收该数据。