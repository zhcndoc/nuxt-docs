---
title: 'defineRouteRules'
description: '在页面级别定义混合渲染的路由规则。'
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
此功能是实验性的，使用之前必须在 `nuxt.config` 中启用 `experimental.inlineRouteRules` 选项。
::

## 用法

```vue [pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true
})
</script>

<template>
  <h1>你好，世界！</h1>
</template>
```

将转换为：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  }
})
```

::note
在运行 [`nuxt build`](/docs/api/commands/build) 时，首页将预渲染到 `.output/public/index.html` 并静态服务。
::

## 注意事项

- 在 `~/pages/foo/bar.vue` 中定义的规则将应用于 `/foo/bar` 请求。
- 在 `~/pages/foo/[id].vue` 中的规则将应用于 `/foo/**` 请求。

为了更好的控制，例如如果使用了在页面的 [`definePageMeta`](/docs/api/utils/define-page-meta) 中设置的自定义 `path` 或 `alias`，你应该直接在 `nuxt.config` 中设置 `routeRules`。

::read-more{to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
阅读更多关于 `routeRules` 的信息。
::
