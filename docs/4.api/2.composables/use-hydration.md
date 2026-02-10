---
title: 'useHydration'
description: '允许对 hydration 周期进行完全控制，以便从服务器设置和接收数据。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

`useHydration` 是一个内置的可组合函数，提供了一种在每次发起新的 HTTP 请求时在服务器端设置数据，并在客户端接收这些数据的方法。通过这种方式，`useHydration` 让你能够完全控制水合周期。

::note
这是一个高级的 composable，主要用于插件内，并且大多由 Nuxt 模块使用。
::

::note
`useHydration` 的设计目的是用于 **确保 SSR 期间的状态同步与恢复**。如果你需要在 Nuxt 中创建一个全局的、对 SSR 友好的响应式状态，推荐使用 [`useState`](/docs/4.x/api/composables/use-state)。
::

## 用法

服务器上 `get` 函数返回的数据会根据作为 `useHydration` 第一个参数提供的唯一键，存储在 `nuxtApp.payload` 中。在水合过程中，这些数据会在客户端被检索，从而避免重复计算或 API 调用。

::code-group

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
::

## 类型

```ts [Signature]
export function useHydration<T> (key: string, get: () => T, set: (value: T) => void): void
```

## 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `key` | `string` | 唯一键，用于标识 Nuxt 应用中的数据。 |
| `get` | `() => T` | 仅在服务器上执行的函数（在 SSR 渲染完成时调用），用于设置初始值。 |
| `set` | `(value: T) => void` | 仅在客户端执行的函数（在初始 Vue 实例创建时调用），用于接收数据。 |

## 返回值

此可组合项不返回任何值。
