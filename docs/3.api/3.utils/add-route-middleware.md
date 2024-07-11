---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware() 是用于在应用程序中动态添加中间件的一个辅助函数。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
路由中间件是存储在您的 Nuxt 应用程序的 [`middleware/`](/docs/guide/directory-structure/middleware) 目录中的导航守卫（除非[设置其他](/docs/api/nuxt-config#middleware)）。
::

## 类型

```ts
addRouteMiddleware (name: string | RouteMiddleware, middleware?: RouteMiddleware, options: AddRouteMiddlewareOptions = {})
```

## 参数

### `name`

- **类型:** `string` | `RouteMiddleware`

可以是字符串或类型为 `RouteMiddleware` 的函数。该函数以下一个路由 `to` 作为第一个参数，当前路由 `from` 作为第二个参数，两者都是 Vue 路由对象。

了解更多关于[路由对象](/docs/api/composables/use-route)可用的属性。

### `middleware`

- **类型:** `RouteMiddleware`

第二个参数是类型为 `RouteMiddleware` 的函数。与上面相同，它提供了 `to` 和 `from` 路由对象。如果 `addRouteMiddleware()` 的第一个参数已经作为函数传递，那么它就变得可选。

### `options`

- **类型:** `AddRouteMiddlewareOptions`

一个可选的 `options` 参数让你可以设置 `global` 的值为 `true` 来指示路由中间件是否是全局的（默认为 `false`）。

## 示例

### 匿名路由中间件

匿名路由中间件没有名称。它以一个函数作为第一个参数，使得第二个 `middleware` 参数变得多余：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware((to, from) => {
    if (to.path === '/forbidden') {
      return false
    }
  })
})
```

### 命名路由中间件

命名路由中间件以字符串作为第一个参数，以函数作为第二个参数。

当在插件中定义时，它会覆盖 `middleware/` 目录中同名已存在的中间件：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('named middleware added in Nuxt plugin')
  })
})
```

### 全局路由中间件

设置一个可选的第三个参数 `{ global: true }` 来指示路由中间件是否是全局的：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-middleware', (to, from) => {
      console.log('global middleware that runs on every route change')
    },
    { global: true }
  )
})
```
