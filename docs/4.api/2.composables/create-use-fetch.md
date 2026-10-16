---
title: 'createUseFetch'
description: 用于创建一个带有预定义默认选项的自定义 useFetch 组合式函数的工厂函数。
minimalVersion: "4.4"
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`createUseFetch` 会创建一个带有预定义选项的自定义 [`useFetch`](/docs/api/composables/use-fetch) 组合式函数。生成的组合式函数具有完整的类型定义，使用方式与 `useFetch` 完全相同，但会预先应用你设置的默认值。

::note
`createUseFetch` 是一个编译宏。它必须在 `composables/` 目录中以**导出的声明**形式使用（或任何被 Nuxt 编译器扫描的目录）。Nuxt 会在构建时自动注入去重 key。
::

## 用法

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  baseURL: 'https://api.nuxt.com',
})
```

```vue [app/pages/modules.vue]
<script setup lang="ts">
const { data: modules } = await useAPI('/modules')
</script>
```

生成的 `useAPI` 组合式函数具有与 [`useFetch`](/docs/api/composables/use-fetch) 相同的签名和返回类型，调用方可以使用或覆盖所有选项。

## 类型

```ts [签名]
function createUseFetch (
  options?: Partial<UseFetchOptions> & { addons?: UseFetchAddon[] },
): typeof useFetch

function createUseFetch (
  options: (callerOptions: UseFetchOptions) => Partial<UseFetchOptions>,
): typeof useFetch

function createUseFetch<Routes> (
  options: Partial<UseFetchOptions> & { routes: Routes, addons?: UseFetchAddon[] },
): DeclaredUseFetch<Routes>
```

返回的组合式函数签名会包含 [addons](#addons) 提供的自定义选项和返回值扩展。

## 选项

`createUseFetch` 接受与 [`useFetch`](/docs/api/composables/use-fetch#parameters) 相同的所有选项，包括 `baseURL`、`headers`、`query`、`onRequest`、`onResponse`、`server`、`lazy`、`transform`、`getCachedData` 等。

请参阅 [`useFetch` 文档](/docs/api/composables/use-fetch#parameters)中的完整选项列表。

## 为第三方 API 添加类型

从 Nuxt 4.6 开始，可以传入 `routes` 描述组合式函数调用的 API。响应、查询参数和请求正文会根据这组路由提供类型，即使关闭了 `experimental.routeTypedFetch` 也一样：

```ts [app/composables/usePetStore.ts]
import type { DynamicParam, Endpoint } from 'nuxt/app'

interface Pet { id: number, name: string }

interface PetStoreRoutes {
  '/pets': {
    [Endpoint]: {
      GET: { response: Pet[], query: { limit?: number } }
      POST: { response: Pet, body: { name: string } }
    }
    [DynamicParam]: {
      [Endpoint]: { GET: { response: Pet } }
    }
  }
}

export const usePetStore = createUseFetch({
  baseURL: 'https://api.example.com',
  routes: {} as PetStoreRoutes,
})
```

```vue [app/pages/pets.vue]
<script setup lang="ts">
const { data: pets } = await usePetStore('/pets', { query: { limit: 10 } })
const { data: pet } = await usePetStore('/pets/42')
await usePetStore('/pets', { method: 'post', body: { name: 'Rex' } })
</script>
```

`pets.value` 的类型为 `Pet[] | undefined`，`pet.value` 的类型为 `Pet | undefined`。`POST` 请求必须提供包含 `name` 字符串的请求正文。

这里只会读取 `routes` 的类型，因此传入 `{} as Routes` 即可；请求发出前该值会被移除。声明的路径会按**原样**匹配，不要在前面添加 `baseURL`。运行时拼接的路径类型为 `unknown`。

默认情况下，不匹配的路径和方法仍会被接受，类型为 `unknown`。若要拒绝它们，请启用 [`routeTypedFetch`](/docs/guide/going-further/experimental-features#routetypedfetch) 和 [`strictRouteTypes`](/docs/guide/going-further/experimental-features#strictroutetypes)：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  experimental: {
    routeTypedFetch: true,
    strictRouteTypes: true,
  },
})
```

