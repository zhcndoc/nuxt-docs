---
title: "$fetch"
description: Nuxt 使用 ofetch 来全局暴露 `$fetch` 助手，以便在 Vue 应用或 API 路由中进行 HTTP 请求。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt 使用 [ofetch](https://github.com/unjs/ofetch) 来全局暴露 `$fetch` 助手，以便在 Vue 应用或 API 路由中进行 HTTP 请求。

::tip{icon="i-ph-rocket-launch" color="gray"}
在服务器端渲染期间，调用 `$fetch` 来获取您的内部 [API 路由](/docs/guide/directory-structure/server)将会直接调用相关函数（模拟请求），**节省了一次额外的 API 调用**。
::

::note{color="blue" icon="i-ph-info"}
在组件中使用 `$fetch` 而不将其包裹在 [`useAsyncData`](/docs/api/composables/use-async-data) 中会导致数据被两次获取：最初在服务器上，然后在客户端 hydration 期间再次获取，因为 `$fetch` 不会将服务器状态传递给客户端。因此，由于客户端必须再次获取数据，该 fetch 将在两方执行。
::

我们建议使用 [`useFetch`](/docs/api/composables/use-fetch) 或 [`useAsyncData`](/docs/api/composables/use-async-data) + `$fetch` 来防止在获取组件数据时进行双重数据获取。

```vue [app.vue]
<script setup lang="ts">
// 在 SSR 期间，数据被获取两次，一次在服务器上，一次在客户端上。
const dataTwice = await $fetch('/api/item')

// 在 SSR 期间，数据仅在服务器上获取，并传输到客户端。
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// 您还可以使用 Fetch 作为 useAsyncData + $fetch 的快捷方式
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/getting-started/data-fetching"}

您可以在任何仅在客户端上执行的方方法中使用 `$fetch`。

```vue [pages/contact.vue]
<script setup lang="ts">
function contactForm() {
  $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world '}
  })
}
</script>

<template>
  <button @click="contactForm">Contact</button>
</template>
```

::tip
`$fetch` 是 Nuxt 中进行 HTTP 调用的首选方式，而不是 [@nuxt/http](https://github.com/nuxt/http) 和 [@nuxtjs/axios](https://github.com/nuxt-community/axios-module)，这些适用于 Nuxt 2。
::

::note
如果您在开发中使用 `$fetch` 来调用具有自签名证书的外部 HTTPS URL，您需要在环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::
