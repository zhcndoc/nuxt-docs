---
title: 'useRequestFetch'
description: '使用 useRequestFetch 可组合函数在服务器端发起 fetch 请求时转发请求上下文和头信息。'
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

::tip
[`useFetch`](/docs/4.x/api/composables/use-fetch) 可组合函数在底层使用 `useRequestFetch` 来自动转发请求上下文和头信息。
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
在浏览器中进行客户端导航时，`useRequestFetch` 的行为与常规的 [`$fetch`](/docs/4.x/api/utils/dollarfetch) 相同。
::
