---
title: 'useServerSeoMeta'
description: useServerSeoMeta 可组合对象允许您将网站的 SEO 元标签定义为具有完整 TypeScript 支持的平面对象。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

就像 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 一样，`useServerSeoMeta` 可组合对象允许您将网站的 SEO 元标签定义为具有完整 TypeScript 支持的平面对象。

:read-more{to="/docs/api/composables/use-seo-meta"}

在大多数情况下，元数据不需要是反应式的，因为机器人只会扫描初始加载。因此，我们建议使用 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 作为性能导向的工具，它在客户端不会执行任何操作（或返回 `head` 对象）。

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>
```

参数与 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 完全相同。

:read-more{to="/docs/getting-started/seo-meta"}
