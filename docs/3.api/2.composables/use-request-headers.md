---
title: "useRequestHeaders"
description: "使用 useRequestHeaders 访问传入的请求头部信息。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

您可以使用内置的 [`useRequestHeaders`](/docs/api/composables/use-request-headers) 组合式函数在页面、组件和插件中访问传入的请求头部信息。

```js
// 获取所有请求头
const headers = useRequestHeaders()

// 仅获取 cookie 请求头
const headers = useRequestHeaders(['cookie'])
```

::tip
在浏览器中，`useRequestHeaders` 将返回一个空对象。
::

## 示例

我们可以使用 `useRequestHeaders` 来访问并将初始请求的 `authorization` 头部信息代理到后续的内部请求中，在服务端渲染 (SSR) 的过程中。

下面的示例将 `authorization` 请求头添加到一个同构的 `$fetch` 调用中。

```vue [pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization'])
})
</script>
```