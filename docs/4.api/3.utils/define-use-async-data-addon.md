---
title: 'defineUseAsyncDataAddon'
description: 定义一个可复用的扩展，用于扩展通过 createUseAsyncData 创建的组合式函数。
minimalVersion: "4.6"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/addons.ts
    size: xs
---

`defineUseAsyncDataAddon` 为通过 [`createUseAsyncData`](/docs/api/composables/create-use-async-data) 创建的 `useAsyncData` 组合式函数定义可复用的扩展。

扩展可以声明自定义调用选项、使用中间件包装处理程序、附加自定义响应式逻辑，或扩展返回的对象。

:read-more{to="/docs/api/utils/define-use-fetch-addon" title="defineUseFetchAddon：useAsyncData 的扩展与 useFetch 的扩展工作方式相同"}

## 用法

例如，添加一个 `pollEvery` 选项的扩展，可按间隔刷新数据：

```ts [app/composables/usePolledAsyncData.ts]
const polling = defineUseAsyncDataAddon({
  setup: (options: UseAsyncDataAddonOptions<{ pollEvery?: number }>) => {
    if (import.meta.server || !options.pollEvery) { return }
    return (asyncData) => {
      const interval = setInterval(() => asyncData.refresh(), options.pollEvery)
      onScopeDispose(() => clearInterval(interval))
    }
  },
})

export const usePolledAsyncData = createUseAsyncData({ addons: [polling] })
```

```vue [app/pages/index.vue]
<script setup lang="ts">
// refreshes the data every 30 seconds
const { data } = await usePolledAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains'),
  { pollEvery: 30_000 },
)
</script>
```

::note
扩展按 `addons` 数组中的顺序运行，第一个扩展的中间件作为最外层包装器。同一个扩展对象在列表中出现多次时，也只会运行一次。
::

## 类型

```ts [Signature]
function defineUseAsyncDataAddon<Opts extends Record<string, any> = {}, Ext = {}> (addon: {
  setup: (options: UseAsyncDataAddonOptions<Opts>) => ((asyncData: AsyncDataAddonInstance) => Ext | void) | void
}): UseAsyncDataAddon<Opts, Ext>
```
