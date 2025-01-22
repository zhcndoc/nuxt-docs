---
title: "callOnce"
description: "运行给定的函数或代码块，在服务器端渲染或客户端导航时只执行一次。"
navigation:
  badge: 新的
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
这个工具从 [Nuxt v3.9](/blog/v3-9) 版本开始可用。
::

## 目的

`callOnce` 函数旨在在以下情况下仅执行一次给定的函数或代码块：
- 服务器端渲染，但不包括 hydrate
- 客户端导航

这适用于应该只执行一次的代码，如记录事件或设置全局状态。

## 使用

`callOnce` 的默认模式是仅运行一次代码。例如，如果代码在服务器上运行，它不会在客户端再次运行。如果你在客户端多次使用 `callOnce`，例如通过返回此页面，它也不会再次运行。

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('这只会被打印一次')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

还可以在每次导航时运行，同时避免初始服务器/客户端双重负担。为此，可以使用 `navigation` 模式：

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('This will only be logged once and then on every client side navigation')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
`navigation` 模式自 [Nuxt v3.15](/blog/v3-15) 起可用。
::

::tip{to="/docs/getting-started/state-management#usage-with-pinia"}
`callOnce` 与 [Pinia 模块](/modules/pinia)结合使用时，用于调用 Store 操作非常有用。
::

:read-more{to="/docs/getting-started/state-management"}

::warning
`callOnce` 不返回任何内容。如果您想在服务器端执行数据获取，应使用 [`useAsyncData`](/docs/api/composables/use-async-data) 或 [`useFetch`](/docs/api/composables/use-fetch)。
::

::note
`callOnce` 是一个组合工具，旨在直接在设置函数、插件或路由中间件中调用，因为它需要在 Nuxt 负载中添加数据，以避免在页面 hydrate 时重新调用函数。
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

- `key`: 一个唯一的键，确保代码只执行一次。如果您不提供键，那么将为您生成一个唯一的键，该键与 `callOnce` 实例的文件和行号相对应。
- `fn`: 要执行一次的函数。这个函数也可以返回一个 `Promise` 和一个值。
- `options`: 设置模式，可以选择在导航时重新执行（`navigation`）或仅在应用程序的生命周期内执行一次（`render`）。默认为`render`。
  - `render`: 在初始渲染期间执行一次（无论是SSR还是CSR） - 默认模式
  - `navigation`: 在初始渲染时执行一次，并在随后的每次客户端导航时执行一次。
