---
title: 'useSeoMeta'
description: useSeoMeta 组合式函数让你可以以扁平对象定义站点的 SEO 元标签，并且提供完整的 TypeScript 支持。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

这能帮助你避免常见错误，比如使用 `name` 而不是 `property`，以及拼写错误 —— 支持 100 多种完全类型化的元标签。

::important
这是向站点添加元标签的推荐方式，因为它防止 XSS 攻击并且拥有完整的 TypeScript 支持。
::

:read-more{to="/docs/3.x/getting-started/seo-meta"}

## 用法

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  title: '我的精彩网站',
  ogTitle: '我的精彩网站',
  description: '这是我的精彩网站，让我来告诉你所有细节。',
  ogDescription: '这是我的精彩网站，让我来告诉你所有细节。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

当插入响应式标签时，应使用计算属性的 getter 语法 (`() => value`)：

```vue [app.vue]
<script setup lang="ts">
const title = ref('我的标题')

useSeoMeta({
  title,
  description: () => `这是 ${title.value} 页面的描述`
})
</script>
```

## 参数

参数超过 100 个。请查看[源码中的完整参数列表](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035)。

:read-more{to="/docs/3.x/getting-started/seo-meta"}

## 性能

大多数情况下，SEO 元标签不需要响应式，因为搜索引擎机器人主要扫描页面首次加载时的内容。

为了更好性能，当元标签不需要响应式时，你可以在服务器端条件下调用 `useSeoMeta`：

```vue [app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // 这些元标签只在服务器端渲染时添加
  useSeoMeta({
    robots: 'index, follow',
    description: '不需要响应式的静态描述',
    ogImage: 'https://example.com/image.png',
    // 其他静态元标签...
  })
}

const dynamicTitle = ref('我的标题')
// 只在必要时，在条件外使用响应式元标签
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

该方案之前使用的是 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 组合式函数，但现已废弃，推荐使用此方法。