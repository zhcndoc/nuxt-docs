---
title: "useRoute"
description: useRoute 组合函数返回当前路由。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
在 Vue 组件的模板中，你可以通过 `$route` 访问路由。
::

## 示例

在下面的示例中，我们通过 [`useFetch`](/docs/api/composables/use-fetch) 调用一个接口，使用动态页面参数 `slug` 作为 URL 的一部分。

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

如果你需要访问路由的查询参数（例如路径 `/test?example=true` 中的 `example`），可以使用 `useRoute().query`，而非 `useRoute().params`。

## API

除了动态参数和查询参数，`useRoute()` 还提供以下与当前路由相关的计算引用：

- `fullPath`：包含路径、查询和哈希的当前路由对应的编码后的 URL
- `hash`：URL 中以 # 开头的解码哈希部分
- `query`：访问路由查询参数
- `matched`：当前路由位置匹配的标准化路由数组
- `meta`：附加到路由记录的自定义数据
- `name`：路由记录的唯一名称
- `path`：URL 编码的路径名部分
- `redirectedFrom`：在最终到达当前路由位置前尝试访问的路由位置

::note
浏览器在发起请求时不会发送 [URL 片段](https://url.spec.whatwg.org/#concept-url-fragment)（例如 `#foo`）。因此在模板中使用 `route.fullPath` 可能会引发 hydration 问题，因为它在客户端包括了片段，但服务器端不包含。
::

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/#RouteLocationNormalizedLoaded"}