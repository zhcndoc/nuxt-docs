---
title: 'clearNuxtState'
description: 删除 useState 的缓存状态。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
如果你想使 `useState` 的状态失效，此方法非常有用。
::

## 类型

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

- `keys`：一个或多个用于 [`useState`](/docs/api/composables/use-state) 的键，用于删除它们的缓存状态。如果未提供任何键，**所有状态** 都会被失效。