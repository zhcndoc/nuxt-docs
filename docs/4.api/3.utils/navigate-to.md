---
title: "navigateTo"
description: navigateTo 是一个用于编程式导航用户的辅助函数。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## 用法

`navigateTo` 在服务端和客户端均可用。它可以在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中或直接使用，用于执行页面导航。

::warning
调用 `navigateTo` 时，请确保始终对其返回结果使用 `await` 或 `return`。
::

::note
`navigateTo` 不能在 Nitro 路由中使用。若需在 Nitro 路由中执行服务器端重定向，请改用 [`sendRedirect`](https://h3.zhcndoc.com/utils/response#sendredirectevent-location-code)。
::

### 在 Vue 组件中使用

```vue
<script setup lang="ts">
// 以字符串形式传递 'to'
await navigateTo('/search')

// ... 或以路由对象形式传递
await navigateTo({ path: '/search' })

// ... 或带查询参数的路由对象
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc',
  },
})
</script>
```

### 在路由中间件中使用

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // 设置重定向代码为 '301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

在路由中间件中使用 `navigateTo` 时，必须**返回其结果**以确保中间件的执行流程正常。

例如，以下写法**不会按预期工作**：

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ 此写法不会按预期工作
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

此时 `navigateTo` 会被执行但未被返回，可能导致意外行为。

:read-more{to="/docs/guide/directory-structure/middleware"}

### 跳转到外部 URL

`navigateTo` 中的 `external` 参数决定了如何处理跳转到的 URL：

- **不设置或 `external: false`**:
  - 内部 URL 正常导航。
  - 外部 URL 会抛出错误。

- **设置为 `external: true`**:
  - 内部 URL 导航时会进行全页面刷新。
  - 外部 URL 正常导航。

#### 示例

```vue
<script setup lang="ts">
// 默认情况下导航到外部 URL 会抛出错误
await navigateTo('https://nuxt.com')

// 设置 'external' 为 true 后，外部跳转将成功
await navigateTo('https://nuxt.com', {
  external: true,
})
</script>
```

### 在新标签页打开页面

```vue
<script setup lang="ts">
// 在新标签页打开 'https://nuxt.com'
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
  options?: NavigateToOptions,
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

**类型**：[`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/RouteLocationOptions.html#Interface-RouteLocationOptions) | `undefined` | `null`

**默认值**：`'/'`

`to` 可以是普通字符串或路由对象，用于重定向。若传入 `undefined` 或 `null`，则默认跳转到 `'/'`。

#### 示例

```ts
// 直接传入 URL，跳转到 '/blog' 页面
await navigateTo('/blog')

// 使用路由对象，跳转到命名为 'blog' 的路由
await navigateTo({ name: 'blog' })

// 使用路由对象带参数，跳转到 'product' 路由并传递参数 (id = 1)
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options`（可选）

**类型**：`NavigateToOptions`

接受以下属性的对象：

- `replace`

  - **类型**：`boolean`
  - **默认**：`false`
  - 默认情况下，`navigateTo` 会在客户端通过 Vue Router 实例进行路由推入。

  - 设置为 `true` 可改变此行为，表示应替换当前路由。

- `redirectCode`

  - **类型**：`number`
  - **默认**：`302`

  - `navigateTo` 进行服务器端重定向时，会默认使用 [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) 状态码。

  - 可通过该参数修改重定向状态码。常用的还有 [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) 用于永久重定向。

- `external`

  - **类型**：`boolean`
  - **默认**：`false`

  - 设置为 `true` 允许跳转到外部 URL。否则，跳转至外部地址时会抛出错误，因为默认不允许外部导航。

- `open`

  - **类型**：`OpenOptions`

  - 允许使用窗口的 [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 方法打开 URL。该选项仅在客户端生效，服务端会忽略。

  - 接受以下属性的对象：

  - `target`

    - **类型**：`string`
    - **默认**：`'_blank'`

    - 指定资源加载到哪个浏览上下文的字符串，不能包含空白字符。

  - `windowFeatures`

    - **类型**：`OpenWindowFeatures`

    - 接受以下属性的对象：

      | 属性        | 类型      | 说明                                                        |
      | ----------- | --------- | ----------------------------------------------------------- |
      | `popup`     | `boolean` | 请求最小化的弹窗，而非新标签页，UI 由浏览器决定。          |
      | `width` 或 `innerWidth`   | `number`  | 指定内容区域宽度（最小 100 像素），包含滚动条。             |
      | `height` 或 `innerHeight` | `number`  | 指定内容区域高度（最小 100 像素），包含滚动条。             |
      | `left` 或 `screenX`       | `number`  | 新窗口相对于屏幕左侧的水平位置。                            |
      | `top` 或 `screenY`        | `number`  | 新窗口相对于屏幕顶部的垂直位置。                            |
      | `noopener`  | `boolean` | 阻止新窗口通过 `window.opener` 访问来源窗口。              |
      | `noreferrer`| `boolean` | 阻止发送 Referer 头，并隐式启用 `noopener`。               |

    详细的 `windowFeatures` 属性说明，请参考文档：[Window open() - windowFeatures](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures) 。
