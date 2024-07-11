---
title: 'reloadNuxtApp'
description: reloadNuxtApp 将会执行页面的硬刷新。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp` 将执行你的应用的硬刷新，重新请求页面及其依赖项。
::

默认情况下，它还会保存你的应用当前 `state`（即任何你可以通过 `useState` 访问的状态）。

::read-more{to="/docs/guide/going-further/experimental-features#restorestate" icon="i-ph-star-duotone"}
你可以通过在 `nuxt.config` 文件中启用 `experimental.restoreState` 选项来启用实验性的状态恢复。
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

### `options` (可选)

**类型**: `ReloadNuxtAppOptions`

一个接受以下属性的对象：

- `path` (可选)

  **类型**: `string`

  **默认值**: `window.location.pathname`

  要重新加载的路径（默认为当前路径）。如果这和当前的窗口位置不同，它将触发导航并在浏览器历史中添加一个条目。

- `ttl` (可选)

  **类型**: `number`

  **默认值**: `10000`

  在忽略未来重新加载请求的时间内所用的毫秒数。如果在之前指定的 TTL 时间内再次调用，`reloadNuxtApp` 将不会重新加载你的应用以避免重新加载循环。

- `force` (可选)

  **类型**: `boolean`

  **默认值**: `false`

  这个选项允许完全绕过重新加载循环保护，即使在一个已发生的 TTL 内也会强制重新加载。

- `persistState` (可选)

  **类型**: `boolean`

  **默认值**: `false`

  是否将当前的 Nuxt 状态存储到 sessionStorage（作为 `nuxt:reload:state`）。默认情况下，这不会对重新加载产生影响，除非也设置了 `experimental.restoreState`，或者除非你自己处理状态恢复。
