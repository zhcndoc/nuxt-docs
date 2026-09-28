---
title: 'defineRouteRules'
description: '在页面级别为混合渲染定义路由规则。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
此功能为实验性功能，使用前必须在 `nuxt.config` 中启用 `experimental.inlineRouteRules` 选项。
::

## 用法

```vue [app/pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true,
})
</script>

<template>
  <h1>你好，世界！</h1>
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
运行 [`nuxt build`](/docs/api/commands/build) 时，首页会预渲染到 `.output/public/index.html` 中，并以静态方式提供服务。
::

## 注意事项

- 在 `~/pages/foo/bar.vue` 中定义的规则将应用于 `/foo/bar` 请求。
- 在 `~/pages/foo/[id].vue` 中定义的规则将应用于 `/foo/*` 请求。
- 在具有有限备选项集的页面中定义的规则，例如自定义 `path` `/:locale(en|fr)/about`，将会为每个备选项生成一条规则（`/en/about` 和 `/fr/about`）。

如果某个页面路径无法转换为等效的路由规则模式（例如，带有正则表达式的参数如 `/:id(\d+)`、类似 `/prefix-:id` 的部分段，或类似 `/:slug+` 的可重复参数），则该页面的规则**不会**被应用，并且 Nuxt 会在构建期间发出警告。在这种情况下，请在你的 `nuxt.config` 中的 `nitro.routeRules` 里显式定义这些规则。

如果需要更多控制，例如在页面的 [`definePageMeta`](/docs/api/utils/define-page-meta) 中设置了自定义 `path` 或 `alias`，则应直接在 `nuxt.config` 中设置 `routeRules`。

::read-more{to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
详细了解 `routeRules`。
::
