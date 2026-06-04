---
title: 'useServerSeoMeta'
description: useServerSeoMeta 组合式函数允许你以扁平对象的形式，并具备完整的 TypeScript 支持来定义你站点的 SEO 元标签。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

::warning
`useServerSeoMeta` 已弃用。请改为在 `if (import.meta.server)` 块中包装 [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta)。在 `future.compatibilityVersion: 5` 下，自动导入将被移除。
::

`useServerSeoMeta` 允许你像 [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta) 一样，以扁平对象的形式并获得完整的 TypeScript 支持来定义你站点的 SEO 元标签，但它只在服务端运行，并且会从客户端 bundle 中被 tree-shaken 掉。

:read-more{to="/docs/4.x/api/composables/use-seo-meta"}

对于新代码，请直接使用仅限服务端的模式：

```vue [app/app.vue]
<script setup lang="ts">
if (import.meta.server) {
  useSeoMeta({
    robots: 'index, follow',
  })
}
</script>
```

参数与 [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta) 完全相同。

:read-more{to="/docs/4.x/getting-started/seo-meta"}
