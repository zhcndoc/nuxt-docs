---
title: 'useServerSeoMeta'
description: useServerSeoMeta 组合式函数允许你以扁平对象并具备完整 TypeScript 支持来定义站点的 SEO 元标签。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

和 [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta) 一样，`useServerSeoMeta` 组合式函数允许你以一个扁平对象并且拥有完整 TypeScript 支持来定义站点的 SEO 元标签。

:read-more{to="/docs/4.x/api/composables/use-seo-meta"}

在大多数情况下，meta 不需要是响应式的，因为爬虫只会扫描首次加载。因此我们建议将 [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta) 用作面向性能的工具——它在客户端不会执行任何操作（也不会返回 `head` 对象）。

```vue [app/app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow',
})
</script>
```

参数与 [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta) 完全相同

:read-more{to="/docs/4.x/getting-started/seo-meta"}