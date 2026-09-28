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
`useServerSeoMeta` 已弃用。请改为将 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 包裹在 `if (import.meta.server)` 块中。在 `future.compatibilityVersion: 5` 下将移除自动导入。
::

`useServerSeoMeta` 允许你以扁平对象的形式定义站点的 SEO 元标签，并提供完整的 TypeScript 支持，与 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 完全相同，但它仅在服务端运行，并会通过 tree-shaking 从客户端打包文件中移除。

:read-more{to="/docs/api/composables/use-seo-meta"}

对于新代码，请直接使用仅服务端模式：

```vue [app/app.vue]
<script setup lang="ts">
if (import.meta.server) {
  useSeoMeta({
    robots: 'index, follow',
  })
}
</script>
```

参数与 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 完全相同。

:read-more{to="/docs/getting-started/seo-meta"}
