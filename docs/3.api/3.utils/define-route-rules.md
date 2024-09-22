---
title: 'defineRouteRules'
description: '在页面级别为混合渲染定义路由规则。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-ph-star"}
此功能是实验性的，为了使用它，您必须在您的 `nuxt.config` 中启用 `experimental.inlineRouteRules` 选项。
::

## 用法

```vue [pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true
})
</script>

<template>
  <h1>Hello world!</h1>
</template>
```

将被转换成：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  }
})
```

::note
当运行 [`nuxt build`](/docs/api/commands/build) 时，首页将在 `.output/public/index.html` 中被预渲染并静态地提供。
::

## 注解

- 在 `~/pages/foo/bar.vue` 中定义的规则将被应用于 `/foo/bar` 请求。
- 在 `~/pages/foo/[id].vue` 中定义的规则将被应用于 `/foo/**` 请求。

为了获得更多的控制，例如，如果您在页面的 [`definePageMeta`](/docs/api/utils/define-page-meta) 中使用了自定义的 `path` 或 `alias`，您应该在 `nuxt.config` 中直接设置 `routeRules`。

::read-more{to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-ph-medal"}
阅读更多关于`routeRules`的信息。
::
