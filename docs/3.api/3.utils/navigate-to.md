---
title: "navigateTo"
description: navigateTo 是一个以编程方式导航用户的辅助函数。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## 用法

`navigateTo` 在服务端和客户端均可用。它可以在 [Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 中使用，或直接使用以执行页面导航。

::warning
在调用 `navigateTo` 时，请确保始终对其结果使用 `await` 或 `return`。
::

::note
`navigateTo` 不能在 Nitro 路由中使用。要在 Nitro 路由中执行服务器端重定向，请改用 [`sendRedirect`](https://h3.zhcndoc.com/utils/response#sendredirectevent-location-code)。
::

### 在 Vue 组件内

```vue
<script setup lang="ts">
// passing 'to' as a string
await navigateTo('/search')

// ... or as a route object
await navigateTo({ path: '/search' })

// ... or as a route object with query parameters
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc',
  },
})
</script>
```

### 在路由中间件内

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // setting the redirect code to '301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

在路由中间件中使用 `navigateTo` 时，你必须 **返回其结果**，以确保中间件执行流程正常工作。

例如，以下实现 **将无法按预期工作**：

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ This will not work as expected
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

在这种情况下，`navigateTo` 会被执行但不会被返回，这可能导致意外行为。

:read-more{to="/docs/4.x/guide/directory-structure/app/middleware"}

### 导航到外部 URL

`navigateTo` 中的 `external` 参数会影响如何处理 URL 导航：

- **未设置 `external: true` 时**：
  - 内部 URL 会按预期导航。
  - 外部 URL 会抛出错误。

- **设置 `external: true` 时**：
  - 内部 URL 会以完整页面重新加载的方式导航。
  - 外部 URL 会按预期导航。

#### 示例

```vue
<script setup lang="ts">
// will throw an error;
// navigating to an external URL is not allowed by default
await navigateTo('https://nuxt.com')

// will redirect successfully with the 'external' parameter set to 'true'
await navigateTo('https://nuxt.com', {
  external: true,
})
</script>
```

### 在新标签页打开页面

```vue
<script setup lang="ts">
// will open 'https://nuxt.com' in a new tab
await navigateTo('https://nuxt.com', {
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500,
    },
  },
})
</script>
```

## 类型

```ts [Signature]
export function navigateTo (
  to: RouteLocationRaw | undefined | null,
  options?: NavigateToOptions
): Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw

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

`to` 可以是一个普通字符串或要重定向到的路由对象。当传入 `undefined` 或 `null` 时，默认会使用 `'/'`。

#### 示例

```ts
// Passing the URL directly will redirect to the '/blog' page
await navigateTo('/blog')

// Using the route object, will redirect to the route with the name 'blog'
await navigateTo({ name: 'blog' })

// Redirects to the 'product' route while passing a parameter (id = 1) using the route object.
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options`（可选）

**类型**: `NavigateToOptions`

一个接受以下属性的对象：

- `replace`

  - **类型**: `boolean`
  - **默认值**: `false`
  - 默认情况下，`navigateTo` 在客户端会将给定路由推入 Vue Router 的历史记录中。

    可以通过将 `replace` 设置为 `true` 来改变此行为，表示应替换当前历史记录项。

- `redirectCode`

  - **类型**: `number`
  - **默认值**: `302`

  - 当重定向在服务器端发生时，`navigateTo` 会重定向到给定路径并将重定向状态码默认设置为 [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)。

    可以通过提供不同的 `redirectCode` 来修改此默认行为。常见的做法是在永久重定向时使用 [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)。

- `external`

  - **类型**: `boolean`
  - **默认值**: `false`

  - 将其设置为 `true` 时允许导航到外部 URL。否则，`navigateTo` 会抛出错误，因为默认不允许外部导航。

- `open`

  - **类型**: `OpenOptions`
  - 允许使用窗口的 [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 方法导航到 URL。此选项仅在客户端适用，在服务器端会被忽略。

    一个接受以下属性的对象：

  - `target`

    - **类型**: `string`
    - **默认值**: `'_blank'`

    - 一个不包含空白字符的字符串，指定要加载资源的浏览上下文名称。

  - `windowFeatures`

    - **类型**: `OpenWindowFeatures`

    - 一个接受以下属性的对象：

      | 属性 | 类型    | 描述 |
      |------|---------|------|
      | `popup`  | `boolean` | 请求一个最小化的弹出窗口而不是新标签页，窗口的 UI 特性由浏览器决定。 |
      | `width` 或 `innerWidth`  | `number`  | 指定内容区域的宽度（最小 100 像素），包括滚动条。 |
      | `height` 或 `innerHeight` | `number`  | 指定内容区域的高度（最小 100 像素），包括滚动条。 |
      | `left` 或 `screenX`   | `number`  | 设置新窗口相对于屏幕左边缘的水平位置。 |
      | `top` 或 `screenY`   | `number`  | 设置新窗口相对于屏幕顶部的垂直位置。 |
      | `noopener` | `boolean` | 防止新窗口通过 `window.opener` 访问来源窗口。 |
      | `noreferrer` | `boolean` | 阻止发送 Referer 头部，并隐式启用 `noopener`。 |

      有关 **windowFeatures** 属性的更详细信息，请参阅[文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures)。
