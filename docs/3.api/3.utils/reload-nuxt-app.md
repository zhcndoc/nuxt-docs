---
title: 'reloadNuxtApp'
description: reloadNuxtApp 将执行页面的硬刷新。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp` 会对您的应用执行硬刷新，从服务器重新请求页面及其依赖。
::

默认情况下，它还会保存您应用的当前 `state`（即任何您可以通过 `useState` 访问的状态）。

::read-more{to="/docs/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
您可以通过在 `nuxt.config` 文件中启用 `experimental.restoreState` 选项，开启该状态的实验性恢复功能。
::

## 类型

```ts
reloadNuxtApp(options?: ReloadNuxtAppOptions)

interface ReloadNuxtAppOptions {
  ttl?: number
  force?: boolean
  path?: string
  persistState?: boolean
}
```

### `options`（可选）

**类型**：`ReloadNuxtAppOptions`

一个包含如下属性的对象：

- `path`（可选）

  **类型**：`string`

  **默认值**：`window.location.pathname`

  要重新加载的路径（默认为当前路径）。如果该路径与当前窗口位置不同，
  则会触发导航并在浏览器历史记录中新增一条记录。

- `ttl`（可选）

  **类型**：`number`

  **默认值**：`10000`

  在此毫秒数内忽略后续的刷新请求。如果在该时间段内再次调用，
  `reloadNuxtApp` 将不会刷新应用，以避免刷新循环。

- `force`（可选）

  **类型**：`boolean`

  **默认值**：`false`

  此选项允许完全绕过刷新循环保护，即使在之前的 TTL 时间内已经刷新过，
  也会强制刷新页面。

- `persistState`（可选）

  **类型**：`boolean`

  **默认值**：`false`

  是否将当前 Nuxt 状态存储到 sessionStorage（存储键为 `nuxt:reload:state`）。
  默认情况下，除非同时启用了 `experimental.restoreState`，或您自行处理状态恢复，
  否则该选项对刷新不会产生影响。