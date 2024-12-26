---
title: 'useRequestFetch'
description: '使用 useRequestFetch 组合函数转发请求上下文和头部，以便进行服务器端的获取请求。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

您可以使用 `useRequestFetch` 在进行服务器端获取请求时转发请求上下文和头部。

在进行客户端获取请求时，浏览器会自动发送所需的头部。
然而，在服务器端渲染期间进行请求时，由于请求是在服务器上发起的，我们需要手动转发头部。

::note
**不需要转发**的头部将**不会被包含**在请求中。这些头部包括，例如：
`transfer-encoding`、`connection`、`keep-alive`、`upgrade`、`expect`、`host`、`accept`
::

::tip
[`useFetch`](/docs/api/composables/use-fetch) 组合函数在内部使用 `useRequestFetch` 自动转发请求上下文和头部。
::

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
  // 这将把用户的头部转发到 `/api/foo` 事件处理程序
  // 结果: { cookies: { foo: 'bar' } }
  const requestFetch = useRequestFetch()
  const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))
  
  // 这将不会转发任何内容
  // 结果: { cookies: {} }
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
在浏览器的客户端导航期间，`useRequestFetch` 的行为就像普通的 [`$fetch`](/docs/api/utils/dollarfetch) 一样。
::