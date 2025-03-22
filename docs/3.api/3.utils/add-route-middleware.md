---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware() 是一个帮助函数，用于动态地在您的应用程序中添加中间件。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
路由中间件是导航守卫，存储在您的 Nuxt 应用程序的 [`middleware/`](/docs/guide/directory-structure/middleware) 目录中（除非 [另行设置](/docs/api/nuxt-config#middleware)）。
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

- **类型:** `string` | `RouteMiddleware`

可以是一个字符串或类型为 `RouteMiddleware` 的函数。函数将下一个路由 `to` 作为第一个参数，当前路由 `from` 作为第二个参数，这两者都是 Vue 路由对象。

了解有关 [路由对象](/docs/api/composables/use-route) 的可用属性的更多信息。

### `middleware`

- **类型:** `RouteMiddleware`

第二个参数是一个类型为 `RouteMiddleware` 的函数。同上述，它提供 `to` 和 `from` 路由对象。如果 `addRouteMiddleware()` 的第一个参数已经作为函数传递，则该参数变为可选。

### `options`

- **类型:** `AddRouteMiddlewareOptions`

一个可选的 `options` 参数允许您将 `global` 的值设置为 `true`，以指示路由中间件是否为全局的（默认值为 `false`）。

## 示例

### 命名路由中间件

命名路由中间件通过提供一个字符串作为第一个参数和一个函数作为第二个参数来定义：

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

- 直接将一个函数作为第一个参数传递而不指定名称。它将被自动视为全局中间件，并在每次路由变化时应用。

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('每次路由变化时运行的匿名全局中间件')
    })
  })
  ```

- 设置一个可选的第三个参数 `{ global: true }` 以指示路由中间件是否为全局的。

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
        console.log('每次路由变化时运行的全局中间件')
      },
      { global: true }
    )
  })
  ```