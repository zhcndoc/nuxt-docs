---
title: "defineNuxtRouteMiddleware"
description: "使用 defineNuxtRouteMiddleware 辅助函数创建命名的路由中间件。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

路由中间件存放在 Nuxt 应用的 [`app/middleware/`](/docs/4.x/guide/directory-structure/app/middleware) 目录中（除非在配置中[另行设置](/docs/4.x/api/nuxt-config#middleware)）。

## 类型

```ts [Signature]
export function defineNuxtRouteMiddleware (middleware: RouteMiddleware): RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
```

## 参数

### `middleware`

- **类型**: `RouteMiddleware`

一个接收两个 Vue Router 路由位置对象作为参数的函数：第一个参数是即将进入的路由 `to`，第二个参数是当前路由 `from`。

有关 `RouteLocationNormalized` 可用属性的更多信息，请参阅 **[Vue Router 文档](https://router.vuejs.org/api/type-aliases/RouteLocationNormalized.html)**。

## 示例

### 显示错误页面

你可以使用路由中间件抛出错误并显示有用的错误信息：

```ts [app/middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})
```

上述路由中间件会将用户重定向到在 `~/error.vue` 文件中定义的自定义错误页面，并暴露从中间件传递过来的错误消息和状态码。

### 重定向

在路由中间件中，结合使用 [`useState`](/docs/4.x/api/composables/use-state) 和 `navigateTo` 辅助函数，可根据用户的认证状态将其重定向到不同的路由：

```ts [app/middleware/auth.ts]
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

`[navigateTo](/docs/4.x/api/utils/navigate-to)` 和 `[abortNavigation](/docs/4.x/api/utils/abort-navigation)` 都是全局可用的辅助函数，你可以在 `defineNuxtRouteMiddleware` 中使用它们。