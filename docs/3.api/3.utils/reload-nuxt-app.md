---
title: 'reloadNuxtApp'
description: reloadNuxtApp 将执行页面的硬重载。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp`将对您的应用程序执行硬重载，从服务器重新请求页面及其依赖项。
::

默认情况下，它还将保存您应用程序的当前 `state`（即，您可以通过 `useState` 访问的任何状态）。

::read-more{to="/docs/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
您可以通过在 `nuxt.config` 文件中启用 `experimental.restoreState` 选项来开启对该状态的实验性恢复。
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

**类型**: `ReloadNuxtAppOptions`

一个接受以下属性的对象：

- `path`（可选）

  **类型**: `string`

  **默认**: `window.location.pathname`

  要重载的路径（默认为当前路径）。如果与当前窗口位置不同，它将触发导航并在浏览器历史记录中添加一条记录。

- `ttl`（可选）

  **类型**: `number`

  **默认**: `10000`

  忽略将来的重载请求的毫秒数。如果在此时间段内再次调用，`reloadNuxtApp`将不会重载您的应用程序，以避免重载循环。

- `force`（可选）

  **类型**: `boolean`

  **默认**: `false`

  此选项允许完全绕过重载循环保护，即使在之前指定的TTL内发生过重载，也强制重载。

- `persistState`（可选）

  **类型**: `boolean`

  **默认**: `false`

  是否将当前 Nuxt 状态转储到 sessionStorage（作为 `nuxt:reload:state`）。默认情况下，除非同时设置 `experimental.restoreState`，否则这将对重载没有影响，或者除非您自己处理状态恢复。