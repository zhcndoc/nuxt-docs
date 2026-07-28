---
title: 'clearNuxtState'
description: 删除 useState 的缓存状态。
minimalVersion: "3.6"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
此方法在你想使 `useState` 的状态失效时很有用。你也可以通过传入第二个参数 `{ reset: true }` 来将状态重置为初始值。
::

## 类型

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean), opts?: ClearNuxtStateOptions): void
```

## 参数

- `keys`：一个或多个键，用于在 [`useState`](/docs/4.x/api/composables/use-state) 中删除其缓存状态。如果未提供任何键，**所有状态**都将失效。
- `opts`：用于配置清除行为的选项对象。
  - `reset` :badge[v4.4]{color="info" size="xs" class="align-middle"}：设置为 `true` 时，会将状态重置为 [`useState`](/docs/4.x/api/composables/use-state) 的 `init` 函数提供的初始值，而不是将其设为 `undefined`。如果未指定，则默认为 Nuxt 配置中 `experimental.defaults.useState.resetOnClear` 的值（在 `compatibilityVersion: 5` 时该值为 `true`）。
