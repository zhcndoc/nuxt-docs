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
如果您想使 `useState` 的状态无效，此方法非常有用。
::

## 类型

```ts
clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

- `keys`: 一个键或一个数组，表示在 [`useState`](/docs/api/composables/use-state) 中用于删除其缓存状态的键。如果未提供键，**所有状态** 将被使无效。