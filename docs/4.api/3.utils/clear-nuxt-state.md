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

- `keys`：[`useState`](/docs/api/composables/use-state) 中使用的一个或一组键，用于删除其缓存状态。如果没有提供密钥，**所有状态**都将失效。
- `opts`：用于配置清除行为的选项对象。
  - `reset` :徽章[v4.4]{color="info" size="xs" class="align-middle"}：当设置为 `true` 时，将状态重置为 [`useState`](/docs/api/composables/use-state) 的 `init` 函数提供的初始值，而不是将其设置为 `undefined`。组件提供的 `init` 功能仅在安装该组件时使用；由插件或路由中间件提供的一个在应用程序的生命周期内保留。如果没有可用的 `init` 功能，则状态设置为 `undefined`。如果未指定，则默认为 Nuxt 配置中 `experimental.defaults.useState.resetOnClear` 的值（默认为 `true`）。
