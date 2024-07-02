---
title: "useRequestHeaders"
description: "使用 useRequestHeaders 访问传入的请求头。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

你可以使用内置的 [`useRequestHeaders`](/docs/api/composables/use-request-headers) 组合件在页面、组件和插件中访问传入的请求头。

```js
// 获取所有请求头
const headers = useRequestHeaders()

// 只获取 cookie 请求头
const headers = useRequestHeaders(['cookie'])
```

::提示
在浏览器中，`useRequestHeaders` 将返回一个空对象。
::

## 示例

我们可以使用 `useRequestHeaders` 访问并代理 SSR 期间初始请求的 `authorization` 头到任何未来的内部请求。

下面的示例将 `authorization` 请求头添加到同构的 `$fetch` 调用中。

```vue [pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization'])
})
</script>
```
