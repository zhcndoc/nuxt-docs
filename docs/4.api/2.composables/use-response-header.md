---
title: "useResponseHeader"
description: "使用 useResponseHeader 设置服务器响应头。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
此组合函数在 Nuxt v3.14+ 版本中可用。
::

你可以使用内置的 [`useResponseHeader`](/docs/api/composables/use-response-header) 组合函数，在你的页面、组件和插件中设置任何服务器响应头。

```ts
// 设置自定义响应头
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
```

## 示例

我们可以使用 `useResponseHeader` 轻松地为每个页面设置响应头。

```vue [pages/test.vue]
<script setup>
// pages/test.vue
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
</script>

<template>
  <h1>带自定义响应头的测试页面</h1>
  <p>服务器对该 "/test" 页面响应将包含自定义的 "X-My-Header" 响应头。</p>
</template>
```

例如，我们也可以在 Nuxt [中间件](/docs/guide/directory-structure/middleware) 中使用 `useResponseHeader`，为所有页面设置响应头。

```ts [middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header');
  header.value = `I'm Always here!`;
});
```