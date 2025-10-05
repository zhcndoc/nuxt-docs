---
title: 'useLazyFetch'
description: 这是对 useFetch 的一个封装，会立即触发导航。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## 描述

默认情况下，[`useFetch`](/docs/4.x/api/composables/use-fetch) 会阻止导航，直到其异步处理程序解析完成。`useLazyFetch` 是对 [`useFetch`](/docs/4.x/api/composables/use-fetch) 的封装，通过将 `lazy` 选项设置为 `true`，在处理程序解析之前就触发导航。

::note
`useLazyFetch` 的签名与 [`useFetch`](/docs/4.x/api/composables/use-fetch) 相同。
::

::note
在此模式下等待 `useLazyFetch` 仅能确保调用已初始化。在客户端导航时，数据可能无法立即可用，您应确保在应用中处理挂起（pending）状态。
::

:read-more{to="/docs/4.x/api/composables/use-fetch"}

## 示例

```vue [app/pages/index.vue]
<script setup lang="ts">
/* 导航会在获取完成之前发生。
 * 直接在组件模板内处理 'pending' 和 'error' 状态
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // 由于 posts 可能一开始为 null，您无法立即访问其内容，但可以监视它。
})
</script>

<template>
  <div v-if="status === 'pending'">
    加载中 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 做一些事情 -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` 是一个被编译器转换的保留函数名，因此不要将自己的函数命名为 `useLazyFetch`。
::

:read-more{to="/docs/4.x/getting-started/data-fetching"}