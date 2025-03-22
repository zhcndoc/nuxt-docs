---
title: 'useServerSeoMeta'
description: useServerSeoMeta 可组合函数允许你将站点的 SEO 元标签定义为一个平面对象，全面支持 TypeScript。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

就像 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 一样，`useServerSeoMeta` 可组合函数允许你将站点的 SEO 元标签定义为一个平面对象，全面支持 TypeScript。

:read-more{to="/docs/api/composables/use-seo-meta"}

在大多数情况下，元标签不需要响应式，因为爬虫只会扫描初始加载的内容。因此，我们推荐使用 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 作为一种关注性能的工具，它在客户端不会执行任何操作（或返回 `head` 对象）。

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>
```

参数与 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 完全相同。

:read-more{to="/docs/getting-started/seo-meta"}