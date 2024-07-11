---
title: 'clearNuxtState'
description: 清除 useState 的缓存状态。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
这个方法对于想要清除 useState 的状态非常有用。
::

## 类型

```ts
clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

- `keys`: 用于 useState 的一个或一组键，用于删除它们的缓存状态。如果没有提供键，所有状态将被无效化。
