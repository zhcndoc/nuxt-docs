---
title: 'clearNuxtState'
description: 删除 `useState` 的缓存状态。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
此方法在你想使 `useState` 的状态失效时很有用。你也可以通过传入第二个参数 `{ reset: true }` 来将状态重置为初始值。
::

## Type

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean), opts?: ClearNuxtStateOptions): void
```

## Parameters

- `keys`: 一个或多个在 [`useState`](/docs/4.x/api/composables/use-state) 中使用的键，用于删除它们的缓存状态。如果未提供键，则会使 **所有状态** 失效。
- `opts`: 用于配置清除行为的选项对象。
  - `reset`: 如果设置为 `true`，则将状态重置为 [`useState`](/docs/4.x/api/composables/use-state) 的 `init` 函数提供的初始值，而不是设置为 `undefined`。如果未指定，则默认为 Nuxt 配置中的 `experimental.defaults.useState.resetOnClear`（在 `compatibilityVersion: 5` 下默认为 `true`）。
