---
title: "navigateTo"
description: navigateTo 是一个辅助函数，可编程地导航用户。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## 用法

`navigateTo` 可以在服务器端和客户端使用。可以在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中使用，或直接使用，执行页面导航。

::warning
调用 `navigateTo` 时，请确保始终使用 `await` 或 `return` 其结果。
::

::note
`navigateTo` 不能在 Nitro 路由内使用。要在 Nitro 路由中执行服务器端重定向，请使用 [`sendRedirect`](https://h3.unjs.io/utils/response#sendredirectevent-location-code)。
::

### 在 Vue 组件中

```vue
<script setup lang="ts">
// 将 'to' 作为字符串传递
await navigateTo('/search')

// ...或作为路由对象
await navigateTo({ path: '/search' })

// ...或作为带有查询参数的路由对象
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc'
  }
})
</script>
```

### 在路由中间件内

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // 将重定向代码设置为 '301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

在路由中间件中使用 `navigateTo` 时，您必须 **返回其结果** 以确保中间件执行流程正确。

例如，以下实现 **不会按预期工作**：

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ 这将无法按预期工作
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

在这种情况下，`navigateTo` 将被执行但未被返回，这可能导致意外行为。

:read-more{to="/docs/guide/directory-structure/middleware"}

### 导航到外部 URL

`navigateTo` 中的 `external` 参数影响导航到 URL 的处理方式：

- **没有 `external: true`**：
  - 内部 URL 按预期进行导航。
  - 外部 URL 会抛出错误。

- **有 `external: true`**：
  - 内部 URL 会执行完整页面重新加载。
  - 外部 URL 照常导航。

#### 示例

```vue
<script setup lang="ts">
// 将抛出错误；
// 默认情况下不允许导航到外部 URL
await navigateTo('https://nuxt.com')

// 将成功重定向，'external' 参数设置为 'true'
await navigateTo('https://nuxt.com', {
  external: true
})
</script>
```

### 在新标签页中打开页面

```vue
<script setup lang="ts">
// 将在新标签页中打开 'https://nuxt.com'
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
function navigateTo(
  to: RouteLocationRaw | undefined | null,
  options?: NavigateToOptions
) => Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw 

interface NavigateToOptions {
  replace?: boolean
  redirectCode?: number
  external?: boolean
  open?: OpenOptions
}

type OpenOptions = {
  target: string
  windowFeatures?: OpenWindowFeatures
}

type OpenWindowFeatures = {
  popup?: boolean
  noopener?: boolean
  noreferrer?: boolean
} & XOR<{ width?: number }, { innerWidth?: number }>
  & XOR<{ height?: number }, { innerHeight?: number }>
  & XOR<{ left?: number }, { screenX?: number }>
  & XOR<{ top?: number }, { screenY?: number }>
```

## 参数

### `to`

**类型**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/RouteLocationOptions.html#Interface-RouteLocationOptions) | `undefined` | `null`

**默认值**: `'/'`

`to` 可以是一个简单字符串或一个路由对象进行重定向。当作为 `undefined` 或 `null` 传递时，默认值将为 `'/'`。

#### 示例

```ts
// 直接传递 URL 将重定向到 '/blog' 页面
await navigateTo('/blog')

// 使用路由对象，将重定向到名称为 'blog' 的路由
await navigateTo({ name: 'blog' })

// 在通过路由对象传递参数 (id = 1) 的同时重定向到 'product' 路由。
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options` (可选)

**类型**: `NavigateToOptions`

一个接受以下属性的对象：

- `replace`

  - **类型**: `boolean`
  - **默认值**: `false`
  - 默认情况下，`navigateTo` 在客户端将给定的路由推送到 Vue Router 实例中。

    可通过将 `replace` 设置为 `true` 更改此行为，表示给定路由应被替换。

- `redirectCode`

  - **类型**: `number`
  - **默认值**: `302`

  - `navigateTo` 会将重定向到给定路径，并在服务器端发生重定向时，默认将重定向代码设置为 [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)。

    这种默认行为可以通过提供不同的 `redirectCode` 来修改。通常，可以使用 [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) 进行永久性重定向。

- `external`

  - **类型**: `boolean`
  - **默认值**: `false`

  - 允许在设置为 `true` 时导航到外部 URL。否则，`navigateTo` 将抛出错误，因为默认情况下不允许外部导航。

- `open`

  - **类型**: `OpenOptions`
  - 允许通过窗口的 [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 方法导航到 URL。此选项仅适用于客户端，将在服务器端被忽略。

    一个接受以下属性的对象：

  - `target`

    - **类型**: `string`
    - **默认值**: `'_blank'`

    - 一个不带空格的字符串，指定资源加载的浏览上下文的名称。

  - `windowFeatures`

    - **类型**: `OpenWindowFeatures`

    - 一个接受以下属性的对象：

      | 属性     | 类型      | 描述                                            |
      |----------|-----------|-------------------------------------------------|
      | `popup`  | `boolean` | 请求一个最小化的弹出窗口，而不是新标签页，由浏览器决定 UI 特性。  |
      | `width` 或 `innerWidth`  | `number`  | 指定内容区的宽度（最小 100 像素），包括滚动条。 |
      | `height` 或 `innerHeight` | `number`  | 指定内容区的高度（最小 100 像素），包括滚动条。 |
      | `left` 或 `screenX`   | `number`  | 设置新窗口相对于屏幕左边的水平位置。 |
      | `top` 或 `screenY`   | `number`  | 设置新窗口相对于屏幕上边的垂直位置。 |
      | `noopener` | `boolean` | 防止新窗口通过 `window.opener` 访问原窗口。 |
      | `noreferrer` | `boolean` | 防止发送 Referer 头，并隐式启用 `noopener`。 |

      有关 **windowFeatures** 属性的更详细信息，请参阅 [文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures)。