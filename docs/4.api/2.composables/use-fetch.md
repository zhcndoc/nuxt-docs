---
title: 'useFetch'
description: '从 API 端点获取数据的支持 SSR 的组合函数。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

此组合函数为 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`$fetch`](/docs/api/utils/dollarfetch) 提供了一个便捷的封装。
它会根据 URL 和 fetch 选项自动生成 key，根据服务器路由为请求 URL 提供类型提示，并推断 API 响应类型。

::note
`useFetch` 是一个组合函数，适用于直接在 setup 函数、插件或路由中间件中调用。它返回响应式组合对象，并处理将响应添加到 Nuxt payload，以便在页面水合时无需在客户端重新获取数据。
::

## 使用方法

```vue [pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title'],
})
</script>
```

::warning{to="/docs/guide/recipes/custom-usefetch#custom-usefetchuseasyncdata"}
如果你使用自定义的 `useFetch` 封装，请勿在组合函数中对其使用 await，因为这可能导致意外行为。请参阅自定义异步数据获取器的配方。
::

::note
`data`、`status` 和 `error` 是 Vue 的 ref，需在 `<script setup>` 中通过 `.value` 访问；`refresh`/`execute` 和 `clear` 是普通函数。
::

使用 `query` 选项可以向查询添加搜索参数。该选项基于 [unjs/ofetch](https://github.com/unjs/ofetch)，并使用 [unjs/ufo](https://github.com/unjs/ufo) 创建 URL。对象会自动被序列化为字符串。

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' },
})
```

上例产生的请求地址是 `https://api.nuxt.com/modules?param1=value1&param2=value2`。

你也可以使用 [拦截器](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)：

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest ({ request, options }) {
    // 设置请求头
    // 注意，这依赖于 ofetch >= 1.4.0 - 可能需要更新锁文件
    options.headers.set('Authorization', '...')
  },
  onRequestError ({ request, options, error }) {
    // 处理请求错误
  },
  onResponse ({ request, response, options }) {
    // 处理响应数据
    localStorage.setItem('token', response._data.token)
  },
  onResponseError ({ request, response, options }) {
    // 处理响应错误
  },
})
```

### 响应式 Key 和共享状态

你可以使用计算属性 ref 或普通 ref 作为 URL，实现基于动态数据的自动更新：

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// 路由变化时，id 更新，数据会自动重新获取
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

当在多个组件中使用相同 URL 和选项调用 `useFetch` 时，它们将共享相同的 `data`、`error` 和 `status` ref。这确保了组件间的数据一致性。

::tip
使用 `useFetch` 创建的带 key 状态可以通过 [`useNuxtData`](/docs/api/composables/use-nuxt-data) 在 Nuxt 应用中获取。
::

::warning
`useFetch` 是编译器保留的函数名，不应自定义函数命名为 `useFetch`。
::

::warning
如果从 `useFetch` 解构的 `data` 变量是字符串而非 JSON 解析对象，确保组件中没有导入类似 `import { useFetch } from '@vueuse/core'` 的语句。
::

:video-accordion{title="观看 Alexander Lichter 的视频，避免错误使用 useFetch" videoId="njsGVmcWviY"}

:read-more{to="/docs/getting-started/data-fetching"}

### 响应式 Fetch 选项

Fetch 选项可以以响应式形式提供，支持 `computed`、`ref` 和 [计算属性](https://vuejs.org/guide/essentials/computed.html)。当响应式选项更新时，会自动触发使用更新后值的新请求。

```ts
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
})
// 触发新请求: /api/search?q=new%20search
searchQuery.value = 'new search'
```

如果需要，可以通过 `watch: false` 取消此行为：

```ts
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
  watch: false,
})
// 不会触发新请求
searchQuery.value = 'new search'
```

## 类型声明

```ts [Signature]
export function useFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: MaybeRefOrGetter<string>
  method?: MaybeRefOrGetter<string>
  query?: MaybeRefOrGetter<SearchParams>
  params?: MaybeRefOrGetter<SearchParams>
  body?: MaybeRefOrGetter<RequestInit['body'] | Record<string, any>>
  headers?: MaybeRefOrGetter<Record<string, string> | [key: string, value: string][] | Headers>
  baseURL?: MaybeRefOrGetter<string>
  cache?: false | 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload'
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  $fetch?: typeof globalThis.$fetch
  watch?: MultiWatchSources | false
  timeout?: MaybeRefOrGetter<number>
}

type AsyncDataRequestContext = {
  /** 本次数据请求的原因 */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  pending: Ref<boolean>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  signal?: AbortSignal
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```
## 参数

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`)：要请求的 URL 或请求对象。可以是字符串、Request 对象、Vue ref，或返回字符串/Request 的函数。支持响应式用于动态接口。

