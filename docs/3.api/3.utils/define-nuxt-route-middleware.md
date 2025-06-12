---
title: "defineNuxtRouteMiddleware"
description: "使用 defineNuxtRouteMiddleware 辅助函数创建命名路由中间件。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

路由中间件存储在 Nuxt 应用的 [`middleware/`](/docs/guide/directory-structure/middleware) 文件夹中（除非[另有配置](/docs/api/nuxt-config#middleware)）。

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

一个函数，接受两个 Vue Router 的路由位置对象作为参数：第一个是目标路由 `to`，第二个是当前路由 `from`。

关于 `RouteLocationNormalized` 可用属性的更多信息，请参阅 **[Vue Router 文档](https://router.vuejs.org/api/#RouteLocationNormalized)**。

## 示例

### 显示错误页面

你可以使用路由中间件抛出错误并显示有用的错误信息：

```ts [middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: '页面未找到' })
  }
})
```

上述路由中间件会将用户重定向到在 `~/error.vue` 文件中定义的自定义错误页面，并暴露从中间件传递的错误信息和代码。

### 重定向

结合在路由中间件中使用 [`useState`](/docs/api/composables/use-state) 和 `navigateTo` 辅助函数，根据用户的认证状态将其重定向到不同的路由：

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

`[navigateTo](/docs/api/utils/navigate-to)` 和 `[abortNavigation](/docs/api/utils/abort-navigation)` 是全局可用的辅助函数，可以在 `defineNuxtRouteMiddleware` 中使用。
