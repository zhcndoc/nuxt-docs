---
title: 'createUseAsyncData'
description: 一个工厂函数，用于创建带有预定义默认选项的自定义 useAsyncData 组合函数。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`createUseAsyncData` 创建一个带有预定义选项的自定义 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 组合函数。生成的组合函数具有完整的类型支持，行为完全类似于 `useAsyncData`，但默认配置已内置。

::note
`createUseAsyncData` 是一个编译器宏。它必须作为 **导出** 声明使用，并放置在 `composables/` 目录（或 Nuxt 编译器扫描的任何目录）中。Nuxt 会在构建时自动注入去重键。
::

## 用法

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

生成的组合函数拥有与 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 相同的签名和返回类型，调用者可以使用或覆盖所有选项。

## 类型

```ts [Signature]
function createUseAsyncData (
  options?: Partial<AsyncDataOptions>,
): typeof useAsyncData

function createUseAsyncData (
  options: (callerOptions: AsyncDataOptions) => Partial<AsyncDataOptions>,
): typeof useAsyncData
```

## 选项

`createUseAsyncData` 接受与 [`useAsyncData`](/docs/4.x/api/composables/use-async-data#params) 相同的所有选项，包括 `server`、`lazy`、`immediate`、`default`、`transform`、`pick`、`getCachedData`、`deep`、`dedupe`、`timeout` 和 `watch`。

完整选项列表请参见 [`useAsyncData` 文档](/docs/4.x/api/composables/use-async-data#params)。

## 默认模式与覆盖模式

### 默认模式（普通对象）

当传入的是普通对象时，工厂选项作为**默认值**，调用者可以覆盖任何选项：

```ts [app/composables/useLazyData.ts]
export const useLazyData = createUseAsyncData({
  lazy: true,
  server: false,
})
```

```ts
// 使用默认值（lazy: true，server: false）
const { data } = await useLazyData('key', () => fetchSomeData())

// 调用者覆盖 server 为 true
const { data } = await useLazyData('key', () => fetchSomeData(), { server: true })
```

### 覆盖模式（函数）

当传入的是函数时，工厂选项会**覆盖**调用者的选项。函数接收调用者选项作为参数：

```ts [app/composables/useStrictData.ts]
// 始终强制 deep 为 false
export const useStrictData = createUseAsyncData(callerOptions => ({
  deep: false,
}))
```

:read-more{to="/docs/4.x/guide/recipes/custom-usefetch"}

:read-more{to="/docs/4.x/api/composables/use-async-data"}
