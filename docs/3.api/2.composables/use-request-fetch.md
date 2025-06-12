---
title: 'useRequestFetch'
description: '使用 useRequestFetch 组合函数在服务器端进行 fetch 请求时转发请求上下文和头信息。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

你可以使用 `useRequestFetch` 在服务器端进行 fetch 请求时转发请求上下文和头信息。

在进行客户端 fetch 请求时，浏览器会自动发送必要的头信息。
但是，在服务器端渲染期间发起请求时，出于安全考虑，我们需要手动转发头信息。

::note
**不应转发的**头信息**不会包含**在请求中。这些头信息例如包括：
`transfer-encoding`、`connection`、`keep-alive`、`upgrade`、`expect`、`host`、`accept`
::

::tip
[`useFetch`](/docs/api/composables/use-fetch) 组合函数底层使用了 `useRequestFetch`，以自动转发请求上下文和头信息。
::

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
// 这会将用户的头信息转发到 `/api/cookies` 事件处理器
// 结果：{ cookies: { foo: 'bar' } }
const requestFetch = useRequestFetch()
const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))

// 这不会转发任何信息
// 结果：{ cookies: {} }
const { data: notForwarded } = await useAsyncData(() => $fetch('/api/cookies')) 
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
在浏览器端进行客户端导航时，`useRequestFetch` 的行为和普通的 [`$fetch`](/docs/api/utils/dollarfetch) 一样。
::
