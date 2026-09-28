---
title: "useResponseHeader"
description: "使用 useResponseHeader 来设置服务器响应头。"
minimalVersion: "3.14"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
此组合式函数在 Nuxt v3.14+ 可用。
::

你可以使用内置的 [`useResponseHeader`](/docs/api/composables/use-response-header) 组合式函数，在页面、组件和插件中设置任意服务器响应头。

```ts
// 设置自定义响应头
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
```

## 示例

我们可以使用 `useResponseHeader` 在每个页面级别上轻松设置响应头。

```vue [app/pages/test.vue]
<script setup>
// pages/test.vue
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
</script>

<template>
  <h1>Test page with custom header</h1>
  <p>The response from the server for this "/test" page will have a custom "X-My-Header" header.</p>
</template>
```

例如，我们可以在 Nuxt [中间件](/docs/directory-structure/app/middleware) 中使用 `useResponseHeader`，为所有页面设置响应头。

```ts [app/middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header')
  header.value = `I'm Always here!`
})
```
