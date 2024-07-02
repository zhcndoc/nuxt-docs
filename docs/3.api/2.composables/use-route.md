---
title: "useRoute"
description: 使用 useRoute 组合函数返回当前路由。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
在 Vue 组件的模板中，您可以使用 `$route` 访问路由。
::

## 示例

在下面的示例中，我们通过 [`useFetch`](/docs/api/composables/use-fetch) 调用 API，使用动态页面参数 - `slug` - 作为 URL 的一部分。

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

如果您需要访问路由查询参数（例如 `example` 在路径 `/test?example=true` 中），那么您可以使用 `useRoute().query` 而不是 `useRoute().params`。

## API

除了动态参数和查询参数外，`useRoute()` 还提供了与当前路由相关的以下计算引用：

- `fullPath`: 当前路由关联的编码 URL，包含路径、查询和哈希
- `hash`: 解码的 URL 哈希部分，从#开始
- `matched`: 当前路由位置正常化匹配路由记录的数组
- `meta`: 附加到记录的自定义数据
- `name`: 路由记录的唯一名称
- `path`: URL 路径名部分编码
- `redirectedFrom`: 尝试访问但最终到达当前路由位置的路由位置

::note
浏览器在发送请求时不会发送 [URL 片段](https://url.spec.whatwg.org/#concept-url-fragment)（例如 `#foo`）。因此，在模板中使用 `route.fullPath` 可能会触发复水化问题，因为在客户端包含片段，但在服务器上不包含。
::

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/#RouteLocationNormalizedLoaded"}
