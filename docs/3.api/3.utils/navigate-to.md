---
title: "navigateTo"
description: navigateTo 是一个辅助函数，用于程序化地导航用户。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
`navigateTo` 可在客户端和服务器端使用（但不可在 Nitro 路由中使用）。
::

## 用法

`navigateTo` 在服务器端和客户端都可用。它可以在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)中使用，或者直接使用，以执行页面导航。

::tip
要从服务器端点发送重定向，请改用 [`sendRedirect`](https://h3.unjs.io/utils/response#sendredirectevent-location-code)。
::

### 在 Vue 组件中

```vue
<script setup lang="ts">
// 将 'to' 作为字符串传递
await navigateTo('/search')

// ... 或者作为路由对象
await navigateTo({ path: '/search' })

// ... 或者作为具有查询参数的路由对象
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc'
  }
})
</script>
```

### 在路由中间件中

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // 将重定向代码设置为 '301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

:read-more{to="/docs/guide/directory-structure/middleware"}

### 外部 URL

`navigateTo` 中的 `external` 参数影响如何处理对 URL 的导航：

- **没有 `external: true`**:
  - 内部 URL 按预期导航。
  - 外部 URL 抛出一个错误。

- **有 `external: true`**:
  - 内部 URL 通过全页面刷新导航。
  - 外部 URL 按预期导航。

#### 示例

```vue
<script setup lang="ts">
// 将会抛出一个错误；
// 导航到外部 URL 默认是不允许的
await navigateTo('https://nuxt.com')

// 将会成功重定向，因为 'external' 参数设置为 'true'
await navigateTo('https://nuxt.com', {
  external: true
})
</script>
```

### 使用 open()

```vue
<script setup lang="ts">
// 将会在新标签页中打开 'https://nuxt.com'
await navigateTo('https://nuxt.com', {
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500
    }
  }
})
</script>
```

## 类型

```ts
navigateTo(to: RouteLocationRaw | undefined | null, options?: NavigateToOptions) => Promise<void | NavigationFailure> | RouteLocationRaw

interface NavigateToOptions {
  replace?: boolean
  redirectCode?: number
  external?: boolean
  open?: OpenOptions
}
```

::warning
在使用 `navigateTo` 时，请确保总是使用 `await` 或 `return` 结果。
::

## 参数

### `to`

**类型**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/RouteLocationOptions.html#Interface-RouteLocationOptions) | `undefined` | `null`

**默认**: `'/'`

`to` 可以是纯字符串或路由对象，以重定向到。当传递为 `undefined` 或 `null` 时，它将默认为 `'/'`。

#### 示例

```ts
// 直接传递 URL 将重定向到 '/blog' 页面
await navigateTo('/blog')

// 使用路由对象，将重定向到名称为 'blog' 的路由。
await navigateTo({ name: 'blog' })

// 通过路由对象重定向到 '/product' 路由，同时传递一个参数（id = 1）。
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options`（可选）

**类型**: `NavigateToOptions`

一个接受以下属性的对象：

- `replace`（可选）

  **类型**: `boolean`

  **默认**: `false`

  默认情况下，`navigateTo` 在客户端实例上将给定路由推入 Vue Router。

  可以通过将 `replace` 设置为 `true` 来更改此行为，以指示给定路由应该被替换。

- `redirectCode`（可选）

  **类型**: `number`

  **默认**: `302`

  `navigateTo` 重定向到给定路径，并设置重定向代码为 [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)，当重定向发生在服务器端时默认。

  可以通过提供不同的 `redirectCode` 来修改此默认行为。通常，可以使用 [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) 来表示永久重定向。

- `external`（可选）

  **类型**: `boolean`

  **默认**: `false`

  设置为 `true` 时允许导航到外部 URL。否则，`navigateTo` 将抛出错误，因为默认情况下不允许外部导航。

- `open`（可选）

  **类型**: `OpenOptions`

  允许使用 [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 方法的窗口的 `window` 对象来导航到 URL。此选项仅在客户端有效，在服务器端将被忽略。

  一个接受以下属性的对象：

  - `target`

    **类型**: `string`

    **默认**: `'_blank'`

    一个没有空格的字符串，指定资源加载到的浏览上下文名称。

  - `windowFeatures`（可选）

    **类型**: `OpenWindowFeatures`

    一个接受以下属性的对象：

    - `popup`（可选）

      **类型**: `boolean`

    - `width` 或 `innerWidth`（可选）

      **类型**: `number`

    - `height` 或 `innerHeight`（可选）

      **类型**: `number`

    - `left` 或 `screenX`（可选）

      **类型**: `number`

    - `top` 或 `screenY`（可选）

      **类型**: `number`

    - `noopener`（可选）

      **类型**: `boolean`

    - `noreferrer`（可选）

      **类型**: `boolean`

    参考[文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)获取关于 **windowFeatures** 属性的更详细信息。
