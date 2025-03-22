---
title: "defineNuxtRouteMiddleware"
description: "使用 defineNuxtRouteMiddleware 辅助函数创建命名路由中间件。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

路由中间件存储在你的 Nuxt 应用程序的 [`middleware/`](/docs/guide/directory-structure/middleware) 中（除非 [另有设置](/docs/api/nuxt-config#middleware)）。

## 类型

```ts
defineNuxtRouteMiddleware(middleware: RouteMiddleware) => RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
```

## 参数

### `middleware`

- **类型**: `RouteMiddleware`

一个函数，它接受两个 Vue Router 的路由位置对象作为参数：下一个路由 `to` 作为第一个，当前路由 `from` 作为第二个。

了解 `RouteLocationNormalized` 的可用属性，请参见 **[Vue Router 文档](https://router.vuejs.org/api/#RouteLocationNormalized)**。

## 示例

### 显示错误页面

你可以使用路由中间件来抛出错误并显示有用的错误消息：

```ts [middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: '页面未找到' })
  }
})
```

上述路由中间件将把用户重定向到在 `~/error.vue` 文件中定义的自定义错误页面，并暴露来自中间件的错误消息和代码。

### 重定向

结合使用 [`useState`](/docs/api/composables/use-state) 和 `navigateTo` 辅助函数，在路由中间件中重定向用户到不同的路由，基于他们的身份验证状态：

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState('auth')

  if (!auth.value.isAuthenticated) {
    return navigateTo('/login')
  }

  if (to.path !== '/dashboard') {
    return navigateTo('/dashboard')
  }
})
```

[由 navigateTo](/docs/api/utils/navigate-to) 和 [abortNavigation](/docs/api/utils/abort-navigation) 都是全球可用的辅助函数，你可以在 `defineNuxtRouteMiddleware` 中使用它们。