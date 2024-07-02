---
title: 'useHydration'
description: '允许完全控制水化循环，以设置和接收来自服务器的数据。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

`useHydration` 是一个内置的组合器，它提供了一种在每次新的 HTTP 请求时在服务器端设置数据并在客户端接收数据的方式。这样，`useHydration` 允许你对水合循环进行完全控制。

::note
这是一个高级组合器，主要在内部分配使用（`useAsyncData`）或在 Nuxt 模块中使用。
::

## 类型

```ts [signature]
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => {}
```

您可以在组合器、插件和组件内部使用 `useHydration()`。

`useHydration` 接受三个参数：

- `key`: 在 Nuxt 应用程序中唯一标识数据的键
  - **类型**: `String`
- `get`: 返回用于设置初始数据的值的函数
  - **类型**: `Function`
- `set`: 接收客户端数据的函数
  - **类型**: `Function`

一旦服务器端使用 `get` 函数返回初始数据，您就可以在 `nuxtApp.payload` 中使用作为 `useHydration` 组合器中第一个参数传递的唯一密钥来访问该数据。

:read-more{to="/docs/getting-started/data-fetching"}
