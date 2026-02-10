---
title: 'defineRouteRules'
description: '在页面级别为混合渲染定义路由规则。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/4.x/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
此功能为实验性特性，使用前需在 `nuxt.config` 中启用 `experimental.inlineRouteRules` 选项。
::

## Usage

```vue [app/pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true,
})
</script>

<template>
  <h1>Hello world!</h1>
</template>
```

将被转换为：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
  },
})
```

::note
在运行 [`nuxt build`](/docs/4.x/api/commands/build) 时，主页将被预渲染到 `.output/public/index.html` 并以静态方式提供。
::

## Notes

- 在 `~/pages/foo/bar.vue` 中定义的规则会应用于 `/foo/bar` 请求。
- 在 `~/pages/foo/[id].vue` 中的规则会应用于 `/foo/**` 请求。

若需更细粒度的控制（例如在页面的 [`definePageMeta`](/docs/4.x/api/utils/define-page-meta) 中使用了自定义的 `path` 或 `alias`），应在 `nuxt.config` 中直接设置 `routeRules`。

::read-more{to="/docs/4.x/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
阅读有关 `routeRules` 的更多信息。
::
