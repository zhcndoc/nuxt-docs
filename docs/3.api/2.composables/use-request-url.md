---
title: 'useRequestURL'
description: '使用 useRequestURL 组合件访问传入的请求 URL。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` 是一个辅助函数，它返回一个 [URL 对象](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)，在服务器端和客户端都有效。

::important
当使用 [Hybrid Rendering](/docs/guide/concepts/rendering#hybrid-rendering) 和缓存策略时，通过 [Nitro 缓存层](https://nitro.zhcndoc.com/guide/cache) 处理缓存响应时，所有传入的请求头都会被丢弃（这意味着 `useRequestURL` 将返回 `localhost` 作为 `host`）。

您可以在 [`cache.varies` 选项](https://nitro.zhcndoc.com/guide/cache#options) 中定义，以指定在缓存和提供响应时将考虑的标头，例如 `host` 和 `x-forwarded-host`，适用于多租户环境。
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

```html [执行结果]
<p>URL 是：http://localhost:3000/about</p>
<p>路径是：/about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" color="gray" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
在 MDN 文档中了解关于 URL 实例属性的内容。
::
