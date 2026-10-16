---
title: 'defineUseAsyncDataAddon'
description: 定义可复用的 addon，以扩展通过 createUseAsyncData 创建的组合式函数。
minimalVersion: "4.6"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/addons.ts
    size: xs
---

`defineUseAsyncDataAddon` 用于为 [`createUseAsyncData`](/docs/api/composables/create-use-async-data) 创建的 `useAsyncData` 组合式函数定义可复用扩展。

Addon 可以声明调用时的自定义选项、使用中间件包装 handler、附加自定义响应式逻辑，或扩展返回对象。

:read-more{to="/docs/api/utils/define-use-fetch-addon" title="defineUseFetchAddon：useAsyncData 的 addon 与 useFetch 的 addon 用法相同"}

## 用法

例如，下面的 addon 添加 `pollEvery` 选项，按指定间隔刷新数据：

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
// 每 30 秒刷新一次数据
const { data } = await usePolledAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains'),
  { pollEvery: 30_000 },
)
</script>
```

::note
Addon 按 `addons` 数组中的顺序运行，第一个 addon 的中间件位于最外层。同一个 addon 对象即使列出多次也只会运行一次。
::

## 类型

```ts [Signature]
function defineUseAsyncDataAddon<Opts extends Record<string, any> = {}, Ext = {}> (addon: {
  setup: (options: UseAsyncDataAddonOptions<Opts>) => ((asyncData: AsyncDataAddonInstance) => Ext | void) | void
}): UseAsyncDataAddon<Opts, Ext>
```
