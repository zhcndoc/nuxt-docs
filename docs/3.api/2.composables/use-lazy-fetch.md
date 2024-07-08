---
title: 'useLazyFetch'
description: 这个围绕 useFetch 的包装器会立即触发导航。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## 描述

默认情况下，[`useFetch`](/docs/api/composables/use-fetch) 直到其异步处理函数被解析后才会阻塞导航。`useLazyFetch` 提供一个包装器，它通过将 `lazy` 选项设置为 `true` 来在处理函数被解析之前触发导航，它是对 [`useFetch`](/docs/api/composables/use-fetch) 的包装。

::note
`useLazyFetch` 具有与 [`useFetch`](/docs/api/composables/use-fetch) 相同的签名。
::

:read-more{to="/docs/api/composables/use-fetch"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* 导航将在获取完成之前发生。
 * 在组件模板中直接处理 “pending” 和 “error” 状态
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // 因为 posts 一开始可能是 null，所以你不会立即访问
  // 它的内容，但是你可以观察它。
})
</script>

<template>
  <div v-if="status === 'pending'">
    加载中 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 做某事 -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` 是一个由编译器转换的保留函数名，因此你不应该将你的函数命名为 `useLazyFetch`。
::

:read-more{to="/docs/getting-started/data-fetching"}
