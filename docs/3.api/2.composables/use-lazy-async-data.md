---
title: useLazyAsyncData
description: 这个围绕 useAsyncData 的包装器会立即触发导航。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## 描述

默认情况下，[`useAsyncData`](/docs/api/composables/use-async-data) 在它的异步处理函数解决之前会阻止导航。`useLazyAsyncData` 提供了一个包裹在 [`useAsyncData`](/docs/api/composables/use-async-data) 周围的组件，通过将 `lazy` 选项设置为 `true`，它在处理函数解决之前触发导航。

::note
`useLazyAsyncData` 具有与 [`useAsyncData`](/docs/api/composables/use-async-data) 相同的签名。
::

:read-more{to="/docs/api/composables/use-async-data"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* 导航将在获取完成之前发生。
  在您的组件模板中直接处理 “pending” 和 “error” 状态。
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // 因为 count 可能一开始是 null
  // 你不会立即访问到它的内容，但你可以观察它。
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Loading' : count }}
  </div>
</template>
```

::warning
`useLazyAsyncData` 是由编译器转换的一个保留函数名，所以你不应该将你自己的函数命名为 `useLazyAsyncData`。
::

:read-more{to="/docs/getting-started/data-fetching"}