启用这两个选项后，`usePetStore('/pats')` 和 `usePetStore('/pets', { method: 'put' })` 都会产生类型错误。

::note
客户端声明的路由只属于该客户端，不会添加到应用的路由集合中，因此普通的 `$fetch` 和 `useFetch` 不受影响。此客户端会根据声明的路由为请求提供类型，而不是根据你自己的服务器路由。
::

::tip
上面的接口采用 [`fetchdts`](https://github.com/unjs/fetchdts) 使用的结构。模块可以通过 `fetchdts/compiler` 中的 `compileRoutes`，从 OpenAPI 文档等 API 描述生成接口定义，再将生成的接口传给 `routes`。
::

## Addons

除 `useFetch` 选项外，`createUseFetch` 还接受 `addons` 数组。Addon 是使用 [`defineUseFetchAddon`](/docs/api/utils/define-use-fetch-addon) 定义的可复用行为单元。它们可以声明调用时的自定义选项、在 handler 外运行中间件、扩展返回对象，并为组合式函数添加自定义逻辑。

例如，下面的 addon 会在窗口重新获得焦点时刷新数据，并通过自定义的 `refreshOnFocus` 选项控制；调用方可以逐次选择是否启用：

```ts [app/composables/useCustomFetch.ts]
const refreshOnFocus = defineUseFetchAddon({
  // 为自定义 useFetch 实例扩展调用选项
  setup: (options: UseFetchAddonOptions<{ refreshOnFocus?: boolean }>) => {
    // 在 useFetch 调用 useAsyncData 之前运行
    if (import.meta.server || !options.refreshOnFocus) { return }

    return (asyncData) => {
      // 在 useFetch 调用 useAsyncData 之后运行
      const focused = useWindowFocus()
      watch(focused, (focused) => {
        if (focused) { asyncData.refresh() }
      })

      return { focused } // 为返回对象增加新属性
    }
  },
})

export const useCustomFetch = createUseFetch({ addons: [refreshOnFocus] })
```

```vue [app/pages/index.vue]
<script setup lang="ts">
// 创建的组合式函数会为 `refreshOnFocus` 提供类型
const { data } = await useCustomFetch(
  'https://api.nuxtjs.dev/mountains',
  { refreshOnFocus: true },
)
</script>
```

:read-more{to="/docs/api/utils/define-use-fetch-addon"}

## 默认模式 vs 覆盖模式

### 默认模式（普通对象）

传入普通对象时，工厂选项会作为**默认值**。调用方可以覆盖任何选项：

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  baseURL: 'https://api.nuxt.com',
  lazy: true,
})
```

```ts
// 使用默认的 baseURL
const { data } = await useAPI('/modules')

// 调用方覆盖 baseURL
const { data } = await useAPI('/modules', { baseURL: 'https://other-api.com' })
```

### 覆盖模式（函数）

传入函数时，工厂选项会**覆盖**调用方的选项。调用方的选项会作为参数传入该函数，因此你可以读取这些选项来计算要覆盖的值：

```ts [app/composables/useAPI.ts]
// 无论调用方传入什么，baseURL 都会被强制使用
export const useAPI = createUseFetch(callerOptions => ({
  baseURL: 'https://api.nuxt.com',
}))
```

这对于强制使用认证头或特定 base URL 等设置非常有用，因为这些设置不应由调用方修改。

## 与自定义 `$fetch` 结合

你可以向 `createUseFetch` 传入自定义 `$fetch` 实例：

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch(callerOptions => ({
  $fetch: useNuxtApp().$api as typeof $fetch,
  ...callerOptions,
}))
```

::important
此处必须使用**函数签名**（覆盖模式），这样 [`useNuxtApp()`](/docs/api/composables/use-nuxt-app) 才会在设置上下文（即调用组合式函数的位置）中调用，而不是在没有 Nuxt 实例可用的模块作用域中调用。
::

:read-more{to="/docs/guide/recipes/custom-usefetch"}

:read-more{to="/docs/api/composables/use-fetch"}
