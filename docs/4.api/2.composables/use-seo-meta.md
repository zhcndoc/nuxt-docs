---
title: 'useSeoMeta'
description: 该 useSeoMeta 可组合函数允许你以扁平对象定义站点的 SEO 元标签，并提供完整的 TypeScript 支持。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

这可以帮助你避免常见错误，例如使用 `name` 而不是 `property`，以及拼写错误 —— 提供对 100+ 元标签的完整类型支持。

::important
这是向站点添加元标签的推荐方式，因为它是 XSS 安全的并且提供完整的 TypeScript 支持。
::

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## 用法

```vue [app/app.vue]
<script setup lang="ts">
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

在插入响应式标签时，应使用计算属性的 getter 语法（`() => value`）：

```vue [app/app.vue]
<script setup lang="ts">
const title = ref('My title')

useSeoMeta({
  title,
  description: () => `This is a description for the ${title.value} page`,
})
</script>
```

## 参数

有 100 多个参数。请参阅 [源代码中的完整参数列表](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035)。

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## 性能

在大多数情况下，SEO 元标签不需要是响应式的，因为搜索引擎爬虫主要会扫描初始页面加载内容。

为了获得更好的性能，当元标签不需要是响应式时，你可以在仅服务器端的条件下包裹你的 `useSeoMeta` 调用：

```vue [app/app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // These meta tags will only be added during server-side rendering
  useSeoMeta({
    robots: 'index, follow',
    description: 'Static description that does not need reactivity',
    ogImage: 'https://example.com/image.png',
    // other static meta tags...
  })
}

const dynamicTitle = ref('My title')
// Only use reactive meta tags outside the condition when necessary
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

以前这使用的是 [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta) 可组合函数，但它已弃用，推荐使用当前这种方式。
