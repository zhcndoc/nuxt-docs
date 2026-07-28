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
在运行 [`nuxt build`](/docs/4.x/api/commands/build) 时，主页将被预渲染到 `.output/public/index.html` 并以静态方式提供。
::

## 注意事项

- 定义在 `~/pages/foo/bar.vue` 中的规则将应用于 `/foo/bar` 请求。
- 定义在 `~/pages/foo/[id].vue` 中的规则将应用于 `/foo/*` 请求。
- 位于包含有限备选项的页面中的规则，例如 `/:locale(en|fr)/about` 这样的自定义 `path`，将为每个备选项生成一条规则（`/en/about` 和 `/fr/about`）。

如果某个页面路径无法转换为等效的路由规则模式（例如，带有正则表达式的参数如 `/:id(\d+)`、类似 `/prefix-:id` 的部分片段，或类似 `/:slug+` 的可重复参数），则该页面的规则**不会**被应用，Nuxt 会在构建期间发出警告。在这种情况下，请在你的 `nuxt.config` 中的 `nitro.routeRules` 里显式定义这些规则。

若需更细粒度的控制（例如在页面的 [`definePageMeta`](/docs/4.x/api/utils/define-page-meta) 中使用了自定义的 `path` 或 `alias`），应在 `nuxt.config` 中直接设置 `routeRules`。

::read-more{to="/docs/4.x/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
阅读有关 `routeRules` 的更多信息。
::
