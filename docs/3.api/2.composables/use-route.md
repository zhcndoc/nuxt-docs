---
title: "useRoute"
description: useRoute 组合式 API 返回当前路由。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
在 Vue 组件的模板中，可以使用 `$route` 访问路由。
::

## 示例

在以下示例中，我们通过 [`useFetch`](/docs/api/composables/use-fetch) 调用 API，使用动态页面参数 `slug` 作为 URL 的一部分。

```html [~/pages/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data: mountain } = await useFetch(`/api/mountains/${route.params.slug}`)
</script>

<template>
  <div>
    <h1>{{ mountain.title }}</h1>
    <p>{{ mountain.description }}</p>
  </div>
</template>
```

如果需要访问路由查询参数（例如 `/test?example=true` 路径中的 `example`），则可以使用 `useRoute().query` 而不是 `useRoute().params`。

## API

除了动态参数和查询参数，`useRoute()` 还提供以下与当前路由相关的计算引用：

- `fullPath`：与当前路由关联的编码 URL，包括路径、查询和哈希
- `hash`：URL 的解码哈希部分，以 # 开头
- `query`：访问路由查询参数
- `matched`：与当前路由位置匹配的规范化路由数组
- `meta`：附加到记录的自定义数据
- `name`：路由记录的唯一名称
- `path`：URL 的编码路径部分
- `redirectedFrom`：尝试访问的路由位置，最终转到当前路由位置

::note
浏览器在发起请求时不会发送 [URL 片段](https://url.spec.whatwg.org/#concept-url-fragment)（例如 `#foo`）。因此，在模板中使用 `route.fullPath` 可能会引发水合问题，因为这会在客户端包含片段，但在服务器上不包含。
::

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/#RouteLocationNormalizedLoaded"}