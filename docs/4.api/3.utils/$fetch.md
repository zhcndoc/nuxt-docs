---
title: "$fetch"
description: Nuxt 使用 ofetch 全局暴露 $fetch 助手用于发起 HTTP 请求。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt 使用 [ofetch](https://github.com/unjs/ofetch) 全局暴露 `$fetch` 助手，用于在你的 Vue 应用或 API 路由内发起 HTTP 请求。

::tip{icon="i-lucide-rocket"}
在服务器端渲染期间，调用 `$fetch` 来获取你内部的 [API 路由](/docs/guide/directory-structure/server) 将直接调用相关函数（模拟请求），**节省了额外的 API 调用**。
::

::note{color="blue" icon="i-lucide-info"}
在组件中使用 `$fetch` 且不包裹在 [`useAsyncData`](/docs/api/composables/use-async-data) 中，会导致数据被请求两次：第一次在服务器端，第二次在客户端水合过程中，因为 `$fetch` 不会将服务端状态传递到客户端。因此，数据请求会在两端都执行，因为客户端必须再次获取数据。
::

## 用法

我们建议使用 [`useFetch`](/docs/api/composables/use-fetch) 或 [`useAsyncData`](/docs/api/composables/use-async-data) + `$fetch`，以防止组件数据被重复获取。

```vue [app.vue]
<script setup lang="ts">
// SSR 期间数据会被请求两次，一次在服务器一次在客户端。
const dataTwice = await $fetch('/api/item')

// SSR 期间数据只在服务器端请求，并传递至客户端。
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// 你也可以用 useFetch，作为 useAsyncData + $fetch 的快捷方式
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/3.x/getting-started/data-fetching"}

你可以在只在客户端执行的方法中使用 `$fetch`。

```vue [pages/contact.vue]
<script setup lang="ts">
async function contactForm () {
  await $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world' },
  })
}
</script>

<template>
  <button @click="contactForm">联系</button>
</template>
```

::tip
在 Nuxt 中，推荐使用 `$fetch` 发起 HTTP 请求，而非为 Nuxt 2 设计的 [@nuxt/http](https://github.com/nuxt/http) 和 [@nuxtjs/axios](https://github.com/nuxt-community/axios-module)。
::

::note
如果你在开发环境中使用 `$fetch` 调用带有自签名证书的（外部）HTTPS URL，需要在环境变量中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::

### 传递 Headers 和 Cookies

当我们在浏览器中调用 `$fetch` 时，用户的 headers（如 `cookie`）会被直接发送给 API。

但是，在服务器端渲染期间，出于安全风险考虑，如 **服务器端请求伪造（SSRF）** 或 **认证误用**，`$fetch` 不会包含用户浏览器的 cookie，也不会传递 fetch 响应中的 cookie。

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
// SSR 期间不会转发 headers 或 cookies
const { data } = await useAsyncData(() => $fetch('/api/cookies'))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const foo = getCookie(event, 'foo')
  // ... 对 cookie 进行处理
})
```
::

如果你需要在服务器端转发 headers 和 cookies，必须手动传递它们：

```vue [pages/index.vue]
<script setup lang="ts">
// 这会将用户的 headers 和 cookies 转发给 `/api/cookies`
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

但在服务器调用相对 URL 的 `useFetch` 时，Nuxt 会使用 [`useRequestFetch`](/docs/api/composables/use-request-fetch) 代理 headers 和 cookies（除了一些不应转发的 headers，比如 `host`）。