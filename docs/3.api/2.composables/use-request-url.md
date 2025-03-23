---
title: 'useRequestURL'
description: '通过 useRequestURL 组合式函数访问传入的请求 URL。'
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` 是一个辅助函数，返回一个 [URL 对象](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)，在服务器端和客户端均可使用。

::important
在使用 [混合渲染](/docs/guide/concepts/rendering#hybrid-rendering) 和缓存策略时，通过 [Nitro 缓存层](https://nitro.zhcndoc.com/guide/cache) 处理缓存响应时，所有传入的请求头都会被丢弃（意味着 `useRequestURL` 将返回 `localhost` 作为 `host`）。

你可以定义 [`cache.varies` 选项](https://nitro.zhcndoc.com/guide/cache#options) 来指定在缓存和服务响应时会被考虑的请求头，例如在多租户环境中使用的 `host` 和 `x-forwarded-host`。
::

::code-group

```vue [pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL 是：{{ url }}</p>
  <p>路径是：{{ url.pathname }}</p>
</template>
```

```html [开发中的结果]
<p>URL 是：http://localhost:3000/about</p>
<p>路径是：/about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
在 MDN 文档中阅读关于 URL 实例属性的信息。
::
