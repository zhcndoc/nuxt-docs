---
title: 'defineRouteRules'
description: '在页面级别定义混合渲染的路由规则。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/3.x/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
该功能处于实验阶段，使用前需在 `nuxt.config` 中启用 `experimental.inlineRouteRules` 选项。
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
运行 [`nuxt build`](/docs/api/commands/build) 时，主页会被预渲染到 `.output/public/index.html` 并作为静态资源进行服务。
::

## 说明

- 在 `~/pages/foo/bar.vue` 中定义的规则将应用于 `/foo/bar` 请求。
- 在 `~/pages/foo/[id].vue` 中定义的规则将应用于 `/foo/**` 请求。

如果需要更细粒度的控制，比如在页面的 [`definePageMeta`](/docs/api/utils/define-page-meta) 中使用了自定义的 `path` 或 `alias`，应当直接在 `nuxt.config` 中设置 `routeRules`。
  
::read-more{to="/docs/3.x/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
阅读更多关于 `routeRules` 的内容。
::
