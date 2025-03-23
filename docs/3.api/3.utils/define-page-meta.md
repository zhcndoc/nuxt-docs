---
title: 'definePageMeta'
description: '为你的页面组件定义元数据。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` 是一个编译器宏，你可以用它为位于 [`pages/`](/docs/guide/directory-structure/pages) 目录中的 **页面** 组件设置元数据（除非 [另有设置](/docs/api/nuxt-config#pages)）。通过这种方式，你可以为 Nuxt 应用程序的每个静态或动态路由设置自定义元数据。

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

:read-more{to="/docs/guide/directory-structure/pages/#page-metadata"}

## 类型

```ts
definePageMeta(meta: PageMeta) => void

interface PageMeta {
  validate?: (route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>
  redirect?: RouteRecordRedirectOption
  name?: string
  path?: string
  props?: RouteRecordRaw['props']
  alias?: string | string[]
  pageTransition?: boolean | TransitionProps
  layoutTransition?: boolean | TransitionProps
  viewTransition?: boolean | 'always'
  key?: false | string | ((route: RouteLocationNormalizedLoaded) => string)
  keepalive?: boolean | KeepAliveProps
  layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  scrollToTop?: boolean | ((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => boolean)
  [key: string]: unknown
}
```

## 参数

### `meta`

- **类型**: `PageMeta`

  一个接受以下页面元数据的对象：

  **`name`**

  - **类型**: `string`

    你可以为该页面的路由定义一个名称。默认情况下，名称是基于 [`pages/` 目录](/docs/guide/directory-structure/pages) 内的路径生成的。

  **`path`**

  - **类型**: `string`

    如果你的模式比文件名更复杂，你可以定义一个 [自定义正则表达式](#using-a-custom-regular-expression)。

  **`props`**
  
  - **类型**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    允许将路由 `params` 作为传递给页面组件的 props 进行访问。

  **`alias`**

  - **类型**: `string | string[]`

    记录的别名。允许定义额外的路径，这些路径将表现得像记录的副本。允许使用路径简写，例如 `/users/:id` 和 `/u/:id`。所有 `alias` 和 `path` 值必须共享相同的参数。

  **`keepalive`**

  - **类型**: `boolean` | [`KeepAliveProps`](https://vue.zhcndoc.com/api/built-in-components.html#keepalive)

    当你希望在路由更改时保留页面状态时设置为 `true`，或者使用 [`KeepAliveProps`](https://vue.zhcndoc.com/api/built-in-components.html#keepalive) 进行细粒度控制。

  **`key`**

  - **类型**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    当你需要更好地控制何时重新渲染 `<NuxtPage>` 组件时设置 `key` 值。

  **`layout`**

  - **类型**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    为每个路由设置静态或动态的布局名称。如果需要禁用默认布局，可以将其设置为 `false`。

  **`layoutTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vue.zhcndoc.com/api/built-in-components.html#transition)

    设置当前布局的过渡名称。你还可以将此值设置为 `false` 来禁用布局过渡。

  **`middleware`**

  - **类型**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/NavigationGuard.html#navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    在 `definePageMeta` 中直接定义匿名或命名的中间件。了解更多关于 [路由中间件](/docs/guide/directory-structure/middleware)。

  **`pageTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vue.zhcndoc.com/api/built-in-components.html#transition)

    设置应用于当前页面的过渡名称。你还可以将此值设置为 `false` 来禁用页面过渡。

  **`viewTransition`**

  - **类型**: `boolean | 'always'`

    **实验性特性，仅在 [你的 nuxt.config 文件中启用时可用](/docs/getting-started/transitions#view-transitions-api-experimental)**</br>
    启用/禁用当前页面的视图过渡。
    如果设置为 true，则当用户的浏览器符合 `prefers-reduced-motion: reduce`（建议）时，Nuxt 将不应用过渡。如果设置为 `always`，Nuxt 将始终应用过渡。

  **`redirect`**

  - **类型**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect-and-alias)

    如果直接匹配路由，则重定向到何处。重定向发生在任何导航守卫之前，并触发到新目标位置的新导航。

  **`validate`**

  - **类型**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    验证给定路由是否可以有效地使用此页面进行渲染。如果有效则返回 true，反之返回 false。如果找不到其他匹配项，这将意味着 404。你还可以直接返回一个包含 `statusCode`/`statusMessage` 的对象以立即响应错误（不会检查其他匹配项）。

  **`scrollToTop`**

  - **类型**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    告诉 Nuxt 是否在渲染页面之前滚动到顶部。如果你想覆盖 Nuxt 的默认滚动行为，可以在 `~/app/router.options.ts` 中进行设置（有关更多信息，请参见 [自定义路由](/docs/guide/recipes/custom-routing#using-approuteroptions)）。

  **`[key: string]`**

  - **类型**: `any`

    除上述属性外，你还可以设置 **自定义** 元数据。你可能希望以类型安全的方式做到这一点，通过 [增强 `meta` 对象的类型](/docs/guide/directory-structure/pages/#typing-custom-metadata)。

## 示例

### 基本用法

下面的示例演示了：

- 如何将 `key` 设置为一个返回值的函数；
- 如何确保在多个组件之间切换时 `keepalive` 属性使 `<modal>` 组件不会被缓存；
- 添加 `pageType` 作为自定义属性：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,

  keepalive: {
    exclude: ['modal']
  },

  pageType: 'Checkout'
})
</script>
```

### 定义中间件

下面的示例展示了如何可以通过在 `definePageMeta` 中直接使用一个 `function` 来定义中间件，或者将其设置为一个匹配 `middleware/` 目录中间件文件名称的 `string`：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 将中间件定义为一个函数
  middleware: [
    function (to, from) {
      const auth = useState('auth')

      if (!auth.value.authenticated) {
          return navigateTo('/login')
      }

      if (to.path !== '/checkout') {
        return navigateTo('/checkout')
      }
    }
  ],

  // ... 或者一个字符串
  middleware: 'auth',

  // ... 或多个字符串
  middleware: ['auth', 'another-named-middleware']
})
</script>
```

### 使用自定义正则表达式

自定义正则表达式是一种解决重叠路由之间冲突的好方法，例如：

两个路由 "/test-category" 和 "/1234-post" 都匹配 `[postId]-[postSlug].vue` 和 `[categorySlug].vue` 页面路由。

为了确保我们仅匹配 `[postId]-[postSlug]` 路由中的数字 (`\d+`)，我们可以在 `[postId]-[postSlug].vue` 页面模板中添加以下内容：

```vue [pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug' 
})
</script>
```

有关更多示例，请参见 [Vue Router 的匹配语法](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)。

### 定义布局

你可以定义与布局文件名称匹配的布局（默认位于 [`layouts/` 目录](/docs/guide/directory-structure/layouts)）。你还可以通过将 `layout` 设置为 `false` 来禁用布局：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 设置自定义布局
  layout: 'admin',

  // ... 或禁用默认布局
  layout: false
})
</script>
```
