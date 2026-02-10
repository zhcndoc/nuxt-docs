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
此方法在你想使 `useState` 的状态失效时很有用。
::

## Type

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## Parameters

- `keys`: 一个或多个在 [`useState`](/docs/4.x/api/composables/use-state) 中使用的键，用于删除它们的缓存状态。如果未提供键，则会使 **所有状态** 失效。
