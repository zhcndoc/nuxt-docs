---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware() 是一个用于在应用中动态添加中间件的辅助函数。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
路由中间件是存储在 Nuxt 应用 [`app/middleware/`](/docs/directory-structure/app/middleware) 目录中的导航守卫（除非[另行设置](/docs/api/nuxt-config#middleware)）。
::

## 类型

```ts [签名]
function addRouteMiddleware (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void
function addRouteMiddleware (middleware: RouteMiddleware): void

interface AddRouteMiddlewareOptions {
  global?: boolean
}
```

## 参数

### `name`

- **类型：** `string` | `RouteMiddleware`

可以是字符串或类型为 `RouteMiddleware` 的函数。函数以目标路由 `to` 作为第一个参数、当前路由 `from` 作为第二个参数，两个参数都是 Vue 路由对象。

了解[路由对象](/docs/api/composables/use-route)上可用的属性。

### `middleware`

- **类型：** `RouteMiddleware`

第二个参数是类型为 `RouteMiddleware` 的函数。同上，该函数提供 `to` 和 `from` 路由对象。如果 `addRouteMiddleware()` 的第一个参数已经作为函数传入，该参数则变为可选。

### `options`

- **类型：** `AddRouteMiddlewareOptions`

可选的 `options` 参数允许你将 `global` 设置为 `true`，以指示路由中间件是否为全局中间件（默认设置为 `false`）。

## 示例

### 命名路由中间件

命名路由中间件通过将字符串作为第一个参数、函数作为第二个参数来定义：

```ts [app/plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('named middleware added in Nuxt plugin')
  })
})
```

在插件中定义时，它会覆盖 `app/middleware/` 目录中任何同名的现有中间件。

### 全局路由中间件

全局路由中间件可以通过两种方式定义：

- 直接将函数作为第一个参数传入而不提供名称。它会被自动视为全局中间件，并在每次路由变化时应用。

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('anonymous global middleware that runs on every route change')
    })
  })
  ```

- 设置可选的第三个参数 `{ global: true }`，以指示该路由中间件为全局中间件。

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
      console.log('global middleware that runs on every route change')
    },
    { global: true },
    )
  })
  ```
