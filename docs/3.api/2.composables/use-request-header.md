---
title: "useRequestHeader"
description: "使用 useRequestHeader 访问特定的传入请求头。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

您可以使用内置的 [`useRequestHeader`](/docs/api/composables/use-request-header) 组合函数来访问您页面、组件和插件中的任何传入请求头。

```ts
// 获取授权请求头
const authorization = useRequestHeader('authorization')
```

::tip
在浏览器中，`useRequestHeader` 将返回 `undefined`。
::

## 示例

我们可以使用 `useRequestHeader` 来轻松判断用户是否被授权。

下面的示例读取 `authorization` 请求头，以确定一个人是否可以访问受限资源。

```ts [middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```