- `options`（对象）：请求配置，扩展自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项和 [`AsyncDataOptions`](/docs/3.x/api/composables/use-async-data#params)。所有选项均可为静态值、ref 或计算属性。

- `options`（对象）：请求配置，扩展自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项和 [`AsyncDataOptions`](/docs/api/composables/use-async-data#params)。所有选项均可为静态值、`ref` 或计算值。

| 选项            | 类型                                                                    | 默认值     | 描述                                                                                                      |
|-----------------|-------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------|
| `key`           | `MaybeRefOrGetter<string>`                                              | 自动生成   | 用于去重的唯一 key。如果未提供，则根据 URL 和选项生成。                                  |
| `method`        | `MaybeRefOrGetter<string>`                                              | `'GET'`    | HTTP 请求方法。                                                                                             |
| `query`         | `MaybeRefOrGetter<SearchParams>`                                        | -          | 添加到 URL 的查询/搜索参数。别名：`params`。                                                       |
| `params`        | `MaybeRefOrGetter<SearchParams>`                                        | -          | `query` 的别名。                                                                                               |
| `body`          | `MaybeRefOrGetter<RequestInit['body'] \| Record<string, any>>`          | -          | 请求体。对象会自动转换为字符串。                                                             |
| `headers`       | `MaybeRefOrGetter<Record<string, string> \| [key, value][] \| Headers>` | -          | 请求头。                                                                                                 |
| `baseURL`       | `MaybeRefOrGetter<string>`                                              | -          | 请求的基础 URL。                                                                                        |
| `cache`         | `false \| string`                                                       | -          | 缓存控制。布尔值可禁用缓存，也可以使用 Fetch API 的值：`default`、`no-store` 等。                      |
| `server`        | `boolean`                                                               | `true`     | 是否在服务器端获取数据。                                                                                  |
| `lazy`          | `boolean`                                                               | `false`    | 如果为 true，则在路由加载后解析（不会阻塞导航）。                                                 |
| `immediate`     | `boolean`                                                               | `true`     | 如果为 false，则不会立即发起请求。                                                              |
| `default`       | `() => DataT`                                                           | -          | 异步解析完成前 `data` 默认值的工厂函数。                                                       |
| `timeout`       | `number`                                                                | -          | 请求超时前等待的毫秒数（默认为 `undefined`，表示不设置超时时间） |
| `transform`     | `(input: DataT) => DataT \| Promise<DataT>`                             | -          | 解析完成后转换结果的函数。                                                                |
| `getCachedData` | `(key, nuxtApp, ctx) => DataT \| undefined`                             | -          | 返回缓存数据的函数。默认实现见下文。                                                           |
| `pick`          | `string[]`                                                              | -          | 仅选取结果中指定的键。                                                                        |
| `watch`         | `MultiWatchSources \| false`                                            | -          | 要监听并自动刷新的响应式数据源数组。`false` 可禁用监听。                                  |
| `deep`          | `boolean`                                                               | `false`    | 以深层 ref 对象的形式返回数据。                                                                                |
| `dedupe`        | `'cancel' \| 'defer'`                                                   | `'cancel'` | 避免同一时刻多次获取相同 key 的数据。                                                                |
| `$fetch`        | `typeof globalThis.$fetch`                                              | -          | 自定义 `$fetch` 实现。请参阅 [Nuxt 中的自定义 useFetch](/docs/guide/recipes/custom-usefetch)             |

::note
所有的 fetch 选项均支持传入 `computed` 或 `ref`，会自动监听变化并触发新的请求。
::

**getCachedData 默认实现：**

```ts
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
  ? nuxtApp.payload.data[key]
  : nuxtApp.static.data[key]
```
仅当 `nuxt.config` 中启用 `experimental.payloadExtraction` 时生效缓存。

## 返回值

| 名称      | 类型                                                | 描述                                                                                                                                                       |
|-----------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | 异步获取的结果。                                                                                                                             |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 用于手动刷新数据的函数。默认情况下，Nuxt 会等到一次 `refresh` 完成后，才允许再次执行。                                      |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh` 的别名。                                                                                                                                              |
| `error`   | `Ref<ErrorT \| undefined>`                          | 如果数据获取失败，则为错误对象。                                                                                                                         |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 数据请求的状态。下方查看可能的取值。                                                                                                        |
| `pending` | `Ref<boolean>`                                      | 用于指示当前请求是否正在进行中的布尔标志。                                                                                                |
| `clear`   | `() => void`                                        | 将 `data` 重置为 `undefined`（若提供了 `options.default()` 则重置为该值），将 `error` 重置为 `undefined`，将 `status` 设为 `idle`，并取消任何正在进行的请求。 |

### 状态值

- `idle`：请求尚未开始（例如 `{ immediate: false }` 或服务器渲染时 `{ server: false }`）
- `pending`：请求正在进行中
- `success`：请求成功完成
- `error`：请求失败

::note
如果你没有在服务器端获取数据（例如使用 `server: false`），那么在 hydration 完成之前都不会获取该数据。这意味着即使你在客户端 `await useFetch`，在 `<script setup>` 中 `data` 仍然会保持为 undefined。
::

### 示例

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/examples/features/data-fetching"}
