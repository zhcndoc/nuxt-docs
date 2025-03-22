---
title: "$fetch"
description: Nuxt 使用 ofetch 在全局范围内暴露 `$fetch` 辅助方法以进行 HTTP 请求。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt 使用 [ofetch](https://github.com/unjs/ofetch) 在全局范围内暴露 `$fetch` 辅助方法，以便在您的 Vue 应用或 API 路由中进行 HTTP 请求。

::tip{icon="i-lucide-rocket"}
在服务器端渲染期间，调用 `$fetch` 来获取内部 [API 路由](/docs/guide/directory-structure/server) 会直接调用相关函数（模拟请求），**节省了额外的 API 调用**。
::

::note{color="blue" icon="i-lucide-info"}
在组件中使用 `$fetch` 而不通过 [`useAsyncData`](/docs/api/composables/use-async-data) 包裹它，会导致数据被请求两次：第一次在服务器上，然后在客户端双重渲染期间再次请求，因为 `$fetch` 不会将状态从服务器转移到客户端。因此，由于客户端必须再次获取数据，所以 fetch 会在两个端执行。
::

## 用法

我们建议使用 [`useFetch`](/docs/api/composables/use-fetch) 或 [`useAsyncData`](/docs/api/composables/use-async-data) + `$fetch` 来防止在获取组件数据时重复请求。

```vue [app.vue]
<script setup lang="ts">
// 在 SSR 期间，数据会被请求两次，一次在服务器上，一次在客户端。
const dataTwice = await $fetch('/api/item')

// 在 SSR 期间，数据仅在服务器端获取并传输到客户端。
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// 您也可以将 useFetch 作为 useAsyncData + $fetch 的快捷方式
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/getting-started/data-fetching"}

您可以在仅在客户端执行的任何方法中使用 `$fetch`。

```vue [pages/contact.vue]
<script setup lang="ts">
async function contactForm() {
  await $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world '}
  })
}
</script>

<template>
  <button @click="contactForm">联系</button>
</template>
```

::tip
在 Nuxt 中，`$fetch` 是进行 HTTP 调用的首选方式，而不是为 Nuxt 2 制作的 [@nuxt/http](https://github.com/nuxt/http) 和 [@nuxtjs/axios](https://github.com/nuxt-community/axios-module)。
::

::note
如果您使用 `$fetch` 调用带有自签名证书的（外部）HTTPS URL，在开发过程中，您需要在环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::

### 传递头部和 Cookies

当我们在浏览器中调用 `$fetch` 时，用户的头部如 `cookie` 会直接发送到 API。

但是，在服务器端渲染期间，由于安全风险，例如 **服务器端请求伪造 (SSRF)** 或 **身份验证误用**，`$fetch` 不会包含用户的浏览器 cookies，也不会转发 fetch 响应中的 cookies。

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
// 这不会在 SSR 期间转发头部或 cookies
const { data } = await useAsyncData(() => $fetch('/api/cookies'))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const foo = getCookie(event, 'foo')
  // ... 处理 cookie
})
```
::

如果您需要在服务器上转发头部和 cookies，必须手动传递它们：

```vue [pages/index.vue]
<script setup lang="ts">
// 这将用户的头部和 cookies 转发到 `/api/cookies`
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

然而，当在服务器上使用相对 URL 调用 `useFetch` 时，Nuxt 将使用 [`useRequestFetch`](/docs/api/composables/use-request-fetch) 来代理头部和 cookies（不包括不应被转发的头部，如 `host`）。
