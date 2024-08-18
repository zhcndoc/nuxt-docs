---
title: 'definePageMeta'
description: '定义页面的元数据。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` 是一个编译宏，您可以使用它为位于 `pages/` 目录（除非 [set otherwise](/docs/api/nuxt-config#pages)）中的 **page** 组件设置元数据。这样，您可以为 Nuxt 应用程序的每个静态或动态路由设置自定义元数据。

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

    您可以为这个页面的路由定义一个名字。默认情况下，名字是根据 `pages/` 目录中的文件名生成的。

  **`path`**

  - **类型**: `string`

    如果您的模式比文件名表达的更复杂，您可以定义一个 [自定义正则表达式](#using-a-custom-regular-expression)。

  **`alias`**

  - **类型**: `string | string[]`

    记录的别名。允许定义额外的路径，这些路径将像记录的副本一样表现。允许拥有路径缩写，如 `/users/:id` 和 `/u/:id`。所有 `alias` 和 `path` 值必须共享相同的 params。

  **`keepalive`**

  - **类型**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive)

    当您希望跨路由更改保留页面状态时，或者使用 [`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive) 进行精细控制时，将其设置为 `true`。

  **`key`**

  - **类型**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    当您需要更多控制何时重渲染 `<NuxtPage>` 组件时，设置 `key` 值。

  **`layout`**

  - **类型**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    为每个路由设置静态或动态布局名称。这可以设置为 `false`，以禁用默认布局。

  **`layoutTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition)

    为当前布局设置过渡的名字。您也可以将这个值设置为 `false` 以禁用布局过渡。

  **`middleware`**

  - **类型**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/NavigationGuard.html#navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    直接在 `definePageMeta` 中定义匿名或命名中间件。了解更多关于 [路由中间件](/docs/guide/directory-structure/middleware)。

  **`pageTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition)

    为当前页面设置过渡的名字。您也可以将这个值设置为 `false` 以禁用页面过渡。

  **`viewTransition`**

  - **类型**: `boolean | 'always'`

    **实验性功能，仅当在您的 nuxt.config 文件中 [启用](/docs/getting-started/transitions#view-transitions-api-experimental)**</br>
    启用/禁用当前页面的视图过渡。
    如果设置为 true，Nuxt 将不会在用户浏览器的 `prefers-reduced-motion: reduce` 匹配时应用过渡（推荐）。如果设置为 `always`，Nuxt 将总是应用过渡。

  **`redirect`**

  - **类型**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect-and-alias)

    如果直接匹配这个路由，那么重定向到哪里。重定向在检查任何导航守卫之前发生，并使用新的目标位置触发新的导航。

  **`validate`**

  - **类型**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    验证给定路由是否可以有效地使用这个页面渲染。如果有效，返回 true；如果无效，返回 false。如果找不到其他匹配，这意味着一个 404。您还可以直接返回一个包含 `statusCode`/`statusMessage` 的对象来立即响应错误（不会检查其他匹配）。

  **`scrollToTop`**

  - **类型**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    告诉 Nuxt 在渲染页面之前是否滚动到顶部。如果您想要覆盖 Nuxt 的默认滚动行为，您可以在 `~/app/router.options.ts` 中这样做（查看 [自定义路由](/docs/guide/recipes/custom-routing#using-approuteroptions) 了解更多信息）。

  **`[key: string]`**

  - **类型**: `any`

    除了上述属性之外，您还可以设置 **自定义** 元数据。您可能希望在 [增强 `meta` 对象的类型](/docs/guide/directory-structure/pages/#typing-custom-metadata) 以一种类型安全的方式。

## 示例

### 基本用法

下面的示例演示了：

- `key` 如何作为一个函数返回一个值；
- 如何通过 `keepalive` 属性确保 `<modal>` 组件在切换多个组件时不被缓存；
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

下面的示例展示了如何使用 `function` 直接在 `definePageMeta` 中定义中间件，或者将中间件设置为匹配位于 `middleware/` 目录中的中间件文件名称的 `string`：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 定义中间件作为一个函数
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
  middleware: 'auth'

  // ... 或者多个字符串
  middleware: ['auth', 'another-named-middleware']
})
</script>
```

### 使用自定义正则表达式

自定义正则表达式是一个很好的方法，可以解决重叠路由之间的冲突，例如：

两条路线 "/test-category" 和 "/1234-post" 都匹配 `[postId]-[postSlug].vue` 和 `[categorySlug].vue` 页面路由。

为了确保我们在 `[postId]-[postSlug]` 路由中只匹配数字（`\d+`）为 `postId`，我们可以在 `[postId]-[postSlug].vue` 页面模板中添加以下内容：

```vue [pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug' 
})
</script>
```

了解更多示例，请参阅 [Vue Router 的匹配语法](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)。

### 定义布局

您可以通过设置与默认情况下位于 `layouts/` 目录中的布局文件名称匹配的布局来定义布局。您还可以通过将 `layout` 设置为 `false` 来禁用布局：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 设置自定义布局
  layout: 'admin'

  // ... 或者禁用默认布局
  layout: false
})
</script>
```
