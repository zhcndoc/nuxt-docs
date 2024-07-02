---
title: "useRequestHeader"
description: "使用 useRequestHeader 来访问某个传入请求的头部。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

您可以使用内置的 [`useRequestHeader`](/docs/api/composables/use-request-header) 组合函数来在页面、组件和插件中访问任何传入请求的头部。

```ts
// 获取授权请求头部
const authorization = useRequestHeader('authorization')
```

::tip
在浏览器中，`useRequestHeader` 将返回 `undefined`。
::

## 示例

我们可以使用 `useRequestHeader` 轻松判断用户是否已授权。

下面的示例读取 `authorization` 请求头部以确定某人是否可以访问受限资源。

```ts [middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```
