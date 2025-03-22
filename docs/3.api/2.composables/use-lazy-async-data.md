---
title: useLazyAsyncData
description: 这个对 useAsyncData 的封装会立即触发导航。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## 描述

默认情况下，[`useAsyncData`](/docs/api/composables/use-async-data) 在其异步处理程序解析之前会阻止导航。 `useLazyAsyncData` 提供了一个围绕 [`useAsyncData`](/docs/api/composables/use-async-data) 的封装，通过将 `lazy` 选项设置为 `true` 来在处理程序解析之前触发导航。

::note
`useLazyAsyncData` 的签名与 [`useAsyncData`](/docs/api/composables/use-async-data) 相同。
::

:read-more{to="/docs/api/composables/use-async-data"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* 导航将在获取完成之前发生。
  在组件的模板中直接处理 'pending' 和 'error' 状态
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // 由于 count 可能一开始为 null，因此您不会立刻访问其内容，
  // 但您可以进行观察。
})
</script>

<template>
  <div>
    {{ status === 'pending' ? '加载中' : count }}
  </div>
</template>
```

::warning
`useLazyAsyncData` 是一个被编译器转换的保留函数名，因此您不应将自己的函数命名为 `useLazyAsyncData`。
::

:read-more{to="/docs/getting-started/data-fetching"}