---
title: 'createUseAsyncData'
description: 创建一个自定义的 useAsyncData 可组合项工厂函数，并预设默认选项。
minimalVersion: "4.4"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`createUseAsyncData` 会创建一个带有预定义选项的自定义 [`useAsyncData`](/docs/api/composables/use-async-data) 可组合项。生成的可组合项具有完整的类型，并且与 `useAsyncData` 的工作方式完全相同，只是预先设置了默认值。

::note
`createUseAsyncData` 是一个编译宏。它必须作为 `composables/` 目录下（或任何被 Nuxt 编译器扫描的目录）中的**导出**声明来使用。Nuxt 会在构建时自动注入去重键（de-duplication keys）。
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

生成的可组合项与 [`useAsyncData`](/docs/api/composables/use-async-data) 具有相同的签名和返回类型，调用者可以使用或覆盖所有选项。

## 类型

```ts [Signature]
function createUseAsyncData (
  options?: Partial<AsyncDataOptions> & { addons?: UseAsyncDataAddon[] },
): typeof useAsyncData

function createUseAsyncData (
  options: (callerOptions: AsyncDataOptions) => Partial<AsyncDataOptions>,
): typeof useAsyncData
```

## 选项

`createUseAsyncData` 接受与 [`useAsyncData`](/docs/api/composables/use-async-data#parameters) 相同的所有选项，包括 `server`、`lazy`、`immediate`、`default`、`transform`、`pick`、`getCachedData`、`deep`、`dedupe`、`timeout` 和 `watch`。

请参阅 [`useAsyncData` 文档](/docs/api/composables/use-async-data#parameters)中的完整选项列表。

返回的组合式函数签名会包含 [addons](#addons) 提供的自定义选项和返回值扩展。

## Addons

除 `useAsyncData` 选项外，`createUseAsyncData` 还接受 `addons` 数组。Addon 是使用 [`defineUseAsyncDataAddon`](/docs/api/utils/define-use-async-data-addon) 定义的可复用行为单元。它们可以声明调用时的自定义选项、在 handler 外运行中间件、扩展返回对象，并为组合式函数添加自定义逻辑。

例如，下面的 addon 会在窗口重新获得焦点时刷新数据，并通过自定义的 `refreshOnFocus` 选项控制；调用方可以逐次选择是否启用：

```ts [app/composables/useCustomAsyncData.ts]
const refreshOnFocus = defineUseAsyncDataAddon({
  // 为自定义 useAsyncData 实例扩展调用选项
  setup: (options: UseAsyncDataAddonOptions<{ refreshOnFocus?: boolean }>) => {
    // 创建 useAsyncData 实例之前运行
    if (import.meta.server || !options.refreshOnFocus) { return }

    return (asyncData) => {
      // 创建 useAsyncData 实例之后运行
      const focused = useWindowFocus()
      watch(focused, (focused) => {
        if (focused) { asyncData.refresh() }
      })

      return { focused } // 为返回对象增加新属性
    }
  },
})

export const useCustomAsyncData = createUseAsyncData({ addons: [refreshOnFocus] })
```

```vue [app/pages/index.vue]
<script setup lang="ts">
// 创建的组合式函数会为 `refreshOnFocus` 提供类型
const { data } = await useCustomAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains'),
  { refreshOnFocus: true },
)
</script>
```

:read-more{to="/docs/api/utils/define-use-async-data-addon"}

## 默认模式 vs 覆盖模式

### 默认模式（纯对象）

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

### 覆盖模式（函数）

当你传入一个函数时，工厂选项会**覆盖**调用者的选项。该函数会接收调用者的选项作为参数：

```ts [app/composables/useStrictData.ts]
// deep 永远被强制为 false
export const useStrictData = createUseAsyncData(callerOptions => ({
  deep: false,
}))
```

:read-more{to="/docs/guide/recipes/custom-usefetch"}

:read-more{to="/docs/api/composables/use-async-data"}
