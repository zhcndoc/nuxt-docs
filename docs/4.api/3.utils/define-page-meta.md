---
title: 'definePageMeta'
description: '为你的页面组件定义元数据。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` 是一个编译器宏，可用于为位于 [`app/pages/`](/docs/4.x/directory-structure/app/pages) 目录（除非另有[配置](/docs/4.x/api/nuxt-config#pages)）中的 **页面** 组件设置元数据。通过这种方式，你可以为 Nuxt 应用的每个静态或动态路由设置自定义元数据。

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
```

:read-more{to="/docs/4.x/directory-structure/app/pages#page-metadata"}

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
  viewTransition?: ViewTransitionPageOptions['enabled'] | ViewTransitionPageOptions
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

    你可以为该页面的路由定义一个名称。默认情况下，名称是基于 [`app/pages/` 目录](/docs/4.x/directory-structure/app/pages) 内的路径生成的。

  **`path`**

  - **类型**: `string`

    如果你的模式比文件名能表达的更复杂，可以定义一个[自定义正则表达式](/docs/4.x/api/utils/define-page-meta#using-a-custom-regular-expression)。

  **`props`**
  
  - **类型**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    允许将路由的 `params` 作为 props 传入页面组件。

  **`alias`**

  - **类型**: `string | string[]`

    记录的别名。允许定义额外的路径，使其行为像记录的副本。可以使用路径简写例如 `/users/:id` 和 `/u/:id`。所有 `alias` 和 `path` 值必须共享相同的参数。

  **`groups`**

  - **类型**: `string[]`

    页面所属的路由分组，基于文件夹结构自动填充。适用于处于[路由组](/docs/4.x/guide/directory-structure/app/pages#route-groups)内的页面。

  **`keepalive`**

  - **类型**: `boolean` | [`KeepAliveProps`](https://vue.zhcndoc.com/api/built-in-components#keepalive)

    当你希望在路由切换时保留页面状态时设置为 `true`，或者使用 [`KeepAliveProps`](https://vue.zhcndoc.com/api/built-in-components#keepalive) 进行更细粒度的控制。

  **`key`**

  - **类型**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    当你需要更精细地控制 `<NuxtPage>` 组件何时重新渲染时，设置 `key` 值。

  **`layout`**

  - **类型**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    为每个路由设置静态或动态的布局名称。如果需要禁用默认布局，可将其设置为 `false`。

  **`layoutTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vue.zhcndoc.com/api/built-in-components#transition)

    为当前布局设置要应用的过渡。你也可以将此值设置为 `false` 以禁用布局过渡。

  **`middleware`**

  - **类型**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    在 `definePageMeta` 中直接定义匿名或命名的中间件。了解更多关于[路由中间件](/docs/4.x/directory-structure/app/middleware)。

  **`pageTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vue.zhcndoc.com/api/built-in-components#transition)

    为当前页面设置要应用的过渡。你也可以将此值设置为 `false` 以禁用页面过渡。

  **`viewTransition`**

  - **类型**: `boolean | 'always' | ViewTransitionPageOptions`

    **实验性功能，仅在你的 nuxt.config 文件中[启用](/docs/4.x/getting-started/transitions#view-transitions-api-experimental) 时可用**</br>
    启用/禁用当前页面的视图过渡（View Transitions）。
    如果设置为 true，Nuxt 会在用户的浏览器匹配 `prefers-reduced-motion: reduce` 时不应用过渡（推荐）。如果设置为 `always`，Nuxt 将始终应用过渡。

    你也可以传入一个 `ViewTransitionPageOptions` 对象以配置[视图过渡类型](/docs/4.x/getting-started/transitions#view-transition-types):
    - `enabled`: `boolean | 'always'` - 启用/禁用过渡
    - `types`: `string[] | (to, from) => string[]` - 适用于任何涉及此页面的过渡类型
    - `toTypes`: `string[] | (to, from) => string[]` - 仅在导航**到**此页面时应用的类型
    - `fromTypes`: `string[] | (to, from) => string[]` - 仅在导航**从**此页面时应用的类型

  **`redirect`**

  - **类型**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias)

    如果路由被直接匹配时要重定向到的位置。重定向会在任何导航守卫之前发生，并使用新的目标位置触发一次新的导航。

  **`validate`**

  - **类型**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    验证给定路由是否可以用此页面有效地渲染。如果有效返回 true，否则返回 false。如果找不到其他匹配，则表示 404。你也可以直接返回带有 `statusCode`/`statusMessage` 的对象以立即返回错误（不会检查其他匹配）。

  **`scrollToTop`**

  - **类型**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    告诉 Nuxt 在渲染页面之前是否滚动到顶部。如果你想覆盖 Nuxt 的默认滚动行为，可以在 `~/router.options.ts` 中进行设置（更多信息参见[自定义路由](/docs/4.x/guide/recipes/custom-routing#using-routeroptions)）。

  **`[key: string]`**

  - **类型**: `any`

    除上述属性之外，你还可以设置 **自定义** 元数据。若要以类型安全的方式使用自定义元数据，可以通过[增强 `meta` 对象的类型](/docs/4.x/directory-structure/app/pages/#typing-custom-metadata)。

## 示例

### 基本用法

下面的示例演示了：

- `key` 如何可以是一个返回值的函数；
- `keepalive` 属性如何确保在多个组件之间切换时 `<modal>` 组件不会被缓存；
- 添加 `pageType` 作为自定义属性：

```vue [app/pages/some-page.vue]
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

下面的示例展示了如何在 `definePageMeta` 中直接使用 `function` 定义中间件，或者设置为与位于 `app/middleware/` 目录中的中间件文件名相匹配的 `string`：

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // define middleware as a function
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

  // ... or a string
  middleware: 'auth',

  // ... or multiple strings
  middleware: ['auth', 'another-named-middleware'],
})
</script>
```

### 使用自定义正则表达式

当路由重叠时，自定义正则表达式是解决冲突的一个好方法，例如：

两个路由 "/test-category" 和 "/1234-post" 都同时匹配 `[postId]-[postSlug].vue` 和 `[categorySlug].vue` 页面路由。

为确保在 `[postId]-[postSlug]` 路由中我们只匹配数字（`\d+`）作为 `postId`，可以在 `[postId]-[postSlug].vue` 页面模板中添加如下内容：

```vue [app/pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug',
})
</script>
```

更多示例请参阅 [Vue Router 的匹配语法](https://router.vuejs.org/guide/essentials/route-matching-syntax)。

### 定义布局

你可以定义与（默认情况下）位于 [`app/layouts/` 目录](/docs/4.x/directory-structure/app/layouts) 中布局文件名相匹配的布局。你也可以通过将 `layout` 设置为 `false` 来禁用布局：

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // set custom layout
  layout: 'admin',

  // ... or disable a default layout
  layout: false,
})
</script>
```
