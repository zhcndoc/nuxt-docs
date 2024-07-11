---
title: "defineNuxtRouteMiddleware"
description: "使用 defineNuxtRouteMiddleware 辅助函数创建命名路由中间件。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

路由中间件存储在您 Nuxt 应用的 [`middleware/`](/docs/guide/directory-structure/middleware) 目录下（除非[另有设置](/docs/api/nuxt-config#middleware)）。

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

一个函数，接受两个 Vue Router 的路由位置对象作为参数：第一个是下一个路由 `to`，第二个是当前路由 `from`。

在 **[Vue Router 文档](https://router.vuejs.org/api/#RouteLocationNormalized)** 中了解 `RouteLocationNormalized` 可用属性的更多信息。

## 示例

### 显示错误页面

您可以使用路由中间件抛出错误并显示有用的错误消息：

```ts [middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})
```

上面的路由中间件会将用户重定向到在 `~/error.vue` 文件中定义的自定义错误页面，并公开从中间件传递的错误消息和代码。

### 重定向

在路由中间件中使用 [`useState`](/docs/api/composables/use-state) 结合 `navigateTo` 辅助函数，根据用户的认证状态将用户重定向到不同的路由：

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

`navigateTo` 和 `abortNavigation` 这两个全局可用的辅助函数可以在 `defineNuxtRouteMiddleware` 内部使用。
