---
title: 'useRequestURL'
description: '使用 useRequestURL 组合函数访问传入请求的 URL。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` 是一个辅助函数，返回一个在服务器端和客户端均可使用的 [URL 对象](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)。

::important
在使用带有缓存策略的 [Hybrid Rendering](/docs/4.x/guide/concepts/rendering#hybrid-rendering) 时，通过 [Nitro 缓存层](https://nitro.zhcndoc.com/guide/cache) 处理缓存响应时会丢弃所有传入的请求头（这意味着 `useRequestURL` 在 `host` 上会返回 `localhost`）。

你可以定义 [`cache.varies` 选项](https://nitro.zhcndoc.com/guide/cache#options) 来指定在缓存和提供响应时要考虑的头，例如用于多租户环境的 `host` 和 `x-forwarded-host`。
::

::code-group

```vue [app/pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL 为：{{ url }}</p>
  <p>路径为：{{ url.pathname }}</p>
</template>
```

```html [Result in development]
<p>URL 为： http://localhost:3000/about</p>
<p>路径为： /about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
请参阅 MDN 文档中关于 URL 实例属性的说明。
::
