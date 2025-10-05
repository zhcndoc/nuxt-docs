---
title: useLazyAsyncData
description: 此包装器围绕 useAsyncData，会立即触发导航。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## 描述

默认情况下，[`useAsyncData`](/docs/4.x/api/composables/use-async-data) 会阻塞导航，直到其异步处理器解析完成。`useLazyAsyncData` 通过将 `lazy` 选项设置为 `true`，提供了一个围绕 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 的包装器，它会在处理器解析完成之前触发导航。

::note
`useLazyAsyncData` 的签名与 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 相同。
::

:read-more{to="/docs/4.x/api/composables/use-async-data"}

## 示例

```vue [app/pages/index.vue]
<script setup lang="ts">
/* 导航将在获取完成之前发生。
  在组件模板中直接处理 'pending' 和 'error' 状态
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // 由于 count 可能一开始为 null，你不能立即访问其内容，但可以通过 watch 监听它。
})
</script>

<template>
  <div>
    {{ status === 'pending' ? '加载中' : count }}
  </div>
</template>
```

::warning
`useLazyAsyncData` 是由编译器转换的保留函数名，因此你不应将自己的函数命名为 `useLazyAsyncData`。
::

:read-more{to="/docs/4.x/getting-started/data-fetching"}