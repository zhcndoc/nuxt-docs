---
title: 'useRequestURL'
description: '使用 useRequestURL 组合函数访问传入请求的 URL。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` 是一个辅助函数，返回一个在服务器端和客户端均适用的 [URL 对象](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)。

::important
当使用带有缓存策略的[混合渲染](/docs/guide/concepts/rendering#hybrid-rendering)时，通过 [Nitro 缓存层](https://nitro.zhcndoc.com/guide/cache) 处理缓存响应时，所有传入请求头都会被丢弃（这意味着 `useRequestURL` 对于 `host` 会返回 `localhost`）。

你可以定义 [`cache.varies` 选项](https://nitro.zhcndoc.com/guide/cache#options) 来指定在缓存和响应时要考虑的请求头，例如多租户环境下的 `host` 和 `x-forwarded-host`。
::

::code-group

```vue [pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL 是: {{ url }}</p>
  <p>路径是: {{ url.pathname }}</p>
</template>
```

```html [开发环境中的结果]
<p>URL 是: http://localhost:3000/about</p>
<p>路径是: /about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
阅读 MDN 文档了解 URL 实例属性。
::
