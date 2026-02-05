---
title: "callOnce"
description: "在 SSR 或 CSR 期间运行给定的函数或代码块一次。"
navigation:
  badge: 新
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
此工具自 [Nuxt v3.9](/blog/v3-9) 起可用。
::

## 目的

`callOnce` 函数设计用来仅运行给定的函数或代码块一次，适用于以下场景：
- 服务器端渲染时运行，但不包括水合阶段
- 客户端导航时运行

这对于只应执行一次的代码非常有用，例如记录事件或设置全局状态。

## 用法

`callOnce` 的默认模式是仅执行一次代码。举例来说，如果代码在服务器上运行，则不会在客户端再次运行。即使你在客户端多次调用 `callOnce`，例如通过返回该页面导航，也不会再次执行。

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('这条日志只会输出一次')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

你也可以选择在每次导航时运行，但避免初始的服务端和客户端重复加载。为此，可以使用 `navigation` 模式：

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('这条日志只会输出一次，之后每次客户端导航都会执行')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
`navigation` 模式自 [Nuxt v3.15](/blog/v3-15) 起可用。
::

::tip{to="/docs/3.x/getting-started/state-management#usage-with-pinia"}
`callOnce` 在结合 [Pinia 模块](/modules/pinia) 调用 store actions 时非常有用。
::

:read-more{to="/docs/3.x/getting-started/state-management"}

::warning
请注意，`callOnce` 不会返回任何值。如果你想在 SSR 期间进行数据获取，应使用 [`useAsyncData`](/docs/api/composables/use-async-data) 或 [`useFetch`](/docs/api/composables/use-fetch)。
::

::note
`callOnce` 是一个组合式函数，建议直接在 setup 函数、插件或路由中间件内调用，因为它需要将数据添加到 Nuxt 载荷中，以避免在页面水合时客户端重复调用该函数。
::

## 类型

```ts [Signature]
export function callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
export function callOnce (fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * callOnce 函数的执行模式
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## 参数

- `key`：一个唯一键，确保代码只被执行一次。如果不提供，系统将为你基于 `callOnce` 调用所在的文件和行号自动生成一个唯一键。
- `fn`：需要执行一次的函数，支持异步函数。
- `options`：设置模式，要么是在导航时重新执行 (`navigation`)，要么只在应用生命周期内执行一次 (`render`)。默认是 `render`。
  - `render`：在初始渲染期间执行一次（SSR 或 CSR）——默认模式
  - `navigation`：在初始渲染期间执行一次，之后每次客户端导航时也执行一次
