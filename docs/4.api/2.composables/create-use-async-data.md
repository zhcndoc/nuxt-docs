---
title: 'createUseAsyncData'
description: 用于创建自定义 useAsyncData 组合式函数的工厂函数，并可预先定义默认选项。
minimalVersion: "4.4"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`createUseAsyncData` 会创建一个自定义的 [`useAsyncData`](/docs/api/composables/use-async-data) 组合式函数，并预先定义选项。生成的组合式函数具有完整的类型支持，功能与 `useAsyncData` 完全相同，但已内置默认值。

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

生成的组合式函数与 [`useAsyncData`](/docs/api/composables/use-async-data) 具有相同的签名和返回类型，调用者可以使用或覆盖所有选项。

## 类型

```ts [Signature]
function createUseAsyncData (
  options?: Partial<AsyncDataOptions> & { addons?: UseAsyncDataAddon[] },
): typeof useAsyncData

function createUseAsyncData (
  options: (callerOptions: AsyncDataOptions) => Partial<AsyncDataOptions>,
): typeof useAsyncData
```

返回的组合式函数的签名包含由 [附加组件](#addons) 提供的任何自定义选项和返回值扩展。

## 选项

`createUseAsyncData` 接受与 [`useAsyncData`](/docs/api/composables/use-async-data#parameters) 相同的所有选项，包括 `server`、`lazy`、`immediate`、`default`、`transform`、`pick`、`getCachedData`、`deep`、`dedupe`、`timeout` 和 `watch`。

完整选项列表请参阅 [`useAsyncData` 文档](/docs/api/composables/use-async-data#parameters)。

## 默认模式与覆盖模式

### 默认模式（普通对象）

传入普通对象时，工厂选项将作为**默认值**，调用者可以覆盖任何选项：

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

传入函数时，工厂选项将**覆盖**调用者的选项。该函数接收调用者选项作为参数：

```ts [app/composables/useStrictData.ts]
// 始终强制 deep 为 false
export const useStrictData = createUseAsyncData(callerOptions => ({
  deep: false,
}))
```

## 附加组件

除了 `useAsyncData` 选项之外，`createUseAsyncData` 还接受一个 `addons` 数组。附加组件是使用 [`defineUseAsyncDataAddon`](/docs/api/utils/define-use-async-data-addon) 定义的可复用行为单元。它们可以声明自定义调用选项、围绕处理程序运行中间件、扩展返回对象，并为组合式函数附加自定义逻辑。

例如，可以创建一个附加组件，在窗口重新获得焦点时刷新数据，并通过自定义的 `refreshOnFocus` 选项控制是否启用，让调用者逐次调用时选择是否启用：

```ts [app/composables/useCustomAsyncData.ts]
const refreshOnFocus = defineUseAsyncDataAddon({
  // augment the call-site options for the custom useAsyncData instance 👇
  setup: (options: UseAsyncDataAddonOptions<{ refreshOnFocus?: boolean }>) => {
    // 👈 run code *before* creating the `useAsyncData` instance
    if (import.meta.server || !options.refreshOnFocus) { return }

    return (asyncData) => {
      // 👈 run code *after* creating the `useAsyncData` instance
      const focused = useWindowFocus()
      watch(focused, (focused) => {
        if (focused) { asyncData.refresh() }
      })

      return { focused } // 👈 extend the returned object with a new property
    }
  },
})

export const useCustomAsyncData = createUseAsyncData({ addons: [refreshOnFocus] })
```

```vue [app/pages/index.vue]
<script setup lang="ts">
// `refreshOnFocus` is typed on the created composable
const { data } = await useCustomAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains'),
  { refreshOnFocus: true },
)
</script>
```

:read-more{to="/docs/api/utils/define-use-async-data-addon"}

:read-more{to="/docs/guide/recipes/custom-usefetch"}

:read-more{to="/docs/api/composables/use-async-data"}
