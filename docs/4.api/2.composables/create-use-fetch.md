---
title: 'createUseFetch'
description: 用于创建具有预定义默认选项的自定义 useFetch 组合式函数的工厂函数。
minimalVersion: "4.4"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`createUseFetch` 会创建一个具有预定义选项的自定义 [`useFetch`](/docs/api/composables/use-fetch) 组合式函数。生成的组合式函数具有完整的类型定义，行为与 `useFetch` 完全相同，但内置了你的默认值。

::note
`createUseFetch` 是一个编译器宏。它必须作为 **导出** 声明，放在 `composables/` 目录（或 Nuxt 编译器扫描的任何目录）中。Nuxt 会在构建时自动注入去重键。
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

```ts [Signature]
function createUseFetch (
  options?: Partial<UseFetchOptions> & { addons?: UseFetchAddon[] },
): typeof useFetch

function createUseFetch (
  options: (callerOptions: UseFetchOptions) => Partial<UseFetchOptions>,
): typeof useFetch

// where the client declares the routes it serves
function createUseFetch<Routes> (
  options: Partial<UseFetchOptions> & { routes: Routes, addons?: UseFetchAddon[] },
): DeclaredUseFetch<Routes>
```

返回的组合式函数签名包含 [扩展](#addons) 提供的任何自定义选项和返回值扩展。

## 选项

`createUseFetch` 接受与 [`useFetch`](/docs/api/composables/use-fetch#parameters) 相同的所有选项，包括 `baseURL`、`headers`、`query`、`onRequest`、`onResponse`、`server`、`lazy`、`transform`、`getCachedData` 等。

完整选项列表请参阅 [`useFetch` 文档](/docs/api/composables/use-fetch#parameters)。

## 为第三方 API 添加类型

默认情况下，使用 `createUseFetch` 创建的组合式函数会根据你自己的服务器提供的路由进行类型定义，因此对其他 API 的请求会解析为 `unknown`。传入 `routes` 来声明该 API 提供的内容，组合式函数发出的每个请求都会根据这些路由进行解析：

```ts [app/composables/usePetStore.ts]
import type { DynamicParam, Endpoint } from 'nuxt/app'

interface Pet { id: number, name: string }

interface PetStoreRoutes {
  '/pets': {
    [Endpoint]: {
      GET: { response: Pet[], query: { limit?: number } }
      POST: { response: Pet, body: { name: string } }
    }
    // a path parameter, matched positionally
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

```ts
const { data: pets } = await usePetStore('/pets')
//      ^? Pet[]
const { data: pet } = await usePetStore('/pets/42')
//      ^? Pet
await usePetStore('/pets', { method: 'post', body: { name: 'Rex' } })

await usePetStore('/pats')
//                ^ no GET route matches '/pats'
await usePetStore('/pets', { method: 'put' })
//                          ^ no PUT route matches '/pets'
await usePetStore('/pets', { method: 'post' })
//                          ^ body is required
```

这里只会读取 `routes` 的类型，因此传入 `{} as Routes` 即可；发出请求前，该值会被移除。声明的路径会**按原样**匹配，因为它们就是 API 文档中列出的路径。不要在它们前面加上 `baseURL`。运行时构建的路径会解析为 `unknown`。

::note
客户端声明的路由属于客户端自身。它们不会添加到应用的路由集合中，因此普通的 `$fetch` 和 `useFetch` 不受影响，而且该客户端不会接受你自己的服务器路径。
::

::tip
上面的接口采用 [`fetchdts`](https://github.com/unjs/fetchdts) 使用的结构，Nuxt 也会为你自己的服务器路由生成这种接口。因此，模块可以使用 `fetchdts/compiler` 中的 `compileRoutes`，根据 API 描述（例如 OpenAPI 文档）生成接口，并将生成的接口传给 `routes`。
::

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

传入函数时，工厂选项会**覆盖**调用方的选项。该函数接收调用方的选项作为参数，可以读取这些选项来计算要覆盖的配置：

```ts [app/composables/useAPI.ts]
// 无论调用方传什么，baseURL 都会被强制设置
export const useAPI = createUseFetch(callerOptions => ({
  baseURL: 'https://api.nuxt.com',
}))
```

当你需要强制设置身份验证头或特定基础 URL（不允许调用方更改）等选项时，这种方式非常有用。

## 搭配自定义 `$fetch`

你可以向 `createUseFetch` 传入自定义的 `$fetch` 实例：

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch(callerOptions => ({
  $fetch: useNuxtApp().$api as typeof $fetch,
  ...callerOptions,
}))
```

::important
这里必须使用**函数签名**（覆盖模式），以便在设置上下文中（组合式函数调用处）调用 [`useNuxtApp()`](/docs/api/composables/use-nuxt-app)，而不是在模块作用域中调用，因为模块作用域中没有可用的 Nuxt 实例。
::

## 扩展

除了 `useFetch` 选项外，`createUseFetch` 还接受一个 `addons` 数组。扩展是使用 [`defineUseFetchAddon`](/docs/api/utils/define-use-fetch-addon) 定义的可复用行为单元。它们可以声明自定义调用选项、在处理程序周围运行中间件、扩展返回对象，并为组合式函数附加自定义逻辑。

例如，一个扩展可以在窗口重新获得焦点时刷新数据，并通过自定义的 `refreshOnFocus` 选项控制是否启用，让调用方在每次调用时自行选择：

```ts [app/composables/useCustomFetch.ts]
const refreshOnFocus = defineUseFetchAddon({
  // augment the call-site options for the custom useFetch instance 👇
  setup: (options: UseFetchAddonOptions<{ refreshOnFocus?: boolean }>) => {
    // 👈 run code *before* calling `useAsyncData` in `useFetch`
    if (import.meta.server || !options.refreshOnFocus) { return }

    return (asyncData) => {
      // 👈 run code *after* calling `useAsyncData` in `useFetch`
      const focused = useWindowFocus()
      watch(focused, (focused) => {
        if (focused) { asyncData.refresh() }
      })

      return { focused } // 👈 extend the returned object with a new property
    }
  },
})

export const useCustomFetch = createUseFetch({ addons: [refreshOnFocus] })
```

```vue [app/pages/index.vue]
<script setup lang="ts">
// `refreshOnFocus` is typed on the created composable
const { data } = await useCustomFetch(
  'https://api.nuxtjs.dev/mountains',
  { refreshOnFocus: true },
)
</script>
```

:read-more{to="/docs/api/utils/define-use-fetch-addon"}

:read-more{to="/docs/guide/recipes/custom-usefetch"}

:read-more{to="/docs/api/composables/use-fetch"}
