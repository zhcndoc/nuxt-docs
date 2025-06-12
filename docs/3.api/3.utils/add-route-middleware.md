---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware() 是一个在你的应用中动态添加中间件的辅助函数。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
路由中间件是存储在你的 Nuxt 应用的 [`middleware/`](/docs/guide/directory-structure/middleware) 目录下的导航守卫（除非[另有设置](/docs/api/nuxt-config#middleware)）。
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

可以是字符串或者 `RouteMiddleware` 类型的函数。函数接收下一个路由 `to` 作为第一个参数，当前路由 `from` 作为第二个参数，这两个参数都是 Vue 路由对象。

了解更多关于[路由对象](/docs/api/composables/use-route)的可用属性。

### `middleware`

- **类型:** `RouteMiddleware`

第二个参数是一个 `RouteMiddleware` 类型的函数。同上，提供 `to` 和 `from` 路由对象。如果 `addRouteMiddleware()` 的第一个参数已经作为函数传入，那么这个参数为可选。

### `options`

- **类型:** `AddRouteMiddlewareOptions`

可选的 `options` 参数允许你设置 `global` 值为 `true`，以指示路由中间件是否为全局（默认是 `false`）。

## 示例

### 命名路由中间件

命名路由中间件通过提供字符串作为第一个参数，函数作为第二个参数来定义：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('在 Nuxt 插件中添加了命名中间件')
  })
})
```

当在插件中定义时，它会覆盖 `middleware/` 目录下已有的同名中间件。

### 全局路由中间件

全局路由中间件有两种定义方式：

- 直接将函数作为第一个参数（无名称），它将自动被视为全局中间件，应用于每次路由变化。

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('匿名全局中间件，每次路由变化时执行')
    })
  })
  ```

- 设置第三个可选参数 `{ global: true }` 来表示路由中间件为全局中间件。

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
        console.log('全局中间件，每次路由变化时执行')
      },
      { global: true }
    )
  })
  ```