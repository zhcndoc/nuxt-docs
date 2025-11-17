---
title: "$fetch"
description: Nuxt 使用 ofetch 在全局暴露 `$fetch` 助手来在你的 Vue 应用或 API 路由中发起 HTTP 请求。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt 使用 [ofetch](https://github.com/unjs/ofetch) 在全局暴露 `$fetch` 助手，以便在你的 Vue 应用或 API 路由中发起 HTTP 请求。

::tip{icon="i-lucide-rocket"}
在服务端渲染期间，调用 `$fetch` 去获取你的内部 [API 路由](/docs/4.x/directory-structure/server) 会直接调用相应的函数（模拟该请求），**节省一次额外的 API 调用**。
::

::note{color="blue" icon="i-lucide-info"}
在组件中直接使用 `$fetch` 而不将其包裹在 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 中，会导致数据被重复获取：在服务端首次获取一次，然后在客户端在 hydration 期间再次获取一次，因为 `$fetch` 不会将服务器端的状态传递到客户端。因此该请求会在两端都执行，客户端必须重新获取数据。
::

## 用法

我们建议使用 [`useFetch`](/docs/4.x/api/composables/use-fetch) 或者 使用 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) + `$fetch`，以避免在获取组件数据时发生重复获取。

```vue [app/app.vue]
<script setup lang="ts">
// During SSR data is fetched twice, once on the server and once on the client.
const dataTwice = await $fetch('/api/item')

// During SSR data is fetched only on the server side and transferred to the client.
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// You can also useFetch as shortcut of useAsyncData + $fetch
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}

你可以在任何仅在客户端执行的方法中使用 `$fetch`。

```vue [app/pages/contact.vue]
<script setup lang="ts">
async function contactForm () {
  await $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world' },
  })
}
</script>

<template>
  <button @click="contactForm">
    Contact
  </button>
</template>
```

::tip
在 Nuxt 中，`$fetch` 是发起 HTTP 调用的首选方式，替代为 Nuxt 2 设计的 [@nuxt/http](https://github.com/nuxt/http) 和 [@nuxtjs/axios](https://github.com/nuxt-community/axios-module)。
::

::note
如果你在开发环境中使用 `$fetch` 调用带有自签名证书的（外部）HTTPS URL，你需要在环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::

### 传递头部和 Cookie

当我们在浏览器中调用 `$fetch` 时，像 `cookie` 这样的用户头部会被直接发送到 API。

然而，在服务端渲染期间，由于安全风险，例如 **服务器端请求伪造（SSRF）** 或 **认证滥用（Authentication Misuse）**，`$fetch` 不会包含用户的浏览器 cookies，也不会传递来自 fetch 响应的 cookies。

::code-group

```vue [app/pages/index.vue]
<script setup lang="ts">
// This will NOT forward headers or cookies during SSR
const { data } = await useAsyncData(() => $fetch('/api/cookies'))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const foo = getCookie(event, 'foo')
  // ... Do something with the cookie
})
```
::

如果你需要在服务器上转发头部和 cookies，你必须手动传递它们：

```vue [app/pages/index.vue]
<script setup lang="ts">
// This will forward the user's headers and cookies to `/api/cookies`
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

但是，当在服务器上使用相对 URL 调用 `useFetch` 时，Nuxt 会使用 [`useRequestFetch`](/docs/4.x/api/composables/use-request-fetch) 来代理头部和 cookies（但不会转发那些不应被转发的头部，例如 `host`）。
