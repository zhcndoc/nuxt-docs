---
title: 'defineRouteRules'
description: '在页面级别定义混合渲染的路由规则。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
此功能为实验性功能，要使用它，必须在 `nuxt.config` 中启用 `experimental.inlineRouteRules` 选项。
::

## 用法

```vue [pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true,
})
</script>

<template>
  <h1>Hello world!</h1>
</template>
```

将会被转换为：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
  },
})
```

::note
运行 [`nuxt build`](/docs/api/commands/build) 时，主页将预渲染到 `.output/public/index.html` 中，并以静态方式提供。
::

## 说明

- 在 `~/pages/foo/bar.vue` 中定义的规则将应用于 `/foo/bar` 请求。
- 在 `~/pages/foo/[id].vue` 中定义的规则将应用于 `/foo/**` 请求。

如需更精细的控制，例如在页面的 [`definePageMeta`](/docs/api/utils/define-page-meta) 中使用自定义的 `path` 或 `alias`，应直接在 `nuxt.config` 中设置 `routeRules`。

::read-more{to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
详细了解 `routeRules`。
::
