---
title: 'useLazyFetch'
description: 这是一个围绕 useFetch 的包装器，会立即触发导航。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## 描述

默认情况下，[`useFetch`](/docs/api/composables/use-fetch) 会阻止导航，直到其异步处理器解析完毕。`useLazyFetch` 是一个围绕 [`useFetch`](/docs/api/composables/use-fetch) 的包装器，通过将 `lazy` 选项设置为 `true`，实现导航在处理器解析之前立即触发。

::note
`useLazyFetch` 具有与 [`useFetch`](/docs/api/composables/use-fetch) 相同的签名。
::

::note
在此模式下，等待 `useLazyFetch` 只确保调用已初始化。在客户端导航时，数据可能不会立即可用，因此你应确保在应用中处理挂起状态。
::

:read-more{to="/docs/api/composables/use-fetch"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* 导航将在获取完成之前发生。
 * 在组件模板中直接处理 'pending' 和 'error' 状态
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // 由于 posts 可能初始为 null，因此你不能立即访问其内容，但可以监听它。
})
</script>

<template>
  <div v-if="status === 'pending'">
    加载中 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 执行某些操作 -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` 是一个由编译器转换的保留函数名，因此不应将自己的函数命名为 `useLazyFetch`。
::

:read-more{to="/docs/getting-started/data-fetching"}
