---
title: 'useRequestFetch'
description: '使用 useRequestFetch 组合式函数在服务器端 fetch 请求中转发请求上下文和头信息。'
minimalVersion: "3.2"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

你可以使用 `useRequestFetch` 在进行服务器端的 fetch 请求时转发请求上下文和头信息。

在浏览器发起客户端的 fetch 请求时，浏览器会自动发送必要的头信息。
但是，在服务器端渲染期间发起请求时，出于安全考虑，我们需要手动转发头信息。

::note
不会被**转发**的头信息将**不会包含**在请求中。例如，这些头信息包括：
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`
::

::important
标头仅转发到以 `/` 开头的路径（例如 `/api/cookies`）。对绝对 URL 的请求（包括指向您自己的应用程序的请求）将在没有它们的情况下发送。
::

::tip
[`useFetch`](/docs/api/composables/use-fetch) 组合式函数在内部使用 `useRequestFetch`，自动转发请求上下文和头信息。
::

::code-group

```vue [app/pages/index.vue]
<script setup lang="ts">
// 这会将用户的头信息转发到 `/api/cookies` 事件处理器
// 结果: { cookies: { foo: 'bar' } }
const requestFetch = useRequestFetch()
const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))

// 这不会转发任何东西
// 结果: { cookies: {} }
const { data: notForwarded } = await useAsyncData((_nuxtApp, { signal }) => $fetch('/api/cookies', { signal }))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const cookies = parseCookies(event)

  return { cookies }
})
```

::

::tip
在客户端导航期间的浏览器中，`useRequestFetch` 的行为就像常规 [`$fetch`](/docs/api/utils/$fetch)。
::
