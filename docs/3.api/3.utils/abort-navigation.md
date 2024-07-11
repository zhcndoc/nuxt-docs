---
title: 'abortNavigation'
description: 'abortNavigation 是一个辅助函数，它防止导航发生，如果传入一个错误参数，则抛出该错误。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation` 只能在[路由中间件处理程序](/docs/guide/directory-structure/middleware)内部使用。
::

## 类型

```ts
abortNavigation(err?: Error | string): false
```

## 参数

### `err`

- **类型**: [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`

  `abortNavigation` 抛出的可选错误。

## 示例

下面的示例显示了如何在路由中间件中使用 `abortNavigation` 来防止未授权的路由访问：

```ts [middleware/auth.ts]
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

### `err` 作为字符串

你可以将错误作为字符串传递：

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('Insufficient permissions.')
  }
})
```

### `err` 作为 Error 对象

你可以将错误作为一个 [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) 对象传递，例如在 `catch` 块中捕获的错误：

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* 可能抛出错误的代码 */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
