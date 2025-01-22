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
