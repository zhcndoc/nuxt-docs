---
title: 'reloadNuxtApp'
description: reloadNuxtApp 将对页面执行一次硬刷新。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp` 将对你的应用执行一次硬刷新，从服务器重新请求页面及其依赖项。
::

默认情况下，它还会保存应用的当前 `state`（即任何你可以通过 `useState` 访问的状态）。

::read-more{to="/docs/4.x/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
你可以通过在 `nuxt.config` 文件中启用 `experimental.restoreState` 选项来开启该状态的实验性恢复功能。
::

## 类型

```ts [Signature]
export function reloadNuxtApp (options?: ReloadNuxtAppOptions)

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

  要重新加载的路径（默认为当前路径）。如果该路径与当前窗口位置不同，
  将触发一次导航并在浏览器历史中添加一条记录。

- `ttl`（可选）

  **类型**: `number`

  **默认**: `10000`

  在此毫秒数时间内将忽略后续的重新加载请求。如果在此时间段内再次调用，
  `reloadNuxtApp` 将不会重新加载应用以避免刷新循环。

- `force`（可选）

  **类型**: `boolean`

  **默认**: `false`

  此选项允许完全绕过刷新循环保护，即使在之前指定的 TTL 时间内已发生过刷新，也强制进行刷新。

- `persistState`（可选）

  **类型**: `boolean`

  **默认**: `false`

  是否将当前的 Nuxt 状态写入 sessionStorage（作为 `nuxt:reload:state`）。默认情况下，
  除非同时设置了 `experimental.restoreState`，或你自行处理状态恢复，否则这对刷新不会有影响。