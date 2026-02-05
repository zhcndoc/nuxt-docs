---
title: 'definePageMeta'
description: '为你的页面组件定义元数据。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` 是一个编译器宏，你可以用它为位于 [`pages/`](/docs/guide/directory-structure/pages) 目录下的**页面**组件设置元数据（除非[另有设置](/docs/api/nuxt-config#pages)）。这样你可以为 Nuxt 应用的每个静态或动态路由设置自定义元数据。

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
```

:read-more{to="/docs/3.x/directory-structure/pages#page-metadata"}

## 类型

```ts [Signature]
export function definePageMeta (meta: PageMeta): void

interface PageMeta {
  validate?: ((route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>)
  redirect?: RouteRecordRedirectOption
  name?: string
  path?: string
  props?: RouteRecordRaw['props']
  alias?: string | string[]
  groups?: string[]
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

  一个对象，接受以下页面元数据：

  **`name`**

  - **类型**: `string`

    你可以为该页面的路由定义一个名称。默认情况下，名称是根据[`pages/` 目录](/docs/guide/directory-structure/pages)中的路径生成的。

  **`path`**

  - **类型**: `string`

    如果你的匹配模式比文件名可以表达的更复杂，可以定义一个[自定义正则表达式](#using-a-custom-regular-expression)。

  **`props`**
  
  - **类型**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    允许作为 prop 将路由的 `params` 传递给页面组件。

  **`alias`**

  - **类型**: `string | string[]`

    路由别名。允许定义额外路径，使其行为与该路由的副本一致。支持路径简写，如 `/users/:id` 和 `/u/:id`。所有的 `alias` 和 `path` 必须共享相同的参数。

  **`groups`**

  - **类型**: `string[]`

    页面所属的路由组，基于文件夹结构。对于位于[路由组](/docs/3.x/guide/directory-structure/app/pages#route-groups)内的页面会自动填充。

  **`keepalive`**

  - **类型**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive)

    当你希望在路由切换时保留页面状态时设置为 `true`，或者使用 [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive) 进行细粒度控制。

  **`key`**

  - **类型**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    当你需要更精细控制 `<NuxtPage>` 组件何时重新渲染时，设置 `key`。

  **`layout`**

  - **类型**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    为每个路由设置静态或动态的布局名称。如需禁用默认布局，可设置为 `false`。

  **`layoutTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)

    设置当前布局应用的过渡名称。你也可以将其设置为 `false` 来禁用布局过渡。

  **`middleware`**

  - **类型**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    在 `definePageMeta` 中直接定义匿名或命名中间件。了解更多关于[路由中间件](/docs/guide/directory-structure/middleware)。

  **`pageTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)

    设置当前页面应用的过渡名称。你也可以设置为 `false` 来禁用页面过渡。

  **`viewTransition`**

  - **类型**: `boolean | 'always'`

    **实验性功能，仅在[在你的 nuxt.config 文件中启用](/docs/getting-started/transitions#view-transitions-api-experimental)时可用**</br>
    为当前页面启用/禁用视图过渡。
    设置为 `true` 时，如果用户浏览器匹配 `prefers-reduced-motion: reduce`，Nuxt 将不应用过渡（推荐）。设置为 `always` 时，Nuxt 将始终应用过渡。

  **`redirect`**

  - **类型**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias)

    路由直接匹配时重定向的位置。重定向在任何导航守卫之前发生，并触发一次新的导航。

  **`validate`**

  - **类型**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    验证给定路由是否可以用此页面有效渲染。返回 `true` 表示有效，`false` 表示无效。如果找不到其他匹配，将视为 404。你也可以直接返回带有 `statusCode`/`statusMessage` 的对象以立即响应错误（不会再检查其他匹配）。

  **`scrollToTop`**

  - **类型**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    指示 Nuxt 在渲染页面前是否滚动到顶部。若想覆盖 Nuxt 的默认滚动行为，可在 `~/app/router.options.ts` 中实现（详情见[自定义路由](/docs/guide/recipes/custom-routing#using-approuteroptions)）。

  **`[key: string]`**

  - **类型**: `any`

    除上述属性外，你还可以设置**自定义**元数据。建议通过[拓展 `meta` 对象类型](/docs/guide/directory-structure/pages/#typing-custom-metadata) 以类型安全的方式实现。

## 示例

### 基础用法

下面示例演示：

- 如何将 `key` 设置为一个返回值的函数；
- `keepalive` 属性如何确保切换多个组件时 `<modal>` 组件不会被缓存；
- 添加 `pageType` 作为自定义属性：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,

  keepalive: {
    exclude: ['modal'],
  },

  pageType: 'Checkout',
})
</script>
```

### 定义中间件

下面示例展示了如何在 `definePageMeta` 内直接使用 `function` 定义中间件，或者使用匹配 `middleware/` 目录中文件名的字符串：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 以函数形式定义中间件
  middleware: [
    function (to, from) {
      const auth = useState('auth')

      if (!auth.value.authenticated) {
        return navigateTo('/login')
      }

      if (to.path !== '/checkout') {
        return navigateTo('/checkout')
      }
    },
  ],

  // ... 或使用字符串
  middleware: 'auth',

  // ... 或多个字符串
  middleware: ['auth', 'another-named-middleware'],
})
</script>
```

### 使用自定义正则表达式

自定义正则表达式是解决重叠路由冲突的好方法，例如：

路由 "/test-category" 和 "/1234-post" 同时匹配 `[postId]-[postSlug].vue` 和 `[categorySlug].vue` 页面路由。

为了确保 `[postId]-[postSlug]` 路由中的 `postId` 只匹配数字（`\d+`），我们可以在 `[postId]-[postSlug].vue` 页面模板添加如下内容：

```vue [pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug',
})
</script>
```

更多示例请参见 [Vue Router 的匹配语法](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)。

### 定义布局

你可以定义匹配布局文件名的布局（默认位于[`layouts/`目录](/docs/guide/directory-structure/layouts)）。你也可以通过将 `layout` 设置为 `false` 来禁用布局：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 设置自定义布局
  layout: 'admin',

  // ... 或禁用默认布局
  layout: false,
})
</script>
```