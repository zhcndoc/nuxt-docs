---
title: 'useSeoMeta'
description: useSeoMeta 组合函数允许您将网站的 SEO 元标签定义为一个扁平对象，并支持完整的 TypeScript。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

这可以帮助您避免常见错误，例如使用 `name` 而不是 `property`，以及拼写错误 - 超过 100 个元标签均已完全类型化。

::important
这是向您的网站添加元标签的推荐方式，因为它是 XSS 安全的，并且支持完整的 TypeScript。
::

:read-more{to="/docs/getting-started/seo-meta"}

## 用法

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  title: '我的惊人网站',
  ogTitle: '我的惊人网站',
  description: '这是我的惊人网站，让我告诉您所有关于它的事情。',
  ogDescription: '这是我的惊人网站，让我告诉您所有关于它的事情。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

在插入响应式标签时，您应该使用计算属性的获取器语法（`() => value`）：

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

有超过 100 个参数。请查看 [源代码中的完整参数列表](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035)。

:read-more{to="/docs/getting-started/seo-meta"}

## 性能

在大多数情况下，SEO 元标签不需要是响应式的，因为搜索引擎机器人主要扫描初始页面加载。

为了更好的性能，当元标签不需要响应式时，您可以将 `useSeoMeta` 调用包装在仅服务器的条件中：

```vue [app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // 这些元标签将在服务器端渲染期间添加
  useSeoMeta({
    robots: 'index, follow',
    description: '静态描述，无需响应性',
    ogImage: 'https://example.com/image.png',
    // 其他静态元标签...
  })
}

const dynamicTitle = ref('我的标题')
// 仅在条件之外在必要时使用响应式元标签
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

这之前使用了 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 组合函数，但它已被弃用，取而代之的是这种方法。
