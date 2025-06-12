---
title: 'useServerSeoMeta'
description: useServerSeoMeta 组合函数让你以扁平对象的形式定义站点的 SEO 元标签，并提供完整的 TypeScript 支持。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

就像 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 一样，`useServerSeoMeta` 组合函数让你以扁平对象的形式定义站点的 SEO 元标签，并提供完整的 TypeScript 支持。

:read-more{to="/docs/api/composables/use-seo-meta"}

在大多数情况下，meta 不需要是响应式的，因为爬虫只会扫描初始加载内容。因此我们推荐将 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 用作性能优化的工具，它在客户端不会执行任何操作（也不会返回 `head` 对象）。

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>
```

参数与 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 完全相同。

:read-more{to="/docs/getting-started/seo-meta"}
