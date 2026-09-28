---
title: 'useServerSeoMeta'
description: useServerSeoMeta 组合函数让你以扁平对象的形式定义站点的 SEO 元标签，并提供完整的 TypeScript 支持。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

与 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 类似，`useServerSeoMeta` 组合函数让你以扁平对象的形式定义站点的 SEO 元标签，并提供完整的 TypeScript 支持。

:read-more{to="/docs/api/composables/use-seo-meta"}

在大多数情况下，元标签无需响应式，因为 robots 只会扫描初始加载的内容。因此，我们建议将 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 用作性能优化工具，它在客户端不会执行任何操作（也不会返回 `head` 对象）。

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow',
})
</script>
```

参数与 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 完全相同

:read-more{to="/docs/getting-started/seo-meta"}
