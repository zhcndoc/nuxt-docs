---
title: useLazyAsyncData
description: 这个 useAsyncData 的包装器会立即触发导航。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## 介绍

默认情况下，[`useAsyncData`](/docs/api/composables/use-async-data) 会阻止导航，直到其异步处理器解析完成。`useLazyAsyncData` 提供了一个基于 [`useAsyncData`](/docs/api/composables/use-async-data) 的包装器，通过将 `lazy` 选项设置为 `true`，使导航在处理器解析之前就被触发。

::note
`useLazyAsyncData` 与 [`useAsyncData`](/docs/api/composables/use-async-data) 拥有相同的签名。
::

:read-more{to="/docs/api/composables/use-async-data"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* 导航会在数据获取完成之前发生。
  请在组件的模板中直接处理 'pending' 和 'error' 状态
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // 因为 count 可能初始化为 null，您无法立即访问它的内容，但您可以监听它的变化。
})
</script>

<template>
  <div>
    {{ status === 'pending' ? '加载中' : count }}
  </div>
</template>
```

::warning
`useLazyAsyncData` 是编译器转换的保留函数名，因此您不应该将自己的函数命名为 `useLazyAsyncData`。
::

:read-more{to="/docs/getting-started/data-fetching"}