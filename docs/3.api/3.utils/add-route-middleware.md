---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware() 是一个帮助函数，用于动态添加中间件到您的应用程序中。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
路由中间件是存储在您的 Nuxt 应用程序的 [`middleware/`](/docs/guide/directory-structure/middleware) 目录中的导航守卫（除非 [另行设置](/docs/api/nuxt-config#middleware)）。
::

## 类型

```ts
function addRouteMiddleware (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void
function addRouteMiddleware (middleware: RouteMiddleware): void

interface AddRouteMiddlewareOptions {
  global?: boolean
}
```

## 参数

### `name`

- **类型：** `string` | `RouteMiddleware`

可以是一个字符串或类型为 `RouteMiddleware` 的函数。函数第一个参数是下一个路由 `to`，第二个参数是当前路由 `from`，两者都是 Vue 路由对象。

了解更多关于 [路由对象](/docs/api/composables/use-route) 的可用属性。

### `middleware`

- **类型：** `RouteMiddleware`

第二个参数是类型为 `RouteMiddleware` 的函数。同上，提供 `to` 和 `from` 路由对象。如果 `addRouteMiddleware()` 的第一个参数已作为函数传入，则该参数变为可选。

### `options`

- **类型：** `AddRouteMiddlewareOptions`

可选的 `options` 参数允许您将 `global` 的值设置为 `true` 以指示路由器中间件是否是全局的（默认设置为 `false`）。

## 示例

### 命名路由中间件

命名路由中间件通过将字符串作为第一个参数、函数作为第二个参数来定义：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('在 Nuxt 插件中添加的命名中间件')
  })
})
```

当在插件中定义时，它会覆盖 `middleware/` 目录中同名的任何现有中间件。

### 全局路由中间件

全局路由中间件可以通过两种方式定义：

- 直接将函数作为第一个参数传入而不提供名称。它将被自动视为全局中间件，并在每个路由更改上应用。

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('在每次路由更改时运行的匿名全局中间件')
    })
  })
  ```

- 设置可选的第三个参数 `{ global: true }` 来指示该路由中间件是否是全局的。

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
        console.log('在每次路由更改时运行的全局中间件')
      },
      { global: true }
    )
  })
  ```