---
title: 'useLazyFetch'
description: 这个包裹在 useFetch 周围的函数会立即触发导航。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## 描述

默认情况下，[`useFetch`](/docs/api/composables/use-fetch) 在其异步处理程序解析之前会阻止导航。`useLazyFetch` 提供了一个包裹 [`useFetch`](/docs/api/composables/use-fetch) 的函数，通过将 `lazy` 选项设置为 `true`，在处理程序解析之前触发导航。

::note
`useLazyFetch` 的函数签名与 [`useFetch`](/docs/api/composables/use-fetch) 相同。
::

::note
在此模式下等待 `useLazyFetch` 仅确保调用被初始化。在客户端导航时，数据可能不会立即可用，您应确保在应用程序中处理挂起状态。
::

:read-more{to="/docs/api/composables/use-fetch"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* 导航将在获取完成之前发生。
 * 请直接在组件的模板中处理 'pending' 和 'error' 状态。
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // 因为 posts 可能最开始是 null，您将无法立即访问
  // 它的内容，但您可以监视它。
})
</script>

<template>
  <div v-if="status === 'pending'">
    加载中 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 执行某项操作 -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` 是一个被编译器转换的保留函数名，因此您不应将自己的函数命名为 `useLazyFetch`。
::

:read-more{to="/docs/getting-started/data-fetching"}