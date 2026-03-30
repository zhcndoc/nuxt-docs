---
title: 'createUseAsyncData'
description: 一个工厂函数，用于创建带有预定义默认选项的自定义 useAsyncData 可组合项。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`createUseAsyncData` 会创建一个带有预定义选项的自定义 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 可组合项。生成的可组合项具有完整的类型，并且与 `useAsyncData` 的工作方式完全一致，只是把你的默认值“烘焙”进去了。

::note
`createUseAsyncData` 是一个编译宏。它必须作为 `composables/` 目录下（或任何被 Nuxt 编译器扫描的目录）中的**导出**声明来使用。Nuxt 会在构建时自动注入去重键（de-duplication keys）。
::

## Usage

```ts [app/composables/useCachedData.ts]
export const useCachedData = createUseAsyncData({
  getCachedData (key, nuxtApp) {
    return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
  },
})
```

```vue [app/pages/index.vue]
<script setup lang="ts">
const { data: mountains } = await useCachedData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains'),
)
</script>
```

生成的可组合项具有与 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 相同的签名和返回类型，并且所有选项都可供调用者使用或覆盖。

## Type

```ts [Signature]
function createUseAsyncData (
  options?: Partial<AsyncDataOptions>,
): typeof useAsyncData

function createUseAsyncData (
  options: (callerOptions: AsyncDataOptions) => Partial<AsyncDataOptions>,
): typeof useAsyncData
```

## Options

`createUseAsyncData` 接受与 [`useAsyncData`](/docs/4.x/api/composables/use-async-data#params) 相同的所有选项，包括 `server`、`lazy`、`immediate`、`default`、`transform`、`pick`、`getCachedData`、`deep`、`dedupe`、`timeout` 和 `watch`。

请在 [`useAsyncData 文档`](/docs/4.x/api/composables/use-async-data#params) 中查看完整的选项列表。

## Default vs Override Mode

### Default Mode（纯对象）

当你传入一个纯对象时，工厂选项充当**默认值**。调用者可以覆盖任意选项：

```ts [app/composables/useLazyData.ts]
export const useLazyData = createUseAsyncData({
  lazy: true,
  server: false,
})
```

```ts
// 使用默认值（lazy: true, server: false）
const { data } = await useLazyData('key', () => fetchSomeData())

// 调用者将 server 覆盖为 true
const { data } = await useLazyData('key', () => fetchSomeData(), { server: true })
```

### Override Mode（函数）

当你传入一个函数时，工厂选项会**覆盖**调用者的选项。该函数会接收调用者的选项作为参数：

```ts [app/composables/useStrictData.ts]
// deep 永远被强制为 false
export const useStrictData = createUseAsyncData(callerOptions => ({
  deep: false,
}))
```

:read-more{to="/docs/4.x/guide/recipes/custom-usefetch"}

:read-more{to="/docs/4.x/api/composables/use-async-data"}
