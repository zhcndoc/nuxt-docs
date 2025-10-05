---
title: "useRequestHeader"
description: "使用 useRequestHeader 访问某个传入请求头。"
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

您可以在页面、组件和插件中使用内置的 [`useRequestHeader`](/docs/4.x/api/composables/use-request-header) 组合函数来访问任何传入的请求头。

```ts
// 获取授权请求头
const authorization = useRequestHeader('authorization')
```

::tip
在浏览器中，`useRequestHeader` 将返回 `undefined`。
::

## 示例

我们可以使用 `useRequestHeader` 来轻松判断用户是否已授权。

下面的示例读取 `authorization` 请求头，以确定某人是否可以访问受限资源。

```ts [app/middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```