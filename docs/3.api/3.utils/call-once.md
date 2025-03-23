---
title: "callOnce"
description: "在 SSR 或 CSR 期间仅运行给定函数或代码块一次。"
navigation:
  badge: 新
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
此工具自 [Nuxt v3.9](/blog/v3-9) 起可用。
::

## 目的

`callOnce` 函数旨在仅在以下情况下执行给定的函数或代码块一次：
- 服务器端渲染，但不包括水合
- 客户端导航

这对于应只执行一次的代码非常有用，例如记录事件或设置全局状态。

## 用法

`callOnce` 的默认模式是只运行代码一次。例如，如果代码在服务器上运行，则它不会在客户端再次运行。如果你在客户端多次 `callOnce`，例如通过返回到此页面，则也不会再次运行。

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('这将仅记录一次')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

虽然默认情况下只会执行一次，但也可以在每次导航时运行，同时仍然避免初始的服务器/客户端双重加载。为此，可以使用 `navigation` 模式：

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('这将仅记录一次，然后在每次客户端导航时记录')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
`navigation` 模式自 [Nuxt v3.15](/blog/v3-15) 起可用。
::

::tip{to="/docs/getting-started/state-management#usage-with-pinia"}
`callOnce` 与 [Pinia 模块](/modules/pinia) 结合使用时非常有用，可以调用商店的动作。
::

:read-more{to="/docs/getting-started/state-management"}

::warning
请注意，`callOnce` 不会返回任何内容。如果您希望在SSR期间进行数据提取，则应使用 [`useAsyncData`](/docs/api/composables/use-async-data) 或 [`useFetch`](/docs/api/composables/use-fetch)。
::

::note
`callOnce` 是一个组合函数，应该在 setup 函数、插件或路由中间件中直接调用，因为它需要将数据添加到 Nuxt 负载中，以避免在页面水合时在客户端重新调用函数。
::

## 类型

```ts
callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
callOnce(fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * callOnce 函数的执行模式
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## 参数

- `key`: 一个唯一的键，确保代码仅运行一次。如果您不提供键，则会为您生成一个唯一于 `callOnce` 实例的文件和行号的键。
- `fn`: 要运行一次的函数。该函数也可以返回一个 `Promise` 和一个值。
- `options`: 设置模式，可以在导航时重新执行（`navigation`）或仅在应用程序生命周期内执行一次（`render`）。默认为 `render`。
  - `render`: 在初始渲染（无论是SSR还是CSR）期间执行一次 - 默认模式
  - `navigation`: 在初始渲染期间执行一次，并在之后的每次客户端导航时执行一次
