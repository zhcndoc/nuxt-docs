---
title: "callOnce"
description: "在 SSR 或 CSR 期间运行一次指定的函数或代码块。"
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

`callOnce` 函数用于仅在以下情况之一中执行给定的函数或代码块一次：
- 在服务端渲染（SSR）期间，但不在水合（hydration）期间执行
- 在客户端导航（CSR）期间执行一次

这对于只应执行一次的代码很有用，例如记录事件或设置全局状态。

## 用法

`callOnce` 的默认模式是只运行一次代码。例如，如果代码在服务器上运行，则不会在客户端再次运行。如果你在客户端多次调用 `callOnce`（例如通过导航返回此页面），它也不会再次运行。

```vue [app/app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('This will only be logged once')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

也可以在每次导航时运行，同时仍避免初始的服务器/客户端双重加载。为此，可以使用 `navigation` 模式：

```vue [app/app.vue]
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

::tip{to="/docs/4.x/getting-started/state-management#usage-with-pinia"}
在与 [Pinia 模块](/modules/pinia) 结合使用时，`callOnce` 对调用 store actions 很有用。
::

:read-more{to="/docs/4.x/getting-started/state-management"}

::warning
请注意 `callOnce` 不会返回任何内容。如果你想在 SSR 期间进行数据获取，应使用 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 或 [`useFetch`](/docs/4.x/api/composables/use-fetch)。
::

::note
`callOnce` 是一个可组合函数，应直接在 setup 函数、插件或路由中间件中调用，因为它需要将数据添加到 Nuxt payload，以避免页面在水合时在客户端重新调用该函数。
::

## 类型

```ts [Signature]
export function callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
export function callOnce (fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * Execution mode for the callOnce function
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## 参数

- `key`：确保代码只运行一次的唯一键。如果你不提供键，将根据 `callOnce` 实例所在文件和行号为你生成一个唯一键。
- `fn`：要运行一次的函数。它可以是异步的。
- `options`：设置模式，选择在导航时重新执行（`navigation`）或仅在应用生命周期内执行一次（`render`）。默认值为 `render`。
  - `render`：在初始渲染期间执行一次（无论是 SSR 还是 CSR）- 默认模式
  - `navigation`：在初始渲染期间执行一次，并在随后的每次客户端导航时执行一次
