---
title: 'useSeoMeta'
description: useSeoMeta 组件允许您将网站的 SEO 元标签定义为一个带有完整 TypeScript 支持的平坦对象。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

这有助于您避免常见的错误，例如使用 `name` 而不是 `property`，以及拼写错误 - 拥有超过 100 个完全类型化的元标签。

::important
这是向您的网站添加元标签推荐的方式，因为它是 XSS 安全的，并且具有完整的 TypeScript 支持。
::

:read-more{to="/docs/getting-started/seo-meta"}

## 使用方法

```vue [app.vue]
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

当插入可响应的标签时，您应该使用计算获取器语法 (`() => value`):

```vue [app.vue]
<script setup lang="ts">
const title = ref('我的标题')

useSeoMeta({
  title,
  description: () => `This is a description for the ${title.value} page`
})
</script>
```

## 参数

有超过 100 个参数。请查看 [源代码中的完整参数列表](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035)。

:read-more{to="/docs/getting-started/seo-meta"}

## 性能

在大多数情况下，SEO 元标签不需要是响应式的，因为搜索引擎机器人主要扫描初始页面加载。

为了获得更好的性能，当元标签不需要响应式时，你可以将 `useSeoMeta` 调用包装在仅限服务器的条件中：

```vue [app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // 这些元标签仅在服务器端渲染时添加
  useSeoMeta({
    robots: 'index, follow',
    description: 'Static description that does not need reactivity',
    ogImage: 'https://example.com/image.png',
    // other static meta tags...
  })
}

const dynamicTitle = ref('My title')
// 仅在必要时在条件外使用反应式元标签
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

这之前使用了 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 组合式 API，但它已被弃用，取而代之的是这种方法。
