---
title: 'abortNavigation'
description: 'abortNavigation 是一个辅助函数，用于阻止导航发生，并在传入错误参数时抛出该错误。'
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation` 仅可在[路由中间件处理程序](/docs/4.x/directory-structure/app/middleware)内使用。
::

## 类型

```ts [Signature]
export function abortNavigation (err?: Error | string): false
```

## 参数

### `err`

- **类型**: [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`

  可选的错误，将由 `abortNavigation` 抛出。

## 示例

下面的示例演示了如何在路由中间件中使用 `abortNavigation` 来阻止未授权的路由访问：

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation()
  }

  if (to.path !== '/edit-post') {
    return navigateTo('/edit-post')
  }
})
```

### 将 `err` 作为字符串

你可以将错误作为字符串传递：

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('Insufficient permissions.')
  }
})
```

### 将 `err` 作为 Error 对象

你可以将错误作为一个 [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) 对象传递，例如在 `catch` 块中捕获到的错误：

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* code that might throw an error */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
