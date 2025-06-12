---
title: 'useHydration'
description: '允许完全控制水合周期，以设置和接收来自服务器的数据。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

::note
这是一个高级组合式函数，主要设计用于插件内，主要被 Nuxt 模块使用。
::

::note
`useHydration` 旨在**确保 SSR 过程中的状态同步与恢复**。如果你需要在 Nuxt 中创建一个全局响应式且支持 SSR 的状态，推荐使用 [`useState`](/docs/api/composables/use-state)。
::

`useHydration` 是一个内置组合式函数，提供了一种在每次新的 HTTP 请求时，在服务器端设置数据，并在客户端接收该数据的方式。这样 `useHydration` 允许你完全控制水合（hydration）周期。

服务器端 `get` 函数返回的数据会存储在 `nuxtApp.payload` 中，使用传递给 `useHydration` 的第一个参数（唯一键）作为键名。在水合过程中，这些数据会在客户端被取出，避免重复的计算或 API 调用。

## 用法

::code-group

```ts [不使用 useHydration]
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

```ts [signature]
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => void
```

## 参数

- `key`：用于在 Nuxt 应用中唯一标识数据的键。
- `get`：仅在服务器端执行的函数（SSR 渲染完成时调用），用于设置初始值。
- `set`：仅在客户端执行的函数（vue 实例创建时调用），用于接收数据。
